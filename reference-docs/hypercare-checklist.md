# Hypercare Checklist

Hypercare is the period immediately following go-live where the implementation team remains in stand-by mode with elevated coverage to identify and resolve issues before steady-state support takes over. Standard hypercare duration ranges from 2 to 4 weeks depending on property complexity and incident profile.

This checklist supports both implementation managers and customer success teams.

---

## Reference documents

- Oracle Hospitality OPERA Cloud implementation methodology
- Oracle Hospitality OPERA Cloud Cutover Guide
- Oracle Hospitality OPERA Cloud Property User Guide

---

## Pre-hypercare entry criteria

These conditions must be true before the property is considered "in hypercare." If any condition fails, the property remains in active cutover.

- First check-in completed successfully
- First night audit completed without out-of-balance
- All critical interfaces active and posting (IFC8, OHIP, OPI)
- Channel manager publishing rates and inventory
- RMS receiving data and posting rate recommendations
- Fiscal exports running (SAF-T, Police, INE where applicable)
- Back office export running (SUN, SAP, EBS or equivalent)
- All key user training completed
- Hypercare team identified and on duty

---

## Week 1 daily activities

| Activity | Owner |
|---|---|
| Morning stand-up with property operations | Hypercare Lead |
| Review previous night audit reports | Property + Hypercare |
| Triage open tickets, classify by severity | Hypercare Lead |
| Validate interface health for past 24 hours | Technical Hypercare |
| Validate fiscal export submission for past 24 hours | Functional Hypercare |
| Resolve P1 and P2 tickets same day | Full team |
| Root cause analysis on any P1 incident | Technical Lead |
| End-of-day update to customer stakeholders | Hypercare Lead |
| Update incident register | Hypercare Lead |

---

## Week 2 daily activities

Daily cadence continues but stand-ups shorten and on-site presence reduces in line with ticket decay.

| Activity | Owner |
|---|---|
| Daily stand-up (shorter) | Hypercare Lead |
| Triage open tickets | Hypercare Lead |
| Validate weekly trends in ticket volume | Hypercare Lead |
| Knowledge transfer sessions for property staff | Functional Hypercare |
| Process refinements based on observed issues | Hypercare Lead + Property |

---

## Week 3 and 4 activities

| Activity | Owner |
|---|---|
| Stand-ups become twice-weekly then weekly | Hypercare Lead |
| Sustained ticket decay verified | Hypercare Lead |
| Service transition planning begins | Hypercare Lead + Service Delivery |
| Knowledge handover document prepared | Hypercare Lead |
| Lessons learned register completed | Hypercare Lead |
| Customer sign-off prepared | Hypercare Lead |

---

## Severity classification

| Severity | Definition | Response target |
|---|---|---|
| P1 — Critical | Property unable to operate (check-in blocked, payment failure, fiscal export blocked) | Immediate, all-hands |
| P2 — High | Material operational impact, workaround available | Same business day |
| P3 — Medium | Inconvenience or limited impact | Next business day |
| P4 — Low | Cosmetic, training-related, or nice-to-have | Within hypercare period |

---

## Exit criteria

The property exits hypercare when all of these are true.

- Daily ticket volume below agreed threshold for 3 consecutive days
- Zero open P1 incidents
- All P2 incidents have agreed resolution paths
- All P3 and P4 incidents triaged and registered
- Fiscal exports submitted successfully for full hypercare period
- Night audit completed without out-of-balance for full hypercare period
- All identified configuration adjustments completed
- Knowledge transfer to steady-state support team complete
- Customer sign-off on hypercare exit obtained

---

## Common hypercare issues

- Folio printing layout drift caused by RTF template post-go-live edit
- Fiscal export rejected due to incomplete profile data (NIF missing on corporate accounts)
- Channel manager rate push failures during high-traffic days
- IDeaS RMS recommendations stalled due to expired integration credentials
- OPI tokenisation errors on legacy reservations imported pre-go-live
- IFC8 reconnect failures after network changes
- Night audit blockers from open cashier shifts

Each requires fast triage, a workaround for the property to continue operating, and a definitive fix tracked to closure.

---

## Documentation produced

- Hypercare incident register (CSV or ticketing tool export)
- Lessons learned document
- Configuration adjustment log
- Knowledge transfer document for steady-state support
- Hypercare exit sign-off

---

*Derived from Oracle Hospitality OPERA Cloud implementation methodology. Not affiliated with Oracle Corporation. Licensed CC BY-NC-SA 4.0.*
