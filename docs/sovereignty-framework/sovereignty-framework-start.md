---
title: "Start Here: A Sovereignty Discussion Framework"
description: "An independent discussion aid for exploring control, security, and resilience in Aotearoa New Zealand without implying certification or a definitive standard."
date: 2026-10-28
lastmod: 2026-10-28
verifiedOn: 2026-10-28
reviewBy: 2027-01-26
author: "Chandima Kulathilake"
tags: ["sovereignty", "decision-framework", "governance", "new-zealand"]
category: "Start Here"
slug: "sovereignty-framework-start"
layout: "page"
draft: true
disclaimers:
  - "legal-compliance"
  - "not-legal-advice"
related:
  - "/sovereignty-requirements"
  - "/sovereignty-control-evidence"
  - "/sovereignty-continuity"
  - "/sovereignty-options"
  - "/sovereignty-decision-record"
  - "/decisions-to-make"
---

# Start Here: A Sovereignty Discussion Framework

> **A discussion aid, not an authority.** This framework offers one way to explore digital sovereignty decisions. It is not an authoritative definition, compliance standard, certification, or product commitment. Apply it alongside current requirements, authoritative sources, relevant governance perspectives, and professional advice.

*This document is intended as a guide for clarity and shared understanding. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

## What this collection is for

Use this collection to turn a broad request such as "we need sovereignty" into specific requirements, evidence, design choices, and accountable decisions.

The material is an independent adaptation of supplied ANZ and New Zealand discussion material. It is not an official Microsoft framework or an endorsement by Microsoft, a regulator, or a Māori governance body. Public sources support factual statements; the questions, groupings, and worksheets are editorial suggestions.

In this collection, **digital sovereignty** is a working term for questions about authority over data and systems, how that authority is exercised, and whether required functions can be sustained. Other definitions and frameworks may be appropriate. Agree the meaning with the people affected before using it.

## Three useful lenses

These are connected discussion lenses, not independently measurable scores.

| Lens | Questions to explore | Evidence to seek |
|---|---|---|
| **Control** | Who can decide how data is used, accessed, moved, returned, or deleted? What authority do they have? | Applicable requirements, agreements, data-flow maps, access records, and decision rights |
| **Security** | How are those decisions enforced and checked? Which threats and processing boundaries are covered? | Configuration evidence, scoped assurance reports, access reviews, and control tests |
| **Resilience** | Which functions must continue or recover during disruption, and within what limits? | Dependency maps, recovery objectives, tested runbooks, and exercised fallback arrangements |

Microsoft's [shared responsibility guidance](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility) explains how responsibilities change between infrastructure, platform, and software services. The organisation still has responsibilities for its data, identities, configuration, and access. A platform capability does not, on its own, settle the organisation's decision.

## Work through a decision

1. **Agree the scope.** Identify the workload, people and communities affected, important data, and consequences of disruption.
2. **Establish authority.** Use [requirements and decision rights](/sovereignty-requirements) to distinguish binding obligations from choices. Policy choices and governance commitments still matter; they are not automatically dispensable.
3. **Gather evidence.** Use [control and security evidence](/sovereignty-control-evidence) to test assumptions about access, location, encryption, and assurance.
4. **Exercise disruption.** Use [continuity planning](/sovereignty-continuity) to examine failure and recovery, not just normal operation.
5. **Compare feasible designs.** Use [options and trade-offs](/sovereignty-options) without assuming one hosting model wins.
6. **Record and revisit.** Use the [decision worksheet](/sovereignty-decision-record), including unresolved questions and review triggers.

Start with existing evidence. Do not select a product and then retrofit the requirement to justify it.

## New Zealand public-sector starting points

For public-sector work, use the [GCDO Cloud First policy](https://www.digital.govt.nz/standards-and-guidance/technology-and-architecture/cloud-services/cloud-adoption-policy-and-strategy/cabinet-requirement) and [cloud risk assessment resources](https://www.digital.govt.nz/standards-and-guidance/technology-and-architecture/cloud-services/assess-the-risks) to establish applicable policy and assessment steps. Use the [official NZISM](https://nzism.gcsb.govt.nz/ism-document) for the applicable security controls and assurance process.

The [Microsoft Learn NZISM compliance guide](https://learn.microsoft.com/en-us/compliance/anz/nzism-guide) is this collection's primary reference for Microsoft implementation guidance. It links control-mapping and monitoring tools; it is not a replacement for government requirements or agency approval. A policy initiative, provider certificate, or completed discussion worksheet does not establish that the organisation's system is accredited.

The [requirements page](/sovereignty-requirements) explains the source roles, scope checks, and access limitations. Establish the organisation's mandate, information classification, relevant manual version, and decision authority before treating a requirement as applicable or not applicable.

## Boundaries of this framework

- **Māori data governance** — these three lenses do not replace Māori authority, collective interests, Kaitiakitanga, or engagement about Te Tiriti o Waitangi. The [Te Mana Raraunga Charter](https://www.temanararaunga.maori.nz/tutohinga) describes Māori data and its relationship to Māori rights. The relevant people must shape the governance process.
- **Legal interpretation** — the [Privacy Commissioner's IPP 12 guidance](https://www.privacy.org.nz/privacy-principles/12/) concerns overseas disclosure. Do not treat every offshore service operation as the same legal event.
- **Assurance** — Microsoft's [compliance offerings guidance](https://learn.microsoft.com/en-us/azure/compliance/offerings/) describes differing audit scopes and states that customers remain responsible for their compliance. Completing this framework does not certify anything.
- **Availability** — a product description is not proof that the required service, SKU, deployment mode, and capacity are available to a particular customer.

## How to read verification dates

Public sources linked here were checked on **28 October 2026**, subject to the government-source access limitations described on the [requirements page](/sovereignty-requirements). Microsoft product statements were checked using official Microsoft Learn documentation through MCP. This is a source review date, not legal sign-off, a tenant assessment, or a guarantee of future behaviour.

Recheck relevant sources when scope, service configuration, contracts, law, or requirements change. For existing technical background, start with the [cloud decision guide](/decisions-to-make) and [NZ North availability verification guide](/service-availability).
