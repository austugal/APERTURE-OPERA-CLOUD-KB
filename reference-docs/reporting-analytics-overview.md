# OPERA Cloud Reporting and Analytics Overview

OPERA Cloud Reporting and Analytics (R&A) is the integrated reporting platform built on Oracle BI Publisher and Oracle Analytics. It provides standard reports out of the box, custom report capability, ad hoc analyses and scheduled report delivery.

This document covers the R&A architecture, subject areas, standard vs custom report patterns and integration points.

---

## Reference documents

- Oracle Hospitality OPERA Cloud Reporting and Analytics User Guide (My Oracle Support)
- Oracle BI Publisher documentation
- Oracle Analytics documentation
- OPERA Cloud Reporting and Analytics download API documentation in hospitality-api-docs (from v24.4)

---

## Architecture

R&A consists of three layers.

### Data layer

Subject areas exposing OPERA Cloud operational data optimised for reporting. Examples.

- Reservations
- Profile
- Cashiering and revenue
- Statistics and occupancy
- Blocks and groups
- Housekeeping
- Loyalty
- Accounts Receivable

### Reporting layer

BI Publisher templates for formatted reports (folios, registration cards, confirmation letters, financial reports). Oracle Analytics for visualisation and ad hoc analysis.

### Delivery layer

Scheduled report distribution via email, SFTP, or in-platform viewing. Download API for programmatic access to reports.

---

## Standard reports

OPERA Cloud ships with hundreds of standard reports covering.

- Front desk operations (arrivals, departures, in-house, room status)
- Cashiering (trial balance, manager flash, daily revenue, adjustments)
- Reservations (forecast, pace, no-show, cancellation)
- Statistics (occupancy, ADR, RevPAR, market segment, source breakdown)
- Group and block management
- Housekeeping (room status, discrepancy, OOO/OOS)
- AR (ageing, statements, dunning)
- Commissions
- Loyalty
- Fiscal and statutory reports

Standard reports are filtered by property, date range, role-based access and other dimensions.

---

## Custom reports

Properties and chains often need reports tailored to their operating model. Custom reports are built via.

### BI Publisher template customisation

Standard reports use BI Publisher templates that can be cloned and modified. Common customisations.

- Custom folio formats per fiscal requirement
- Custom registration cards with property branding
- Custom confirmation letters with multi-language support
- Custom statistics dashboards combining standard subject areas

### Custom queries via subject areas

For ad hoc analysis, business users build queries against subject areas using Oracle Analytics. No development required, drag-and-drop interface.

### Custom reports for fiscal compliance

SAF-T, Modelo 347 and other country-specific exports often require custom report adjustments to match the latest specification version.

---

## Folio and document templates

Document templates (folios, registration cards, confirmation letters, credit card vouchers) are RTF files edited in Microsoft Word with BI Publisher merge codes.

Key merge codes include.

- Reservation fields (reservation ID, arrival, departure, room number, rate)
- Profile fields (guest name, address, NIF, country)
- Folio fields (folio number, total, VAT breakdown, ATCUD, QR code)
- Property fields (legal name, address, tax ID, fiscal certificate)

Conditional logic in BI Publisher allows different sections to print based on context (e.g. print VAT M99 narrative only when M99 is used).

---

## Scheduled distribution

Reports can be scheduled to run automatically and delivered via.

- Email (PDF, Excel, CSV)
- SFTP to a specified server
- In-platform inbox for users

Scheduling parameters include recurrence, distribution list, parameters per run (e.g. previous day's date).

---

## Integration via R&A download API

From OPERA Cloud 24.4 onward, a Postman collection in the hospitality-api-docs repository documents how to generate and retrieve R&A reports programmatically.

Use cases.

- Pull daily exports into a back office system
- Trigger fiscal exports as part of an automated end-of-day flow
- Feed business intelligence platforms with OPERA Cloud data
- Email reports to external recipients beyond the standard distribution

---

## Common customisation requests

| Request | Approach |
|---|---|
| Custom folio format per country | BI Publisher RTF template per folio type |
| Custom registration card with photo space | BI Publisher RTF |
| Custom housekeeping report by floor | Oracle Analytics ad hoc analysis |
| Group rooming list in specific format for venue | BI Publisher RTF |
| Custom General Ledger export for back office | Custom export configured at Miscellaneous > Exports |
| Custom Modelo 347 report | BI Publisher RTF with conditional logic |
| Custom commission report by source | Oracle Analytics or BI Publisher |

---

## Common issues

- RTF template edit lost after upgrade because customisation was not version-controlled
- Custom export totals do not match Trial Balance due to filter mismatch
- ATCUD or QR code not printing because the merge code reference is incorrect in the custom template
- Custom report performance degraded due to lack of subject area filters

---

## Best practices

- Version-control all custom RTF templates in Git
- Document every custom report with its purpose, owner, parameters and validation method
- Test custom reports against each OPERA Cloud quarterly release
- Maintain a templates library reusable across properties of the same chain

---

*Derived from Oracle Hospitality OPERA Cloud Reporting and Analytics User Guide and Oracle BI Publisher documentation. Not affiliated with Oracle Corporation. Licensed CC BY-NC-SA 4.0.*
