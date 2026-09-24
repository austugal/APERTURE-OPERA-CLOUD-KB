# IFC8 Interface Guides

Step-by-step guides for connecting hotel systems to OPERA Cloud through IFC8. Start with the controller installation, then follow the guide for the interface type.

Tier legend. **[T1]** documented in Oracle's *OPERA IFC Controller and Hotel Property Interface (IFC8) Information and Installation Guide*, Release 2.0, December 2021. **[T2]** observed on live implementations. **[T3]** inference, labelled. Oracle's guide is the authority. Check the current IFC8 version on the Hotel Property Interface section of [docs.oracle.com](https://docs.oracle.com/en/industries/hospitality/hotels.html) before each install.

## How the pieces fit

IFC8 has three components [T1]:

1. **OPERA interface web service.** Part of the OPERA Cloud platform (`IFCInternalService`). It connects the controller to the OPERA database.
2. **OPERA IFC Controller.** A Windows service at the property. It passes XML messages from IFC8 to the web service and polls the web service for queued OPERA messages.
3. **IFC8 executable.** Translates OPERA XML into the protocol the third-party system speaks, over TCP/IP or serial.

Message path: OPERA Cloud → web service → IFC Controller → IFC8 → vendor system, and back.

## The guides

| Guide | Covers |
|---|---|
| [IFC Controller and IFC8 installation](opera-doc.html?file=ifc8-controller-installation.md) | Server sizing, controller install, credentials, TLS, linking IFC8 to OPERA, status lights |
| [PBX and call accounting](opera-doc.html?file=ifc8-pbx-call-accounting.md) | Voxtel and other PBX or call accounting systems: check-in, check-out, room status, wake-up, DND, call charges |
| [Key card systems](opera-doc.html?file=ifc8-key-card.md) | Key encoders, new and duplicate keys, multiple interfaces, 26.3 multi-key changes |
| [POS systems](opera-doc.html?file=ifc8-pos.md) | Third-party POS: guest lookup, room charge posting, revenue centre mapping |
| [Troubleshooting](opera-doc.html?file=ifc8-controller-installation.md) | Controller log errors and their fixes, section 9 of the installation guide |

Related library pages: [IFC8 interface architecture](opera-doc.html?file=ifc8-interface-architecture.md), [SSD interface service account](opera-doc.html?file=ssd-interface-service-account.md).

## Common sequence for every interface

1. **Scope with the vendor.** Interface type, protocol (TCP/IP or serial), vendor driver name, IFC8 version it is certified with, functions required. [T2]
2. **Create the property interface in OPERA Cloud.** Record the interface number (`IfcNum`). Administration > Interfaces > Property Interfaces. [T2] for the path, check it in the release you are on.
3. **Register the IFC machine.** The machine name running the controller must exist in the IFC Machines configuration, or the controller logs "Configuration is missing for machine". [T1]
4. **Service account.** Create the interface service account with the WS-ACCESS role. [T1]
5. **Install and configure the controller.** Credentials, endpoint, property code in capitals. [T1]
6. **Install IFC8, link it to the interface number, set the vendor connection.** [T1]
7. **Map transaction codes and rooms.** Posting codes per charge type, room and extension mapping where the interface needs it. [T2]
8. **Test every function in a script and sign it off with the vendor.** [T2]
9. **Go live with DEBUG logging for the first 48 hours, then return to ERROR.** [T1] for the levels, [T2] for the practice.

## Interface families

| Family | Typical systems |
|---|---|
| PBX | Telephone switches, call accounting, including Voxtel |
| KSS | Key card encoders |
| POS | Third-party restaurant and retail tills |
| VID | Pay TV and in-room entertainment |
| MBS | Minibar |
| EMS | Energy management |
| VMS | Voicemail |

IFC8 uses the family code in its link messages, for example `InterfaceFamily="PB"` for PBX. [T1] The other family codes above are [T2].
