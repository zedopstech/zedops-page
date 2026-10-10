import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Pricing from "@/components/Pricing";
import PricingTestimonials from "@/components/PricingTestimonials";
import PricingFAQ from "@/components/PricingFAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { Zap } from "lucide-react";

export default function PricingPage() {
  useSEO({
    title: "Pricing – ZedOps",
    description: "Simple, transparent pricing for construction teams. Starter, Professional, and Enterprise plans. All plans include early access onboarding with the ZedOps team.",
  });
  return (
    <div className="min-h-screen bg-white text-brand-navy overflow-x-hidden">
      <Navbar />
      <div className="pt-[100px]">
        <PageHero
          pill="Pricing"
          PillIcon={Zap}
          title={<>Simple pricing.<br />No surprises.</>}
          subtitle="Start with early access and grow into the plan that fits your portfolio. All plans include a dedicated onboarding call with the ZedOps team."
        />
        <Pricing />
        <PricingTestimonials />
        <PricingFAQ />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
