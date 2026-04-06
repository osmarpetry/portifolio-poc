import { renderTemplate } from "../helpers/render-template.mjs";

export default {
  title: "Organisms/Site Navbar",
};

export const Default = {
  render: () => renderTemplate("components/organisms/site-navbar.njk"),
};
