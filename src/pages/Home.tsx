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

export default function Home() {
  useSEO({
    title: "ZedOps  -  AI-Powered Construction Intelligence",
    description: "ZedOps is an AI-native construction operations platform. Manage projects, daily logs, drawings, RFIs, and risk from one intelligent dashboard.",
  });
  return (
    <div className="min-h-screen bg-white text-[#172B4D]">
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
      <Resources />
      <FinalCTA />
      <Footer />
    </div>
  );
}
