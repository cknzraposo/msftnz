# 08 – Frequently Asked Questions

Quick answers to the most common questions students ask. Each answer links back to the relevant guide for more detail.

---

## Contents

- [Accounts & Access](#accounts--access)
- [Platform Choice (Windows and macOS)](#platform-choice-windows-and-macos)
- [Git & GitHub](#git--github)
- [VS Code](#vs-code)
- [Python & Environments](#python--environments)
- [Azure](#azure)
- [Microsoft Foundry & Models](#microsoft-foundry--models)
- [Security & Secrets](#security--secrets)
- [Working in a Team](#working-in-a-team)
- [Use Case Specific](#use-case-specific)
- [Getting Unstuck](#getting-unstuck)

---

## Accounts & Access

### Do I need a credit card to sign up for Azure?

**Not necessarily.** If you have a university email address, use the **Azure for Students** option at [azure.microsoft.com/free/students](https://azure.microsoft.com/en-us/free/students/) — no credit card required, and you get $100 USD in credit.

If you use the standard free account at [azure.microsoft.com/free](https://azure.microsoft.com/en-us/free/), a credit card is required for identity verification but **you will not be charged** while staying within free-tier limits.

Your facilitator may also provision a subscription for you directly — check with them first.
→ See [05 – Azure Setup](05-azure-setup.md#step-1--create-an-azure-account)

---

### Will I be charged if I accidentally leave something running?

Free accounts have spending limits that prevent unexpected charges. If your facilitator provisioned your subscription, spending policies will be in place. As a precaution:
- Delete resource groups when you finish a session
- Shut down any compute resources when not in use
- Monitor spend in the Azure Portal: **Cost Management + Billing**

→ See [05 – Azure Setup](05-azure-setup.md)

---

### Can I use my personal Microsoft account or do I need my university account?

Either works for Azure, but using your **university email address** is recommended. It may give you access to Azure for Students credits and the GitHub Student Developer Pack without a credit card.

→ See [01 – Prerequisites](01-prerequisites.md#accounts-youll-need-to-create)

---

### How do I get GitHub Copilot for free?

Apply for the **GitHub Student Developer Pack** at [education.github.com/pack](https://education.github.com/pack) using your university email. This includes GitHub Copilot at no cost while you're a student.

→ See [02 – GitHub Setup](02-github-setup.md#step-1--create-a-github-account)

---

## Platform Choice (Windows and macOS)

### Should I use Windows native setup, WSL, or macOS native setup?

Use this starter recommendation:

- **macOS:** Use native macOS Terminal with guides 01 to 08.
- **Windows (default):** Use native PowerShell with guides 01 to 08.
- **Windows (optional):** Use WSL if you prefer Linux-style tooling.

For this hackathon, all three are supported. Pick one path and stay consistent for your project.

→ See [README](README.md) | [09 - Optional: Getting Started with WSL](09-wsl-getting-started.md)

---

### Do I have to use WSL on Windows?

No. WSL is optional. Most students can complete the entire setup using PowerShell only.

Use WSL when:

- You are comfortable with Linux shell workflows
- You want parity with Linux-based deployment/runtime environments

Stay native on Windows when:

- You are new to terminal workflows
- You want the simplest setup path with fewer moving parts

---

### Can my team mix operating systems?

Yes. Team members can use Windows, macOS, or WSL independently. Use GitHub, requirements files, and clear README instructions so your workflow remains reproducible.

Recommended team checks:

- Keep setup commands for both Windows and macOS where relevant
- Commit `requirements.txt` and keep it current
- Document any OS-specific steps in your repo README

---

## Git & GitHub

### What's the difference between Git and GitHub?

**Git** is the version control software installed on your computer. It tracks changes to your files locally.  
**GitHub** is a cloud platform that hosts Git repositories and adds collaboration features (pull requests, issues, Actions).

Think of Git as the engine and GitHub as the garage where your car is stored and shared.

→ See [02 – GitHub Setup](02-github-setup.md) | [06 – Your First Repository](06-first-repo.md)

---

### I get "Permission denied" when trying to push to GitHub. What do I do?

This usually means you're not authenticated. Try:

```bash
# Check your remote URL
git remote -v

# If using HTTPS, re-authenticate
git config --global credential.helper manager

# If using SSH, test your connection
ssh -T git@github.com
```

If the SSH test says "Permission denied (publickey)", you need to add your SSH key to GitHub.  
→ See [02 – GitHub Setup – Option B: SSH Key](02-github-setup.md#option-b--ssh-key-advanced)

---

### Should I commit directly to `main`?

**No.** Always create a feature branch and open a Pull Request. This protects `main` from broken code and gives teammates a chance to review your work before it's merged.

```bash
git checkout -b feature/my-work
# ... make changes ...
git push origin feature/my-work
# then open a PR on GitHub
```

→ See [06 – Your First Repository](06-first-repo.md#step-3--create-a-branch)

---

### I accidentally committed to `main`. How do I fix it?

```bash
# Undo the last commit but keep your changes staged
git reset --soft HEAD~1

# Now create a branch and commit there instead
git checkout -b feature/my-fix
git commit -m "Your commit message"
git push origin feature/my-fix
```

---

### My branch is out of date with `main`. How do I update it?

```bash
git checkout main
git pull origin main
git checkout your-branch-name
git rebase main
```

If there are conflicts, VS Code will highlight them in the editor. Resolve each conflict, then run `git rebase --continue`.

→ See [06 – Your First Repository](06-first-repo.md#step-8--keeping-your-branch-up-to-date)

---

### What should I include in a `.gitignore` file?

At minimum, for Python + Azure projects:

```
# Python
.venv/
__pycache__/
*.pyc
*.pyo
.pytest_cache/

# Secrets
.env
*.key
*.pem

# Editor
.vscode/settings.json
.DS_Store

# Azure
.azure/
```

Generate a comprehensive one at [gitignore.io](https://www.toptal.com/developers/gitignore) — search for `Python`, `VisualStudioCode`, and `macOS` or `Windows`.

→ See [04 – Python Setup](04-python-setup.md#step-5--use-a-env-file-for-secrets)

---

## VS Code

### VS Code can't find my Python interpreter. What do I do?

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Type **Python: Select Interpreter**
3. Choose the `.venv` option from the list, or click **Enter interpreter path** and browse to `.venv/Scripts/python.exe` (Windows) or `.venv/bin/python` (macOS/Linux)

Make sure you've opened VS Code from the **project root folder** (not a subfolder), otherwise it won't detect the `.venv`.

→ See [03 – VS Code Setup](03-vscode-setup.md) | [04 – Python Setup](04-python-setup.md#step-3--create-a-virtual-environment)

---

### The terminal in VS Code isn't activating my virtual environment automatically.

Add this to your VS Code settings (`Ctrl+,` → search "terminal activate"):

```json
"python.terminal.activateEnvironment": true
```

Then close and reopen the terminal panel (`` Ctrl+` ``). If it still doesn't activate, run it manually:

```bash
# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate
```

→ See [03 – VS Code Setup](03-vscode-setup.md#step-4--configure-vs-code-settings)

---

### Which extensions are essential vs optional?

| Extension | Priority |
|---|---|
| Python + Pylance | ✅ Essential |
| Jupyter | ✅ Essential |
| GitHub Copilot + Chat | ✅ Essential (if you have access) |
| GitLens | 👍 Highly recommended |
| Azure Tools | 👍 Highly recommended |
| REST Client | 👍 Useful for testing APIs |
| Bicep | Optional (IaC only) |

→ See [03 – VS Code Setup](03-vscode-setup.md#step-3--install-recommended-extensions)

---

## Python & Environments

### Do I need a virtual environment? Can't I just install packages globally?

You *can*, but you shouldn't. Without a virtual environment, packages from different projects conflict with each other, and sharing your project with teammates becomes unreliable. Always use `.venv`.

→ See [04 – Python Setup](04-python-setup.md#step-2--understand-virtual-environments)

---

### I installed a package but Python says it's not found.

Your virtual environment is probably not activated. Check your terminal prompt — it should show `(.venv)` at the start.

```bash
# Activate it
source .venv/bin/activate      # macOS/Linux
.venv\Scripts\activate         # Windows

# Then install the package again
pip install <package-name>
```

---

### What Python version should I use?

Use **Python 3.11**. Some Azure SDK packages have compatibility issues with 3.12+. Stick with 3.11 unless your facilitator advises otherwise.

→ See [04 – Python Setup](04-python-setup.md#step-1--install-python-311)

---

### How do I share my dependencies with teammates?

```bash
# Generate a requirements file from your active environment
pip freeze > requirements.txt

# Commit it to GitHub
git add requirements.txt
git commit -m "Add requirements.txt"
git push
```

Teammates then run:
```bash
pip install -r requirements.txt
```

→ See [04 – Python Setup](04-python-setup.md#step-6--use-a-requirementstxt-file)

---

### My `pip install` is very slow or fails with SSL errors.

Try upgrading pip first:
```bash
python -m pip install --upgrade pip
```

If you're behind a corporate proxy or university network, you may need to set trust flags:
```bash
pip install <package> --trusted-host pypi.org --trusted-host files.pythonhosted.org
```

---

## Azure

### What is a Resource Group and do I need one?

A Resource Group is a logical container for Azure resources. Everything you create (OpenAI endpoint, Search index, Storage account) lives inside one. It makes it easy to manage, monitor, and delete related resources together.

**Yes, you need one.** Create one per team/project.

→ See [05 – Azure Setup](05-azure-setup.md#step-3--understand-the-azure-hierarchy)

---

### What Azure region should I use?

Use **Australia East** unless your facilitator specifies otherwise. It has good latency from New Zealand and supports the AI services you need (Azure OpenAI, AI Search, Document Intelligence).

---

### I can't find Azure OpenAI in the Azure Portal. Is it available?

Azure OpenAI requires **approved access** in some regions. If you cannot create an Azure OpenAI resource, contact your facilitator — they will either grant access to an existing shared resource or submit an access request on your behalf.

→ See [07 – Microsoft Foundry](07-azure-ai-foundry.md#step-4--deploy-a-model)

---

### What's the difference between `az` (Azure CLI) and `azd` (Azure Developer CLI)?

| Tool | Purpose |
|---|---|
| `az` | Low-level management of individual Azure resources (create VMs, manage storage, set permissions) |
| `azd` | High-level deployment of complete application templates and environments |

Use `az` for day-to-day resource management. Use `azd` when deploying a full project template from a repo.

→ See [05 – Azure Setup](05-azure-setup.md#step-6--install-the-azure-developer-cli-azd)

---

## Microsoft Foundry & Models

### What's the difference between a Hub and a Project in Microsoft Foundry?

| | Hub | Project |
|---|---|---|
| **Scope** | Shared across a team | One per use case / workstream |
| **Contains** | Shared connections, compute, networking | Deployments, agents, evaluations |
| **Who creates it** | Team lead or facilitator | Each team member / team |

Think of a Hub as the office building and Projects as individual rooms inside it.

→ See [07 – Microsoft Foundry](07-azure-ai-foundry.md#key-concepts)

---

### Which model should I use — GPT-4o or something else?

**GPT-4o** is the recommended default for all three hackathon use cases. It handles multi-modal input (text + images), is fast, and is well-supported by the Azure AI SDK.

Use **GPT-4o mini** if you need lower cost/latency for high-volume or lower-complexity tasks (e.g. classification, simple extraction).

→ See [07 – Microsoft Foundry](07-azure-ai-foundry.md#step-4--deploy-a-model)

---

### How do I find my model's endpoint URL and API key?

1. Go to [ai.azure.com](https://ai.azure.com) → your project
2. **Settings** → **Connections** → click your Azure OpenAI connection
3. Copy the **Endpoint** and **API Key**

Store them in `.env` — never in your code.

→ See [07 – Microsoft Foundry](07-azure-ai-foundry.md#step-6--get-your-connection-details)

---

### My model calls are failing with a `RateLimitError`. What does this mean?

Your deployment has hit its **Tokens Per Minute (TPM)** quota. Options:
- Wait a moment and retry
- Reduce the size of your prompts / context window
- Ask your facilitator to increase the TPM quota on your deployment
- Use `GPT-4o mini` for tasks that don't need full GPT-4o

---

### What is RAG and when should I use it?

**RAG (Retrieval-Augmented Generation)** means giving the model access to your own documents at query time, so it answers based on real source material rather than general training knowledge.

Use RAG when:
- Your agent needs to answer questions from a specific corpus (e.g. immunisation guidelines, contract templates)
- You need answers to be **cited** and **verifiable**
- You want to avoid hallucination on domain-specific content

The pattern: **Azure AI Search** indexes your documents → your agent retrieves relevant chunks → **Azure OpenAI** generates a grounded response.

→ See [Clinical Assessment](use-cases/clinical-assessment-digitisation-agent.md) | [Immunisation Adviser](use-cases/immunisation-guidelines-adviser-agent.md) | [Research Contracts](use-cases/research-contracts-adviser-agent.md) | [learn.microsoft.com – RAG overview](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview)

---

## Security & Secrets

### I accidentally pushed my API key to GitHub. What do I do?

Act immediately:

1. **Revoke the key** — go to the Azure Portal or Microsoft Foundry and regenerate the key right now
2. **Remove it from Git history** — contact your facilitator or use [git-filter-repo](https://github.com/newren/git-filter-repo) to scrub the commit history
3. **Update your `.env`** with the new key
4. **Add `.env` to `.gitignore`** so it can't happen again

GitHub may also send you a "secret scanning alert" — take it seriously and act on it.

→ See [04 – Python Setup](04-python-setup.md#step-5--use-a-env-file-for-secrets)

---

### How should I share API keys with teammates?

**Don't share via chat, email, or GitHub.** Instead:
- Store secrets in **Azure Key Vault** and grant teammates access via Azure RBAC
- Or have each teammate retrieve their own key from the Azure Portal

→ See [learn.microsoft.com – Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/general/overview)

---

### What should never be committed to Git?

| ❌ Never commit | ✅ Always commit |
|---|---|
| `.env` files | `requirements.txt` |
| API keys / connection strings | `README.md` |
| Private certificates / `.pem` files | Source code |
| Personal data / patient data | `.gitignore` |
| `__pycache__/` | Configuration templates (without secrets) |

---

## Working in a Team

### How should our team structure branches?

A simple and effective pattern for a small hackathon team:

```
main          ← stable, working code only
  └── dev     ← integration branch for the team
        ├── feature/ocr-extraction      (Alice)
        ├── feature/grading-logic       (Bob)
        └── feature/escalation-pathway  (Charlie)
```

Each person works on their own feature branch, merges into `dev` via PR, and `dev` is merged into `main` at milestones.

→ See [06 – Your First Repository](06-first-repo.md)

---

### How do we avoid merge conflicts?

- **Communicate** — tell teammates which files you're editing
- **Keep branches short-lived** — merge frequently rather than working in isolation for days
- **Pull from `main`/`dev` regularly** — keep your branch up to date
- **Split work by module** — avoid two people editing the same file at the same time

---

### Can multiple people work in the same Azure project?

Yes. The Hub owner can invite team members:
1. Go to [ai.azure.com](https://ai.azure.com) → your Hub
2. **Settings** → **Users** → **Add user**
3. Assign the **Azure AI Developer** role

→ See [07 – Microsoft Foundry](07-azure-ai-foundry.md)

---

## Use Case Specific

### Which Azure services do I need for each use case?

| Use Case | Core Services |
|---|---|
| Clinical Assessment Digitisation | Azure AI Document Intelligence, Azure OpenAI, Azure AI Content Safety, Microsoft Foundry |
| Immunisation Guidelines Adviser | Azure AI Search, Azure OpenAI (RAG), Microsoft Foundry, Azure AI Content Safety |
| Research Contracts Adviser | Azure AI Document Intelligence, Azure AI Search, Azure OpenAI, Microsoft Foundry |

→ See the full service mappings in the [use-cases folder](use-cases/)

---

### Where are the use case briefs?

In the `use-cases` subfolder inside `start-here`:

```
AIMastersProgramme/
└── start-here/               ← you are here
    └── use-cases/
        ├── clinical-assessment-digitisation-agent.md
        ├── immunisation-guidelines-adviser-agent.md
        └── research-contracts-adviser-agent.md
```

→ [Clinical Assessment](use-cases/clinical-assessment-digitisation-agent.md) | [Immunisation Adviser](use-cases/immunisation-guidelines-adviser-agent.md) | [Research Contracts](use-cases/research-contracts-adviser-agent.md)

---

### What is a "PoC" and what does one look like?

**Proof of Concept (PoC)** means a working demonstration that proves the core idea is feasible — not a production-ready system.

For these use cases, a PoC typically includes:
- A Python script or notebook that runs end-to-end
- Sample inputs (anonymised test data) and outputs
- A brief evaluation showing the agent works correctly on those examples
- A README explaining what it does and how to run it

You don't need a UI, full error handling, or scale — just a clear demonstration that the AI approach works.

---

## Getting Unstuck

### Where do I look first when something breaks?

1. **Read the error message carefully** — most errors tell you exactly what's wrong
2. **Check your virtual environment is active** — `(.venv)` should show in your terminal
3. **Check your `.env` file** — missing or incorrect keys are the most common cause of Azure errors
4. **Check the Azure Portal** — look at your resource's **Metrics** and **Diagnose and solve problems**
5. **Search the error message** on [learn.microsoft.com](https://learn.microsoft.com) or Stack Overflow

---

### Useful debugging commands

```bash
# Check Python and pip versions
python --version && pip --version

# List installed packages
pip list

# Check Azure CLI login status
az account show

# Check Microsoft Foundry connection string
echo $AZURE_AI_PROJECT_CONNECTION_STRING   # macOS/Linux
echo %AZURE_AI_PROJECT_CONNECTION_STRING%  # Windows CMD

# Test Azure OpenAI endpoint connectivity
curl -I https://your-resource.openai.azure.com/
```

---

### Where can I find more help?

| Resource | Link |
|---|---|
| Microsoft Learn – Microsoft Foundry | [learn.microsoft.com/azure/foundry](https://learn.microsoft.com/en-us/azure/foundry/) |
| Azure OpenAI documentation | [learn.microsoft.com/azure/ai-services/openai](https://learn.microsoft.com/en-us/azure/ai-services/openai/) |
| Azure AI Search documentation | [learn.microsoft.com/azure/search](https://learn.microsoft.com/en-us/azure/search/) |
| Azure AI Document Intelligence | [learn.microsoft.com/azure/ai-services/document-intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/) |
| GitHub Docs | [docs.github.com](https://docs.github.com) |
| Python packaging guide | [packaging.python.org](https://packaging.python.org) |
| Microsoft Foundry GitHub samples | [github.com/azure-samples/azureai-samples](https://github.com/Azure-Samples/azureai-samples) |

---

*Can't find your question here? Ask your facilitator or raise it in your team's communication channel.*

