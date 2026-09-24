# OPERA Controls Reference

OPERA Controls are the property-level functional toggles, parameters and settings that determine system behaviour across every module. Controls are organised in groups corresponding to functional areas. Each group contains Functions (on/off switches), Parameters (typed values), and Settings (selections from a list of values).

**Path:** Administration > Enterprise > OPERA Controls

This document indexes the groups, summarises the purpose of each, and lists the high-impact controls per group. For full parameter definitions consult the Oracle Hospitality OPERA Cloud Controls Reference Guide on My Oracle Support.

---

## Reference documents

- Oracle Hospitality OPERA Cloud Controls Reference Guide (current version)
- Oracle Hospitality OPERA Cloud Property User Guide
- Module-specific Oracle user guides referenced below

---

## Groups

### Reservations

Controls reservation creation, modification, cancellation rules, deposit and cancellation policies, traces, alerts, reservation types, market codes, source codes, and rate availability behaviour.

High-impact controls.

- Allow Same Day Reservations
- Deposit Maturity Policy
- Cancellation Penalty Policy
- Reservation Types (Tentative, Guaranteed, etc.)
- Auto Authorisation rules
- Routing Instructions behaviour

### Profile

Controls profile types available (Guest, Company, Travel Agent, Source, Group, Contact), merge rules, mandatory fields, duplicate detection, address validation, communication preferences, and GDPR consent management.

High-impact controls.

- Mandatory Profile Fields
- Profile Merge Validation
- Duplicate Profile Check
- Marketing Preferences
- Data Retention Period
- Right to Erasure handling

### Front Desk

Controls check-in and check-out behaviour, room assignment automation, room move handling, early check-in and late check-out charges, walk-in policy, key generation, registration card handling.

High-impact controls.

- Auto Room Assignment
- Walk-In Procedure
- Pre-Check In allowed
- Key Generation Interface
- Registration Card Format

### Cashiering

Controls payment methods, folio handling, advanced deposit handling, currency conversion, exchange rate update, billing instructions, AR transfer rules, settlement rules, paid-out limits.

High-impact controls.

- Advanced Deposit Handling (Mode 1-4)
- Default Deposit Tax Room
- Multi-Currency
- Exchange Rate Source
- Paid-Out maximum amount
- Auto Settlement on Check-out

### Cashiering Management

Sub-group covering Folio Types, Transaction Codes, Routing Codes, Adjustment Reasons, Article Codes, Cashier configuration.

### Profile Management

Sub-group covering Profile Configuration, Profile Protection rules, Mailing Lists.

### Inventory

Controls room types, room features, room status workflow, housekeeping schedules, out-of-order and out-of-service handling, pseudo rooms, sleeping vs non-sleeping rooms.

High-impact controls.

- Room Status Discrepancy handling
- Housekeeping Hierarchy
- Out of Order Workflow
- Pseudo Room flag (excludes from statistics)

### Rate Management

Controls rate codes, packages, yieldable rates, dynamic base rate, rate categories, market codes, source codes, BAR (Best Available Rate) management.

High-impact controls.

- Yieldable Rate functionality
- Dynamic Base Rate
- Rate Strategy
- Hurdle Point handling
- Daily Rates Max Days (IDeaS integration)

### Reservations Management

Sub-group covering Reservation Types, Reservation Statuses, Origin of Booking, Reservation Discounts.

### Blocks

Controls group block functionality, rooming list handling, allotments, cut-off behaviour, group rate handling, catering integration (when OSEM enabled).

High-impact controls.

- Block Status Workflow
- Cut-off Date handling
- Rooming List Auto Upload
- Group Master Folio

### Channel

Controls channel manager integration, two-way sync of rates and inventory, channel-specific rate plans, content distribution.

High-impact controls.

- Channel Manager active
- ARI Push frequency
- Restrictions handling
- Channel-specific Rate Plans

### IFC (Interface)

Controls IFC8 interface configuration, message routing, supported interface types (PMS-POS, key card, voicemail, video, minibar, telephone).

### Country

Controls country-specific functionality. Visible only when Country Mode is set on the property. Drives fiscal exports, regional regulations, and country-specific transaction handling.

Country sub-groups exist for each supported country. See country-specific fiscal references for detail.

### AR

Controls Accounts Receivable functionality, account types, ageing buckets, statement generation, dunning, credit limits.

High-impact controls.

- AR Account Types
- Statement Frequency
- Ageing Buckets
- Auto Credit Limit
- Dunning Letters

### Reports

Controls report subscriptions, report formats, report groups, scheduled report behaviour.

### Loyalty

Controls loyalty programme configuration, tier rules, point accrual, redemption rules, expiry handling. Requires OPERA Cloud Loyalty Service.

### Sales and Event Management (OSEM)

Controls Sales and Catering functionality. Requires OPERA Cloud Sales and Event Management licence.

### Membership

Controls membership programmes, tracking, awards, member ID generation.

### General

Controls system-wide behaviour including locale, date format, currency display, password policy, session timeout, audit retention.

### Activities

Controls activity scheduling, resource allocation, billing of activities.

### Accounts Receivable

See AR above (separate sub-group in some versions).

### Commissions

Controls travel agent and source commission calculation, payment, exception handling.

### Exports

Controls export schedules, export delivery channels (email, SFTP, manual download), export retention.

### End of Day

Controls Night Audit behaviour including auto-procedures, mandatory reports, error handling thresholds.

High-impact controls.

- Auto-Run End of Day
- Mandatory Reports list
- Out-of-Balance threshold
- Multi-Property End of Day sequencing

---

## How controls interact with role tasks

A function turned on in OPERA Controls becomes visible but is not usable until the corresponding task is granted to a role at Administration > Enterprise > Role Manager. Both layers must align for a user to access a feature.

---

## Recommended verification before go-live

- Country group set correctly and country-specific functions enabled
- Advanced Deposit Handling matches local fiscal requirement
- Yieldable Rate functions enabled when RMS is integrated
- IFC8 message routing tested for each interface partner
- Channel Manager integration validated for ARI push
- End of Day mandatory reports list reviewed

---

*Derived from Oracle Hospitality OPERA Cloud Controls Reference Guide and OPERA Cloud Property User Guide. Not affiliated with Oracle Corporation. Licensed CC BY-NC-SA 4.0.*
