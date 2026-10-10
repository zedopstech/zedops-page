import { LocalA } from "@/components/LocalLink";
import { useState } from "react";
import { useI18n } from "@/i18n";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Building2, Linkedin, Mail, MapPin } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import ZedOpsMark from "@/components/ZedOpsMark";
import { framePad, Muted, Section, SplitHeader } from "@/components/design-system/primitives";
import { ModuleClosingCta } from "@/components/module/ModuleSections";
import { cofounders, foundingTeam, journey, type Cofounder, type JourneyMoment, type TeamMember } from "@/data/team";

const beliefs = [
  { title: "One record beats ten tools", body: "Estimates, programmes, materials, site logs and cost belong to the same job, so nobody reconciles them by hand." },
  { title: "The field comes first", body: "If it is slow to use on site, the data never arrives. Capture has to take seconds, not minutes." },
  { title: "AI should know the job", body: "Zed AI works on the project record your team already keeps, inside the permissions you already set." },
];

const moodChip: Record<JourneyMoment["mood"], { label: string; cls: string }> = {
  high: { label: "Milestone", cls: "bg-[#FFEADB] text-[#C2410C]" },
  low: { label: "Pain point", cls: "bg-[#E6EAF1] text-brand-navy" },
  now: { label: "Now", cls: "bg-[#E3F5EC] text-[#157347]" },
  next: { label: "Next", cls: "border border-dashed border-[#B8C2D1] text-[#5E6C84]" },
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

/** Headshot with a fallback (initials, or the ZedOps mark when the name isn't announced yet). */
function TeamPhoto({ member, className = "" }: { member: TeamMember; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !member.photo) {
    const letters = initials(member.name);
    return (
      <div
        className={`flex items-center justify-center bg-[#EEF1F5] bg-[linear-gradient(#E3E8F0_1px,transparent_1px),linear-gradient(90deg,#E3E8F0_1px,transparent_1px)] bg-[size:24px_24px] ${className}`}
        aria-hidden
      >
        {letters ? (
          <span className="text-[34px] font-medium tracking-[-0.03em] text-[#9AA5B8]">{letters}</span>
        ) : (
          <ZedOpsMark className="h-10 w-10 opacity-30" />
        )}
      </div>
    );
  }
  return (
    <img
      src={member.photo}
      alt={member.name ? `${member.name}, ${member.role}` : member.role}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

/**
 * The ups and downs of the build as one line: highs above the axis, lows below, "now" on it.
 * Solid up to today, dashed through what is still ahead.
 */
function MoodLine({ active, onPick }: { active: number | null; onPick: (i: number) => void }) {
  const reduce = useReducedMotion();
  const w = 1000;
  const h = 150;
  const pad = 30;
  const step = (w - pad * 2) / (journey.length - 1);
  const nowIndex = Math.max(0, journey.findIndex((m) => m.mood === "now"));
  // Upcoming points climb gently from the axis: the plan, not a promise of how it will feel.
  const yFor = (m: JourneyMoment, i: number) =>
    m.mood === "high" ? 36 : m.mood === "low" ? h - 36 : m.mood === "now" ? h / 2 : h / 2 - (i - nowIndex) * 14;
  const pts = journey.map((m, i) => ({ x: pad + i * step, y: yFor(m, i), mood: m.mood }));
  const curve = (list: typeof pts) =>
    list
      .map((p, i) => {
        if (i === 0) return `M${p.x} ${p.y}`;
        const prev = list[i - 1]!;
        const mx = (prev.x + p.x) / 2;
        return `C${mx} ${prev.y} ${mx} ${p.y} ${p.x} ${p.y}`;
      })
      .join(" ");
  const past = curve(pts.slice(0, nowIndex + 1));
  const ahead = curve(pts.slice(nowIndex));
  const nowPt = pts[nowIndex]!;

  const colorFor = (mood: JourneyMoment["mood"]) =>
    mood === "high" ? "#FE6A12" : mood === "now" ? "#1D9A5B" : mood === "next" ? "#5F6B80" : "#172B4D";

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full overflow-visible" role="img" aria-label="The highs and lows of building ZedOps so far, and what comes next">
      <line x1={0} x2={w} y1={h / 2} y2={h / 2} stroke="#DCE3ED" strokeDasharray="3 5" />
      <line x1={nowPt.x} x2={nowPt.x} y1={8} y2={h - 8} stroke="#1D9A5B" strokeOpacity={0.35} strokeDasharray="2 4" />
      <text x={nowPt.x + 8} y={16} fontSize={12} fontFamily="Geist Mono, monospace" fill="#1D9A5B">
        today
      </text>
      <motion.path
        d={past}
        fill="none"
        stroke="#172B4D"
        strokeWidth={2}
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <path d={ahead} fill="none" stroke="#5F6B80" strokeWidth={2} strokeDasharray="2 7" strokeLinecap="round" />
      {pts.map((p, i) => {
        const on = active === i;
        const color = colorFor(p.mood);
        const hollow = p.mood === "low" || p.mood === "next";
        return (
          <g key={i} className="cursor-pointer" onMouseEnter={() => onPick(i)} onClick={() => onPick(i)}>
            <circle cx={p.x} cy={p.y} r={20} fill="transparent" />
            {p.mood === "now" && !reduce && (
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={8}
                fill={color}
                initial={{ opacity: 0.35, scale: 1 }}
                animate={{ opacity: 0, scale: 2.6 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              />
            )}
            {on && <circle cx={p.x} cy={p.y} r={14} fill={color} fillOpacity={0.14} />}
            <circle
              cx={p.x}
              cy={p.y}
              r={on ? 7 : 6}
              fill={hollow ? "#FFFFFF" : color}
              stroke={color}
              strokeWidth={2}
              strokeDasharray={p.mood === "next" ? "3 2.5" : undefined}
            />
          </g>
        );
      })}
    </svg>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {items.map((s) => (
        <li key={s} className="rounded-md border border-[#E3E8F0] bg-white px-2.5 py-1 text-[13px] text-[#4D5E77]">
          {s}
        </li>
      ))}
    </ul>
  );
}

/** One co-founder: portrait, first-person note, then an experience strip. Alternates sides on desktop. */
function CofounderNote({ person, index, isMobile }: { person: Cofounder; index: number; isMobile: boolean }) {
  const flip = index % 2 === 1;
  const exp = person.experience;
  const headingId = `cofounder-note-${index}`;
  return (
    <article aria-labelledby={headingId} className="border-[#E8ECF2] [&+article]:border-t">
      <div
        className={`grid gap-10 py-14 lg:gap-20 lg:py-20 ${framePad} ${
          flip ? "lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]" : "lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]"
        }`}
      >
        <motion.figure {...scrollMotionProps(isMobile, { y: 16, duration: 0.45 })} className={`w-full max-w-[360px] ${flip ? "lg:order-2 lg:justify-self-end" : ""}`}>
          <TeamPhoto member={person} className="aspect-[4/5] w-full rounded-xl border border-[#E8ECF2]" />
          <figcaption className="mt-4 flex items-start justify-between gap-3">
            <span>
              <span className="block text-[16px] font-medium text-brand-navy">{person.name}</span>
              <span className="block text-[14px] text-[#616D82]">{person.role}</span>
            </span>
            {person.linkedin ? (
              <LocalA href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on LinkedIn`} className="mt-0.5 text-[#5F6B80] hover:text-brand-navy">
                <Linkedin size={17} aria-hidden />
              </LocalA>
            ) : null}
          </figcaption>
        </motion.figure>

        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.45, delay: 0.06 })} className={`lg:pt-2 ${flip ? "lg:order-1" : ""}`}>
          <h3 id={headingId} className="text-[14px] font-medium text-brand-orange">
            {person.headline}
          </h3>
          <div className="mt-6 space-y-5">
            {person.note.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-[24px] leading-[1.35] tracking-[-0.025em] text-brand-navy [text-wrap:pretty] sm:text-[28px]"
                    : "max-w-[620px] text-[17px] leading-[1.7] text-[#4D5E77]"
                }
              >
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid gap-px border-t border-[#E8ECF2] bg-[#E8ECF2] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)_minmax(0,1.1fr)]">
        <div className="bg-[#F7F8FA] p-7 sm:p-8">
          <p className="text-[56px] font-medium leading-none tracking-[-0.05em] text-brand-navy">
            {exp.years}
            <span className="ms-1 text-[20px] tracking-[-0.02em] text-[#5F6B80]">years</span>
          </p>
          <p className="mt-4 text-[15px] font-medium text-brand-navy">{exp.title}</p>
          <p className="text-[14px] text-[#616D82]">{exp.where}</p>
        </div>
        {exp.groups.map((g) => (
          <div key={g.label} className="bg-[#F7F8FA] p-7 sm:p-8">
            <p className="text-[13px] font-medium text-[#5F6B80]">{g.label}</p>
            <Chips items={g.items} />
          </div>
        ))}
      </div>
    </article>
  );
}

export default function AboutPage() {
  const { t } = useI18n();
  const isMobile = useIsMobile();
  const [active, setActive] = useState<number | null>(null);

  useSEO({
    title: "About – ZedOps",
    description:
      "Meet the people building ZedOps, the project execution platform for contractors, and read how the product is coming together.",
  });

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <main id="main">
        <PageHero
          pill={t("About ZedOps")}
          PillIcon={Building2}
          title={<>{t("Built by people who have run the projects.")} <Muted>{t("Now building the software they needed.")}</Muted></>}
          subtitle={t("ZedOps is a project execution platform for contractors, from the first estimate to handover. Built by a small team in Dubai and Madurai, with more than a decade of project delivery behind it.")}
        />

        {/*
            Founder notes and the founding team grid, hidden for now and kept here
            so they can be brought back unchanged. Nothing below is rendered.

            Originally two sections in this order:
              1. "From our founder"  - a CofounderNote per co-founder
              2. "The founding team. Engineering in Madurai." - a grid of
                 foundingTeam members plus an "Open roles / This could be you" tile

            To restore: delete this comment wrapper. The two label comments
            that used to head each section (co-founders, team) are written out
            above and can be re-added, though the sections are self-describing.
        <Section label="From our founder">
          {cofounders.filter((c) => c.show !== false).map((c, ci) => (
            <CofounderNote key={c.photo} person={c} index={ci} isMobile={isMobile} />
          ))}
        </Section>

        <Section tone="mist" labelledBy="about-team">
          <div className={`pt-20 pb-12 lg:pt-28 lg:pb-14 ${framePad}`}>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <SplitHeader
                id="about-team"
                title={<>The founding team. <Muted>Engineering in Madurai.</Muted></>}
                body="A small team working directly with the contractors who will use ZedOps."
              />
            </motion.div>
          </div>

          <ul className="grid gap-px border-t border-[#E8ECF2] bg-[#E8ECF2] sm:grid-cols-2 lg:grid-cols-3">
            {foundingTeam.map((m, i) => (
              <motion.li key={`${m.photo}-${i}`} {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: Math.min(i * 0.05, 0.2) })} className="group bg-white p-5 sm:p-6">
                <div className="overflow-hidden rounded-lg">
                  <TeamPhoto member={m} className="aspect-square w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
                </div>
                <div className="mt-5 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-[17px] font-medium tracking-[-0.015em] text-brand-navy">{m.name}</h4>
                    <p className="text-[14px] text-[#616D82]">{m.role}</p>
                  </div>
                  {m.base ? (
                    <span className="mt-1 inline-flex shrink-0 items-center gap-1 font-mono text-[11.5px] text-[#5F6B80]">
                      <MapPin size={12} aria-hidden />
                      {m.base}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-[14.5px] leading-[1.55] text-[#5E6C84]">{m.bio}</p>
                {m.linkedin ? (
                  // Icon only, matching the founder note above. The visible
                  // "LinkedIn" label was dropped on request; the aria-label
                  // carries the name so the link is not unlabelled for screen
                  // readers, since the icon itself is aria-hidden.
                  <LocalA href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`} className="mt-3 inline-flex text-[#5F6B80] hover:text-brand-navy">
                    <Linkedin size={15} aria-hidden />
                  </LocalA>
                ) : null}
              </motion.li>
            ))}
            <li className="flex flex-col justify-between bg-[#0E1B33] p-7 text-white sm:p-8">
              <div>
                <p className="text-[13px] text-white/50">Open roles</p>
                <h4 className="mt-3 text-[26px] font-medium leading-[1.15] tracking-[-0.03em]">This could be you.</h4>
                <p className="mt-3 text-[15px] leading-[1.6] text-white/65">
                  We are hiring engineers, designers and people who have run construction projects.
                </p>
              </div>
              <LocalA href="mailto:careers@zedops.com" className="mt-10 inline-flex items-center gap-1.5 text-[15px] font-medium text-white hover:text-brand-orange">
                careers@zedops.com <ArrowUpRight size={16} aria-hidden />
              </LocalA>
            </li>
          </ul>
        </Section>
        */}

        {/* Beliefs */}
        <Section labelledBy="about-beliefs">
          <div className={`pt-20 pb-12 lg:pt-28 lg:pb-14 ${framePad}`}>
            <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
              <SplitHeader id="about-beliefs" title={<>{t("What we believe.")}</>} body={t("Three ideas behind every decision we make about the product.")} />
            </motion.div>
          </div>
          <div className="grid gap-px border-t border-[#E3E8F0] bg-[#E3E8F0] lg:grid-cols-3">
            {beliefs.map((b, i) => (
              <motion.div key={b.title} {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: i * 0.06 })} className="bg-[#F7F8FA] p-7 sm:p-9">
                <span className="font-mono text-[11px] text-[#677388]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 text-[20px] font-medium tracking-[-0.025em] text-brand-navy">{t(b.title)}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-[#616D82]">{t(b.body)}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* The build, so far */}
        {/*
          The whole journey section, commented out on request. Nothing in this
          block renders.

          It held, in order: the section heading, the mood legend and the
          timeline graphic (MoodLine, with the "today" marker), the six journey
          cards, and the customer-goals row carrying the draft 50 / 250 / 1,000
          figures.

          The <Section tone="mist"> wrapper went with it: left in place it drew
          an empty band and a rule across the page.

          Also stranded by this, and commented below: moodChip, MoodLine itself
          and the `active` hover state it was driven by.

          To restore: delete this wrapper and the three commented helpers, then
          re-add to the import from "@/data/team":
            - customerGoals, for the goals row
            - JourneyMoment, used by moodChip and MoodLine
          and put labelledBy="about-journey" back on the Section if the heading
          returns.
          <div className={`pt-20 pb-8 lg:pt-28 ${framePad}`}>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pb-3 text-[12.5px] text-[#616D82]">
              <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-brand-orange" aria-hidden />Milestone</span>
              <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full border-2 border-brand-navy bg-white" aria-hidden />Pain point</span>
              <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#1D9A5B]" aria-hidden />Now</span>
              <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full border-2 border-dashed border-[#5F6B80] bg-white" aria-hidden />Next</span>
            </div>
            <MoodLine active={active} onPick={setActive} />
          </div>

          <ol className="grid gap-px border-t border-[#E3E8F0] bg-[#E3E8F0] sm:grid-cols-2 lg:grid-cols-3" onMouseLeave={() => setActive(null)}>
            {journey.map((m, i) => {
              const chip = moodChip[m.mood];
              const on = active === i;
              const bar =
                m.mood === "high" ? "bg-brand-orange" : m.mood === "now" ? "bg-[#1D9A5B]" : m.mood === "next" ? "bg-[#B8C2D1]" : "bg-brand-navy";
              const upcoming = m.mood === "next";
              return (
                <motion.li
                  key={m.title}
                  {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: Math.min(i * 0.05, 0.2) })}
                  onMouseEnter={() => setActive(i)}
                  className={`relative p-7 transition-colors sm:p-8 ${on ? "bg-white" : upcoming ? "bg-[#FBFCFD]" : "bg-[#F7F8FA]"}`}
                >
                  <span className={`absolute inset-x-0 top-0 h-0.5 transition-opacity ${bar} ${on ? "opacity-100" : "opacity-0"}`} aria-hidden />
                  <div className="flex items-center justify-between gap-3">
                    <span className={`inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium ${chip.cls}`}>
                      {m.mood === "now" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1D9A5B]" aria-hidden />}
                      {chip.label}
                    </span>
                    <span className="font-mono text-[11.5px] text-[#5F6B80]">{String(i + 1).padStart(2, "0")} · {m.when}</span>
                  </div>
                  <h3 className={`mt-6 text-[20px] font-medium leading-[1.25] tracking-[-0.025em] ${upcoming ? "text-[#4D5E77]" : "text-brand-navy"}`}>{m.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-[#5E6C84]">{m.body}</p>
                </motion.li>
              );
            })}
          </ol>
        */}

        <ModuleClosingCta
          isMobile={isMobile}
          id="about-cta"
          title={<>{t("Help shape ZedOps.")} <span className="text-white/55">{t("Join early access.")}</span></>}
          body={t("We are building ZedOps with a small group of contractors. Bring one live project and help decide what comes next.")}
          primary={{ label: t("Request early access"), href: "/early-access" }}
          secondary={{ label: t("Talk to us"), href: "/contact" }}
          secondaryIcon={Mail}
        />
      </main>
      <Footer />
    </div>
  );
}
