# IFC8 Interface Architecture

IFC8 is Oracle Hospitality's generic interface gateway for property-level integrations. It is a locally-installed application that mediates between OPERA (Cloud or 5) and devices or systems within the property network, including POS, key card, voicemail, video, minibar, telephone and similar.

IFC8 is the strategic interface for many on-property device integrations. OHIP is the strategic interface for cloud-to-cloud integrations. The two are complementary, not competing.

---

## Reference documents

- Oracle Hospitality OPERA Cloud IFC8 documentation (My Oracle Support)
- Oracle Hospitality Generic Interface User Guide
- Partner-specific IFC8 certification documentation

---

## Architecture

IFC8 runs as a service on a server within the property network. It maintains.

- A persistent connection to OPERA (Cloud or 5)
- Per-interface connections to device endpoints (typically over TCP/IP or serial)
- A message queue for inbound and outbound messages
- A protocol translation layer mapping between Oracle's interface formats and device-specific formats

When a guest event occurs in OPERA (check-in, check-out, room move, charge posting), IFC8 forwards the relevant message to the connected devices. When a device generates an event (POS charge, key generation, minibar consumption), IFC8 forwards it to OPERA.

---

## Supported interface types

IFC8 supports multiple interface categories. Each interface has its own configuration profile.

### PMS-POS

Bidirectional integration between OPERA and POS systems (Simphony, third-party POS). Posts F&B and other revenue from POS to guest folios. Returns room status and reservation information to POS.

### Key card

Door lock systems (VingCard, dormakaba, Salto). Generates keys at check-in, updates keys at room move, invalidates keys at check-out.

### Voicemail

In-room voicemail systems. Activates voicemail at check-in with guest name. Clears messages at check-out.

### Video on demand

In-room entertainment systems. Posts charges back to folio.

### Minibar

Minibar tracking systems. Posts consumption charges to folio.

### Telephone

Telephone management systems. Activates call permission at check-in. Posts call charges to folio.

### In-room safe

Safe usage tracking.

### Other devices

Many partner devices integrate via IFC8 using standard or custom message profiles.

---

## Protocols and message formats

IFC8 supports multiple protocols depending on the partner integration.

| Protocol | Use |
|---|---|
| FIAS | Fidelio Interface Application Specification, the traditional Oracle Hospitality interface protocol |
| HTNG | Hotel Technology Next Generation industry standard messages |
| Custom partner formats | Where the partner has a certified IFC8 profile |

Each message profile defines the message types, fields and behaviour for the specific partner.

---

## Installation and configuration

IFC8 is installed on a Windows server within the property network. Configuration includes.

- OPERA Cloud tenant connection details
- TLS certificate for OPERA Cloud connection
- Per-interface device profile (selected from supported partners)
- Per-interface device endpoint (IP address, port, credentials)
- Message routing rules
- Logging and audit settings

---

## OPERA Cloud connectivity

For OPERA Cloud properties, IFC8 connects to the cloud tenant over a secure outbound channel. The cloud tenant treats IFC8 as a special-purpose integration endpoint with elevated trust for property-level operational messages.

---

## Monitoring

IFC8 exposes operational telemetry.

- Connection state per interface
- Message throughput
- Queue depth
- Error counts
- Last successful message timestamp

Property IT and Oracle support both monitor these telemetry signals to detect interface health issues.

---

## Common issues

- IFC8 service stops due to Windows update reboot without auto-restart configured
- Device endpoint changes (POS server replacement) without IFC8 reconfiguration
- TLS certificate expiry causing OPERA Cloud connection failure
- Partner profile mismatch after device firmware update
- Queue backlog after sustained network issue requires drain or reset

---

## Relationship to OHIP

| Dimension | IFC8 | OHIP |
|---|---|---|
| Location | On-premises at property | Cloud-hosted |
| Use case | Property device interfaces | Cloud system integrations |
| Connection | Server-to-device | Server-to-cloud |
| Protocols | FIAS, HTNG, partner custom | REST, OAuth2, WebSocket |
| Examples | Key cards, voicemail, minibar, telephone | CRS, RMS, channel manager, CRM, loyalty |

A typical OPERA Cloud property uses both. IFC8 handles the on-property device layer. OHIP handles the cloud integration layer.

---

*Derived from Oracle Hospitality OPERA Cloud IFC8 documentation. Not affiliated with Oracle Corporation. Licensed CC BY-NC-SA 4.0.*
