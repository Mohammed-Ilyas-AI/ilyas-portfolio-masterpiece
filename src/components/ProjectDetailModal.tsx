import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Zap, User, Layers, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/portfolio-data";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25, delay: 0.1 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 60, rotateX: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 22,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    y: 40,
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};



const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 perspective-1000"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Compact header */}
            <div className="relative h-14 overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundSize: "200% 200%",
                  background: `linear-gradient(135deg, hsl(var(--primary) / 0.3) 0%, hsl(var(--accent) / 0.2) 50%, hsl(var(--primary) / 0.1) 100%)`,
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              {/* Floating number */}
              <motion.div
                className="absolute top-2 left-6 font-display text-3xl font-bold text-foreground/5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {project.id.replace("proj-", "0")}
              </motion.div>

              {/* Close button */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-background/40 backdrop-blur-sm text-foreground/70 hover:text-foreground hover:bg-background/70 transition-all"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <motion.div
              className="p-6 -mt-4"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Title */}
              <motion.h2
                variants={itemVariants}
                className="font-display text-2xl md:text-3xl font-bold mb-2"
              >
                {project.title}
              </motion.h2>

              {/* Role */}
              {project.role && (
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-2 text-primary mb-4"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{project.role}</span>
                </motion.div>
              )}

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-muted-foreground leading-relaxed mb-6"
              >
                {project.description}
              </motion.p>

              {/* Tech Stack */}
              <motion.div variants={itemVariants} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-primary" />
                  <h3 className="font-display font-semibold text-sm uppercase tracking-wider">
                    Tech Stack
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.35 + i * 0.04,
                        type: "spring",
                        stiffness: 300,
                      }}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Highlights */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-accent" />
                  <h3 className="font-display font-semibold text-sm uppercase tracking-wider">
                    Key Highlights
                  </h3>
                </div>
                <div className="grid gap-2">
                  {project.highlights.map((highlight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + i * 0.08 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/30 hover:border-primary/30 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Live Link */}
              {project.link && (
                <motion.div variants={itemVariants}>
                  <Button
                    size="lg"
                    asChild
                    className="w-full group bg-gradient-to-r from-primary to-[hsl(170,80%,45%)] text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Visit Live Website
                      <ExternalLink className="w-4 h-4 ml-2 opacity-60" />
                    </a>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
