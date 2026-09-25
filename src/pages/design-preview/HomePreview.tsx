import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import HeroPreview from "@/components/design-preview/HeroPreview";
import LogoStripPreview from "@/components/design-preview/LogoStripPreview";
import ChallengesPreview from "@/components/design-preview/ChallengesPreview";
import StagesPreview from "@/components/design-preview/StagesPreview";
import FeatureGridPreview from "@/components/design-preview/FeatureGridPreview";
import ThreeWaysPreview from "@/components/design-preview/ThreeWaysPreview";
import ZedAIPreview from "@/components/design-preview/ZedAIPreview";
import IndustriesPreview from "@/components/design-preview/IndustriesPreview";
import CTAPreview from "@/components/design-preview/CTAPreview";
import Footer from "@/components/Footer";

/** Home page using the preview design. */
export default function HomePreview() {
  useSEO({
    title: "ZedOps  -  MEP Operations & Field Execution",
    description:
      "ZedOps for mechanical, electrical, and plumbing contractors: connect schedule to tasks, daily logs to follow-ups, inspections and punch to closeout work, with AI where you need it.",
  });
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy antialiased">
      <Navbar />
      <HeroPreview />
      <LogoStripPreview />
      <ChallengesPreview />
      <StagesPreview />
      <FeatureGridPreview />
      <ThreeWaysPreview />
      <ZedAIPreview />
      <IndustriesPreview />
      <CTAPreview />
      <Footer />
    </div>
  );
}
