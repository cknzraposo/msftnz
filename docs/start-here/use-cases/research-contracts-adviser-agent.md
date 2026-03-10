# Research Contracts Adviser Agent

**Point of Contact:** Louise Dickinson  
**Team:** Research Grants and Contracts (RGC Team), University of Auckland

---

## Business Problem

A university team (RGC) is responsible for reviewing research contracts drafted by external organisations. Each contract must be checked against the university's standard positions and template agreements. This process is currently:

- Manual and time-consuming
- Repetitive across a large volume of contract types
- A bottleneck that slows research activity
- At risk of missing important issues due to human fatigue or inconsistency

---

## What the Agent Should Do

A contract review adviser agent should assist staff by:

- Recognising the type of contract uploaded by the user
- Comparing contract clauses against UoA's standard positions and templates
- Identifying and highlighting deviations from standard positions
- Flagging potential risks for human consideration
- Producing a structured review report with colour-coded flag categories

---

## Contract Types Covered (In Scope)

```
CONTRACTS
├── Public Research Contracts
├── Commercial Research Contracts
├── Subcontracts
├── Material Transfer Agreements (MTAs)
├── Data Transfer Agreements (DTAs)
├── Collaboration Agreements
└── Confidential Disclosure Agreements (CDAs)
```

**In scope for PoC:** Research Contracts, Research Subcontracts, Material Transfer Agreements, Data Transfer Agreements, and Collaboration Agreements.

---

## In Scope

- Recognising the contract type uploaded by the user
- Comparing contract clauses against UoA standard positions
- Highlighting deviations from standard positions
- Flagging potential risks for human review

## Out of Scope

- Providing legal advice
- Approving contracts
- Integrating with live contract management systems

---

## Expected Output (PoC)

A proof-of-concept adviser agent that produces a structured contract review report, showing flags under four categories:

| Flag | Meaning |
|---|---|
| 🟢 **Green Flag** | Aligns with UoA positions |
| 🟡 **Amber Flag** | Requires Contract Manager review |
| 🔴 **Red Flag** | Conflicts with UoA positions; deviation identified |
| 🔵 **Blue Flag** | Not covered in current UoA standards |

Each flag should include:
- Clause number / title
- Short snippet of the relevant clause text
- Rationale for the flag

---

## Available Data

- Standard university contract templates
- Documented university contracting positions
- Anonymised example research contracts

---

## Responsible AI Considerations

- Confidential handling of contract information
- Transparency in how issues are identified (explainable flags)
- Strong human oversight — all decisions made by qualified contract reviewers
- No autonomous legal conclusions

---

## Key Stakeholders

- **Primary:** Research contract reviewers (RGC Team)
- **Secondary:** Researchers, legal advisers, research support staff
- **Point of Contact:** Louise Dickinson

---

## Azure AI Services Mapping

| Capability | Azure Service | Reference |
|---|---|---|
| Parsing and reading uploaded contract documents (PDF/DOCX) | **Azure AI Document Intelligence** (Layout model) | [Azure AI Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/overview) |
| Indexing UoA standard positions and contract templates | **Azure AI Search** | [Azure AI Search](https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search) |
| Clause comparison, deviation detection, risk flagging | **Azure OpenAI Service** (GPT-4o) with RAG | [Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/ai-services/openai/overview) |
| Agent orchestration (upload → parse → compare → report) | **Azure AI Foundry – Agent Service** | [Azure AI Foundry Agent Service](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/overview) |
| Structured output (colour-coded report) | **Azure OpenAI Structured Outputs** | [Structured outputs](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/structured-outputs) |
| Confidential document storage | **Azure Blob Storage** (private, with RBAC) | [Azure Blob Storage security](https://learn.microsoft.com/en-us/azure/storage/blobs/security-recommendations) |
| Monitoring, quality evaluation & responsible AI | **Azure AI Foundry – Evaluation** | [Evaluation in Azure AI Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/concepts/evaluation-approach-gen-ai) |

### Recommended Architecture Pattern

```
User uploads Contract (PDF/DOCX)
        │
        ▼
Azure AI Document Intelligence  ──►  Extracted text + clause structure
        │
        ▼
Azure AI Foundry Agent
        │
        ├──► Azure AI Search  ──►  Retrieves matching UoA standard positions & templates
        │
        └──► Azure OpenAI (GPT-4o)  ──►  Compares clauses, assigns flag categories
                │
                ▼
        Structured Review Report (Green / Amber / Red / Blue flags)
                │
                ▼
        Contract Reviewer (RGC Team) reviews and makes decisions
```

### Suggested Prompt Design

The agent should be grounded with UoA's standard contracting positions loaded into **Azure AI Search**, and the system prompt should instruct the model to:
1. Identify the contract type
2. Retrieve the relevant UoA positions for that contract type
3. Evaluate each significant clause against those positions
4. Output a structured JSON report that maps to the 4-flag system

See: [Grounding with Azure AI Search in Azure AI Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/concepts/retrieval-augmented-generation)
