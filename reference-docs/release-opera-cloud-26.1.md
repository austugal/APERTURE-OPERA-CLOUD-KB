# OPERA Cloud Services 26.1

| | |
|---|---|
| **Product** | Oracle Hospitality OPERA Cloud Services |
| **Release** | 26.1 |
| **Oracle doc ID** | G48601-01 |
| **Published** | February 2026 |
| **Source** | https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.1/oprnc/c_feature_summary.htm |
| **Verified** | 2026-09-02 |

Eleven relevant features. Six are fiscal or country specific.

**This is the most important release file in the set for anyone supporting an older estate.** It is
the boundary where two live compliance gaps close — see below.

---

## Features

| Module | Feature | Why it matters |
|---|---|---|
| Cashiering | **Auto Check Out Fiscal Folios** added, operating with Auto Check Out | Closes a live compliance gap, see below |
| Cashiering | **Quick Check Out** supports the fiscal workflow for **zero balance departures**, generating a fiscal payload to the Fiscal Partner | Closes the second half of the same gap |
| Cashiering | **Internal OPI Token Service** control for non-tokenized properties | Route onto OPI Cloud without a full payment partner migration first |
| Integrations | **Business Events for Data Value Mapping changes**, real-time notification | Consumers learn a mapping changed instead of discovering it by breaking |
| Integrations | Fiscal Integration updated with enhanced PII metadata visibility | |
| Property APIs | Fiscal `getCentralSalesHotels` operation added | Returns central sales properties by search criteria |
| Country: India | GSTR Country Export updated to include **Pseudo Room Types** | See the warning below |
| Country: Japan | City Tax ranges configurable by percentage **or** amount | |
| Country: Maldives | Green Tax report added to Reporting and Analytics | |
| Country: Philippines | R+A reports for BIR compliance | |
| Country: Poland | R+A reports for legal compliance | |

---

## The compliance gap below 26.1 — the reason to know a property's release

Before 26.1, **Auto Check Out did not produce a fiscal folio**, and **Quick Check Out generated no
fiscal payload for zero balance departures**.

Any fiscalised property on a release **below 26.1** that uses either function has been departing
guests without producing the document the regime requires. Neither failure is visible at the front
desk. Both surface at audit.

That is a compliance conversation, not an upgrade pitch. And it is the clearest illustration of why
the release a property actually runs is the first thing to establish: the same question — "are our
checkouts compliant?" — has opposite answers on 25.5 and 26.1.

**Related, India.** If a property runs pseudo room types for house use, packages or virtual inventory
and sits **below 26.1**, its GSTR export has been incomplete.

---

## Where this sits in the arcs

**Fiscal and workflow reconciled.** 26.1 is where the *checkout* gap closes: automated and
zero-balance checkout start producing the fiscal document. The wider reconciliation runs back a
release — Simplified Settlement shipped in 25.5 and stayed fiscally unusable until 26.3.

**OHIP made observable.** 26.1 emits business events when a Data Value Mapping changes.
**Corrected 2026-09-14: this is the second of four steps, not the first of three.** DVM itself
shipped in [25.5](opera-cloud-25.5.md); 26.1 instruments it. Everything before 26.1 — including any
property still on 25.5 — has DVM that can be changed with no notification at all.

---

## Portugal and Spain, checked against Oracle's page 2026-09-22

**Added 2026-09-22.** The table above omitted Portugal. Read directly from the G48601-01 Feature Summary.

| Country | Feature | Why it matters |
|---|---|---|
| Portugal | **Negative Rate Amounts Not Allowed for Package Split** | Oracle: where a package in a rate causes a negative amount to post to room revenue, because the package exceeds room revenue or a discount or fixed rate is used, "an error appears to the user indicating a negative amount is not allowed for properties in Portugal, and the changes are not saved." The gap it closes: a negative rate amount could still post during End of Day, and the folio "contained a negative value, which prevented it from being checked out." Any Portuguese property below 26.1 with packages in rates can still hit this |
| Spain | **None.** The word Spain does not occur in the 26.1 Feature Summary | A measured zero, not an unread section |

---

*Part of the [per-version release file set](_INDEX.md). Created 2026-09-10 from content verified*
*2026-09-02. Arc section updated in place 2026-09-14 after the 25.5 capture. Never deleted.*
*25.5 is now read — see [opera-cloud-25.5.md](opera-cloud-25.5.md), the release immediately below*
*the compliance boundary described above. **Next backfill target is 25.4.***
