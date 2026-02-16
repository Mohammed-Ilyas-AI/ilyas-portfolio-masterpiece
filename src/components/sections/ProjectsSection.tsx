import { useState } from "react";
import { motion } from "framer-motion";
import { projects, Project } from "@/data/portfolio-data";
import { AnimatedSection } from "@/lib/animations";
import { ExternalLink, Github, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectDetailModal from "@/components/ProjectDetailModal";

const ProjectCard = ({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group glass-card rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => onOpen(project)}
    >
      {/* Card header with gradient */}
      <div className="h-32 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, hsl(186 100% 50% / 0.3) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 50%, hsl(38 100% 60% / 0.2) 0%, transparent 50%)`,
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute top-4 right-4 text-5xl font-display font-bold text-foreground/10">
          0{index + 1}
        </div>
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
            <span key={tech} className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20">
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
            onClick={(e) => { e.stopPropagation(); onOpen(project); }}
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
                <ExternalLink className="w-4 h-4" />
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
            A showcase of enterprise-scale applications and high-performance solutions
          </p>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent mb-16" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={setSelectedProject} />
          ))}
        </div>

        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Want to see more of my work?</p>
          <Button
            variant="outline"
            size="lg"
            className="border-border/50 bg-card/30 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50"
            asChild
          >
            <a href={`https://github.com/mohammedilyas`} target="_blank" rel="noopener noreferrer">
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
