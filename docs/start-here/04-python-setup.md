# 04 – Python Setup

All three hackathon use cases involve Python-based AI agent development. This guide walks you through installing Python, creating isolated project environments, and installing the core Azure AI packages.

---

## Step 1 – Install Python 3.11

### Windows
1. Go to [python.org/downloads](https://www.python.org/downloads/)
2. Download **Python 3.11.x** (not 3.12+ for now — some Azure SDK packages work best on 3.11)
3. Run the installer
4. ✅ **Tick "Add Python to PATH"** before clicking Install

### macOS
```bash
brew install python@3.11
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install python3.11 python3.11-venv python3-pip -y
```

**Verify:**
```bash
python --version        # Windows
python3.11 --version    # macOS/Linux
# Expected: Python 3.11.x
```

---

## Step 2 – Understand Virtual Environments

A **virtual environment** is an isolated Python installation for a single project. It prevents package conflicts between projects.

> **Rule of thumb:** Create one virtual environment per project. Never install project packages into your global Python installation.

---

## Step 3 – Create a Virtual Environment

Navigate to your project folder and create a virtual environment called `.venv`:

```bash
# Windows
cd your-project-folder
python -m venv .venv

# macOS/Linux
cd your-project-folder
python3.11 -m venv .venv
```

**Activate it:**

```bash
# Windows (PowerShell)
.venv\Scripts\Activate.ps1

# Windows (Git Bash / CMD)
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate
```

When active, your terminal prompt will show `(.venv)` at the start.

**Deactivate when done:**
```bash
deactivate
```

> **VS Code tip:** When you open a project with a `.venv` folder, VS Code will usually detect it automatically. If not, open the Command Palette (`Ctrl+Shift+P`) → **Python: Select Interpreter** → choose `.venv`.

---

## Step 4 – Install Core Azure AI Packages

With your virtual environment active, install the packages you'll need across all three use cases:

```bash
pip install --upgrade pip

# Azure AI core packages
pip install azure-ai-projects          # Azure AI Foundry project client
pip install azure-ai-inference         # Model inference (chat, embeddings)
pip install azure-search-documents     # Azure AI Search
pip install azure-ai-documentintelligence  # Document Intelligence (OCR, forms)
pip install openai                     # OpenAI SDK (works with Azure OpenAI)

# Azure identity & secrets
pip install azure-identity             # Managed identity, CLI credential
pip install azure-keyvault-secrets     # Azure Key Vault

# Utilities
pip install python-dotenv              # Load .env files
pip install requests                   # HTTP requests
pip install rich                       # Pretty terminal output (optional but useful)
```

---

## Step 5 – Use a `.env` File for Secrets

**Never hardcode API keys or connection strings** in your code. Use a `.env` file to store secrets locally.

Create a `.env` file in your project root:
```
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your-api-key-here
AZURE_SEARCH_ENDPOINT=https://your-search.search.windows.net
AZURE_SEARCH_API_KEY=your-search-key-here
```

Load it in your Python code:
```python
from dotenv import load_dotenv
import os

load_dotenv()

endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
api_key = os.getenv("AZURE_OPENAI_API_KEY")
```

Add `.env` to your `.gitignore` file so secrets are **never committed to GitHub**:
```bash
echo ".env" >> .gitignore
```

📖 Reference: [python-dotenv documentation](https://pypi.org/project/python-dotenv/)

---

## Step 6 – Use a `requirements.txt` File

Share your project's dependencies with teammates using a `requirements.txt` file.

**Generate one from your active environment:**
```bash
pip freeze > requirements.txt
```

**Install from an existing `requirements.txt`:**
```bash
pip install -r requirements.txt
```

This means anyone who clones your repository can get the same packages by running a single command.

---

## Step 7 – Quick Smoke Test

Create a file called `test_setup.py` and run it to verify your environment:

```python
import os
from dotenv import load_dotenv
from openai import AzureOpenAI

load_dotenv()

client = AzureOpenAI(
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version="2024-02-01"
)

response = client.chat.completions.create(
    model="gpt-4o",  # your deployment name
    messages=[{"role": "user", "content": "Say hello in one sentence."}]
)

print(response.choices[0].message.content)
```

```bash
python test_setup.py
```

If you see a greeting from the model, your Python + Azure OpenAI setup is working.

---

## ✅ Checkpoint

Before moving on, confirm:

- [ ] `python --version` (or `python3.11 --version`) returns `3.11.x`
- [ ] You can create and activate a `.venv` virtual environment
- [ ] VS Code shows `.venv` as the selected Python interpreter
- [ ] `pip install azure-ai-projects` completes without errors
- [ ] You have a `.gitignore` that includes `.env`

---

## ➡️ Next Step

Head to **[05 – Azure Setup](05-azure-setup.md)** to create your Azure account and configure the Azure CLI.
