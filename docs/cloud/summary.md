---
title: "Data Sovereignty & Data Residency — What They Mean in the Public Cloud"
description: "A plain-language guide to data sovereignty and data residency from a public cloud perspective, with New Zealand-specific context."
date: 2026-03-09
lastmod: 2026-03-09
author: "NA"
tags: ["data-residency", "data-sovereignty", "public-cloud", "new-zealand", "privacy-act", "maori-data-sovereignty"]
category: "Cloud Strategy"
slug: "summary"
layout: "page"
draft: true
related:
  - "/data-residency-summary"
  - "/data-residency-detail"
  - "/data-residency-faq"
  - "/nz-cloud-region"
  - "/nz-cloud-region-faq"
---

# Data Sovereignty & Data Residency

## What They Mean in the Public Cloud

---

## Why this matters

When organisations move to the public cloud, one of the first questions is: *where does my data go, and who has authority over it?* These are not the same question. This document defines each concept clearly, explains how they relate to public cloud services, and outlines what they mean specifically in New Zealand.

---
---

*This document is shared for discussion purposes only. It does not constitute a binding commitment or commercial offer. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

---

## Key definitions

### Data residency

Data residency is the physical location where data is stored. When a cloud provider commits to data residency, they are saying: *your data at rest will be kept in this country or region*.

- It is a **geographic commitment** — your data sits in a specific place
- It applies to data **at rest** (stored data), not necessarily data in transit or during processing
- The organisation typically chooses the location when setting up the service
- The cloud provider is responsible for honouring that commitment

**What it does not mean:** Data residency alone does not determine which country's laws govern the data. Storing data in New Zealand does not automatically mean only New Zealand law applies to it.

### Data sovereignty

Data sovereignty is the principle that data is subject to the laws of the country where it is located, and that governance over the data remains with the rightful authority — whether that is a government, an organisation, or a community.

- It is a **legal and governance concept**, not just a technical one
- It determines who can compel access to the data (e.g., courts, regulators, foreign governments)
- It includes the right to control how data is collected, stored, used, and shared
- It may involve indigenous rights to govern data about their people and communities

**What it does not mean:** Data sovereignty does not automatically come from storing data locally. If the cloud provider is headquartered in another country, that country's laws may still reach the data regardless of where it is physically stored.

### The distinction

| | Data Residency | Data Sovereignty |
|---|---|---|
| **What it addresses** | Where data is physically stored | Who has legal authority and governance over the data |
| **Nature** | Technical and contractual | Legal, political, and cultural |
| **Controlled by** | Cloud provider configuration | Laws, contracts, and governance frameworks |
| **Guarantee** | The provider commits to storing data in a specific location | No single party can fully guarantee sovereignty — it depends on multiple legal systems |

You can have data residency without data sovereignty. You can also pursue sovereignty without strict residency requirements, depending on the legal framework.

---

## How this works in the public cloud

### What cloud providers can control

- **Where data is stored** — providers operate data centres in specific countries and let customers choose a region
- **Who operates the infrastructure** — the provider's staff manage the environment, subject to their employment jurisdiction
- **Encryption** — providers offer encryption at rest and in transit; some allow the customer to hold their own encryption keys
- **Access controls** — policies that limit which personnel can access customer environments, and under what conditions

### What cloud providers cannot fully control

- **Foreign legal reach** — if a provider is headquartered in the United States, US law (including the [CLOUD Act](https://www.congress.gov/bill/115th-congress/house-bill/4943)) may allow US courts to compel the provider to produce data, regardless of where it is stored. Other countries have similar laws
- **Intelligence and surveillance laws** — these vary by jurisdiction and can override contractual commitments
- **Subprocessor chains** — cloud providers use subcontractors for certain functions; data may pass through additional parties

### What this means in practice

No public cloud provider — regardless of origin — can offer absolute data sovereignty through technology alone. Sovereignty requires a combination of:

1. **Technical controls** — where data is stored, who can access it, encryption
2. **Contractual protections** — explicit agreements on data location, access, breach notification, and exit terms
3. **Legal framework** — the laws that govern the data, the provider, and the customer
4. **Governance oversight** — the customer's own policies, audits, and accountability structures

These four elements must work together. Relying on any one alone leaves gaps.

---

## Common misconceptions

**"If my data is in New Zealand, it's under New Zealand law."**
Not necessarily. If the provider is subject to foreign law (e.g., the US CLOUD Act), another government may be able to compel access. Physical location is one factor, but not the only one.

**"Data sovereignty means I need to keep everything on-premises."**
Not always. Cloud services with strong residency commitments, customer-managed encryption, and clear contractual terms can address many sovereignty concerns. On-premises or air-gapped deployments are an option for the highest sensitivity levels, but are not the only path.

**"All cloud providers are the same on sovereignty."**
They are not. Providers differ in where they are headquartered, which laws apply to them, what contractual commitments they offer, and what controls they give customers. These differences matter.

**"Encryption solves sovereignty."**
Encryption is a strong control, particularly when the customer holds the keys. However, it does not override a legal order directed at the provider. It raises the barrier significantly, but it is not a complete answer on its own.

---

## New Zealand perspective

### The [Privacy Act 2020](https://www.legislation.govt.nz/act/public/2020/0031/latest/LMS23223.html)

New Zealand's primary data protection law. Key points relevant to public cloud:

- Organisations must ensure personal information is protected, including when it is held by a third party such as a cloud provider
- Personal data can be transferred overseas, but the organisation must ensure comparable safeguards exist, or obtain informed consent
- There is **no legal requirement** to store data within New Zealand — the Act focuses on protection standards, not physical location
- The Act places accountability on the organisation that collects the data, not on the cloud provider

### Cloud First policy

The New Zealand Government operates a **[Cloud First policy](https://www.digital.govt.nz/standards-and-guidance/technology-and-architecture/cloud-services/)**, meaning government agencies should adopt public cloud services by default unless there is a specific reason not to. Key requirements:

- Agencies must classify their information and assess risk before adopting cloud services
- Data classified as **RESTRICTED or lower** can be hosted in public cloud
- Over time, RESTRICTED-classified data should be hosted in **certified New Zealand-based data centres**
- All cloud adoption decisions must consider Māori data interests and sustainability
- The Government Chief Digital Officer (GCDO) has established a **Public Cloud Data Centre Certification (PCDCC)** programme — providers must meet New Zealand's [Protective Security Requirements](https://www.protectivesecurity.govt.nz/) to host government data

### Māori data sovereignty

Māori data sovereignty is recognised as a distinct and important dimension in New Zealand. It is grounded in the principles of Te Tiriti o Waitangi and the framework established by **[Te Mana Raraunga](https://www.temanararaunga.maori.nz/)** (the Māori Data Sovereignty Network).

Core principles:

| Principle | Meaning |
|-----------|---------|
| **Rangatiratanga** (Authority) | Māori have the right to govern data about Māori — from collection to storage to use |
| **Whakapapa** (Relationships) | Data should reflect connections and context, recognising consequences for future generations |
| **Whanaungatanga** (Obligations) | Balances individual rights with collective responsibilities |
| **Kotahitanga** (Collective benefit) | Data practices must support Māori development and wellbeing |
| **Manaakitanga** (Reciprocity) | Data must be used with dignity — never to stigmatise or cause harm |
| **Kaitiakitanga** (Guardianship) | Māori exercise guardianship over their data, including decisions about access and storage |

These principles apply regardless of where data is physically stored. An organisation using public cloud services to hold data about Māori communities has an obligation to consider these principles — not just as a policy matter, but as a responsibility under Te Tiriti o Waitangi.

The Waitangi Tribunal (WAI 2522, 2023) has affirmed that Māori Data Sovereignty equates to Māori Data Governance, reinforcing Māori authority under Te Tiriti.

### What this means for New Zealand organisations

1. **There is no law that forces you to store data in New Zealand** — but there may be strong reasons to do so, including regulatory expectations, risk management, and Māori data obligations
2. **Government agencies have additional requirements** — Cloud First policy, information classification, PCDCC certification, and explicit consideration of Māori data interests
3. **Residency is now possible locally** — with the Azure New Zealand North region (and other providers), organisations can store data in-country without compromising on capability
4. **Sovereignty requires more than residency** — even with data stored in New Zealand, organisations must address contractual terms, encryption controls, access governance, and the legal reach of foreign jurisdictions
5. **Māori data sovereignty is not optional** — it is a distinct obligation that sits alongside (not within) broader data governance frameworks

---

## Questions to ask your cloud provider

These questions help assess whether a provider's offering meets your residency and sovereignty needs:

1. Where will my data be stored at rest? Is this a contractual commitment or a default that can change?
2. Under which country's laws does your company operate? What foreign legal instruments could compel you to produce my data?
3. Can I hold my own encryption keys? If so, can you still access my data without them?
4. Who has access to my data and under what circumstances? How is access audited?
5. Do you use subprocessors? Where are they located and what data do they handle?
6. What happens to my data when I leave the service? How is deletion verified?
7. How do you support compliance with the New Zealand Privacy Act 2020?
8. What certifications do you hold relevant to New Zealand government requirements (e.g., PCDCC, IRAP, NZISM)?
9. How do you accommodate Māori data sovereignty requirements in your service design and governance?

---

*This document is shared for discussion purposes only. It does not constitute a binding commitment or commercial offer. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

---

## Key references

- [New Zealand Privacy Act 2020](https://www.legislation.govt.nz/act/public/2020/0031/latest/LMS23223.html) — full text on the NZ Legislation website
- [US CLOUD Act (H.R.4943)](https://www.congress.gov/bill/115th-congress/house-bill/4943) — Clarifying Lawful Overseas Use of Data Act, via Congress.gov
- [NZ Government Cloud First Policy — Cabinet Papers](https://www.digital.govt.nz/standards-and-guidance/technology-and-architecture/cloud-services/) — cloud adoption policy and strategy guidance
- [Te Mana Raraunga — Māori Data Sovereignty Network](https://www.temanararaunga.maori.nz/) — charter, principles, and resources on Māori data sovereignty
- [Waitangi Tribunal WAI 2522 — E-Commerce and Māori Data Sovereignty (PDF)](https://forms.justice.govt.nz/search/Documents/WT/wt_DOC_167236540/Wai%202522,%20B026(b).pdf) — Tribunal report affirming Māori data governance under Te Tiriti
- [Azure Regions List — including New Zealand North](https://learn.microsoft.com/en-us/azure/reliability/regions-list) — official Microsoft reference for all Azure regions
- [New Zealand Information Security Manual (NZISM)](https://nzism.gcsb.govt.nz/) — NZ Government information security standard, maintained by the GCSB
- [Protective Security Requirements (PSR)](https://www.protectivesecurity.govt.nz/) — NZ Government framework for personnel, physical, and information security

---

## Related pages

- [Data Residency — Summary](/data-residency-summary) — options available across Azure and Microsoft 365
- [Data Residency — Detail](/data-residency-detail) — full breakdown of M365, Azure, sovereignty controls, and legal considerations
- [Data Residency — FAQ](/data-residency-faq) — common questions about data residency and sovereignty
- [Azure NZ North — Region Dossier](/nz-cloud-region) — available services, service rings, DR architecture, compliance, pricing
- [Azure NZ North — FAQ](/nz-cloud-region-faq) — common questions about the New Zealand North region
