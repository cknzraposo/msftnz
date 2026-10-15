---
title: "Azure New Zealand North — Start Here"
description: "A Microsoft-source-backed guide to the Azure New Zealand North region, service availability, resilience, and data location for New Zealand organisations."
date: 2026-03-09
lastmod: 2026-10-16
verifiedOn: 2026-10-16
reviewBy: 2027-01-14
author: "Chandima Kulathilake"
tags: ["azure", "new-zealand-north", "cloud-region", "services", "compliance", "disaster-recovery"]
category: "Cloud Infrastructure"
slug: "nz-cloud-region"
layout: "page"
draft: true
disclaimers:
  - "legal-compliance"
  - "not-legal-advice"
related:
  - "/cloud-faq"
  - "/service-availability"
  - "/data-residency-summary"
  - "/data-residency-detail"
  - "/decisions-to-make"
---

# Azure New Zealand North — Start Here

---

*This document is shared for discussion purposes only. It does not constitute a binding commitment or commercial offer. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

---

## Start here

- **Check whether a product is available:** use Microsoft's [Azure products by region](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/) catalogue and the product's own regional limits. Availability can differ by SKU, feature, deployment type, subscription, and capacity.
- **Check a workload already in use:** follow the [NZ North service availability verification guide](/service-availability). It explains what to confirm before treating a resource as deployable or migratable.
- **Plan resilience:** use the [disaster recovery guidance](#disaster-recovery-architecture) below. NZ North has no paired region; each service has its own replication and recovery options.
- **Check Microsoft 365 data location:** use the tenant-specific Data Location card in the Microsoft 365 admin centre and Microsoft's [service data location documentation](https://learn.microsoft.com/en-us/microsoft-365/enterprise/o365-data-locations).
- **Compare residency and governance options:** see the [data residency summary](/data-residency-summary), [detailed guide](/data-residency-detail), and [decision framework](/decisions-to-make).

## Region Overview

| Attribute | Detail |
|-----------|--------|
| **Region name** | New Zealand North |
| **Azure region identifier** | `newzealandnorth` |
| **Location** | Auckland, Aotearoa New Zealand |
| **Opened** | December 2024 ([Microsoft announcement](https://news.microsoft.com/en-nz/2024/12/12/new-zealands-first-hyperscale-cloud-is-open-for-business/)) |
| **Availability zones** | 3. This is a region-level capability; individual services, SKUs, and features can have different zone support. Check Microsoft's [availability-zone service support](https://learn.microsoft.com/en-us/azure/reliability/availability-zones-service-support). |
| **Paired region** | None. Microsoft lists New Zealand North as a nonpaired region. |
| **Energy** | Microsoft says the region is supported by a 10-year agreement for renewable attributes from Contact Energy's Te Huka 3 geothermal station. This is not a claim that the facility is physically supplied only by a particular generation source. |

---

## Service availability

Microsoft groups services as foundational, mainstream, or strategic. These categories describe Microsoft's general regional deployment policy; they are not a live catalogue or a guarantee that a particular feature, SKU, model, or quota is available.

| Category | Microsoft's general policy |
|----------|-----------------------------|
| **Foundational** | Available in recommended and alternate regions when the region is generally available, or within 90 days after a new foundational service becomes generally available. |
| **Mainstream** | Available in recommended regions within 90 days of region general availability. Availability in alternate regions is demand-driven. |
| **Strategic** | Targeted offerings, often industry-specific or dependent on specialised hardware; availability is demand-driven. |

Categories can change over time. A category does not establish the availability of every service configuration in New Zealand North. Verify the exact product in [Azure products by region](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/) and the relevant product documentation before committing to an architecture.

---

## Disaster Recovery Architecture

New Zealand North is a **nonpaired region**. A paired region is not required for every multi-region design: some services support replication between customer-selected regions, while others need a separate deployment and recovery process. Plan and test recovery for each service against its documented capabilities and your recovery objectives.

### Availability zones

- Use zones only where the specific service and SKU support them. Review Microsoft's [availability-zone service support](https://learn.microsoft.com/en-us/azure/reliability/availability-zones-service-support).
- Zone-redundant designs can help withstand some datacentre or zone failures. They do not, by themselves, provide recovery from a region-wide outage.
- Confirm the application's failover behaviour, dependencies, capacity, recovery time objective, and recovery point objective.

### Cross-region recovery

- Choose a secondary region only after checking support for the service, SKU, replication mode, and recovery workflow. Australia East may be an option for some architectures; it is not a universal or automatically configured target.
- For Azure Storage, the secondary region used by GRS is determined by the primary region's Microsoft-defined pairing and cannot be selected by the customer. New Zealand North is nonpaired. Check the current [Azure Storage redundancy documentation](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy) and regional support before selecting a redundancy option; do not assume Australia East can be chosen as a GRS target.
- Other services may support replication to a customer-selected region, service-native backup, or a separately deployed recovery environment. Follow that service's reliability guide and test the full recovery process.
- Cross-border replication or failover can move or expose data outside New Zealand. Assess the data-location implications, contractual requirements, egress charges, latency, and operational dependencies.

### Recovery planning checklist

1. Define business-approved recovery time and recovery point objectives for each workload.
2. Identify service-specific zone and cross-region recovery options from Microsoft documentation.
3. Document what data is replicated, where it is stored, and how failover is initiated.
4. Confirm quotas, capacity, identity, networking, DNS, and dependencies in the recovery region.
5. Run recovery exercises and record the actual results.

---

## Compliance and assurance

Do not treat a region name, a Microsoft compliance page, or a certification label as evidence that every Azure service in New Zealand North is in scope. Check the current Microsoft compliance documentation and Service Trust Portal reports for the exact service, region, boundary, assessment period, and customer responsibilities.

- [Microsoft Azure compliance documentation](https://learn.microsoft.com/en-us/azure/compliance/)
- [Microsoft Service Trust Portal](https://servicetrust.microsoft.com/)
- [New Zealand Information Security Manual (NZISM)](https://nzism.gcsb.govt.nz/)

An Australian government assessment such as IRAP is not, by itself, evidence of an assessment of New Zealand North. Organisations remain responsible for their own risk assessment, assurance, and authorisation decisions.

### Māori Data Sovereignty

Physical data location alone does not establish appropriate governance of data about Māori. Organisations should engage the people and communities concerned and consider [Te Mana Raraunga](https://www.temanararaunga.maori.nz/) principles and Te Tiriti o Waitangi obligations when defining stewardship, access, permitted use, and accountability.

---

## Connectivity and performance

Check the current [Azure products by region](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/) catalogue and [ExpressRoute documentation](https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction) for service and peering availability. ExpressRoute connectivity depends on the selected peering location, circuit provider, and network design; it does not guarantee a specific end-to-end latency or performance outcome.

Measure latency and throughput from the locations and networks your users and workloads will actually use. Treat third-party measurements as observations for their test conditions, not Microsoft service commitments.

---

## Key References

- [Azure regions list](https://learn.microsoft.com/en-us/azure/reliability/regions-list) — region identifiers, locations, paired regions, and zone support
- [Azure regions and nonpaired regions](https://learn.microsoft.com/en-us/azure/reliability/regions-paired) — region-pair guidance
- [Available services by region type and category](https://learn.microsoft.com/en-us/azure/reliability/availability-service-by-category) — general service deployment policy
- [Azure products by region](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/) — current regional product availability
- [Azure Storage redundancy](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy) — storage redundancy options and secondary-region behaviour
- [Azure reliability guidance](https://learn.microsoft.com/en-us/azure/reliability/overview-reliability-guidance) — service-specific resiliency information
- [Microsoft New Zealand region announcement](https://news.microsoft.com/en-nz/2024/12/12/new-zealands-first-hyperscale-cloud-is-open-for-business/) — launch and sustainability statements

---

## Related pages

- [Cloud Residency, Sovereignty, and NZ North — FAQ](/cloud-faq) — common questions about region capabilities and compliance
- [NZ North Service Availability — Verification Guide](/service-availability) — how to confirm service and workload support
- [Data Residency — Summary](/data-residency-summary) — one-page overview of data residency and sovereignty options
- [Data Residency — Detail](/data-residency-detail) — full breakdown of M365, Azure, sovereignty controls, and legal considerations
- [Data Residency vs Data Sovereignty — Decisions to Make](/decisions-to-make) — trade-offs and decision framework for leaders
