---
title: "Data Residency & Data Sovereignty — Summary"
description: "A summary of data residency and data sovereignty options for Azure and Microsoft 365, tailored for New Zealand organisations."
date: 2026-03-09
lastmod: 2026-10-16
verifiedOn: 2026-10-16
reviewBy: 2027-01-14
author: "Chandima Kulathilake"
tags: ["data-residency", "data-sovereignty", "azure", "microsoft-365", "new-zealand"]
category: "Cloud Strategy"
slug: "data-residency-summary"
layout: "page"
draft: true
disclaimers:
  - "legal-compliance"
  - "not-legal-advice"
related:
  - "/data-residency-detail"
  - "/cloud-faq"
  - "/nz-cloud-region"
  - "/decisions-to-make"
---

# Data Residency & Data Sovereignty — Summary

## Azure and Microsoft 365 — A Guide for New Zealand Organisations

---

*This document is shared for discussion purposes only. It does not constitute a binding commitment or commercial offer. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

---

Microsoft provides a range of options to help organisations control where their data is stored and how it is governed across Azure and Microsoft 365.

**Data residency** describes where specified data is stored, subject to the service's terms and documentation. **Data sovereignty** involves broader questions of jurisdiction, authority, governance, and control. A storage location or technical setting alone does not determine legal jurisdiction or establish sovereignty.

### What's available today for New Zealand

- **Azure New Zealand North** (Auckland) — live since December 2024. You can deploy Azure resources locally and enforce this with policy.
- **Microsoft 365 data location** — check your tenant's Data Location card and the current [service data location documentation](https://learn.microsoft.com/en-us/microsoft-365/enterprise/o365-data-locations). Applicable commitments depend on the service, tenant, Product Terms, and any eligible add-on.
- **[Advanced Data Residency (ADR)](https://learn.microsoft.com/en-us/microsoft-365/enterprise/m365-dr-adr-overview)** — for eligible customers, ADR provides defined commitments for listed workloads and prioritized tenant migration services. Check current eligibility, licensing, and coverage.
- **Education A3/A5 caveat** — Microsoft lists Microsoft 365 A3/A5 and paid Office 365 A1/A3/A5 as qualifying education subscriptions, but an A3/A5 licence by itself does not provide an ADR commitment. Education customers should distinguish standard ADR from the separate paid **ADR for Education (ADR-E)** add-on, available only through Volume Licensing/EES; see the [education licensing and coverage details](/data-residency-detail).
- **[Microsoft Cloud for Sovereignty](https://learn.microsoft.com/en-us/industry/sovereignty/cloud-for-sovereignty)** — a set of cloud capabilities and guidance; assess the specific controls, services, and customer commitments rather than treating it as a regional data-location guarantee.

### At a glance

| What you need | Microsoft 365 | Azure |
|---------------|---------------|-------|
| Verify data location | Check the tenant's Data Location card and service-specific commitments | Check the service's data-location documentation; a resource region alone may not describe all processing or dependencies |
| Additional residency commitments | Check [ADR eligibility and coverage](https://learn.microsoft.com/en-us/microsoft-365/enterprise/m365-dr-adr-overview) and current Product Terms. Education customers must distinguish ADR-E eligibility, licensing coverage, and service scope. | Check service-specific options and contracts |
| Regional placement | [Multi-Geo](https://learn.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-multi-geo) subject to its terms and supported workloads | Region selection per supported resource |
| Governance controls | Microsoft Purview capabilities and tenant controls, subject to service scope | [Azure Policy](https://learn.microsoft.com/en-us/azure/governance/policy/overview) can restrict resource locations; it does not govern every data flow |
| Infrastructure location | Confirm the relevant Microsoft 365 service and tenant commitments | [Azure Local](https://learn.microsoft.com/en-us/azure/azure-local/overview) runs supported workloads on customer-managed infrastructure; assess its connectivity and operational model |
| Encryption controls | Review [Customer Key](https://learn.microsoft.com/en-us/microsoft-365/compliance/customer-key-overview) scope and prerequisites | Review [customer-managed key](https://learn.microsoft.com/en-us/azure/security/fundamentals/encryption-models) support for the specific service and configuration |

---

## Related pages

- [Data Residency — Detail](/data-residency-detail) — workload, commitment, and control details for Microsoft 365 and Azure
- [Cloud Residency, Sovereignty, and NZ North — FAQ](/cloud-faq) — common questions about data residency, sovereignty, and the NZ region
- [Azure New Zealand North — Start Here](/nz-cloud-region) — region facts, resilience, and next steps
- [NZ North Service Availability — Verification Guide](/service-availability) — how to check service and workload support
- [Data Residency vs Data Sovereignty — Decisions to Make](/decisions-to-make) — trade-offs and decision framework for leaders
