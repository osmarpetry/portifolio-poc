const fs = require("fs");
const path = require("path");

const GENERATED_PROJECT_PLACEHOLDER_SLUGS = new Set([
  "bater-horas2",
  "horas",
  "infractions-hawaii",
  "forum",
  "forum-springbootadmin",
  "quizzler-flutter",
  "corebase-codeassment",
  "custom-mui-drawer",
  "docker-react",
  "hello-go",
  "nvim-configuration",
  "obisdian",
  "osmarpetry-me",
  "personal-blog-gatsby-trash",
  "pirataflix",
  "pirataflix2",
  "portifolio",
  "react-hook-ts-poc",
  "react-performance-tips",
  "ritchie-workshop",
  "simple-next",
  "storybook-class",
  "tcc-catolica",
  "tech-assessment-fe",
  "teste",
  "themis",
  "todo",
  "twitter-bot",
  "xalgo",
  "yan-template",
]);

function toSourceFilePath(publicPath) {
  if (!publicPath || !publicPath.startsWith("/")) {
    return null;
  }

  return path.join(process.cwd(), "src", publicPath.slice(1));
}

function publicAssetExists(publicPath) {
  const sourceFilePath = toSourceFilePath(publicPath);

  return Boolean(sourceFilePath) && fs.existsSync(sourceFilePath);
}

function placeholderMarkerExists(publicPath) {
  const sourceFilePath = toSourceFilePath(publicPath);

  if (!sourceFilePath) {
    return false;
  }

  return fs.existsSync(path.join(path.dirname(sourceFilePath), "cover.placeholder"));
}

function resolveImage({ preferredPublicPath, fallbackImage, alt }) {
  if (preferredPublicPath && publicAssetExists(preferredPublicPath)) {
    return {
      src: preferredPublicPath,
      alt: alt || fallbackImage?.alt || "Project screenshot.",
    };
  }

  return fallbackImage;
}

function getProjectScreenshotPublicPath(projectSlug) {
  return `/assets/images/screenshots/projects/${projectSlug}/cover.png`;
}

function getProjectCuratedImageCandidates(projectSlug) {
  return [
    `/assets/images/projects/${projectSlug}/cover.jpg`,
    `/assets/images/projects/${projectSlug}/cover.png`,
  ];
}

function getProjectRealImagePublicPath(projectSlug) {
  for (const candidate of getProjectCuratedImageCandidates(projectSlug)) {
    if (publicAssetExists(candidate)) {
      return candidate;
    }
  }

  const screenshotPath = getProjectScreenshotPublicPath(projectSlug);
  const isGeneratedPlaceholder =
    GENERATED_PROJECT_PLACEHOLDER_SLUGS.has(projectSlug) || placeholderMarkerExists(screenshotPath);

  if (!isGeneratedPlaceholder && publicAssetExists(screenshotPath)) {
    return screenshotPath;
  }

  return null;
}

function getCompanyProjectScreenshotPublicPath(companySlug, projectSlug) {
  return `/assets/images/screenshots/companies/${companySlug}/${projectSlug}/cover.png`;
}

function getPublicWebsiteLink(links = []) {
  return links.find((link) => {
    if (!link?.url || !/^https?:/i.test(link.url)) {
      return false;
    }

    return !/github\.com/i.test(link.url);
  });
}

function normalizeLinks(links = []) {
  const validLinks = links.filter((link) => link?.url && /^https?:/i.test(link.url));

  return validLinks.length ? validLinks : undefined;
}

module.exports = {
  getCompanyProjectScreenshotPublicPath,
  getProjectCuratedImageCandidates,
  getProjectRealImagePublicPath,
  getProjectScreenshotPublicPath,
  getPublicWebsiteLink,
  normalizeLinks,
  placeholderMarkerExists,
  publicAssetExists,
  resolveImage,
};
