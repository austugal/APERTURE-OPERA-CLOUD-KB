# OPERA Cloud Release Notes Tracker

Index of OPERA Cloud quarterly releases with major changes per version. Living document. Use this as a starting reference and consult the official Oracle release notes for the authoritative detail per version.

Oracle publishes OPERA Cloud release notes for each quarterly version. Major releases include feature additions, deprecations, API changes and bug fixes. Customers receive advance notice of breaking changes via Oracle communication channels and the My Oracle Support portal.

---

## Reference documents

- Oracle Hospitality OPERA Cloud release notes (per version, on My Oracle Support)
- Oracle Hospitality OPERA Cloud What's New documentation
- OHIP API release notes: https://github.com/oracle/hospitality-api-docs/releases

---

## OPERA Cloud release cadence

Oracle releases OPERA Cloud on a quarterly cadence. Release naming follows the format YY.QQ where YY is the year and QQ is the quarter (1, 2, 3 or 4). Examples: 24.1, 24.2, 24.3, 24.4, 25.1, 25.2, 25.3, 25.4, 25.5.

Each release passes through.

1. Cloud preview environment for partners
2. UAT availability for customers
3. Production rollout in scheduled waves

---

## Recent releases (representative, not exhaustive)

### OPERA Cloud 25.5

Current at time of writing. Compatible with OHIP API specifications version 25.5.0.0. Subject areas include CRM, CSH, FOF, RSV, BLK, HSK, RTP, INT, INV, LOV, PAR, PMS, ROOM, ACT, EVM, GSM, OSI per the Oracle hospitality-api-docs repository.

### OPERA Cloud 25.4

Data APIs grouped resources introduced. Examples include BookingReservationExtended which consolidates reservation, block, financial and changes log data into a single resource, replacing multiple joined calls.

### OPERA Cloud 25.1

Distribution Onboarding API added. Distribution Property Controls API added. Outbound APIs introduced including Distribution Outbound Lookup and Distribution Outbound Content Notification.

### OPERA Cloud 24.4

Reporting and Analytics download link generation Postman collection added to the Oracle hospitality-api-docs repository. Custom report integration patterns formalised.

### Earlier releases

For releases prior to 24.4 consult the GitHub releases page and the My Oracle Support knowledge base. Properties on older releases should plan for incremental upgrade rather than skip-version jumps.

---

## How to consume release notes

For each new release.

1. Read the Oracle release notes (My Oracle Support)
2. Review the corresponding OHIP API release at https://github.com/oracle/hospitality-api-docs/releases
3. Identify breaking changes affecting your integrations
4. Test against the cloud preview environment if available
5. Coordinate property cutover with Oracle Customer Success
6. Communicate impact to property operations and integration partners

---

## Common patterns in release content

### New features

Functional additions to existing modules, new modules where licensed, new fiscal localisations.

### API additions

New REST endpoints in OHIP. New event types in Business Events.

### Deprecations

APIs or features marked for removal in a future release. Always provided with timeline (typically 2-3 quarter notice).

### Breaking changes

Backwards-incompatible changes. Rare. Always announced well in advance with migration guidance.

### Bug fixes and improvements

Functional and performance fixes. Listed in detail in the per-version notes.

---

## Communication channels

Oracle communicates release information via.

- My Oracle Support knowledge articles
- Oracle Hospitality customer email distributions
- Account Team briefings for key customers
- Oracle Customer Connect community
- Oracle Hospitality blog posts for major features

Integration partners additionally receive communications via the OPN Hospitality expertise track and the Developer Portal.

---

## Customer-side release management

Recommended customer-side practices.

- Subscribe to relevant My Oracle Support release note articles
- Maintain a release log per property recording version installed and rollout date
- Maintain an integration partner contact map to coordinate cross-system upgrades
- Run regression tests after each release on critical workflows (reservation, check-in, check-out, night audit, fiscal exports)
- Document and version-control any custom RTF templates, custom reports and custom exports to ensure they survive upgrades

---

## Note on this tracker

This document is a starting reference. Per-release detail is owned by Oracle and accessed via My Oracle Support. Implementation partners and consultancies maintain their own internal trackers that map release content to customer impact. This repository may be extended over time with version-specific summaries.

---

*Derived from Oracle Hospitality OPERA Cloud release documentation and the publicly available hospitality-api-docs GitHub releases. Not affiliated with Oracle Corporation. Licensed CC BY-NC-SA 4.0.*
