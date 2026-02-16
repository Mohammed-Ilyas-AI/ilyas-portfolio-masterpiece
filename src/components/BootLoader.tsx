import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "Initializing Portfolio…",
  "Loading Modules…",
  "Rendering Experience…",
];

const NeuralGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const count = 60;
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "hsla(186, 100%, 50%, 0.3)";
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `hsla(186, 100%, 50%, ${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

const GlitchText = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block">
      <motion.span
        className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground relative inline-block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        {/* Glitch layers */}
        <span
          className="absolute inset-0 text-primary/80 animate-boot-glitch-1"
          style={{ clipPath: "inset(20% 0 30% 0)" }}
          aria-hidden
        >
          {text}
        </span>
        <span
          className="absolute inset-0 text-accent/60 animate-boot-glitch-2"
          style={{ clipPath: "inset(60% 0 10% 0)" }}
          aria-hidden
        >
          {text}
        </span>
        {text}
      </motion.span>
    </div>
  );
};

const BootLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0); // 0=typing, 1=name, 2=subtitle, 3=glow, 4=exit
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play boot sound
  useEffect(() => {
    // Create a subtle boot sound using Web Audio API
    try {
      const audioCtx = new AudioContext();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(660, audioCtx.currentTime + 0.15);
      osc2.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.45);
      gain2.gain.setValueAtTime(0, audioCtx.currentTime);
      gain2.gain.setValueAtTime(0.02, audioCtx.currentTime + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

      osc.connect(gain).connect(audioCtx.destination);
      osc2.connect(gain2).connect(audioCtx.destination);
      osc.start();
      osc2.start();
      osc.stop(audioCtx.currentTime + 0.5);
      osc2.stop(audioCtx.currentTime + 0.5);
    } catch {
      // Silent fail if audio blocked
    }
  }, []);

  // Typing effect for system lines
  useEffect(() => {
    if (phase !== 0) return;
    if (lineIndex >= BOOT_LINES.length) {
      setPhase(1);
      return;
    }

    const currentLine = BOOT_LINES[lineIndex];
    if (charIndex < currentLine.length) {
      const timer = setTimeout(() => setCharIndex((c) => c + 1), 25);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentLine]);
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [phase, lineIndex, charIndex]);

  // Phase progression
  useEffect(() => {
    if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 600);
      return () => clearTimeout(t);
    }
    if (phase === 2) {
      const t = setTimeout(() => setPhase(3), 500);
      return () => clearTimeout(t);
    }
    if (phase === 3) {
      const t = setTimeout(() => setPhase(4), 400);
      return () => clearTimeout(t);
    }
    if (phase === 4) {
      const t = setTimeout(onComplete, 500);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center overflow-hidden"
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Neural grid background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 0.15 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <NeuralGrid />
          </motion.div>

          {/* System text - top left */}
          <div className="absolute top-8 left-8 font-mono text-xs text-primary/60 space-y-1">
            {displayedLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="flex items-center gap-2"
              >
                <span className="text-accent/60">▸</span>
                <span>{line}</span>
                <span className="text-accent">✓</span>
              </motion.div>
            ))}
            {phase === 0 && lineIndex < BOOT_LINES.length && (
              <div className="flex items-center gap-2">
                <span className="text-accent/60">▸</span>
                <span>
                  {BOOT_LINES[lineIndex].slice(0, charIndex)}
                  <span className="animate-blink text-primary">█</span>
                </span>
              </div>
            )}
          </div>

          {/* Center content */}
          <div className="relative z-10 text-center">
            {/* Name with glitch */}
            <AnimatePresence>
              {phase >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <GlitchText text="MOHAMMED ILYAS B" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtitle */}
            <AnimatePresence>
              {phase >= 2 && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-4 text-lg md:text-xl text-muted-foreground font-display tracking-wider"
                >
                  Architecting Scalable Intelligence
                </motion.p>
              )}
            </AnimatePresence>

            {/* Glow pulse */}
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.5, 2] }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 -z-10 mx-auto rounded-full"
                style={{
                  background: "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)",
                  width: "400px",
                  height: "400px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
          </div>

          {/* Bottom progress bar */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="h-px bg-border/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.8, ease: "linear" }}
              />
            </div>
            <div className="flex justify-between mt-2 font-mono text-[10px] text-muted-foreground/40">
              <span>SYS.BOOT v2.026</span>
              <span>PORTFOLIO.RENDER</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootLoader;
