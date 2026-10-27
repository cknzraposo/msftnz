---
title: "Getting Started with Azure App Service — A Guide for New Zealand Organisations"
description: "A plain-language introduction to Azure App Service: what it is, how it works, key features, pricing tiers, and what New Zealand organisations need to know before adopting it."
date: 2026-05-04
lastmod: 2026-10-16
author: "Chandima Kulathilake"
tags: ["azure", "app-service", "web-apps", "paas", "new-zealand", "hosting", "devops"]
category: "App Services"
slug: "getting-started"
layout: "page"
draft: true
related: []
---

# Getting Started with Azure App Service

---

*This document is shared for discussion purposes only. It does not constitute a binding commitment or commercial offer.*

---

## What is Azure App Service?

Azure App Service is a fully managed platform-as-a-service (PaaS) for building, deploying, and scaling web applications. You bring the code; Azure manages the infrastructure — servers, patching, load balancing, and runtime maintenance.

**What you can host:**
- **Web apps** — any HTTP-based application
- **REST APIs** — backend services consumed by mobile, web, or IoT clients
- **Mobile backends** — data sync, push notifications, authentication
- **Scheduled jobs** — via WebJobs, for background processing

**Supported runtimes out of the box:** .NET, Node.js, Python, Java, PHP, Ruby, and custom containers (Linux only).

---

## Why it matters for New Zealand organisations

Before Azure's New Zealand North region launched in December 2024, organisations commonly deployed Azure workloads in Australia. A New Zealand region now provides a local deployment option for services and configurations supported there.

For App Service, verify the required plan, feature, and availability in your subscription using Microsoft's [Azure products by region](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/) catalogue and the [NZ North service availability guide](/service-availability).

| Consideration | Before NZ North | With NZ North |
|---|---|---|
| **Deployment location** | Azure services deployed in an available Australian region | App Service can be considered where the required plan and features are available in NZ North |
| **Latency** | Measure from the users and networks that matter | Measure from the users and networks that matter; region choice is not a latency guarantee |
| **Data location** | Check the selected service and its dependencies | Check App Service, application data, monitoring, backup, and dependencies separately |
| **Regulatory assessment** | Assess the requirements for the workload | A local region may support data-location requirements but does not by itself establish compliance |

Microsoft classifies App Service as a [mainstream service](https://learn.microsoft.com/en-us/azure/reliability/availability-service-by-category). This describes general regional deployment policy; it does not guarantee that every App Service plan, feature, quota, or capacity is available in New Zealand North.

---

## Core concepts

### App Service Plan

An App Service Plan defines the compute resources your apps run on. Think of it as the virtual machine tier that sits underneath your app. Multiple apps can share one plan; they share the same CPU and memory allocation.

| Tier | Use case | Key features |
|---|---|---|
| **Free / Shared** | Development and testing only | Shared infrastructure, no custom domains, no SLA |
| **Basic** | Dev/test with custom domains | Dedicated VMs, manual scaling, custom domains and SSL |
| **Standard** | Production workloads | Auto-scaling (up to 10 instances), traffic manager, deployment slots |
| **Premium v3** | High-scale production, compliance | Up to 30 instances, VNet integration, Private Endpoints, zone redundancy |
| **Isolated v2** | Highest isolation and compliance | Runs in a dedicated Azure Virtual Network (App Service Environment) |

For most New Zealand enterprise or government workloads, **Standard** or **Premium v3** is the appropriate starting point. Isolated v2 is relevant where strict network segregation is required.

### Deployment slots

Standard tier and above support **deployment slots** — additional named environments (e.g., staging, UAT) that run alongside your production slot. Swapping slots can reduce deployment downtime, but application warm-up, session state, dependencies, and swap settings affect the result; test the process for your app.

### Scaling

App Service supports two scaling models:

- **Scale up** — move to a larger VM tier (more CPU, RAM)
- **Scale out** — add more instances of your app running in parallel

Auto-scale rules can be based on CPU, memory, HTTP request queue length, or a custom metric from Azure Monitor. This is configured at the App Service Plan level.

---

## Networking and security

### VNet Integration

Premium v3 plans support outbound VNet Integration, allowing your app to reach resources in a private Azure Virtual Network — such as a database, internal API, or on-premises system connected via VPN or ExpressRoute — without exposing those resources to the internet.

### Private Endpoints

Private Endpoints provide inbound access to your app through a private IP address in a Virtual Network. Configure the app's public network access and access restrictions separately if it must not be reachable through its public endpoint.

### Managed Identity

App Service natively supports **managed identities** — your app gets an Azure AD identity automatically, without storing credentials in configuration. Use this to authenticate against Azure Key Vault, Azure SQL, Azure Storage, and other services without secrets in your code or environment variables.

### Authentication / Authorisation (Easy Auth)

Built-in authentication middleware can be enabled without writing any auth code. It supports:
- Microsoft Entra ID (Azure AD)
- GitHub
- Google
- Facebook
- Any OpenID Connect–compliant provider

For New Zealand government and enterprise, Entra ID integration is the standard choice — it connects directly to your organisation's identity.

---

## Deployment options

| Method | Best for |
|---|---|
| **GitHub Actions** | CI/CD from a GitHub repository — recommended default |
| **Azure DevOps Pipelines** | Teams already using Azure DevOps |
| **Azure CLI / `az webapp deploy`** | Scripted or local deployments |
| **VS Code Extension** | Developer quick-deploy during development |
| **Container registry** | Apps packaged as Docker images |
| **Zip deploy** | Lightweight deploys without a pipeline |

The most common pattern for a new project is to connect a GitHub repository to App Service via GitHub Actions. Azure can generate the workflow file automatically when you create the app.

---

## Monitoring and observability

App Service integrates with **Azure Monitor** and **Application Insights**. Enable Application Insights to get:

- Request rates, failure rates, and response times
- Dependency tracking (calls to databases, external APIs)
- Live Metrics Stream for real-time visibility
- Custom events and telemetry from your code
- Availability tests (outside-in pings to verify uptime)

Logs are available through **Log Analytics Workspace** and can be queried with Kusto Query Language (KQL). You can set up alerts for error spikes, latency thresholds, or instance count limits.

---

## Data residency in the NZ North region

If the required App Service plan and features are available to your subscription in `newzealandnorth`, you can deploy the plan and app there. Check the data handling of each related resource separately:

- **Application code and runtime** — the app runs with the plan in its selected region; review service documentation and deployment dependencies.
- **Application data and files** — choose supported data services and regions separately; app code location does not place connected databases or storage automatically.
- **Logs and telemetry** — select supported locations for Application Insights and Log Analytics, then check each service's data-location documentation and any cross-region processing.
- **Backups** — check the backup feature's supported storage, redundancy, and secondary-region behaviour before relying on a data-location assumption.

New Zealand North has no paired region. If you design recovery in another region, confirm App Service and dependency support, the recovery process, and where replicated or backed-up data is stored. Document any cross-border data flows if location is a requirement.

---

## Pricing guidance

App Service is billed per App Service Plan, not per app. You can host multiple apps on one plan at no additional per-app cost. Key cost drivers:

- **Tier** — the largest single factor; Premium v3 costs significantly more than Standard
- **Instance size** — CPU/RAM configuration within the tier
- **Instance count** — auto-scaling increases instance count during peak load
- **Region** — NZ North pricing may vary slightly from Australia East; check the [Azure Pricing Calculator](https://azure.microsoft.com/en-au/pricing/calculator/) for current NZ North rates
- **Bandwidth** — outbound data transfer is charged beyond free tier thresholds

**Cost management tips:**
- Use the **Free or Basic tier** for non-production environments; stop or delete them when not in use
- Set **spending alerts** in Azure Cost Management before go-live
- Consider **Reserved Instances** for stable production workloads — up to 55% discount with a 1- or 3-year commitment

---

## Common architecture patterns

### Simple web app + managed database

```
Browser → App Service (Standard, NZ North)
              ↓
        Azure SQL Database (NZ North)
              ↓
        Azure Key Vault (secrets)
```

### Private API backend

```
Frontend (SPA or mobile) → API Management (NZ North)
                                ↓
                      App Service (Premium v3, Private Endpoint)
                                ↓
                      Azure SQL / Cosmos DB (VNet)
```

### Containerised app with CI/CD

```
GitHub repo → GitHub Actions → Azure Container Registry
                                        ↓
                              App Service (Linux, container)
                                        ↓
                              Application Insights + Log Analytics
```

---

## Getting started — next steps

1. **Check regional support and quota** for the App Service plan and features your workload needs
2. **Create an App Service Plan** in `newzealandnorth` if the required configuration is available and appropriate
3. **Create a Web App** under that plan, selecting your runtime or container
4. **Connect your repository** via GitHub Actions or Azure DevOps for automated deployments
5. **Enable a Managed Identity** and wire it to Key Vault for secrets management
6. **Enable Application Insights** and select supported locations for telemetry resources
7. **Define your scaling rules** before go-live based on expected traffic patterns
8. **Review your networking model** — if the app handles sensitive data, evaluate VNet Integration, Private Endpoints, and public network access settings

---

## Further reading

- [Azure App Service documentation](https://learn.microsoft.com/en-us/azure/app-service/)
- [App Service pricing](https://azure.microsoft.com/en-au/pricing/details/app-service/windows/)
- [Azure New Zealand North — Start Here](/nz-cloud-region)
- [NZ North Service Availability — Verification Guide](/service-availability)
- [App Service networking features](https://learn.microsoft.com/en-us/azure/app-service/networking-features)
- [Deploy to App Service using GitHub Actions](https://learn.microsoft.com/en-us/azure/app-service/deploy-github-actions)
- [Application Insights overview](https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview)
