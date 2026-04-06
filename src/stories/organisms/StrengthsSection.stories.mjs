import { renderTemplate, strengths } from "../helpers/render-template.mjs";

export default {
  title: "Organisms/Strengths Section",
};

export const Default = {
  render: () =>
    renderTemplate("components/organisms/strengths-section.njk", {
      strengths,
    }),
};
