import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import HomeHero from "@/components/home/HomeHero";
import HomeLogoStrip from "@/components/home/HomeLogoStrip";
import HomeChallenges from "@/components/home/HomeChallenges";
import HomeStages from "@/components/home/HomeStages";
import HomeFeatureGrid from "@/components/home/HomeFeatureGrid";
import HomeThreeWays from "@/components/home/HomeThreeWays";
import HomeZedAI from "@/components/home/HomeZedAI";
import HomeIndustries from "@/components/home/HomeIndustries";
import HomeCTA from "@/components/home/HomeCTA";
import Footer from "@/components/Footer";

/**
 * Home page. The section components live in `src/components/home/`; the shared design
 * primitives they (and most other pages) use are in `src/components/design-system/`.
 */
export default function Home() {
  useSEO({
    title: "ZedOps  -  MEP Operations & Field Execution",
    description:
      "ZedOps for mechanical, electrical, and plumbing contractors: connect schedule to tasks, daily logs to follow-ups, inspections and punch to closeout work, with AI where you need it.",
  });
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy antialiased">
      <Navbar />
      <HomeHero />
      <HomeLogoStrip />
      <HomeChallenges />
      <HomeStages />
      <HomeFeatureGrid />
      <HomeThreeWays />
      <HomeZedAI />
      <HomeIndustries />
      <HomeCTA />
      <Footer />
    </div>
  );
}
