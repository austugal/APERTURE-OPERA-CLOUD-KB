# OHIP Business Events Reference

Business Events are real-time notifications published by OPERA Cloud when operational changes occur (a reservation is created, a guest checks in, a folio is posted). Integration partners subscribe via OHIP and consume these events to keep their systems in sync without polling.

This document covers the Business Events architecture, subscription model, common event types and integration design considerations.

---

## Reference documents

- Oracle Hospitality Integration Platform user guide: https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/
- OHIP REST API specifications: https://github.com/oracle/hospitality-api-docs (see `rest-api-specs/property/int.json`)
- Oracle OHIP Developer Portal (partner access)

---

## Architecture

When a configured business event occurs in OPERA Cloud, the event is queued by the platform. Subscribed consumers retrieve events either via REST dequeue (pull pattern) or via streaming WebSocket (push pattern, where available).

Each consumer is identified by a unique `consumer code` registered against the external system and the hotels in scope. Events stay in the queue until acknowledged or until the retention window expires.

---

## Subscription model

A partner must.

1. Be enrolled in Oracle Partner Network with Hospitality expertise track
2. Be provisioned in the Oracle Hospitality Developer Portal
3. Be granted access to the customer's OPERA Cloud tenant by the hotel (via Integration Manager role in OCIM)
4. Configure a consumer code per external system and per hotel set
5. Configure event subscriptions defining which event types are of interest
6. Implement event consumption with proper acknowledgement

---

## Event categories

Events are grouped by subject area. Each subject area exposes multiple specific event types.

| Subject area | Examples of event types |
|---|---|
| Reservation | New reservation, reservation modified, reservation cancelled, check-in, check-out, no-show, room move, room status update |
| Profile | New profile, profile updated, profile merged, profile linked to membership |
| Block | New block, block status changed, block cut-off, rooming list updated |
| Cashiering | Charge posted, payment received, folio settled, adjustment applied |
| Inventory | Room status change, out of order, housekeeping inspection |
| Loyalty | Member enrolled, points accrued, points redeemed, tier upgrade |
| Rate | Rate code created, rate availability changed, restriction applied |
| AR | AR account created, payment applied to AR, AR transferred to property |
| Front desk | Room assignment, key generation, registration card printed |

For the authoritative list per OPERA Cloud release consult the OHIP API specifications, specifically `rest-api-specs/property/int.json` in the Oracle repository.

---

## Event payload structure

A business event message typically contains.

- Header: event ID, event type, event subtype, timestamp, source system, target consumer
- Subject identifier: reservation ID, profile ID, block ID, folio ID
- Operation type: CREATE, UPDATE, DELETE, ACTION (where ACTION = a specific operational action like CHECKIN)
- Body: relevant business data fields needed by typical consumers (full object reference is via separate API call where deep data is needed)

Consumers should treat the event as a notification, not a complete data record. Where deep data is required, the consumer calls the relevant OHIP REST API using the subject identifier from the event.

---

## Consumption patterns

### Pull pattern (REST dequeue)

The consumer periodically calls the dequeue API to retrieve a batch of pending events.

```
GET /int/v1/businessEvents/getBusinessEventsByExternalSystem
```

The consumer processes events and acknowledges successful processing. Unacknowledged events remain in the queue and are redelivered on the next poll.

Maximum batch size per request is documented in the OHIP API specifications (currently 20 per request for the `getBusinessEventsByExternalSystem` operation).

### Push pattern (streaming)

Where available, the consumer establishes a WebSocket connection and receives events in real time without polling. Reduces latency but requires the consumer to maintain a persistent connection.

---

## Common design considerations

### Idempotency

Events may be redelivered. Consumers must handle duplicate events gracefully by storing the event ID and skipping previously-processed events.

### Ordering

Event ordering within a single subject (e.g. reservation ID) is generally maintained, but cross-subject ordering is not guaranteed. Consumers that need cross-subject ordering must implement their own sequencing logic based on event timestamps.

### Backpressure

If a consumer falls behind, the queue depth grows. Monitor queue depth and provision sufficient processing capacity. Sustained backlog risks events expiring from the queue.

### Error handling

Failed event processing should not block the queue. Implement dead-letter handling for events that fail repeatedly. Log enough context to re-process manually if needed.

### Network resilience

OHIP endpoints are cloud-hosted. Consumer applications should handle transient network failures with retries and exponential backoff. OAuth2 token refresh must be automatic.

---

## Setup checklist

For a new consumer subscription.

- OPN membership and Hospitality expertise confirmed
- Consumer application registered in Developer Portal
- OAuth2 client credentials issued and stored securely
- Consumer code defined per external system and hotel set
- Event subscriptions defined for each event type of interest
- Hotel integration manager has granted access to the consumer
- Sandbox testing complete (use `SAND01` hotel for partner sandbox)
- Production monitoring and alerting configured
- Acknowledgement handling tested under failure scenarios

---

## Common issues

- **Events not arriving:** verify consumer code matches configured subscription and hotel grant is active
- **Duplicate processing:** add idempotency layer keyed on event ID
- **Authentication failures:** confirm OAuth2 token refresh logic; integration user passwords expire after 1 year
- **Queue backlog:** check consumer health, processing rate, network connectivity
- **Missing event type:** confirm event type is published for the OPERA Cloud release in use; new event types are added per quarterly release

---

*Derived from Oracle Hospitality Integration Platform documentation and the publicly available OHIP REST API specifications. Not affiliated with Oracle Corporation. Licensed CC BY-NC-SA 4.0.*
