# Using the University of Auckland Azure Environment

> This guide is specific to the **Masters of AI (COMPSCI 714) Hackathon S1 2026**.  
> Unlike the general Azure setup in [05 – Azure Setup](05-azure-setup.md), you **do not need to create your own Azure account or resources**. Everything has been provisioned for your team in advance.

---

## What's Already Set Up for You

Confirm: Before the hackathon begins, the following has been provisioned for **each team**:

| Resource | Details |
|---|---|
| **Azure Subscription** | Shared subscription dedicated to the hackathon — isolated from all other UoA systems |
| **Resource Group** | One per team (e.g. `rg-teamA`) — contains all your team's resources |
| **Azure AI Foundry instance** | One per team — your hub for model deployment, agents, and projects |
| **Blob Storage** | Pre-created and scoped to your team's Foundry — you cannot access other teams' storage |
| **Entra ID Group** | Your team members are added as **Contributors** to your Resource Group |
| **Diagnostics / Logging** | Enabled at subscription level — you can view logs scoped to your own resources |
| **Whitelisted models** | 3 GPT models of different sizes pre-approved for use by all teams |

> **Key point:** You are a **Contributor** to your team's Resource Group only. You cannot see or access other teams' resources, and you have no visibility into the broader UoA Azure tenant.

---

## How to Access Your Environment

### 1. Sign in to the Azure Portal

Go to [portal.azure.com](https://portal.azure.com) and sign in with the **university account** provided to you by the programme administrator.

> Use your **UoA student account** (`yourUPI@aucklanduni.ac.nz`) — do not use a personal Microsoft account. Access is controlled via your Entra ID group membership.

Once signed in, navigate to **Resource Groups**. You will only see your team's Resource Group.

---

### 2. Sign in to Azure AI Foundry

Go to [ai.azure.com](https://ai.azure.com) and sign in with the same university account.

You will see **only your team's Foundry instance and projects**. This is by design — access is scoped at the Resource Group level so teams are fully isolated from each other.

From here you can:
- Browse your team's deployed models
- Create and manage Foundry Projects
- Use the Playground to test models
- Build and run agents
- View evaluation results

---

## Your Team's Resources at a Glance

```
Azure Subscription (hackathon-dedicated)
└── Resource Group: rg-<your-team-name>
    ├── Azure AI Foundry instance
    │   └── Foundry Projects (one per use case / workstream)
    ├── Blob Storage (scoped to your Foundry)
    └── Diagnostics (view-only, scoped to your RG)
```

Your Entra ID group controls who has access. If a teammate cannot see the resources, contact your **programme administrator** to verify their group membership.

---

## Working with Models

### Which models are available?

Three GPT models of different sizes have been **whitelisted via Azure Policy** for use across all teams. Your facilitator will confirm the exact model names during onboarding.

Models follow a naming convention tied to your team, for example:
- `TeamA-gpt-4o`
- `TeamA-gpt-4o-mini`
- `TeamA-gpt-4o-<third-model>`

> You will **not** see the full Azure model catalogue — only the whitelisted models are available to deploy. This is intentional to manage costs and ensure consistent tooling across teams.

### How do I reference my model in code?

Use the deployment name (e.g. `TeamA-gpt-4o`) as the `model` parameter in your Python code:

```python
response = client.chat.completions.create(
    model="TeamA-gpt-4o",   # use your team's deployment name
    messages=[...]
)
```

→ See [07 – Azure AI Foundry](07-azure-ai-foundry.md#step-7--call-your-model-from-python) for the full code example.

### Token limits

Each model deployment has a **Tokens Per Minute (TPM)** quota set by the programme administrators. You can view your quota in Azure AI Foundry:

**Foundry → Operate blade → Quota panel**

If you are consistently hitting rate limits:
- Reduce the size of your prompts and context window
- Use a smaller model (e.g. `gpt-4o-mini`) for tasks that don't require full GPT-4o
- Contact your facilitator to request a quota review

---

## Connecting VS Code to Your Foundry Project

The **Azure AI Foundry extension for VS Code** lets you pull your Foundry project structure directly into your local workspace.

### Step 1 – Install the Foundry Extension

Open VS Code → Extensions (`Ctrl+Shift+X`) → search for **Azure AI Foundry** → Install.

### Step 2 – Connect to Your Project

1. Open the Command Palette (`Ctrl+Shift+P`)
2. Type **AI Foundry: Open Project**
3. Sign in with your university account if prompted
4. Select your team's Foundry instance and project

The project structure will appear in your VS Code workspace.

### Step 3 – Commit Your Work to GitHub

Because the Foundry extension brings down the project structure as a local folder, you use Git exactly as you normally would:

```bash
git add .
git commit -m "Add agent prompt and evaluation results"
git push origin feature/my-branch
```

> **Note:** There are **no CI/CD pipelines** configured for this hackathon. The repository connection is for **source control only** — code is not automatically deployed when you push.

→ See [06 – Your First Repository](06-first-repo.md) for the full Git workflow.

---

## Storage

Your team's Blob Storage is **pre-created and scoped to your Foundry**. You do not need to create storage accounts yourself.

What you can do:
- Upload datasets and documents to your team's storage via the Azure Portal or Azure CLI
- Reference your storage from Foundry Projects (e.g. as a data source for Azure AI Search indexing)
- Read and write files from Python using the Azure Storage SDK

What you cannot do:
- Access other teams' storage accounts
- Create new storage accounts (provisioned by IaC only)

**Upload a file via Azure CLI:**
```bash
az storage blob upload \
  --account-name <your-storage-account-name> \
  --container-name <your-container-name> \
  --name myfile.pdf \
  --file ./myfile.pdf \
  --auth-mode login
```

---

## Viewing Logs and Diagnostics

Diagnostics are enabled at the subscription level and inherited by your Resource Group. Logs are scoped using **Resource Context**, meaning you can only see log data for resources within your own Resource Group.

To view logs:
1. Go to [portal.azure.com](https://portal.azure.com) → your Resource Group
2. Select a resource (e.g. your Foundry instance)
3. Click **Logs** in the left nav
4. Write a KQL query or use built-in queries

📖 Reference: [Manage access to Log Analytics](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/manage-access?tabs=portal)

---

## What You Cannot Configure (Managed by UoA Admins)

To keep the environment consistent and costs controlled, the following are **managed by programme administrators** and cannot be changed by students:

| Item | Reason |
|---|---|
| Storage account creation | Managed by IaC scripts for consistency |
| Model whitelist | Azure Policy — only approved models are available |
| Entra ID group membership | Contact your programme administrator if access is incorrect |
| Subscription-level policies | Set by UoA Digital Services |
| Networking / VNet configuration | Pre-configured for team isolation |

---

## Cost and Quota Awareness

The hackathon subscription has **budget alerts configured per Resource Group**. Be mindful of resource usage, especially:

- **Token usage** — large prompts and long conversations consume quota quickly; use smaller models for simple tasks
- **Unused deployments** — delete model deployments you are no longer using
- **Compute resources** — if you spin up any compute, stop or delete it when not in use

You can monitor your team's usage in the Azure Portal:  
**Resource Group → Cost Management → Cost analysis**

---

## Team Roles and Responsibilities

Your team of 5 has defined roles for the hackathon. Each role maps to how you'll interact with the Azure environment:

| Role | Azure / Foundry Responsibilities |
|---|---|
| **Project Lead** | Monitor budget and timeline; coordinate access requests |
| **Data & Problem Analyst** | Upload and manage datasets in Blob Storage; configure AI Search indexes |
| **Solution Architect** | Design the Foundry project structure; select appropriate whitelisted models |
| **Implementation Lead** | Build and test agents in Foundry; connect VS Code via Foundry extension; manage Git |
| **AI Governance Lead** | Review Content Safety settings; check evaluation results; document responsible AI decisions |

---

## Quick Reference: Key URLs

| Resource | URL |
|---|---|
| Azure Portal | [portal.azure.com](https://portal.azure.com) |
| Azure AI Foundry | [ai.azure.com](https://ai.azure.com) |
| Azure AI Foundry docs | [learn.microsoft.com/azure/ai-studio](https://learn.microsoft.com/en-us/azure/ai-studio/) |
| Log Analytics access guide | [learn.microsoft.com – Manage Log Analytics access](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/manage-access?tabs=portal) |
| Azure Storage SDK for Python | [learn.microsoft.com – Azure Blob Storage Python](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-python) |

---

## Need Help?

| Issue | Who to contact |
|---|---|
| Can't see your Resource Group or Foundry | Programme administrator (Entra group membership) |
| Model not available / wrong deployment name | Facilitator |
| Hit token quota limit | Facilitator (quota review request) |
| Storage access issues | Programme administrator |
| VS Code / Git / Python issues | See [08 – FAQ](08-faq.md) or ask your team |

---

*This environment has been designed for learning and experimentation. It is fully isolated from UoA production systems — you can explore freely without risk to university data or infrastructure.*
