# 05 – Azure Setup

Azure is the cloud platform powering the AI services you will use in this hackathon. This guide walks you through creating an account, installing the Azure CLI, and understanding the structure of your Azure environment.

---

## Step 1 – Create an Azure Account

### Option A – Azure Free Account (if not provided by UoA)
1. Go to [azure.microsoft.com/free](https://azure.microsoft.com/en-us/free/)
2. Click **Start free**
3. Sign in with a **Microsoft account** (or create one with your university email)
4. Complete identity verification — a credit card is required but **you won't be charged** while using free-tier services

Free account includes:
- **$200 USD credit** for 30 days
- **12 months** of popular free services
- Always-free tier for 55+ services

### Option B – Azure for Students (no credit card needed)
If your institution has an Azure for Students agreement:
1. Go to [azure.microsoft.com/free/students](https://azure.microsoft.com/en-us/free/students/)
2. Sign in with your **university email address**
3. You'll receive $100 USD credit without needing a credit card

> **Note:** Your Microsoft facilitator will confirm which account type to use and may provide subscription access directly. Check with them before creating a new account.

---

## Step 2 – Explore the Azure Portal

Once your account is active:

1. Go to [portal.azure.com](https://portal.azure.com)
2. Sign in with the account you just created

Take a moment to familiarise yourself with the layout:

- **Home** — Dashboard with your recent resources
- **Resource Groups** — Logical containers that group related Azure resources
- **Subscriptions** — The billing container your resources live under
- **Search bar** (top) — The fastest way to navigate to any service

📖 Reference: [Azure portal overview](https://learn.microsoft.com/en-us/azure/azure-portal/azure-portal-overview)

---

## Step 3 – Understand the Azure Hierarchy

```
Azure Account (your login)
└── Subscription (billing boundary)
    └── Resource Group (logical container)
        ├── Azure OpenAI resource
        ├── Azure AI Search resource
        ├── Azure AI Document Intelligence resource
        └── Azure Storage Account
```

For the hackathon, your team will typically work within a **single Resource Group** that contains all your project's resources.

---

## Step 4 – Install the Azure CLI

The Azure CLI lets you create and manage Azure resources from your terminal.

### Windows
```powershell
winget install --exact --id Microsoft.AzureCLI
```
Or download the MSI from [learn.microsoft.com/cli/azure/install-azure-cli-windows](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows)

### macOS
```bash
brew update && brew install azure-cli
```

### Linux (Ubuntu/Debian)
```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

**Verify:**
```bash
az --version
# Expected: azure-cli 2.x.x
```

📖 Reference: [Install the Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)

---

## Step 5 – Sign In with the Azure CLI

```bash
az login
```

A browser window will open. Sign in with your Azure account. Once complete, your terminal will show the list of subscriptions you have access to.

**Set your active subscription** (if you have more than one):
```bash
az account list --output table
az account set --subscription "your-subscription-name-or-id"
```

**Verify you're signed in:**
```bash
az account show
```

---

## Step 6 – Install the Azure Developer CLI (azd)

The Azure Developer CLI (`azd`) makes it easy to deploy complete application templates to Azure, including AI Foundry projects.

### Windows
```powershell
winget install microsoft.azd
```

### macOS
```bash
brew tap azure/azd && brew install azd
```

### Linux
```bash
curl -fsSL https://aka.ms/install-azd.sh | bash
```

**Authenticate:**
```bash
azd auth login
```

📖 Reference: [Azure Developer CLI overview](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/overview)

---

## Step 7 – Set Up a Resource Group for Your Team

Each team should work within its own Resource Group:

```bash
# Replace <team-name> and <location> as directed by your facilitator
az group create \
  --name rg-uoa-hackathon-<team-name> \
  --location australiaeast
```

> **Your facilitator will confirm the naming convention and location to use.**

---

## ✅ Checkpoint

Before moving on, confirm:

- [ ] You can sign in to [portal.azure.com](https://portal.azure.com) and see your subscription
- [ ] `az account show` returns your subscription details in the terminal
- [ ] `az group list --output table` lists your resource groups without error
- [ ] You understand the relationship between Account → Subscription → Resource Group

---

## ➡️ Next Step

Head to **[06 – Your First Repository](06-first-repo.md)** to learn the Git workflow you will use every day.
