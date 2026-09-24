# Loyalty and Membership Configuration

OPERA Cloud Loyalty is the integrated loyalty programme module. It manages member profiles, tier structures, point accrual rules, redemption and award handling, and tier benefits. Properties can run their own programme via native OPERA Cloud Loyalty, integrate with an external loyalty platform (Cendyn, ICR, Stash, etc.) via OHIP, or operate both in parallel.

This document covers the native module and integration patterns.

---

## Reference documents

- Oracle Hospitality OPERA Cloud Loyalty User Guide (My Oracle Support)
- Oracle Hospitality OPERA Cloud Membership User Guide
- OHIP loyalty API specifications

---

## Core entities

### Loyalty programme

The top-level container defining the programme name, currency, tier structure, accrual and redemption rules, and active dates.

### Membership

The link between a guest profile and a loyalty programme. A profile can hold multiple memberships across multiple programmes.

### Tier

A status level within a programme (e.g. Bronze, Silver, Gold, Platinum, Diamond). Each tier has qualification criteria, benefits and an effective date range per member.

### Point balance

The accrued value held against a membership. Can be expressed in points, miles, or programme-specific currency.

### Award

The redemption side. Free nights, upgrades, free F&B credits, gift items.

### Tracking record

A loyalty event posted to a membership (accrual from a stay, redemption, manual adjustment, tier upgrade).

---

## Programme configuration

Configuration is at Administration > Loyalty.

### Step 1 — Programme definition

Define the programme code, name, currency, active dates, business rules.

### Step 2 — Tier configuration

Define tier codes, names, qualification thresholds (stays, nights, spend) and benefit packages per tier.

### Step 3 — Accrual rules

Define how points accrue per stay.

- Points per night
- Points per currency spent
- Bonus multipliers for promotional periods
- Exclusion categories (e.g. taxes, fees)
- Tier-specific accrual multipliers

### Step 4 — Redemption rules

Define how points can be redeemed.

- Award types and their point cost
- Eligibility rules per tier
- Blackout dates
- Combinability with other discounts

### Step 5 — Tier qualification

Define how members move between tiers.

- Annual qualification windows
- Lifetime qualification options
- Soft landing rules when a member fails to requalify
- Top-down or bottom-up qualification logic

### Step 6 — Member communications

Configure programme-related communications: enrolment confirmation, tier upgrade notification, point balance statement, expiry warning.

---

## OPERA Controls relevant to Loyalty

Loyalty-specific controls become visible when the module is licensed.

- Loyalty programme active
- Auto-enrolment at check-in (configurable)
- Member ID generation pattern
- Tier qualification recalculation frequency
- Point expiry policy
- Membership merge rules

---

## Integration with PMS workflow

Loyalty is woven into PMS operations.

| PMS event | Loyalty action |
|---|---|
| Reservation created with member ID | Member profile linked, tier benefits applied |
| Check-in | Tier benefits realised (room upgrade, welcome amenity, late check-out) |
| Charge posted | Points accrued per accrual rules |
| Check-out | Final accrual and statement generated |
| Night audit | Periodic accrual posting and tier recalculation |

---

## External loyalty platform integration

For programmes managed externally (chain loyalty platforms, third-party engines), OPERA Cloud integrates via OHIP.

Integration patterns.

- Profile sync: chain CRM holds master member record, syncs to OPERA Cloud
- Event push: OPERA Cloud Business Events notify external platform of stays, charges, check-ins
- Accrual: external platform calculates and may write back to OPERA for display
- Redemption: external platform manages awards and pushes redemptions to OPERA Cloud

---

## OHIP APIs for loyalty

OHIP exposes loyalty-related APIs.

- Member enrolment and profile management
- Membership lookup
- Point balance retrieval
- Tracking record retrieval and posting
- Award redemption

See the hospitality-api-docs repository for the current subject area specifications.

---

## Common partners

| Partner | Notes |
|---|---|
| Cendyn Loyalty | Chain-level loyalty platforms |
| ICR | Hospitality loyalty specialist |
| Stash Rewards | Independent hotel collective |
| Revinate | CRM with loyalty elements |
| dailypoint | CDP and loyalty |

Verify current Oracle Validated Integration status.

---

## Common issues

- Members not accruing on certain charge types because exclusion rule too broad
- Tier upgrades not effective until next stay because recalculation frequency too low
- Duplicate memberships from incomplete profile merge logic
- External programme out of sync due to missed Business Event
- Point expiry not communicated, leading to member complaints
- Cross-programme accrual (codeshare with airline) not configured

---

## Best practices

- Maintain a single master profile per member across all properties of the chain
- Run periodic membership cleanup to merge duplicates and standardise data
- Test accrual rules quarterly against representative reservations
- Monitor point liability as a financial metric
- Coordinate marketing communications via the configured loyalty messaging

---

*Derived from Oracle Hospitality OPERA Cloud Loyalty User Guide and Membership User Guide. Not affiliated with Oracle Corporation. Partner names mentioned remain trademarks of their respective owners. Licensed CC BY-NC-SA 4.0.*
