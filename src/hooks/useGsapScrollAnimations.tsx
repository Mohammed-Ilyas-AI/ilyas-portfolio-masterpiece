import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useGsapScrollAnimations = () => {
  useEffect(() => {
    // Small delay to let DOM render
    const timer = setTimeout(() => {
      // Animate all sections
      const sections = document.querySelectorAll("section");

      sections.forEach((section) => {
        // Section reveal
        gsap.fromTo(
          section,
          {
            opacity: 0.3,
            y: 40,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 20%",
              toggleActions: "play reverse play reverse",
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
              y: 25,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play reverse play reverse",
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
