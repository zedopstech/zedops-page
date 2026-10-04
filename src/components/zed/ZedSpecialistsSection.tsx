import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { framePad, Highlight, Section, SplitHeader } from "@/components/design-system/primitives";
import { useI18n } from "@/i18n";
import { useZedAmbientMood } from "@/hooks/useZedAmbientMood";
import { ZedMascot } from "./ZedMascot";
import { ZED_SPECIALISTS, type ZedSpecialistKey } from "./zedSpecialists";

/** What each specialist covers in the ZedOps app. Colours and names match the in-app copilot. */
const specialists: { key: ZedSpecialistKey; covers: string }[] = [
  { key: "zed", covers: "Ask anything across your projects: status, risk and next steps." },
  { key: "foreman", covers: "Projects, schedule, Gantt and tasks: what slipped and who owns it." },
  { key: "ledger", covers: "Budgets, costs, payments and change orders, with variances explained." },
  { key: "hauler", covers: "Requests, RFQs, purchase orders, inventory and the vendor portal." },
  { key: "crew", covers: "People, attendance, time cards and leave across your workforce." },
  { key: "gauge", covers: "Estimation and drawing takeoff, from quantities to a priced BOQ." },
  { key: "warden", covers: "Safety, snags and inspections, with open findings by severity." },
];

/** A mascot that rests idle and now and then winks, smiles or shows starry eyes. */
function AmbientZed({ specialist }: { specialist: ZedSpecialistKey }) {
  const mood = useZedAmbientMood(true);
  return <ZedMascot depth specialist={specialist} mood={mood} className="h-16 w-16" />;
}

/** Meet Zed and its specialists: the same hard-hat bot that works inside the ZedOps app. */
export default function ZedSpecialistsSection() {
  const isMobile = useIsMobile();
  const { t } = useI18n();
  return (
    <Section tone="mist" labelledBy="zai-specialists">
      <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
          <SplitHeader
            id="zai-specialists"
            title={<>{t("Meet Zed, and ")}<Highlight>{t("its specialists.")}</Highlight></>}
            body={t("Zed hands your question to the specialist who knows that part of the job. Each one works only on the data your role can already see.")}
          />
        </motion.div>
      </div>
      <ul className="m-carousel grid gap-px border-t border-[#E3E8F0] bg-[#E3E8F0] sm:grid-cols-2 lg:grid-cols-4">
        {specialists.map((s, i) => {
          const info = ZED_SPECIALISTS[s.key];
          return (
            <motion.li
              key={s.key}
              {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: (i % 4) * 0.05 })}
              className="group flex flex-col bg-white p-6 sm:p-8"
            >
              <div dir="ltr">
                <AmbientZed specialist={s.key} />
              </div>
              <h3 className="mt-6 text-[18px] font-medium tracking-[-0.02em] text-brand-navy">{info.name}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-[#616D82]">{t(s.covers)}</p>
            </motion.li>
          );
        })}
        <li className="hidden bg-[#F7F8FA] lg:block" aria-hidden />
      </ul>
    </Section>
  );
}
