import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HubHero from "@/components/howWeHelpHub/HubHero";
import LensGrid from "@/components/howWeHelpHub/LensGrid";
import ConnectedProject from "@/components/howWeHelpHub/ConnectedProject";
import PerspectiveSelector from "@/components/howWeHelpHub/PerspectiveSelector";
import ValueStrip from "@/components/howWeHelpHub/ValueStrip";
import HubFinalCTA from "@/components/howWeHelpHub/HubFinalCTA";

export default function HowWeHelpHubPage() {
  useSEO({
    title: "How we help  -  ZedOps",
    description:
      "Plan, execute, track, and manage MEP projects from one connected record. Explore ZedOps by project stage, company type, team, and role.",
  });

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#102B57]">
      <Navbar />
      <main>
        <HubHero />
        <LensGrid />
        <ConnectedProject />
        <PerspectiveSelector />
        <ValueStrip />
        <HubFinalCTA />
      </main>
      <Footer />
    </div>
  );
}
