import { CalendarDays } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useI18n } from "@/i18n";
import { ModuleClosingCta } from "@/components/module/ModuleSections";

export type FinalCtaLink = { label: string; href: string; caption?: string };
export type FinalCTAProps = {
  variant?: "brand-navy" | "brand-orange";
  compact?: boolean;
  title?: React.ReactNode;
  body?: string;
  primary?: FinalCtaLink;
  secondary?: FinalCtaLink;
};

export default function FinalCTA({ title, body, primary, secondary }: FinalCTAProps) {
  const isMobile = useIsMobile();
  const { t } = useI18n();
  const p = primary ?? { label: "Request a demo", href: "/early-access" };
  const sc = secondary ?? { label: "Talk to our team", href: "/contact?topic=demo" };
  return (
    <ModuleClosingCta
      isMobile={isMobile}
      id="page-final-cta-title"
      label="Next step"
      title={typeof title === "string" ? t(title) : (title ?? t("See how ZedOps fits your projects."))}
      body={t(body ?? "Talk through your project workflow with our team and see the parts of ZedOps that matter to you.")}
      primary={{ ...p, label: t(p.label) }}
      secondary={{ ...sc, label: t(sc.label) }}
      secondaryIcon={CalendarDays}
    />
  );
}
