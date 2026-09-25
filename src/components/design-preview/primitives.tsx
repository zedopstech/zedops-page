/**
 * Design-preview primitives — ZedOps' own system. Structure and rhythm take cues from hexalog.in
 * (1200px column, medium-weight headlines, alternating light/navy bands, 12px cards), but the
 * signature details are deliberately ZedOps' own, drawn from construction drawings:
 *   - Blueprint grid texture (fine + major lines) instead of a dot grid.
 *   - Marker-underline highlight instead of a highlighter block.
 *   - Split-block CTA (label block + separate orange arrow block) instead of a notched ticket.
 *   - Numbered section labels ("01 / Challenges") and corner crop-marks on key cards.
 *   - Squared tag eyebrows instead of pill capsules.
 *
 * Tokens (literal arbitrary values so tailwind.config stays untouched):
 *   navy #172B4D · ink #0E1B33 · body #3D4F6E · muted #6B778C · hairline #E3E8F0
 *   mist #F4F6FA · orange #FE5D02 · peach #FFC29E (marker) · peach-soft #FFF1E8
 */
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const C = {
  navy: "#172B4D",
  ink: "#0E1B33",
  orange: "#FE5D02",
  peach: "#FFCFB0",
} as const;

/** 1200px content column. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 ${className}`}>
      {children}
    </div>
  );
}

/** Marker underline behind the lower half of a key phrase (ZedOps' take — not a full block). */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="bg-[linear-gradient(transparent_60%,rgba(254,93,2,0.32)_60%,rgba(254,93,2,0.32)_90%,transparent_90%)] px-[0.06em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
      {children}
    </span>
  );
}

/** Squared tag eyebrow: solid orange tag + label, 6px radius (not a pill). */
export function Eyebrow({
  tag,
  children,
  tone = "light",
}: {
  tag?: string;
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-md border p-1 pr-3 text-[13px] font-medium ${
        tag ? "" : "pl-3"
      } ${
        dark
          ? "border-white/15 bg-white/[0.07] text-white/85"
          : "border-[#E3E8F0] bg-white text-brand-navy shadow-[0_1px_2px_rgba(23,43,77,0.06)]"
      }`}
    >
      {tag ? (
        <span className="rounded-[4px] bg-brand-orange px-2 py-1 text-[11px] font-bold uppercase leading-none tracking-[0.08em] text-white">
          {tag}
        </span>
      ) : null}
      <span>{children}</span>
    </span>
  );
}

/**
 * Split-block CTA: a label block and a separate square arrow block with a 3px gap between them.
 * (Name kept as TicketButton so call sites don't change.)
 */
export function TicketButton({
  href,
  children,
  variant = "navy",
  className = "",
  full = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "navy" | "orange" | "white";
  className?: string;
  full?: boolean;
}) {
  const v = {
    navy: {
      label: "bg-brand-navy text-white group-hover:bg-[#1E3760]",
      arrow: "bg-brand-orange text-white",
    },
    orange: {
      label: "bg-brand-orange text-white group-hover:bg-brand-orange-soft",
      arrow: "bg-white text-brand-orange",
    },
    white: {
      label: "bg-white text-brand-navy group-hover:bg-[#FFF6F0]",
      arrow: "bg-brand-orange text-white",
    },
  }[variant];
  return (
    <a
      href={href}
      className={`group inline-flex h-10 items-stretch gap-[3px] text-[15px] font-medium ${full ? "w-full" : ""} ${className}`}
    >
      <span
        className={`flex items-center whitespace-nowrap rounded-l-lg rounded-r-[3px] px-4 transition-colors duration-200 ${v.label} ${full ? "flex-1" : ""}`}
      >
        {children}
      </span>
      <span
        className={`flex w-10 shrink-0 items-center justify-center rounded-l-[3px] rounded-r-lg ${v.arrow}`}
      >
        <ArrowUpRight
          size={17}
          strokeWidth={2.2}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </span>
    </a>
  );
}

/** Secondary: white 8px-radius button with hairline border and a trailing icon. */
export function GhostButton({
  href,
  children,
  icon: Icon,
  tone = "light",
}: {
  href: string;
  children: ReactNode;
  icon?: LucideIcon;
  tone?: "light" | "dark";
}) {
  return (
    <a
      href={href}
      className={`inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-[15px] font-medium transition-colors ${
        tone === "dark"
          ? "border-white/25 text-white hover:bg-white/10"
          : "border-[#CDD5E3] bg-white/80 text-brand-navy hover:border-brand-navy/40 hover:bg-white"
      }`}
    >
      {children}
      {Icon ? <Icon size={16} strokeWidth={1.8} aria-hidden /> : null}
    </a>
  );
}

/** hexalog h2: medium weight, tight tracking, 40px desktop. */
export const h2Class =
  "text-[30px] font-semibold leading-[1.12] tracking-[-0.035em] sm:text-[36px] lg:text-[40px]";

/**
 * hexalog's split section header: headline + ticket CTA on the left,
 * short paragraph + a row of small outline icons on the right.
 */
export function SplitHeader({
  label,
  title,
  body,
  cta,
  icons = [],
  tone = "light",
  id,
}: {
  label?: string;
  title: ReactNode;
  body: ReactNode;
  cta?: ReactNode;
  icons?: LucideIcon[];
  tone?: "light" | "dark";
  id?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-16">
      <div>
        {label ? <SectionLabel tone={tone}>{label}</SectionLabel> : null}
        <h2
          id={id}
          className={`${h2Class} ${dark ? "text-white" : "text-brand-navy"}`}
        >
          {title}
        </h2>
        {cta ? <div className="mt-7">{cta}</div> : null}
      </div>
      <div className="lg:pt-3">
        <p
          className={`max-w-md text-base leading-[1.6] ${dark ? "text-white/70" : "text-[#3D4F6E]"}`}
        >
          {body}
        </p>
        {icons.length ? (
          <div
            className={`mt-5 flex gap-5 ${dark ? "text-white/40" : "text-[#8C97AB]"}`}
          >
            {icons.map((I, i) => (
              <I key={i} size={20} strokeWidth={1.5} aria-hidden />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** Centered header variant (hexalog "How Hexalog makes a difference"). */
export function CenterHeader({
  label,
  title,
  body,
  tone = "light",
  id,
  className = "",
}: {
  label?: string;
  title: ReactNode;
  body?: ReactNode;
  tone?: "light" | "dark";
  id?: string;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      {label ? (
        <div className="flex justify-center">
          <SectionLabel tone={tone}>{label}</SectionLabel>
        </div>
      ) : null}
      <h2
        id={id}
        className={`${h2Class} ${dark ? "text-white" : "text-brand-navy"}`}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={`mx-auto mt-5 max-w-2xl text-base leading-[1.6] sm:text-[17px] ${dark ? "text-white/70" : "text-[#5E6C84]"}`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

/** Blueprint grid texture (absolute): fine 24px lines + major 120px lines. Name kept for call sites. */
export function DotGrid({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const minor = dark ? "rgba(255,255,255,0.025)" : "rgba(23,43,77,0.045)";
  const major = dark ? "rgba(255,255,255,0.05)" : "rgba(23,43,77,0.08)";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: `linear-gradient(${major} 1px, transparent 1px), linear-gradient(90deg, ${major} 1px, transparent 1px), linear-gradient(${minor} 1px, transparent 1px), linear-gradient(90deg, ${minor} 1px, transparent 1px)`,
        backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
        backgroundPosition: "-1px -1px",
      }}
    />
  );
}

/** Soft blurred colour glow. */
export function Glow({
  className = "",
  color = "orange",
}: {
  className?: string;
  color?: "orange" | "navy" | "white";
}) {
  const c = {
    orange: "rgba(254,93,2,0.22)",
    navy: "rgba(40,80,150,0.35)",
    white: "rgba(255,255,255,0.12)",
  }[color];
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ background: `radial-gradient(closest-side, ${c}, transparent)` }}
    />
  );
}

/** Corner crop-marks (blueprint registration ticks) — absolute, place inside a relative parent. */
export function CornerTicks({
  tone = "orange",
}: {
  tone?: "orange" | "light";
}) {
  const c = tone === "orange" ? "border-brand-orange" : "border-white/40";
  return (
    <>
      <span
        aria-hidden
        className={`pointer-events-none absolute top-2.5 left-2.5 h-3 w-3 border-t-2 border-l-2 ${c}`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute right-2.5 bottom-2.5 h-3 w-3 border-r-2 border-b-2 ${c}`}
      />
    </>
  );
}

/** Spec card: white, hairline border, orange crop-marks. Name kept for call sites. */
export function GradientCard({
  children,
  className = "",
  inner = "",
}: {
  children: ReactNode;
  className?: string;
  inner?: string;
}) {
  return (
    <div
      className={`relative rounded-xl border border-[#E3E8F0] bg-white ${className}`}
    >
      <CornerTicks />
      <div className={`h-full ${inner}`}>{children}</div>
    </div>
  );
}

/** Numbered section label: "01 / Challenges" with an orange square marker. */
export function SectionLabel({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`mb-5 inline-flex items-center gap-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] ${
        tone === "dark" ? "text-white/60" : "text-[#6B778C]"
      }`}
    >
      <span className="h-2 w-2 bg-brand-orange" aria-hidden />
      {children}
    </p>
  );
}

/** Construction hazard tape in navy/orange. */
export function HazardTape({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-2 w-full ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(-45deg, #FE5D02 0 9px, #172B4D 9px 18px)",
      }}
    />
  );
}

/** Dark navy band gradient. */
export const darkBand =
  "bg-[linear-gradient(120deg,#23406F_0%,#172B4D_45%,#0E1B33_100%)]";
