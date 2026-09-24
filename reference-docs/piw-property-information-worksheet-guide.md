# Property Information Worksheet (PIW) Guide

The PIW is the standard Oracle pre-implementation Excel workbook that captures the configuration choices for a property before any technical configuration begins. It is the authoritative source for the build phase. Errors or omissions in the PIW propagate into UAT and ultimately production.

This document describes the typical PIW structure tab by tab, who owns each section, and how to validate completeness. The PIW itself is an Oracle deliverable. This document is a companion guide, not a replacement.

---

## Reference documents

- Oracle Hospitality OPERA Cloud PIW (template provided by Oracle Consulting or implementation partner)
- Oracle Hospitality OPERA Cloud Configuration Best Practices
- Oracle Hospitality OPERA Cloud Property User Guide

---

## Ownership model

| Tab category | Customer owner | Implementer guidance |
|---|---|---|
| Property identity | General Manager + Director of Finance | Implementer reviews for completeness |
| Inventory | Director of Rooms + Housekeeping | Implementer reviews for OPERA conventions |
| Rate structure | Director of Revenue Management | Implementer validates against rate strategy |
| Market and source codes | Director of Sales + Revenue | Implementer maps to chain standards |
| Transaction codes | Director of Finance + Controller | Implementer validates against fiscal requirements |
| Interfaces | IT Manager + Director of Finance | Implementer configures partner credentials |
| Fiscal | Director of Finance + Local tax advisor | Implementer validates country-specific requirements |
| Training | HR or operations leader | Implementer schedules and delivers |

---

## Typical PIW tabs

### Tab 1 — Property identity

Captures.

- Legal entity name and trading name
- Tax ID numbers (VAT, NIF, NIE per country)
- Physical address with postal code
- Multi-property chain relationship
- Star rating and category
- Property opening date
- Operating hours

### Tab 2 — Property inventory

Captures.

- Total rooms by room type
- Floor map with room numbering
- Connecting rooms
- Suite configurations
- Accessibility-equipped rooms
- Non-sleeping rooms (pseudo rooms) for deposits, transit, AR, group masters
- Room features and amenities

### Tab 3 — Rate codes and rate strategy

Captures.

- BAR (Best Available Rate) structure
- Negotiated corporate rates
- Group rate templates
- Promotional rate windows
- Package rates (HB, FB, breakfast, parking, spa)
- Rate restrictions and minimum stays
- Yield strategy and seasonality

### Tab 4 — Market and source codes

Captures.

- Market segment hierarchy
- Source code hierarchy
- Origin of booking categories
- Country of origin for guest analytics
- Channel attribution

### Tab 5 — Transaction codes

Captures.

- Revenue transaction codes by department (Rooms, F&B, Spa, Other)
- Tax transaction codes per local fiscal requirement
- Payment method transaction codes
- Adjustment and rebate transaction codes
- Statistical transaction codes
- Internal codes (deposit ledger, deposit tax, auto credit bill)

### Tab 6 — Folio types and templates

Captures.

- Folio types per fiscal requirement
- Folio template language and design
- Custom header text per folio type
- Logo placement
- Multi-language requirements

### Tab 7 — Interfaces and integrations

Captures.

- POS systems and integration type (IFC8 or OHIP)
- Key card system and integration
- Voicemail, video, minibar, telephone interfaces
- RMS partner and integration credentials
- Channel manager partner and credentials
- Payment service provider and OPI configuration
- Back office accounting platform and export format
- Loyalty programme integration
- CRM integration

### Tab 8 — Fiscal configuration

Captures.

- Country Mode
- Region within country
- VAT rates and exemption codes
- Digital signature certificate details
- Fiscal Partner identity (where applicable)
- ATCUD series codes (Portugal)
- SII enrolment status (Spain)
- Police export requirement and authority
- Statistics export requirement

### Tab 9 — Profile types and CRM

Captures.

- Mandatory profile fields per profile type
- Duplicate detection rules
- Profile merge approval workflow
- GDPR consent and retention policies
- Marketing communication preferences

### Tab 10 — Reservations workflow

Captures.

- Deposit policy per rate type
- Cancellation policy per rate type
- Hold time and guarantee rules
- Auto routing rules
- Reservation type and status workflow

### Tab 11 — Cashiering

Captures.

- Cashier shift structure
- Petty cash limits
- Currency exchange rates and source
- Multi-currency operation
- Settlement rules

### Tab 12 — Reports and analytics

Captures.

- Standard reports required at end of day
- Custom reports needed at go-live
- Recipient email lists for scheduled reports
- Distribution format (PDF, Excel, CSV)
- Retention period

### Tab 13 — Housekeeping

Captures.

- Housekeeping team structure
- Room cleaning sequence
- Discrepancy handling workflow
- Out of order procedures
- Linens and amenity inventory tracking

### Tab 14 — AR and direct billing

Captures.

- AR account types
- Ageing buckets
- Credit limits per account type
- Statement frequency and delivery method
- Dunning policy

### Tab 15 — Training plan

Captures.

- Roles requiring training
- Training delivery schedule
- Trainer assignments
- Train-the-trainer needs
- Certification or sign-off required per role

### Tab 16 — Cutover plan

Captures.

- Target go-live date
- Data freeze date for legacy system
- Migration data scope
- Hypercare team and duration
- Roll-back criteria

---

## Validation checklist

Before submitting the PIW to the build team.

- All mandatory fields completed across all tabs
- Cross-tab consistency verified (transaction codes referenced in fiscal tab exist in transaction code tab)
- Local tax advisor sign-off on fiscal tab
- Director of Finance sign-off on cashiering and AR tabs
- Director of Revenue Management sign-off on rate and market tabs
- General Manager sign-off on overall PIW

---

## Common PIW issues

- Transaction codes inconsistent between fiscal tab and cashiering tab
- Missing pseudo rooms causing deposit handling configuration to fail
- Tax rates not aligned with current local regulation (rates change frequently)
- Interface partner credentials incomplete, blocking partner onboarding
- Market and source codes too granular, causing maintenance overhead post go-live
- Training plan unrealistic for property operational rhythm

---

*Derived from Oracle Hospitality OPERA Cloud implementation methodology and PIW template documentation. Not affiliated with Oracle Corporation. Licensed CC BY-NC-SA 4.0.*
