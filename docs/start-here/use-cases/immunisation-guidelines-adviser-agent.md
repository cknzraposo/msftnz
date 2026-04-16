# Immunisation Guidelines Adviser Agent

**Point of Contact:** Theo Brandt  
**Organisation:** Immunisation Advisory Centre (IMAC), University of Auckland

---

## Business Problem

The Immunisation Advisory Centre (IMAC) provides clinical advice to health professionals by phone and email. A large proportion of incoming questions are repetitive and relate to information already available in official immunisation guidance. This means clinical advisors:

- Spend excessive time answering common, repeated questions
- Must manually search for references, slowing response times
- Risk inconsistency in advice given across advisors
- Have reduced capacity for complex or escalated cases

---

## What the Agent Should Do

The adviser agent should help clinical advisors by:

- Taking prompts from advisors (questions posed by health professionals)
- Quickly locating relevant sections within official immunisation guidance
- Summarising guidance clearly and concisely
- Clearly citing the source material (document, section, URL)
- Supporting faster, more consistent responses
- Classifying the nature of the call (potential CRM integration)

Final clinical decisions always remain with qualified clinical staff.

---

## In Scope

- Retrieval and summarisation of approved immunisation guidance
- Clear citation of authoritative source material
- Support for clinical advisors handling common questions
- Classification of call type
- Potential integration with CRM

## Out of Scope

- Medical diagnosis or treatment decisions
- Autonomous clinical advice
- Connection to live production systems

---

## Expected Output (PoC)

A proof-of-concept adviser agent that:
- Takes prompts from a clinical advisor
- Provides answers to common immunisation questions
- Provides clear references to authoritative source material

---

## Available Data

- Official online immunisation guidance documents
- Publicly available website content
- Approved clinical reference material
- Anonymised example questions
- Call transcripts and recordings (Amazon Connect environment, stored in University storage)

---

## Responsible AI Considerations

- Clinical safety — must not generate speculative or fabricated responses
- Accuracy and transparency of sources cited
- No autonomous clinical advice; human advisor makes final decision
- Avoidance of hallucinated references

---

## Key Stakeholders

- Clinical advisors at IMAC
- Health professionals seeking immunisation advice
- Staff responsible for guidance systems and public health content

---

## Azure AI Services Mapping

| Capability | Azure Service | Reference |
|---|---|---|
| Indexing and searching immunisation guidance documents | **Azure AI Search** (with semantic ranking) | [Azure AI Search](https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search) |
| Retrieval-Augmented Generation (RAG) for grounded answers | **Azure OpenAI in Microsoft Foundry** (e.g., GPT-4.1 or later) + **Foundry IQ** | [Foundry Models](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure) |
| Managed knowledge base for guidance documents | **Foundry IQ** (preview) — auto-chunking, vector embeddings, agentic retrieval with citations | [Foundry IQ](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-foundry-iq) |
| Agent orchestration (prompt → retrieve → summarise → cite) | **Microsoft Foundry – Agent Service** (prompt agent or workflow agent) | [Microsoft Foundry Agent Service](https://learn.microsoft.com/en-us/azure/foundry/agents/overview) |
| Ensuring clinical safety & avoiding hallucinations | **Azure AI Content Safety** + **Foundry Guardrails** + grounding with citations | [Guardrails overview](https://learn.microsoft.com/en-us/azure/foundry/guardrails/guardrails-overview) |
| Ingestion and chunking of guidance documents | **Azure AI Document Intelligence** + **Foundry IQ indexer** (or Azure AI Search indexer) | [AI enrichment pipeline](https://learn.microsoft.com/en-us/azure/search/cognitive-search-concept-intro) |
| Call transcript ingestion (from Amazon Connect) | **Azure Blob Storage** + **Azure AI Search indexer** | [Index blob storage](https://learn.microsoft.com/en-us/azure/search/search-howto-indexing-azure-blob-storage) |
| CRM integration | **Azure Logic Apps** or **Azure API Management** | [Azure Logic Apps](https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-overview) |
| Monitoring & evaluation of answer quality | **Microsoft Foundry – Evaluation** | [Evaluation in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/evaluate-agent) |

### Recommended Architecture Pattern

```
Advisor Prompt (question from health professional)
        │
        ▼
Foundry Agent (prompt or workflow agent)
        │
        ├──► Foundry IQ Knowledge Base  ──►  Agentic retrieval across guidance sources (with citations)
        │         │
        │         └──► Azure AI Search  ──►  Underlying indexing & semantic ranking
        │
        └──► Azure OpenAI in Foundry  ──►  Summarises answer, formats with citations
                │
                ▼
        Grounded Response with Source References
                │
                ▼
        Clinical Advisor reviews → provides advice to health professional
```

### Key Design Principle

All answers must be **grounded** in retrieved source documents. Use [Foundry IQ](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-foundry-iq) with Azure AI Search's [semantic ranker](https://learn.microsoft.com/en-us/azure/search/semantic-search-overview) for agentic retrieval — Foundry IQ decomposes complex questions into sub-queries, runs parallel searches, and returns results with extractive citations. Combined with [Foundry Guardrails](https://learn.microsoft.com/en-us/azure/foundry/guardrails/guardrails-overview), this prevents hallucination and ensures every claim links to an authoritative source.

