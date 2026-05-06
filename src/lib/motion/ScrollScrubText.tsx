import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { useRef } from "react";
import usePerformanceGuardrail from "@/hooks/usePerformanceGuardrail";

interface ScrollScrubTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

const Word = ({
  word,
  progress,
  start,
  end,
  className,
  withSpace,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  className: string;
  withSpace: boolean;
}) => {
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline-block ${className}`}>
      {word}
      {withSpace ? "\u00A0" : ""}
    </motion.span>
  );
};

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
      {words.map((w, i) => (
        <Word
          key={i}
          word={w}
          progress={scrollYProgress}
          start={i / words.length}
          end={i / words.length + 1 / words.length}
          className={wordClassName}
          withSpace={i < words.length - 1}
        />
      ))}
    </p>
  );
};

export default ScrollScrubText;
