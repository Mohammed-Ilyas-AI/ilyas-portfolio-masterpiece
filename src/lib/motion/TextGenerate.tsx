import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface TextGenerateProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  highlight?: string;
  highlightClassName?: string;
}

/**
 * Word-by-word blur + rise reveal. Runs on mount.
 * Optional `highlight` wraps a substring with gradient styling.
 */
const TextGenerate = ({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.055,
  as = "h1",
  highlight,
  highlightClassName = "gradient-text animate-gradient",
}: TextGenerateProps) => {
  const reduced = useReducedMotion();
  const Tag: any = motion[as];

  const words = text.split(" ");

  if (reduced) {
    return (
      <Tag className={className}>
        {highlight ? renderWithHighlight(text, highlight, highlightClassName) : text}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => {
        const isHighlight = highlight && (highlight.split(" ").includes(w));
        return (
          <motion.span
            key={i}
            className={`inline-block ${wordClassName} ${isHighlight ? highlightClassName : ""}`}
            variants={{
              hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        );
      })}
    </Tag>
  );
};

function renderWithHighlight(text: string, highlight: string, className: string): ReactNode {
  const parts = text.split(highlight);
  return parts.flatMap((p, i) =>
    i < parts.length - 1
      ? [p, <span key={i} className={className}>{highlight}</span>]
      : [p]
  );
}

export default TextGenerate;
