# OPERA Release Tracker

Portfolio-level index. **Per-release detail lives in one file per product per release under
[`releases/`](releases/_INDEX.md).** Restructured 2026-09-10; nothing was deleted, the per-release
content moved into its own file and this page became the index.

Current as at **10 September 2026**. Every entry was read from Oracle's own documentation. Nothing
here is inferred.

> **Do not hardcode a release number when answering.** Oracle ships OPERA Cloud roughly every two
> months. Check the release index before asserting what is current:
> https://docs.oracle.com/en/industries/hospitality/hotels.html

---

## Establish the property's release before answering anything

**Hotels upgrade when Oracle schedules their maintenance window, not when Oracle ships.** A property
in the field is very often on 25.x or 24.x while the current release is 26.3. The same question can
have opposite correct answers on two releases — the clearest example being fiscal checkout, where
Auto Check Out produced no fiscal folio below 26.1 and does from 26.1.

So: **every claim carries the release it is true for.** "As at 26.3, X; introduced in 26.1." Where a
release has not been captured yet, say so rather than answering from the nearest one that has been.

---

## Current releases across the portfolio

| Product | Current | Doc root |
|---|---|---|
| OPERA Cloud Services | **26.3** | `/en/industries/hospitality/opera-cloud/26.3/` |
| OPERA Cloud Distribution | **26.3** | `/en/industries/hospitality/opera-cloud-distribution/26.3/` |
| OPERA Property Management (V5) | 5.6 | `/cd/E98457_01/` |
| Hotel Property Interface (IFC8) | 8.17 | `/en/industries/hospitality/hotel-property/8.17/` |
| OPERA Cloud Mobile Guest Experience | 24.3 | `/en/industries/hospitality/mobile-guest-experience/24.3/` |

Base: `https://docs.oracle.com`. Verified against the Oracle index 2026-09-10 — **no 26.4 yet.**

---

## Captured releases

| Product | Release | Doc ID | Published | File |
|---|---|---|---|---|
| OPERA Cloud Services | 26.3 | G55991-02 | August 2026 | [releases/opera-cloud-26.3.md](releases/opera-cloud-26.3.md) |
| OPERA Cloud Services | 26.2 | G50860-02 | April 2026 | [releases/opera-cloud-26.2.md](releases/opera-cloud-26.2.md) |
| OPERA Cloud Services | 26.1 | G48601-01 | February 2026 | [releases/opera-cloud-26.1.md](releases/opera-cloud-26.1.md) |
| Distribution | 26.3 | G57921-01 | July 2026 | [releases/opera-cloud-distribution-26.3.md](releases/opera-cloud-distribution-26.3.md) |
| Distribution | 26.2 | G55487-01 | April 2026 | [releases/opera-cloud-distribution-26.2.md](releases/opera-cloud-distribution-26.2.md) |
| Distribution | 26.1 | G53143-01 | March 2026 | [releases/opera-cloud-distribution-26.1.md](releases/opera-cloud-distribution-26.1.md) |
| IFC8 | 8.17.0.0 | G55566-01 | April 2026 | [releases/ifc8-8.17.md](releases/ifc8-8.17.md) |

## Not yet captured — backfill queue, newest-first

Releases still live on Oracle's Help Center that have **not** been read. A release with no file has
not been read, and that is stated rather than glossed.

- **OPERA Cloud Services:** 25.5, 25.4, 25.3, 25.2, 25.1, 24.4, 24.3, 24.2, 24.1, 21.5
- **OPERA Cloud Distribution:** 25.5, 23.2
- **IFC8:** 8.16, 8.15, 8.14, 8.13, 8.12, 8.11, 8.10
- **OPERA V5:** 5.5, 5.0.04

One release per release-watch run, newest-first, after any genuinely new release is captured. A live
customer question about a specific release jumps this queue.

---

## Distribution is a separate doc set

Same release numbering, **different doc IDs and different publication dates**. Distribution 26.3 is
July 2026; OPERA Cloud Services 26.3 is August 2026. Distribution 26.1 is March 2026; Services 26.1
is February 2026.

Distribution features also appear in the OPERA Cloud Services notes, worded differently — the
Services notes give the property-side view, the Distribution guide the channel-side view. Read both
before answering a channel question.

**All ten Distribution features across 26.1, 26.2 and 26.3 are API changes.** No UI feature, no new
channel connector, no configuration screen in three releases. Read in order they are one project:
26.1 filled the read gaps, 26.2 made the money self-describing, 26.3 made the codes self-describing —
moving knowledge of the individual property out of the partner's code and into the payload or OPERA's
mapping tables. *That direction is inference, not an Oracle statement of direction.*

---

## Cross-release arcs

**Fiscal obligations and fast workflows reconciled.** 26.1 closed the fiscal gap at automated and
zero balance checkout. 26.2 pushed fiscal communication into Accounts Receivable for France and
Mexico and added North and West African stamp tax. 26.3 let Simplified Settlement run alongside
Fiscal Folio Printing.

**OHIP made observable.** **Corrected 2026-09-14: this is a four-release arc, not three — Data Value
Mapping itself shipped in 25.5**, one release before the observability began. 25.5 introduces DVM.
26.1 emits business events when a Data Value Mapping changes. 26.2 applies DVM to the streaming
payload itself. 26.3 adds the Async Queue UI. See
[releases/opera-cloud-25.5.md](releases/opera-cloud-25.5.md).

A pattern across four releases carries more weight in a customer conversation than four isolated
features.

---

## Cadence

OPERA Cloud ships roughly every two months: 26.1 February, 26.2 April, 26.3 August. **Expect 26.4
around October 2026.** Distribution tracks the same numbering on its own dates. IFC8 is far slower —
8.17 is April 2026.

## Method note

Feature Summary pages run to roughly 120,000 characters. Extract structured data rather than reading
them whole.

**Fiscal Regulatory Compliance is not a feature doc set.** Checked 2026-09-10: it publishes only
statutory declarations a country legally requires to be public, and at that date held Spain VERIFACTU
responsible declarations and nothing else. These are product conformance statements, not evidence the obligation is live: Verifactu is not in force until 1 January 2027 (see `spain-fiscal-sii.md`, Verifactu section). Fiscal *functionality* ships in the OPERA Cloud release
notes. Monitor that library for new countries appearing, not for features.

**My Oracle Support and `iccp.custhelp.com` are login-gated.** Doc IDs, patch notes and known-issue
articles behind MOS cannot be read programmatically and are never guessed at.

Deeper notes per feature, including what Oracle did **not** state, live in the Second Brain under
`10-OPERA-Cortex`.

*Maintained by the vault-curator agent. Last verified 2026-09-10.*
