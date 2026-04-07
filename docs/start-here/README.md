# Getting Started — Masters of AI Hackathon (COMPSCI 714, S1 2026)

Welcome to the hackathon setup hub. This folder contains everything you need to go from a blank laptop to a working AI development environment connected to the University of Auckland's Azure infrastructure.

**Work through the numbered guides in order.** Each one ends with a checkpoint and a link to the next step.

---

## Platform Starter Recommendation

Use this default path based on your laptop:

- **macOS** - Use the standard setup guides (01 to 08) in Terminal.
- **Windows (recommended default)** - Use the standard setup guides (01 to 08) in PowerShell.
- **Windows (optional Linux workflow)** - Use guides 01 to 08, then read [09 - Optional: Getting Started with WSL](09-wsl-getting-started.md).

All three paths are supported for the hackathon.

---

## Setup Guides

| Guide | What it covers |
|---|---|
| [01 – Prerequisites](01-prerequisites.md) | Full checklist of accounts, software, and system requirements before you begin |
| [02 – GitHub Setup](02-github-setup.md) | Create a GitHub account, install Git, configure your identity, authenticate |
| [03 – VS Code Setup](03-vscode-setup.md) | Install VS Code, essential extensions, settings, and keyboard shortcuts |
| [04 – Python Setup](04-python-setup.md) | Install Python 3.11, create virtual environments, install Azure AI packages, manage secrets |
| [05 – Azure Setup](05-azure-setup.md) | Azure account options, Azure Portal orientation, install Azure CLI and `azd` |
| [06 – Your First Repository](06-first-repo.md) | Clone, branch, commit, push, and open a Pull Request — the daily Git workflow |
| [07 – Microsoft Foundry](07-azure-ai-foundry.md) | Create a project, deploy a model, test in the Playground, call from Python, build an agent |

---

## UoA Environment

| Guide | What it covers |
|---|---|
| [Using the UoA Azure Environment](using-uoa-azure.md) | **Start here if your environment has been provisioned.** What's pre-built for your team, how to access your Foundry instance, whitelisted models, token quotas, VS Code integration, storage, and who to contact |

---

## Use Cases

The three projects available for this hackathon. Each document includes a problem summary, scope, expected PoC output, and a full mapping to Azure AI services with reference links.

| Use Case | Summary |
|---|---|
| [Clinical Assessment Digitisation Agent](use-cases/clinical-assessment-digitisation-agent.md) | Automate extraction, grading, and escalation from scanned MBChB clinical assessment forms |
| [Immunisation Guidelines Adviser Agent](use-cases/immunisation-guidelines-adviser-agent.md) | Help IMAC clinical advisors retrieve and cite official immunisation guidance for health professionals |
| [Research Contracts Adviser Agent](use-cases/research-contracts-adviser-agent.md) | Compare research contracts against UoA standard positions and flag deviations for review |

---

## FAQ

| Guide | What it covers |
|---|---|
| [FAQ](08-faq.md) | Answers to common questions on accounts, Git, VS Code, Python, Azure, Foundry, secrets, team workflows, and debugging |

---

## Optional Reading

| Guide | What it covers |
|---|---|
| [09 - Optional: Getting Started with WSL](09-wsl-getting-started.md) | A Linux-style setup path for Windows students who prefer Ubuntu/WSL tooling with VS Code |

---

## Recommended Reading Order

```
First time setup (all students):
  01 → 02 → 03 → 04 → 05 → 06 → 07

Optional for Windows students who want Linux tooling:
  → 09 (WSL)

Then, once your UoA environment is provisioned:
  → Using the UoA Azure Environment

Then, pick your use case:
  → use-cases/
```

---

## Your Team

Teams of 5 — each member has a defined role:

| Role | Focus |
|---|---|
| **Project Lead** | Framing, coordination, delivery, budget |
| **Data & Problem Analyst** | Data exploration, evaluation metrics, problem formulation |
| **Solution Architect** | Architecture design, model and tool selection |
| **Implementation Lead** | PoC build, integration, technical delivery |
| **AI Governance Lead** | Ethics, risk analysis, responsible AI |

---

*Questions not covered here? Check the [FAQ](08-faq.md) or ask your facilitator.*

