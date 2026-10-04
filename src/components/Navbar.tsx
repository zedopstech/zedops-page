import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { dropdownMenus, type DropdownKey } from "@/data/navDropdownMenus";
import { TicketButton } from "./design-system/primitives";
import MegaMenu from "./MegaMenu";
import ZedOpsMark from "./ZedOpsMark";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "@/i18n";

const topLinks = Object.keys(dropdownMenus) as DropdownKey[];

/**
 * Two-tier header: a slim announcement line, then a flat full-width bar with a hairline
 * bottom rule. Mega menus drop as an attached full-width panel. Total height stays 100px
 * (36 + 64) so every page's top padding still clears it.
 */
export default function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const navAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDropdown(null);
        setOpen(false);
      }
    };
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!navAreaRef.current?.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    // Match the bar to whatever is directly beneath it: black over dark sections, white otherwise.
    const isDarkBelow = () => {
      const under = document.elementsFromPoint(window.innerWidth / 2, 101).find((el) => !el.closest("header"));
      for (let el: Element | null = under ?? null; el && el !== document.documentElement; el = el.parentElement) {
        if (el.closest("[data-nav-theme='dark']")) return true;
        const m = getComputedStyle(el).backgroundColor.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/);
        if (!m || (m[4] !== undefined && Number(m[4]) < 0.5)) continue;
        const [r, g, b] = [m[1], m[2], m[3]].map(Number);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b < 90;
      }
      return false;
    };
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setOverDark(isDarkBelow());
      // Step aside once the footer is on screen: it carries its own logo and links.
      const footerTop = document.querySelector("footer")?.getBoundingClientRect().top;
      setAtFooter(footerTop !== undefined && footerTop < window.innerHeight);
    };
    onScroll();
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("mousedown", closeOnOutsideClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("mousedown", closeOnOutsideClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const panelOpen = activeDropdown !== null;
  const dark = overDark && !panelOpen && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out ${atFooter && !open && !panelOpen ? "-translate-y-full" : ""}`}
    >
      <div className="flex h-9 items-center justify-center bg-[#0E1B33] px-4 text-[13px]">
        <p className="truncate text-white/80">
          <span className="hidden sm:inline">{t("MEP execution, schedule to punch, tied to real work. ")}</span>
          <span className="font-semibold text-white">Zed AI</span>{t(" works on the same job data.")}
        </p>
        <a
          href="/early-access"
          className="ms-3 inline-flex shrink-0 items-center gap-1 font-semibold text-white hover:text-[#FFB37F]"
        >
          {t("Get access")} <ArrowRight size={13} aria-hidden />
        </a>
      </div>

      <div ref={navAreaRef} className="relative" onMouseLeave={() => setActiveDropdown(null)}>
        <nav
          className={`border-b transition-[background-color,border-color,box-shadow] duration-300 ${
            dark
              ? "border-white/10 bg-[#0E1B33]"
              : scrolled || panelOpen || open
                ? "border-[#E3E8F0] bg-white shadow-[0_8px_24px_-20px_rgba(14,27,51,0.35)]"
                : "border-transparent bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-16 max-w-[1200px] items-center px-5 lg:px-6">
            <a href="/" className="flex shrink-0 items-center gap-2" onMouseEnter={() => setActiveDropdown(null)}>
              <ZedOpsMark tone={dark ? "dark" : "light"} className="h-[22px] w-auto" />
              {/* 19px extrabold keeps "Ops" in the exact brand orange while passing
                  WCAG large-text contrast (3:1). */}
              <span className={`text-[19px] font-extrabold tracking-tight transition-colors ${dark ? "text-white" : "text-brand-navy"}`}>
                Zed<span className="text-brand-orange">Ops</span>
              </span>
            </a>

            <div className="ms-4 hidden h-full min-w-0 items-stretch xl:flex xl:ms-6">
              {topLinks.map((label) => {
                const on = activeDropdown === label;
                return (
                  <button
                    key={label}
                    type="button"
                    aria-expanded={on}
                    aria-controls="site-nav-panel"
                    onMouseEnter={() => setActiveDropdown(label)}
                    onClick={() => setActiveDropdown(on ? null : label)}
                    className={`relative flex items-center gap-1 whitespace-nowrap px-2 text-[14px]  font-medium transition-colors ${
                      dark ? "text-white/80 hover:text-white" : on ? "text-brand-navy" : "text-[#3D4F6E] hover:text-brand-navy"
                    }`}
                  >
                    {t(label)}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${dark ? "text-white/40" : "text-[#5F6B80]"} ${on ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                    <span
                      aria-hidden
                      className={`absolute inset-x-2 -bottom-px h-[2px] bg-brand-orange transition-opacity ${on ? "opacity-100" : "opacity-0"}`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="ms-auto hidden items-center gap-2 ps-4 xl:flex" onMouseEnter={() => setActiveDropdown(null)}>
              <a
                href="#"
                className={`inline-flex h-10 items-center whitespace-nowrap rounded-lg border px-2.5 text-[14px]  font-medium transition-colors ${
                  dark ? "border-white/20 text-white hover:border-white/40" : "border-transparent text-[#3D4F6E] hover:text-brand-navy"
                }`}
              >
                {t("Log in")}
              </a>
              <LanguageToggle dark={dark} compact />
              <TicketButton href="/early-access" variant={dark ? "white" : "navy"} className="!text-[14px]">
                {t("Request a demo")}
              </TicketButton>
            </div>

            <button
              type="button"
              className={`ms-auto flex h-10 w-10 items-center justify-center rounded-md xl:hidden ${dark ? "text-white hover:bg-white/10" : "text-brand-navy hover:bg-[#F4F6FA]"}`}
              onClick={() => setOpen((v) => !v)}
              aria-label={t("Toggle menu")}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {panelOpen ? (
          <div
            id="site-nav-panel"
            className="absolute inset-x-0 top-full hidden border-b border-[#E3E8F0] bg-white shadow-[0_32px_64px_-32px_rgba(14,27,51,0.3)] xl:block"
          >
            <div className="mx-auto max-w-[1200px] px-6">
              <MegaMenu active={activeDropdown} onNavigate={() => setActiveDropdown(null)} />
            </div>
          </div>
        ) : null}

        {open ? (
          <div className="max-h-[calc(100vh-100px)] overflow-y-auto border-b border-[#E3E8F0] bg-white px-5 pb-5 xl:hidden">
            {topLinks.map((label) => (
              <details key={label} className="group border-b border-[#EDF0F5]">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[16px] font-semibold text-brand-navy [&::-webkit-details-marker]:hidden">
                  {t(label)}
                  <ChevronDown size={18} className="text-[#5F6B80] transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <div className="space-y-4 pb-5">
                  {dropdownMenus[label].sections.map((section) => (
                    <div key={section.heading}>
                      <p className="mb-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#616D82]">
                        {t(section.heading)}
                      </p>
                      {section.items.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          {...("external" in item && item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="block py-2 text-[15px] text-[#2B3A55] hover:text-brand-navy"
                          onClick={() => setOpen(false)}
                        >
                          {t(item.label)}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </details>
            ))}
            <div className="mt-5 grid gap-3">
              <TicketButton href="/early-access" full>
                {t("Request a demo")}
              </TicketButton>
              <a
                href="#"
                className="flex h-10 items-center justify-center rounded-lg border border-[#C9D2DF] text-[15px] font-semibold text-brand-navy"
              >
                {t("Log in")}
              </a>
              <LanguageToggle className="justify-center !border-[#C9D2DF] !text-brand-navy" />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
