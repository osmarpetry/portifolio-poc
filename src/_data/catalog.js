/**
 * catalog.js — derived lookups built from repoInventory, showcaseEntries, and companies.
 *
 * Exposed as `catalog` in Nunjucks templates.
 *
 * Properties:
 *   reposByTier       — { "1": [...], "2": [...], "3": [...] }
 *   tier1Repos        — flat array of Tier 1 repos
 *   tier2Repos        — flat array of Tier 2 repos
 *   tier3Repos        — flat array of Tier 3 repos
 *   entriesByTier     — { "1": [...], "2": [...], "3": [...] }
 *   tier1Entries      — flat array of Tier 1 showcase entries
 *   tier2Entries      — flat array of Tier 2 showcase entries
 *   tier3Entries      — flat array of Tier 3 showcase entries
 *   repoToEntry       — { repoSlug: entryId } lookup map
 *   companiesBySlug   — { slug: company } lookup map
 *   tierDescriptions  — human-readable tier labels and descriptions
 */

const repoInventory = require("./repoInventory");
const showcaseEntries = require("./showcaseEntries");
const companies = require("./companies");

// ─── Repos by tier ─────────────────────────────────────────────────────────
const reposByTier = { "1": [], "2": [], "3": [] };
for (const repo of repoInventory) {
  const key = String(repo.tier);
  if (reposByTier[key]) {
    reposByTier[key].push(repo);
  }
}

// ─── Showcase entries by tier ───────────────────────────────────────────────
const entriesByTier = { "1": [], "2": [], "3": [] };
for (const entry of showcaseEntries) {
  const key = String(entry.tier);
  if (entriesByTier[key]) {
    entriesByTier[key].push(entry);
  }
}

// ─── Repo → entry lookup ────────────────────────────────────────────────────
const repoToEntry = {};
for (const repo of repoInventory) {
  repoToEntry[repo.repo] = repo.entryId;
}

// ─── Companies by slug ───────────────────────────────────────────────────────
const companiesBySlug = {};
for (const company of companies) {
  companiesBySlug[company.slug] = company;
}

// ─── Tier metadata ───────────────────────────────────────────────────────────
const tierDescriptions = {
  "1": {
    label: "Tier 1",
    shortLabel: "T1",
    title: "Strongest work",
    description:
      "The first projects someone should read to understand the strongest frontend, product, and implementation work in the portfolio.",
    meaning:
      "Lead selection. These projects best represent current quality, depth, and judgment.",
    path: "/projects/#tier-1",
    ctaLabel: "Open Tier 1",
  },
  "2": {
    label: "Tier 2",
    shortLabel: "T2",
    title: "Context and range",
    description:
      "Solid supporting work that adds range, context, and breadth, but should be read after Tier 1.",
    meaning:
      "Supporting selection. Useful for range and context, but not the lead read.",
    path: "/projects/#tier-2",
    ctaLabel: "Open Tier 2",
  },
  "3": {
    label: "Tier 3",
    shortLabel: "T3",
    title: "Archive",
    description:
      "Historical repos, experiments, and older work kept visible for completeness without carrying the main narrative.",
    meaning:
      "Archive. Visible on purpose, but not prioritized in the reading order.",
    path: "/projects/#tier-3",
    ctaLabel: "Open Tier 3",
  },
};

const homeTier1PreviewEntries = entriesByTier["1"].slice(0, 4);

const homeCompanyHighlightOrder = ["attend", "consulting", "x-team", "luizalabs"];

const homeCompanyProjects = homeCompanyHighlightOrder
  .map((slug) => companiesBySlug[slug])
  .filter(Boolean)
  .map((company) => {
    const project = company.projects[0];

    if (!project) {
      return null;
    }

    return {
      ...project,
      type: company.name,
      links: [
        ...(project.links || []),
        { label: "All company work", url: `/companies/#company-${company.slug}` },
      ],
      companySlug: company.slug,
      companyName: company.name,
    };
  })
  .filter(Boolean);

module.exports = {
  reposByTier,
  tier1Repos: reposByTier["1"],
  tier2Repos: reposByTier["2"],
  tier3Repos: reposByTier["3"],
  allReposCount: reposByTier["1"].length + reposByTier["2"].length + reposByTier["3"].length,
  entriesByTier,
  tier1Entries: entriesByTier["1"],
  tier2Entries: entriesByTier["2"],
  tier3Entries: entriesByTier["3"],
  homeTier1PreviewEntries,
  repoToEntry,
  companiesBySlug,
  homeCompanyProjects,
  tierDescriptions,
};
