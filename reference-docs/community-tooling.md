# Community Tooling for OPERA Cloud

This file catalogues third-party, community-maintained tools that interact with OPERA Cloud APIs. None of the tools listed here are certified, endorsed or supported by Oracle. They are included for **engineer awareness only**. Always review the source code, licensing and security model before introducing any of these tools into a production environment.

If a tool is not listed here, it does not mean it is unsafe. It means I have not personally validated it. Pull requests welcome with clear evidence of provenance and active maintenance.

---

## opera-cloud-mcp (Python)

**Status:** Unofficial. Not certified by Oracle.

| Attribute | Detail |
|---|---|
| Author | Les Leslie (Wedgwood Webworks) |
| PyPI | https://pypi.org/project/opera-cloud-mcp/ |
| Source | https://github.com/lesleslie/opera-cloud-mcp |
| Licence | BSD 3-Clause |
| Latest release at time of writing | 0.3.6, May 2026 |
| Language | Python 3.13+ |
| Framework | FastMCP |

### What it does

Exposes an MCP (Model Context Protocol) server over OHIP REST endpoints, allowing AI agents and MCP-compatible clients (Claude Desktop, Claude Code, others) to interact with OPERA Cloud via natural-language tool calls. Approximately 45 tools grouped across five domains.

| Domain | Tool count (approximate) | Coverage |
|---|---|---|
| Reservation Management | 15 | Search, create, modify, cancel, check-in, check-out, group bookings, waitlists |
| Guest Management | 12 | Profile CRUD, loyalty, communication preferences, history |
| Room Management | 8 | Availability, housekeeping status, assignments, maintenance |
| Operations | 6 | Daily operations reporting, occupancy forecasting, revenue, events |
| Financial | 4 | Billing, invoicing, payment processing, financial analytics |

Ships with OAuth2 token refresh, configurable rate limiting (default 10 requests/second), structured JSON logging, Prometheus metrics, Docker and Docker Compose deployment templates.

### What it is NOT

- **Not an Oracle product.** No Oracle support, no certification, no Service Level Agreement.
- **Not a substitute for direct OHIP integration** in any environment where audit trail, compliance documentation or vendor accountability is required.
- **Not suitable for production hospitality operations** without independent security review.

### Reasonable use cases

- Local developer experimentation with OHIP API patterns.
- Reference implementation when designing your own MCP wrapper.
- Personal productivity tooling for consultants accessing test tenants.

### Use cases to avoid

- Live property operations.
- Any environment handling guest PII without your own security review.
- Any enterprise rollout where Oracle support escalation must be possible.

### Configuration sketch

```bash
git clone https://github.com/lesleslie/opera-cloud-mcp.git
cd opera-cloud-mcp
uv sync
cp .env.example .env
# Edit .env with your OPERA Cloud tenant credentials
python -m opera_cloud_mcp
```

Required environment variables.

```
OPERA_CLOUD_BASE_URL=https://your-opera-instance.com/api/v1
OPERA_CLOUD_CLIENT_ID=...
OPERA_CLOUD_CLIENT_SECRET=...
OPERA_CLOUD_USERNAME=...
OPERA_CLOUD_PASSWORD=...
```

### Security considerations

Storing live OPERA Cloud credentials in a `.env` file on a developer workstation is acceptable for sandbox or UAT only. For any work touching a property in production, follow Oracle's recommended Shared Security Domain or OCIM patterns, rotate credentials, and never reuse production credentials in local tooling.

---

## DeepWiki (oracle/hospitality-api-docs)

**Status:** Third-party AI-generated documentation overlay.

| Attribute | Detail |
|---|---|
| URL | https://deepwiki.com/oracle/hospitality-api-docs |
| Source | AI-generated from the Oracle public repository |
| Authoritative? | No |

Useful for quickly navigating the Oracle repository structure and getting natural-language summaries of subject areas. Do not rely on it for production decisions. Always cross-reference against the actual JSON spec in the Oracle repo.

---

## How to evaluate a new community tool

Before adding any community tool to this list, or before using one in your own work, run through this checklist.

1. **Maintenance.** Last commit within the last 6 months. Open issues being responded to.
2. **Source visibility.** Source code on a public repository, readable, with a clear licence.
3. **Authentication handling.** Credentials never logged. Token refresh implemented correctly.
4. **API coverage.** Aligned to a documented OPERA Cloud version, not a stale snapshot.
5. **Error handling.** Failures return useful messages, not silent partial states.
6. **Test coverage.** Public tests exist and run.
7. **Vendor independence.** Tool does not require an opaque external service to function.
8. **No phone-home.** Does not transmit OPERA Cloud data to third-party telemetry endpoints.

If a tool fails any of these checks, it does not belong in a hospitality production environment.

---

## Disclaimer

This file is maintained by Tiago Fitas in good faith. Inclusion of a tool here is not an endorsement. Exclusion is not a condemnation. Always perform your own due diligence. Oracle, OPERA, OPERA Cloud and related marks are trademarks of Oracle Corporation.
