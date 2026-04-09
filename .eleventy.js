const path = require("node:path");
const { mkdir, stat, writeFile } = require("node:fs/promises");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const sharp = require("sharp");

const contactProject = require("./src/_data/contact-project");

const isProduction = process.env.NODE_ENV === "production";
const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, "src");
const siteOutputRoot = path.join(projectRoot, "_site");
const responsiveSourcePrefix = "/assets/images/";
const responsiveOutputPrefix = "/assets/img";
const supportedResponsiveExtensions = new Set([".jpg", ".jpeg", ".png"]);
const jpegQuality = 80;
const pngQuality = 80;
const pngEffort = 10;
const webpQuality = 76;
const responsiveImageCache = new Map();
const markdownLinkPattern = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
const readableDateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

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

function formatDateISO(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}

function formatReadableDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return readableDateFormatter.format(date);
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function serializeAttributes(attributes) {
  return Object.entries(attributes)
    .filter(([key, value]) => {
      if (value === undefined || value === null || value === false) {
        return false;
      }

      if (value === "" && key !== "alt") {
        return false;
      }

      return true;
    })
    .map(([key, value]) => {
      if (value === true) {
        return ` ${key}`;
      }

      return ` ${key}="${escapeAttribute(value)}"`;
    })
    .join("");
}

function renderPlainImage(src, alt, sizes, options = {}) {
  const imgHtml = `<img${serializeAttributes({
    src,
    alt: alt ?? "",
    sizes,
    loading: options.loading,
    fetchpriority: options.fetchpriority,
    decoding: options.decoding ?? "async",
    class: options.imgClassName,
    width: options.width,
    height: options.height,
  })}>`;

  if (!options.wrapperTag) {
    return imgHtml;
  }

  return `<${options.wrapperTag}${serializeAttributes({ class: options.className })}>${imgHtml}</${options.wrapperTag}>`;
}

function isResponsiveLocalAsset(src) {
  return typeof src === "string" && src.startsWith(responsiveSourcePrefix);
}

function toSourceFilePath(publicPath) {
  return path.join(sourceRoot, publicPath.replace(/^\//, ""));
}

function getMimeType(extension) {
  if (extension === ".png") {
    return "image/png";
  }

  return "image/jpeg";
}

function getVariantDirectories(publicPath) {
  const assetPath = publicPath.replace(/^\/assets\//, "");
  const parsed = path.posix.parse(assetPath);
  const publicDir = `${responsiveOutputPrefix}/${parsed.dir}/${parsed.name}`;
  const outputDir = path.join(
    siteOutputRoot,
    "assets",
    "img",
    ...parsed.dir.split("/").filter(Boolean),
    parsed.name,
  );

  return {
    publicDir,
    outputDir,
    extension: parsed.ext.toLowerCase(),
  };
}

function getResponsiveWidths(sourceWidth, requestedWidths = []) {
  const safeWidths = Array.isArray(requestedWidths) ? requestedWidths : [];

  if (safeWidths.length === 0) {
    return [sourceWidth];
  }

  const normalizedWidths = safeWidths
    .map((width) => Number(width))
    .filter((width) => Number.isFinite(width) && width > 0)
    .map((width) => Math.round(width))
    .map((width) => Math.min(width, sourceWidth));

  return Array.from(new Set(normalizedWidths)).sort((left, right) => left - right);
}

async function createFallbackBuffer(sourcePath, extension, width) {
  const pipeline = sharp(sourcePath).resize({ width, withoutEnlargement: true });

  if (extension === ".png") {
    return pipeline.png({ quality: pngQuality, effort: pngEffort }).toBuffer();
  }

  return pipeline.jpeg({ quality: jpegQuality, mozjpeg: true }).toBuffer();
}

async function createWebpBuffer(sourcePath, width) {
  return sharp(sourcePath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: webpQuality, effort: 6 })
    .toBuffer();
}

async function ensureResponsiveImageVariants(publicPath, requestedWidths = []) {
  const sourcePath = toSourceFilePath(publicPath);

  let sourceStat;
  try {
    sourceStat = await stat(sourcePath);
  } catch {
    throw new Error(`Responsive image source not found: ${publicPath}`);
  }

  const { publicDir, outputDir, extension } = getVariantDirectories(publicPath);

  if (!supportedResponsiveExtensions.has(extension)) {
    return null;
  }

  const cacheKey = [sourcePath, sourceStat.mtimeMs, requestedWidths.join(",")].join("|");

  if (!responsiveImageCache.has(cacheKey)) {
    responsiveImageCache.set(
      cacheKey,
      (async () => {
        const metadata = await sharp(sourcePath).metadata();

        if (!metadata.width || !metadata.height) {
          throw new Error(`Responsive image metadata unavailable: ${publicPath}`);
        }

        const widths = getResponsiveWidths(metadata.width, requestedWidths);
        await mkdir(outputDir, { recursive: true });

        const variants = [];

        for (const width of widths) {
          const fallbackPublicPath = `${publicDir}/${width}w${extension}`;
          const webpPublicPath = `${publicDir}/${width}w.webp`;
          const fallbackOutputPath = path.join(outputDir, `${width}w${extension}`);
          const webpOutputPath = path.join(outputDir, `${width}w.webp`);
          const height = Math.round((metadata.height * width) / metadata.width);
          const [fallbackBuffer, webpBuffer] = await Promise.all([
            createFallbackBuffer(sourcePath, extension, width),
            createWebpBuffer(sourcePath, width),
          ]);

          await Promise.all([
            writeFile(fallbackOutputPath, fallbackBuffer),
            writeFile(webpOutputPath, webpBuffer),
          ]);

          variants.push({
            width,
            height,
            fallbackPublicPath,
            webpPublicPath,
          });
        }

        const largestVariant = variants[variants.length - 1];

        return {
          width: metadata.width,
          height: metadata.height,
          mimeType: getMimeType(extension),
          fallbackSrc: largestVariant.fallbackPublicPath,
          fallbackSrcset: variants
            .map((variant) => `${variant.fallbackPublicPath} ${variant.width}w`)
            .join(", "),
          webpSrcset: variants
            .map((variant) => `${variant.webpPublicPath} ${variant.width}w`)
            .join(", "),
        };
      })(),
    );
  }

  return responsiveImageCache.get(cacheKey);
}

function renderResponsivePicture(imageData, alt, sizes, options = {}) {
  const pictureHtml = `<picture${serializeAttributes({
    class: options.wrapperTag ? undefined : options.className,
  })}><source${serializeAttributes({
    type: "image/webp",
    srcset: imageData.webpSrcset,
    sizes,
  })}><img${serializeAttributes({
    src: imageData.fallbackSrc,
    srcset: imageData.fallbackSrcset,
    sizes,
    alt: alt ?? "",
    width: imageData.width,
    height: imageData.height,
    loading: options.loading ?? "lazy",
    fetchpriority: options.fetchpriority,
    decoding: options.decoding ?? "async",
    class: options.imgClassName,
  })}></picture>`;

  if (!options.wrapperTag) {
    return pictureHtml;
  }

  return `<${options.wrapperTag}${serializeAttributes({ class: options.className })}>${pictureHtml}</${options.wrapperTag}>`;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.ignores.add("COMPANY_RESUME_UPDATE_NOTES.md");

  // Legacy global data — kept for backward compat while transitioning
  eleventyConfig.addGlobalData("contactProject", contactProject);
  eleventyConfig.addFilter("normalizeSlug", normalizeRouteSlug);
  eleventyConfig.addFilter("dateISO", formatDateISO);
  eleventyConfig.addFilter("readableDate", formatReadableDate);

  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  md.use(markdownItAnchor, {
    level: [1, 2, 3, 4],
    slugify: (value) => normalizeRouteSlug(value) || "section",
    tabIndex: false,
  });

  const defaultTextRule =
    md.renderer.rules.text ||
    function renderText(tokens, idx) {
      return tokens[idx].content;
    };

  md.renderer.rules.text = function renderWikiLinks(tokens, idx, options, env, renderer) {
    const content = tokens[idx].content;

    if (!content.includes("[[")) {
      return defaultTextRule(tokens, idx, options, env, renderer);
    }

    return content.replace(markdownLinkPattern, (_, rawSlug, label) => {
      const slug = normalizeRouteSlug(rawSlug);
      const text =
        label ||
        rawSlug
          .replace(/[-_]+/g, " ")
          .replace(/\b\w/g, (character) => character.toUpperCase());

      return `<a href="/posts/${slug}/">${escapeAttribute(text)}</a>`;
    });
  };

  const defaultLinkRender =
    md.renderer.rules.link_open ||
    function renderLink(tokens, idx, options, env, renderer) {
      return renderer.renderToken(tokens, idx, options);
    };

  md.renderer.rules.link_open = function renderExternalLinks(tokens, idx, options, env, renderer) {
    const token = tokens[idx];
    const href = token.attrGet("href");

    if (href && /^(https?:)?\/\//i.test(href)) {
      token.attrSet("target", "_blank");
      token.attrSet("rel", "noreferrer");
    }

    return defaultLinkRender(tokens, idx, options, env, renderer);
  };

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addCollection("posts", (collection) =>
    collection
      .getFilteredByGlob("content/posts/*.md")
      .sort((left, right) => new Date(right.date) - new Date(left.date)),
  );

  eleventyConfig.addCollection("postTagList", (collection) => {
    const tagsBySlug = new Map();

    for (const post of collection.getFilteredByGlob("content/posts/*.md")) {
      for (const tag of post.data.tags || []) {
        const slug = normalizeRouteSlug(tag);

        if (slug && !tagsBySlug.has(slug)) {
          tagsBySlug.set(slug, tag);
        }
      }
    }

    return Array.from(tagsBySlug, ([slug, label]) => ({ slug, label })).sort((left, right) =>
      left.label.localeCompare(right.label),
    );
  });

  eleventyConfig.addNunjucksAsyncShortcode(
    "responsiveImage",
    async (src, alt = "", sizes, options = {}) => {
      const normalizedOptions =
        options && typeof options === "object" && !Array.isArray(options) ? options : {};

      if (!src) {
        return "";
      }

      if (!isResponsiveLocalAsset(src)) {
        return renderPlainImage(src, alt, sizes, normalizedOptions);
      }

      const extension = path.extname(src).toLowerCase();

      if (!supportedResponsiveExtensions.has(extension)) {
        return renderPlainImage(src, alt, sizes, normalizedOptions);
      }

      const imageData = await ensureResponsiveImageVariants(src, normalizedOptions.widths);

      if (!imageData) {
        return renderPlainImage(src, alt, sizes, normalizedOptions);
      }

      return renderResponsivePicture(imageData, alt, sizes, normalizedOptions);
    },
  );

  // HTML minification in production
  if (isProduction) {
    const htmlMinifier = require("html-minifier-terser");

    eleventyConfig.addTransform("htmlmin", async (content, outputPath) => {
      if (!outputPath || !outputPath.endsWith(".html")) {
        return content;
      }

      return htmlMinifier.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      });
    });
  }

  return {
    dir: {
      input: ".",
      includes: "src/_includes",
      data: "src/_data",
      output: "_site",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
