import FinalCTA from "@/components/FinalCTA";
import { useI18n } from "@/i18n";

export default function HubFinalCTA() {
  const { t } = useI18n();
  return <FinalCTA title={t("See your project through one connected lens.")} body={t("Explore how ZedOps connects planning, execution, and project records around your team's work.")} />;
}
