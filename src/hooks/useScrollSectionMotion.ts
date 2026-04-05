import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Viewport options tuned to reduce IntersectionObserver thrash on mobile (flicker when
 * elements sit near the threshold).
 */
export const scrollRevealViewport = {
  once: true as const,
  amount: 0.12 as const,
  margin: "0px 0px -8% 0px" as const,
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

/** Core logic: no scroll-driven animation on mobile (stable paint). */
export function scrollMotionProps(isMobile: boolean, opts: FadeUpOpts = {}) {
  const delay = opts.delay ?? 0;
  const duration = opts.duration ?? 0.36;
  const ease = opts.ease ?? ([0.25, 0.1, 0.25, 1] as const);

  if (isMobile) {
    return { initial: false as const };
  }

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
      initial: { opacity: 0, x: opts.x },
      whileInView: { opacity: 1, x: 0 },
      viewport: scrollRevealViewport,
      transition: { duration, delay, ease },
    };
  }

  const y = opts.y ?? 18;
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
