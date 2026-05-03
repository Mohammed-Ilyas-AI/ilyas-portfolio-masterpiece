import { motion } from "framer-motion";
import { valuePropositions } from "@/data/portfolio-data";
import { AnimatedSection } from "@/lib/animations";
import { Bug, Rocket, Gauge, Zap, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  bug: Bug,
  rocket: Rocket,
  gauge: Gauge,
  zap: Zap,
};

const ValuePropositionSection = () => {
  return (
    <section id="value" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-primary/5 blur-3xl rounded-full" />
      <div className="section-container relative z-10">
        <AnimatedSection>
          <p className="text-center text-xs uppercase tracking-[0.25em] text-primary/80 mb-3">
            What I Solve
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
            Outcomes, <span className="gradient-text">not buzzwords</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-4">
            I get hired to deliver four things — fast, reliably, in production.
          </p>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent mb-16" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {valuePropositions.map((vp, i) => {
            const Icon = iconMap[vp.icon];
            return (
              <motion.div
                key={vp.outcome}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass-card p-7 rounded-2xl group relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    {Icon && <Icon className="w-6 h-6 text-primary" />}
                  </div>
                  <div>
                    <h3 className="font-display text-lg md:text-xl font-bold mb-2 leading-snug">
                      {vp.outcome}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {vp.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;
