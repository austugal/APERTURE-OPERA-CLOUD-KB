# Portugal Fiscal Master Configuration

Configuration framework for OPERA Cloud properties operating in Portugal. This guide is organised as a 14-layer dependency model. Each layer depends on the previous being complete. Skipping the sequence causes missing menu options, broken exports, or non-compliant invoices.

Transaction code numbers used in examples are placeholders. Implementing properties must use their own chain coding standards.

---

## Reference documents

- Oracle Hospitality OPERA Cloud Portugal Fiscal Reference Guide (current version on My Oracle Support)
- Oracle Hospitality OPERA Cloud Property User Guide
- Oracle Hospitality OPERA Cloud Reporting and Analytics User Guide
- Autoridade Tributária e Aduaneira (AT) — Portal das Finanças technical specifications for SAF-T (PT) and ATCUD
- Código do Imposto sobre o Valor Acrescentado (CIVA) — Article 36 invoice content requirements
- Serviço de Estrangeiros e Fronteiras (SEF) file format BA03 for guest notification
- Decreto-Lei 28/2019 and Portaria 195/2020 governing invoice digital signature and ATCUD

---

## Configuration logic model

| Layer | Domain | Path root |
|---|---|---|
| 0 | Legal inputs (pre-system) | Customer + Fiscal Partner |
| 1 | Property foundation | Administration > Enterprise > Properties |
| 2 | OPERA Controls | Administration > Enterprise > OPERA Controls |
| 3 | Role permissions | Administration > Enterprise > Role Manager |
| 4 | Transaction codes (financial foundation) | Administration > Financial > Transaction Codes |
| 5 | Export mapping | Miscellaneous > Exports > Export Mappings |
| 6 | Folio types | Administration > Financial > Cashiering Management > Folio Types |
| 7 | Digital signatures and ATCUD | Administration > Financial > Digital Signatures |
| 8 | Folio reports (RTF templates) | Reports > Manage Reports |
| 9 | Special revenue (deposits, HB/FB, city tax) | Multiple |
| 10 | FLIP fiscal integration | Administration > Financial > Fiscal Management |
| 11 | Statutory exports (SAF-T, Police) | Miscellaneous > Exports > Country |
| 12 | AR / Direct Bill | Administration > Financial > AR Configuration |
| 13 | Validation and go-live gate | Verification only |
| 14 | Post-go-live operations | Procedures only |

---

## Layer 0 — Legal inputs (pre-system)

Collected before touching OPERA. Nothing configurable without these.

| Input | Source | Format example |
|---|---|---|
| Legal company name | Customer | "Hotel Example Lda" |
| NIF (Portuguese Tax ID) | Customer | 9 digits |
| VAT regime | Customer | Normal / Simplified / Exempt |
| Establishment number | Customer | 2 digits, e.g. "00" |
| ATCUD series codes | Customer + Fiscal Partner | Per folio type, registered at AT |
| Fiscal Partner credentials | Fiscal Partner | URL + username + token |
| Software Certificate Number | Fiscal Partner | AT-issued |
| AT Communication Code | Customer | Used for SAF-T submission |
| Hotel category and capacity | Customer | INE classification |
| Municipal city tax rate | Municipality | EUR per adult per night |

---

## Layer 1 — Property foundation

**Path:** Administration > Enterprise > Properties > [Property]

Set the Country Mode to PT (Portugal). This unlocks Portugal-specific menus and exports across the system. The flag cannot be changed after data exists. Validate before saving.

Set the Region. This drives municipal-level configurations including city tax.

---

## Layer 2 — OPERA Controls

**Path:** Administration > Enterprise > OPERA Controls

The Country group becomes visible only when Country Mode is set. Enable the following functions and parameters per Oracle Portugal Fiscal Reference Guide.

- Country > Country Specific Functions: ON
- Country > Portugal Fiscal Number: ON
- Country > Print Tax Invoice on Folio: ON
- Cashiering > Advanced Deposit Handling: Mode 4
- Cashiering > Default Deposit Tax Room: configured to the pseudo room used for deposit handling
- Cashiering > POS Accounts: maintained list of pseudo rooms to exclude from fiscal exports

Other relevant groups for Portugal: Reservations, Profile, Front Office, Folio, AR.

---

## Layer 3 — Role permissions

**Path:** Administration > Enterprise > Role Manager

Grant the following tasks to roles that require fiscal functionality.

- Cashiering > Fiscal Folio Generation
- Cashiering > Reprint Fiscal Folio
- Cashiering > Cancel Folio (restricted to authorised roles)
- Financials > Fiscal Management
- Reports > Country Exports
- Profile > Fiscal Profile Fields (NIF, fiscal name)

---

## Layer 4 — Transaction codes (financial foundation)

**Path:** Administration > Financial > Transaction Codes

Build the foundation of all financial reporting. Group transaction codes by purpose. Use a consistent numbering range per chain. Examples below use placeholders.

| Range | Purpose |
|---|---|
| 1xxx | Room revenue |
| 2xxx | Food and beverage |
| 3xxx | Other revenue |
| 5xxx | Adjustments and discounts |
| 6xxx | Statistical (no impact on revenue) |
| 7xxx | Payment methods |
| 8xxx | Taxes (VAT 6, 13, 23 plus city tax) |
| 9xxx | Internal (deposit ledger, deposit tax, auto credit bill) |

Mandatory transaction codes for Portuguese fiscal operation include VAT rates per CIVA, city tax, deposit ledger code, deposit tax code, payment auto credit bill code, refund codes, and statistical codes.

Each VAT transaction code must have its rate, generates, and fiscal classification configured.

---

## Layer 5 — Export mapping

**Path:** Miscellaneous > Exports > Export Mappings > Mappings [Property]

Every transaction code that posts to revenue or statistics must be mapped to a SAF-T M-code. Unmapped codes fail SAF-T validation.

Common M-code mappings used in Portuguese hospitality.

| M-code | Meaning |
|---|---|
| M01 | Exempt under Article 16 number 1 |
| M02 | Exempt under Article 6 number 6 (a) |
| M07 | Reduced rate VAT (6 percent in mainland) |
| M08 | Intermediate rate VAT (13 percent in mainland) |
| M09 | Standard rate VAT (23 percent in mainland) |
| M19 | Exempt under non-resident regime |
| M99 | Other exemption requiring narrative on folio |

Rates differ for Açores and Madeira regions per CIVA.

---

## Layer 6 — Folio types

**Path:** Administration > Financial > Cashiering Management > Folio Types

Portuguese fiscal regulation requires distinct folio types per legal document category.

| Folio type | Purpose |
|---|---|
| FT | Fatura (Invoice) |
| FR | Fatura-Recibo (Invoice-Receipt) |
| FS | Fatura Simplificada (Simplified Invoice) |
| NC | Nota de Crédito (Credit Note) |
| ND | Nota de Débito (Debit Note) |
| RG | Recibo (Receipt) |
| OR | Orçamento (Quotation, non-fiscal) |
| DT | Documento de Transporte (Transport Document, if applicable) |

Each folio type must be linked to its own ATCUD series code at Layer 7.

---

## Layer 7 — Digital signatures and ATCUD

**Path:** Administration > Financial > Digital Signatures

Configure the digital signature certificate provided by the Fiscal Partner. Configure the ATCUD series code per folio type. The ATCUD is composed of a validation code issued by AT plus a sequential number per series.

Each folio printed displays the ATCUD on the document body and within the QR code.

---

## Layer 8 — Folio reports (RTF templates)

**Path:** Reports > Manage Reports > Folios

Each folio type requires its own RTF template with the legally mandated header text (e.g. "Fatura" or "Fatura-Recibo"). The template embeds the ATCUD, the AT software certificate number, the QR code, and any required narrative for M99 exemptions.

Configure Copy Legend at Reports > Manage Reports > Manage Copy Legend to print "Original" on the first copy and "Duplicado / Triplicado" on subsequent copies.

---

## Layer 9 — Special revenue handling

### 9.1 Advance Deposits

Portugal applies VAT at the moment of deposit receipt. Configure Advanced Deposit Handling Mode 4 at Layer 2. Configure the dedicated deposit ledger transaction code and deposit tax transaction code at Layer 4. Configure the pseudo room reservation used for deposit handling at Administration > Inventory > Room Types and Rooms.

### 9.2 Half-board and Full-board packages

The room portion is taxed at 6 percent in mainland Portugal. The food portion is taxed at 13 percent. Configure the split using a UDF function on the package rate code at Administration > Financial > Rate Management > Rate Codes > [Package rate] > Packages. Standard splits in Portuguese hospitality practice are 75/25 for HB and 50/50 for FB.

### 9.3 City Tax (Taxa Municipal Turística)

Define a transaction code under range 8xxx for city tax. Build a package code with the following attributes.

- Posting Type: Add to Rate, Separate Line
- Calculation Rule: Per Adult
- Posting Rhythm: Custom Posting Schedule, Based on Night
- Maximum nights per municipality rule (Lisbon currently caps at 7 nights)
- Sell Separate: enabled
- Package Pricing: minimum 10 years of continuous date coverage required

Attach to every rate code that should include city tax.

---

## Layer 10 — FLIP fiscal integration

**Path:** Administration > Financial > Fiscal Management

This connects OPERA Cloud to the certified fiscal middleware. Configure last in the chain because it requires all transaction codes, folio types, and payment methods to exist.

### 10.1 Fiscal Partners

Path: Fiscal Management > Fiscal Partners

Add the Fiscal Partner record using credentials supplied at Layer 0.

### 10.2 Fiscal Folio Parameters

Path: Fiscal Management > Fiscal Folio Parameters

Configure FLIP_CONFIGMODE, FLIP_SERVER_ADDRESS, FLIP_PARTNER_FOLIO_TEXT, FLIP_PROPERTY_CODE. Exact values come from the Fiscal Partner.

### 10.3 Fiscal Folio Buckets

Path: Fiscal Management > Fiscal Folio Buckets

Three bucket types map OPERA codes to fiscal partner classifications.

- Article bucket: maps revenue transaction codes
- Tax bucket: maps VAT transaction codes
- Payment bucket: maps payment method codes

---

## Layer 11 — Statutory exports

**Path:** Miscellaneous > Exports > Country

### 11.1 SAF-T (PT)

Configure the SAF-T export per Oracle Portugal Fiscal Reference Guide. Export must include all transaction codes mapped to M-codes, all folios issued in the period, all payment records, and all customer records (NIF, fiscal name, address, country).

Submission to AT is monthly by the 25th of the following month.

### 11.2 Police Export (SEF BA03)

Configure the SEF export for guest notification. Field structure follows SEF specification BA03. Country code uses the 3-letter ISO 3166-1 alpha-3 code, not the 2-letter code. Common error: filter excluding "PRT" but not "PT".

Submission to SEF is per arrival.

### 11.3 INE Statistics

Configure the INE statistical export for monthly tourism statistics submission.

---

## Layer 12 — AR / Direct Bill

**Path:** Administration > Financial > AR Configuration

Configure AR account types, ageing buckets, and the AR Receipt Report. The AR Receipt Report at Reports > Manage Reports > Accounts Receivables Payment Receipt must satisfy Portuguese receipt issuance requirements.

---

## Layer 13 — Validation and go-live gate

Verification only. Do not configure further until each item below is true.

- All transaction codes mapped to M-codes
- All folio types have RTF templates with ATCUD and QR code
- Digital signatures active and tested
- SAF-T export produces non-zero rows for test period
- Police Export accepts test arrival
- Deposit handling tested end to end (deposit > check in > final folio)
- City tax posts correctly on nights 1 through max
- HB/FB VAT split posts correctly
- Fiscal Partner middleware connection validated

---

## Layer 14 — Post-go-live operations

Procedures only. Cover monthly SAF-T submission, daily SEF Police Export, monthly INE submission, fiscal partner certificate renewal, and quarterly verification of ATCUD series sequence integrity.

---

## Common issues

- **SAF-T export shows zero rows:** verify M-code mapping at Layer 5
- **Folio prints without ATCUD:** verify Digital Signatures active and folio RTF template references ATCUD field
- **City tax not posting on night 8+:** verify Custom Posting Schedule maximum nights
- **Deposit transfer at check-in duplicating VAT:** verify Advanced Deposit Handling = 4 and pseudo room reservation is checked in
- **Police Export rejects record:** verify ISO 3-letter country code, not 2-letter

---

## Quick navigation paths

| Area | Path |
|---|---|
| Country Mode | Administration > Enterprise > Properties > [Property] > Region |
| OPERA Controls | Administration > Enterprise > OPERA Controls |
| Role tasks | Administration > Enterprise > Role Manager > [Role] > Edit Tasks |
| Transaction codes | Administration > Financial > Transaction Codes |
| Export Mappings | Miscellaneous > Exports > Export Mappings |
| Folio Types | Administration > Financial > Cashiering Management > Folio Types |
| Digital Signatures | Administration > Financial > Digital Signatures |
| Folio Reports | Reports > Manage Reports > Folios |
| Fiscal Partners | Administration > Financial > Fiscal Management > Fiscal Partners |
| Fiscal Folio Parameters | Administration > Financial > Fiscal Management > Fiscal Folio Parameters |
| Fiscal Folio Buckets | Administration > Financial > Fiscal Management > Fiscal Folio Buckets |
| Country Exports | Miscellaneous > Exports > Country |
| AR Configuration | Administration > Financial > AR Configuration |

---

*Derived from publicly available Oracle documentation, Portuguese tax law (CIVA, Decreto-Lei 28/2019, Portaria 195/2020) and AT/SEF technical specifications. Not affiliated with Oracle Corporation. Licensed CC BY-NC-SA 4.0.*
