import {
  catalog,
  companies,
  renderTemplate,
  site,
  strengths,
} from "../helpers/render-template.mjs";

export default {
  title: "Pages/Components Dashboard",
};

export const Default = {
  render: () => {
    const navbar = renderTemplate("components/organisms/site-navbar.njk");
    const hero = renderTemplate("components/organisms/hero-section.njk", { site });
    const companyTeaser = renderTemplate("components/organisms/company-teaser-section.njk", {
      companies,
    });
    const strengthsSection = renderTemplate("components/organisms/strengths-section.njk", {
      strengths,
    });
    const projectCard = renderTemplate("components/molecules/project-card.njk", {
      project: catalog.tier1Entries[0],
    });

    return `
      <div>
        ${navbar}
        ${hero}
        <section class="section">
          <div class="container">
            <div class="section-heading">
              <p class="eyebrow">Component</p>
              <h2>Project card.</h2>
              <p>Shared card used across projects and company work.</p>
            </div>
            <div class="project-grid">
              <div class="project-card-frame">${projectCard}</div>
            </div>
          </div>
        </section>
        ${companyTeaser}
        ${strengthsSection}
      </div>
    `;
  },
};
