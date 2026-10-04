import type { ReactNode } from "react";
import { useI18n } from "@/i18n";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { framePad, Highlight, Muted, Section, SplitHeader, TicketButton } from "@/components/design-system/primitives";
import { AskZedMock, IssuesDraftMock, SignalsMock, WorkflowMock } from "./mocks";


const panels: { title: string; body: string; mock: ReactNode }[] = [
  {
    title: "Start the day knowing what matters.",
    body: "Zed reads schedules, approvals and site logs, then tells you where to look first.",
    mock: <AskZedMock />,
  },
  {
    title: "Signals find you.",
    body: "Delays, approvals and cost changes surface from live project data, not month-end reports.",
    mock: <SignalsMock />,
  },
  {
    title: "Every request, followed through.",
    body: "From material request to delivery on site, each step is tracked, so nobody chases status by phone.",
    mock: <WorkflowMock />,
  },
  {
    title: "Zed drafts. You decide.",
    body: "Follow-ups are drafted from the issue, its owner and the log, ready for you to review and send.",
    mock: <IssuesDraftMock />,
  },
];

/** Zed AI: header, then a 2×2 grid of panels, each a two-tone line over a small live product mock. */
export default function ZedAIPreview() {
  const { t } = useI18n();
  const isMobile = useIsMobile();
  return (
    <Section id="zed-ai" labelledBy="dp-zedai">
      <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
          <SplitHeader
            id="dp-zedai"
            title={<>{t("Your construction ")}<Highlight>{t("intelligence copilot.")}</Highlight></>}
            body={t("Zed AI works on the same permissioned project data as your team: it drafts from daily logs, flags risk, and suggests the next step, without exporting anything to a generic LLM.")}
            cta={<TicketButton href="/zed-ai">{t("Explore Zed AI")}</TicketButton>}
          />
        </motion.div>
      </div>

      <div className="m-carousel m-carousel-tall grid border-t border-[#E8ECF2] lg:grid-cols-2">
        {panels.map((p, i) => (
          <motion.div
            key={p.title}
            {...scrollMotionProps(isMobile, { y: 18, duration: 0.5, delay: (i % 2) * 0.08 })}
            className={`flex flex-col border-[#E8ECF2] bg-[#F7F8FA] px-6 pt-10 pb-10 sm:px-10 sm:pt-12 lg:px-12 ${i > 0 ? "border-t" : ""} ${i === 1 ? "lg:border-t-0 lg:border-s" : ""} ${i === 3 ? "lg:border-s" : ""}`}
          >
            <h3 className="max-w-[26ch] text-[20px] leading-[1.35] font-medium tracking-[-0.02em] text-brand-navy sm:text-[22px]">
              {t(p.title)} <Muted>{t(p.body)}</Muted>
            </h3>
            <div className="mt-10 flex flex-1 items-center justify-center">
              <div dir="ltr" className="w-full max-w-[460px]">{p.mock}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
