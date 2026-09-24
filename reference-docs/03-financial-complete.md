---
name: financial-administration-complete
title: OPERA Cloud Financial Administration - Complete Reference
author: Tiago Fitas
date: 2026-06-07
based_on: Oracle Hospitality OPERA Cloud v24.2 Financial Administration User Guide
---

# Financial Administration Complete Reference

Comprehensive financial configuration and management procedures for OPERA Cloud.

---

## Overview

Financial Administration controls: accounts, codes, rates, commissions, cashiering, fiscal compliance, A/R, and end-of-day close procedures.

**Sections:**
1. Commissions (Travel Agent payments)
2. Accounts Receivable Configuration
3. Cashiering Components
4. Transaction Codes
5. Rate Management
6. Comp Accounting
7. Fiscal Management
8. Budget Forecast
9. End of Day/Night Audit

---

## 1. COMMISSIONS ADMINISTRATION

**Purpose:** Configure travel agent and source commission payments based on reservations.

### Commission Hierarchy

Commission is calculated using this **4-level priority** (first match wins):

1. **Rate Code** - Specific rate "SPAPKG" = "NON" commission (zero payment)
2. **Negotiated Rate** - Special negotiated rates override rate code
3. **Sales Account** - Specific travel agent/source profile commission
4. **Default** - Global default commission code (fallback)

### Commission Code Types

#### A. Flat Amount Commission (Per Night or Per Stay)

**Menu Path:** Administration → Financial → Commission Management → Commission Codes

**Configuration Steps:**

1. Click **New**
2. Enter:
   - **Property:** Hotel property
   - **Code:** Alphanumeric identifier (e.g., "FLAT10")
   - **Description:** "10% per night flat"
   - **Sequence:** Sort order in lists (optional)
   - **Hold Status:** 
     - **Always:** Manual review before payment
     - **Accounts Receivable:** Hold if folio has direct bill (AR) codes
     - **Prepaid:** Hold if prepaid commission exists
   - **Based On:** Select "Reservation"
   - **Amount:** $ amount to pay per commission unit
   - **Calculation Rule:**
     - **Per Night:** Amount × number of stay nights
     - **Per Stay:** Fixed amount for entire stay
   - **Tax %:** Commission tax (auto-calculated if OPERA Control "Auto Calculate VAT" is enabled)
3. Click **Save**

**Example:** Commission code "FLT50" = $50 per night
- 3-night stay = $150 commission (if Per Night selected)
- 3-night stay = $50 commission (if Per Stay selected)

#### B. Revenue Percentage Commission (Weekday/Weekend rates)

**Configuration Steps:**

1. Click **New**
2. Enter:
   - **Property, Code, Description, Sequence** (same as above)
   - **Hold Status** (same as above)
   - **Based On:** Select "Revenue"
   - **Tax %:** Commission tax percentage
3. Click **New** (to add commission tier)
4. Enter for each tier:
   - **Commission %:** Percentage of eligible revenue
   - **Weekend Commission %:** Different rate for weekends (optional)
   - **Based on Net Amount:** Checkbox - calculate on net after discounts
   - **Transaction Code(s):** Select which charges are commissionable
     - Examples: Room revenue, packages, F&B
     - Use Ctrl+click for multiple codes
5. Click **>** to move selected codes to "Selected" list
6. Click **Save**
7. **Repeat to add additional transaction codes** with different commission rates

**Example:** 
- Room revenue: 10% commission
- Package items: 5% commission
- Food/Beverage: 0% (non-commissionable)

### Commission Code Editing

1. Menu: Administration → Financial → Commission Management → Commission Codes
2. Enter search criteria
3. Click **Search**
4. Select code
5. Click **⋮** (Actions menu) → **Edit**
6. Update fields
7. If revenue-based: Select transaction code → **⋮** → **Edit**
8. Click **Save**

### Commission Code Deletion

1. Menu: Administration → Financial → Commission Management → Commission Codes
2. Enter search criteria
3. Click **Search**
4. Select code
5. Click **⋮** (Actions menu) → **Delete**
6. Click **Delete** to confirm

---

## 2. ACCOUNTS RECEIVABLE (A/R) CONFIGURATION

**Purpose:** Manage guest bills not paid at checkout (outstanding folios, corporate accounts).

**Related Oracle Doc:** c_admin_financial_ar_about_accounts_receivable_configuration.htm

### Key Concepts

- **Outstanding Folio:** Guest balance owed (not paid)
- **A/R Account:** GL account tracking unpaid guest balances
- **Settlement:** Payment of outstanding balance
- **Collection:** Following up on overdue accounts

---

## 3. CASHIERING COMPONENTS

**Purpose:** Configure cash drawer, payment methods, transaction types, settlement accounts.

**Related Oracle Doc:** c_cashiering_finance_configuring_cashiering_components_ch.htm

### Payment Methods

Configure which payment types (CC, Cash, Check, Corporate Account) are accepted:

- **Credit Card:** Visa, Amex, Discover, etc. with processor integration
- **Cash:** Direct payment from guest
- **Check:** Guest check payment
- **Corporate Account:** Bill to company

### Cash Drawer Setup

- Open drawer
- Set starting cash amount
- Process transactions
- Close drawer (night audit)

---

## 4. TRANSACTION CODES

**Purpose:** Categorize all charges posted to guest folios (room, F&B, phone, resort fees, etc.).

**Related Oracle Doc:** c_admin_financial_cashiering_about_transaction_codes.htm

### Transaction Code Purpose

Each code identifies:
- **What was charged** (room, meal, resort fee)
- **GL account** to post to (revenue, tax, fee)
- **Commissionable?** (yes/no for travel agent commission)
- **Tax treatment** (taxable/non-taxable)

### Common Transaction Codes

| Code | Description | Commissionable | Tax |
|------|-------------|-----------------|-----|
| ROOM | Room revenue | Yes | Yes |
| PKG | Package charge | Yes | Yes |
| FOOD | Food/Beverage | No | Yes |
| RFEE | Resort fee | No | No |
| PHONE | Phone call | No | Yes |
| PARK | Parking | No | No |

---

## 5. RATE MANAGEMENT

**Purpose:** Configure room rates, rate plans, rate restrictions, and rate derivation.

**Related Oracle Doc:** c_rate_management_ch.htm

### Rate Plan Components

- **Base Rate:** Room price
- **Rate Plan Type:** Individual, Corporate, Group, Package
- **Restrictions:** Min stay, max stay, close dates
- **Distribution:** Which channels sell this rate
- **Derivation:** How rate is calculated (base + markup, % of base, etc.)

---

## 6. COMP ACCOUNTING

**Purpose:** Configure complimentary (free) room policies and GL posting.

**Related Oracle Doc:** c_comp_accounting-01.htm

### Comp Types

- **Operational Comp:** Hotel decision to waive (service recovery)
- **Group Comp:** Included in group contract
- **Loyalty Comp:** Reward redemption

---

## 7. FISCAL MANAGEMENT

**Purpose:** Configure tax, VAT, and regulatory export (SAF-T Portugal, SII Spain).

**Related Oracle Doc:** c_admin_financial_fiscal_management_title.htm

### Fiscal Setup

- **Country:** Portugal, Spain, etc.
- **Tax ID:** Property tax number
- **Tax Rules:** VAT rates, occupancy tax
- **Export Format:** SAF-T or SII
- **Export Schedule:** Daily, weekly, monthly

---

## 8. BUDGET FORECAST ENTRY

**Purpose:** Enter revenue projections and budgets.

**Related Oracle Doc:** t_admin_financial_cashiering_budget_forecast_entry.htm

---

## 9. END OF DAY / NIGHT AUDIT PROCEDURES

**Purpose:** Close daily transactions, reconcile accounts, post automatic charges.

**Related Oracle Doc:** c_endofday_incomeaudit_setting_up_end_of_day_procedures_and_reports_ch.htm

### Night Audit Steps

1. Verify all guest check-outs processed
2. Post automatic charges (late checkout fee, resort fee)
3. Run aging report (what's overdue)
4. Reconcile cash
5. Post GL entries
6. Approve close (locks transactions for that day)

---

## Key OPERA Controls (Global Overrides)

These settings override everything else:

- **Auto Calculate VAT:** Automatically compute tax on commissions
- **Default Commission Code:** Fallback if no other commission matches
- **Default Prepaid Commission:** Prepaid commission setting
- **AR Settlement Trn Code:** Which code indicates direct bill A/R

---

## Commission Calculation Example

**Scenario:** 3-night stay, revenue-based commission

**Setup:**
- Commission Code "REV10": 10% of room revenue, 5% of F&B
- Rate Code "STANDARD": Uses REV10 commission
- Folio Charges:
  - Room: $300/night × 3 = $900 (commissionable at 10%)
  - F&B: $150 (commissionable at 5%)
  - Resort Fee: $50 (non-commissionable)

**Commission Calculation:**
- Room commission: $900 × 10% = $90
- F&B commission: $150 × 5% = $7.50
- Resort fee commission: $0
- **Total Commission: $97.50**

If tax is 10%:
- Commission tax: $97.50 × 10% = $9.75
- **Total Owed to Agent: $107.25**

---

## Automated Commission Processing

OPERA processes commissions in batch:

1. **Nightly:** After night audit close, identify commissionable transactions
2. **Classification:** Apply hierarchy (rate code → negotiated → sales account → default)
3. **Calculation:** Apply commission % or flat amount
4. **Tax:** Auto-calculate if enabled
5. **Hold Processing:** Check hold status rules
6. **Payment:** Generate check or EFT file
7. **Reconciliation:** Post to A/R or payment account

---

## Common Commission Configurations

### Travel Agency with Standard Rate

- Code: "TRAVELCO"
- Based On: Revenue
- Commission: 10%
- Transaction Codes: ROOM, PKG
- Applies to all bookings from "TravelCorp" source

### Non-Commissionable Rate (Spa Package)

- Code: "SPANONC"
- Based On: Reservation
- Amount: 0 (zero)
- Applies to rate code "SPAPKG" only
- Result: No commission paid regardless of source

### Negotiated Account (Corp Client)

- Code: "CORP7PCT"
- Based On: Revenue
- Commission: 7% (negotiated rate)
- Applied at Sales Account level for client "ABC Corp"
- Overrides default 10% for this client only

---

## Integration with Other Systems

**GL Integration:** Commission payments post to GL account (A/P or expense)

**EFT Export:** Commission batches export as electronic fund transfers

**Reporting:** Commission reports track all payments by agent, code, period

---

## Best Practices

1. **Use Hierarchy** - Set default commission, then override selectively
2. **Zero Commission** - Create "NON" code for non-commissionable rates
3. **Hold Review** - Use "Always Hold" for unusual commission amounts
4. **Tax Compliance** - Enable auto VAT calculation if taxing commissions
5. **Testing** - Test commission code in UAT before deploying
6. **Documentation** - Document why each commission code exists

---

## Related Procedures

- [Commission Codes Configuration](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/t_cashiering_finance_managing_commission_codes.htm)
- [Commission Bank Accounts](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/t_configuration_codes_bank_accounts.htm)
- [About Accounts Receivable](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/c_admin_financial_ar_about_accounts_receivable_configuration.htm)
- [Cashiering Components](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/c_cashiering_finance_configuring_cashiering_components_ch.htm)
- [Rate Management](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/c_rate_management_ch.htm)
- [End of Day Procedures](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/c_endofday_incomeaudit_setting_up_end_of_day_procedures_and_reports_ch.htm)
- [Fiscal Management](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/c_admin_financial_fiscal_management_title.htm)

---

**Status:** Financial Administration - Complete Reference  
**Last Updated:** 2026-06-07  
**Attribution:** Tiago Fitas  
**Based on:** Oracle Hospitality OPERA Cloud v24.2 Financial Administration Guide

**Official Reference:** [OPERA Cloud Financial Administration](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.2/ocsuh/c_admin_financial_chapter_title.htm)
