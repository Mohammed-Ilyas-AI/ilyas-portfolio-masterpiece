import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Master animation choreographer that synchronizes
 * hero → about → skills → experience with timeline-based transitions.
 * Sections animate in once on scroll and stay visible.
 */
const useAnimationChoreographer = (enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    // Let DOM settle after mount
    const timer = setTimeout(() => {
      const sections = [
        { id: "about", direction: "left" },
        { id: "skills", direction: "right" },
        { id: "experience", direction: "left" },
        { id: "projects", direction: "right" },
      ];

      sections.forEach(({ id, direction }) => {
        const section = document.getElementById(id);
        if (!section) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });

        // Section header (h2)
        const header = section.querySelector("h2");
        if (header) {
          tl.fromTo(
            header,
            { opacity: 0, y: 40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" },
            0
          );
        }

        // Divider line
        const divider = section.querySelector(".bg-gradient-to-r.from-primary");
        if (divider) {
          tl.fromTo(
            divider,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: "power2.out" },
            0.2
          );
        }

        // Subtitle paragraph
        const subtitle = section.querySelector("h2 + p, h2 + div + p");
        if (subtitle) {
          tl.fromTo(
            subtitle,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            0.15
          );
        }

        // Glass cards and main content
        const cards = section.querySelectorAll(".glass-card");
        if (cards.length > 0) {
          const xOffset = direction === "left" ? -30 : 30;
          tl.fromTo(
            cards,
            { opacity: 0, x: xOffset, y: 20 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power3.out",
            },
            0.3
          );
        }

        // Badges and tags
        const badges = section.querySelectorAll(".rounded-full, .rounded-lg");
        if (badges.length > 0) {
          tl.fromTo(
            badges,
            { opacity: 0, scale: 0.85 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              stagger: 0.02,
              ease: "back.out(1.4)",
            },
            0.5
          );
        }
      });

      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [enabled]);
};

export default useAnimationChoreographer;
