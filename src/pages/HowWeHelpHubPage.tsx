import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import PageHero from "@/components/PageHero";
import HowWeHelpPageShell from "@/components/HowWeHelpPageShell";
import { howWeHelpHubLinks } from "@/data/howWeHelp";

export default function HowWeHelpHubPage() {
  useSEO({
    title: "How we help  -  ZedOps",
    description:
      "Explore how ZedOps helps construction teams by project stage, company type, internal team, and role - with the same tenant and permissions model throughout.",
  });

  return (
    <HowWeHelpPageShell
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "How we help" },
      ]}
    >
      <PageHero
        pill="How we help"
        PillIcon={Compass}
        title="The same platform, framed the way you think."
        subtitle="Whether you plan by lifecycle phase, company type, internal team, or how access is governed - ZedOps keeps one project record. Pick the lens that matches how you’re buying or rolling out software."
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="/platform"
            className="inline-flex items-center gap-2 rounded-md bg-[#172B4D] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_24px_-8px_rgba(23,43,77,0.45)] transition-colors hover:bg-[#0e1e38]"
          >
            Full module list
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="/who-we-serve"
            className="inline-flex items-center gap-2 rounded-md border-2 border-[#172B4D]/20 bg-white/70 px-6 py-3 text-sm font-bold text-[#172B4D] backdrop-blur-sm transition-all hover:border-[#172B4D]/35 hover:bg-white"
          >
            Built for you
            <ArrowRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
        </div>
      </PageHero>

      <section className="relative overflow-hidden border-t border-gray-200/80 bg-[#F4F6FB] py-20 lg:py-28">
        <div
          className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-[#C4D9FF]/35 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-32 bottom-0 h-[320px] w-[320px] rounded-full bg-[#F79625]/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-14 lg:mb-16"
          >
            <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left">
              <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#172B4D] sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                Four ways to see how ZedOps fits
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#42526E] lg:mx-0 lg:max-w-xl lg:text-[1.05rem]">
                Built for you is still the home for persona stories and photography. These cards are structural lenses - phase,
                organisation, team, and access - so you can evaluate the product in the language your stakeholders already use.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {howWeHelpHubLinks.map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.42, delay: i * 0.06 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white p-8 shadow-[0_1px_3px_rgba(23,43,77,0.06)] ring-1 ring-[#172B4D]/4 transition-all duration-300 hover:-translate-y-1 hover:border-[#BDD0F5] hover:shadow-[0_22px_48px_-20px_rgba(23,43,77,0.18)] lg:p-9"
                >
                  <div
                    className="absolute left-0 top-0 h-full w-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: item.accent }}
                    aria-hidden
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-[1.06]"
                      style={{ backgroundColor: `${item.accent}18` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: item.accent }} strokeWidth={2} aria-hidden />
                    </div>
                    <span className="font-mono text-[11px] font-bold tabular-nums text-[#97A0AF] transition-colors group-hover:text-[#42526E]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-extrabold leading-snug tracking-tight text-[#172B4D] transition-colors group-hover:text-[#0052CC] lg:text-[1.35rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#6B778C]">{item.desc}</p>
                  <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                    <span className="text-sm font-bold text-[#0052CC]">Explore</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EBF0FF] bg-[#F8FAFC] text-[#0052CC] transition-all duration-300 group-hover:border-[#0052CC]/20 group-hover:bg-[#EBF0FF]">
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mx-auto mt-14 max-w-2xl text-center text-sm leading-relaxed text-[#6B778C] lg:mt-16"
          >
            Every lens ends at the same product graph.{" "}
            <a href="/platform" className="font-semibold text-[#0052CC] underline decoration-[#0052CC]/25 underline-offset-[3px] transition-colors hover:text-[#0747A6]">
              Browse the full module list
            </a>{" "}
            when you’re ready to go granular.
          </motion.p>
        </div>
      </section>
    </HowWeHelpPageShell>
  );
}
