import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { load } from "cheerio";
import { buildContent, parseArticle, renderArticle, rewriteArticleLinks, validateGeneratedSite } from "../scripts/site-content.mjs";

const frontmatter = `---
title: 'A title: with "quotes"'
description: >
  A multiline
  description.
date: 2026-03-19
lastmod: 2026-03-19
slug: example
author: Example Author
category: Examples
tags: [example]
draft: true
related: []
---
`;

async function temporaryDirectory(t) {
    const directory = await mkdtemp(path.join(os.tmpdir(), "msftnz-test-"));
    t.after(() => rm(directory, { recursive: true, force: true }));
    return directory;
}

test("YAML parsing preserves quoted titles, folded text and typed lists with CRLF", () => {
    const { data, body } = parseArticle(`${frontmatter}# Body`.replaceAll("\n", "\r\n"), "example.md");
    assert.equal(data.title, 'A title: with "quotes"');
    assert.equal(data.description, "A multiline description.\n");
    assert.deepEqual(data.related, []);
    assert.equal(data.draft, true);
    assert.equal(body, "# Body");
    assert.throws(() => parseArticle(frontmatter.replace("lastmod: 2026-03-19", "lastmod: 2026-02-30"), "example.md"), /invalid lastmod/);
    assert.throws(() => parseArticle(frontmatter.replace("related: []", "related: not-a-list"), "example.md"), /expected a list/);
    assert.throws(() => parseArticle(frontmatter.replace("slug: example", "slug: example\nslug: duplicate"), "example.md"), /unique/);
});

test("headings get stable Unicode IDs; only an exact leading duplicate title is removed", () => {
    const rendered = renderArticle("# Example\n\n## Māori\n\n## Māori\n\n# Another title\n\n<script>alert(1)</script>", "Example");
    const $ = load(rendered.body);
    assert.equal(rendered.headingId, "example");
    assert.deepEqual($("h2").map((_, node) => $(node).attr("id")).get(), ["māori", "māori-1"]);
    assert.equal($("h1").text(), "Another title");
    assert.equal($("script").length, 0);
    assert.match($.text(), /<script>/);
    assert.equal(load(renderArticle("# Short title", "Longer title").body)("h1").text(), "Short title");
    assert.equal(load(renderArticle("## Main", "Example").body)("h2").attr("id"), "main-1");
    const table = load(renderArticle("| A | B |\n| - | - |\n| 1 | 2 |", "Example").body);
    assert.equal(table(".table-scroll[tabindex='0'] table th[scope='col']").length, 2);
});

test("links resolve cross-collection slugs, relative Markdown and old routes without losing suffixes", () => {
    const articles = new Map([
        ["example", { source: "cloud/example.md", url: "/msftnz/cloud/example/" }],
        ["other", { source: "learning/other.md", url: "/msftnz/learning/other/" }]
    ]);
    const html = `<a href="/other?mode=print#details">Slug</a>
        <a href="../learning/other.md#details">Markdown</a>
        <a href="example.md#example">Same collection</a>
        <a href="../article.html?dir=cloud&amp;doc=old&amp;mode=print#details">Old route</a>
        <a href="#details">Fragment</a>
        <a href="https://example.com/other">External</a>
        <a href="/assets/guide.pdf">Download</a>
        <img src="../images/example.png" alt="Example">`;
    const $ = load(rewriteArticleLinks(html, "cloud/example.md", articles, { "cloud/old": "other" }));
    assert.deepEqual($("a").map((_, node) => $(node).attr("href")).get(), [
        "/msftnz/learning/other/?mode=print#details", "/msftnz/learning/other/#details",
        "/msftnz/cloud/example/#example", "/msftnz/learning/other/?mode=print#details",
        "#details", "https://example.com/other", "/msftnz/assets/guide.pdf"
    ]);
    assert.equal($("img").attr("src"), "/msftnz/images/example.png");
    assert.throws(() => rewriteArticleLinks('<a href="/missing">Missing</a>', "cloud/example.md", articles), /unknown article slug/);
    assert.throws(() => rewriteArticleLinks('<a href="missing.md">Missing</a>', "cloud/example.md", articles), /unknown Markdown link/);
});

test("registry membership publishes draft:true; related links work across collections", async t => {
    const directory = await temporaryDirectory(t);
    await mkdir(path.join(directory, "docs", "cloud"), { recursive: true });
    await mkdir(path.join(directory, "docs", "learning"), { recursive: true });
    await mkdir(path.join(directory, "site"));
    const card = { slug: "example", title: "Example", description: "Example", category: "Examples" };
    const registry = {
        site: {
            title: "Example", welcomeHeading: "Welcome", welcomeText: "Example",
            disclaimer: { footer: "Independent guidance for general information.", tagline: "Example" },
            links: { github: "https://github.com/", substack: "https://example.com/" },
            sections: [{ id: "primary", title: "Examples" }]
        },
        collections: ["cloud", "learning"].map((dir, index) => ({
            dir, title: dir, description: "Example", section: "primary", audience: "Everyone",
            articles: [{ ...card, slug: index ? "other" : "example" }]
        }))
    };
    const registryFile = path.join(directory, "docs", "collections.json");
    const sourceFile = path.join(directory, "docs", "cloud", "example.md");
    await writeFile(registryFile, JSON.stringify(registry));
    await writeFile(path.join(directory, "site", "legacy-articles.json"), "{}");
    await writeFile(sourceFile, frontmatter.replace("related: []", "related: [/other]") + "# Example");
    await writeFile(path.join(directory, "docs", "learning", "other.md"), frontmatter.replace("slug: example", "slug: other") + "# Other");
    await writeFile(path.join(directory, "docs", "cloud", "unregistered.md"), "Not publishable");
    const result = await buildContent(directory);
    const articles = result.pages.filter(page => page.type === "article");
    assert.equal(articles.length, 2);
    assert.equal(articles[0].draft, true);
    assert.equal(articles[0].related[0].url, "/msftnz/learning/other/");
    await writeFile(sourceFile, frontmatter + "Data sovereignty");
    await assert.rejects(buildContent(directory), /both disclaimer flags/);
    await writeFile(sourceFile, frontmatter.replace("related: []", "related: []\ndisclaimers: [legal-compliance, not-legal-advice]") + "Data sovereignty");
    const legalResult = await buildContent(directory);
    assert.equal(legalResult.pages.find(page => page.source === "cloud/example.md").legal, true);
    await writeFile(sourceFile, frontmatter + "# Example");
    registry.collections[1].articles[0].slug = "example";
    await writeFile(registryFile, JSON.stringify(registry));
    await assert.rejects(buildContent(directory), /Duplicate article slug/);
});

test("generated-site checks reject missing targets, broken fragments and duplicate IDs", async t => {
    const directory = await temporaryDirectory(t);
    const page = link => `<title>Example</title><main id="main">${link}</main><footer><p id="footer-disclaimer">Independent guidance for general information.</p></footer>`;
    const filename = path.join(directory, "index.html");
    await writeFile(filename, page('<a href="/msftnz/#main">Home</a>'));
    await validateGeneratedSite(directory);
    await writeFile(filename, page('<a href="/msftnz/#missing">Broken fragment</a>'));
    await assert.rejects(validateGeneratedSite(directory), /missing fragment target/);
    await writeFile(filename, page('<a href="/msftnz/missing/">Missing page</a>'));
    await assert.rejects(validateGeneratedSite(directory), /missing link target/);
    await writeFile(filename, page('<p id="main">Duplicate</p>'));
    await assert.rejects(validateGeneratedSite(directory), /duplicate id/);
    await writeFile(filename, page('<a href="/outside">Wrong base</a>'));
    await assert.rejects(validateGeneratedSite(directory), /escapes site base path/);
    await writeFile(filename, page("Content").replace("Independent guidance for general information.", " "));
    await assert.rejects(validateGeneratedSite(directory), /missing title, content or footer disclaimer/);
});

test("old bookmarks redirect only to known routes and retain queries and fragments", async () => {
    const script = await readFile(new URL("../site/legacy.js", import.meta.url), "utf8");
    for (const [pathname, search, key] of [
        ["/msftnz/article.html", "?dir=cloud&doc=example&mode=print", "cloud/example"],
        ["/msftnz/article.html", "?dir=cloud&doc=summary&mode=print", "cloud/summary"],
        ["/msftnz/collection.html", "?dir=cloud&mode=print", "cloud"]
    ]) {
        let destination;
        const status = {};
        vm.runInNewContext(script, {
            URL, URLSearchParams,
            window: { location: { pathname, search, hash: "#details", replace: url => { destination = url; } } },
            document: {
                querySelectorAll: () => [{ dataset: { legacyKey: key }, href: "https://example.com/msftnz/cloud/example/" }],
                getElementById: () => status
            }
        });
        assert.equal(destination, "https://example.com/msftnz/cloud/example/?mode=print#details");
    }
    let replaced = false;
    const status = {};
    vm.runInNewContext(script, {
        URL, URLSearchParams,
        window: { location: { pathname: "/msftnz/article.html", search: "?dir=cloud&doc=missing", replace: () => { replaced = true; } } },
        document: { querySelectorAll: () => [], getElementById: () => status }
    });
    assert.equal(replaced, false);
    assert.match(status.textContent, /does not match/);
});
