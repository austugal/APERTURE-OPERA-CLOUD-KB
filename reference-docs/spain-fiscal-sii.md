# Spain Fiscal Configuration (SII and SAF-T ES)

Configuration framework for OPERA Cloud properties operating in Spain. Covers SII real-time invoice submission, regional police exports, INE statistics, Modelo 347, and F1 through F6 invoice classifications per AEAT specification.

Transaction code numbers used in examples are placeholders. Implementing properties must use their own chain coding standards.

---

## Reference documents

- Oracle Hospitality OPERA Cloud Spain Fiscal Reference Guide (current version on My Oracle Support)
- Agencia Estatal de Administración Tributaria (AEAT) — SII technical specification
- AEAT — Modelo 347 annual third-party declaration specification
- INE Spain — Hotel occupancy survey (EOH) technical specification
- Real Decreto 596/2016 governing SII
- Police regulations per autonomous community (Mossos d'Esquadra, Ertzaintza, Guardia Civil, Cuerpo Nacional de Policía)

---

## Verifactu — not yet in force. Spain in 2026 is an SII jurisdiction

**Documented.** Real Decreto-ley 15/2025, de 2 de diciembre, BOE núm. 290 de 3 de diciembre de 2025,
pp. 157601–157607. ELI https://www.boe.es/eli/es/rdl/2025/12/02/15

Amending *disposición final cuarta* of Real Decreto 1007/2023:

> los obligados tributarios a que se refiere el artículo 3.1.a) deberán tener adaptados los sistemas
> informáticos […] antes del **1 de enero de 2027**. El resto de obligados tributarios mencionados
> en el artículo 3.1 deberán tener operativos los citados sistemas informáticos antes del
> **1 de julio de 2027**.

This is the **second** deferral; Real Decreto 254/2025 of 1 April moved the dates once already. The
previous deadline was 1 January 2026.

**Consequence for configuration: nothing in this guide changes for 2026.** Spain remains governed by
SII under Real Decreto 596/2016. Any plan, demo or checklist built on a 2026 Verifactu go-live is
describing an obligation that does not exist yet.

The article 3.1.a) group is widely reported as Corporate Income Tax contributors. That comes from
commentary, not from the amending text. **Read article 3.1 of RD 1007/2023 before telling a customer
which bucket applies to them.**

---

## Configuration layers

| Layer | Domain | Path root |
|---|---|---|
| 1 | Property foundation (Country Mode ES) | Administration > Enterprise > Properties |
| 2 | OPERA Controls | Administration > Enterprise > OPERA Controls |
| 3 | Role permissions | Administration > Enterprise > Role Manager |
| 4 | Transaction codes | Administration > Financial > Transaction Codes |
| 5 | Invoice types F1–F6 | Administration > Financial > Cashiering Management > Folio Types |
| 6 | SII configuration | Administration > Financial > Fiscal Management > SII Setup |
| 7 | Regional police export | Miscellaneous > Exports > Country |
| 8 | INE statistics | Miscellaneous > Exports > Country |
| 9 | Modelo 347 | Reports |
| 10 | Validation and go-live | Verification only |

---

## Layer 1 — Property foundation

**Path:** Administration > Enterprise > Properties > [Property]

Set Country Mode to ES (Spain). Set the Region to the autonomous community. The region drives which police authority receives guest arrival notifications.

---

## Layer 2 — OPERA Controls

**Path:** Administration > Enterprise > OPERA Controls

Enable Country Specific Functions for Spain. Enable SII submission. Configure VAT rates per Spanish IVA law.

Standard VAT rates in mainland Spain.

| Rate | Use case |
|---|---|
| 4 percent | Reduced (specific cases) |
| 10 percent | Reduced (accommodation, restaurants) |
| 21 percent | Standard |

Canary Islands use IGIC at different rates. Ceuta and Melilla use IPSI. Configure regional rate sets accordingly.

---

## Layer 3 — Role permissions

Grant SII Submission, Reprint Fiscal Folio, and Modelo 347 access to authorised roles only.

---

## Layer 4 — Transaction codes

Standard ranges per Spanish hospitality practice.

| Range | Purpose |
|---|---|
| 1xxx | Room revenue |
| 2xxx | F&B revenue |
| 3xxx | Other revenue |
| 5xxx | Adjustments |
| 6xxx | Statistical |
| 7xxx | Payment methods |
| 8xxx | IVA codes (per rate and region) |
| 9xxx | Deposit and internal ledger codes |

Map each transaction code to the correct IVA classification and Modelo 347 category.

---

## Layer 5 — Invoice types F1 through F6

AEAT defines invoice classifications used in SII submission.

| Type | Description | Use |
|---|---|---|
| F1 | Factura completa | Standard invoice |
| F2 | Factura simplificada | Simplified invoice (small amounts) |
| F3 | Factura emitida en sustitución de facturas simplificadas | Substitution of simplified invoices |
| F4 | Asiento resumen de facturas | Summary entry |
| F5 | Importaciones (DUA) | Import documents |
| F6 | Otros justificantes contables | Other accounting documents |

Folio types in OPERA Cloud must map to the correct F-type. Configure at Administration > Financial > Cashiering Management > Folio Types.

---

## Layer 6 — SII configuration

**Path:** Administration > Financial > Fiscal Management > SII Setup

SII (Suministro Inmediato de Información) requires real-time submission of invoice data to AEAT within 4 calendar days of invoice issuance.

Configure SII Web Service endpoint, digital certificate, NIF, and registration data per Oracle Spain Fiscal Reference Guide.

Confirm submission categories.

- Libro registro de facturas expedidas
- Libro registro de facturas recibidas
- Libro registro de bienes de inversión
- Libro registro de determinadas operaciones intracomunitarias

---

## Layer 7 — Regional police export

**Path:** Miscellaneous > Exports > Country

Spain requires guest arrival notification to the competent police authority within 24 hours. Format and recipient depend on autonomous community.

| Region | Authority | Format |
|---|---|---|
| Catalunya | Mossos d'Esquadra | Per Mossos specification |
| País Vasco | Ertzaintza | Per Ertzaintza specification |
| Other | Cuerpo Nacional de Policía or Guardia Civil | Per Hospederías specification |

Configure the export per the destination authority. Validate test arrivals before going live.

---

## Layer 8 — INE statistics

INE Encuesta de Ocupación Hotelera (EOH) is a monthly statistical submission required from accommodation establishments above a size threshold.

Configure the INE export at Miscellaneous > Exports > Country. Output includes occupancy by room nights, guest nationality breakdown, market segment, and revenue per available room.

---

## Layer 9 — Modelo 347

Annual declaration of operations with third parties where the total annual operation with any single party exceeds the AEAT threshold (currently EUR 3,005.06).

Generate from Reports for the calendar year. Validate against AR and supplier transactions.

---

## Layer 10 — Validation and go-live

Verification gate. Do not approve go-live until each is true.

- VAT codes correct per region (mainland, Canary, Ceuta, Melilla)
- F1 through F6 mapped to all folio types
- SII test submission accepted by AEAT
- Regional police export accepted by the correct authority
- INE export validated against test month
- Modelo 347 dry run produces expected totals

---

## Common issues

- SII submission rejected with timestamp error: confirm server clock and timezone match AEAT requirements
- Police export rejected by Mossos but accepted by Ertzaintza: each authority uses a distinct format, not generic
- IGIC posting incorrectly in Canary Islands property: confirm regional VAT code set selected at property
- Modelo 347 missing supplier: confirm supplier exceeds annual threshold and is registered in AR

---

*Derived from publicly available Oracle documentation, Spanish tax law (Real Decreto 596/2016, Ley General Tributaria), AEAT technical specifications and INE EOH methodology. Not affiliated with Oracle Corporation. Licensed CC BY-NC-SA 4.0.*
