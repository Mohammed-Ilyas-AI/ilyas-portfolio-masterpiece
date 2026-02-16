import { motion } from "framer-motion";
import { profileData } from "@/data/portfolio-data";
import { AnimatedSection, StaggerContainer, StaggerChild } from "@/lib/animations";
import { Code2, Zap, Users, TrendingUp } from "lucide-react";

const stats = [
  { icon: Code2, value: "7+", label: "Years Experience" },
  { icon: Zap, value: "50+", label: "Projects Delivered" },
  { icon: Users, value: "100K+", label: "Users Served" },
  { icon: TrendingUp, value: "60%", label: "Performance Gains" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-1/2 h-96 bg-primary/5 blur-3xl -translate-y-1/2" />
      
      <div className="section-container relative z-10">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent mb-16" />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Profile card with glassmorphism */}
          <AnimatedSection delay={0.2}>
            <motion.div
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-3xl relative overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full" />
              
              <div className="relative z-10">
                {/* Avatar placeholder */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 flex items-center justify-center">
                  <span className="text-3xl font-display font-bold text-primary-foreground">
                    {profileData.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold mb-2">{profileData.name}</h3>
                <p className="text-primary font-medium mb-6">{profileData.role}</p>
                
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {profileData.about.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph.trim()}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Stats grid */}
          <StaggerContainer className="grid grid-cols-2 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <StaggerChild key={stat.label}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card p-6 rounded-2xl text-center group cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
                  >
                    <stat.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                  </motion.div>
                  <h4 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.value}
                  </h4>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </motion.div>
              </StaggerChild>
            ))}
          </StaggerContainer>
        </div>

        {/* Key highlights */}
        <AnimatedSection delay={0.4} className="mt-20">
          <div className="glass-card p-8 rounded-3xl">
            <h3 className="font-display text-xl font-semibold mb-6 text-center">Core Expertise</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Angular v6 → v18+",
                "Enterprise Applications",
                "Performance Optimization",
                "SEO & Core Web Vitals",
                "PWA & Service Workers",
                "Team Leadership",
                "Full-Stack Development",
                "UI/UX Implementation",
                "Domain: Telecom, Finance, Gaming, Education",
              ].map((expertise, index) => (
                <motion.span
                  key={expertise}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-sm font-medium hover:border-primary/40 transition-colors cursor-default"
                >
                  {expertise}
                </motion.span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutSection;
