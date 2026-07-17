import { ReactNode, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightSize?: number;
  color?: string;
}

/**
 * Radial highlight that follows the cursor. Simpler than TiltCard —
 * use where 3D tilt would be too busy (bento items, marquee cards).
 */
const SpotlightCard = ({
  children,
  className = "",
  spotlightSize = 350,
  color = "hsl(var(--primary) / 0.18)",
}: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);

  const bg = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${mx}px ${my}px, ${color}, transparent 70%)`;

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => {
        mx.set(-9999);
        my.set(-9999);
      }}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: bg }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

export default SpotlightCard;
