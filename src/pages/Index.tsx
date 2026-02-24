import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ArchitectureSection from "@/components/sections/ArchitectureSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import CursorProximityLight from "@/components/CursorProximityLight";
import BootLoader from "@/components/BootLoader";
import useSmoothScroll from "@/hooks/useSmoothScroll";
import useGsapScrollAnimations from "@/hooks/useGsapScrollAnimations";
import useAnimationChoreographer from "@/hooks/useAnimationChoreographer";
import usePerformanceGuardrail from "@/hooks/usePerformanceGuardrail";

const Index = () => {
  const [showBoot, setShowBoot] = useState(() => {
    if (sessionStorage.getItem("portfolio_booted")) return false;
    return true;
  });

  const perf = usePerformanceGuardrail();

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem("portfolio_booted", "true");
    setShowBoot(false);
  }, []);

  useSmoothScroll();
  useGsapScrollAnimations(perf.enableScrollAnimations);
  useAnimationChoreographer(perf.enableScrollAnimations);

  return (
    <>
      {showBoot && <BootLoader onComplete={handleBootComplete} />}
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {perf.enableParticles && (
          <ParticleBackground
            densityMultiplier={perf.particleDensity}
            enableConnectionLines={perf.enableConnectionLines}
          />
        )}
        {perf.enableCursorLight && <CursorProximityLight />}
        {perf.enableHeavyEffects && <CustomCursor />}
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ArchitectureSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
