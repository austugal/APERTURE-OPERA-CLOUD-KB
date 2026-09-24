---
name: administration-complete
title: OPERA Cloud Administration - Complete Reference
author: Tiago Fitas
date: 2026-06-07
based_on: Oracle Hospitality OPERA Cloud v24.2 Administration Guide
---

# Administration Complete Reference

Comprehensive administration, configuration, and system management for OPERA Cloud across all modules.

---

## Overview

Administration covers all system-wide configuration, security, and operations:
- Property setup and controls
- User access and roles
- Financial and operational codes
- System utilities and configuration
- Reporting and analytics

**Primary Sections:**
1. Financial Administration → Commission, A/R, Cashiering, Fiscal (see 03-FINANCIAL-COMPLETE.md)
2. Inventory Administration → Rooms, Function Spaces (see 02-INVENTORY-ADMINISTRATION-COMPLETE.md)
3. Booking Administration → Reservations, Blocks, Rules (see 02b-BOOKING-ADMINISTRATION-COMPLETE.md)
4. User Administration & Security (this section)
5. System Configuration & Utilities (this section)

---

## ADMINISTRATION MENU STRUCTURE

**Menu Path:** Administration (main menu top-left)

### Financial Section
- Commission Management
- Accounts Receivable (A/R)
- Cashiering Components
- Fiscal Management
- Budget Forecast

### Inventory Section
- Accommodation Management (Rooms)
- Function Space Management
- Task Sheets
- Room Maintenance

### Booking Section
- Reservation Management
- Booking Rules & Schedules
- Block Management

### Client Relations
- Profiles & Preferences
- Activities
- Loyalty & Membership
- Geographic Management

### Security & User Management
- User Roles & Permissions
- User Administration
- Password Policies
- Audit Logs

### Enterprise/System
- Property Configuration
- OPERA Controls (system-wide toggles)
- Code Tables
- System Utilities
- Data Management
- Integrations

---

## USER ADMINISTRATION & SECURITY

### Creating Users

**Menu Path:** Administration → Security → User Administration → Users

**Steps:**

1. Click **New**
2. Enter user details:
   - **Username:** Unique login ID (e.g., "jsmith", "mgarcia")
   - **Last Name, First Name:** Full name
   - **Email:** User email for password reset
   - **Phone:** Extension or phone
   - **Start Date:** When user begins
   - **End Date:** (If contract/temp) When access ends

3. Assign **Role** (see Role Manager section):
   - Front Desk Agent
   - Housekeeping Manager
   - Manager
   - Administrator
   - Custom role

4. Assign **Property** (if multi-property):
   - Single property access
   - Multiple properties (if permitted)

5. Set **Password Policy**:
   - System generates temporary password
   - User must change on first login
   - Or manually set initial password

6. Click **Save**

### User Roles

Pre-configured roles control menu access and permissions:

| Role | Typical Access |
|------|----------------|
| Front Desk Agent | Check-in/out, room assignment, guest services |
| Night Auditor | Night audit procedures, reconciliation, reports |
| Housekeeping Manager | Room status, work orders, cleaning tasks |
| Manager | All front desk + financial, reporting |
| Controller/Accountant | Financial, A/R, reporting, period close |
| Director | All modules, user management, configuration |
| Administrator | Full system access, all configuration |

### Password Management

**Default Policy:**
- Minimum 12 characters
- Uppercase, lowercase, number, special character required
- Cannot contain username
- Must change every 90 days
- Cannot reuse last 5 passwords
- Account locks after 5 failed login attempts (30-min lockout)

**Reset User Password:**
1. Menu: Administration → Security → User Administration → Users
2. Select user
3. Click **⋮** (Actions) → **Reset Password**
4. System generates temporary password
5. Communicate to user
6. User changes on first login

### Disabling/Deleting Users

**Disable Access (Preferred):**
1. Menu: Administration → Security → User Administration
2. Select user
3. Set **End Date** to today
4. User access immediately disabled
5. User data/history preserved

**Delete User (Permanent):**
1. Menu: Administration → Security → User Administration
2. Select user
3. Click **⋮** → **Delete**
4. Confirm deletion
5. **Warning:** Cannot be undone; data deleted

---

## PROPERTY CONFIGURATION

### OPERA Controls

Global system toggles that affect entire property:

**Menu Path:** Administration → Enterprise → OPERA Controls

Common controls:

| Control | Options | Effect |
|---------|---------|--------|
| Multi Property | On/Off | Enable multi-property access for users |
| Component Suites | On/Off | Enable virtual suite room types |
| Room Class | On/Off | Enable room class hierarchy |
| Room Rotation | On/Off | Enable owner room assignment |
| Auto Calculate VAT | On/Off | Auto-calculate tax on commissions |
| Allow Overbooking | On/Off | Permit more reservations than rooms |
| Advanced Function Space | On/Off | Enable combo spaces for events |
| Email Integration | On/Off | Enable automated guest emails |

**Change Control:**
1. Select control
2. Click current status to toggle
3. Confirm change
4. **Impact:** Affects all users immediately

### Property Information

**Menu Path:** Administration → Enterprise → Property Information

Configure property details:

- Property name
- Address & contact
- Currency & tax ID
- Timezone
- Fiscal year start date
- Chart of accounts
- Default GL codes

---

## SYSTEM UTILITIES & MAINTENANCE

### Data Backup

**Menu Path:** Administration → System → Backup

1. Click **Start Backup**
2. System creates backup of:
   - All configuration
   - Guest profiles
   - Reservations
   - Financial data
   - User accounts
3. Backup compressed and archived
4. Can be used to restore if data loss

**Frequency:** Daily (automatic), plus manual as needed

### System Audit Log

**Menu Path:** Administration → Security → Audit Log

View all system changes:
- User logins/logouts
- Data modifications
- Configuration changes
- Financial transactions
- Failed access attempts

Filter by:
- User
- Date range
- Action type
- Module

**Retention:** Usually 1-2 years for regulatory compliance

### Import/Export Data

**Menu Path:** Administration → System → Data Management

### Import (Upload Data)
1. Click **Import**
2. Select file format (CSV, Excel)
3. Select target (Profiles, Rate Codes, Transaction Codes)
4. Map columns to OPERA fields
5. Preview import (shows changes)
6. Click **Confirm** to import
7. System validates data and applies

**Common imports:**
- Guest profiles from central system
- Rate codes from marketing department
- Bank codes from accounting
- Employee list from HR

### Export (Download Data)
1. Click **Export**
2. Select data to export (Reservations, Profiles, Transactions)
3. Select date range
4. Choose format (CSV, Excel, PDF)
5. Click **Export**
6. File downloaded to computer

**Common exports:**
- Daily operations report
- Revenue data for accounting
- Guest profiles for marketing
- Month-end close data

---

## COMMON CODES & CONFIGURATION

### Code Tables

Access: Administration → Enterprise → Code Tables

Common codes configured:

| Code Type | Examples | Used For |
|-----------|----------|----------|
| Guest Status | Active, VIP, Do Not Disturb, On Hold | Guest categorization |
| Purpose of Stay | Business, Leisure, Medical, Conference | Reporting/analytics |
| Cancellation Reason | Guest Request, No Show, Policy Violation | Track cancellations |
| Room Condition | Clean, Dirty, Inspected, Out of Order | Housekeeping status |
| Payment Method | Credit Card, Cash, Direct Bill, Check | Payment tracking |
| Market Segment | OTA, Direct, Travel Agent, Corporate | Revenue reporting |

### GL Codes (Accounting)

**Menu Path:** Administration → Financial → GL Code Setup

Configure chart of accounts for posting:
- Revenue (Room, F&B, Parking, Resort Fee)
- Expense (Labor, Utilities, Supplies)
- Assets (Bank, AR, Inventory)
- Liabilities (AP, Deposits)

Transactions post to GL codes for financial reporting.

---

## BEST PRACTICES

1. **User Access** - Use role-based access control; limit administrative users
2. **Password Policy** - Enforce strong passwords; require regular changes
3. **Audit Trail** - Review audit logs regularly for suspicious activity
4. **Backup** - Perform daily backups; test restore procedures monthly
5. **Controls** - Document why OPERA Controls are enabled/disabled
6. **Data Quality** - Import only validated, cleaned data
7. **Code Maintenance** - Regularly review codes; delete unused codes
8. **Change Log** - Document all major configuration changes with rationale

---

## Related Guides

- [Financial Administration Complete](03-FINANCIAL-COMPLETE.md)
- [Inventory Administration Complete](02-INVENTORY-ADMINISTRATION-COMPLETE.md)
- [Booking Administration Complete](02b-BOOKING-ADMINISTRATION-COMPLETE.md)
- [Role Manager Guide](04-role-manager-guide.md)
- [Toolbox Guide](05-toolbox-guide.md)

---

**Status:** Administration - Complete Reference
**Last Updated:** 2026-06-07
**Attribution:** Tiago Fitas
**Based on:** Oracle Hospitality OPERA Cloud v24.2 Administration Guide
