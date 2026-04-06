import { companies, renderTemplate } from "../helpers/render-template.mjs";

export default {
  title: "Organisms/Company Teaser Section",
};

export const Default = {
  render: () =>
    renderTemplate("components/organisms/company-teaser-section.njk", {
      companies,
    }),
};
