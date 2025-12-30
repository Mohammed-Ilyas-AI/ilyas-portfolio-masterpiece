import { motion } from "framer-motion";
import { architectureHighlights } from "@/data/portfolio-data";
import { AnimatedSection, StaggerContainer, StaggerChild } from "@/lib/animations";
import { Layers, Cpu, BarChart3, Database, LayoutGrid, RefreshCw } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  layers: Layers,
  cpu: Cpu,
  chart: BarChart3,
  database: Database,
  grid: LayoutGrid,
  refresh: RefreshCw,
};

const ArchitectureCard = ({ 
  highlight, 
  index 
}: { 
  highlight: typeof architectureHighlights[0]; 
  index: number;
}) => {
  const Icon = iconMap[highlight.icon] || Layers;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card p-6 rounded-2xl group cursor-default"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow"
      >
        <Icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
      </motion.div>

      <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {highlight.title}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed">
        {highlight.description}
      </p>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
        className="mt-4 h-0.5 bg-gradient-to-r from-primary/50 to-transparent origin-left"
      />
    </motion.div>
  );
};

const ArchitectureSection = () => {
  return (
    <section id="architecture" className="section-padding relative overflow-hidden">
      {/* Complex background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(186 100% 50%) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(186 100% 50%) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
      
      <div className="section-container relative z-10">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
            Architecture & <span className="gradient-text">Advanced Work</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-4">
            Deep expertise in building scalable, high-performance solutions
          </p>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent mb-16" />
        </AnimatedSection>

        {/* Architecture cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architectureHighlights.map((highlight, index) => (
            <ArchitectureCard key={highlight.title} highlight={highlight} index={index} />
          ))}
        </div>

        {/* Performance showcase */}
        <AnimatedSection delay={0.4} className="mt-16">
          <div className="glass-card p-8 rounded-3xl">
            <h3 className="font-display text-2xl font-bold text-center mb-8">
              Performance <span className="gradient-text-accent">Achievements</span>
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
              {[
                { value: "60%", label: "Load Time Reduction", color: "from-primary to-primary" },
                { value: "45%", label: "Bundle Size Savings", color: "from-accent to-accent" },
                { value: "10K+", label: "Events/Second", color: "from-primary to-accent" },
                { value: "99.9%", label: "Uptime Achieved", color: "from-accent to-primary" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-4"
                >
                  <div className={`font-display text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ArchitectureSection;
