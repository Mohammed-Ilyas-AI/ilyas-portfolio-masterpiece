import { useEffect, useRef } from "react";

const CursorProximityLight = () => {
  const lightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const mouseRef = useRef({ x: -200, y: -200 });
  const currentRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const light = lightRef.current;
      if (!light) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Smooth lerp
      currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * 0.15;
      currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * 0.15;

      // Check proximity to headings for intensity boost
      const headings = document.querySelectorAll("h1, h2, h3");
      let intensityBoost = 0;
      headings.forEach((h) => {
        const rect = h.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt(
          (mouseRef.current.x - cx) ** 2 + (mouseRef.current.y - cy) ** 2
        );
        if (dist < 200) {
          intensityBoost = Math.max(intensityBoost, 1 - dist / 200);
        }
      });

      const baseOpacity = 0.06;
      const opacity = baseOpacity + intensityBoost * 0.08;
      const size = 300 + intensityBoost * 100;

      light.style.transform = `translate(${currentRef.current.x - size / 2}px, ${currentRef.current.y - size / 2}px)`;
      light.style.width = `${size}px`;
      light.style.height = `${size}px`;
      light.style.opacity = `${opacity}`;

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div
      ref={lightRef}
      className="fixed top-0 left-0 pointer-events-none z-[1] rounded-full will-change-transform"
      style={{
        background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, hsl(var(--primary) / 0.1) 40%, transparent 70%)",
        transition: "width 0.3s ease, height 0.3s ease, opacity 0.3s ease",
      }}
    />
  );
};

export default CursorProximityLight;
