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

## OPERA Controls relevant to Membership

The Membership group in OPERA Controls ([Oracle, OPERA Controls — Membership, 24.3](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.3/ocsuh/c_opera_controls_membership.htm)). Names and codes as Oracle lists them. Several are global controls.

| Control | Type | What it does, per Oracle |
|---|---|---|
| ENROLLMENT `[ENROLLMENT]` | Function | Enrol guests and contacts in a membership programme managed in an external loyalty solution |
| DEFAULT ENROLLMENT CODE `[DEFAULT_ENROLLMENT_CODE]` | Parameter, under ENROLLMENT | Default Enrollment Code identifying how the guest was enrolled. Displayed when enrolling or adding membership details to a profile |
| ENROLLMENT TYPE `(ENROLLMENT_TYPE)` | Parameter, under ENROLLMENT | Enrollment types available: Loyalty, Gaming |
| DEFAULT MEMBERSHIP TYPE `[DEFAULT_MEMBERSHIP_TYPE]` | Setting | The membership type that automatically populates in the Memberships panel when adding membership details to a profile, enrolling a profile, or linking a profile membership to a reservation |
| LOYALTY MEMBERSHIP CONFIGURATION `[OCIS_MEM_CONF]` | Parameter | Configure membership class, types, status codes and qualifying rates for the primary loyalty membership type when integrated with an external loyalty solution |
| MEMBERSHIP LINK `[MEMBERSHIP_LINK]` | Parameter | Link a profile membership of the Default Membership Type to a reservation with a different profile, informational only, no points generated |
| MASK MEMBERSHIP NUMBERS `[MASK_MEMBERSHIP_NUMBERS]` | Parameter | Card numbers masked by default. Users with the View Membership Number task see them unmasked |
| MEMBER PROFILE UPDATE RESTRICTION `[MEMBER_PROFILE_UPDATE_RESTRICTION]` | Parameter | Once a member has a reservation, name changes and profile merge are disabled |
| PREFERRED CARD `[MEM_PREF_CARD]` | Parameter | Guest chooses which membership type earns points for the stay |
| MEMBERSHIP RATE RULES `[MEMBERSHIP_RATES]` | Parameter | Link a rate code to a membership type or level |
| AWARD POINTS REDEMPTION `[AWARD_REDEMPTION]` | Function | Redemption of loyalty awards: rate, upgrade, package, payment and other |
| MEMBERSHIP CLAIMS `[MEMBERSHIP_CLAIMS]` | Function | Membership claims, adjustment limits, origins and types |

Oracle repeats the Default Membership Type behaviour for loyalty enrollment in [Enrolling Guests in External Loyalty Programs, 24.3](https://docs.oracle.com/en/industries/hospitality/opera-cloud/24.3/ocsuh/t_managing_profiles_enrolling_guests_in_external_loyalty_programs.htm).

**Field note, observed on a live OPERA Cloud property, not Oracle-documented.** The property's OPERA Controls screen showed three defaults side by side: Default Global Enrollment Code, Default Membership Type and **Default Property Enrollment Code**. A value in Default Property Enrollment Code caused every new profile to be enrolled automatically in the property's own programme, with the membership type pre-filled and locked. Staff could not add a second programme. Clearing it to blank fixed the behaviour. Oracle's 24.3 page names only DEFAULT_ENROLLMENT_CODE, so the "Global" and "Property" fields are read here as its two scopes. That reading is an inference.

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
- A membership nobody enrolled appears on every new profile and the type cannot be changed. Check the three membership defaults in OPERA Controls first, before membership class, sequence, primary flag or card number generation. See the field note above
- A membership sent through OXI is dropped. Check the membership type conversion first. See [oxi-overview.md](oxi-overview.md#membership-conversion)
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
