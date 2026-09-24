# Sales and Event Management (OSEM) Overview

OPERA Cloud Sales and Event Management is the module covering catering, event sales, function space management, banquet event orders (BEO) and group sales workflow. It is a separately licensed module that integrates with OPERA Cloud PMS.

This document covers the OSEM scope, core entities and integration with PMS.

---

## Reference documents

- Oracle Hospitality OPERA Cloud Sales and Event Management User Guide (My Oracle Support)
- Oracle Hospitality OPERA Cloud Property User Guide
- OHIP API specifications for Sales and Event Management

---

## Scope

OSEM covers.

- Sales account and contact management (linked to PMS profiles)
- Lead management and opportunity tracking
- Block management for group rooms
- Function space inventory and booking
- Event setup, agenda and timing
- Catering and beverage menu engineering
- BEO generation and distribution
- Resource allocation (rooms, AV, staffing)
- Diary and group calendar views
- Forecasting for catering revenue

---

## Core entities

### Sales Account

A company or organisation that books business with the property. Linked to a PMS profile of type Company.

### Sales Contact

An individual within a sales account. Multiple contacts per account.

### Lead

An early-stage enquiry that has not yet committed to business. Tracked through stages to either Confirmed or Lost.

### Opportunity

A more developed pipeline record with estimated room nights, catering revenue and probability.

### Block

A confirmed group reservation container. Allocates rooms from the PMS inventory pool. Linked to room types, rate code and reservations of individual attendees.

### Event

A specific calendar item with function space, time, attendees, catering and resources.

### Catering Package

A predefined combination of menu items, beverages, AV and staffing applied to events for consistency.

### Function Space

A bookable physical space (meeting room, ballroom, restaurant for buyout). Has capacity, layout options and rates.

---

## Workflow

### Lead to opportunity to block

1. New lead captured (incoming RFP, walk-in enquiry, sales call)
2. Lead qualified by sales team
3. Lead converted to opportunity with detailed requirements
4. Opportunity converted to block when confirmed
5. Rooming list collected and individual reservations created
6. Events scheduled within the block

### BEO generation and distribution

1. Event details finalised (menu, AV, room setup)
2. BEO generated (typically a customised PDF via BI Publisher)
3. BEO distributed to operations team (banquet, kitchen, AV, front desk)
4. Pre-event briefing using the BEO as the source document
5. Event executed, charges posted to PMS via room or master folio
6. Post-event review and revenue recognition

---

## Integration with PMS

OSEM and PMS share key entities.

- Profiles (Sales Account = Company Profile in PMS)
- Reservations (Block reservations appear in both modules)
- Master folio (Group master folio in PMS receives catering and event charges)
- Inventory (PMS rooms allocated to blocks)

Configuration is at Administration > Sales > [areas] for OSEM-specific items, and at Administration > Enterprise and Administration > Financial for shared items.

---

## OPERA Controls relevant to OSEM

OSEM-specific controls become visible when the module is licensed. Areas include.

- Sales (lead status, opportunity stages, sales team configuration)
- Event Management (event types, function space, catering menus)
- Block (block status workflow, cut-off, rooming list)
- Catering (menu engineering, beverage controls, package definitions)

---

## OHIP APIs for OSEM

The Sales and Event Management subject area is exposed in OHIP. Relevant subject area JSON files in the hospitality-api-docs repository.

- Block management
- Event management
- Sales accounts
- Activities (linked to events)

Useful for integrations with external CRM, sales platforms or event management tools.

---

## Common use cases

- Wedding bookings with multiple events across a weekend
- Corporate meeting series with recurring blocks
- Conference room sharing across multiple events
- Catering for non-resident events (Christmas parties, gala dinners)
- Group rate negotiations with multi-property attribution
- Sales account analytics for chain-level account managers

---

## Common issues

- Block cut-off not enforced because rate code restrictions misconfigured
- Function space double-booked due to manual entry bypassing inventory check
- BEO distribution missing recipients because role permissions not granted
- Catering revenue not flowing to back office because export mapping incomplete
- Group master folio not closed at month-end due to outstanding event balance

---

*Derived from Oracle Hospitality OPERA Cloud Sales and Event Management User Guide. Not affiliated with Oracle Corporation. Licensed CC BY-NC-SA 4.0.*
