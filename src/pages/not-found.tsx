import { useI18n } from "@/i18n";
import { AlertCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { GhostButton, Muted, TicketButton } from "@/components/design-system/primitives";

export default function NotFound() {
  const { t } = useI18n();
  useSEO({
    title: "Page not found – ZedOps",
    description: "That page does not exist. Head back to the ZedOps home page or explore the platform.",
    noindex: true,
  });

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <div>
        <PageHero
          pill="404"
          PillIcon={AlertCircle}
          title={<>{t("This page doesn’t exist.")} <Muted>{t("Let’s get you back on site.")}</Muted></>}
          subtitle={t("The link may be outdated or mistyped.")}
        >
          <div className="flex flex-wrap gap-3">
            <TicketButton href="/">{t("Back to home")}</TicketButton>
            <GhostButton href="/solutions" icon={ArrowRight}>{t("Explore the platform")}</GhostButton>
          </div>
        </PageHero>

        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
