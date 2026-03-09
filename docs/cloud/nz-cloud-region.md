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
| **Pricing** | ~5% premium over Australia East (compute); storage comparable |
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

## Available Services by Category

> Based on published availability as of early 2026. Always verify against the [Azure Products by Region](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/) tool for the latest status.

### Compute

| Service | Ring | Status |
|---------|------|--------|
| Virtual Machines | Foundational | ✅ GA |
| VM Scale Sets | Foundational | ✅ GA |
| Azure Kubernetes Service (AKS) | Mainstream | ✅ GA |
| Azure App Service | Foundational | ✅ GA |
| App Service Environments | Mainstream | ✅ GA |
| Azure Functions | Mainstream | ✅ GA |
| Azure Batch | Foundational | ✅ GA |
| Azure Virtual Desktop | Mainstream | ✅ GA |
| Azure Container Instances | Mainstream | ✅ GA |
| Windows 365 Cloud PC | Mainstream | ✅ GA (Feb 2026) |

### Networking

| Service | Ring | Status |
|---------|------|--------|
| Virtual Network (VNet) | Foundational | ✅ GA |
| Azure Load Balancer | Foundational | ✅ GA |
| Azure Application Gateway (incl. WAF) | Foundational | ✅ GA |
| Azure VPN Gateway | Foundational | ✅ GA |
| Azure ExpressRoute | Foundational | ✅ GA |
| Azure DNS | Foundational | ✅ GA |
| Azure Front Door | Mainstream | ✅ GA |
| Azure Firewall | Mainstream | ✅ GA |
| Azure Bastion | Mainstream | ✅ GA |
| Azure Private Link / Private Endpoint | Mainstream | ✅ GA |
| Azure DDoS Protection | Mainstream | ✅ GA |

### Storage

| Service | Ring | Status |
|---------|------|--------|
| Azure Blob Storage | Foundational | ✅ GA |
| Azure Files | Foundational | ✅ GA |
| Azure Queue / Table Storage | Foundational | ✅ GA |
| Managed Disks | Foundational | ✅ GA |
| Azure Data Lake Storage Gen2 | Mainstream | ✅ GA |
| Azure NetApp Files | Mainstream | ✅ GA |
| Azure Backup | Foundational | ✅ GA |

### Databases

| Service | Ring | Status |
|---------|------|--------|
| Azure SQL Database | Foundational | ✅ GA |
| Azure SQL Managed Instance | Mainstream | ✅ GA |
| Azure Database for PostgreSQL | Mainstream | ✅ GA |
| Azure Database for MySQL | Mainstream | ✅ GA |
| Azure Cosmos DB | Mainstream | ✅ GA |
| Azure Cache for Redis | Mainstream | ✅ GA |
| Azure Database Migration Service | Mainstream | ✅ GA |

### AI and Machine Learning

| Service | Ring | Status |
|---------|------|--------|
| Azure AI Services (Cognitive Services) | Mainstream | ✅ GA |
| Azure Machine Learning | Mainstream | ✅ GA |
| Azure Bot Service | Mainstream | ✅ GA |
| Azure AI Search | Mainstream | ✅ GA |
| Azure OpenAI Service | Strategic | ⚠️ Not yet GA in NZ North — use Australia East |

### Analytics

| Service | Ring | Status |
|---------|------|--------|
| Azure Synapse Analytics | Mainstream | ✅ GA |
| Azure Data Factory | Mainstream | ✅ GA |
| Azure Databricks | Mainstream | ✅ GA |
| Azure Stream Analytics | Mainstream | ✅ GA |
| Azure Data Explorer | Mainstream | ✅ GA |
| Power BI Embedded | Mainstream | ✅ GA |

### Security and Identity

| Service | Ring | Status |
|---------|------|--------|
| Microsoft Entra ID (Azure AD) | Foundational | ✅ GA |
| Azure Key Vault | Foundational | ✅ GA |
| Microsoft Defender for Cloud | Mainstream | ✅ GA |
| Microsoft Sentinel (SIEM) | Mainstream | ✅ GA |
| Azure Firewall | Mainstream | ✅ GA |
| Azure DDoS Protection | Mainstream | ✅ GA |
| Azure Policy | Foundational | ✅ GA |

### Integration

| Service | Ring | Status |
|---------|------|--------|
| Azure Logic Apps | Mainstream | ✅ GA |
| Azure Service Bus | Mainstream | ✅ GA |
| Azure Event Grid | Mainstream | ✅ GA |
| Azure API Management | Mainstream | ✅ GA |

### Management and Monitoring

| Service | Ring | Status |
|---------|------|--------|
| Azure Monitor | Foundational | ✅ GA |
| Log Analytics | Foundational | ✅ GA |
| Azure Automation | Mainstream | ✅ GA |
| Azure Advisor | Foundational | ✅ GA |
| Azure Resource Manager | Foundational | ✅ GA |
| Azure Update Manager | Mainstream | ✅ GA |

### Migration

| Service | Ring | Status |
|---------|------|--------|
| Azure Migrate | Mainstream | ✅ GA |
| Azure Site Recovery | Mainstream | ✅ GA |

### IoT

| Service | Ring | Status |
|---------|------|--------|
| Azure IoT Hub | Mainstream | ✅ GA |
| Azure IoT Central | Mainstream | ✅ GA |
| Azure IoT Edge | Mainstream | ✅ GA |

### DevOps

| Service | Ring | Status |
|---------|------|--------|
| Azure DevOps | Global | ✅ GA (global service, not region-bound) |
| Azure App Configuration | Mainstream | ✅ GA |

---

## Notable Gaps — Services Not Yet in NZ North

These services are available in Australia East but are not yet generally available in NZ North as of early 2026. Plan accordingly.

| Service | Category | Workaround |
|---------|----------|------------|
| **Azure OpenAI Service** | AI | Deploy in Australia East; ~30–40ms latency from NZ |
| **Azure HDInsight** | Analytics | Use Databricks or Synapse as alternatives in NZ North |
| **Azure DevTest Labs** | DevOps | Use standard VMs with automation |
| **Azure Lab Services** | DevOps | Not yet available — use Australia East |
| **Azure Spring Apps** | Compute | Use AKS or App Service |
| **Some Media Services** | Media | Deploy in Australia East |

> **Note:** This list evolves regularly. Some services may have launched since this document was written. Always check the [Azure Products by Region](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/) page.

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

## Pricing

NZ North carries an approximate **5% premium** over Australia East for compute services. Storage pricing is comparable. This varies by service type and VM SKU.

**Example — Linux VM pay-as-you-go pricing (USD/hour, March 2026, via [Azure Retail Prices API](https://prices.azure.com)):**

| SKU | NZ North | AU East | Premium |
|-----|----------|---------|---------|
| D2s v5 (2 vCPU, 8 GB) | $0.1260 | $0.1200 | 5.0% |
| D4s v5 (4 vCPU, 16 GB) | $0.2520 | $0.2400 | 5.0% |
| E2s v5 (2 vCPU, 16 GB) | $0.1590 | $0.1510 | 5.3% |
| B2s (2 vCPU, 4 GB) | $0.0554 | $0.0528 | 4.9% |
| App Service P1v3 (Linux) | $0.1932 | $0.1840 | 5.0% |
| Blob Storage Hot LRS (/GB) | $0.0200 | $0.0200 | 0.0% |

**Considerations:**

- The compute premium reflects newer infrastructure and smaller regional scale
- Weigh the cost against latency reduction, data residency compliance, and sovereignty requirements
- For cost-sensitive, non-regulated workloads, Australia East remains a viable option
- Use the [Azure Pricing Calculator](https://azure.microsoft.com/en-us/pricing/calculator/) to compare specific workloads
- Verify current prices using the methods below — pricing changes over time

### How to check Azure pricing yourself

There are three ways to obtain and compare Azure pricing for NZ North. Choose the one that fits your workflow.

#### Option 1 — Azure Pricing Calculator (browser)

Best for: estimating monthly costs for a specific workload.

1. Go to [https://azure.microsoft.com/en-us/pricing/calculator/](https://azure.microsoft.com/en-us/pricing/calculator/)
2. Add the product you want to price (e.g., **Virtual Machines**, **App Service**, **SQL Database**)
3. In the product card, set the **Region** dropdown to **New Zealand North**
4. Configure the SKU, tier, instance count, and hours/month
5. Note the estimated monthly cost
6. Change the **Region** to **Australia East** and compare
7. Export or print the estimate for stakeholder review

> **Tip:** You can add multiple products and regions to a single estimate to model an entire workload.

#### Option 2 — Azure Retail Prices REST API (no authentication required)

Best for: programmatic comparison, automation, or embedding pricing in reports.

The [Azure Retail Prices API](https://learn.microsoft.com/en-us/rest/api/cost-management/retail-prices/azure-retail-prices) is a free, public REST endpoint that returns current list prices. No Azure subscription or API key is needed.

**Base URL:**

```
https://prices.azure.com/api/retail/prices
```

**Step-by-step — compare a VM price between two regions:**

1. **Query NZ North pricing** — open this URL in a browser or call it from code:

   ```
   https://prices.azure.com/api/retail/prices?$filter=armRegionName eq 'newzealandnorth' and armSkuName eq 'Standard_D2s_v5' and priceType eq 'Consumption'
   ```

2. **Query Australia East pricing** — change the region:

   ```
   https://prices.azure.com/api/retail/prices?$filter=armRegionName eq 'australiaeast' and armSkuName eq 'Standard_D2s_v5' and priceType eq 'Consumption'
   ```

3. **Read the response** — the JSON contains an `Items` array. Look for the entry where:
   - `productName` does **not** contain "Windows" (for Linux pricing)
   - `meterName` does **not** contain "Spot" or "Low Priority" (for standard pay-as-you-go)
   - `type` is `Consumption`

   The `unitPrice` field is the hourly cost in USD.

4. **Calculate the premium:**

   ```
   premium % = ((NZ price − AU price) / AU price) × 100
   ```

**PowerShell example — compare multiple SKUs in one script:**

```powershell
$skus = @('Standard_D2s_v5', 'Standard_D4s_v5', 'Standard_B2s')

foreach ($sku in $skus) {
    $nz = (Invoke-RestMethod "https://prices.azure.com/api/retail/prices?`$filter=armRegionName eq 'newzealandnorth' and armSkuName eq '$sku' and priceType eq 'Consumption'").Items |
        Where-Object { $_.productName -notlike '*Windows*' -and $_.meterName -notlike '*Spot*' -and $_.meterName -notlike '*Low Priority*' } |
        Select-Object -First 1

    $au = (Invoke-RestMethod "https://prices.azure.com/api/retail/prices?`$filter=armRegionName eq 'australiaeast' and armSkuName eq '$sku' and priceType eq 'Consumption'").Items |
        Where-Object { $_.productName -notlike '*Windows*' -and $_.meterName -notlike '*Spot*' -and $_.meterName -notlike '*Low Priority*' } |
        Select-Object -First 1

    $premium = [math]::Round((($nz.unitPrice - $au.unitPrice) / $au.unitPrice) * 100, 1)
    Write-Host ("{0,-25} NZ: `${1:N4}  AU: `${2:N4}  Premium: {3}%" -f $sku, $nz.unitPrice, $au.unitPrice, $premium)
}
```

**Python example:**

```python
import requests

def get_price(region, sku):
    url = "https://prices.azure.com/api/retail/prices"
    params = {
        "$filter": f"armRegionName eq '{region}' and armSkuName eq '{sku}' and priceType eq 'Consumption'"
    }
    items = requests.get(url, params=params).json()["Items"]
    return next(
        i["unitPrice"] for i in items
        if "Windows" not in i["productName"]
        and "Spot" not in i["meterName"]
        and "Low Priority" not in i["meterName"]
    )

for sku in ["Standard_D2s_v5", "Standard_D4s_v5", "Standard_B2s"]:
    nz = get_price("newzealandnorth", sku)
    au = get_price("australiaeast", sku)
    print(f"{sku:<25} NZ: ${nz:.4f}  AU: ${au:.4f}  Premium: {((nz - au) / au) * 100:.1f}%")
```

**Useful filter parameters:**

| Parameter | Description | Example values |
|-----------|-------------|----------------|
| `armRegionName` | Azure region identifier | `newzealandnorth`, `australiaeast` |
| `armSkuName` | VM or resource SKU | `Standard_D2s_v5`, `Standard_E4s_v5` |
| `serviceName` | Azure service category | `Virtual Machines`, `Storage`, `SQL Database` |
| `priceType` | Pricing model | `Consumption` (PAYG), `Reservation` |

> **Note:** The API is rate-limited. If you are querying many SKUs, add a short delay between requests.

#### Option 3 — Azure Cost Management + Billing (portal)

Best for: organisations already running workloads in Azure who want actual cost data, not list prices.

1. Sign in to the [Azure Portal](https://portal.azure.com)
2. Navigate to **Cost Management + Billing** → **Cost analysis**
3. Set the scope to the relevant subscription or resource group
4. Use the **Group by** dropdown to group by **Location** (region)
5. Filter to the date range you want to analyse
6. Compare actual spend across NZ North and Australia East resources
7. Use **Budgets** and **Alerts** to monitor ongoing regional cost differences

> This shows what you are actually paying (including discounts, reservations, and hybrid benefit) rather than list prices.

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
