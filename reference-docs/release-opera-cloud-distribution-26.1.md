# OPERA Cloud Distribution 26.1

| | |
|---|---|
| **Product** | Oracle Hospitality OPERA Cloud Distribution |
| **Release** | 26.1 |
| **Oracle doc ID** | G53143-01 |
| **Published** | March 2026 |
| **Source** | https://docs.oracle.com/en/industries/hospitality/opera-cloud-distribution/26.1/ohdrn/c_feature_summary.htm |
| **Verified** | 2026-09-10 |

> Distribution 26.1 is **March 2026**. OPERA Cloud Services 26.1 is **February 2026**. Same number,
> different month, different doc set.

Six features, all under DISTRIBUTION CHANNELS, all API changes. This is the largest Distribution
feature release of the three 26.x releases.

---

## Feature list, as published

| Feature | Scale | Detail read? |
|---|---|---|
| API — `getReservation` added, `putReservation` updated | **LARGER** | yes, below |
| API — Shop Service: `getPropertyAlternateOffers` added | not stated | **no** |
| API — Shop Service: `getPropertyCalendar` enhanced | SMALL | **no** |
| API — Shop Service: `getProperties`, `getPropertyOffers`, `getPropertyOffer` account types enhancement | SMALL | **no** |
| API — Shop Service: `getPropertyOffers` and `getPropertyOffer` cancel policy enhancements | **LARGER** | yes, below |
| API — Shop Service: `getPropertyOffers` and `getPropertyOffer` package details enhancement | SMALL | **no** |

Four of the six detail pages have **not** been read. Their titles above are quoted verbatim from
Oracle's feature summary table and nothing beyond the title is asserted for them. Both LARGER-scale
features were read in full and are below.

---

## `getReservation` added, `putReservation` updated

**Scale:** LARGER.

Oracle: "A new API `getReservation` operation is added in the Distribution Reservation service to
retrieve by OPERA Cloud Confirmation Number, Reservation Id, or external reference. The existing API
`putReservation` operation is enhanced to support the session reservation commit and ignore actions."

**Commentary.** Worth pausing on: `getReservation` had to be **added**. Until 26.1 the Distribution
Reservation service could write a reservation but could not read one back. Any partner needing to
confirm what OPERA actually stored had to infer it from the write response or go around the service.
Three retrieval keys now exist — confirmation number, reservation ID and external reference — and the
third is the one that matters for a channel holding its own booking reference.

The `putReservation` commit and ignore actions expose session-level control the operation did not
previously offer.

**Not documented:** what `getReservation` returns relative to what was posted, and whether the commit
and ignore actions are transactional across a multi-room booking.

## Shop Service cancel policy enhancements

**Scale:** LARGER.

Oracle: `getPropertyOffers` and `getPropertyOffer` are enhanced to support **OPERA Cloud tiered
cancellation policies, Grace Period Duration, and the Grace Period Advanced Booking Window**.

The response carries a `cancellationPolicies` array. Oracle's example shows three stacked policies on
one offer: a `GRACE` policy with a zero-amount penalty and `offsetFromBookingDate: 1`, a `15DAYS`
policy at a flat 50 USD with `offsetFromArrival: 15`, and a `7DAYS` policy at 50 **percent** with
`offsetFromArrival: 7`. Each carries an `absoluteDeadline` and a rendered `penaltyDescription` such
as "Cancel latest by 2025-12-05 18:00 to avoid penalty of 50.00 USD."

Note the mixed basis: `basisType` is `FlatAmount` on two tiers and `Percentage` on the third, within
the same offer.

**Impact, Oracle's words:** *"SHOP Channels may receive multiple cancellation policies when
applicable. If a channel cannot support multiple cancellation policies, properties should not
configure tiered cancellation policies or grace-period settings for that channel's rates."*

**Steps to enable, Oracle's words:**
- Enable OPERA Cloud Control **Tiered Cancel Penalty Schedules** to use tiered cancellation penalties
- Configure OPERA Cloud Control **Grace Period Duration** to allow cancellations without penalty
  within the defined grace period

**Commentary.** This is the same shape of trap that 26.2 repeats for deposits, and 26.1 is where it
starts. A property-side commercial decision — tiered cancellation, or a grace period — publishes an
array that a partner may not consume, and **nothing in the OPERA configuration screen warns about
it**. The guest-facing consequence is worse here than for deposits: a channel that reads only the
first policy shows the guest the grace-period tier, penalty zero, on a rate that actually charges 50
percent seven days out.

Same procedural control: before enabling Tiered Cancel Penalty Schedules or Grace Period Duration on
a channel-published rate, confirm per channel that the partner consumes a `cancellationPolicies`
array longer than one.

**Not documented:** what a channel that cannot handle the array receives; ordering guarantees within
the array; and how the Grace Period Advanced Booking Window interacts with the tiers.

---

## Resolved issues

Not captured for this release. The 26.1 resolved issues chapter was not read.

---

*Part of the [per-version release file set](_INDEX.md). Created 2026-09-10, never deleted, updated in*
*place. Four unread feature detail pages are listed above and are the next work on this file.*
