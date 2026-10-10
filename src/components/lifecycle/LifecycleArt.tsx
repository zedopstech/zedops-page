import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Building2, HardHat, ClipboardCheck, Layers } from "lucide-react";

/* ---------- isometric cube helper ---------- */

type CubeProps = {
  ox: number;
  oy: number;
  dx: number;
  h: number;
  fillTop: string;
  fillLeft: string;
  fillRight: string;
  stroke: string;
  strokeOpacity?: number;
  label?: string;
  labelColor?: string;
};

function IsoCube({
  ox,
  oy,
  dx,
  h,
  fillTop,
  fillLeft,
  fillRight,
  stroke,
  strokeOpacity = 1,
  label,
  labelColor = "#FFFFFF",
}: CubeProps) {
  const dy = dx / 2;
  const top = `${ox},${oy}`;
  const right = `${ox + dx},${oy + dy}`;
  const bottom = `${ox},${oy + 2 * dy}`;
  const left = `${ox - dx},${oy + dy}`;
  const leftFace = `${left} ${bottom} ${ox - dx},${oy + 2 * dy + h} ${ox - dx},${oy + dy + h}`;
  const rightFace = `${bottom} ${right} ${ox + dx},${oy + dy + h} ${ox},${oy + 2 * dy + h}`;
  return (
    <g>
      <polygon points={leftFace} fill={fillLeft} stroke={stroke} strokeOpacity={strokeOpacity} strokeWidth={1} />
      <polygon points={rightFace} fill={fillRight} stroke={stroke} strokeOpacity={strokeOpacity} strokeWidth={1} />
      <polygon
        points={`${top} ${right} ${bottom} ${left}`}
        fill={fillTop}
        stroke={stroke}
        strokeOpacity={strokeOpacity}
        strokeWidth={1.25}
      />
      {label ? (
        <text
          x={ox}
          y={oy + dy + 4}
          textAnchor="middle"
          fontSize={14}
          fontWeight={800}
          fill={labelColor}
          opacity={0.9}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

/* ---------- hero isometric ---------- */

export function HeroIsometric({ className = "" }: { className?: string }) {
  const reduce = usePrefersReducedMotion();
  const cubes = [
    { ox: 96, oy: 286, label: "01" },
    { ox: 184, oy: 232, label: "02" },
    { ox: 272, oy: 178, label: "03" },
    { ox: 360, oy: 124, label: "04" },
  ];
  return (
    <motion.svg
      viewBox="0 0 460 420"
      className={className}
      initial={false}
      animate={reduce ? undefined : { y: [0, -12, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      role="img"
      aria-label="Isometric ZedOps platform showing the four project lifecycle stages"
    >
      <defs>
        <radialGradient id="heroOrangeGlow" cx="70%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#FF6500" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#FF6500" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="heroBlueGlow" cx="30%" cy="80%" r="55%">
          <stop offset="0%" stopColor="#2D6BFF" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#2D6BFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cubeTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3E73E8" />
          <stop offset="100%" stopColor="#1E4FB0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="460" height="420" fill="url(#heroOrangeGlow)" />
      <rect x="0" y="0" width="460" height="420" fill="url(#heroBlueGlow)" />

      {/* faint blueprint grid */}
      <g stroke="#2D6BFF" strokeOpacity="0.10" strokeWidth="1">
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 46} y1={0} x2={i * 46 - 120} y2={420} />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 46} x2={460} y2={i * 46 + 120} />
        ))}
      </g>

      {/* ground platform */}
      <polygon points="230,360 420,260 230,160 40,260" fill="#0E2A52" stroke="#2D6BFF" strokeOpacity="0.35" />
      <polygon points="40,260 230,160 230,200 40,300" fill="#0B2348" />
      <polygon points="420,260 230,160 230,200 420,300" fill="#081D3B" />

      {cubes.map((c, i) => (
        <IsoCube
          key={c.label}
          ox={c.ox}
          oy={c.oy}
          dx={48}
          h={48}
          fillTop="url(#cubeTop)"
          fillLeft="#16356B"
          fillRight="#0E2A52"
          stroke="#FF6500"
          strokeOpacity={0.85}
          label={c.label}
        />
      ))}
    </motion.svg>
  );
}

/* ---------- stage snapshot illustration ---------- */

const STAGE_ICON = {
  preconstruction: Building2,
  construction: HardHat,
  closeout: ClipboardCheck,
  "platform-core": Layers,
} as const;

export function StageArt({
  variant,
  className = "",
}: {
  variant: keyof typeof STAGE_ICON;
  className?: string;
}) {
  const Icon = STAGE_ICON[variant];
  return (
    <svg
      viewBox="0 0 240 200"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`stop-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3E73E8" />
          <stop offset="100%" stopColor="#1E4FB0" />
        </linearGradient>
      </defs>
      <g stroke="#2D6BFF" strokeOpacity="0.10" strokeWidth="1">
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 48} y1={0} x2={i * 48 - 60} y2={200} />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 48} x2={240} y2={i * 48 + 60} />
        ))}
      </g>
      <IsoCube
        ox={96}
        oy={86}
        dx={34}
        h={34}
        fillTop={`url(#stop-${variant})`}
        fillLeft="#16356B"
        fillRight="#0E2A52"
        stroke="#FF6500"
        strokeOpacity={0.8}
      />
      <IsoCube
        ox={150}
        oy={54}
        dx={28}
        h={28}
        fillTop={`url(#stop-${variant})`}
        fillLeft="#16356B"
        fillRight="#0E2A52"
        stroke="#FF6500"
        strokeOpacity={0.7}
      />
      <g transform="translate(150,120)" className="text-[#102B57]" opacity={0.16}>
        <Icon size={56} strokeWidth={1.5} />
      </g>
    </svg>
  );
}
