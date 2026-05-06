import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { ReactNode, useRef } from "react";
import usePerformanceGuardrail from "@/hooks/usePerformanceGuardrail";

type Depth = "bg" | "mid" | "fg" | "foreground";

interface ParallaxLayerProps {
  children: ReactNode;
  /** Pixels of vertical travel across the visible scroll range. Used when `depth` is not set. */
  speed?: number;
  /** Semantic depth — overrides `speed` when provided */
  depth?: Depth;
  className?: string;
}

const DEPTH_SPEED: Record<Depth, number> = {
  bg: -120,
  mid: -70,
  fg: -30,
  foreground: 25,
};

const ParallaxLayer = ({ children, speed = -80, depth, className }: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const perf = usePerformanceGuardrail();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const travel = depth ? DEPTH_SPEED[depth] : speed;
  const y = useTransform(scrollYProgress, [0, 1], [0, travel]) as MotionValue<number>;

  const enabled = perf.enableParallax && !reduced;

  return (
    <motion.div
      ref={ref}
      style={enabled ? { y, willChange: "transform" } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;
