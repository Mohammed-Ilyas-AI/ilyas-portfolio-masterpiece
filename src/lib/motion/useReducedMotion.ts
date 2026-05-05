import { useReducedMotion as fmUseReducedMotion } from "framer-motion";

export const useReducedMotion = () => {
  const reduced = fmUseReducedMotion();
  return !!reduced;
};
