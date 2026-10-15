---
title: "NZ North Service Availability — Verification Guide"
description: "A practical guide for checking whether an Azure service, SKU, feature, and deployment type is currently supported in New Zealand North."
date: 2026-03-09
lastmod: 2026-10-16
verifiedOn: 2026-10-16
reviewBy: 2027-01-14
author: "Chandima Kulathilake"
tags: ["azure", "new-zealand-north", "service-availability", "architecture"]
category: "Cloud Infrastructure"
slug: "service-availability"
layout: "page"
draft: true
disclaimers:
  - "legal-compliance"
  - "not-legal-advice"
related:
  - "/nz-cloud-region"
  - "/cloud-faq"
  - "/data-residency-summary"
  - "/decisions-to-make"
---

# NZ North Service Availability — Verification Guide

---

*This guide is for planning, not a deployment or migration commitment. Availability changes, and a regional listing does not guarantee that every SKU, feature, capacity, or subscription is available to your workload.*

---

## Start with the exact deployment

Azure availability is not a simple yes/no attribute of a product name. Before approving a design or migration, verify all of the following for the target **New Zealand North** region:

1. **Service and resource provider** — identify the exact Azure service and resource type, rather than relying on a broad inventory label.
2. **SKU and hardware** — check the required tier, VM family, accelerator, storage type, database configuration, and quota.
3. **Feature and deployment type** — confirm that the specific feature, model, API version, and deployment option is supported in that region.
4. **Availability zones** — verify the service's zone support separately; three zones in the region does not mean every service is zone-enabled.
5. **Capacity and access** — check subscription eligibility, quota, capacity, preview requirements, and any service-specific restrictions in the portal or with Microsoft.
6. **Data handling** — distinguish the resource's deployment region from where its data is stored, replicated, backed up, or processed.
7. **Migration and recovery** — confirm whether the resource can be moved, must be redeployed, or needs a service-specific export, replication, or recovery procedure.

## Authoritative sources

- [Azure products by region](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/) — use the current regional catalogue to search for a service. Check the service's own documentation for SKU, feature, and deployment-type limits.
- [Azure regions list](https://learn.microsoft.com/en-us/azure/reliability/regions-list) — confirm the region identifier, physical location, pairing, and zone support.
- [Availability-zone support by service](https://learn.microsoft.com/en-us/azure/reliability/availability-zones-service-support) — check whether a service and its features support zones in the target region.
- **Azure portal** — confirm the actual SKU, quota, subscription, and capacity available to your workload at the time of deployment.
- **Microsoft service documentation and release notes** — check preview status, feature exclusions, and service-specific deployment or migration requirements.

If these sources do not establish support for the exact configuration, mark it **unconfirmed** and get confirmation before making a production commitment. A missing listing is not, on its own, proof that a service is unavailable.

## Examples of why a product-name check is not enough

### Azure File Sync

Microsoft's [Azure Files and Azure File Sync release notes](https://learn.microsoft.com/en-us/azure/storage/files/files-whats-new) list New Zealand North as a region where Azure File Sync became available in the fourth quarter of 2025. Use the current region list and service prerequisites to confirm support for the exact deployment.

### Microsoft Fabric

Microsoft's [Fabric region availability table](https://learn.microsoft.com/en-us/fabric/admin/region-availability) lists New Zealand North for Power BI and Fabric workloads. The table also identifies feature exceptions; for example, Fabric App (preview) is listed as unavailable in the region. Check the specific workload and feature rather than treating the overall Fabric listing as universal support.

### Azure AI models and inference

Model availability and data processing depend on the model, deployment type, and region. Microsoft's [deployment types documentation](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/deployment-types) distinguishes regional, data-zone, and global processing. A resource deployed in a region does not, by itself, prove that inference processing is restricted to that country. Verify the current model/region matrix and the processing location required by your design.

## Keep a reviewable evidence record

For each workload, record the verification date and the evidence used:

| Field | Record |
|-------|--------|
| Service and resource type | Exact Azure product and resource provider |
| Region | `newzealandnorth` |
| SKU and features | Tier, hardware, model, feature, and deployment type |
| Availability evidence | Microsoft source URL and relevant page/table or portal check |
| Capacity and eligibility | Subscription, quota, capacity, preview, and access checks |
| Data handling | Storage, replication, backup, and processing locations |
| Migration and recovery | Supported migration path, dependencies, and tested recovery steps |
| Verified on / review by | Date evidence was checked and the next review date |

Recheck before procurement, architecture approval, production deployment, or migration. For an existing estate, build the service list from a fresh inventory and assess each resource against the actual configuration. Do not use an old resource count or a general region catalogue as proof that a workload is ready to move.

## Related pages

- [Azure New Zealand North — Start Here](/nz-cloud-region) — region facts, resilience, and the next steps
- [Cloud Residency, Sovereignty, and NZ North — FAQ](/cloud-faq) — common New Zealand cloud questions
- [Data Residency & Data Sovereignty — Summary](/data-residency-summary) — short comparison of options
- [Data Residency vs Data Sovereignty — Decisions to Make](/decisions-to-make) — questions and trade-offs for decision-makers
