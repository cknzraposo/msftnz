import { buildContent, validateGeneratedSite } from "./scripts/site-content.mjs";
import { glob } from "node:fs/promises";
import path from "node:path";

export default async function (config) {
    config.addGlobalData("siteData", () => buildContent());
    config.setNunjucksEnvironmentOptions({ autoescape: true });
    config.addPassthroughCopy({ "docs/css": "css", "docs/.nojekyll": ".nojekyll" });
    config.addPassthroughCopy({ "site/static.css": "css/static.css" });
    config.addPassthroughCopy({ "site/legacy.js": "legacy.js" });
    for await (const source of glob("docs/**/*.{png,jpg,jpeg,gif,svg,webp,ico,pdf}")) {
        config.addPassthroughCopy({ [source]: path.relative("docs", source) });
    }
    config.addWatchTarget("docs/collections.json");
    config.addWatchTarget("docs/**/*.md");
    config.addWatchTarget("scripts/site-content.mjs");
    config.addWatchTarget("site/legacy-articles.json");
    config.on("eleventy.after", async ({ dir }) => validateGeneratedSite(dir.output));
    config.setServerOptions({ pathPrefix: "/msftnz/" });
    return {
        dir: { input: "site", output: "_site", includes: "_includes" },
        templateFormats: ["njk"],
        htmlTemplateEngine: "njk"
    };
}
