import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { motion } from "framer-motion";
import { ArrowRight, Building2, HardHat, ClipboardCheck, Layers, Zap } from "lucide-react";
import type { ComponentType } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { StageArt } from "@/components/lifecycle/LifecycleArt";
import { projectStages } from "@/data/howWeHelp";

const stageIconMap: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  preconstruction: Building2,
  construction: HardHat,
  closeout: ClipboardCheck,
  "platform-core": Layers,
};

/* ---------------- small building blocks ---------------- */

function LifecyclePills() {
  return (
    <nav aria-label="Lifecycle stages" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
      {projectStages.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2.5 text-xs font-semibold text-brand-navy backdrop-blur-sm transition-all hover:border-[#2D6BFF]/50 hover:bg-white hover:shadow-[0_0_18px_rgba(45,107,255,0.18)]"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2D6BFF] text-[10px] font-extrabold text-white">
            {String(i + 1).padStart(2, "0")}
          </span>
          {s.title}
        </a>
      ))}
    </nav>
  );
}

function LifecycleContentCard({
  stage,
  icon: Icon,
  num,
}: {
  stage: (typeof projectStages)[number];
  icon: ComponentType<{ size?: number; className?: string }>;
  num: string;
}) {
  const isConstruction = stage.id === "construction";
  return (
    <motion.article
      {...scrollMotionProps(false, { y: 22, duration: 0.45 })}
      className="flex h-full min-h-[260px] flex-col rounded-[14px] border border-[#E2E8F0] bg-white p-8 shadow-[0_1px_3px_rgba(16,43,87,0.06)] sm:p-9"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF4FF]">
        <Icon size={20} className="text-[#102B57]" aria-hidden />
      </div>
      <p className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-[#97A0AF]">
        {num} {stage.title}
      </p>
      <h3 className="mt-2 text-xl font-extrabold leading-snug text-[#102B57] sm:text-[1.35rem]">
        {stage.tagline}
      </h3>
      <p className="mt-3 text-sm leading-snug text-[#42526E]">{stage.body}</p>
      <ul
        className={`mt-5 space-y-2 border-t border-gray-100 pt-5 ${
          isConstruction ? "sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-2 sm:space-y-0" : ""
        }`}
      >
        {stage.outcomes.map((o) => (
          <li key={o} className="flex items-start gap-2 text-sm text-[#42526E]">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#102B57]" aria-hidden />
            {o}
          </li>
        ))}
      </ul>
      <a
        href={stage.platformPath}
        className="group/link mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0052CC] transition-colors hover:text-[#0747A6]"
      >
        {stage.platformLabel}
        <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" aria-hidden />
      </a>
    </motion.article>
  );
}

function LifecycleSnapshotCard({
  stage,
  icon: Icon,
  num,
}: {
  stage: (typeof projectStages)[number];
  icon: ComponentType<{ size?: number; className?: string }>;
  num: string;
}) {
  return (
    <motion.article
      {...scrollMotionProps(false, { y: 22, duration: 0.45 })}
      className="relative h-full min-h-[260px] overflow-hidden rounded-[14px] border border-[#E2E8F0] bg-gradient-to-br from-[#EEF4FF] to-[#F7FAFF] p-8 sm:p-9"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#102B57]/40">Phase snapshot</p>
      <h3 className="mt-2 text-2xl font-extrabold leading-tight text-[#102B57]">{stage.title}</h3>
      <p className="mt-3 max-w-[60%] text-sm leading-snug text-[#42526E]">
        One tenant and one role model end to end — field, office, and leadership only see what their access allows.
      </p>

      <span
        className="pointer-events-none absolute select-none text-[9rem] font-black leading-none text-[#102B57]"
        style={{ color: "rgba(16,43,87,0.07)", right: "12px", top: "8px" }}
        aria-hidden
      >
        {num}
      </span>

      {/* <StageArt variant={stage.id as keyof typeof stageIconMap} className="absolute bottom-16 right-2 w-44 sm:w-52" /> */}

      <div className="absolute inset-x-5 bottom-5 rounded-xl border border-[#E2E8F0] bg-white/95 px-4 py-3 shadow-sm backdrop-blur-sm">
        <p className="text-[9px] font-bold uppercase tracking-wider text-[#97A0AF]">Platform area</p>
        <p className="mt-1 text-sm font-extrabold text-[#102B57]">{stage.platformLabel}</p>
      </div>
    </motion.article>
  );
}

function PermissionsBar() {
  return (
    <section className="border-t border-[#E2E8F0] bg-[#F5F8FC]">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="flex items-center gap-4">
          <span className="hidden h-px flex-1 bg-[#CBD5E1] sm:block" aria-hidden />
          <p className="text-center text-sm text-[#42526E]">
            Curious how menus and AI follow permissions?{" "}
            <a href="/how-we-help/role" className="font-bold text-[#0052CC] hover:text-[#0747A6]">
              Roles &amp; permissions →
            </a>{" "}
            <span className="text-[#97A0AF]">·</span>{" "}
            <a href="/who-we-serve" className="font-bold text-[#0052CC] hover:text-[#0747A6]">
              Built for you →
            </a>
          </p>
          <span className="hidden h-px flex-1 bg-[#CBD5E1] sm:block" aria-hidden />
        </div>
      </div>
    </section>
  );
}

function DemoCTA() {
  return (
    <section className="bg-[#0B2348] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="lg:w-1/3">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF6500]">
                <Zap size={18} className="text-white" aria-hidden />
              </span>
              <h2 className="text-xl font-extrabold leading-tight sm:text-2xl">
                Run MEP jobs with <span className="text-[#FF7A33]">execution</span> in the loop.
              </h2>
            </div>
          </div>
          
          <div className="lg:ml-auto lg:w-1/3 lg:text-right">
            <a
              href="/early-access"
              className="inline-flex items-center gap-2 rounded-md bg-[#FF6500] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#E85B00]"
            >
              Get a personalised demo
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- page ---------------- */

export default function ProjectLifecyclePage() {
  useSEO({
    title: "Project lifecycle  -  How ZedOps helps  -  ZedOps",
    description:
      "Preconstruction, construction, closeout, and platform core: how ZedOps modules line up with each project phase and where to dive into the live capability list.",
  });

  return (
    <div className="min-h-screen bg-white text-[#102B57]">
      <Navbar />

      <main className="pt-[72px]">
        {/* ============ HERO ============ */}
        <PageHero
          pill="Project lifecycle"
          PillIcon={Layers}
          title={
            <>
              From estimate to handover
              <br />
              <span className="text-brand-orange">without</span> switching tools.
            </>
          }
          subtitle="One platform across preconstruction, construction, and closeout — no tool switching in between."
        >
          <div className="flex flex-col items-center gap-6">
            <LifecyclePills />
            <a
              href="/how-we-help"
              className="inline-flex items-center gap-2 rounded-md bg-brand-orange px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#E85B00]"
            >
              How we help
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
        </PageHero>

      {/* ============ LIGHT SECTION: intro + grid ============ */}
      <section className="bg-[#F5F8FC]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          {/* intro header */}
          <div className="mb-12 flex justify-center">
              <h2 className="mx-auto max-w-2xl text-center text-3xl font-extrabold leading-[1.05] tracking-tight text-[#102B57] sm:text-4xl">
              From bid to <span className="text-[#FF6500]">closeout</span> –
              <br />
              how ZedOps maps to the job.
            </h2>
            
          </div>

          {/* lifecycle grid */}
          <div className="flex flex-col gap-3">
            {projectStages.map((stage, i) => {
              const Icon = stageIconMap[stage.id] ?? Building2;
              const num = String(i + 1).padStart(2, "0");

              const content = (
                <LifecycleContentCard
                  stage={stage}
                  icon={Icon}
                  num={num}
                />
              );

              const snapshot = (
                <LifecycleSnapshotCard
                  stage={stage}
                  icon={Icon}
                  num={num}
                />
              );

              const mediaFirst = i % 2 === 1;

              return (
                <div
                  key={stage.id}
                  id={stage.id}
                  className="scroll-mt-24 grid gap-3 lg:grid-cols-2"
                >
                  {mediaFirst ? snapshot : content}
                  {mediaFirst ? content : snapshot}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      
      <DemoCTA />
      </main>
      <Footer />
    </div>
  );
}
