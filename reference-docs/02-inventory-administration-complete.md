---
name: inventory-administration-complete
title: OPERA Cloud Inventory Administration - Complete Reference
author: Tiago Fitas
date: 2026-06-07
based_on: Oracle Hospitality OPERA Cloud v24.2 Inventory Administration User Guide
---

# Inventory Administration Complete Reference

Comprehensive configuration procedures for room inventory, accommodation, function spaces, and facilities management in OPERA Cloud.

---

## Overview

Inventory Administration covers all physical and functional asset configuration:
- Room inventory and hierarchy
- Room types, classes, features
- Function spaces for events
- Accommodation management

**Sections:**
1. Room Inventory Configuration
2. Room Hierarchy (Types & Classes)
3. Room Features & Amenities
4. Function Space Management
5. Accommodation Components

---

## 1. ROOM INVENTORY CONFIGURATION

**Purpose:** Define and configure all guest-facing rooms, pseudo rooms, and their properties.

### Room Types (Three Varieties)

#### A. Physical Room Types
- **Tracked in availability**
- Count towards OPERA Cloud Foundation subscription
- Examples: Standard, Deluxe, Suite, King, Double

#### B. Component Room Types
- **Virtual types tracked in availability**
- Do NOT count towards subscription (when Component Suites control active)
- Composite of multiple physical rooms
- Example: King Suite = 1 King room + 2 Parlor rooms

#### C. Pseudo Room Types
- **Not tracked in availability**
- Do NOT count towards subscription
- Examples: PM (pre-configured), HOUSE, PERMNT, INTRFACE
- Used for non-inventory functions

### Configuring Room Types

**Menu Path:** Administration → Inventory → Accommodation Management → Room Types

**Adding Room Types:**

1. Click **New**
2. Enter:
   - **Property:** Which property (if multi-property)
   - **Code:** Alphanumeric room type code (e.g., "KING", "DBLQ")
   - **Description:** Full name of room type
   - **Room Type Category:** Select Physical, Component, or Pseudo
   - **Sequence:** Display order (optional)
   - **Occupancy:** Max guests allowed
   - **Bed Configuration:** Bed types/count in room
3. Click **Save**

**Editing Room Types:**

1. Menu: Administration → Inventory → Accommodation Management → Room Types
2. Enter search criteria
3. Click **Search**
4. Select type → **⋮** (Actions) → **Edit**
5. Update fields
6. Click **Save**

**Deleting Room Types:**

1. Menu: Administration → Inventory → Accommodation Management → Room Types
2. Enter search criteria → **Search**
3. Select type → **⋮** → **Delete**
4. Confirm deletion

### Configuring Component Suites

When **Component Suites OPERA Control** is active:

**Example Configuration:**

| Component | Physical Rooms | Total in Suite |
|-----------|---------------|----|
| KING SUITE | 1 King + 2 Parlors | 3 rooms |
| DOUBLE SUITE | 1 Double + 2 Parlors | 3 rooms |

**Availability Impact:**

When 1 King Suite is booked:
- KNGS: 0 available (of 1)
- PARLOR: 1 available (of 3)
- KING SUITE: 0 available (of 1)

**Component Verification Control:**

When active: Tracks availability at room number level
- Once a room comprising suite is assigned, component suite is deducted
- Prevents double-booking of component rooms

---

## 2. ROOM HIERARCHY (CLASSES & TYPES)

**Purpose:** Create room upsell paths and organize rooms by quality/price tier.

### Configuring Room Classes

**Menu Path:** Administration → Inventory → Accommodation Management → Room Hierarchy Classes

**Adding Room Hierarchy Classes:**

1. Click **New**
2. Enter:
   - **From Room Class:** Starting class (e.g., Standard)
   - **To Room Classes:** One or more target classes (e.g., Deluxe, Suite)
   - **Sequence:** Order of upsell suggestions (1=first choice, 2=second, etc.)
3. Click **Save**

**Business Logic:**

- Used in Reservation Upgrade Rules
- Defines upgrade path: Standard → Deluxe → Suite
- Sequence determines offer order
- Front desk sees suggested upgrades in this order

**Example Setup:**

| From | To | Sequence |
|------|-----|----------|
| Standard | Deluxe | 1 |
| Standard | Suite | 2 |
| Deluxe | Suite | 1 |

**Editing Classes:**

1. Search for class
2. Select → **⋮** → **Edit**
3. Update sequence or target classes
4. **Save**

**Deleting Classes:**

1. Search for class
2. Select → **⋮** → **Delete**
3. Confirm

---

## 3. ROOM FEATURES & AMENITIES

**Purpose:** Configure room characteristics (smoking, view, accessibility) as guest preferences.

### What is a Room Feature?

Features are room attributes that:
- Do NOT significantly affect rate
- Are used for search/assignment (guest preferences)
- Are NOT availability-tracked (unlike room types)

**Examples:**
- Smoking/Non-smoking
- Ocean view, City view, Garden view
- Accessibility (wheelchair accessible)
- High floor, Low floor, Quiet floor
- Balcony, Terrace
- Soaking tub, Separate shower
- Connecting rooms available

**Room Feature vs. Room Type:**

Use **Room Feature** if limited rooms with attribute, no rate premium.
Use **Room Type** if many rooms with attribute, different rate charged.

Example: 2 ocean view rooms with $50 premium = Room Type (OV100)
Example: Some rooms near elevator = Room Feature (ELAVTR)

### Configuring Room Features

**Menu Path:** Administration → Inventory → Accommodation Management → Room Features

**Adding Room Features:**

1. Click **New**
2. Enter:
   - **Code:** Feature code (e.g., "OCEANVW", "ACCESSIBLE")
   - **Description:** Full description
   - **Sequence:** Display order (optional)
   - **Global:** Checkbox to make available in all properties (Multi Property control must be active)
3. Click **Save or Save and Continue** (for adding multiple)

**Example Features:**

| Code | Description | Sequence |
|------|-------------|----------|
| SMOKFREE | Non-smoking room | 1 |
| OCEANVW | Ocean view | 2 |
| ACCESSIBLE | ADA accessible | 3 |
| HIGHFLOOR | High floor (5+) | 4 |
| QUIET | Quiet location, away from elevator | 5 |

**Editing Features:**

1. Menu: Administration → Inventory → Accommodation Management → Room Features
2. Search → Select → **⋮** → **Edit**
3. Update description or sequence
4. **Save**

**Deleting Features:**

1. Search → Select → **⋮** → **Delete**
2. Confirm

### Assigning Features to Room Types/Rooms

Features are assigned during room or room type configuration:

1. Go to room/room type configuration
2. Find **Room Features** section
3. Add features that apply
4. Guest can search by these preferences during booking

---

## 4. FUNCTION SPACE MANAGEMENT

**Purpose:** Configure event spaces (ballrooms, meeting rooms, outdoor areas) for catering events.

### What is a Function Space?

Space configured for events such as:
- Weddings
- Conferences
- Banquets
- Pool parties
- Meetings
- Cocktail receptions

**Key Features:**

- No inventory tracking (unlimited event capacity via rental codes)
- Can be combined (combo spaces)
- Setup styles (theater, classroom, banquet)
- Rental codes track revenue by rate/package
- Can require alternate space (outdoor backup)

### Configuring Function Spaces

**Menu Path:** Administration → Inventory → Function Space Management → Function Spaces

**Adding Function Spaces:**

1. Click **New**
2. Complete all tabs:

#### Primary Details Tab

- **Function Space Code:** Alphanumeric code (e.g., "BALLRM1")
- **Space Name:** Full name (e.g., "Grand Ballroom")
- **Short Name:** Abbreviated name (e.g., "Grand A")
- **Function Space Type:** Ballroom, Meeting Room, Terrace, etc.
- **Function Space Location:** Wing or building location
- **Custom Order (1-3):** Group spaces in Function Diary

#### Additional Details Tab

- **Total Area (sq ft):** Space dimensions
- **Minimum Capacity:** Minimum guests
- **Maximum Capacity:** Maximum guests
- **Outdoor:** Boolean for outdoor spaces
- **Require Alternate Space:** If yes, must book backup space
- **Shareable:** Can overlap with other bookings

#### Dimensions and Details Tab

- Length, Width, Height
- Column spacing
- Door/Access points
- Special features

#### Setup Styles

1. Click **Setup Styles** link
2. Add setup configuration:
   - **Style Name:** Theater, Classroom, Banquet, Cocktail, U-Shape
   - **Capacity for Style:** Guest count for this setup
   - **Setup Time:** Minutes to set up
   - **Teardown Time:** Minutes to teardown

#### Rental Codes

1. Click **Rental Codes** link
2. Add revenue codes for billing:
   - **Rental Code:** Code identifier
   - **Description:** What is charged
   - **Rate:** Price per unit (per hour, per person, etc.)
   - **Transaction Code:** GL posting code

#### Combo Elements (if combo space)

1. Click **Combo Elements** link
2. Select function spaces that can be combined
3. System tracks combined availability

**Example Configuration:**

| Space | Type | Area | Max Cap | Setup Styles |
|-------|------|------|---------|--------------|
| Grand Ballroom | Ballroom | 5,000 | 600 | Theater(600), Banquet(400), Classroom(300) |
| Garden Terrace | Outdoor | 2,000 | 250 | Cocktail(250), Banquet(150) |
| Board Room | Meeting | 500 | 30 | Theater(30), Classroom(20) |

**Editing Function Spaces:**

1. Menu: Administration → Inventory → Function Space Management → Function Spaces
2. Search → Select → **⋮** → **Edit**
3. Update any tab (Primary, Additional, Dimensions, Setup Styles, Rental Codes, Combo Elements)
4. **Save**

**Copying Function Spaces:**

Quick way to duplicate setup of similar space:

1. Search → Select space → **⋮** → **Copy**
2. Enter:
   - **Room:** New space code
   - **Space Name:** Full name
   - **Short Name:** Abbreviated name
   - **Custom Order:** Diary grouping
   - **Combo Element:** If copy is part of combo (select parent spaces)
3. **Save**

**Deleting Function Spaces:**

Can only delete if space NOT assigned to any events.

1. Search → Select → **⋮** → **Delete**
2. Confirm

### Function Space Types

Pre-configured or custom types to categorize spaces:

- Ballroom
- Meeting Room
- Terrace
- Garden
- Pool Area
- Pavilion
- Restaurant

Access: Administration → Inventory → Function Space Management → Function Space Types

### Function Space Locations

Group function spaces by building/wing/area:

- East Wing
- West Wing
- Terrace Level
- Outdoor Area

Access: Administration → Inventory → Function Space Management → Function Space Locations

### Event Types

Categorize events by type for reporting:

- Wedding
- Conference
- Banquet
- Reception
- Training

Access: Administration → Inventory → Function Space Management → Event Types

### Rental Codes

Revenue codes for function space billing (separate from room revenue).

Access: Administration → Inventory → Function Space Management → Rental Codes

**Adding Rental Codes:**

1. Click **New**
2. Enter:
   - **Code:** (e.g., "BALLRM-RENT")
   - **Description:** (e.g., "Ballroom Rental")
   - **Rate:** Price
   - **Transaction Code:** GL account
3. **Save**

---

## 5. ACCOMMODATION COMPONENTS

### Room Pools

**Purpose:** Group rooms for availability control and management.

**Menu Path:** Administration → Inventory → Accommodation Management → Room Pools

**Use Cases:**
- Assign 50 rooms to "Front Wing Pool" for housekeeping
- Assign 40 rooms to "Executive Floor Pool" for premium service
- Control room availability by pool

**Configuration:**

1. Click **New**
2. Enter:
   - **Code:** Pool identifier
   - **Description:** Purpose
   - **Sell Limit:** Max rooms available for sale from pool
   - **Close Out:** Set to closed when needed
3. **Save**

### Room Hierarchy Mapping

**Purpose:** Link physical rooms to pools and hierarchies.

Controls:
- Which pool a room belongs to
- Room's class in hierarchy
- Availability tracking

### Buildings & Floors

**Purpose:** Physical property hierarchy.

**Configuration Hierarchy:**
- Property
  - Building (e.g., "Tower A", "Bungalow")
    - Floor (e.g., "Level 3", "Ground")
      - Rooms (101, 102, 103...)

**Menu Path:** Administration → Inventory → Accommodation Management → Buildings

**Adding Buildings:**

1. Click **New**
2. Enter:
   - **Code:** Building identifier
   - **Name:** Full name
   - **Sequence:** Display order
3. **Save**

**Adding Floors:**

1. Go to Floor configuration
2. Click **New**
3. Enter:
   - **Code:** Floor code
   - **Building:** Parent building
   - **Name:** Floor name (e.g., "Level 3")
   - **Sequence:** Order in building
4. **Save**

### Room Maintenance Codes

**Purpose:** Track room maintenance status/issues.

**Menu Path:** Administration → Inventory → Accommodation Management → Room Maintenance Codes

**Examples:**
- "PAINT" - Room being painted
- "CARPET" - Carpet replacement
- "HVAC" - HVAC maintenance
- "INSPECT" - Annual inspection

### Out of Order / Out of Service Reason Codes

**Purpose:** Track why rooms are unavailable.

**Menu Path:** Administration → Inventory → Accommodation Management → Out of Order/Out of Service Codes

**Difference:**
- **Out of Order:** Rooms sold but unavailable (broken bed, leak)
- **Out of Service:** Rooms not sold (maintenance, renovation)

**Examples:**
- "LEAK" - Water leak
- "HVAC" - HVAC not working
- "RENO" - Renovation in progress
- "INSP" - Building inspection

### Room Conditions

**Purpose:** Track maintenance/housekeeping status.

**Status Examples:**
- Clean/Ready
- Occupied
- Dirty (needs cleaning)
- Inspected
- Out of Order

---

## OPERA Controls (Global Configuration)

These settings override local configuration:

- **Room Class Control:** Activate room class functionality
- **Component Suites Control:** Enable virtual suite room types
- **Component Verification Control:** Track component rooms at room number level
- **Room Rotation Control:** Enable owner room assignment
- **Owner Room Grade Control:** Assign grades to owner rooms
- **Alternate Space Control:** Require backup space for outdoor events
- **Advanced Function Space Handling:** Enable combo spaces
- **Multi Property Control:** Global features across properties

---

## Inventory Configuration Example

**Scenario:** 150-room hotel with function space

### Room Inventory Setup

**Room Types (Physical):**
- KING: 50 rooms
- QUEEN: 50 rooms
- SUITE: 30 rooms
- ACSBL: 20 rooms (ADA accessible)

**Room Classes:**
- Standard (KING, QUEEN)
- Premium (SUITE)
- Accessible (ACSBL)

**Room Features:**
- SMOKFREE (all rooms)
- OCEANVW (rooms on floor 5-10)
- HIGHFLOOR (floors 5+)
- ACCESSIBLE (ACSBL only)

**Room Pools:**
- Front Wing (50 rooms)
- Tower A (50 rooms)
- Tower B (40 rooms)
- Executive (10 rooms)

### Function Space Setup

**Spaces:**
- Grand Ballroom (5,000 sq ft, 600 pax)
- Meeting Rooms A/B/C (500 sq ft each, 30 pax)
- Terrace (2,000 sq ft, 250 pax)

**Setup Styles:**
- Theater (classroom seating)
- Banquet (seated dinner)
- Cocktail (standing reception)

**Rental Codes:**
- BALLRM-1000 ($1,000/day)
- MEET-500 ($500/day)
- TERRACE-750 ($750/day)

---

## Best Practices

1. **Room Type Design** - Use room types for rate-relevant differences, features for amenities
2. **Feature Organization** - Keep features focused and simple (5-10 per property)
3. **Class Hierarchy** - Create logical upsell paths (Standard → Premium → Luxury)
4. **Function Space Setup** - Define all setup styles upfront (changes affect existing events)
5. **Testing** - Configure in UAT first, test availability logic
6. **Documentation** - Document room pool assignments, feature meanings
7. **Maintenance** - Keep room conditions current daily via night audit

---

## Related Procedures

- [Room Configuration](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/t_rooms_managing_rooms.htm)
- [Room Classes](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/t_rooms_managing_room_classes.htm)
- [Room Types](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/t_rooms_managing_room_types.htm)
- [Room Features](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/t_admin_inventory_configuring_room_features.htm)
- [Function Space Configuration](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/t_osem_configuring_function_spaces_new.htm)
- [Accommodation Management](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/c_admin_inventory_accommodation_management.htm)

---

**Status:** Inventory Administration - Complete Reference
**Last Updated:** 2026-06-07
**Attribution:** Tiago Fitas
**Based on:** Oracle Hospitality OPERA Cloud v24.2 Inventory Administration Guide

**Official Reference:** [OPERA Cloud Inventory Administration](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/ch_inventory_admin_section.htm)
