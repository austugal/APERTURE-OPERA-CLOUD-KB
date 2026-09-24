# OPERA Cloud Release Watch

What Oracle has published about OPERA Cloud, OHIP and the partner ecosystem, in one place. Verified 23 September 2026.

Tier legend. **Documented**: Oracle wording, source linked. **Inference**: our reading, labelled.

## Current release

| Release | Readiness guide | Published | Status |
|---|---|---|---|
| 26.3 | G55991-02 | August 2026 | Latest on docs.oracle.com at 23 Sep 2026 |
| 26.2 | G50860-02 | April 2026 | Previous |
| 26.1 | G48601-01 | February 2026 | |
| 25.5 | G43592-02 | December 2025 | |

Sources: [26.3 documentation home](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.3/), [26.3 feature summary](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.3/oprnc/c_feature_summary.htm), [26.2 feature summary](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.2/oprnc/c_feature_summary.htm). Patch release notes sit on My Oracle Support and need a login.

## 26.3 highlights for implementation teams

Documented, from the 26.3 feature summary.

- **Cashiering**: Additional Charges added. Total Package Rate tax calculation added. Simplified Settlement Workflow updated to run with Fiscal Folio Printing. Pay by Link for batch deposits. Virtual Credit Card token handling. Credit card PAN restrictions on check number and profile fields.
- **Country specific**: France multiple updates. Germany eStatistik. Italy export templates and nationality statistics in R+A. Mexico fiscal payment numbers for AR. Poland Debit Note and Faktura VAT restrictions. Portugal: auto credit bill for deposit on check-in updated, Debit Folio parameter no longer displayed. Vietnam police report in R+A. Canada guest vehicle registration. Generic PoliceReport1 updated.
- **Client relations**: address auto-suggestion and validation. Property-specific control over guest identification (PII) storage and visibility.
- **Integrations**: Async Queue UI for monitoring asynchronous API requests.
- **Property APIs**: async SetRatePlan, CRM masked or unmasked data by user task, CRMCFG operations, getDepositFolioInfo, flex field operations, rate plan copy and schedule operations.
- **Reports**: 28-day forecast, holding ledger for revenue recognition, manager report and yearly forecast added to R+A. STAT_REGION_YEARVIEW, RATEOVERRIDE and RATECAT_FORE_CLS matrix reports deprecated.
- **Front desk and mobile**: multiple keys across multiple key interfaces, eSign merge codes and guest-facing eSign landing page.

Inference: the deprecated matrix reports are the item most likely to break a property's daily pack after upgrade. Check report schedules before the upgrade window.

## AI in OPERA Cloud

Oracle announced OPERA Cloud Assistant on 16 June 2026: natural language help inside OPERA Cloud workflows, room assignment recommendations, generated rate code descriptions and translation, stated as available at no extra cost to existing customers. Source: [Oracle press release](https://www.oracle.com/news/announcement/new-ai-capabilities-in-oracle-opera-cloud-supercharge-hotel-operations-2026-06-16/).

Note for the video library: Oracle withdrew the older *OPERA Cloud Digital Assistant* and *AI Room Assignment* videos. The library links to Oracle's written transcripts instead.

## OHIP and APIs

- Official API specifications and Postman collections: [oracle/hospitality-api-docs on GitHub](https://github.com/oracle/hospitality-api-docs/releases). The 26.2 release added Property, Distribution and NOR1 26.2 specifications and Data APIs 26.1.
- Postman workspace: [Oracle Hospitality APIs](https://www.postman.com/hospitalityapis/oracle-hospitality-apis/overview).
- Platform overview: [Oracle Hospitality Integration Platform](https://www.oracle.com/hospitality/integration-platform/).
- Library references: [OHIP API reference](opera-doc.html?file=ohip-api-reference.md), [OHIP business events](opera-doc.html?file=ohip-business-events-reference.md), [Certified integrations](opera-doc.html?file=certified-integrations-ohip.md).

## Partner ecosystem

Oracle lists validated partner integrations on [Oracle Cloud Marketplace, Hospitality](https://marketplace.oracle.com/consumer+industries/listings?product=Hospitality+Cloud&hidden=product), with each listing's purpose, supported products and support contacts. Oracle's partner overview: [PMS and POS integration partners](https://www.oracle.com/hospitality/pms-pos-integration-partners/).

Rule: confirm a partner's current listing and the OPERA Cloud version it was validated against before it goes into a statement of work.

## Fiscal and legal changes to track

- [OPERA Cloud 26.x fiscal changes](opera-doc.html?file=opera-cloud-26x-fiscal-changes.md)
- [France fiscal reference](opera-doc.html?file=france-fiscal.md): e-invoicing from 1 September 2026, cash register attestation restored in February 2026
- [EMEA country fiscal watch](opera-doc.html?file=emea-fiscal-watch.md)
- [Portugal fiscal master](opera-doc.html?file=portugal-fiscal-master.md) and [Spain SII](opera-doc.html?file=spain-fiscal-sii.md)
