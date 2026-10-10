import { MotionLocalA } from "@/components/LocalLink";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Check } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useI18n } from "@/i18n";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import PageHero from "@/components/PageHero";
import HowWeHelpPageShell from "@/components/HowWeHelpPageShell";
import { framePad, Highlight, Muted, Section, SplitHeader } from "@/components/design-system/primitives";
import { companyArchetypes } from "@/data/howWeHelp";

const firstSentence = (s: string) => s.split(/(?<=[.!?])\s+/)[0] ?? s;

export default function HowWeHelpCompanyPage() {
  const isMobile = useIsMobile();
  const { t } = useI18n();

  useSEO({
    title: "How ZedOps helps your company – ZedOps",
    description:
      "How general contractors, owners, consultants, and preconstruction teams use ZedOps - multi-tenant isolation, role-aware menus, and links to deeper persona pages.",
  });

  return (
    <HowWeHelpPageShell>
      <PageHero
        pill={t("By company type")}
        PillIcon={Building2}
        title={<>{t("Built for how your company delivers.")} <Muted>{t("Not a generic ERP.")}</Muted></>}
        subtitle={t("Whether you carry delivery risk, deploy capital, advise clients or price the work, ZedOps fits the way you operate.")}
      />

      <Section labelledBy="company-profiles">
        <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
            <SplitHeader
              id="company-profiles"
              title={<>{t("Pick the profile")} <Highlight>{t("closest to yours.")}</Highlight></>}
              body={t("Underneath, the same security model applies: people only see the clients, projects and cost detail their roles allow.")}
            />
          </motion.div>
        </div>
        <div className="grid gap-px border-t border-[#E8ECF2] bg-[#E8ECF2] md:grid-cols-2">
          {companyArchetypes.map((c, i) => (
            <MotionLocalA
              key={c.title}
              href={c.href}
              {...scrollMotionProps(isMobile, { y: 16, duration: 0.4, delay: (i % 2) * 0.06 })}
              className="group flex flex-col bg-white p-7 transition-colors hover:bg-[#FAFBFC] sm:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-[#E3E8F0] text-[#5E6C84] transition-colors group-hover:border-[#FFCFB0] group-hover:text-brand-orange">
                  <c.icon size={19} aria-hidden />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#677388]">{t(c.tag)}</span>
              </div>
              <h3 className="mt-8 text-[22px] font-medium tracking-[-0.025em] text-brand-navy">{t(c.title)}</h3>
              <p className="mt-2 max-w-[48ch] text-[15px] leading-[1.55] text-[#616D82]">{t(firstSentence(c.summary))}</p>
              <ul className="mt-6 space-y-2.5">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[14.5px] text-[#3D4F6E]">
                    <Check size={15} strokeWidth={2.4} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden />
                    {t(b)}
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-[14px] font-medium text-brand-navy">
                {t("See how we help")}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </MotionLocalA>
          ))}
        </div>
      </Section>
    </HowWeHelpPageShell>
  );
}
