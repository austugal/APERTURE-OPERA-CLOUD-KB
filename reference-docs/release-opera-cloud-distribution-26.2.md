# OPERA Cloud Distribution 26.2

| | |
|---|---|
| **Product** | Oracle Hospitality OPERA Cloud Distribution |
| **Release** | 26.2 |
| **Oracle doc ID** | G55487-01 |
| **Published** | April 2026 |
| **Source** | https://docs.oracle.com/en/industries/hospitality/opera-cloud-distribution/26.2/ohdrn/c_feature_summary.htm |
| **Verified** | 2026-09-10 |

> Distribution is a separate doc set from OPERA Cloud Services, with its own doc IDs and its own
> publication dates. Distribution 26.2 and OPERA Cloud Services 26.2 are both April 2026, but that
> alignment is coincidence, not a rule — see 26.3, where they are a month apart.

Three features, all under DISTRIBUTION CHANNELS, all API changes.

---

## 1. API — Reservation Services support additional elements

**Scale:** SMALL. **Steps to enable:** none listed.

Applies to `postReservationNotif`, `putReservationNotif`, `getReservationNotif`, `postReservation`,
`putReservation`, `getReservation`.

Oracle: Distribution Reservation Notification and Distribution Book operations are enhanced to return
`totalTax` and `totalFees` (such as resort/destination fees) as **separate elements** in the response.
The response also includes a new `codeType` element within the tax breakdown to indicate whether each
charge is a tax or a fee. "Prior to this change, the response aggregated taxes and fees in total
amount and returned only a combined total, limiting accurate representation of financial line items."

Oracle's example returns city, state and county taxes with `"codeType": "Tax"` alongside a $25 resort
fee with `"codeType": "Fee"`, then `"totalTax": 23.79` and `"totalFees": 25.00` under a combined
`"amount": 48.79`.

## 2. API — Shop Service: separate total tax and surcharge

**Scale:** SMALL. **Steps to enable:** Yes.

Same change applied to the SHOP operations. `getPropertyOffers`, `getPropertyOffer` and
`getPropertyAddons` responses gain `codeType` in the tax breakdown plus `totalTax` and `totalFees`.

**`getPropertyAlternateOffers` and `getPropertyCalendar` receive `totalTax` and `totalFees` only —
no per-charge `codeType`.** So summary figures are available everywhere; the itemised classification
is not. A consumer needing the breakdown must call the offer operations.

**Steps to enable, Oracle's words:** "Channel partners intending to leverage these new fields need to
update their integration mapping."

**Commentary.** A resort fee is not a tax, and until 26.2 the Distribution API could not say so.
Everything downstream inherited the ambiguity: a channel displaying the breakdown either lumped the
fee in with tax, misstating the tax line, or guessed from the free-text description. Neither is
defensible where a jurisdiction requires displayed tax to be accurate, and mandatory-fee display is
exactly where regulators have been moving.

There is no OPERA Control to switch — the new elements appear whether or not the partner reads them.
So it is additive and safe on the OPERA side, and entirely partner-side work to realise any benefit.
Worth saying to a customer who asks why an upgrade changed nothing: it did, on the wire. Nobody is
consuming it yet.

**Not documented:** whether `codeType` carries values beyond `Tax` and `Fee`; how a charge is
classified — transaction code configuration, tax setup, or a Distribution-side flag, which determines
who at the property can get it wrong; and behaviour for a package element that is partly fee and
partly revenue.

## 3. API — Shop Service: tiered deposit policy schedules

**Scale:** SMALL. **Steps to enable:** Yes.

Oracle: `getPropertyOffers` and `getPropertyOffer` are enhanced to support the OPERA Cloud tiered
deposit policies feature. The response carries a `depositPolicies` array; each entry holds
`revenueType`, `policyCode`, a `deadline` (offset or absolute), `basisType`, `amount`, and
`taxInclusive` and `nonRefundable` flags, plus a rendered `description`.

**Steps to enable:** enable the OPERA Control **Tiered Deposit Rule Schedules**.

**Impact, Oracle's words:** *"SHOP Channels receive multiple deposit policies when applicable. If a
channel cannot support multiple deposit policies, you should avoid configuring tiered deposit
policies for that channel's rates."*

**Commentary.** That is Oracle printing the failure mode in advance, which is unusual for a release
note and worth taking literally. Tiered deposits are a property-side commercial decision configured
on a rate. The constraint that breaks sits in a partner's code and is **invisible from the OPERA
configuration screen** — nothing warns that the rate just tiered publishes to a channel that will
take only the first policy, or reject the offer, or display a deposit that is not what gets charged.

The control is procedural, not technical: before enabling Tiered Deposit Rule Schedules on any rate
that publishes to a channel, confirm per channel that the partner consumes a `depositPolicies` array
longer than one. Keep tiered rates off the channels that cannot.

**Inference, labelled:** the likeliest live symptom is not an error but a quiet mismatch — guest sees
one deposit at booking, property charges another, surfacing as a billing dispute weeks later rather
than an integration failure. A hypothesis to test, not observed behaviour.

**Not documented:** what a channel that cannot handle the array actually receives — truncation, full
array, or error. That is the single most useful missing fact here. Also undocumented: whether any
per-channel capability flag exists in Distribution to suppress tiered policies automatically, which
is what would make this safe rather than procedural; and ordering guarantees within the array.

---

## Resolved issues

Not captured for this release. The 26.2 resolved issues chapter was not read.

---

*Part of the [per-version release file set](_INDEX.md). Created 2026-09-10, never deleted, updated in*
*place.*
