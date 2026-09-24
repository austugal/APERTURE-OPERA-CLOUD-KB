---
name: exchange-integration-guide
title: OPERA Cloud Exchange and Integration Guide
author: Tiago Fitas
date: 2026-06-07
based_on: Oracle Hospitality OPERA Cloud Exchange User Guide v24.2
---

# OPERA Cloud Exchange & Integration Guide

Complete reference for OPERA Cloud integrations with external systems.

---

## Overview

OPERA Exchange enables real-time, two-way data communication with:

- Channel managers (SiteMinder, SynXis, Profitroom)
- Payment processors and gateways
- Back-office financial systems
- Property management integrations
- Custom applications via APIs

---

## Exchange Overview

Two-way data synchronization keeping OPERA and external systems in real-time sync.

### How Exchange Works

1. **OPERA sends data** to external systems
   - Rates and availability changes
   - Reservation updates
   - Guest information
   - Payment transactions

2. **External systems send data** to OPERA
   - New reservations from OTAs
   - Rate updates from channel managers
   - Payment confirmations
   - Availability restrictions

3. **Synchronization** occurs in real-time or scheduled intervals

### Data Flows

**Reservation Flow:**
- OTA sends reservation → Channel Manager → OPERA Cloud
- OPERA confirms and updates room status
- OPERA sends confirmation back → OTA

**Rate Flow:**
- OPERA updates room rate in system
- Exchange pushes new rate → Channel Manager
- Channel Manager distributes to OTAs
- Real-time rate distribution

**Availability Flow:**
- Rooms sold → Room status changes to Occupied
- OPERA sends availability update → Channel Manager
- Channel Manager updates availability on all OTAs
- Prevents overbooking

---

## Exchange Interface Setup

Configure OPERA Cloud to communicate with external systems.

### Activating an Interface

**Basic Interface Setup:**
1. Menu: Exchange → Interface Setup
2. Click **New Interface**
3. Select interface type:
   - Channel Manager (SiteMinder, SynXis, etc.)
   - Payment Gateway
   - GL Integration
   - API
4. Enter interface name
5. Configure credentials/endpoints
6. Test connection
7. Enable interface

### Interface Mapping

Map OPERA Cloud data to external system fields.

**Example: Rate Code Mapping**
- OPERA rate code "CORP" maps to SiteMinder rate ID "4521"
- OPERA rate code "WEB" maps to SiteMinder rate ID "4522"
- System automatically converts when exchanging data

**Mapping Configuration:**
1. Menu: Exchange → Interface Mapping
2. Select interface
3. Select data type to map:
   - Rate codes
   - Room types
   - Market segments
   - Payment methods
4. Create mapping:
   - OPERA value = External value
5. Save mapping
6. Verify mapping works

### Interface Controls

Start, stop, and monitor interfaces.

**Interface Controls:**
1. Menu: Exchange → Interface Controls
2. Select interface
3. Available actions:
   - **Start** - Activate data exchange
   - **Stop** - Suspend data exchange
   - **Pause** - Temporarily pause (for maintenance)
   - **Resume** - Restart after pause
   - **Reset** - Clear any error states

**Example Workflow:**
1. During rate updates: Pause interface
2. Update rates in OPERA
3. Resume interface
4. Interface syncs new rates to channel manager

---

## Channel Manager Integration

Connect to channel managers for OTA distribution.

### SiteMinder Configuration

**SiteMinder Setup:**
1. Menu: Exchange → Channel Manager Setup → SiteMinder
2. Enter SiteMinder credentials:
   - Client ID
   - Username
   - Password
3. Configure OPERA properties:
   - Hotel ID in SiteMinder
   - Properties to sync
4. Set sync frequency:
   - Real-time availability
   - Scheduled rate updates
5. Test connection
6. Enable sync

**What Syncs to SiteMinder:**
- Room availability (in real-time)
- Rates and rate plans
- Restrictions (minimum stay, closures)
- Reservations from OTAs

**What OPERA Receives from SiteMinder:**
- OTA reservations
- Rate changes from channel manager
- Availability updates
- Manual inventory controls

### SynXis Configuration

**SynXis Setup:**
1. Menu: Exchange → Channel Manager Setup → SynXis
2. Enter SynXis credentials:
   - CRS ID
   - User ID
   - Password
   - API endpoint URL
3. Configure property mapping
4. Set sync parameters
5. Test connection
6. Enable sync

**SynXis Capabilities:**
- Central Reservation System (CRS)
- Linked Hotel (satellite properties)
- Rate distribution to GDS (Global Distribution System)
- Management of reservation flow

### Profitroom Configuration

**Profitroom Setup:**
1. Menu: Exchange → Channel Manager Setup → Profitroom
2. Configure:
   - Profitroom API credentials
   - Property code
   - Channel list to sync
3. Map rate plans and room types
4. Configure sync frequency
5. Test connection
6. Enable

---

## Payment Gateway Integration

Configure payment processing interfaces.

### Payment Gateway Setup

**Configure Payment Processor:**
1. Menu: Exchange → Payment Gateway Setup
2. Select payment processor:
   - Worldpay
   - First Data
   - Chase
   - American Express
   - Other processor
3. Enter gateway credentials:
   - Merchant ID
   - API key
   - Terminal ID
4. Configure settings:
   - Currency
   - 3D Secure requirement
   - AVS (Address Verification) requirement
5. Test transaction
6. Enable processor

### Authorization and Settlement

**Transaction Flow:**
1. Guest provides payment method at check-in
2. OPERA sends authorization request to payment gateway
3. Payment gateway authorizes (reserves funds)
4. OPERA receives confirmation
5. At checkout: OPERA sends settlement request
6. Payment gateway captures (actually charges)
7. Settlement batch at end of day
8. Funds deposited to hotel account

### Reconciliation

**Daily Reconciliation:**
1. Menu: Exchange → Payment Reconciliation
2. Compare:
   - OPERA transactions
   - Payment gateway settlements
   - Bank deposits
3. Identify discrepancies
4. Investigate and resolve
5. Document findings

---

## Back-Office GL Integration

Synchronize financial data with accounting system.

### GL Account Mapping

**Map OPERA Accounts to GL:**
1. Menu: Exchange → GL Integration → Account Mapping
2. For each OPERA revenue account:
   - Room revenue → GL account (e.g., 4100)
   - Food revenue → GL account (e.g., 4110)
   - Beverage revenue → GL account (e.g., 4120)
3. For expense accounts:
   - Labor → GL account (e.g., 6100)
   - Supplies → GL account (e.g., 6200)
4. Configure posting rules
5. Save mapping

### Posting Configuration

**How OPERA Posts to GL:**
1. Guest charges are recorded in OPERA
2. End-of-day close accumulates totals by account
3. Exchange creates GL journal entries
4. Entries post to GL system
5. GL reconciles and closes periods

**Posting Frequency:**
- Real-time (as transactions occur)
- Nightly batch (after night audit close)
- Manual (operator initiates)

### Financial Reconciliation

**GL Reconciliation Process:**
1. OPERA total room revenue: $10,000
2. GL shows posted amount: $10,000
3. GL shows GL account balance: $10,000
4. All reconcile = balanced
5. If discrepancies: investigate postings

---

## Message Status

Monitor and troubleshoot data exchange.

### Message Queue

**View Message Queue:**
1. Menu: Exchange → Message Status
2. See all messages:
   - Sent (successful)
   - Pending (waiting)
   - Failed (error)
   - Retry (retrying failed)

**Message Details:**
1. Click message
2. View:
   - Timestamp
   - Source (OPERA or external)
   - Data (what was sent)
   - Status and result
   - Any error message

### Retry Failed Messages

**Handling Failed Messages:**
1. Menu: Exchange → Message Status
2. Filter by Status = "Failed"
3. Review failure reason
4. Fix root cause (if applicable)
5. Select failed message
6. Click **Retry**
7. Monitor retry status

**Common Failure Reasons:**
- Invalid mapping (data doesn't match external system format)
- Network unavailable (external system down)
- Credentials expired (API key or password expired)
- Rate limit exceeded (too many requests)

---

## Interface Resync

Synchronize data when out of sync.

### Detecting Out-of-Sync

**Signs of Sync Issues:**
- Availability differs between OPERA and OTA
- Rates updated in OPERA but not on OTA
- Reservation received but not in OPERA
- Payment processed but not showing in OPERA

### Running a Resync

**Full Resync:**
1. Menu: Exchange → Interface Resync
2. Select interface
3. Select data type:
   - Rates
   - Availability
   - Reservations
4. Select date range
5. Click **Resync**
6. System compares OPERA data with external system
7. Resolves discrepancies
8. Completes resync

**Note:** Full resync may take time and temporarily impact performance.

---

## API Integration

Direct integration with custom applications.

### OHIP Developer Portal

**Getting Started with APIs:**
1. Visit OHIP Developer Portal
2. Create developer account
3. Generate API credentials:
   - Client ID
   - Client Secret
4. Review API documentation
5. Build custom integration

### Common API Use Cases

**Mobile App Integration:**
- Check guest in from app
- Retrieve guest preferences
- Submit maintenance requests
- View room service menu

**Channel Manager Custom Integration:**
- Push custom rates
- Pull OTA reservations
- Control availability

**Loyalty System Integration:**
- Update guest loyalty points
- Check membership status
- Manage tier upgrades

---

## Troubleshooting Exchange

### Common Issues

**Rates Not Syncing:**
- Check interface status (enabled?)
- Verify rate mapping (codes correct?)
- Check message queue for errors
- Test interface connection

**Reservations Not Received:**
- Verify channel manager sending reservations
- Check interface mapping (room types correct?)
- Review message queue for errors
- Confirm channel enabled in SiteMinder/SynXis

**Payment Failures:**
- Verify payment gateway credentials
- Check merchant account active
- Confirm SSL certificates valid
- Test with small transaction

**GL Not Posting:**
- Verify GL integration enabled
- Check account mapping
- Confirm GL system is accepting posts
- Review GL posting logs

---

## Best Practices

1. **Monitor Regularly** - Check message queue and sync status daily
2. **Test Before Production** - Test all integrations in test environment first
3. **Maintain Mapping** - Keep OPERA-to-external mappings documented and current
4. **Backup Configuration** - Export interface configurations regularly
5. **Escalate Issues** - Contact Oracle support for interface issues
6. **Audit Trails** - Monitor message logs for audit purposes

---

## Related Procedures

- [Exchange Overview](c_overview_exchange.htm)
- [Exchange Interface Setup](t_setting_interface.htm)
- [Interface Mapping Configuration](t_mapping_interface.htm)
- [Prerequisites for Exchange](c_prerequisites_for_exchange.htm)

---

**Status:** Exchange & Integration Reference  
**Last Updated:** 2026-06-07  
**Attribution:** Tiago Fitas  
**Based on:** Oracle Hospitality OPERA Cloud v24.2 Exchange Guide

**Official Reference:** [OPERA Cloud Exchange](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/part_exchange_menu.htm)
