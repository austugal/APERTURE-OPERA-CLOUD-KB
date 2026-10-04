# Four ways a machine-consumed OPERA Cloud report schedule fails without raising an error

Every Oracle claim below was fetched from docs.oracle.com and quoted verbatim on 2026-09-08. Field
observations are labelled as such and carry no customer, property or vendor identifiers.

**Source**

- Oracle Hospitality OPERA Cloud User Guide, *Managing Scheduled Reports*, Release 24.4, G13336-05,
  published April 2025.
  https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.4/ocsuh/t_reports_manage_scheduled_reports.htm
- The same guidance appears in the Release 25.2 edition of the page, G27190-04, published August
  2025. Wording on every passage quoted here is unchanged across the two releases.

---

## Why this page exists

When a third party consumes an OPERA Cloud report rather than calling an API, the integration
acquires a set of failure modes that produce no error on either side. The property sees green
screens. The vendor sees missing or wrong data. Support time goes into proving a negative.

Every mechanism below is documented by Oracle. What is not documented, and what this page is for, is
that all four are silent, and that three of the four are settings a competent administrator would
choose deliberately and correctly by ordinary OPERA reasoning.

## 1. The file format is a data integrity control, not a preference

Oracle lists seven formats as available:

> File Format: Select a file format from the list. Available options are HTML, RTF, PDF, XML,
> Delimited, Delimited Data and Excel (for selected BI Publisher-based reports).

Then, in a note attached to that same field:

> It is recommended to use only Delimited and Delimited Data file formats for reports with simple
> tabular layouts. Delimited and Delimited Data file formats should not be selected for reports
> that have group-by's or other complex layouts that can cause duplication of rows or prevent rows
> from generating in the report.

Read those two passages together and the consequence is sharper than either alone. Delimited Data is
offered on every report, and is warned against on any report with a group-by. An extract built for a
revenue or business intelligence platform, carrying occupancy or revenue grouped by date, room type
or market segment, is squarely in the warned category.

So choosing Delimited Data for such an extract is not a formatting mismatch with the consumer. Per
Oracle it can **duplicate rows or stop rows generating**. The file arrives, the delivery reports
success, the row count is wrong, and nothing anywhere reports a fault.

**The general rule worth carrying:** if a report contains a group-by and a machine parses it,
Delimited and Delimited Data are the wrong choice and XML is the safe one. That is worth auditing
across every machine-consumed schedule in an estate, not only the one under investigation.

## 2. A delivery status of SUCCESSFUL is scoped more narrowly than it reads

Executed Reports is usually where an investigation stops, because the status line says the delivery
worked. Oracle defines what that column actually covers:

> The Detailed Status column indicates the destination mode, address and delivery status for each
> report.

Destination mode, address, delivery status. **Not ingestion.** A line reading `EMAIL-<address> -
SUCCESSFUL` is the OPERA-side equivalent of an SMTP accept. It is a true statement about generation
and hand-off, and it is silent on whether the receiving parser accepted the file, rejected it, or
was sent a file that did not contain what was requested.

This matters commercially as much as technically. It licenses a precise and defensible answer to a
customer: from the OPERA side these deliveries are operational, and the open question sits with the
vendor. That is a stronger position than either denying the problem or accepting it.

## 3. One schedule cannot do the work of two, and the execution count proves which you have

A third party onboarding a historical feed needs two deliveries, and Oracle models them as two
different schedule objects rather than one schedule that happens to run twice:

> Once Only: Select this option if you want the report to only generate once. Otherwise, proceed to
> select the Repeat option.

The date windows come from documented offsets:

> As many reports require date parameters; the report scheduler supports the setup of calculated
> dates (ie +/- offset from the business date) so that a reoccurring report generates with the
> required date criteria.

> Offset: Enter a negative (past) or positive (future) date value.

A typical pairing is a Once Only historical export reaching back roughly three years, and a Repeat
daily export reaching back a week. The recurring feed alone cannot build a pace or pickup comparison
against last year, so the vendor cannot complete onboarding without the historical set, and the
symptom presents as ongoing synchronisation failure rather than a missing one-off job.

**Field observation, not documented.** The discriminator is the execution count, not the status. A
schedule carrying a multi-year historical extract does not have an execution history a handful of
rows long. A short history on the schedule that is supposed to hold the backfill means the Once Only
object was never created or was pointed elsewhere. That single number moves the diagnosis off
delivery and onto configuration, and it is visible on the same screen the investigation had already
reached.

Oracle provides two supporting tools on the same screens. `View Destinations` sits on the Actions
menu of each schedule, which matters because near-identically named reports routinely go to
different recipients on a property onboarded more than once. And `Validate Date` resolves an offset
against a chosen start date and displays the resulting `Date Parameter Value`, so the intended
window can be proven before anything is run.

## 4. A schedule can exist and be invisible to the person looking for it

> The Report Groups listed in search are based on the report group tasks assigned to your role.

"No historical schedule is configured" and "my role cannot see the group it sits in" are the same
screen. Before concluding that something was never built, confirm the account doing the looking can
see every relevant report group.

## The order that works

1. `Reports > Manage Reports > Manage Scheduled Reports`. Do the schedules exist, are they toggled
   on, and can this role see every relevant report group.
2. `View Executed Reports`. Read Detailed Status for scope, then count the executions.
3. Check the file format against what the consumer parses, and against Oracle's group-by warning.
4. Only then ask the vendor to confirm receipt and ingestion, which is the one fact neither the
   scheduler nor the property can observe.

## A note on whose specification wins

**Field observation.** Where a vendor supplies an onboarding document specifying the schedule
configuration, that document is the source of truth and generic OPERA reporting judgement is
secondary. A file that is more complete than the specification desynchronises a parser as reliably
as one that is less complete. When the two disagree, resolve it with the vendor before changing the
schedule rather than inside it, and record the document version alongside the schedule, because when
the vendor revises its specification the integration breaks with every OPERA screen still green.

---

*Prepared from Oracle documentation fetched 2026-09-08. Menu paths and field names should be
verified against the release in front of you before being relied on.*
