import { ArrowRight, Layers } from "lucide-react";
import PageHero from "@/components/PageHero";
import { GhostButton, TicketButton } from "@/components/design-preview/primitives";

export default function HubHero() {
  return (
    <PageHero
      pill="How ZedOps helps"
      PillIcon={Layers}
      title={<>One project record. <span className="text-brand-navy/60">Every view of the work.</span></>}
      subtitle="Explore how ZedOps supports MEP delivery by project stage, company, team, and role."
    >
      <div className="flex flex-wrap gap-3">
        <TicketButton href="/how-we-help/project-stage">By project stage</TicketButton>
        <GhostButton href="/how-we-help/team" icon={ArrowRight}>By team</GhostButton>
      </div>
    </PageHero>
  );
}
