import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import MarkdownIt from "markdown-it";
import GithubSlugger from "github-slugger";
import { load } from "cheerio";

const root = fileURLToPath(new URL("../", import.meta.url));
const segment = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const basePath = "/msftnz/";
export const legalDisclaimer = "This document is intended as a guide for clarity and shared understanding. It is not legal advice. Organisations should consult legal counsel for specific compliance and sovereignty decisions.";
const markdown = new MarkdownIt({ html: false, linkify: false, typographer: false });

function requireText(object, fields, context) {
    for (const field of fields) {
        if (typeof object?.[field] !== "string" || !object[field].trim()) {
            throw new Error(`${context}: missing or invalid ${field}`);
        }
    }
}

function requireList(value, context) {
    if (!Array.isArray(value) || value.some(item => typeof item !== "string")) {
        throw new Error(`${context}: expected a list of strings`);
    }
}

function requireSegment(value, context) {
    if (typeof value !== "string" || !segment.test(value)) {
        throw new Error(`${context}: expected a lowercase hyphenated identifier`);
    }
}

export function parseArticle(raw, context) {
    const match = raw.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    if (!match) throw new Error(`${context}: missing YAML frontmatter`);
    const data = parse(match[1], { uniqueKeys: true });
    requireText(data, ["title", "description", "slug", "author", "category", "date", "lastmod"], context);
    for (const field of ["date", "lastmod", "verifiedOn", "reviewBy"]) {
        if (data[field] !== undefined && (!/^\d{4}-\d{2}-\d{2}$/.test(data[field]) ||
            !Number.isFinite(Date.parse(data[field])) ||
            new Date(data[field]).toISOString().slice(0, 10) !== data[field])) {
            throw new Error(`${context}: invalid ${field}`);
        }
    }
    requireList(data.tags, `${context}: tags`);
    requireList(data.related, `${context}: related`);
    if (new Set(data.related).size !== data.related.length) {
        throw new Error(`${context}: duplicate related articles`);
    }
    if (data.disclaimers !== undefined) requireList(data.disclaimers, `${context}: disclaimers`);
    return { data, body: raw.slice(match[0].length) };
}

export function renderArticle(body, title) {
    const $ = load(markdown.render(body), null, false);
    const slugger = new GithubSlugger();
    // Reserve the shared layout's skip-link target.
    slugger.slug("main");
    $("h1,h2,h3,h4,h5,h6").each((_, heading) => {
        $(heading).attr("id", slugger.slug($(heading).text()));
    });
    let headingId;
    const first = $.root().children().first();
    if (first.is("h1") && first.text().trim() === title.trim()) {
        headingId = first.attr("id");
        first.remove();
    }
    $("table").each((index, table) => {
        $(table).wrap(`<div class="table-scroll" role="region" aria-label="Table ${index + 1}" tabindex="0"></div>`);
        $(table).find("th").attr("scope", "col");
    });
    return { body: $.html(), headingId };
}

export function rewriteArticleLinks(html, source, articles, aliases = {}) {
    const $ = load(html, null, false);
    const sourceUrl = new URL(source, "https://source.invalid/");
    $("a[href],img[src]").each((_, element) => {
        const attribute = element.tagName === "img" ? "src" : "href";
        const href = $(element).attr(attribute);
        if (!href || href.startsWith("#") || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) return;
        const target = new URL(href, sourceUrl);
        const pathname = decodeURIComponent(target.pathname);
        let article;
        if (pathname.endsWith("/article.html")) {
            const key = `${target.searchParams.get("dir")}/${target.searchParams.get("doc")}`;
            article = articles.get(aliases[key]) || [...articles.values()].find(a => a.source === `${key}.md`);
            target.searchParams.delete("dir");
            target.searchParams.delete("doc");
            if (!article) throw new Error(`${source}: unknown article link ${href}`);
        } else if (pathname.endsWith(".md")) {
            const key = pathname.slice(1, -3);
            article = articles.get(aliases[key]) || [...articles.values()].find(a => a.source === `${key}.md`);
            if (!article) throw new Error(`${source}: unknown Markdown link ${href}`);
        } else if (attribute === "href" && href.startsWith("/") && !pathname.startsWith(basePath) &&
            /^\/[a-z0-9-]+\/?$/.test(pathname)) {
            article = articles.get(pathname.replace(/^\/|\/$/g, ""));
            if (!article) throw new Error(`${source}: unknown article slug ${href}`);
        }
        if (article) {
            $(element).attr(attribute, `${article.url}${target.search}${target.hash}`);
        } else if (!pathname.startsWith(basePath)) {
            $(element).attr(attribute, `${basePath}${pathname.slice(1)}${target.search}${target.hash}`);
        }
    });
    return $.html();
}

export async function buildContent(sourceRoot = root) {
    const registry = JSON.parse(await readFile(path.join(sourceRoot, "docs", "collections.json"), "utf8"));
    const aliases = JSON.parse(await readFile(path.join(sourceRoot, "site", "legacy-articles.json"), "utf8"));
    const site = registry.site;
    requireText(site, ["title", "welcomeHeading", "welcomeText"], "site");
    requireText(site.disclaimer, ["footer", "tagline"], "site.disclaimer");
    requireText(site.links, ["github", "substack"], "site.links");
    for (const href of Object.values(site.links)) {
        if (new URL(href).protocol !== "https:") throw new Error(`site.links: expected HTTPS URL: ${href}`);
    }
    if (!Array.isArray(site.sections) || !site.sections.length) throw new Error("site: missing sections");
    const sections = new Set();
    for (const section of site.sections) {
        requireText(section, ["id", "title"], "section");
        if (sections.has(section.id)) throw new Error(`Duplicate section ${section.id}`);
        sections.add(section.id);
    }
    if (!Array.isArray(registry.collections) || !registry.collections.length) throw new Error("Missing collections");
    const articles = new Map();
    const directories = new Set();
    const collections = [];
    for (const collection of registry.collections) {
        requireText(collection, ["dir", "title", "description", "section", "audience"], "collection");
        requireSegment(collection.dir, "collection.dir");
        if (directories.has(collection.dir)) throw new Error(`Duplicate collection ${collection.dir}`);
        directories.add(collection.dir);
        if (!sections.has(collection.section)) throw new Error(`Unknown section ${collection.section}`);
        if (!Array.isArray(collection.articles)) throw new Error(`${collection.dir}: missing articles array`);
        const col = { ...collection, url: `${basePath}${collection.dir}/`, articles: [] };
        collections.push(col);
        for (const card of collection.articles) {
            requireText(card, ["slug", "title", "description", "category"], collection.dir);
            requireSegment(card.slug, "article.slug");
            if (articles.has(card.slug)) throw new Error(`Duplicate article slug ${card.slug}`);
            const source = `${col.dir}/${card.slug}.md`;
            const { data, body } = parseArticle(await readFile(path.join(sourceRoot, "docs", source), "utf8"), source);
            if (data.slug !== card.slug) throw new Error(`${source}: frontmatter slug differs from registry`);
            const flags = data.disclaimers || [];
            const legal = flags.includes("legal-compliance") || flags.includes("not-legal-advice");
            if (col.dir === "cloud" && /privacy act|sovereignty|legal|law|compliance|cloud act/i.test(body) &&
                (!flags.includes("legal-compliance") || !flags.includes("not-legal-advice"))) {
                throw new Error(`${source}: legal content requires both disclaimer flags`);
            }
            const rendered = renderArticle(body, data.title);
            const article = {
                ...data, ...rendered, source, legal, card,
                type: "article", url: `${basePath}${col.dir}/${card.slug}/`,
                output: `${col.dir}/${card.slug}/index.html`,
                collection: { title: col.title, subtitle: col.subtitle, url: col.url }
            };
            articles.set(card.slug, article);
            col.articles.push({ ...card, url: article.url });
        }
    }
    for (const [key, slug] of Object.entries(aliases)) {
        if (!/^[a-z0-9-]+\/[a-z0-9-]+$/.test(key) || !articles.has(slug) ||
            [...articles.values()].some(article => article.source === `${key}.md`)) {
            throw new Error(`Invalid legacy article mapping ${key}: ${slug}`);
        }
    }
    for (const article of articles.values()) {
        article.body = rewriteArticleLinks(article.body, article.source, articles, aliases);
        article.related = article.related.map(link => {
            if (!link.startsWith("/") || !articles.has(link.slice(1))) {
                throw new Error(`${article.source}: unknown related article ${link}`);
            }
            const target = articles.get(link.slice(1));
            return { ...target.card, url: target.url };
        });
    }
    const pages = [
        { type: "home", output: "index.html", title: site.title, description: site.welcomeText,
            sections: site.sections.map(section => ({
                ...section, collections: collections.filter(col => col.section === section.id)
            })) },
        ...collections.map(collection => ({
            ...collection, type: "collection", output: `${collection.dir}/index.html`,
            groups: [...new Set(collection.articles.map(a => a.category))].map(category => ({
                category, articles: collection.articles.filter(a => a.category === category)
            }))
        })),
        ...articles.values()
    ];
    const routes = Object.fromEntries([...articles.values()].map(article => [
        article.source.slice(0, -3), article.url
    ]));
    for (const [key, slug] of Object.entries(aliases)) routes[key] = articles.get(slug).url;
    pages.push(
        { type: "legacy", output: "article.html", title: "Article moved", description: "Find the current article.", routes },
        { type: "legacy", output: "collection.html", title: "Collection moved", description: "Find the current collection.",
            routes: Object.fromEntries(collections.map(col => [col.dir, col.url])) }
    );
    return { site, pages, basePath, legalDisclaimer };
}

async function filesUnder(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const result = await Promise.all(entries.map(entry => {
        const filename = path.join(directory, entry.name);
        return entry.isDirectory() ? filesUnder(filename) : filename;
    }));
    return result.flat();
}

export async function validateGeneratedSite(output = "_site") {
    const directory = path.resolve(output);
    const files = await filesUnder(directory);
    const pages = new Map();
    for (const filename of files.filter(file => file.endsWith(".html"))) {
        const $ = load(await readFile(filename, "utf8"));
        const ids = new Set();
        $("[id]").each((_, element) => {
            const id = $(element).attr("id");
            if (ids.has(id)) throw new Error(`${filename}: duplicate id ${id}`);
            ids.add(id);
        });
        if (!$("title").text().trim() || !$("main").text().trim() || !$("footer #footer-disclaimer").text().trim()) {
            throw new Error(`${filename}: missing title, content or footer disclaimer`);
        }
        pages.set(filename, { $, ids });
    }
    for (const [filename, { $ }] of pages) {
        const relative = path.relative(directory, filename).split(path.sep).join("/");
        const pageUrl = new URL(`${basePath}${relative}`, "https://site.invalid");
        for (const element of $("a[href],img[src],link[href],script[src]").toArray()) {
            const href = $(element).attr(element.tagName === "img" || element.tagName === "script" ? "src" : "href");
            const target = new URL(href, pageUrl);
            if (target.origin !== pageUrl.origin) continue;
            const pathname = decodeURIComponent(target.pathname);
            if (!pathname.startsWith(basePath)) throw new Error(`${relative}: link escapes site base path: ${href}`);
            const local = pathname.slice(basePath.length);
            const targetFile = path.resolve(directory, !local || local.endsWith("/") ? `${local}index.html` : local);
            if (!targetFile.startsWith(`${directory}${path.sep}`)) throw new Error(`${relative}: invalid path ${href}`);
            await stat(targetFile).catch(error => {
                throw new Error(`${relative}: missing link target ${href}`, { cause: error });
            });
            if (target.hash && pages.has(targetFile) && !pages.get(targetFile).ids.has(decodeURIComponent(target.hash.slice(1)))) {
                throw new Error(`${relative}: missing fragment target ${href}`);
            }
        }
    }
    console.log(`Checked ${pages.size} generated pages and their local links.`);
}
