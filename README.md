## About Me
Hey there, thanks for visiting. My name is Chandima (aka: Chan).

I am a curious technologist, entrepreneur, collaborator, and optimist. I am passionate about helping organisations adapt and innovate, using technology to create value and drive sustainable growth.

## My Background
I have a diverse background in technology, business, and strategy. I have worked in various roles across the tech industry. My experience spans startups, large enterprises, and everything in between.

## Current Role at Microsoft

I’m currently serving as an Account Technology Strategist at Microsoft in New Zealand. In this role, I lead strategic technology engagements that help organisations modernise, innovate, and transform through Microsoft’s cloud and AI capabilities.
## This Repository

Content published via **GitHub Pages at https://cknzraposo.github.io/msftnz/**. The site is plain HTML/CSS with no build system — every push to `main` is immediately live.

Primary site positioning in `docs/collections.json`:

- **Cloud Guidance** (primary)
- **Learning Resources** (secondary)

### Content Collections

#### ☁️ Cloud Resources — Azure & Microsoft Cloud (New Zealand)
Plain-language guides for New Zealand enterprise and government audiences on Azure and Microsoft cloud topics.

- **Data Residency & Data Sovereignty — Summary** — options for Azure and Microsoft 365
- **Data Residency & Data Sovereignty — Detail** — detailed guide with legal considerations and practical steps
- **Azure New Zealand North — Cloud Region Dossier** — services, availability zones, compliance, latency, and pricing
- **Cloud Residency, Sovereignty, and NZ North — FAQ** — unified frequently asked questions
- **Data Residency vs Data Sovereignty — Decisions to Make** — trade-offs, costs, and risk implications

#### 🌐 Azure App Services — Hosting Web Apps & APIs on Azure (New Zealand)
Plain-language guide to Azure App Service hosting models, networking, data residency in NZ North, pricing, and deployment patterns.

- **Getting Started with Azure App Service** — core concepts and architecture patterns

#### 🤖 Copilot Learning — Getting Started with GitHub Copilot
A practical learning path for GitHub Copilot — what it is, how to set it up, and how to get the most out of AI-assisted development.

### Repository Structure

```
docs/             ← GitHub Pages site root (served from main)
  index.html      ← Home page
  collection.html ← Shared collection landing page
  article.html    ← Shared article reader (renders Markdown via marked.js)
  collections.json ← Central registry for site config, collections, and article cards
  cloud/          ← Published cloud articles
  azure-app-services/ ← Published Azure App Services articles
  copilot-learning/ ← Published Copilot learning articles
  css/styles.css  ← Site styles
scripts/
  validate-content.ps1 ← Content registry and slug integrity validator
```

> *The opinions expressed herein are my own personal opinions and do not represent my employer's view in any way. Presentation Resources are provided as is with no guarantees or warranties of any kind.*

## Content Validation

Use the validator before pushing to `main` to catch registry-to-file mismatches early.

```powershell
pwsh ./scripts/validate-content.ps1 -RepoRoot .
```

To validate only specific collections during focused changes:

```powershell
pwsh ./scripts/validate-content.ps1 -RepoRoot . -CollectionDirs cloud,copilot-learning,azure-app-services
```
