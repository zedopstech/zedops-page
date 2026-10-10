import { useSEO } from "@/hooks/useSEO";
import { useI18n } from "@/i18n";
import Navbar from "@/components/Navbar";
import HomeHero from "@/components/home/HomeHero";
import HomeLogoStrip from "@/components/home/HomeLogoStrip";
import HomeChallenges, { HomeSolutions } from "@/components/home/HomeChallenges";
import HomeStages from "@/components/home/HomeStages";
import HomeFeatureGrid from "@/components/home/HomeFeatureGrid";
import HomeMobile from "@/components/home/HomeMobile";
import HomeThreeWays from "@/components/home/HomeThreeWays";
import HomeZedStory from "@/components/home/HomeZedStory";
import HomeZedAI from "@/components/home/HomeZedAI";
import HomeIndustries from "@/components/home/HomeIndustries";
import HomeCTA from "@/components/home/HomeCTA";
import Footer from "@/components/Footer";

/**
 * Home page. The section components live in `src/components/home/`; the shared design
 * primitives they (and most other pages) use are in `src/components/design-system/`.
 */
export default function Home() {
  const { t } = useI18n();
  useSEO({
    title: "ZedOps – MEP Operations & Field Execution",
    description: "ZedOps for mechanical, electrical, and plumbing contractors: connect schedule to tasks, daily logs to follow-ups, inspections and punch to closeout work, with AI where you need it.",
  });
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy antialiased">
      <Navbar />
      {/* One main landmark for the page. Lighthouse's SEO audit flags a document
          with no <main>, and it gives screen-reader users a single skip target
          past the navigation. */}
      <main id="main">
        {/* Light: hero, problem, stages. Dark: answer, ways of working, Zed AI.
            Light: tools, industries. Dark: contractors, CTA, footer. */}
        <HomeHero />
        <HomeLogoStrip />
        <HomeChallenges />
        <HomeStages />
        <HomeSolutions />
        <HomeThreeWays />
        <HomeZedStory />
        <HomeZedAI />
        <HomeFeatureGrid />
        <HomeMobile />
        <HomeIndustries />
        <HomeCTA />
      </main>
      <Footer />
    </div>
  );
}
