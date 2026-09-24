---
name: getting-started-guide
title: OPERA Cloud Getting Started Guide
author: Tiago Fitas
date: 2026-06-07
based_on: Oracle Hospitality OPERA Cloud User Guide v24.2/v25.x
---

# Getting Started with OPERA Cloud

Complete guide for accessing and using OPERA Cloud for the first time.

---

## Prerequisites

Before accessing OPERA Cloud, ensure you have:

- **Computer/Device**
  - Desktop, laptop, tablet, or mobile device
  - Minimum XGA resolution (1024x768)
  - Stable internet connection (4G/5G or WiFi)

- **Browser** (See [Browser Setup](#browser-setup) for full requirements)
  - Chrome (latest version)
  - Firefox (latest version)
  - Safari (latest version)
  - Edge (latest version)

- **Network Access**
  - Outbound HTTPS (port 443) to OPERA Cloud infrastructure
  - No proxy blocking required (but can work behind proxy)
  - VPN optional (for additional security)

- **User Account**
  - Account created by administrator
  - Username assigned
  - Initial password provided (you'll change it on first login)
  - Appropriate role assigned (Front Desk, Manager, Admin, etc.)

- **Credentials**
  - Username
  - Password
  - Optional: Challenge questions for password reset

---

## Browser Setup

### Supported Browsers

| Browser | Version | Operating System |
|---------|---------|------------------|
| Chrome | Latest | Windows, macOS, Linux, iOS, Android |
| Firefox | Latest | Windows, macOS, Linux |
| Safari | Latest | macOS, iOS |
| Edge | Latest | Windows |

### Browser Configuration

**Security Settings:**
- Enable JavaScript (required)
- Enable cookies (required)
- Enable TLS 1.2+ (automatic in modern browsers)
- Allow local storage (recommended for performance)

**Recommended Settings:**
- Enable pop-ups from operacloud.oracleindustry.com
- Add to trusted sites if using self-signed certificates
- Enable WebGL for enhanced performance
- Disable browser extensions that block content

**Mobile Browser Setup:**
- Landscape orientation recommended (wider view)
- Enable auto-rotate for flexibility
- Check that keyboard works (Bluetooth or on-screen)
- Test touch responsiveness before using in production

### Browser Testing Checklist

- [ ] JavaScript enabled
- [ ] Page loads completely (no errors in console)
- [ ] All buttons and links are clickable
- [ ] Text is readable (zoom at 100%)
- [ ] Right-click context menus work
- [ ] Keyboard navigation works (Tab key)
- [ ] Printing works if needed

---

## Authentication

### Signing In

**OPERA Cloud URL:**
```
https://operacloud.oracleindustry.com/OPERA9/opera/operacloud
```

**Sign-In Steps:**

1. Navigate to OPERA Cloud URL in browser
2. Wait for login page to load
3. Enter your **username**
4. Enter your **password**
5. Click **Sign In**
6. If prompted, enter **challenge question answer** (see [Password Security](#password-security))
7. Wait for dashboard to load

**First Sign-In Experience:**
- Dashboard loads to your assigned home screen
- Quick Launch appears in top navigation
- Your role determines visible menus and options

### Signing Out

**To Sign Out:**

1. Click your **user profile icon** (top-right corner)
2. Select **Sign Out** or **Logout**
3. Confirm logout if prompted
4. You are returned to login page

**Important:** Always sign out when leaving your workstation, especially on shared computers.

### Session Timeout

- Default session timeout: 30 minutes of inactivity
- Warning appears 5 minutes before timeout
- Click **Continue** to extend session
- Session expires if you don't respond to warning
- You'll need to sign in again

---

## Password Security

### Changing Your Password

**First Time Login:**
1. You'll be prompted to change your default password
2. Enter new password (must meet complexity requirements)
3. Confirm password
4. Set challenge questions for password recovery

**Change Password Anytime:**

1. Click profile icon (top-right)
2. Select **Change Password** or **Security Settings**
3. Enter **current password**
4. Enter **new password** (requirements shown)
5. Confirm new password
6. Click **Save**

### Password Requirements

- Minimum 12 characters
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 number (0-9)
- At least 1 special character (!@#$%^&*)
- Cannot contain username
- Cannot reuse last 5 passwords
- Expires every 90 days

### Challenge Questions

Challenge questions are used if you forget your password:

1. Click **Forgot Password** on login page
2. Enter username
3. Answer your challenge questions
4. Receive temporary password via email
5. Sign in with temporary password
6. Change to permanent password

**Setting Challenge Questions:**
1. Go to **User Settings** > **Security**
2. Click **Update Challenge Questions**
3. Select questions from dropdown
4. Enter your answers
5. Save

---

## Multi-Property Access

### Changing Your Property/Location

If you have access to multiple properties:

1. Click **Property Selector** (usually top-left under your name)
2. Select the **property** you want to work in
3. Application reloads showing that property's data
4. Dashboard updates to show selected property

**Note:** Some administrators have cross-property access and can switch between properties. Your role determines which properties you can access.

### Multi-Property Dashboard

If you manage multiple properties, you can see:
- Across-property reporting
- Consolidated views of key metrics
- Property-by-property drill-down
- Comparative analysis

---

## Common Actions & Navigation

### Main Navigation

**Top Navigation Bar:**
- **Logo** - Returns to home dashboard
- **Search/Quick Launch** - Fast access to any function
- **Property Selector** - Choose which property (if multi-property)
- **Notifications** - Bell icon, shows alerts and messages
- **Settings** - User preferences and configuration
- **Help** - Link to documentation and support
- **Profile** - User menu, sign out

**Side Navigation Menu:**
- Expands/collapses with menu icon
- Shows your assigned menu modules
- Organized by function (Client Relations, Front Desk, etc.)
- Favorites can be pinned for quick access

### Icons You'll See

| Icon | Meaning | Action |
|------|---------|--------|
| ⊕ | Add/Create | Click to create new record |
| ✎ | Edit | Click to modify record |
| 🗑 | Delete | Click to remove record |
| 💾 | Save | Click to save changes |
| ⟲ | Refresh | Click to reload data |
| ☰ | Menu | Click to show/hide menu |
| 🔍 | Search | Click to find records |
| ✓ | Confirm/Save | Click to apply changes |
| ✕ | Cancel/Close | Click to exit without saving |
| ℹ | Information | Hover to see tooltip |

### Quick Launch (Search)

Fastest way to navigate:

1. Press **Ctrl+L** (or click Quick Launch icon)
2. Type what you're looking for:
   - Guest name: "John Smith"
   - Reservation number: "RES123456"
   - Room number: "101"
   - Menu option: "Night Audit"
   - Report name: "Daily Sales"
3. Results appear as you type
4. Click result to navigate directly

---

## Application Settings

### Personal Preferences

To customize your OPERA Cloud experience:

1. Click **Settings** (top-right menu)
2. Select **Preferences** or **My Settings**
3. Configure:
   - **Language** - English, Spanish, French, etc.
   - **Time Zone** - Your local timezone
   - **Date Format** - MM/DD/YYYY or DD/MM/YYYY
   - **Currency** - Display currency for amounts
   - **Decimal Places** - For financial amounts (usually 2)
   - **Keyboard Layout** - For non-English keyboards
   - **Default Property** - Which property opens on login
   - **Dashboard View** - Your custom dashboard

4. Click **Save**

### Theme & Display

- **Light/Dark Mode** - Eye-friendly dark theme available
- **Font Size** - Adjust for readability
- **Compact/Expanded View** - More info per row vs. cleaner display
- **Column Preferences** - Choose which data columns to show

---

## Dashboard

### Home Dashboard Overview

Your personalized home screen showing:

**Key Information Cards:**
- **Arrivals Today** - Number of check-ins expected
- **Departures Today** - Number of check-outs expected
- **Occupancy** - Percentage of rooms occupied
- **Outstanding Folios** - Guest accounts needing payment
- **Maintenance Alerts** - Room maintenance issues

**Quick Actions:**
- **New Reservation** - Create a booking
- **Check In Guest** - Process arrival
- **Check Out Guest** - Process departure
- **Find Guest** - Search for a profile
- **View Reports** - Access key reports

**Alerts & Messages:**
- System alerts (e.g., "Rate Plan Expires Today")
- Messages from management
- Maintenance requests
- Outstanding items requiring attention

### Customizing Your Dashboard

1. Click **Customize** (usually at top of dashboard)
2. Drag cards to rearrange
3. Add/remove cards with **+ Add Widget**
4. Resize cards by dragging corners
5. Save your layout

---

## Terminology & Concepts

### Key OPERA Cloud Concepts

**Folio** - Guest's account/bill during their stay (or post-stay)

**Reservation** - Booking confirming room assignment and dates

**Guest Profile** - Master record of guest with preferences, contact info, payment

**Room Type** - Category of room (Standard, Deluxe, Suite, etc.)

**Rate Plan** - Pricing structure defining how rooms are sold

**Block** - Group reservation (e.g., tour group, event attendees)

**OTA** - Online Travel Agency (Booking.com, Expedia, etc.)

**Channel Manager** - System connecting to OTA distribution

**Night Audit** - End-of-day process finalizing financial records

**Business Date** - Hotel's operational date (may differ from calendar date)

For complete glossary, see [OPERA Terminology](07-glossary.md)

---

## Deep Links (Advanced)

Power users can use deep links to navigate directly to specific pages:

```
https://operacloud.oracleindustry.com/OPERA9/opera/operacloud?param=value
```

Examples:
- Navigate to guest profile
- Open specific reservation
- Launch report with filters pre-filled
- Jump to configuration screen

See [Deep Links Guide](advanced-deep-links.md) for complete list.

---

## Page Composer

Advanced feature allowing administrators to customize screens:

- Add/remove fields from forms
- Reorder fields for workflow
- Create custom views
- Hide unused options
- Add custom buttons and workflows

Access: **Administration** > **Page Composer**

---

## Performance Meter

Monitor your OPERA Cloud performance:

1. Press **F12** (Developer Tools)
2. Look for **Performance Meter** tab
3. Check:
   - Page load time (should be <3 seconds)
   - API response time (should be <500ms)
   - Network quality indicator
   - Browser resource usage

If slow, see [Performance Optimization](08d-performance.md)

---

## Getting Help

### In-Application Help

- Click **?** icon in any screen
- Hover over field labels for tooltips
- Right-click on fields for context help
- **Help Center** link in top menu

### Contact Support

- **Hotel IT Team** - For access, password, technical issues
- **Oracle Support** - For system issues (requires SR number)
- **Your Manager** - For procedural questions

### Training Resources

- [Oracle Hospitality Digital Learning](https://mylearn.oracle.com/) - Video courses
- **In-Application Guides** - Step-by-step procedures
- **Knowledge Base** - Articles on common tasks

---

## First Day Checklist

- [ ] Successfully signed in
- [ ] Changed password from default
- [ ] Set challenge questions
- [ ] Explored home dashboard
- [ ] Located main menu items for your role
- [ ] Tested Quick Launch search
- [ ] Verified your assigned property/properties
- [ ] Read your role-specific guide (Front Desk, Manager, etc.)
- [ ] Knew how to sign out and contact support
- [ ] Completed any required training

---

## Common Issues on First Login

| Issue | Solution |
|-------|----------|
| Can't remember password | Click "Forgot Password" on login page |
| Browser not working properly | Clear browser cache, try different browser |
| Can't see all menus | Check that your role is configured correctly |
| Page loads very slowly | Check internet speed, close other applications |
| Getting logged out frequently | Session timeout is normal; click "Continue" when prompted |

---

## Next Steps

Based on your role:

- **Front Desk:** Go to [Front Desk Guide](02c-front-desk.md)
- **Housekeeping:** Go to [Housekeeping Role](04-role-manager.md#housekeeping)
- **Manager/Administrator:** Go to [Administration Guide](03a-administration.md)
- **Night Audit:** Go to [Night Audit Procedures](08a-night-audit.md)

---

**Status:** Getting Started Reference  
**Last Updated:** 2026-06-07  
**Attribution:** Tiago Fitas

**Official Reference:** [OPERA Cloud Getting Started](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/ch_getting_started.htm)
