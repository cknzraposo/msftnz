---
title: "Data Residency & Data Sovereignty — Detail"
description: "A detailed guide to data residency and sovereignty options across Microsoft 365 and Azure, with New Zealand context, legal considerations, and practical steps."
date: 2026-03-09
lastmod: 2026-10-16
verifiedOn: 2026-10-16
reviewBy: 2027-01-14
author: "Chandima Kulathilake"
tags: ["data-residency", "data-sovereignty", "azure", "microsoft-365", "new-zealand", "cloud-act", "adr", "multi-geo"]
category: "Cloud Strategy"
slug: "data-residency-detail"
layout: "page"
draft: true
disclaimers:
  - "legal-compliance"
  - "not-legal-advice"
related:
  - "/data-residency-summary"
  - "/cloud-faq"
  - "/nz-cloud-region"
  - "/decisions-to-make"
  - "/azure-local-vs-azure-cloud"
---

# Data Residency & Data Sovereignty — Detail

## Azure and Microsoft 365 — A Guide for New Zealand Organisations

---

*This document is shared for discussion purposes only. It does not constitute a binding commitment or commercial offer. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

---

## Microsoft 365

### Check the tenant and workload

Do not infer a Microsoft 365 tenant's data location or contractual commitment from the Azure New Zealand North launch. Check the tenant-specific **Data Location** card in the Microsoft 365 admin centre and Microsoft's current [service data location documentation](https://learn.microsoft.com/en-us/microsoft-365/enterprise/o365-data-locations). The documented scope can vary by workload, tenant geography, and applicable terms.

For a durable commitment, review the current [Microsoft Product Terms](https://www.microsoft.com/licensing/terms/product/PrivacyandSecurityTerms/all) for core online services and any applicable add-on terms. The Microsoft 365 Data Location card reports tenant-specific location; it is not a substitute for reviewing the service commitment and its scope.

### Advanced Data Residency (ADR)

[ADR](https://learn.microsoft.com/en-us/microsoft-365/enterprise/m365-dr-adr-overview) provides eligible customers with defined data-location commitments for listed Microsoft 365 services and prioritized tenant migration services. Eligibility includes tenant geography, qualifying subscriptions, and licensing requirements. Review the current [ADR service commitments](https://learn.microsoft.com/en-us/microsoft-365/enterprise/m365-dr-adr-commitments) and [requirements](https://learn.microsoft.com/en-us/microsoft-365/enterprise/m365-dr-adr-overview) before relying on it.

### Microsoft 365 Education: A3/A5, ADR and ADR-E

**An A3 or A5 subscription is not, by itself, a Microsoft 365 data-residency commitment.** Microsoft lists Microsoft 365 A3/A5 and paid Office 365 A1/A3/A5 among the qualifying Education subscriptions for the ADR programme. New Zealand is listed as an eligible Local Region Geography. Eligibility still depends on the tenant's Default Geography, the precise subscription and add-on, the applicable agreement, and the licensing coverage rules.

Microsoft distinguishes these paid add-ons:

| Offering | Education relevance | Microsoft 365 data scope |
|----------|---------------------|--------------------------|
| **ADR — standard Advanced Data Residency** | The broader ADR offer includes qualifying commercial, public-sector, and mixed commercial/Education subscriptions. In a mixed tenant, Microsoft's license-management guidance says paid commercial and paid Education A3/A5 seats must be covered by ADR; free subscriptions aren't required under that mixed-tenant rule. | Core services plus expanded services, including Microsoft 365 Copilot, Copilot Chat, Defender for Office P1, Exchange Online Protection, Office for the web, Viva Connections, and select Purview services. Check the current service list and commitments. |
| **ADR-E — Advanced Data Residency for Education** | A separate paid Education add-on. Microsoft says it is available only to Volume Licensing / EES customers. Its guidance directs customers to their Microsoft account representative for the Education SKU; availability and ordering are not guaranteed just because the organisation has A3/A5 or an EES agreement. | The current comparison lists Exchange Online, SharePoint, OneDrive, and Teams. It does **not** list Copilot, Copilot Chat, or ADR's expanded services as ADR-E covered workloads. |

**Seat coverage differs by tenant type.** Microsoft's current ADR license-management guidance states that an Education ADR-E tenant must cover 100% of eligible Microsoft 365 seats, including paid and unpaid/free seats. The mixed Commercial + Education ADR rule instead requires 100% of eligible paid seats; free Education seats are not required under that mixed-tenant rule. Coverage is based on eligible seats available/purchased in the tenant, not merely the number assigned to users. Do not apply the education-only rule to a mixed tenant, or the mixed-tenant rule to an Education-only tenant, without confirming the tenant's classification with Microsoft.

**EES qualification and ADR-E qualification are separate checks.** Microsoft's EES guidance describes eligibility for primary/secondary and higher-education institutions, with a 1,000 Education Qualified User organization-wide minimum and organization-wide licensing requirements for Education Platform Products. The EES agreement, enrollment, product list, use rights, and Qualified Educational User definition govern the institution's actual licensing. Separately, ADR-E is a paid add-on whose eligibility and availability must be confirmed for the tenant, agreement, geography, SKU, and sales channel. An EES enrollment or A3/A5 purchase does not automatically include ADR-E.

After purchase, a Global Administrator must complete the applicable opt-in for migration; buying the add-on alone does not start migration. Check the tenant's Data Location card, current Product Terms, Microsoft Learn eligibility and service tables, and the EES agreement with the licensing partner or Microsoft representative before making a commitment.

Microsoft sources:

- [ADR overview and requirements](https://learn.microsoft.com/en-us/microsoft-365/enterprise/m365-dr-adr-overview) — qualifying subscriptions, New Zealand geography, and Volume Licensing/EES availability for ADR Education.
- [Compare Microsoft 365 Data Residency offerings](https://learn.microsoft.com/en-us/microsoft-365/enterprise/m365-dr-compare-offerings) — ADR vs ADR-E service scope, eligibility, coverage, and geography.
- [ADR license management](https://learn.microsoft.com/en-us/microsoft-365/enterprise/m365-dr-adr-license-management) — Education and mixed-tenant seat coverage rules.
- [Enrollment for Education Solutions (EES)](https://learn.microsoft.com/en-us/volume-licensing-central/learning/contracting/enrollment-for-education-solutions) — qualifying institution and organization-wide requirements.
- [Microsoft Product Terms — Microsoft 365, EES](https://www.microsoft.com/licensing/terms/productoffering/Microsoft365/EES) — current programme-specific terms, prerequisites, and availability caveats.
- [ADR migration initiation](https://learn.microsoft.com/en-us/microsoft-365/enterprise/m365-dr-adr-initiate-migration) — administrator opt-in and migration process.

### Multi-Geo

[Multi-Geo](https://learn.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-multi-geo) allows organisations to specify, on a per-user basis, where Microsoft 365 data is stored across multiple regions within a single tenant.

This is designed for multinational organisations. For example, an NZ-headquartered organisation with staff in Australia and the UK can store each user's Exchange mailbox and OneDrive data in their respective local region — without needing separate tenants.

ADR and Multi-Geo address different needs and have distinct terms. A Multi-Geo configuration can place supported user data in more than one geography; do not assume an ADR subscription overrides that configuration. Check Microsoft's current terms and workload documentation.

---

## Azure

### Data Residency

For regional Azure services, region selection is an important part of data-location planning. It is not a blanket statement about every data flow: control-plane data, backups, replication, support, processing, and dependent services may have separate locations and terms. Check the specific service's data residency and reliability documentation.

The Azure regions list identifies **New Zealand North** as a region in Auckland. Check the current region and product lists for service-level support.

**Controls available:**

| Control | What it does |
|---------|-------------|
| **Region selection** | You choose where each resource is deployed |
| **[Azure Policy](https://learn.microsoft.com/en-us/azure/governance/policy/overview)** | Enforce allowed regions at the subscription or management group level, preventing resources from being created outside approved locations |
| **[Customer-managed keys](https://learn.microsoft.com/en-us/azure/security/fundamentals/encryption-models)** | For supported services, you can manage encryption keys through [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/general/overview). Review service-specific scope, key access, and operational responsibilities; this control alone does not establish that a provider cannot access data. |
| **[Data Protection Addendum (DPA)](https://www.microsoft.com/licensing/docs/view/Microsoft-Products-and-Services-Data-Protection-Addendum-DPA)** | Contractual commitment covering data location, subprocessor access, and cross-border transfer mechanisms |

### Microsoft Cloud for Sovereignty

Microsoft Cloud for Sovereignty provides cloud capabilities and guidance for public-sector and regulated workloads. Confirm which capabilities are available for the service, region, and customer scenario; the offering is not itself a legal determination or blanket data-location commitment.

See Microsoft's [Cloud for Sovereignty documentation](https://learn.microsoft.com/en-us/industry/sovereignty/cloud-for-sovereignty).

**Deployment models:**

| Model | What it is | When to use it |
|-------|-----------|----------------|
| **Public-cloud controls** | Capabilities vary by service, configuration, customer eligibility, and terms | Assess against the workload's documented control requirements |
| **Azure Local** | Azure services supported on customer-managed infrastructure; connectivity and operating model depend on deployment | Assess where local infrastructure is required and the organisation can operate it |

**Key capabilities:**

- **[Sovereign Landing Zone](https://learn.microsoft.com/en-us/industry/sovereignty/slz-overview)** — a reference architecture and policy guidance; using it does not by itself establish compliance.
- **Transparency and access controls** — verify current availability, eligibility, and service scope in Microsoft's product documentation and contract terms.
- **[Azure Local](https://learn.microsoft.com/en-us/azure/azure-local/overview)** — run supported Azure services on customer-managed infrastructure. Review connectivity, update, support, hardware, and operational requirements.

**What to do now:**

1. **Check your tenant's data location** using the Data Location card in the Microsoft 365 admin centre.
2. **Identify the workloads and data** in scope; check Microsoft's service-specific location documentation and current Product Terms.
3. **Evaluate ADR** only after checking eligibility, licensing, covered data, and migration options.
4. **For Azure, use policy guardrails** where appropriate, then check service-specific data handling, replication, and backup locations.

---

## Legal Considerations

Data residency and data sovereignty are not the same thing, and technology alone does not resolve jurisdictional questions.

**How to strengthen your position:**

| Approach | What it does |
|----------|-------------|
| **Contractual controls** | Write data residency requirements explicitly into your agreements — do not rely on assumptions |
| **Customer-managed encryption** | Review whether the service supports customer-managed keys and what data paths, key access, and operational duties are in scope. Key control alone does not determine provider access or jurisdiction. |
| **Customer-managed infrastructure** | Assess the supported Azure Local workloads, connectivity, operational responsibilities, and residual legal and supply-chain risks. It does not automatically make a deployment air-gapped. See the [Azure Local vs Azure Cloud comparison](/azure-local-vs-azure-cloud) before choosing this operating model. |
| **Legal review** | Involve your legal team in all sovereignty decisions — the technical, contractual, and legal dimensions must be addressed together |

---

*This document is shared for discussion purposes only and does not constitute a binding commitment or commercial offer. Verify details against Microsoft's official documentation before making compliance or procurement decisions. Key references:*

- *[Microsoft 365 data locations](https://learn.microsoft.com/en-us/microsoft-365/enterprise/o365-data-locations)*
- *[Advanced Data Residency](https://learn.microsoft.com/en-us/microsoft-365/enterprise/advanced-data-residency)*
- *[Microsoft Cloud for Sovereignty](https://learn.microsoft.com/en-us/industry/sovereignty/cloud-for-sovereignty)*

---

## Related pages

- [Data Residency — Summary](/data-residency-summary) — one-page overview with at-a-glance table
- [Cloud Residency, Sovereignty, and NZ North — FAQ](/cloud-faq) — common questions about data residency, sovereignty, and the NZ region
- [Azure New Zealand North — Start Here](/nz-cloud-region) — region facts, resilience, and next steps
- [NZ North Service Availability — Verification Guide](/service-availability) — how to check service and workload support
- [Data Residency vs Data Sovereignty — Decisions to Make](/decisions-to-make) — trade-offs and decision framework for leaders
- [Azure Local vs Azure Cloud](/azure-local-vs-azure-cloud) — local infrastructure trade-offs, data flows, and evidence required before approval
