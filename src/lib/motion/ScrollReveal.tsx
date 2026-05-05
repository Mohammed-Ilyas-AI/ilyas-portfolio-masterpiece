import { motion, useInView, useReducedMotion } from "framer-motion";
import { ReactNode, useRef, ElementType } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "once" = animate in only; "bidirectional" = also fade slightly when leaving */
  mode?: "once" | "bidirectional";
  y?: number;
  as?: ElementType;
}

/**
 * Bidirectional reveal: animates IN entering viewport, softly fades when leaving.
 * GPU-only transforms. Honors prefers-reduced-motion.
 */
const ScrollReveal = ({
  children,
  className,
  delay = 0,
  mode = "once",
  y = 40,
  as,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, {
    margin: "-10% 0px -10% 0px",
    once: mode === "once",
  });

  const Comp: any = as ? motion(as as any) : motion.div;

  if (reduced) {
    return (
      <Comp ref={ref} className={className}>
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : mode === "bidirectional"
          ? { opacity: 0.25, y: -16 }
          : { opacity: 0, y }
      }
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Comp>
  );
};

export default ScrollReveal;
