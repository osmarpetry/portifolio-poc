export const site = {
  github: "https://github.com/osmarpetry",
  linkedin: "https://www.linkedin.com/in/osmarpetry",
  email: "osmarpetry@gmail.com",
};

export const companies = [
  {
    slug: "cyber",
    name: "Cyber",
    role: "Frontend Engineer",
    period: "Earlier experience",
    projects: [{ slug: "cyber-platform-placeholder", title: "Platform work placeholder" }],
  },
  {
    slug: "attend",
    name: "Attend",
    role: "Senior Software Engineer",
    period: "May 2023–Present",
    projects: [
      { slug: "attend-operations-dashboard", title: "Attend operations dashboard" },
      { slug: "attend-flex-payments", title: "Flex payment and gift-card flows" },
    ],
  },
  {
    slug: "consulting",
    name: "Consulting",
    role: "Senior Software Engineer",
    period: "Feb 2023–Aug 2023",
    projects: [
      { slug: "consulting-health-app", title: "Health app with labs and patient chat" },
      { slug: "consulting-tourism-white-label", title: "White-label city and event apps" },
    ],
  },
  {
    slug: "x-team",
    name: "X-Team",
    role: "Senior Software Developer",
    period: "Mar 2021–Feb 2023",
    projects: [
      { slug: "xteam-beachbody-bodi", title: "Beachbody (BODi)" },
      { slug: "xteam-lemonlight", title: "Lemonlight" },
      { slug: "xteam-kmf-xhq", title: "KMF / XHQ" },
      { slug: "xteam-xgames", title: "X-Games" },
    ],
  },
  {
    slug: "luizalabs",
    name: "Luizalabs",
    role: "Frontend Engineer",
    period: "Earlier experience",
    projects: [
      {
        slug: "luizalabs-marketplace-placeholder",
        title: "Marketplace frontend placeholder",
      },
    ],
  },
  {
    slug: "zup",
    name: "Zup",
    role: "Frontend Engineer",
    period: "Earlier experience",
    projects: [{ slug: "zup-placeholder", title: "Product work placeholder" }],
  },
  {
    slug: "ng-informatica",
    name: "NG Informática",
    role: "Frontend Engineer",
    period: "Earlier experience",
    projects: [{ slug: "ng-informatica-placeholder", title: "Internal product placeholder" }],
  },
  {
    slug: "coblue",
    name: "CoBlue",
    role: "Frontend Engineer",
    period: "Earlier experience",
    projects: [{ slug: "coblue-placeholder", title: "Client product placeholder" }],
  },
  {
    slug: "totvs",
    name: "TOTVS",
    role: "Frontend Engineer",
    period: "Earlier experience",
    projects: [{ slug: "totvs-placeholder", title: "Enterprise platform placeholder" }],
  },
  {
    slug: "envolve-labs",
    name: "Envolve Labs",
    role: "Frontend Engineer",
    period: "Earlier experience",
    projects: [{ slug: "envolve-labs-placeholder", title: "Product placeholder" }],
  },
  {
    slug: "catolica",
    name: "Católica",
    role: "Researcher",
    period: "Academic period",
    projects: [{ slug: "catolica-research-placeholder", title: "Research project placeholder" }],
  },
];

export const strengths = [
  {
    title: "Testing discipline",
    summary:
      "Playwright, Vitest, Cypress, and Storybook-backed workflows are part of how I keep behavior stable while the UI evolves.",
  },
  {
    title: "Architecture judgment",
    summary:
      "I pay attention to boundaries, state shape, and failure paths so the next feature does not cost more than the first one.",
  },
  {
    title: "Modern frontend delivery",
    summary:
      "React, Next.js, TypeScript, GraphQL, MSW, and auth-heavy flows are familiar tools, not portfolio decoration.",
  },
  {
    title: "Range across product types",
    summary:
      "The project set spans dashboards, browser extensions, map interfaces, and integration demos with product-facing complexity.",
  },
];

export const contactProject = {
  slug: "free-mentorship",
  title: "Free mentorship",
  type: "Mentorship",
  summary:
    "Our firm also offers mentorship for people growing in frontend, product thinking, and engineering judgment. Open the LinkedIn post for more context.",
  images: [
    {
      src: "/assets/images/hero/osmar-mentor-1.jpeg",
      alt: "Osmar during a mentorship conversation",
    },
    {
      src: "/assets/images/hero/osmar-mentor-2.jpeg",
      alt: "Osmar offering guidance during a mentoring session",
    },
  ],
  links: [
    {
      label: "Mentorship",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7290242014049148928/",
    },
  ],
};

const projectCardProject = {
  slug: "chargebee-brevo-demo",
  tier: 1,
  title: "ChargeBee + Brevo Demo",
  type: "Tier 1",
  summary:
    "Webhook-driven billing and CRM flow with clear checkout handling and test coverage around the handoff.",
  repos: ["chargebee-brevo-demo"],
  images: [
    {
      src: "/assets/images/projects/chargebee-brevo-demo/cover.jpg",
      alt: "ChargeBee and Brevo demo showing pricing and checkout flow.",
    },
  ],
  links: [
    {
      label: "Live",
      url: "https://demo.osmarpetry.dev",
    },
    {
      label: "GitHub",
      url: "https://github.com/osmarpetry/chargebee-brevo-demo",
    },
  ],
  stack: ["Next.js 15", "TypeScript", "Vitest", "Playwright"],
};

export const catalog = {
  tier1Projects: [projectCardProject],
  tier2Projects: [],
  tier3Projects: [],
};
