# OPERA Cloud 26.x OHIP Observability

Across four releases Oracle made OHIP integration observable in a way it was not a year ago.
Individually each change is small. As a set they change how an integration is troubleshooted, and
that is worth knowing before the next go-live.

Verified 2 September 2026 against Oracle's Release Readiness Guides. **Corrected 2026-09-14: the arc
starts at 25.5, not 26.1** — reading 25.5 for the backfill found that Data Value Mapping itself
shipped there, one release before the business events that instrument it. See
[releases/opera-cloud-25.5.md](releases/opera-cloud-25.5.md).

---

## The arc

| Release | Change | What it gives you |
|---|---|---|
| 25.5 | **Data Value Mapping exists at all**, across eight named code categories | The translation layer itself — with no change notification yet |
| 26.1 | Business Events fire on **Data Value Mapping changes** | You learn a mapping changed, instead of discovering it by breaking |
| 26.2 | **Streaming payloads support DVM** for select events | Translation happens upstream, not in the consumer |
| 26.3 | **Async Queue UI** for asynchronous API request status | The outcome of an async call is visible from inside OPERA |

Between 25.5 and 26.1 — roughly December 2025 to February 2026 — DVM was configurable with no change
notification at all. A property still on 25.5 is in that window now.

---

## 26.1: Business Events for Data Value Mapping changes

Oracle wording: new Business Events for Data Value Mappings are added, giving real-time
notifications for changes in Data Value Mapping configurations. Listed under Integrations.

DVM is the translation layer between OPERA codes and a partner's codes. When somebody changes a
mapping, every downstream consumer starts receiving different values, and until now they found out
by breaking.

Emitting an event on mapping change lets an integration react, or at minimum lets the partner log
that the contract changed underneath them. On a channel manager or a back-office feed that is the
difference between a controlled change and a support case.

**Not documented:** which DVM entities emit events, the payload shape, or whether the event carries
before and after values. That last one determines whether a consumer can react automatically or
only be alerted.

---

## 26.2: DVM applied to streaming payloads

Oracle wording: Business Events streaming is updated to support Data Value Mapping for select
business events, to ensure downstream compatibility. Listed under Integrations.

Applying DVM to the streamed payload rather than leaving the consumer to translate moves that work
upstream and removes a class of mapping bug from partner integrations.

**Not documented:** "select business events" is doing a lot of work in that sentence and Oracle
does not say which. Nor does it say what happens to an event whose mapping is missing. Both matter
before promising a partner their payload arrives translated.

**Also in 26.2:** Service Locator changes are now written to change logs, improving auditability on
transactions.

---

## 26.3: Async Queue UI

Oracle wording: a new user interface is introduced in OPERA Cloud to provide visibility into the
status of asynchronous API requests. Listed under Integrations.

This is the most useful integration item in the three releases.

Asynchronous OHIP calls have historically been the hardest thing to troubleshoot, because the
caller receives an acknowledgement and then the outcome is invisible from inside OPERA. Support
cases turn into a partner saying they sent it and a property saying it never arrived, with no
shared evidence.

An in-product queue view moves that argument onto documented ground. On a go-live or a channel
manager cutover, this is the screen to open first when a partner claims a request was accepted.

**Not documented, and all four matter for a runbook:**

1. Which asynchronous operations appear in the queue
2. How long entries are retained
3. What statuses exist
4. Whether failed requests can be retried from the UI

Do not assume it covers every OHIP async endpoint. Read the 26.3 integration documentation before
writing a support procedure around it.

---

## What this means practically

**Before 26.x**, diagnosing an OHIP problem meant correlating partner logs against OPERA behaviour
with no shared timeline, and mapping changes were invisible until something broke.

**On 26.3**, there is an in-product queue for async request status, mapping changes emit events,
and streamed payloads are translated before they leave.

That is a real argument for scheduling an upgrade on any estate running an integration-heavy
property, and it is a better argument than a feature list because it names a problem the customer
has actually lived through.

---

## Existing OHIP monitoring, still current

From the OHIP Developer Portal, unchanged by these releases:

**Streaming status colours**
- Green: connected
- Amber: no connection for 30+ minutes
- Red: no connection for 1+ hour

**Streaming alerts**
- Trigger: disconnected 60+ minutes
- Behaviour: hourly emails to the Application record email until reconnection
- Action: check service, network, OAuth token expiry, reconnect

**Analytics counters**
- Produced: messages generated by OPERA Cloud
- Waiting: in queue, not yet consumed. A high number means the client is behind or disconnected
- Consumed: received by client

Portal guide: https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/

**Version caveat:** the OCIM Client ID 100-character limit is documented against the 25.x doc set
(OHIP v25.5 with OPERA Cloud v25.4+, legacy 50-char on older environments). Re-verify against 26.x
before relying on it.

---

*Sources: Oracle Hospitality OPERA Cloud Release Readiness Guides, documents G48601-01 (26.1),
G50860-02 (26.2) and G55991-02 (26.3). Verified 2026-09-02.*
