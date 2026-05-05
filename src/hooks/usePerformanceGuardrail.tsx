import { useState, useEffect } from "react";

interface PerformanceProfile {
  enableHeavyEffects: boolean;
  enableParticles: boolean;
  enableCursorLight: boolean;
  particleDensity: number;
  enableScrollAnimations: boolean;
  enableConnectionLines: boolean;
  prefersReducedMotion: boolean;
  /** Multi-layer parallax (Hero) */
  enableParallax: boolean;
  /** 3D card tilt + spotlight */
  enableTilt: boolean;
  /** Section zoom/blur transitions */
  enableZoom: boolean;
  /** Scroll-scrubbed text reveals */
  enableScrub: boolean;
  /** Full 3D r3f boot loader (vs CSS fallback) */
  enable3DBoot: boolean;
  /** Tier label for downstream tweaks */
  tier: "high" | "mid" | "low" | "reduced";
}

const usePerformanceGuardrail = (): PerformanceProfile => {
  const [profile, setProfile] = useState<PerformanceProfile>(() => getProfile());

  useEffect(() => {
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
      enableParallax: false,
      enableTilt: false,
      enableZoom: false,
      enableScrub: false,
      enable3DBoot: false,
      tier: "reduced",
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
      enableParallax: false,
      enableTilt: false,
      enableZoom: false,
      enableScrub: false,
      enable3DBoot: false,
      tier: "low",
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
      enableParallax: true,
      enableTilt: !isTouch,
      enableZoom: true,
      enableScrub: false,
      enable3DBoot: true,
      tier: "mid",
    };
  }

  return {
    enableHeavyEffects: true,
    enableParticles: true,
    enableCursorLight: !isTouch,
    particleDensity: 1,
    enableScrollAnimations: true,
    enableConnectionLines: true,
    prefersReducedMotion: false,
    enableParallax: true,
    enableTilt: !isTouch,
    enableZoom: true,
    enableScrub: true,
    enable3DBoot: true,
    tier: "high",
  };
}

export default usePerformanceGuardrail;
