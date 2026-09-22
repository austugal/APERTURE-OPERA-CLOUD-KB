# IDeaS G3 RMS Continuous Pricing — OPERA Cloud Configuration

Source: partner RMS integration documentation for IDeaS G3 Continuous Pricing, 2022. Authored for OPERA Cloud PMS integration.

## Purpose

Configure OPERA Cloud to support IDeaS G3 RMS continuous pricing. This enables IDeaS to push BAR rates and last room value hurdles to OPERA, with yieldable rate codes deriving from a dynamic DAILY base rate.

## License

OPP_IDEA must be active. This enables LRV (Last Room Value), Opera Hurdle, and BAR Rate Upload. Oracle activates the license. Confirm before configuration begins. No license, no configuration.

If the property is upgrading from IDeaS G2 to G3, verify the communication method URL between IDeaS and OPERA PMS. Non-mandatory but advised.

## Primary OPERA Controls

### Rate Management activations
Path: Administration > Enterprise > OPERA Controls > Rate Management.

Required:
- Daily Rates: Active
- Dynamic Base Rates: Active
- Best Available Rates: Active
- Best Available Rate Type: BEST BAR BY DAY
- Advanced Dynamic Base Rates: Active

### Number of days
DAILY_RATES_MAX_DAYS = 405. Sets the forward horizon for daily rate configuration. Path: Administration > Enterprise > OPERA Controls > Rate Management > Daily Rates Max Days.

### Inventory Management
Path: Administration > Enterprise > OPERA Controls > Inventory Management.

- Sell Limits: Active (enables overbooking functionality)
- Restrictions: Active
- Rate Category Restrictions: On
- Rate Code Restrictions: On
- Room Class: Active (required for room type groupings)

## Yield Category configuration

Path: Administration > Financial > Rate Management > Yield Categories.

Yield categories in OPERA must mirror the Room Type to Rate Code (RT to RC) mapping in IDeaS G3 RMS. Create, edit, or delete to align. Click New, enter Code and Description. Examples from doc: EXC (Executive), STU (Suite), SUP (Superior).

## Attach Room Type to Yield Category

Path: Administration > Inventory > Room Types.

For each room type:
1. Click ellipsis > Edit.
2. Yield Status: Yieldable.
3. Yield Categories: select the matching code.

Mapping logic must match the IDeaS G3 RT-to-RC mapping exactly. Mismatch breaks the LRV upload and hurdle comparisons.

## LRV (Last Room Value) / Hurdle Rate verification

Path: Administration > Financial > Rate Management > Hurdle Rates.

Verify the menu option exists. Hurdle Rate displays in column four of the Hurdle Rates view. Each row shows Date, Room Type, Yield Category, Hurdle, Delta, Ceiling, Override flag.

## DAILY rate code configuration

Path: Administration > Financial > Rate Management > Rate Codes.

**Critical warning from the guide:** For new openings and migrations from scratch, build DAILY and dependent rate codes in the Oracle Pre-Installation Workbook (PIW) before import. Configuring manually post-import is harder. Confirm pricing per code with the RM hub and team before populating PIW.

### Create DAILY rate code

Rate Code Definition:
- Rate Code: DAILY
- Description: Daily Rate
- Start Sell Date and End Sell Date: full horizon
- Rate Category: assign
- Room Types: attach all yieldable types

Financial Details:
- Transaction Code: attach (typically 1000 series for rooms)
- Print Rate: ticked
- Suppress Rate, Discount, Day Use, Complimentary, House Use, Negotiated: unchecked unless required

Rate Code Type:
- Best Available Rate: ticked
- Daily Rates: ticked

Save.

### Set DAILY as Yieldable
After creation, open Rate Code Details > Rate Controls & Distribution > Edit. Yieldable: Y. Save.

## Dependent rate code configuration

Rate codes that derive from DAILY must be:
1. Yieldable = Y.
2. Configured as Dynamic Base Rate.

### Example: RA3 (DAILY minus 10%)

Rate Code Type:
- Dynamic Base Rate: ticked
- Base Rate: DAILY
- Amount: -10.00, Percentage selected
- Rounding: None
- Compare With Rate Detail: unchecked unless required

Save.

### LRA rate codes yielding as BAR

If the rate code is Last Room Availability (LRA) and contracted to yield as BAR, enter the designated BAR rate code in the **Yield As** field within Rate Controls & Distribution. This routes the yield calculation against the BAR hurdle, not the rate's own pricing.

## Pricing Schedules for derived rate codes

After Dynamic Base Rate setup, open Pricing Schedules tab on the derived rate code:
- New
- Start Date and End Date matching the rate code sell window
- 1 Adult: 0.00 (price calculated dynamically from DAILY)
- Room Types: select all active types for the property
- Save

The zero pricing is intentional. The amount comes from DAILY at runtime via the indexation formula.

## Yield Adjustment Codes

Path: Administration > Financial > Rate Management > Yield Adjustment Codes.

Purpose: handle package inclusions and LRA premiums in the yield calculation. When a rate code includes a breakfast package, the package value must be subtracted before comparing against the hurdle. When a rate is LRA, a premium is added.

### Naming convention
Prefix with A then mirror the package code spelling. Example: BKF breakfast package > ABKF adjustment code.

### Description
Recognisable purpose. Example: "Adjustment Breakfast Split EUR 12".

### Type
- ST: Per Stay
- NZ: Per Night
- PN: Per Person Per Night
- PS: Per Person Per Stay

### Amount logic
- Negative amount (e.g. -12): subtracted from rate before hurdle comparison. Original EUR 120 minus EUR 12 breakfast = EUR 108 compared to hurdle.
- Positive amount (e.g. +20): added to rate. Used for LRA premium accounting. EUR 120 plus EUR 20 = EUR 140 compared to hurdle.

### Application
After creating adjustment codes:
1. Administration > Financial > Rate Management > Rate Codes
2. Select packaged rate code
3. Rate Detail tab
4. Adjust on each rate detail line
5. New > add adjustment code
6. Repeat per rate detail line
7. Save
8. Repeat for every packaged rate code

## Time estimates from the guide

- Primary settings (controls activation): 5 min
- Yield Category configuration: 5 min
- LastRoomValue verification: 5 min
- DAILY rate code creation: 15 min
- Rate codes indexation configuration: 120 min
- Yield Adjustment Codes plus application: 180 min

Total greenfield: roughly 5 to 6 hours. Migration from G2 to G3 reduces this if codes already exist.

## Common failure points

- DAILY_RATES_MAX_DAYS left at default (less than 405). Truncates the IDeaS upload horizon.
- Yield Category codes do not match IDeaS RT-to-RC mapping. LRV uploads fail silently.
- Sell Limits inactive. Overbooking cannot function, IDeaS recommendations cannot be enforced.
- DAILY not flagged Yieldable. The whole derivation chain breaks.
- Dependent rate code Pricing Schedule populated with non-zero amount. The indexation calculation produces unexpected rates.
- Adjustment Code amount sign wrong. Hurdle comparison includes or excludes package value incorrectly. Yield decisions wrong.

## Tiago notes

- Where a property shows an IDeaS RMS configuration gap, check whether the OPP_IDEA licence is active and whether DAILY exists as a Dynamic Base Rate. Those are the likely missing pieces.
- For chain rollouts, confirm with the regional revenue management hub what the standard yieldable percentages are before populating PIW. Defaults often differ by brand tier.
- The 405-day setting is a common value across major chains.
- For Portugal properties, the adjustment code amount must reconcile against the SAF-T package allocation, otherwise yield decisions diverge from fiscal reporting.
