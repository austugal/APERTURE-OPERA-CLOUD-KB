# OXI (OPERA Xchange Interface) Overview

OXI is the legacy XML-based message broker that handles bidirectional interface communication for OPERA. It predates OHIP and is being progressively superseded by OHIP REST APIs and Business Events for OPERA Cloud integrations. OXI remains in use for legacy partner integrations and certain message types not yet covered by OHIP.

This document covers OXI architecture, message structure, namespace handling and integration design considerations. For new integrations, OHIP REST APIs are the strategic path.

---

## Reference documents

- Oracle Hospitality OPERA Xchange Interface User Guide (My Oracle Support)
- Oracle Hospitality OPERA Cloud Distribution documentation
- Oracle Hospitality OHIP User Guide (for the OHIP successor path)
- profile.fidelio.4.0 XSD schema (Oracle published)

---

## Architecture

OXI is a message-oriented middleware that exchanges XML payloads between OPERA and external partner systems. Each interface partner has a dedicated OXI interface configuration in OPERA (typically named OXI_HUB, OXI_CRO, OXI_LITE, OXI_HTL depending on the integration type).

Messages travel in inbound and outbound queues per interface. Each message is processed against conversion tables that translate codes between OPERA and the partner system. Processed messages produce business actions in OPERA (create reservation, update profile, post charge) or are forwarded to the partner.

---

## Message envelope and namespace

OXI XML payloads use the profile.fidelio.4.0 namespace. The standard envelope contains.

- Header (source system, target system, message ID, timestamp, action)
- Body (the functional payload)

Body content varies by message type.

---

## Common message types

| Message type | Purpose |
|---|---|
| Profile | Guest, company, travel agent, source, contact profile create or update |
| Reservation | Create, modify, cancel reservation; check-in and check-out events |
| Block | Group block create, modify, cancel; rooming list updates |
| Rate | Rate publication and updates |
| Inventory | Room availability updates |
| Stay record | Past stay history for loyalty and analytics |
| Charge posting | F&B or other revenue posting from POS or third-party systems |
| Membership | Loyalty programme updates |
| Resync | Bulk synchronisation request between OPERA and partner |
| Message envelope | Acknowledgment and error responses |

---

## Conversion tables

OXI translates between OPERA codes and partner-system codes via conversion tables. Examples.

- Market code conversion
- Source code conversion
- Rate code conversion
- Room type conversion
- Reservation type conversion
- Country code conversion (often ISO 2-letter vs 3-letter)

Conversion table maintenance is one of the most common sources of OXI integration issues.

### Membership conversion

**Field note, observed on a live OPERA Cloud property with a third-party booking engine, not Oracle-documented.** An inbound `<Membership>` block is resolved as two lookups in a fixed order:

1. **Membership type**, from `<programCode>`, matched against the **external code** of the membership type conversion. The OPERA code is not used for the match
2. **Membership level**, from `<mfMembershipCategory>`, matched against the membership level conversion. This only happens if step 1 succeeds

If the type fails, the whole block is dropped and the level mapping is never read, however correct it is. Two failures seen in sequence on one integration:

- The sender put the level name in `<programCode>`. OPERA returned *"Valid Membership Type not found in OPERA for <value>"* and created no membership
- The sender sent the OPERA code (`CLUBX`) while the conversion's external code was an alias (`CLUBXX`). No match, membership dropped. Fixed by setting the external code to the exact value the sender transmits

`<accountID>` landed as the membership card number, as sent. There was no conversion table for it.

Open question from the same case, unresolved: after an enrollment default was cleared (see [loyalty-membership-configuration.md](loyalty-membership-configuration.md)), the level stopped populating although the type resolved and the mapped level value was still present. Whether OXI processes `mfMembershipCategory` as a level in every configuration is not confirmed.

---

## Queue management

Each OXI interface has separate inbound and outbound queues.

| Queue state | Meaning |
|---|---|
| Pending | Awaiting processing |
| In Progress | Currently being processed |
| Success | Processed without error |
| Failure | Processing failed; requires intervention |
| Skipped | Filtered out by configuration |

Queue management is at Toolbox > Interfaces > OXI > Queue Monitor (or equivalent path per version).

---

## Comparison: OXI vs OHIP

| Dimension | OXI | OHIP |
|---|---|---|
| Protocol | XML over JMS or HTTP | REST / JSON over HTTPS |
| Pattern | Message broker with queues | API-first with streaming events |
| Authentication | Per partner credentials | OAuth2 |
| Real-time events | Polling via queue | Streaming Business Events (WebSocket) |
| Discoverability | Partner-specific documentation | Self-service developer portal |
| OPERA Cloud strategic path | Legacy, being phased out | Strategic future |
| New integrations | Not recommended | Recommended |

---

## When OXI is still used

- Legacy CRS to OPERA Cloud integrations that have not migrated to OHIP
- Specific operational message types where OHIP coverage is incomplete
- Property-to-property data flow within multi-property OPERA Cloud chains where chain CRS uses OXI

---

## Design considerations for OXI integrations

- Conversion table accuracy: every code used by either system must have a conversion entry
- Message sequencing: out-of-order messages can corrupt state; ensure partner respects sequence
- Resync handling: large resyncs can flood queues; coordinate with Oracle on rate limiting
- Error notifications: configure email alerts on failed messages
- Sandbox testing: validate every message type against a non-production OPERA before production cutover

---

*Derived from Oracle Hospitality OPERA Xchange Interface documentation and OPERA Cloud Distribution documentation. Not affiliated with Oracle Corporation. Licensed CC BY-NC-SA 4.0.*
