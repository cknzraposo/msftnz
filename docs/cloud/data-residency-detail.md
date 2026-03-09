---
title: "Data Residency & Data Sovereignty — Detail"
description: "A detailed guide to data residency and sovereignty options across Microsoft 365 and Azure, with New Zealand context, legal considerations, and practical steps."
date: 2026-03-09
lastmod: 2026-03-09
author: "NA"
tags: ["data-residency", "data-sovereignty", "azure", "microsoft-365", "new-zealand", "cloud-act", "adr", "multi-geo"]
category: "Cloud Strategy"
slug: "data-residency-detail"
layout: "page"
draft: true
related:
  - "/data-residency-summary"
  - "/data-residency-faq"
  - "/nz-cloud-region"
  - "/nz-cloud-region-faq"
---

# Data Residency & Data Sovereignty — Detail

## Azure and Microsoft 365 — A Guide for New Zealand Organisations

---

*This document is shared for discussion purposes only. It does not constitute a binding commitment or commercial offer. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

---

## Microsoft 365

### Default Data Residency

When a Microsoft 365 tenant is provisioned, core customer data at rest is stored in the geography aligned to the tenant's country or region. For New Zealand, this is **New Zealand North** (Auckland), operational since December 2024. Prior to that, NZ tenant data was hosted in Australia.

**Core workloads with default residency commitments:**

- Exchange Online — mailbox content, calendar entries, attachments
- SharePoint Online and OneDrive for Business — all files and documents
- Microsoft Teams — chat messages, channel messages

### Advanced Data Residency (ADR)

ADR is an add-on that extends data residency commitments beyond the core workloads. It also provides priority migration services for existing tenants moving to a new local region.


### Multi-Geo

Multi-Geo allows organisations to specify, on a per-user basis, where Microsoft 365 data is stored across multiple regions within a single tenant.

This is designed for multinational organisations. For example, an NZ-headquartered organisation with staff in Australia and the UK can store each user's Exchange mailbox and OneDrive data in their respective local region — without needing separate tenants.

ADR and Multi-Geo are complementary. ADR sets the baseline for the entire tenant; Multi-Geo provides granular per-user control on top.

---

## Azure

### Data Residency

Azure provides data residency through region selection. When you deploy a resource, you choose the Azure region, and your data at rest remains within that geography.

Azure operates 60+ regions globally, including **New Zealand North** (Auckland).

**Controls available:**

| Control | What it does |
|---------|-------------|
| **Region selection** | You choose where each resource is deployed |
| **Azure Policy** | Enforce allowed regions at the subscription or management group level, preventing resources from being created outside approved locations |
| **Customer-managed keys** | You control encryption keys through Azure Key Vault — Microsoft cannot access your data without your key |
| **Data Protection Addendum (DPA)** | Contractual commitment covering data location, subprocessor access, and cross-border transfer mechanisms |

### Microsoft Cloud for Sovereignty (Future service - NA)

A solution layer built on top of Azure that adds governance, compliance, and transparency controls for governments and regulated industries. It is available across all Azure regions.

> Please see [Sovereign Public Cloud](https://learn.microsoft.com/en-us/industry/sovereign-cloud/sovereign-private-cloud/overview-sovereign-private-cloud)

**Deployment models:**

| Model | What it is | When to use it |
|-------|-----------|----------------|
| **Sovereign Public Cloud** | Full Azure with local residency, local personnel authorisation, customer-managed encryption, and transparency logs | Organisations that need strong controls within the public cloud |
| **Sovereign Private Cloud** | On-premises or air-gapped deployments using Azure Local (formerly Azure Stack HCI) | Maximum isolation — defence, intelligence, or critical national infrastructure |
| **National Partner Cloud** | Operated by a local partner under local legal jurisdiction | Where national law requires a domestic operator (e.g., Bleu in France, Delos Cloud in Germany). Not yet available in NZ/ANZ |

**Key capabilities:**

- **Sovereign Landing Zone** — a pre-configured environment with automated regulatory policy mappings. Helps accelerate compliant deployments. Available on Terraform.
- **Transparency logs** — give qualified government customers visibility into Microsoft engineer access to their environment.
- **Azure Local** — run Azure services on your own hardware, scaling from 16 to hundreds of servers. Supports SAN storage and NVIDIA GPUs for sovereign AI workloads.

### Microsoft 365 Local (Future service - NA)

This runs core Microsoft 365 services (Exchange, SharePoint) on Azure Local infrastructure within your own premises. It enables fully disconnected, air-gapped Microsoft 365 deployments for organisations that require maximum data sovereignty.

---

**What to do now:**

1. **Check your current data location** — M365 Admin Center → Settings → Org Settings → Organization Profile → Data Location
2. **New tenants** provisioned with an NZ billing address will default to NZ North (i.e new M365 subscriptions)
3. **Evaluate ADR** if you need residency commitments for Copilot, Purview, or Defender workloads
4. **Enforce Azure region policy** to ensure resources are deployed to NZ North where required

---

## Legal Considerations

Data residency and data sovereignty are not the same thing, and technology alone does not resolve jurisdictional questions.

**How to strengthen your position:**

| Approach | What it does |
|----------|-------------|
| **Contractual controls** | Write data residency requirements explicitly into your agreements — do not rely on assumptions |
| **Customer-managed encryption** | Hold your own encryption keys so that Microsoft cannot decrypt your data without your involvement |
| **National partner clouds** | Provide the strongest legal separation by placing data under a domestic operator and local law. Not yet available in NZ |
| **Azure Local / M365 Local** | Air-gapped deployments where data never leaves infrastructure you control |
| **Legal review** | Involve your legal team in all sovereignty decisions — the technical, contractual, and legal dimensions must be addressed together |

---

*This document is shared for discussion purposes only and does not constitute a binding commitment or commercial offer. Verify details against Microsoft's official documentation before making compliance or procurement decisions. Key references:*

- *[Microsoft 365 data locations](https://learn.microsoft.com/en-us/microsoft-365/enterprise/o365-data-locations)*
- *[Advanced Data Residency](https://learn.microsoft.com/en-us/microsoft-365/enterprise/advanced-data-residency)*
- *[Microsoft Cloud for Sovereignty](https://learn.microsoft.com/en-us/industry/sovereignty/cloud-for-sovereignty)*

---

## Related pages

- [Data Residency — Summary](/data-residency-summary) — one-page overview with at-a-glance table
- [Data Residency — FAQ](/data-residency-faq) — common questions about data residency and sovereignty
- [Azure NZ North — Region Dossier](/nz-cloud-region) — available services, service rings, DR architecture, compliance, pricing
- [Azure NZ North — FAQ](/nz-cloud-region-faq) — common questions about the New Zealand North region
