import { useId, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useCursorLook } from "@/hooks/useCursorLook";
import { ZED_SPECIALISTS, type ZedSpecialistKey } from "@/components/zed/zedSpecialists";

export type ZedMood = 'idle' | 'happy' | 'thinking' | 'sleeping' | 'alert' | 'wink' | 'star';

/** Eyes (and any small extras) for each mood. Fills and strokes take the face's contrast colour from `app.css`. */
function MoodEyes({ mood }: { mood: ZedMood }) {
  switch (mood) {
    case 'happy':
      return <path d="M10.2 22.6q2-3 4 0M17.8 22.6q2-3 4 0" className="zed-eye-stroke" />;
    case 'wink':
      return (
        <>
          <ellipse cx="12.2" cy="22" rx="1.9" ry="2.6" className="zed-eye-fill" />
          <path d="M17.8 22.6q2-3 4 0" className="zed-eye-stroke" />
        </>
      );
    case 'thinking':
      return (
        <>
          <ellipse cx="12.2" cy="22" rx="1.9" ry="2.6" className="zed-eye-fill" />
          <path d="M17.8 22h4" className="zed-eye-stroke" />
          <circle cx="26.6" cy="9.6" r="1" className="zed-dot zed-dot-1" />
          <circle cx="28.6" cy="6.4" r="1.4" className="zed-dot zed-dot-2" />
        </>
      );
    case 'sleeping':
      return (
        <>
          <path d="M10.2 22.4q2 2 4 0M17.8 22.4q2 2 4 0" className="zed-eye-stroke" />
          <text x="23" y="9" className="zed-z zed-z-1">
            z
          </text>
          <text x="25.5" y="6.5" className="zed-z zed-z-2">
            Z
          </text>
          <text x="27.5" y="4" className="zed-z zed-z-3">
            Z
          </text>
        </>
      );
    case 'alert':
      return (
        <>
          <ellipse cx="12.2" cy="22" rx="2.3" ry="3.1" className="zed-eye-fill" />
          <ellipse cx="19.8" cy="22" rx="2.3" ry="3.1" className="zed-eye-fill" />
          <rect x="27" y="3.6" width="1.9" height="4.6" rx="0.95" className="zed-alert" />
          <circle cx="27.95" cy="10.4" r="1" className="zed-alert" />
        </>
      );
    case 'star':
      return (
        <path
          d="M12.2 19.2l.8 1.9 2 .2-1.5 1.3.5 2-1.8-1.1-1.8 1.1.5-2-1.5-1.3 2-.2zM19.8 19.2l.8 1.9 2 .2-1.5 1.3.5 2-1.8-1.1-1.8 1.1.5-2-1.5-1.3 2-.2z"
          className="zed-eye-fill"
        />
      );
    default:
      return (
        <>
          <ellipse cx="12.2" cy="22" rx="1.9" ry="2.6" className="zed-eye-fill" />
          <ellipse cx="19.8" cy="22" rx="1.9" ry="2.6" className="zed-eye-fill" />
        </>
      );
  }
}

/** Mix a hex colour toward white (amount > 0) or black (amount < 0). */
function shade(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16);
  const target = amount > 0 ? 255 : 0;
  const a = Math.abs(amount);
  const ch = (v: number) => Math.round(v + (target - v) * a);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(ch);
  return `#${((1 << 24) | (r! << 16) | (g! << 8) | b!).toString(16).slice(1)}`;
}

/** Catch-lights for the open-eyed moods, drawn inside the eye group so they move with the gaze. */
function EyeShine({ mood }: { mood: ZedMood }) {
  const left = mood === "idle" || mood === "alert" || mood === "wink" || mood === "thinking";
  const right = mood === "idle" || mood === "alert";
  return (
    <g fill="#fff" opacity="0.9">
      {left ? <circle cx="11.5" cy="21" r="0.6" /> : null}
      {right ? <circle cx="19.1" cy="21" r="0.6" /> : null}
    </g>
  );
}

/**
 * Zed, the hard-hat bot: a round face under an orange hard hat with two simple eyes. It bobs while
 * idle, blinks every few seconds, looks toward the cursor, and hops when a `.group` parent is hovered.
 * While `busy` (an answer is being written) its eyes scan side to side and it bobs faster. `mood`
 * swaps the eyes for an expression (happy, thinking, sleeping with drifting z's, alert, wink, star).
 * Motion lives in `app.css` (`.zed-mascot`) and is off for reduced motion.
 */
export function ZedMascot({
  className,
  busy = false,
  mood = 'idle',
  specialist = 'zed',
  depth = false,
}: {
  className?: string;
  busy?: boolean;
  mood?: ZedMood;
  /** Which of Zed's specialists this is; sets the colours. Orange Zed by default. */
  specialist?: ZedSpecialistKey;
  /**
   * Soft, plush 3D look: shaded volume, felt texture and fuzzy edges, a glossy hat, a shadow under
   * the brim and catch-lights in the eyes. `"lite"` keeps the shading, shine and catch-lights but
   * drops the felt/plastic texture filters, whose grain is finer than a pixel below ~48px.
   */
  depth?: boolean | "lite";
}) {
  const ref = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");
  const texture = depth === true;
  useCursorLook(ref);
  const expression: ZedMood = busy ? 'idle' : mood;
  const colours = ZED_SPECIALISTS[specialist];

  return (
    <svg
      ref={ref}
      style={
        {
          '--zed-face': colours.face,
          '--zed-hat': colours.hat,
          '--zed-brim': colours.brim,
          '--zed-stripe': colours.stripe,
        } as CSSProperties
      }
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn('zed-mascot h-6 w-6 shrink-0', busy && 'zed-busy', `zed-mood-${expression}`, className)}
    >
      <defs>
        <linearGradient id="zed-mascot-hat" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#ffb14a" />
          <stop offset="1" stopColor="#ff6a2b" />
        </linearGradient>
        {depth ? (
          <>
            {/* volume: lit from the top-left */}
            <radialGradient id={`${uid}-face`} cx="0.34" cy="0.22" r="0.95">
              <stop stopColor={shade(colours.face, 0.38)} />
              <stop offset="0.45" stopColor={colours.face} />
              <stop offset="1" stopColor={shade(colours.face, -0.36)} />
            </radialGradient>
            <radialGradient id={`${uid}-hat`} cx="0.32" cy="0.2" r="0.95">
              <stop stopColor={shade(colours.hat, 0.42)} />
              <stop offset="0.5" stopColor={colours.hat} />
              <stop offset="1" stopColor={shade(colours.hat, -0.32)} />
            </radialGradient>
            <linearGradient id={`${uid}-brim`} x1="0" y1="0" x2="0" y2="1">
              <stop stopColor={shade(colours.brim, 0.28)} />
              <stop offset="1" stopColor={shade(colours.brim, -0.3)} />
            </linearGradient>
            {/* felt: fuzzy edges plus fine fibre specks */}
            <filter id={`${uid}-felt`} x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="2.4" numOctaves="2" seed="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.32" xChannelSelector="R" yChannelSelector="G" result="fuzzy" />
              <feTurbulence type="fractalNoise" baseFrequency="4" numOctaves="1" seed="9" result="grain" />
              <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.35" result="specks" />
              <feComposite in="specks" in2="fuzzy" operator="in" result="specksIn" />
              <feComponentTransfer in="specksIn" result="specksSoft">
                <feFuncA type="linear" slope="0.18" />
              </feComponentTransfer>
              {/* rounded volume: a soft inner shadow along the lower-right edge */}
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.1" result="alphaBlur" />
              <feOffset in="alphaBlur" dx="-0.5" dy="-0.8" result="alphaShift" />
              <feComposite in="SourceAlpha" in2="alphaShift" operator="out" result="rim" />
              <feFlood floodColor="#000" floodOpacity="0.3" />
              <feComposite in2="rim" operator="in" result="rimShade" />
              <feComposite in="rimShade" in2="fuzzy" operator="in" result="rimIn" />
              <feMerge>
                <feMergeNode in="fuzzy" />
                <feMergeNode in="rimIn" />
                <feMergeNode in="specksSoft" />
              </feMerge>
            </filter>
            {/* hard plastic: smooth edges, just the rounded inner shading */}
            <filter id={`${uid}-plastic`} x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="alphaBlur" />
              <feOffset in="alphaBlur" dx="-0.4" dy="-0.7" result="alphaShift" />
              <feComposite in="SourceAlpha" in2="alphaShift" operator="out" result="rim" />
              <feFlood floodColor="#000" floodOpacity="0.28" />
              <feComposite in2="rim" operator="in" result="rimShade" />
              <feComposite in="rimShade" in2="SourceGraphic" operator="in" result="rimIn" />
              <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="rimIn" />
              </feMerge>
            </filter>
            <filter id={`${uid}-soft`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.7" />
            </filter>
          </>
        ) : null}
      </defs>
      <g className="zed-body">
        <rect
          x="6"
          y="12.5"
          width="20"
          height="15"
          rx="6.5"
          className="zed-face"
          style={depth ? { fill: `url(#${uid}-face)` } : undefined}
          filter={texture ? `url(#${uid}-felt)` : undefined}
        />
        {depth ? (
          <>
            {/* soft sheen on the face, and the hat's shadow falling under the brim */}
            <ellipse cx="11.5" cy="20" rx="3.6" ry="2.2" fill="#fff" opacity="0.16" filter={`url(#${uid}-soft)`} />
            <ellipse cx="16" cy="18.1" rx="10" ry="1.7" fill="#1a0d05" opacity="0.32" filter={`url(#${uid}-soft)`} />
          </>
        ) : null}
        <g filter={texture ? `url(#${uid}-plastic)` : undefined}>
          <path
            d="M5 15C5 8.5 10 5 16 5s11 3.5 11 10z"
            fill="url(#zed-mascot-hat)"
            className="zed-hat"
            style={depth ? { fill: `url(#${uid}-hat)` } : undefined}
          />
          <rect
            x="14.3"
            y="5.4"
            width="3.4"
            height="9.2"
            rx="1.5"
            fill="#ffe2bd"
            opacity="0.85"
            className="zed-hat-stripe"
          />
          <rect
            x="3"
            y="14"
            width="26"
            height="3.2"
            rx="1.6"
            fill="#e2512b"
            className="zed-brim"
            style={depth ? { fill: `url(#${uid}-brim)` } : undefined}
          />
        </g>
        {depth ? (
          <>
            {/* glossy highlights on the hat dome and brim */}
            <ellipse cx="10.6" cy="9" rx="3" ry="1.4" fill="#fff" opacity="0.38" transform="rotate(-32 10.6 9)" filter={`url(#${uid}-soft)`} />
            <ellipse cx="10.2" cy="8.8" rx="1.4" ry="0.55" fill="#fff" opacity="0.55" transform="rotate(-32 10.2 8.8)" />
            <rect x="5" y="14.35" width="9" height="0.55" rx="0.3" fill="#fff" opacity="0.28" />
          </>
        ) : null}
        <g className="zed-eyes">
          <g className="zed-scan">
            <g className={expression === 'idle' ? 'zed-blink' : undefined}>
              <MoodEyes mood={expression} />
              {depth ? <EyeShine mood={expression} /> : null}
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
