# France Fiscal Reference for OPERA Cloud

Scope: what an OPERA Cloud implementation in France has to get right on VAT, fiscal documents, city tax and the 2026 legal changes. Verified 23 September 2026.

Tier legend. **Documented**: Oracle or French administration source, linked. **Field**: observed on live French implementations. **Inference**: labelled.

## 1. Legal changes in 2026

**E-invoicing (documented).** From 1 September 2026 every VAT-registered company established in France must be able to receive electronic invoices. Large and mid-sized companies must also issue them from that date. SMEs and micro-companies must issue from 1 September 2027. E-reporting of transaction data follows the same calendar. Invoices pass through state-approved platforms. Source: [service-public.gouv.fr, updated 27 February 2026](https://entreprendre.service-public.gouv.fr/actualites/A15683?lang=en).

Implication for hotels (inference): B2C guest folios are covered by e-reporting, not e-invoicing. Company-billed stays, AR invoices to corporates and group billing are B2B and fall under e-invoicing. Scope the AR and group billing flow with the property's approved platform provider early.

**Cash register software (documented).** The 2025 Finance Law removed publisher self-attestation and required NF525 or LNE certification. The 2026 Finance Law (Loi n° 2026-103 of 19 February 2026, article 125) restored the publisher's individual attestation as an alternative. Either a certificate or a compliant attestation (template BOI-LETTRE-000242) is accepted. The fine without one is €7,500 per software application under CGI article 1770 duodecies. Source: [summary of the 2026 change](https://shopcaisse.com/blog/attestation-logiciel-caisse-retablie-2026). Verify against Légifrance before advising a client.

Practice rule: request the current attestation or certificate for OPERA Cloud and for every POS and spa system that records cash takings. Keep it in the project file.

## 2. OPERA Cloud releases touching France (documented)

- **26.1**: Country Specific, France, multiple updates.
- **26.2**: fiscal communication for **negative** AR payments.
- **26.3**: Country Specific, France, multiple updates.

Sources: the [26.1](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.1/oprnc/c_feature_summary.htm), [26.2](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.2/oprnc/c_feature_summary.htm) and [26.3](https://docs.oracle.com/en/industries/hospitality/opera-cloud/26.3/oprnc/c_feature_summary.htm) feature summaries. The detail sits in the France *Fiscal Reference Guide* on My Oracle Support, which needs a login. Read the release-specific guide before configuring.

## 3. VAT on hotel transactions

Documented rates: 20% standard, 10% for accommodation and most food service, 5.5% and 2.1% for specific supplies. Confirm the current rate table on [impots.gouv.fr](https://www.impots.gouv.fr/) before building generates.

Field:
- Accommodation is a supply of services. Transaction codes for rooms carry the Services flag, not Goods. The flag does not decide whether VAT applies. The rate does.
- Split packages with a mixed rate (room at 10%, some inclusions at 20%) into separate package elements with their own transaction codes and generates. One code per rate.
- City tax is not VAT and not accommodation revenue. It must sit on its own transaction code outside the VAT generates.

## 4. Fiscal documents

| French term | Meaning | OPERA Cloud equivalent |
|---|---|---|
| Facture | Invoice | Folio issued at settlement |
| Avoir | Credit note correcting or cancelling an issued invoice | Credit bill |
| Acompte | Advance payment or deposit | Deposit with deposit folio or invoice |

Field: corrections are where French audits bite. Never re-issue or edit a closed invoice. Correct with an avoir and a new facture. The 26.2 negative AR payment change targets this correction case.

## 5. Taxe de séjour (city tax)

Documented: the rate depends on the municipality and the property classification. It is not a national figure and is not stored in the Oracle fiscal guide.

Oracle's France guide shows an example build using a formula of the form `CITY_TAX_FRANCE_TDS(...)` inside a package, posting under its own generate bucket.

Field: the formula is an example, not a mandatory method. A property can post a fixed nightly amount per adult through package pricing and still produce correct fiscal output. Decide by testing: post, settle, run the fiscal export and check that city tax appears outside VAT. If both methods give the same fiscal result, keep the simpler one.

Checklist:
1. Confirm the municipal rate and the classification band with the property.
2. Confirm exemptions: minors, seasonal workers, emergency accommodation.
3. One transaction code, VAT exempt, outside revenue.
4. Package posting per adult per night, or formula, not both.
5. Test folio, credit bill and fiscal export before go-live.

## 6. Project questions to ask in week one

1. Which approved e-invoicing platform does the owning company use, and does it take AR invoices from OPERA Cloud?
2. Which fiscal partner handles OPERA Cloud fiscal communication for this property?
3. Is AR in scope of fiscal communication for this property after 26.2?
4. Do POS, spa and retail systems hold a current NF525 certificate or attestation?
5. What city tax rate, band and exemptions apply this year?

Back to [Release watch](opera-doc.html?file=release-watch.md)
