# Demo: Connecting VS Code to Azure AI Foundry

## Prerequisites (have ready before the demo)

- VS Code installed
- An Azure subscription with a Foundry project already created
- Signed into Azure CLI (`az login`) — saves time during demo

---

## Step 1 — Install the Foundry Extension

1. Open VS Code → **Ctrl+Shift+X** (Extensions)
2. Search **"Foundry"**
3. Install **"Microsoft Foundry"** (`TeamsDevApp.vscode-ai-foundry`)
4. The **Foundry icon** appears in the left sidebar

## Step 2 — Sign In to Azure

1. Click the **Azure icon** in the sidebar
2. Select **"Sign in to Azure…"**
3. Authenticate in the browser that opens
4. Your subscriptions appear under **Resources**

## Step 3 — Connect to Your Foundry Project

1. Click the **Foundry icon** in the sidebar
2. Expand your **subscription → resource group**
3. Find your Foundry project (e.g. `prj-compsci714-team1`)
4. Right-click → **"Open in Foundry Extension"**
5. The project workspace loads — models, endpoints, and playgrounds are now visible

## Step 4 — Test a Model in the Playground

1. In the Foundry panel, open the **Playground**
2. Select a deployed model (e.g. GPT-4.1)
3. Type a prompt and hit **Send**
4. Show the response — proves the connection is live

## Step 5 — Get Code from the Portal (Shortcut)

1. Open [Azure AI Foundry portal](https://ai.azure.com) in a browser
2. Navigate to your project → select a model
3. Click **"View Code"** → **"Open in VS Code"**
4. VS Code opens with endpoint, auth, and a working code sample pre-configured

## Step 6 — Run Code Locally

Install dependencies first:

```bash
pip install openai azure-identity
```

Create your local config file from the template:

```powershell
copy demo-1\foundry_config.template.py demo-1\foundry_config.py
```

Then update `demo-1/foundry_config.py` with your own values:

```python
# demo-1/foundry_config.py
ENDPOINT = "https://<your-resource>.services.ai.azure.com/"
MODEL_NAME = "<your-deployment-name>"
USE_AAD_AUTH = True
API_KEY = ""  # only needed when USE_AAD_AUTH = False
```

Then run:

```powershell
python demo-1/query_llm.py
```

### First-Day Student Checklist

1. Copy config template:
    `copy demo-1\foundry_config.template.py demo-1\foundry_config.py`
2. Update two values in `demo-1/foundry_config.py`:
    `ENDPOINT` and `MODEL_NAME`
3. Authenticate once:
    `az login`
4. Run the demo:
    `python demo-1/query_llm.py`

---

## Demo Tips

- **Pre-authenticate** (`az login`) before the demo so sign-in is instant
- **Pre-deploy a model** in the portal so the playground works immediately
- The **"Open in VS Code"** shortcut from the portal is the fastest wow-moment
- Keep a terminal open to show `pip install` if students ask about setup

---

## How to Run the Classroom Demo (Simple 5-Minute Flow)

Use `demo-1/query_llm.py` to show how the same model responds differently with and without a system prompt.

### 1. Open the demo script

- Open `demo-1/query_llm.py`
- Open `demo-1/foundry_config.template.py` and explain this is what each student copies to `demo-1/foundry_config.py`
- Open `demo-1/foundry_config.py` and point students to:
    - `ENDPOINT`
    - `MODEL_NAME`
    - `USE_AAD_AUTH` / `API_KEY`
- Back in `demo-1/query_llm.py`, point students to `PERSONA`

### 2. Run once

In the terminal from the repo root:

```powershell
python demo-1/query_llm.py
```

What students should notice:

- The first answer is a standard response
- The second answer uses the same question but a different tone/style because of the system prompt (`PERSONA`)

### 3. Live-edit the persona and run again

Change `PERSONA` to something obvious, for example:

```text
You are a strict exam marker. Respond in exactly two short bullet points.
```

Run again:

```powershell
python demo-1/query_llm.py
```

### 4. Wrap-up takeaway

Use this one sentence:

> Same model + same question, but different **system prompt** = different behavior.

### Optional 30-second talk track

- "First output: default assistant behavior."
- "Second output: behavior shaped by a system persona."
- "Prompt structure controls style, detail, and tone."

## Reference Links

- [Foundry Extension Docs](https://learn.microsoft.com/en-us/azure/foundry/how-to/develop/get-started-projects-vs-code)
- [Foundry Quickstart](https://learn.microsoft.com/en-us/azure/foundry/quickstarts/get-started-code)
- [Open in VS Code Blog](https://devblogs.microsoft.com/foundry/open-in-vscode/)
- [MS Learn: AI Agents with Foundry + VS Code](https://learn.microsoft.com/en-us/training/modules/develop-ai-agents-azure-vs-code/)
