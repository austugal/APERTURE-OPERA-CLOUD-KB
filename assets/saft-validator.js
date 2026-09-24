// SAF-T (PT) 1.04_01 pre-check. Runs entirely in the browser. Structural and arithmetic
// checks only: it does not replace the AT validation service.
(function (root) {
  'use strict';
  const EXEMPTION = /^M(0[1-9]|[1-9][0-9])$/;
  const INVOICE_TYPES = ['FT', 'FS', 'FR', 'ND', 'NC'];
  const STATUS = ['N', 'S', 'A', 'R', 'F'];
  const TAX_CODES = /^(RED|INT|NOR|ISE|OUT|NS|[A-Za-z0-9.]{1,10})$/;
  const REGIONS = /^(PT|PT-AC|PT-MA|[A-Z]{2})$/;

  function nifValid(nif) {
    if (!/^\d{9}$/.test(nif)) return false;
    let sum = 0;
    for (let i = 0; i < 8; i++) sum += +nif[i] * (9 - i);
    let check = 11 - (sum % 11);
    if (check >= 10) check = 0;
    return check === +nif[8];
  }
  const num = (v) => { const n = parseFloat(String(v || '').trim()); return isNaN(n) ? 0 : n; };
  const near = (a, b, tol = 0.01) => Math.abs(a - b) <= tol + 1e-9;

  function validate(xmlText) {
    const findings = []; // {level:'error'|'warning'|'info', area, msg}
    const add = (level, area, msg) => findings.push({ level, area, msg });
    const stats = {};
    const doc = new DOMParser().parseFromString(xmlText, 'application/xml');
    const perr = doc.getElementsByTagName('parsererror')[0];
    if (perr) { add('error', 'File', 'The file is not well-formed XML: ' + perr.textContent.split('\n')[0].slice(0, 200)); return { findings, stats }; }
    const q = (ctx, path) => { let cur = [ctx]; for (const name of path.split('/')) { const next = []; cur.forEach(c => { for (const ch of c.children) if (ch.localName === name) next.push(ch); }); cur = next; } return cur; };
    const t = (ctx, path) => { const n = q(ctx, path)[0]; return n ? n.textContent.trim() : ''; };
    const rootEl = doc.documentElement;
    if (rootEl.localName !== 'AuditFile') { add('error', 'File', 'Root element is <' + rootEl.localName + '>, expected <AuditFile>.'); return { findings, stats }; }
    const ns = rootEl.namespaceURI || '';
    if (!/urn:OECD:StandardAuditFile-Tax:PT_1\.04_01/.test(ns)) add('warning', 'File', 'Namespace is "' + (ns || 'none') + '". SAF-T (PT) 1.04_01 uses urn:OECD:StandardAuditFile-Tax:PT_1.04_01.');

    // Header
    const H = q(rootEl, 'Header')[0];
    if (!H) { add('error', 'Header', 'Missing <Header>.'); return { findings, stats }; }
    const req = ['AuditFileVersion', 'CompanyID', 'TaxRegistrationNumber', 'TaxAccountingBasis', 'CompanyName', 'CompanyAddress', 'FiscalYear', 'StartDate', 'EndDate', 'CurrencyCode', 'DateCreated', 'TaxEntity', 'ProductCompanyTaxID', 'SoftwareCertificateNumber', 'ProductID', 'ProductVersion'];
    req.forEach(f => { if (!q(H, f).length) add('error', 'Header', 'Missing <' + f + '>.'); else if (!t(H, f) && f !== 'CompanyAddress') add('error', 'Header', '<' + f + '> is empty.'); });
    if (t(H, 'AuditFileVersion') && t(H, 'AuditFileVersion') !== '1.04_01') add('warning', 'Header', 'AuditFileVersion is ' + t(H, 'AuditFileVersion') + ', expected 1.04_01.');
    const nif = t(H, 'TaxRegistrationNumber');
    if (nif && !nifValid(nif)) add('error', 'Header', 'TaxRegistrationNumber ' + nif + ' is not a valid Portuguese NIF (9 digits with check digit).');
    const pnif = t(H, 'ProductCompanyTaxID');
    if (pnif && !nifValid(pnif)) add('error', 'Header', 'ProductCompanyTaxID ' + pnif + ' is not a valid NIF.');
    const cert = t(H, 'SoftwareCertificateNumber');
    if (q(H, 'SoftwareCertificateNumber').length && (!cert || cert === '0')) add('error', 'Header', 'SoftwareCertificateNumber is empty or 0. In OPERA Cloud check the SOFTWARE_CERT_NO property mapping code.');
    if (t(H, 'CurrencyCode') && t(H, 'CurrencyCode') !== 'EUR') add('error', 'Header', 'CurrencyCode must be EUR.');
    if (!/^[CEFIPRST]$/.test(t(H, 'TaxAccountingBasis'))) add('error', 'Header', 'TaxAccountingBasis must be one of C, E, F, I, P, R, S, T.');
    const addr = q(H, 'CompanyAddress')[0];
    if (addr) ['AddressDetail', 'City', 'PostalCode', 'Country'].forEach(f => { if (!t(addr, f)) add('error', 'Header', 'CompanyAddress/' + f + ' is missing or empty.'); });
    if (addr && t(addr, 'Country') === 'PT' && t(addr, 'PostalCode') && !/^\d{4}-\d{3}$/.test(t(addr, 'PostalCode'))) add('warning', 'Header', 'Portuguese PostalCode should be 0000-000.');
    const start = t(H, 'StartDate'), end = t(H, 'EndDate');
    stats.period = start + ' to ' + end; stats.company = t(H, 'CompanyName'); stats.nif = nif; stats.certificate = cert;

    // Master files
    const MF = q(rootEl, 'MasterFiles')[0];
    const customers = new Set(), products = new Set(), taxTable = [];
    if (!MF) add('error', 'MasterFiles', 'Missing <MasterFiles>.');
    else {
      q(MF, 'Customer').forEach((c, i) => {
        const id = t(c, 'CustomerID'); if (!id) add('error', 'MasterFiles', 'Customer ' + (i + 1) + ' has no CustomerID.');
        if (customers.has(id)) add('error', 'MasterFiles', 'Duplicate CustomerID ' + id + '.'); customers.add(id);
        ['AccountID', 'CustomerTaxID', 'CompanyName', 'BillingAddress', 'SelfBillingIndicator'].forEach(f => { if (!q(c, f).length) add('error', 'MasterFiles', 'Customer ' + id + ' is missing <' + f + '>.'); });
        const tid = t(c, 'CustomerTaxID'); const ctry = t(c, 'BillingAddress/Country');
        if (tid && ctry === 'PT' && tid !== '999999990' && !nifValid(tid)) add('warning', 'MasterFiles', 'Customer ' + id + ' has Portuguese address but CustomerTaxID ' + tid + ' fails the NIF check.');
      });
      q(MF, 'Product').forEach((p, i) => {
        const code = t(p, 'ProductCode'); products.add(code);
        if (!/^[PSOEI]$/.test(t(p, 'ProductType'))) add('error', 'MasterFiles', 'Product ' + (code || i + 1) + ' has ProductType "' + t(p, 'ProductType') + '". Allowed: P, S, O, E, I.');
        ['ProductCode', 'ProductDescription', 'ProductNumberCode'].forEach(f => { if (!t(p, f)) add('error', 'MasterFiles', 'Product ' + (code || i + 1) + ' is missing <' + f + '>.'); });
      });
      q(MF, 'TaxTable/TaxTableEntry').forEach(e => taxTable.push({ type: t(e, 'TaxType'), region: t(e, 'TaxCountryRegion'), code: t(e, 'TaxCode'), pct: t(e, 'TaxPercentage') }));
      if (!taxTable.length) add('error', 'MasterFiles', 'TaxTable has no entries. In OPERA Cloud check the F_SD_SAF_T mappings on tax transaction codes.');
      taxTable.forEach(e => { if (!TAX_CODES.test(e.code)) add('error', 'MasterFiles', 'TaxTable TaxCode "' + e.code + '" is not valid.'); if (e.region && !REGIONS.test(e.region)) add('warning', 'MasterFiles', 'TaxCountryRegion "' + e.region + '" looks unusual.'); });
    }
    stats.customers = customers.size; stats.products = products.size; stats.taxEntries = taxTable.length;

    // Sales invoices
    const SI = q(rootEl, 'SourceDocuments/SalesInvoices')[0];
    if (!SI) { add('warning', 'SalesInvoices', 'No <SalesInvoices> section. Acceptable only if no documents were issued in the period.'); return { findings, stats }; }
    const invoices = q(SI, 'Invoice');
    stats.invoices = invoices.length;
    const declared = +t(SI, 'NumberOfEntries');
    if (declared !== invoices.length) add('error', 'SalesInvoices', 'NumberOfEntries is ' + declared + ' but the file holds ' + invoices.length + ' documents.');
    let sumDebit = 0, sumCredit = 0; const series = {}; const byType = {}; let lineCount = 0;
    invoices.forEach((inv) => {
      const no = t(inv, 'InvoiceNo'); const label = no || '(no InvoiceNo)';
      const m = no.match(/^([^ ]+) ([^/^ ]+)\/([0-9]+)$/);
      if (!m) add('error', 'Documents', label + ': InvoiceNo must follow "TYPE SERIES/NUMBER".');
      else { const key = m[1] + ' ' + m[2]; (series[key] = series[key] || []).push(+m[3]); }
      const type = t(inv, 'InvoiceType'); byType[type] = (byType[type] || 0) + 1;
      if (!INVOICE_TYPES.includes(type)) add('error', 'Documents', label + ': InvoiceType "' + type + '" is not FT, FS, FR, ND or NC.');
      if (m && m[1] !== type) add('warning', 'Documents', label + ': InvoiceNo prefix ' + m[1] + ' differs from InvoiceType ' + type + '.');
      const atcud = t(inv, 'ATCUD');
      if (!q(inv, 'ATCUD').length) add('error', 'Documents', label + ': missing <ATCUD>.');
      else if (atcud === '0') add('error', 'Documents', label + ': ATCUD is 0. In OPERA Cloud the folio type Unique ID is empty.');
      else if (!/^[A-Za-z0-9]{8,}-\d+$/.test(atcud)) add('error', 'Documents', label + ': ATCUD "' + atcud + '" must be a validation code of at least 8 characters, a hyphen and the sequence number.');
      else if (m && atcud.split('-')[1] !== m[3]) add('warning', 'Documents', label + ': ATCUD sequence ' + atcud.split('-')[1] + ' does not match document number ' + m[3] + '.');
      const status = t(inv, 'DocumentStatus/InvoiceStatus');
      if (!STATUS.includes(status)) add('error', 'Documents', label + ': InvoiceStatus "' + status + '" is not valid.');
      const hash = t(inv, 'Hash');
      if (!hash) add('error', 'Documents', label + ': missing <Hash>.');
      else if (hash !== '0' && !/^[A-Za-z0-9+/=]{172}$/.test(hash)) add('warning', 'Documents', label + ': Hash is not a 172-character signature.');
      const date = t(inv, 'InvoiceDate');
      if (start && end && date && (date < start || date > end)) add('error', 'Documents', label + ': InvoiceDate ' + date + ' is outside the file period.');
      const cid = t(inv, 'CustomerID');
      if (cid && !customers.has(cid)) add('error', 'Documents', label + ': CustomerID ' + cid + ' is not in MasterFiles.');
      if (type === 'NC' && !q(inv, 'Line/References').length) add('error', 'Documents', label + ': credit note has no <References> to the original document.');
      let net = 0, tax = 0; const counted = status !== 'A' && status !== 'F';
      q(inv, 'Line').forEach((ln, li) => {
        lineCount++;
        const deb = num(t(ln, 'DebitAmount')), cred = num(t(ln, 'CreditAmount'));
        if (q(ln, 'DebitAmount').length && q(ln, 'CreditAmount').length) add('error', 'Documents', label + ' line ' + (li + 1) + ': has both DebitAmount and CreditAmount.');
        if (type === 'NC' && q(ln, 'CreditAmount').length) add('warning', 'Documents', label + ' line ' + (li + 1) + ': credit notes normally carry DebitAmount.');
        const amount = type === 'NC' ? deb || cred : cred || deb;
        net += amount;
        if (counted) { sumDebit += deb; sumCredit += cred; }
        const pc = t(ln, 'ProductCode'); if (pc && products.size && !products.has(pc)) add('error', 'Documents', label + ' line ' + (li + 1) + ': ProductCode ' + pc + ' is not in MasterFiles.');
        const tt = t(ln, 'Tax/TaxType'), tcode = t(ln, 'Tax/TaxCode'), pctRaw = t(ln, 'Tax/TaxPercentage');
        if (!tt) add('error', 'Documents', label + ' line ' + (li + 1) + ': missing Tax/TaxType.');
        if (tcode && !TAX_CODES.test(tcode)) add('error', 'Documents', label + ' line ' + (li + 1) + ': TaxCode "' + tcode + '" is not valid.');
        const pct = num(pctRaw);
        if ((tt === 'IVA' && pct === 0) || tt === 'NS') {
          const code = t(ln, 'TaxExemptionCode'), reason = t(ln, 'TaxExemptionReason');
          if (!code || !reason) add('error', 'Documents', label + ' line ' + (li + 1) + ': 0% line without TaxExemptionCode and TaxExemptionReason. Check TAX_RATE and TAX_EXEMPT on the tax transaction code.');
          else if (!EXEMPTION.test(code)) add('error', 'Documents', label + ' line ' + (li + 1) + ': TaxExemptionCode "' + code + '" is not an M code.');
        }
        if (tt === 'IVA' && pctRaw !== '' && taxTable.length && !taxTable.some(e => e.type === 'IVA' && num(e.pct) === pct)) add('warning', 'Documents', label + ' line ' + (li + 1) + ': IVA ' + pct + '% is not in the TaxTable.');
        tax += amount * pct / 100;
      });
      const dt = q(inv, 'DocumentTotals')[0];
      if (!dt) add('error', 'Documents', label + ': missing <DocumentTotals>.');
      else {
        const tp = num(t(dt, 'TaxPayable')), nt = num(t(dt, 'NetTotal')), gt = num(t(dt, 'GrossTotal'));
        if (!near(tp + nt, gt)) add('error', 'Documents', label + ': GrossTotal ' + gt.toFixed(2) + ' is not NetTotal + TaxPayable (' + (nt + tp).toFixed(2) + ').');
        if (!near(net, nt, 0.02)) add('error', 'Documents', label + ': NetTotal ' + nt.toFixed(2) + ' differs from the sum of lines ' + net.toFixed(2) + '.');
        if (!near(tax, tp, Math.max(0.02, q(inv, 'Line').length * 0.01))) add('warning', 'Documents', label + ': TaxPayable ' + tp.toFixed(2) + ' differs from the computed line tax ' + tax.toFixed(2) + '. Check rounding or tax inclusive pricing.');
      }
    });
    const td = num(t(SI, 'TotalDebit')), tc = num(t(SI, 'TotalCredit'));
    if (!near(td, sumDebit)) add('error', 'SalesInvoices', 'TotalDebit ' + td.toFixed(2) + ' differs from the sum of DebitAmount ' + sumDebit.toFixed(2) + ' (cancelled and invoiced documents excluded).');
    if (!near(tc, sumCredit)) add('error', 'SalesInvoices', 'TotalCredit ' + tc.toFixed(2) + ' differs from the sum of CreditAmount ' + sumCredit.toFixed(2) + ' (cancelled and invoiced documents excluded).');
    Object.entries(series).forEach(([k, nums]) => {
      nums.sort((a, b) => a - b); const dup = nums.filter((n, i) => i && n === nums[i - 1]); if (dup.length) add('error', 'Series', k + ': duplicate numbers ' + [...new Set(dup)].slice(0, 5).join(', ') + '.');
      const gaps = []; for (let i = 1; i < nums.length; i++) if (nums[i] - nums[i - 1] > 1) gaps.push((nums[i - 1] + 1) + (nums[i] - nums[i - 1] > 2 ? '–' + (nums[i] - 1) : ''));
      if (gaps.length) add('warning', 'Series', k + ': gaps in numbering ' + gaps.slice(0, 5).join(', ') + '. Confirm the missing numbers are in another file or period.');
    });
    stats.lines = lineCount; stats.series = Object.keys(series).length; stats.byType = byType; stats.totalDebit = td; stats.totalCredit = tc;
    const WD = q(rootEl, 'SourceDocuments/WorkingDocuments')[0];
    stats.workingDocuments = WD ? q(WD, 'WorkDocument').length : 0;
    const PY = q(rootEl, 'SourceDocuments/Payments')[0];
    if (PY) { const pays = q(PY, 'Payment'); stats.payments = pays.length; pays.forEach(p => q(p, 'PaymentMethod').forEach(pm => { const mech = t(pm, 'PaymentMechanism'); if (!/^(CC|CD|CH|CI|CO|CS|DE|LC|MB|NU|OU|PR|TB|TR)$/.test(mech)) add('warning', 'Payments', t(p, 'PaymentRefNo') + ': PaymentMechanism "' + mech + '" is empty or not an AT code. Check the PAYMENT_TYPE mapping.'); })); }
    return { findings, stats };
  }
  root.SaftValidator = { validate, nifValid };
})(typeof window !== 'undefined' ? window : globalThis);
