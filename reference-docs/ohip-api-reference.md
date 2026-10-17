# Oracle OHIP REST API Reference

Curated pointers to the official Oracle Hospitality Integration Platform (OHIP) sources and their accompanying tooling. All material referenced here is published by Oracle under the Universal Permissive License v 1.0 unless stated otherwise.

This file is **not a mirror** of Oracle's content. It is a navigation map for engineers and consultants working with OPERA Cloud REST APIs. Always pull the latest specifications directly from Oracle's repository for any production work.

---

## Canonical sources

| Resource | Purpose | URL |
|---|---|---|
| Oracle Hospitality API Docs (GitHub) | REST API JSON specifications and Postman collections, maintained by Oracle | https://github.com/oracle/hospitality-api-docs |
| Releases page | Per-release notes, deprecations, breaking changes by OPERA Cloud version | https://github.com/oracle/hospitality-api-docs/releases |
| Postman public workspace | Official Postman workspace published by Oracle Hospitality | https://www.postman.com/hospitalityapis/workspace/oracle-hospitality-apis/overview |
| OHIP User Guide (docs.oracle.com) | Authentication models, environments, gateway, partner sandbox | https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/ |
| GraphQL tooling (GraphiQL) | OHIP async event consumption tool, hosted in the same repo | https://github.com/oracle/hospitality-api-docs/blob/main/graphql/graphiql.html |
| DeepWiki overlay | AI-generated navigation overlay over the Oracle repo, useful for discovery but not authoritative | https://deepwiki.com/oracle/hospitality-api-docs |

---

## Repository structure

The Oracle repository contains three primary folders relevant to OPERA Cloud work.

### rest-api-specs

Holds the OpenAPI 3.0 JSON specifications for each subject area. Use a published release tag for
production baselines rather than treating `main` as a fixed version. Oracle's latest public GitHub
release is **26.3**, published 4 September 2026 and rechecked 11 October 2026.

Representative Property subject areas include:

- `crm.json` — Customer Relationship Management (profiles)
- `csh.json` — Cashiering and financial transactions
- `fof.json` — Front Office (check-in, check-out, room moves)
- `rsv.json` — Reservations
- `blk.json` — Block management (group bookings)
- `hsk.json` — Housekeeping
- `rtp.json` — Rate plans and rate calculations
- `int.json` — Business Events (event subscription, dequeue)
- `inv.json` — Inventory
- `lov.json` — List of Values (lookup tables)
- `par.json` — Parameter administration
- `pms.json` — General PMS operations
- `room.json` — Room and room type configuration
- `act.json` — Activities (Sales and Catering related)
- `evm.json` — Event management
- `gsm.json` — General Service Management
- `osi.json` — OPERA Service Indicators (operational signals)

Distribution subject areas exist under `rest-api-specs/distribution/` and are published when OPERA Cloud Distribution is in scope.

Data API subject areas exist under `rest-api-specs/data/` and cover bulk-read patterns including the BookingReservationExtended grouped resource introduced in v25.5.

### postman-collections

Contains the workflow-oriented Postman collections that show how to chain calls for real operational scenarios.

Documented workflows include:

- Digital check-in and check-out
- Reservation creation with payment tokenisation
- Profile creation and merge handling
- Block booking and rooming list
- Night audit triggers and post-audit retrieval
- Business Event dequeue with consumer code patterns
- OPI Token Exchange via `openPaymentBulkTokenExchange`
- Reporting and Analytics download link generation (added in v24.4)

Each collection ships with a Postman environment file. Configure separate environments for UAT and production. Never commit secrets or tokens.

### graphql

Hosts the GraphiQL HTML tool used to consume OHIP async streaming events. Useful for debugging Business Event subscriptions and validating event payload shape before wiring into a consumer.

---

## Authentication models

Two authentication patterns are documented in the OHIP user guide.

| Model | Use case | Token endpoint |
|---|---|---|
| Resource Owner Group (SSD) | Per-user identity, traditional integration users provisioned via Oracle Shared Security Domain | OAuth2 password grant against `/oauth/v1/tokens` |
| Client Credentials (OCIM) | Service-to-service integration, no human user, provisioned via OCIM (OPERA Cloud Identity Management) | OAuth2 client_credentials grant |

Integration user passwords expire after 1 year and must be rotated. Locked accounts after 10 failed logins. See `ssd-interface-service-account.md` in this repository for the full lifecycle.

Always avoid uploading API secrets or tokens to Postman cloud sync or to GitHub. Use Postman variables backed by local-only environments.

---

## Versioning

Oracle publishes versioned API specification bundles, but the API-repository tag can lag the
OPERA Cloud Services documentation release. As at 11 October 2026, Services 26.4 documentation is
published while the latest [hospitality-api-docs release](https://github.com/oracle/hospitality-api-docs/releases/tag/26.3)
is still 26.3. Do not infer availability of a 26.4 OpenAPI or Postman bundle from the Services
feature summary.

Major version markers seen in recent releases.

- OPERA Cloud API bundle 26.3, published 4 September 2026
- OPERA Cloud 25.4 (Data APIs grouped resources introduced)
- OPERA Cloud 25.1 (Distribution Onboarding API, Outbound Lookup, Content Notification)
- OPERA Cloud 24.4 (Reporting and Analytics download Postman collection added)

For any production integration, lock to a specific release of the API spec and review breaking changes in the release notes before upgrading.

---

## Upcoming major changes reviewed 2026-10-07

Oracle's [OHIP User Guide Release 26.3](https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/index.html)
(G58754-04, September 2026) contains August and September 2026 ReadMes with forward-looking
changes. These notices describe target versions; confirm the connected environment's deployed
version and gateway details before treating a change as live.

- **Reporting and Analytics 26.4 profile scope:** `profilesIndividuals` will return only
  Individual/Guest profiles. Consumers that need Company, Travel Agent or Source profiles must use
  `profilesAccounts`.
- **Reporting and Analytics 26.4 export pagination:** GraphQL Data API export requests containing
  `limit` or `offset` will be rejected. Oracle directs consumers to remove those parameters and
  use streaming export, for example with `@stream`. This notice applies to export pagination, not
  unrelated Data API operations.
- **Streaming event payloads:** Oracle's August notice says the `detail` array will contain only
  business data elements selected as filters and will omit unchanged values. The September update
  also says an element is omitted when both old and new values are null. Oracle identifies OHIP
  26.2 as the target and states that polling is unaffected.
- **Legacy GET and DELETE operations:** the February notice maps affected operations to POST-based
  `/searches` and `/deletions` replacements with parameters in JSON request bodies. The
  September update says most affected legacy operations will be unavailable from OPERA 27.3.
  During deprecation, monitor the `deprecated: true` response header; after sunset, Oracle says
  affected legacy calls return HTTP 404 with no response body.

Sources: [September 2026 ReadMe](https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/c_september_2026_readme.htm),
[August 2026 ReadMe](https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/c_august_2026_readme.htm)
and [February 2026 ReadMe](https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/c_february_2026_readme.htm).

Operational inference: inventory integrations using these APIs now. Regression-test profile type
coverage, large exports and streaming payload parsing before the relevant tenant upgrade, and
replace affected legacy endpoints well before 27.3.

---

## OPERA Cloud Services 26.4 integration changes reviewed 2026-10-11

Oracle's September 2026
[Services 26.4 feature summary](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.4/oprnc/c_feature_summary.htm)
documents integration behaviour that is not yet represented by a public 26.4
`oracle/hospitality-api-docs` bundle. Confirm the deployed tenant version and exact specification
before implementation.

| Area | Documented change | Required engineering control |
|---|---|---|
| Block create | `postBlock` can replace missing or invalid mandatory values with six configured property defaults. | Read back and compare the created block; log every substitution; alert rather than treating transport success as semantic success. |
| Block update | `putBlock` accepts `x-applyDeltaChanges=true` for partial updates; default `false` retains full-overlay behaviour. | Test omitted fields, explicit nulls, concurrent edits and replay in both modes. |
| Block/catering async writes | Start/status/info or result operations are added for status and catering-package changes. | Persist correlation IDs, poll to a terminal state, bound retries and reconcile partial/unknown outcomes. |
| Reservation rules | Auto Attachment Rules can generate a Business Event after API reservation create/update. | Correlate and deduplicate the initiating request and follow-on event. |
| Rate strategy | Central adds `BookingLimitReaches` and `BookingLimitIsLess`. | Update strict enum parsers and test subscription/control prerequisites. |
| Housekeeping query | `getHousekeepingOverview` adds discrepancy-status and queue-only filters. | Use for deterministic exception views; do not infer housekeeping write permissions. |

These are documentation-supported release-to-test cases, not sandbox-validated behaviours. No
production write, hotel connection or autonomous recovery action is authorized by this reference.

## OPI (Oracle Payment Interface) APIs

The `openPaymentBulkTokenExchange` API allows partners to exchange raw credit card numbers, typically received via third-party channels, for tokens stored in OPERA Cloud against the reservation. Requires the hotel to have Oracle Payment Interface Cloud Service purchased and enabled. Without it, the API returns a configuration error.

Oracle's [August 2026 ReadMe](https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/c_august_2026_readme.htm) announces that OPI Cloud 26.4 API traffic moves from the OHIP Gateway Endpoint to a dedicated OPI Cloud Gateway Endpoint. Oracle describes a six-month deprecation period beginning when OHIP 26.4.0 is released; this notice does not establish a calendar deadline. Check Chain Environment details for the new endpoint, update routing and test token exchange before the old route is withdrawn.

---

## Nor1 Upgrades APIs

Pre-arrival upsell APIs secured the same way as Hospitality Property APIs. Out of scope for most basic integrations but relevant for revenue uplift programs.

---

## Recommended workflow for engineers

1. Clone the official repository: `git clone https://github.com/oracle/hospitality-api-docs.git`
2. Open the relevant subject area JSON in your editor or Swagger UI
3. Import the matching Postman collection
4. Configure your environment with hotel code, gateway URL, client ID, client secret, integration user credentials
5. Authenticate against the OAuth token endpoint
6. Test against the partner sandbox before requesting access to UAT or PRD tenants. Hotel code `SAND01` on the SSD sandbox, `OHIPSB02` on the OCIM sandbox ([ohip-getting-started.md](ohip-getting-started.md))
7. Track release notes for each OPERA Cloud quarterly version

---

## Licence and attribution

The Oracle hospitality-api-docs repository is licensed under the Universal Permissive License v 1.0. This reference file in `austugal/opera-references` is licensed under CC BY-NC-SA 4.0 as per the parent repository.

This file is maintained by Tiago Fitas and is not affiliated with or endorsed by Oracle Corporation.

