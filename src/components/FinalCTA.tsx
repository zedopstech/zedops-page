import { CalendarDays } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
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
  return (
    <ModuleClosingCta
      isMobile={isMobile}
      id="page-final-cta-title"
      label="Next step"
      title={title ?? "See how ZedOps fits your projects."}
      body={body ?? "Talk through your project workflow with our team and see the parts of ZedOps that matter to you."}
      primary={primary ?? { label: "Request a demo", href: "/early-access" }}
      secondary={secondary ?? { label: "Talk to our team", href: "/contact?topic=demo" }}
      secondaryIcon={CalendarDays}
    />
  );
}
