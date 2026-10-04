# Who approves an OHIP connection, and what they are actually approving

Every factual claim below is sourced to a page fetched from docs.oracle.com on 2026-09-08 and quoted
verbatim. Inference and field observation are labelled where they appear.

**Sources**

- Oracle Hospitality Integration Platform User Guide, *Managing Partner Connections*, G57460-06,
  published August 2026.
  https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/t_managing_partner_connections_ocim.htm
- Same guide, *Managing Affiliated Connections*, G57460-05, published July 2026.
  https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/c_managing_affiliated_connections.htm

Guide index fetched 2026-09-08 and confirmed verbatim: *Oracle Hospitality Integration Platform
User Guide, Release 26.2, G57460-06, August 2026.*
https://docs.oracle.com/en/industries/hospitality/integration-platform/ohipu/index.html

---

## The assumption worth dropping

OHIP is Oracle-managed, so the natural assumption is that Oracle approves integrations. For partner
*enrolment* that is true. For the connection between a specific partner and a specific customer
environment it is not, and the difference decides where a stalled integration gets escalated.

Oracle, on partner connections for environments on the Client Credentials scheme (OCIM):

> For customer environments supporting a Client Credentials authentication scheme (OCIM), the
> partner connection requests take place in the OHIP (Partner) Developer Portal and approvals take
> place within the OHIP (Customer) developer portal.

The affiliated-connection flow, where the requester is an OPERA Cloud Central customer rather than a
partner, has the same shape. Request on one side, approval on the other, both inside the portal.

The approver is the customer's chain administrator, working in `Developer Portal > Environments >
Partner Connections` or `> Affiliated Connections`. They also hold **Edit** to change which hotels
the connection reaches, and **Revoke Access**, which sets the connection to Rejected in both portals
and emails the partner.

**Practical consequence.** A connection request that has been pending for a week is, far more often
than not, an unread email at the chain administrator. From the partner's side that is
indistinguishable from an Oracle queue. Check the customer portal before opening a service request,
or the week is lost twice.

One quotable timing detail for partners who test immediately after approval:

> After receiving the approval email, wait 5 minutes before calling the environment.

## What the approver is being asked to grant

Where Module Level Access Control is enabled, a connection request is no longer a yes-or-no on a
partner. It is a scope proposal.

> When Module Level Access Control is enabled for an environment, partner environment access
> requests may include requested OPERA modules, functional areas, and Sensitive Data Access.

> Before approving the partner connection request, customer administrators should review the
> requested modules and functional areas to confirm that the partner requires the requested access
> for the intended integration.

Oracle is explicit about the sensitive category and about where the obligation lands:

> If the partner requests Sensitive Data Access, customer administrators should carefully review
> the request before approving it. Sensitive data, such as identity document IDs and dates of
> birth, may require special handling under applicable global privacy and data protection
> regulations. Customers may wish to seek assurances from the partner that sensitive data will be
> handled appropriately and in accordance with applicable privacy and data protection
> requirements.

**The following is my reading, not Oracle's, and not legal advice.** Oracle says review the request
and consider seeking assurances. It does not say what follows below.

Identity document IDs and dates of birth are the fields a European property already holds under
GDPR and, in several jurisdictions, under police-registration or fiscal rules carrying their own
retention requirements. So an approval click in a developer portal looks to me like the moment a
hotel group extends its data processing arrangements to a third party, and on most estates that
click is made by someone technical who has never seen the DPA.

If that reading is right, the practical consequence is to treat OHIP approvals as a governance step
with a named owner rather than an IT action, and to capture the requested modules, functional areas
and Sensitive Data Access flag in the integration record, because nothing else in the estate stores
them. Whether the approval carries any specific legal weight under GDPR is a question for a data
protection lawyer, not for me.

## The failure signature nobody attributes correctly

> If a partner later changes the requested Module Level Access Control permissions, including
> module access, functional-area access, or Sensitive Data Access, the customer must review and
> approve the updated request before the changed permissions are granted.

A partner shipping a feature that reads a module it did not previously read raises a new approval.
Until it is approved, the changed permissions are not granted. The partner sees a feature that does
not work at that property. The property sees nothing at all. There is no OPERA error and no Oracle
involvement.

**Field observation, not documented.** The symptom this produces is a partner integration that has
run for a year losing one function, at some properties and not others, immediately after a partner
release. Oracle documents the re-approval requirement quoted above. It does not describe that
symptom, and the connection between the two is mine. Before troubleshooting anything, look for a
pending request in `Environments > Partner Connections`.

Where a group runs many properties on one enterprise, approval also selects which hotels the
connection reaches, and that list is editable afterwards. A partner working at eight of ten
properties is usually an assignment list, not a fault.

## Suspension, for completeness

Oracle Cloud Services can suspend a partner. When it does, the customer portal shows `SUSPENDED` in
both the streaming and OCIM approvals sections and the partner cannot call APIs or consume Business
Events. Oracle's instruction to the customer in that case is to contact the partner, not Oracle.

---

*Prepared from Oracle documentation fetched 2026-09-08. Verify against the current release before
relying on any menu path.*
