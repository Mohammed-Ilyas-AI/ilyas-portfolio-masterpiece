import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useGsapScrollAnimations = () => {
  useEffect(() => {
    // Small delay to let DOM render
    const timer = setTimeout(() => {
      // Skip the hero section (first section) — it uses Framer Motion
      const sections = document.querySelectorAll("section:not(:first-of-type)");

      sections.forEach((section) => {
        // Section reveal - play on enter, don't reverse
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 50,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              end: "top 30%",
              toggleActions: "play none none none",
            },
          }
        );

        // Stagger text elements inside each section
        const textEls = section.querySelectorAll("h2, h3, p, .glass-card");
        if (textEls.length > 0) {
          gsap.fromTo(
            textEls,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "top 30%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
};

export default useGsapScrollAnimations;
