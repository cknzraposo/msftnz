---
title: "Azure New Zealand North — FAQ"
description: "Frequently asked questions about the Azure New Zealand North cloud region, covering services, availability zones, pricing, compliance, and data sovereignty."
date: 2026-03-09
lastmod: 2026-03-09
author: "NA"
tags: ["azure", "new-zealand-north", "cloud-region", "faq", "compliance", "data-residency"]
category: "Cloud Infrastructure"
slug: "nz-cloud-region-faq"
layout: "page"
draft: true
related:
  - "/nz-cloud-region"
  - "/data-residency-summary"
  - "/data-residency-detail"
  - "/data-residency-faq"
---

# Azure New Zealand North — Frequently Asked Questions

---

*This document is shared for discussion purposes only. It does not constitute a binding commitment or commercial offer. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

---

### What is Azure New Zealand North?

Azure New Zealand North is Microsoft's first hyperscale cloud region in Aotearoa New Zealand, located in Auckland. It launched in December 2024 and provides the full Azure platform with three availability zones, enabling local data residency, low-latency access, and compliance with New Zealand regulations.

---

### Where exactly is the data centre?

The region is in the Auckland metropolitan area. Microsoft does not disclose the precise address of individual data centre facilities for security reasons. The region consists of multiple physically separated facilities (availability zones) within the greater Auckland area.

---

### Is this the only Azure region in New Zealand?

Yes. New Zealand North is the only Azure region in the country. There is no "New Zealand South" or secondary NZ region at this time.

---

### What happened to my data before this region existed?

Before December 2024, Azure and Microsoft 365 data for New Zealand customers was stored in **Australia East** (Sydney). If your tenant or resources were provisioned before the NZ North launch, your data may still be in Australia. Contact your Microsoft account team to discuss data location options.

---

### Does my data automatically move to New Zealand North?

No. **Existing Azure resources** remain in whatever region they were deployed to. You need to migrate or redeploy them to NZ North.

For **Microsoft 365**, new tenants with an NZ billing address will default to NZ North. For existing tenants, contact your Microsoft account team to discuss data location options.

---

### What services are available?

NZ North offers the vast majority of Azure services across compute, networking, storage, databases, AI, analytics, security, integration, management, and IoT. Over 70 services are generally available.

Notable exceptions include **[Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/ai-services/openai/overview)**, which is not yet GA in NZ North — you would deploy this in Australia East for now.

For the current list, check the [Azure Products by Region](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/) page.

---

### What are service rings and why do they matter?

Azure categorises services into three deployment rings that determine rollout priority:

- **Foundational** — core services (VMs, storage, networking) available at region launch
- **Mainstream** — widely used services deployed within 90 days of region GA
- **Strategic** — niche or advanced services rolled out based on demand

NZ North is classified as a **recommended region**, so it receives Foundational and Mainstream services as standard. Strategic services arrive as demand justifies.

---

### Is Azure OpenAI available in New Zealand North?

Not yet as of early 2026. Azure OpenAI Service is classified as a Strategic service and is currently available in Australia East, US, and select European regions. For NZ-based workloads, deploy Azure OpenAI in Australia East (~30–40ms latency from Auckland). Monitor the [Azure Products by Region](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/) page for updates.

---

### Does NZ North have availability zones?

Yes — three [availability zones](https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview). Each zone is a physically separate facility with independent power, cooling, and networking. Inter-zone latency is under 2ms. This enables zone-redundant deployments for high availability without leaving New Zealand.

---

### Is there a paired region for disaster recovery?

No. NZ North does not have an official Azure paired region. You need to design your own DR strategy:

- **Zone-to-zone** within NZ North for high availability (data stays in NZ)
- **Region-to-region** to Australia East for full disaster recovery (data crosses to Australia)

If your data cannot leave New Zealand under any circumstances, zone-to-zone DR within NZ North is your only option.

---

### What is the latency like?

| Route | Typical latency |
|-------|----------------|
| Within NZ North (zone-to-zone) | < 2ms |
| NZ North ↔ Australia East (Sydney) | ~30–40ms |
| NZ North ↔ Southeast Asia | ~120–150ms |
| NZ North ↔ US West | ~150–180ms |

Latency from NZ North is a significant improvement over routing to Australia East for local users. Expect roughly a 25–30ms reduction for NZ-based workloads.

---

### Can I use ExpressRoute to connect to NZ North?

Yes. [Azure ExpressRoute](https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction) provides private, dedicated connectivity from your on-premises network to the Auckland data centres, bypassing the public internet. This is recommended for hybrid deployments, sensitive workloads, and organisations with strict security requirements.

---

### What compliance certifications does NZ North hold?

| Certification | What it covers |
|---------------|---------------|
| SOC 1, 2, 3 | Security, availability, processing integrity, confidentiality |
| ISO 27001 | Information security management |
| ISO 27017 | Cloud security controls |
| ISO 27018 | Cloud privacy |
| ISO 9001 | Quality management |
| PCI-DSS | Payment card industry data security |
| IRAP (PROTECTED) | Australian government benchmark, widely referenced in NZ |
| NZISM alignment | New Zealand Information Security Manual |

---

### Does NZ North meet New Zealand government security requirements?

Azure aligns with the **[New Zealand Information Security Manual (NZISM)](https://nzism.gcsb.govt.nz/)** and holds IRAP assessment at the PROTECTED level (an Australian standard widely used as a benchmark in NZ). For specific agency requirements, consult the [Microsoft Trust Center](https://www.microsoft.com/en-us/trust-center) and engage with Microsoft NZ for detailed compliance mapping.

---

### What about Māori data sovereignty?

Microsoft has committed to working with Māori communities on data governance, aligning with the principles of **[Te Mana Raraunga](https://www.temanararaunga.maori.nz/)** (the Māori Data Sovereignty Network). This includes co-design with iwi and Māori organisations for governance oversight. Frameworks are being formalised — contact Microsoft NZ for current partnership details and how they apply to your organisation.

---

### Does Microsoft 365 data also sit in NZ North?

Yes. Since December 2024, new M365 tenants with an NZ billing address store core workload data (Exchange, SharePoint, OneDrive, Teams) in New Zealand by default. The **[Advanced Data Residency (ADR)](https://learn.microsoft.com/en-us/microsoft-365/enterprise/advanced-data-residency)** add-on extends residency commitments to additional workloads including Copilot, Defender, and Purview. See the [Data Residency — Detail](/data-residency-detail) page for full coverage.

---

### How do I check where my M365 data is stored?

M365 Admin Center → Settings → Org Settings → Organization Profile → **Data Location**. This will show you the current storage geography for each workload.

---

### How do I prevent Azure resources from being deployed outside NZ?

Use **[Azure Policy](https://learn.microsoft.com/en-us/azure/governance/policy/overview)** to restrict allowed regions at the subscription or management group level. Apply a policy that only permits `newzealandnorth` as an allowed location. This prevents anyone in your organisation from accidentally deploying resources to another region.

---

### Can I use NZ North as a secondary region for workloads hosted in Australia?

Yes. This is a valid architecture — deploy primary workloads in Australia East with NZ North as a DR or failover target. [Azure Site Recovery](https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-overview) and [geo-redundant storage](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy) both support this pattern. Note that this means data will be replicated into New Zealand, which may have positive sovereignty implications for NZ-based organisations.

---

### Is the region powered by renewable energy?

Yes. Microsoft has committed to powering the NZ North region with **100% renewable energy** sourced from solar, wind, and hydro. This aligns with Microsoft's broader sustainability commitments and New Zealand's renewable energy profile.

---

### How do I compare pricing between NZ North and Australia East?

Use the [Azure Pricing Calculator](https://azure.microsoft.com/en-us/pricing/calculator/) to estimate and compare costs across regions:

1. Go to [https://azure.microsoft.com/en-us/pricing/calculator/](https://azure.microsoft.com/en-us/pricing/calculator/)
2. Click **Add items** and select the product you want to price (e.g., **Virtual Machines**, **App Service**, **SQL Database**)
3. In the product card, find the **Region** dropdown and select **New Zealand North**
4. Configure the SKU, tier, instance count, and hours/month to match your workload
5. Note the estimated monthly cost
6. Change the **Region** dropdown to **Australia East** and compare
7. Repeat for each product in your workload

> **Tips:**
> - You can add multiple product cards to a single estimate to model an entire workload
> - Use **Save** or **Export** to share the estimate with stakeholders
> - The calculator shows list prices — actual costs may differ if you have Enterprise Agreements, reservations, or hybrid benefit entitlements
> - Currency defaults to USD; use the **Currency** dropdown at the top of the page to switch to NZD if needed

---

### Where can I find the most up-to-date information?

| Resource | Link |
|----------|------|
| Azure Products by Region | [azure.microsoft.com/products-by-region](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/) |
| NZ Cloud Region Playbook | [Microsoft Customer Playbook (PDF)](https://info.microsoft.com/rs/157-GQE-382/images/EN-CNTNT-eBook-SRGCM12351.pdf) |
| Azure Compliance | [learn.microsoft.com/azure/compliance](https://learn.microsoft.com/en-us/azure/compliance/) |
| Region Comparison (third-party) | [azurecharts.com/regions](https://azurecharts.com/regions) |
| Latency Testing (third-party) | [luke.geek.nz](https://luke.geek.nz/azure/nz-north-latency-testing/) |

---

*This document is shared for discussion purposes only and does not constitute a binding commitment or commercial offer. Verify details against Microsoft's official documentation before making compliance or procurement decisions.*

---

## Related pages

- [Azure NZ North — Region Dossier](/nz-cloud-region) — available services, service rings, DR architecture, compliance, pricing
- [Data Residency — Summary](/data-residency-summary) — one-page overview of data residency and sovereignty options
- [Data Residency — Detail](/data-residency-detail) — full breakdown of M365, Azure, sovereignty controls, and legal considerations
- [Data Residency — FAQ](/data-residency-faq) — common questions about data residency and sovereignty
