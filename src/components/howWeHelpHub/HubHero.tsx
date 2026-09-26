import { ArrowRight, Layers } from "lucide-react";
import PageHero from "@/components/PageHero";
import { GhostButton, Muted, TicketButton } from "@/components/design-system/primitives";

export default function HubHero() {
  return (
    <PageHero
      pill="How ZedOps helps"
      PillIcon={Layers}
      title={<>One project record. <Muted>Every view of the work.</Muted></>}
      subtitle="Explore how ZedOps supports MEP delivery by project stage, company, team, and role."
    >
      <div className="flex flex-wrap gap-3">
        <TicketButton href="/how-we-help/project-stage">By project stage</TicketButton>
        <GhostButton href="/how-we-help/team" icon={ArrowRight}>By team</GhostButton>
      </div>
    </PageHero>
  );
}
