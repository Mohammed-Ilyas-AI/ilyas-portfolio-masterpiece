import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  depth: number;
  baseSpeed: number;
  pulsePhase: number;
  pulseSpeed: number;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
}

interface ParticleBackgroundProps {
  densityMultiplier?: number;
  enableConnectionLines?: boolean;
}

const ParticleBackground = ({
  densityMultiplier = 1,
  enableConnectionLines = true,
}: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const scrollRef = useRef(0);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
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
      // More particles — divisor reduced from 15000 to 8000
      const baseCount = Math.floor(
        (window.innerWidth * window.innerHeight) / 8000
      );
      const count = Math.max(20, Math.floor(baseCount * densityMultiplier));
      particlesRef.current = [];
      for (let i = 0; i < count; i++) {
        const depth = Math.random();
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.5 + 0.5 + depth * 1.5,
          opacity: Math.random() * 0.5 + 0.15,
          depth,
          baseSpeed: 0.15 + depth * 0.35,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.01 + Math.random() * 0.02,
          orbitRadius: Math.random() * 1.5,
          orbitAngle: Math.random() * Math.PI * 2,
          orbitSpeed: 0.005 + Math.random() * 0.01,
        });
      }
    };

    const color = isDark
      ? { h: 186, s: 100, l: 50 }
      : { h: 186, s: 85, l: 35 };

    const accentColor = isDark
      ? { h: 170, s: 80, l: 45 }
      : { h: 220, s: 70, l: 50 };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scroll = scrollRef.current;
      const particles = particlesRef.current;
      timeRef.current += 1;
      const t = timeRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Micro-orbit drift for organic feel
        p.orbitAngle += p.orbitSpeed;
        const orbitX = Math.cos(p.orbitAngle) * p.orbitRadius;
        const orbitY = Math.sin(p.orbitAngle) * p.orbitRadius;

        p.x += p.vx * p.baseSpeed + orbitX * 0.1;
        p.y += p.vy * p.baseSpeed + orbitY * 0.1;

        const parallaxY = scroll * p.depth * 0.05;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const drawY =
          ((p.y + parallaxY) % canvas.height + canvas.height) % canvas.height;

        // Pulsing opacity
        const pulse = Math.sin(t * p.pulseSpeed + p.pulsePhase) * 0.15 + 0.85;
        const baseOpacity = (isDark ? p.opacity : p.opacity * 0.5) * pulse;

        // Glow effect for larger particles
        if (p.size > 2) {
          const gradient = ctx.createRadialGradient(
            p.x, drawY, 0, p.x, drawY, p.size * 3
          );
          gradient.addColorStop(0, `hsla(${color.h}, ${color.s}%, ${color.l}%, ${baseOpacity * 0.4})`);
          gradient.addColorStop(1, `hsla(${color.h}, ${color.s}%, ${color.l}%, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, drawY, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Core particle
        ctx.beginPath();
        ctx.arc(p.x, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${baseOpacity})`;
        ctx.fill();

        // Connection lines between nearby particles
        if (enableConnectionLines) {
          for (let j = i + 1; j < particles.length; j++) {
            const other = particles[j];
            const odY =
              ((other.y + scroll * other.depth * 0.05) % canvas.height +
                canvas.height) %
              canvas.height;
            const dx = p.x - other.x;
            const dy = drawY - odY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
              const lineOp = isDark
                ? 0.12 * (1 - dist / 150)
                : 0.08 * (1 - dist / 150);
              // Alternate accent color for some lines
              const useAccent = (i + j) % 5 === 0;
              const lc = useAccent ? accentColor : color;
              ctx.beginPath();
              ctx.moveTo(p.x, drawY);
              ctx.lineTo(other.x, odY);
              ctx.strokeStyle = `hsla(${lc.h}, ${lc.s}%, ${lc.l}%, ${lineOp})`;
              ctx.lineWidth = 0.4 + (1 - dist / 150) * 0.4;
              ctx.stroke();
            }
          }
        }

        // Mouse proximity interaction
        const mdx = mouseRef.current.x - p.x;
        const mdy = mouseRef.current.y - drawY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < 200) {
          const force = (200 - mDist) / 200;
          const lineOp = isDark ? force * 0.25 : force * 0.15;

          // Draw line to cursor
          ctx.beginPath();
          ctx.moveTo(p.x, drawY);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `hsla(${accentColor.h}, ${accentColor.s}%, ${accentColor.l}%, ${lineOp})`;
          ctx.lineWidth = 0.3 + force * 0.7;
          ctx.stroke();

          // Brighten particle near cursor
          ctx.beginPath();
          ctx.arc(p.x, drawY, p.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${accentColor.h}, ${accentColor.s}%, ${accentColor.l}%, ${force * 0.3})`;
          ctx.fill();

          // Gentle repulsion
          p.vx -= (mdx / mDist) * force * 0.02;
          p.vy -= (mdy / mDist) * force * 0.02;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;
      }

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
  }, [isDark, densityMultiplier, enableConnectionLines]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};

export default ParticleBackground;
