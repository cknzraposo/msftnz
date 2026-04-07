# 06 – Your First Repository

This guide covers the Git and GitHub workflow you'll use every day: cloning a repository, creating a branch, making changes, committing, pushing, and opening a pull request.

---

## Core Concepts

| Term | What it means |
|---|---|
| **Repository (repo)** | A folder tracked by Git — contains your code and its full history |
| **Clone** | Download a repository from GitHub to your local machine |
| **Branch** | An independent line of work within the same repo |
| **Commit** | A saved snapshot of your changes with a descriptive message |
| **Push** | Upload your local commits to GitHub |
| **Pull Request (PR)** | A request to merge your branch into the main branch, with review |

---

## The Daily Workflow

```
main branch (protected)
     │
     ├──► Create branch: feature/my-feature
     │         │
     │         ├── Make changes
     │         ├── Stage changes
     │         ├── Commit changes
     │         └── Push to GitHub
     │
     └──► Open Pull Request → Review → Merge into main
```

---

## Step 1 – Clone a Repository

Cloning copies the repository from GitHub to your local machine.

```bash
# Using HTTPS
git clone https://github.com/<org>/<repo-name>.git

# Using SSH (if you set up SSH keys in guide 02)
git clone git@github.com:<org>/<repo-name>.git

# Open the cloned folder in VS Code immediately
cd <repo-name>
code .
```

---

## Step 2 – Understand the Repository Structure

Once cloned, take a moment to look around:

```bash
git log --oneline -10        # Last 10 commits
git branch -a                # All branches (local and remote)
git status                   # Current state of your working directory
```

---

## Step 3 – Create a Branch

Always create a new branch for every piece of work. **Never commit directly to `main`.**

```bash
# Make sure you start from an up-to-date main
git checkout main
git pull origin main

# Create and switch to a new branch
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**
- `feature/` — new functionality (e.g. `feature/ocr-extraction`)
- `fix/` — bug fixes (e.g. `fix/grading-logic-error`)
- `docs/` — documentation changes (e.g. `docs/update-readme`)

---

## Step 4 – Make Your Changes

Edit files in VS Code. As you work:

```bash
git status          # See what has changed
git diff            # See the exact lines changed
```

---

## Step 5 – Stage and Commit Your Changes

**Stage** the files you want to include in this commit:

```bash
# Stage a specific file
git add src/my_file.py

# Stage all changed files
git add .
```

**Commit** with a clear, descriptive message:

```bash
git commit -m "Add OCR extraction for assessment forms"
```

**Good commit messages:**
- ✅ `Add rubric grading logic for MBChB assessments`
- ✅ `Fix: handle missing mandatory fields in form extraction`
- ❌ `fix stuff`
- ❌ `wip`

---

## Step 6 – Push Your Branch to GitHub

```bash
git push origin feature/your-feature-name
```

The first time you push a new branch, Git may ask you to set the upstream:
```bash
git push --set-upstream origin feature/your-feature-name
```

---

## Step 7 – Open a Pull Request

1. Go to your repository on [github.com](https://github.com)
2. You'll see a banner: **"Compare & pull request"** — click it
3. Add a descriptive title and description of your changes
4. Assign a teammate as a reviewer (if applicable)
5. Click **Create pull request**

> **GitHub CLI alternative:**
> ```bash
> gh pr create --title "Add OCR extraction" --body "Implements Document Intelligence extraction pipeline"
> ```

---

## Step 8 – Keeping Your Branch Up to Date

If other teammates have merged changes into `main` while you were working, bring those changes into your branch:

```bash
git checkout main
git pull origin main
git checkout feature/your-feature-name
git rebase main
```

Or using merge:
```bash
git merge main
```

---

## Step 9 – After Your PR is Merged

Clean up your local environment:

```bash
git checkout main
git pull origin main
git branch -d feature/your-feature-name    # Delete local branch
```

---

## Quick Reference: Daily Commands

```bash
git status                          # What's changed?
git pull origin main                # Get latest from main
git checkout -b feature/name        # New branch
git add .                           # Stage all changes
git commit -m "Clear message"       # Commit
git push origin feature/name        # Push to GitHub
gh pr create                        # Open pull request (GitHub CLI)
```

---

## Using Git in VS Code (Visual Alternative)

If you prefer a visual interface:

1. Open the **Source Control** panel (`Ctrl+Shift+G`)
2. Changed files appear under **Changes**
3. Click **+** next to a file to stage it
4. Type your commit message in the box at the top
5. Click **✓ Commit**
6. Click the **...** menu → **Push**

The **GitLens** extension (installed in guide 03) adds inline blame, history views, and a full branch visualiser.

---

## ✅ Checkpoint

Before moving on, confirm:

- [ ] You can clone a repository from GitHub
- [ ] `git checkout -b feature/test` creates and switches to a new branch
- [ ] `git add .` and `git commit -m "message"` work without errors
- [ ] You can push a branch and see it appear on GitHub
- [ ] You understand what a Pull Request is and when to open one

---

## ➡️ Next Step

Head to **[07 – Microsoft Foundry](07-azure-ai-foundry.md)** to create your first AI project.

