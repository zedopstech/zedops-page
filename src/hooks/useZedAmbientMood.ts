import { useEffect, useState } from "react";
import type { ZedMood } from "@/components/zed/ZedMascot";

const EXPRESSIONS: ZedMood[] = ["wink", "happy", "star", "wink", "happy"];
const MIN_GAP_MS = 5_000;
const GAP_RANGE_MS = 6_000;
const HOLD_MS = 1_800;

/**
 * Zed's resting personality (same as the ZedOps app): idle most of the time, and every few seconds
 * a quick wink, smile or starry eyes before settling back. Timings are random, so several mascots on
 * one screen never wink in sync.
 */
export function useZedAmbientMood(enabled: boolean): ZedMood {
  const [mood, setMood] = useState<ZedMood>("idle");

  useEffect(() => {
    if (!enabled) {
      setMood("idle");
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(
        () => {
          setMood(EXPRESSIONS[Math.floor(Math.random() * EXPRESSIONS.length)]!);
          timer = setTimeout(() => {
            setMood("idle");
            schedule();
          }, HOLD_MS);
        },
        MIN_GAP_MS + Math.random() * GAP_RANGE_MS,
      );
    };
    schedule();
    return () => clearTimeout(timer);
  }, [enabled]);

  return mood;
}
