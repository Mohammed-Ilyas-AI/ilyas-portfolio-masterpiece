import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import usePerformanceGuardrail from "@/hooks/usePerformanceGuardrail";

interface AmbientDepthProps {
  /** Color hue tone — uses CSS vars */
  variant?: "primary" | "accent" | "mixed";
  /** Intensity of the orbs (0–1) */
  intensity?: number;
  className?: string;
}

/**
 * Multi-layer ambient depth canvas — three blurred orbs at different parallax depths.
 * Drop into any section as the first child for cinematic depth.
 */
const AmbientDepth = ({ variant = "mixed", intensity = 0.5, className = "" }: AmbientDepthProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const perf = usePerformanceGuardrail();
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yFg = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const enabled = perf.enableParallax && !reduced;

  const colA = variant === "accent" ? "bg-accent" : "bg-primary";
  const colB = variant === "primary" ? "bg-primary" : "bg-accent";

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        style={enabled ? { y: yBg } : undefined}
        className={`absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl ${colA}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 * intensity }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        style={enabled ? { y: yMid } : undefined}
        className={`absolute top-1/3 right-0 w-[28rem] h-[28rem] rounded-full blur-3xl ${colB}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 * intensity }}
        transition={{ duration: 1.2, delay: 0.1 }}
      />
      <motion.div
        style={enabled ? { y: yFg } : undefined}
        className="absolute bottom-0 left-1/3 w-[20rem] h-[20rem] rounded-full blur-3xl bg-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 * intensity }}
        transition={{ duration: 1.2, delay: 0.2 }}
      />
    </div>
  );
};

export default AmbientDepth;
