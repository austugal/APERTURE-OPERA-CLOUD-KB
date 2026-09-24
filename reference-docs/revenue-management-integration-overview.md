# Revenue Management System (RMS) Integration Overview

A Revenue Management System (RMS) generates forward-looking rate and inventory recommendations based on demand, competitor pricing, historical patterns and strategic constraints. The RMS integrates with OPERA Cloud to receive booking and rate data, and to push recommendations back into OPERA Cloud rate codes and restrictions.

This document covers the generic RMS integration pattern. For IDeaS G3 RMS specifics consult `ideas-g3-continuous-pricing.md` in this repository.

---

## Reference documents

- Oracle Hospitality OPERA Cloud Revenue Management Integration documentation
- Partner-specific documentation: IDeaS G3, Atomize, Duetto, RevControl
- Oracle Hospitality OHIP rate plan API specifications

---

## Architecture

The RMS integration is bidirectional.

- **Outbound from OPERA Cloud to RMS:** reservations data, rate data, occupancy data, market segment performance, group blocks, restrictions in force
- **Inbound to OPERA Cloud from RMS:** rate recommendations, restriction recommendations, hurdle adjustments

Integration uses OHIP REST APIs (strategic) or legacy interfaces depending on the RMS partner and OPERA Cloud version.

---

## Data flowing to RMS

The RMS needs a complete picture of the property's booking position to generate recommendations.

| Data | Frequency |
|---|---|
| Reservations on the books | Daily, after night audit |
| Pickup data (new bookings, cancellations, modifications) | Real-time or hourly |
| Rate codes and current rates | On change |
| Inventory by room type | Daily |
| Restrictions currently active | On change |
| Group blocks and conversion ratios | Daily |
| Market segment configuration | On change |

---

## Recommendations from RMS

The RMS analyses the position against demand forecasts and returns recommendations.

| Recommendation type | Mechanism in OPERA Cloud |
|---|---|
| New BAR rate | Update to BAR rate code via API |
| Yield-driven rate adjustment | Update to yieldable rate code |
| Restriction (MinLOS, CTA, CTD, Stop Sell) | Push to rate code restrictions |
| Hurdle adjustment | Update to yield decision table |
| Inventory release or hold | Push to inventory controls |

---

## Yieldable rate functionality

OPERA Cloud supports yieldable rate codes which respond automatically to yield decisions from the RMS. Configuration is at Administration > Financial > Rate Management > Rate Codes.

A yieldable rate references a hurdle rate and a yield adjustment code. The RMS pushes the hurdle and adjustment values; OPERA Cloud calculates the effective rate.

This pattern is the foundation of IDeaS G3 continuous pricing.

---

## Dynamic Base Rate

Some rates are configured to derive their value dynamically from another rate (usually BAR) plus or minus a fixed amount or percentage. The base rate adjusts as RMS pushes new BAR. Dependent rates follow automatically.

Configure at Administration > Financial > Rate Management > Rate Codes > [Rate] > Rate Definition.

---

## OPERA Controls relevant to RMS

| Control | Purpose |
|---|---|
| Yieldable Rate functionality | Must be enabled |
| Dynamic Base Rate | Must be enabled |
| Hurdle Point handling | Configures hurdle behaviour |
| Daily Rates Max Days | Maximum forward horizon for rate decisions |
| Sell Limits Active | Whether sell limits feed into yield decision |

Set per Oracle RMS integration documentation and partner-specific guidance.

---

## Common RMS partners

| Partner | Notes |
|---|---|
| IDeaS G3 RMS | Widely deployed, supports continuous pricing |
| Atomize | Growing presence, cloud-native |
| Duetto | Strategic for some chains |
| RevControl | European focus |
| HotelPartner | Smaller properties |

Verify current Oracle Validated Integration status before specifying a partner.

---

## Integration testing

Before go-live.

- Confirm RMS receives initial dataset from OPERA Cloud
- Confirm RMS recommendations push correctly to BAR
- Validate yieldable rate behaviour with test rate scenarios
- Validate restriction propagation
- Test high-volume changes (e.g. event-driven yield)
- Confirm pickup data flowing in real-time or per agreed frequency
- Validate group block handling
- Confirm decision back to RMS after manual override

---

## Common issues

- BAR rate not updating because rate code is not configured as yieldable
- Restrictions not honoured because dependent rate codes not flagged correctly
- IDeaS G3 hurdle not applied because yield categorisation incorrect
- Daily rate window too short for RMS forecast horizon
- Pickup data missing reservations because event subscription gap

---

## OHIP migration

Many RMS integrations are migrating from legacy OWS or OXI to OHIP. The migration improves real-time event consumption via Business Events and uses the modern REST API. Coordinate with the RMS partner and Oracle Customer Success.

---

*Derived from Oracle Hospitality OPERA Cloud documentation and IDeaS G3 RMS continuous pricing reference. Not affiliated with Oracle Corporation. Partner names mentioned remain trademarks of their respective owners. Licensed CC BY-NC-SA 4.0.*
