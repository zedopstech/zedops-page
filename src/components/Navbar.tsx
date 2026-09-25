import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { dropdownMenus, type DropdownKey } from "@/data/navDropdownMenus";
import { DotGrid, TicketButton } from "./design-preview/primitives";
import MegaMenu from "./MegaMenu";

const topLinks = Object.keys(dropdownMenus) as DropdownKey[];

/**
 * hexalog nav: slim dark announcement strip, then a floating white bar
 * (10px radius, soft shadow) — logo left, links centred, text link + ticket CTA right.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null);
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
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative flex h-9 items-center justify-center overflow-hidden bg-[linear-gradient(90deg,#0E1B33,#1E3760_50%,#0E1B33)] px-4">
        <DotGrid dark />
        <a
          href="/zed-ai"
          className="relative flex items-center gap-2 truncate text-[13px] font-medium text-white/90"
        >
          <span className="truncate">
            <span className="hidden sm:inline">
              MEP execution: schedule, logs, QA, cost &amp; supply, tied to real
              work.{" "}
            </span>
            <span className="font-semibold text-[#C9D7EB]">Zed AI</span> uses
            the same job data.
          </span>
        </a>
        <a href="/early-access" className="relative ml-3 shrink-0 text-[12px] font-semibold text-white underline-offset-2 hover:underline">
          Get access
        </a>
      </div>

      <div ref={navAreaRef} className="px-3 pt-3 sm:px-6 lg:px-10" onMouseLeave={() => setActiveDropdown(null)}>
        <div className="relative mx-auto max-w-[1376px]">
        <nav className="mx-auto flex h-[52px] max-w-[1376px] items-center justify-between rounded-[10px] bg-white pr-1.5 pl-5 shadow-[0_4px_24px_rgba(23,43,77,0.08),0_0_0_1px_rgba(23,43,77,0.04)]">
          <a
            href="/"
            className="flex shrink-0 items-center gap-2"
          >
            <img
              src="/logo2.png"
              alt=""
              className="h-7 w-7 rounded-md object-cover"
            />
            <span className="text-[17px] font-extrabold tracking-tight text-brand-navy">
              Zed<span className="text-brand-orange">Ops</span>
            </span>
          </a>

          <div className="hidden items-center gap-4 lg:flex xl:gap-6">
            {topLinks.map((label) => (
              <button
                key={label}
                type="button"
                aria-expanded={activeDropdown === label}
                aria-controls="preview-nav-dropdown"
                onMouseEnter={() => setActiveDropdown(label)}
                onClick={() => setActiveDropdown(label)}
                className={`flex items-center gap-1 text-[14px] font-medium transition-colors ${activeDropdown === label ? "text-brand-orange" : "text-[#2B3A55] hover:text-brand-orange"}`}
              >
                {label}
                <ChevronDown size={13} className={`transition-transform ${activeDropdown === label ? "rotate-180 text-brand-orange" : "text-[#8C97AB]"}`} aria-hidden />
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href="#"
              className="flex items-center gap-1 text-[14px] font-medium text-[#2B3A55] hover:text-brand-navy"
            >
              Log in <ArrowUpRight size={13} aria-hidden />
            </a>
            <TicketButton href="/early-access" className="!h-10 !text-[14px]">
              Request a demo
            </TicketButton>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-navy hover:bg-[#F4F6FA] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {activeDropdown ? (
          <div className="absolute inset-x-0 top-full z-50 pt-2 hidden lg:block" id="preview-nav-dropdown">
            <div className={`mx-auto overflow-hidden rounded-xl border border-[#E3E8F0] bg-white shadow-[0_18px_45px_rgba(23,43,77,0.16)] ${activeDropdown === "Company" ? "max-w-[700px]" : "w-full"}`}>
              <MegaMenu active={activeDropdown} onNavigate={() => setActiveDropdown(null)} />
            </div>
          </div>
        ) : null}

        {open ? (
          <div className="mx-auto mt-2 max-h-[calc(100vh-116px)] max-w-[1376px] overflow-y-auto rounded-xl bg-white p-3 shadow-[0_16px_40px_-16px_rgba(23,43,77,0.3)] lg:hidden">
            {topLinks.map((label) => (
              <details key={label} className="group border-b border-[#E3E8F0] last:border-b-0">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-[15px] font-medium text-brand-navy hover:bg-[#F4F6FA] [&::-webkit-details-marker]:hidden">
                  {label}<ChevronDown size={16} className="transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <div className="space-y-3 px-3 pb-4">
                  {dropdownMenus[label].sections.map((section) => (
                    <div key={section.heading}>
                      <p className="mb-1 px-2 text-[11px] font-bold uppercase tracking-wider text-[#6B778C]">{section.heading}</p>
                      {section.items.map((item) => (
                        <a key={item.label} href={item.href} {...("external" in item && item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="block rounded-lg px-2 py-2 text-[14px] text-brand-navy hover:bg-[#FFF4EC]" onClick={() => setOpen(false)}>{item.label}</a>
                      ))}
                    </div>
                  ))}
                </div>
              </details>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-[#E3E8F0] pt-3">
              <a
                href="#"
                className="rounded-lg border border-[#CDD5E3] py-2.5 text-center text-[15px] font-medium text-brand-navy"
              >
                Log in
              </a>
              <TicketButton href="/early-access" full>
                Request a demo
              </TicketButton>
            </div>
          </div>
        ) : null}
        </div>
      </div>
    </header>
  );
}
