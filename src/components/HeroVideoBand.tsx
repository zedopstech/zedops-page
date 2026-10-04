import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n";
import { Pause, Play } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Full-bleed construction reel that sits between the hero copy and the project
 * scope cards. Extracted from the two home pages so the video markup - including
 * the accessibility affordances - exists in one place.
 *
 * Accessibility notes:
 * - The reel is decorative background motion that loops indefinitely, so WCAG 2.2.2
 *   requires a way to stop it. The control below is always visible (not hover-only)
 *   so it is reachable by touch and by keyboard.
 * - `prefers-reduced-motion: reduce` suppresses autoplay. The poster frame stays up and
 *   the control becomes an explicit opt-in to play.
 * - Playback also stops while the band is scrolled out of view, so frames are not
 *   decoded for a section nobody is looking at.
 */

/**
 * Two encodes of the same 43s reel. The 1080p file is 9.5 MB, which is 94% of the
 * whole page weight - on a phone that is most of a visitor's data before they
 * scroll. The 854x480 file is 2.2 MB and is served below the 768px breakpoint.
 * (Not a `<source media=...>` pair: browser support for `media` on `<source>`
 * inside `<video>` is inconsistent, so the URL is chosen in JS instead.)
 */
const DESKTOP_SRC = "/hero/hero-reel.mp4";
const MOBILE_SRC = "/hero/hero-reel-mobile.mp4";
const POSTER = "/hero/hero-reel-poster.jpg";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export default function HeroVideoBand() {
  const { t } = useI18n();
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  /** Set once the visitor pauses by hand, so we never fight their choice. */
  const pausedByUser = useRef(false);

  const [reduceMotion, setReduceMotion] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  // Track the OS-level motion preference, including live changes to it.
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mql = window.matchMedia(REDUCED_MOTION_QUERY);
    const sync = () => setReduceMotion(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  // Stop decoding frames while the band is off-screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (!video.paused) video.pause();
          return;
        }
        if (reduceMotion || pausedByUser.current) return;
        void video.play().catch(() => undefined);
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByUser.current = false;
      void video.play().catch(() => undefined);
    } else {
      pausedByUser.current = true;
      video.pause();
    }
  };

  const src = isMobile ? MOBILE_SRC : DESKTOP_SRC;

  // A new source means a fresh load: fall back to the poster until it can play,
  // so a rotate across the breakpoint does not flash a blank frame.
  useEffect(() => setReady(false), [src]);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[420px] sm:h-[500px] md:h-[600px] lg:h-[680px]">
        <video
          key={src}
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: ready ? 1 : 0 }}
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER}
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={src} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/10" />

        {/* Sink the footage into the product scope cards: a navy floor rather than a white
            wash, which was greying out the bottom third of the frame. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-44"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,26,49,0) 0%, rgba(11,26,49,0.55) 52%, rgba(11,26,49,0.92) 100%)",
          }}
        />

        {/* WCAG 2.2.2: the loop must be stoppable. Always visible, never hover-only. */}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? t("Pause background video") : t("Play background video")}
          className="absolute bottom-[7.5rem] end-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-[#0B1A31]/45 text-white backdrop-blur-sm transition-colors duration-150 hover:bg-[#0B1A31]/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:end-6 lg:end-8"
        >
          {playing ? (
            <Pause size={14} aria-hidden />
          ) : (
            <Play size={14} aria-hidden className="translate-x-px" />
          )}
        </button>
      </div>
    </section>
  );
}
