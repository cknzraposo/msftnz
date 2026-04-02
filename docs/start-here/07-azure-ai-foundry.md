# 07 – Microsoft Foundry

Microsoft Foundry is the platform you will use to build, deploy, and manage AI agents for this hackathon. It brings together model deployment, data connections, agent orchestration, and evaluation in one place.

---

## What is Microsoft Foundry?

Microsoft Foundry is a unified platform for enterprise AI development. It provides:

- **Model catalogue** — Access to GPT-4o, o1, Phi, and other foundation models
- **Azure AI Agent Service** — Build agents that use tools, call APIs, and reason over data
- **Azure AI Search integration** — Ground your agents in your own documents (RAG)
- **Evaluation** — Built-in tools to measure quality, safety, and groundedness
- **Responsible AI** — Content safety, monitoring, and audit trails

📖 Reference: [Microsoft Foundry overview](https://learn.microsoft.com/en-gb/azure/foundry/what-is-foundry)

---

## Key Concepts

| Concept | Description |
|---|---|
| **Foundry resource** | The top-level resource for your team. Manages shared connections, deployments, and security. Already provisioned for you. |
| **Project** | A workspace within your Foundry resource for a specific use case. Each team has their own project. Already provisioned for you. |
| **Deployment** | A specific model (e.g. GPT-4o) made available via an endpoint in your project. |
| **Connection** | A link to an external service (Azure AI Search, Blob Storage, etc.) used by your project. |
| **Agent** | An AI assistant configured with instructions, tools, and data sources. |

---

## Step 1 – Access Microsoft Foundry

1. Go to [ai.azure.com](https://ai.azure.com)
2. Sign in with the Microsoft account linked to your Azure subscription
3. If prompted, make sure the **New Foundry** toggle in the top banner is turned **on**
4. You'll land on the **Microsoft Foundry home page**

> **Your Foundry resource and project have already been set up for your team.** You do not need to create anything — just find and open your team's project.

---

## Step 2 – Find Your Team Project

1. In the upper-left corner, select the project name (or select **View all projects**)
2. Look for the project that matches your team name
3. Select it to open your team's workspace

Your project will have its own:
- Model deployments
- Connections
- Agents
- Evaluation runs

---

## Step 3 – Deploy a Model

1. In the top nav, click **Build**
2. In the left nav, click **Models**
3. Click **Deploy a base model**
4. Search for and select **gpt-4o**
5. Configure:
   - **Deployment name:** `gpt-4o` (keep it simple — this is what you use in code)
   - **Model version:** Latest available
   - **Tokens per minute (TPM):** Set as directed by your facilitator
6. Click **Deploy**

Once deployed, you'll see it listed under **Models** → **Deployments**.

📖 Reference: [Microsoft Foundry quickstart](https://learn.microsoft.com/en-us/azure/foundry/quickstarts/get-started-code)

---

## Step 4 – Test in the Playground

Before writing any code, test your deployed model in the Playground:

1. In **Models** → **Deployments**, click the hyperlink for your `gpt-4o` deployment
2. This opens the Playground for that model
3. Enter a **System message** (this is the agent's instructions), e.g.:
   ```
   You are a helpful assistant that summarises immunisation guidelines clearly and concisely.
   ```
4. Type a question in the chat and press Enter

Experiment with different system prompts to understand how they shape the model's behaviour.

---

## Step 5 – Get Your Connection Details

To call your model from Python, you need the endpoint and API key. The Home page shows all three values right on the screen:

1. Click **Home** in the top nav
2. You'll see **API key**, **Project endpoint**, and **Azure OpenAI endpoint** displayed on the page
3. Use the copy icon next to each value to copy them

Store these in your `.env` file (as shown in guide 04):
```
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your-api-key-here
AZURE_OPENAI_DEPLOYMENT=gpt-4o
AZURE_AI_PROJECT_ENDPOINT=https://your-project.services.ai.azure.com/api/projects/your-project
```

> **Security reminder:** Never commit your `.env` file or paste keys into your code. Keep them in `.env` and add `.env` to `.gitignore`.

---

## Step 6 – Call Your Model from Python

With your `.env` configured and virtual environment active:

```python
import os
from openai import AzureOpenAI
from dotenv import load_dotenv

load_dotenv()

client = AzureOpenAI(
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version="2024-10-21"
)

response = client.chat.completions.create(
    model=os.getenv("AZURE_OPENAI_DEPLOYMENT"),  # deployment name
    messages=[
        {"role": "system", "content": "You are a helpful AI assistant."},
        {"role": "user", "content": "What is Microsoft Foundry?"}
    ]
)

print(response.choices[0].message.content)
```

📖 Reference: [Azure OpenAI Python quickstart](https://learn.microsoft.com/en-us/azure/ai-services/openai/quickstart?tabs=python)

---

## Step 7 – Build a Simple Agent with Azure AI Agent Service

The Azure AI Agent Service lets you build agents that can use tools and reason over documents.

**Install the SDK:**
```bash
pip install azure-ai-agents azure-identity
```

**Basic agent example:**
```python
import os
from azure.ai.agents import AgentsClient
from azure.identity import DefaultAzureCredential
from dotenv import load_dotenv

load_dotenv()

client = AgentsClient(
    endpoint=os.getenv("AZURE_AI_PROJECT_ENDPOINT"),
    credential=DefaultAzureCredential()
)

agent = client.create_agent(
    model=os.getenv("AZURE_OPENAI_DEPLOYMENT"),
    name="my-first-agent",
    instructions="You are a helpful assistant. Answer questions clearly and concisely."
)

thread = client.threads.create()
client.messages.create(
    thread_id=thread.id,
    role="user",
    content="What are the key steps in building an AI agent?"
)

run = client.runs.create_and_process(
    thread_id=thread.id,
    agent_id=agent.id
)

messages = client.messages.list(thread_id=thread.id)
for msg in messages:
    if msg.role == "assistant":
        for content in msg.content:
            if hasattr(content, "text"):
                print(content.text.value)
        break

client.delete_agent(agent.id)
```

📖 Reference: [Microsoft Foundry quickstart](https://learn.microsoft.com/en-us/azure/foundry/quickstarts/get-started-code)

---

## Step 8 – Evaluate Your Agent

Microsoft Foundry includes built-in evaluation tools to measure:
- **Groundedness** — Are responses backed by your source documents?
- **Relevance** — Are responses relevant to the question?
- **Coherence** — Are responses well-structured and clear?
- **Safety** — Are responses free from harmful content?

To run an evaluation:
1. In the left nav, click **Evaluation**
2. Click **+ New evaluation**
3. Select your dataset (example Q&A pairs) and the model/deployment to evaluate
4. Review the results dashboard

📖 Reference: [Microsoft Foundry documentation](https://learn.microsoft.com/en-us/azure/foundry/)

---

## ✅ Checkpoint

Before starting your use case work, confirm:

- [ ] You can sign in to [ai.azure.com](https://ai.azure.com) and see your team's project
- [ ] GPT-4o is deployed and visible under **Deployments**
- [ ] You can send a chat message in the Playground and receive a response
- [ ] Running the Python code sample above returns a response from the model
- [ ] Your `.env` file has the endpoint, API key, deployment name, and project endpoint — and `.env` is in `.gitignore`

---

## 📚 Further Learning

| Resource | Link |
|---|---|
| Microsoft Foundry documentation | [learn.microsoft.com/azure/foundry](https://learn.microsoft.com/en-us/azure/foundry/) |
| Azure OpenAI Service documentation | [learn.microsoft.com/azure/ai-services/openai](https://learn.microsoft.com/en-us/azure/ai-services/openai/) |
| Microsoft Foundry quickstart (models + agents) | [learn.microsoft.com – Foundry quickstart](https://learn.microsoft.com/en-us/azure/foundry/quickstarts/get-started-code) |
| Azure AI Search + RAG | [learn.microsoft.com – RAG overview](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview) |
| Azure AI Document Intelligence | [learn.microsoft.com – Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/overview) |
| Microsoft Learn – Foundry learning path | [learn.microsoft.com – Develop generative AI apps](https://learn.microsoft.com/en-us/training/paths/develop-generative-ai-apps/) |

---

## 🎉 You're Ready

You now have everything set up to start building. Refer back to the use case documents in the `UseCases` folder for the specific requirements of each project.

Good luck with the hackathon!
