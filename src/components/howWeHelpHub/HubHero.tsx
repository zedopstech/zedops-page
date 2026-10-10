import { ArrowRight, Layers } from "lucide-react";
import PageHero from "@/components/PageHero";
import { useI18n } from "@/i18n";
import { GhostButton, Muted, TicketButton } from "@/components/design-system/primitives";

export default function HubHero() {
  const { t } = useI18n();
  return (
    <PageHero
      pill={t("How ZedOps helps")}
      PillIcon={Layers}
      title={<>{t("One project record.")} <Muted>{t("Every view of the work.")}</Muted></>}
      subtitle={t("Explore how ZedOps supports MEP delivery by project stage, company, team, and role.")}
    >
      <div className="flex flex-wrap gap-3">
        <TicketButton href="/how-we-help/project-stage">{t("By project stage")}</TicketButton>
        <GhostButton href="/how-we-help/team" icon={ArrowRight}>{t("By team")}</GhostButton>
      </div>
    </PageHero>
  );
}
