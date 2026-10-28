---
title: "Assess Control and Security Evidence"
description: "Test assumptions about sovereignty controls against data flows, encryption boundaries, shared responsibilities, and scoped assurance evidence."
date: 2026-10-28
lastmod: 2026-10-28
verifiedOn: 2026-10-28
reviewBy: 2027-01-26
author: "Chandima Kulathilake"
tags: ["sovereignty", "encryption", "security", "assurance", "data-flows"]
category: "Work Through the Decision"
slug: "sovereignty-control-evidence"
layout: "page"
draft: true
disclaimers:
  - "legal-compliance"
  - "not-legal-advice"
related:
  - "/sovereignty-framework-start"
  - "/sovereignty-requirements"
  - "/sovereignty-continuity"
  - "/sovereignty-decision-record"
---

# Assess Control and Security Evidence

> **Discussion guidance only.** A control name, certification, or hosting location does not establish a sovereignty outcome. Assess the exact service, configuration, operating responsibilities, and evidence against the requirement.

*This document is intended as a guide for clarity and shared understanding. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

## Map the boundaries before selecting controls

Use the following as a starting checklist, not a claim that every service exposes every control.

| Boundary | Questions to ask | Evidence to seek |
|---|---|---|
| **Data flows** | Where are production data, replicas, backups, logs, diagnostics, support files, and AI inputs or outputs processed and retained? | Service-specific documentation, configuration, contracts, and a maintained flow map |
| **Identity and privileged access** | Who grants access? Which customer, provider, or partner operators can act? What happens during emergency access? | Role assignments, access reviews, approval procedures, and available audit records |
| **Keys and decryption** | Who holds each key? Which identity can invoke decryption? Where does plaintext exist? | Encryption design, service permissions, key lifecycle procedures, and tests |
| **Provider use and subprocessors** | Which terms govern processing and onward disclosure? Are optional features or integrations involved? | Applicable service terms, processing agreements, feature settings, and subprocessor information |
| **Return and deletion** | Can the organisation retrieve usable data and meet agreed retention or deletion requirements? | Tested exports, retention settings, exit arrangements, and available deletion evidence |

For AI features, assess the specific product and deployment type. Do not apply a single training-data or processing-location statement to every Microsoft AI service.

## Customer-managed keys are not automatically provider-inaccessible encryption

Microsoft Learn distinguishes [client-side and server-side encryption models](https://learn.microsoft.com/en-us/azure/security/fundamentals/encryption-models).

With **server-side encryption using customer-managed keys**, the Azure resource provider still performs encryption and decryption. Controlling the key lifecycle is not the same as proving that the service cannot process plaintext.

With **client-side encryption**, data is encrypted outside the receiving resource provider. In the model described by Microsoft, that provider cannot decrypt the encrypted data or access its keys. However, the application performing decryption, its hosting environment, and any plaintext outputs remain part of the assessment. Functionality may be reduced.

Record key permissions, rotation, recovery, and service dependencies. Microsoft's guidance warns that loss of key-encryption keys can mean loss of data. Do not delete, disable, or revoke production keys as an informal test; design and authorise a safe exercise.

## Confidential computing has a defined boundary

[Azure confidential computing](https://learn.microsoft.com/en-us/azure/confidential-computing/overview) uses hardware-based, attested trusted execution environments to protect data in use. Microsoft describes protection against cloud-operator access when the capability is enabled and properly configured.

That is not a blanket statement about an entire application. Identify which code and data run inside the protected environment, what attestation is checked, and where inputs, outputs, identities, and external services sit. Confirm support for the required workload and region.

## Establish who operates each control

The [shared responsibility model](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility) varies by service model. Document both provider responsibilities and the organisation's configuration, application, identity, and operational responsibilities.

For each proposed control ask: **who configures it, who monitors it, who responds when it fails, and what evidence demonstrates it works?**

## Read assurance evidence within its scope

Microsoft's [compliance offerings guidance](https://learn.microsoft.com/en-us/azure/compliance/offerings/) explains that audits cover specified services and that customers remain responsible for their compliance.

Check the actual report's service scope, assessment period, exclusions, and customer responsibilities. Public documentation is a starting point, not a substitute for the applicable report. Some audit documents require authorised Service Trust Portal access; this collection does not claim to have reviewed them.

## Map NZISM requirements to evidence, not just dashboards

The [Microsoft Learn NZISM compliance guide](https://learn.microsoft.com/en-us/compliance/anz/nzism-guide) links Azure policy initiatives, Defender for Cloud, and Purview assessment templates as aids to implementation and monitoring. Start with the applicable controls in the [official NZISM](https://nzism.gcsb.govt.nz/ism-document), then map the tools to them. Do not select a template and assume that everything outside its coverage is irrelevant.

| Evidence aid | What it can contribute | What still needs checking |
|---|---|---|
| **Azure Policy NZISM initiative** | The [built-in initiative catalogue](https://learn.microsoft.com/en-us/azure/governance/policy/samples/built-in-initiatives#regulatory-compliance) identifies NZISM mappings; [regulatory-compliance guidance](https://learn.microsoft.com/en-us/azure/governance/policy/concepts/regulatory-compliance) distinguishes customer, Microsoft, and shared responsibilities | Actual initiative ID and version, mapped NZISM edition, assignment scope, parameters, effects, exclusions, exemptions, and controls outside the mapping |
| **Defender for Cloud** | The [regulatory-compliance dashboard](https://learn.microsoft.com/en-us/azure/defender-for-cloud/regulatory-compliance-dashboard) supports automated assessments and manual attestation with linked evidence | Enabled standard and plan, resource coverage, assessment date, failed checks, manual evidence quality, and unresolved customer actions |
| **Purview Compliance Manager** | [Compliance Manager](https://learn.microsoft.com/en-us/purview/compliance-manager) supports assessment templates, assigned improvement actions, evidence, testing notes, and status | Licence and template availability, version and service scope, actual implementation, test results, and ownership of shared controls |
| **Microsoft provider responses** | The [NZ government assessment page](https://learn.microsoft.com/en-us/compliance/regulatory/offering-nz-cc-framework-nz) links service-specific responses to the GCDO Risk Discovery Tool | Downloaded document version, relevant services, current supporting reports, agency-specific answers, and remaining gaps |

The built-in catalogue describes the New Zealand ISM initiative as covering a **subset** of NZISM controls. Its mapping version and the manual edition required by the organisation may differ. Record both and assess any differences explicitly. Review policy effects before assignment; do not assume every definition only audits or that a template is safe to apply unchanged in production.

A passing automated check, manually attested item, or improved compliance score is not independent certification or an agency accreditation decision. Keep provider assurance, customer implementation evidence, and the organisation's formal approval separate. Where certification and accreditation apply, carry the evidence and gaps into that process rather than treating a dashboard export as its replacement.

## Keep lawful-access questions separate

Request appropriate legal analysis of jurisdiction, applicable agreements, notice, challenge processes, and the proposed technical design. This collection does not assert that every request requires a particular legal instrument, that encryption eliminates legal obligations, or that aggregate transparency statistics establish a customer's risk.

## Output and sources

Record each control as **evidenced, partially evidenced, unresolved, or not applicable with rationale**. These are suggested evidence states, not certification grades. Carry gaps into the [decision record](/sovereignty-decision-record) and test dependencies through [continuity planning](/sovereignty-continuity).

The linked Microsoft Learn sources were reviewed through MCP on **28 October 2026**. Government-source access limitations are described in [requirements and decision rights](/sovereignty-requirements). Documentation review does not verify a customer's configuration or establish a service commitment.
