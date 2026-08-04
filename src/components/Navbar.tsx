import { useState, useEffect, useRef } from "react";
import type React from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, Lightbulb, LayoutGrid } from "lucide-react";
import { SITE_FOCUS_MEP_EXECUTION } from "@/config/siteFocus";
import { dropdownMenus, mobileNavLinks } from "@/data/navDropdownMenus";

type DropdownKey = keyof typeof dropdownMenus;
type AnyItem = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  desc: string;
  href: string;
  tag?: string;
  image?: string;
  external?: boolean;
  /** Solutions mega-menu: render as a large top card (no shadow). */
  highlight?: boolean;
  /** Longer line under the title on highlight cards (falls back to `desc`). */
  subtitle?: string;
};

type FeaturedPayload = {
  tag: string;
  title: string;
  readTime: string;
  href: string;
  image: string;
  /** Shown on Resources “featured article” layout. */
  date?: string;
};

/** Solutions mega-menu featured column (dark rail + full-height card). */
const SOLUTIONS_FEATURED_RAIL_CLASS = "w-[min(100%,340px)] max-w-[340px]";
/** Resources mega-menu featured column (light rail + full-height article: copy then image). */
const RESOURCES_FEATURED_RAIL_CLASS = "w-[min(100%,440px)] max-w-[440px]";

function SolutionsNavMockUI() {
  return (
    <div
      className="pointer-events-none w-full overflow-hidden border-x-0 border-b-0 border-t border-white/20 bg-white shadow-none rounded-t-sm"
      aria-hidden
    >
      <div className="flex gap-0.5 border-b border-gray-200/90 bg-[#F4F5F7] px-2 py-1.5">
        {["Tasks", "Daily log", "Punch"].map((t, i) => (
          <span
            key={t}
            className={`rounded px-2 py-0.5 text-[7.5px] font-bold ${i === 0 ? "bg-white text-[#172B4D] shadow-sm" : "text-[#6B778C]"}`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="space-y-1.5 p-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[7px] font-bold uppercase tracking-wider text-[#97A0AF]">Active</span>
          <span className="rounded bg-[#E3FCEF] px-1 py-px text-[6.5px] font-bold text-[#006644]">Live</span>
        </div>
        {[1, 2, 3].map((row) => (
          <div key={row} className="flex items-center gap-2 rounded border border-gray-100 bg-[#FAFBFC] px-2 py-1.5">
            <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${row === 1 ? "bg-emerald-500" : "bg-gray-300"}`} />
            <div className="min-w-0 flex-1 space-y-0.5">
              <div className="h-1.5 w-[70%] rounded-sm bg-gray-200" />
              <div className="h-1 w-[40%] rounded-sm bg-gray-100" />
            </div>
          </div>
        ))}
          <div className="mt-1 flex gap-1">
          <div className="h-12 flex-1 rounded border border-gray-100 bg-linear-to-br from-[#EBF0FF] to-white" />
          <div className="h-12 w-10 rounded bg-blue-100/60" />
        </div>
      </div>
    </div>
  );
}

function SolutionsFeaturedPanel({
  featured,
  onNavigate,
  ctaLabel,
}: {
  featured: FeaturedPayload;
  onNavigate: () => void;
  ctaLabel: string;
}) {
  return (
    <a
      href={featured.href}
      onClick={onNavigate}
      className="group relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-none transition-colors duration-200 hover:border-white/40"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
      />
      <div className="relative z-1 flex min-h-0 flex-1 flex-col">
        <div className="shrink-0 pb-3 pt-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg">
              <LayoutGrid size={16} className="text-white" />
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">Featured</p>
            </div>
          </div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#b45309] px-2.5 py-0.5 text-[10px] font-bold text-white">{featured.tag}</span>
            <span className="text-[10px] text-white/50">{featured.readTime}</span>
          </div>
          <p
            className={`font-bold tracking-tight text-white ${
              SITE_FOCUS_MEP_EXECUTION ? "text-[15px] leading-snug sm:text-[16px]" : "text-[17px] leading-tight"
            }`}
          >
            {featured.title}
          </p>
          <div className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-[#8FB8FF] transition-colors group-hover:text-[#B8D4FF]">
            {ctaLabel}
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
        <div className="mt-auto min-h-[140px] w-full shrink-0">
          <SolutionsNavMockUI />
        </div>
      </div>
    </a>
  );
}

function ResourcesFeaturedArticleCard({
  featured,
  onNavigate,
  className = "",
}: {
  featured: FeaturedPayload;
  onNavigate: () => void;
  className?: string;
}) {
  const dateLine = featured.date
    ? featured.readTime
      ? `${featured.date} · ${featured.readTime}`
      : featured.date
    : featured.readTime;
  return (
    <a
      href={featured.href}
      onClick={onNavigate}
      className={`group flex h-full min-h-0 flex-1 flex-col overflow-hidden  border border-gray-200 bg-white transition-colors duration-200 hover:border-gray-300 ${className}`}
    >
      {/* Article details  -  top */}
      <div className="shrink-0 border-b border-gray-100 px-4 pb-4 pt-4">
        <p className="mb-2 text-[11px] font-bold text-[#E04F16]">Featured article</p>
        <span className="mb-1.5 inline-block rounded-full bg-blue-100/70 px-2 py-0.5 text-[10px] font-bold text-[#42526E]">
          {featured.tag}
        </span>
        <p className="mb-2 mt-2 text-[10.5px] font-medium text-[#6B778C]">{dateLine}</p>
        <p className="text-[15px] font-bold leading-snug tracking-tight text-[#172B4D]">{featured.title}</p>
        <div className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-[#E04F16] transition-colors group-hover:text-[#c2410c]">
          Read more
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
      {/* Image  -  fills remaining column height */}
      <div className="relative min-h-[160px] flex-1 bg-[#F4F5F7]">
        {featured.image ? (
          <img
            src={featured.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-[#97A0AF]">
            ZedOps
          </div>
        )}
      </div>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();

  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const simpleLinks = [{ label: "Pricing", href: "/pricing" }];

  return (
    <motion.nav
      ref={navRef}
      initial={false}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || activeDropdown ? "bg-white border-b border-gray-200" : "border-b border-transparent"
      }`}
      style={scrolled || activeDropdown ? {} : { background: "transparent" }}
    >
      {/* Announcement banner */}
      <div className="bg-[#172B4D] flex items-center justify-center gap-2.5 h-10 px-4 border-b border-white/10">
        {SITE_FOCUS_MEP_EXECUTION ? (
          <>
            <span className="text-white/80 text-[11px] sm:text-xs text-center max-w-[min(100%,44rem)] leading-snug">
              MEP execution: schedule, logs, QA, cost &amp; supply, tied to real work.{" "}
              <a href="/zed-ai" className="font-semibold text-brand-orange hover:text-white underline-offset-2 hover:underline">
                Zed AI
              </a>{" "}
              uses the same job data.
            </span>
            <a
              href="/early-access"
              className="text-xs font-bold text-brand-orange hover:text-white transition-colors shrink-0 underline-offset-2 hover:underline"
            >
              Get access
            </a>
          </>
        ) : (
          <>
            <Lightbulb size={12} className="text-brand-orange shrink-0" />
            <span className="text-white/70 text-xs hidden sm:inline">Help shape ZedOps  - </span>
            <a
              href="/roadmap"
              className="text-xs font-bold text-brand-orange hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Tell us what to build next
            </a>
            <span className="text-white/40 text-xs hidden sm:inline">·</span>
            <a
              href="/roadmap"
              className="text-white/60 text-xs hover:text-white transition-colors hidden sm:inline"
            >
              View product roadmap →
            </a>
          </>
        )}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2.5 shrink-0">
              <img src="/ICON.jpg" alt="ZedOps" className="w-8 h-8 rounded-md object-cover" />
              <span className="font-extrabold text-lg tracking-tight text-brand-navy">Zed<span className="text-brand-orange">Ops</span></span>
            </a>

            <div className="hidden lg:flex items-center gap-0.5">
              {(Object.keys(dropdownMenus) as DropdownKey[]).map((key) => (
                <button
                  key={key}
                  onMouseEnter={() => setActiveDropdown(key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
                  className={`flex items-center gap-1 text-sm font-semibold px-3 py-2   transition-colors duration-150 ${
                    activeDropdown === key ? "text-[#172B4D] bg-[#EBF0FF]" : "text-[#42526E] hover:text-[#172B4D] hover:bg-gray-100"
                  }`}
                >
                  {key}
                  <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === key ? "rotate-180 text-[#172B4D]" : "text-[#97A0AF]"}`} />
                </button>
              ))}
              {simpleLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#42526E] hover:text-[#172B4D] font-semibold px-3 py-2   hover:bg-gray-100 transition-colors duration-150"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a href="#" className="text-sm text-[#42526E] hover:text-[#172B4D] font-semibold px-3 py-2 transition-colors">
              Log in
            </a>
            <a href="/early-access" className="text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-soft transition-all duration-150 px-5 py-2.5" style={{ borderRadius: 6 }}>
              Request a demo
            </a>
          </div>

          <button className="lg:hidden text-[#42526E] p-1.5" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Dropdown Panels: data from `navDropdownMenus.ts` (general vs MEP by siteFocus) */}
      {(Object.keys(dropdownMenus) as DropdownKey[]).map((key) => {
        const menu = dropdownMenus[key];
        const isBuiltForYouMenu = key === "Built for you";
        const isResources = key === "Resources";
        const isSolutions = key === "Solutions";
        const allItems: AnyItem[] = menu.sections.flatMap((s) => s.items as AnyItem[]);
        const featured = (menu as typeof menu & { featured?: FeaturedPayload }).featured;

        return (
          <AnimatePresence key={key}>
            {activeDropdown === key && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.14 }}
                className="absolute top-full left-0 right-0 z-50 border-b border-gray-200 bg-[#F8FAFC] shadow-[0_12px_32px_rgba(23,43,77,0.08)] hidden lg:block"
                onMouseEnter={() => setActiveDropdown(key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {isBuiltForYouMenu ? (
                  /* ── Built for you: photo cards layout ── */
                  <div className="max-w-7xl mx-auto px-10 py-8">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-[#97A0AF] uppercase tracking-[0.16em] mb-0.5">Built for you</p>
                        <p className="text-sm font-semibold text-[#172B4D]">
                          {SITE_FOCUS_MEP_EXECUTION
                            ? "MEP trades & field leadership"
                            : "Built for every role on the project"}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <a
                          href="/how-we-help/role"
                          onClick={() => setActiveDropdown(null)}
                          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0052CC] hover:text-[#0747A6] transition-colors group"
                        >
                          How roles &amp; AI access work
                          <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                        </a>
                        <a
                          href={menu.cta.href}
                          onClick={() => setActiveDropdown(null)}
                          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#42526E] hover:text-[#0052CC] transition-colors group"
                        >
                          {menu.cta.label}
                          <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-5">
                      {allItems.map((item) => {
                        const img = (item as typeof item & { image?: string }).image;
                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="group rounded-lg overflow-hidden border border-gray-100 hover:border-[#BDD0F5] transition-all duration-200 bg-white"
                          >
                            {/* Photo */}
                            <div className="relative h-[200px] overflow-hidden bg-[#EBF0FF]">
                              {img && (
                                <img
                                  src={img}
                                  alt={item.label}
                                  className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
                                />
                              )}
                              {/* Subtle bottom gradient */}
                              <div className="absolute inset-0 bg-linear-to-t from-[#0d1f3c]/50 via-[#0d1f3c]/05 to-transparent" />
                              {/* Role chip */}
                              <div className="absolute top-3 left-3">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-white/60">
                                  <item.icon size={11} className="text-[#172B4D]" />
                                </div>
                              </div>
                            </div>
                            {/* Text */}
                            <div className="px-4 py-4">
                              <p className="text-[13.5px] font-bold text-[#172B4D] group-hover:text-[#0052CC] transition-colors leading-tight mb-1.5">
                                {item.label}
                              </p>
                              <p className="text-[12px] text-[#6B778C] leading-relaxed">{item.desc}</p>
                              <div className="mt-3 flex items-center gap-1 text-[11.5px] font-semibold text-[#0052CC] opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                                Learn more <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ) : isResources ? (
                  /* ── Resources: main + full-height featured column (copy top, image bottom) ── */
                  <div className="flex w-full min-w-0 items-stretch">
                    <div className="min-w-0 flex-1 py-8 pl-10 pr-10">
                      <div className="max-w-7xl">
                        <div className="mb-5 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-bold text-[#97A0AF] uppercase tracking-[0.16em] mb-0.5">Resources</p>
                            <p className="text-sm font-semibold text-[#172B4D]">Everything you need to level up</p>
                          </div>
                          <a
                            href={menu.cta.href}
                            onClick={() => setActiveDropdown(null)}
                            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#42526E] hover:text-[#0052CC] transition-colors group"
                          >
                            {menu.cta.label}
                            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {allItems.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                              onClick={() => setActiveDropdown(null)}
                              className="group flex items-start gap-3.5 rounded-xl bg-white/80 p-4 transition-all duration-150 hover:bg-white"
                            >
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white transition-colors duration-150 group-hover:bg-[#172B4D]">
                                <item.icon size={16} className="text-[#0052CC] transition-colors duration-150 group-hover:text-white" />
                              </div>
                              <div className="min-w-0">
                                <p className="mb-0.5 text-[13px] font-semibold leading-tight text-[#172B4D] transition-colors group-hover:text-[#0052CC]">{item.label}</p>
                                <p className="text-[11.5px] leading-snug text-[#6B778C]">{item.desc}</p>
                                {item.tag && (
                                  <span className="mt-2 inline-block rounded-full bg-blue-100/70 px-2 py-0.5 text-[10.5px] font-semibold text-[#42526E]">{item.tag}</span>
                                )}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    {featured && (
                      <div
                        className={`flex min-h-0 shrink-0 flex-col self-stretch  ${RESOURCES_FEATURED_RAIL_CLASS}`}
                      >
                        <ResourcesFeaturedArticleCard
                          featured={featured}
                          onNavigate={() => setActiveDropdown(null)}
                          className="min-h-0 w-full flex-1"
                        />
                      </div>
                    )}
                  </div>
                ) : isSolutions && featured ? (
                  /* ── Solutions: same full-bleed featured rail ── */
                  <div className="flex min-h-0 w-full min-w-0 items-stretch">
                    <div className="min-w-0 flex-1 pt-8 pl-10 pr-10">
                      <div className="max-w-7xl">
                        <div className="mb-5 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-bold text-[#97A0AF] uppercase tracking-[0.16em] mb-0.5">Solutions</p>
                                                       <p className="text-sm font-semibold text-[#172B4D]">
                              {SITE_FOCUS_MEP_EXECUTION
                                ? "Platform, AI & modules for field execution"
                                : "Platform highlights and project stage"}
                            </p>
                          </div>
                          <a
                            href={menu.cta.href}
                            onClick={() => setActiveDropdown(null)}
                            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#42526E] hover:text-[#0052CC] transition-colors group"
                          >
                            {menu.cta.label}
                            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        </div>
                        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-0">
                          {(() => {
                            const capabilitySection = menu.sections[0];
                            const capRaw = (capabilitySection?.items ?? []) as AnyItem[];
                            const highlights = capRaw.filter((i) => i.highlight);
                            const extraSections = menu.sections.slice(1);

                            const compactLink = (item: AnyItem) => (
                              <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setActiveDropdown(null)}
                                className={`group -mx-3 flex items-start gap-3 rounded-lg px-3 transition-colors duration-100 hover:bg-white/90 ${
                                  item.desc ? "py-2.5" : "py-2"
                                }`}
                              >
                                <div
                                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white transition-colors group-hover:bg-[#172B4D] ${
                                    item.desc ? "mt-0.5" : "mt-px"
                                  }`}
                                >
                                  <item.icon size={14} className="text-[#0052CC] transition-colors group-hover:text-white" />
                                </div>
                                <div>
                                  <p className="text-[13px] font-semibold leading-tight text-[#172B4D] transition-colors group-hover:text-[#0052CC]">{item.label}</p>
                                  {item.desc ? (
                                    <p className="mt-0.5 text-[12px] leading-snug text-[#6B778C]">{item.desc}</p>
                                  ) : null}
                                </div>
                              </a>
                            );

                            return (
                              <>
                                <div className="min-w-0 shrink-0 lg:w-[min(100%,720px)] lg:pr-10">
                                  {highlights.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-5">
                                      {highlights.map((item) => {
                                        const sub = item.subtitle ?? item.desc;
                                        const compactHighlights = SITE_FOCUS_MEP_EXECUTION;
                                        return (
                                          <div
                                            key={item.label}
                                            className={`solutions-mega-highlight-border min-w-0 shadow-sm ${
                                              compactHighlights ? "min-h-[200px]" : "min-h-[240px]"
                                            }`}
                                          >
                                            <a
                                              href={item.href}
                                              onClick={() => setActiveDropdown(null)}
                                              className={`group flex h-full min-w-0 flex-col rounded-lg bg-white p-5 transition-colors duration-150 hover:bg-[#FAFBFC] ${
                                                compactHighlights ? "min-h-[196px]" : "min-h-[236px]"
                                              }`}
                                            >
                                              <div className="mb-3.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EBF0FF] transition-colors group-hover:bg-[#172B4D] sm:h-14 sm:w-14">
                                                <item.icon size={24} className="text-[#172B4D] transition-colors group-hover:text-white" />
                                              </div>
                                              <p className="text-[15px] font-extrabold leading-snug tracking-tight text-[#172B4D] transition-colors group-hover:text-[#0052CC] sm:text-[16px]">
                                                {item.label}
                                              </p>
                                              <p className="mt-2 flex-1 text-[12px] leading-relaxed text-[#6B778C] sm:text-[12.5px]">{sub}</p>
                                              <div className="mt-4 flex items-center gap-1 text-[11.5px] font-semibold text-[#0052CC] opacity-90 transition-opacity group-hover:opacity-100">
                                                Open <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                                              </div>
                                            </a>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  ) : null}
                                </div>

                                {extraSections.length > 0 ? (
                                  <div className="min-w-0 flex-1 border-t border-gray-200/80 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                                    <div className="space-y-8 lg:space-y-10">
                                      {extraSections.map((sec) => (
                                        <div key={sec.heading} className="min-w-0">
                                          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#97A0AF]">{sec.heading}</p>
                                          <div className="flex flex-col gap-0.5">{(sec.items as AnyItem[]).map(compactLink)}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ) : null}
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`flex h-full min-h-0 shrink-0 flex-col border-l border-white/10 bg-[#172B4D] pl-8 pr-10 pt-8 ${SOLUTIONS_FEATURED_RAIL_CLASS}`}
                    >
                      <SolutionsFeaturedPanel
                        featured={featured}
                        onNavigate={() => setActiveDropdown(null)}
                        ctaLabel="Explore"
                      />
                    </div>
                  </div>
                ) : (
                  /* ── Fallback: section columns only ── */
                  <div className="max-w-7xl mx-auto px-8 py-7">
                    <div className="flex gap-0">
                      {menu.sections.map((section, si) => (
                        <div
                          key={section.heading}
                          className={`flex-1 ${si > 0 ? "border-l border-gray-200/80 pl-8 ml-8" : ""}`}
                        >
                          <p className="text-[10px] font-bold text-[#97A0AF] uppercase tracking-[0.16em] mb-4">
                            {section.heading}
                          </p>
                          <div className="flex flex-col gap-0.5">
                            {section.items.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setActiveDropdown(null)}
                                className="group flex items-start gap-3 px-3 py-2.5 -mx-3 rounded-lg hover:bg-white/90 transition-colors duration-100"
                              >
                                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white transition-colors group-hover:bg-[#172B4D]">
                                  <item.icon size={14} className="text-[#0052CC] transition-colors group-hover:text-white" />
                                </div>
                                <div>
                                  <p className="text-[13px] font-semibold text-[#172B4D] group-hover:text-[#0052CC] transition-colors leading-tight">
                                    {item.label}
                                  </p>
                                  <p className="text-[12px] text-[#6B778C] leading-snug mt-0.5">{item.desc}</p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>
        );
      })}

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 max-h-[80vh] overflow-y-auto"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {mobileNavLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...("external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-sm text-[#42526E] hover:text-[#172B4D] transition-colors py-2.5 px-2 font-semibold"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-gray-100 mt-1 flex flex-col gap-2">
                <a href="#" className="block w-full text-center text-sm font-bold text-[#172B4D] border border-[#172B4D] py-2.5 rounded-md">Log in</a>
                <a href="/early-access" className="block w-full text-center text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-soft transition-all duration-150 py-3 rounded-md">
                  Request a demo
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
