# Hotel Property Interface (IFC8) 8.17.0.0

| | |
|---|---|
| **Product** | Oracle Hospitality Hotel Property Interface (IFC8 / Ifc8.Net) |
| **Release** | 8.17.0.0 |
| **Oracle doc ID** | G55566-01 |
| **Published** | April 2026 (Oracle revision history: "April 2026, Initial publication") |
| **Source** | https://docs.oracle.com/en/industries/hospitality/hotel-property/8.17/hprns/hprns.pdf |
| **Verified** | 2026-09-10 |

Everything below is quoted or closely paraphrased from Oracle's Release Notes. Commentary is
separated and labelled.

---

## Upgrade prerequisite — read this before scheduling

**Microsoft .NET 10 Desktop Runtime, x86, must be installed on the Windows IFC PC *before*
installation or update.**

Oracle, under General: "The major change in this version is the use of Microsoft .NET Desktop
Runtimes version 10.x". Under All Applications: "As of version 8.17.0.0. Ifc8.Net will use Microsoft
.Net 10 Desktop runtimes x86. This version must be installed to the Windows IFC PC before
installation or update."

Bug 38680200. Listed against **all three** applications — Ifc Application, IfcControl and
Ifc8OperaConnector — so there is no partial upgrade path that avoids it.

Note the architecture is **x86**, not x64.

### Why this is called out first

*Commentary, not Oracle's words.* The IFC8 PC is usually not in the project plan. It sits in a comms
room or under the front desk and often has no named owner. Because the runtime is required *before*
the update, this does not fail at the end with a clean rollback — it fails at the start, on the night
of the cutover, on a machine that may have no outbound internet and may need a reboot. Every
interface on that box is down while it is resolved: door locks, PBX, POS, TV, minibar.

Put it in the pre-cutover checklist as its own line with a named owner, verify **x86** on the actual
machine, and do it days ahead.

**Not documented:** the minimum .NET 10 patch level ("version 10.x" only), whether the previous
runtime may be removed or must remain for rollback, and which Windows versions the .NET 10 x86
runtime supports. That last one is the real constraint on an old interface PC — check Microsoft's
support matrix before committing a date.

---

## New functionality and modifications

### Ifc Application

| Bug ID | Change |
|---|---|
| 38680200 | Add support for Microsoft .NET 10 Desktop runtimes x86. Must be installed to the Windows IFC PC before installation or update |
| 38925616 | **Multi-PMS:** it is now possible to add more than 9 PMS objects, but Multi-PMS functionality is limited in that case. For example, `PostRequest` with the `GuestNum` attribute but without the `PathId` attribute will fail for PathIds > 9 |

*Commentary:* the ceiling moved from a hard cap to a partial one. A tenth property can be added, and
a specific call shape breaks for it. Anyone running a shared interface box across a cluster needs to
know that adding the tenth PMS silently changes the contract for calls that omit `PathId`.

### IfcControl

| Bug ID | Change |
|---|---|
| 38680200 | Add support for Microsoft .NET 10 Desktop runtimes x86. Must be installed before installation or update |

### Ifc8OperaConnector

| Bug ID | Change |
|---|---|
| 38538934 | Addressed an issue whereby the error `Cannot find dispatch method for {http://micros/opera/ws/ifc/v9_00}UpdatePingStatusRQ` was thrown. **Specific internal calls now to be sent for Opera Cloud only** |
| 38680200 | .NET 10 Desktop runtimes x86 support |
| 38778506 | A `bad gateway` status in the response from the web service is now handled as an **error reply**, and the connector continues with standard retry handling instead of processing the content of the reply |
| 38920356 | **IOC Configuration: new dropdown to select the Opera integration mode.** Default is "Auto-detect" to maintain backward compatibility. "Opera 5" applies Opera 5 logic internally. "Opera Cloud" applies Opera Cloud logic internally |
| 38949569 | **IOC Monitoring:** connection health messages are now only sent for Opera Cloud. When connected to Opera 5, "alive" messages are no longer sent |
| 39068159 | IOC Configuration: the IOC service now properly restarts after pressing **Save & Apply** |

---

## The connector story, read across the four fixes

*Commentary and inference, explicitly labelled. Oracle presents these as separate bug IDs and does
not connect them.*

Read together, 38538934, 38920356 and 38949569 describe **OPERA Cloud calls being sent to OPERA 5
systems**. `UpdatePingStatusRQ` is a Cloud-side health call; two of the three fixes restrict
Cloud-only traffic to Cloud connections. That is the signature of an auto-detection that was getting
it wrong, with a dispatch-method error in the log on a V5 site that nothing in the configuration
explained.

**Practical consequence:** the dropdown is the fix, and auto-detect remains the default only for
backward compatibility. On any site where interface health has been noisy, set the mode explicitly
rather than accepting the default. A shipped default is a compatibility decision, not a
recommendation.

38778506 belongs to the same family. A `502` from a gateway is not an application reply, and
previously its body was processed as though it were. On a Cloud connection sitting behind more
network infrastructure than a V5 connection ever had, that is the difference between a transient
blip and corrupt state.

**Not documented:** what auto-detect keys on, so there is no way to predict which sites it gets
wrong; whether changing the mode requires a service restart (39068159 suggests restart behaviour was
itself broken, but the link is inference); and which other internal calls became Cloud-only beyond
ping status and alive messages.

---

## Also in this library, not read

- Security Guide — `hpisg/hpisg.pdf`
- Licensing Guide — `hpilg/hpilg.pdf`

Patch-level notes sit behind My Oracle Support and are not reachable programmatically.

---

*Part of the [per-version release file set](_INDEX.md). Created 2026-09-10, never deleted, updated*
*in place. Deeper analysis notes live in the Second Brain under `10-OPERA-Cortex`.*
