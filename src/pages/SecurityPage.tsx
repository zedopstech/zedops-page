import { useSEO } from "@/hooks/useSEO";
import Navbar from "@/components/Navbar";
import Security from "@/components/Security";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function SecurityPage() {
  useSEO({
    title: "Security  -  ZedOps",
    description: "ZedOps security architecture: dedicated database per tenant, AWS private VPC hosting, role-based access control, and Bring Your Own AI API Key (BYOK) for enterprise.",
  });
  return (
    <div className="min-h-screen bg-white text-brand-navy overflow-x-hidden">
      <Navbar />
      <div className="pt-[100px]">
        <Security />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
