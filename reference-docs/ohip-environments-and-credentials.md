# OHIP environments and credentials: every credential event is an outage for someone

Every factual claim below is sourced to a page of the Oracle Hospitality Integration Platform User
Guide, chapter 6, Environments (Gateways and Credentials) with Client Credentials Authentication
Scheme (OCIM), fetched from docs.oracle.com on 2026-10-17. Inference is labelled where it appears.
The pages carry `Test Release` and no version number, publisher months July to October 2026.

**Sources**

- Environments (OCIM). https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/t_environments_gateways_and_credentials.htm
- Viewing Partner Sandbox Details. https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/t_viewing_partner_sandbox_details.htm
- Adding an Environment. https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/t_adding_an_environment.htm
- Issuing the Client Secret. https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/t_issuing_the_client_secret_ocim.htm
- Viewing Environment Details. https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/t_viewing_environment_details.htm
- Changing Your Client Secret. https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/t_changing_your_client_secret.htm
- Removing an Environment. https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/t_removing_an_environment.htm
- Managing Partner Connections. https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/t_managing_partner_connections_ocim.htm
- Managing Client Applications. https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/t_managing_client_applications_customers_only_ocim.htm

---

## The pattern

*Inference.* Issuing a secret, reissuing a client ID, removing an environment and switching on IP
Allow Listing each stop a live integration unless every consumer is lined up first. Treat all four
as change-window events.

## What an environment is

> One environment refers to one chain in a single OPERA environment and corresponds to one clientId.

Partners and customers see clientId, clientSecret, EnterpriseID, Scope and gateway URL on the
Environments page.

## Who can add one

> Only partners and customers with OPERA Cloud Central can add an environment. Customers can by
> default view their environments.

The hotel must be on OPERA Cloud Foundation. The customer finds its Enterprise ID under
Environments, View Details, and **Copy Environment Details** copies Enterprise ID, Chain Code,
Region and Environment Type in one block to send to the partner.

Partner steps: Environments, Add Environment, Enterprise ID and Chain Code (both uppercase), Region,
Non Production or Production, then modules, functional areas and Sensitive Data Access if Module
Level Access Control is on. The request sits at `Pending Approval` until the customer approves it.
For a chain with several gateways the request goes to all of them. A separate option adds an
environment for **OHIP Analytics API** credentials.

On an add error, raise the case with the exact error message and error code. Re-adding a removed
environment needs the same Enterprise ID and chain code used before.

*Inference.* A partner should ask the hotel for Enterprise ID and chain code, not for a client ID. A
property-level customer cannot add a partner, only approve one. Approval ownership is covered in
[ohip-connection-approval-ownership.md](ohip-connection-approval-ownership.md). After approval Oracle
says to "wait 5 minutes before calling the environment".

## The client secret is visible once

> you can only view the client secret by issuing it

A lost secret means issuing a new one and updating all integrations. The confirmation dialog names
the environments affected. If no credentials appear, **Create Client Credentials** makes them.

## Client ID format and reissue

From OHIP Portal 25.3.1 new client IDs are human-readable rather than GUIDs, so audit logs show who
made a change, and the clientName equals the clientId.

- Partners: `<cloudAccountName><chain><environment>-<enterprise>-Client`
- Customers: `<chain><environment><enterprise>Client` or `<chain><environment><enterprise><clientName>`

A legacy GUID client can be moved to the new format by reissuing the ClientId. That also generates a
new secret, and "the previous ClientId and Client Secret no longer work for that environment."

The Client ID length limit (100 characters on OHIP 25.5.0 with OPERA Cloud 25.4.0.0 or later, 50
below that) is on the Managing Client Applications page.

*Inference.* The audit gain is real. On a live estate the reissue is an outage, so it belongs in a
change window with every consumer ready to paste the new values.

## Customers can split clients, partners cannot

> Partners will continue to have a single client application for a given customer environment.

OCIM customers can create several clients, each with its own name (unique across the enterprise),
modules, functional areas, Sensitive Data Access and properties. A default client exists and can
serve everything. Clone copies the configuration and regenerates ID and secret. Delete removes the
configuration and every integration on it must move to another client. Sensitive Data Access covers
items such as identity document IDs and dates of birth, never card numbers.

*Inference.* One client per in-house consumer turns a secret rotation into a single-consumer event.

## IP Allow Listing

The customer can configure IP ranges and enable or disable restriction of partner calls by IP.
Every partner on the environment must provide its ranges.

> If IP is not listed and functionality is enabled, the Partners calls will be declined with a 403
> response.

*Inference.* Clean authentication followed by 403 on every call after a customer security change is
this, before it is module access. Collect partner egress ranges at onboarding.

## Removing an environment

Only partners can remove one. Removal stops any streaming events subscribed. Re-adding is subject to
the customer's approval again.

## The shared partner sandbox

> These sandbox environments are shared across multiple partners and developers and can experience
> cross-tenant activity, such as profile creation, reservation updates, or charge postings.

With Business Events on, that activity produces events for your application. Oracle recommends
unsubscribing after testing. Sandbox hotel IDs are in [ohip-getting-started.md](ohip-getting-started.md).

*Inference.* Filter sandbox assertions to records you created, and do not size queues or monitors on
sandbox event volume.
