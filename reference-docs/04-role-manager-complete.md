---
name: role-manager-complete
title: OPERA Cloud Role Manager & Security - Complete Reference
author: Tiago Fitas
date: 2026-06-07
based_on: Oracle Hospitality OPERA Cloud v24.2 Security & User Management
---

# Role Manager & Security - Complete Reference

Comprehensive guide to user roles, permissions, and security in OPERA Cloud.

---

## Overview

Role Manager controls system access and functionality permissions:
- Pre-configured roles (Front Desk, Manager, Admin)
- Custom role creation
- Permission assignment by module
- Menu/function access control
- Data visibility restrictions

---

## PRE-CONFIGURED ROLES

### Front Desk Agent
**Access:** Front Desk module only

**Permissions:**
- Check-in/check-out guests
- Assign rooms
- Manage guest messages
- Process payments
- View guest profiles
- Cannot: Access accounting, reports, configuration

**Typical Users:** Front desk receptionists, bell staff

### Night Auditor
**Access:** Front Desk + specific night operations

**Permissions:**
- Guest check-in/check-out
- Night audit procedures
- Financial reconciliation
- Daily close report
- Cannot: Modify configuration, access future dates

**Typical Users:** Night shift supervisors, audit staff

### Housekeeping Manager
**Access:** Inventory module

**Permissions:**
- View room status
- Update room conditions
- Manage work orders
- View room maintenance
- Cannot: Access financial, booking, guest profiles

**Typical Users:** Housekeeping managers, room inspectors

### Manager/Supervisor
**Access:** Multiple modules (Front Desk, Inventory, limited Booking)

**Permissions:**
- All front desk functions
- Housekeeping management
- Guest issue resolution
- Department reporting
- Cannot: Accounting, rate changes, user admin

**Typical Users:** Front office managers, shift supervisors

### Controller/Finance Manager
**Access:** Financial module + reporting

**Permissions:**
- Commission configuration
- A/R management
- Cashiering setup
- Financial reporting
- Period close procedures
- Cannot: Front desk operations (unless assigned), user admin

**Typical Users:** Finance managers, controllers, accountants

### Director/Administrator
**Access:** All modules

**Permissions:**
- Full system access
- All configuration
- User administration
- System utilities
- Data management

**Typical Users:** General managers, IT administrators, owners

---

## CUSTOM ROLE CREATION

**Menu Path:** Administration → Security → Roles

When pre-configured roles don't fit:

**Step 1: Create New Role**

1. Click **New**
2. Enter:
   - **Role Name:** (e.g., "Duty Manager", "Sales Manager")
   - **Description:** Role purpose
   - **Status:** Active/Inactive

**Step 2: Assign Modules**

By module, assign permission level:

| Permission | Access |
|------------|--------|
| None | No access |
| View | Read-only access |
| Create | Add new records |
| Edit | Modify existing records |
| Delete | Remove records |
| Full | All permissions |

**Examples:**

**Sales Manager Role:**
- Booking Admin: Full (manage rates, discounts, blocks)
- Front Desk: View (see reservations)
- Financial: View (commission reports)
- Accounting: None
- Administration: None

**Revenue Manager Role:**
- Booking Admin: Edit (rate changes, restrictions)
- Financial: Full (commission, revenue codes)
- Reporting: Full (revenue reports, forecasts)
- Front Desk: View
- Administration: None

**Step 3: Set Function Permissions**

Within modules, restrict specific functions:

**Front Desk:**
- ✓ Check-in
- ✓ Check-out
- ✓ Room assignment
- ✗ Void transaction
- ✗ Modify past folios

**Financial:**
- ✓ View reports
- ✓ Commission setup
- ✗ Delete transaction
- ✗ Modify closed periods

**Step 4: Save Role**

1. Click **Save**
2. Role available for assignment to users

---

## ASSIGNING ROLES TO USERS

**Menu Path:** Administration → Security → User Administration → Users

**Step 1: Select User**

1. Search for user
2. Click to open user details

**Step 2: Assign Role**

1. Find **Role** field
2. Click to select from dropdown
3. Choose primary role (e.g., "Front Desk Agent")

**Step 3: Add Additional Roles (If Allowed)**

Some users need multiple roles:
- Manager + Duty Manager during shifts
- Controller + Front Office Manager
- Director + specific department roles

1. Click **Add Additional Role**
2. Select secondary role
3. Set activation dates (if role is temporary)

**Step 4: Property Assignment**

1. Select **Properties** user can access
2. Single property: Select one
3. Multi-property: Select all applicable

**Step 5: Save**

1. Click **Save**
2. User access updated immediately

---

## PASSWORD SECURITY

### Password Policy

**Default Requirements:**
- Minimum 12 characters
- Uppercase + lowercase + number + special character
- Cannot contain username
- Change every 90 days
- No reuse of last 5 passwords
- Account locks after 5 failed attempts (30-min lockout)

### Customize Password Policy

**Menu Path:** Administration → Security → Password Policy

Adjust if needed:
- Minimum character length
- Complexity requirements
- Expiration days
- Lock-out attempts
- Lock-out duration

### Forgotten Password Reset

**User Self-Service:**
1. At login screen: Click **Forgot Password**
2. Enter username
3. Answer security questions (if configured)
4. Temporary password sent via email
5. User logs in with temp password
6. System forces password change

**Administrator Reset:**
1. Menu: Administration → Security → User Administration
2. Select user
3. Click **⋮** → **Reset Password**
4. Communicate temporary password to user
5. User changes on next login

---

## AUDIT & COMPLIANCE

### Audit Log

**Menu Path:** Administration → Security → Audit Log

Track all system activity:
- User logins/logouts
- Data modifications (who, when, what changed)
- Configuration changes
- Financial transactions
- Failed access attempts
- Report generation

**Search Audit Log:**
1. Click **Audit Log**
2. Filter by:
   - Date range
   - User
   - Module
   - Action type (Create, Edit, Delete)
3. View detail: Click record to see before/after values

**Retention:** 1-2 years (configurable)

### Login Tracking

**View User Logins:**
1. Menu: Administration → Security → Login History
2. See for each user:
   - Login time
   - Login location/IP
   - Device type
   - Session duration
   - Logout time

**Identify Issues:**
- Multiple concurrent logins (possible account sharing)
- Off-hours logins (outside scheduled shifts)
- Failed login attempts (brute force attempts)
- Unusual locations (potential compromise)

### Change Log

**Track Configuration Changes:**
1. Menu: Administration → Utilities → Change Log
2. View who modified:
   - Rates
   - Commission codes
   - GL codes
   - OPERA Controls
   - User permissions
3. See timestamp and user

---

## SECURITY BEST PRACTICES

1. **Least Privilege** - Assign only permissions needed for role
2. **Segregation of Duties** - Separate approval/execution (e.g., commission posting vs. verification)
3. **Regular Review** - Quarterly review of user roles and access
4. **Remove Access** - Disable users when they leave (don't delete)
5. **Strong Passwords** - Enforce and monitor password changes
6. **Audit Trails** - Review audit logs for anomalies
7. **Role Consolidation** - Use roles; avoid individual permission tweaks
8. **Training** - Educate users on security importance

---

## COMMON ROLE SCENARIOS

### Multi-Property Setup

**User Type:** Regional Manager

**Roles:**
- Manager (all properties)
- Reporting (all properties)
- Front Desk View-only (all properties)

**Properties:** East Wing, West Wing, Downtown

### Department-Specific

**Housekeeping Manager Role:**
- Housekeeping: Full
- Front Desk: View
- Accounting: None
- Reporting: Housekeeping reports only

**Sales Manager Role:**
- Booking: Full (rates, blocks, events)
- Financial: Commission view
- Reporting: Sales reports
- Front Desk: View
- Configuration: None

### Temporary Staff

**Seasonal Front Desk Agent:**
- Role: Front Desk Agent
- Properties: Main hotel
- Start Date: June 1
- End Date: August 31
- Access disabled automatically on end date

---

## Related Procedures

- [User Administration](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/c_security_user_administration_title.htm)
- [Password Security](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/c_security_password_policies.htm)
- [Audit Logs](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/c_security_audit_logs.htm)

---

**Status:** Role Manager & Security - Complete Reference
**Last Updated:** 2026-06-07
**Attribution:** Tiago Fitas
**Based on:** Oracle Hospitality OPERA Cloud v24.2 Security Guide
