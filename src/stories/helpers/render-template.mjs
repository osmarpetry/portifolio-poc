import nunjucks from "nunjucks";
import {
  catalog,
  companies,
  contactProject,
  site,
  strengths,
} from "./story-data.mjs";

const templateModules = import.meta.glob("../../_includes/**/*.njk", {
  eager: true,
  query: "?raw",
  import: "default",
});

const templateMap = Object.fromEntries(
  Object.entries(templateModules).map(([modulePath, source]) => [
    modulePath.split("/_includes/")[1],
    source,
  ])
);

class StoryTemplateLoader extends nunjucks.Loader {
  getSource(name) {
    const source = templateMap[name];

    if (!source) {
      return null;
    }

    return {
      src: source,
      path: name,
      noCache: true,
    };
  }
}

const env = new nunjucks.Environment(new StoryTemplateLoader(), {
  autoescape: false,
});

export { site, companies, catalog, strengths, contactProject };

export function renderTemplate(template, context = {}) {
  return env.render(template, context);
}
