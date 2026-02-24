import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lightweight scroll animations for non-choreographed sections.
 * Skips hero (Framer Motion) and choreographed sections (about, skills, experience, projects).
 */
const useGsapScrollAnimations = (enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    const timer = setTimeout(() => {
      // Only target sections NOT handled by the choreographer
      const choreographedIds = new Set(["about", "skills", "experience", "projects"]);
      const sections = document.querySelectorAll("section");

      sections.forEach((section) => {
        // Skip hero (first section) and choreographed sections
        if (section === sections[0]) return;
        if (section.id && choreographedIds.has(section.id)) return;

        gsap.fromTo(
          section,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );

        const textEls = section.querySelectorAll("h2, h3, p, .glass-card");
        if (textEls.length > 0) {
          gsap.fromTo(
            textEls,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [enabled]);
};

export default useGsapScrollAnimations;
