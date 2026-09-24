# Monthly Financial Close Checklist

End-of-month procedures for OPERA Cloud properties. Covers AR reconciliation, statistics validation, fiscal export submission and back office reconciliation. Designed for Director of Finance and Night Audit teams to run in tandem on the last business day of each month and the first business day of the new month.

---

## Reference documents

- Oracle Hospitality OPERA Cloud Cashiering User Guide
- Oracle Hospitality OPERA Cloud Accounts Receivable User Guide
- Oracle Hospitality OPERA Cloud Reporting and Analytics User Guide
- Country-specific fiscal reference guides (Portugal, Spain, etc.)

---

## Last business day of the month

### Operations

| Step | Owner | Path |
|---|---|---|
| Confirm all daily night audits completed for the month | Night Audit | Front Desk > End of Day |
| Review month-to-date Trial Balance | Director of Finance | Reports > Manage Reports |
| Reconcile cash, credit card and other payment totals | Accounting | Reports > Cashier reports |
| Confirm all interface end-of-day messages posted for month | IT | Toolbox > Interfaces |
| Review any out-of-balance days and resolve | Director of Finance | Reports |

### AR reconciliation

| Step | Owner | Path |
|---|---|---|
| Run AR Ageing Report | AR Clerk | Reports > Manage Reports |
| Reconcile AR balances against general ledger | AR Clerk | Manual |
| Issue statements to direct bill accounts | AR Clerk | Financials > AR > Statements |
| Apply received payments to AR accounts | AR Clerk | Financials > AR |
| Identify overdue accounts for dunning | AR Clerk | Reports |
| Confirm credit limit utilisation per account | AR Clerk | Reports |

### Statistical validation

| Step | Owner |
|---|---|
| Validate occupancy statistics for the month | Director of Finance |
| Validate revenue statistics by department | Director of Finance |
| Confirm market segment revenue allocation | Director of Revenue Management |
| Confirm source code revenue allocation | Director of Revenue Management |

---

## First business day of new month

### Fiscal exports

Where the property is subject to monthly fiscal submission.

| Step | Path |
|---|---|
| Generate SAF-T (Portugal) for previous month | Miscellaneous > Exports > Country |
| Validate SAF-T totals against Trial Balance | Manual |
| Submit SAF-T to Autoridade Tributária | Per AT submission portal |
| Generate INE statistical export | Miscellaneous > Exports > Country |
| Submit INE statistics | Per INE submission portal |
| Confirm SII submissions complete for the month (Spain, real-time) | AEAT portal |

### Back office

| Step | Path |
|---|---|
| Generate General Ledger export for the month | Miscellaneous > Exports > General |
| Validate totals against Trial Balance | Manual |
| Deliver to back office (SUN, SAP, EBS, etc.) | Per integration |
| Confirm back office import | Per integration |
| Reconcile discrepancies | Manual |

### Closing entries

| Step | Owner |
|---|---|
| Post month-end adjustments | Director of Finance |
| Confirm accruals (commissions, taxes payable, deposits in advance) | Director of Finance |
| Lock previous month (where applicable per policy) | Director of Finance |

---

## Reports for management

| Report | Recipient |
|---|---|
| Monthly P&L by department | General Manager + Director of Finance |
| Statistics summary (occupancy, ADR, RevPAR, TRevPAR) | Senior leadership |
| Forecast vs actual variance | Director of Revenue Management |
| AR ageing summary | Director of Finance |
| Commission summary | Director of Sales |

---

## Common month-end issues

- SAF-T export missing rows due to unmapped transaction code introduced mid-month
- Back office export totals do not match Trial Balance due to mid-month rate code change
- AR balance discrepancy from manually applied payment not reconciled
- City tax accrual incorrect when month boundary falls mid-stay
- HB/FB VAT split error compounds over the month
- Statistical buckets misaligned after market code reconfiguration

---

*Derived from Oracle Hospitality OPERA Cloud documentation and country tax authority requirements. Not affiliated with Oracle Corporation. Licensed CC BY-NC-SA 4.0.*
