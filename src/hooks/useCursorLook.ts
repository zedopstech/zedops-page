import { useEffect, type RefObject } from "react";

/**
 * Points an element's eyes toward the cursor by writing `--look-x` / `--look-y` (in SVG units)
 * on it, so the mascot follows the pointer without re-rendering React. Skipped for reduced motion.
 */
export function useCursorLook(ref: RefObject<Element | null>, reach = 1.2) {
  useEffect(() => {
    const el = ref.current as (SVGElement & ElementCSSInlineStyle) | null;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(dx, dy) || 1;
        // Full reach once the cursor is ~200px away, easing in close by.
        const strength = Math.min(1, distance / 200);
        el.style.setProperty("--look-x", `${((dx / distance) * reach * strength).toFixed(2)}px`);
        el.style.setProperty("--look-y", `${((dy / distance) * reach * strength).toFixed(2)}px`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [ref, reach]);
}
