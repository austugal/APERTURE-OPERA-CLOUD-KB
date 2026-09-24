# OPERA Cloud Services 26.2

| | |
|---|---|
| **Product** | Oracle Hospitality OPERA Cloud Services |
| **Release** | 26.2 |
| **Oracle doc ID** | G50860-02 |
| **Published** | April 2026 |
| **Source** | https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.2/oprnc/c_feature_summary.htm |
| **Verified** | 2026-09-02 |

Sixteen relevant features.

---

## Features

| Module | Feature | Why it matters |
|---|---|---|
| Integrations | **Business Events streaming supports Data Value Mapping (DVM)** for select events | Translation moves upstream, removing a class of partner mapping bug |
| Integrations | Service Locator changes written to change logs | Auditability |
| Cashiering | **Credit Card Surcharge applied by Payment Service Provider** control, shown on folios | Surcharge originates outside OPERA, so it is a joint configuration with the PSP |
| Cashiering | **Revenue Recognition Method** control, holding ledger for extended stay | An accounting policy decision, not a config switch. Affects back office export and night audit |
| Cashiering | Daily rate codes limit raised to 50 per property | |
| Cashiering | Sequence column added to End of Day final reports | |
| Country: France | Fiscal communication for **negative** AR payments | The correction case, where regimes are strictest |
| Country: Mexico | Fiscal communication for AR payments | |
| Country: DZ, MA, SN, CI | **Cash surcharge and stamp tax** functionality with transaction code | Extends fiscal coverage into North and West Africa |
| Distribution | Copy Channel Room Flow across multiple properties | |
| Distribution | Content Management options for transportation, airport, amenities | |
| Inventory | Consolidated screen: room availability, rates and restrictions | |
| Profiles | Manage Name / Alternate Name Protected Profiles override task | |
| Property APIs | CRM `putProfile`, `postProfile`, `postMembership` track membership enrolment source | |
| Reservations | Auto-borrow house inventory when creating block reservations, no prompt | |
| Reservations | Trace Frequency OPERA Control | |

> Note the two Distribution rows. Distribution features appear in **both** doc sets, worded
> differently. The OPERA Cloud Services notes carry the property-side view; the Distribution
> Release Readiness Guide carries the channel-side view. Read both before answering a channel
> question — see [opera-cloud-distribution-26.2.md](opera-cloud-distribution-26.2.md).

---

## Where this sits in the arcs

**Fiscal and workflow reconciled.** 26.2 pushed fiscal communication into Accounts Receivable for
France and Mexico and extended stamp tax into North and West Africa.

**OHIP made observable.** 26.2 applies DVM to the streaming payload itself, between 26.1's business
events on DVM change and 26.3's Async Queue UI.

---

## Portugal and Spain, checked against Oracle's page 2026-09-22

**Added 2026-09-22.** Read directly from the G50860-02 Feature Summary. Neither **Portugal** nor **Spain** occurs anywhere in the text. Nothing shipped for either country in 26.2. Recorded so that absence is not mistaken for an unread section.

---

*Part of the [per-version release file set](_INDEX.md). Created 2026-09-10 from content verified*
*2026-09-02. Never deleted, updated in place.*
