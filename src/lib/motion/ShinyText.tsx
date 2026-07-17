import { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

interface ShinyTextProps {
  children: ReactNode;
  className?: string;
  /** Sweep duration in seconds */
  speed?: number;
  disabled?: boolean;
}

/**
 * Continuous gradient sweep across text. Pure CSS animation so it's cheap.
 * Uses design tokens (primary/accent/foreground).
 */
const ShinyText = ({ children, className = "", speed = 5, disabled = false }: ShinyTextProps) => {
  const reduced = useReducedMotion();
  const off = disabled || reduced;

  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={
        off
          ? { backgroundImage: "linear-gradient(90deg, hsl(var(--foreground)), hsl(var(--foreground)))" }
          : {
              backgroundImage:
                "linear-gradient(110deg, hsl(var(--foreground) / 0.85) 30%, hsl(var(--primary)) 45%, hsl(var(--accent)) 55%, hsl(var(--foreground) / 0.85) 70%)",
              backgroundSize: "200% 100%",
              animation: `shine ${speed}s linear infinite`,
            }
      }
    >
      {children}
    </span>
  );
};

export default ShinyText;
