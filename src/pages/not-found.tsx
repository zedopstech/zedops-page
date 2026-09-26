import { AlertCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

export default function NotFound() {
  useSEO({
    title: "Page not found  -  ZedOps",
    description: "That page does not exist. Head back to the ZedOps home page or explore the platform.",
    noindex: true,
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-brand-navy">
      <Navbar />
      <div>
        <PageHero
          pill="404"
          PillIcon={AlertCircle}
          title="Page not found"
          subtitle="That link doesn't exist or may be outdated. Head back home or explore the platform."
        >
          <div className="mt-2 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-brand-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
              style={{ borderRadius: 6 }}
            >
              Back to home
              <ArrowRight size={14} aria-hidden />
            </a>
            <a
              href="/solutions"
              className="inline-flex items-center justify-center gap-2 border-2 border-brand-navy px-6 py-3 text-sm font-bold text-brand-navy transition-all hover:bg-brand-navy hover:text-white"
              style={{ borderRadius: 6 }}
            >
              Solutions
            </a>
          </div>
        </PageHero>

        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
