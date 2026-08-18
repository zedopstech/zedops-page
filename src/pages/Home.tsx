import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import HowItWorks from "@/components/HowItWorks";
import ChallengesSolutions from "@/components/ChallengesSolutions";
import Capabilities from "@/components/Capabilities";
import Testimonials from "@/components/Testimonials";
import IndustriesHomeSection from "@/components/IndustriesHomeSection";
import ZedAIHomeSection from "@/components/ZedAIHomeSection";
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
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <Hero />
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[420px] sm:h-[500px] md:h-[600px] lg:h-[680px]">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/web video.mp4" type="video/mp4" />
          </video>

          {/* Optional subtle overlay */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Play / pause control if required */}
        </div>
      </section>
      {/* <Problems /> */}
      <ChallengesSolutions />
      <HowItWorks />
      
      <Capabilities />
      <Testimonials />
      <ZedAIHomeSection />
      <IndustriesHomeSection />
      {/* Integrations section  -  uncomment when ready
      <Platform />
      */}
      {!HIDE_HOME_RESOURCES_SECTION ? <Resources /> : null}
      <FinalCTA />
      <Footer />
    </div>
  );
}
