import { renderTemplate, site } from "../helpers/render-template.mjs";

export default {
  title: "Organisms/Hero Section",
};

export const Default = {
  render: () =>
    renderTemplate("components/organisms/hero-section.njk", {
      site,
    }),
};
