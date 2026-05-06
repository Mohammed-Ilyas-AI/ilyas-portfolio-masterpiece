import { motion, useInView, useReducedMotion } from "framer-motion";
import { ReactNode, useRef, ElementType } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "once" = animate in only; "bidirectional" = re-trigger and reverse on leave */
  mode?: "once" | "bidirectional";
  y?: number;
  as?: ElementType;
}

/**
 * Bidirectional reveal: animates IN entering viewport, REVERSES on leave,
 * and replays when scrolling back. GPU-only transforms.
 */
const ScrollReveal = ({
  children,
  className,
  delay = 0,
  mode = "bidirectional",
  y = 40,
  as,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, {
    margin: "-12% 0px -12% 0px",
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
          ? { opacity: 0, y: y * 0.5 }
          : { opacity: 0, y }
      }
      transition={{
        duration: 0.65,
        delay: inView ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Comp>
  );
};

export default ScrollReveal;
