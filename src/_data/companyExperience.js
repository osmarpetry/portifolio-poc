const {
  getCompanyProjectScreenshotPublicPath,
  resolveImage,
} = require("./helpers/media");

const companyExperience = [
  {
    slug: "cyber",
    name: "Cyber",
    role: "Frontend Engineer",
    period: "Earlier experience",
    summary:
      "Reserved block for earlier Cyber work, keeping the slot explicit so project order can be adjusted without changing the template.",
    companyUrl: "",
    brand: {
      kind: "wordmark",
      text: "Cyber",
    },
    projects: [
      {
        slug: "cyber-platform-placeholder",
        title: "Platform work placeholder",
        summary:
          "Placeholder card for Cyber project work until the exact product names and screenshots are curated.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Cyber project work.",
        },
        links: [{ label: "Details pending", url: "#" }],
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
    brand: {
      kind: "wordmark",
      text: "Attend",
    },
    projects: [
      {
        slug: "attend-pass-flow-flex",
        title: "Pass, Flow and Flex admin products",
        summary:
          "Unified dashboard work across three products with inventory, assignments, operations workflows, and shared frontend decisions.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Attend Pass, Flow and Flex work.",
        },
        links: [{ label: "Attend", url: "https://www.attend.tech" }],
      },
      {
        slug: "attend-flex-payments",
        title: "Flex payment and gift-card flows",
        summary:
          "Advanced payment workflows and gift-card integrations supporting flexible purchasing and partner operations.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Attend Flex payment work.",
        },
        links: [{ label: "Flex", url: "https://www.attend.tech/products/flex" }],
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
    brand: {
      kind: "wordmark",
      text: "Consulting",
    },
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
    brand: {
      kind: "wordmark",
      text: "X-Team",
    },
    projects: [
      {
        slug: "xteam-beachbody-bodi",
        title: "Beachbody (BODi)",
        summary:
          "GraphQL filters and advanced scheduling improvements on a large digital fitness platform.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Placeholder image for Beachbody work.",
        },
        links: [{ label: "BODi", url: "https://www.bodi.com" }],
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
    brand: {
      kind: "wordmark",
      text: "Luizalabs",
    },
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
    brand: {
      kind: "wordmark",
      text: "Zup",
    },
    projects: [
      {
        slug: "zup-placeholder",
        title: "Product work placeholder",
        summary:
          "Placeholder card for Zup projects until the internal product names and screenshots are finalized.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Abstract portfolio-safe cover artwork for Zup client work.",
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
      "Legacy company block kept explicit in the carousel so the experience sequence remains editable from data only.",
    companyUrl: "",
    brand: {
      kind: "wordmark",
      text: "NG Informática",
    },
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
    brand: {
      kind: "wordmark",
      text: "CoBlue",
    },
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
    brand: {
      kind: "wordmark",
      text: "TOTVS",
    },
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
    brand: {
      kind: "wordmark",
      text: "Envolve Labs",
    },
    projects: [
      {
        slug: "envolve-labs-placeholder",
        title: "Product placeholder",
        summary:
          "Placeholder card for Envolve Labs work, ready to be replaced with exact project information.",
        image: {
          src: "/assets/images/screenshots/shared/company-project-placeholder.svg",
          alt: "Abstract portfolio-safe cover artwork for Envolve Labs client work.",
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
      "Academic research block kept alongside commercial experience because you explicitly wanted the carousel to run from Cyber through Católica.",
    companyUrl: "",
    brand: {
      kind: "wordmark",
      text: "Católica",
    },
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

module.exports = companyExperience.map((company) => ({
  ...company,
  projects: company.projects.map((project) => ({
    ...project,
    image: project.image
      ? resolveImage({
          preferredPublicPath: getCompanyProjectScreenshotPublicPath(
            company.slug,
            project.slug,
          ),
          fallbackImage: project.image,
          alt: project.image.alt || `Cover image for ${project.title}.`,
        })
      : project.image,
  })),
}));
