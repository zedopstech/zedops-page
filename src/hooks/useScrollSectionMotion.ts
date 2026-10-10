import { useIsMobile } from "@/hooks/use-mobile";

/** Reveal each element once, shortly after it enters the viewport. */
export const scrollRevealViewport = {
  once: true as const,
  amount: 0.15 as const,
  margin: "0px 0px -6% 0px" as const,
};

type FadeUpOpts = {
  y?: number;
  x?: number;
  /** Opacity-only (no translate). */
  fadeOnly?: boolean;
  delay?: number;
  duration?: number;
  ease?: readonly [number, number, number, number];
};

/** Shared scroll entrance for page sections and cards. */
export function scrollMotionProps(isMobile: boolean, opts: FadeUpOpts = {}) {
  const delay = opts.delay ?? 0;
  const duration = Math.max(opts.duration ?? 0.55, isMobile ? 0.48 : 0.6);
  const ease = opts.ease ?? ([0.22, 1, 0.36, 1] as const);
  // No reduced-motion branch here: reading matchMedia during render gave the browser a different
  // `initial` than the prerendered HTML (a hydration mismatch). <MotionConfig reducedMotion="user">
  // in App.tsx already drops transform animations for visitors who ask for less motion.

  if (opts.fadeOnly) {
    return {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: scrollRevealViewport,
      transition: { duration, delay, ease },
    };
  }

  if (opts.x !== undefined) {
    return {
      initial: { opacity: 0, x: isMobile ? opts.x * 0.6 : opts.x },
      whileInView: { opacity: 1, x: 0 },
      viewport: scrollRevealViewport,
      transition: { duration, delay, ease },
    };
  }

  const y = isMobile
    ? Math.max(12, (opts.y ?? 18) * 0.75)
    : Math.max(28, opts.y ?? 18);
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: scrollRevealViewport,
    transition: { duration, delay, ease },
  };
}

export function useScrollSectionMotion(opts: FadeUpOpts = {}) {
  const isMobile = useIsMobile();
  return scrollMotionProps(isMobile, opts);
}

/**
 * For `variants` + `whileInView="visible"` card grids (e.g. Problems).
 */
export function useVariantScrollReveal<V>(variants: V) {
  const isMobile = useIsMobile();

  return (customIndex: number) =>
    isMobile
      ? { initial: false as const }
      : {
          custom: customIndex,
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: scrollRevealViewport,
          variants,
        };
}
