# OPERA Cloud Services 26.3

| | |
|---|---|
| **Product** | Oracle Hospitality OPERA Cloud Services |
| **Release** | 26.3 |
| **Oracle doc ID** | G55991-02 |
| **Published** | August 2026 |
| **Source** | https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.3/oprnc/c_feature_summary.htm |
| **Verified** | 2026-09-02 |

Twelve features relevant to implementation, fiscal and integration work.

> **Source caveat, raised in review 2026-09-08 and worth repeating.** The Feature Summary sits inside
> a *Release Readiness Guide*, which describes forthcoming and control-gated functionality. It
> supports "26.3 introduces X". It does **not** on its own prove what a given property has enabled,
> and it is not the right citation for "the current release is 26.3" — use the release index for
> that.

---

## Features

| Module | Feature | Why it matters |
|---|---|---|
| Integrations | **Async Queue UI** for asynchronous API requests | First place to look when a partner claims an async call was accepted. Previously invisible from inside OPERA |
| Cashiering | **Simplified Settlement Workflow and Fiscal Folio Printing** now run simultaneously | Fiscalised properties no longer choose between a fast checkout and a compliant one |
| Cashiering | **Virtual Credit Card OPERA Control** for VCC tokens from external integrations | Changes the OTA settlement and PCI scope conversation |
| Cashiering | **Total Package Rate tax calculation** via Additional Charges | Different tax basis to per-component. Also a night audit item |
| Cashiering | **Additional Charges OPERA Control** posting during End of Day or Advance Folio | Dependency for the above |
| Cashiering | **Pay by Link on Batch Deposit** | Payment links for outstanding reservations |
| Country: Germany | **ESTATISTIK** added to the Fiscal Partner list on Manage Fiscal Partner | |
| Country: Poland | **Debit Note** control added; restrictions on Customer Faktura VAT updates | The restriction half changes the correction workflow |
| Country: Canada | Guest Vehicle Registration Information control (Flexible Dynamic Fields) | |
| Client Relations | Property-specific control over guest identification PII storage and visibility | |
| Events | Guest Room as Meeting Room control: return-status event cancels the linked reservation | |
| Payments | Additional OPERA Controls moved to complimentary | No longer affect the subscribed feature count |

---

## Where this sits in the arcs

**Fiscal and workflow reconciled.** 26.3 is the third step: Simplified Settlement running alongside
Fiscal Folio Printing. 26.1 closed the fiscal gap at automated and zero-balance checkout, 26.2 pushed
fiscal communication into Accounts Receivable for France and Mexico.

**OHIP made observable.** 26.3 adds the Async Queue UI. 26.1 emitted business events on DVM change,
26.2 applied DVM to the streaming payload itself.

---

## Portugal and Spain, checked against Oracle's page 2026-09-22

**Added 2026-09-22.** The table above omitted Portugal. Read directly from the G55991-02 Feature Summary.

| Country | Feature | Why it matters |
|---|---|---|
| Portugal | **Auto Generate Credit Bill for Deposit Upon Check In** restricted to Country Mode PT | With the Credit Bill OPERA Control active, the control and its related controls (Payment Transaction Code for Auto Generate Credit Bill, Reason for Auto Generate Credit Bill) "continue to work if previously active". The control is no longer available for non-Portugal properties. No action for Portuguese properties |
| Portugal | **Debit Folio functionality no longer displayed** | Debit Folio folio type records and the Debit checkbox on Manage Folio Type disappear. Folio Settlement, Quick Check Out, Auto Check Out, Auto Folio Settlement and End of Day show a single balance and "no longer generate Debit Folios". Historic Debit Folios stay searchable and can be regenerated from Folio History. The Toolbox Document Number Update can no longer change the Debit Folio sequence. Oracle: "This functionality is no longer used in Portugal." Any Portuguese configuration guide or checklist that still builds a Debit Folio is stale from 26.3 |
| Spain | **None.** The word Spain does not occur in the 26.3 Feature Summary | Three consecutive releases, 26.1 to 26.3, with no Spain country feature. Verifactu is not in force until 1 January 2027, see `spain-fiscal-sii.md` |

---

*Part of the [per-version release file set](_INDEX.md). Created 2026-09-10 from content verified*
*2026-09-02. Never deleted, updated in place. Per-feature notes including what Oracle did **not** say*
*live in the Second Brain under `10-OPERA-Cortex`.*
