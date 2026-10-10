import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useI18n } from "@/i18n";
import { TicketButton } from "@/components/design-system/primitives";
import { ZedMascot, type ZedMood } from "@/components/zed/ZedMascot";
import { useZedAmbientMood } from "@/hooks/useZedAmbientMood";
import { ZED_SPECIALISTS, type ZedSpecialistKey } from "@/components/zed/zedSpecialists";

const CAST: ZedSpecialistKey[] = ["zed", "foreman", "ledger", "hauler", "crew", "gauge", "warden"];
/** Slot of each mascot in the line-up, so Zed stands in the middle. */
const ROW_SLOT = [3, 0, 1, 2, 4, 5, 6];
const BASE = 96; // mascot size in px at scale 1

// Scroll timeline (0 → 1 across the pinned track).
const T = {
  zedIn: [0.1, 0.19],
  hub: [0.2, 0.3],
  orbitOut: [0.24, 0.42],
  spin: [0.24, 0.58],
  toRow: [0.58, 0.68],
  converge: [0.8, 0.88],
  settle: [0.89, 0.96],
} as const;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const span = (p: number, [a, b]: readonly [number, number]) => clamp((p - a) / (b - a));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
/** Ease out with a small overshoot past the target before settling. */
const backOut = (t: number) => 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Pose = { x: number; y: number; scale: number; opacity: number; z: number };
/** Stage geometry in px: orbit centre offset below screen centre, orbit radius, line-up gap, size factor, height. */
type Stage = { cy: number; R: number; gap: number; k: number; h: number; ob: number };

/** Where mascot `i` (0 = Zed) is at scroll progress `p`. */
function pose(i: number, p: number, st: Stage): Pose {
  const { cy, R, gap, k, h, ob } = st;
  let out: Pose;

  if (i === 0) {
    // Zed: pops in big at the centre as the hero, then shrinks into the hub of the orbit.
    const pop = span(p, T.zedIn);
    const hub = easeInOut(span(p, T.hub));
    out = {
      x: 0,
      y: lerp(0, cy, hub),
      scale: lerp(pop > 0 ? 2.4 * backOut(pop) : 0, 1.3 * ob, hub),
      opacity: clamp(pop * 3),
      z: 100,
    };
  } else {
    // Specialists: one by one they slide out from behind Zed along their own spoke, overshoot a
    // little, and settle on a flat circle that keeps orbiting slowly as you scroll.
    const j = i - 1;
    const local = clamp((span(p, T.orbitOut) - j * 0.09) / 0.46);
    const angle = -Math.PI / 2 + (j / 6) * Math.PI * 2 - span(p, T.spin) * Math.PI * 0.75;
    const r = R * (local > 0 ? backOut(local) : 0);
    out = {
      x: Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      scale: lerp(0.3, 1, easeOut(local)) * ob,
      opacity: clamp(local * 5),
      z: 50,
    };
  }

  // Line-up: the orbit unrolls into a row with Zed in the middle.
  const rw = easeInOut(span(p, T.toRow));
  if (rw > 0) {
    out = {
      x: lerp(out.x, (ROW_SLOT[i]! - 3) * gap, rw),
      y: lerp(out.y, 0, rw),
      scale: lerp(out.scale, i === 0 ? 1.15 : 0.92, rw),
      opacity: lerp(out.opacity, 1, rw),
      z: out.z,
    };
  }

  // Converge: the specialists fly into Zed, which grows.
  const c = easeInOut(span(p, T.converge));
  if (c > 0) {
    out =
      i === 0
        ? { ...out, x: lerp(out.x, 0, c), y: lerp(out.y, 0, c), scale: lerp(out.scale, 3.1, c) }
        : { ...out, x: lerp(out.x, 0, c), y: lerp(out.y, 0, c), scale: lerp(out.scale, 0.25, c), opacity: lerp(1, 0, clamp(c * 1.3)) };
  }

  // Settle: Zed eases back and rises above the closing line.
  const s = easeInOut(span(p, T.settle));
  if (s > 0 && i === 0) out = { ...out, scale: lerp(3.1, 1.7, s), y: lerp(0, -h * 0.2, s) };
  return { ...out, scale: out.scale * k };
}

function Mascot({ i, p, st, mood }: { i: number; p: MotionValue<number>; st: Stage; mood: ZedMood }) {
  const { t } = useI18n();
  const x = useTransform(p, (v) => pose(i, v, st).x);
  const y = useTransform(p, (v) => pose(i, v, st).y);
  const scale = useTransform(p, (v) => pose(i, v, st).scale);
  const opacity = useTransform(p, (v) => pose(i, v, st).opacity);
  const zIndex = useTransform(p, (v) => pose(i, v, st).z);
  const label = useTransform(p, [0.66, 0.7, 0.77, 0.8], [0, 1, 1, 0]);
  const info = ZED_SPECIALISTS[CAST[i]!];
  return (
    <motion.div style={{ x, y, opacity, zIndex }} className="absolute left-1/2 top-1/2" dir="ltr">
      {/* No CSS filters here: an animated blur or drop-shadow forces the SVG felt texture to be
          re-rendered every frame (measured: 28 fps). As a plain transformed layer it is drawn once. */}
      <motion.div
        style={{ scale, width: BASE, height: BASE, marginLeft: -BASE / 2, marginTop: -BASE / 2, willChange: "transform" }}
        className="relative"
      >
        <span aria-hidden className="absolute bottom-[-6%] left-[18%] h-[14%] w-[64%] rounded-[50%] bg-black/45 blur-[6px]" />
        <ZedMascot depth specialist={CAST[i]} mood={mood} className="relative h-full w-full" />
      </motion.div>
      <motion.div style={{ opacity: label, top: 60 * st.k, left: -60 }} className="absolute w-[120px] text-center">
        <p className="text-[11px] font-semibold text-white sm:text-[14px]">{info.name}</p>
        <p className="mt-0.5 hidden text-[11.5px] leading-snug text-white/55 sm:block">{t(info.role)}</p>
      </motion.div>
    </motion.div>
  );
}

/** Large headline that rises in, holds, then scales up and blurs away (Apple-style). */
function StoryLine({ p, range, children, className = "" }: { p: MotionValue<number>; range: [number, number, number, number]; children: React.ReactNode; className?: string }) {
  const opacity = useTransform(p, range, [0, 1, 1, 0]);
  const scale = useTransform(p, range, [0.92, 1, 1, 1.12]);
  const y = useTransform(p, range, [30, 0, 0, -20]);
  const filter = useTransform(p, range, ["blur(10px)", "blur(0px)", "blur(0px)", "blur(12px)"]);
  return (
    <motion.h2 style={{ opacity, scale, y, filter }} className={`pointer-events-none absolute inset-x-0 px-6 text-center font-medium tracking-[-0.045em] text-white ${className}`}>
      {children}
    </motion.h2>
  );
}

/**
 * Apple-style scroll story for Zed. The section pins to the viewport and every movement is tied to
 * scroll position, so it plays forward and backward with the scrollbar: the headline, Zed popping in, its six
 * specialists sliding out into an orbit around it, the line-up with names, the specialists merging into
 * Zed, and the closing line with a call to action.
 */
export default function HomeZedStory() {
  const { t } = useI18n();
  const reduce = usePrefersReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  // Copy progress into a plain motion value so every effect runs in JS. Framer otherwise hands the
  // opacity/filter transforms to the browser's native scroll timeline, which mis-measures this
  // sticky track and leaves headlines stuck on screen.
  const p = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => p.set(v));

  const [stage, setStage] = useState<Stage>({ cy: 80, R: 220, gap: 130, k: 1, h: 800, ob: 1 });
  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const k = Math.min(1, Math.max(0.46, (w - 32) / (7 * 132)));
      // The orbit fills the space below the headline (the fixed navbar takes the top 100px):
      // centred between 180px and the bottom edge, and kept clear of the screen sides.
      const cy = 80;
      // On small screens the line-up forces small mascots; give them more presence in the orbit.
      const ob = Math.max(1, Math.min(1.6, 0.8 / k));
      const half = 56 * k * ob; // half the on-screen width of an orbiting mascot
      const R = Math.max(90, Math.min((h - 200) / 2 - half, w / 2 - half - 12, 300));
      setStage({ cy, R, gap: Math.min(150, (w - 64) / 7), k, h, ob });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scripted expressions while the story plays; at rest at the end, Zed's usual personality
  // (idle with an occasional wink, smile or starry eyes) instead of a permanent wink.
  const [scripted, setScripted] = useState<ZedMood | "rest">("sleeping");
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setScripted(v < 0.1 ? "sleeping" : v < 0.22 ? "happy" : v < 0.58 ? "idle" : v < 0.8 ? "happy" : v < 0.89 ? "star" : "rest"),
  );
  const ambient = useZedAmbientMood(scripted === "rest");
  const mood: ZedMood = scripted === "rest" ? ambient : scripted;

  const glow = useTransform(p, [0, 0.12, 0.8, 0.88, 1], [0, 0.35, 0.35, 1, 0.6]);
  const glowScale = useTransform(p, [0.8, 0.88, 1], [0.8, 1.4, 1.1]);
  const ctaOpacity = useTransform(p, [0.92, 0.97], [0, 1]);
  const ctaY = useTransform(p, [0.92, 0.97], [24, 0]);
  const hint = useTransform(p, [0, 0.04], [1, 0]);

  if (reduce) {
    return (
      <section data-nav-theme="dark" aria-labelledby="zed-story" className="bg-[#0B1527] px-5 py-24 text-center">
        <h2 id="zed-story" className="text-[40px] font-medium tracking-[-0.045em] text-white sm:text-[56px]">
          {t("Seven specialists. One copilot.")}
        </h2>
        <div dir="ltr" className="mx-auto mt-12 flex max-w-[900px] flex-wrap justify-center gap-6">
          {CAST.map((k) => (
            <div key={k} className="w-[110px]">
              <ZedMascot depth specialist={k} mood="happy" className="mx-auto h-20 w-20" />
              <p className="mt-3 text-[14px] font-semibold text-white">{ZED_SPECIALISTS[k].name}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <TicketButton href="/zed-ai" variant="white">{t("Explore Zed AI")}</TicketButton>
        </div>
      </section>
    );
  }

  return (
    <section data-nav-theme="dark" aria-labelledby="zed-story" className="relative bg-[#0B1527]">
      <div ref={track} style={{ height: "520vh" }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* backdrop glow */}
          <motion.div
            aria-hidden
            style={{ opacity: glow, scale: glowScale }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,138,31,0.32)_0%,rgba(255,106,43,0.1)_38%,transparent_68%)]"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />

          {/* headlines */}
          <StoryLine p={p} range={[0, 0.03, 0.07, 0.12]} className="top-[38%] text-[56px] leading-none sm:text-[96px] lg:text-[128px]">
            <span id="zed-story">{t("Meet Zed.")}</span>
          </StoryLine>
          <StoryLine p={p} range={[0.3, 0.36, 0.52, 0.58]} className="top-[112px] text-[28px] leading-[1.1] sm:text-[40px] lg:text-[48px]">
            {t("Seven specialists.")} <span className="text-white/45">{t("One copilot.")}</span>
          </StoryLine>
          <StoryLine p={p} range={[0.58, 0.64, 0.76, 0.8]} className="top-[16%] text-[28px] leading-[1.1] sm:text-[44px]">
            {t("Each one knows its part of the job.")}
          </StoryLine>

          {/* the cast */}
          <div className="absolute inset-0">
            {CAST.map((k, i) => (
              <Mascot key={k} i={i} p={p} st={stage} mood={mood} />
            ))}
          </div>

          {/* closing */}
          <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="absolute inset-x-0 top-[60%] px-6 text-center">
            <p className="text-[30px] font-medium leading-[1.1] tracking-[-0.04em] text-white sm:text-[48px]">
              {t("Ask anything across your projects.")}
            </p>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.6] text-white/60 sm:text-[17px]">
              {t("Zed hands your question to the specialist who knows that part of the job.")}
            </p>
            <div className="mt-8 flex justify-center">
              <TicketButton href="/zed-ai" variant="white">{t("Explore Zed AI")}</TicketButton>
            </div>
          </motion.div>

          <motion.p style={{ opacity: hint }} className="absolute inset-x-0 bottom-8 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
            {t("Scroll")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
