---
title: "Azure New Zealand North — Cloud Region Dossier"
description: "A comprehensive dossier of the Azure New Zealand North region including available services, service rings, disaster recovery, compliance, latency, and pricing."
date: 2026-03-09
lastmod: 2026-03-09
author: "Chandima Kulathilake"
tags: ["azure", "new-zealand-north", "cloud-region", "services", "compliance", "disaster-recovery", "pricing"]
category: "Cloud Infrastructure"
slug: "nz-cloud-region"
layout: "page"
draft: true
related:
  - "/nz-cloud-region-faq"
  - "/data-residency-summary"
  - "/data-residency-detail"
  - "/data-residency-faq"
---

# Azure New Zealand North — Cloud Region Dossier

---

*This document is shared for discussion purposes only. It does not constitute a binding commitment or commercial offer. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

---

## Region Overview

| Attribute | Detail |
|-----------|--------|
| **Region name** | New Zealand North |
| **Location** | Auckland, Aotearoa New Zealand |
| **Launched** | December 2024 |
| **Availability Zones** | 3 (sub-2ms inter-zone latency) |
| **Paired region** | None — customers must architect their own DR strategy |
| **Recommended DR target** | Australia East (Sydney), ~30–40ms latency |
| **Energy** | 100% renewable (solar, wind, hydro) |
| **ExpressRoute** | Supported — private, dedicated connectivity to Auckland DCs |
| **Global backbone** | Connected to Microsoft's global WAN |

---

## Service Rings — How Azure Rolls Out Services

Azure categorises every service into one of three deployment rings. These determine how quickly a service appears in a new region like NZ North.

| Ring | What it means | Deployment commitment | Examples |
|------|--------------|----------------------|----------|
| **Foundational** | Essential, widely used, stable services that form the base of any cloud deployment | Deployed to all recommended regions within 90 days of region GA, or at region launch | Virtual Machines, Blob Storage, Virtual Network, Azure Key Vault |
| **Mainstream** | Broadly adopted services with wide appeal | Deployed to all recommended regions within 90 days of region GA; alternate regions are demand-driven | Azure Functions, AKS, Cosmos DB, Azure SQL Database |
| **Strategic** (formerly Specialized) | Niche, industry-focused, or hardware-dependent services; may be early-stage or have specific constraints | Demand-driven — starts in select regions, expands based on customer need | Azure OpenAI Service, Quantum Computing, some IoT services |

Services typically progress from Strategic → Mainstream → Foundational as adoption grows. NZ North is a **recommended region**, so it receives Foundational and Mainstream services as a priority.

---

## Disaster Recovery Architecture

Since NZ North has **no paired region**, you need to design your own DR strategy.

### Option 1: Zone-to-zone (within NZ North)

- Use availability zones for high availability within Auckland
- Sub-2ms latency between zones
- Protects against single-DC failure
- Does not protect against region-wide events

### Option 2: Region-to-region (NZ North → Australia East)

- Use Azure Site Recovery for VM replication
- Use geo-redundant storage (GRS) — select Australia East as the replication target
- ~30–40ms latency Auckland ↔ Sydney
- Protects against region-wide events but data leaves NZ

### Recommended approach

Combine both: zone-redundant deployments within NZ North for HA, with Australia East as a DR target for business continuity. Ensure this architecture aligns with your data residency obligations — if data cannot leave NZ under any circumstances, zone-to-zone DR within NZ North is the only option.

---

## Compliance and Certifications

| Certification | Scope |
|---------------|-------|
| SOC 1, SOC 2, SOC 3 | Security, availability, processing integrity, confidentiality |
| ISO/IEC 27001 | Information security management |
| ISO/IEC 27017 | Cloud security controls |
| ISO/IEC 27018 | Cloud privacy |
| ISO 9001 | Quality management |
| PCI-DSS | Payment card industry |
| IRAP (PROTECTED) | Australian government security benchmark — widely referenced in NZ |
| NZISM alignment | New Zealand Information Security Manual |

### Māori Data Sovereignty

Microsoft has committed to working with Māori communities on data governance, aligning with the principles of Te Mana Raraunga (the Māori Data Sovereignty Network). This includes co-design with iwi and Māori organisations for governance oversight. Frameworks are being formalised — engage with Microsoft NZ for current status and partnership details.

---

## Connectivity and Latency

| Route | Expected latency |
|-------|-----------------|
| Within NZ North (AZ-to-AZ) | < 2ms |
| NZ North ↔ Australia East | ~30–40ms |
| NZ North ↔ Southeast Asia | ~120–150ms |
| NZ North ↔ US West | ~150–180ms |

**ExpressRoute** is available for private, dedicated connectivity from on-premises to the Auckland data centres. This bypasses the public internet, providing lower latency and higher security for hybrid deployments.

---

## Key References

- [Azure Products by Region](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/) — live service availability
- [Azure Region Pairs and DR](https://learn.microsoft.com/en-us/azure/reliability/regions-paired) — disaster recovery guidance
- [NZ Cloud Region Customer Playbook](https://info.microsoft.com/rs/157-GQE-382/images/EN-CNTNT-eBook-SRGCM12351.pdf) — Microsoft's planning guide
- [Azure Compliance Documentation](https://learn.microsoft.com/en-us/azure/compliance/) — certifications and standards
- [AzureCharts Region Scope](https://azurecharts.com/regions) — third-party service comparison tool
- [NZ North Latency Testing](https://luke.geek.nz/azure/nz-north-latency-testing/) — independent latency benchmarks

---

## Related pages

- [Azure NZ North — FAQ](/nz-cloud-region-faq) — common questions about the New Zealand North region
- [Data Residency — Summary](/data-residency-summary) — one-page overview of data residency and sovereignty options
- [Data Residency — Detail](/data-residency-detail) — full breakdown of M365, Azure, sovereignty controls, and legal considerations
- [Data Residency — FAQ](/data-residency-faq) — common questions about data residency and sovereignty
