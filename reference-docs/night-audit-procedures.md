# OPERA Cloud Night Audit Procedures

The Night Audit is the daily closing process that transitions the system from one business date to the next. It validates revenue, posts recurring charges, advances the business date, and produces statistical and financial reports for the operating day.

---

## Reference documents

- Oracle Hospitality OPERA Cloud Property User Guide — Night Audit section
- Oracle Hospitality OPERA Cloud Reporting and Analytics User Guide
- Oracle Hospitality OPERA Cloud Cashiering User Guide

---

## When the night audit runs

Properties choose a time of day for the audit, typically between 02:00 and 04:00 local time when activity is lowest. The audit is run by Night Audit staff with appropriate role permissions. Some chains run it as a fully automated end-of-day procedure with manual verification only on exceptions.

---

## Pre-audit verification

Before running the audit, complete these checks.

| Check | Path |
|---|---|
| All in-house guests posted | Financials > Front Desk > In House |
| Open folios reviewed | Financials > Cashiering > Open Folios |
| Cashier closures completed for the day | Financials > Cashiering > Cashier Closure |
| All cash and credit deposits posted | Financials > Cashiering |
| Arrivals due in confirmed or no-showed | Front Desk > Arrivals |
| Departures checked out or extended | Front Desk > Departures |
| Routing instructions verified | Per reservation |
| Outstanding posting batches processed | Per interface |

---

## Audit steps

### Step 1 — Open the Night Audit

Path: Front Desk > End of Day

The system displays a dashboard of pending tasks per business date.

### Step 2 — Resolve outstanding items

The audit will not advance the business date while these conditions exist.

- Arrivals expected but not arrived (must be no-showed or extended)
- Departures expected but not checked out (must be checked out or extended)
- Open cashier shifts (must be closed)
- Unposted interface charges (must be posted)

### Step 3 — Run end-of-day procedures

The system executes a defined sequence.

1. Post room and tax for all in-house reservations
2. Post fixed charges (rate code packages, city tax, daily charges)
3. Post no-show charges where configured
4. Run rate-based revenue calculation
5. Update statistical buckets
6. Advance the business date
7. Run mandatory end-of-day reports
8. Trigger configured business events (OHIP subscribers receive event notifications)
9. Release locks for next business day operations

### Step 4 — Validate post-audit reports

Standard reports produced.

- Manager Flash
- Trial Balance
- Daily Revenue Report
- Adjustment and Rebate Report
- Statistics Report
- Forecast and Pace Reports
- Out-of-Balance Report (must be zero)

### Step 5 — Submit fiscal exports

Where country exports run daily (e.g. Police Export in Spain and Portugal), trigger these immediately after audit completion.

---

## Common audit blockers

- **Open cashier:** locate cashier ID, close from Financials > Cashiering > Cashier Closure
- **Open folio with balance:** settle or transfer per property policy
- **Unposted IFC8 batch:** check interface status at Toolbox > Interfaces; reprocess
- **Unconfirmed expected arrival past 23:00:** no-show or contact reservation owner
- **Out of balance:** review Trial Balance and Adjustment Report for unauthorised changes; resolve before advancing

---

## Post-audit verification

After business date advances.

- Confirm business date matches expected new value
- Confirm SAF-T or country-specific exports submitted where applicable
- Confirm interface partners (IDeaS, channel manager, RMS) received end-of-day data
- Confirm OHIP business events were dequeued by integration partners

---

## Day-of-arrival exceptions

Guests arriving after the audit but before the new business date physical day end are checked in to the next business date. This is normal behaviour. The arrival date on the reservation reflects the OPERA business date, not the wall-clock arrival time.

---

*Derived from Oracle Hospitality OPERA Cloud Property User Guide. Not affiliated with Oracle Corporation. Licensed CC BY-NC-SA 4.0.*
