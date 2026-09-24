# IFC8 POS Interfaces

Step-by-step setup of a third-party point of sale system posting to OPERA Cloud through IFC8: guest lookup, room charges, revenue centre mapping and posting control.

Tier legend. **[T1]** Oracle documentation. **[T2]** observed on live implementations. **[T3]** inference, labelled. Back to [IFC8 guides](opera-doc.html?file=ifc8-guides-index.md).

## 1. Choose the right integration [T2]

- **Oracle Simphony** usually integrates with OPERA Cloud through its own OPERA integration rather than a generic IFC8 POS driver. Confirm with the Simphony team before planning IFC8.
- **Third-party POS** systems commonly use IFC8 with a POS driver, or OHIP APIs where the vendor has an OHIP integration. Prefer the vendor's certified route. Check the [Oracle Cloud Marketplace](https://marketplace.oracle.com/consumer+industries/listings?product=Hospitality+Cloud&hidden=product) listing.

Simphony sends only two service charge itemisers to OPERA unless the full breakdown is enabled. Agree the breakdown before mapping transaction codes. [T2]

## 2. Scope with the vendor [T2]

1. IFC8 driver and version.
2. Outlets (revenue centres) and their numbers in the POS.
3. Functions: guest lookup by room or name, room charge posting, credit limit check, posting to non-room accounts.
4. What each posting carries: total only, or split by food, beverage, tips, service charge, tax.
5. Check number format and whether it prints on the folio.
6. Behaviour when OPERA is unreachable: offline posting and later re-send, or refuse the room charge.

## 3. OPERA Cloud configuration

### 3.1 Property interface

Administration > Interfaces > Property Interfaces. Create an interface of type POS. Record the interface number for IFC8. [T2] for the path.

### 3.2 Revenue centre and itemiser mapping

Map each POS outlet and each itemiser to an OPERA transaction code [T2]:

| POS outlet | Itemiser | OPERA code | Description |
|---|---|---|---|
| 1 Restaurant | Food | 2000 | Restaurant food |
| 1 Restaurant | Beverage | 2010 | Restaurant beverage |
| 2 Bar | Beverage | 2110 | Bar beverage |
| All | Tips | 9500 | Tips paid out, or tips payable to staff |
| All | Service charge | 2900 | Service charge |

Tax: decide whether the POS sends net amounts and OPERA generates tax, or sends gross amounts with tax inclusive codes. Mixing both double counts tax. [T2]

In a fiscalised country the POS issues its own fiscal document for the meal. The room charge posted to OPERA must not produce a second fiscal document for the same sale. Agree the treatment with the fiscal partner. [T3]

### 3.3 Posting rules

Decide [T2]:

- Which reservation statuses can receive posts: checked in only, or also due out.
- Whether "no post" flags on reservations block POS charges.
- Credit limit checks on room charges.
- Posting to PM or house accounts for staff meals and complimentary items.

## 4. IFC side

1. Install the controller and IFC8. See [installation guide](opera-doc.html?file=ifc8-controller-installation.md). [T1]
2. Link IFC8 to the POS interface number. [T1]
3. Configure the POS connection and outlet list in the driver. [T2]

## 5. Test script [T2]

| # | Action | Expected result |
|---|---|---|
| 1 | Look up an in-house guest by room number | Correct name returned |
| 2 | Look up by name with two guests sharing | Both returned, cashier picks the right one |
| 3 | Post a restaurant bill with food and beverage to the room | Two lines on the folio on the right codes, amounts and tax match the POS check |
| 4 | Post with a tip | Tip lands on the tips code |
| 5 | Post to a guest with No Post | POS refuses the charge |
| 6 | Post over the credit limit | Behaviour matches the agreed rule |
| 7 | Post to a checked-out room | Refused, or routed as agreed |
| 8 | Void the check in the POS | Correction posts in OPERA, or process documented if the driver cannot void |
| 9 | Post during night audit | Posting lands on the right business date |
| 10 | Stop IFC8, post, restart | Posting re-sends or the POS refuses. No silent loss |

## 6. Common failures [T2]

| Symptom | Likely cause |
|---|---|
| Postings on the wrong code | Itemiser to transaction code mapping incomplete |
| Tax counted twice | POS sends gross and OPERA also generates tax |
| Room charges lost | POS offline mode off and IFC8 was down |
| Folio shows one total line | POS sends totals only. Enable itemiser breakdown |
| Guest lookup fails for sharers | Driver returns only the primary guest |
