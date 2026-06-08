# Copilot Instructions

## Repository Purpose

This repository is used to share cloud and technology content with customers and audiences in New Zealand. Content is published via **GitHub Pages at https://cknzraposo.github.io/msftnz/** — every push to `main` is immediately live.

- **`cloud/`** — Markdown articles about Azure and Microsoft cloud topics with a New Zealand focus (data residency, sovereignty, NZ region coverage, etc.)
- **`docs/`** — The GitHub Pages site root. `docs/index.html` is the landing page customers see. GitHub Pages is configured to serve from the `docs/` folder on `main`.

There is no build system, test suite, or package manager. The site is plain HTML/CSS.

### Disclaimer requirement

All customer-facing content must carry a clear disclaimer. The standard footer disclaimer used across the site is:

> *The opinions expressed herein are my own personal opinions and do not represent my employer's view in any way. Presentation Resources are provided as is with no guarantees or warranties of any kind.*

Articles that touch on legal or compliance topics (privacy law, data sovereignty) must also include inline:

> *This document is intended as a guide for clarity and shared understanding. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.*

For cloud/legal content, include frontmatter disclaimer flags so the article template renders the legal disclaimer reliably:

```yaml
disclaimers:
  - "legal-compliance"
  - "not-legal-advice"
```

## Content File Conventions (`cloud/`)

Every Markdown file in `cloud/` uses YAML frontmatter with this structure:

```yaml
---
title: "Full descriptive title"
description: "One-sentence summary for SEO/metadata"
date: YYYY-MM-DD
lastmod: YYYY-MM-DD
author: "Chandima Kulathilake"
tags: ["tag1", "tag2"]
category: "Cloud Strategy" # or "Cloud Infrastructure"
slug: "url-slug"
layout: "page"
draft: true
disclaimers:
  - "legal-compliance"
  - "not-legal-advice"
related:
  - "/slug-of-related-page"
---
```

- Always update `lastmod` when editing an existing file
- `related` links use root-relative paths (leading `/`) matching valid slugs in `docs/collections.json`
- `draft: true` is the default state for all articles
- Keep `author` as `"Chandima Kulathilake"` for cloud articles unless explicitly co-authored
- Avoid duplicate entries in `related`

## Writing Style

Content in `cloud/` is written for a New Zealand enterprise/government audience:

- Plain language with short sentences; avoid jargon unless defined
- Use Markdown tables for comparisons (see the residency vs. sovereignty table in `summary.md` as a reference)
- Use bold lead-ins for list items: `**Term** — explanation`
- New Zealand-specific terms: use "Aotearoa New Zealand", honour macrons (Māori, Kaitiakitanga, etc.), and reference Te Mana Raraunga and Te Tiriti o Waitangi where relevant to data sovereignty content

## Content Collections

The `docs/` site uses a **shared template + central registry** pattern. No per-directory HTML files are needed for new topics.

`docs/collections.json` contains both:

- a top-level `site` block (home page title, welcome copy, sections, footer disclaimer, links)
- a `collections` array (directory, metadata, audience, section, and article cards)

When editing navigation intent or homepage grouping, update `site.sections`, `collection.section`, and `collection.audience` in `docs/collections.json`.

### Architecture

```
docs/
  collections.json   ← single registry: site config + collections + article cards
  collection.html    ← shared collection landing (reads ?dir=cloud)
  article.html       ← shared article reader (reads ?dir=cloud&doc=data-residency-summary)
  index.html         ← home page, auto-renders collection cards from collections.json
  cloud/
    data-residency-summary.md
    cloud-faq.md
    …
  {new-topic}/
    article-one.md
    …
```

URLs follow the pattern:
- Collection: `https://cknzraposo.github.io/msftnz/collection.html?dir=cloud`
- Article: `https://cknzraposo.github.io/msftnz/article.html?dir=cloud&doc=data-residency-summary`

### How `article.html` works

Fetches `./{dir}/{slug}.md`, strips YAML frontmatter, renders the body with **marked.js** (CDN), and resolves related articles from the collection registry.

Legal disclaimer behavior:

- Preferred trigger: `disclaimers` frontmatter flags (`legal-compliance`, `not-legal-advice`)
- Fallback trigger: keyword detection in article body for cloud pages

Always use frontmatter disclaimer flags for legal/compliance articles to avoid brittle keyword-only behavior.

### Adding a new article to an existing collection

1. Add the `.md` file (with full YAML frontmatter) to `docs/{dir}/`
2. Add one entry to the collection's `articles` array in **`docs/collections.json`**:

```json
{
  "slug": "your-slug",
  "title": "Full Title",
  "description": "One-sentence description shown on cards.",
  "category": "Cloud Strategy"
}
```

3. Add root-relative `related` links (with leading `/`) to the article's frontmatter to wire up the related-articles panel.
4. If the article is legal/compliance oriented, add `disclaimers` flags in frontmatter.

### Internal links in markdown

Use root-relative slug paths in markdown body text — e.g. `[Data Residency Detail](/data-residency-detail)`. `article.html` has a custom marked.js renderer that automatically rewrites any `/slug` link to `article.html?dir={dir}&doc={slug}` at render time using the `collections.json` registry. No changes to markdown source files are needed when articles move between collections.

### Adding a new collection (new topic directory)

1. Create `docs/{topic}/` and place `.md` files inside it
2. Add one entry to the `collections` array in `docs/collections.json`:

```json
{
  "dir": "topic-name",
  "title": "Topic Title",
  "subtitle": "Short tagline for the page header",
  "description": "Description shown on the home page card.",
  "icon": "🔒",
  "audience": "Who this collection is for",
  "section": "primary",
  "articles": [ … ]
}
```

That's all — `index.html`, `collection.html`, and `article.html` automatically handle the rest.

Notes:

- Valid section values should match one of `site.sections[].id`.
- Do not add per-directory `index.html` or `article.html` redirect stubs.

### Source vs published markdown

- `{topic}/*.md` at the repo root — drafts/working copies (`draft: true` in frontmatter)
- `docs/{topic}/*.md` — published files served by GitHub Pages; copy from the root draft folder when ready to publish

## Validation Workflow

Run content validation before push to catch slug and registry drift:

```powershell
pwsh ./scripts/validate-content.ps1 -RepoRoot .
```

To validate only active/in-scope collections during focused edits:

```powershell
pwsh ./scripts/validate-content.ps1 -RepoRoot . -CollectionDirs cloud,copilot-learning,azure-app-services
```

Validator checks include:

- required collection/article fields in `docs/collections.json`
- duplicate slugs within and across collections
- slug-to-file integrity (`docs/{dir}/{slug}.md` exists)



The website uses Microsoft's brand palette:

- Primary blue: `#0078d4` (Azure/Microsoft blue)
- Hover/accent blue: `#106ebe`
- Dark footer: `#2c3e50`
- Card background: `#f8f9fa`
- Border accent on cards: `4px solid #0078d4`

Font stack: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`

Responsive breakpoint at `max-width: 768px`.
