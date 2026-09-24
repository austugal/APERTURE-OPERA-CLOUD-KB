# BI Publisher Folio Customisation

OPERA Cloud document outputs (folios, registration cards, confirmation letters, credit card vouchers and similar) are produced from RTF templates processed by Oracle BI Publisher. Customisation involves editing the RTF template in Microsoft Word, inserting BI Publisher merge codes and conditional logic, and uploading the customised template back to OPERA Cloud.

This document covers the customisation workflow, merge code patterns and country-specific considerations.

---

## Reference documents

- Oracle Hospitality OPERA Cloud Folio Customization Guide (My Oracle Support)
- Oracle BI Publisher RTF Template Designer User Guide
- Oracle Hospitality OPERA Cloud Country Fiscal Reference Guides per country

---

## Workflow

### Step 1 — Download the standard template

Path: Reports > Manage Reports > [report] > Download template

OPERA Cloud provides the standard template as an RTF file. Save locally and put under version control before modifying.

### Step 2 — Edit in Microsoft Word

Open the RTF in Microsoft Word with the BI Publisher Add-In installed. The add-in provides menus for inserting merge codes, conditional logic, calculations and cross-references.

### Step 3 — Validate

Use the BI Publisher Add-In preview to render the template against test data. Iterate until rendering matches the design intent.

### Step 4 — Upload

Path: Reports > Manage Reports > [report] > Upload template

Replace the template. Test against a real reservation or folio before going live.

### Step 5 — Version control

Commit the final template to a Git repository with a clear naming convention by chain, property, fiscal context, language and version.

---

## Common merge codes

Merge codes follow XSL-FO syntax with the BI Publisher Add-In abstraction. Common categories.

### Reservation

- Reservation ID
- Arrival date
- Departure date
- Room number
- Room type
- Rate code
- Rate amount
- Number of adults and children

### Profile

- Guest name (first, last, full)
- Address (line 1, line 2, city, postal code, country)
- Tax ID (NIF, NIE, VAT registration)
- Fiscal name
- Email and phone

### Folio

- Folio number
- Folio date
- Folio currency
- Total amount
- Tax breakdown by VAT rate
- Net amount per line
- Tax amount per line
- Payment method and amount per payment record
- Balance due
- ATCUD (Portugal)
- QR code (Portugal)
- AT software certificate number

### Property

- Legal name
- Trading name
- Address
- VAT number
- Tax registration
- Fiscal partner name (where applicable)
- Bank account for transfers

---

## Conditional logic

BI Publisher RTF supports conditional sections. Common patterns.

### Print VAT exemption narrative only when applicable

```
<?if: M_CODE='M99'?>
[Print narrative text required for M99 exemption]
<?end if?>
```

### Print different folio header text per folio type

```
<?choose:?>
  <?when: FOLIO_TYPE='FT'?>Fatura<?end when?>
  <?when: FOLIO_TYPE='FR'?>Fatura-Recibo<?end when?>
  <?when: FOLIO_TYPE='FS'?>Fatura Simplificada<?end when?>
  <?when: FOLIO_TYPE='NC'?>Nota de Crédito<?end when?>
<?end choose?>
```

### Print bilingual text based on guest language

```
<?if: GUEST_LANGUAGE='PT'?>
  Obrigado pela sua estadia
<?else?>
  Thank you for your stay
<?end if?>
```

### Loop over folio lines

```
<?for-each: FOLIO_LINE?>
[Print line description, quantity, unit price, total]
<?end for-each?>
```

---

## Country-specific patterns

### Portugal

Mandatory elements per CIVA and Decreto-Lei 28/2019.

- Document type header text (Fatura, Fatura-Recibo, etc.)
- ATCUD in document body
- QR code matching ATCUD specification
- AT software certificate number ("Processado por programa certificado nº [X] AT")
- VAT breakdown per rate showing net, rate, tax amount
- M-code narrative where M99 exemption is used
- Customer NIF (mandatory for invoices over EUR 1000 even for individuals)

### Spain

Mandatory elements per Real Decreto 596/2016 and Ley 37/1992.

- Document type per F1-F6 classification
- VAT breakdown per rate (4, 10, 21 percent or regional variants)
- NIF or NIE for any invoice with named customer
- Issuer NIF and registered address

### Other countries

Each country has its own fiscal document requirements. Custom templates per country are standard practice.

---

## Multi-language considerations

Properties with international guests typically maintain.

- Default English template
- Local-language template (per country fiscal requirement)
- Additional language variants for major source markets

OPERA Cloud can select template based on profile language preference or property default. Configure at the report template selection level.

---

## Common issues

- Merge code typos causing blank fields in production folios
- Conditional logic syntax errors causing template processing failure
- Font missing on OPERA Cloud rendering server, causing text substitution
- QR code rendering at wrong size or position
- ATCUD line wrapping at unexpected character due to font kerning
- Mandatory field omitted from custom template (e.g. M-code narrative)
- Upload accepted but template not active until cache refresh

---

## Best practices

- Maintain templates under Git version control with chain or property scope
- Document every customisation with rationale
- Test on a real reservation before production deployment
- Validate against fiscal requirement when country regulation changes
- Re-test against each OPERA Cloud quarterly release
- Use the BI Publisher preview before upload, never upload untested

---

*Derived from Oracle Hospitality OPERA Cloud Folio Customization Guide and Oracle BI Publisher documentation. Not affiliated with Oracle Corporation. Licensed CC BY-NC-SA 4.0.*
