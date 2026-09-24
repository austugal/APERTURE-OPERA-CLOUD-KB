# IFC8 Key Card Systems

Step-by-step setup of a key card system with OPERA Cloud through IFC8: encoders, new and duplicate keys, key expiry, room moves and mobile keys.

Tier legend. **[T1]** Oracle documentation. **[T2]** observed on live implementations. **[T3]** inference, labelled. The key vendor's driver guide is the authority for its settings. Back to [IFC8 guides](opera-doc.html?file=ifc8-guides-index.md).

## 1. Scope with the vendor [T2]

1. Key system product and version, and the IFC8 driver it is certified with.
2. Number of encoders and where they sit: front desk positions, back office, concierge.
3. Online or offline locks. Online systems can cancel keys remotely.
4. Key types: guest, duplicate, one-shot, staff. Common area access encoded on guest keys.
5. Mobile keys: provider, and whether keys are issued through IFC8 or another integration.
6. Connecting doors, suites with several doors, and access zones such as spa, gym, lifts.

## 2. OPERA Cloud configuration

### 2.1 Property interface

Administration > Interfaces > Property Interfaces. Create an interface of type key card (KSS). Record the interface number for IFC8. [T2] for the path.

### 2.2 Encoders

Define each encoder in the interface configuration with the code the key system expects. Assign a default encoder to each workstation so the front desk does not choose one every time. [T2]

OPERA Cloud 26.3 adds **Create Multiple Guest Room Keys on Multiple Interfaces** and **Default Key Encoder for Multiple Interfaces**. Properties with more than one key system, for example rooms on one vendor and a spa on another, can issue keys on several interfaces in one action. [T1], from the [26.3 feature summary](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.3/oprnc/c_feature_summary.htm). Read the 26.3 documentation for the exact settings.

### 2.3 Key options

Decide with the hotel [T2]:

| Option | Typical choice |
|---|---|
| Key expiry | Departure date at check-out time plus a grace period, for example 12:00 plus 60 minutes |
| Keys on check-in | Prompt for the number of keys |
| Duplicate keys | Allowed, with a user task so only trained staff can issue |
| Room move | Prompt for new keys and cancel old keys on online systems |
| Extra access | Encode common areas by rate code or package, for example spa access |

## 3. IFC side

1. Install the controller and IFC8. See [installation guide](opera-doc.html?file=ifc8-controller-installation.md). [T1]
2. Link IFC8 to the key interface number. [T1]
3. Configure the vendor connection, usually TCP/IP to the key server. [T2]
4. Load the room and door list in the key system so room numbers match OPERA exactly, including leading zeros. [T2]

## 4. Test script [T2]

| # | Action | Expected result |
|---|---|---|
| 1 | Check in, make two keys at encoder 1 | Both open the room until the departure time |
| 2 | Make a duplicate key | Opens the room. Earlier keys still work |
| 3 | Make a new key (not duplicate) | New key works. On online locks, earlier keys stop |
| 4 | Room move | New keys for the new room. Old room keys stop on online locks |
| 5 | Extend the stay | Key expiry follows the new departure date after re-encoding or remote update |
| 6 | Check out | Keys stop at expiry, or immediately on online locks |
| 7 | Encode from encoder 2 at another workstation | Key encodes at the right encoder |
| 8 | Guest with spa package | Key opens the spa door |
| 9 | Stop IFC8, try to make a key | Clear error at the desk, no hang |

## 5. Common failures [T2]

| Symptom | Likely cause |
|---|---|
| Key made at the wrong encoder | Workstation default encoder not set |
| Room not found in key system | Room numbering differs between OPERA and the key system |
| Keys expire early | Expiry time or time zone mismatch between OPERA and the key server |
| Key request hangs at the desk | IFC8 stopped, or the key server is unreachable |
| Spa access missing | Access zone not linked to the package or rate code |
