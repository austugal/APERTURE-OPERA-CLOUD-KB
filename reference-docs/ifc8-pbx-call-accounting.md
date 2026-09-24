# IFC8 PBX and Call Accounting (Voxtel and Similar)

Step-by-step setup of a telephone switch or call accounting system, such as Voxtel, with OPERA Cloud through IFC8. Covers check-in and check-out, name and language, room status from the phone, wake-up calls, do not disturb and call charge posting.

Tier legend. **[T1]** Oracle IFC8 installation guide. **[T2]** observed on live implementations. **[T3]** inference, labelled. The vendor's driver documentation for the IFC8 version in use is the authority for field names. Back to [IFC8 guides](opera-doc.html?file=ifc8-guides-index.md).

## 1. Scope with the vendor first [T2]

Ask the vendor, in writing:

1. Which IFC8 driver and version the system is certified with.
2. Connection: TCP/IP (IP and port, who listens) or serial (port, baud, parity).
3. Functions: check-in, check-out, guest name, language, VIP, room move, DND, wake-up set and result, room status codes, message waiting, class of service, call charges.
4. Call charge format: amount already priced by the call accounting system, or raw metering pulses priced in OPERA.
5. Extension numbering. Does every room have one extension equal to the room number, or several extensions per room.
6. Night audit behaviour: does the system keep posting while OPERA runs end of day.

Voxtel and similar call accounting platforms usually price the call themselves and send a charge, not pulses. Confirm for this property. [T3]

## 2. OPERA Cloud configuration

### 2.1 Property interface

Administration > Interfaces > Property Interfaces. Create an interface of type PBX. Record the interface number, which becomes `IfcNum` in IFC8. [T2] for the path. Check it against the release in use.

Settings to decide [T2]:

| Setting | Recommendation |
|---|---|
| Interface active | Yes, only after the IFC8 link is in place |
| Rooms sent | Physical rooms only. Exclude pseudo rooms such as PM |
| Name and language | Send, if the switch displays names or plays language prompts |
| Share handling | Send the primary sharer's name. Agree with the hotel |
| Posting transaction code | One code per charge type, see 2.3 |

### 2.2 Room and extension mapping

Where extension equals room number, no mapping is needed. Where rooms have several extensions, or suites share one, map extensions to rooms in the interface configuration. [T2]

### 2.3 Transaction codes for call charges

Create revenue codes with generates for VAT, for example [T2]:

| Code | Description | Use |
|---|---|---|
| 3100 | Telephone local | Local calls |
| 3110 | Telephone national | National calls |
| 3120 | Telephone international | International calls |
| 3130 | Telephone mobile | Calls to mobiles |

Link each to the interface's posting configuration so charges land on the right code. In a fiscalised country the codes need the same fiscal mappings as any revenue code, for example `F_SD_SAF_T` in Portugal. See [SAF-T export guide](opera-doc.html?file=saft-pt-export-customisation.md). [T2]

### 2.4 Room status from the phone

Map the switch's status codes to OPERA housekeeping statuses: Clean, Inspected, Dirty, Pickup, Out of Order. Agree the code list with housekeeping before go-live. [T2]

### 2.5 Wake-up calls

Wake-up requests set in OPERA are sent to the switch. The switch returns the result: answered, not answered, busy. Check that results write back to the reservation so the front desk can follow up. [T2]

## 3. IFC side

1. Install the controller and IFC8. See [installation guide](opera-doc.html?file=ifc8-controller-installation.md). [T1]
2. Link IFC8 to the PBX interface number. [T1]
3. Configure the vendor driver: connection, message format, functions enabled. [T2]
4. Status: PMS green, IFC green once the switch connects. [T1]

## 4. Test script [T2]

Run every line, record result and evidence, sign off with the vendor and the hotel.

| # | Action in OPERA or on the phone | Expected result |
|---|---|---|
| 1 | Check in a guest to room 101 | Phone in 101 opens for outside calls. Display shows guest name if supported |
| 2 | Room move 101 to 102 | 101 closes, 102 opens with the same guest |
| 3 | Set DND in OPERA | Switch applies DND. Remove it and confirm |
| 4 | Set wake-up for five minutes ahead | Phone rings. Result returns to OPERA |
| 5 | Leave a message in OPERA | Message waiting lamp on. Retrieve, lamp off |
| 6 | Make a national call from 102 | Charge posts to 102 on the national code with the right amount and VAT |
| 7 | Make a call from a vacant room | No posting. Charge goes to the house or error account as agreed |
| 8 | Housekeeper dials the clean code from 103 | 103 changes to Clean in OPERA |
| 9 | Check out 102 | Phone closes for outside calls |
| 10 | Post a call during night audit | Posting queues or lands on the right business date. No lost charge |
| 11 | Stop IFC8 for five minutes, make a call, restart | Charge posts after restart. Confirm the switch buffered it |

## 5. Common failures [T2]

| Symptom | Likely cause |
|---|---|
| Calls post to the wrong room | Extension mapping missing or out of date |
| Calls lost after an IFC8 restart | Switch buffer disabled or too small |
| Charges post without VAT | Transaction code has no tax generate |
| Rooms stay open after check-out | Check-out message not enabled in the driver |
| Housekeeping codes ignored | Status code mapping not loaded or codes differ from the switch |
| Controller log `OSB-386200` | Service account password expired. See [installation guide](opera-doc.html?file=ifc8-controller-installation.md) |
