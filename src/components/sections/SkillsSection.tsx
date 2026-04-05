import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillCategories } from "@/data/portfolio-data";
import { AnimatedSection, StaggerContainer } from "@/lib/animations";

const SkillBar = ({ name, level, description }: { name: string; level: number; description: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
          {name}
        </span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      
      <div className="relative">
        <div className="skill-bar">
          <motion.div
            className="skill-bar-fill"
            initial={{ width: 0 }}
            animate={isInView ? { width: `${level}%` } : { width: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
        
        {/* Tooltip on hover */}
        <div className="absolute left-0 -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-muted-foreground max-w-full truncate">
          {description}
        </div>
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ 
  title, 
  skills, 
  index 
}: { 
  title: string; 
  skills: typeof skillCategories[0]["skills"]; 
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="glass-card p-6 rounded-2xl"
    >
      <h3 className="font-display text-lg font-semibold mb-6 gradient-text">{title}</h3>
      <div className="space-y-6">
        {skills.map((skill) => (
          <SkillBar key={skill.name} {...skill} />
        ))}
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding relative overflow-hidden" style={{ opacity: 1 }}>
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-primary/5 blur-3xl" />
      
      <div className="section-container relative z-10">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-4">
            Expertise honed over 7+ years building enterprise-scale applications
          </p>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent mb-16" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              skills={category.skills}
              index={index}
            />
          ))}
        </div>

        {/* Additional skill badges */}
        <AnimatedSection delay={0.4} className="mt-16">
          <div className="text-center">
            <h3 className="font-display text-xl font-semibold mb-6 text-muted-foreground">
              Also proficient in
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Highcharts",
                "D3.js",
                "PWA",
                "SSR / SSG",
                "IndexedDB",
                "GraphQL",
                "REST APIs",
                "Cypress",
                "Storybook",
                "Nx Monorepo",
                "Azure DevOps",
                "GitHub Copilot",
                "ChatGPT / LLMs",
                "Cursor AI",
                "Prompt Engineering",
                "AI Test Generation",
                "Lazy Loading",
                "Code Splitting",
              ].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -3,
                    boxShadow: "0 10px 30px -10px hsl(186 100% 50% / 0.3)"
                  }}
                  className="px-4 py-2 rounded-lg bg-muted/50 border border-border/50 text-sm font-medium hover:border-primary/50 transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SkillsSection;
