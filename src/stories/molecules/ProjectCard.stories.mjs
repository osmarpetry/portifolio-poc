import { catalog, renderTemplate } from "../helpers/render-template.mjs";

export default {
  title: "Molecules/Project Card",
  parameters: {
    layout: "padded",
  },
};

export const TierOneProject = {
  render: () =>
    renderTemplate("components/molecules/project-card.njk", {
      project: catalog.tier1Entries[0],
    }),
};
