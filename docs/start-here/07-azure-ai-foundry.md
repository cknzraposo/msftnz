# 07 – Azure AI Foundry

Azure AI Foundry is the platform you will use to build, deploy, and manage AI agents for this hackathon. It brings together model deployment, data connections, agent orchestration, and evaluation in one place.

---

## What is Azure AI Foundry?

Azure AI Foundry is a unified platform for enterprise AI development. It provides:

- **Model catalogue** — Access to GPT-4o, o1, Phi, and other foundation models
- **Azure AI Agent Service** — Build agents that use tools, call APIs, and reason over data
- **Azure AI Search integration** — Ground your agents in your own documents (RAG)
- **Prompt Flow** — Visual and code-first workflow orchestration
- **Evaluation** — Built-in tools to measure quality, safety, and groundedness
- **Responsible AI** — Content safety, monitoring, and audit trails

📖 Reference: [Azure AI Foundry overview](https://learn.microsoft.com/en-us/azure/ai-studio/what-is-ai-studio)

---

## Key Concepts

| Concept | Description |
|---|---|
| **Hub** | The top-level organisational unit. Shared across projects in your team. Manages shared connections, compute, and security. |
| **Project** | A workspace within a Hub for a specific use case. Each team will have their own project. |
| **Deployment** | A specific model (e.g. GPT-4o) made available via an endpoint in your project. |
| **Connection** | A link to an external service (Azure AI Search, Blob Storage, etc.) used by your project. |
| **Agent** | An AI assistant configured with instructions, tools, and data sources. |

---

## Step 1 – Access Azure AI Foundry

1. Go to [ai.azure.com](https://ai.azure.com)
2. Sign in with the same Microsoft account linked to your Azure subscription
3. You'll land on the **Azure AI Foundry home page**

> **If your facilitator has already created a Hub and Project for your team**, skip to Step 4 and connect to the existing project.

---

## Step 2 – Create a Hub (Team Lead / First-Time Setup)

A Hub is shared across your team. Typically one person creates it and others connect to it.

1. In the left nav, click **Management** → **All hubs**
2. Click **+ New hub**
3. Fill in:
   - **Hub name:** `hub-uoa-hackathon-<team-name>`
   - **Subscription:** Select your subscription
   - **Resource Group:** Use the one you created in guide 05
   - **Location:** Australia East (or as directed)
4. Click **Next** and review → **Create**

📖 Reference: [Create an Azure AI Foundry hub](https://learn.microsoft.com/en-us/azure/ai-studio/how-to/create-azure-ai-resource)

---

## Step 3 – Create a Project

1. From your Hub, click **+ New project**
2. Give it a name: e.g. `proj-clinical-assessment` or `proj-immunisation-adviser`
3. Click **Create**

Your project will have its own:
- Model deployments
- Connections
- Agents
- Evaluation runs

---

## Step 4 – Deploy a Model

1. Inside your project, go to **Model catalogue** in the left nav
2. Search for **gpt-4o**
3. Click on the model → **Deploy**
4. Configure:
   - **Deployment name:** `gpt-4o` (keep it simple — this is what you use in code)
   - **Model version:** Latest available
   - **Tokens per minute (TPM):** Set as directed by your facilitator
5. Click **Deploy**

Once deployed, you'll see it listed under **Deployments** with an endpoint URL and API key.

📖 Reference: [Deploy a model in Azure AI Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/how-to/deploy-models-openai)

---

## Step 5 – Test in the Playground

Before writing any code, test your deployed model in the Playground:

1. In the left nav, click **Playground** → **Chat**
2. Select your `gpt-4o` deployment from the dropdown
3. Enter a **System message** (this is the agent's instructions), e.g.:
   ```
   You are a helpful assistant that summarises immunisation guidelines clearly and concisely.
   ```
4. Type a question in the chat and press Enter

Experiment with different system prompts to understand how they shape the model's behaviour.

---

## Step 6 – Get Your Connection Details

To call your model from Python, you need the endpoint and API key.

1. Go to **Settings** → **Connections** inside your project
2. Find your Azure OpenAI connection
3. Note the **endpoint URL** and click **Show API key** to copy the key

Store these in your `.env` file (as shown in guide 04):
```
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your-api-key-here
AZURE_OPENAI_DEPLOYMENT=gpt-4o
```

> **Security reminder:** Never commit your `.env` file or paste keys into your code. Keep them in `.env` and add `.env` to `.gitignore`.

---

## Step 7 – Call Your Model from Python

With your `.env` configured and virtual environment active:

```python
import os
from openai import AzureOpenAI
from dotenv import load_dotenv

load_dotenv()

client = AzureOpenAI(
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version="2024-02-01"
)

response = client.chat.completions.create(
    model=os.getenv("AZURE_OPENAI_DEPLOYMENT"),  # deployment name
    messages=[
        {"role": "system", "content": "You are a helpful AI assistant."},
        {"role": "user", "content": "What is Azure AI Foundry?"}
    ]
)

print(response.choices[0].message.content)
```

📖 Reference: [Azure OpenAI Python quickstart](https://learn.microsoft.com/en-us/azure/ai-services/openai/quickstart?tabs=python)

---

## Step 8 – Build a Simple Agent with Azure AI Agent Service

The Azure AI Agent Service lets you build agents that can use tools and reason over documents.

**Install the SDK:**
```bash
pip install azure-ai-projects azure-identity
```

**Basic agent example:**
```python
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from dotenv import load_dotenv

load_dotenv()

client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.getenv("AZURE_AI_PROJECT_CONNECTION_STRING")
)

agent = client.agents.create_agent(
    model=os.getenv("AZURE_OPENAI_DEPLOYMENT"),
    name="my-first-agent",
    instructions="You are a helpful assistant. Answer questions clearly and concisely."
)

thread = client.agents.create_thread()
message = client.agents.create_message(
    thread_id=thread.id,
    role="user",
    content="What are the key steps in building an AI agent?"
)

run = client.agents.create_and_process_run(
    thread_id=thread.id,
    assistant_id=agent.id
)

messages = client.agents.list_messages(thread_id=thread.id)
print(messages.get_last_text_message_by_role("assistant").text.value)
```

📖 Reference: [Azure AI Agent Service quickstart](https://learn.microsoft.com/en-us/azure/ai-services/agents/quickstart)

---

## Step 9 – Evaluate Your Agent

Azure AI Foundry includes built-in evaluation tools to measure:
- **Groundedness** — Are responses backed by your source documents?
- **Relevance** — Are responses relevant to the question?
- **Coherence** — Are responses well-structured and clear?
- **Safety** — Are responses free from harmful content?

To run an evaluation:
1. In the left nav, click **Evaluation**
2. Click **+ New evaluation**
3. Select your dataset (example Q&A pairs) and the model/deployment to evaluate
4. Review the results dashboard

📖 Reference: [Evaluate generative AI apps in Azure AI Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/concepts/evaluation-approach-gen-ai)

---

## ✅ Checkpoint

Before starting your use case work, confirm:

- [ ] You can sign in to [ai.azure.com](https://ai.azure.com) and see your project
- [ ] GPT-4o is deployed and visible under **Deployments**
- [ ] You can send a chat message in the Playground and receive a response
- [ ] Running the Python code sample above returns a response from the model
- [ ] Your `.env` file has the endpoint, API key, and deployment name — and `.env` is in `.gitignore`

---

## 📚 Further Learning

| Resource | Link |
|---|---|
| Azure AI Foundry documentation | [learn.microsoft.com/azure/ai-studio](https://learn.microsoft.com/en-us/azure/ai-studio/) |
| Azure OpenAI Service documentation | [learn.microsoft.com/azure/ai-services/openai](https://learn.microsoft.com/en-us/azure/ai-services/openai/) |
| Azure AI Agent Service quickstart | [learn.microsoft.com – Agents quickstart](https://learn.microsoft.com/en-us/azure/ai-services/agents/quickstart) |
| Azure AI Search + RAG | [learn.microsoft.com – RAG overview](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview) |
| Azure AI Document Intelligence | [learn.microsoft.com – Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/overview) |
| Microsoft Learn – AI Foundry learning path | [learn.microsoft.com – AI Foundry skills](https://learn.microsoft.com/en-us/training/paths/create-custom-copilots-ai-studio/) |

---

## 🎉 You're Ready

You now have everything set up to start building. Refer back to the use case documents in the `UseCases` folder for the specific requirements of each project.

Good luck with the hackathon!
