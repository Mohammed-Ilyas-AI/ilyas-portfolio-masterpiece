import { motion, useReducedMotion, useScroll, useTransform, MotionValue } from "framer-motion";
import { RefObject, useRef } from "react";

interface AnimatedBeamProps {
  className?: string;
  /** Scroll target — beam draws with its scroll progress */
  scrollTarget?: RefObject<HTMLElement>;
  /** Fixed duration in seconds when no scrollTarget */
  duration?: number;
  vertical?: boolean;
  color?: string;
  glow?: boolean;
}

/**
 * SVG beam that draws itself either with scroll progress or on view.
 * Vertical mode is great for timelines; horizontal for section dividers.
 */
const AnimatedBeam = ({
  className = "",
  scrollTarget,
  duration = 1.4,
  vertical = false,
  color = "hsl(var(--primary))",
  glow = true,
}: AnimatedBeamProps) => {
  const reduced = useReducedMotion();
  const localRef = useRef<HTMLDivElement>(null);
  const target = scrollTarget ?? localRef;

  const { scrollYProgress } = useScroll({
    target,
    offset: vertical ? ["start end", "end start"] : ["start 0.9", "end 0.5"],
  });

  const pathLength: MotionValue<number> | number = scrollTarget
    ? useTransform(scrollYProgress, [0, 1], [0, 1])
    : 1;

  const line = vertical ? (
    <line x1="1" y1="0" x2="1" y2="100" stroke={color} strokeWidth="2" strokeLinecap="round" />
  ) : (
    <line x1="0" y1="1" x2="100" y2="1" stroke={color} strokeWidth="2" strokeLinecap="round" />
  );

  return (
    <div
      ref={localRef}
      className={`relative pointer-events-none ${className}`}
      style={
        glow
          ? { filter: `drop-shadow(0 0 6px ${color})` }
          : undefined
      }
    >
      <svg
        viewBox={vertical ? "0 0 2 100" : "0 0 100 2"}
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        {/* Faint rail */}
        <g opacity="0.15">{line}</g>
        {/* Animated beam */}
        <motion.g
          initial={reduced ? { pathLength: 1 } : scrollTarget ? undefined : { pathLength: 0 }}
          whileInView={
            reduced || scrollTarget
              ? undefined
              : { pathLength: 1 }
          }
          viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
          transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          style={scrollTarget ? { pathLength: pathLength as MotionValue<number> } : undefined}
        >
          {line}
        </motion.g>
      </svg>
    </div>
  );
};

export default AnimatedBeam;
