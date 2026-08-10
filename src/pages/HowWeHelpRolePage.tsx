import { motion } from "framer-motion";
import { ArrowRight, UserCog } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import PageHero from "@/components/PageHero";
import HowWeHelpPageShell from "@/components/HowWeHelpPageShell";

const personaQuickLinks = [
  { label: "General contractors", href: "/who-we-serve/general-contractors" },
  { label: "Owners & developers", href: "/who-we-serve/owners" },
  { label: "Project managers", href: "/who-we-serve/project-managers" },
  { label: "Consultants & CM firms", href: "/who-we-serve/consultants" },
] as const;

export default function HowWeHelpRolePage() {
  const isMobile = useIsMobile();

  useSEO({
    title: "Roles & permissions  -  How ZedOps helps  -  ZedOps",
    description:
      "How ZedOps uses application roles for menus, data scope, exports, and Zed AI. Persona stories and outcomes live under Built for you.",
  });

  return (
    <HowWeHelpPageShell
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "How we help", href: "/how-we-help" },
        { label: "Roles & permissions" },
      ]}
    >
      <PageHero
        pill="Roles & access"
        PillIcon={UserCog}
        title="Your title shouldn’t dictate how much friction you face."
        subtitle="ZedOps uses application roles to drive navigation, data scope, and what Zed AI is allowed to reference. If a user can’t open a screen manually, the copilot can’t bypass that guardrail either."
      >
        <a
          href="/who-we-serve"
          className="inline-flex items-center gap-2 rounded-md border-2 border-brand-navy px-6 py-3 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
        >
          Built for you  -  persona stories
          <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
      </PageHero>

      <section className="border-t border-gray-200 bg-brand-navy py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.45 })} className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                Roles gate menus, records, exports - and the copilot.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/65">
                Administrators map people to roles that unlock specific modules and actions. That model is consistent from preconstruction through closeout, so you aren’t maintaining parallel rule sets for “web app” and “AI.”
              </p>
            </div>
            <ul className="space-y-4 text-sm leading-relaxed text-white/75">
              {[
                "Tenant isolation keeps each customer’s data in its own boundary.",
                "Field, office, and leadership views can emphasise different modules without forking the product.",
                "Consultants and CMs can work across clients without cross-leaking sensitive detail when roles are set carefully.",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-[#F8FAFC] py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 20, duration: 0.45 })}>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
              Persona pages live under Built for you
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#6B778C] sm:text-base">
              That hub is where we tell the human story - photos, outcomes, and what day-to-day work looks like for GCs, owners, PMs, and consultants. This page is the access model; that hub is the “why it fits us.”
            </p>
            <a
              href="/who-we-serve"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
            >
              Open Built for you
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <p className="mt-10 text-sm font-semibold leading-relaxed text-[#0052CC]">
              {personaQuickLinks.map((p, i) => (
                <span key={p.href}>
                  {i > 0 ? <span className="mx-2 text-[#CBD5E1]" aria-hidden>·</span> : null}
                  <a href={p.href} className="underline decoration-[#0052CC]/30 underline-offset-4 transition-colors hover:text-[#0747A6]">
                    {p.label}
                  </a>
                </span>
              ))}
            </p>
          </motion.div>
        </div>
      </section>
    </HowWeHelpPageShell>
  );
}
