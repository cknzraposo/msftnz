---
title: "Plan Continuity Under Disruption"
description: "Explore workload-specific recovery, regional outages, connectivity loss, and disconnected operation without promising absolute resilience."
date: 2026-10-28
lastmod: 2026-10-28
verifiedOn: 2026-10-28
reviewBy: 2027-01-26
author: "Chandima Kulathilake"
tags: ["sovereignty", "resilience", "disaster-recovery", "azure-local", "new-zealand-north"]
category: "Work Through the Decision"
slug: "sovereignty-continuity"
layout: "page"
draft: true
disclaimers:
  - "legal-compliance"
  - "not-legal-advice"
related:
  - "/sovereignty-framework-start"
  - "/sovereignty-options"
  - "/sovereignty-decision-record"
  - "/nz-cloud-region"
  - "/service-availability"
---

# Plan Continuity Under Disruption

> **Discussion guidance only.** These scenarios help identify requirements and test assumptions. They are not availability guarantees, mandatory resilience tiers, or statements that a product automatically meets a recovery objective.

*This document is intended as a guide for clarity and shared understanding. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

## Define the service outcome

Agree which functions matter, who depends on them, and what degradation is tolerable.

- **Recovery time objective (RTO)** — the target time for restoring a required function after disruption.
- **Recovery point objective (RPO)** — the target limit on data loss, expressed as a period of time.
- **Minimum service** — the functions that must remain available, including any approved manual or offline process.
- **Operating duration** — how long the fallback must work, with what staffing, power, supplies, and support.

These are planning targets. Record measured recovery performance separately and investigate any gap.

## Connect continuity evidence to New Zealand assurance

For an in-scope government workload, include continuity in the [GCDO cloud risk assessment](https://www.digital.govt.nz/standards-and-guidance/technology-and-architecture/cloud-services/assess-the-risks) and the organisation's NZISM assessment. A useful manual entry point is [NZISM 6.4 Business Continuity and Disaster Recovery](https://nzism.gcsb.govt.nz/ism-document/pdf/Section/13074). Check its current text and applicable controls in the [official manual](https://nzism.gcsb.govt.nz/ism-document); this page does not restate its mandatory requirements.

As a proposed evidence practice, link each applicable control to the business continuity plan, recovery runbook, backup and restoration evidence, incident responsibilities, and dated exercise results. Identify both provider and customer actions. Record recovery locations and any classification, jurisdictional, or governance constraints before choosing an offshore fallback.

The [Microsoft NZ government assessment guidance](https://learn.microsoft.com/en-us/compliance/regulatory/offering-nz-cc-framework-nz) identifies availability and incident response among the Risk Discovery Tool's assessment areas. Provider answers can inform the dependency analysis, but they do not prove the workload's recovery performance. Use the source and applicability checks in [requirements and decision rights](/sovereignty-requirements).

## Use scenarios, not a sovereignty score

The following scenarios are illustrative and can overlap. Select them according to consequences and credible dependencies, not an assumed universal order.

| Disruption | Questions to exercise | Evidence to capture |
|---|---|---|
| **Component or zone failure** | Can the application continue when a dependency fails? Is the configured service zone-resilient? | Failure tests, service configuration, and observed recovery |
| **Regional outage** | Where can each required service and its data recover? Is capacity available there? | Service-specific recovery design, deployment readiness, and restore tests |
| **Loss of international connectivity** | Which identity, DNS, administration, licensing, monitoring, or support paths stop working? | Dependency inventory and a controlled isolation exercise |
| **Prolonged local infrastructure disruption** | Which essential functions can be sustained or reconstituted, and elsewhere if permitted? | Tested fallback arrangements, staffing plans, power and network assumptions |
| **Compromise or destructive change** | Can clean data and configuration be recovered without reintroducing the problem? | Protected recovery copies, access separation, and clean recovery tests |

A region-wide event and an international-link outage are different scenarios. A second deployment is useful only if its dependencies and recovery process work under the scenario being assessed.

## New Zealand North: verify the exact recovery path

The [Azure regions list](https://learn.microsoft.com/en-us/azure/reliability/regions-list) lists New Zealand North with **three availability zones and no paired region**. Region-level zone support does not establish support for every service, SKU, or feature.

Do not equate availability zones within a region with a second-region recovery design. For example, Microsoft's [Storage redundancy documentation](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy) explains the limits of zone-redundant storage for regional disasters. It also states that the secondary region for its geo-redundant options is determined by the primary region and cannot be changed.

Consequently, do not assume Australia East is a selectable GRS destination for NZ North. Validate the specific service's replication, backup, regional support, and recovery procedure. A customer-designed copy or a separate deployment is not the same capability as Storage GRS.

Use the [NZ North verification guide](/service-availability) before committing to a recovery design. Offshore recovery must also satisfy the applicable requirements and decision rights; resilience objectives do not override them.

## Local execution is not automatically disconnected operation

Microsoft documents [disconnected operations for Azure Local](https://learn.microsoft.com/en-us/azure/azure-local/manage/disconnected-operations-overview?view=azloc-2610) as a deployment model using a local control plane and selected supported services without a public Azure connection.

It has eligibility, support, operational, and hardware requirements, including a dedicated management cluster. A normal connected installation should not be assumed to provide that model simply because its machines are on-premises.

For any proposed offline capability, separately test application identity, data access, updates, certificates, monitoring, backups, staffing, and reconnection. Product support does not prove that the whole business process can operate disconnected.

## Output and sources

Record a target, dependencies, owner, test date, measured result, gap, and approval for each critical function in the [decision worksheet](/sovereignty-decision-record).

The linked Microsoft Learn sources were checked through MCP on **28 October 2026**. Government-source access limitations are described in [requirements and decision rights](/sovereignty-requirements). This confirms the cited Microsoft documentation, not subscription capacity, customer eligibility, or a tested architecture. Recheck the relevant service and Azure Local release before design approval.
