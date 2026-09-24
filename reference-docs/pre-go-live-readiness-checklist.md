# Pre Go-Live Readiness Checklist

Verification checklist for the days immediately preceding OPERA Cloud cutover. The checklist serves as the formal gate that authorises cutover execution.

Run this checklist at T minus 14 days, T minus 7 days and T minus 1 day. Any red item on T minus 1 triggers a go/no-go decision with the Steering Committee.

---

## Reference documents

- Oracle Hospitality OPERA Cloud Cutover Guide
- Oracle Hospitality OPERA Cloud implementation methodology
- Property-specific Configuration Workbook (PIW)
- Property-specific cutover plan

---

## T minus 14 days

### Configuration completion

- All configuration items in the PIW completed in UAT tenant
- Configuration Workbook signed off by property and chain owners
- Custom RTF templates for folios, registration cards, confirmation letters validated
- Custom reports configured in R&A and validated against test data
- Custom exports for SUN, SAP or back office configured and tested

### Interfaces and integrations

- IFC8 installed and configured at property
- IFC8 message routing tested for every connected device (POS, key card, voicemail, video, minibar, telephone)
- OHIP integration partner credentials provisioned
- OHIP Business Events subscribers tested for event consumption
- Channel manager test connection successful (rate push, inventory push, ARI sync)
- RMS test integration successful (rate recommendations posting, decision back to RMS)
- OPI configured per acquiring bank, terminal tested

### Fiscal and country

- Country Mode set correctly
- All transaction codes mapped to fiscal classifications
- Digital signatures active with valid certificates
- Fiscal Partner credentials configured (where applicable)
- Test fiscal exports submitted and accepted (SAF-T, SII, INE, Police)

### Data migration

- Profile import from legacy validated for completeness and accuracy
- Future reservations import validated against legacy
- AR balances reconciled between legacy and OPERA Cloud
- Guest Ledger balance verified
- Deposit Ledger balance verified
- Stay history imported where required for loyalty continuation

### People

- All key user training completed
- Train-the-trainer sessions delivered to property champions
- Operational manuals customised to property configuration
- Hypercare team named, on roster, accommodation booked if travelling

---

## T minus 7 days

### UAT sign-off

- Full system integration test pass
- User acceptance test sign-off received from property
- All P1 and P2 defects closed
- All P3 defects have agreed resolution timeline (during hypercare)

### Cutover preparation

- Cutover plan reviewed by property, chain, Oracle and partners
- War room location confirmed (physical or virtual)
- Conference bridge configured
- On-call roster published with phone numbers
- Roll-back plan documented and approved
- Communication plan to staff and guests in place

### Environmental

- Network capacity verified at property
- Backup internet connection tested
- Workstations imaged and reachable
- Printers configured for new folio templates
- Mobile devices for housekeeping and front desk tested
- Wi-Fi credentials for OPERA Cloud workstations validated

### Data freeze preparation

- Date for legacy system freeze agreed and communicated
- Last day to enter reservations in legacy system communicated
- Process for handling guest-facing changes during freeze documented

---

## T minus 1 day

### Final go/no-go gate

Mandatory pre-cutover review with all stakeholders. Each item below must be GREEN to proceed.

- All T minus 7 items remain green
- No outstanding P1 defects
- Cutover team fully available for the cutover window
- Property operational status normal (no concurrent major events)
- Network and infrastructure healthy
- Fiscal certification documentation in hand
- Roll-back capability verified (last successful UAT backup available)

If any item is amber, the team works the issue and re-convenes. If any item is red, the Steering Committee makes the go/no-go call.

### Day-before tasks

- Final data export from legacy system staged
- Workstations logged out and locked
- Welcome packs prepared for property staff (quick reference cards, support contacts)
- Cutover lead briefs all participants in pre-cutover call
- Pre-cutover dinner or rest plan for the cutover team

---

## Document outputs

- Signed Go-Live Readiness Report
- Cutover plan v final
- Communication summary to stakeholders
- Go/No-go decision record

---

*Derived from Oracle Hospitality OPERA Cloud implementation methodology and Cutover Guide. Not affiliated with Oracle Corporation. Licensed CC BY-NC-SA 4.0.*
