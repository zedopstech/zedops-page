import { LocalA } from "@/components/LocalLink";
/**
 * ZedOps design system. Calm, product-led SaaS layout (Geist, medium-weight two-tone
 * headlines, white + one mist surface) expressed in blueprint language:
 *   - Framed sections: content sits between hairline rails; sections meet on a hairline.
 *   - Blueprint grid texture reserved for heroes.
 *   - Split-block CTA (label block + separate orange arrow block).
 *   - Orange gradient emphasis on a key phrase, used once per headline at most.
 *
 * Tokens (literal arbitrary values so tailwind.config stays untouched):
 *   navy #172B4D · ink #0E1B33 · body #3D4F6E · muted #616D82 · hairline #E3E8F0
 *   mist #F7F8FA · orange #FE5D02
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

/**
 * Emphasis on a key phrase: orange gradient text. Only used at headline sizes, where
 * WCAG's large-text 3:1 threshold applies (the darker stop is 3.6:1 on white).
 */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="bg-[linear-gradient(95deg,#E24E00_0%,#FE6A12_100%)] bg-clip-text text-transparent [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
      {children}
    </span>
  );
}

/** Second tone of a two-tone headline (Stripe-style): same line, muted slate. */
export function Muted({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={dark ? "text-white/55" : "text-[#5E6C84]"}>{children}</span>;
}

const sectionTones = {
  white: { bg: "bg-white", line: "border-[#E8ECF2]", dark: false },
  mist: { bg: "bg-[#F7F8FA]", line: "border-[#E3E8F0]", dark: false },
  navy: { bg: "bg-[#0E1B33]", line: "border-white/10", dark: true },
} as const;

/**
 * Framed section: full-bleed background, a 1200px frame with hairline rails (desktop)
 * and a top hairline.
 */
export function Section({
  children,
  tone = "white",
  className = "",
  frameClassName = "",
  id,
  labelledBy,
  label,
  topRule = true,
}: {
  children: ReactNode;
  tone?: keyof typeof sectionTones;
  className?: string;
  frameClassName?: string;
  id?: string;
  labelledBy?: string;
  label?: string;
  topRule?: boolean;
}) {
  const t = sectionTones[tone];
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      data-nav-theme={t.dark ? "dark" : undefined}
      className={`relative ${t.bg} ${topRule ? `border-t ${t.line}` : ""} ${className}`}
    >
      <div className={`relative mx-auto max-w-[1200px] lg:border-x ${t.line} ${frameClassName}`}>
        {children}
      </div>
    </section>
  );
}

/** Horizontal padding inside a Section frame (matches Container's content edge). */
export const framePad = "px-5 sm:px-8 lg:px-14";

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
      className={`inline-flex items-center gap-2.5 rounded-md border p-1 pe-3 text-[13px] font-medium ${
        tag ? "" : "ps-3"
      } ${
        dark
          ? "border-white/15 bg-white/[0.07] text-white/85"
          : "border-[#E3E8F0] bg-white text-brand-navy shadow-[0_1px_2px_rgba(23,43,77,0.06)]"
      }`}
    >
      {tag ? (
        // White on the brand orange, per the design decision. This is a
        // deliberate WCAG AA exception: white on #FE5D02 is 3.1:1 and needs
        // 4.5:1 at this size. The alternative that passed - a navy label, or a
        // darkened orange that read as brown - was rejected, so the orange stays
        // exactly on-brand and the chip stays consistent with every other
        // orange-on-white element in the system.
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
    <LocalA
      href={href}
      className={`group inline-flex h-10 items-stretch gap-[3px] text-[15px] font-medium ${full ? "w-full" : ""} ${className}`}
    >
      <span
        className={`flex items-center whitespace-nowrap rounded-s-lg rounded-e-[3px] px-4 transition-colors duration-200 ${v.label} ${full ? "flex-1" : ""}`}
      >
        {children}
      </span>
      <span
        className={`flex w-10 shrink-0 items-center justify-center rounded-s-[3px] rounded-e-lg ${v.arrow}`}
      >
        <ArrowUpRight
          size={17}
          strokeWidth={2.2}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </span>
    </LocalA>
  );
}

/** Secondary: hairline-bordered button with an optional trailing icon. */
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
    <LocalA
      href={href}
      className={`inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-[15px] font-medium transition-colors ${
        tone === "dark"
          ? "border-white/30 text-white hover:border-white/60 hover:bg-white/5"
          : "border-[#C9D2DF] bg-white text-brand-navy hover:border-brand-navy"
      }`}
    >
      {children}
      {Icon ? <Icon size={16} strokeWidth={1.8} aria-hidden /> : null}
    </LocalA>
  );
}

/**
 * Fills a product-screenshot frame whose capture has not been produced yet.
 *
 * Four module landing pages referenced dashboard PNGs (/taskresolution.png,
 * /workforce.png, /dailyintelligencedash.png, /Punchlistmanagementdash.png)
 * that were never committed to the repo, so each of those pages was requesting a
 * file that 404s and rendering a broken-image glyph on top of its own grey
 * frame. Requesting a missing asset is strictly worse than drawing nothing:
 * it costs a round trip, shows the browser's placeholder, and lands in the
 * server logs as an error on a page that is otherwise fine.
 *
 * This draws the frame instead of fetching anything, and says what belongs
 * there rather than leaving a mystery. When the real capture exists, drop it
 * back in as the <img> this replaced - the surrounding container already has
 * the border, radius and shadow.
 */
export function ProductShotPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#F4F6FA] px-6 text-center"
      // The neighbouring overlay div already dims the frame from the left; a
      // second dark wash here would just make the label harder to read.
    >
      <span
        aria-hidden
        className="h-8 w-8 rounded-[6px] border border-[#CFD9E6] bg-white"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,transparent 0 5px,rgba(23,43,77,0.05) 5px 6px)",
        }}
      />
      <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#616D82]">
        {label}
      </p>
      <p className="max-w-[34ch] text-[14px] leading-[1.5] text-[#5F6B80]">
        Dashboard capture in production
      </p>
    </div>
  );
}

/**
 * Stands in for a product demo video that has not been recorded yet, inside the
 * "watch demo" modal. Same reasoning as ProductShotPlaceholder: the five
 * *_demo.mp4 files these pages point at were never committed, so opening the
 * modal used to load a player with a 404 behind it.
 */
export function DemoPlaceholder({ title }: { title: string }) {
  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 bg-[#0E1B33] px-6 text-center">
      <span
        aria-hidden
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/60"
      >
        <ArrowUpRight size={18} strokeWidth={1.6} />
      </span>
      <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/80">
        {title}
      </p>
      <p className="max-w-[38ch] text-[14px] leading-[1.5] text-white/55">
        Walkthrough video in production. Request early access and we will show you
        the live product instead.
      </p>
      <LocalA
        href="/early-access"
        className="mt-1 rounded-[4px] bg-brand-orange px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-brand-orange-soft"
      >
        Request early access
      </LocalA>
    </div>
  );
}

/** Section headline: medium weight, tight tracking. */
export const h2Class =
  "text-[32px] font-medium leading-[1.08] tracking-[-0.04em] [text-wrap:balance] sm:text-[40px] lg:text-[48px]";

/**
 * Split section header: label + headline (+ optional CTA) left, a short paragraph right,
 * bottom-aligned. `icons` is accepted for older call sites but no longer drawn.
 */
export function SplitHeader({
  label,
  title,
  body,
  cta,
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
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end lg:gap-16">
      <div>
        {label ? <SectionLabel tone={tone}>{label}</SectionLabel> : null}
        <h2
          id={id}
          className={`${h2Class} max-w-[20ch] ${dark ? "text-white" : "text-brand-navy"}`}
        >
          {title}
        </h2>
      </div>
      <div className="lg:pb-2">
        <p
          className={`max-w-md text-[16px] leading-[1.6] sm:text-[17px] ${dark ? "text-white/65" : "text-[#5E6C84]"}`}
        >
          {body}
        </p>
        {cta ? <div className="mt-6">{cta}</div> : null}
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
    <div className={`mx-auto max-w-[760px] text-center ${className}`}>
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
          className={`mx-auto mt-5 max-w-[56ch] text-[16px] leading-[1.6] sm:text-[17px] ${dark ? "text-white/65" : "text-[#5E6C84]"}`}
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

/** Retired: blurred colour glows read as decoration. Kept as a no-op for call sites. */
export function Glow(_props: { className?: string; color?: "orange" | "navy" | "white" }) {
  return null;
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
        className={`pointer-events-none absolute top-2.5 start-2.5 h-3 w-3 border-t-2 border-s-2 ${c}`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute end-2.5 bottom-2.5 h-3 w-3 border-e-2 border-b-2 ${c}`}
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

/**
 * Retired: small eyebrow labels above headlines ("01 / Challenges", "Platform"). Headlines
 * now carry the section on their own. Kept as a no-op so existing call sites compile.
 */
export function SectionLabel(_props: { children: ReactNode; tone?: "light" | "dark" }) {
  return null;
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
  "bg-[#0E1B33]";
