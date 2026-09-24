# Internal Use Rooms: Pseudo Room Walkthrough

Client meeting walkthrough for setting up internal-use rooms in OPERA Cloud so they show in the Room Diary without distorting commercial statistics.

Tier: field procedure. Licensing statement is unverified, see section 6.

## 1. Concept

Pseudo rooms behave like rooms operationally (PM reservations, check-in, registration) but sit outside sellable inventory and can be filtered out of commercial reports.

## 2. Create the room type

1. Configuration > Room Configuration > Room Types > New.
2. Code, for example `INT01`. Description `Internal Use`.
3. Room Class: a dedicated class such as `INTERNAL`.
4. Select **Pseudo**, not Physical.
5. Save.

## 3. Create the rooms

1. Configuration > Room Configuration > Rooms.
2. Create the required rooms, for example `I001` to `I013`.
3. Assign each to `INT01` and confirm each is Pseudo.
4. Save.

## 4. Demonstrate in the Room Diary

1. Open the Room Diary and filter Room Type = `INT01`.
2. Create a PM reservation in one pseudo room.
3. Demonstrate check-in and guest registration.

## 5. Reporting

1. Reports > Availability / Statistics > Room Statistics.
2. Filter by Room Type or Room Class.
3. Most reports accept these filters. Where one does not, scope a report change.

Country note (documented, 26.1): the India GSTR country export was updated to include pseudo room types. Check country exports before assuming pseudo rooms are invisible to statutory reporting. See [26.x fiscal changes](opera-doc.html?file=opera-cloud-26x-fiscal-changes.md).

## 6. Licensing

The claim that pseudo rooms do not count towards licensed room inventory is **not verified against Oracle's licensing documentation**. Confirm against the client's Oracle order form and the [26.3 Licensing Information User Manual](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.3/ocslg/ch_introduction.htm) before stating it to a client.

## Next steps to offer

- Build the rooms with the client in the session.
- Review custom report changes in a follow-up.
