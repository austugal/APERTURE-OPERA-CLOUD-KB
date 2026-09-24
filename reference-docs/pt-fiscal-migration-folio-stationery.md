# PT Migration: OPERA 5 to OPERA Cloud — Fiscal Live-Day Rules + Folio Stationery

> Reference property in this guide: **H Lisbon Hotel**, property code **HLISH** (generic placeholders).
> Authoritative reference for any Portugal V5-to-Cloud fiscal cutover, not one property only.

## Source and status

Tier 1, documented. Our own configuration knowledge for Portugal OPERA 5 to OPERA Cloud fiscal migration, validated against the Oracle Hospitality OPERA Cloud Portugal fiscal reference guidance and direct guidance from the Oracle consultant.

> **Correction logged.** A prior note said AT software certificate 2978 is shared across V5 and Cloud. The correct position is that the SAF-T certificate is **different** between V5 and Cloud, and that difference is exactly why new ATCUDs are required. If the shared-2978 claim came from a property-side source, reconcile the two before anyone requests anything from AT.

## Scope split

- Our scope (integration side) on PT fiscal go-live is limited to fiscal controls and entering the AT unique IDs (ATCUD) per folio type.
- Oracle handles sequence numbers and data migration.
- The property requests the new ATCUDs from AT, but only after Oracle provides the final prefix or suffix to apply.

## Live-day SAF-T rules (PMS replacement, OPERA to OPERA)

Apply all of the following on cutover day:

1. Advance deposits must be credit billed in the old system (OPERA V5) and posted again in OPERA Cloud using the Portuguese deposit transaction codes with VAT included.
2. No transaction codes without VAT included can be posted in Portugal during live day. Balance Transfer is the named example.
3. All guests must be checked out in the old system with no balance to transfer. They are checked in again in the new system. Do not transfer any balance.
4. Only A/R balance can be transferred, via the enter-old-balance option.
5. Use the new OPERA Cloud tool to create credit bills against folios from the old PMS. Posting negative charges is no longer allowed when there is no folio to credit.
6. Change the ATCUD for the V5-to-Cloud migration. See ATCUD and certificate below. **This is the highest-risk point.**
7. Deposit payments from OXI are not allowed.

## ATCUD and SAF-T certificate (critical)

- The property must request new ATCUDs for OPERA Cloud. The current ATCUDs were issued for OPERA V5 under a different SAF-T certificate.
- OPERA Cloud produces folios and credit bills under a different SAF-T certificate, so new ATCUDs are mandatory.
- When the property keeps the same property code, a prefix or suffix must be added to the series before the new ATCUD is requested.
- **Do not request the new ATCUDs until Oracle provides the final prefix or suffix.** Requesting early creates a fiscal mess. The action is to wait, not to move.

## Additional configuration notes

- Rates with VAT excluded cannot be used in Portugal. Confirm that VAT-excluded rates received from OXI will not be used.
- Tips, Paidout, City Tax (type Others), plus inclusive generates and VAT exemptions should already be configured in the current OPERA V5. Carry the same intent across.
- All transaction codes must allow manual postings. Allowances and adjustment transaction codes from chain templates cannot be used in Portugal.
- Packages: folio types 24 or 25, package inclusions must be shown on the folio.
- Pro-forma and A/R receipt are now in use.
- Create credit bills only via folio history and the new tool for inserting credit bills tied to the past PMS.
- Check Micros/Simphony and any other interface in case adjustment transaction codes are used in the IFC configuration. The posting transaction code must be the adjustment transaction code.
- Negative postings: provide the agreed workaround (credit bill against the original folio), not a negative charge.

## Folio types in scope (PT)

FR, FT, FS, NC, OU, PF and A/R receipt. Maps to the six mandatory PT folio types: FT, FR, FS, NC, OU, PF. A/R receipt is the receipt document, not a folio series.

---

# Folio stationery design: debit vs credit split (NC)

Tier 2, observed in UAT, OPERA Cloud build 26.1.4.0. Corroborated by direct inspection of the two stationery RTF files (`hlish_folio.rtf` and `hlish_folioc.rtf`).

The property runs **two physical folio stationeries**, reused across every folio group and both languages (E and PT). One handles all debit documents, one handles credit documents only. This enforces the rule that credit bills are real credit documents, never negative postings on the standard folio.

## The two stationeries

- **hlish_folio** (file `hlish_folio.rtf`): debit family. The RTF switches the document title by condition and prints FATURA, FATURA RECIBO / INVOICE RECEIPT, FATURA SIMPLIFICADA / SIMPLIFIED INVOICE and NOTA DE DÉBITO. A single stationery covers FT, FR, FS and ND.
- **hlish_folioc** (file `hlish_folioc.rtf`): credit family. Prints Nota de Crédito / Credit Bill and the NC document code. Nothing else.

Both stationeries carry the ATCUD through the merge code **P_UNIQUE_ID**, printed as "ATCUD: \<value\>", plus the digital signature hash. ATCUD and signature ride on the stationery merge codes, not a named OPERA Control. New ATCUDs feed both stationeries per document series.

## Folio Types mapping

Path: Financial > Cashiering Management > Folio Types. Folio type, attribute flag and assigned stationery:

| Folio type | Attribute | Stationery |
|---|---|---|
| FS | Simple | hlish_folio |
| FT | AR | hlish_folio |
| NC | Credit | **hlish_folioc** |
| OU | Information | hlish_folio |
| PF | Pro-Forma | hlish_folio |
| FR | (unconfirmed) | hlish_folio |

The single point that matters: **NC is the only folio type pointing at hlish_folioc**, and it carries the Credit attribute. Everything else points at hlish_folio.

## Report library evidence (Manage Reports, filter "folio")

Every folio group has a paired report. The C variant maps to internal name hlish_folioc, the non-C variant maps to hlish_folio, across EN and PT:

- Accounts Receivable Folio: AR Folio and AR FolioC
- Folios: Guest Folio and Guest FolioC
- POS Account Folio and POS Account Credit: POS Folio and POS FolioC
- Passerby Folio: PB Folio and PB FolioC
- Post It Folio: PI Folio and PI FolioC

There are only two underlying stationery files. The many named reports are presentation wrappers over hlish_folio and hlish_folioc.

## Build rule for any PT property

1. Build one debit stationery handling FT, FR, FS and ND by internal title condition.
2. Build one credit stationery handling NC only.
3. Assign the credit stationery to the NC folio type and set the Credit attribute.
4. Confirm P_UNIQUE_ID (ATCUD) and the signature merge codes are present in both.
5. Provide both EN and PT report variants per folio group, all pointing back to the two stationeries.

> **ND watch-item.** The debit stationery already carries a NOTA DE DÉBITO title path, but there is no ND folio type in the set (FR, FS, FT, NC, OU, PF only). The template supports a debit note but no folio type is wired to trigger it. Not a go-live blocker. If debit notes are needed, ND needs its own folio type pointing at hlish_folio. Confirm scope with finance.

---

# Folio types vs folio report groups (where POS Account folios fit)

Tier 1 for the concept (documented OPERA behaviour). Tier 2 for the stationery mapping (read from the report library screen).

These are two separate axes of configuration. Do not expect them to line up one to one.

## Axis 1: Folio Types (fiscal series)

Path: Financial > Cashiering Management > Folio Types. The Portugal fiscal side. Defines the document series and attributes (Credit, Manual, Simple, Information, Pro-Forma, AR): FR, FS, FT, NC, OU, PF. The folio type decides which fiscal document and series a settlement produces. POS Account Folio and POS Account Credit do not appear here because they are not fiscal folio types.

## Axis 2: Folio report groups (presentation layout by account context)

Path: Reports. The report library groups folio layouts by the account being printed, not by fiscal type. Each group is an account context:

- Folios: in-house guest reservation folio
- Accounts Receivable Folio: AR or city ledger account
- Passerby Folio: passerby account
- Post It Folio: Post It account
- POS Account Folio: folio printed for a POS account
- POS Account Credit: credit bill printed for a POS account

OPERA picks the report group automatically from the account context. The group only controls which physical layout prints. The fiscal document series still comes from the folio type at settlement.

## What a POS account is

A POS account is a posting account the POS interface (Simphony) uses for charges that are not sitting on a guest reservation. A restaurant or bar check that settles to an interface posting account rather than a room is the typical case. When OPERA prints a folio for that account it uses POS Account Folio for a normal bill and POS Account Credit for a credit bill.

## How it maps

Both POS groups reuse the same two stationeries:

- POS Account Folio maps to hlish_folio (debit family)
- POS Account Credit maps to hlish_folioc (credit family)

Same two physical files, same ATCUD (P_UNIQUE_ID) and signature merge codes. The POS groups are just the account-context wrappers.

## Practical check

If all Simphony charges route onto guest reservations or AR, the POS Account folio may almost never print. It still has to exist and carry the ATCUD and signature merge codes so any document raised on a POS account is compliant. Confirm how Simphony posts, which tells you whether POS Account folios are live or standby.

---

# Open actions

- Wait for Oracle's final prefix or suffix before any ATCUD request.
- Reconcile certificate 2978 (shared-cert claim) against the position that the cert differs between V5 and Cloud, before requesting from AT.
- Confirm that no VAT-excluded rates flow from OXI.
- Verify Simphony IFC posting codes resolve to adjustment transaction codes where adjustments are used.
- Confirm whether ND (debit note) is in scope; if so, wire an ND folio type to hlish_folio.
