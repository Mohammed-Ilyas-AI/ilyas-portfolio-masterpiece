import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { ReactNode, useRef } from "react";
import usePerformanceGuardrail from "@/hooks/usePerformanceGuardrail";

interface ParallaxLayerProps {
  children: ReactNode;
  /** Pixels of vertical travel across the visible scroll range */
  speed?: number;
  className?: string;
}

const ParallaxLayer = ({ children, speed = -80, className }: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const perf = usePerformanceGuardrail();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed]) as MotionValue<number>;

  const enabled = perf.enableParallax && !reduced;

  return (
    <motion.div ref={ref} style={enabled ? { y } : undefined} className={className}>
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;
