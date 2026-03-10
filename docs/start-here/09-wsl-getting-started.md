# 09 – Optional: Getting Started with WSL (Windows)

This guide is optional and applies to students using Windows who prefer a Linux-style development environment.

WSL (Windows Subsystem for Linux) lets you run Ubuntu inside Windows. This can make Python tooling, shell commands, and package management more consistent with cloud Linux environments.

---

## Should You Use WSL?

Use this quick rule:

- If you are on macOS: stay native on macOS.
- If you are on Windows and comfortable with PowerShell: you can stay native on Windows.
- If you are on Windows and want Linux-style tooling: use WSL.

For this hackathon, all three paths are valid.

---

## What You Need

- Windows 11 (recommended) or Windows 10 (version 2004+)
- Administrator access on your machine
- Stable internet connection

---

## Step 1 – Install WSL and Ubuntu

Open PowerShell as Administrator and run:

```powershell
wsl --install
```

This installs WSL and Ubuntu. Restart your machine if prompted.

If WSL is already installed, update it:

```powershell
wsl --update
```

Check status:

```powershell
wsl --status
wsl -l -v
```

Reference: [Install WSL (Microsoft Learn)](https://learn.microsoft.com/windows/wsl/install)

---

## Step 2 – Complete Ubuntu First-Run Setup

Launch Ubuntu from the Start menu, then:

1. Create a Linux username
2. Create a Linux password

Update packages:

```bash
sudo apt update && sudo apt upgrade -y
```

Install core tools:

```bash
sudo apt install -y git curl build-essential python3.11 python3.11-venv python3-pip
```

Reference: [Set up a WSL development environment (Microsoft Learn)](https://learn.microsoft.com/windows/wsl/setup/environment)

---

## Step 3 – Install VS Code WSL Extension

In VS Code, install:

- Remote - WSL (Microsoft)

Then open your project in WSL:

1. Open Command Palette
2. Run: Remote-WSL: New Window
3. In the WSL terminal, clone or open your repo
4. Run code . from inside WSL

Reference: [Get started using VS Code with WSL (Microsoft Learn)](https://learn.microsoft.com/windows/wsl/tutorials/wsl-vscode)

---

## Step 4 – Create and Use a Python Virtual Environment in WSL

Inside your project folder:

```bash
python3.11 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
```

Then install project packages as normal.

---

## Step 5 – Use the Right File Location

Best practice for speed and reliability:

- Keep your project inside the Linux filesystem, for example: /home/your-user/projects
- Avoid active development inside /mnt/c/... when possible

---

## Common Issues

### "wsl is not recognized"

Use a fully updated Windows build, then retry in an elevated PowerShell.

### VS Code cannot find interpreter in WSL

Open the project in a WSL window, then select interpreter path:

- .venv/bin/python

### Git identity missing inside WSL

Set Git identity again in WSL (separate from Windows Git):

```bash
git config --global user.name "Your Full Name"
git config --global user.email "your-email@aucklanduni.ac.nz"
```

---

## Recommended Path by Platform

- macOS: native setup using guides 01 to 08
- Windows (native): PowerShell + guides 01 to 08
- Windows (WSL): guides 01 to 08 plus this optional guide

---

## References (Official Microsoft)

- [Install WSL](https://learn.microsoft.com/windows/wsl/install)
- [Basic commands for WSL](https://learn.microsoft.com/windows/wsl/basic-commands)
- [Set up a WSL development environment](https://learn.microsoft.com/windows/wsl/setup/environment)
- [Get started using VS Code with WSL](https://learn.microsoft.com/windows/wsl/tutorials/wsl-vscode)
- [Troubleshooting WSL](https://learn.microsoft.com/windows/wsl/troubleshooting)

---

## Next Step

Return to [08 - Frequently Asked Questions](08-faq.md) for troubleshooting and team workflow questions.
