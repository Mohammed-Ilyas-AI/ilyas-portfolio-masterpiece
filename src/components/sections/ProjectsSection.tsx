import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { projects, Project } from "@/data/portfolio-data";
import { AnimatedSection } from "@/lib/animations";
import { ExternalLink, Github, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectDetailModal from "@/components/ProjectDetailModal";

// Extract unique tech categories for filter
const allTechs = Array.from(
  new Set(projects.flatMap((p) => p.techStack))
).slice(0, 8);

const ProjectCard = ({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group glass-card rounded-2xl overflow-hidden cursor-pointer relative"
      onClick={() => onOpen(project)}
    >
      {/* Animated card header */}
      <div className="h-36 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, hsl(var(--primary) / 0.2) 0%, hsl(var(--accent) / 0.15) 50%, transparent 100%)`,
          }}
        />
        {/* Animated shimmer on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.1) 50%, transparent 100%)`,
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute top-4 right-4 text-5xl font-display font-bold text-foreground/8">
          0{index + 1}
        </div>
        {/* Live badge */}
        {project.link && (
          <motion.div
            className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/50 backdrop-blur-sm border border-border/30 text-xs font-medium"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.08 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Live
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 text-xs rounded-md bg-muted/50 text-muted-foreground">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Highlights */}
        <div className="space-y-2 mb-6">
          {project.highlights.map((highlight, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <Zap className="w-3 h-3 text-accent" />
              <span className="text-muted-foreground">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 group/btn border-border/50 hover:border-primary/50 hover:bg-primary/10"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(project);
            }}
          >
            <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:text-primary transition-colors" />
            View Details
          </Button>
          {project.link && (
            <Button
              variant="outline"
              size="sm"
              className="border-border/50 hover:border-primary/50 hover:bg-primary/10"
              asChild
              onClick={(e) => e.stopPropagation()}
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <Globe className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.techStack.includes(activeFilter));

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-accent/5 blur-3xl" />

      <div className="section-container relative z-10">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-4">
            A showcase of enterprise-scale applications and high-performance
            solutions
          </p>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent mb-10" />
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection delay={0.15}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {["All", ...allTechs.slice(0, 6)].map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  activeFilter === filter
                    ? "bg-primary/15 text-primary border-primary/40"
                    : "bg-muted/30 text-muted-foreground border-border/30 hover:border-primary/30 hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Project grid with layout animation */}
        <LayoutGroup>
          <motion.div layout className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpen={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Want to see more of my work?
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-border/50 bg-card/30 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50"
            asChild
          >
            <a
              href="https://github.com/mohammedilyas"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" />
              View GitHub Profile
            </a>
          </Button>
        </AnimatedSection>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;
