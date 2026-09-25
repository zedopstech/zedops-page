import { ArrowUpRight } from "lucide-react";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "Estimation", href: "/platform/module/estimation" },
    {
      label: "Planning & Scheduling",
      href: "/platform/module/planning-execution",
    },
    { label: "Material Management", href: "/platform/module/supply-chain" },
    { label: "Zed AI", href: "/zed-ai" },
  ],
  Docs: [
    { label: "Getting Started", href: "/blog/getting-started-with-zedops" },
    { label: "Blog & Resources", href: "/blog" },
    { label: "Security", href: "/security" },
  ],
  Company: [
    { label: "About ZedOps", href: "/about" },
    { label: "Who We Serve", href: "/who-we-serve" },
    { label: "Careers", href: "mailto:careers@zedops.com" },
    { label: "Contact Sales", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socials = [
  { label: "X", href: "https://x.com/zedopstech" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zedops" },
  { label: "GitHub", href: "https://github.com/zedops" },
  { label: "YouTube", href: "https://www.youtube.com/@zedopstech" },
];

/** hexalog footer: big logo lockup, dense navy link columns, hairline bottom bar, giant faint wordmark. */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#E3E8F0] bg-white">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="flex items-center gap-3 pt-14">
          <img
            src="/logo.png"
            alt=""
            className="h-12 w-12 rounded-lg object-cover"
          />
          <p className="text-[30px] font-extrabold leading-none tracking-tight text-brand-navy">
            Zed<span className="text-brand-orange">Ops</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 py-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)]">
          <p className="max-w-sm text-[14px] leading-[1.7] text-brand-navy/75">
            Operations for mechanical, electrical, and plumbing: planning, logs,
            QA, punch, finance, material management, wired for action, with Zed
            AI on the same permissioned data.
          </p>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="mb-5 text-[14px] font-semibold text-brand-navy">
                  {category}
                </h4>
                <ul className="space-y-3.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[14px] text-[#5E6C84] transition-colors hover:text-brand-orange"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#E3E8F0] py-6 text-[13px] text-[#6B778C] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ZedOps, Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="inline-flex items-center gap-1 font-medium text-brand-navy/80 hover:text-brand-orange"
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
        className="pointer-events-none mx-auto -mb-[0.2em] max-w-[1200px] select-none px-5 text-center text-[22vw] font-extrabold leading-[0.9] tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_#E3E8F0] lg:text-[250px]"
      >
        ZEDOPS
      </p>
    </footer>
  );
}
