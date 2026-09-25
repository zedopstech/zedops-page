import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";

type Crumb = { label: string; href?: string };

export default function HowWeHelpPageShell({
  children,
  breadcrumbs,
}: {
  children: ReactNode;
  breadcrumbs?: Crumb[];
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-brand-navy">
      <Navbar />
      <div>
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <div className="border-b border-gray-100 bg-white">
            <div className="mx-auto max-w-[1200px] px-5 pb-3 pt-[112px]">
              <nav className="flex flex-wrap items-center gap-x-2 text-sm font-semibold text-[#6B778C]" aria-label="Breadcrumb">
                {breadcrumbs.map((c, i) => (
                  <span key={`${c.label}-${i}`} className="flex items-center gap-2">
                    {i > 0 ? <span className="text-[#97A0AF]">/</span> : null}
                    {c.href ? (
                      <a href={c.href} className="transition-colors hover:text-[#0052CC]">
                        {c.label}
                      </a>
                    ) : (
                      <span className="text-[#42526E]">{c.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            </div>
          </div>
        ) : null}
        {children}
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
