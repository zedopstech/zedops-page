import { useId, type ComponentType } from "react";
import type { BlogCategory } from "@/lib/blog";

/**
 * Generated editorial covers: one small product schematic per category, drawn in SVG so
 * every post has an on-brand cover without stock photography. Same shapes, two surfaces.
 */
type Palette = {
  bg: string;
  grid: string;
  card: string;
  stroke: string;
  ink: string;
  bar: string;
  accent: string;
  accentSoft: string;
  ok: string;
};

const palettes: Record<"light" | "dark", Palette> = {
  light: {
    bg: "#F3F5F9",
    grid: "#E4E9F0",
    card: "#FFFFFF",
    stroke: "#D5DCE6",
    ink: "#172B4D",
    bar: "#DFE4EC",
    accent: "#FE6A12",
    accentSoft: "#FFEADB",
    ok: "#1D9A5B",
  },
  dark: {
    bg: "#0E1B33",
    grid: "rgba(255,255,255,0.05)",
    card: "#13233F",
    stroke: "rgba(255,255,255,0.12)",
    ink: "#FFFFFF",
    bar: "rgba(255,255,255,0.14)",
    accent: "#FE6A12",
    accentSoft: "rgba(254,106,18,0.2)",
    ok: "#3DBE7F",
  },
};

function Bar({ x, y, w, p, h = 8, fill }: { x: number; y: number; w: number; p: Palette; h?: number; fill?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill ?? p.bar} />;
}

function Card({ x, y, w, h, p, r = 12 }: { x: number; y: number; w: number; h: number; p: Palette; r?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={p.card} stroke={p.stroke} />;
}

function Guides({ p }: { p: Palette }) {
  const steps = [0, 1, 2];
  return (
    <g>
      {steps.map((i) => {
        const x = 150 + i * 60;
        const y = 90 + i * 70;
        const done = i < 2;
        return (
          <g key={i}>
            <Card x={x} y={y} w={280} h={84} p={p} />
            <circle cx={x + 36} cy={y + 42} r={15} fill={done ? p.accentSoft : "none"} stroke={done ? "none" : p.stroke} />
            {done ? (
              <path d={`M${x + 29} ${y + 42} l5 5 l10 -11`} fill="none" stroke={p.accent} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <text x={x + 36} y={y + 47} textAnchor="middle" fontSize={14} fontFamily="Geist Mono, monospace" fill={p.ink}>
                3
              </text>
            )}
            <Bar x={x + 66} y={y + 30} w={140 - i * 20} p={p} fill={i === 2 ? p.ink : p.bar} />
            <Bar x={x + 66} y={y + 48} w={170} p={p} h={6} />
          </g>
        );
      })}
    </g>
  );
}

function Field({ p }: { p: Palette }) {
  return (
    <g>
      <rect x={230} y={50} width={180} height={380} rx={26} fill={p.card} stroke={p.stroke} />
      <Bar x={292} y={66} w={56} p={p} h={6} />
      <Bar x={250} y={96} w={90} p={p} fill={p.ink} />
      <Bar x={250} y={112} w={60} p={p} h={6} />
      {[0, 1, 2, 3].map((i) => {
        const x = 250 + (i % 2) * 72;
        const y = 134 + Math.floor(i / 2) * 72;
        return (
          <g key={i}>
            <rect x={x} y={y} width={64} height={64} rx={8} fill={i === 1 ? p.accentSoft : p.bar} />
            {i === 1 && <circle cx={x + 32} cy={y + 32} r={6} fill={p.accent} />}
            {i !== 1 && <path d={`M${x + 10} ${y + 50} l14 -16 l10 10 l8 -8 l12 14`} fill="none" stroke={p.stroke} strokeWidth={2} />}
          </g>
        );
      })}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={258} cy={296 + i * 28} r={5} fill={i === 0 ? p.ok : p.bar} />
          <Bar x={272} y={292 + i * 28} w={110 - i * 18} p={p} />
        </g>
      ))}
      <Card x={420} y={250} w={130} h={56} p={p} r={10} />
      <Bar x={436} y={264} w={52} p={p} h={6} />
      <text x={436} y={292} fontSize={16} fontFamily="Geist Mono, monospace" fill={p.ink}>
        42 crew
      </text>
    </g>
  );
}

function Estimation({ p }: { p: Palette }) {
  const rows = [0, 1, 2, 3, 4];
  return (
    <g>
      <Card x={120} y={70} w={330} h={290} p={p} />
      <Bar x={144} y={94} w={120} p={p} fill={p.ink} />
      <line x1={120} y1={120} x2={450} y2={120} stroke={p.stroke} />
      {rows.map((i) => {
        const y = 136 + i * 34;
        const hi = i === 2;
        return (
          <g key={i}>
            {hi && <rect x={128} y={y - 8} width={314} height={28} rx={6} fill={p.accentSoft} />}
            <Bar x={144} y={y + 2} w={110 + ((i * 37) % 50)} p={p} fill={hi ? p.accent : p.bar} />
            <Bar x={330} y={y + 2} w={28} p={p} />
            <Bar x={384} y={y + 2} w={44} p={p} fill={hi ? p.accent : p.bar} />
          </g>
        );
      })}
      <line x1={120} y1={318} x2={450} y2={318} stroke={p.stroke} />
      <Bar x={144} y={334} w={60} p={p} fill={p.ink} />
      <Bar x={370} y={334} w={58} p={p} fill={p.ink} />
      <path d="M458 200 C 480 200, 480 200, 494 200" fill="none" stroke={p.accent} strokeWidth={2} strokeDasharray="4 4" />
      <Card x={498} y={150} w={120} h={100} p={p} r={10} />
      <Bar x={514} y={168} w={50} p={p} h={6} />
      <rect x={514} y={190} width={88} height={10} rx={5} fill={p.bar} />
      <rect x={514} y={190} width={58} height={10} rx={5} fill={p.accent} />
      <rect x={514} y={214} width={88} height={10} rx={5} fill={p.bar} />
      <rect x={514} y={214} width={40} height={10} rx={5} fill={p.ink} />
    </g>
  );
}

function Procurement({ p }: { p: Palette }) {
  const xs = [140, 260, 380, 500];
  return (
    <g>
      <line x1={140} y1={180} x2={500} y2={180} stroke={p.stroke} strokeWidth={3} />
      <line x1={140} y1={180} x2={260} y2={180} stroke={p.ok} strokeWidth={3} />
      <line x1={260} y1={180} x2={330} y2={180} stroke={p.accent} strokeWidth={3} />
      {xs.map((x, i) => {
        const state = i === 0 ? "done" : i === 1 ? "now" : "next";
        return (
          <g key={x}>
            <circle cx={x} cy={180} r={state === "now" ? 18 : 13} fill={state === "done" ? p.ok : state === "now" ? p.accent : p.card} stroke={state === "next" ? p.stroke : "none"} strokeWidth={2} />
            {state === "now" && <circle cx={x} cy={180} r={28} fill="none" stroke={p.accent} strokeOpacity={0.3} strokeWidth={2} />}
            {state === "done" && <path d={`M${x - 6} 180 l4 4 l8 -9`} fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />}
            <Bar x={x - 34} y={224} w={68} p={p} fill={state === "now" ? p.ink : p.bar} />
            <Bar x={x - 24} y={240} w={48} p={p} h={6} />
          </g>
        );
      })}
      <Card x={196} y={284} w={250} h={74} p={p} r={10} />
      <rect x={212} y={300} width={42} height={42} rx={8} fill={p.accentSoft} />
      <text x={233} y={326} textAnchor="middle" fontSize={13} fontFamily="Geist Mono, monospace" fill={p.accent}>
        14d
      </text>
      <Bar x={268} y={306} w={120} p={p} fill={p.ink} />
      <Bar x={268} y={324} w={150} p={p} h={6} />
    </g>
  );
}

function Quality({ p }: { p: Palette }) {
  const pins = [
    { x: 208, y: 150, n: 1, hot: false },
    { x: 360, y: 128, n: 2, hot: true },
    { x: 470, y: 250, n: 3, hot: false },
    { x: 262, y: 300, n: 4, hot: false },
  ];
  return (
    <g>
      <Card x={130} y={70} w={400} h={290} p={p} r={8} />
      <g fill="none" stroke={p.stroke} strokeWidth={2}>
        <path d="M150 90 H510 V340 H150 Z" />
        <path d="M150 210 H300 V340" />
        <path d="M300 90 V180" />
        <path d="M300 240 H400 V340" />
        <path d="M400 90 V200 H510" />
        <path d="M330 210 h40" strokeDasharray="4 4" />
      </g>
      {pins.map((pin) => (
        <g key={pin.n}>
          {pin.hot && <circle cx={pin.x} cy={pin.y} r={24} fill={p.accent} fillOpacity={0.15} />}
          <circle cx={pin.x} cy={pin.y} r={13} fill={pin.hot ? p.accent : p.ink} />
          <text x={pin.x} y={pin.y + 4.5} textAnchor="middle" fontSize={12} fontFamily="Geist Mono, monospace" fill={pin.hot ? "#fff" : p.card}>
            {pin.n}
          </text>
        </g>
      ))}
      <Card x={390} y={40} w={170} h={64} p={p} r={10} />
      <rect x={404} y={54} width={36} height={36} rx={6} fill={p.accentSoft} />
      <Bar x={452} y={60} w={90} p={p} fill={p.ink} />
      <Bar x={452} y={78} w={60} p={p} h={6} />
    </g>
  );
}

function ZedAI({ p }: { p: Palette }) {
  return (
    <g>
      <rect x={300} y={70} width={230} height={52} rx={16} fill={p.ink} />
      <Bar x={320} y={92} w={150} p={p} fill={p.card} />
      <Card x={110} y={146} w={360} h={170} p={p} r={16} />
      <path d="M136 172 l5 -12 l5 12 l12 5 l-12 5 l-5 12 l-5 -12 l-12 -5 z" fill={p.accent} />
      <Bar x={170} y={172} w={200} p={p} fill={p.ink} />
      <Bar x={136} y={206} w={300} p={p} />
      <Bar x={136} y={224} w={270} p={p} />
      <Bar x={136} y={242} w={220} p={p} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={136 + i * 96} y={272} width={86} height={24} rx={6} fill={i === 0 ? p.accentSoft : "none"} stroke={i === 0 ? "none" : p.stroke} />
          <Bar x={148 + i * 96} y={280} w={60} p={p} h={7} fill={i === 0 ? p.accent : p.bar} />
        </g>
      ))}
      <Card x={440} y={250} w={120} h={90} p={p} r={10} />
      <circle cx={462} cy={274} r={6} fill={p.ok} />
      <Bar x={476} y={270} w={66} p={p} />
      <Bar x={458} y={294} w={84} p={p} h={6} />
      <Bar x={458} y={310} w={60} p={p} h={6} />
    </g>
  );
}

function Access({ p }: { p: Palette }) {
  const rows = 5;
  const cols = 4;
  // 1 = allowed, 0 = hidden; the orange row is the one being edited.
  const grid = [
    [1, 1, 1, 1],
    [1, 1, 0, 1],
    [1, 0, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 0],
  ];
  return (
    <g>
      <Card x={110} y={60} w={420} h={290} p={p} />
      {Array.from({ length: cols }).map((_, c) => (
        <Bar key={c} x={290 + c * 58} y={86} w={34} p={p} h={6} />
      ))}
      <line x1={110} y1={108} x2={530} y2={108} stroke={p.stroke} />
      {Array.from({ length: rows }).map((_, r) => {
        const y = 126 + r * 44;
        const hi = r === 2;
        return (
          <g key={r}>
            {hi && <rect x={118} y={y - 8} width={404} height={36} rx={8} fill={p.accentSoft} />}
            <circle cx={146} cy={y + 10} r={10} fill={hi ? p.accent : p.bar} />
            <Bar x={166} y={y + 6} w={80 - r * 6} p={p} fill={hi ? p.ink : p.bar} />
            {grid[r].map((on, c) => {
              const cx = 307 + c * 58;
              const cy = y + 10;
              return on ? (
                <g key={c}>
                  <rect x={cx - 10} y={cy - 10} width={20} height={20} rx={5} fill={hi ? p.accent : p.ink} />
                  <path d={`M${cx - 5} ${cy} l3.5 3.5 l6.5 -7`} fill="none" stroke={hi ? "#fff" : p.card} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </g>
              ) : (
                <rect key={c} x={cx - 10} y={cy - 10} width={20} height={20} rx={5} fill="none" stroke={p.stroke} strokeWidth={1.5} />
              );
            })}
          </g>
        );
      })}
    </g>
  );
}

const scenes = {
  guides: Guides,
  field: Field,
  estimation: Estimation,
  procurement: Procurement,
  quality: Quality,
  ai: ZedAI,
  access: Access,
} satisfies Record<string, ComponentType<{ p: Palette }>>;

export type CoverScene = keyof typeof scenes;

const categoryScene: Record<BlogCategory, CoverScene> = {
  Guides: "guides",
  Field: "field",
  Estimation: "estimation",
  Procurement: "procurement",
  Quality: "quality",
  "Zed AI": "ai",
};

export function isCoverScene(value: string): value is CoverScene {
  return value in scenes;
}

export default function BlogCover({
  category,
  scene,
  tone = "light",
  fit = "cover",
  className = "",
}: {
  category: BlogCategory;
  /** "contain" keeps the whole scene visible in very wide or tall boxes; the grid fills the rest. */
  fit?: "cover" | "contain";
  /** Overrides the category's default scene so two posts in one category can differ. */
  scene?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const p = palettes[tone];
  const Scene = scenes[scene && isCoverScene(scene) ? scene : categoryScene[category]];
  const gridId = `blog-grid-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 640 400" preserveAspectRatio={fit === "contain" ? "xMidYMid meet" : "xMidYMid slice"} className={className} role="presentation" aria-hidden>
      <defs>
        <pattern id={gridId} width={32} height={32} patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke={p.grid} strokeWidth={1} />
        </pattern>
      </defs>
      {/* Oversized so the background still fills the box when the scene is letterboxed. */}
      <rect x={-1600} y={-1600} width={3840} height={3600} fill={p.bg} />
      <rect x={-1600} y={-1600} width={3840} height={3600} fill={`url(#${gridId})`} />
      <Scene p={p} />
    </svg>
  );
}
