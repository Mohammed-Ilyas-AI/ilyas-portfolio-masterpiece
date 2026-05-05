
# Elite Animation System + Cinematic 3D Boot Loader

Goal: transform the portfolio from "animations applied" into a cinematic, intentional product experience (Apple/Linear/Vercel grade). Every effect must serve storytelling, focus, or depth — never decoration. Boot loader becomes a true 3D cinematic intro.

---

## 1. Section-by-Section Animation Map

```text
BOOT LOADER  → cinematic 3D intro (NEW): camera flythrough + logo assembly
HERO         → multi-layer parallax + load choreography + magnetic CTAs
VALUE PROP   → scroll-pinned headline scale + animated counters
TRUST        → 3D tilt cards + bidirectional reverse reveal
PROJECTS     → cinematic zoom-in/out + 3D tilt cards w/ spotlight
MINDSET      → scroll-scrubbed word-by-word reveal
CAPABILITIES → grid stagger + bidirectional fade
EXPERIENCE   → SVG timeline path drawing on scroll
CTA          → parallax background + scale-pulse
CONTACT      → fade + magnetic inputs
```

| Section | Animation | Trigger | Purpose | Cost |
|---|---|---|---|---|
| Boot | 3D camera flythrough → logo assembly → fade-out | mount | cinematic first impression | medium (one-time) |
| Hero | 3-layer parallax (bg/mid/fg) | scroll Y | depth | low |
| Value | Pinned headline scales 1→0.85 | ScrollTrigger pin | focus shift | medium |
| Value | Counters 0→N | inView | tangibility | low |
| Trust | 3D tilt + spotlight | hover | premium | low |
| Trust | Bidirectional reveal | IO | dynamic flow | low |
| Projects | scale 0.94→1 enter, 1→1.03+blur leave | scroll progress | cinematic | medium |
| Projects | Card 3D tilt + cursor spotlight | hover | depth | low |
| Mindset | Word-by-word scrub reveal | ScrollTrigger scrub | storytelling | medium |
| Capabilities | Stagger grid bidirectional | inView | rhythm | low |
| Experience | SVG timeline path draws | scrub | progress narrative | low |
| CTA | Background gradient parallax + pulse | scroll | emphasis | low |
| Contact | Field magnetism + fade | focus / inView | polish | low |

---

## 2. Cinematic 3D Boot Loader (NEW)

Replaces current `BootLoader.tsx`. Built with `@react-three/fiber` + `@react-three/drei` (already installed).

**Three-act sequence (~3.2s total):**

```text
ACT 1 (0.0–1.2s) — "AWAKEN"
  • Black void. Camera deep inside scene.
  • Particle starfield ignites (instanced points, 800 nodes).
  • Volumetric fog reveals a dark grid floor with neon edge glow.
  • Audio-reactive-style pulse (visual only) syncs with subtle bass-less hum.

ACT 2 (1.2–2.4s) — "ASSEMBLE"
  • Camera dollies forward through the starfield (z: 8 → 2).
  • Fragmented geometric shards (instanced meshes) fly in from off-screen
    and snap together into the "MIB_" wordmark in 3D space.
  • Each shard uses spring physics + slight rotation overshoot.
  • Chromatic aberration + bloom peak at impact frame.

ACT 3 (2.4–3.2s) — "HANDOFF"
  • Logo locks, emits a horizontal scanline shockwave (shader ring).
  • Camera pulls back slightly, scene desaturates.
  • Whole canvas scales 1→1.08 + opacity 1→0 → unmounts → Hero revealed.
```

**Tech details:**
- `<Canvas>` with `dpr={[1, 1.5]}` (cap pixel ratio for perf).
- Postprocessing: `Bloom` + `ChromaticAberration` from `@react-three/postprocessing` (add dep).
- Shards: single `InstancedMesh` (1 draw call, ~60 instances).
- Starfield: `<Points>` with custom shader for size attenuation.
- Skip button (top-right) appears at 0.4s; `Esc` or click also skips.
- `sessionStorage` flag (existing) ensures one-per-session.
- Reduced-motion / low-tier device → fallback to a fast 600ms gradient fade with logo (no Three.js mounted at all).
- Mobile: simplified — no postprocessing, fewer particles (200), no chromatic aberration.

**Files:**
- Rewrite `src/components/BootLoader.tsx`
- New: `src/components/boot/Scene.tsx`, `Starfield.tsx`, `LogoAssembly.tsx`, `Shockwave.tsx`
- New dep: `@react-three/postprocessing@^2.16` (matches r3f v8)

---

## 3. Animation Architecture (rest of site)

New primitives in `src/lib/motion/`:

```text
ScrollReveal.tsx       # bidirectional reveal (IN entering, OUT leaving)
ParallaxLayer.tsx      # useScroll + useTransform; speed prop
ZoomSection.tsx        # scale/blur driven by section scroll progress
TiltCard.tsx           # 3D perspective tilt + cursor spotlight overlay
ScrollScrubText.tsx    # word-by-word reveal scrubbed by scroll
Counter.tsx            # animated number on inView
useReducedMotion.ts    # respects OS pref + perf guardrail
```

All primitives early-return to static when reduced-motion or low-tier.

## 4. Scroll Storytelling

- Framer Motion `useScroll({ target, offset })` per section (scoped, no global thrash).
- Adjacent sections share overlapping offsets so opacity/scale curves crossfade — no abrupt cuts.
- Only ONE pinned moment (Value headline). Overuse kills flow.

## 5. Parallax Depth (Hero + transitions only)

```text
bg  (particles)  → y: 0 → -40px   slow
mid (headline)   → y: 0 → -120px  normal
fg  (CTAs/chip)  → y: 0 → -180px  fast
```
GPU-only `translate3d`. Off on mobile + reduced-motion.

## 6. Immersive Zoom (Projects)

`<ZoomSection>` wraps Projects:
- Enter 0–0.35: `scale 0.94→1`, `blur 8px→0`.
- Leave 0.7–1: `scale 1→1.03`, `blur 0→6px`, `opacity 1→0.4`.
- Mobile: scale only (blur is expensive).

## 7. 3D Hover Tilt (Project + Trust cards, primary CTA)

`perspective: 1000px`, max ±6°, spring `{stiffness:200, damping:20}`. Inner spotlight radial-gradient at 8% opacity follows cursor. Disabled on `(pointer: coarse)`.

## 8. Reverse Reveal

`<ScrollReveal mode="bidirectional">`:
- Enter from bottom: `y:40→0, opacity:0→1`.
- Leave from top: `y:0→-20, opacity:1→0.3` (not full 0 — keeps readable on quick scroll-back).
- `mode="once"` for headings.

## 9. Performance Engineering

- Only `transform`/`opacity`/`filter` (filter desktop-only).
- `will-change` set on enter, removed on complete.
- Scoped `useScroll` refs.
- `React.memo` on TiltCard; mouse handler rAF-throttled.
- Extend `usePerformanceGuardrail`: `enableParallax`, `enableTilt`, `enableZoom`, `enableScrub`, `enable3DBoot`.
- Lazy-mount `ScrollScrubText`, `ZoomSection`, boot scene via dynamic import.
- Trim `useGsapScrollAnimations` / `useAnimationChoreographer` for sections we now own (Trust, Projects, Mindset) — avoid double-animation.

## 10. Responsive Fallbacks

```text
Desktop ≥1024  → full system + full 3D boot
Tablet 768–1023 → no blur, no pin-scrub, tilt ±3°, simplified boot (no postFX)
Mobile <768    → reveals + fades only; parallax/zoom/tilt off; CSS-only boot
reduced-motion → instant fades, no transforms, CSS-only boot
```

## 11. UX & Accessibility

- Boot loader is skippable (button + Esc + click).
- Animations never block content >400ms.
- Headings always readable at rest.
- Focus outlines never animated.
- `prefers-reduced-motion` honored at primitive level.

---

## Implementation Order

1. Add motion primitives + extend `usePerformanceGuardrail`.
2. Rewrite BootLoader with r3f scene (Acts 1–3) + skip + fallbacks. Install `@react-three/postprocessing`.
3. HeroSection → ParallaxLayer (3 layers).
4. ProjectsSection → ZoomSection wrapper + TiltCard project cards.
5. TrustSignalsSection → TiltCard + bidirectional ScrollReveal.
6. MindsetSection → ScrollScrubText for principles.
7. ExperienceSection → SVG timeline draw-on-scroll.
8. ValueProposition → pinned headline + Counter components.
9. Trim existing global GSAP hooks for refactored sections.
10. QA: 60fps desktop, mobile fallback, reduced-motion.

## Dependencies

Already installed: `framer-motion`, `gsap`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122`, `three`.
**New:** `@react-three/postprocessing@^2.16`.

## Out of Scope

No content/copy changes. No theme/color changes. Particle background untouched (already mouse-reactive).
