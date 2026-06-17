// Portfolio data — positioning, case studies, capabilities, trust signals

export interface CaseStudy {
  id: string;
  title: string;
  client: string; // anonymized client descriptor (e.g. "UK Telecom")
  description: string; // one-line summary
  context: string; // problem / why it mattered
  solution: string; // system overview & key decisions
  architecture: string[]; // bullets — frontend/backend/data flow
  challenges: string[]; // technical blockers, debugging
  decisions: string[]; // engineering trade-offs
  techStack: string[];
  impact: string[]; // outcomes (numbers + business value)
  highlights: string[]; // short card bullets
  role: string;
  link?: string;
  image?: string;
  github?: string;
}

// Backwards compatibility alias used by existing components
export type Project = CaseStudy;

export interface Capability {
  title: string;
  outcome: string; // what business problem this solves
  details: string[]; // concrete things I do
  icon: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  responsibilities: string[];
  achievements: string[];
}

export const profileData = {
  name: "Mohammed Ilyas B",
  role: "Full-Stack Engineer · Production Delivery · AI-Augmented Workflows",
  tagline:
    "I ship production-ready systems fast, fix critical bugs at the root, and scale Angular + Node.js platforms with AI-augmented workflows.",
  email: "Ilyas.fa007@gmail.com",
  phone: "+91 7397751255",
  linkedin: "https://www.linkedin.com/in/ilyasb/",
  github: "https://github.com/mohammedilyas",
  resumeUrl: "/__l5e/assets-v1/8e6e54b7-1bc7-4dd4-99be-88558be9199f/Mohammed_Ilyas_CV.pdf",

  // Hero rotating headline
  roles: [
    "Full-Stack Engineer",
    "Production Bug Hunter",
    "Angular & Node.js Specialist",
    "AI-Augmented Developer",
    "System Architect — Web at Scale",
  ],

  // Hero proof chips
  proofChips: [
    "7+ yrs production",
    "50+ projects delivered",
    "40% avg perf gains",
    "Critical bugs · <24h fix",
    "Open: Remote · Dubai · Onsite",
  ],

  // Trust line under hero
  oneLiner:
    "Senior Full-Stack Engineer trusted by enterprise teams across UK, US, Canada and India to design, debug and scale production web platforms.",

  about: `I'm a Full-Stack Engineer with 7+ years of hands-on production delivery — Angular, Node.js, TypeScript, MongoDB and the surrounding stack. My work sits where business outcomes meet engineering reality: shipping features under real deadlines, debugging critical incidents at the root, and turning slow, brittle apps into fast, reliable systems.

I think problem-first. Before writing code, I model the system, the failure modes and the contract. Then I deliver — fast, reviewed, instrumented, and observable. I lean heavily on AI-augmented workflows (Copilot, Cursor, LLM-driven test generation) as a force multiplier, not a crutch — every line still passes engineering judgment.

Available for senior full-stack roles and freelance contracts. Open to Remote, Dubai relocation, or onsite engagements globally.`,
};

// What I solve — outcome-first
export const valuePropositions = [
  {
    icon: "bug",
    outcome: "Reduce debugging time from days to hours",
    detail:
      "I trace incidents from logs to root cause to fix — network, state, race conditions, memory leaks, broken contracts. No guess-and-patch.",
  },
  {
    icon: "rocket",
    outcome: "Build scalable full-stack systems from scratch",
    detail:
      "Angular + Node.js + DB, designed for change. Modular boundaries, typed contracts, predictable state, observable failure modes.",
  },
  {
    icon: "gauge",
    outcome: "Recover slow or broken applications",
    detail:
      "Lighthouse audits, bundle analysis, render profiling, query tuning. Typical wins: 40% faster load, 45% smaller bundles, jank-free UI.",
  },
  {
    icon: "zap",
    outcome: "Deliver features faster with AI-augmented workflows",
    detail:
      "Copilot/Cursor for scaffolding, LLM-driven edge-case discovery, AI-assisted test generation — without sacrificing quality or correctness.",
  },
];

// Trust signals — anonymized client outcomes
export const trustSignals = [
  {
    geo: "UK · Telecom",
    project: "Customer broadband platform",
    outcome:
      "Owned the customer-facing frontend during a major migration. Released 280+ stories with zero high-severity regressions; release velocity up 20%.",
    metric: "+20% velocity",
  },
  {
    geo: "Canada · Rail / Industrial",
    project: "Cross-platform desktop ops tooling",
    outcome:
      "Built offline-first Angular + Electron tooling for field operators. Reduced operational downtime by ~15% with resilient UI fallbacks.",
    metric: "−15% downtime",
  },
  {
    geo: "USA · Banking",
    project: "Real-time investigation analytics",
    outcome:
      "Engineered millisecond-latency search analytics with RBAC, audit logs and complex relationship graphs across millions of records.",
    metric: "ms latency · RBAC",
  },
  {
    geo: "USA · Hospitality",
    project: "Hotel web check-in",
    outcome:
      "Redesigned guest onboarding flow. Manual front-desk effort dropped 40%; engagement up 30% on a reusable Angular component library.",
    metric: "−40% manual effort",
  },
  {
    geo: "Global · Gaming",
    project: "Player analytics dashboard",
    outcome:
      "Real-time match + leaderboard analytics with mobile-first UX, smooth on low-end Android. Advanced charting without dropping frames.",
    metric: "60fps · mobile-first",
  },
  {
    geo: "India · Government / Education",
    project: "Statewide schools portal",
    outcome:
      "Multilingual, accessible Angular portal for statewide rollout. Lazy-loaded route splits cut initial load by ~25%.",
    metric: "−25% load time",
  },
];

// Engineering mindset — how I think
export const engineeringMindset = [
  {
    title: "Problem first, code second",
    detail:
      "I model the user, the data, and the failure modes before opening the editor. Half my best wins come from deleting code, not writing it.",
  },
  {
    title: "Modular, testable, replaceable",
    detail:
      "Components and services with clear boundaries. Anything I build should be safe to delete or swap in 12 months without a rewrite.",
  },
  {
    title: "Built for production, not the demo",
    detail:
      "Loading states, empty states, error states, retries, offline, slow networks, RBAC. Production is where my designs are evaluated.",
  },
  {
    title: "Performance as a feature",
    detail:
      "Render profiling, virtual scrolling, code splitting, signal-based change detection, query caching — measured against budgets, not vibes.",
  },
  {
    title: "Observability over guessing",
    detail:
      "Structured logs, telemetry, error boundaries, replay-friendly state. When something breaks at 2am, the system explains itself.",
  },
  {
    title: "AI as leverage, not autopilot",
    detail:
      "Copilot/Cursor accelerate scaffolding and edge cases. Architecture, contracts, and judgement stay human and reviewed.",
  },
];

// Capabilities — what I can do for you (not a tool list)
export const capabilities: Capability[] = [
  {
    icon: "frontend",
    title: "Frontend systems at scale",
    outcome: "Ship interaction-heavy Angular apps that stay fast as they grow.",
    details: [
      "Angular 6 → 18+ (Standalone, Signals, SSR, Module Federation)",
      "Reactive state with RxJS / NgRx, optimistic updates, predictable data flow",
      "Design systems with PrimeNG, Material, Tailwind — accessibility built in (WCAG)",
      "PWAs, service workers, offline-first, Core Web Vitals tuned",
    ],
  },
  {
    icon: "backend",
    title: "Backend & API engineering",
    outcome: "Design Node.js APIs that other teams can rely on without surprises.",
    details: [
      "Node.js / Express REST APIs with versioning and contract stability",
      "MongoDB / MySQL / PostgreSQL — modeling, indexing, query tuning",
      "Auth, RBAC, audit logging, request validation, rate limiting",
      "Integrations with Java Spring Boot and Python (Flask) services",
    ],
  },
  {
    icon: "debug",
    title: "Production debugging & incident response",
    outcome: "Turn vague \"it's broken\" reports into shipped fixes within hours.",
    details: [
      "Logs → reproduction → root cause → minimal patch → regression test",
      "Memory leaks, change-detection storms, RxJS subscription bugs, API race conditions",
      "Lighthouse / Chrome perf audits, bundle analysis, hydration issues",
      "Postmortems and guardrails so the same class of bug never returns",
    ],
  },
  {
    icon: "ai",
    title: "AI-augmented delivery",
    outcome: "Move 2–3× faster on UI, tests, and edge cases without losing quality.",
    details: [
      "Copilot, Cursor, ChatGPT for scaffolding, refactors, code reviews",
      "LLM-driven test generation, edge-case discovery, behavior validation",
      "Prompt engineering for repeatable engineering workflows",
      "AI-assisted documentation and onboarding for teams",
    ],
  },
  {
    icon: "arch",
    title: "Architecture & delivery ownership",
    outcome: "Take a feature from rough idea to shipped, observable production code.",
    details: [
      "Component & module architecture, lazy loading, monorepos (Nx)",
      "CI/CD with Jenkins / GitHub Actions, Docker, AWS (EC2, S3)",
      "SOLID, clean architecture, code review culture",
      "Direct client communication, sprint planning, delivery accountability",
    ],
  },
];

// Skills retained for the existing SkillsSection (used by the legacy view if needed)
export interface Skill {
  name: string;
  level: number;
  description: string;
}
export interface SkillCategory {
  title: string;
  skills: Skill[];
}
export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend / Angular",
    skills: [
      { name: "Angular 6–18+", level: 98, description: "Standalone, Signals, RxJS, SSR" },
      { name: "TypeScript", level: 95, description: "Generics, types, decorators" },
      { name: "RxJS", level: 93, description: "Custom operators, stream composition" },
      { name: "HTML / CSS / SASS / Tailwind", level: 94, description: "Design systems, accessibility" },
    ],
  },
  {
    title: "Backend / API",
    skills: [
      { name: "Node.js / Express", level: 88, description: "REST, middleware, microservices" },
      { name: "MongoDB / SQL", level: 82, description: "Modeling, indexing, query tuning" },
      { name: "API Contracts", level: 88, description: "Versioning, backward compatibility" },
      { name: "Java / Python", level: 72, description: "Spring Boot, Flask integrations" },
    ],
  },
  {
    title: "AI-Augmented Engineering",
    skills: [
      { name: "Copilot / Cursor", level: 90, description: "Daily-driver, reviewed, tested" },
      { name: "LLM Test Generation", level: 85, description: "Edge-case discovery, validation" },
      { name: "Prompt Engineering", level: 82, description: "Repeatable engineering workflows" },
      { name: "AI Performance Analysis", level: 80, description: "Bottlenecks, UX inconsistencies" },
    ],
  },
];

// Reframed experience — production delivery + freelance ownership
export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Infosys Limited — Enterprise Clients (UK / Canada / USA)",
    role: "Senior Full-Stack Engineer · Technology Analyst",
    duration: "Dec 2022 — Present",
    location: "Remote · India",
    responsibilities: [
      "Own end-to-end frontend architecture for customer-facing platforms (telecom, rail, banking)",
      "Design Angular systems for UX correctness, accessibility and performance budgets",
      "Lead production debugging on critical incidents — root cause within hours",
      "Apply AI-augmented workflows for component scaffolding, tests and edge cases",
    ],
    achievements: [
      "Released 280+ stories across releases with zero high-severity regressions",
      "Improved release velocity by 20% across two enterprise programmes",
      "Built offline-first Angular + Electron tooling cutting field downtime ~15%",
      "Engineered millisecond-latency analytics with RBAC + audit logging for a US bank",
    ],
  },
  {
    id: "exp-2",
    company: "Freelance & Consulting — Global Clients",
    role: "Freelance Full-Stack Engineer (50+ projects delivered)",
    duration: "2018 — Present",
    location: "Remote · Worldwide",
    responsibilities: [
      "Direct client engagement: requirements, scoping, delivery and handover",
      "Build production Angular + Node.js systems end-to-end, from schema to UI",
      "Diagnose and fix slow / broken legacy apps shipped by other teams",
      "Own performance budgets, accessibility, deployment and post-launch support",
    ],
    achievements: [
      "Shipped 50+ production projects across telecom, fintech, hospitality, gaming and govtech",
      "Recovered legacy apps with 40% faster load and 45% smaller bundles",
      "Resolved critical production bugs with <24h turnaround for paying clients",
      "Maintained 100% on-time delivery on fixed-scope contracts",
    ],
  },
  {
    id: "exp-3",
    company: "ASZ Technologies — Bengaluru, India",
    role: "Frontend Engineer / UI Consultant",
    duration: "Dec 2021 — Nov 2022",
    location: "Bengaluru, India",
    responsibilities: [
      "Designed responsive Angular onboarding systems",
      "Built reusable component libraries used across multiple products",
      "Delivered real-time dashboards with advanced visualizations",
    ],
    achievements: [
      "Reduced manual workload by 40% via automation",
      "Boosted user engagement by 30% through UX refinements",
      "Delivered hotel check-in system for a US hospitality client",
    ],
  },
  {
    id: "exp-4",
    company: "TVM InfoTech — Chennai, India",
    role: "UI / Frontend Developer",
    duration: "Dec 2019 — Nov 2021",
    location: "Chennai, India",
    responsibilities: [
      "Built scalable Angular UI with multi-device compatibility",
      "Implemented modular architecture with lazy loading and route optimization",
      "Delivered multilingual, accessible interfaces for statewide deployment",
    ],
    achievements: [
      "Delivered TN Schools statewide government portal",
      "Improved app performance by 25% via DOM and route optimization",
    ],
  },
];

// Engineering case studies (replaces shallow project list)
export const projects: CaseStudy[] = [
  {
    id: "proj-1",
    title: "TalkTalk Broadband Platform",
    client: "UK · Telecom (Enterprise)",
    role: "Lead Frontend / Full-Stack Engineer",
    description:
      "Customer-facing broadband platform serving millions of UK households. Owned frontend architecture and contract stability through a major migration.",
    context:
      "Legacy customer portal blocking new product launches. Slow releases, fragile UI, regressions reaching production. Business needed faster feature delivery without sacrificing reliability for paying customers.",
    solution:
      "Re-architected the frontend into modular Angular feature areas with typed API contracts and strict release gates. Introduced AI-augmented scaffolding and test generation to compress story delivery time.",
    architecture: [
      "Angular 12+ standalone features with strict typing and shared design system",
      "RxJS-based state for live account, billing and usage streams",
      "Node.js BFF aggregating downstream services with versioned contracts",
      "Feature flags and progressive rollout for risky changes",
    ],
    challenges: [
      "High-traffic flows with strict SLA — could not regress checkout or billing",
      "Multiple downstream services with inconsistent contracts and timing",
      "Cross-team dependencies and frequent schema drift in production",
    ],
    decisions: [
      "Chose typed contracts + runtime validation over silent failures",
      "Pushed business logic into pure services so UI stayed thin and testable",
      "Adopted AI-augmented test generation to cover edge cases at story level",
    ],
    techStack: ["Angular 12+", "TypeScript", "Node.js", "RxJS", "SASS", "Bootstrap", "MongoDB"],
    impact: [
      "Release velocity up ~20% across the programme",
      "280+ user stories delivered with zero high-severity regressions",
      "Accessibility compliance restored across critical user journeys",
    ],
    highlights: ["+20% release velocity", "AI-augmented delivery", "Zero high-sev regressions"],
    link: "https://www.talktalk.co.uk/",
  },
  {
    id: "proj-2",
    title: "Wabtec — Railway Operations Tooling",
    client: "Canada · Rail / Industrial",
    role: "Full-Stack Engineer",
    description:
      "Cross-platform desktop tools for rail operators in environments with unreliable connectivity. Offline-first, resilient, hardware-aware UI.",
    context:
      "Field operators were losing time to flaky connectivity and brittle tooling. Failures in the UI cascaded into operational downtime — a direct cost to the business.",
    solution:
      "Built an Angular + Electron application with an offline-first data layer, deterministic sync, and resilient UI fallbacks. Background workers handled heavy ops without blocking the UI.",
    architecture: [
      "Angular UI hosted in Electron with native shell integration",
      "Service Worker + IndexedDB for offline-capable data and queued mutations",
      "Conflict resolution + reconciliation on reconnect",
      "Node.js sync layer over Oracle backend",
    ],
    challenges: [
      "Conflict resolution between offline edits and authoritative server state",
      "Predictable performance on lower-spec field hardware",
      "Coordinating 280+ user stories across distributed teams",
    ],
    decisions: [
      "Idempotent mutations + monotonic clocks to make sync deterministic",
      "Web Workers for heavy ops to keep the UI at 60fps",
      "Strict UI states for connectivity, sync and failure",
    ],
    techStack: ["Angular", "TypeScript", "ElectronJS", "Service Worker", "Node.js", "Oracle"],
    impact: [
      "~15% reduction in operational downtime",
      "280+ stories shipped across the programme",
      "Predictable offline UX validated by field operators",
    ],
    highlights: ["−15% downtime", "Offline-first", "60fps under load"],
    link: "https://www.wabteccorp.com/",
  },
  {
    id: "proj-3",
    title: "Bank of America — Investigation Analytics",
    client: "USA · Banking / Compliance",
    role: "Full-Stack Engineer",
    description:
      "Real-time search analytics for compliance investigators — entity graphs, timelines and evidence dashboards over millions of records.",
    context:
      "Investigators needed to navigate huge, sensitive datasets in real time. Latency, RBAC and auditability were non-negotiable. Existing tools were slow and inflexible.",
    solution:
      "Designed an interaction-heavy Angular UI on top of a low-latency Java/Oracle backend, with strict RBAC, audit logging and reusable graph/timeline components.",
    architecture: [
      "Angular 14 + Webix for high-density data UIs",
      "WebixJet routing with lazy-loaded investigation modules",
      "Java Spring Boot services over Oracle with tuned indices",
      "Server-side RBAC enforced again on every UI mutation",
    ],
    challenges: [
      "Rendering large entity-relationship graphs without dropping frames",
      "RBAC complexity with overlapping investigator roles",
      "Maintaining audit integrity across every UI action",
    ],
    decisions: [
      "Virtualized rendering for tables and graphs at scale",
      "Centralized permission resolver consumed by both UI and API layers",
      "Append-only audit model — no client-side mutation of evidence",
    ],
    techStack: ["Angular 14", "Webix", "WebixJet", "TypeScript", "Oracle", "Java Spring Boot"],
    impact: [
      "Millisecond-latency interactions over millions of records",
      "RBAC + audit logging compliant with banking controls",
      "Reusable investigation primitives across multiple teams",
    ],
    highlights: ["ms-latency UI", "RBAC + audit", "Investigation graphs"],
    link: "https://www.bankofamerica.com/",
  },
  {
    id: "proj-4",
    title: "Hotel Web Check-in",
    client: "USA · Hospitality",
    role: "UI Consultant / Frontend Engineer",
    description:
      "Guest onboarding flow that replaced manual front-desk steps for a US hotel chain. Reusable Angular component library underneath.",
    context:
      "Front-desk congestion and slow check-in were hurting guest experience and operating cost. Existing flows were inconsistent and not mobile-friendly.",
    solution:
      "Designed a responsive Angular check-in flow with strict form validation, payment integration and reusable primitives that the team could ship across other products.",
    architecture: [
      "Angular 13 with feature-based modules",
      "Reusable form, layout and feedback components",
      "Integration with payment provider via typed API contracts",
      "Responsive layout system optimized for mobile-first guests",
    ],
    challenges: [
      "Wide device range — desktop kiosks to low-end mobile browsers",
      "Strict validation around guest data and payments",
      "Migrating teams off ad-hoc components onto a shared library",
    ],
    decisions: [
      "Component library first, screens second — to enforce consistency",
      "Validation-as-data so business rules could change without UI rewrites",
      "Performance budgets enforced in CI",
    ],
    techStack: ["Angular 13", "TypeScript", "HTML5", "SCSS", "Bootstrap"],
    impact: [
      "Manual front-desk effort reduced ~40%",
      "Engagement with the digital flow up ~30%",
      "Component library adopted across additional products",
    ],
    highlights: ["−40% manual effort", "+30% engagement", "Reusable design system"],
    link: "https://www.marriott.com/",
  },
  {
    id: "proj-5",
    title: "Gaming Analytics Dashboard",
    client: "Global · Gaming",
    role: "Frontend Engineer",
    description:
      "Real-time analytics for player activity, match outcomes and leaderboards. Mobile-first, advanced charting, smooth on low-end Android.",
    context:
      "Studios needed live signal on player behaviour without sending engineers into BI tools. Charts had to stay smooth even when streaming high-frequency events.",
    solution:
      "Built an Angular dashboard with virtualized lists, throttled streams and a charting layer tuned for high update rates on low-end devices.",
    architecture: [
      "Angular 14 with reactive data streams",
      "Highcharts with custom render strategies for high-frequency updates",
      "Mobile-first responsive grid",
      "Backpressure-aware streaming layer",
    ],
    challenges: [
      "Maintaining 60fps with thousands of events per second",
      "Designing for thumb-driven mobile UX without losing density",
      "Avoiding memory growth on long-lived sessions",
    ],
    decisions: [
      "Throttle + window streams instead of rendering every event",
      "Recycled DOM for lists; canvas/WebGL fallbacks where needed",
      "Strict component cleanup on route changes",
    ],
    techStack: ["Angular 14", "TypeScript", "Highcharts", "Bootstrap", "CSS3"],
    impact: [
      "60fps streaming UI on mid-range devices",
      "Real-time leaderboard adopted by multiple studios",
      "Reduced engineering time spent on bespoke reporting",
    ],
    highlights: ["60fps streaming", "Mobile-first", "High-frequency charts"],
    link: "https://www.bytebrew.io/",
  },
  {
    id: "proj-6",
    title: "TN Schools — Government Portal",
    client: "India · Government / Education",
    role: "Angular Developer",
    description:
      "Statewide schools portal — multilingual, accessible, optimized for the realities of rural connectivity and shared devices.",
    context:
      "A statewide audience meant low-bandwidth users, shared devices and accessibility requirements. The portal had to load fast and work for everyone.",
    solution:
      "Built a lazy-loaded Angular app with route-level code splitting, strong i18n, and accessibility baked into shared components.",
    architecture: [
      "Angular 10 with route-level code splitting",
      "PrimeNG-based design system with WCAG-compliant defaults",
      "i18n with multilingual content delivery",
      "Asset and image optimization for low-bandwidth users",
    ],
    challenges: [
      "Low-bandwidth and older-device constraints",
      "Multilingual content with non-Latin scripts",
      "Accessibility expectations for a public service",
    ],
    decisions: [
      "Initial route minimal; everything else lazy",
      "Locale-aware routing and content negotiation",
      "Semantic HTML + ARIA conventions enforced in components",
    ],
    techStack: ["Angular 10", "TypeScript", "HTML5", "CSS3", "PrimeNG"],
    impact: [
      "Initial load time reduced ~25%",
      "Statewide rollout to a public audience",
      "Multilingual + accessible by default",
    ],
    highlights: ["−25% initial load", "Statewide rollout", "WCAG-compliant"],
    link: "https://tnschools.gov.in/welcome",
  },
];

export const architectureHighlights = [
  {
    title: "Angular CDK at scale",
    description:
      "Drag-drop dashboard builders, virtual scrolling for 100K+ rows, overlay/portal management for complex flows.",
    icon: "layers",
  },
  {
    title: "Web Workers + offline-first",
    description:
      "Heavy computation off the UI thread, IndexedDB-backed offline state, deterministic sync on reconnect.",
    icon: "cpu",
  },
  {
    title: "High-frequency data UI",
    description:
      "Streaming charts, virtualized tables, throttled updates — designed to stay at 60fps on mid-range hardware.",
    icon: "chart",
  },
  {
    title: "Caching & data layers",
    description:
      "HTTP interceptor caches, service-worker assets, IndexedDB persistence, query-level revalidation.",
    icon: "database",
  },
  {
    title: "Modular delivery",
    description:
      "Lazy-loaded routes, module federation, monorepo (Nx) patterns and shared libraries with strict APIs.",
    icon: "grid",
  },
  {
    title: "AI-augmented workflows",
    description:
      "Copilot/Cursor for scaffolding, LLM-driven test generation, AI-assisted edge-case discovery and code review.",
    icon: "refresh",
  },
];

export const education = [
  {
    degree: "Post Graduate Diploma in Data Science and Engineering",
    institution: "Great Lakes Institute of Management",
    year: "2021",
  },
  {
    degree: "Bachelor of Science (B.Sc.) in Computer Science",
    institution: "Jamal Mohammed College",
    year: "2015",
  },
];

export const certifications = [
  "MEAN Stack Full Stack Master Professional — Simplilearn",
  "Mastery in Figma UI/UX, Angular, HTML & CSS, JavaScript, jQuery, Git, MongoDB, AWS — Guvi",
  "Graphics Design and Adobe Technologies",
  "AWS Cloud Practitioner (In Progress)",
];
