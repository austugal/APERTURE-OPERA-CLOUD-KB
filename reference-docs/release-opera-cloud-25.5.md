# OPERA Cloud Services 25.5

| | |
|---|---|
| **Product** | Oracle Hospitality OPERA Cloud Services |
| **Release** | 25.5 |
| **Oracle doc ID** | G43592-02 |
| **Published** | December 2025 |
| **Source** | https://docs.oracle.com/en/industries/hospitality/opera-cloud/25.5/oprnc/c_feature_summary.htm |
| **Verified** | 2026-09-14 |

Roughly 120 features across 16 modules. Twenty relevant to fiscal, integrations, payments,
cashiering, distribution and migration. Seven written up.

**First release captured under the backfill rule, and the one that sits immediately below the
compliance boundary described in [opera-cloud-26.1.md](opera-cloud-26.1.md).** A property on 25.5
is on the wrong side of that boundary. It is also the release where two features that later define
the 26.x arcs actually shipped.

---

## Features

| Module | Feature | Why it matters |
|---|---|---|
| Country: Portugal | Negative postings and negative payments **blocked** when the controls are set; Imbalance Analysis Fix routes through POS Accounts; `PORTUGAL_TAX_ID_NIF` accepts starting digits 4 and 7 | Oracle states the reason: negative values cause the **PT_SAFT_104 export to be rejected by the Portuguese authorities**. See below |
| Country: Poland | **Associated Pre-Payment Invoice** control; Reservation Addressee made generic; `<AdditionalAddresseeInfo>` in the Universal Payload; `EXCL_CREDIT_RACHUNEK` JPK mapping | Enables communication with **KSeF**, Poland's mandatory national e-invoicing system. Carries an upgrade trap, see below |
| Country: Croatia, Slovenia | `CR_TOURIST_EXPORT`, `CR_POLICE_EXPORT`, `SL_POLICE_EXPORT` **withdrawn from New from Template** | Existing configured exports keep running. Only a *new or rebuilt* property hits the gap — so it surfaces at migration |
| Country: generic | **Information Collection Methods** gains `FOLIO_TEXT` and `RESERVATION_TEXT`; `FOLIO_TEXT1`–`10` merge codes, header and footer | Supplemental text captured at reservation or settlement, carried to the fiscal partner in the Universal Payload |
| Integrations | **OFIS Cloud**: OAuth 2.0 for GENERIC JSON partners; cloud-to-cloud fiscal flows for EOD, AR and Checkout Folio; external system renamed `FLIP_<CHAIN>` → `OFISCLOUD_<CHAIN>` | The rename breaks anything keyed to the old identifier, silently. See below |
| Integrations | **Data Value Mapping for External Systems** — Room Type, Rate Code, Market Code, Source Code, Transaction Code, Country Code, Cancellation Policy, Deposit Policy | **This is where DVM begins.** The 26.x observability arc is four releases, not three |
| Integrations | Send Vaulted Credit Card Interface Control; Update Reservation business event gains a Do Not Move element | |
| Cashiering | **Simplified Settlement Workflow** control added | Shipped here; **could not run with Fiscal Folio Printing until 26.3** |
| Cashiering | Credit Card Refunds task (Financial) and Deposit Refund for Credit Card Payment task (Bookings) | Refunds become role-gated tasks |
| Cashiering | End of Day Cashier Closure skips validating Cash Shift Drop | |
| Toolbox | **Credit Card Retokenization** bulk task, Data Management parent | Supports a property moving between Payment Service Providers |
| Toolbox | OAuth authentication for SMTP; iFrame domain allow list for deep links | |
| Distribution | Hub Level Channel Publication; Credit Card Type Mappings; Copy Channel Room Flow; **Generative AI for Distribution rate descriptions** | The Gen AI item is the first generative feature in any release captured in this set |
| Client Relations | Anonymize with Purge control; bulk deletion of suspended stay records | |
| Property APIs | ~21 operations changed, including RTP bulk ratePlan deletion, CSH postPayments / postDepositPayments, FOF roomKeys and autoRoomAssignments, BLK async getBlock | |

---

## Portugal: why negative postings are now refused at entry

Oracle's own stated reason, quoted from the Feature Summary: where the required parameters were not
set, properties could post negative transactions and payments, and this *"causes an issue with the
PT_SAFT_104 export which are rejected by the Portuguese authorities."*

That is a rejection at the tax authority. It is found late, by someone else, after the period closes.

**The guard is forward-looking only.** On any Portuguese property the question is no longer whether
`Allow Negative Postings` is set correctly today, but whether it ever was not, and what is already in
the ledger. The retrospective half is the Imbalance Analysis change: the Fix procedure for Guest
Ledger imbalances from unmatured deposits posts through the first checked-in room in the POS Accounts
control, **because POS Accounts room values are excluded from the PT_SAFT_104 export**. If no POS
Accounts room is checked in, the procedure stops.

---

## Poland: the same release behaves two ways depending on when the property was built

From Oracle's IMPACT OR OTHER CONSIDERATIONS:

- Properties with Country Mode = PL have generated Pre-Payment Invoices since **25.1.0.0**
- The Associated Pre-Payment Invoice control is **activated automatically during the upgrade to
  25.5.0.0**, so existing properties see no behaviour change
- It must be **activated manually for newly provisioned properties**

So two Polish properties configured from the same chain standard behave differently depending on
whether they existed before the upgrade. Nothing in the configuration screen explains why. Worth
checking on any Polish property provisioned after its chain upgraded.

The `PL_JPK_FA` export must be **deleted and recreated from template** for the `EXCL_CREDIT_RACHUNEK`
mapping to take effect. An in-place edit will not pick it up — Oracle's own steps say so.

---

## The OFIS rename is a migration item

`FLIP_<CHAIN CODE>` becomes `OFISCLOUD_<CHAIN CODE>`, and Oracle is explicit that **historical events
remain labelled FLIP while new events are labelled OFISCLOUD**. One logical integration, two names
either side of the switch.

Anything keyed to the old identifier — a saved queue filter, an alert, a monitoring query, a runbook
step — stops matching new traffic while still matching the backlog. Nothing errors; the queue just
looks emptier than it is.

*Commentary, not Oracle's statement:* a pre-cutover sweep for hard-coded `FLIP_<CHAIN>` strings costs
very little against a failure that is silent by construction.

---

## Where this sits in the arcs — and it corrects two of them

Capturing 25.5 moved the start of two arcs recorded in this set. Both had been dated from the oldest
release the reference set held, which is an assumption rather than a finding.

**OHIP made observable — four releases, not three.**

- **25.5: Data Value Mapping exists at all**, across eight named code categories
- 26.1: business events fire when a DVM configuration changes
- 26.2: streaming payloads support DVM for select events
- 26.3: Async Queue UI shows asynchronous request state

Build the translation layer, then instrument it. It also dates the blind window: between 25.5 and
26.1 — roughly December 2025 to February 2026 — DVM was configurable with no change notification at
all. **A property still on 25.5 is in that window now.** If a partner there suddenly receives
different codes, a DVM edit is a live hypothesis and there is no event trail to confirm it.

**Fiscal and workflow reconciled — 25.5 is the problem statement, not the solution.**
Simplified Settlement Workflow shipped here and stayed incompatible with Fiscal Folio Printing until
26.3: roughly eight months in which a fiscalised property had the control listed and effectively
unusable. Combined with the checkout compliance gap that closes in 26.1, the defensible claim about
the 26.x releases is not that they added fiscal capability from nothing, but that they **reconciled
fiscal obligations with efficiency features Oracle had already shipped in 25.5**.

*The incompatibility before 26.3 is inference — it rests on Oracle announcing the combination as a
26.3 feature, not on a 25.5 statement that they conflicted. Verify against the 25.5 cashiering and
country documentation before asserting it to a customer.*

---

## Sources not reachable

The Portugal and Poland features both point to the country *Oracle Hospitality OPERA Cloud Fiscal
Reference Guide*, hosted on `iccp.custhelp.com` and **login-gated**. Answer IDs: Portugal 1002413,
Poland 1002382, Croatia 1013369, Slovenia 1014100. Not readable by any agent, never guessed at. Pull
manually before configuring any of this on a live property.

---

*Part of the [per-version release file set](_INDEX.md). Created 2026-09-14. Never deleted, updated*
*in place. **Next backfill target is 25.4.***
