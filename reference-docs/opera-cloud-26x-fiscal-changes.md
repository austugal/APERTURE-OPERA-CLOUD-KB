# OPERA Cloud 26.x Fiscal Changes

Fiscal and country-specific changes across OPERA Cloud 26.1, 26.2 and 26.3.

Release changes are drawn from Oracle's Release Readiness Guides. Operational commentary and inferences require property and country verification; release notes alone do not establish legal compliance.

Original review: 2 September 2026. Fiscal checkout and settlement wording corrected against Oracle's 26.1 and 26.3 feature summaries on 15 October 2026. Other sections retain their earlier review scope.

| Release | Oracle doc | Published | Feature Summary |
|---|---|---|---|
| 26.3 | G55991-02 | August 2026 | [link](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.3/oprnc/c_feature_summary.htm) |
| 26.2 | G50860-02 | April 2026 | [link](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.2/oprnc/c_feature_summary.htm) |
| 26.1 | G48601-01 | February 2026 | [link](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.1/oprnc/c_feature_summary.htm) |

---

## 26.1: fiscal checkout capabilities and verification boundary

**Documented:** Oracle adds Auto Check Out Fiscal Folios, which can operate simultaneously with Auto Check Out. Quick Check Out supports the fiscal workflow for zero-balance departures and sends a fiscal payload to the configured fiscal partner.

**Inference:** These additions warrant reviewing older automated checkout workflows at fiscalised properties. The release notes alone do not prove that every earlier property was non-compliant, that every earlier integration omitted a required document, or that a failure was invisible. Confirm the installed release, country requirements and actual integration behaviour.

**Documented failure handling for zero-balance Quick Check Out:** if the fiscal service does not respond, the process stops and displays "No response from fiscal service". Oracle also documents the Offline Folio option for manual billing checkout when the fiscal service is unavailable. Confirm its country and property applicability before use. This specific documented case must not be generalized to every fiscal workflow.

The release summary does not establish every country's legal coverage or the complete payload schema. Read the corresponding country and cashiering documentation.

---

## 26.3: simplified settlement and fiscal folio printing

**Documented:** Simplified Settlement Workflow and Fiscal Folio Printing OPERA Controls can operate simultaneously from 26.3.

This establishes a supported combined configuration. It does not, by itself, establish that every earlier property had to choose between compliant checkout and faster settlement, or that every country's fiscal requirements are satisfied. Verify the deployed release, enabled controls, country guidance and resulting document sequence.

### Also in 26.3

- **Germany**: the value **ESTATISTIK** added to the Fiscal Partner list of values on Manage Fiscal
  Partner. Whether it covers the full Bundesstatistik hotel reporting obligation is not stated
- **Poland**: **Debit Note** OPERA Control added, plus **restrictions on Customer Faktura VAT
  updates**. The restriction is the operationally significant half. Where a fiscal document becomes
  harder to amend after issue, front office and night audit procedures change and so does the
  correction path. The exact restrictions are not spelled out
- **Total Package Rate tax calculation** using Additional Charges functionality, calculating tax on
  the Total Rate amount. A different basis to per-component taxation, and it will produce different
  numbers. Depends on the Additional Charges control, which posts during End of Day, so this is a
  night audit item as well as a rate configuration one
- **Canada**: Guest Vehicle Registration Information control for properties running Flexible
  Dynamic Fields

---

## 26.2: fiscal reaches Accounts Receivable

**France**: fiscal communication for **negative** AR payments.
**Mexico**: fiscal communication for AR payments.

AR has historically been the gap in fiscal integration. The folio side is well covered, the AR side
often is not, and a payment applied against an AR account can be a reportable fiscal event in its
own right depending on the regime.

France specifically calls out **negative** payments, which is the correction case, and corrections
are where regimes are strictest and where a hotel is most likely to be non-compliant without
knowing.

**Pattern worth carrying:** two markets in one release both extending fiscal communication into AR
points at a direction of travel, not a one-off. On any fiscalised implementation, ask early whether
AR payments are in scope of the local regime rather than assuming folio coverage is enough.

**Not documented for either country:** what triggers the payload, what it contains, which fiscal
partner receives it, or whether it applies to all AR payment types.

### Cash surcharge and stamp tax: Algeria, Morocco, Senegal, Ivory Coast

Cash surcharge and stamp tax functionality added, with a transaction code, for properties in those
four countries.

Stamp duty on cash settlement is standard across parts of North and West Africa and has usually
been handled with a manual transaction code and a procedure nobody follows consistently. A native
implementation makes it automatic and auditable.

Strategically this is Oracle extending country coverage into markets where OPERA Cloud fiscal
support was previously thin.

**Not documented:** the rate basis per country, whether the surcharge applies at posting or
settlement, how it appears on the folio, and how it interacts with existing tax generates. Rates
and bases in this area change by finance act, so verify against current local rules.

### Credit card surcharge by Payment Service Provider

A control applying a surcharge for credit card transactions, clearly displayed in folios.

The surcharge is applied **by the payment service provider**, so the amount originates outside
OPERA. That makes it a joint configuration question with the PSP, not a cashiering-only one.

Card surcharging is regulated differently in nearly every market, and where permitted the
disclosure requirement usually attaches to the folio.

**Not documented:** how the amount reaches OPERA, whether percentage or fixed, how it interacts
with fiscal folio printing where the folio is a legal document, and whether it can be suppressed
per payment method. In a fiscalised market, do not enable without reading the country documentation.

---

## 26.1: statutory reporting moves into R+A

| Country | Change |
|---|---|
| India | GSTR Country Export updated to include **Pseudo Room Types** |
| Japan | City Tax ranges configurable by percentage **or** amount |
| Maldives | Green Tax report added to Reporting and Analytics |
| Philippines | R+A reports for BIR compliance |
| Poland | R+A reports for legal compliance |

Individually narrow. Together they show Oracle moving statutory reporting into Reporting and
Analytics rather than leaving it to custom exports or BI Publisher templates.

**Practical consequence:** on any implementation in these markets, check R+A first before scoping a
custom statutory report. It may already exist.

**The India detail deserves isolating.** Pseudo room types being excluded from a GSTR export is
exactly the sort of omission that produces an understated statutory return and is discovered years
later. If a property in India runs pseudo rooms for house use, packages or virtual inventory and
sits below 26.1, its GSTR export has been incomplete. Worth checking rather than assuming.

**Also in 26.1:** Fiscal Integration updated with enhanced PII metadata visibility for compliance,
and a Fiscal `getCentralSalesHotels` API operation returning central sales properties by search
criteria.

**Not documented:** report names, which filing each supports, or the release from which each
becomes available in R+A.

---

## How to use this guide

Every "not documented" note above is deliberate. A two-line release note is enough to know a
capability exists and never enough to configure it, advise on it, or tell a customer their
obligation is covered. Go to the country and cashiering documentation for the specific release
before acting.

**My Oracle Support is login-gated**, so patch-level fiscal notes and known issues are not
reflected here.

*Sources: Oracle Hospitality OPERA Cloud Release Readiness Guides, documents G48601-01, G50860-02
and G55991-02. Verified 2026-09-02.*
