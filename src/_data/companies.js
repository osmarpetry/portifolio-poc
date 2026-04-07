/**
 * companies.js — canonical company experience data.
 *
 * This file is the authoritative source for company data.
 * The old companyExperience.js remains for backward compat while migrating.
 *
 * Fields per company:
 *   slug        — URL-safe identifier used in /companies/{slug}/
 *   name        — display name
 *   role        — job title
 *   period      — employment period string
 *   summary     — one-paragraph description
 *   companyUrl  — optional link to company website
 *   brand       — { kind: "wordmark"|"logo", text?, src?, alt? }
 *   projects    — array of company projects
 *
 * Fields per project:
 *   slug        — unique project slug
 *   title       — display title
 *   summary     — description
 *   image       — { src, alt }
 *   links       — array of { label, url }
 */

const {
  getCompanyProjectScreenshotPublicPath,
  normalizeLinks,
  resolveImage,
} = require("./helpers/media");

const companies = [
  {
    slug: "cyber",
    name: "Cyberr",
    role: "Frontend Engineer",
    period: "Earlier experience",
    summary:
      "Earlier product and frontend work represented here with the public Cyberr surface as the visible reference point.",
    companyUrl: "https://cyberr.ai/",
    brand: { kind: "wordmark", text: "Cyberr" },
    projects: [
      {
        slug: "cyberr-ai-platform",
        title: "Cyberr AI platform",
        summary:
          "Public-facing Cyberr site used as the current visual reference for the earlier frontend and product work done there.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Cyberr AI platform work.",
        },
        links: [{ label: "Cyberr", url: "https://cyberr.ai/" }],
      },
    ],
  },
  {
    slug: "attend",
    name: "Attend",
    role: "Senior Software Engineer",
    period: "May 2023–Present",
    summary:
      "Administration, payments, and event-product work spanning inventory, assignments, gift cards, and data synchronization.",
    companyUrl: "https://www.attend.tech",
    brand: { kind: "wordmark", text: "Attend" },
    projects: [
      {
        slug: "attend-operations-dashboard",
        title: "Attend operations dashboard",
        summary:
          "Internal dashboard work across Pass, Flow, and Flex, covering inventory, assignments, operations workflows, and shared frontend decisions.",
        privateProject: true,
        preferredProject: true,
        image: {
          src: "/assets/images/screenshots/companies/attend/attend-operations-dashboard/cover.png",
          alt: "Editorial cover artwork for the private Attend operations dashboard.",
        },
      },
      {
        slug: "attend-flex-gift-card",
        title: "Flex gift card purchase flow",
        summary:
          "Gift-card purchase experience used as the public reference for checkout, partner flow, and transactional frontend work.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Attend Flex gift card flow.",
        },
        links: [
          {
            label: "Gift card",
            url: "https://flex2.seasonshare.com/baa_dallas/gift",
          },
        ],
      },
      {
        slug: "attend-flex-payments",
        title: "Attend Flex app",
        summary:
          "Public Flex surface used as the representative view for payments, partner configuration, and event-product frontend work.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Attend Flex app work.",
        },
        links: [
          {
            label: "Flex app",
            url: "https://flex2.seasonshare.com/flex_sandbox_united_flex",
          },
        ],
      },
    ],
  },
  {
    slug: "consulting",
    name: "Consulting",
    role: "Senior Software Engineer",
    period: "Feb 2023–Aug 2023",
    summary:
      "Short-cycle product delivery across mobile health and tourism apps, with reusable architecture and modular branding.",
    companyUrl: "",
    brand: { kind: "wordmark", text: "Consulting" },
    projects: [
      {
        slug: "consulting-health-app",
        title: "Health app with labs and patient chat",
        summary:
          "React Native product connecting lab integrations, patient data, and patient-doctor communication on mobile.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for consulting health app work.",
        },
        links: [{ label: "Case note", url: "#" }],
      },
      {
        slug: "consulting-tourism-white-label",
        title: "White-label city and event apps",
        summary:
          "Reusable mobile codebase adapted across brands for tourism and event experiences with shared product primitives.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for consulting tourism apps work.",
        },
        links: [{ label: "Case note", url: "#" }],
      },
    ],
  },
  {
    slug: "x-team",
    name: "X-Team",
    role: "Senior Software Developer",
    period: "Mar 2021–Feb 2023",
    summary:
      "Client-facing product work across streaming, internal tooling, studio ops, APIs, browser games, and CI stabilization.",
    companyUrl: "https://x-team.com",
    brand: { kind: "wordmark", text: "X-Team" },
    projects: [
      {
        slug: "xteam-beachbody-bodi",
        title: "Beachbody (BODi)",
        summary:
          "Workout discovery and filtering improvements on a large digital fitness platform, including the workout filter experience I helped build.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Beachbody work.",
        },
        links: [
          {
            label: "Workout filters",
            url: "https://www.beachbodyondemand.com/workouts?locale=en_US",
          },
        ],
      },
      {
        slug: "xteam-lemonlight",
        title: "Lemonlight",
        summary:
          "Automated reporting tables, bug fixing, and CI/CD hardening for a video production platform.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Lemonlight work.",
        },
        links: [{ label: "Lemonlight", url: "https://www.lemonlight.com" }],
      },
      {
        slug: "xteam-kmf-xhq",
        title: "KMF / XHQ",
        summary:
          "Back-office invoicing and internal portal work spanning APIs, Firebase, operations, and staff tooling.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for KMF and XHQ work.",
        },
        links: [{ label: "X-Team", url: "https://x-team.com" }],
      },
      {
        slug: "xteam-xgames",
        title: "X-Games",
        summary:
          "Browser-based game and CLI audio tooling delivered as part of X-Team internal engagement initiatives.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for X-Games work.",
        },
        links: [{ label: "X-Team", url: "https://x-team.com" }],
      },
    ],
  },
  {
    slug: "luizalabs",
    name: "Luizalabs",
    role: "Frontend Engineer",
    period: "Earlier experience",
    summary:
      "Marketplace-scale frontend work in a fast-moving ecommerce context, kept here as a historical progression block.",
    companyUrl: "https://www.magazineluiza.com.br",
    brand: { kind: "wordmark", text: "Luizalabs" },
    projects: [
      {
        slug: "luizalabs-marketplace-placeholder",
        title: "Marketplace frontend placeholder",
        summary:
          "Reserved project slot for marketplace work until the exact internal product names are curated.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Luizalabs work.",
        },
        links: [{ label: "Magalu", url: "https://www.magazineluiza.com.br" }],
      },
    ],
  },
  {
    slug: "zup",
    name: "Zup",
    role: "Frontend Engineer",
    period: "Earlier experience",
    summary:
      "Historical frontend work represented as a company block ready for later project-level curation.",
    companyUrl: "https://www.zup.com.br",
    brand: { kind: "wordmark", text: "Zup" },
    projects: [
      {
        slug: "zup-placeholder",
        title: "Product work placeholder",
        summary:
          "Placeholder card for Zup projects until the internal product names and screenshots are finalized.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Zup work.",
        },
        links: [{ label: "Zup", url: "https://www.zup.com.br" }],
      },
    ],
  },
  {
    slug: "ng-informatica",
    name: "NG Informática",
    role: "Frontend Engineer",
    period: "Earlier experience",
    summary:
      "Legacy company block kept explicit so the experience sequence remains editable from data only.",
    companyUrl: "",
    brand: { kind: "wordmark", text: "NG Informática" },
    projects: [
      {
        slug: "ng-informatica-placeholder",
        title: "Internal product placeholder",
        summary:
          "Placeholder card for NG Informática work until the exact product context is curated.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for NG Informática work.",
        },
        links: [{ label: "Details pending", url: "#" }],
      },
    ],
  },
  {
    slug: "coblue",
    name: "CoBlue",
    role: "Frontend Engineer",
    period: "Earlier experience",
    summary:
      "Earlier company slot maintained as a structured block with room for later expansion of the project list.",
    companyUrl: "",
    brand: { kind: "wordmark", text: "CoBlue" },
    projects: [
      {
        slug: "coblue-placeholder",
        title: "Client product placeholder",
        summary:
          "Reserved placeholder for CoBlue project work and screenshots.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for CoBlue work.",
        },
        links: [{ label: "Details pending", url: "#" }],
      },
    ],
  },
  {
    slug: "totvs",
    name: "TOTVS",
    role: "Frontend Engineer",
    period: "Earlier experience",
    summary:
      "Enterprise product work represented as an editable company slide with placeholder project slots for later detail.",
    companyUrl: "https://www.totvs.com",
    brand: { kind: "wordmark", text: "TOTVS" },
    projects: [
      {
        slug: "totvs-placeholder",
        title: "Enterprise platform placeholder",
        summary:
          "Placeholder card for TOTVS project work until exact modules and visuals are curated.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for TOTVS work.",
        },
        links: [{ label: "TOTVS", url: "https://www.totvs.com" }],
      },
    ],
  },
  {
    slug: "envolve-labs",
    name: "Envolve Labs",
    role: "Frontend Engineer",
    period: "Earlier experience",
    summary:
      "Early-company slot preserved in the same data model so the entire work history stays reorderable from one place.",
    companyUrl: "",
    brand: { kind: "wordmark", text: "Envolve Labs" },
    projects: [
      {
        slug: "envolve-labs-placeholder",
        title: "Product placeholder",
        summary:
          "Placeholder card for Envolve Labs work, ready to be replaced with exact project information.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Envolve Labs work.",
        },
        links: [{ label: "Details pending", url: "#" }],
      },
    ],
  },
  {
    slug: "catolica",
    name: "Católica",
    role: "Researcher",
    period: "Academic period",
    summary:
      "Academic research block kept alongside commercial experience because the work history runs from Cyber through Católica.",
    companyUrl: "",
    brand: { kind: "wordmark", text: "Católica" },
    projects: [
      {
        slug: "catolica-research-placeholder",
        title: "Research project placeholder",
        summary:
          "Placeholder card for research work at Católica until the exact project title and visual material are curated.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Católica research work.",
        },
        links: [{ label: "Details pending", url: "#" }],
      },
    ],
  },
];

module.exports = companies.map((company) => ({
  ...company,
  projects: company.projects.map((project) => ({
    ...project,
    type: project.type || company.name,
    links: normalizeLinks(project.links),
    images:
      project.images ||
      (project.image
        ? [
            resolveImage({
              preferredPublicPath: getCompanyProjectScreenshotPublicPath(
                company.slug,
                project.slug,
              ),
              fallbackImage: project.image,
              alt: `Screenshot of ${project.title}.`,
            }),
          ]
        : []),
  })),
}));
