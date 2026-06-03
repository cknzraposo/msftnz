# Using the University of Auckland Azure Environment

> This guide is specific to the **Masters of AI (COMPSCI 714) Hackathon S1 2026**.  
> Unlike the general Azure setup in [05 – Azure Setup](05-azure-setup.md), you **do not need to create your own Azure account or resources**. Everything has been provisioned for your team in advance.

---

## What's Already Set Up for You

Before the hackathon begins, the following has been provisioned for **each team**:

| Resource | Details |
| --- | --- |
| **Azure Subscription** | Shared subscription dedicated to the hackathon — isolated from all other UoA systems |
| **Resource Group** | One per team, named `rg-hack-{team_name}` (e.g. `rg-hack-team-01`) |
| **Microsoft Foundry (Azure AI Services) account** | One per team, named `ai-{team_name}-hack` — your hub for model deployment, agents, and projects |
| **Default AI Foundry project** | One per team, created with the same name as your team |
| **Team Blob Storage** | A storage account in your team's resource group — your team has `Storage Blob Data Contributor` access |
| **Shared hackathon data** | A read-only blob container (`shared-hackathon-data`) in a shared admin storage account — every team gets `Reader` + `Storage Blob Data Reader` |
| **Entra ID Group access** | Your team members are added as **Azure AI Owner** on your team's resource group |
| **Whitelisted models** | 3 GPT models of different sizes pre-approved for use by all teams |

> **Key point:** Your team's Entra ID security group has **Azure AI Owner** scoped to your team's resource group only. You cannot see or access other teams' resources. The only asset outside your resource group that you can see is the shared `shared-hackathon-data` container, which is read-only for all teams.

---

## How to Access Your Environment

A guide will be provided to you by the University of Auckland Team.
