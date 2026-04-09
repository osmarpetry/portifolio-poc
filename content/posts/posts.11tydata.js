const path = require("node:path");

function normalizeRouteSlug(value = "") {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s_-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

module.exports = {
  layout: "post.njk",
  showAboutAtPageEnd: false,
  ogType: "article",
  permalink: (data) => {
    const extension = path.extname(data.page.inputPath);
    const fileName = path.basename(data.page.inputPath, extension);
    const slug = normalizeRouteSlug(fileName);

    return `/posts/${slug}/index.html`;
  },
  eleventyComputed: {
    pageTitle: (data) => (data.title ? `${data.title} — Osmar Petry` : "Posts — Osmar Petry"),
    canonicalPath: (data) => data.page?.url,
  },
};
