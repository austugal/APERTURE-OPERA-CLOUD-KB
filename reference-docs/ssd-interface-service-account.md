# SSD Interface Service Account — Manage and Troubleshooting Guide

Source: Oracle Hospitality Shared Security Domain (SSD) Interface Service Account: Manage and Troubleshooting Guide, SSD 20.1, October 2021. Revision history: May 2020 initial, August 2021 End Date description revised.

## Purpose

Manage Interface Service Accounts in Oracle Identity Self Service. These accounts authenticate third-party interfaces (channel managers, POS, RMS, payment, key systems) to OPERA via web service calls. Without a valid service account, the interface cannot connect.

## Access path

URL: `https://[Hostname]/identity`
Credentials supplied in the Welcome Letter from the OPERA property administrator.

From Home > Manage > Users to reach the User Management screen.

## Create Interface Service Account

Click +Create on the Users screen.

### Request Information
- Effective Date: empty
- Justification: empty

### Basic Information
- Tenant Code: auto-populates when Organization selected
- First Name: name representing the interface service (e.g. SiteMinder, Simphony, IDeaS, FreedomPay)
- Middle Name: empty
- Last Name: property name
- E-Mail: valid contact email, preferably a distribution list so password expiry alerts reach the team. **Never use an @oracle.com domain.**
- Manager: empty
- Organization: prefix with letter I plus property code. Example: IHB4X4
- User Type: Other (from dropdown)

### Account Settings
- User Login: reflects interface type. For backup accounts append `_bkup` suffix to the primary login name.
- Password: must meet policy (below)
- Confirm Password: re-enter
- Multi-Factor Authentication: unchecked

### Password Policy
- 24 to 30 characters
- Must start with an alphabetic character
- Must contain at least 2 alphabetic characters
- At least 1 uppercase
- At least 1 lowercase
- At least 1 numeric
- At least 1 special character
- Must not match or contain First Name, Last Name, or User Login
- Default expiration: 1 year
- Email notification: 30 days before expiry

### Account Effective Dates
- Start Date: defaults to account creation date if empty. **For backup accounts: set 30 days after primary account start date.** This staggers expiry so both accounts never lock out together.
- End Date: when populated, account expires and is deleted on that date. Empty means account persists until manually deleted. Expiration notification fires 30 days before End Date to the email address on the account.

### Provisioning Dates
- Provisioning Date: empty
- De-provisioning Date: empty

### Contact Information, Preferences, Other Attributes
All optional. Keep empty.

### Submit
Notification email sent to the contact address with login URL and credentials.

## Backup account principle

For every primary Interface Service Account, create a backup with:
- Identical attributes
- User Login appended with `_bkup`
- Start Date 30 days after primary

The 30-day stagger is the entire point. If the primary account locks or expires, the backup is already active and can be swapped in immediately. Without the stagger both accounts often share the same renewal failure mode.

## Search User Account

### Quick Search
Select search type from dropdown (User Login, First Name, Last Name, Identity Status, E-mail, Start Date, End Date, Display Name, Account Status, Organization). Enter parameter. Click search icon.

### Advanced Search
Match Type:
- All: results must match all criteria
- Any: results matching any one criterion

Click Search. Click User Login link to open User Details.

## Add WSACCESS Role

Without the WSACCESS role the service account exists but cannot call any OPERA web service. This is the single most common reason interfaces fail after account creation.

Path: User Details > Roles tab > Request Roles.

1. Search keyword: WSACCESS
2. From results, select the WSACCESS role for your organisation, chain, or property code
3. **Do not select roles prefixed with I** (these are tied to the OIM integration organisation, not your property)
4. Add to Cart
5. Next > review cart > Update Grant Duration if needed
6. For permanent interfaces: tick "Grant will be effective immediately upon request completion", then Update
7. For test or temporary interfaces: untick, assign Start Date and End Date matching usage period, Update
8. Submit

## Account Expiration

- Default expiration: 1 year from activation
- Notification: 30 days before expiry, to the email on the account
- Oracle recommendation per security compliance: shorten to 90 days
- If password is not reset before expiry, account becomes permanently disabled. No reactivation. Backup account must take over.

## Lockout Policy

10 failed login attempts locks the account. OPERA property administrator must unlock. The threshold is hard and cannot be configured per Oracle policy.

## Troubleshooting

### Error 401 Unauthorized / OSB-386200 General Web Service Security Error
Cause: invalid credentials, or password changed.
Action: property administrator resets password. **Stop the interface and update the credentials in the interface configuration before restart**, otherwise repeated failed login attempts will lock the account inside the 10-attempt window.

### Error: User is not authorized for the hotel code in the payload
Cause: WSACCESS role not assigned for the property chain referenced in the payload.
Action: review roles assigned to the service account. Add the correct chain WSACCESS role.

## Operational checklist

Per property, document:
- Primary account User Login
- Backup account User Login (with _bkup suffix)
- Email distribution list
- Activation date for primary
- Activation date for backup (primary + 30 days)
- Expiration date for both
- Assigned WSACCESS role exact name
- Interface owner contact
- Vendor contact

Rotate 30 days before expiry. Reset primary password, validate interface still authenticates, then reset backup password.

## Tiago notes

- For multi-property rollouts, the email field should always be a distribution list owned by the property IT or operations team, never a single named person. People leave, distribution lists persist.
- The recommendation to shorten expiry from 1 year to 90 days is good security hygiene but creates four rotation events per year per property. For a 20-property EMEA portfolio that is 80 events per year. Build an n8n workflow that monitors expiry dates and triggers rotation alerts 35 days out. Same workflow can post to Slack and create a Notion task.
- Common failure pattern: vendor takes credentials, embeds them in their config, account expires, vendor blames OPERA, takes a day to diagnose. Document the credential handover process with sign-off. Vendor acknowledges expiry date in writing.
- Channel manager service accounts (SiteMinder, SynXis, Profitroom) almost always need a chain-level WSACCESS, not property-level. Verify the exact role name with the channel manager partner before assignment.
