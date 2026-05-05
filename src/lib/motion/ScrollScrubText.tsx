import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import usePerformanceGuardrail from "@/hooks/usePerformanceGuardrail";

interface ScrollScrubTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

/**
 * Reveals text word-by-word as the user scrubs through the section.
 */
const ScrollScrubText = ({ text, className = "", wordClassName = "" }: ScrollScrubTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const perf = usePerformanceGuardrail();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = text.split(" ");
  const enabled = perf.enableScrub && !reduced;

  if (!enabled) {
    return <p ref={ref} className={className}>{text}</p>;
  }

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0.18, 1]);
        return (
          <motion.span key={i} style={{ opacity }} className={`inline-block ${wordClassName}`}>
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        );
      })}
    </p>
  );
};

export default ScrollScrubText;
