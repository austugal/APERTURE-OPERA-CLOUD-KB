# Getting onto OHIP: the blockers that come before any configuration

Every factual claim below is sourced to a page of the Oracle Hospitality Integration Platform User
Guide fetched from docs.oracle.com on 2026-10-17. Inference is labelled where it appears.

The pages carry `Test Release` and no version number. Publisher months run from July to October
2026. Re-check them before relying on this document for a dated commitment.

**Sources**

- Getting Started. https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/c_gs.htm
- Getting Started for Partners. https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/t_getting_started_for_partners.htm
- Getting Started for Hoteliers (OCIM). https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/t_getting_started_for_hoteliers_ocim.htm
- Quick Start for Hoteliers (in UAT Environment). https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/t_quick_start_for_hoteliers_uat_ocim.htm
- Assigning Roles to Users (OCIM). https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/t_assigning_roles_to_users_ocim.htm
- Signing In to the Developer Portal (OCIM). https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/t_signing_in_to_the_developer_portal_ocim.htm
- Quick Start for Partners (Using the Partner Sandbox). https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/t_quick_start_for_partners_using_the_partner_sandbox.htm
- Digital Learning Access, for Customers, for Partners. https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/c_digital_learning_access.htm · https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/c_digital_learning_access_for_customers.htm · https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/c_digital_learning_access_for_partners.htm
- Ask Oracle. https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/ask_oracle_partner.htm
- Global Administration. https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/global_admin_partner.htm
- Oracle Hospitality Open Forum. https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/c_oracle_hospitality_open_forum.htm

---

## The pattern

*Inference.* Every early OHIP blocker is commercial, hosting or identity, not configuration. A
legacy SKU, a legacy data centre, an unactioned activation email, a property-level user or the
wrong sandbox hotel each stop an integration before a single setting matters. Check them in that
order before opening a case about the portal or an API.

## 1. Can this hotel use OHIP at all

Oracle lists three prerequisites:

> The hotel must purchase an OPERA Cloud Foundation SKU.
>
> OHIP is not available for hotels using a legacy OPERA Cloud SKU.

The chain must be onboarded with OHIP, and the chain and properties "must be on Oracle Cloud
Infrastructure (OCI) and NOT in a legacy data center."

Foundation "includes access to the Oracle Hospitality Integration Platform". On provisioning or
migration the customer receives an email with the Developer Portal URL:

- Production: `https://<ohip-domain>/<enterpriseID>prd/ui`
- Non-production: `https://<ohip-domain>/<enterpriseID>uat/ui`

*Inference.* None of the three can be fixed in the portal. Put SKU and hosting on the kick-off
checklist for any integration-dependent rollout, before a partner is given a date. A lost welcome
email is not a blocker, because the URL is derived from the enterpriseID.

## 2. Partner onboarding ends in an email, not at checkout

Two routes: the Oracle Store (Shop now, Add to Cart, checkout, Place Order, with an Oracle account
first), or the partner registration Cost Price Quote (CPQ) form, requested from
hospitality-integrations_ww@oracle.com when the Store is not an option. A card payer can move to a
PO later through Oracle Billing Support.

> All OHIP Partner subscriptions follow the OCI Cloud Account Activation process. This process
> replaces all previous Hospitality-specific activation workflows.

On booking, or at the subscription start date if later, the partner receives **Action Required:
Welcome to New Oracle Cloud Service Subscription(s)**, which creates a new OCI Cloud Account or adds
the subscription to an existing one.

> Provisioning cannot begin until this activation step is completed.

After activation, depending on the services bought: My Oracle Support Welcome, Hospitality Support
Welcome (ICCP services), Digital Learning Welcome, Subscription Activation. On completion: Service
Welcome Letter and Subscription Complete Notice.

*Inference.* "We paid and have nothing" is almost always an unactioned activation email at whoever
was named on the order. Ask for that subject line first.

## 3. Who can get into the Developer Portal

| Capability | OHIPADMIN | OHIPDEVELOPER | OHIPANALYTICS | OHIPENVIRONMENTS | OHIPVIEW | DEVELOPERPORTALACCESS |
| --- | --- | --- | --- | --- | --- | --- |
| API Documentation | View | View | No Access | No Access | View | View |
| Applications | View-Add-Edit-Delete | View-Add-Edit-Delete | No Access | View | View | View-Add-Edit-Delete |
| Application Key | View-Reissue-Copy | View-Reissue-Copy | No Access | No Access | No Access | View-Reissue-Copy |
| Environment | View-Add-Remove | View | No Access | View-Add-Remove | View | View-Add-Remove |
| API Analytics | View | View | View | No Access | View | View |
| Client Secret | Read-Issue | Read | No Access | Read-Issue | No Access | Issue (view only at reissue) |
| Approve Partner Connections | Yes | No Access | No Access | Yes | No Access | Yes |
| Approve Streaming Applications | Yes | No Access | No Access | Yes | No Access | Yes |

DEVELOPERPORTALACCESS "will be deprecated in future". Non-federated customers assign membership in
OPERA Cloud Identity Management. Federated customers create chain-level custom groups in their own
identity provider, `<Chain Code>-OHIPADMIN` and so on.

> Users must be chain-level users to be granted DEVELOPERPORTALACCESS, OHIPADMIN, OHIPDEVELOPER,
> OHIPANALYTICS, OHIPENVIRONMENTS, and OHIPVIEW group membership and to successfully access the
> Developer Portal.
>
> Developer Portal users do not have the ability to call APIs.

Three wrong passwords lock the account. A user with several chains or environments picks at sign-in
and can set a default.

*Inference.* The hotelier Quick Start still says to assign DEVELOPERPORTALACCESS, the role being
retired. On a new estate assign the split roles. OHIPENVIRONMENTS approves partner connections and
streaming applications, so treat it as an approver role. For who approves what, see
[ohip-connection-approval-ownership.md](ohip-connection-approval-ownership.md).

## 4. The first call from a hotel

1. Give the portal role to the users who need it. Sign-in is SSO with OPERA Cloud.
2. Environment tab, open the environment card, copy **enterpriseID, scope, client ID, secret**.
3. Applications tab, register an application and subscribe it to all the APIs shown.
4. Enter the hotel ID to read from:

   > This is not the same ID as the chain admin and should be the ID of a specific hotel.

5. Postman: clone https://github.com/oracle/hospitality-api-docs and import from
   `postman-collections`, or fork the public Oracle Hospitality APIs Postman workspace. One
   environment each for UAT and PROD: HostName (gateway from the welcome email), CLIENT_ID,
   CLIENT_SECRET, AppKey, EnterpriseID, Scope, HotelId.
6. Run **Get OAuth Token**. A correct set-up returns HTTP 200 with the token.

Early adopter (v0) Distribution APIs need a request to hospitality-integrations_ww@oracle.com and
acceptance of the programme terms by reply.

*Inference.* Token returned but data call failing is the chain-versus-hotel ID mix-up Oracle warns
about. No token at all points at the portal values or the gateway host. The Oracle page describes
CLIENT_SECRET as "Client ID previously obtained", a copy error: it is the client secret.

## 5. The partner sandbox has two hotels

Onboard, add users, sign in and register an application, create an integration user (**SSD only,
not required for OCIM**), take credentials and gateway from the Environments page, call the APIs.

> The hotelId is SAND01 for the SSD Sandbox, and OHIPSB02 for the OCIM Sandbox.

Extra consulting is sold in blocks of 2 hours on the Oracle Store.

*Inference.* Until 2026-10-17 this repository named `SAND01` as the only sandbox hotel. A partner on
the Client Credentials scheme pointed at `SAND01` is testing the wrong sandbox, and the integration
user step does not exist for them. Ask which scheme before reading any sandbox error.

## 6. Training

Two Digital Learning paths: **OHIP Learning Path** for OPERA Cloud Foundation customers, and **OHIP
for Integrators** for Integration Cloud Service partners. The activation email goes to the **End User
Contact on the order**. Partners on B92141 Oracle Hospitality Integration Cloud Service receive it
once the order is received if they onboarded from 27 March 2023.

No email, or existing customer or partner without access: write to operaenablement_ww@oracle.com
with the customer or company name as on the order or account, address with country, primary contact
name and email, and for partners the approximate purchase date. Allow five business days.

*Inference.* The End User Contact is often procurement or IT. Fix it on the order, or budget the
five days into the training plan.

## 7. Ask Oracle and Global Administration

Ask Oracle is an AI assistant in the Developer Portal answering from OHIP documentation, in several
languages, with documentation links. Oracle states its responses "may not always be accurate,
complete, or up to date". It appears only when AI functionality is enabled, and only OHIPADMIN can
open **Global Administration**, Feature Controls, and switch it on or off.

*Inference.* "We cannot see Ask Oracle" is a toggle, not a licence. It is separate from the Ask
Oracle chat in OPERA Cloud 26.4.

## 8. Where partners talk to each other

Oracle Hospitality Open Forum is a Slack community, now "solely focused on partner-to-partner
collaboration", with an Oracle-managed announcements channel and a moderated open forum. Access is
granted automatically during onboarding, allow a few days. Dedicated help is billable: Premier
services from the Oracle shop, or a Systems Integrator listed in Oracle Cloud Marketplace.

*Inference.* The forum is not a support queue. A partner waiting there for an Oracle answer is in the
wrong place.
