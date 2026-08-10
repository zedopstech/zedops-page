import { motion } from "framer-motion";
import { ArrowRight, Check, FileSpreadsheet, LayoutDashboard, Minus, Sparkles, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";

type PointTone = "bad" | "good" | "mid";

const traditional = {
  title: "Traditional Way",
  icon: FileSpreadsheet,
  points: [
    { tone: "bad" as PointTone, text: "Paper & Excel based processes" },
    { tone: "bad" as PointTone, text: "Disconnected tools & data silos" },
    { tone: "bad" as PointTone, text: "Manual reports & no real-time insights" },
    { tone: "bad" as PointTone, text: "Delays, rework & cost overruns" },
    { tone: "bad" as PointTone, text: "Limited accountability & tracking" },
  ],
  footer: "Low visibility. High risk. Lost time.",
};

const digital = {
  title: "Digital Way",
  icon: LayoutDashboard,
  points: [
    { tone: "good" as PointTone, text: "Digital tools & dashboards" },
    { tone: "good" as PointTone, text: "Centralized data & reports" },
    { tone: "good" as PointTone, text: "Better collaboration" },
    { tone: "mid" as PointTone, text: "Still disconnected workflows" },
    { tone: "mid" as PointTone, text: "Manual follow-ups & approvals" },
    { tone: "mid" as PointTone, text: "Data without intelligence" },
  ],
  footer: "More visibility. Still fragmented.",
};

const zedops = {
  title: "AI-Powered Way with ZedOps",
  icon: Sparkles,
  points: [
    { tone: "good" as PointTone, text: "Connected workflows across every stage" },
    { tone: "good" as PointTone, text: "AI-powered insights & predictions" },
    { tone: "good" as PointTone, text: "Smart automation & follow-ups" },
    { tone: "good" as PointTone, text: "Real-time visibility & early risk detection" },
    { tone: "good" as PointTone, text: "Data-driven decisions & actions" },
    { tone: "good" as PointTone, text: "Zero-paper, complete accountability" },
  ],
};

function PointIcon({ tone }: { tone: PointTone }) {
  if (tone === "bad") return <X size={13} className="mt-0.5 shrink-0 text-[#C53030]" strokeWidth={2.25} aria-hidden />;
  if (tone === "mid") return <Minus size={13} className="mt-0.5 shrink-0 text-[#97A0AF]" strokeWidth={2.25} aria-hidden />;
  return <Check size={13} className="mt-0.5 shrink-0 text-[#1F7A4D]" strokeWidth={2.25} aria-hidden />;
}

function VsBadge() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-brand-navy bg-white text-[10px] font-extrabold tracking-wide text-brand-navy shadow-[0_4px_12px_-6px_rgba(23,43,77,0.35)]">
      VS
    </div>
  );
}

export default function Testimonials() {
  const isMobile = useIsMobile();

  return (
    <section className="border-t border-gray-200 bg-[#F8FAFC] py-8 lg:py-10" aria-labelledby="compare-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...scrollMotionProps(isMobile, { y: 20, duration: 0.45 })} className="mx-auto mb-5 max-w-3xl text-center lg:mb-6">
          <h2 id="compare-heading" className="text-2xl font-extrabold leading-snug tracking-tight text-brand-navy sm:text-3xl">
            Three ways of <span className="text-brand-orange">MEP & construction</span> management.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-[#42526E]">
            From disconnected processes to digital workflows and AI-powered execution — see how ZedOps changes the way
            construction teams work.
          </p>
        </motion.div>

        <div className="lg:flex lg:items-stretch lg:gap-0">
          {/* Traditional */}
          <motion.article
            {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}
            className="flex flex-1 flex-col rounded-md border border-[#E5E7EB] bg-[#F4F6FB] p-3.5 sm:p-4 transition-colors duration-150 hover:border-[#D0D7E2] motion-reduce:transition-none"
          >
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E5E7EB] bg-white">
                <FileSpreadsheet size={15} className="text-[#6B778C]" aria-hidden />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.14em] text-[#97A0AF] uppercase">01</p>
                <h3 className="text-[14px] font-extrabold text-[#42526E]">{traditional.title}</h3>
              </div>
            </div>
            <ul className="flex flex-1 flex-col gap-1.5">
              {traditional.points.map((p) => (
                <li key={p.text} className="flex items-start gap-2 text-[12px] leading-snug text-[#6B778C]">
                  <PointIcon tone={p.tone} />
                  {p.text}
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-[#E5E7EB] pt-2.5 text-[11px] font-semibold text-[#6B778C]">{traditional.footer}</p>
          </motion.article>

          <div className="relative z-20 my-2 flex shrink-0 justify-center lg:my-0 lg:w-10 lg:items-center">
            <VsBadge />
          </div>

          {/* Digital */}
          <motion.article
            {...scrollMotionProps(isMobile, { y: 16, duration: 0.4, delay: 0.05 })}
            className="flex flex-1 flex-col rounded-md border border-[#E5E7EB] bg-white p-3.5 sm:p-4 transition-[transform,box-shadow,border-color] duration-150 hover:-translate-y-0.5 hover:border-[#C7D5F5] hover:shadow-[0_12px_28px_-22px_rgba(23,43,77,0.28)] motion-reduce:transform-none motion-reduce:transition-none"
          >
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E5E7EB] bg-[#EBF0FF]">
                <LayoutDashboard size={15} className="text-brand-navy" aria-hidden />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.14em] text-[#97A0AF] uppercase">02</p>
                <h3 className="text-[14px] font-extrabold text-brand-navy">{digital.title}</h3>
              </div>
            </div>
            <ul className="flex flex-1 flex-col gap-1.5">
              {digital.points.map((p) => (
                <li key={p.text} className="flex items-start gap-2 text-[12px] leading-snug text-[#42526E]">
                  <PointIcon tone={p.tone} />
                  {p.text}
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-[#E5E7EB] pt-2.5 text-[11px] font-semibold text-brand-navy">{digital.footer}</p>
          </motion.article>

          <div className="relative z-20 my-2 flex shrink-0 justify-center lg:my-0 lg:w-10 lg:items-center">
            <VsBadge />
          </div>

          {/* ZedOps hero */}
          <motion.article
            {...scrollMotionProps(isMobile, { y: 16, duration: 0.4, delay: 0.1 })}
            className="relative flex flex-[1.12] flex-col overflow-hidden rounded-md border-2 border-brand-navy bg-white shadow-[0_16px_36px_-24px_rgba(23,43,77,0.4)] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-22px_rgba(23,43,77,0.45)] motion-reduce:transform-none motion-reduce:transition-none"
          >
            <div className="bg-brand-navy px-3.5 py-2.5 sm:px-4">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-md bg-white/10">
                  <span className="pointer-events-none absolute inset-0 rounded-md border border-brand-orange/40 motion-safe:animate-[pulse_2.8s_ease-in-out_infinite] motion-reduce:animate-none" aria-hidden />
                  <Sparkles size={15} className="text-brand-orange" aria-hidden />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.14em] text-brand-orange uppercase">03 · Next-gen</p>
                  <h3 className="text-[14px] font-extrabold text-white">{zedops.title}</h3>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-3.5 sm:p-4">
              <ul className="flex flex-col gap-1.5">
                {zedops.points.map((p) => (
                  <li key={p.text} className="flex items-start gap-2 text-[12px] leading-snug text-brand-navy">
                    <Check size={13} className="mt-0.5 shrink-0 text-brand-orange" strokeWidth={2.25} aria-hidden />
                    {p.text}
                  </li>
                ))}
              </ul>
              <div className="mt-3 rounded-md border border-brand-navy/10 bg-[#F4F6FB] p-2.5">
                <p className="text-[12px] font-extrabold text-brand-navy">Built for better project decisions.</p>
                <p className="mt-0.5 text-[11px] leading-snug text-[#6B778C]">
                  Connect project data, field execution and operational intelligence in one place.
                </p>
              </div>
            </div>
          </motion.article>
        </div>

        <motion.div {...scrollMotionProps(isMobile, { y: 12, duration: 0.35, delay: 0.08 })} className="mt-5 text-center">
          <p className="mb-3 text-sm font-semibold text-[#42526E]">
            Move from disconnected execution to intelligent project control.
          </p>
          <a
            href="#capabilities"
            className="inline-flex items-center gap-2 rounded-md bg-brand-orange px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
          >
            See how ZedOps works
            <ArrowRight size={14} aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
