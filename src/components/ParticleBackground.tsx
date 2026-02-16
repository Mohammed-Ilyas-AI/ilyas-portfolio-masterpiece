import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  depth: number; // 0-1 for parallax layers
  baseSpeed: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const scrollRef = useRef(0);
  const animationRef = useRef<number>();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const count = Math.floor(
        (window.innerWidth * window.innerHeight) / 15000
      );
      particlesRef.current = [];
      for (let i = 0; i < count; i++) {
        const depth = Math.random();
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5 + depth * 1,
          opacity: Math.random() * 0.4 + 0.15,
          depth,
          baseSpeed: 0.2 + depth * 0.4,
        });
      }
    };

    const color = isDark
      ? { h: 186, s: 100, l: 50 }
      : { h: 186, s: 85, l: 35 };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scroll = scrollRef.current;

      particlesRef.current.forEach((p, i) => {
        // Speed variation based on depth
        p.x += p.vx * p.baseSpeed;
        p.y += p.vy * p.baseSpeed;

        // Parallax offset based on scroll & depth
        const parallaxY = scroll * p.depth * 0.05;

        // Wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const drawY = ((p.y + parallaxY) % canvas.height + canvas.height) % canvas.height;

        const baseOpacity = isDark ? p.opacity : p.opacity * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${baseOpacity})`;
        ctx.fill();

        // Connections to nearby particles
        particlesRef.current.slice(i + 1).forEach((other) => {
          const odY = ((other.y + scroll * other.depth * 0.05) % canvas.height + canvas.height) % canvas.height;
          const dx = p.x - other.x;
          const dy = drawY - odY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const lineOp = isDark
              ? 0.12 * (1 - dist / 120)
              : 0.08 * (1 - dist / 120);
            ctx.beginPath();
            ctx.moveTo(p.x, drawY);
            ctx.lineTo(other.x, odY);
            ctx.strokeStyle = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${lineOp})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        // Mouse proximity: stronger connection lines near cursor
        const mdx = mouseRef.current.x - p.x;
        const mdy = mouseRef.current.y - drawY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < 180) {
          const force = (180 - mDist) / 180;
          // Draw connection to cursor
          const lineOp = isDark ? force * 0.2 : force * 0.12;
          ctx.beginPath();
          ctx.moveTo(p.x, drawY);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${lineOp})`;
          ctx.lineWidth = 0.3 + force * 0.5;
          ctx.stroke();

          // Repel
          p.vx -= (mdx / mDist) * force * 0.015;
          p.vy -= (mdy / mDist) * force * 0.015;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;
      });

      animationRef.current = requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};

export default ParticleBackground;
