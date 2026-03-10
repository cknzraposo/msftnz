# 03 – VS Code Setup

Visual Studio Code (VS Code) is the recommended editor for this programme. It has excellent support for Python, Azure, and GitHub, and integrates tightly with the tools you will use throughout the hackathon.

---

## Step 1 – Download and Install VS Code

1. Go to [code.visualstudio.com](https://code.visualstudio.com/)
2. Download the installer for your operating system
3. Run the installer — keep all defaults

> **Windows tip:** During installation, tick **"Add to PATH"** and **"Open with Code"** context menu options. These save time later.

Verify the installation by opening a terminal and running:
```bash
code --version
```

---

## Step 2 – Sign In to GitHub in VS Code

Signing in to GitHub inside VS Code enables GitHub Copilot (if you have access) and makes it easier to manage repositories.

1. Open VS Code
2. Click the **Accounts** icon (bottom-left, person silhouette)
3. Select **Sign in with GitHub**
4. A browser window will open — authorise VS Code

---

## Step 3 – Install Recommended Extensions

Open the Extensions panel with `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (macOS), then search for and install each extension below.

### Essential Extensions

| Extension | Publisher | What it does |
|---|---|---|
| **Python** | Microsoft | Python language support, IntelliSense, debugging |
| **Pylance** | Microsoft | Fast, type-aware Python analysis |
| **Jupyter** | Microsoft | Run `.ipynb` notebooks inside VS Code |
| **GitHub Copilot** | GitHub | AI code completion (requires GitHub Student Pack or subscription) |
| **GitHub Copilot Chat** | GitHub | Chat with Copilot about your code |
| **GitLens** | GitKraken | Visualise Git history, blame, and branches inline |
| **Azure Tools** | Microsoft | Suite of Azure extensions (Storage, Functions, App Service) |
| **Bicep** | Microsoft | IaC templates for Azure resources |
| **REST Client** | Huachao Mao | Test HTTP/API endpoints directly in VS Code |

### Install All at Once (Terminal)

```bash
code --install-extension ms-python.python
code --install-extension ms-python.pylance
code --install-extension ms-toolsai.jupyter
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
code --install-extension eamodio.gitlens
code --install-extension ms-vscode.vscode-node-azure-pack
code --install-extension ms-azuretools.vscode-bicep
code --install-extension humao.rest-client
```

---

## Step 4 – Configure VS Code Settings

Open Settings with `Ctrl+,` (or `Cmd+,`) and apply these recommended settings. Alternatively, open the **Command Palette** (`Ctrl+Shift+P`), type `Open User Settings (JSON)`, and paste:

```json
{
  "editor.formatOnSave": true,
  "editor.rulers": [88],
  "python.defaultInterpreterPath": "${workspaceFolder}/.venv/bin/python",
  "python.terminal.activateEnvironment": true,
  "files.autoSave": "onFocusChange",
  "terminal.integrated.defaultProfile.windows": "Git Bash",
  "git.autofetch": true,
  "git.confirmSync": false
}
```

> **Windows note:** If you're on Windows, you may prefer `"PowerShell"` instead of `"Git Bash"` for the terminal profile.

---

## Step 5 – Set Up the Integrated Terminal

VS Code has a built-in terminal. Open it with `` Ctrl+` `` (backtick).

On Windows, set Git Bash or PowerShell as the default shell via the terminal dropdown arrow (top-right of the terminal panel) → **Select Default Profile**.

---

## Step 6 – Open Your First Project Folder

You should always open VS Code at the **root of your project folder**, not individual files. This ensures Python environments, Git, and extensions work correctly.

```bash
# From your terminal, navigate to your project and open VS Code
cd path/to/your-project
code .
```

---

## ✅ Checkpoint

Before moving on, confirm:

- [ ] VS Code opens from the terminal with `code .`
- [ ] The Python extension is installed and you can see `Python` in the status bar at the bottom
- [ ] The Source Control panel (`Ctrl+Shift+G`) shows your Git repository when a folder with `.git` is open
- [ ] GitHub Copilot is showing in the status bar (if you have access)

---

## 💡 Useful Keyboard Shortcuts

| Shortcut (Win/Linux) | Shortcut (macOS) | Action |
|---|---|---|
| `Ctrl+Shift+P` | `Cmd+Shift+P` | Open Command Palette |
| `` Ctrl+` `` | `` Ctrl+` `` | Toggle terminal |
| `Ctrl+Shift+E` | `Cmd+Shift+E` | File Explorer |
| `Ctrl+Shift+G` | `Cmd+Shift+G` | Source Control (Git) |
| `Ctrl+Shift+X` | `Cmd+Shift+X` | Extensions |
| `F5` | `F5` | Run / Debug |

---

## ➡️ Next Step

Head to **[04 – Python Setup](04-python-setup.md)** to install Python and configure a virtual environment.
