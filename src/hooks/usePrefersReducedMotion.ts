import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

const getSnapshot = () => typeof window.matchMedia === "function" && window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

/**
 * Hydration-safe replacement for framer-motion's `useReducedMotion`.
 *
 * framer's hook reads `matchMedia` during the first client render, but the prerendered
 * HTML was rendered with no preference, so a visitor with reduced motion turned on got a
 * hydration mismatch. `useSyncExternalStore` renders the server snapshot (false) while
 * hydrating and re-renders with the real preference straight after, including live changes.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
