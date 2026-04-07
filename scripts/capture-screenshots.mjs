import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);
const showcaseEntries = require("../src/_data/showcaseEntries.js");
const companies = require("../src/_data/companies.js");
const {
  getCompanyProjectScreenshotPublicPath,
  getProjectScreenshotPublicPath,
  getPublicWebsiteLink,
} = require("../src/_data/helpers/media.js");

const args = new Set(process.argv.slice(2));
const captureProjects = args.has("--projects") || args.has("--all") || process.argv.length === 2;
const captureCompanies = args.has("--companies") || args.has("--all") || process.argv.length === 2;

function toSourcePath(publicPath) {
  return path.join(process.cwd(), "src", publicPath.slice(1));
}

function projectTargets() {
  return showcaseEntries
    .map((entry) => {
      const link = getPublicWebsiteLink(entry.links);

      if (!link) {
        return null;
      }

      return {
        kind: "project",
        slug: entry.slug,
        title: entry.title,
        url: link.url,
        outputPath: toSourcePath(getProjectScreenshotPublicPath(entry.slug)),
      };
    })
    .filter(Boolean);
}

function companyTargets() {
  return companies
    .flatMap((company) =>
      company.projects.map((project) => {
        const link = getPublicWebsiteLink(project.links || []);

        if (!link) {
          return null;
        }

        return {
          kind: "company",
          companySlug: company.slug,
          slug: project.slug,
          title: `${company.name} — ${project.title}`,
          url: link.url,
          outputPath: toSourcePath(
            getCompanyProjectScreenshotPublicPath(company.slug, project.slug)
          ),
        };
      })
    )
    .filter(Boolean);
}

async function ensureParentDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function clickIfVisible(page, selector, options = {}) {
  const locator = page.locator(selector).first();

  if (!(await locator.count())) {
    return false;
  }

  if (!(await locator.isVisible().catch(() => false))) {
    return false;
  }

  await locator.click(options).catch(() => {});
  return true;
}

async function clickRoleButton(page, name) {
  const locator = page.getByRole("button", { name }).first();

  if (!(await locator.count())) {
    return false;
  }

  if (!(await locator.isVisible().catch(() => false))) {
    return false;
  }

  await locator.click().catch(() => {});
  return true;
}

async function dismissKnownOverlays(page, target) {
  const url = target.url.toLowerCase();

  if (url.includes("bodi.com") || url.includes("beachbodyondemand.com")) {
    await clickRoleButton(page, /no thanks/i);
    await clickRoleButton(page, /reject non-essential/i);
    await clickRoleButton(page, /reject/i);
    await clickRoleButton(page, /decline/i);
    await clickRoleButton(page, /accept all/i);
    await clickRoleButton(page, /manage preferences/i);
    await clickIfVisible(page, '[aria-label="Close"], [aria-label="close"]');
  }

  if (url.includes("lemonlight.com")) {
    await page.waitForTimeout(20000);
    await clickRoleButton(page, /allow/i);
    await clickRoleButton(page, /reject/i);
    await clickRoleButton(page, /decline/i);
    await clickRoleButton(page, /cookie settings/i);
    await clickRoleButton(page, /transparency page/i);
    await clickRoleButton(page, /accept all/i);
    await clickRoleButton(page, /allow all/i);
    await clickRoleButton(page, /only necessary/i);
    await clickIfVisible(page, "#onetrust-reject-all-handler");
    await clickIfVisible(page, "#onetrust-accept-btn-handler");
    await clickIfVisible(page, 'button:has-text("Reject")');
    await clickIfVisible(page, 'button:has-text("Allow")');
    await clickRoleButton(page, /close/i);
    await clickIfVisible(page, '[aria-label="Close"], [aria-label="close"]');
  }

  if (url.includes("x-team.com")) {
    await clickRoleButton(page, /decline/i);
    await clickRoleButton(page, /reject/i);
    await clickRoleButton(page, /accept/i);
    await clickIfVisible(page, '[aria-label="Close"], [aria-label="close"]');
  }

  await page
    .evaluate(() => {
      const selectors = [
        "#onetrust-banner-sdk",
        ".onetrust-pc-dark-filter",
        ".onetrust-pc-sdk",
        ".onetrust-close-btn-container",
        ".ot-sdk-container",
        ".cky-consent-container",
        ".cky-modal",
        '[id*="cookie"]',
        '[class*="cookie-banner"]',
        '[class*="cookieBanner"]',
        '[class*="CookieBanner"]',
        '[class*="consent-banner"]',
        '[class*="ConsentBanner"]',
        '[class*="privacy-banner"]',
        '[class*="modal-backdrop"]',
        '[class*="Modal_backdrop"]',
        '[data-testid*="cookie"]',
      ];

      for (const selector of selectors) {
        for (const node of document.querySelectorAll(selector)) {
          node.remove();
        }
      }

      for (const node of document.body.querySelectorAll("*")) {
        const style = window.getComputedStyle(node);
        const isOverlay =
          (style.position === "fixed" || style.position === "sticky") &&
          Number.parseInt(style.zIndex || "0", 10) >= 1000;

        if (!isOverlay) {
          continue;
        }

        const text = (node.textContent || "").toLowerCase();
        if (
          text.includes("cookie") ||
          text.includes("consent") ||
          text.includes("shipping country") ||
          text.includes("privacy")
        ) {
          node.remove();
        }
      }

      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    })
    .catch(() => {});
}

async function capturePage(context, target) {
  const page = await context.newPage();

  await page.goto(target.url, {
    waitUntil: "load",
    timeout: 45000,
  });

  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await dismissKnownOverlays(page, target);
  await page.waitForTimeout(1500);
  await ensureParentDir(target.outputPath);
  await page.screenshot({
    path: target.outputPath,
    fullPage: false,
  });
  await page.close();
}

async function run() {
  const targets = [
    ...(captureProjects ? projectTargets() : []),
    ...(captureCompanies ? companyTargets() : []),
  ];

  if (!targets.length) {
    console.log("No capture targets found.");
    return;
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 960 },
    deviceScaleFactor: 1,
    ignoreHTTPSErrors: true,
  });
  const report = [];

  for (const target of targets) {
    try {
      console.log(`Capturing ${target.kind}: ${target.title} -> ${target.url}`);
      await capturePage(context, target);
      report.push({ ...target, status: "captured" });
    } catch (error) {
      console.error(`Failed ${target.title}: ${error.message}`);
      report.push({ ...target, status: "failed", error: error.message });
    }
  }

  await browser.close();

  const reportPath = path.join(
    process.cwd(),
    "src/assets/images/screenshots/report.json"
  );
  await ensureParentDir(reportPath);
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
  console.log(`Saved report to ${reportPath}`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
