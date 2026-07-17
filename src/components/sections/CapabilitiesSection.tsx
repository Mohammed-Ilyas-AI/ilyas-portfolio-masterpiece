import { motion } from "framer-motion";
import AmbientDepth from "@/lib/motion/AmbientDepth";
import { capabilities } from "@/data/portfolio-data";
import { AnimatedSection } from "@/lib/animations";
import { Layers, Server, Bug, Sparkles, Network, Check, type LucideIcon } from "lucide-react";
import Marquee from "@/lib/motion/Marquee";
import SpotlightCard from "@/lib/motion/SpotlightCard";

const TECH_RIBBON = [
  "Angular 18", "React", "TypeScript", "Node.js", "Express", "RxJS", "NgRx",
  "MongoDB", "PostgreSQL", "MySQL", "Tailwind", "PrimeNG", "Nx", "Docker",
  "AWS", "GitHub Actions", "Jenkins", "Cypress", "Jest", "Playwright",
  "Cursor", "Copilot", "LLM Ops", "Prompt Eng",
];

const iconMap: Record<string, LucideIcon> = {
  frontend: Layers,
  backend: Server,
  debug: Bug,
  ai: Sparkles,
  arch: Network,
};

const CapabilitiesSection = () => {
  return (
    <section id="capabilities" className="section-padding relative overflow-hidden">
      <AmbientDepth variant="mixed" intensity={0.6} />
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-accent/5 blur-3xl" />
      <div className="section-container relative z-10">
        <AnimatedSection>
          <p className="text-center text-xs uppercase tracking-[0.25em] text-primary/80 mb-3">
            Technical Capabilities
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
            What I <span className="gradient-text">can do for you</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-4">
            Stated as outcomes — the underlying tools are listed under each.
          </p>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent mb-16" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => {
            const Icon = iconMap[cap.icon] || Layers;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -6 }}
                className="glass-card p-7 rounded-2xl group"
              >
        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => {
            const Icon = iconMap[cap.icon] || Layers;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -6 }}
              >
                <SpotlightCard className="glass-card rounded-2xl group h-full">
                  <div className="p-7">
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        whileHover={{ rotate: 8 }}
                        className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow"
                      >
                        <Icon className="w-6 h-6 text-primary" />
                      </motion.div>
                      <div>
                        <h3 className="font-display text-xl font-bold mb-1">{cap.title}</h3>
                        <p className="text-sm text-primary/90">{cap.outcome}</p>
                      </div>
                    </div>
                    <ul className="space-y-2.5 pl-1">
                      {cap.details.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Tech ribbon marquee */}
        <div className="mt-14">
          <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Tools in daily rotation
          </p>
          <Marquee duration={40} fade>
            {TECH_RIBBON.map((t) => (
              <span
                key={t}
                className="px-4 py-2 text-sm font-medium rounded-full border border-border/40 bg-card/40 backdrop-blur-sm text-foreground/85 whitespace-nowrap"
              >
                {t}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
