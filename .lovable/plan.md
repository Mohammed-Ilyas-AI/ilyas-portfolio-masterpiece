# Elite Animation Upgrade Plan (v2)

Four focused upgrades. Cinematic intro reimagined as a narrative "assembly" sequence.

---

## 1. Cinematic 3D Intro — "The Forge" (~6–8s, skippable)

A story-driven 3D intro where scattered fragments **assemble** into the brand mark, evoking the satisfaction of a supercar build reveal fused with the magical convergence of Harry Potter title sequences.

**Concept: "Forge of MIB_"**
The user witnesses raw geometry, code shards, and light particles flying in from the void, snapping together with magnetic precision into the MIB_ monogram, which then ignites and dissolves into the portfolio.

**Story Acts (~7s total):**

```text
Act 1 — VOID            0.0–1.2s
  Pure black. Faint cyan grid horizon fades in.
  A single spark drifts into frame. Low rumble + sub-bass tick (muted by default).

Act 2 — CALL            1.2–2.8s
  Hundreds of fragments (code glyphs, polygon shards, glowing dust)
  rush in from all 6 directions toward center, trailing motion blur.
  Camera slow dolly-in. Chromatic aberration peaks.

Act 3 — ASSEMBLY        2.8–5.2s
  Fragments magnetically snap into place — letter by letter:
  M ... I ... B ... _   each lands with a metallic "clank" + light burst.
  Like watching a supercar chassis bolt itself together,
  or Harry Potter title letters forging from smoke.
  Bloom intensifies. Depth-of-field racks focus across the mark.

Act 4 — IGNITION        5.2–6.5s
  Monogram pulses, emits a shockwave ring.
  Camera dollies THROUGH the "_" underscore (portal moment).
  White flash → crossfade into hero (hero scales 0.94 → 1).
```

**Controls:**
- Skip button top-right at 0.4s ("Skip intro →")
- Click / any key / Esc skips
- `prefers-reduced-motion`: static assembled monogram + 600ms fade
- `perf.tier === "low"`: 2D SVG assembly (no Canvas), 3s
- Plays once per session (sessionStorage already wired)
- Sound OFF by default; tiny mute/unmute toggle

**Tech stack (already installed):**
- `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing`
- Instanced meshes for fragments (~600 high / 200 mid)
- GSAP master timeline conducts acts + handoff
- Postprocessing: Bloom, ChromaticAberration, Vignette, DepthOfField
- Fragment "snap" = GSAP tween of instance matrices to target letter positions sampled from SVG monogram path
- DPR clamped per perf tier; Canvas unmounted on completion

---

## 2. Bidirectional Scroll Animations (down AND up)

Reveals re-trigger when scrolling back up, and reverse when leaving viewport.

- `ScrollReveal` default → `mode="bidirectional"`
- Section shells wrapped in existing `ZoomSection` (scale + blur + opacity scrub both ways)
- GSAP ScrollTriggers switch to `toggleActions: "play reverse play reverse"`
- Counters reset + recount on re-enter

**Per-section choreography:**

```text
Hero            Parallax depth layers + soft blur on scroll-out
ValueProp       Cards rise + tilt in / fall + tilt out
TrustSignals    Counters animate in, drain out
Projects        Cards scale 0.9→1 reveal; reverse on exit
Mindset         Word-by-word scrub both directions (in place)
Capabilities    Skill bars fill in / drain out
Experience      Timeline line draws in / retracts out
CTA             Glow pulse + scale; soft fade on exit
Contact         Form fields stagger in / out
```

All gated by `usePerformanceGuardrail` + `prefers-reduced-motion`.

---

## 3. Project Modal — Internal Scroll + Compact Layout

**Problems today:** modal too tall, content cut off, page scrolls instead of modal.

**Fixes in `ProjectDetailModal.tsx`:**
- Add `data-lenis-prevent` on the scroll container (Lenis ignores wheel/touch inside)
- Lock `body` scroll while open; restore on close
- Fixed-frame layout:
  ```text
  ┌─ Sticky compact header (56px) ─┐
  │ Scrollable body
  │   flex-1, min-h-0,
  │   overflow-y-auto, overscroll-contain
  └─ Sticky footer w/ "Visit Live" CTA ─┘
  ```
- Container: `max-h-[88vh] flex flex-col`
- Tighter Block spacing; `md:` two-column grid for Architecture / Decisions / Challenges
- Esc-to-close, focus trap, scroll-to-top on open
- Mobile: full-height bottom sheet style

---

## 4. Deeper, Layered Parallax System

Cinematic depth across the whole site, not just hero.

- `ParallaxLayer` gains `depth` prop: `bg | mid | fg | foreground` → speeds `[-120, -70, -30, +20]`
- New `AmbientDepth` component: per-section background canvas of orbs / grid / glyphs at different depths
- Hero split into 4 depth planes (orbs, headline, CTA, scroll cue)
- Projects: card images parallax inside card on scroll
- Mindset: floating glyphs drift in opposing directions
- Experience: timeline dots parallax against connector line
- Footer: gradient horizon parallax
- Section dividers: SVG wave/noise layers at different rates

GPU-only `translate3d`. Disabled when `perf.enableParallax === false` or reduced-motion.

---

## Technical Notes

- No new dependencies (R3F, drei, postprocessing, GSAP, Framer Motion, Lenis already installed)
- All behavior gated through `usePerformanceGuardrail` tiers
- Lenis uses native `data-lenis-prevent` attribute for modal
- Bidirectional ScrollTrigger config centralized in `useGsapScrollAnimations`
- Intro Canvas lazy-loaded (`React.lazy`) so 3D bundle never blocks first paint after first session

## Files Touched

- Rewrite: `src/components/BootLoader.tsx`
- New: `src/components/intro/ForgeScene.tsx`, `Fragments.tsx`, `MonogramTargets.ts`, `IntroOverlay.tsx`
- Rewrite: `src/components/ProjectDetailModal.tsx`
- Update: `src/lib/motion/ScrollReveal.tsx`, `ParallaxLayer.tsx`, `ZoomSection.tsx`
- New: `src/lib/motion/AmbientDepth.tsx`
- Update: `src/hooks/useGsapScrollAnimations.tsx`, `useAnimationChoreographer.tsx`
- Update: each section in `src/components/sections/*` for depth layers + bidirectional reveals
