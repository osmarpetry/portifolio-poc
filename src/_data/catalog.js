const projects = require("./projects");
const companies = require("./companies");
const { getProjectRealImagePublicPath } = require("./helpers/media");

function assertProjectIntegrity(projectsList) {
  const seenSlugs = new Set();
  const seenRepos = new Map();

  for (const project of projectsList) {
    if (!project.slug || typeof project.slug !== "string") {
      throw new Error("Every project requires a non-empty slug.");
    }

    if (seenSlugs.has(project.slug)) {
      throw new Error(`Duplicate project slug found: ${project.slug}`);
    }
    seenSlugs.add(project.slug);

    if (![1, 2, 3].includes(project.tier)) {
      throw new Error(`Invalid tier for ${project.slug}: ${project.tier}`);
    }

    if (!project.title || typeof project.title !== "string") {
      throw new Error(`Project ${project.slug} requires a non-empty title.`);
    }

    if (!project.summary || typeof project.summary !== "string") {
      throw new Error(`Project ${project.slug} requires a non-empty summary.`);
    }

    if (!Array.isArray(project.repos) || !project.repos.length) {
      throw new Error(`Project ${project.slug} requires at least one repo.`);
    }

    if (!Array.isArray(project.links) || !project.links.length) {
      throw new Error(`Project ${project.slug} requires at least one link.`);
    }

    const hasGithub = project.links.some(
      (link) => link?.url && /github\.com/i.test(link.url)
    );

    if (!hasGithub) {
      throw new Error(`Project ${project.slug} requires at least one GitHub link.`);
    }

    for (const repo of project.repos) {
      if (seenRepos.has(repo)) {
        throw new Error(
          `Repo ${repo} is assigned to more than one project: ${seenRepos.get(repo)} and ${project.slug}`
        );
      }

      seenRepos.set(repo, project.slug);
    }
  }
}

function deriveProject(project) {
  const imagePath = getProjectRealImagePublicPath(project.slug);
  const githubLinks = project.links.filter((link) => /github\.com/i.test(link.url));
  const liveLinks = project.links.filter((link) => !/github\.com/i.test(link.url));

  return {
    ...project,
    type: `Tier ${project.tier}`,
    tierLabel: `Tier ${project.tier}`,
    images: imagePath
      ? [
          {
            src: imagePath,
            alt: `Cover image for ${project.title}.`,
          },
        ]
      : [],
    hasImage: Boolean(imagePath),
    githubLinks,
    liveLinks,
  };
}

assertProjectIntegrity(projects);

const derivedProjects = projects.map(deriveProject);

const projectsByTier = { "1": [], "2": [], "3": [] };
const projectsWithImagesByTier = { "1": [], "2": [], "3": [] };
const projectsWithoutImagesByTier = { "1": [], "2": [], "3": [] };
const projectByRepoSlug = {};

for (const project of derivedProjects) {
  const key = String(project.tier);

  projectsByTier[key].push(project);

  if (project.hasImage) {
    projectsWithImagesByTier[key].push(project);
  } else {
    projectsWithoutImagesByTier[key].push(project);
  }

  for (const repo of project.repos) {
    projectByRepoSlug[repo] = project;
  }
}

const companiesBySlug = {};
for (const company of companies) {
  companiesBySlug[company.slug] = company;
}

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

const homeTier1PreviewProjects = projectsWithImagesByTier["1"].slice(0, 4);

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

const orderedTierKeys = ["1", "2", "3"];
const projectsWithImagesOrdered = orderedTierKeys.flatMap((key) => projectsWithImagesByTier[key]);
const projectsWithoutImagesOrdered = orderedTierKeys.flatMap(
  (key) => projectsWithoutImagesByTier[key],
);

module.exports = {
  allReposCount: derivedProjects.reduce((total, project) => total + project.repos.length, 0),
  companiesBySlug,
  homeCompanyProjects,
  homeTier1PreviewProjects,
  projectByRepoSlug,
  projectsWithImagesOrdered,
  projectsWithoutImagesOrdered,
  projectsByTier,
  projectsWithImagesByTier,
  projectsWithoutImagesByTier,
  tier1Projects: projectsByTier["1"],
  tier2Projects: projectsByTier["2"],
  tier3Projects: projectsByTier["3"],
  tierDescriptions,
};
