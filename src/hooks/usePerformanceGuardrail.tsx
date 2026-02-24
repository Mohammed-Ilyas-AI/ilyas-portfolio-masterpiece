import { useState, useEffect, useCallback } from "react";

interface PerformanceProfile {
  /** Whether heavy effects should be enabled */
  enableHeavyEffects: boolean;
  /** Whether particles should render */
  enableParticles: boolean;
  /** Whether cursor light should render */
  enableCursorLight: boolean;
  /** Max particle count multiplier (0-1) */
  particleDensity: number;
  /** Whether GSAP scroll animations should run */
  enableScrollAnimations: boolean;
  /** Whether connection lines in particles should render */
  enableConnectionLines: boolean;
  /** Whether to use reduced motion */
  prefersReducedMotion: boolean;
}

const usePerformanceGuardrail = (): PerformanceProfile => {
  const [profile, setProfile] = useState<PerformanceProfile>(() => getProfile());

  useEffect(() => {
    // Re-evaluate on resize (debounced)
    let timeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setProfile(getProfile()), 300);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  return profile;
};

function getProfile(): PerformanceProfile {
  const width = window.innerWidth;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const isSmall = width < 768;
  const isMedium = width >= 768 && width < 1024;

  // Check device memory (if available)
  const nav = navigator as any;
  const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;
  const lowCores = nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2;
  const isLowEnd = lowMemory || lowCores;

  if (prefersReducedMotion) {
    return {
      enableHeavyEffects: false,
      enableParticles: false,
      enableCursorLight: false,
      particleDensity: 0,
      enableScrollAnimations: false,
      enableConnectionLines: false,
      prefersReducedMotion: true,
    };
  }

  if (isSmall || (isTouch && isLowEnd)) {
    return {
      enableHeavyEffects: false,
      enableParticles: true,
      enableCursorLight: false,
      particleDensity: 0.3,
      enableScrollAnimations: true,
      enableConnectionLines: false,
      prefersReducedMotion: false,
    };
  }

  if (isMedium || isLowEnd) {
    return {
      enableHeavyEffects: true,
      enableParticles: true,
      enableCursorLight: !isTouch,
      particleDensity: 0.6,
      enableScrollAnimations: true,
      enableConnectionLines: false,
      prefersReducedMotion: false,
    };
  }

  // Desktop / high-end
  return {
    enableHeavyEffects: true,
    enableParticles: true,
    enableCursorLight: !isTouch,
    particleDensity: 1,
    enableScrollAnimations: true,
    enableConnectionLines: true,
    prefersReducedMotion: false,
  };
}

export default usePerformanceGuardrail;
