import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const BOOT_LINES = [
  "Booting engineering shell…",
  "Loading capabilities · 7 yrs production…",
  "Mounting case studies…",
  "Calibrating AI workflows…",
];

/* ---------- 3D scene ---------- */

const RotatingCore = ({ phase }: { phase: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
      const s = phase >= 3 ? 1.6 : 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.06;
      meshRef.current.scale.setScalar(s);
    }
    if (ringRef1.current) ringRef1.current.rotation.z += delta * 0.6;
    if (ringRef2.current) ringRef2.current.rotation.x += delta * 0.5;
    if (ringRef3.current) ringRef3.current.rotation.y -= delta * 0.4;
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.1, 4]} />
          <MeshDistortMaterial
            color="#22d3ee"
            emissive="#0891b2"
            emissiveIntensity={0.6}
            distort={0.45}
            speed={2.5}
            roughness={0.2}
            metalness={0.85}
          />
        </mesh>
      </Float>

      {/* Orbital rings */}
      <mesh ref={ringRef1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.012, 16, 120]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.55} />
      </mesh>
      <mesh ref={ringRef2} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[2.1, 0.008, 16, 120]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ringRef3} rotation={[Math.PI / 3, Math.PI / 5, 0]}>
        <torusGeometry args={[2.45, 0.006, 16, 120]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.3} />
      </mesh>

      <Sparkles count={120} scale={6} size={2.4} speed={0.6} color="#22d3ee" />
      <Sparkles count={60} scale={5} size={1.8} speed={0.4} color="#fbbf24" />

      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#22d3ee" />
      <pointLight position={[-3, -2, 2]} intensity={1} color="#fbbf24" />
    </group>
  );
};

/* ---------- Boot loader ---------- */

const BootLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0); // 0=typing, 1=name, 2=subtitle, 3=glow, 4=exit
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  // boot sound
  useEffect(() => {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch {
      /* ignore */
    }
  }, []);

  // typing
  useEffect(() => {
    if (phase !== 0) return;
    if (lineIndex >= BOOT_LINES.length) {
      setPhase(1);
      return;
    }
    const cur = BOOT_LINES[lineIndex];
    if (charIndex < cur.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 18);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDisplayedLines((p) => [...p, cur]);
      setLineIndex((l) => l + 1);
      setCharIndex(0);
    }, 120);
    return () => clearTimeout(t);
  }, [phase, lineIndex, charIndex]);

  // phase progression
  useEffect(() => {
    if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 700);
      return () => clearTimeout(t);
    }
    if (phase === 2) {
      const t = setTimeout(() => setPhase(3), 600);
      return () => clearTimeout(t);
    }
    if (phase === 3) {
      const t = setTimeout(() => setPhase(4), 500);
      return () => clearTimeout(t);
    }
    if (phase === 4) {
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* 3D Canvas */}
          <div className="absolute inset-0">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 1.75]}
            >
              <Suspense fallback={null}>
                <RotatingCore phase={phase} />
              </Suspense>
            </Canvas>
          </div>

          {/* Subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, transparent 0%, hsl(var(--background)/0.6) 75%, hsl(var(--background)) 100%)",
            }}
          />

          {/* System log top-left */}
          <div className="absolute top-6 left-6 font-mono text-[11px] text-primary/70 space-y-1 max-w-[80vw] z-10">
            {displayedLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 0.75, x: 0 }}
                className="flex items-center gap-2"
              >
                <span className="text-accent/70">▸</span>
                <span>{line}</span>
                <span className="text-accent">✓</span>
              </motion.div>
            ))}
            {phase === 0 && lineIndex < BOOT_LINES.length && (
              <div className="flex items-center gap-2">
                <span className="text-accent/70">▸</span>
                <span>
                  {BOOT_LINES[lineIndex].slice(0, charIndex)}
                  <span className="animate-blink text-primary">█</span>
                </span>
              </div>
            )}
          </div>

          {/* Center text */}
          <div className="relative z-10 text-center pointer-events-none px-4">
            <AnimatePresence>
              {phase >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                    <span className="gradient-text">MOHAMMED ILYAS B</span>
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {phase >= 2 && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-3 text-sm md:text-base text-muted-foreground font-mono tracking-[0.25em] uppercase"
                >
                  Full-Stack Engineer · AI-Augmented
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom progress */}
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <div className="h-px bg-border/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.6, ease: "linear" }}
              />
            </div>
            <div className="flex justify-between mt-2 font-mono text-[10px] text-muted-foreground/50">
              <span>SYS.BOOT v2026.05</span>
              <span>RENDER · ENGINE READY</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootLoader;
