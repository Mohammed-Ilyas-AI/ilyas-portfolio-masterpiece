import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Layers,
  Globe,
  Target,
  Wrench,
  AlertTriangle,
  GitBranch,
  TrendingUp,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CaseStudy } from "@/data/portfolio-data";

interface Props {
  project: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modal = {
  hidden: { opacity: 0, scale: 0.94, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 26 },
  },
  exit: { opacity: 0, scale: 0.96, y: 20, transition: { duration: 0.2 } },
};

const Block = ({
  icon: Icon,
  title,
  children,
  accent = "primary",
  className = "",
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
  accent?: "primary" | "accent";
  className?: string;
}) => (
  <section className={`mb-4 ${className}`}>
    <div className="flex items-center gap-2 mb-1.5">
      <Icon className={`w-3.5 h-3.5 ${accent === "primary" ? "text-primary" : "text-accent"}`} />
      <h3 className="font-display font-semibold text-[11px] uppercase tracking-[0.18em] text-foreground/80">
        {title}
      </h3>
    </div>
    <div className="text-[13px] text-foreground/85 leading-relaxed">{children}</div>
  </section>
);

const BulletList = ({ items, dotClass = "bg-primary" }: { items: string[]; dotClass?: string }) => (
  <ul className="space-y-1.5">
    {items.map((item, i) => (
      <li key={i} className="flex gap-2 items-start">
        <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${dotClass}`} />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const ProjectDetailModal = ({ project, isOpen, onClose }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock body + Lenis scroll while modal is open; restore on close
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const lenis = (window as any).lenis;
    lenis?.stop?.();

    if (scrollRef.current) scrollRef.current.scrollTop = 0;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      lenis?.start?.();
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="absolute inset-0 bg-background/75 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* Compact header */}
            <div className="flex-shrink-0 backdrop-blur-xl bg-card/80 border-b border-border/40">
              <div className="flex items-start justify-between px-5 py-3 gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">
                    <span className="font-mono text-primary/80">
                      {project.id.replace("proj-", "Case 0")}
                    </span>
                    <span>·</span>
                    <span className="truncate">{project.client}</span>
                  </div>
                  <h2 className="font-display text-base md:text-lg font-bold leading-tight truncate">
                    {project.title}
                  </h2>
                  {project.role && (
                    <div className="flex items-center gap-1.5 text-[11px] text-primary mt-0.5">
                      <User className="w-3 h-3" />
                      <span className="truncate">{project.role}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-1.5 rounded-full bg-background/40 hover:bg-background/70 text-foreground/70 hover:text-foreground transition"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable body — Lenis ignores via data-lenis-prevent */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 md:px-6 py-4"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <p className="text-foreground/85 leading-relaxed mb-4 text-sm">
                {project.description}
              </p>

              <div className="grid md:grid-cols-2 md:gap-x-6">
                <Block icon={Target} title="Context / Problem">
                  <p>{project.context}</p>
                </Block>

                <Block icon={Wrench} title="Solution Design" accent="accent">
                  <p>{project.solution}</p>
                </Block>

                <Block icon={GitBranch} title="Architecture">
                  <BulletList items={project.architecture} />
                </Block>

                <Block icon={AlertTriangle} title="Challenges" accent="accent">
                  <BulletList items={project.challenges} dotClass="bg-accent" />
                </Block>

                <Block icon={GitBranch} title="Engineering Decisions" className="md:col-span-2">
                  <BulletList items={project.decisions} />
                </Block>

                <Block icon={Layers} title="Tech Stack" className="md:col-span-2">
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.techStack.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-primary/10 text-primary border border-primary/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Block>

                <Block icon={TrendingUp} title="Impact" accent="accent" className="md:col-span-2">
                  <BulletList items={project.impact} dotClass="bg-accent" />
                </Block>
              </div>
            </div>

            {/* Sticky footer CTA */}
            {project.link && (
              <div className="flex-shrink-0 border-t border-border/40 bg-card/80 backdrop-blur-xl px-5 py-3">
                <Button
                  asChild
                  className="w-full group bg-gradient-to-r from-primary to-[hsl(170,80%,45%)] text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition"
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Visit Live Site
                    <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-60" />
                  </a>
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
