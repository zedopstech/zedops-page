import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { LANGUAGES, useI18n } from "@/i18n";

/** Language dropdown. Each option is shown in its own language. */
export default function LanguageToggle({
  dark = false,
  className = "",
  up = false,
  compact = false,
}: {
  dark?: boolean;
  className?: string;
  /** Open upward (for the footer). */
  up?: boolean;
  /** Icon-only (name kept for screen readers), to keep a crowded navbar on one line. */
  compact?: boolean;
}) {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        className={`inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-lg border px-3 text-[14.5px] font-medium transition-colors ${
          dark ? "border-white/20 text-white hover:border-white/40" : "border-transparent text-[#3D4F6E] hover:text-brand-navy"
        } ${className}`}
      >
        <Globe size={16} aria-hidden />
        <span className={compact ? "sr-only" : ""}>{current.label}</span>
        <ChevronDown size={13} aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <ul
          dir="ltr"
          role="listbox"
          aria-label="Language"
          className={`absolute end-0 z-[60] text-left min-w-[160px] overflow-hidden rounded-lg border border-[#E3E8F0] bg-white py-1 shadow-[0_16px_40px_-16px_rgba(14,27,51,0.35)] ${up ? "bottom-full mb-2" : "top-full mt-2"}`}
        >
          {LANGUAGES.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <button
                type="button"
                lang={l.code}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between gap-3 px-3.5 py-2 text-left text-[14px] text-brand-navy hover:bg-[#F5F7FA]"
              >
                {l.label}
                {l.code === lang ? <Check size={14} className="text-brand-orange" aria-hidden /> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
