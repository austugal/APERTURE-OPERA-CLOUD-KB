# SAF-T (PT) Export: Build, Mapping and Customisation in OPERA Cloud

How the Portuguese SAF-T export is built in OPERA Cloud, which mappings feed which XML tags, the traps that make AT reject a file, and how to check an export before it leaves the property. Verified September 2026.

Tier legend. **[T1]** documented in Oracle's Portugal fiscal guide or Portuguese law. **[T2]** observed on live Portuguese implementations. **[T3]** inference, labelled. Full configuration sequence: [Portugal fiscal master](opera-doc.html?file=portugal-fiscal-master.md).

Validate a file now: [SAF-T Validator](saft.html).

## 1. The export definition

| Item | Value | Tier |
|---|---|---|
| Export name | `PT_SAFT_104` | [T1] |
| Export type | XML, run on demand | [T1] |
| File name | `'PT_SAFT_' \|\| legal_entity_country_code \|\| legal_entity_tax_id`, extension `xml` | [T1] |
| Parameter form | `EXP1` | [T1] |
| Character set | `WE8MSWIN1252` | [T1] |
| Schema | SAF-T (PT) 1.04_01, Portaria 302/2016 | [T1] |

Only Country Exports carry the Portuguese fiscal obligation. Back office and R&A exports do not replace `PT_SAFT_104`. [T2]

## 2. Where every tag comes from

### Header

| SAF-T tag | OPERA Cloud source | Tier |
|---|---|---|
| `<CompanyID>`, `<TaxRegistrationNumber>` | OPERA Control General > Property Tax ID (9-digit NIF) | [T1] |
| `<CompanyName>` | Legal entity name exactly as registered with AT | [T1] |
| `<SoftwareCertificateNumber>` | Property mapping code `SOFTWARE_CERT_NO`. Not populated automatically | [T1] |
| `<ProductID>` | Property mapping code `PRODUCT_ID` | [T1] |
| `<ProductCompanyTaxID>` | Property mapping code `PROD_COMPANY_TAX_ID` | [T1] |
| `<TaxCountryRegion>` | Property mapping code `LEG_ENT_TAX_REGION`: `PT`, `PTMA` or `PTAC` | [T1] |

Confirm the certificate number and Product ID string against the certificate issued for the OPERA Cloud release being deployed. Portuguese certification is version bound. [T3]

### Tax lines

Mapping type `F_SD_SAF_T` on **tax** transaction codes. Administration > Interfaces > Export Mapping > Export Mappings > Mapped To: Transaction Codes. [T1]

| Mapping code | Example value | SAF-T tag |
|---|---|---|
| `TAX_RATE` | 0, 6, 13 or 23 | `<TaxPercentage>` |
| `TAX_MARKER` | ISE, RED, INT, NOR, OUT, NS | `<TaxCode>` |
| `TAX_EXEMPT` | M01, M07, M99 | `<TaxExemptionReason>` and `<TaxExemptionCode>` |
| `TRX_MARKER` | P or S | `<ProductType>` |

Rules [T1]:
- Only tax transaction codes count for exemptions, not the parent revenue code.
- The exemption reason reaches the export only when `TAX_RATE` is 0.
- `<ProductType>` defaults to S when the mapping is blank or holds anything other than P or S.
- NS with M99 renders TaxType NS, TaxCode NS, TaxPercentage 0 and TaxExemptionCode M99. Switch the Folio QR Code parameter off and on after configuring NS.

Madeira and Azores rates differ from the mainland. Build a separate rate set per region and set `LEG_ENT_TAX_REGION` to match. [T1]

### Payments

Mapping type `F_SD_SAF_T`, mapping code `PAYMENT_TYPE` on payment transaction codes. Requires the Cashiering parameter Portugal SAFT Payment Types. An unmapped payment code leaves `<PaymentMechanism>` blank. [T1]

| Code | Meaning | Code | Meaning |
|---|---|---|---|
| CC | Credit card | LC | Commercial bill |
| CD | Debit card | MB | ATM payment reference |
| CH | Bank cheque | NU | Cash |
| CI | International letter of credit | OU | Other |
| CO | Gift cheque or card | PR | Exchange of goods |
| CS | Current account compensation | TB | Bank transfer or direct debit |
| DE | Electronic money | TR | Non-wage vouchers |

### Documents

| Folio type | Code | SAF-T section | Tier |
|---|---|---|---|
| Portuguese folio (total over 100.00) | FR | `<SalesInvoices>` | [T1] |
| Simplified invoice (100.00 or under) | FS | `<SalesInvoices>` | [T1] |
| AR settlement | FT | `<SalesInvoices>` | [T1] |
| Credit bill | NC | `<SalesInvoices>` with references to the original | [T1] |
| Information folio | OU | `<WorkingDocuments>` | [T1] |

`<ATCUD>` is the folio type Unique ID, a hyphen and the folio number, for example `ABCD1234-406`. An empty Unique ID exports `<ATCUD>0</ATCUD>`, and every document issued in that state is invalid. [T1]

## 3. Customisation: what you can change safely

**Change through mappings, not the export.** Tax, exemption, product type and payment mechanism are all mapping driven. Editing the export's data definition to hard-code a value breaks on the next template refresh. [T2]

**Exclude non-fiscal folios with `EXCL_FOLIO_TYPES`.** Set it on the property codes mapping, for example `INTERNAL`. Left blank, proforma and information folios can reach SAF-T as fiscal invoices. [T1] for the mapping, [T2] for the failure.

**Changing a template means delete and recreate.** Oracle ships export changes in the template. An existing export keeps its old definition until it is deleted and recreated from template. Export the old definition first, keep the file, then recreate and compare the output on the same date range. [T2]

**Adding a field.** Add it to the export data definition only when the SAF-T schema allows the element in that position. Anything outside the schema fails AT validation. Test on a copy of the export first, then promote. [T3]

## 4. Pre-submission checklist

1. Header NIF is 9 digits with a valid check digit, and matches the property tax ID.
2. `SoftwareCertificateNumber` is populated and matches the release certificate.
3. Every invoice has an ATCUD that is not `0`.
4. Every 0% IVA line carries `TaxExemptionCode` and `TaxExemptionReason`.
5. `NumberOfEntries` equals the number of documents. `TotalDebit` and `TotalCredit` equal the sums of the line amounts, excluding cancelled documents.
6. `GrossTotal` equals `NetTotal` plus `TaxPayable` on each document.
7. Every credit note references its original document.
8. Numbering inside each series is continuous with no gaps.
9. Every `CustomerID` on a document exists in `MasterFiles`.
10. Information folios sit in `WorkingDocuments`, not in `SalesInvoices`.

The [SAF-T Validator](saft.html) runs checks 1, 3 to 9 in the browser. It is a pre-check, not a replacement for the AT validation service at the e-fatura portal.

## 5. Common AT rejections and their OPERA cause

| Symptom in the AT response | Likely OPERA cause |
|---|---|
| Missing or invalid software certificate | `SOFTWARE_CERT_NO` mapping blank |
| ATCUD invalid | Folio type Unique ID empty, or QR parameter not recycled after entering it |
| Missing exemption reason | `TAX_EXEMPT` mapped on the parent code instead of the tax code, or `TAX_RATE` not 0 |
| Totals do not reconcile | Cancelled documents counted, or manual edits to the export definition |
| Customer not found | Walk-in customer handling changed, or a profile merged after issue |
| Document in wrong section | Information or proforma folio not excluded through `EXCL_FOLIO_TYPES` |

## 6. 2027 change to watch

Lei n.º 73-A/2025 brings changes to Portuguese invoicing obligations from 1 January 2027. Confirm scope with the fiscal partner and the client's accountant before year end. [T1] for the law, [T3] for the impact on OPERA Cloud.
