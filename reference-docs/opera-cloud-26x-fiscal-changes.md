# OPERA Cloud 26.x Fiscal Changes

Fiscal and country-specific changes across OPERA Cloud 26.1, 26.2 and 26.3.

Every claim below comes from Oracle's Release Readiness Guides. Where Oracle did not state
something, this guide says so rather than filling the gap.

Verified 2 September 2026.

| Release | Oracle doc | Published | Feature Summary |
|---|---|---|---|
| 26.3 | G55991-02 | August 2026 | [link](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.3/oprnc/c_feature_summary.htm) |
| 26.2 | G50860-02 | April 2026 | [link](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.2/oprnc/c_feature_summary.htm) |
| 26.1 | G48601-01 | February 2026 | [link](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.1/oprnc/c_feature_summary.htm) |

---

## The headline: a compliance gap on any release below 26.1

Two entries in 26.1, both under Cashiering and Financials:

- **Auto Check Out Fiscal Folios** added, configured to operate simultaneously with Auto Check Out
- **Quick Check Out** updated to support the fiscal workflow for **zero balance departures**,
  generating a fiscal payload sent to the Fiscal Partner during checkout

Read together, these close two holes where a fiscalised property silently stopped being compliant.

Automated checkout ran without producing a fiscal folio, so any property using it departed guests
without the document the regime requires. Zero balance departures were the same problem from the
other direction: no money moved, so no payload was generated, even though the stay still had to be
reported.

**Neither failure is visible at the front desk. Both surface at audit.**

If a property is fiscalised, uses Auto Check Out or Quick Check Out, and runs below 26.1, this is
worth raising as a gap to close rather than a feature to sell.

**Not documented by Oracle:** which regimes are covered, whether the zero balance payload differs
in content, and what happens if the Fiscal Partner is unreachable at that moment. Failure handling
at checkout is the question to ask.

---

## 26.3: settlement speed and fiscal printing stop competing

**Simplified Settlement Workflow OPERA Control updated to work with the Fiscal Folio Printing
OPERA Control simultaneously.**

These two previously pulled against each other. Simplified Settlement exists to shorten checkout.
Fiscal Folio Printing exists because a regime demands a specific document at a specific moment. On
a fiscalised property that meant choosing between a faster checkout and a compliant one.

Directly relevant to Portugal, Spain, Poland and every regime where folio printing is a legal event
rather than a convenience.

**Not documented:** what the combined workflow looks like at the desk, whether the fiscal document
is produced before or after settlement completes, and whether any regime is excluded. Sequence is
the whole question in fiscal printing. Read the 26.3 cashiering and country documentation before
configuring this anywhere live.

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
