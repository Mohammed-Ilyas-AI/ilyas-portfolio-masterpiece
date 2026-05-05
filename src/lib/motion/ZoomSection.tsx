import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";
import usePerformanceGuardrail from "@/hooks/usePerformanceGuardrail";

interface ZoomSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Cinematic enter/leave: scale 0.94→1 + blur 8→0 entering;
 * scale 1→1.03 + blur 0→6 + slight fade leaving.
 */
const ZoomSection = ({ children, className, id }: ZoomSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const perf = usePerformanceGuardrail();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const enabled = perf.enableZoom && !reduced;
  const allowBlur = perf.tier === "high";

  const scale = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.94, 1, 1, 1.03]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.55]);
  const filter = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [
    "blur(8px)",
    "blur(0px)",
    "blur(0px)",
    "blur(6px)",
  ]);

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      style={
        enabled
          ? { scale, opacity, ...(allowBlur ? { filter } : {}) }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
};

export default ZoomSection;
