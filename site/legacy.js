const params = new URLSearchParams(window.location.search);
const dir = params.get("dir");
const doc = params.get("doc");
const key = window.location.pathname.endsWith("/article.html") ? `${dir}/${doc}` : dir;
const link = [...document.querySelectorAll("[data-legacy-key]")].find(element => element.dataset.legacyKey === key);

if (link) {
    const target = new URL(link.href);
    params.delete("dir");
    params.delete("doc");
    target.search = params.toString();
    target.hash = window.location.hash;
    window.location.replace(target.href);
} else {
    document.getElementById("route-status").textContent =
        "This bookmark does not match a published page. Choose a current page below.";
}
