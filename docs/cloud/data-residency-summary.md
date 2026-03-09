---
title: "Data Residency & Data Sovereignty — Summary"
description: "A summary of data residency and data sovereignty options for Azure and Microsoft 365, tailored for New Zealand organisations."
date: 2026-03-09
lastmod: 2026-03-09
author: "NA"
tags: ["data-residency", "data-sovereignty", "azure", "microsoft-365", "new-zealand"]
category: "Cloud Strategy"
slug: "data-residency-summary"
layout: "page"
draft: true
related:
  - "/data-residency-detail"
  - "/data-residency-faq"
  - "/nz-cloud-region"
  - "/nz-cloud-region-faq"
---

# Data Residency & Data Sovereignty — Summary

## Azure and Microsoft 365 — A Guide for New Zealand Organisations

---

*This document is shared for discussion purposes only. It does not constitute a binding commitment or commercial offer. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

---

Microsoft provides a range of options to help organisations control where their data is stored and how it is governed across Azure and Microsoft 365.

**Data residency** is the commitment that your data at rest stays in a geographic region you choose. **Data sovereignty** goes further — it means your data is subject only to the laws and governance of the country where it resides, with controls over who can access it and under what authority.

### What's available today for New Zealand

- **Azure New Zealand North** (Auckland) — live since December 2024. You can deploy Azure resources locally and enforce this with policy.
- **Microsoft 365 data residency** — new NZ tenants store core workload data (Exchange, SharePoint, OneDrive, Teams) in New Zealand by default. Contact your Microsoft account team to discuss data location options for existing tenants.
- **[Advanced Data Residency (ADR)](https://learn.microsoft.com/en-us/microsoft-365/enterprise/advanced-data-residency)** — an add-on that extends residency commitments to additional workloads including Copilot, Defender, and Purview.
- **[Microsoft Cloud for Sovereignty](https://learn.microsoft.com/en-us/industry/sovereignty/cloud-for-sovereignty)** — additional controls for regulated industries, available across all Azure regions.

### At a glance

| What you need | Microsoft 365 | Azure |
|---------------|---------------|-------|
| Data stays in NZ | Default residency (NZ North) | Deploy to NZ North region |
| Extended workload coverage | [ADR](https://learn.microsoft.com/en-us/microsoft-365/enterprise/advanced-data-residency) add-on | [Azure Policy](https://learn.microsoft.com/en-us/azure/governance/policy/overview) (allowed regions) |
| Per-user regional placement | [Multi-Geo](https://learn.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-multi-geo) | Region selection per resource |
| Compliance controls | [Purview](https://learn.microsoft.com/en-us/purview/purview) compliance boundaries | [Sovereign Landing Zone](https://learn.microsoft.com/en-us/industry/sovereignty/slz-overview) |
| Maximum isolation | M365 Local (air-gapped) | [Azure Local](https://learn.microsoft.com/en-us/azure/azure-local/overview) (on-premises) |
| Encryption you control | [Customer Key](https://learn.microsoft.com/en-us/microsoft-365/compliance/customer-key-overview) for M365 | [Customer-managed keys](https://learn.microsoft.com/en-us/azure/security/fundamentals/encryption-models) ([Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/general/overview)) |

---

## Related pages

- [Data Residency — Detail](/data-residency-detail) — full breakdown of M365, Azure, sovereignty controls, NZ timeline, and legal considerations
- [Data Residency — FAQ](/data-residency-faq) — common questions about data residency and sovereignty
- [Azure NZ North — Region Dossier](/nz-cloud-region) — available services, service rings, DR architecture, compliance, pricing
- [Azure NZ North — FAQ](/nz-cloud-region-faq) — common questions about the New Zealand North region
