import { SITE_FOCUS_MEP_EXECUTION } from "@/config/siteFocus";

/** Full link set always shown; MEP mode only changes the tagline. */
const footerLinks: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "Platform overview", href: "/solutions" },
    { label: "All features", href: "/platform" },
    { label: "Zed AI", href: "/zed-ai" },
    { label: "Integrations", href: "#" },
    { label: "Pricing", href: "/pricing" },
  ],
  Docs: [
    { label: "Getting Started", href: "/blog/getting-started-with-zedops" },
    { label: "All articles", href: "/blog" },
    { label: "Security", href: "/security" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "mailto:careers@zedops.com" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  const tagline = SITE_FOCUS_MEP_EXECUTION
    ? "Operations for mechanical, electrical, and plumbing: planning, logs, QA, punch, finance, supply chain, wired for action, with Zed AI on the same permissioned data."
    : "AI-powered construction intelligence platform helping teams plan, track, and deliver projects smarter  -  from preconstruction to closeout.";

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <img src="/logo.png" alt="ZedOps" className="w-8 h-8 rounded-md object-cover" />
              <span className="text-[#172B4D] font-black text-lg tracking-tight">ZedOps</span>
            </div>
            <p className="text-[#6B778C] text-sm leading-relaxed max-w-xs mb-6">
              {tagline}
            </p>
            <div className="flex items-center gap-2 mb-8">
              {["𝕏", "LinkedIn", "GitHub", "YouTube"].map((name) => (
                <a
                  key={name}
                  href="#"
                  className="px-3 py-1.5 border border-gray-200 text-[#6B778C] hover:text-[#172B4D] hover:border-gray-300 transition-all duration-150 text-xs font-medium rounded-md"
                >
                  {name}
                </a>
              ))}
            </div>
            <div>
              <p className="text-[#6B778C] text-xs mb-3 font-semibold uppercase tracking-wide">Subscribe to product updates</p>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="your@company.com"
                  className="flex-1 border border-gray-200 px-3 py-2 text-xs text-[#42526E] placeholder:text-[#97A0AF] outline-none focus:border-[#172B4D] bg-white transition-colors rounded-md"
                  readOnly
                />
                <button className="px-3 py-2 bg-[#F79625] hover:bg-[#e07a10] text-white text-xs font-bold transition-colors shrink-0 rounded-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-[#172B4D] font-bold text-xs uppercase tracking-widest mb-4">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-[#6B778C] hover:text-[#42526E] text-sm transition-colors duration-150 leading-snug">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#97A0AF] text-xs">
            © 2026 ZedOps, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-[#97A0AF]">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              All systems operational
            </div>
            <span>·</span>
            <a href="/security" className="hover:text-[#42526E] transition-colors">Enterprise-grade security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
