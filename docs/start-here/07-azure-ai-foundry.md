# 07 – Microsoft Foundry

Microsoft Foundry is the platform you will use to build, deploy, and manage AI agents for this hackathon. It brings together model deployment, agent orchestration, tools, evaluation, and observability in one place.

This guide is written for both hackathon teams and independent learners. UI labels can change over time, so if your portal looks different, follow the intent of each step.

---

## What Is Microsoft Foundry?

Microsoft Foundry is the current unified platform for enterprise AI development. It provides:

- **Model catalog** — Access to Azure OpenAI and other Foundry-supported models
- **Foundry Agent Service** — Build prompt, workflow, and hosted agents
- **Tool integration** — Add MCP tools, file/web search, and custom function tools
- **Evaluation and tracing** — Measure quality and inspect runtime behavior
- **Responsible AI controls** — Safety guardrails, governance, and monitoring

📖 Reference: [What is Microsoft Foundry?](https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry)

---

## Key Concepts

| Concept | Description |
| --- | --- |
| **Foundry resource** | The Azure resource boundary for billing, governance, and platform capabilities. |
| **Project** | The workspace where your team builds and manages models, tools, and agents. |
| **Deployment** | A specific model deployment you call from code using its deployment name. |
| **Conversation/Response** | The modern runtime pattern for agent interactions (replacing older thread/run patterns). |
| **Agent version** | A versioned definition of an agent (instructions + model + tools). |

> If your team already has a pre-created project, you can skip setup steps and start at model deployment/testing.

---

## Step 1 – Access Foundry

1. Go to [ai.azure.com](https://ai.azure.com)
2. Sign in with the Microsoft account linked to your Azure subscription
3. Open the project your team will use

📖 Reference: [Foundry portal overview](https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry#foundry-portal)

---

## Step 2 – Create a Foundry Resource and Project (If Needed)

If your facilitator has already provisioned these, use the existing project.

1. Create or select a Foundry resource
2. Create a project (for example: `proj-clinical-assessment`)
3. Confirm you can open the project home page

For hackathon teams, use the naming/location convention provided by your facilitator.
For independent setup, choose a region that supports both Foundry and your required models.

📖 Reference: [Create a project](https://learn.microsoft.com/en-us/azure/foundry/how-to/create-projects)

---

## Step 3 – Deploy a Model

1. In your project, open the model deployment area (Model catalog/Deployments)
2. Pick a model supported in your region and scenario
3. Create a deployment with a clear name (for example: `chat-main`)
4. Use latest stable model version unless your use case requires preview features

Do not hard-code model family choices in planning docs. Always verify current model and region availability first.

📖 Reference: [Models sold directly by Azure](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure)

---

## Step 4 – Test in Playground

Before writing code:

1. Open playground/chat in your project
2. Select your deployment
3. Add a simple system instruction, for example:

   ```text
   You are a helpful assistant that summarises immunisation guidelines clearly and concisely.
   ```

4. Send a test prompt and verify you get a response

---

## Step 5 – Authentication Options (Use Either)

Use whichever option matches your team setup.

See [04 – Python Setup – Step 5: Use a `.env` File for Secrets](04-python-setup.md#step-5--use-a-env-file-for-secrets) for how to create and load a `.env` file.

### Option A – API Key

Store these in `.env`:

```env
AZURE_OPENAI_BASE_URL=https://your-resource.openai.azure.com/openai/v1/
AZURE_OPENAI_API_KEY=your-api-key-here
AZURE_OPENAI_DEPLOYMENT=chat-main
```

### Option B – Microsoft Entra ID (DefaultAzureCredential)

Store these in `.env`:

```env
AZURE_OPENAI_BASE_URL=https://your-resource.openai.azure.com/openai/v1/
AZURE_OPENAI_DEPLOYMENT=chat-main
```

You also need appropriate RBAC permissions (for example, Cognitive Services OpenAI User) on the resource/project.

> Security reminder: never commit `.env` or secrets. Use secure secret storage for production (for example, Azure Key Vault).

📖 Reference: [Azure OpenAI v1 API lifecycle and authentication](https://learn.microsoft.com/en-us/azure/foundry/openai/api-version-lifecycle)

---

## Step 6 – Call Your Model from Python (Current Recommended Path)

Install dependencies:

```bash
pip install --upgrade openai azure-identity python-dotenv
```

### API key example

```python
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    base_url=os.getenv("AZURE_OPENAI_BASE_URL"),
)

response = client.responses.create(
    model=os.getenv("AZURE_OPENAI_DEPLOYMENT"),
    input="What is Microsoft Foundry?",
)

print(response.output_text)
```

### Entra ID example

```python
import os
from dotenv import load_dotenv
from openai import OpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

load_dotenv()

token_provider = get_bearer_token_provider(
    DefaultAzureCredential(),
    "https://ai.azure.com/.default",
)

client = OpenAI(
    api_key=token_provider,
    base_url=os.getenv("AZURE_OPENAI_BASE_URL"),
)

response = client.responses.create(
    model=os.getenv("AZURE_OPENAI_DEPLOYMENT"),
    input="What is Microsoft Foundry?",
)

print(response.output_text)
```

📖 Reference: [Use the Azure OpenAI Responses API](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses)

---

## Step 7 – Legacy Compatibility Path (Older Projects)

If your existing codebase still uses older Azure OpenAI patterns, keep it only as a transition path and plan migration.

```python
import os
from openai import AzureOpenAI
from dotenv import load_dotenv

load_dotenv()

client = AzureOpenAI(
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version="2024-02-01",
)

response = client.chat.completions.create(
    model=os.getenv("AZURE_OPENAI_DEPLOYMENT"),
    messages=[
        {"role": "system", "content": "You are a helpful AI assistant."},
        {"role": "user", "content": "What is Microsoft Foundry?"},
    ],
)

print(response.choices[0].message.content)
```

📖 Reference: [API evolution and migration notes](https://learn.microsoft.com/en-us/azure/foundry/openai/api-version-lifecycle#api-evolution)

---

## Step 8 – Build a Simple Agent with Foundry Agent Service

Install dependencies:

```bash
pip install "azure-ai-projects>=2.0.0" azure-identity openai
```

> **Code-first vs. portal-first agents:** The example below creates the agent definition directly in code via `project.agents.create_version(...)`. This is convenient for reproducible setup and source control. Alternatively, you can **pre-create the agent in the Foundry portal** (ai.azure.com -> your project -> Agents) with its instructions, model, and tools, then just reference it by name from code - skip the `create_version` call and use the agent name you defined in the portal when setting `agent_reference.name` below. Portal-first is useful when non-developers need to author or tune agent instructions, or when you want to separate agent configuration from application deployment.

Example (current agent pattern):

```python
import os
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import PromptAgentDefinition

project = AIProjectClient(
    endpoint=os.getenv("FOUNDRY_PROJECT_ENDPOINT"),
    credential=DefaultAzureCredential(),
)

openai_client = project.get_openai_client()

# Option 1: Create the agent from code (shown here).
# Option 2: Pre-create the agent in the Foundry portal and skip this block -
# just use its name in the agent_reference below.
agent = project.agents.create_version(
    agent_name="my-first-agent",
    definition=PromptAgentDefinition(
        model=os.getenv("AZURE_OPENAI_DEPLOYMENT"),
        instructions="You are a helpful assistant. Answer clearly and concisely.",
    ),
)

conversation = openai_client.conversations.create(
    items=[
        {
            "type": "message",
            "role": "user",
            "content": "What are the key steps in building an AI agent?",
        }
    ]
)

response = openai_client.responses.create(
    conversation=conversation.id,
    input="Respond with 5 concise bullet points.",
    extra_body={
        "agent_reference": {
            "name": agent.name,
            "type": "agent_reference",
        }
    },
)

for item in response.output:
    if item.type == "message":
        for block in item.content:
            print(block.text)
```

If you are migrating from classic agents (threads/runs/create_agent), use the migration guide.

📖 References:

- [What is Microsoft Foundry Agent Service?](https://learn.microsoft.com/en-us/azure/foundry/agents/overview)
- [Migrate to the new agents developer experience](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/migrate)

---

## Step 9 – Evaluate, Trace, and Monitor

Use Foundry observability and evaluation together:

1. Trace agent runs to inspect tool calls, latency, and output behavior
2. Run evaluations for quality and safety signals
3. Monitor ongoing reliability and performance in dashboards

Common quality dimensions:

- **Groundedness**
- **Relevance**
- **Coherence**
- **Safety**

📖 References:

- [Agent tracing overview](https://learn.microsoft.com/en-us/azure/foundry/observability/concepts/trace-agent-concept)
- [What's new in Microsoft Foundry docs](https://learn.microsoft.com/en-us/azure/foundry/whats-new-foundry)

---

## Regional and Compliance Notes (NZ Teams)

- Confirm that your chosen region supports the model family and API features you need.
- For Aotearoa New Zealand organisations, validate data residency and sovereignty requirements before production rollout.
- Engage your security/compliance stakeholders early for production deployments.

This document is intended as a guide for clarity and shared understanding. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.

---

## ✅ Checkpoint

Before starting your use case work, confirm:

- [ ] You can sign in to [ai.azure.com](https://ai.azure.com) and open the correct project
- [ ] A model deployment is created and testable in playground
- [ ] You can call the model successfully from Python using at least one auth method (API key or Entra ID)
- [ ] If using legacy code, you have a migration plan to v1/OpenAI client patterns
- [ ] `.env` and secrets are excluded from source control
- [ ] You have reviewed region availability for your selected models

---

## 📚 Further Learning

| Resource | Link |
| --- | --- |
| Microsoft Foundry overview | [learn.microsoft.com/azure/foundry](https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry) |
| Foundry Agent Service overview | [learn.microsoft.com – Agent Service](https://learn.microsoft.com/en-us/azure/foundry/agents/overview) |
| Agent migration guide | [learn.microsoft.com – Agent migration](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/migrate) |
| Azure OpenAI Responses API | [learn.microsoft.com – Responses API](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses) |
| Azure OpenAI API lifecycle | [learn.microsoft.com – API version lifecycle](https://learn.microsoft.com/en-us/azure/foundry/openai/api-version-lifecycle) |
| Foundry models and region support | [learn.microsoft.com – Models by region](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure) |
| Azure AI Search + RAG | [learn.microsoft.com – RAG overview](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview) |
| Azure AI Document Intelligence | [learn.microsoft.com – Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/overview) |
| Foundry Local (on-device AI) | [learn.microsoft.com – Foundry Local](https://learn.microsoft.com/en-us/azure/foundry-local/what-is-foundry-local) |

---

## Disclaimer

*The opinions expressed herein are my own personal opinions and do not represent my employer's view in any way. Presentation Resources are provided as is with no guarantees or warranties of any kind.*

API versions, model availability, SDK behavior, and portal UI can change. Re-verify official Microsoft documentation before production deployment.

---

## 🎉 You're Ready

You now have the core setup to start building. Refer to the use case documents in the [Use Cases section](README.md#use-cases) for specific project requirements.

Good luck with the hackathon!

