import { motion } from "framer-motion";
import { trustSignals } from "@/data/portfolio-data";
import { AnimatedSection } from "@/lib/animations";
import { Quote, Globe2 } from "lucide-react";
import TiltCard from "@/lib/motion/TiltCard";
import ScrollReveal from "@/lib/motion/ScrollReveal";

const TrustSignalsSection = () => {
  return (
    <section id="trust" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
      <div className="section-container relative z-10">
        <AnimatedSection>
          <p className="text-center text-xs uppercase tracking-[0.25em] text-primary/80 mb-3">
            Trust Signals · Anonymized Client Outcomes
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
            Proof <span className="gradient-text">in production</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-4">
            Real engagements, real numbers. Names withheld; outcomes verifiable on request.
          </p>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent mb-16" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustSignals.map((t, i) => (
            <ScrollReveal
              key={t.project + t.geo}
              mode="bidirectional"
              delay={i * 0.06}
              className="group"
            >
              <TiltCard className="glass-card p-6 rounded-2xl relative flex flex-col h-full" max={5}>
                <Quote className="w-6 h-6 text-primary/30 mb-3" />
                <p className="text-sm text-foreground/85 leading-relaxed mb-5 flex-1">
                  {t.outcome}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Globe2 className="w-3.5 h-3.5 text-primary" />
                    <span>{t.geo}</span>
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-1 rounded-md bg-accent/10 text-accent border border-accent/20">
                    {t.metric}
                  </span>
                </div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground/70 mt-2">
                  {t.project}
                </p>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;
