# OPERA Cloud Migration Tools Overview

Oracle ships several distinct tools for loading configuration and transactional data into OPERA Cloud. Each has a specific use case, owner, scope, and limit. This document maps what each one does, when to use which, and what they leave behind.

---

## Reference documents

- Oracle Hospitality OPERA Cloud Migration documentation (My Oracle Support)
- Oracle Hospitality OPERA Cloud Migration On-Premises Client Application User Guide (OCMO)
- Oracle Hospitality OPERA Cloud Migration Portal User Guide (OCMP)
- Oracle Hospitality OPERA Cloud Property User Guide — Data Import section
- Oracle Hospitality OPERA Cloud Cutover Guide

---

## Tools

### Native Data Import

**Path:** Toolbox > System Setup > Import Data

The customer-facing utility built into OPERA Cloud. Used by property staff and consultants for loading configuration and transactional data via CSV templates.

| Attribute | Value |
|---|---|
| Owner | Customer (property or chain) |
| Maximum file size | 15 MB per file |
| Import window | 14-day rolling cycle per template |
| Supported scopes | Profiles, accounts, reservations, blocks, room and rate grid, events |
| Validation | Built-in CSV column and reference checks |
| Output | Success/error log per row |

Typical use: loading initial profile data, supplier accounts, future reservations imported from a legacy system, or block bookings ahead of go-live.

### Oracle Hospitality Consulting Accelerator

The Oracle Consulting tool that fetches configuration from a source OPERA Cloud tenant and loads it into a target tenant. Used for multi-property rollouts where the first property serves as a template for subsequent properties.

| Attribute | Value |
|---|---|
| Owner | Oracle Consulting (not customer-facing) |
| Scope | Configuration replication |
| Use case | Multi-property rollout, template propagation, chain standardisation |
| Limitations | Configuration only, not transactional data |

Engagement is via Oracle Consulting Services. Not available as a self-service customer tool.

### OCMO (OPERA Cloud Migration On-Premises Client Application)

The on-premises client installed at the source OPERA 5 property. Extracts operational data and prepares it for upload to the OCMP portal.

| Attribute | Value |
|---|---|
| Owner | Oracle Hospitality (managed migration) |
| Location | On-premises at the source OPERA 5 property |
| Scope | Operational data extract from OPERA 5 |
| Process | Configuration push, data extract, validation pre-checks |

OCMO is used in tandem with OCMP for managed OPERA 5 to OPERA Cloud migrations.

### OCMP (OPERA Cloud Migration Portal)

The Oracle-managed portal where migration requests are tracked, data is uploaded from OCMO, and migration jobs are scheduled and executed.

| Attribute | Value |
|---|---|
| Owner | Oracle Hospitality (managed service) |
| Initiation | Oracle Sales team raises migration request |
| Customer involvement | Reviews mapping, approves cutover window, validates post-migration |
| Output | Operational data loaded into target OPERA Cloud tenant |

Customers do not interact with OCMP directly. Oracle drives the migration process through OCMP on the customer's behalf.

### PIW (Property Information Worksheet)

Pre-implementation Excel workbook capturing property configuration choices. Foundation for the build phase. Customer-completed before any configuration begins.

| Attribute | Value |
|---|---|
| Owner | Customer (filled with implementer guidance) |
| Format | Excel workbook with multiple tabs |
| Scope | Captures property identity, room inventory, rate structure, market codes, source codes, transaction codes, interfaces, fiscal settings, training plan |
| Output | Authoritative source for property configuration in UAT |

A separate PIW companion guide in this repository describes the structure tab by tab.

### Partner migration tools

Third-party accelerators built by Oracle partners and consultancies to speed migration. These are partner-owned tools and require partner engagement.

Examples documented in Oracle partner ecosystem material.

- HRS Data Migration Tool (HRS Hospitality and Retail Systems): transfers profiles, reservations and configurations via OHIP
- THP migration utility
- RobosizeME RPA automation for PIW completion
- Redwood Migration Accelerator for QA observation and remediation

Partner tools augment, but do not replace, the Oracle-managed migration via OCMO/OCMP.

---

## Selection guidance

| Scenario | Tool |
|---|---|
| New property, new build, customer-driven | PIW + Native Data Import |
| OPERA 5 to OPERA Cloud, managed migration | OCMO + OCMP via Oracle Consulting |
| Multi-property rollout, template replication | Oracle Hospitality Consulting Accelerator (Oracle Consulting engagement) |
| Profile import from legacy CRM | Native Data Import (CSV) |
| Reservation backfill from legacy PMS | Native Data Import or OCMP depending on volume |
| Partner-accelerated migration | Engage HRS, THP, RobosizeME or equivalent |

---

## Common pitfalls

- Native Data Import: 15 MB file size limit forces splitting of large datasets
- OCMO data extract requires source OPERA 5 to be at a supported version
- PIW completion is the single biggest risk to implementation timeline; allocate sufficient customer time
- Partner accelerators require partner certification and Oracle awareness

---

*Derived from Oracle Hospitality OPERA Cloud migration documentation. Not affiliated with Oracle Corporation. Partner tools mentioned remain trademarks of their respective owners. Licensed CC BY-NC-SA 4.0.*
