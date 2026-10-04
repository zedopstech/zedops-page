import { ArrowUpRight } from "lucide-react";
import { COOKIE_SETTINGS_EVENT } from "@/lib/consent";
import ZedOpsMark from "./ZedOpsMark";
import { contact, offices } from "@/data/contact";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "@/i18n";

const footerLinks: Record<string, { label: string; href: string | null }[]> = {
  Product: [
    { label: "Estimation", href: "/platform/module/estimation" },
    { label: "Planning", href: "/platform/module/planning-execution" },
    { label: "Materials", href: "/platform/module/supply-chain" },
    { label: "Daily logs", href: "/platform/module/daily-intelligence" },
    { label: "Budget & cost", href: "/platform/module/finance" },
    { label: "Zed AI", href: "/zed-ai" },
  ],
  Solutions: [
    { label: "How we help", href: "/how-we-help" },
    { label: "By project stage", href: "/how-we-help/project-stage" },
    { label: "Built for you", href: "/who-we-serve" },
    { label: "All modules", href: "/solutions" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Security", href: "/security" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "mailto:careers@zedops.com" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    // Not a page: this reopens the consent banner so a visitor can change a
    // choice they already made. `href: null` is what the renderer keys off to
    // emit a <button> instead of an <a>.
    { label: "Cookie settings", href: null },
  ],
};

const socials = [
  { label: "X", href: "https://x.com/zedopstech" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zedops" },
  { label: "GitHub", href: "https://github.com/zedops" },
  { label: "YouTube", href: "https://www.youtube.com/@zedopstech" },
];

/** Framed footer: lockup, link columns with mono headings, hairline bottom bar, outlined wordmark. */
export default function Footer() {
  const { t } = useI18n();
  return (
    <footer data-nav-theme="dark" className="relative overflow-hidden border-t border-white/10 bg-[#0E1B33]">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:border-x lg:border-white/10 lg:px-14">

        <div className="flex items-center gap-2.5 pt-16">
          <ZedOpsMark tone="dark" className="h-7 w-auto" />
          <p className="text-[24px] font-extrabold leading-none tracking-tight text-white">
            Zed<span className="text-brand-orange">Ops</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] lg:pb-16">
          <div className="max-w-sm">
            <p className="text-[15px] leading-[1.65] text-white/70">
              {t("The execution platform for MEP and construction teams. Estimate, plan, build and hand over from one project record, with Zed AI working on the same data.")}
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {offices.map((o) => (
                <address key={o.name} className="text-[13.5px] not-italic leading-[1.6] text-white/55">
                  <span className="mb-1 block text-[13px] font-medium text-white/80">{o.name}</span>
                  {o.address.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                  {o.licence && <span className="mt-1 block">{o.licence}</span>}
                </address>
              ))}
            </div>
            <div className="mt-5 space-y-1.5 text-[14px]">
              <a href={`mailto:${contact.email}`} className="block text-white/80 transition-colors hover:text-white">{contact.email}</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                {/* h2 for the same reason as the section headings above: an h4
                    here skipped two levels on a page whose last heading was an
                    h1 or h2. */}
                <h2 className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-white/40">
                  {t(category)}
                </h2>
                <ul className="space-y-3.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.href === null ? (
                        <button
                          type="button"
                          onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
                          className="text-start text-[14px] text-white/75 transition-colors hover:text-white"
                        >
                          {t(link.label)}
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          className="text-[14px] text-white/75 transition-colors hover:text-white"
                        >
                          {t(link.label)}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-[13px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("© 2026 ZedOps, Inc. All rights reserved.")}</p>
          <div className="flex flex-wrap items-center gap-5">
            <LanguageToggle dark up className="!h-8 !px-2" />
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="inline-flex items-center gap-1 font-medium text-white/70 hover:text-white"
              >
                {s.label}
                <ArrowUpRight size={12} aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* giant outlined wordmark */}
      <p
        aria-hidden
        className="pointer-events-none mx-auto -mb-[0.2em] max-w-[1200px] select-none border-white/10 px-5 text-center text-[22vw] font-semibold leading-[0.9] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.14)] lg:border-x lg:text-[250px]"
      >
        ZEDOPS
      </p>
    </footer>
  );
}
