import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, memo, useRef } from "react";
import usePerformanceGuardrail from "@/hooks/usePerformanceGuardrail";
import { useReducedMotion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  spotlight?: boolean;
}

const TiltCard = ({ children, className = "", max = 6, spotlight = true }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const perf = usePerformanceGuardrail();
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness: 200, damping: 20 });
  const sx = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const sy = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const enabled = perf.enableTilt && !reduced;

  let frame = 0;
  const handleMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const rect = ref.current!.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    });
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        enabled
          ? { rotateX: rx, rotateY: ry, transformPerspective: 1000, transformStyle: "preserve-3d" }
          : undefined
      }
      className={`relative ${className}`}
    >
      {children}
      {enabled && spotlight && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [sx, sy] as any,
              ([cx, cy]: any) =>
                `radial-gradient(400px circle at ${cx} ${cy}, hsl(var(--primary) / 0.18), transparent 60%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
};

export default memo(TiltCard);
