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

Holds the OpenAPI 3.0 JSON specifications for each subject area. Aligned to OPERA Cloud release 25.5.0.0 at time of writing.

Subject areas published as of the 25.5 release include:

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

Oracle publishes API specifications aligned to OPERA Cloud quarterly releases. Major version markers seen in recent releases.

- OPERA Cloud 25.5 (current at time of writing)
- OPERA Cloud 25.4 (Data APIs grouped resources introduced)
- OPERA Cloud 25.1 (Distribution Onboarding API, Outbound Lookup, Content Notification)
- OPERA Cloud 24.4 (Reporting and Analytics download Postman collection added)

For any production integration, lock to a specific release of the API spec and review breaking changes in the release notes before upgrading.

---

## OPI (Oracle Payment Interface) APIs

The `openPaymentBulkTokenExchange` API allows partners to exchange raw credit card numbers, typically received via third-party channels, for tokens stored in OPERA Cloud against the reservation. Requires the hotel to have Oracle Payment Interface Cloud Service purchased and enabled. Without it, the API returns a configuration error.

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
6. Test against the partner sandbox (hotel code `SAND01`) before requesting access to UAT or PRD tenants
7. Track release notes for each OPERA Cloud quarterly version

---

## Licence and attribution

The Oracle hospitality-api-docs repository is licensed under the Universal Permissive License v 1.0. This reference file in `austugal/opera-references` is licensed under CC BY-NC-SA 4.0 as per the parent repository.

This file is maintained by Tiago Fitas and is not affiliated with or endorsed by Oracle Corporation.
