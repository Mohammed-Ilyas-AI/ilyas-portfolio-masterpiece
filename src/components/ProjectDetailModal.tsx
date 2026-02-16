import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Zap, User, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/portfolio-data";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 25 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 30,
    transition: { duration: 0.2 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.06, duration: 0.35 },
  }),
};

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl"
          >
            {/* Header gradient */}
            <div className="relative h-28 bg-gradient-to-br from-primary/25 via-accent/15 to-transparent overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 50%, hsl(var(--primary) / 0.4) 0%, transparent 60%), 
                                   radial-gradient(circle at 70% 50%, hsl(var(--accent) / 0.3) 0%, transparent 60%)`,
                }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-background/50 backdrop-blur-sm text-foreground/70 hover:text-foreground hover:bg-background/80 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 -mt-6">
              {/* Title */}
              <motion.h2
                custom={0}
                variants={staggerItem}
                initial="hidden"
                animate="visible"
                className="font-display text-2xl md:text-3xl font-bold mb-2"
              >
                {project.title}
              </motion.h2>

              {/* Role */}
              {project.role && (
                <motion.div
                  custom={1}
                  variants={staggerItem}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center gap-2 text-primary mb-4"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{project.role}</span>
                </motion.div>
              )}

              {/* Description */}
              <motion.p
                custom={2}
                variants={staggerItem}
                initial="hidden"
                animate="visible"
                className="text-muted-foreground leading-relaxed mb-6"
              >
                {project.description}
              </motion.p>

              {/* Tech Stack */}
              <motion.div
                custom={3}
                variants={staggerItem}
                initial="hidden"
                animate="visible"
                className="mb-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-primary" />
                  <h3 className="font-display font-semibold text-sm uppercase tracking-wider">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.04 }}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Highlights */}
              <motion.div
                custom={4}
                variants={staggerItem}
                initial="hidden"
                animate="visible"
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-accent" />
                  <h3 className="font-display font-semibold text-sm uppercase tracking-wider">Key Highlights</h3>
                </div>
                <div className="grid gap-2">
                  {project.highlights.map((highlight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/30"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Live Link */}
              {project.link && (
                <motion.div
                  custom={5}
                  variants={staggerItem}
                  initial="hidden"
                  animate="visible"
                >
                  <Button
                    size="lg"
                    asChild
                    className="w-full group bg-gradient-to-r from-primary to-[hsl(170,80%,45%)] text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Visit Live Website
                    </a>
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
