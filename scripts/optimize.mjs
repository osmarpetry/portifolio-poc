/**
 * Post-build optimization script for production.
 *
 * Runs after Eleventy generates _site/ and handles:
 *  1. CSS minification   – LightningCSS (same engine Vite uses internally)
 *  2. JS  minification   – Terser
 *  3. Image optimisation  – Sharp (compress originals + generate WebP copies)
 *
 * HTML minification is handled by the Eleventy transform in .eleventy.js.
 *
 * Usage:  node scripts/optimize.mjs
 */

import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, extname, relative } from "node:path";
import { transform } from "lightningcss";
import { minify } from "terser";
import sharp from "sharp";

const SITE_DIR = "_site";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Recursively collect every file under `dir` matching `extensions`. */
async function walk(dir, extensions) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      const nested = await walk(fullPath, extensions);
      results.push(...nested);
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      results.push(fullPath);
    }
  }

  return results;
}

function prettyBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

// ---------------------------------------------------------------------------
// 1. CSS minification
// ---------------------------------------------------------------------------

async function minifyCss() {
  const files = await walk(SITE_DIR, [".css"]);

  if (files.length === 0) {
    console.log("  [css] No CSS files found – skipping.");
    return;
  }

  for (const file of files) {
    const raw = await readFile(file);
    const before = raw.length;

    const { code } = transform({
      filename: file,
      code: raw,
      minify: true,
      sourceMap: false,
    });

    await writeFile(file, code);
    const after = code.length;
    const saved = ((1 - after / before) * 100).toFixed(1);
    console.log(
      `  [css] ${relative(SITE_DIR, file)}  ${prettyBytes(before)} → ${prettyBytes(after)}  (−${saved}%)`,
    );
  }
}

// ---------------------------------------------------------------------------
// 2. JS minification
// ---------------------------------------------------------------------------

async function minifyJs() {
  const files = await walk(SITE_DIR, [".js"]);

  if (files.length === 0) {
    console.log("  [js]  No JS files found – skipping.");
    return;
  }

  for (const file of files) {
    const raw = await readFile(file, "utf-8");
    const before = Buffer.byteLength(raw);

    const result = await minify(raw, {
      compress: { passes: 2 },
      mangle: true,
      format: { comments: false },
    });

    const minified = result.code ?? raw;
    await writeFile(file, minified);
    const after = Buffer.byteLength(minified);
    const saved = ((1 - after / before) * 100).toFixed(1);
    console.log(
      `  [js]  ${relative(SITE_DIR, file)}  ${prettyBytes(before)} → ${prettyBytes(after)}  (−${saved}%)`,
    );
  }
}

// ---------------------------------------------------------------------------
// 3. Image optimisation
// ---------------------------------------------------------------------------

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png"];
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 80;
const WEBP_QUALITY = 78;

async function optimizeImages() {
  const files = await walk(SITE_DIR, IMAGE_EXTENSIONS);

  if (files.length === 0) {
    console.log("  [img] No images found – skipping.");
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const relativePath = relative(SITE_DIR, file).replace(/\\/g, "/");

    if (relativePath.startsWith("assets/img/")) {
      continue;
    }

    const raw = await readFile(file);
    const before = raw.length;
    totalBefore += before;

    const ext = extname(file).toLowerCase();
    const image = sharp(raw);
    const metadata = await image.metadata();

    // Resize if wider than MAX_WIDTH (keeps aspect ratio)
    const pipeline =
      metadata.width && metadata.width > MAX_WIDTH
        ? image.resize({ width: MAX_WIDTH, withoutEnlargement: true })
        : image;

    // Compress the original format
    let optimised;
    if (ext === ".png") {
      optimised = await pipeline.png({ quality: 80, effort: 10 }).toBuffer();
    } else {
      optimised = await pipeline
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toBuffer();
    }

    await writeFile(file, optimised);
    totalAfter += optimised.length;

    // Generate a WebP copy alongside the original
    const webpPath = file.replace(/\.(jpe?g|png)$/i, ".webp");
    const webpBuf = await sharp(optimised)
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toBuffer();

    await writeFile(webpPath, webpBuf);

    const saved = ((1 - optimised.length / before) * 100).toFixed(1);
    console.log(
      `  [img] ${relativePath}  ${prettyBytes(before)} → ${prettyBytes(optimised.length)}  (−${saved}%)  + WebP ${prettyBytes(webpBuf.length)}`,
    );
  }

  const totalSaved = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
  console.log(
    `  [img] Total: ${prettyBytes(totalBefore)} → ${prettyBytes(totalAfter)}  (−${totalSaved}%)`,
  );
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

console.log("\n🚀 Post-build optimisation\n");

const start = performance.now();

await minifyCss();
await minifyJs();
await optimizeImages();

const elapsed = ((performance.now() - start) / 1000).toFixed(2);
console.log(`\n✅ Done in ${elapsed}s\n`);
