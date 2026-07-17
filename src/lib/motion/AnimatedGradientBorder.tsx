import { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import usePerformanceGuardrail from "@/hooks/usePerformanceGuardrail";

interface AnimatedGradientBorderProps {
  children: ReactNode;
  className?: string;
  radius?: string;
  duration?: number;
}

/**
 * Rotating conic-gradient border wrapper. GPU-only (transform on inner mask).
 * Falls back to static border on low tier / reduced motion.
 */
const AnimatedGradientBorder = ({
  children,
  className = "",
  radius = "0.75rem",
  duration = 6,
}: AnimatedGradientBorderProps) => {
  const reduced = useReducedMotion();
  const perf = usePerformanceGuardrail();
  const enabled = !reduced && perf.tier !== "low";

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ borderRadius: radius }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: radius,
          padding: "1.5px",
          background: enabled
            ? "conic-gradient(from var(--angle,0deg), hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))"
            : "linear-gradient(90deg, hsl(var(--primary) / 0.6), hsl(var(--accent) / 0.6))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: enabled ? `border-spin ${duration}s linear infinite` : undefined,
        }}
      />
      <span className="relative block" style={{ borderRadius: radius }}>
        {children}
      </span>
    </span>
  );
};

export default AnimatedGradientBorder;
