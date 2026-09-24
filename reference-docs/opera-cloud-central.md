# OPERA Cloud Central — Enterprise Layer Reference
Source: https://www.oracle.com/hospitality/opera-central/ and official datasheet https://www.oracle.com/a/ocom/docs/industries/hospitality/hosp-opera-cloud-central-ds.pdf (Version 1.0, copyright 2025). Adoption figures from Oracle announcement 2025-06-16.
Keywords: OPERA Cloud Central, central reservations, contact center, CRS, central sales, enterprise management, enterprise templates, distribution, loyalty, single-image inventory, above-property, head office, multi-property

## What it is

OPERA Cloud Central is the above-property layer of the OPERA Cloud platform. It centralises data and functionality from OPERA Cloud modules under one unified user interface and one login, built on a central database shared across the estate. It connects head office functions (call centre, regional sales, loyalty, distribution, configuration governance) with property-level execution in OPERA Cloud PMS.

Practice note (own expertise, not Oracle wording): functionally this is the cloud-era successor to the ORS/OCIS central systems space. Implementers who knew ORS single-image inventory and OCIS membership will recognise the concepts, now native to the OPERA Cloud platform rather than separate products.

## Key included modules

### 1. Contact Center
Central reservation workspace designed for call-centre agents.
- Single-image inventory: property data centralised, core operations shared between central system and properties, no property-by-property checking.
- Booking portal with three availability viewing formats: property view, detailed view, and interactive map view. Agents can toggle between selling by room type and selling by rate.
- Advanced filters: hotels by region, proximity to attractions or transport.
- Property Brochure: per-hotel detail (restaurant hours, check-in times, services, transport links) so agents answer immediately.
- Complex reservation support handled centrally: routing instructions, shared reservations, loyalty point redemption, negotiated rates, discounts, advance deposit requirements, cancellation rules, amendments, special requests, payments, multi-leg bookings.
- Rate and room availability in full parity with hotel operations. Dynamic rate controls by occupancy, minimum stay, arrival date. When a restriction blocks a rate, agents see the reason visually plus suggested alternatives (adjust stay length or arrival date).
- Upsell support: packages in rate, ancillaries with pricing, availability and images on one screen.
- Guest recognition: drill into profiles, preferences and previous stays during the reservation flow.

### 2. Central Sales
Above-property sales hub, native to OPERA Cloud.
- Centralised management of sales accounts, contacts and revenue performance across the estate.
- Lead management: route qualified leads to all or selected properties based on attributes (location, function space, hotel features). Automated lead notification to the property lead catcher via activity and email.
- For properties on OPERA Cloud Sales and Event Management, structured opportunities carry requested dates, meeting space and resources, event type, attendee count, budget.
- Access to property availability, Functions Diary and Group Rooms Control for designated properties.
- Sales targets set and monitored across the portfolio, individual and team. Customisable dashboards, central activity and appointment tracking.
- Browser-based, desktop and mobile.

### 3. Enterprise Management
Central configuration governance.
- Enterprise templates: single source of truth for core configurations inherited estate-wide, e.g. VIP codes, geographical data, Market and Source codes for centralised reporting.
- Custom templates per brand or region: room types, transaction codes, rate codes, packages, with an inheritance model for updates.
- Structured approval workflow for adding or modifying configuration.
- Ownership designation at Enterprise or Property level with granular permission to override enterprise configuration at the property.
- Instant distribution of configuration updates across properties. CSV import for bulk setup.
- Stated benefits: fast property onboarding, brand compliance, simplified training, quicker resolution of configuration issues.

## Add-on modules (for OPERA Cloud Central and PMS customers)

### OPERA Cloud Loyalty
- Single central guest database for all hotels with native loyalty management.
- Dynamic point and tier management, membership claims, configurable point calculation rules targeting booking channels, rates and date ranges (higher points for direct bookings).
- Points spendable on rooms, hotel bills, upgrades, packages, experiences.
- Segmentation on stored behaviour (e.g. guests who spent over a threshold on F&B or used leisure facilities) feeding marketing campaigns.

### OPERA Cloud Distribution
- All channels managed in one environment: OTAs, GDS (Amadeus, Sabre, Travelport), booking engines.
- Direct-to-source connectivity, removing intermediaries. Real-time rates, restrictions and inventory parity across channels.
- Sellable availability and overbooking protection. Self-service channel activation and mapping. Online partner marketplace.
- Paired with Central: cross-property configuration, copy channel settings across properties.
- Billing options: per net bookings or per room count. Oracle also offers rate loading and GDS content management services, no onboarding cost claimed, 99.7 percent customer satisfaction claimed.
- Practice note (own expertise): direct-connect distribution repositions third-party channel managers (SiteMinder, SynXis, Profitroom). Expect migration conversations where the hotel weighs OPERA Cloud Distribution against the incumbent channel manager contract.

## Platform layer

- Reporting and Analytics: 300+ built-in reports, custom dashboards and visualisations across departments, properties and portfolios.
- OHIP: all integration via the Oracle Hospitality Integration Platform REST APIs, self-service build, test, deploy, plus Oracle Cloud Marketplace partners.
- Related products on the platform: OPERA Cloud PMS, Sales and Event Management, Guest Engagement and Merchandising, Loyalty, MICROS Simphony.

## Adoption

Oracle announcement 2025-06-16: 20 new hotel chains added OPERA Cloud Central in the past fiscal year, 3,500 properties on it. Accor selected OPERA Cloud for global PMS 2025-09-04. The product is shipping and scaling now, not a future roadmap item.

## What this means for an implementer (own expertise)

1. Configuration discipline inverts. Today property config is built property by property. With Enterprise Management, chains will build enterprise and brand templates first, properties inherit. Implementation projects start at head office, not at the front desk.
2. The PIW conversation changes. Centralised Market and Source codes and template inheritance mean the property information worksheet must align to the enterprise template before go-live, not after.
3. ORS and OCIS skills become current again. Single-image inventory, central availability, membership configuration: the concepts transfer directly.
4. Channel manager migrations gain a new option. Every SiteMinder or SynXis conversation now includes OPERA Cloud Distribution direct connect as the Oracle-native alternative.
5. OHIP remains the integration front door. Central does not change the API strategy, it widens what is reachable behind it.
6. Loyalty migrations are a service line. Hotels moving from external loyalty tools or legacy OCIS onto OPERA Cloud Loyalty need exactly the rate, package and membership configuration expertise already in this corpus.

Links: [[10-OPERA-Cortex]] [[OPERA Cloud]] [[OHIP]] [[Channel Managers]]
