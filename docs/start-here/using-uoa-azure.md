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

A guide will be provided to you by the University of Auckland Team.