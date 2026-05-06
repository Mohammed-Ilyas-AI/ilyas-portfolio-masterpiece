import { motion } from "framer-motion";
import AmbientDepth from "@/lib/motion/AmbientDepth";
import { profileData } from "@/data/portfolio-data";
import { AnimatedSection } from "@/lib/animations";
import { ArrowRight, Mail, Download, Calendar } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

const CTASection = () => {
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="cta" className="section-padding relative overflow-hidden">
      <AmbientDepth variant="mixed" intensity={0.6} />
      <div className="section-container relative z-10">
        <AnimatedSection>
          <div className="relative glass-card rounded-3xl p-8 md:p-14 overflow-hidden text-center">
            <motion.div
              animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, hsl(var(--primary)/0.25), transparent 50%), radial-gradient(circle at 80% 70%, hsl(var(--accent)/0.25), transparent 50%)",
                backgroundSize: "200% 200%",
              }}
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-primary/30 bg-primary/5 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Available for senior roles & contracts — starting immediately
              </div>

              <h2 className="font-display text-3xl md:text-5xl font-bold mb-5 leading-tight">
                Have a system to <span className="gradient-text">ship, scale, or rescue?</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10">
                I respond within 24 hours. Briefs, debugging emergencies, and freelance contracts
                all welcome. Open to remote, Dubai relocation, or onsite.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <MagneticButton onClick={scrollToContact} strength={0.3}>
                  <span className="group inline-flex items-center bg-gradient-to-r from-primary to-[hsl(170,80%,45%)] text-primary-foreground font-semibold px-7 py-3.5 text-base rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all cursor-pointer">
                    <Calendar className="mr-2 w-5 h-5" />
                    Start a Conversation
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </MagneticButton>
                <MagneticButton as="a" href={`mailto:${profileData.email}`} strength={0.3}>
                  <span className="group inline-flex items-center border border-border/50 bg-card/40 backdrop-blur-sm hover:bg-primary/10 px-6 py-3.5 text-base rounded-xl transition-all cursor-pointer font-medium">
                    <Mail className="mr-2 w-5 h-5" />
                    {profileData.email}
                  </span>
                </MagneticButton>
                <MagneticButton as="a" href={profileData.resumeUrl} download strength={0.3}>
                  <span className="group inline-flex items-center border border-border/50 bg-card/40 backdrop-blur-sm hover:bg-card/60 px-6 py-3.5 text-base rounded-xl transition-all cursor-pointer font-medium">
                    <Download className="mr-2 w-5 h-5" />
                    Resume
                  </span>
                </MagneticButton>
              </div>

              <p className="mt-8 text-xs text-muted-foreground">
                Typical response &lt; 24h · Time zone friendly · NDA on request
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTASection;
