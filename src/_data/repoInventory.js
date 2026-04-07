/**
 * repoInventory.js — canonical one-record-per-repo source of truth.
 *
 * Fields:
 *   repo        — exact GitHub repo slug
 *   title       — display title
 *   tier        — 1 | 2 | 3
 *   entryId     — which showcaseEntry this repo belongs to
 *   summary     — one-line description
 *   stack       — optional tech stack array
 *   links       — array of { label, url }
 *   status      — "active" | "archive" | "placeholder"
 *   visualMode  — "cover" | "placeholder"
 */

module.exports = [
  // ─── Tier 1 ────────────────────────────────────────────────────────────────
  {
    repo: "chargebee-brevo-demo",
    title: "ChargeBee + Brevo Demo",
    tier: 1,
    entryId: "chargebee-brevo-demo",
    summary:
      "Webhook-driven billing and CRM flow with clear checkout handling and test coverage around the handoff.",
    stack: ["Next.js 15", "TypeScript", "Vitest", "Playwright"],
    links: [
      { label: "Live", url: "https://demo.osmarpetry.dev" },
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/chargebee-brevo-demo",
      },
    ],
    status: "active",
    visualMode: "cover",
  },
  {
    repo: "rick-et-morty",
    title: "Rick and Morty Explorer",
    tier: 1,
    entryId: "rick-et-morty",
    summary:
      "GraphQL search and filtering UI with pagination, localization, Storybook support, and end-to-end coverage.",
    stack: ["Next.js 15", "GraphQL", "Storybook", "Playwright"],
    links: [
      { label: "Live", url: "https://rick-et-morty-2025.netlify.app/" },
      { label: "GitHub", url: "https://github.com/osmarpetry/rick-et-morty" },
    ],
    status: "active",
    visualMode: "cover",
  },
  {
    repo: "flowers-city",
    title: "Flowers City",
    tier: 1,
    entryId: "flowers-city",
    summary:
      "Store-locator concept built around map state, location context, and clean frontend structure for place-driven UI.",
    stack: ["Next.js 15", "Leaflet", "TypeScript", "Tailwind CSS"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/flowers-city" },
    ],
    status: "active",
    visualMode: "cover",
  },
  {
    repo: "my-accounts",
    title: "My Accounts",
    tier: 1,
    entryId: "my-accounts",
    summary:
      "Account management interface with mocked APIs, transfer flows, theming, i18n, and realistic state handling.",
    stack: ["Next.js 15", "Redux Toolkit", "MSW", "Playwright"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/my-accounts" },
    ],
    status: "active",
    visualMode: "cover",
  },
  {
    repo: "felippe",
    title: "Felippe",
    tier: 1,
    entryId: "felippe",
    summary:
      "Playlist-style content app with sign-in, comments, and frontend decisions that sit close to product rules and auth.",
    stack: ["Next.js 15", "Auth.js v5", "Tailwind CSS", "Biome"],
    links: [
      { label: "Live", url: "https://felippex.netlify.app/" },
      { label: "GitHub", url: "https://github.com/osmarpetry/felippe" },
    ],
    status: "active",
    visualMode: "cover",
  },
  {
    repo: "speach-poc",
    title: "Speach POC",
    tier: 1,
    entryId: "speach-poc",
    summary:
      "Chrome extension prototype for turning selected text and extracted articles into a controlled reading flow.",
    stack: ["WXT", "React", "TypeScript", "Playwright"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/speach-poc" },
    ],
    status: "active",
    visualMode: "cover",
  },
  {
    repo: "earth-1999",
    title: "Earth 1999",
    tier: 1,
    entryId: "earth-1999",
    summary:
      "Marvel browser from 2018 with BDD tests, Storybook habits, and Firebase deployment kept as a historical live piece.",
    stack: ["React", "TypeScript", "Firebase", "Cypress"],
    links: [
      { label: "Live", url: "https://earth-19999.web.app" },
      { label: "GitHub", url: "https://github.com/osmarpetry/earth-1999" },
    ],
    status: "active",
    visualMode: "placeholder",
  },
  {
    repo: "animation-principles-explorer",
    title: "Animation Principles Explorer",
    tier: 1,
    entryId: "animation-principles-explorer",
    summary:
      "Interactive animation-principles sandbox combining a React UI with Gemini-backed exploration and guided demos.",
    stack: ["React", "Vite", "Gemini API", "TypeScript"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/animation-principles-explorer",
      },
    ],
    status: "active",
    visualMode: "placeholder",
  },
  {
    repo: "goodread",
    title: "media2goodreads",
    tier: 1,
    entryId: "goodread",
    summary:
      "Go-based import pipeline that consolidates reading history across services and exports a Goodreads-ready CSV locally.",
    stack: ["Go", "CLI", "TUI", "CSV tooling"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/goodread" },
      {
        label: "Docs",
        url: "https://github.com/osmarpetry/goodread/blob/main/TUI_USAGE.md",
      },
    ],
    status: "active",
    visualMode: "placeholder",
  },

  // ─── Tier 2 ────────────────────────────────────────────────────────────────
  {
    repo: "lion-fe",
    title: "MoneyLion Demo — Frontend",
    tier: 2,
    entryId: "moneylion-demo",
    summary:
      "Next.js frontend for the MoneyLion technical assessment, focused on timeline rendering and validation.",
    stack: ["Next.js", "TypeScript", "Material UI"],
    links: [{ label: "GitHub", url: "https://github.com/osmarpetry/lion-fe" }],
    status: "active",
    visualMode: "placeholder",
  },
  {
    repo: "lion-be",
    title: "MoneyLion Demo — Backend",
    tier: 2,
    entryId: "moneylion-demo",
    summary:
      "Node.js backend for the MoneyLion technical assessment, handling API normalization and validation.",
    stack: ["Node.js", "TypeScript", "Express"],
    links: [{ label: "GitHub", url: "https://github.com/osmarpetry/lion-be" }],
    status: "active",
    visualMode: "placeholder",
  },
  {
    repo: "bater-horas2",
    title: "Bater Horas 2",
    tier: 2,
    entryId: "bater-horas2",
    summary:
      "React time-tracking UI with room to connect design references and refine documentation around the product flow.",
    stack: ["React", "TypeScript", "date-fns"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/bater-horas2" },
    ],
    status: "active",
    visualMode: "placeholder",
  },
  {
    repo: "lumdb",
    title: "Lumdb",
    tier: 2,
    entryId: "lumdb",
    summary:
      "Earlier Firebase-hosted movie browser that still helps show progression in product UI and frontend architecture.",
    stack: ["React", "Redux", "Firebase", "PWA"],
    links: [{ label: "GitHub", url: "https://github.com/osmarpetry/lumdb" }],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "horas",
    title: "Horas",
    tier: 2,
    entryId: "horas",
    summary:
      "REST backend for time tracking with a legacy Java stack — an architecture story rather than a polished live demo.",
    stack: ["Java", "Maven", "MySQL", "Tomcat"],
    links: [{ label: "GitHub", url: "https://github.com/osmarpetry/horas" }],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "tokens-figma-node",
    title: "Tokens Figma Node",
    tier: 2,
    entryId: "tokens-figma-node",
    summary:
      "Utility script for turning design-token exports into CSS-friendly outputs — a tooling bridge between design and code.",
    stack: ["Node.js", "Design Tokens", "Figma"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/tokens-figma-node",
      },
    ],
    status: "active",
    visualMode: "placeholder",
  },
  {
    repo: "black-spotify",
    title: "Black Spotify",
    tier: 2,
    entryId: "black-spotify",
    summary:
      "Spotify-focused browser from an earlier phase of the portfolio, preserved as a progression card.",
    stack: ["React", "Redux", "Firebase", "Cypress"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/black-spotify" },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "weather-7",
    title: "Weather 7",
    tier: 2,
    entryId: "weather-7",
    summary:
      "Weather application with location-based forecasts and clean UI for displaying weather data.",
    stack: ["JavaScript", "Weather API"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/weather-7" },
      { label: "Live", url: "https://weather7-osmar.netlify.app/" },
    ],
    status: "active",
    visualMode: "placeholder",
  },
  {
    repo: "backend-appsync",
    title: "Backend AppSync",
    tier: 2,
    entryId: "backend-appsync",
    summary:
      "AWS AppSync-based backend with GraphQL API, demonstrating cloud-native data layer architecture.",
    stack: ["AWS AppSync", "GraphQL", "DynamoDB"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/backend-appsync" },
    ],
    status: "active",
    visualMode: "placeholder",
  },
  {
    repo: "infractions-hawaii",
    title: "Infractions Hawaii",
    tier: 2,
    entryId: "infractions-hawaii",
    summary:
      "Traffic infraction lookup interface for Hawaii, demonstrating data-heavy frontend with filtering and search.",
    stack: ["React", "TypeScript"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/infractions-hawaii",
      },
    ],
    status: "active",
    visualMode: "placeholder",
  },
  {
    repo: "forum",
    title: "Forum",
    tier: 2,
    entryId: "forum",
    summary:
      "Full-featured forum application with topics, replies, and user management.",
    stack: ["React", "Node.js"],
    links: [{ label: "GitHub", url: "https://github.com/osmarpetry/forum" }],
    status: "active",
    visualMode: "placeholder",
  },
  {
    repo: "forum-springbootadmin",
    title: "Forum Spring Boot Admin",
    tier: 2,
    entryId: "forum-springbootadmin",
    summary:
      "Spring Boot admin panel for the forum application, providing backend management and monitoring.",
    stack: ["Spring Boot", "Java", "Spring Boot Admin"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/forum-springbootadmin",
      },
    ],
    status: "active",
    visualMode: "placeholder",
  },
  {
    repo: "quizzler-flutter",
    title: "Quizzler Flutter",
    tier: 2,
    entryId: "quizzler-flutter",
    summary:
      "Flutter quiz application exploring cross-platform mobile development with Dart and Flutter UI patterns.",
    stack: ["Flutter", "Dart"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/quizzler-flutter",
      },
    ],
    status: "active",
    visualMode: "placeholder",
  },

  // ─── Tier 3 ────────────────────────────────────────────────────────────────
  {
    repo: "axios-server-herror-handler-component",
    title: "Axios Error Handler",
    tier: 3,
    entryId: "axios-server-herror-handler-component",
    summary:
      "React component for handling Axios server HTTP errors with a clean error boundary pattern.",
    stack: ["React", "Axios"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/axios-server-herror-handler-component",
      },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "bootstrap-resposive-site",
    title: "Bootstrap Responsive Site",
    tier: 3,
    entryId: "bootstrap-resposive-site",
    summary:
      "Responsive website exercise built with Bootstrap, exploring grid and component patterns.",
    stack: ["HTML", "CSS", "Bootstrap"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/bootstrap-resposive-site",
      },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "corebase-codeassment",
    title: "Corebase Assessment",
    tier: 3,
    entryId: "corebase-codeassment",
    summary:
      "Technical assessment project for Corebase, demonstrating frontend engineering approach.",
    stack: ["React", "TypeScript"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/corebase-codeassment",
      },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "CustomMuiDrawer",
    title: "Custom MUI Drawer",
    tier: 3,
    entryId: "CustomMuiDrawer",
    summary:
      "Custom Material UI Drawer component with extended functionality and theming support.",
    stack: ["React", "Material UI", "TypeScript"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/CustomMuiDrawer" },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "docker-react",
    title: "Docker React",
    tier: 3,
    entryId: "docker-react",
    summary:
      "React application containerized with Docker, demonstrating multi-stage build and deployment patterns.",
    stack: ["React", "Docker", "CI/CD"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/docker-react" },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "fotograf",
    title: "Fotograf",
    tier: 3,
    entryId: "fotograf",
    summary:
      "Photography portfolio or image gallery project exploring media-heavy UI patterns.",
    stack: ["React"],
    links: [{ label: "GitHub", url: "https://github.com/osmarpetry/fotograf" }],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "hello-go",
    title: "Hello Go",
    tier: 3,
    entryId: "hello-go",
    summary:
      "Go language learning project exploring idiomatic patterns, tooling, and standard library.",
    stack: ["Go"],
    links: [{ label: "GitHub", url: "https://github.com/osmarpetry/hello-go" }],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "lumdb-nextjs",
    title: "Lumdb Next.js",
    tier: 3,
    entryId: "lumdb-nextjs",
    summary:
      "Next.js port of the Lumdb movie browser, migrating from React+Firebase to a server-rendering approach.",
    stack: ["Next.js", "TypeScript"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/lumdb-nextjs" },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "nvim-configuration",
    title: "Neovim Configuration",
    tier: 3,
    entryId: "nvim-configuration",
    summary:
      "Personal Neovim configuration with LSP, plugins, and keybindings for a productive development workflow.",
    stack: ["Lua", "Neovim"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/nvim-configuration",
      },
    ],
    status: "active",
    visualMode: "placeholder",
  },
  {
    repo: "obisdian",
    title: "Obsidian Setup",
    tier: 3,
    entryId: "obisdian",
    summary:
      "Personal Obsidian notes and configuration, including themes, plugins, and organizational templates.",
    stack: ["Markdown", "Obsidian"],
    links: [{ label: "GitHub", url: "https://github.com/osmarpetry/obisdian" }],
    status: "active",
    visualMode: "placeholder",
  },
  {
    repo: "osmarpetry.me",
    title: "osmarpetry.me",
    tier: 3,
    entryId: "osmarpetry-me",
    summary:
      "Older Gatsby-based personal site now preserved as an archive of earlier frontend approaches.",
    stack: ["Gatsby", "React", "GraphQL"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/osmarpetry.me" },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "personal-blog-gatsby-trash",
    title: "Personal Blog (Gatsby)",
    tier: 3,
    entryId: "personal-blog-gatsby-trash",
    summary:
      "Gatsby blog prototype kept as a historical data point for progression tracking.",
    stack: ["Gatsby", "React", "GraphQL"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/personal-blog-gatsby-trash",
      },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "pirataflix",
    title: "Pirataflix",
    tier: 3,
    entryId: "pirataflix",
    summary:
      "Streaming UI concept exploring Netflix-style layout and media browsing patterns.",
    stack: ["React", "CSS"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/pirataflix" },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "pirataflix2",
    title: "Pirataflix 2",
    tier: 3,
    entryId: "pirataflix2",
    summary:
      "Second iteration of the Pirataflix streaming concept with improved architecture and features.",
    stack: ["React", "TypeScript"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/pirataflix2" },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "Portifolio",
    title: "Portfolio (this site)",
    tier: 3,
    entryId: "Portifolio",
    summary:
      "The current Eleventy-based portfolio site — infrastructure and design system for osmarpetry.dev.",
    stack: ["Eleventy", "Nunjucks", "CSS"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/Portifolio" },
    ],
    status: "active",
    visualMode: "placeholder",
  },
  {
    repo: "react-hook-ts-poc",
    title: "React Hook TS POC",
    tier: 3,
    entryId: "react-hook-ts-poc",
    summary:
      "Proof of concept exploring React hooks patterns with TypeScript for state and side-effect management.",
    stack: ["React", "TypeScript"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/react-hook-ts-poc",
      },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "react-performance-tips",
    title: "React Performance Tips",
    tier: 3,
    entryId: "react-performance-tips",
    summary:
      "Practical React performance techniques demonstrated with memoization, virtualization, and profiling.",
    stack: ["React", "TypeScript"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/react-performance-tips",
      },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "ritchie-workshop",
    title: "Ritchie Workshop",
    tier: 3,
    entryId: "ritchie-workshop",
    summary:
      "Workshop project for the Ritchie CLI framework, exploring formula creation and automation.",
    stack: ["Shell", "Ritchie CLI"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/ritchie-workshop",
      },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "simple-next",
    title: "Simple Next",
    tier: 3,
    entryId: "simple-next",
    summary:
      "Minimal Next.js starter demonstrating routing, data fetching, and deployment fundamentals.",
    stack: ["Next.js", "React"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/simple-next" },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "spring-animations",
    title: "Spring Animations",
    tier: 3,
    entryId: "spring-animations",
    summary:
      "Physics-based animation experiments using spring dynamics for natural motion in React.",
    stack: ["React", "Framer Motion"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/spring-animations",
      },
      {
        label: "Live",
        url: "https://react-spring-poc.netlify.app/",
      },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "storybook-class",
    title: "Storybook Class",
    tier: 3,
    entryId: "storybook-class",
    summary:
      "Storybook learning exercises building a documented component library with stories and controls.",
    stack: ["React", "Storybook", "TypeScript"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/storybook-class" },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "tcc-catolica",
    title: "TCC Católica",
    tier: 3,
    entryId: "tcc-catolica",
    summary:
      "University final project from Católica, kept as a historical milestone of early development work.",
    stack: ["HTML", "CSS", "JavaScript"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/tcc-catolica" },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "tech-assessment-fe",
    title: "Tech Assessment FE",
    tier: 3,
    entryId: "tech-assessment-fe",
    summary:
      "Frontend technical assessment demonstrating component architecture and data integration patterns.",
    stack: ["React", "TypeScript"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/osmarpetry/tech-assessment-fe",
      },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "teste",
    title: "Teste",
    tier: 3,
    entryId: "teste",
    summary:
      "Sandbox repository used for quick experiments and technology exploration.",
    stack: ["Various"],
    links: [{ label: "GitHub", url: "https://github.com/osmarpetry/teste" }],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "themis",
    title: "Themis",
    tier: 3,
    entryId: "themis",
    summary:
      "Application with a judicial or governance theme, exploring domain-specific UI patterns.",
    stack: ["React", "TypeScript"],
    links: [{ label: "GitHub", url: "https://github.com/osmarpetry/themis" }],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "todo",
    title: "Todo",
    tier: 3,
    entryId: "todo",
    summary:
      "Todo list application — a focused exercise in state management and CRUD UI patterns.",
    stack: ["React"],
    links: [{ label: "GitHub", url: "https://github.com/osmarpetry/todo" }],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "twitter-bot",
    title: "Twitter Bot",
    tier: 3,
    entryId: "twitter-bot",
    summary:
      "Twitter automation bot exploring the X/Twitter API for scheduled posting and engagement.",
    stack: ["Node.js", "Twitter API"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/twitter-bot" },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "xalgo",
    title: "XAlgo",
    tier: 3,
    entryId: "xalgo",
    summary:
      "Algorithm and data structure exercises — sorting, searching, and complexity analysis practice.",
    stack: ["JavaScript", "TypeScript"],
    links: [{ label: "GitHub", url: "https://github.com/osmarpetry/xalgo" }],
    status: "archive",
    visualMode: "placeholder",
  },
  {
    repo: "yan-template",
    title: "Yan Template",
    tier: 3,
    entryId: "yan-template",
    summary:
      "Project template with opinionated tooling setup for rapid frontend project scaffolding.",
    stack: ["React", "TypeScript", "Vite"],
    links: [
      { label: "GitHub", url: "https://github.com/osmarpetry/yan-template" },
    ],
    status: "archive",
    visualMode: "placeholder",
  },
];
