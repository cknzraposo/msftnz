---
title: "Data Residency & Data Sovereignty — FAQ"
description: "Frequently asked questions about data residency and data sovereignty for Azure and Microsoft 365 in New Zealand."
date: 2026-03-09
lastmod: 2026-03-09
author: "NA"
tags: ["data-residency", "data-sovereignty", "azure", "microsoft-365", "new-zealand", "faq"]
category: "Cloud Strategy"
slug: "data-residency-faq"
layout: "page"
draft: true
related:
  - "/data-residency-summary"
  - "/data-residency-detail"
  - "/nz-cloud-region"
  - "/nz-cloud-region-faq"
---

# Data Residency & Data Sovereignty — FAQ

## Azure and Microsoft 365 — A Guide for New Zealand Organisations

---

*This document is shared for discussion purposes only. It does not constitute a binding commitment or commercial offer. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

---

### Where is my Microsoft 365 data stored today?

You can check in the M365 Admin Center under Settings → Org Settings → Organization Profile → Data Location. If your tenant was created before December 2024 with a New Zealand address, your data is likely still in Australia. You can request migration to NZ North.

---

### What is the difference between data residency and data sovereignty?

Data residency means your data is physically stored in a specific country or region. Data sovereignty means your data is governed by the laws of that country — including who has legal authority to access it. You can have local residency without full sovereignty.

---

### Do I need Advanced Data Residency (ADR)?

If your data residency requirements only cover Exchange, SharePoint, OneDrive, and Teams, default residency may be sufficient. ADR is needed if you require residency commitments for additional workloads such as Copilot, Defender for Office 365, or Purview services. It also provides priority migration for existing tenants.

---

### What about Microsoft 365 Copilot — where is that data processed?

Copilot interaction data is covered under ADR. In-country Copilot processing is being rolled out progressively — Australia is covered from 2025, with additional countries following through 2026. For NZ tenants without ADR, Copilot data may be processed in the nearest available region.

---

### Can Microsoft access my data?

Microsoft operates on a principle of zero standing access — engineers do not have persistent access to customer data. Access is granted on a time-limited, audited basis when required for service operations. With customer-managed keys, Microsoft cannot decrypt your data without your involvement. Transparency logs (available to qualified government customers) provide visibility into any access.

---

### Does the US CLOUD Act affect data stored in New Zealand?

The CLOUD Act allows US courts to compel US-headquartered companies to produce data regardless of where it is stored. Microsoft has committed to challenging requests it considers inappropriate and publishes a transparency report. For organisations that need stronger legal separation, options include national partner clouds (not yet in NZ) or fully air-gapped deployments using Azure Local.

---

### What is Azure Local?

Azure Local (formerly Azure Stack HCI) lets you run Azure services on hardware you own and control, in your own data centre or facility. It supports scaling from small clusters to hundreds of servers and can operate fully disconnected from the public cloud for air-gapped workloads.

---

### What is Microsoft 365 Local?

Microsoft 365 Local runs core M365 services (Exchange, SharePoint) on Azure Local infrastructure within your premises. It is expected to reach general availability in 2026 and is designed for organisations requiring fully disconnected Microsoft 365 deployments.

---

### How do I enforce that Azure resources stay in New Zealand?

Use Azure Policy to restrict allowed regions at the subscription or management group level. This prevents anyone in your organisation from deploying resources outside approved locations (e.g., only permit New Zealand North).

---

### What should I do if I have regulatory obligations around data location?

Start by confirming where your data is stored today (M365 Admin Center and Azure Portal). Then assess whether default residency, ADR, Multi-Geo, or sovereign cloud controls are needed for your specific regulatory framework. Involve your legal and compliance teams early — technology controls are one part of the picture, but contractual and legal coverage is equally important.

---

*This document is shared for discussion purposes only and does not constitute a binding commitment or commercial offer. Verify details against Microsoft's official documentation before making compliance or procurement decisions. Key references:*

- *[Microsoft 365 data locations](https://learn.microsoft.com/en-us/microsoft-365/enterprise/o365-data-locations)*
- *[Advanced Data Residency](https://learn.microsoft.com/en-us/microsoft-365/enterprise/advanced-data-residency)*
- *[Microsoft Cloud for Sovereignty](https://learn.microsoft.com/en-us/industry/sovereignty/cloud-for-sovereignty)*

---

## Related pages

- [Data Residency — Summary](/data-residency-summary) — one-page overview with at-a-glance table
- [Data Residency — Detail](/data-residency-detail) — full breakdown of M365, Azure, sovereignty controls, and legal considerations
- [Azure NZ North — Region Dossier](/nz-cloud-region) — available services, service rings, DR architecture, compliance, pricing
- [Azure NZ North — FAQ](/nz-cloud-region-faq) — common questions about the New Zealand North region
