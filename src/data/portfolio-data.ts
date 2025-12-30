// Portfolio data configuration - Easy to update projects and skills

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  highlights: string[];
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
  role: "Senior Front-End Developer",
  tagline: "Building high-performance, enterprise-grade web applications",
  email: "contact@mohammedilyas.dev",
  linkedin: "https://linkedin.com/in/mohammedilyas",
  github: "https://github.com/mohammedilyas",
  resumeUrl: "/resume.pdf",
  
  roles: [
    "Angular Specialist",
    "Front-End Architect", 
    "Full-Stack Developer",
    "Performance Expert",
  ],
  
  about: `Senior Front-End Developer with 7+ years of experience specializing in Angular ecosystem 
  (v6 to v19). I architect and build scalable, high-performance enterprise applications that handle 
  millions of data points seamlessly. My expertise spans from creating intuitive user interfaces 
  to implementing complex state management solutions with NgRx and Angular Signals.
  
  I'm passionate about clean code architecture, performance optimization, and delivering 
  exceptional user experiences. I've led teams in building mission-critical dashboards, 
  real-time analytics platforms, and enterprise-scale applications for global clients.`,
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "Angular", level: 98, description: "v6 to v19, Standalone Components, Signals" },
      { name: "TypeScript", level: 95, description: "Advanced types, Generics, Decorators" },
      { name: "RxJS", level: 92, description: "Reactive patterns, Custom operators" },
      { name: "SCSS/CSS", level: 90, description: "Animations, Grid, Flexbox, BEM" },
      { name: "HTML5", level: 95, description: "Semantic markup, Accessibility" },
    ],
  },
  {
    title: "State Management",
    skills: [
      { name: "NgRx", level: 90, description: "Store, Effects, Entity, Component Store" },
      { name: "Angular Signals", level: 88, description: "Signal-based reactivity" },
      { name: "RxJS State", level: 85, description: "BehaviorSubject patterns" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85, description: "Express, REST APIs, Microservices" },
      { name: "Express.js", level: 82, description: "Middleware, Authentication" },
      { name: "MongoDB", level: 75, description: "Mongoose, Aggregation" },
      { name: "PostgreSQL", level: 70, description: "Complex queries, Optimization" },
    ],
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: "Git", level: 92, description: "Advanced workflows, CI/CD" },
      { name: "Webpack/Vite", level: 85, description: "Custom configs, Optimization" },
      { name: "Jest/Jasmine", level: 88, description: "Unit & Integration testing" },
      { name: "Docker", level: 75, description: "Containerization, Compose" },
    ],
  },
  {
    title: "Architecture",
    skills: [
      { name: "Micro-Frontends", level: 85, description: "Module Federation, Monorepos" },
      { name: "Design Patterns", level: 90, description: "SOLID, DI, Observables" },
      { name: "Performance", level: 92, description: "Lazy loading, Code splitting" },
      { name: "Accessibility", level: 85, description: "WCAG 2.1, ARIA" },
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "TechCorp Global",
    role: "Senior Angular Developer",
    duration: "2022 - Present",
    location: "Remote",
    responsibilities: [
      "Lead development of enterprise analytics dashboard serving 50K+ daily users",
      "Architect modular component library used across 12+ applications",
      "Mentor team of 5 junior developers on Angular best practices",
      "Implement performance optimizations reducing load time by 60%",
    ],
    achievements: [
      "Reduced bundle size by 45% through tree-shaking and lazy loading",
      "Implemented real-time data streaming handling 10K+ events/second",
      "Built custom CDK-based drag-drop system for dashboard widgets",
    ],
  },
  {
    id: "exp-2",
    company: "FinTech Solutions",
    role: "Full-Stack Developer",
    duration: "2019 - 2022",
    location: "Bangalore, India",
    responsibilities: [
      "Developed trading platform with Angular frontend and Node.js backend",
      "Created real-time charting system using Highcharts and WebSockets",
      "Implemented secure authentication with OAuth 2.0 and JWT",
      "Built automated testing pipeline with 90%+ code coverage",
    ],
    achievements: [
      "Platform processes $10M+ daily transactions",
      "Reduced API response times by 70% through caching strategies",
      "Won 'Best Technical Innovation' award for chart optimization",
    ],
  },
  {
    id: "exp-3",
    company: "Digital Agency Pro",
    role: "Frontend Developer",
    duration: "2017 - 2019",
    location: "Chennai, India",
    responsibilities: [
      "Built responsive web applications for diverse client portfolio",
      "Migrated legacy jQuery apps to modern Angular architecture",
      "Created reusable component libraries for rapid development",
      "Collaborated with UX team to implement pixel-perfect designs",
    ],
    achievements: [
      "Delivered 20+ successful client projects on schedule",
      "Reduced development time by 40% through component reuse",
      "Established coding standards adopted company-wide",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Enterprise Analytics Dashboard",
    description: "Real-time analytics platform processing millions of data points with interactive visualizations and customizable widgets.",
    techStack: ["Angular 17", "NgRx", "Highcharts", "WebSocket", "Node.js"],
    highlights: [
      "50K+ daily active users",
      "10K events/second processing",
      "Sub-100ms chart updates",
    ],
  },
  {
    id: "proj-2", 
    title: "Trading Platform UI",
    description: "High-frequency trading interface with real-time market data, order management, and advanced charting capabilities.",
    techStack: ["Angular 15", "RxJS", "D3.js", "WebSocket", "Redis"],
    highlights: [
      "$10M+ daily volume",
      "99.99% uptime",
      "< 50ms latency",
    ],
  },
  {
    id: "proj-3",
    title: "Healthcare Management System",
    description: "HIPAA-compliant patient management system with appointment scheduling, medical records, and telemedicine integration.",
    techStack: ["Angular 16", "NgRx", "Node.js", "PostgreSQL", "WebRTC"],
    highlights: [
      "100K+ patient records",
      "HIPAA compliant",
      "99.9% availability",
    ],
  },
  {
    id: "proj-4",
    title: "E-Commerce Admin Portal",
    description: "Comprehensive admin dashboard for multi-vendor marketplace with inventory management, analytics, and order processing.",
    techStack: ["Angular 14", "Angular Material", "Charts.js", "Firebase"],
    highlights: [
      "5000+ daily orders",
      "Real-time inventory",
      "Multi-language support",
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
