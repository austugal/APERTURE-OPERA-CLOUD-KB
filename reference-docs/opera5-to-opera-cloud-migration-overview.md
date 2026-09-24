# OPERA 5 to OPERA Cloud Migration Overview

The global migration from OPERA 5 (legacy on-premises) to OPERA Cloud (current strategic product) is in progress across the Oracle Hospitality customer base. This document covers the migration pathway, the tools involved, data scope, training implications and the parallel run model.

For specific tool details see `migration-tools-overview.md` in this repository.

---

## Reference documents

- Oracle Hospitality OPERA Cloud migration methodology (My Oracle Support)
- Oracle Hospitality OPERA Cloud Migration Portal (OCMP) user guide
- Oracle Hospitality OPERA Cloud Migration On-Premises Client Application (OCMO) user guide
- Oracle Hospitality OPERA 5 documentation for the source system

---

## Why migrate

Oracle Hospitality is investing strategic capability in OPERA Cloud. OPERA 5 receives maintenance updates but does not gain new functionality. Modern integrations via OHIP, native cloud scaling, faster release cadence, reduced infrastructure overhead, and the absence of OWS or OXI infrastructure to maintain locally drive most migrations.

---

## Migration models

### Managed migration via OCMP

Oracle drives the migration through the OCMP portal. Customer involvement is supervisory and validation-focused.

Sequence.

1. Oracle Sales raises migration request via OCMP
2. OCMO installed at source OPERA 5 property
3. Source data extracted and uploaded to OCMP
4. Oracle Migration Services validates extract and maps to target tenant
5. Customer reviews mapping
6. Cutover window agreed
7. Migration executed
8. Customer validates target tenant
9. Hypercare initiated

### Big-bang migration

All properties of a chain migrate simultaneously on a single weekend. High risk, high reward. Suitable only for chains with strong central operations and acceptable downtime tolerance.

### Phased migration

Properties migrate in waves over weeks or months. Lower risk, longer total programme. Most common pattern.

### Parallel run

Source OPERA 5 and target OPERA Cloud run side-by-side for a validation period before final cutover. Allows operational comparison but doubles operating overhead during the parallel window.

---

## Data scope

Standard migration includes.

| Data category | Scope |
|---|---|
| Profiles | All active profiles (guests, companies, agents, sources, contacts) |
| Future reservations | All reservations with arrival date >= cutover date |
| In-house reservations | Currently checked-in guests |
| Block bookings | All active and future blocks with rooming lists |
| AR accounts and balances | Open accounts, balances, statement history per agreed scope |
| Stay history | Per agreed scope (typically 2 to 5 years for loyalty continuity) |
| Configuration | Replicated via Oracle Hospitality Consulting Accelerator |

What is typically not migrated automatically.

- Historical financial detail beyond the agreed window
- Custom RTF templates (must be rebuilt against new tenant)
- Custom reports (must be rebuilt against new R&A)
- IFC8 device interfaces (require re-installation and reconfiguration)
- OXI integrations (typically replaced by OHIP)

---

## Configuration migration

Configuration is rarely identical between OPERA 5 and OPERA Cloud due to different feature sets and OPERA Controls model. Standard approach.

1. Map OPERA 5 configuration to OPERA Cloud equivalent
2. Identify gaps (OPERA Cloud features not in OPERA 5)
3. Identify deprecations (OPERA 5 features not in OPERA Cloud)
4. Build target configuration in PIW
5. Apply configuration to OPERA Cloud UAT
6. Validate against operational scenarios
7. Replicate to OPERA Cloud production for go-live

---

## Training implications

Operational workflows differ between OPERA 5 and OPERA Cloud. Common areas of training delta.

- Navigation paradigm: OPERA Cloud uses modern web UI, OPERA 5 uses Java client
- Workflow optimisation: OPERA Cloud streamlines several workflows
- New features: OPERA Cloud includes capabilities not in OPERA 5
- Different report navigation
- OPERA Controls model fully replaces OPERA 5 Application Settings

Plan for refresher training across all property roles.

---

## Interface migration

Property interfaces frequently require redesign.

| OPERA 5 interface | OPERA Cloud strategic path |
|---|---|
| OWS web services | OHIP REST APIs |
| OXI message broker | OHIP Business Events + REST |
| IFC8 device interfaces | IFC8 reinstalled against OPERA Cloud |
| OPI payment interface | OPI reconfigured for OPERA Cloud |

Each integration partner must confirm OPERA Cloud readiness before migration.

---

## Fiscal considerations

Country-specific fiscal configuration must be rebuilt in OPERA Cloud.

- Digital signature certificates re-applied
- Fiscal partner credentials reconfigured
- Folio templates rebuilt as RTF for BI Publisher
- Country exports rebuilt
- ATCUD series codes re-registered with AT (Portugal)
- SII enrolment validated against new tenant identity (Spain)

Fiscal continuity is one of the most sensitive aspects of migration.

---

## Customer involvement

Standard customer-side commitments.

- Property leadership available for kick-off, design and cutover
- Subject matter experts available for UAT
- IT team for IFC8 reinstall and network configuration
- Finance team for fiscal validation
- Operations team for parallel run and post-go-live validation

---

## Go-live and cutover

Cutover window typically scheduled during the lowest-occupancy period for the property. Detailed cutover plan covers.

- Pre-cutover: data freeze, final extract
- Cutover execution: data load, validation, interface activation
- Post-cutover: hypercare, fiscal validation, business continuity

See `cutover-guide.md` in this repository for the operational cutover playbook.

---

## Common pitfalls

- Underestimating configuration delta and treating it as a like-for-like move
- Insufficient testing of fiscal exports against the new tenant
- IFC8 reinstall scheduling missed, causing device interface outage at cutover
- Partner not OHIP-ready on cutover date
- Custom RTF templates not rebuilt before cutover, causing folio printing errors
- Training delivered too far in advance of go-live, reducing retention

---

## Best practices

- Allocate at least 12 weeks for a single-property migration with managed services
- Run a parallel period for fiscal validation regardless of overall migration model
- Engage Oracle Customer Success early on for migration scheduling
- Coordinate all integration partners on a single timeline
- Document every configuration decision in the PIW
- Train property staff in the final 2 weeks before go-live

---

*Derived from Oracle Hospitality OPERA Cloud migration methodology and OCMP/OCMO documentation. Not affiliated with Oracle Corporation. Licensed CC BY-NC-SA 4.0.*
