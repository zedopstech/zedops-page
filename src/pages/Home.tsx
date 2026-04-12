import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import HowItWorks from "@/components/HowItWorks";
import Capabilities from "@/components/Capabilities";
import Testimonials from "@/components/Testimonials";
import BentoStats from "@/components/BentoStats";
// import Platform from "@/components/Platform";
import Resources from "@/components/Resources";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { HIDE_HOME_RESOURCES_SECTION } from "@/config/siteFocus";

export default function Home() {
  useSEO({
    title: "ZedOps  -  MEP Operations & Field Execution",
    description:
      "ZedOps for mechanical, electrical, and plumbing contractors: connect schedule to tasks, daily logs to follow-ups, inspections and punch to closeout work, with AI where you need it.",
  });
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#172B4D]">
      <Navbar />
      <Hero />
      <Problems />
      <HowItWorks />
      <Capabilities />
      <Testimonials />
      <BentoStats />
      {/* Integrations section  -  uncomment when ready
      <Platform />
      */}
      {!HIDE_HOME_RESOURCES_SECTION ? <Resources /> : null}
      <FinalCTA />
      <Footer />
    </div>
  );
}
