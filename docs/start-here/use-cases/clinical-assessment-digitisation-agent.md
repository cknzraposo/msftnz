# Clinical Assessment Digitisation Agent

**Version:** 1.2 | **Date:** 27 Feb 2026  
**Authors:** Garren Espin & Lesley Ruki-Willison  

---

## Business Problem

Clinical assessments for MBChB medical students are largely completed on paper, as this suits busy clinical supervisors. Professional staff manually process several thousand forms each year — scanning, reviewing completeness, and entering data into digital systems. This workflow is:

- Resource-intensive and prone to data entry errors
- A bottleneck that delays result release
- A scalability concern as student numbers grow

---

## What the Agent Should Do

The digitisation agent should be capable of:

- Reading scanned or photographed assessment forms (OCR)
- Extracting structured ratings and free-text comments
- Verifying completion of mandatory fields
- Importing required assessment grades from digital systems (e.g., Canvas exports)
- Applying approved rubric and grading logic to generate grades (Fail / Borderline Pass / Pass / Distinction)
- Triggering escalation pathways where grade thresholds or Fitness to Practise flags are met
- Flagging free-text comments for human review where potential concerns are identified
- Applying attachment-level aggregation rules to calculate overall attachment grades
- Producing structured digital outputs suitable for reporting and validation

---

## In Scope

- Extraction of structured and unstructured data from scanned/photographed forms
- Mandatory field verification
- Ingestion of grades from digital systems (e.g., Canvas)
- Application of approved rubric and grading logic
- Automatic escalation pathway triggering
- Flagging of free-text comments with safety/professionalism concerns
- Attachment-level grade aggregation
- Generation of structured outputs for reporting

## Out of Scope

- Autonomous academic decision-making
- Changes to assessment rules or governance frameworks
- Direct integration with live student systems
- Replacement of human academic review processes

---

## Expected Output (PoC)

A proof-of-concept grading agent demonstrating:
- Accurate extraction of assessment data
- Correct application of rubric and aggregation rules
- Triggering of escalation pathways
- Structured output generation
- Comparison against Access-generated results with performance evaluation metrics

---

## Available Data

- Completed scanned paper assessment forms
- Blank assessment forms
- Approved marking rubrics
- Exported electronic assessment results (e.g., Canvas grades)
- Historical Access-generated outputs for validation comparison

---

## Responsible AI Considerations

- Protection of student and clinical supervisor privacy; secure handling of anonymised data
- Accuracy and reliability of data extraction and grade calculation
- Validation of agent-generated grades against existing Access outcomes
- Transparency of rubric rules with clear traceability of grade derivation
- Human oversight and confirmation of all academic decisions prior to grade release

---

## Key Stakeholders

- Clinical supervisors (complete forms)
- MBChB professional staff (process forms)
- Academic attachment leads (review concerns)
- Medical students (affected by outcomes)
- **Point of Contact:** Lesley Ruki-Willison & Garren Espin

---

## Azure AI Services Mapping

| Capability | Azure Service | Reference |
|---|---|---|
| OCR / reading scanned & photographed forms | **Azure AI Document Intelligence** (Layout + Custom models) | [Azure AI Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/overview) |
| Extraction of structured ratings & free-text | **Azure AI Document Intelligence** – Custom Extraction | [Custom extraction models](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/concept-custom) |
| Rubric-based grading logic & reasoning | **Azure OpenAI Service** (GPT-4o) | [Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/ai-services/openai/overview) |
| Flagging free-text for safety/professionalism concerns | **Azure AI Content Safety** | [Azure AI Content Safety](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/overview) |
| Agent orchestration (escalation pathways, aggregation rules) | **Azure AI Foundry – Agent Service** | [Azure AI Foundry Agent Service](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/overview) |
| Ingestion from Canvas / external digital systems | **Azure Logic Apps** or **Azure API Management** | [Azure Logic Apps](https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-overview) |
| Secure storage of scanned forms and outputs | **Azure Blob Storage** with encryption | [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction) |
| Structured output reporting & validation | **Azure AI Foundry** + custom output schema | [Structured outputs with Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/structured-outputs) |
| Monitoring, tracing & responsible AI | **Azure AI Foundry – Evaluation & Monitoring** | [Evaluation in Azure AI Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/concepts/evaluation-approach-gen-ai) |

### Recommended Architecture Pattern

```
Scanned Form (image/PDF)
        │
        ▼
Azure AI Document Intelligence  ──►  Structured JSON (fields + free-text)
        │
        ▼
Azure OpenAI (GPT-4o)  ──►  Rubric application, grade calculation, concern detection
        │
        ▼
Azure AI Foundry Agent  ──►  Escalation logic, aggregation, output generation
        │
        ▼
Structured Output (report + grades)  ──►  Human review before release
```
