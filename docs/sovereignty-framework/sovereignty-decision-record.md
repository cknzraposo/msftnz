---
title: "Decision Worksheet and Review Checklist"
description: "A reusable sovereignty discussion worksheet for requirements, evidence, options, unresolved issues, accountable decisions, and review."
date: 2026-10-28
lastmod: 2026-10-28
verifiedOn: 2026-10-28
reviewBy: 2027-01-26
author: "Chandima Kulathilake"
tags: ["sovereignty", "worksheet", "decision-record", "risk", "governance"]
category: "Put It Into Practice"
slug: "sovereignty-decision-record"
layout: "page"
draft: true
disclaimers:
  - "legal-compliance"
  - "not-legal-advice"
related:
  - "/sovereignty-framework-start"
  - "/sovereignty-requirements"
  - "/sovereignty-control-evidence"
  - "/sovereignty-continuity"
  - "/sovereignty-options"
---

# Decision Worksheet and Review Checklist

> **A suggested worksheet, not an approval or certification.** Completing this record does not establish compliance, sovereignty, security, or availability. Use the organisation's own approval process and record where evidence remains incomplete.

*This document is intended as a guide for clarity and shared understanding. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

## How to use this worksheet

Copy the tables into the organisation's approved records system. Replace bracketed prompts and add rows as needed. This public site does not collect answers: do not submit sensitive workload details, credentials, personal information, or internal risk records to the repository.

Use **evidenced, partially evidenced, unresolved, or not applicable with rationale** to describe evidence. These are local working labels, not maturity levels.

## 1. Scope and participation

| Field | Record |
|---|---|
| **Decision and workload** | [Name, version, boundaries, and excluded functions] |
| **Business outcome** | [People served, essential functions, and consequences of failure] |
| **Data and lifecycle** | [Categories, sources, uses, retention, locations, and deletion] |
| **Accountable owner** | [Role authorised to approve this decision] |
| **Participants and decision rights** | [Business, legal/privacy, security, operations, procurement, and relevant Māori governance participants] |
| **Assessment dates** | [Evidence checked, decision date, next review, and early-review triggers] |

## 2. Requirements and applicability

| Requirement | Basis and exact source | Applicability and authority | Evidence state and next action |
|---|---|---|---|
| [Specific outcome or constraint] | [Law, policy, contract, governance commitment, or preference; source version] | [Data, activity, entity, jurisdiction, decision owner, and interpretation] | [State, gap, action owner, and due date] |

Use [requirements and decision rights](/sovereignty-requirements). Record legitimate policy and governance constraints even when they are not statutory requirements. Do not use risk acceptance to waive a legal obligation.

### New Zealand public-sector assessment record

Use this additional record where relevant; it is not a replacement for the organisation's approved assessment. Start with [GCDO Cloud First policy](https://www.digital.govt.nz/standards-and-guidance/technology-and-architecture/cloud-services/cloud-adoption-policy-and-strategy/cabinet-requirement), the [Risk Discovery Tool](https://www.digital.govt.nz/standards-and-guidance/technology-and-architecture/cloud-services/assess-the-risks/risk-discovery-tool), the [official NZISM](https://nzism.gcsb.govt.nz/ism-document), and the [Microsoft NZISM guide](https://learn.microsoft.com/en-us/compliance/anz/nzism-guide).

| Field | Record |
|---|---|
| **Policy scope and classification** | [Mandate determination and owner, current policy source, information classification, cloud plan, permitted locations, and required exception process] |
| **Cloud risk assessment** | [GCDO tool version, agency assessment reference, jurisdictional analysis, open risks, and authorised decision] |
| **NZISM applicability** | [Manual edition, system boundary, exact control references, applicability rationale, and customer/provider/shared owners] |
| **Provider evidence** | [Actual service-response version, covered services, report period, assumptions, and gaps] |
| **Tool coverage** | [Initiative/template ID and version, mapped manual edition, assignment scope, parameters, exemptions, and differences from applicable requirements] |
| **Manual and unassessed controls** | [Evidence, test date, reviewer, implementation gaps, action owner, and due date; do not mark unassessed items as passing] |
| **Certification and accreditation, where required** | [Required process, assessor and approving authority, evidence record, decision, residual risks, conditions, expiry or review date, and change triggers] |

## 3. Data paths and control evidence

| Path or boundary | Proposed handling | Evidence and limitations | Responsible operator |
|---|---|---|---|
| **Production and recovery data** | [Storage, processing, copies, and recovery locations] | [Service documentation, configured resource, and test] | [Role and escalation] |
| **Logs, diagnostics, support, and AI data** | [Purpose, destination, retention, and permitted reuse] | [Product/deployment-specific evidence; unknown paths] | [Role and escalation] |
| **Identity and privileged access** | [Customer, provider, partner, and emergency access] | [Permissions, approvals, logs, and access reviews] | [Role and escalation] |
| **Keys and plaintext boundary** | [Key custody, service decryption, applications, and outputs] | [Configuration, permissions, rotation, and recovery evidence] | [Role and escalation] |
| **Exit, return, and deletion** | [Export, retention, agreed deletion, and outstanding copies] | [Tested process, terms, and available confirmation] | [Role and escalation] |

Consult [control and security evidence](/sovereignty-control-evidence). Record the exact service, SKU, region, deployment mode, source link, checked date, and observed configuration. A documentation link alone does not demonstrate implementation.

## 4. Continuity exercise

| Function and disruption | Targets and dependencies | Test evidence | Gap and accountable decision |
|---|---|---|---|
| [Essential function; selected disruption] | [RTO, RPO, minimum service, duration, dependencies, and applicable NZISM control references where relevant] | [Date, environment, measured results, and limitations] | [Action, owner, due date, and required approval] |

Use [continuity planning](/sovereignty-continuity). Include restoration, key availability, and return to normal operation where relevant. Avoid recording an untested target as an achieved outcome.

## 5. Options and decision

| Option | Requirement fit | Control, security, and resilience consequences | Lifecycle cost and evidence gaps |
|---|---|---|---|
| [Feasible design or retain current approach] | [Met, unmet, or unresolved requirements, with evidence] | [Benefits, dependencies, operational duties, and tested limits] | [Staff, support, maintenance, exit, and unresolved questions] |

Record the selected option, alternatives rejected and why, prerequisites before implementation, and any residual risks accepted by an authorised owner. Preserve unresolved mandatory requirements as blockers rather than marking them complete.

## 6. Review checklist

- **Authority** — the correct people confirmed scope, decision rights, and applicable requirements.
- **Evidence** — material claims have current sources, configuration evidence, and stated limitations.
- **Assurance** — any report actually reviewed covers the relevant service, period, and responsibilities.
- **NZ public-sector checks** — where applicable, policy scope, classification/location conditions, the cloud risk assessment, NZISM evidence gaps, and required certification/accreditation are recorded; a tool score is not substituted for approval.
- **Continuity** — the selected scenarios have tested results or explicitly owned gaps.
- **Operations** — key lifecycle, access reviews, incident response, updates, and exit have owners.
- **Approval** — open actions and any implementation conditions are visible to the approver.
- **Review** — recheck after material changes to data use, service behaviour, contracts, requirements, ownership, or test results, and on the agreed review date.

## Evidence discipline and sources

Microsoft's [shared responsibility guidance](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility) and [compliance offerings guidance](https://learn.microsoft.com/en-us/azure/compliance/offerings/) support the distinction between provider evidence and the organisation's own responsibilities. They were reviewed through Microsoft Learn MCP on **28 October 2026**.

The Microsoft NZISM guide was also reviewed through MCP on that date. Government-source access limitations and further GCDO/NZISM references are recorded in [requirements and decision rights](/sovereignty-requirements).

The worksheet itself is an editorial aid. Its review date is not a promise that an organisation's evidence remains current until that date.
