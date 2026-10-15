---
title: "Azure Local vs Azure Cloud — Why Local Should Be an Exception"
description: "A Microsoft-source-backed comparison of Azure Local and Azure cloud: justified use cases, core caveats, operational responsibilities, costs, resilience, and a decision checklist for New Zealand organisations."
date: 2026-10-16
lastmod: 2026-10-16
verifiedOn: 2026-10-16
reviewBy: 2027-01-14
author: "Chandima Kulathilake"
tags: ["azure-local", "azure", "hybrid-cloud", "new-zealand", "cloud-strategy", "data-sovereignty"]
category: "Cloud Strategy"
slug: "azure-local-vs-azure-cloud"
layout: "page"
draft: true
disclaimers:
  - "legal-compliance"
  - "not-legal-advice"
related:
  - "/nz-cloud-region"
  - "/service-availability"
  - "/decisions-to-make"
  - "/data-residency-detail"
---

# Azure Local vs Azure Cloud — Why Local Should Be an Exception

*This document is intended as a guide for clarity and shared understanding. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

## Executive recommendation

**Evaluate Azure public cloud first, including suitable managed services in New Zealand North. Choose Azure Local only when a documented workload requirement justifies owning and operating local infrastructure.**

This is this guide's **architectural recommendation**, not a Microsoft product restriction or a statement that every workload belongs in public cloud. Azure Local is valuable when compute must be physically close to equipment, operations must survive a loss of wide-area connectivity, or an assessed requirement cannot be met by public-cloud controls. Microsoft's [Azure Local overview](https://learn.microsoft.com/en-us/azure/azure-local/overview) describes these local-compute, continuity, latency, and sovereignty scenarios.

The reason not to make it the default is straightforward: **Azure-consistent management does not transfer responsibility for your datacentre to Microsoft.** Azure Local brings supported capabilities to infrastructure you or your delivery partner operate. It is not the entire Azure service catalogue installed in your building.

For ordinary business applications, first establish whether public-cloud services meet the actual data-location, performance, recovery, security, and cost requirements. A preference for familiar servers, a generic concern about sovereignty, or the phrase "keep everything in New Zealand" is not, alone, enough evidence to choose a local platform.

## What Azure Local is and is not

Microsoft describes Azure Local as distributed infrastructure software for running workloads and supported Azure capabilities on customer-managed infrastructure. Azure Arc provides a common management experience for connected deployments. The [FAQ](https://learn.microsoft.com/en-us/azure/azure-local/faq) describes local virtual machines, containers, and select Azure services.

- **Azure Local** — local infrastructure, with a supported hardware configuration and a defined connected or disconnected operating model.
- **Azure public cloud** — services hosted in Microsoft-operated datacentres. Responsibilities differ between infrastructure as a service (IaaS) and platform as a service (PaaS).
- **Azure Arc** — management and governance capabilities across environments. An Arc connection does not turn a local application into a fully managed public-cloud service.
- **Disconnected operations** — a distinct Azure Local operating model with a local control plane, eligibility conditions, additional infrastructure, and a specific supported service set. It is not simply a connected cluster with its internet connection removed.

Use the documentation for the exact deployment type and release. Do not transfer the limits or capabilities of a hyperconverged, multi-rack, or disconnected deployment to another type without checking.

## Comparison with Azure public cloud

This table describes operating-model trade-offs, not guarantees of price, performance, security, or service availability.

| Dimension | Azure public cloud | Azure Local | Decision implication |
|-----------|--------------------|-------------|----------------------|
| **Physical infrastructure** | Microsoft operates the datacentre, physical hosts, and underlying physical network. | You or a contracted partner provide and operate hardware, facilities, power, cooling, and local networking. | Choose Local only if the organisation can fund and assure this operating model. |
| **Platform responsibility** | Microsoft operates the hypervisor. PaaS also transfers supported OS/runtime duties; IaaS guests remain your responsibility. | Microsoft supplies platform software and update orchestration, but you retain responsibility for operating and maintaining the local solution. | Compare Local with an appropriate managed service, not only with cloud VMs. |
| **Services and features** | Broad catalogue, constrained by region, SKU, feature, subscription, quota, and capacity. | Supported local workloads and selected services; local variants and disconnected support must be checked individually. | Azure branding or an API resemblance is not evidence of feature parity. |
| **Capacity and scale** | Provision within available service capacity and quotas; reservations and capacity planning may still be needed. | Bound by installed hardware, redundancy headroom, and supported expansion paths. | Local expansion can require procurement, installation, and validation. |
| **Latency** | Depends on the route, network, service, and application design. | Can reduce the network path to nearby equipment and data sources. | Measure the business-critical path; do not assume all users become faster. |
| **Connectivity** | Access to a cloud-hosted workload depends on a working network path. | Local workloads can continue through some WAN outages; cloud-dependent functions cannot. Disconnected operation requires its own design. | Test identity, DNS, licences, integrations, and management, not just VM uptime. |
| **Resilience** | Service-specific zone and regional options; correct configuration and recovery testing remain your duties. | Cluster resilience depends on topology and capacity; site disaster recovery needs an additional design. | A local cluster is not equivalent to multiple cloud availability zones. |
| **Cost** | Service charges, licences, networking, support, operations, and any commitments. Idle or poorly designed resources can be expensive. | Hardware and facilities plus platform subscription, workload licences, support, staff, spares, and recovery capacity. | Neither model is universally cheaper; compare full lifecycle costs. |
| **Data location** | Verify each service's commitments, configuration, replicas, backups, and data flows. | Workload data can be local, but connected management data and optional services introduce other data flows. | "Local" is not proof that every category of data stays on site or in NZ. |
| **Change and exit** | Service migrations, application changes, contracts, and data transfer need planning. | Those concerns remain, with hardware lifecycle, supported configurations, and local-platform migration added. | Include an exit path before purchase. |

Sources: Microsoft's [shared responsibility model](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility), [Azure Local FAQ](https://learn.microsoft.com/en-us/azure/azure-local/faq), [hyperconverged overview](https://learn.microsoft.com/en-us/azure/azure-local/overview/hyperconverged-overview), and [billing guidance](https://learn.microsoft.com/en-us/azure/azure-local/concepts/billing). For cloud regional checks, use the [service availability guide](/service-availability).

## Where Azure Local has genuine advantages

### Pros

- **Time-critical local processing** — factory control, imaging, or local inference may need processing near equipment. Prove the latency and throughput requirements with measurements.
- **Continuity during WAN outages** — a self-contained local application can keep serving local users or equipment when the WAN fails. Check all application dependencies.
- **Required local execution or isolation** — a documented contractual, operational, or assessed regulatory requirement may justify local infrastructure or disconnected operations.
- **Legacy and equipment-bound workloads** — supported VMs or containers can stay close to devices or dependencies that cannot reasonably move.
- **Local processing of large data volumes** — filtering or analysing data at source may reduce WAN traffic. Compare hardware and operational costs with the transfer costs actually avoided.
- **Consistent hybrid management** — supported Azure tools and Arc capabilities can help govern a justified local footprint alongside cloud resources.
- **Predictable, well-utilised capacity** — steady workloads at sufficient scale may make local economics attractive. This needs a whole-of-life comparison, not an assumed saving.

### Cons

- **More infrastructure accountability** — facilities, hardware failures, network design, platform maintenance, and lifecycle planning remain part of your service.
- **Less automatic access to managed services** — each required service and feature needs verification; running software in a VM is not equivalent to a public-cloud PaaS offering.
- **Physical limits and stranded capacity** — spare capacity is paid for, while expansion depends on supported hardware and procurement.
- **More recovery engineering** — another node does not provide recovery from a site-wide incident, ransomware, or a failed application deployment.
- **A subscription as well as local costs** — Azure Local is not a one-off server purchase that removes ongoing platform and service charges.
- **More components to operate in isolation** — disconnected control plane, identity, certificates, software supply, and support processes must all work within the boundary.

These are trade-offs, not evidence that Azure Local is inherently insecure, slow, or unsuitable. A well-operated local platform may be the right answer to a real local constraint.

## Core caveats before choosing Azure Local

### 1. It is not "all of Azure, on premises"

Create a capability matrix for the exact application: compute, database, messaging, storage, secrets, identity, monitoring, AI, backup, and recovery. For every dependency, record the local product, supported version, licence, support status, feature differences, and whether Azure connectivity is required.

Distinguish **running locally** from **integrating with a cloud service**. The [hyperconverged overview](https://learn.microsoft.com/en-us/azure/azure-local/overview/hyperconverged-overview) includes both local capabilities and Azure integrations. A listed integration does not mean that its cloud backend runs in your building.

Do not assume that a database installed in a local VM has the same patching, scaling, availability, backup, or service commitments as a managed database. Review preview features and contractual support separately before depending on them in production.

### 2. Connected is not permanently disconnected

For hyperconverged connected deployments, Microsoft's [FAQ](https://learn.microsoft.com/en-us/azure/azure-local/faq) requires a successful Azure sync at least once in every 30 consecutive days. During a connectivity outage, running hosts and VMs continue, but features that depend on cloud services are unavailable and portal information can become stale.

After 30 consecutive days without a successful sync, the documented behaviour is an **out-of-policy, reduced-functionality state**: existing VMs continue running, but new VMs cannot be created until synchronisation succeeds. It is neither an immediate shutdown nor approval for indefinite disconnected operation.

For sustained isolation, assess [disconnected operations](https://learn.microsoft.com/en-us/azure/azure-local/manage/disconnected-operations-overview). The documentation checked for this guide requires an eligible agreement, an active support arrangement, a valid disconnected business need, capable staff or a partner, supported hardware, and a dedicated management cluster. Access is subject to the documented qualification process.

Disconnected operations support a defined service set, not full public-cloud parity. Plan how software, updates, container images, certificates, licence renewal, registration information, and support evidence cross the boundary. Validate the current terms with Microsoft; do not assume that disconnected means no information exchange ever.

### 3. You still own day-two operations

Assign named owners for physical security, network and storage health, spare parts, capacity, privileged access, monitoring, incident response, backups, and restore testing. A partner can perform these tasks, but the organisation still needs to govern the contract and verify the outcomes.

Azure Local includes solution update orchestration. That does not remove the need to plan maintenance, review known issues, remediate health checks, preserve failure headroom, and validate applications afterwards.

Microsoft's [update guidance](https://learn.microsoft.com/en-us/azure/azure-local/update/about-updates-23h2) states a six-month currency requirement under the Modern Lifecycle policy and documents supported update methods. It also states that **customer workloads are not covered by the platform update solution**. Follow current release support windows; do not treat a long hardware warranty as permission to freeze the software.

### 4. Hardware choice and support are constrained

Use the supported [Azure Local catalogue](https://aka.ms/AzureStackHCICatalog) and the requirements for the selected deployment. The [FAQ](https://learn.microsoft.com/en-us/azure/azure-local/faq) permits existing hardware reuse only when it matches a supported configuration; it is not a general-purpose reuse-any-server proposition.

Validate network design, firmware and driver compatibility, growth options, local replacement lead times, and maintenance capacity before procurement. Disconnected deployments also need management-plane capacity.

Document a support escalation path covering Microsoft, the OEM, any delivery partner, and the application vendor. Microsoft's [support guidance](https://learn.microsoft.com/en-us/azure/azure-local/manage/get-support) distinguishes CSP and Premier-solution routes and requires an appropriate support plan for Azure support requests. An Azure subscription alone does not establish an end-to-end hardware and application support commitment.

### 5. High availability is not disaster recovery

Cluster redundancy can protect against specified component failures. It does not automatically protect against loss of the building, shared power or networking, privileged compromise, corruption, or deletion.

Define a **recovery time objective (RTO)** and **recovery point objective (RPO)**. Then fund and test the backup isolation, recovery location, application restart order, identity, network, keys, capacity, and operating procedures needed to meet them.

A second site introduces infrastructure and operational costs. A cloud recovery destination introduces connectivity, service-support, capacity, and data-location questions. Confirm the backup and recovery product supports the exact local workload; do not infer support merely from an integration name.

For comparison, Azure public cloud also needs an engineered recovery plan. [New Zealand North is nonpaired](/nz-cloud-region); zone redundancy is not region-wide disaster recovery.

### 6. Compare complete costs, not a server quote with a cloud bill

Microsoft's [billing guidance](https://learn.microsoft.com/en-us/azure/azure-local/concepts/billing) describes physical-core-based platform charges, not charges based simply on the number of running VMs. Additional Azure services can incur consumption charges, and guest operating systems can require separate licensing. Deployment tiers, agreements, and benefits affect the actual quote.

Include the following in a like-for-like, three-to-five-year model:

| Cost area | Include in the assessment |
|-----------|---------------------------|
| **Acquisition and lifecycle** | Validated servers, storage, switches, installation, financing or depreciation, replacement, and disposal. |
| **Operations** | Power, cooling, rack space, connectivity, staff or managed-service fees, training, and on-call coverage. |
| **Software and support** | Azure Local subscription, workload and database licences, paid integrations, OEM cover, and the appropriate support plans. Confirm any benefits rather than assuming eligibility. |
| **Resilience and security** | Spare and failover capacity, backup storage, isolated recovery, another site where needed, security tooling, and exercises. |
| **Utilisation and growth** | Idle capacity, peak demand, maintenance headroom, hardware expansion, and procurement delays. |
| **Transition and exit** | Migration, parallel running, application change, data movement, contract exit, and hardware retirement. |

Model Azure cloud using an appropriate architecture, including managed-service alternatives, realistic utilisation, operational effort, networking, recovery, and applicable commitments. Do not compare a resilient Local design with a non-resilient cloud VM, or a minimal local cluster with a fully managed cloud service without accounting for the missing duties.

Azure Local can be economical for some steady, well-utilised workloads. Cloud can be economical where elasticity or managed services reduce infrastructure and operational effort. **Neither outcome follows from the product name.**

### 7. Security depends on the operating model

Local control can reduce particular remote dependencies and access paths. It also puts physical security, privileged local administration, network protection, patching discipline, and recovery readiness into your operating boundary.

Public cloud is not automatically compliant or secure either. Microsoft's [shared responsibility model](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility) makes clear that data, identities, access, and configuration remain customer responsibilities; IaaS also leaves guest OS and applications with the customer.

Compare threat models and tested controls. Neither "on premises is safer" nor "Microsoft handles everything" is an acceptable risk assessment.

## New Zealand residency and sovereignty

**A New Zealand data-location requirement does not automatically require Azure Local.** First check whether suitable [NZ North services](/service-availability) and their documented data flows meet the requirement. Conversely, a New Zealand server address does not establish that every management, diagnostic, backup, or support flow remains in the country.

For connected Azure Local, Microsoft's [FAQ](https://learn.microsoft.com/en-us/azure/azure-local/faq) distinguishes local customer workload data from cloud-stored management data, including resource names, billing, and usage. Optional capabilities such as Azure Backup can store data in the cloud. Monitoring, applications, and support processes must be assessed separately.

An important NZ-specific caveat: the [hyperconverged system requirements](https://learn.microsoft.com/en-us/azure/azure-local/concepts/system-requirements-23h2) checked on **16 October 2026** list supported Azure management regions but **do not list New Zealand North**. Hardware location and Azure resource/control-plane region are different decisions. Confirm the current supported region and data commitments; do not interpret registering in Australia East as relocating the local VM disks, or local VM disks as proof that management data stays in NZ.

Record the location, purpose, retention, access paths, and commitments for:

- **Workload data** — application databases, files, caches, and processing.
- **Management and identity** — resource metadata, usage, authentication, secrets, and certificates.
- **Observability and support** — logs, diagnostic bundles, remote support, and personnel access.
- **Protection and recovery** — backup copies, replicas, recovery environments, and export media.
- **Supply and servicing** — update sources, software provenance, hardware repair, and disposal.

Local infrastructure does not, by itself, resolve jurisdiction, lawful access, contractual obligations, or organisational compliance. Seek specific legal and assurance advice. For data about Māori, engage the people and communities concerned and consider [Te Mana Raraunga](https://www.temanararaunga.maori.nz/), Kaitiakitanga, and Te Tiriti o Waitangi in governance. Server location is not a substitute for authority, stewardship, and accountability.

## Decision and approval checklist

Treat Azure Local as an **exception that needs evidence**, not as a prohibited product.

| Gate | Evidence required before approval |
|------|-----------------------------------|
| **1. Hard requirement** | A measured latency/continuity constraint, equipment dependency, or documented location/isolation requirement. Identify the requirement owner. |
| **2. Cloud alternative tested** | Assessment of suitable Azure services, including NZ North and managed services, with the specific unmet requirement recorded. |
| **3. Capability fit** | A supported dependency matrix for the selected Local release and connected/disconnected model, including feature gaps and preview dependencies. |
| **4. Operating readiness** | Funded owners or partner commitments for facilities, hardware, updates, security, monitoring, capacity, and incident response. |
| **5. Recovery demonstrated** | Tested RTO/RPO, restore and failover evidence, failure headroom, and a funded site-loss strategy. |
| **6. Economics and exit** | Whole-of-life comparison, sensitivity to utilisation and growth, licensing confirmation, and a practical exit plan. |
| **7. Assurance and review** | Approved data-flow map and risk assessment, legal/governance review where needed, and a date to revisit the exception. |

If the organisation cannot demonstrate these gates, **do not make Azure Local the default simply to progress procurement**. Resolve the gaps or reconsider the cloud design.

### Example decisions

| Scenario | Starting position | Why |
|----------|-------------------|-----|
| Business web application with no site-bound dependency | Evaluate suitable Azure managed services first. | Owning local servers adds duties without an established local-compute benefit. |
| Factory application that must keep operating during WAN loss | Evaluate a local component, potentially Azure Local. | Continuity and proximity are concrete requirements; prove all dependencies can operate locally. |
| Requirement described only as "NZ data residency" | Check service-specific NZ North commitments and all data flows first. | Country-level residency is not automatically a requirement for customer-owned hardware. |
| Assessed requirement for sustained isolation from public Azure | Evaluate disconnected operations and alternatives against eligibility and supported capabilities. | A connected cluster without internet is not an approved disconnected design. |
| Existing virtualisation estate seeking lower cost | Compare supported Local and cloud options across the full lifecycle. | Existing hardware, sunk costs, and a platform core rate do not prove future savings. |

**Use the smallest justified local footprint.** Keeping one equipment-bound workload local does not mean moving email, analytics, websites, and every other application onto the same platform. A targeted hybrid design can preserve local continuity while using appropriate managed cloud services elsewhere.

## Microsoft sources and keeping this guide current

The Microsoft documentation below was checked on **16 October 2026**. Recheck before procurement or architecture approval and after material product changes. The next planned editorial review is **14 January 2027**; that date is not a guarantee that product information will remain unchanged until then.

| Microsoft source | What to verify |
|------------------|----------------|
| [Azure Local overview](https://learn.microsoft.com/en-us/azure/azure-local/overview) and [FAQ](https://learn.microsoft.com/en-us/azure/azure-local/faq) | Intended use, connectivity behaviour, data categories, hardware reuse, and deployment distinctions. |
| [Hyperconverged overview](https://learn.microsoft.com/en-us/azure/azure-local/overview/hyperconverged-overview) | Local capabilities versus cloud integrations; follow each workload's own support documentation. |
| [System requirements](https://learn.microsoft.com/en-us/azure/azure-local/concepts/system-requirements-23h2) and [hardware catalogue](https://aka.ms/AzureStackHCICatalog) | Supported management regions, hardware, network prerequisites, and deployment applicability. |
| [Disconnected operations](https://learn.microsoft.com/en-us/azure/azure-local/manage/disconnected-operations-overview) | Eligibility, qualification process, local control plane, supported services, and operational prerequisites. |
| [Updates](https://learn.microsoft.com/en-us/azure/azure-local/update/about-updates-23h2) and [support](https://learn.microsoft.com/en-us/azure/azure-local/manage/get-support) | Servicing windows, supported procedures, workload exclusions, and escalation routes. |
| [Billing](https://learn.microsoft.com/en-us/azure/azure-local/concepts/billing) and [pricing](https://azure.microsoft.com/en-us/pricing/details/azure-local/) | Physical-core charges, deployment tiers, additional services, licences, and current commercial terms. |
| [Shared responsibility](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility) | Duties transferred to Microsoft in IaaS/PaaS and duties the customer retains. |

The recommendation to evaluate cloud first and the approval gates are this guide's judgement based on these operating-model differences. They are not Microsoft eligibility rules, a legal conclusion, or a commitment about an individual deployment.

## Related pages

- [Azure New Zealand North — Start Here](/nz-cloud-region)
- [NZ North Service Availability — Verification Guide](/service-availability)
- [Data Residency vs Data Sovereignty — Decisions to Make](/decisions-to-make)
- [Data Residency & Data Sovereignty — Detail](/data-residency-detail)

---

*The opinions expressed herein are my own personal opinions and do not represent my employer's view in any way. Presentation Resources are provided as is with no guarantees or warranties of any kind.*
