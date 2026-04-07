/**
 * showcaseEntries.js — curated content sections for tier pages.
 *
 * Fields:
 *   id          — unique entry ID (matches entryId in repoInventory)
 *   slug        — URL-safe slug for anchor links
 *   tier        — 1 | 2 | 3
 *   title       — display title
 *   type        — project type label
 *   summary     — full description
 *   sourceRepos — array of repo slugs that map to this entry
 *   images      — array of { src, alt }
 *   links       — array of { label, url }
 *   layout      — "editorial" | "medium" | "archive"
 *   stack       — array of tech stack items
 */

const {
  getProjectScreenshotPublicPath,
  resolveImage,
} = require("./helpers/media");

const showcaseEntries = [
  // ─── Tier 1 — editorial layout ─────────────────────────────────────────────
  {
    id: "chargebee-brevo-demo",
    slug: "chargebee-brevo-demo",
    tier: 1,
    title: "ChargeBee + Brevo Demo",
    type: "Integration workflow",
    summary:
      "Webhook-driven billing and CRM flow with clear checkout handling and test coverage around the handoff.",
    sourceRepos: ["chargebee-brevo-demo"],
    images: [
      {
        src: "/assets/images/projects/chargebee-brevo-demo/cover.jpg",
        alt: "ChargeBee and Brevo demo showing pricing and checkout flow.",
      },
    ],
    links: [
      { label: "Live", url: "https://demo.osmarpetry.dev" },
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/chargebee-brevo-demo",
      },
    ],
    layout: "editorial",
    stack: ["Next.js 15", "TypeScript", "Vitest", "Playwright"],
  },
  {
    id: "rick-et-morty",
    slug: "rick-et-morty",
    tier: 1,
    title: "Rick and Morty Explorer",
    type: "Data-rich frontend",
    summary:
      "GraphQL search and filtering UI with pagination, localization, Storybook support, and end-to-end coverage.",
    sourceRepos: ["rick-et-morty"],
    images: [
      {
        src: "/assets/images/projects/rick-et-morty/cover.jpg",
        alt: "Rick and Morty Explorer showing search, filters, and character results.",
      },
    ],
    links: [
      { label: "Live", url: "https://rick-et-morty-2025.netlify.app/" },
      { label: "GitHub", url: "https://github.com/osmarpetry/rick-et-morty" },
    ],
    layout: "editorial",
    stack: ["Next.js 15", "GraphQL", "Storybook", "Playwright"],
  },
  {
    id: "flowers-city",
    slug: "flowers-city",
    tier: 1,
    title: "Flowers City",
    type: "Map interface",
    summary:
      "Store-locator concept built around map state, location context, and clean frontend structure for place-driven UI.",
    sourceRepos: ["flowers-city"],
    images: [
      {
        src: "/assets/images/projects/flowers-city/cover.jpg",
        alt: "Flowers City interface showing a map-based store locator concept.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/flowers-city" },
    ],
    layout: "editorial",
    stack: ["Next.js 15", "Leaflet", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "my-accounts",
    slug: "my-accounts",
    tier: 1,
    title: "My Accounts",
    type: "Dashboard product UI",
    summary:
      "Account management interface with mocked APIs, transfer flows, theming, i18n, and realistic state handling.",
    sourceRepos: ["my-accounts"],
    images: [
      {
        src: "/assets/images/projects/my-accounts/cover.jpg",
        alt: "Bank management dashboard with account balances and actions.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/my-accounts" },
    ],
    layout: "editorial",
    stack: ["Next.js 15", "Redux Toolkit", "MSW", "Playwright"],
  },
  {
    id: "felippe",
    slug: "felippe",
    tier: 1,
    title: "Felippe",
    type: "Auth and content product",
    summary:
      "Playlist-style content app with sign-in, comments, and frontend decisions that sit close to product rules and auth.",
    sourceRepos: ["felippe"],
    images: [
      {
        src: "/assets/images/projects/felippe/cover.jpg",
        alt: "Content playlist app with sign-in buttons and discussion area.",
      },
    ],
    links: [
      { label: "Live", url: "https://felippex.netlify.app/" },
      { label: "GitHub", url: "https://github.com/osmarpetry/felippe" },
    ],
    layout: "editorial",
    stack: ["Next.js 15", "Auth.js v5", "Tailwind CSS", "Biome"],
  },
  {
    id: "speach-poc",
    slug: "speach-poc",
    tier: 1,
    title: "Speach POC",
    type: "Browser extension",
    summary:
      "Chrome extension prototype for turning selected text and extracted articles into a controlled reading flow.",
    sourceRepos: ["speach-poc"],
    images: [
      {
        src: "/assets/images/projects/speach-poc/cover.jpg",
        alt: "Extension settings popup with language, speed, and reading controls.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/speach-poc" },
    ],
    layout: "editorial",
    stack: ["WXT", "React", "TypeScript", "Playwright"],
  },
  {
    id: "earth-1999",
    slug: "earth-1999",
    tier: 1,
    title: "Earth 1999",
    type: "Historical live frontend",
    summary:
      "Marvel browser from 2018 with BDD tests, Storybook habits, and Firebase deployment kept as a historical live piece.",
    sourceRepos: ["earth-1999"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder cover for Earth 1999 project.",
      },
    ],
    links: [
      { label: "Live", url: "https://earth-19999.web.app" },
      { label: "GitHub", url: "https://github.com/osmarpetry/earth-1999" },
    ],
    layout: "editorial",
    stack: ["React", "TypeScript", "Firebase", "Cypress"],
  },
  {
    id: "animation-principles-explorer",
    slug: "animation-principles-explorer",
    tier: 1,
    title: "Animation Principles Explorer",
    type: "AI-assisted frontend",
    summary:
      "Interactive animation-principles sandbox combining a React UI with Gemini-backed exploration and guided demos.",
    sourceRepos: ["animation-principles-explorer"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder cover for Animation Principles Explorer project.",
      },
    ],
    links: [
      {
        label: "Live",
        url: "https://animation-principles-explorer.vercel.app/",
      },
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/animation-principles-explorer",
      },
    ],
    layout: "editorial",
    stack: ["React", "Vite", "Gemini API", "TypeScript"],
  },
  {
    id: "goodread",
    slug: "goodread",
    tier: 1,
    title: "media2goodreads",
    type: "CLI and TUI utility",
    summary:
      "Go-based import pipeline that consolidates reading history across services and exports a Goodreads-ready CSV locally.",
    sourceRepos: ["goodread"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder cover for media2goodreads project.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/goodread" },
      {
        label: "Docs",
        url: "https://github.com/osmarpetry/goodread/blob/main/TUI_USAGE.md",
      },
    ],
    layout: "editorial",
    stack: ["Go", "CLI", "TUI", "CSV tooling"],
  },

  // ─── Tier 2 — medium layout ─────────────────────────────────────────────────
  {
    id: "moneylion-demo",
    slug: "moneylion-demo",
    tier: 2,
    title: "MoneyLion Demo",
    type: "Full-stack assessment",
    summary:
      "Frontend and backend split across Next.js and Node.js, focused on timeline rendering, validation, and API normalization.",
    sourceRepos: ["lion-fe", "lion-be"],
    images: [
      {
        src: "/assets/images/screenshots/shared/cover.png",
        alt: "Placeholder cover for MoneyLion demo project.",
      },
    ],
    links: [
      { label: "Live", url: "https://lion-fe.vercel.app/timeline" },
      { label: "Frontend", url: "https://github.com/osmarpetry/lion-fe" },
      { label: "Backend", url: "https://github.com/osmarpetry/lion-be" },
    ],
    layout: "medium",
    stack: ["Next.js", "TypeScript", "Node.js", "Material UI"],
  },
  {
    id: "bater-horas2",
    slug: "bater-horas2",
    tier: 2,
    title: "Bater Horas 2",
    type: "Time-tracking interface",
    summary:
      "React time-tracking UI with room to connect design references and refine documentation around the product flow.",
    sourceRepos: ["bater-horas2"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder cover for Bater Horas 2 project.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/bater-horas2" },
    ],
    layout: "medium",
    stack: ["React", "TypeScript", "date-fns"],
  },
  {
    id: "lumdb",
    slug: "lumdb",
    tier: 2,
    title: "Lumdb",
    type: "Historical movie browser",
    summary:
      "Earlier Firebase-hosted movie browser that still helps show progression in product UI and frontend architecture.",
    sourceRepos: ["lumdb"],
    images: [
      {
        src: "/assets/images/projects/lumdb/cover.png",
        alt: "Placeholder cover for Lumdb project.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/lumdb" },
      { label: "Live", url: "https://lumdb-spa.netlify.app/" },
    ],
    layout: "medium",
    stack: ["React", "Redux", "Firebase", "PWA"],
  },
  {
    id: "horas",
    slug: "horas",
    tier: 2,
    title: "Horas",
    type: "Java backend",
    summary:
      "REST backend for time tracking with a legacy Java stack — an architecture story rather than a polished live demo.",
    sourceRepos: ["horas"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder cover for Horas backend project.",
      },
    ],
    links: [{ label: "GitHub", url: "https://github.com/osmarpetry/horas" }],
    layout: "medium",
    stack: ["Java", "Maven", "MySQL", "Tomcat"],
  },
  {
    id: "tokens-figma-node",
    slug: "tokens-figma-node",
    tier: 2,
    title: "Tokens Figma Node",
    type: "Design tooling",
    summary:
      "Utility script for turning design-token exports into CSS-friendly outputs — a tooling bridge between design and code.",
    sourceRepos: ["tokens-figma-node"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder cover for Tokens Figma Node project.",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/tokens-figma-node",
      },
    ],
    layout: "medium",
    stack: ["Node.js", "Design Tokens", "Figma"],
  },
  {
    id: "black-spotify",
    slug: "black-spotify",
    tier: 2,
    title: "Black Spotify",
    type: "Historical frontend experiment",
    summary:
      "Spotify-focused browser from an earlier phase of the portfolio, preserved as a progression card.",
    sourceRepos: ["black-spotify"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder cover for Black Spotify historical project.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/black-spotify" },
    ],
    layout: "medium",
    stack: ["React", "Redux", "Firebase", "Cypress"],
  },
  {
    id: "weather-7",
    slug: "weather-7",
    tier: 2,
    title: "Weather 7",
    type: "Weather application",
    summary:
      "Weather application with location-based forecasts and clean UI for displaying weather data.",
    sourceRepos: ["weather-7"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder cover for Weather 7 project.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/weather-7" },
      { label: "Live", url: "https://weather7-osmar.netlify.app/" },
    ],
    layout: "medium",
    stack: ["JavaScript", "Weather API"],
  },
  {
    id: "backend-appsync",
    slug: "backend-appsync",
    tier: 3,
    title: "Backend AppSync",
    type: "Cloud backend",
    summary:
      "AWS AppSync-based backend with GraphQL API, demonstrating cloud-native data layer architecture.",
    sourceRepos: ["backend-appsync"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder cover for Backend AppSync project.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/backend-appsync" },
    ],
    layout: "medium",
    stack: ["AWS AppSync", "GraphQL", "DynamoDB"],
  },
  {
    id: "infractions-hawaii",
    slug: "infractions-hawaii",
    tier: 2,
    title: "Infractions Hawaii",
    type: "Data lookup interface",
    summary:
      "Traffic infraction lookup interface for Hawaii, demonstrating data-heavy frontend with filtering and search.",
    sourceRepos: ["infractions-hawaii"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder cover for Infractions Hawaii project.",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/infractions-hawaii",
      },
    ],
    layout: "medium",
    stack: ["React", "TypeScript"],
  },
  {
    id: "forum",
    slug: "forum",
    tier: 2,
    title: "Forum",
    type: "Community platform",
    summary:
      "Full-featured forum application with topics, replies, and user management.",
    sourceRepos: ["forum"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder cover for Forum project.",
      },
    ],
    links: [{ label: "GitHub", url: "https://github.com/osmarpetry/forum" }],
    layout: "medium",
    stack: ["React", "Node.js"],
  },
  {
    id: "forum-springbootadmin",
    slug: "forum-springbootadmin",
    tier: 2,
    title: "Forum Spring Boot Admin",
    type: "Backend admin panel",
    summary:
      "Spring Boot admin panel for the forum application, providing backend management and monitoring.",
    sourceRepos: ["forum-springbootadmin"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder cover for Forum Spring Boot Admin project.",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/forum-springbootadmin",
      },
    ],
    layout: "medium",
    stack: ["Spring Boot", "Java", "Spring Boot Admin"],
  },
  {
    id: "quizzler-flutter",
    slug: "quizzler-flutter",
    tier: 3,
    title: "Quizzler Flutter",
    type: "Mobile application",
    summary:
      "Flutter quiz application exploring cross-platform mobile development with Dart and Flutter UI patterns.",
    sourceRepos: ["quizzler-flutter"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder cover for Quizzler Flutter project.",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/quizzler-flutter",
      },
    ],
    layout: "medium",
    stack: ["Flutter", "Dart"],
  },

  // ─── Tier 3 — archive layout ────────────────────────────────────────────────
  {
    id: "bootstrap-resposive-site",
    slug: "bootstrap-resposive-site",
    tier: 3,
    title: "Bootstrap Responsive Site",
    type: "Layout exercise",
    summary:
      "Responsive website exercise built with Bootstrap, exploring grid and component patterns.",
    sourceRepos: ["bootstrap-resposive-site"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      {
        label: "Live",
        url: "https://incandescent-puppy-fff2fc.netlify.app/",
      },
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/bootstrap-resposive-site",
      },
    ],
    layout: "archive",
    stack: ["HTML", "CSS", "Bootstrap"],
  },
  {
    id: "CustomMuiDrawer",
    slug: "custom-mui-drawer",
    tier: 3,
    title: "Custom MUI Drawer",
    type: "UI component",
    summary:
      "Custom Material UI Drawer component with extended functionality and theming support.",
    sourceRepos: ["CustomMuiDrawer"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/CustomMuiDrawer" },
    ],
    layout: "archive",
    stack: ["React", "Material UI", "TypeScript"],
  },
  {
    id: "docker-react",
    slug: "docker-react",
    tier: 3,
    title: "Docker React",
    type: "DevOps exercise",
    summary:
      "React application containerized with Docker, demonstrating multi-stage build and deployment patterns.",
    sourceRepos: ["docker-react"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/docker-react" },
    ],
    layout: "archive",
    stack: ["React", "Docker", "CI/CD"],
  },
  {
    id: "fotograf",
    slug: "fotograf",
    tier: 3,
    title: "Fotograf",
    type: "Media gallery",
    summary:
      "Photography portfolio or image gallery project exploring media-heavy UI patterns.",
    sourceRepos: ["fotograf"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/fotograf" },
      { label: "Live", url: "https://fotograf-poc.netlify.app/services" },
    ],
    layout: "archive",
    stack: ["React"],
  },
  {
    id: "lumdb-nextjs",
    slug: "lumdb-nextjs",
    tier: 3,
    title: "Lumdb Next.js",
    type: "Framework migration",
    summary:
      "Next.js port of the Lumdb movie browser, migrating from React+Firebase to a server-rendering approach.",
    sourceRepos: ["lumdb-nextjs"],
    images: [
      {
        src: "/assets/images/projects/lumdb-nextjs/cover.png",
        alt: "Cover for Lumdb Next.js project.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/lumdb-nextjs" },
    ],
    layout: "archive",
    stack: ["Next.js", "TypeScript"],
  },
  {
    id: "nvim-configuration",
    slug: "nvim-configuration",
    tier: 3,
    title: "Neovim Configuration",
    type: "Dev environment",
    summary:
      "Personal Neovim configuration with LSP, plugins, and keybindings for a productive development workflow.",
    sourceRepos: ["nvim-configuration"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/nvim-configuration",
      },
    ],
    layout: "archive",
    stack: ["Lua", "Neovim"],
  },
  {
    id: "osmarpetry-me",
    slug: "osmarpetry-me",
    tier: 3,
    title: "osmarpetry.me",
    type: "Portfolio archive",
    summary:
      "Older Gatsby-based personal site now preserved as an archive of earlier frontend approaches.",
    sourceRepos: ["osmarpetry.me"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/osmarpetry.me" },
    ],
    layout: "archive",
    stack: ["Gatsby", "React", "GraphQL"],
  },
  {
    id: "personal-blog-gatsby-trash",
    slug: "personal-blog-gatsby-trash",
    tier: 3,
    title: "Personal Blog (Gatsby)",
    type: "Blog prototype",
    summary:
      "Gatsby blog prototype kept as a historical data point for progression tracking.",
    sourceRepos: ["personal-blog-gatsby-trash"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/personal-blog-gatsby-trash",
      },
    ],
    layout: "archive",
    stack: ["Gatsby", "React", "GraphQL"],
  },
  {
    id: "pirataflix",
    slug: "pirataflix",
    tier: 3,
    title: "Pirataflix",
    type: "Streaming UI",
    summary:
      "Streaming UI concept exploring Netflix-style layout and media browsing patterns.",
    sourceRepos: ["pirataflix"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/pirataflix" },
    ],
    layout: "archive",
    stack: ["React", "CSS"],
  },
  {
    id: "pirataflix2",
    slug: "pirataflix2",
    tier: 3,
    title: "Pirataflix 2",
    type: "Streaming UI v2",
    summary:
      "Second iteration of the Pirataflix streaming concept with improved architecture and features.",
    sourceRepos: ["pirataflix2"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/pirataflix2" },
    ],
    layout: "archive",
    stack: ["React", "TypeScript"],
  },
  {
    id: "Portifolio",
    slug: "portifolio",
    tier: 3,
    title: "Portfolio (this site)",
    type: "Infrastructure",
    summary:
      "The current Eleventy-based portfolio site — infrastructure and design system for osmarpetry.dev.",
    sourceRepos: ["Portifolio"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/Portifolio" },
    ],
    layout: "archive",
    stack: ["Eleventy", "Nunjucks", "CSS"],
  },
  {
    id: "react-hook-ts-poc",
    slug: "react-hook-ts-poc",
    tier: 3,
    title: "React Hook TS POC",
    type: "POC",
    summary:
      "Proof of concept exploring React hooks patterns with TypeScript for state and side-effect management.",
    sourceRepos: ["react-hook-ts-poc"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/react-hook-ts-poc",
      },
    ],
    layout: "archive",
    stack: ["React", "TypeScript"],
  },
  {
    id: "react-performance-tips",
    slug: "react-performance-tips",
    tier: 3,
    title: "React Performance Tips",
    type: "Learning resource",
    summary:
      "Practical React performance techniques demonstrated with memoization, virtualization, and profiling.",
    sourceRepos: ["react-performance-tips"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/react-performance-tips",
      },
    ],
    layout: "archive",
    stack: ["React", "TypeScript"],
  },
  {
    id: "ritchie-workshop",
    slug: "ritchie-workshop",
    tier: 3,
    title: "Ritchie Workshop",
    type: "CLI tooling",
    summary:
      "Workshop project for the Ritchie CLI framework, exploring formula creation and automation.",
    sourceRepos: ["ritchie-workshop"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/ritchie-workshop",
      },
    ],
    layout: "archive",
    stack: ["Shell", "Ritchie CLI"],
  },
  {
    id: "simple-next",
    slug: "simple-next",
    tier: 3,
    title: "Simple Next",
    type: "Starter template",
    summary:
      "Minimal Next.js starter demonstrating routing, data fetching, and deployment fundamentals.",
    sourceRepos: ["simple-next"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/simple-next" },
    ],
    layout: "archive",
    stack: ["Next.js", "React"],
  },
  {
    id: "spring-animations",
    slug: "spring-animations",
    tier: 3,
    title: "Spring Animations",
    type: "Animation experiment",
    summary:
      "Physics-based animation experiments using spring dynamics for natural motion in React.",
    sourceRepos: ["spring-animations"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/spring-animations",
      },
      {
        label: "Demo",
        url: "https://spring-animations.vercel.app/",
      },
    ],
    layout: "archive",
    stack: ["React", "Framer Motion"],
  },
  {
    id: "storybook-class",
    slug: "storybook-class",
    tier: 3,
    title: "Storybook Class",
    type: "Learning exercise",
    summary:
      "Storybook learning exercises building a documented component library with stories and controls.",
    sourceRepos: ["storybook-class"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/storybook-class" },
    ],
    layout: "archive",
    stack: ["React", "Storybook", "TypeScript"],
  },
  {
    id: "tcc-catolica",
    slug: "tcc-catolica",
    tier: 3,
    title: "TCC Católica",
    type: "Academic project",
    summary:
      "University final project from Católica, kept as a historical milestone of early development work.",
    sourceRepos: ["tcc-catolica"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/tcc-catolica" },
    ],
    layout: "archive",
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "tech-assessment-fe",
    slug: "tech-assessment-fe",
    tier: 3,
    title: "Tech Assessment FE",
    type: "Technical assessment",
    summary:
      "Frontend technical assessment demonstrating component architecture and data integration patterns.",
    sourceRepos: ["tech-assessment-fe"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/tech-assessment-fe",
      },
    ],
    layout: "archive",
    stack: ["React", "TypeScript"],
  },
  {
    id: "teste",
    slug: "teste",
    tier: 3,
    title: "Teste",
    type: "Sandbox",
    summary:
      "Sandbox repository used for quick experiments and technology exploration.",
    sourceRepos: ["teste"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [{ label: "GitHub", url: "https://github.com/osmarpetry/teste" }],
    layout: "archive",
    stack: ["Various"],
  },
  {
    id: "themis",
    slug: "themis",
    tier: 3,
    title: "Themis",
    type: "Domain-specific UI",
    summary:
      "Application with a judicial or governance theme, exploring domain-specific UI patterns.",
    sourceRepos: ["themis"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [{ label: "GitHub", url: "https://github.com/osmarpetry/themis" }],
    layout: "archive",
    stack: ["React", "TypeScript"],
  },
  {
    id: "todo",
    slug: "todo",
    tier: 3,
    title: "Todo",
    type: "CRUD exercise",
    summary:
      "Todo list application — a focused exercise in state management and CRUD UI patterns.",
    sourceRepos: ["todo"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [{ label: "GitHub", url: "https://github.com/osmarpetry/todo" }],
    layout: "archive",
    stack: ["React"],
  },
  {
    id: "twitter-bot",
    slug: "twitter-bot",
    tier: 3,
    title: "Twitter Bot",
    type: "Automation",
    summary:
      "Twitter automation bot exploring the X/Twitter API for scheduled posting and engagement.",
    sourceRepos: ["twitter-bot"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/twitter-bot" },
    ],
    layout: "archive",
    stack: ["Node.js", "Twitter API"],
  },
  {
    id: "xalgo",
    slug: "xalgo",
    tier: 3,
    title: "XAlgo",
    type: "Algorithm practice",
    summary:
      "Algorithm and data structure exercises — sorting, searching, and complexity analysis practice.",
    sourceRepos: ["xalgo"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [{ label: "GitHub", url: "https://github.com/osmarpetry/xalgo" }],
    layout: "archive",
    stack: ["JavaScript", "TypeScript"],
  },
  {
    id: "yan-template",
    slug: "yan-template",
    tier: 3,
    title: "Yan Template",
    type: "Project scaffold",
    summary:
      "Project template with opinionated tooling setup for rapid frontend project scaffolding.",
    sourceRepos: ["yan-template"],
    images: [
      {
        src: "/assets/images/screenshots/shared/project-placeholder.svg",
        alt: "Placeholder.",
      },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/yan-template" },
    ],
    layout: "archive",
    stack: ["React", "TypeScript", "Vite"],
  },
];

module.exports = showcaseEntries.map((entry) => {
  const [firstImage, ...restImages] = entry.images;
  const prefersCapturedCover =
    firstImage && !firstImage.src.startsWith("/assets/images/projects/");

  if (!firstImage || !prefersCapturedCover) {
    return entry;
  }

  return {
    ...entry,
    images: [
      resolveImage({
        preferredPublicPath: getProjectScreenshotPublicPath(entry.slug),
        fallbackImage: firstImage,
        alt: `Screenshot of ${entry.title}.`,
      }),
      ...restImages,
    ],
  };
});
