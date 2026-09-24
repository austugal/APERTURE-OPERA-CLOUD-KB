# Channel Manager Integration Overview

A channel manager is a software platform that distributes a property's rates, availability and inventory (ARI) to OTAs, GDS, metasearch and direct booking channels, while collecting reservations from those channels and returning them to OPERA Cloud.

This document covers the generic channel manager integration architecture in OPERA Cloud, ARI synchronisation, reservation flow and rate plan mapping.

---

## Reference documents

- Oracle Hospitality OPERA Cloud Distribution documentation (My Oracle Support)
- Oracle Hospitality OHIP partner documentation for channel manager integration
- Partner-specific integration guides (SiteMinder, SynXis, Profitroom, D-EDGE, etc.)

---

## Architecture

The channel manager integration sits between OPERA Cloud and the distribution channels. The integration is typically bidirectional.

- **Outbound from OPERA Cloud:** ARI updates (availability, restrictions, rates) flow to the channel manager which distributes them to connected channels
- **Inbound to OPERA Cloud:** Reservations created on connected channels flow back to OPERA Cloud and create reservations

Integration uses either OHIP (strategic) or legacy OXI (older partners).

---

## Rate plan mapping

Each rate code in OPERA Cloud maps to one or more rate plans in the channel manager. The channel manager then distributes those rate plans to OTAs and other channels with channel-specific mappings.

Mapping considerations.

- BAR rate maps to standard public rates across channels
- Promotional rates map to channel-specific promotions (Mobile, Member, Last Minute, etc.)
- Package rates require careful mapping to ensure correct rate distribution
- Negotiated rates typically do not distribute through public channels

---

## Inventory synchronisation

OPERA Cloud pushes room type availability to the channel manager. The channel manager allocates inventory across channels based on chain or property strategy.

Sync patterns.

- Pooled inventory: all channels share the same pool. Oversells handled by channel manager logic
- Allocated inventory: each channel has a dedicated allocation. Manual adjustment as bookings come in
- Hybrid: some room types pooled, others allocated

OPERA Cloud's strategic model favours pooled inventory with channel manager arbitration.

---

## Rate restrictions

Restrictions configured in OPERA Cloud propagate to the channel manager and then to channels.

- Minimum stay (MinLOS)
- Maximum stay (MaxLOS)
- Closed to arrival (CTA)
- Closed to departure (CTD)
- Stop sell (Closed for specific dates)
- Booking window restrictions

---

## Reservation flow

When a booking is made on a connected channel.

1. The OTA or other channel sends the reservation to the channel manager
2. The channel manager translates the reservation into OPERA Cloud format
3. The channel manager pushes the reservation to OPERA Cloud (via OHIP or OXI)
4. OPERA Cloud creates the reservation, optionally with payment tokenisation via OPI
5. OPERA Cloud sends an acknowledgement to the channel manager
6. The channel manager confirms back to the OTA

Modifications and cancellations follow similar flows.

---

## Common channel manager partners

Each partner is independently certified. Always verify current Oracle Validated Integration status before specifying a partner.

| Partner | Notes |
|---|---|
| SiteMinder | Widely deployed, supports OHIP integration |
| Sabre SynXis | Both CRS and channel manager capabilities |
| Profitroom | Eastern Europe strong presence |
| D-EDGE | Pan-European deployment |
| RateGain | Global presence |
| Cloudbeds Distribution | Smaller properties |

This list is illustrative and not exhaustive. Validate via Oracle Cloud Marketplace.

---

## Common issues

- Rate parity violations between channels due to mapping inconsistency
- Overbooking when pooled inventory exhausts faster than channel manager updates propagate
- Reservation duplication when retries occur during network failures
- Mapping drift when new rate codes added in OPERA without channel manager update
- Channel-specific restrictions not honoured because channel manager does not fully support them
- Rate code packages incorrectly priced on certain channels

---

## Integration testing

Before production cutover, validate.

- Full ARI push from OPERA Cloud to channel manager
- Full ARI distribution from channel manager to each channel
- Test booking on each major channel completes successfully
- Modification and cancellation tested per channel
- Payment tokenisation via OPI tested where applicable
- Restriction propagation tested per restriction type
- High-volume sync tested (full inventory refresh)

---

## OHIP migration

Legacy channel manager integrations via OXI are being progressively migrated to OHIP. Migration requires.

- Partner readiness on OHIP
- Customer-side reconfiguration
- Parallel run period to validate behaviour
- Cutover with rollback plan

Coordinate via Oracle Customer Success and the channel manager partner account team.

---

*Derived from Oracle Hospitality OPERA Cloud Distribution documentation. Not affiliated with Oracle Corporation. Partner names mentioned remain trademarks of their respective owners. Licensed CC BY-NC-SA 4.0.*
