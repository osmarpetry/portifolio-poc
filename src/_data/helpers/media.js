const fs = require("fs");
const path = require("path");

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
  getProjectScreenshotPublicPath,
  getPublicWebsiteLink,
  normalizeLinks,
  publicAssetExists,
  resolveImage,
};
