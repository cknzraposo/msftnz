---
title: "Compare Options and Trade-offs"
description: "Compare feasible cloud, local, and hybrid designs against evidenced requirements without treating any hosting model as universally sovereign."
date: 2026-10-28
lastmod: 2026-10-28
verifiedOn: 2026-10-28
reviewBy: 2027-01-26
author: "Chandima Kulathilake"
tags: ["sovereignty", "architecture", "trade-offs", "hybrid-cloud", "decision-framework"]
category: "Work Through the Decision"
slug: "sovereignty-options"
layout: "page"
draft: true
disclaimers:
  - "legal-compliance"
  - "not-legal-advice"
related:
  - "/sovereignty-requirements"
  - "/sovereignty-control-evidence"
  - "/sovereignty-continuity"
  - "/sovereignty-decision-record"
  - "/azure-local-vs-azure-cloud"
  - "/decisions-to-make"
---

# Compare Options and Trade-offs

> **Discussion guidance only.** These patterns are illustrative, not recommendations for a particular workload. They are not a ladder from less to more sovereign. Suitability depends on evidence, requirements, service support, and operating capability.

*This document is intended as a guide for clarity and shared understanding. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

## Compare feasible options first

Confirm requirements and decision rights before scoring convenience or cost. A design that fails a binding requirement is not made acceptable by a high total score. Record any proposed requirement change for the person authorised to decide it.

| Pattern | When it may merit investigation | Trade-offs and evidence to examine |
|---|---|---|
| **Regional public-cloud workload** | Supported services in a selected region may meet data-location and operational requirements | Check all data flows, service dependencies, access controls, and recovery beyond a regional outage |
| **Public cloud with cross-region recovery** | Offshore recovery is permitted and the workload needs regional separation | Validate exact replication support, recovery capacity, data-loss exposure, costs, and approvals for each location |
| **Connected local infrastructure** | Local execution, integration, or latency is important | Check cloud and network dependencies alongside hardware, staffing, patching, physical protection, and local recovery |
| **Supported disconnected platform** | An evidenced requirement calls for operation without a public-cloud connection | Validate eligibility, supported services, local control plane, offline lifecycle, capacity, and operational readiness |
| **Hybrid service with a local fallback** | Some essential functions need local continuity while other functions use cloud services | Test fallback scope, identity, synchronisation, reconciliation, monitoring, and return to normal service |

These patterns may be combined. Keeping a transaction queue locally, for example, is not the same as keeping the entire service operational offline.

## Apply the New Zealand public-sector decision gate

Where government policy applies, compare options within the current [GCDO Cloud First policy](https://www.digital.govt.nz/standards-and-guidance/technology-and-architecture/cloud-services/cloud-adoption-policy-and-strategy/cabinet-requirement), including the organisation's mandate, classification/location conditions, cloud plan, and required approvals. Use the [GCDO assessment process](https://www.digital.govt.nz/standards-and-guidance/technology-and-architecture/cloud-services/assess-the-risks/assessment-process) rather than treating a hosting label as the risk assessment.

For each feasible option, record how applicable [NZISM](https://nzism.gcsb.govt.nz/ism-document) controls will be implemented and evidenced, including controls outside Microsoft's automated mappings. The [Microsoft NZISM guide](https://learn.microsoft.com/en-us/compliance/anz/nzism-guide) supports the Microsoft implementation analysis; it does not approve the architecture. A local or disconnected option does not automatically bypass policy, assurance, or accreditation requirements.

Record source versions, applicability, evidence gaps, and the required agency decision in the [worksheet](/sovereignty-decision-record). Government-source access limitations and additional jurisdictional-risk resources are described in [requirements and decision rights](/sovereignty-requirements).

## Compare changes across all three lenses

For every proposal, write down the intended benefit and the new dependency or responsibility.

- **More key ownership** — can improve control over key lifecycle, but requires suitable permissions, rotation, recovery, and incident procedures. [Server-side customer-managed encryption](https://learn.microsoft.com/en-us/azure/security/fundamentals/encryption-models) still involves service-side decryption; do not describe it as universal provider exclusion.
- **Additional recovery location** — may provide a recovery option, but only where the service and architecture support it and the location is permitted. [Azure Storage GRS](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy) does not let the customer freely select its secondary region.
- **Local or disconnected operation** — may meet a real operational need, while adding local infrastructure and lifecycle responsibilities. [Azure Local disconnected operations](https://learn.microsoft.com/en-us/azure/azure-local/manage/disconnected-operations-overview?view=azloc-2610) requires its own planned deployment and prerequisites.
- **More provider-managed functions** — changes the division of operational work. Use the [shared responsibility model](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility) and the actual service design to identify what the organisation still controls and must operate.

Do not infer that global connectivity is always acceptable, local infrastructure is always safer, or cloud services always deliver a better outcome. Compare the workload's requirements and measured evidence.

## Illustrative workshop example

Suppose a service team proposes NZ North for an application and wants an offshore recovery copy. Treat the following as questions, not established facts:

1. Does each required service and configuration support NZ North and the proposed recovery location?
2. Which information, including logs and support material, could move offshore?
3. Is that movement permitted under the applicable legal, contractual, and governance arrangements?
4. Can identity, keys, deployment, and recovery capacity work during the selected disruption?
5. What function remains available if neither normal operation nor recovery is possible?

If offshore recovery is not permitted, document the resulting design constraints and investigate compliant alternatives. Do not treat a difficult requirement as permission to ignore it.

## Record a sustainable option

Compare implementation cost, continuing staff effort, support lifecycle, change management, tested recovery, portability, and evidence gaps. A design should include a plan to remain supportable; neither cloud nor local infrastructure removes that responsibility.

Use the [decision record](/sovereignty-decision-record). Existing [cloud trade-off guidance](/decisions-to-make) and the [Azure Local comparison](/azure-local-vs-azure-cloud) provide further background, not substitutes for workload-specific assessment.

The linked Microsoft Learn sources were reviewed through MCP on **28 October 2026**. The comparison method and workshop example are editorial guidance, not Microsoft reference architectures or verified customer deployments.
