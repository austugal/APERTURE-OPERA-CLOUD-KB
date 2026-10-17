# OPERA Cloud Release Watch

What Oracle has published about OPERA Cloud, OHIP and the partner ecosystem, in one place. Release index rechecked 13 October 2026. Historical 26.3 highlights below retain their earlier review scope.

Tier legend. **Documented**: Oracle wording, source linked. **Inference**: our reading, labelled.

## Current release

| Release | Readiness guide | Published | Status |
|---|---|---|---|
| 26.4 | G58711-02 | September 2026 | Listed on Oracle Hotels index 11 Oct 2026; selected-feature capture |
| 26.3 | G55991-02 | August 2026 | Previous |
| 26.2 | G50860-02 | April 2026 | Previous |
| 26.1 | G48601-01 | February 2026 | |
| 25.5 | G43592-02 | December 2025 | |

Sources: [26.3 documentation home](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.3/), [26.3 feature summary](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.3/oprnc/c_feature_summary.htm), [26.2 feature summary](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.2/oprnc/c_feature_summary.htm). Patch release notes sit on My Oracle Support and need a login.

## 26.4 initial capture

See Oracle's [Services 26.4 feature summary](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.4/oprnc/c_feature_summary.htm).
The repository's selected-feature capture remains internal while review continues. Oracle's
[Hotels index](https://docs.oracle.com/en/industries/hospitality/hotels.html) lists Services and
Distribution 26.4 separately. A listed release does not establish a property's upgrade date.

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

Oracle announced OPERA Cloud Assistant on 16 June 2026: natural language help inside OPERA Cloud
workflows, room assignment recommendations, generated rate code descriptions and translation,
stated as available at no extra cost to existing customers. Source:
[Oracle press release](https://www.oracle.com/news/announcement/new-ai-capabilities-in-oracle-opera-cloud-supercharge-hotel-operations-2026-06-16/).

The 26.4 User Guide now documents the native feature as
[Ask Oracle AI Agent](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.4/ocsuh/c_getting_started_ask_oracle.htm).
It is incrementally released, enabled per property by General parameter
`ASK ORACLE [AI_CHATBOT_IN_UI]`, and can appear at hub level when at least one property enables it.
Oracle documents contextual product information and how-to guidance, multilingual conversation,
source links where available, feedback, message IDs, history where available and optional voice
input. The documentation reviewed 10 October 2026 does **not** establish transactional read/write
operations, OHIP or MCP access, or autonomous workflow execution. Treat those as separate
integration/product hypotheses requiring explicit API and permission evidence.

A broader review of Oracle's already-published September 2026 feature summary identified additional
native 26.4 AI-assisted functions: check-in reservation summaries, profile-based booking/package
suggestions, housekeeping-note translation, maintenance-image analysis that prefills remarks,
room-type description generation, and rate/channel description generation. Each has its own OPERA
Control or availability boundary; the user remains in the workflow. These are newly captured older
release details, not features newly published on 10 October. See
[the 26.4 release file](releases/opera-cloud-26.4.md) for the documented boundaries and implementation
implications. Product discovery must check this native baseline before proposing duplicate tools.

Note for the video library: Oracle withdrew the older *OPERA Cloud Digital Assistant* and *AI Room
Assignment* videos. The library links to Oracle's written transcripts instead.

## OHIP and APIs

- Official API specifications and Postman collections: [oracle/hospitality-api-docs on GitHub](https://github.com/oracle/hospitality-api-docs/releases). The latest published bundle is **26.3**, released 4 September 2026 and rechecked 11 October 2026. OPERA Cloud Services 26.4 documentation is published, but no 26.4 API bundle is listed there yet.
- The 26.2 bundle added Property, Distribution, NOR1, Data APIs and Security 26.2 specifications, plus the OHIP 26.2 streaming GraphQL schema.
- Oracle's [August 2026 ReadMe](https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/c_august_2026_readme.htm) announces a dedicated OPI Cloud Gateway Endpoint for OPI Cloud 26.4, with a six-month transition beginning when OHIP 26.4.0 is released. Check Chain Environment details, reroute OPI calls and test before the old OHIP route is withdrawn.
- Oracle's [September 2026 ReadMe](https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/c_september_2026_readme.htm) says Reporting and Analytics 26.4 narrows `profilesIndividuals` to Individual/Guest profiles and rejects `limit`/`offset` on GraphQL export requests; use `profilesAccounts` for organisation profiles and streaming export for large data sets.
- The same notice says streamed event `detail` arrays omit unselected, unchanged and both-null elements, while polling is unaffected, and sets OPERA 27.3 as the sunset boundary for most GET/DELETE operations replaced by POST `/searches` and `/deletions` patterns. Inventory and regression-test affected consumers before upgrade. See the [February 2026 ReadMe](https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/c_february_2026_readme.htm) for the replacement pattern.
- Oracle's already-published 26.4 feature summary adds integration behaviours with material test implications: `postBlock` can substitute configured defaults for missing or invalid mandatory fields; `putBlock` adds opt-in delta updates through `x-applyDeltaChanges`; block/catering status and catering-package updates gain asynchronous start/status/result operations; and Auto Attachment Rules can emit a follow-on reservation Business Event. These details were newly captured on 11 October, not newly published that day. Require read-back validation, explicit overlay/delta tests, terminal-state polling, idempotent recovery and event deduplication.
- Central rate-strategy APIs add `BookingLimitReaches` and `BookingLimitIsLess`; strict enum consumers must accept them only where the required subscription and controls are active.
- Postman workspace: [Oracle Hospitality APIs](https://www.postman.com/hospitalityapis/oracle-hospitality-apis/overview).
- Platform overview: [Oracle Hospitality Integration Platform](https://www.oracle.com/hospitality/integration-platform/).
- Library references: [OHIP API reference](opera-doc.html?file=ohip-api-reference.md), [OHIP business events](opera-doc.html?file=ohip-business-events-reference.md), [Certified integrations](opera-doc.html?file=certified-integrations-ohip.md).

## OPERA Fiscal Integration Solution 26.4

Oracle now publishes a consolidated public release baseline for
[OPERA Fiscal Integration Solution 26.4](https://docs.oracle.com/en/industries/hospitality/opera-fiscal-integration-solution/26.4/).
Release Notes G60422-01, September 2026, cover OFIS Cloud and OFIS Premise. This was newly discovered
on 12 October; the underlying release is not new that day.

Material support implications:

- OFIS can place masked, user-safe folio fiscal diagnostics in the OPERA Cloud Changes Log so staff
  can classify partner rejections without direct adapter-log access.
- Fiscal-partner validation text returned to OPERA Cloud is capped at 350 bytes; the complete
  response remains in the diagnostic details. Incident tooling must not treat the short UI message
  as the complete error.
- OFIS respects the OPERA-configured Fiscal Timeout Period and returns clearer timeout or invalid/
  empty-response messages for Generic partner delivery.
- EFSTA health-check reporting is corrected to avoid false endpoint-down UI errors.
- France Generic JSON/Universal Payload gains optional posting, property-identity and e-invoice
  addressee fields. Brazil moves SNRHOS/FNRHOS processing to updated mappings and SERPRO v2; Qatar
  removes a deprecated new-delivery option.

See the [26.4 release record](releases/opera-fiscal-integration-solution-26.4.md). No Portugal or
Spain country-specific change is listed in the consolidated 26.4 notes. That absence is not proof
that every country implementation guide is unchanged. Country, product, fiscal-partner, licensing
and compatibility applicability still require Oracle documentation or support confirmation.

## Partner ecosystem

Oracle lists validated partner integrations on [Oracle Cloud Marketplace, Hospitality](https://marketplace.oracle.com/consumer+industries/listings?product=Hospitality+Cloud&hidden=product), with each listing's purpose, supported products and support contacts. Oracle's partner overview: [PMS and POS integration partners](https://www.oracle.com/hospitality/pms-pos-integration-partners/).

Rule: confirm a partner's current listing and the OPERA Cloud version it was validated against before it goes into a statement of work.

## Fiscal and legal changes to track

- **Spain — announced, not enacted:** on 5 October 2026 the Ministry of Finance announced an intended
  postponement of pending SIF/VERI*FACTU obligations until October 2028. AEAT still publishes the
  binding 1 January/1 July 2027 dates. Keep 2027 as the compliance baseline until an amending measure
  is published in the BOE; do not infer an OPERA configuration change from the announcement alone.
  Sources: [Ministry notice](https://www.hacienda.gob.es/sgt/gabsehacienda/nota-informativa-verifactu.pdf)
  and [AEAT VERI*FACTU hub](https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu.html).
- [OPERA Cloud 26.x fiscal changes](opera-doc.html?file=opera-cloud-26x-fiscal-changes.md)
- [France fiscal reference](opera-doc.html?file=france-fiscal.md): e-invoicing from 1 September 2026, cash register attestation restored in February 2026
- [EMEA country fiscal watch](opera-doc.html?file=emea-fiscal-watch.md)
- [Portugal fiscal master](opera-doc.html?file=portugal-fiscal-master.md) and [Spain SII](opera-doc.html?file=spain-fiscal-sii.md)

