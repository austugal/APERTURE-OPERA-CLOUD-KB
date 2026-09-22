# OPERA Cutover Guide — Reference Extract

Source: Oracle OPERA Cutover Guide for OPERA Cloud / OPERA 5, v1.02, January 2022.
Authors: N. Ferrara (2020 redwood move), M. Engel (Aug 2021 reservation pace), N. Ferrara (Jan 2022 OSEM update).

## Definition

Cutover transfers balances from a legacy PMS to OPERA. Three ledgers move: Deposit, Guest, Accounts Receivable. Reservations and in-house guest totals must balance across both systems before sign-off.

## Cutover types

- New Opening. No balances. OPERA installed pre-opening to accept reservations and deposits. Consultant on hand at door-open.
- Overnight Cutover. Begins evening, runs through the night. Lowest guest impact. Stayovers entered into OPERA, sometimes against a zero-amount rate code to avoid duplicate posting depending on OPERA business date.
- Daytime Cutover. Morning. Departing folios settled in legacy first, then stayovers and balances move to OPERA.

## Cutover meeting purpose

Lead consultant establishes timeline. Assigns: who leads on property, who verifies balances, who signs Confirmation of Acceptance, who owns each outstanding configuration item, interface plan, when final audit runs in legacy, who provides final legacy ledgers, consultant availability during live support.

## Credit cards

Authorisations generally do not carry forward. Standard approach: charge guest card in legacy, transfer little or no in-house balance to OPERA. Decisions needed: how much to charge (balance only or full stay), incidentals authorisation handling, debit card handling at check-in, post-cutover authorisations, refund handling for legacy charges.

## Cutover letter

Brief guest comms explaining system change. Sample text exists in guide. Key message: guests may receive two statements at checkout — one from legacy showing charges through cutover date, one from OPERA showing charges from go-live date onward.

## Data entry

Pre-cutover: future reservations, group blocks, events, posting masters, AR account shells.
Cutover day: in-house guest information and balances, deposits, AR balances.

OPERA Business Date must be confirmed before any financial data entry. Wrong business date can block go-live.

Individual and group reservations: some come via online reservation interface push, others manual. Inventory must balance between systems. Departing guests during or after cutover must be accounted for, including housekeeping status and security.

Posting Masters created same as reservations. PM balances included in Guest Ledger. AR accounts created in advance, AR balances posted after legacy final audit.

Old AR balances the property does not intend to collect must be cleared in legacy first. Both systems must balance to the cent.

OSEM events including resources must transfer pre-go-live. Function space availability and catering revenue must reconcile.

Advance deposits added to reservations after reservation and block data entry complete.

Out of Order and Out of Service rooms must be entered into OPERA.

Offline charges: during the window between legacy interface disconnect and OPERA interface connect, charges must be captured manually. Some interfaces buffer postings, others do not. Verify per interface.

## Balance transfer

Three ledgers, three methods.

### Guest Ledger
Transaction Code: Guest Ledger Balance Forward.
Posted against in-house reservations.
Posted after legacy final audit.
Reconcile using Guest Ledger Detail Report or Journal by Cashier and Transaction Code.

### Deposit Ledger
Transaction Code: Advanced Deposit Balance Forward.
Posted directly to corresponding reservations or blocks.
Reservation data entry must be complete first.
Reconcile using Deposit Ledger report.
New deposits held until balances signed off.

### AR Ledger
Path:
OPERA Cloud: Toolbox > Utilities > Data Management > AR Enter Old Balances.
OPERA V5: OPERA Configuration > AR > Enter Old Balances.
Do not post AR balances directly into the AR module.
Post by Aging Period or by Invoice.
Reconcile using AR Detailed Aging report.

## Live support

Begins post-cutover. Hours per contract. Property must staff first days fully including night audit. Consultant supports trained staff, does not retrain. Property champions handle procedural questions. System-impact issues escalate to consultant immediately.

## Wrap-up call

Attendees: Lead Consultant, Oracle Project Manager, Property Managers and Supervisors.
Goals: review installation, close outstanding issues, address open SR tickets, hand over to Oracle Support, confirm MOS login created, verify Confirmation of Acceptance signed.

## Cutover Day Checklist — condensed

### Week prior preparation
- System date correct for live day (Oracle, before data entry)
- Clean up old AR and PM (Property, prior to go-live)
- Create AR profiles in OPERA
- Cutover letter prepared
- Resource plan and task assignments ready
- All future reservations + blocks entered. Minimum 3 months if full not feasible. Cutoff date on every block.
- Stayover reservations created with payments and billing instructions
- Legacy credit card auth numbers entered if possible
- Confirm deposit-bearing reservations exist in OPERA
- EOD Reservation Pace parameter on for Reporting Analytics (Oracle)
- Verify rates, packages, taxes with correct tax elements
- Stationery attached and tested
- AR data entry started, aging levels populating
- Availability balanced from live day onwards
- Stayover guests arriving pre-live-day have OPERA reservations
- Dummy PM accounts carried over
- POS accounts and Lost Interface Account 9500 reservations created
- Deposits for future bookings posted using deposit carried forward
- OOO/OOS rooms entered
- User rights, users, cashiers verified
- Workstations and printers tested

### OSEM pre-go-live
- Configuration complete including shared PMS config
- Translations done if required
- Users created, roles assigned, act-as verified, cashier ID assigned if event posting in use
- Accounts/contact profiles created
- Blocks created, room grid completed, rooming lists inserted for picked-up
- Events created on all blocks with resources attached
- PMs attached to blocks where PMS-created without block
- BEOs and word merge documents reviewed and signed off

### Go-live day
- Distribute cutover letter
- Verify only AR Balance Forward and Deposit Balance Forward have posted (Oracle)
- Confirm deposits entered, reports from both systems to consultant
- Check in all required Posting Masters
- All open PMs have reservations
- Check in PM reservations that should be in-house
- Check in Interface Lost Postings Account (default PI 9500)
- Stop bookings and interfaces in legacy
- Stayovers in correct rooms, checked into OPERA
- OOO/OOS verified
- Balance and shutdown outlets, balance cashiers, freeze postings in legacy
- Run final legacy EOD
- Print three copies of every in-house and PM folio from legacy
- Print legacy balance totals
- Enter guest balances via balance forward codes
- Deposits in balance, signed
- New AR invoices entered
- Foreign currency exchange rates entered
- Availability balanced to furthest date
- Inventory and date/rate restrictions confirmed
- Sign off AR, Guest, Deposit ledgers
- Check out remaining departures from legacy
- Update OPERA HK statuses
- Re-enter active guest messages from legacy
- No new check-ins to legacy
- Check in any guests arrived since legacy went down

### OSEM go-live
- Events in balance, signed
- Booked rooms within blocks in balance, signed

### Post go-live
- File legacy folio copies: one to registration card or checkout location, one to accounting, one to management
- Validate in-house list: rooms, rates, routing so balance forward goes to City Ledger (AR)
- Post offline charges captured during interface downtime
- Reverse balance carried forward codes (VAT reversal where regionally required)
- Inactivate Deposit, Guest, AR Balance Forward transaction codes
- Restart and test property interfaces

### After first EOD
- Verify exports generated and delivered
- Check night audit reports
- Submit SRs, send outstanding issues list to PM

### Installation wrap-up
- Wrap-up call
- COA submitted to Oracle PM

## Tiago notes
- The VAT reversal step after go-live is the one that catches teams in fiscal jurisdictions. In Portugal, balance forward postings against in-house guests can create SAF-T inconsistencies if VAT is not properly reversed. Validate against PT_SAFT_104 output the morning after first EOD.
- Lost Postings PI 9500 is standard. If multiple interfaces are routed through separate buffer accounts, document the mapping. Some chains use non-default PI numbers per region.
