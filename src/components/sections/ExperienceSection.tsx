import { motion, useScroll, useTransform } from "framer-motion";
import AmbientDepth from "@/lib/motion/AmbientDepth";
import { useRef } from "react";
import { experiences } from "@/data/portfolio-data";
import { AnimatedSection } from "@/lib/animations";
import { Building2, MapPin, Calendar, CheckCircle2, Award } from "lucide-react";

const TimelineItem = ({ 
  experience, 
  index, 
  isLast 
}: { 
  experience: typeof experiences[0]; 
  index: number; 
  isLast: boolean;
}) => {
  const ref = useRef(null);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`relative flex items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:gap-8`}
    >
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent glow-primary"
        />
      </div>

      {/* Content card */}
      <motion.div
        whileHover={{ y: -5 }}
        className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] glass-card p-6 rounded-2xl ${isEven ? "md:mr-auto" : "md:ml-auto"}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-display text-xl font-bold text-foreground mb-1">
              {experience.role}
            </h3>
            <div className="flex items-center gap-2 text-primary">
              <Building2 className="w-4 h-4" />
              <span className="font-medium">{experience.company}</span>
            </div>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{experience.location}</span>
          </div>
        </div>

        {/* Responsibilities */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-muted-foreground mb-2">Responsibilities</h4>
          <ul className="space-y-2">
            {experience.responsibilities.map((resp, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{resp}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Achievements */}
        <div>
          <h4 className="text-sm font-semibold text-accent mb-2 flex items-center gap-1">
            <Award className="w-4 h-4" />
            Key Achievements
          </h4>
          <ul className="space-y-2">
            {experience.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="text-sm text-muted-foreground pl-4 border-l-2 border-accent/30"
              >
                {achievement}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Empty space for alignment on larger screens */}
      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
    </motion.div>
  );
};

const ExperienceSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="section-padding relative overflow-hidden" ref={containerRef}>
      <AmbientDepth variant="mixed" intensity={0.6} />
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="section-container relative z-10">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-4">
            A journey through building enterprise-scale applications
          </p>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent mb-16" />
        </AnimatedSection>

        {/* Timeline container */}
        <div className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border/30">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary via-accent to-primary"
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={exp.id}
                experience={exp}
                index={index}
                isLast={index === experiences.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
