# Oracle-Certified Integrations for OPERA Cloud

This document explains the Oracle Hospitality partner certification framework, the validation programmes that authorise an integration to be listed on Oracle Cloud Marketplace, and the typical partner ecosystem categories that integrate with OPERA Cloud and Simphony POS.

The list of certified partners changes frequently. Always consult the Oracle Cloud Marketplace and the official OHIP partner directory for the current authoritative list.

---

## Reference documents and authoritative sources

- Oracle Cloud Marketplace: https://cloudmarketplace.oracle.com/marketplace
- Oracle Hospitality PMS and POS Integration Partners: https://www.oracle.com/hospitality/pms-pos-integration-partners/
- Oracle Hospitality Integration Platform (OHIP) overview: https://www.oracle.com/hospitality/integration-platform/
- Oracle Partner Network (OPN) Hospitality expertise track
- Oracle Validated Integration programme documentation
- OHIP user guide on docs.oracle.com

---

## How certification works

Integration partners that wish to publicly integrate with OPERA Cloud or Simphony POS go through a defined Oracle process.

### Step 1 — Join Oracle Partner Network (OPN)

OPN membership is required. The Hospitality expertise track grants access to the Oracle Hospitality Developer Portal, the OHIP sandbox, and partner support channels.

### Step 2 — Compliance requirements

Partner must have.

- An existing, commercially available product
- PCI security compliance where the integration touches payment data
- An active sales channel
- A defined integration scope and use case

### Step 3 — Build via OHIP

New integrations use OHIP REST APIs and Business Events. Legacy integrations may still use OXI, OWS or Kiosk APIs but these are not the strategic path.

The Hospitality Developer Portal provides API documentation, sandbox access, sample collections, and a partner management console.

### Step 4 — Oracle Validated Integration

Submission for Oracle Validated Integration verifies that the partner's product integrates correctly with OPERA Cloud and follows Oracle's technical standards. Validation has a one-time cost (publicly documented in the range of USD 7,000 to USD 15,000 depending on integration complexity). Some programmes also require certified personnel in implementation or support roles.

Validated integrations are published on Oracle Cloud Marketplace and the official partner directory. They appear when Oracle Sales searches for an interface to a hotel's chosen technology partner.

### Step 5 — Maintenance

Validation is renewed periodically. Lapsed renewals do not stop existing installations from working, but unpublish the integration from Oracle Cloud Marketplace and the partner directory. This means new prospects discovering Oracle Hospitality will not see the partner offered as a supported option.

---

## Self-service vs validated

Hotels and partners can build private, custom integrations using OHIP without going through Oracle Validated Integration. These work, but Oracle's support stops at the OHIP layer. For a custom integration, Oracle troubleshoots the OPERA Cloud and OHIP side, but not the partner-side configuration or message formatting.

Validated integrations get full Oracle support coverage including end-to-end troubleshooting against the validated reference configuration.

---

## OHIP billing model

OHIP changes the legacy charging model.

- Hotel access to OHIP is included in OPERA Cloud Property Management Foundation. Hotels do not pay per interface on the OHIP side.
- Integration partners are billed monthly based on API call consumption per Oracle Cloud account.
- Partners can pool consumption across multiple hotels and applications within a single Oracle Cloud account.

This contrasts with the legacy OXI/OWS model that charged hotels per interface license.

---

## Typical partner ecosystem categories

The OHIP ecosystem covers a broad set of categories. The list below reflects categories publicly documented by Oracle Hospitality and visible on Oracle Cloud Marketplace at the time of writing. Specific partner names are not enumerated here because the Marketplace listing is authoritative and changes.

### Channel managers and distribution

Connect OPERA Cloud to OTAs, GDS, metasearch and direct distribution. Standard partners include SiteMinder, Sabre SynXis, Profitroom, D-EDGE and similar.

### Revenue management systems (RMS)

Recommend rates and inventory restrictions back to OPERA Cloud. Standard partners include IDeaS G3 RMS, Atomize, Duetto, RevControl, and others.

### Central reservation systems (CRS)

Source-of-truth reservation systems for chains. Pass reservations into OPERA Cloud and receive stay records. Partners include Sabre SynXis CR, Pegasus, Travelclick (Amadeus), and others.

### Customer relationship management (CRM)

Profile enrichment, guest history aggregation, marketing automation. Partners include dailypoint, Cendyn, Revinate, and others. Major enterprise CRM platforms (Salesforce, Oracle Fusion CX, SAP CX) integrate via Oracle Integration Cloud Hospitality Adapter or partner-built OHIP integrations.

### Loyalty platforms

Loyalty programme management beyond OPERA Cloud's native loyalty module. Partners include Cendyn Loyalty, ICR, Stash, and others.

### Payment processing and PCI gateways

PCI-compliant payment processing and tokenisation. Connect via OPI (Oracle Payment Interface). Partners include FreedomPay, Shift4 (formerly 3C Payment), Adyen, Worldline, Elavon, and others.

### Point of sale (POS)

Restaurant and outlet POS that posts charges to guest folios. Simphony POS is the Oracle native option. Third-party partners include Lightspeed, Toast, Square (limited markets), and others.

### Guest experience and digital concierge

Mobile check-in, in-room tablets, guest messaging, digital concierge. Partners include Mews, Operto, Volara, Maestro mobile, and others.

### Door locks and in-room technology

Electronic locking systems, in-room minibars, smart room controls. Standard partners include ASSA ABLOY (VingCard), dormakaba, Salto, Mews systems, and others.

### Spa and golf management

Spa appointment, golf tee time, retail integration. Partners include Book4Time, Concept Software, Agilysys Stay, and others.

### Housekeeping and maintenance

Mobile housekeeping coordination, predictive maintenance, asset management. Partners include Optii Solutions, hotelkit, Knowcross, and others.

### Business intelligence and analytics

Beyond OPERA Cloud Reporting and Analytics. Partners include HotStats, Demand Calendar, Snapshot, ProfitSword, and others.

### Back office and accounting

ERP and accounting integration. Major platforms include SAP, Oracle Fusion ERP, Sun Systems Infor, NetSuite, Microsoft Dynamics. Connect via Oracle Integration Cloud Hospitality Adapter or partner-built integrations.

### Survey and reputation management

Guest feedback collection and online reputation monitoring. Partners include Medallia, ReviewPro (Shiji), Revinate, TrustYou, and others.

### Energy management

Room energy controls, occupancy-based HVAC. Partners include Honeywell, Inncom, and others.

### Workforce management

Staff scheduling, labour cost management. Partners include UKG (Kronos), Hotel Effectiveness, and others.

### Insurance, fiscal, and compliance middleware

Country-specific fiscal compliance middleware (FLIP and equivalents), insurance and travel protection. Partners vary by country.

### AI and automation

AI chatbots, voice assistants, predictive analytics, RPA. Partners include Volara, Asksuite, RobosizeME, and others.

---

## How to find the current authoritative list

1. Visit https://cloudmarketplace.oracle.com/marketplace and filter by Hospitality category
2. Visit https://www.oracle.com/hospitality/pms-pos-integration-partners/ for Oracle's curated partner page
3. Log in to the Oracle Hospitality Developer Portal (OPN Hospitality track required) and browse the Partner Solutions section
4. Contact Oracle Hospitality Account Team for a tailored partner shortlist for specific use cases

---

## Disclaimer

Partner names referenced in this document are illustrative and reflect publicly available information at the time of writing. Inclusion is not an endorsement. Exclusion is not a comment on capability. Always validate current certification status via Oracle Cloud Marketplace and the partner's own documentation before specifying a partner in any project.

All trademarks belong to their respective owners. Oracle, OPERA, OPERA Cloud, Simphony, OHIP and OPI are trademarks of Oracle Corporation.

---

*Derived from publicly available Oracle Hospitality partner documentation and Oracle Cloud Marketplace. Not affiliated with Oracle Corporation. Licensed CC BY-NC-SA 4.0.*
