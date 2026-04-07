const validTiers = new Set(["1", "2", "3"]);

function getProjectTarget(panel, projectParam) {
  if (!panel) {
    return null;
  }

  const cards = panel.querySelectorAll("[data-project-card]");

  for (const card of cards) {
    const slug = card.getAttribute("data-project-card");
    const aliases = (card.getAttribute("data-project-aliases") || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    if (slug === projectParam || aliases.includes(projectParam)) {
      return card;
    }
  }

  return null;
}

function syncProjectsPage() {
  const page = document.querySelector("[data-projects-page]");

  if (!page) {
    return;
  }

  const searchParams = new URLSearchParams(window.location.search);
  const tierParam = searchParams.get("tier");
  const hasTierFilter = validTiers.has(tierParam);
  const tier = hasTierFilter ? tierParam : null;
  const project = searchParams.get("project");
  const panels = page.querySelectorAll("[data-tier-panel]");
  const tabs = page.querySelectorAll("[data-tier-tab]");

  for (const panel of panels) {
    panel.hidden = hasTierFilter && panel.getAttribute("data-tier-panel") !== tier;
  }

  for (const tab of tabs) {
    const tabTier = tab.getAttribute("data-tier-tab");
    const isActive = hasTierFilter ? tabTier === tier : tabTier === "all";

    tab.classList.toggle("tier-tab--active", isActive);

    if (isActive) {
      tab.setAttribute("aria-current", "page");
    } else {
      tab.removeAttribute("aria-current");
    }
  }

  page.querySelectorAll(".project-card-frame--focus").forEach((card) => {
    card.classList.remove("project-card-frame--focus");
  });

  if (!project) {
    return;
  }

  const target = hasTierFilter
    ? getProjectTarget(page.querySelector(`[data-tier-panel="${tier}"]`), project)
    : Array.from(panels).reduce((match, panel) => match || getProjectTarget(panel, project), null);

  if (!target) {
    return;
  }

  target.classList.add("project-card-frame--focus");

  window.requestAnimationFrame(() => {
    target.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  });
}

window.addEventListener("DOMContentLoaded", syncProjectsPage);
window.addEventListener("popstate", syncProjectsPage);
