---
name: booking-administration-complete
title: OPERA Cloud Booking Administration - Complete Reference
author: Tiago Fitas
date: 2026-06-07
based_on: Oracle Hospitality OPERA Cloud v24.2 Booking Administration User Guide
---

# Booking Administration Complete Reference

Comprehensive configuration for reservations, blocks, rules, and guest communication in OPERA Cloud.

---

## Overview

Booking Administration controls all reservation-related setup and policies:
- Reservation types and components
- Booking rules and schedules
- Block management
- Guest communication templates
- Cancellation and deposit rules

**Sections:**
1. Reservation Management & Components
2. Booking Rules and Schedules
3. Block Management
4. Guest Messages & Communication

---

## 1. RESERVATION MANAGEMENT & COMPONENTS

**Purpose:** Configure reservation settings, policies, and guest communication elements.

### Reservation Components Overview

Components you can configure include:

- **Guest Messages** - Template messages (fax notifications, visit messages, callbacks)
- **Reservation Alerts** - Conditions that trigger alerts (early check-in, late arrival)
- **Deposit Rules** - Payment requirements at booking
- **Pre-Registration Rules** - Auto-check-in policies
- **Immigration Status** - Track guest nationality/visa info
- **Discount Reasons** - Codes for why discounts are applied
- **Cancellation Reasons** - Codes for reservation cancellations
- **Room Assignment Ratings** - Preference scores for room assignment
- **Guest Locators** - VIP/loyalty identifiers
- **Guest Status** - Active, VIP, on-hold, etc.
- **Guest Types** - Leisure, corporate, group, tour
- **Purpose of Stay** - Business, vacation, conference, etc.
- **Reservation Colors** - Visual categorization of reservations
- **Upgrade Rules** - Automatic room upgrades
- **Waitlist** - Guest waiting for desired room type

### Configuring Guest Messages

**Purpose:** Create reusable message templates for front desk communication.

**Menu Path:** Administration → Booking → Reservation Management → Guest Messages

**Adding Guest Messages:**

1. Click **New**
2. Enter:
   - **Property:** Which property
   - **Code:** Message type code (e.g., "FAX", "VISIT", "CALLBACK")
   - **Description:** Message text (e.g., "We received a fax for you at the reception. Please contact the front desk.")
   - **Manage Translation:** (If Multi Language control active) Click to add localized versions
   - **Sequence:** Display order (optional)
3. Click **Save**

**Message Templates with Placeholders:**

Use tokens for dynamic content:
- `<Visitor Name>` - Name of person visiting
- `<Caller Name>` - Name of person who called
- `<Room Number>` - Guest's room
- `<Guest Name>` - Reservation guest name
- `<Time>` - Time message received

**Example Messages:**

| Code | Description |
|------|-------------|
| FAX | We received a fax for you at reception. Please call extension 0. |
| VISIT | `<Visitor Name>` came to visit you at `<Time>`. Please call reception at extension 0. |
| CALLBACK | `<Caller Name>` called and asked you to call back. Please call extension 0. |
| PACKAGE | A package arrived for you. Please pick up at front desk. |
| LATEMSG | We held your reservation until 6 PM. Please contact us immediately. |

**Editing Messages:**

1. Menu: Administration → Booking → Reservation Management → Guest Messages
2. Enter search criteria → **Search**
3. Select message → **⋮** → **Edit**
4. Update text or sequence
5. **Save**

**Deleting Messages:**

1. Search → Select → **⋮** → **Delete**
2. Confirm

### Configuring Reservation Types

**Purpose:** Categorize reservations by booking source or method.

**Menu Path:** Administration → Booking → Booking Rules and Schedules → Reservation Types

**Examples:**
- IND (Individual)
- GROUP (Group booking)
- CORP (Corporate)
- TOUR (Tour operator)
- OTA (Online Travel Agency)

**Configuration:**

1. Click **New**
2. Enter:
   - **Code:** Reservation type identifier
   - **Description:** Type name
   - **Sequence:** Display order
3. **Save**

### Configuring Guest Types

**Purpose:** Track guest category for reporting and targeting.

**Menu Path:** Administration → Booking → Reservation Management → Guest Types

**Examples:**
- LEISURE - Vacation travelers
- BUSINESS - Business travelers
- CONFERENCE - Conference attendees
- GROUP - Part of group booking
- GOVERNMENT - Government employees
- MEDICAL - Medical travelers

### Configuring Purpose of Stay

**Purpose:** Track why guest is staying (for reporting/analytics).

**Menu Path:** Administration → Booking → Reservation Management → Purpose of Stay

**Examples:**
- VACATION - Leisure travel
- BUSINESS - Work-related
- CONFERENCE - Conference attendance
- WEDDING - Wedding event attendee
- MEDICAL - Medical/hospital-related
- SPORTS - Sports event

### Configuring Cancellation Reasons

**Purpose:** Track why reservations are cancelled.

**Menu Path:** Administration → Booking → Reservation Management → Cancellation Reasons

**Examples:**
- GUEST - Cancelled by guest
- NODEP - No deposit received
- CONFLICT - Room conflict
- RATE - Rate too high
- CLOSED - Property closed on date
- POLICY - Violates hotel policy

**Cancellation Penalties:**

- Charges applied if guest cancels within penalty window
- Define cancellation deadline (e.g., 48 hours before arrival)
- Set penalty amount (fixed $ or % of rate)

### Configuring Discount Reasons

**Purpose:** Track why discounts were applied.

**Menu Path:** Administration → Booking → Reservation Management → Discount Reasons

**Examples:**
- LOYALTY - Loyalty member discount
- RATE - Discounted rate code
- CORPORATE - Corporate discount
- SENIOR - Senior citizen discount
- AAA - AAA member discount
- GROUP - Group rate discount
- MANAGER - Manager override discount
- COMP - Complimentary/waived

### Configuring Room Assignment Ratings

**Purpose:** Preference scoring for automatic room assignment.

**Menu Path:** Administration → Booking → Reservation Management → Room Assignment Ratings

**How It Works:**

- Higher rating = preferred room for this guest type
- System uses rating to auto-assign rooms
- Example: Executive guests get higher-rated suites

**Example Setup:**

| Guest Type | Rating | Notes |
|------------|--------|-------|
| Executive | 10 | Preferred suites, high floors |
| Business | 7 | Standard rooms OK |
| Leisure | 5 | Any available room |
| Group | 3 | Clustered, lower floors |

---

## 2. BOOKING RULES AND SCHEDULES

**Purpose:** Define reservation booking policies and restrictions.

### Deposit Rules

**Purpose:** Require payment at booking based on lead time or policy.

**Menu Path:** Administration → Booking → Booking Rules and Schedules → Deposit Rules

**Deposit Rule Types:**

- **No Deposit** - Guarantee with credit card only
- **First Night** - Charge 1 night's rate
- **Percentage** - Charge % of total stay
- **Fixed Amount** - Charge flat amount
- **Full Prepay** - Charge full reservation cost

**Adding Deposit Rules:**

1. Click **New**
2. Enter:
   - **Code:** Rule identifier (e.g., "DEP50")
   - **Description:** "50% deposit required"
   - **Deposit Type:** No Deposit / First Night / Percentage / Fixed / Full
   - **Percentage:** (if percentage type) Enter %
   - **Amount:** (if fixed type) Enter $
3. Click **Save**

**Deposit Rule Schedules:**

- Apply different deposit rules based on arrival date
- Example: Peak season = 50% deposit, Off-season = No deposit

**Menu Path:** Administration → Booking → Booking Rules and Schedules → Deposit Rule Schedules

**Configuration:**

1. Click **New**
2. Enter:
   - **Schedule Name:** (e.g., "Peak Season Deposits")
   - **Start Date:** When rule applies
   - **End Date:** When rule ends
   - **Deposit Rule:** Which rule to apply
3. Click **Save**

### Cancellation Penalty Rules

**Purpose:** Define what charge applies if guest cancels.

**Menu Path:** Administration → Booking → Booking Rules and Schedules → Cancel Penalties

**Penalty Types:**

- **No Penalty** - Free cancellation
- **Percentage** - % of stay cost
- **First Night** - Charge 1 night
- **Fixed Amount** - Flat charge
- **Full Stay** - Charge entire reservation

**Adding Cancellation Penalties:**

1. Click **New**
2. Enter:
   - **Code:** (e.g., "CANC48")
   - **Description:** "48-hour cancellation penalty"
   - **Penalty Type:** Select type
   - **Percentage/Amount:** Enter value
   - **Days Before Arrival:** When penalty starts (e.g., 2 days)
3. Click **Save**

**Cancellation Penalty Schedules:**

Apply different penalties based on season/dates.

**Menu Path:** Administration → Booking → Booking Rules and Schedules → Cancel Penalty Schedules

### Reservation Types and Schedules

**Reservation Type Schedules** allow different rules by date:

**Example:**

| Date Range | Type | Rules |
|-----------|------|-------|
| 01/01 - 03/31 | OFFSEASON | No deposit, Free cancellation |
| 04/01 - 10/31 | PEAK | 50% deposit, 7-day cancellation penalty |
| 11/01 - 12/20 | HOLIDAY | 100% prepay, Non-refundable |

---

## 3. BLOCK MANAGEMENT

**Purpose:** Configure and manage group reservations (conventions, tours, weddings).

### Block Overview

A **block** is a group of rooms held for events:
- Reserved for specific dates
- For specific number of rooms
- Assigned to block type (wedding, conference, tour)
- Has cutoff date (when unsold rooms release)
- Has wash schedule (gradual room release)

### Block Configuration

**Menu Path:** Administration → Booking → Block Management

### Block Components

#### Booking Types

Categorize blocks by event type.

**Menu Path:** Administration → Booking → Block Management → Booking Types

**Examples:**
- WEDDING - Wedding event
- CONFERENCE - Conference/convention
- TOUR - Tour operator group
- CONVENTION - Convention attendees
- REUNION - Family/class reunion
- INCENTIVE - Incentive trip

#### Block Cancellation Reasons

Track why blocks are cancelled.

**Menu Path:** Administration → Booking → Block Management → Cancellation Reasons

**Examples:**
- LOST - Lost to competitor
- NODEP - No deposit received
- CLIENT - Client request
- BUDGET - Budget constraints
- DATE - Date changed

#### Block Lost Reasons

Track why blocks go "Lost" status.

Indicates guest chose competitor property.

**Examples:**
- HOTEL - Chose different hotel
- PRICE - Our price too high
- RATE - Competitor offered better rate
- SERVICE - Service complaint

#### Destination Codes

Track where customer chooses to go instead.

**Menu Path:** Administration → Booking → Block Management → Destination Codes

**Examples:**
- COMP1 - Competitor Property 1
- COMP2 - Competitor Property 2
- OTH_CITY - Went to different city
- CANCELLED - Event cancelled entirely

#### Block Rankings

Priority/importance scoring for blocks.

**Menu Path:** Administration → Booking → Block Management → Rankings

**Examples:**
- A (High) - VIP clients, high revenue
- B (Medium) - Regular corporate groups
- C (Low) - Occasional groups
- D (Watch) - Problem groups

#### Block Conversions

Track likelihood that block will convert to actual reservations.

**Menu Path:** Administration → Booking → Block Management → Conversions

**Examples:**
- HIGH - 80%+ likely to book
- MEDIUM - 50-80% likely
- LOW - <50% likely
- UNLIKELY - Unlikely to convert

#### Rate Override Reasons

Track why rate on block differs from standard rate.

**Menu Path:** Administration → Booking → Block Management → Rate Override Reasons

**Examples:**
- NEG - Negotiated rate
- COMP - Complimentary upgrade
- MISTAKE - Rate correction
- VOLUME - Volume discount

#### Refused Reasons

Track why block was refused/not accepted.

**Menu Path:** Administration → Booking → Block Management → Refused Reasons

**Examples:**
- NO_ROOMS - Insufficient rooms available
- RATE - Rate unacceptable
- DATE - Dates unavailable
- POLICY - Violates hotel policy

#### Reservation Methods

How reservations for block will be picked up.

**Menu Path:** Administration → Booking → Block Management → Reservation Methods

**Examples:**
- ROOMING_LIST - Via rooming list
- PHONE - Individual phone calls
- EMAIL - Email links
- WEBSITE - Self-service booking portal
- CONVENTION_BUREAU - Via convention bureau

#### Block Wash Schedules

Automatic room release as block date approaches.

**Menu Path:** Administration → Booking → Block Management → Wash Schedules

**Purpose:**

- Recover unsold block rooms
- Example: Release 10% of rooms 30 days before arrival, 20% at 15 days

**Configuration:**

1. Attach to block prior to cutoff date
2. One record per day before arrival
3. Specify % or # of rooms to release
4. Activate in Routine Management

**Example Schedule:**

| Days Before Arrival | Release % | Effect |
|-------------------|-----------|--------|
| 45 | 10% | Release 10 rooms |
| 30 | 15% | Release 15 more rooms |
| 14 | 25% | Release 25 more rooms |
| 7 | 50% | Release all remaining |

#### Block Cutoff Schedules

Define when rooms must be paid/confirmed.

**Menu Path:** Administration → Booking → Block Management → Cutoff Schedules

**Example:**

- 30 days before arrival: Final payment due
- 14 days before arrival: Final rooming list due
- 7 days before arrival: No more cancellations allowed

#### Block Statuses

Track block lifecycle:
- **Active** - Open for reservations
- **In Progress** - Reservations being made
- **Completed** - All rooms booked
- **Cancelled** - Block cancelled
- **Lost** - Lost to competitor
- **Refused** - Block declined

---

## 4. PRE-REGISTRATION & IMMIGRATION

### Pre-Registration Rules

**Purpose:** Allow automatic check-in (mobile, kiosk, email).

**Menu Path:** Administration → Booking → Reservation Management → Pre-Registration Rules

**Configuration:**

Define which guests can self-check-in:
- Which guest types
- Which payment methods
- How many days before arrival

**Example:**

- Corporate guests can pre-register 1 day before
- Loyalty members can pre-register 3 days before
- Group guests cannot pre-register (front desk only)

### Immigration Status

**Purpose:** Track guest nationality and visa requirements.

**Menu Path:** Administration → Booking → Reservation Management → Immigration Status

**Configuration:**

- Country codes
- Visa status (Visa required, Passport required)
- Used for regulatory compliance

---

## AUTO ATTACH ELEMENTS

**Purpose:** Automatically add items (resort fees, parking, breakfast) to reservations.

**Menu Path:** Administration → Booking → Reservation Management → Auto Attach Elements

**Examples:**

- Add $25 resort fee to all reservations
- Add parking charge if car mentioned
- Add breakfast package to loyalty bookings
- Add travel insurance option

---

## BEST PRACTICES

1. **Message Templates** - Create clear, consistent guest communication
2. **Deposit Rules** - Balance revenue protection with occupancy goals
3. **Cancellation Penalties** - Publish clearly to reduce disputes
4. **Block Cutoff Dates** - Set realistic dates for group follow-up
5. **Wash Schedules** - Recover inventory gradually, don't release all at once
6. **Upgrade Rules** - Align with room hierarchy and availability
7. **Guest Types/Purpose** - Use for accurate reporting and targeting
8. **Testing** - Create rules in UAT, test booking flow end-to-end

---

## Related Procedures

- [Reservation Management](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/c_reservation_components_configuring_reservation_components_ch.htm)
- [Booking Rules](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/c_admin_booking_rules_and_schedules.htm)
- [Block Management](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/c_block_configuring_block_components_overview.htm)
- [Guest Messages](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/t_admin_booking_configuring_guest_messages.htm)
- [Deposit Rules](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/t_reservation_components_creating_reservation_deposit_rules.htm)

---

**Status:** Booking Administration - Complete Reference
**Last Updated:** 2026-06-07
**Attribution:** Tiago Fitas
**Based on:** Oracle Hospitality OPERA Cloud v24.2 Booking Administration Guide

**Official Reference:** [OPERA Cloud Booking Administration](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/ch_booking_admin_section.htm)
