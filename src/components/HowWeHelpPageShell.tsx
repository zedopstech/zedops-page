import { LocalA } from "@/components/LocalLink";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import { useI18n } from "@/i18n";

type Crumb = { label: string; href?: string };

export default function HowWeHelpPageShell({
  children,
  breadcrumbs,
}: {
  children: ReactNode;
  breadcrumbs?: Crumb[];
}) {
  const { t } = useI18n();
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <div>
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <div className="bg-white">
            <div className="mx-auto max-w-[1200px] px-5 pt-[124px] sm:px-8 lg:border-x lg:border-[#E8ECF2] lg:px-14">
              <nav className="flex flex-wrap items-center gap-x-2 text-[13px] text-[#5F6B80]" aria-label={t("Breadcrumb")}>
                {breadcrumbs.map((c, i) => (
                  <span key={`${c.label}-${i}`} className="flex items-center gap-2">
                    {i > 0 ? <span className="text-[#C9D2DF]">/</span> : null}
                    {c.href ? (
                      <LocalA href={c.href} className="transition-colors hover:text-brand-navy">
                        {c.label}
                      </LocalA>
                    ) : (
                      <span className="text-brand-navy">{c.label}</span>
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
