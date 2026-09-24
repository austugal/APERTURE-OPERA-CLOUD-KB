# EMEA Country Fiscal Watch

Country-by-country OPERA Cloud fiscal changes that change how a property is configured, migrated or upgraded. Verified against Oracle release readiness guides, September 2026. Oracle's country Fiscal Reference Guides sit on My Oracle Support behind a login: read the release-specific guide before configuring.

## Portugal and Spain

See the dedicated references: [Portugal fiscal master](opera-doc.html?file=portugal-fiscal-master.md), [Portugal deposits and city tax](opera-doc.html?file=advance-deposit-city-tax-fiscal.md), [Spain SII](opera-doc.html?file=spain-fiscal-sii.md).

Portugal in 26.x (documented): 26.1 blocks negative rate amounts on package split. 26.3 updates auto credit bill for deposit on check-in and stops displaying the Debit Folio parameter.

## France

See [France fiscal reference](opera-doc.html?file=france-fiscal.md). 26.2 adds fiscal communication for negative AR payments. 26.1 and 26.3 carry multiple France updates. National e-invoicing starts 1 September 2026.

## Poland

- **25.5**: Associated Pre-Payment Invoice control. Activated automatically on upgrade for existing Polish properties, but must be activated manually on properties provisioned after 25.5. Two properties built to the same standard can behave differently.
- **25.5**: KSeF support through Reservation Addressee, now a generic control, and `<AdditionalAddresseeInfo>` in the Universal Payload. The `PL_JPK_FA` export must be deleted and recreated from template to pick up the `EXCL_CREDIT_RACHUNEK` mapping. Folio RTF templates do not update themselves.
- **26.1**: KSeF updates, including a Long Account Name field on Company, Travel Agent and Source profiles that is live for all tenants.
- **26.3**: Debit Note control added. Restrictions on Customer Faktura VAT updates. Correction workflow and training change.

## Germany

- **26.3**: ESTATISTIK added to the Fiscal Partner list on Manage Fiscal Partner. Whether it covers the full hotel statistics obligation is not stated. Check the country guide before telling a client it is covered.

## Italy

- **26.3**: export templates updated. Nationality statistics reports available in R+A.

## Croatia and Slovenia

- **25.5**: `CR_TOURIST_EXPORT`, `CR_POLICE_EXPORT` and `SL_POLICE_EXPORT` removed from New from Template. Configured exports keep running. On a new or rebuilt property there is no template. Export the existing definition before touching the property.

## Greece

- Two 26.1 features exclude Portugal and Greece outright. Check exclusions in the feature text, not only the Country Specific section.

## North and West Africa

- **26.2**: cash surcharge and stamp tax with a transaction code for Algeria, Morocco, Senegal and Ivory Coast.

## Cross-country changes that affect every fiscalised property

- **25.5**: fiscal external system renamed from FLIP to OFISCLOUD when Fiscal Cloud Integration is enabled. Historical events stay labelled FLIP, new events are OFISCLOUD. Update monitoring filters and runbooks that search for `FLIP_`.
- **25.5**: OAuth for GENERIC JSON fiscal partners.
- **26.1**: fiscal folios at Auto Check Out and zero balance Quick Check Out. A fiscalised property below 26.1 using either has been departing guests without the required document.
- **26.3**: Simplified Settlement Workflow works with Fiscal Folio Printing. Between 25.5 and 26.3 a fiscalised property had to choose.

## How to read Oracle's release notes for a country

The Country Specific section is not a complete country index. Country behaviour also appears under Cashiering, Property APIs and Integrations, and some features exclude countries in their body text. Search the full feature summary for the country name and for "Country Mode".

Related: [OPERA Cloud 26.x fiscal changes](opera-doc.html?file=opera-cloud-26x-fiscal-changes.md), [Release watch](opera-doc.html?file=release-watch.md)
