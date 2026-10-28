# Cloud Adoption Guide for Aotearoa New Zealand

Plain-language cloud guidance and technical learning resources for enterprise,
government, developers, and architects in Aotearoa New Zealand. This repository
contains the Markdown articles, navigation registry, page templates, and tooling
for the [public resource site](https://cknzraposo.github.io/msftnz/).

## Content collections

| Collection | Content |
|---|---|
| [Cloud Resources](docs/cloud/) | Azure New Zealand North, service availability, Azure Local versus Azure cloud, data residency and sovereignty, and cloud decision-making guidance. |
| [Sovereignty Decision Framework](docs/sovereignty-framework/) | Six linked discussion guides covering requirements, control and security evidence, continuity, architecture trade-offs, and a decision worksheet. Not a compliance standard or certification. |
| [Copilot Learning](docs/copilot-learning/) | An introduction to GitHub Copilot and AI-assisted development. |
| [Azure App Services](docs/azure-app-services/) | Getting started with Azure App Service, including hosting, networking, pricing, and New Zealand considerations. |

`docs/collections.json` defines the homepage sections, collection metadata, and
active article listings. Some Markdown files in `docs/cloud/` are archived entry
points rather than active articles.

## Repository structure

| Path | Purpose |
|---|---|
| `docs/` | Markdown content, the central registry, shared CSS, and the retained browser-rendered HTML site. |
| `site/` | Eleventy page templates, static-site layout styles, and legacy bookmark redirects. |
| `scripts/` | Content validation, build-time rendering, output cleanup, and generated-site link checks. |
| `test/` | Automated regression tests for metadata, rendering, links, publication rules, and redirects. |
| `.github/workflows/static-site.yml` | CI validation, static-site build artifacts, and opt-in GitHub Pages deployment. |
| `eleventy.config.js` | Static build configuration and asset copying. |
| `package.json`, `package-lock.json` | Build commands and pinned development dependencies. |
| `_site/` | Generated static HTML and assets; ignored by Git and recreated by the build. |
| `_sources/` | Local reference material, excluded from Git and generated output; not a public download library. |

## Site architecture

The repository contains two rendering paths:

- **Retained site:** `docs/index.html`, `docs/collection.html`, and
  `docs/article.html` load the registry and render content in the browser.
  The article reader uses a CDN-hosted Markdown parser.
- **Generated site:** Eleventy produces complete HTML in `_site/` from the same
  Markdown and registry. Articles and navigation work without JavaScript or a
  runtime CDN; a small local script handles old query-string bookmarks.

GitHub Pages is sufficient to host either path. No application server or database
is required. The generated-site workflow does not enable deployment or change
Pages settings automatically; see the cutover instructions below.

## Build and preview

Requires Node.js 24+ and PowerShell 7 (`pwsh`) for the existing content validator.

```powershell
npm ci --ignore-scripts
npm run validate
npm test
npm run build
npm run preview
```

Open **http://localhost:8080/msftnz/** while preview is running. Generated files
are written to `_site/` (ignored by Git). `npm run build` first clears only that
output directory, then generates and checks every page and local link. Preview
watches content changes and also checks generated links.

- `docs/collections.json` remains the publication allowlist. Registered articles
  are published even when their existing frontmatter says `draft: true`.
  Unregistered Markdown is not copied into the generated site.
- `site/pages.njk` and `site/_includes/base.njk` provide shared templates.
  Existing branding comes from `docs/css/styles.css`; migration-only improvements
  are in `site/static.css`.
- `scripts/site-content.mjs` parses YAML, renders Markdown at build time, resolves
  links and related articles across collections, and validates generated pages.
  Raw HTML in Markdown is displayed as text, not executed.
- Article URLs become `/msftnz/{collection}/{slug}/`; collection URLs become
  `/msftnz/{collection}/`. Existing `article.html?dir=...&doc=...` and
  `collection.html?dir=...` bookmarks redirect using a small local script.
  Query parameters and fragments are retained. Without JavaScript, the
  compatibility pages list working static links.
- `site/legacy-articles.json` explicitly maps the three archived article bookmarks
  to their current replacements. Add mappings when retiring other article URLs.
- Images and PDFs under `docs/` are copied with their relative paths preserved.
  Restart preview after adding a new asset. Missing local assets fail validation.

The static build rejects malformed metadata, unknown sections, duplicate
collection/article identifiers, missing article files, broken related links,
missing legal disclaimer flags on detected cloud/legal content, duplicate heading
IDs, and broken local page/fragment/asset links. External sites are not contacted
by the link checker. Keep explicit disclaimer flags on legal/compliance articles;
keyword detection is only a guardrail, not a legal classification.

## Adding or updating content

1. Add or edit Markdown in the appropriate `docs/{collection}/` directory.
   Include YAML frontmatter matching the existing articles and update `lastmod`
   when editing content.
2. For a new article, add its slug, title, description, and category to the
   collection's `articles` array in `docs/collections.json`. Registry membership
   controls publication in the generated site, not the `draft` flag.
3. Use root-relative article slug links such as
   `[Service availability](/service-availability)`. Use the same format in
   frontmatter `related` entries to connect articles across collections.
4. Include both `legal-compliance` and `not-legal-advice` frontmatter disclaimer
   flags for legal/compliance articles. Cloud articles also require `verifiedOn`
   and `reviewBy` dates.
5. Run `npm run validate`, `npm test`, and `npm run build`, then review the local
   preview before publishing.

To add a collection, create its content directory and add a collection entry to
the registry with an audience and a section matching `site.sections`. Shared
templates generate its landing page; no hand-written per-collection HTML is needed.

### Sovereignty framework evidence

`site/sovereignty-evidence.json` records the framework's claim checks, source links,
qualifications, and omissions. Microsoft product statements were checked against
official Microsoft Learn documentation through MCP; New Zealand privacy and Māori
data governance statements use relevant primary sources. Verification dates record
source review, not legal approval or validation of a customer's configuration.

Maintain the evidence register and article dates when revising factual claims.
The framework links GCDO Cloud First and risk-assessment resources, the NZISM
manual, and Microsoft's NZISM implementation guide across requirements, evidence,
continuity, option selection, and the decision worksheet. The evidence register
distinguishes full Microsoft Learn MCP reviews from government references checked
through official indexed excerpts where direct access was challenged.
It does not reproduce an exhaustive government control matrix, certify compliance,
or provide blanket lawful-access assurances or platform-wide guarantees.
Original reference PDFs are not published or linked for download.

## CI and hosting cutover

The **Static site** workflow validates and builds pull requests and pushes to
`main`, then uploads a `github-pages` artifact for inspection. Deployment is
disabled by default; adding this workflow does not change the live Pages source.

1. Review the generated site locally or download the workflow's artifact
   (containing `artifact.tar`) and inspect it.
2. In repository **Settings > Pages**, change **Source** to **GitHub Actions**.
3. Run **Actions > Static site > Run workflow** on `main` with **deploy** enabled.
   The workflow builds and validates again before deployment.
4. Verify the live homepage, collections, article tables, heading fragments,
   disclaimers, and existing query-string bookmarks.
5. To deploy automatically after successful pushes to `main`, set the repository
   Actions variable **`STATIC_SITE_DEPLOY`** to **`true`**.

Build failures do not run the deployment job. No scripts here change repository
settings or enable deployment automatically. The source change itself is not
atomic with the first Actions deployment, so schedule cutover appropriately.

For rollback, disable `STATIC_SITE_DEPLOY` and restore Pages to **Deploy from a
branch**, using `main` and `/docs`. The original runtime-rendered site is retained.

## Disclaimers

This site provides independent guidance for general information and learning. The
views expressed are those of the author and do not represent Microsoft or any
other employer. Content is provided as is, without warranties of accuracy,
completeness, or suitability for a particular purpose. Product capabilities,
availability, and terms may change; verify current official documentation and
seek appropriate professional advice before making decisions.

This document is intended as a guide for clarity and shared understanding. It is
not legal advice. Organisations should consult legal counsel for specific
compliance and sovereignty decisions.
