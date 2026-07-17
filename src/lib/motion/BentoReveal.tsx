import { motion, useReducedMotion } from "framer-motion";
import { Children, ReactNode, cloneElement, isValidElement } from "react";

interface BentoRevealProps {
  children: ReactNode;
  className?: string;
  /** Base delay per item (added to diagonal index) */
  step?: number;
  cols?: number;
}

/**
 * Wraps a grid and staggers children diagonally (row + col index) so they
 * reveal in a wave from top-left to bottom-right. Bidirectional via whileInView.
 */
const BentoReveal = ({ children, className = "", step = 0.07, cols = 3 }: BentoRevealProps) => {
  const reduced = useReducedMotion();
  const items = Children.toArray(children);

  return (
    <div className={className}>
      {items.map((child, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const delay = (row + col) * step;
        if (!isValidElement(child)) return child;

        if (reduced) return child;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
};

export default BentoReveal;
