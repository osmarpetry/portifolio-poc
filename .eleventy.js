const contactProject = require("./src/_data/contact-project");

const isProduction = process.env.NODE_ENV === "production";

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Legacy global data — kept for backward compat while transitioning
  eleventyConfig.addGlobalData("contactProject", contactProject);

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
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
