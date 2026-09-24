# Daily Night Audit Checklist

Step-by-step checklist for the Night Auditor running OPERA Cloud end-of-day. Designed as a printable single-page reference for property staff. Each section must complete before the next begins.

For full procedural context see `night-audit-procedures.md` in this repository.

---

## Reference documents

- Oracle Hospitality OPERA Cloud Property User Guide — Night Audit section
- Property-specific Night Audit Standard Operating Procedure

---

## Pre-audit (T minus 1 hour)

| Step | Path | Verified |
|---|---|---|
| Review In House report | Financials > Front Desk > In House | ☐ |
| Confirm all arrivals processed | Front Desk > Arrivals | ☐ |
| Confirm all departures checked out | Front Desk > Departures | ☐ |
| Check no-show list and process | Front Desk > Arrivals | ☐ |
| Review open folios with balance | Financials > Cashiering > Open Folios | ☐ |
| Close all cashier shifts | Financials > Cashiering > Cashier Closure | ☐ |
| Verify interface batches posted | Toolbox > Interfaces | ☐ |
| Verify all cash deposits posted | Financials > Cashiering | ☐ |
| Print pre-audit Trial Balance | Reports > Manage Reports | ☐ |

---

## Open Night Audit

| Step | Path | Verified |
|---|---|---|
| Open Night Audit dashboard | Front Desk > End of Day | ☐ |
| Resolve all blockers shown on dashboard | As prompted | ☐ |
| Confirm no in-house guest in arrival status | Dashboard | ☐ |

---

## Run end-of-day procedures

| Step | Action | Verified |
|---|---|---|
| Run Post Room and Tax | Click Start on dashboard | ☐ |
| Run Fixed Charges posting | Automatic after Room and Tax | ☐ |
| Run No-Show charges | Automatic | ☐ |
| Confirm interface end-of-day messages sent | Toolbox > Interfaces | ☐ |
| Confirm Business Events dequeued | OHIP Console (if applicable) | ☐ |
| Confirm business date advanced | Top right of screen | ☐ |

---

## Mandatory post-audit reports

| Report | Path | Verified |
|---|---|---|
| Trial Balance (must balance) | Reports > Manage Reports | ☐ |
| Manager Flash | Reports > Manage Reports | ☐ |
| Daily Revenue Report | Reports > Manage Reports | ☐ |
| Adjustment and Rebate Report | Reports > Manage Reports | ☐ |
| Statistics Report | Reports > Manage Reports | ☐ |
| Forecast and Pace Reports | Reports > Manage Reports | ☐ |
| Out-of-Balance Report (zero) | Reports > Manage Reports | ☐ |

---

## Fiscal and statutory exports

Run only on properties subject to these obligations. Confirm post-audit because audit must complete first.

| Export | Path | Verified |
|---|---|---|
| Police arrival export (receiving authority confirmed in writing per property; e.g. Mossos in Catalonia. Portugal: SEF was dissolved in 2023, see `portugal-fiscal-master.md` 11.2) | Miscellaneous > Exports > Country | ☐ |
| Submission confirmation received | Per authority | ☐ |
| SAF-T (if running daily) | Miscellaneous > Exports > Country | ☐ |
| SII submission (Spain, real-time) | Per AEAT | ☐ |
| INE statistics (monthly, end of month only) | Miscellaneous > Exports > Country | ☐ |

---

## Back office export

| Step | Path | Verified |
|---|---|---|
| Generate General Ledger export | Miscellaneous > Exports > General | ☐ |
| Validate export totals against Trial Balance | Manual reconciliation | ☐ |
| Deliver export to back office system | Per integration | ☐ |
| Confirm back office import success | Per integration | ☐ |

---

## Reconciliation and handover

| Step | Verified |
|---|---|
| Reconcile cash, credit card and other payment totals | ☐ |
| Sign off Trial Balance | ☐ |
| Brief day shift on any open items or exceptions | ☐ |
| File audit pack per property policy | ☐ |
| Update audit log spreadsheet or system | ☐ |

---

## Issues encountered

If any step fails, log the issue in the property's incident register and escalate per severity.

| Severity | Examples |
|---|---|
| P1 | Audit will not run, business date will not advance, fiscal submission rejected by authority |
| P2 | Out of balance after audit, interface failure with material revenue impact |
| P3 | Specific report failure with available workaround |
| P4 | Cosmetic or training issues |

---

*Derived from Oracle Hospitality OPERA Cloud Property User Guide. Not affiliated with Oracle Corporation. Licensed CC BY-NC-SA 4.0.*
