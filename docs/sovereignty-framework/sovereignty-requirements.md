---
title: "Establish Requirements and Decision Rights"
description: "Identify the authority, scope, evidence, and decision owner behind sovereignty requirements before selecting a technical design."
date: 2026-10-28
lastmod: 2026-10-28
verifiedOn: 2026-10-28
reviewBy: 2027-01-26
author: "Chandima Kulathilake"
tags: ["sovereignty", "requirements", "privacy", "maori-data", "new-zealand"]
category: "Work Through the Decision"
slug: "sovereignty-requirements"
layout: "page"
draft: true
disclaimers:
  - "legal-compliance"
  - "not-legal-advice"
related:
  - "/sovereignty-framework-start"
  - "/sovereignty-control-evidence"
  - "/sovereignty-decision-record"
  - "/data-residency-detail"
---

# Establish Requirements and Decision Rights

> **Discussion guidance only.** These questions are not an exhaustive statement of New Zealand law or policy. Applicability depends on the organisation, data, activity, and agreements. No answer establishes compliance.

*This document is intended as a guide for clarity and shared understanding. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

## Ask what the requirement protects

Instead of stopping at "all data must be sovereign", ask what outcome is required. Is the concern storage location, lawful access, administrator access, community authority, service continuity, records access, or supplier exit?

Record each concern separately. Local storage, local processing, local operations, and a local management plane are different design questions.

## Identify the basis and owner

The following classification is a suggested recording method, not a ranking of legitimacy.

| Basis | What to record | Who should confirm it |
|---|---|---|
| **Law or regulation** | Exact provision, jurisdiction, applicable entity, data, activity, and interpretation | Legal counsel and the accountable business owner |
| **Government or sector policy** | Current policy text, scope, classification, exceptions, and assurance process | The organisation's policy and assurance owners |
| **Contract** | Relevant clause, service scope, duration, and change process | Contract owner and legal counsel |
| **Māori governance commitments** | Relevant rights, relationships, agreed purposes, decision rights, and responsibilities | Appropriate Māori rights-holders and governance participants |
| **Organisational policy or risk choice** | Approved policy, risk scenario, rationale, and authority to change it | Policy owner and authorised risk decision-maker |
| **Assumption or preference** | Why it arose and the evidence needed to test it | Workload owner with the affected stakeholders |

A policy owner may be able to reconsider a policy; that does not mean an architect can waive it. An unresolved requirement is not satisfied simply because a preferred product cannot meet it.

## Overseas disclosure is not every overseas processing activity

The [Privacy Commissioner's IPP 12 guidance](https://www.privacy.org.nz/privacy-principles/12/) describes conditions for disclosure of personal information outside New Zealand. Consent is not the only possible route.

The Commissioner's [overseas information guidance and cloud-provider FAQ](https://www.privacy.org.nz/responsibilities/disclosing-personal-information-outside-new-zealand/) also explains the distinction where a provider holds information as an agent for storage or processing on the organisation's behalf. In most such circumstances the organisation remains responsible. Provider use or disclosure for its own purposes changes the analysis described in that guidance.

Therefore:

- **Map the activity** — who receives the information, for what purpose, under whose instructions, and with what further uses?
- **Confirm applicability** — have privacy and legal reviewers determine which requirements apply to that activity.
- **Avoid blanket conclusions** — "offshore means prohibited", "consent solves everything", and "a cloud contract removes our responsibility" are not adequate assessments.

Consult the current [Privacy Act 2020 information privacy principles](https://www.legislation.govt.nz/act/public/2020/0031/latest/LMS23376.html) and relevant guidance. The [Health Information Privacy Code](https://www.privacy.org.nz/privacy-principles/codes-of-practice/hipc2020/) has its own scope; do not assume a generic privacy summary covers a health workload.

## Māori data governance is not a storage setting

The [Te Mana Raraunga Charter](https://www.temanararaunga.maori.nz/tutohinga) describes Māori data as including data produced by Māori or about Māori and the environments with which Māori have relationships. Its framing is broader than an individual's personal information.

As a proposed discussion practice, involve appropriate Māori rights-holders and governance participants early. Explore authority, collective benefit, access, reuse, Kaitiakitanga, and how Te Tiriti o Waitangi considerations apply to the relationship and activity. Do not treat domestic hosting or a completed worksheet as evidence that those questions have been resolved.

## Government and sector checks

For New Zealand public-sector workloads, start with the resources below. The [Microsoft Learn NZISM compliance guide](https://learn.microsoft.com/en-us/compliance/anz/nzism-guide) is the primary Microsoft implementation reference used in this collection. GCDO policy and the NZISM itself remain the sources for government requirements; a Microsoft mapping does not replace them.

| Resource | How to use it in the decision | Evidence to record |
|---|---|---|
| **GCDO Cloud First policy** | Check the current [Cabinet requirement](https://www.digital.govt.nz/standards-and-guidance/technology-and-architecture/cloud-services/cloud-adoption-policy-and-strategy/cabinet-requirement), organisational mandate, information classification, and location conditions before choosing a hosting pattern | Applicable policy version, scope, classification, cloud plan, and any required approval or exception |
| **GCDO cloud risk assessment** | Follow the [assessment process](https://www.digital.govt.nz/standards-and-guidance/technology-and-architecture/cloud-services/assess-the-risks/assessment-process) and [Risk Discovery Tool](https://www.digital.govt.nz/standards-and-guidance/technology-and-architecture/cloud-services/assess-the-risks/risk-discovery-tool), alongside the organisation's risk process | Tool version, workload-specific answers, supporting evidence, gaps, and accountable risk decision |
| **GCDO jurisdictional risk guidance** | Use the [jurisdictional risk guidance](https://www.digital.govt.nz/standards-and-guidance/technology-and-architecture/cloud-services/assess-the-risks/cloud-jurisdictional-risk-guidance) to frame legal and supplier questions; do not treat domestic storage as the whole assessment | Relevant jurisdictions, data and access paths, contracts, legal review, and remaining uncertainty |
| **NZISM** | Use the [official manual](https://nzism.gcsb.govt.nz/ism-document) to determine applicable controls and assurance requirements for the system | Manual version, exact control references, applicability rationale, responsibilities, evidence, and certification/accreditation requirements where applicable |
| **Microsoft implementation and provider evidence** | Use the [NZISM guide](https://learn.microsoft.com/en-us/compliance/anz/nzism-guide) for Microsoft control-mapping tools and the [NZ government information security and privacy page](https://learn.microsoft.com/en-us/compliance/regulatory/offering-nz-cc-framework-nz) to locate Microsoft's Azure, Microsoft 365, and Dynamics 365 risk-tool responses | Actual response-document version, covered services, assumptions, customer actions, and gaps against this workload |

Cloud First is a government policy with a defined scope, not a universal rule for every New Zealand organisation. Have the responsible policy owner confirm the current mandate and classification/location conditions. Do not infer either blanket offshore permission or blanket onshore-only requirements from this summary.

Microsoft's [NZ government guidance](https://learn.microsoft.com/en-us/compliance/regulatory/offering-nz-cc-framework-nz) explicitly distinguishes the Risk Discovery Tool from a government standard against which providers demonstrate formal compliance. Provider answers are inputs to the organisation's assessment, not an approval to use the service. Check the actual downloaded response's date and scope rather than assuming it covers every Microsoft product.

For NZISM cloud assurance, useful manual entry points are [23.1 Public Cloud Security Concepts](https://nzism.gcsb.govt.nz/ism-document/pdf/Section/17393), [23.2 Governance, Risk Assessment & Assurance](https://nzism.gcsb.govt.nz/ism-document/pdf/Section/17478), and [4.1 Certification and Accreditation Process](https://nzism.gcsb.govt.nz/ism-document/pdf/Section/12460). Confirm their numbering and current wording in the manual version used for the assessment. Where certification and accreditation are required, record the system boundary, assurance evidence, authorised approver, conditions, and review date separately from any provider certification.

Also ask the responsible assurance team about applicable records, sector, incident response, and supplier requirements. This collection links the assessment resources; it does **not** reproduce an exhaustive control matrix or decide their applicability for an organisation.

## Output

For each requirement, record **basis, applicability, evidence, decision owner, and unresolved questions** in the [decision worksheet](/sovereignty-decision-record). Then gather [control and security evidence](/sovereignty-control-evidence).

Sources were reviewed on **28 October 2026**, including the Microsoft guidance through Microsoft Learn MCP. Direct access to the GCDO and NZISM pages was challenged during review; those references were checked through official indexed excerpts and the links in Microsoft's guidance, not a full reading of every policy or control. Confirm the current government text with the assurance owner before approval. This is not a legal opinion or a complete requirements assessment.
