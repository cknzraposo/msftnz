---
title: "Azure Services in Use — NZ North Availability Assessment"
description: "A service-by-service assessment of Azure resources currently deployed, comparing availability across Australia East, New Zealand North, and Global, with migration readiness notes."
date: 2026-03-09
lastmod: 2026-03-09
author: "NA"
tags: ["azure", "new-zealand-north", "australia-east", "service-availability", "migration"]
category: "Cloud Infrastructure"
slug: "service-availability"
layout: "page"
draft: true
related:
  - "/nz-cloud-region"
  - "/nz-cloud-region-faq"
  - "/data-residency-summary"
  - "/decisions-to-make"
---

# Azure Services in Use — NZ North Availability Assessment

---

*This document is shared for discussion purposes only. It does not constitute a binding commitment or commercial offer. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

---

## Purpose

This document maps every Azure service currently deployed in the environment against its availability in the **New Zealand North** region. It is intended to support planning for workload migration from Australia East to NZ North by identifying which services can move today, which have caveats, and which cannot move yet.

**Source data:** Azure Resource Graph export (October 2025).

**Important:** Service availability changes regularly. Always verify against the official [Azure Products by Region](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/) page before making deployment decisions.

---

## Summary

| Status | Services | Resources |
|--------|----------|-----------|
| ✅ Available in NZ North | 28 | 3,539 |
| ✅* Available with caveats | 1 | 7 |
| ⏳ Expected soon | 2 | 8 |
| ❌ Not available (strategic/deprecated) | 4 | 19 |
| 🌐 Global service (region not applicable) | 5 | 63 |
| ❓ Requires clarification | 3 | 102 |
| **Total** | **43** | **3,738** |

**Key finding:** ~95% of deployed resources (by count) are services that are available in NZ North today.

---

## ✅ Available in NZ North

These services are generally available in NZ North and can be deployed or migrated. They represent the vast majority of the current footprint.

| Service | Description | Current Region | Resources | Official Docs |
|---------|-------------|----------------|-----------|---------------|
| Azure API Management | Publish, secure, and analyse APIs | Australia East | 7 | [Docs](https://learn.microsoft.com/en-us/azure/api-management/api-management-key-concepts) |
| Azure App Service | Web apps, API apps, mobile backends | Australia East | 103 | [Docs](https://learn.microsoft.com/en-us/azure/app-service/overview) |
| Azure Arc-enabled Servers | Manage on-premises servers in Azure | Australia East | 444 | [Docs](https://learn.microsoft.com/en-us/azure/azure-arc/servers/overview) |
| Azure Backup | Backup and disaster recovery | Australia East | 1 | [Docs](https://learn.microsoft.com/en-us/azure/backup/backup-overview) |
| Azure Backup & Site Recovery | Backup and DR orchestration | Australia East | 10 | [Docs](https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-overview) |
| Azure CDN | Content delivery network | Australia East, Global | 33 | [Docs](https://learn.microsoft.com/en-us/azure/cdn/cdn-overview) |
| Azure Cache for Redis | In-memory data store and cache | Australia East | 7 | [Docs](https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/cache-overview) |
| Azure Compute | Virtual machines and scale sets | Australia East, AU Southeast | 1,149 | [Docs](https://learn.microsoft.com/en-us/azure/virtual-machines/overview) |
| Azure Container Registry | Private Docker container registry | Australia East | 18 | [Docs](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-intro) |
| Azure Cosmos DB | Globally distributed NoSQL database | Australia East | 2 | [Docs](https://learn.microsoft.com/en-us/azure/cosmos-db/introduction) |
| Azure Data Factory | Cloud data integration service | Australia East | 21 | [Docs](https://learn.microsoft.com/en-us/azure/data-factory/introduction) |
| Azure Database for MySQL | Managed MySQL database | Australia East | 1 | [Docs](https://learn.microsoft.com/en-us/azure/mysql/single-server/overview) |
| Azure Database for PostgreSQL | Managed PostgreSQL database | Australia East | 4 | [Docs](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/overview) |
| Azure Event Grid | Event routing for reactive apps | Australia East | 44 | [Docs](https://learn.microsoft.com/en-us/azure/event-grid/overview) |
| Azure Key Vault | Secrets, keys, and certificate management | Australia East | 81 | [Docs](https://learn.microsoft.com/en-us/azure/key-vault/general/overview) |
| Azure Kubernetes Service (AKS) | Managed Kubernetes clusters | Australia East | 4 | [Docs](https://learn.microsoft.com/en-us/azure/aks/what-is-aks) |
| Azure Log Analytics | Log data collection and analysis | Australia East, AU Southeast | 61 | [Docs](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-overview) |
| Azure Logic Apps | Workflow automation (no-code) | Australia East | 30 | [Docs](https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-overview) |
| Azure Maintenance | Planned maintenance control | Australia East | 5 | [Docs](https://learn.microsoft.com/en-us/azure/virtual-machines/maintenance-configurations) |
| Azure Managed Identities | Identity for Azure resources | Australia East, AU Southeast | 78 | [Docs](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview) |
| Azure Migrate | Discover, assess, migrate workloads | Australia East | 3 | [Docs](https://learn.microsoft.com/en-us/azure/migrate/migrate-services-overview) |
| Azure Monitor | Monitoring and diagnostics platform | Australia East, Global | 837 | [Docs](https://learn.microsoft.com/en-us/azure/azure-monitor/overview) |
| Azure Network | VNets, load balancers, firewalls | AU East, AU Southeast, Global | 1,680 | [Docs](https://learn.microsoft.com/en-us/azure/networking/fundamentals/networking-overview) |
| Azure Portal Dashboards | Custom dashboards and reports | Australia East, Central US | 28 | [Docs](https://learn.microsoft.com/en-us/azure/azure-portal/azure-portal-dashboards) |
| Azure SQL Database | Managed relational database | Australia East | 76 | [Docs](https://learn.microsoft.com/en-us/azure/azure-sql/database/sql-database-paas-overview) |
| Azure SQL Virtual Machines | SQL Server on VMs | Australia East | 23 | [Docs](https://learn.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview) |
| Azure Service Bus | Enterprise messaging and relays | Australia East | 3 | [Docs](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview) |
| Azure Storage | Blob, file, queue, table storage | AU East, AU Southeast, SE Asia | 163 | [Docs](https://learn.microsoft.com/en-us/azure/storage/common/storage-introduction) |
| Microsoft App (Container Apps) | Containerised web apps | Australia East | 131 | [Docs](https://learn.microsoft.com/en-us/azure/container-apps/overview) |
| Microsoft Graph Services | Microsoft 365 data connectivity | Global | 1 | [Docs](https://learn.microsoft.com/en-us/graph/overview) |

---

## ✅* Available with caveats

These services are available in NZ North but with architectural considerations.

| Service | Description | Current Region | Resources | Caveat | Official Docs |
|---------|-------------|----------------|-----------|--------|---------------|
| Azure Virtual Desktop | Virtual desktop infrastructure | Australia East | 7 | Global service — connectivity is geo-deployed but host pools are region-specific. Host pools can be placed in NZ North; control plane remains global. | [Docs](https://learn.microsoft.com/en-us/azure/virtual-desktop/overview) |

---

## ⏳ Expected soon (not yet GA in NZ North)

These services are not yet generally available in NZ North but have published ETAs.

| Service | Description | Current Region | Resources | ETA | Official Docs |
|---------|-------------|----------------|-----------|-----|---------------|
| Azure File Sync | On-premises file server sync | Australia East | 5 | Q4 CY25 | [Docs](https://learn.microsoft.com/en-us/azure/storage/file-sync/file-sync-introduction) |
| Microsoft Fabric | End-to-end analytics solution | Australia East | 3 | Q4 CY25 | [Docs](https://learn.microsoft.com/en-us/fabric/get-started/microsoft-fabric-overview) |

> **Note:** These ETAs are based on information available as of October 2025 and may have changed. Verify current status with your Microsoft account team or the [Azure Products by Region](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/) page.

---

## ❌ Not available in NZ North

These services are not available in NZ North and are unlikely to become available due to strategic classification or deprecation.

| Service | Description | Current Region | Resources | Reason | Official Docs |
|---------|-------------|----------------|-----------|--------|---------------|
| Azure Automation | Process automation with runbooks | Australia East | 57 | Not available in NZ North. Consider [Azure Logic Apps](https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-overview) or [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview) as alternatives. | [Docs](https://learn.microsoft.com/en-us/azure/automation/overview) |
| Azure Databricks | Apache Spark-based analytics platform | Australia East | 8 | Strategic service — deployed to select regions based on demand. Remains in Australia East for now. | [Docs](https://learn.microsoft.com/en-us/azure/databricks/introduction/) |
| Azure DevTest Labs | Rapid dev/test environment provisioning | Australia East | 6 | Not being deployed to new regions. Consider [Microsoft Dev Box](https://learn.microsoft.com/en-us/azure/dev-box/overview-what-is-microsoft-dev-box) or [Azure Deployment Environments](https://learn.microsoft.com/en-us/azure/deployment-environments/overview-what-is-azure-deployment-environments) as alternatives. | [Docs](https://learn.microsoft.com/en-us/azure/devtest-labs/devtest-lab-overview) |
| Azure Migrate (Classic) | Legacy migration tools | Australia East | 2 | Deprecated. Use [Azure Migrate](https://learn.microsoft.com/en-us/azure/migrate/migrate-services-overview) (current version), which is available in NZ North. | [Docs](https://learn.microsoft.com/en-us/azure/migrate/migrate-services-overview) |

---

## 🌐 Global services (region not applicable)

These services operate globally or at the geo level. They are not tied to a specific Azure region, so the concept of "moving to NZ North" does not apply. Data handling varies by service.

| Service | Description | Current Region | Resources | Notes | Official Docs |
|---------|-------------|----------------|-----------|-------|---------------|
| Azure Active Directory B2C | Consumer identity and access management | Australia (geo) | 3 | Not a regional service. B2C is being deprecated in favour of [Microsoft Entra External ID](https://learn.microsoft.com/en-us/entra/external-id/customers/overview-customers-ciam). | [Docs](https://learn.microsoft.com/en-us/azure/active-directory-b2c/overview) |
| Azure Alerts Management | Centralised alert processing and routing | Global | 26 | Part of Azure Monitor — global service. | [Docs](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview) |
| Azure Communication Services | Voice, video, chat, SMS APIs | Global | 5 | Global service deployed to geos. | [Docs](https://learn.microsoft.com/en-us/azure/communication-services/overview) |
| Azure DevOps | CI/CD, boards, repos | Australia East | 2 | Global service deployed to geos. Data residency follows the organisation's geo selection. | [Docs](https://learn.microsoft.com/en-us/azure/devops/user-guide/what-is-azure-devops) |
| Azure SaaS Applications | Third-party SaaS resource references | Global | 1 | Marketplace references — requires clarification on which specific applications are in use. | [Docs](https://learn.microsoft.com/en-us/marketplace/azure-marketplace-overview) |

---

## ❓ Requires clarification

These services need further investigation to confirm NZ North availability or current usage.

| Service | Description | Current Region | Resources | Question | Official Docs |
|---------|-------------|----------------|-----------|----------|---------------|
| Azure Elastic | Elasticsearch-compatible search and analytics | Australia East | 2 | NZ North availability not confirmed in source data. Verify against [Azure Products by Region](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/). | [Docs](https://learn.microsoft.com/en-us/azure/partner-solutions/elastic/overview) |
| Azure Operations Management | IT operations suite | Australia East, AU Southeast | 99 | Likely refers to the legacy OMS, which has been superseded by [Azure Monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/overview). Confirm whether these resources have been migrated. | [Docs](https://learn.microsoft.com/en-us/azure/azure-monitor/overview) |
| Azure SaaS Applications | Third-party SaaS resource references | Global | 1 | Clarify which SaaS applications are referenced. Availability depends on the specific ISV. | [Docs](https://learn.microsoft.com/en-us/marketplace/azure-marketplace-overview) |

---

## Migration readiness snapshot

Based on this assessment, the environment's migration posture is:

```
  ✅ Ready to move          — 3,546 resources (95%)
  ⏳ Waiting on NZ North GA —     8 resources  (<1%)
  ❌ Must stay or rearchitect—    19 resources  (<1%)
  🌐 Global (no move needed) —    63 resources  (2%)
  ❓ Needs clarification     —   102 resources  (3%)
```

The vast majority of the footprint — including the largest consumers (Compute, Network, Monitor, Storage, Arc) — is ready for NZ North today.

Services that must remain in Australia East (Automation, Databricks) or that are deprecated (DevTest Labs, Migrate Classic) represent a small fraction of the estate. These should be evaluated individually for alternative approaches or accepted as cross-region dependencies.

---

*This document is shared for discussion purposes only. It does not constitute a binding commitment or commercial offer. Service availability is subject to change. Always verify against the official [Azure Products by Region](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/) page before making deployment or migration decisions.*

---

## Related pages

- [Azure NZ North — Region Dossier](/nz-cloud-region) — DR architecture, compliance, connectivity
- [Azure NZ North — FAQ](/nz-cloud-region-faq) — common questions about the region
- [Data Residency vs Sovereignty — Decisions to Make](/decisions-to-make) — trade-offs, risks, and alternatives
- [Data Residency — Summary](/data-residency-summary) — one-page overview of residency options
