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
| Retrieval-Augmented Generation (RAG) for grounded answers | **Azure OpenAI Service** (GPT-4o) + **Azure AI Search** | [RAG with Azure AI Search](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview) |
| Agent orchestration (prompt → retrieve → summarise → cite) | **Azure AI Foundry – Agent Service** | [Azure AI Foundry Agent Service](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/overview) |
| Ensuring clinical safety & avoiding hallucinations | **Azure AI Content Safety** + grounding with citations | [Azure AI Content Safety](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/overview) |
| Ingestion and chunking of guidance documents | **Azure AI Document Intelligence** + **Azure AI Search indexer** | [AI enrichment pipeline](https://learn.microsoft.com/en-us/azure/search/cognitive-search-concept-intro) |
| Call transcript ingestion (from Amazon Connect) | **Azure Blob Storage** + **Azure AI Search indexer** | [Index blob storage](https://learn.microsoft.com/en-us/azure/search/search-howto-indexing-azure-blob-storage) |
| CRM integration | **Azure Logic Apps** or **Azure API Management** | [Azure Logic Apps](https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-overview) |
| Monitoring & evaluation of answer quality | **Azure AI Foundry – Evaluation** | [Evaluation in Azure AI Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/concepts/evaluation-approach-gen-ai) |

### Recommended Architecture Pattern

```
Advisor Prompt (question from health professional)
        │
        ▼
Azure AI Foundry Agent
        │
        ├──► Azure AI Search  ──►  Retrieves relevant guidance chunks (with citations)
        │
        └──► Azure OpenAI (GPT-4o)  ──►  Summarises answer, formats with citations
                │
                ▼
        Grounded Response with Source References
                │
                ▼
        Clinical Advisor reviews → provides advice to health professional
```

### Key Design Principle

All answers must be **grounded** in retrieved source documents. Use Azure AI Search's [semantic ranker](https://learn.microsoft.com/en-us/azure/search/semantic-search-overview) and Azure OpenAI's [grounding capabilities](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/system-message#using-system-message-to-define-the-models-output) to prevent hallucination and ensure every claim links to an authoritative source.
