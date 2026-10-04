import { motion } from "framer-motion";
import {
  PiBellRingingFill,
  PiCameraFill,
  PiCheckCircleFill,
  PiClockUserFill,
  PiFingerprintFill,
  PiFolderOpenFill,
  PiMapPinFill,
  PiPackageFill,
  PiShieldWarningFill,
  PiListChecksFill,
} from "react-icons/pi";
import type { IconType } from "react-icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { framePad, Highlight, Section, SplitHeader, TicketButton } from "@/components/design-system/primitives";
import { useI18n } from "@/i18n";

const features: { icon: IconType; title: string; desc: string }[] = [
  { icon: PiFolderOpenFill, title: "Daily logs", desc: "Fill the site report section by section, with photos, and see what is still incomplete." },
  { icon: PiClockUserFill, title: "Time cards & leave", desc: "Check in with GPS on a map, submit leave and workforce requests, and follow approvals." },
  { icon: PiShieldWarningFill, title: "Incidents & inspections", desc: "Capture photos and a signature on site, then raise corrective actions from a failed item." },
  { icon: PiListChecksFill, title: "Punch walkthroughs", desc: "Log quick punch items or run a full walkthrough with comments and attachments." },
  { icon: PiPackageFill, title: "Material requests", desc: "Raise material, transfer, purchase and reserve requests straight from the field." },
  { icon: PiCheckCircleFill, title: "Approvals inbox", desc: "Review and decide approvals from one place, with the full request one tap away." },
  { icon: PiCameraFill, title: "Tasks & action items", desc: "Assign tasks, comment, attach photos, and see everything overdue across modules." },
  { icon: PiBellRingingFill, title: "Push notifications", desc: "Get real-time alerts on assignments, approvals and deadlines." },
  { icon: PiFingerprintFill, title: "Biometric lock", desc: "Protect project data on the device with Face ID or fingerprint." },
  { icon: PiMapPinFill, title: "Projects at a glance", desc: "Switch projects, check the weather, and see urgent tasks and dashboards on one home screen." },
];

/** The mobile app: what site teams can do from a phone, tied to the same project record. */
export default function MobileAppPreview() {
  const isMobile = useIsMobile();
  const { t } = useI18n();
  return (
    <Section tone="mist" id="mobile" labelledBy="dp-mobile">
      <div className={`pt-20 pb-14 lg:pt-28 lg:pb-16 ${framePad}`}>
        <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
          <SplitHeader
            id="dp-mobile"
            title={<>{t("The site team, ")}<Highlight>{t("in their pocket.")}</Highlight></>}
            body={t("The ZedOps mobile app for iOS and Android puts the same project record in your crews' hands: log, inspect, check in and approve from the site.")}
            cta={<TicketButton href="/early-access">{t("Request early access")}</TicketButton>}
          />
        </motion.div>
      </div>
      <ul className="m-carousel grid gap-px border-t border-[#E3E8F0] bg-[#E3E8F0] grid-cols-2 lg:grid-cols-5">
        {features.map((f, i) => (
          <motion.li
            key={f.title}
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: (i % 5) * 0.04 })}
            className="flex flex-col bg-white p-4 sm:p-7"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-[#E3E8F0] bg-white text-[#5E6C84] shadow-[0_1px_2px_rgba(14,27,51,0.05)]">
              <f.icon size={20} aria-hidden />
            </span>
            <h3 className="mt-4 text-[15px] sm:mt-6 sm:text-[16px] font-medium tracking-[-0.02em] text-brand-navy">{t(f.title)}</h3>
            <p className="mt-1.5 text-[13px] leading-[1.5] sm:text-[14px] sm:leading-[1.55] text-[#616D82]">{t(f.desc)}</p>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
