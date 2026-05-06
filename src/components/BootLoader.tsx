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
import gsap from "gsap";
import usePerformanceGuardrail from "@/hooks/usePerformanceGuardrail";

/* ============================================================
   Sample target positions from text rendered on offscreen canvas
   Returns N points distributed across the glyph fills, plus
   per-point "letter index" so we can reveal letter-by-letter.
============================================================ */
function sampleTextTargets(
  text: string,
  count: number
): { positions: Float32Array; letterIndex: Uint8Array } {
  const canvas = document.createElement("canvas");
  const W = 1024;
  const H = 256;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "900 200px 'Space Grotesk', system-ui, sans-serif";
  ctx.fillText(text, W / 2, H / 2);

  // Per-letter rough x-bounds for assigning letter index
  const letters = text.split("");
  const widths = letters.map((ch) => ctx.measureText(ch).width);
  const total = widths.reduce((a, b) => a + b, 0);
  let cursor = (W - total) / 2;
  const bounds: { start: number; end: number }[] = [];
  for (const w of widths) {
    bounds.push({ start: cursor, end: cursor + w });
    cursor += w;
  }

  const img = ctx.getImageData(0, 0, W, H).data;
  const candidates: { x: number; y: number }[] = [];
  // sparse sampling
  for (let y = 0; y < H; y += 3) {
    for (let x = 0; x < W; x += 3) {
      if (img[(y * W + x) * 4] > 128) candidates.push({ x, y });
    }
  }

  // shuffle and slice
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  const picked = candidates.slice(0, count);

  const positions = new Float32Array(picked.length * 3);
  const letterIndex = new Uint8Array(picked.length);

  // Map canvas px → 3D space (roughly -3..3 wide, -0.75..0.75 tall)
  const sx = 6 / W;
  const sy = 1.5 / H;
  picked.forEach((p, i) => {
    const x = (p.x - W / 2) * sx;
    const y = -(p.y - H / 2) * sy;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.15;

    // assign letter index by x bound
    let li = 0;
    for (let b = 0; b < bounds.length; b++) {
      if (p.x >= bounds[b].start && p.x <= bounds[b].end) {
        li = b;
        break;
      }
    }
    letterIndex[i] = li;
  });

  return { positions, letterIndex };
}

/* ============================================================
   Forge — the assembly mesh
============================================================ */
const Forge = ({
  count,
  letters,
  progressRef,
}: {
  count: number;
  letters: number;
  progressRef: React.MutableRefObject<{ overall: number; perLetter: number[] }>;
}) => {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { targets, indices, starts, scales, rotAxes } = useMemo(() => {
    const sampled = sampleTextTargets("MIB_", count);
    const n = sampled.positions.length / 3;
    const starts = new Float32Array(n * 3);
    const scales = new Float32Array(n);
    const rotAxes = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      // start far from center on a random direction
      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize();
      const dist = 8 + Math.random() * 12;
      starts[i * 3] = dir.x * dist;
      starts[i * 3 + 1] = dir.y * dist;
      starts[i * 3 + 2] = dir.z * dist - 4;
      scales[i] = 0.025 + Math.random() * 0.04;
      rotAxes[i * 3] = Math.random() * Math.PI * 2;
      rotAxes[i * 3 + 1] = Math.random() * Math.PI * 2;
      rotAxes[i * 3 + 2] = Math.random() * Math.PI * 2;
    }
    return {
      targets: sampled.positions,
      indices: sampled.letterIndex,
      starts,
      scales,
      rotAxes,
    };
  }, [count]);

  const total = targets.length / 3;
  const _v = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const { overall, perLetter } = progressRef.current;

    for (let i = 0; i < total; i++) {
      const li = indices[i];
      // per-letter progress 0..1 (each letter has its own gsap timeline)
      const lp = perLetter[li] ?? 0;
      // ease-out cubic
      const e = 1 - Math.pow(1 - lp, 3);

      const sx = starts[i * 3];
      const sy = starts[i * 3 + 1];
      const sz = starts[i * 3 + 2];
      const tx = targets[i * 3];
      const ty = targets[i * 3 + 1];
      const tz = targets[i * 3 + 2];

      const x = sx + (tx - sx) * e;
      const y = sy + (ty - sy) * e;
      const z = sz + (tz - sz) * e;
      dummy.position.set(x, y, z);

      // spin rapidly while traveling, settle when assembled
      const spin = (1 - e) * 8;
      dummy.rotation.set(
        rotAxes[i * 3] + t * spin,
        rotAxes[i * 3 + 1] + t * spin * 0.8,
        rotAxes[i * 3 + 2] + t * spin * 0.6
      );

      // breathing pulse after assembly
      const breathe = overall > 0.95 ? 1 + Math.sin(t * 5) * 0.12 : 1;
      const s = scales[i] * (0.4 + 0.6 * e) * breathe;
      dummy.scale.setScalar(s);

      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined as any, undefined as any, total]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#22d3ee"
        emissive="#22d3ee"
        emissiveIntensity={1.6}
        metalness={0.85}
        roughness={0.18}
      />
    </instancedMesh>
  );
};

/* ============================================================
   Drifting code-glyph sparks (background ambience)
============================================================ */
const Sparks = ({ count }: { count: number }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 18;
      a[i * 3 + 1] = (Math.random() - 0.5) * 12;
      a[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4;
    }
    return a;
  }, [count]);
  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.rotation.y += d * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#a5f3fc"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

/* ============================================================
   Shockwave ring (Act 4 ignition)
============================================================ */
const Shockwave = ({ trigger }: { trigger: boolean }) => {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const startRef = useRef<number | null>(null);

  useFrame((state) => {
    if (!ref.current || !matRef.current) return;
    if (!trigger) {
      ref.current.scale.setScalar(0.01);
      matRef.current.opacity = 0;
      startRef.current = null;
      return;
    }
    if (startRef.current === null) startRef.current = state.clock.getElapsedTime();
    const t = state.clock.getElapsedTime() - startRef.current;
    ref.current.scale.setScalar(0.4 + t * 7);
    matRef.current.opacity = Math.max(0, 0.85 - t * 1.1);
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
const CameraRig = ({
  phaseRef,
}: {
  phaseRef: React.MutableRefObject<number>;
}) => {
  const { camera } = useThree();
  useFrame((_, d) => {
    const p = phaseRef.current; // 0..1 overall, plus 1.x for ignition
    const targetZ = p >= 1 ? 1.2 : p >= 0.85 ? 3.2 : p >= 0.4 ? 4 : 6.5;
    camera.position.z += (targetZ - camera.position.z) * Math.min(1, d * 2);
    camera.position.x +=
      (Math.sin(performance.now() / 2400) * 0.15 - camera.position.x) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

/* ============================================================
   Scene
============================================================ */
const Scene = ({
  tier,
  progressRef,
  ignite,
  phaseRef,
}: {
  tier: string;
  progressRef: React.MutableRefObject<{ overall: number; perLetter: number[] }>;
  ignite: boolean;
  phaseRef: React.MutableRefObject<number>;
}) => {
  const heavy = tier === "high";
  const fragmentCount = tier === "high" ? 1400 : 700;
  const sparkCount = tier === "high" ? 600 : 250;

  return (
    <>
      <CameraRig phaseRef={phaseRef} />
      <ambientLight intensity={0.45} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#22d3ee" />
      <pointLight position={[-3, -2, 2]} intensity={1} color="#fbbf24" />
      <Sparks count={sparkCount} />
      <Forge count={fragmentCount} letters={4} progressRef={progressRef} />
      <Shockwave trigger={ignite} />
      {heavy && (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={1.1}
            luminanceThreshold={0.22}
            luminanceSmoothing={0.2}
            mipmapBlur
          />
          <ChromaticAberration
            offset={new THREE.Vector2(ignite ? 0.003 : 0.001, ignite ? 0.003 : 0.001) as any}
            radialModulation={false}
            modulationOffset={0}
            blendFunction={BlendFunction.NORMAL}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.7} />
        </EffectComposer>
      )}
    </>
  );
};

/* ============================================================
   Boot Loader — "Forge of MIB_"
============================================================ */
const BootLoader = ({ onComplete }: { onComplete: () => void }) => {
  const reduced = useReducedMotion();
  const perf = usePerformanceGuardrail();
  const [exiting, setExiting] = useState(false);
  const [igniteFlash, setIgniteFlash] = useState(false);
  const [ignite, setIgnite] = useState(false);
  const finished = useRef(false);

  // shared progress refs (mutated by GSAP, read by useFrame — no React re-renders)
  const progressRef = useRef<{ overall: number; perLetter: number[] }>({
    overall: 0,
    perLetter: [0, 0, 0, 0],
  });
  const phaseRef = useRef(0);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    setIgnite(true);
    setIgniteFlash(true);
    setTimeout(() => setExiting(true), 350);
    setTimeout(onComplete, 950);
  };

  // Skip on key / click
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // GSAP master timeline drives the assembly + ignition
  useEffect(() => {
    if (reduced || !perf.enable3DBoot) {
      const t = setTimeout(() => onComplete(), 700);
      return () => clearTimeout(t);
    }

    const tl = gsap.timeline({
      onUpdate: () => {
        phaseRef.current = tl.progress();
      },
      onComplete: () => finish(),
    });

    // Act 1 — Void (1.0s): nothing happens, just camera + sparks
    tl.to({}, { duration: 1.0 });

    // Act 2 — Call (1.4s): all letters start drifting in slowly (slight progress)
    tl.to(progressRef.current.perLetter, {
      0: 0.15,
      1: 0.15,
      2: 0.15,
      3: 0.15,
      duration: 1.4,
      ease: "power1.in",
    });

    // Act 3 — Assembly: M, I, B, _ snap into place sequentially
    tl.to(progressRef.current.perLetter, { 0: 1, duration: 0.55, ease: "power3.out" });
    tl.to(progressRef.current.perLetter, { 1: 1, duration: 0.55, ease: "power3.out" }, "-=0.15");
    tl.to(progressRef.current.perLetter, { 2: 1, duration: 0.55, ease: "power3.out" }, "-=0.15");
    tl.to(progressRef.current.perLetter, { 3: 1, duration: 0.5, ease: "power3.out" }, "-=0.15");

    // brief lock
    tl.to(progressRef.current, { overall: 1, duration: 0.5, ease: "power2.inOut" });

    // hold a beat then ignition triggers via onComplete
    tl.to({}, { duration: 0.4 });

    return () => {
      tl.kill();
    };
  }, [reduced, perf.enable3DBoot]);

  /* Reduced-motion / low-tier fallback */
  if (reduced || !perf.enable3DBoot) {
    return (
      <AnimatePresence>
        {!exiting && (
          <motion.div
            className="fixed inset-0 z-[10000] bg-background flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold gradient-text">
              MIB_
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-background overflow-hidden cursor-pointer"
          onClick={finish}
          exit={{ opacity: 0, scale: 1.12, filter: "blur(20px)" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* 3D Canvas */}
          <div className="absolute inset-0">
            <Canvas
              camera={{ position: [0, 0, 6.5], fov: 50 }}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              dpr={[1, perf.tier === "high" ? 1.75 : 1.25]}
            >
              <Suspense fallback={null}>
                <Scene
                  tier={perf.tier}
                  progressRef={progressRef}
                  ignite={ignite}
                  phaseRef={phaseRef}
                />
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

          {/* Ignition flash */}
          <AnimatePresence>
            {igniteFlash && (
              <motion.div
                className="absolute inset-0 pointer-events-none bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.85, 0] }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={(e) => {
              e.stopPropagation();
              finish();
            }}
            className="absolute top-6 right-6 z-20 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary border border-border/40 px-3 py-1.5 rounded-md backdrop-blur-sm bg-background/30 transition-colors"
            aria-label="Skip intro"
          >
            Skip intro →
          </motion.button>

          {/* Whisper hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-mono z-10 pointer-events-none"
          >
            Forging the experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootLoader;
