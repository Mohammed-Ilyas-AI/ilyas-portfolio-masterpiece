import { motion } from "framer-motion";
import { engineeringMindset } from "@/data/portfolio-data";
import { AnimatedSection } from "@/lib/animations";
import ScrollReveal from "@/lib/motion/ScrollReveal";
import ScrollScrubText from "@/lib/motion/ScrollScrubText";

const MindsetSection = () => {
  return (
    <section id="mindset" className="section-padding relative overflow-hidden">
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
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-4">
            The principles I bring into every codebase, code review, and incident.
          </p>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent mb-16" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engineeringMindset.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-2xl relative"
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MindsetSection;
