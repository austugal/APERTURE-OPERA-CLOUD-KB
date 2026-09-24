# OPERA Cloud Distribution 26.3

| | |
|---|---|
| **Product** | Oracle Hospitality OPERA Cloud Distribution |
| **Release** | 26.3 |
| **Oracle doc ID** | G57921-01 |
| **Published** | July 2026 |
| **Source** | https://docs.oracle.com/en/industries/hospitality/opera-cloud-distribution/26.3/ohdrn/toc.htm |
| **Verified** | 2026-09-10 |

> **Distribution is a separate doc set from OPERA Cloud Services.** Same release numbering, different
> doc IDs, different publication dates. Distribution 26.3 is **July 2026**; OPERA Cloud Services 26.3
> is **August 2026**. Reading one tells you nothing about the other.

---

## Features — one

### Distribution Reservation Service: `postReservation`, `putReservation`

**Scale:** SMALL. **Steps to enable:** Yes.

Oracle: the operations now support the global distribution values `guaranteeType` and `paymentType`,
in addition to the existing OPERA Cloud `guaranteeCode` and `paymentMethod`. When a global value is
provided, the service maps it through **Distribution Reservation Codes** to the property-specific
OPERA Cloud code. Where applicable, responses include the reverse-mapped global value.

**Impact, Oracle's words:** existing integrations using `guaranteeCode` and `paymentMethod` continue
to work. Requests must include either `guaranteeType` **or** `guaranteeCode`, not both; either
`paymentType` **or** `paymentMethod`, not both. Requests with conflicting guarantee or payment fields
are **rejected**. Reservations **fail** with an invalid guarantee or invalid payment type error when
the required mappings are missing.

**Steps to enable, Oracle's words:** review the updated OHIP API specification. To use `guaranteeType`
or `paymentType`, verify that the required Distribution Reservation Codes mappings exist for the
property.

**Commentary.** This moves mapping work off the integrator and into OPERA. Before 26.3 a channel had
to know each property's own guarantee code and payment method, so a chain rolling a channel across
forty hotels maintained forty code tables partner-side and every new property opening was a
partner-side change. From 26.3 the channel speaks one global vocabulary and OPERA resolves it per
property.

Both failure modes surface at booking time on a live channel, not at configuration time. **Sequence
the migration accordingly: build and verify the Distribution Reservation Codes mappings first, then
have the partner switch fields.** Not the other way round.

**Not documented:** the permitted value set for `guaranteeType` and `paymentType` or which standard
it follows; behaviour when two property codes map to the same global value on reverse mapping; and
whether mappings are validated at configuration time or only at booking time. The wording implies the
latter, which is the expensive answer.

---

## Resolved issues — thirty-one

A one-feature release with thirty-one fixes is a maintenance release. **On this doc set the resolved
issues carry most of the information**, and a reader who checks only the feature summary will
conclude nothing happened.

### Distribution APIs (10)

| JIRA | Description |
|---|---|
| HOPCS-92405 | Child age price calculations now consistent for live and cache calls when child age setup is missing in Distribution Property Controls |
| HOPCS-92295 | SHOP `getPropertyAddons` now returns packages with future start dates when the request is made after the package start date |
| HOPCS-92266 | Agoda rate updates now exclude extra bed pricing derived from the extra adult setup in OPERA Cloud |
| HOPCS-92167 | Room Types page for Booking.com channels now displays the complete list of property room types, mapped or unmapped |
| HOPCS-91932 | SHOP `getPropertyOffer` now returns a consistent response regardless of whether the request includes an access code, travel agent ID, company ID or source ID |
| HOPCS-91888 | SHOP responses now show the room type short description in the Description field when the GDS description is not set |
| HOPCS-91710 | Channel availability now returns accurate offer availability with complete rate information for all subsequent requests |
| HOPCS-91389 | Channel availability responses now return cancellation policy amounts and other offer amounts in standard two-decimal format instead of **scientific notation** |
| HOPCS-90057 | Shop Offers now considers the number of adults and children when calculating UDF tax for rate packages |
| HOPC-S94248 | Added support for `postPropertySearch`, `postPropertyOffers` and `postPropertyOffer` in OHIP |

### Distribution Channel Management (12)

| JIRA | Description |
|---|---|
| HOPCS-91820 | Dependent rates copied from a different property are now available on the Channel Availability screen |
| HOPCS-91759 | Channel Rate Plan and Rate Plan filters now display the correct values |
| HOPCS-91464 | API now returns correct pricing for derived daily rate plans |
| HOPCS-91450 | SHOP `getPropertyAddons` no longer restricts sell-separate package codes and package groups to **50** |
| HOPCS-91224 | Rate Plan LOV now cleared when users select then deselect Rate Schedule and Restriction, then select only Inventory |
| HOPCS-90973 | Formula-based packages now handled correctly when formula function names are **lowercase or include leading or trailing spaces** |
| HOPCS-90629 | Rate plan pricing calculated correctly when the plan combines Base Rate and Best Available Rate-based pricing |
| HOPCS-90492 | OPERA Cloud resync now triggers Rate Hurdle events only for hurdle rates created or updated in Distribution |
| HOPCS-90318 | Changes Log now displays logs when channel offers are updated |
| HOPCS-90266 | Daily rate plan schedule updates perform better in specific integration scenarios with some revenue management systems |
| HOPCS-90137 | Resolved with no user-visible impact |
| HOPCS-85906 | Channel messages for all properties in a cluster now viewable from the Cluster-Level Channel Message screen |

### Distribution Channel Publication (1)

| JIRA | Description |
|---|---|
| HOPCS-91601 | Channel ARI Restriction publication message for evaluated hurdle rates no longer includes duplicate dates |

### Distribution General (3)

| JIRA | Description |
|---|---|
| HOPCS-91928 | Route loading reliability in services-router improved: Spring Boot memory buffer configuration updated to support larger Hotel Registry responses, plus validation coverage to prevent startup failures from large payloads |
| HOPCS-91869 | Shop service deep links now include the hotel code in the query parameter |
| HOPCS-91695 | Channels can now call `putPropertyStatus` and `getPropertyStatus` without HTTP 500 (DGEN10003) failures |

### Distribution Provisioning (2)

| JIRA | Description |
|---|---|
| HOPCS-91529 | After 1.0 and 2.0 provisioning, unlinking and changing environment/ssdOrgId/ssdId now gives proper messaging. Linking to a different subscription with a valid commercial region is allowed if the SKU is not overlapping |
| HOPCS-90889 | In metering, hotel is not returned if not provisioned |

### Distribution Reservations (3)

| JIRA | Description |
|---|---|
| HOPCS-92384 | Long reservation comments in Channel Reservations now split into ordered OPERA Cloud comments within the **4000-byte limit**, preserving metadata, character integrity and reservation processing |
| HOPCS-92252 | Channel Reservation modifications now processed when multiple guest profiles share the same surname and first initial, provided the guests have different complete names |
| HOPCS-91991 | Channel Reservation modifications now processed to OPERA Cloud as expected |

---

## Three worth remembering

*Commentary.* Each names a live symptom somebody has spent a night on:

1. **Scientific notation in channel availability amounts** (HOPCS-91389). An amount arriving as
   `1.0E2` where a partner expects `100.00` fails partner-side and looks like their bug
2. **Formula packages breaking on lowercase or space-padded function names** (HOPCS-90973). Invisible
   in the configuration screen, and the reason one property prices differently from its identical
   sibling
3. **The 50-item cap on `getPropertyAddons`** (HOPCS-91450). Silent truncation, so a large property
   published an incomplete addon list to channels with no error raised

---

## Not read

26.3 User Guide, Security Guide, **Inventory Calculation Guide** (holds the overbooking protection
logic — the most useful unread item here) and Licensing Information User Manual. Patch Release Notes
sit behind My Oracle Support at `iccp.custhelp.com/app/answers/answer_view/a_id/1013523` and are not
reachable programmatically.

---

*Part of the [per-version release file set](_INDEX.md). Created 2026-09-10, never deleted, updated in*
*place.*
