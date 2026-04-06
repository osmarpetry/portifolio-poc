import { renderTemplate, strengths } from "../helpers/render-template.mjs";

export default {
  title: "Molecules/Strength Card",
  parameters: {
    layout: "padded",
  },
};

export const Default = {
  render: () =>
    renderTemplate("components/molecules/strength-card.njk", {
      strength: strengths[0],
    }),
};
