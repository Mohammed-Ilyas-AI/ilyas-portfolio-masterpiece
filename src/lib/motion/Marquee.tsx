import { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** seconds per full loop */
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  fade?: boolean;
}

/**
 * Infinite horizontal scrolling row. Duplicates children once for a seamless loop.
 * Pure CSS transform animation, pauses on hover, edge-faded via mask.
 */
const Marquee = ({
  children,
  className = "",
  duration = 30,
  reverse = false,
  pauseOnHover = true,
  fade = true,
}: MarqueeProps) => {
  const reduced = useReducedMotion();

  const maskStyle = fade
    ? {
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        maskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }
    : undefined;

  if (reduced) {
    return (
      <div className={`overflow-hidden ${className}`} style={maskStyle}>
        <div className="flex gap-4">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`group overflow-hidden ${className}`}
      style={maskStyle}
    >
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `marquee ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
          animationPlayState: "running",
        }}
        onMouseEnter={(e) => {
          if (pauseOnHover) e.currentTarget.style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          if (pauseOnHover) e.currentTarget.style.animationPlayState = "running";
        }}
      >
        <div className="flex gap-4 shrink-0">{children}</div>
        <div className="flex gap-4 shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
