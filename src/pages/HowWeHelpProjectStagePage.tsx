import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, ClipboardList, HardHat } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import PageHero from "@/components/PageHero";
import HowWeHelpPageShell from "@/components/HowWeHelpPageShell";
import { projectStages } from "@/data/howWeHelp";

const phaseIcons = [ClipboardList, HardHat, Building2] as const;

export default function HowWeHelpProjectStagePage() {
  const isMobile = useIsMobile();

  useSEO({
    title: "By project stage  -  How ZedOps helps  -  ZedOps",
    description:
      "Preconstruction, construction, and closeout: how ZedOps modules line up with each project phase and where to dive into the live capability list.",
  });

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <HowWeHelpPageShell
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "How we help", href: "/how-we-help" },
        { label: "By project stage" },
      ]}
    >
      <PageHero
        pill="Project lifecycle"
        PillIcon={ClipboardList}
        title="From estimate to handover without switching systems."
        subtitle="Preconstruction leans on libraries and estimates; construction on projects, field logs, and material management; closeout on inspections, punch, handover, and reporting - all on one tenant so context is not re-entered phase to phase."
      >
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-2">
          <nav aria-label="Phases on this page" className="flex flex-wrap justify-center gap-2">
            {projectStages.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center rounded-full border border-gray-200 bg-white/95 px-4 py-2.5 text-left text-xs font-bold text-brand-navy shadow-sm transition-all hover:border-[#C7D5F5] hover:bg-[#EBF0FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052CC] focus-visible:ring-offset-2"
              >
                <span className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EBF0FF] text-xs font-extrabold text-[#0052CC]">
                  {i + 1}
                </span>
                {s.title}
              </a>
            ))}
          </nav>
          <a
            href="/how-we-help"
            className="rounded-md bg-brand-orange px-6 py-3 text-xs font-bold text-white transition-colors hover:bg-brand-orange-soft"
          >
            How we help
          </a>
        </div>
      </PageHero>

      <section className="border-t border-gray-200 bg-[#F4F6FB] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 20, duration: 0.4 })} className="mb-12 flex flex-col gap-4 lg:mb-14 lg:flex-row lg:items-end lg:gap-20">
            <div>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl">
                From bid to <span className="text-[#0052CC]">closeout</span> - how ZedOps maps to the job.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-snug text-[#42526E] lg:max-w-md lg:pb-1">
              Estimating and planning stay tied to library truth; active jobs feed one project record for site and office; turnover keeps inspections, QHSE, and exports on the same trail you used during build.
            </p>
          </motion.div>

          <div className="flex flex-col gap-8 lg:gap-10">
            {projectStages.map((stage, i) => {
              const Icon = phaseIcons[i] ?? ClipboardList;
              const step = String(i + 1).padStart(2, "0");
              const mediaFirst = i % 2 === 1;
              return (
                <motion.article
                  key={stage.id}
                  id={stage.id}
                  {...scrollMotionProps(isMobile, { y: 28, duration: 0.45, delay: 0.05 })}
                  className="group relative scroll-mt-28 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md"
                >
                  <div
                    className={`flex min-h-0 flex-col divide-y divide-gray-200 lg:min-h-[min(20rem,42vw)] lg:flex-row lg:divide-x lg:divide-y-0 ${mediaFirst ? "lg:flex-row-reverse" : ""}`}
                  >
                    <div className="flex flex-1 flex-col justify-center p-8 sm:p-10 lg:p-12 xl:p-14">
                      <div className="mb-6 flex flex-wrap items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#EBF0FF]">
                          <Icon size={20} className="text-[#0052CC]" aria-hidden />
                        </div>
                        <span className="w-full text-[10px] font-black uppercase tracking-[0.18em] text-[#97A0AF] sm:w-auto sm:pl-2">
                          {stage.title}
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold leading-snug text-brand-navy sm:text-2xl lg:text-[1.65rem]">{stage.tagline}</h3>
                      <p className="mt-4 text-base leading-snug text-[#42526E]">{stage.body}</p>
                      <ul className="mt-6 space-y-2 border-t border-gray-100 pt-6">
                        {stage.outcomes.map((o) => (
                          <li key={o} className="flex items-start gap-2.5 text-sm text-[#42526E]">
                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0052CC]" aria-hidden />
                            {o}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={stage.platformPath}
                        className="group/link mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0052CC] transition-colors hover:text-[#0747A6]"
                      >
                        {stage.platformLabel}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" aria-hidden />
                      </a>
                      <p className="mt-6 border-t border-gray-100 pt-6 text-xs leading-snug text-[#97A0AF]">
                        <span className="font-semibold text-brand-navy">In product:</span> menus follow the phase you’re in; roles
                        and permissions stay the same.
                      </p>
                    </div>

                    <div className="relative flex flex-1 flex-col justify-between overflow-hidden bg-linear-to-br from-[#EBF0FF] via-[#F4F6FB] to-white p-8 sm:p-10 lg:p-12 xl:p-14">
                      <span
                        className="pointer-events-none absolute -right-2 top-2 select-none text-[6.5rem] font-black leading-none opacity-90 sm:text-[8rem] lg:top-4 lg:text-[9rem]"
                        style={{ color: "#E8EDF5" }}
                        aria-hidden
                      >
                        {step}
                      </span>
                      <div className="relative z-1 max-w-lg">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy/40">Phase snapshot</p>
                        <p className="mt-3 text-2xl font-extrabold leading-tight text-brand-navy sm:text-3xl">{stage.title}</p>
                        <p className="mt-4 text-sm leading-snug text-[#42526E]">
                          One tenant and role model end to end - field, office, and leadership only see what their access allows,
                          from estimating through turnover.
                        </p>
                      </div>
                      <div className="relative z-1 mt-10 rounded-xl border border-gray-200/90 bg-white/95 px-5 py-4 shadow-sm backdrop-blur-sm sm:px-6 sm:py-5">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#97A0AF]">Platform area</p>
                        <p className="mt-2 text-sm font-extrabold text-brand-navy">{stage.platformLabel}</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-0.5 origin-left scale-x-0 bg-[#0052CC] transition-transform duration-300 group-hover:scale-x-100" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-blue-100 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-[#42526E]">
            Curious how menus and AI follow permissions?{" "}
            <a href="/how-we-help/role" className="font-bold text-[#0052CC] hover:text-[#0747A6]">
              Roles &amp; permissions →
            </a>{" "}
            <span className="font-normal text-[#6B778C]">·</span>{" "}
            <a href="/who-we-serve" className="font-bold text-[#0052CC] hover:text-[#0747A6]">
              Built for you →
            </a>
          </p>
        </div>
      </section>
    </HowWeHelpPageShell>
  );
}
