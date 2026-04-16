# 02 – GitHub Setup

GitHub is where your code lives. In this guide you will create an account, install Git, configure your identity, and connect your local machine to GitHub.

---

## Step 1 – Create a GitHub Account

1. Go to [github.com/signup](https://github.com/signup)
2. Enter your **university email address**
3. Choose a username (keep it professional — you'll share this with teammates and assessors)
4. Complete the verification steps

> **💡 Student tip:** After creating your account, apply for the **GitHub Student Developer Pack** at [education.github.com/pack](https://education.github.com/pack). This gives you free access to GitHub Copilot, private repositories, and many other tools.

---

## Step 2 – Install Git

Git is the version control tool that GitHub is built on. You need it installed locally.

### Windows
Download and run the installer from [git-scm.com/downloads](https://git-scm.com/downloads).  
During installation, keep all defaults. When asked about the default editor, you can select **Visual Studio Code** if it is already installed.

### macOS
Open Terminal and run:
```bash
xcode-select --install
```
Git is included with the Xcode command-line tools. Alternatively, install via [Homebrew](https://brew.sh/):
```bash
brew install git
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update && sudo apt install git -y
```

**Verify the installation:**
```bash
git --version
# Expected output: git version 2.x.x
```

---

## Step 3 – Configure Your Git Identity

Every commit you make will be tagged with your name and email. Set these once:

```bash
git config --global user.name "Your Full Name"
git config --global user.email "your-university-email@aucklanduni.ac.nz"
```

Set VS Code as your default Git editor:
```bash
git config --global core.editor "code --wait"
```

Verify your config:
```bash
git config --list
```

---

## Step 4 – Authenticate with GitHub

You need a way for Git on your machine to prove it is you when pushing code to GitHub. The recommended method is **HTTPS with the Git Credential Manager**, which is bundled with Git for Windows and macOS.

### Option A – HTTPS (Recommended for beginners)

The first time you push or clone a private repository, a browser window will open and ask you to sign in to GitHub. This is handled automatically by Git Credential Manager.

To test it, clone a public repository:
```bash
git clone https://github.com/github/gitignore.git
cd gitignore
```

### Option B – SSH Key (Advanced)

If you prefer SSH authentication:

```bash
# Generate a new SSH key (replace with your email)
ssh-keygen -t ed25519 -C "your-university-email@aucklanduni.ac.nz"

# Add the key to the SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy your public key
cat ~/.ssh/id_ed25519.pub
```

Then go to [github.com/settings/keys](https://github.com/settings/keys), click **New SSH key**, and paste the copied key.

Test it:
```bash
ssh -T git@github.com
# Expected: Hi <username>! You've successfully authenticated...
```

📖 Full SSH guide: [docs.github.com – Connecting to GitHub with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

---

## Step 5 – Install GitHub CLI (Optional but Recommended)

The GitHub CLI (`gh`) lets you manage pull requests, issues, and repos from the terminal.

**Install:**
- Windows: `winget install --id GitHub.cli`
- macOS: `brew install gh`
- Linux: [cli.github.com](https://cli.github.com/)

**Authenticate:**
```bash
gh auth login
```
Follow the prompts and choose **GitHub.com → HTTPS → Login with a web browser**.

---

## Step 6 – Sign Up for GitHub Copilot

GitHub Copilot is an AI coding assistant that provides inline code suggestions, chat-based help, and agent capabilities directly inside VS Code. For this hackathon it is an essential tool.

### Get access

You have two options:

| Option | Cost | How to get it |
|---|---|---|
| **GitHub Student Developer Pack** (recommended) | Free | Apply at [education.github.com/pack](https://education.github.com/pack) using your university email. Includes Copilot Pro while you are a student. |
| **GitHub Copilot Free** | Free (usage limits) | Already included with every GitHub account. Provides limited completions and chat messages per month. |

> **💡 Tip:** If you applied for the Student Developer Pack in Step 1, Copilot Pro is already included — no separate signup needed. Approval can take a few minutes to a few days, so apply early.

### Verify your Copilot access

1. Go to [github.com/settings/copilot](https://github.com/settings/copilot)
2. Confirm that Copilot is shown as **active** on your account
3. If you see an option to enable it, toggle it on

---

## Step 7 – Enable GitHub Copilot in VS Code

Once you have Copilot access on your GitHub account, connect it to VS Code:

### Install the extensions

Open VS Code and install the Copilot extensions. You can do this from the terminal:

```bash
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
```

Or search for **GitHub Copilot** and **GitHub Copilot Chat** in the Extensions panel (`Ctrl+Shift+X` / `Cmd+Shift+X`).

### Sign in to GitHub in VS Code

1. Click the **Accounts** icon in the bottom-left corner of VS Code (person silhouette)
2. Select **Sign in with GitHub to use GitHub Copilot**
3. A browser window will open — authorise VS Code to access your GitHub account
4. Return to VS Code — you should see a Copilot icon (sparkle) in the status bar

### Verify Copilot is working

1. Open or create any `.py` file
2. Start typing a function, for example:

   ```python
   def greet(name):
   ```

3. Copilot should suggest a completion in grey text — press `Tab` to accept

If you see suggestions appearing, Copilot is working.

### Open Copilot Chat

- Press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Shift+I` (macOS) to open Copilot Chat
- You can ask questions about your code, get explanations, or request code generation
- Try asking: *"How do I create a virtual environment in Python?"*

### Copilot keyboard shortcuts

| Shortcut (Win/Linux) | Shortcut (macOS) | Action |
|---|---|---|
| `Tab` | `Tab` | Accept Copilot suggestion |
| `Esc` | `Esc` | Dismiss suggestion |
| `Alt+]` | `Option+]` | Next suggestion |
| `Alt+[` | `Option+[` | Previous suggestion |
| `Ctrl+Shift+I` | `Cmd+Shift+I` | Open Copilot Chat |

> **💡 Tip:** Copilot works best when you write clear comments describing what you want before writing code. It uses your comments, file context, and open tabs to generate better suggestions.

📖 Reference: [Getting started with GitHub Copilot](https://docs.github.com/en/copilot/getting-started-with-github-copilot)

---

## ✅ Checkpoint

Before moving on, confirm:

- [ ] You can open a terminal and run `git --version` without errors
- [ ] `git config --list` shows your name and email
- [ ] You can clone a repository from GitHub without being prompted for a password repeatedly
- [ ] GitHub Copilot is active on your account at [github.com/settings/copilot](https://github.com/settings/copilot)
- [ ] The Copilot icon appears in the VS Code status bar
- [ ] Copilot suggests code completions when you type in a `.py` file

---

## ➡️ Next Step

Head to **[03 – VS Code Setup](03-vscode-setup.md)** to configure your editor and install remaining extensions.
