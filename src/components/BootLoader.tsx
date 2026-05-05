import { useState, useEffect, useRef, Suspense, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import usePerformanceGuardrail from "@/hooks/usePerformanceGuardrail";

const BOOT_LINES = [
  "init://engineering-shell",
  "load://7-years.production",
  "mount://case-studies",
  "calibrate://ai-workflows",
  "ready://launch",
];

/* ============================================================
   ACT 1 — Starfield (instanced points warp + ignite)
============================================================ */
const Starfield = ({ count = 800, phase }: { count?: number; phase: number }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi) - 4;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
    const mat = ref.current.material as THREE.PointsMaterial;
    const target = phase >= 2 ? 0.85 : phase >= 1 ? 0.55 : 0.15;
    mat.opacity += (target - mat.opacity) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#a5f3fc"
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

/* ============================================================
   ACT 2 — Shard assembly (instanced, springs into wordmark area)
============================================================ */
const Shards = ({ count = 60, phase }: { count?: number; phase: number }) => {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      const target = new THREE.Vector3(
        (Math.random() - 0.5) * 3.2,
        (Math.random() - 0.5) * 1.4,
        (Math.random() - 0.5) * 0.6
      );
      const start = target
        .clone()
        .add(
          new THREE.Vector3(
            (Math.random() - 0.5) * 14,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 14 - 4
          )
        );
      return {
        start,
        target,
        rotStart: new THREE.Vector3(Math.random() * 6, Math.random() * 6, Math.random() * 6),
        rotTarget: new THREE.Vector3(0, 0, 0),
        scale: 0.06 + Math.random() * 0.12,
      };
    });
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    // assembly progress: 0 during act1, 0→1 across act2
    const t = state.clock.getElapsedTime();
    let p = 0;
    if (phase >= 2) p = Math.min(1, (t - (ref.current.userData.t2Start || t)) / 1.1);
    if (phase === 2 && !ref.current.userData.t2Start)
      ref.current.userData.t2Start = t;
    const eased = 1 - Math.pow(1 - p, 3);

    for (let i = 0; i < count; i++) {
      const d = data[i];
      const x = d.start.x + (d.target.x - d.start.x) * eased;
      const y = d.start.y + (d.target.y - d.start.y) * eased;
      const z = d.start.z + (d.target.z - d.start.z) * eased;
      dummy.position.set(x, y, z);
      const rx = d.rotStart.x + (d.rotTarget.x - d.rotStart.x) * eased + t * 0.2;
      const ry = d.rotStart.y + (d.rotTarget.y - d.rotStart.y) * eased + t * 0.15;
      const rz = d.rotStart.z + (d.rotTarget.z - d.rotStart.z) * eased;
      dummy.rotation.set(rx, ry, rz);
      const breathe = phase >= 3 ? 1 + Math.sin(t * 4) * 0.08 : 1;
      dummy.scale.setScalar(d.scale * (0.4 + 0.6 * eased) * breathe);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined as any, undefined as any, count]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#22d3ee"
        emissive="#22d3ee"
        emissiveIntensity={1.2}
        metalness={0.9}
        roughness={0.15}
      />
    </instancedMesh>
  );
};

/* ============================================================
   ACT 3 — Shockwave ring expanding from center
============================================================ */
const Shockwave = ({ phase }: { phase: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const startRef = useRef<number | null>(null);

  useFrame((state) => {
    if (!ref.current || !matRef.current) return;
    if (phase < 3) {
      ref.current.scale.setScalar(0.01);
      matRef.current.opacity = 0;
      startRef.current = null;
      return;
    }
    if (startRef.current === null) startRef.current = state.clock.getElapsedTime();
    const t = state.clock.getElapsedTime() - startRef.current;
    const s = 0.2 + t * 6;
    ref.current.scale.setScalar(s);
    matRef.current.opacity = Math.max(0, 0.7 - t * 1.2);
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.9, 1, 96]} />
      <meshBasicMaterial
        ref={matRef}
        color="#a5f3fc"
        transparent
        opacity={0}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
};

/* ============================================================
   Camera dolly
============================================================ */
const CameraRig = ({ phase }: { phase: number }) => {
  const { camera } = useThree();
  useFrame((_, delta) => {
    const targetZ = phase >= 3 ? 4.2 : phase >= 2 ? 2.6 : 5.5;
    camera.position.z += (targetZ - camera.position.z) * Math.min(1, delta * 2.4);
    camera.position.x += (Math.sin(performance.now() / 2200) * 0.25 - camera.position.x) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

/* ============================================================
   Scene
============================================================ */
const Scene = ({ phase, tier }: { phase: number; tier: string }) => {
  const heavy = tier === "high";
  const starCount = tier === "high" ? 800 : tier === "mid" ? 400 : 200;
  const shardCount = tier === "high" ? 60 : 40;

  return (
    <>
      <CameraRig phase={phase} />
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1.4} color="#22d3ee" />
      <pointLight position={[-3, -2, 2]} intensity={0.9} color="#fbbf24" />
      <Starfield count={starCount} phase={phase} />
      <Shards count={shardCount} phase={phase} />
      <Shockwave phase={phase} />
      {heavy && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.9} luminanceThreshold={0.25} luminanceSmoothing={0.2} mipmapBlur />
          <ChromaticAberration
            offset={new THREE.Vector2(phase >= 3 ? 0.0025 : 0.0009, phase >= 3 ? 0.0025 : 0.0009) as any}
            blendFunction={BlendFunction.NORMAL}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.65} />
        </EffectComposer>
      )}
    </>
  );
};

/* ============================================================
   Boot Loader (host)
============================================================ */
const BootLoader = ({ onComplete }: { onComplete: () => void }) => {
  const reduced = useReducedMotion();
  const perf = usePerformanceGuardrail();
  const [phase, setPhase] = useState(0); // 0 awaken · 1 typing · 2 assemble · 3 lock · 4 exit
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    setPhase(4);
    setTimeout(onComplete, 600);
  };

  // Keyboard skip
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") finish();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // boot sound
  useEffect(() => {
    if (reduced) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.6);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    } catch {
      /* no-op */
    }
  }, [reduced]);

  // Act timing
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 350); // start typing
    const t2 = setTimeout(() => setPhase(2), 700); // assemble
    const t3 = setTimeout(() => setPhase(3), 2100); // lock + shockwave
    const t4 = setTimeout(() => finish(), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // typing lines
  useEffect(() => {
    if (phase < 1 || phase >= 4) return;
    if (lineIndex >= BOOT_LINES.length) return;
    const cur = BOOT_LINES[lineIndex];
    if (charIndex < cur.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 18);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDisplayedLines((p) => [...p, cur]);
      setLineIndex((l) => l + 1);
      setCharIndex(0);
    }, 90);
    return () => clearTimeout(t);
  }, [phase, lineIndex, charIndex]);

  /* ---------- Reduced-motion / low-tier fallback ---------- */
  if (reduced || !perf.enable3DBoot) {
    return (
      <AnimatePresence>
        {phase < 4 && (
          <motion.div
            className="fixed inset-0 z-[10000] bg-background flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-display text-4xl md:text-6xl font-bold gradient-text"
            >
              MIB_
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-background overflow-hidden"
          exit={{ opacity: 0, scale: 1.08, filter: "blur(16px)" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* 3D Canvas */}
          <div className="absolute inset-0">
            <Canvas
              camera={{ position: [0, 0, 5.5], fov: 50 }}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              dpr={[1, 1.5]}
            >
              <Suspense fallback={null}>
                <Scene phase={phase} tier={perf.tier} />
              </Suspense>
            </Canvas>
          </div>

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, transparent 0%, hsl(var(--background)/0.55) 75%, hsl(var(--background)) 100%)",
            }}
          />

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ delay: 0.2 }}
            onClick={finish}
            className="absolute top-6 right-6 z-20 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary border border-border/40 px-3 py-1.5 rounded-md backdrop-blur-sm bg-background/30 transition-colors"
            aria-label="Skip intro"
          >
            Skip · ESC
          </motion.button>

          {/* System log */}
          <div className="absolute top-6 left-6 font-mono text-[11px] text-primary/70 space-y-1 max-w-[80vw] z-10">
            {displayedLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 0.85, x: 0 }}
                className="flex items-center gap-2"
              >
                <span className="text-accent/70">▸</span>
                <span>{line}</span>
                <span className="text-accent">✓</span>
              </motion.div>
            ))}
            {phase >= 1 && lineIndex < BOOT_LINES.length && (
              <div className="flex items-center gap-2">
                <span className="text-accent/70">▸</span>
                <span>
                  {BOOT_LINES[lineIndex].slice(0, charIndex)}
                  <span className="text-primary animate-pulse">█</span>
                </span>
              </div>
            )}
          </div>

          {/* Center wordmark — appears in Act 3 */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center pointer-events-none px-4">
            <AnimatePresence>
              {phase >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, filter: "blur(14px)", letterSpacing: "0.4em" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "0.05em" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight">
                    <span className="gradient-text">MIB_</span>
                  </h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="mt-3 text-xs md:text-sm text-muted-foreground font-mono tracking-[0.3em] uppercase"
                  >
                    Mohammed Ilyas B · AI-Augmented Engineer
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <div className="h-px bg-border/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.6, ease: "linear" }}
              />
            </div>
            <div className="flex justify-between mt-2 font-mono text-[10px] text-muted-foreground/60">
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
