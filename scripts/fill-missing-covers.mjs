import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const showcaseEntries = require("../src/_data/showcaseEntries.js");
const companies = require("../src/_data/companies.js");
const {
  getCompanyProjectScreenshotPublicPath,
  getProjectScreenshotPublicPath,
  publicAssetExists,
} = require("../src/_data/helpers/media.js");

const WIDTH = 1600;
const HEIGHT = 1000;
const palette = [
  { background: "#F7F4ED", foreground: "#171717", accent: "#D94141" },
  { background: "#DCE8FF", foreground: "#171717", accent: "#1D4ED8" },
  { background: "#F6D7D7", foreground: "#171717", accent: "#A61B1B" },
];

function toSourcePath(publicPath) {
  return path.join(process.cwd(), "src", publicPath.slice(1));
}

function xmlEscape(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapText(input, limit = 18) {
  const words = input.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;

    if (next.length <= limit) {
      current = next;
      continue;
    }

    if (current) {
      lines.push(current);
    }

    current = word;
  }

  if (current) {
    lines.push(current);
  }

  return lines.slice(0, 3);
}

function hasCustomImage(images = []) {
  return images.some((image) => {
    if (!image?.src) {
      return false;
    }

    if (/\/shared\/.*placeholder/i.test(image.src)) {
      return false;
    }

    return publicAssetExists(image.src);
  });
}

function buildTargets() {
  const projectTargets = showcaseEntries
    .filter((entry) => !hasCustomImage(entry.images || []))
    .map((entry) => ({
      publicPath: getProjectScreenshotPublicPath(entry.slug),
      title: entry.title,
      eyebrow: `Tier ${entry.tier || "Project"}`,
    }));

  const companyTargets = companies
    .flatMap((company) =>
      company.projects
        .filter((project) => !hasCustomImage(project.images || []))
        .map((project) => ({
          publicPath: getCompanyProjectScreenshotPublicPath(company.slug, project.slug),
          title: project.title,
          eyebrow: company.name,
        }))
    );

  return [...projectTargets, ...companyTargets];
}

async function generatePlaceholder(target, index) {
  const variant = palette[index % palette.length];
  const outputPath = toSourcePath(target.publicPath);
  const markerPath = path.join(path.dirname(outputPath), "cover.placeholder");

  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const lines = wrapText(target.title);
  const textSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <rect x="64" y="64" width="${WIDTH - 128}" height="${HEIGHT - 128}" rx="32" fill="none" stroke="${variant.foreground}" stroke-opacity="0.18" stroke-width="2" />
      <rect x="92" y="96" width="220" height="42" rx="21" fill="${variant.foreground}" />
      <text x="202" y="123" text-anchor="middle" fill="${variant.background}" font-family="Arial, sans-serif" font-size="18" font-weight="700">${xmlEscape(target.eyebrow)}</text>
      <circle cx="${WIDTH - 196}" cy="164" r="64" fill="${variant.accent}" fill-opacity="0.12" />
      <circle cx="${WIDTH - 128}" cy="228" r="96" fill="${variant.accent}" fill-opacity="0.08" />
      ${lines
        .map(
          (line, lineIndex) => `
      <text x="96" y="${HEIGHT / 2 + lineIndex * 74 - 40}" fill="${variant.foreground}" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="700">${xmlEscape(line)}</text>`
        )
        .join("")}
      <text x="96" y="${HEIGHT - 128}" fill="${variant.foreground}" fill-opacity="0.72" font-family="Arial, sans-serif" font-size="28">Placeholder cover.png</text>
    </svg>
  `;

  await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
      background: variant.background,
    },
  })
    .composite([{ input: Buffer.from(textSvg), top: 0, left: 0 }])
    .png()
    .toFile(outputPath);

  await fs.writeFile(markerPath, "generated placeholder\n");
}

async function run() {
  const targets = buildTargets().filter((target) => !publicAssetExists(target.publicPath));

  if (!targets.length) {
    console.log("No missing covers found.");
    return;
  }

  for (const [index, target] of targets.entries()) {
    await generatePlaceholder(target, index);
    console.log(`Created ${target.publicPath}`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
