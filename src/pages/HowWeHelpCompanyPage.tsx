import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import PageHero from "@/components/PageHero";
import HowWeHelpPageShell from "@/components/HowWeHelpPageShell";
import SectionHeader from "@/components/SectionHeader";
import { companyArchetypes } from "@/data/howWeHelp";

export default function HowWeHelpCompanyPage() {
  const isMobile = useIsMobile();

  useSEO({
    title: "By company type  -  How ZedOps helps  -  ZedOps",
    description:
      "How general contractors, owners, consultants, and preconstruction teams use ZedOps - multi-tenant isolation, role-aware menus, and links to deeper persona pages.",
  });

  return (
    <HowWeHelpPageShell
      
    >
      <PageHero
        pill="Organisations"
        PillIcon={Building2}
        title="Built for how your company delivers work."
        subtitle="ZedOps isn’t one generic “construction ERP.” Tenant boundaries, menus, and AI stay aligned to whether you’re carrying risk as a GC, deploying capital as an owner, advising as a CM, or commercialising estimates before award."
      >

      </PageHero>

      <section className="border-t border-gray-200 bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 20, duration: 0.45 })} className="mb-14">
            <SectionHeader
              title="Pick the profile closest to yours"
              subtitle="Each link opens a deeper story or the exact module list. Underneath, the same security model applies: users only see clients, projects, and cost detail their roles allow."
            />
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 sm:grid-cols-2">
            {companyArchetypes.map((c, i) => (
              <motion.article
                key={c.title}
                {...scrollMotionProps(isMobile, { y: 20, duration: 0.4, delay: i * 0.05 })}
                className="group flex h-full flex-col bg-white p-7 transition-colors hover:bg-[#FAFBFC] md:p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-lg"
                    style={{ background: `${c.accent}18` }}
                  >
                    <c.icon className="h-5 w-5" style={{ color: c.accent }} aria-hidden />
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white"
                    style={{ background: c.accent }}
                  >
                    {c.tag}
                  </span>
                </div>
                <h3 className="text-lg font-semibold leading-snug text-brand-navy">{c.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-snug text-[#6B778C]">{c.summary}</p>
                <ul className="mt-5 space-y-2">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-[#42526E]">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-orange" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href={c.href}
                  className="group/link mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-navy transition-colors hover:text-brand-navy/75"
                >
                  See how we help companies
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" aria-hidden />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </HowWeHelpPageShell>
  );
}
