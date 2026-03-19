---
title: "What is GitHub Copilot — Overview of Features and Capabilities"
description: "A plain-language overview of GitHub Copilot, what it does, how it works, and the features available to developers today."
date: 2026-03-19
lastmod: 2026-03-19
author: "Chandima Kulathilake"
tags: ["github-copilot", "ai-assisted-development", "developer-tools", "code-completions", "copilot-chat"]
category: "Copilot Fundamentals"
slug: "what-is-github-copilot"
layout: "page"
draft: true
related: []
---

# What is GitHub Copilot

## An Overview of Features and Capabilities

---

## What is GitHub Copilot?

GitHub Copilot is an AI-powered coding assistant built by GitHub. It integrates directly into your editor and helps you write code faster by suggesting completions, answering questions, and automating repetitive tasks — all without leaving your development environment.

Think of it as a knowledgeable pair-programmer that is always available. It does not replace the developer — it augments your workflow so you can focus on the problems that matter.

---

## How does it work?

GitHub Copilot is powered by large language models (LLMs) trained on a broad dataset of public code and natural language. When you type code or ask a question, Copilot uses the context of your current file, open tabs, and conversation history to generate relevant suggestions.

Key points:

- **It runs in your editor** — VS Code, Visual Studio, JetBrains IDEs, Neovim, and more
- **It understands context** — Copilot reads your open files, comments, and function signatures to provide relevant completions
- **It learns your patterns** — the more context you give it, the better its suggestions become

---

## Core features

### 1. Code completions

Copilot suggests code as you type — from single lines to entire functions. You accept suggestions with `Tab`, dismiss with `Esc`, or cycle through alternatives.

**Best for:**
- Writing boilerplate and repetitive code
- Implementing well-known patterns (API calls, data transformations, CRUD operations)
- Generating code from descriptive comments

### 2. Copilot Chat

An inline chat experience that lets you ask questions, request explanations, and get help — all inside your editor.

**What you can do:**
- **Ask questions** — "What does this function do?" or "How do I connect to Azure SQL from Python?"
- **Generate code** — "Write a unit test for this function" or "Create a REST endpoint for user registration"
- **Refactor** — "Simplify this function" or "Convert this to async/await"
- **Fix errors** — "Why am I getting this error?" with automatic context from your terminal or problems panel

### 3. Copilot in the CLI

GitHub Copilot extends to the command line. You can ask for help with shell commands, Git operations, and more — right in your terminal.

**Examples:**
- `gh copilot suggest "find all .py files modified in the last 7 days"`
- `gh copilot explain "git rebase -i HEAD~3"`

### 4. Copilot for Pull Requests

On GitHub.com, Copilot can help with pull request workflows:

- **PR summaries** — automatically generate a summary of changes
- **Code review** — Copilot can review your code and suggest improvements
- **PR descriptions** — draft descriptions from your commit history

### 5. Copilot Agents and Extensions

Copilot's capabilities can be extended through agents and extensions that add domain-specific knowledge and tool access. Agents can interact with external systems, run code, query databases, and more — expanding Copilot beyond simple code generation.

---

## What languages and frameworks does it support?

GitHub Copilot works with virtually any programming language and framework. It performs especially well with:

| Language / Framework | Strength |
|---|---|
| Python | Excellent — data science, web, scripting |
| JavaScript / TypeScript | Excellent — React, Node.js, Angular |
| C# / .NET | Excellent — ASP.NET, Azure Functions |
| Java | Strong — Spring Boot, enterprise patterns |
| Go | Strong — APIs, cloud-native tooling |
| HTML / CSS | Strong — layouts, responsive design |
| SQL | Strong — queries, schema design |
| PowerShell / Bash | Good — scripting, automation |

---

## Plans and availability

GitHub Copilot is available in several plans:

- **Copilot Free** — limited completions and chat interactions per month, available to everyone
- **Copilot Pro** — unlimited completions and chat for individual developers
- **Copilot Business** — organisation-level management, policy controls, and audit logs
- **Copilot Enterprise** — adds knowledge bases, Bing search, and fine-tuning on your organisation's codebase

For the latest plan details and pricing, see [github.com/features/copilot](https://github.com/features/copilot).

---

## Tips for getting the most out of Copilot

1. **Write clear comments** — describe what you want before you start coding; Copilot uses comments as intent signals
2. **Open relevant files** — Copilot reads your open tabs for context; keep related files open
3. **Be specific in chat** — "Write a Python function that validates NZ phone numbers using regex" works better than "validate phone numbers"
4. **Iterate** — treat Copilot suggestions as a starting point; review, refine, and test
5. **Use slash commands** — in Copilot Chat, commands like `/explain`, `/fix`, `/tests`, and `/doc` give Copilot a clear intent

---

## What Copilot is *not*

- **Not a replacement for understanding your code** — always review suggestions critically
- **Not deterministic** — the same prompt may produce different outputs at different times
- **Not a security guarantee** — treat generated code with the same scrutiny as code from any source

---

## Next steps

This article introduced what GitHub Copilot is and what it can do. Future articles in this collection will cover hands-on setup, practical workflows, and best practices for teams.

---

*The opinions expressed herein are my own personal opinions and do not represent my employer's view in any way. Presentation Resources are provided as is with no guarantees or warranties of any kind.*
