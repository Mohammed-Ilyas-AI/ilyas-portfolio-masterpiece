// Portfolio data configuration - Easy to update projects and skills

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  highlights: string[];
  role?: string;
  image?: string;
  link?: string;
  github?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  description: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
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
  role: "Web Developer · AI-Powered Engineer",
  tagline: "Crafting high-performance, AI-augmented web experiences at enterprise scale",
  email: "Ilyas.fa007@gmail.com",
  phone: "+91 7397751255",
  linkedin: "https://www.linkedin.com/in/ilyasb/",
  github: "https://github.com/mohammedilyas",
  resumeUrl: "/Md_ilyas.pdf",
  
  roles: [
    "Senior Interaction Engineer",
    "AI-Augmented Developer",
    "Full-Stack Architect",
    "Angular & MEAN Stack Expert",
    "Web Performance Specialist",
  ],
  
  about: `Senior Frontend & Interaction Engineer with 7+ years of experience designing and owning high-scale, user-centric web applications using Angular and MEAN stack. Specialized in building interaction-heavy systems with strong guarantees on UX correctness, accessibility, and performance.

Proven track record of owning end-to-end frontend and API systems, ensuring contract stability, system reliability, and seamless user experiences across enterprise, fintech, and telecom platforms.

Actively leveraging AI-assisted development for component generation, test automation, edge-case discovery, and system behavior validation. Strong advocate of building correct, interpretable, and safe systems in AI-augmented engineering environments.`,
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend / Interaction",
    skills: [
      { name: "Angular 6–18+", level: 98, description: "Standalone Components, Signals, RxJS, SSR" },
      { name: "TypeScript", level: 95, description: "Advanced types, Generics, Decorators" },
      { name: "RxJS & Reactive Patterns", level: 93, description: "Custom operators, Stream composition" },
      { name: "Interaction Design", level: 90, description: "UX Correctness, Accessibility (WCAG)" },
      { name: "HTML5 / CSS3 / SASS", level: 94, description: "Semantic markup, Animations, Design Systems" },
      { name: "Tailwind CSS / Bootstrap", level: 90, description: "Utility-first & component frameworks" },
      { name: "PrimeNG / Angular Material", level: 88, description: "Enterprise UI component libraries" },
      { name: "PWA & Core Web Vitals", level: 88, description: "Lighthouse, Performance budgets, SEO" },
    ],
  },
  {
    title: "API & Backend",
    skills: [
      { name: "Node.js / Express.js", level: 85, description: "REST APIs, Middleware, Microservices" },
      { name: "API Design & Contracts", level: 88, description: "Versioning, Backward Compatibility, Contract Testing" },
      { name: "Python (Flask)", level: 70, description: "API development, Automation scripts" },
      { name: "Java Spring Boot", level: 72, description: "Enterprise backend services" },
    ],
  },
  {
    title: "AI-Augmented Engineering",
    skills: [
      { name: "AI-Assisted Code Generation", level: 85, description: "Copilot, ChatGPT, Cursor for UI & API code" },
      { name: "Automated Test Generation", level: 82, description: "Edge-case simulation, Behavior validation" },
      { name: "AI Performance Analysis", level: 80, description: "Bottleneck detection, UX inconsistency analysis" },
      { name: "Prompt Engineering", level: 78, description: "Effective AI collaboration, Context optimization" },
    ],
  },
  {
    title: "Data & Platform",
    skills: [
      { name: "MongoDB", level: 80, description: "Mongoose ORM, Aggregation pipelines" },
      { name: "MySQL / PostgreSQL", level: 78, description: "Query optimization, Data modeling" },
      { name: "Firebase", level: 75, description: "Real-time database, Auth, Firestore" },
      { name: "Data Validation Patterns", level: 80, description: "Consistency, Transformation, Access patterns" },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "Docker & Kubernetes", level: 76, description: "Containerization, Orchestration" },
      { name: "CI/CD (Jenkins)", level: 78, description: "Pipelines, Rollback strategies" },
      { name: "AWS (EC2, S3)", level: 72, description: "Cloud deployment, Scaling" },
      { name: "Git / Bitbucket", level: 92, description: "Advanced workflows, Code reviews" },
    ],
  },
  {
    title: "Testing & QA",
    skills: [
      { name: "Jest / Jasmine / Karma", level: 88, description: "Unit & Component Testing" },
      { name: "Cypress / E2E Testing", level: 80, description: "Integration, User flow validation" },
      { name: "Cross-Browser Testing", level: 85, description: "Multi-platform compatibility" },
      { name: "AI-Driven Test Automation", level: 78, description: "Edge-case discovery, Auto-generated tests" },
    ],
  },
  {
    title: "Architecture & Patterns",
    skills: [
      { name: "Component Architecture", level: 92, description: "Scalable design systems, Module federation" },
      { name: "State Management", level: 90, description: "NgRx, Signals, Optimistic updates" },
      { name: "Service Workers", level: 85, description: "Offline support, Caching strategies" },
      { name: "SOLID / Clean Architecture", level: 88, description: "Design patterns, Maintainability" },
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Infosys Limited",
    role: "Technology Analyst / Senior Software Developer",
    duration: "Dec 2022 - Present",
    location: "Chennai, India",
    responsibilities: [
      "Own end-to-end frontend architecture for customer-facing broadband platform",
      "Design scalable Angular systems ensuring UX correctness and accessibility compliance",
      "Leverage AI-assisted tools for component generation, testing, and edge-case discovery",
      "Architect high-performance Angular modules enabling real-time analytics",
    ],
    achievements: [
      "Improved release velocity by 20% and boosted user engagement",
      "Delivered 280+ user stories in agile environment with strong ownership",
      "Built cross-platform desktop apps with offline-first capabilities using ElectronJS",
      "Implemented RBAC, audit logging, and compliance-driven UI for banking platform",
    ],
  },
  {
    id: "exp-2",
    company: "ASZ Technologies Limited",
    role: "Frontend Engineer / UI Consultant",
    duration: "Dec 2021 - Nov 2022",
    location: "Bengaluru, India",
    responsibilities: [
      "Design responsive Angular-based onboarding systems",
      "Build reusable UI components improving maintainability and scalability",
      "Develop real-time dashboards with advanced visualizations",
      "Collaborate with product teams to enhance UX clarity",
    ],
    achievements: [
      "Reduced manual workload by 40% through automation",
      "Boosted user engagement by 30% through UX refinements",
      "Implemented mobile-first gaming analytics interface",
      "Delivered responsive hotel check-in system for US market",
    ],
  },
  {
    id: "exp-3",
    company: "TVM InfoTech Private Limited",
    role: "UI / Frontend Developer",
    duration: "Dec 2019 - Nov 2021",
    location: "Chennai, India",
    responsibilities: [
      "Build scalable Angular UI with multi-device compatibility",
      "Implement modular architecture with lazy loading and route optimization",
      "Enable region-specific filtering and multilingual capabilities",
      "Deliver inclusive UX solutions improving accessibility",
    ],
    achievements: [
      "Delivered TN Schools Government website for statewide use",
      "Improved application performance by 25% through DOM optimization",
      "Enhanced inclusivity for diverse user groups",
      "Built scalable component architecture for future expansion",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "TalkTalk Broadband Platform",
    description: "End-to-end frontend architecture for UK broadband provider. Owned customer-facing platform with secure data handling, real-time updates, and AI-assisted development workflows.",
    techStack: ["Angular 12+", "Node.js", "TypeScript", "RxJS", "SASS", "Bootstrap", "MongoDB"],
    role: "Lead Frontend / Full-Stack Engineer",
    highlights: [
      "20% faster release velocity",
      "AI-assisted component generation & testing",
      "Accessibility compliance across critical user journeys",
    ],
    link: "https://www.talktalk.co.uk/",
  },
  {
    id: "proj-2", 
    title: "Wabtec – Railway Management System",
    description: "Cross-platform desktop applications for railway department management in Canada with offline-first capabilities, real-time system visibility, and resilient UI flows with fallback handling.",
    techStack: ["Angular", "TypeScript", "ElectronJS", "Service Worker", "Node.js", "Oracle"],
    role: "Full-Stack Engineer",
    highlights: [
      "280+ user stories delivered",
      "15% reduced operational downtime",
      "Offline-capable with fallback handling",
    ],
    link: "https://www.wabteccorp.com/",
  },
  {
    id: "proj-3",
    title: "BOFA – Search Analytics Platform",
    description: "High-performance real-time search analytics platform for Bank of America. Built complex interaction systems including entity relationship graphs, timelines, and investigation dashboards.",
    techStack: ["Angular 14", "Webix", "WebixJet", "TypeScript", "Oracle", "Java Spring Boot"],
    role: "Full-Stack Engineer",
    highlights: [
      "Millisecond-latency analytics",
      "RBAC & compliance-driven UI",
      "Entity relationship graphs & investigation dashboards",
    ],
    link: "https://www.bankofamerica.com/",
  },
  {
    id: "proj-4",
    title: "Hotel Web Check-in System",
    description: "Responsive Angular-based onboarding system automating guest check-in, reducing manual effort by 40% with optimized frontend rendering and API performance for US hospitality.",
    techStack: ["Angular 13", "TypeScript", "HTML5", "SCSS", "Bootstrap"],
    role: "UI Consultant",
    highlights: [
      "40% reduced manual effort",
      "30% boost in engagement",
      "Reusable component library",
    ],
    link: "https://www.marriott.com/",
  },
  {
    id: "proj-5",
    title: "Gaming Analytics Dashboard",
    description: "Real-time analytics dashboard monitoring player activity, match outcomes, and leaderboard dynamics with advanced visualizations and mobile-first responsive design.",
    techStack: ["Angular 14", "Bootstrap", "CSS3", "TypeScript", "Highcharts"],
    role: "UI Consultant / Frontend Engineer",
    highlights: [
      "Real-time data visualizations",
      "Mobile-first responsive UI",
      "Advanced interaction flows",
    ],
    link: "https://www.bytebrew.io/",
  },
  {
    id: "proj-6",
    title: "TN Schools – Government Platform",
    description: "Tamil Nadu Government Schools website with scalable Angular UI, multi-device compatibility, region-specific filtering, multilingual support, and inclusive UX for statewide deployment.",
    techStack: ["Angular 10", "TypeScript", "HTML5", "CSS3", "PrimeNG"],
    role: "Angular Developer",
    highlights: [
      "Statewide deployment",
      "Multilingual & accessible",
      "25% performance improvement",
    ],
    link: "https://tnschools.gov.in/welcome",
  },
];

export const architectureHighlights = [
  {
    title: "Angular CDK Implementations",
    description: "Custom drag-drop dashboard builder, virtual scrolling for large datasets, overlay management for modals",
    icon: "layers",
  },
  {
    title: "Web Workers Integration",
    description: "Offloading heavy computations, background data processing, maintaining 60fps UI responsiveness",
    icon: "cpu",
  },
  {
    title: "High-Performance Charts",
    description: "Rendering 100K+ data points smoothly, real-time updates, custom optimized renderers",
    icon: "chart",
  },
  {
    title: "Advanced Caching",
    description: "Service Worker caching, HTTP interceptor caching, IndexedDB for offline support",
    icon: "database",
  },
  {
    title: "Scalable Architecture",
    description: "Micro-frontend setup, module federation, lazy loading strategies, shared libraries",
    icon: "grid",
  },
  {
    title: "AI-Augmented Workflows",
    description: "AI-assisted code generation, automated test creation, edge-case discovery, performance analysis",
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
  "MEAN Stack Full Stack Master Professional - Simplilearn",
  "Mastery in Figma UI/UX, Angular, HTML & CSS, JavaScript, jQuery, Git, MongoDB, AWS - Guvi",
  "Graphics Design and Adobe Technologies",
  "AWS Cloud Practitioner (In Progress)",
];
