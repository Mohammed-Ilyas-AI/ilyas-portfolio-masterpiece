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
  role: "Technology Analyst / Angular Developer",
  tagline: "Building high-performance, enterprise-grade web applications",
  email: "Ilyas.fa007@gmail.com",
  phone: "+91 7397751255",
  linkedin: "https://www.linkedin.com/in/ilyasb/",
  github: "https://github.com/mohammedilyas",
  resumeUrl: "/Mohammed_Ilyas_Angular.pdf",
  
  roles: [
    "Angular Specialist",
    "Technology Analyst", 
    "Full-Stack Developer",
    "MEAN Stack Expert",
  ],
  
  about: `Seasoned Full-Stack Developer with over 7+ years of experience architecting and delivering scalable web applications using the MEAN Stack, with deep specialization in Angular (6+ years). Adept at building responsive, high-performance interfaces and robust backend services across diverse domains including finance, e-commerce, and enterprise platforms. Recognized for precision in UI/UX animation, theme toggling, and seamless user interaction design. Proven ability to lead cross-functional teams, drive technical strategy, and ensure delivery excellence through clean architecture, optimized code, and agile collaboration.`,
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "Angular 6-18+", level: 98, description: "Standalone Components, Signals, RxJS" },
      { name: "TypeScript", level: 95, description: "Advanced types, Generics, Decorators" },
      { name: "RxJS", level: 92, description: "Reactive patterns, Custom operators" },
      { name: "SASS/CSS3", level: 90, description: "Animations, Bootstrap, Tailwind CSS" },
      { name: "HTML5", level: 95, description: "Semantic markup, Accessibility" },
      { name: "PrimeNg", level: 88, description: "Component library, Theming" },
      { name: "Angular Material", level: 90, description: "Material Design components" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85, description: "Express, REST APIs, Microservices" },
      { name: "Express.js", level: 82, description: "Middleware, Authentication" },
      { name: "Python (Flask)", level: 70, description: "API development" },
      { name: "Java Spring Boot", level: 72, description: "Enterprise backend services" },
    ],
  },
  {
    title: "Database & ORM",
    skills: [
      { name: "MongoDB", level: 80, description: "Mongoose, Aggregation" },
      { name: "MySQL", level: 78, description: "Complex queries, Optimization" },
      { name: "PostgreSQL", level: 75, description: "Advanced queries" },
      { name: "Oracle", level: 72, description: "Enterprise database" },
      { name: "Firebase", level: 75, description: "Real-time database, Auth" },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 75, description: "Cloud services, S3, Lambda" },
      { name: "Docker", level: 78, description: "Containerization, Compose" },
      { name: "Kubernetes", level: 70, description: "Container orchestration" },
      { name: "Jenkins", level: 75, description: "CI/CD Pipelines" },
      { name: "Git", level: 92, description: "Advanced workflows, Bitbucket" },
    ],
  },
  {
    title: "Architecture & Patterns",
    skills: [
      { name: "MVC Pattern", level: 90, description: "Clean architecture" },
      { name: "RESTful APIs", level: 92, description: "API design, Integration" },
      { name: "Service Workers", level: 85, description: "Offline support, Caching" },
      { name: "Web Workers", level: 82, description: "Background processing" },
      { name: "Unit Testing", level: 88, description: "Jest, Jasmine" },
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Infosys Limited",
    role: "Technology Analyst / Full-Stack Developer",
    duration: "Dec 2022 - Present",
    location: "Chennai, India",
    responsibilities: [
      "Lead UI revamp of product and service pages using Angular 12+",
      "Develop secure Node.js middleware for handling customer data",
      "Facilitate client demos and technical workshops",
      "Architect dynamic Angular modules for real-time analytics",
    ],
    achievements: [
      "Achieved 20% faster release cycle and boosted user engagement",
      "Delivered 287 user stories within compressed timeline",
      "Implemented role-based access control (RBAC) for banking compliance",
      "Reduced operational downtime by 15% with offline-capable apps",
    ],
  },
  {
    id: "exp-2",
    company: "ASZ Technologies Limited",
    role: "Front-end Developer",
    duration: "Dec 2021 - Dec 2022",
    location: "Bengaluru, India",
    responsibilities: [
      "Structure and implement responsive hotel check-in interfaces",
      "Craft modular UI components with SCSS and TypeScript",
      "Provide UI/UX consulting to align design with business goals",
      "Architect real-time gaming analytics dashboards",
    ],
    achievements: [
      "Reduced manual workload by 40% through automation",
      "Achieved 30% boost in page load speed",
      "Implemented mobile-first gaming analytics interface",
      "Enabled seamless feature expansion through component architecture",
    ],
  },
  {
    id: "exp-3",
    company: "TVM InfoTech Private Limited",
    role: "UI/Frontend Developer",
    duration: "Dec 2019 - Nov 2021",
    location: "Chennai, India",
    responsibilities: [
      "Craft device-agnostic UI elements using Angular and PrimeNG",
      "Apply component-based architecture and route-level code splitting",
      "Enable region-specific filtering and multilingual capabilities",
      "Optimize client-side performance and DOM rendering",
    ],
    achievements: [
      "Delivered TN Schools Government website for statewide use",
      "Achieved 25% faster page load experience",
      "Enhanced inclusivity for diverse user groups",
      "Boosted scalability through modular architecture",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "TalkTalk Broadband Website",
    description: "End-to-end UI revamp of product and service pages with secure customer data handling and real-time updates for UK broadband provider.",
    techStack: ["Angular 12", "Node.js", "TypeScript", "HTML5", "SASS", "Bootstrap", "MongoDB"],
    role: "Lead UI Developer / MEAN Stack Developer",
    highlights: [
      "20% faster release cycle",
      "Improved Lighthouse scores",
      "Real-time customer interactions",
    ],
  },
  {
    id: "proj-2", 
    title: "Wabtec – Railway Department Management",
    description: "Cross-platform desktop applications for railway department management in Canada with offline access and real-time monitoring capabilities.",
    techStack: ["Angular", "TypeScript", "ElectronJS", "Service Worker", "Node.js", "Oracle"],
    role: "Full-Stack Developer",
    highlights: [
      "287 user stories delivered",
      "15% reduced downtime",
      "Offline-capable app",
    ],
  },
  {
    id: "proj-3",
    title: "BOFA – Search Analytics Platform",
    description: "Real-time search analytics platform for Bank of America enabling investigators to filter and visualize complex datasets with millisecond response times.",
    techStack: ["Angular 14", "Webix", "WebixJet", "TypeScript", "Oracle", "Java Spring Boot"],
    role: "Senior Angular Developer",
    highlights: [
      "Millisecond response times",
      "RBAC compliance",
      "Fraud detection workflows",
    ],
  },
  {
    id: "proj-4",
    title: "Web Check-in Hotel System",
    description: "Responsive hotel check-in interface automating guest onboarding with optimized frontend rendering and API performance for US hotels.",
    techStack: ["Angular 13", "TypeScript", "HTML5", "SCSS", "Bootstrap"],
    role: "UI Consultant",
    highlights: [
      "40% reduced manual work",
      "30% faster page load",
      "High conversion rates",
    ],
  },
  {
    id: "proj-5",
    title: "Byte Brew – Gaming Analytics Dashboard",
    description: "Real-time analytics interface monitoring player activity, match outcomes, and leaderboard dynamics for esports and mobile gaming platforms.",
    techStack: ["Angular 14", "Bootstrap", "CSS3", "TypeScript"],
    role: "UI Consultant",
    highlights: [
      "Live scoring system",
      "Heatmap overlays",
      "Mobile-first design",
    ],
  },
  {
    id: "proj-6",
    title: "TN Schools – Government Website",
    description: "Tamil Nadu Government Schools website with device-agnostic UI, region-specific filtering, and multilingual capabilities for statewide access.",
    techStack: ["Angular 10", "TypeScript", "HTML5", "CSS3", "PrimeNg"],
    role: "Angular Developer",
    highlights: [
      "Statewide deployment",
      "Multilingual support",
      "25% faster performance",
    ],
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
    title: "State Management",
    description: "NgRx store patterns, Signal-based state, optimistic updates, time-travel debugging",
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
    year: "2018",
  },
];

export const certifications = [
  "MEAN Stack Full Stack Master Professional - Simplilearn",
  "Mastery in Figma UI/UX - Guvi",
  "Graphics Design and Adobe Technologies",
  "AWS Cloud Practitioner (In Progress)",
];