import { motion } from "framer-motion";
import AmbientDepth from "@/lib/motion/AmbientDepth";
import { engineeringMindset } from "@/data/portfolio-data";
import { AnimatedSection } from "@/lib/animations";
import ScrollScrubText from "@/lib/motion/ScrollScrubText";
import BentoReveal from "@/lib/motion/BentoReveal";
import SpotlightCard from "@/lib/motion/SpotlightCard";

const MindsetSection = () => {
  return (
    <section id="mindset" className="section-padding relative overflow-hidden">
      <AmbientDepth variant="mixed" intensity={0.6} />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage:
          "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      <div className="section-container relative z-10">
        <AnimatedSection>
          <p className="text-center text-xs uppercase tracking-[0.25em] text-primary/80 mb-3">
            Engineering Mindset
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
            How I <span className="gradient-text">think before I code</span>
          </h2>
          <ScrollScrubText
            text="The principles I bring into every codebase, code review, and incident."
            className="text-muted-foreground text-center max-w-2xl mx-auto mb-4 text-base md:text-lg"
          />
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent mb-16" />
        </AnimatedSection>

        <BentoReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" cols={3} step={0.06}>
          {engineeringMindset.map((m, i) => (
            <SpotlightCard key={m.title} className="glass-card rounded-2xl h-full">
              <div className="p-6 relative h-full">
                <div className="font-mono text-xs text-primary/70 mb-3">
                  / {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-lg font-semibold mb-3">{m.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{m.detail}</p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.06 }}
                  className="mt-5 h-px bg-gradient-to-r from-primary/60 to-transparent origin-left"
                />
              </div>
            </SpotlightCard>
          ))}
        </BentoReveal>
      </div>
    </section>
  );
};

export default MindsetSection;
