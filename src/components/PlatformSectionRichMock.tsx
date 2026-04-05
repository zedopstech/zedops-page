import type { ReactNode } from "react";
import {
  CalendarDays,
  FileText,
  LayoutDashboard,
  ListChecks,
  Lock,
  Package,
  PieChart,
  Settings2,
  Users,
  Wallet,
} from "lucide-react";
import type { PlatformFeatureSection } from "@/data/platformFeatures";
import type { MockType } from "@/components/ProductMocks";

function clampText(s: string, max: number): string {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

function seed(seed: string, i: number): number {
  let h = 0;
  for (let j = 0; j < seed.length; j++) h = (h * 31 + seed.charCodeAt(j) + i) | 0;
  return Math.abs(h);
}

function initials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "?";
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? "?";
  return `${a}${b}`.toUpperCase();
}

function PanelShell({
  section,
  children,
}: {
  section: PlatformFeatureSection;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full min-h-[280px] flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-[0_16px_48px_-28px_rgba(23,43,77,0.22)]">
      <header className="shrink-0 border-b border-gray-100 bg-linear-to-b from-[#FAFBFC] to-white px-4 py-3 sm:px-5 sm:py-3.5">
        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#97A0AF]">Overview</p>
        <h3 className="mt-0.5 text-sm font-extrabold leading-tight text-[#172B4D] sm:text-base">{section.title}</h3>
      </header>
      <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-5">{children}</div>
    </div>
  );
}

function RichAccess({ section }: { section: PlatformFeatureSection }) {
  const items = section.items.slice(0, 5);
  return (
    <PanelShell section={section}>
      <div className="space-y-2.5">
        {items.map((item, i) => {
          const ok = seed(item.name, i) % 5 !== 0;
          return (
            <div
              key={item.name}
              className="flex items-start justify-between gap-3 rounded-xl border border-gray-100 bg-[#F8FAFC] px-3 py-2.5"
            >
              <div className="flex min-w-0 gap-2.5">
                <Lock size={14} className="mt-0.5 shrink-0 text-[#0052CC]" aria-hidden />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold leading-snug text-[#172B4D] sm:text-xs">{item.name}</p>
                  <p className="mt-0.5 text-[10px] leading-relaxed text-[#42526E] sm:text-[11px]">
                    {clampText(item.summary, 120)}
                  </p>
                </div>
              </div>
              <span
                className={`shrink-0 rounded-md px-2 py-0.5 text-[9px] font-bold ${
                  ok ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"
                }`}
              >
                {ok ? "Aligned" : "Review"}
              </span>
            </div>
          );
        })}
      </div>
    </PanelShell>
  );
}

function RichPeople({ section }: { section: PlatformFeatureSection }) {
  const items = section.items.slice(0, 5);
  return (
    <PanelShell section={section}>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-[0_1px_0_rgba(23,43,77,0.04)]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EBF0FF] text-[10px] font-black text-[#172B4D]">
              {initials(item.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-[#172B4D] sm:text-xs">{item.name}</p>
              <p className="text-[10px] leading-relaxed text-[#6B778C] sm:text-[11px]">{clampText(item.summary, 100)}</p>
            </div>
            <Users size={14} className="shrink-0 text-gray-300" aria-hidden />
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

function RichDashboard({ section }: { section: PlatformFeatureSection }) {
  const items = section.items.slice(0, 4);
  const bars = [38, 62, 45, 78, 52, 71, 55, 84];
  return (
    <PanelShell section={section}>
      <div className="mb-4 grid grid-cols-2 gap-2">
        {items.slice(0, 2).map((item, i) => (
          <div key={item.name} className="rounded-xl border border-gray-100 bg-[#F8FAFC] px-3 py-2.5">
            <div className="text-lg font-black tabular-nums leading-none text-[#172B4D]">
              {48 + seed(item.name, i) % 47}
              {i === 0 ? "%" : ""}
            </div>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-wide text-[#97A0AF]">
              {clampText(item.name, 22)}
            </p>
            <p className="mt-1 text-[10px] leading-snug text-[#42526E]">{clampText(item.summary, 72)}</p>
          </div>
        ))}
      </div>
      <div className="flex h-16 items-end gap-1 rounded-lg bg-[#F8FAFC] p-2">
        {bars.map((height, i) => (
          <div
            key={i}
            className="flex-1 rounded-t"
            style={{
              height: `${height}%`,
              minHeight: 12,
              opacity: i === 3 ? 1 : 0.15 + (i % 4) * 0.12,
              background: i === 5 ? "#F79625" : "#172B4D",
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold text-[#6B778C]">
        <LayoutDashboard size={12} className="text-[#0052CC]" aria-hidden />
        <span>{items[2] ? clampText(items[2].name, 36) : "Signals"}  -  live</span>
      </div>
    </PanelShell>
  );
}

function RichSchedule({ section }: { section: PlatformFeatureSection }) {
  const items = section.items.slice(0, 5);
  const busy = seed(section.id, 0) % 5;
  return (
    <PanelShell section={section}>
      <div className="mb-4 flex items-center gap-2 text-[10px] font-bold text-[#97A0AF]">
        <CalendarDays size={13} className="text-[#172B4D]" aria-hidden />
        <span>Working plan</span>
      </div>
      <div className="mb-4 flex gap-1">
        {["M", "T", "W", "T", "F"].map((d, i) => (
          <div key={`${d}-${i}`} className="flex-1 text-center">
            <div className="text-[9px] font-bold text-[#6B778C]">{d}</div>
            <div className="mt-1 flex min-h-[36px] flex-col justify-end gap-0.5 rounded-md border border-gray-100/80 bg-[#F8FAFC] p-1">
              {i === busy ? (
                <>
                  <div className="h-2 rounded-sm bg-[#F79625]" />
                  <div className="h-1.5 rounded-sm bg-[#172B4D]/25" />
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={item.name} className="rounded-lg border-l-2 border-[#0052CC] bg-[#F8FAFC]/80 py-2 pl-3 pr-2">
            <p className="text-[10px] font-bold text-[#0052CC]">Milestone {i + 1}</p>
            <p className="text-[11px] font-extrabold text-[#172B4D]">{item.name}</p>
            <p className="mt-0.5 text-[10px] leading-relaxed text-[#42526E]">{clampText(item.summary, 110)}</p>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

function RichInspection({ section }: { section: PlatformFeatureSection }) {
  const items = section.items.slice(0, 5);
  return (
    <PanelShell section={section}>
      <div className="space-y-2">
        {items.map((item, i) => {
          const done = seed(item.name, i) % 3 !== 0;
          return (
            <div key={item.name} className="flex gap-2.5 rounded-xl border border-gray-100 bg-white px-3 py-2">
              <ListChecks
                size={16}
                className={`mt-0.5 shrink-0 ${done ? "text-emerald-600" : "text-gray-300"}`}
                aria-hidden
              />
              <div className="min-w-0">
                <p
                  className={`text-[11px] font-bold leading-snug sm:text-xs ${
                    done ? "text-[#6B778C] line-through decoration-gray-300" : "text-[#172B4D]"
                  }`}
                >
                  {item.name}
                </p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-[#42526E] sm:text-[11px]">
                  {clampText(item.summary, 100)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </PanelShell>
  );
}

function RichDocuments({ section }: { section: PlatformFeatureSection }) {
  const tags = ["PDF", "IFC", "DOCX", "XLSX"] as const;
  const items = section.items.slice(0, 5);
  return (
    <PanelShell section={section}>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={item.name}
            className="flex items-start gap-2.5 rounded-xl border border-gray-100 bg-[#FAFBFC] px-3 py-2.5"
          >
            <FileText size={15} className="mt-0.5 shrink-0 text-[#0747A6]" aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-extrabold text-[#172B4D] sm:text-xs">{item.name}</p>
              <p className="mt-1 text-[10px] leading-relaxed text-[#42526E] sm:text-[11px]">{clampText(item.summary, 95)}</p>
            </div>
            <span className="shrink-0 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[8px] font-bold text-[#6B778C]">
              {tags[seed(item.name, i) % tags.length]}
            </span>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

function RichFinance({ section }: { section: PlatformFeatureSection }) {
  const items = section.items.slice(0, 5);
  const headline = items[0];
  return (
    <PanelShell section={section}>
      <div className="mb-4 rounded-xl bg-[#172B4D] px-4 py-3 text-white">
        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wide text-white/50">
          <Wallet size={12} className="text-[#F79625]" aria-hidden />
          <span>Commercial snapshot</span>
        </div>
        {headline ? (
          <>
            <p className="mt-2 text-lg font-black leading-none sm:text-xl">{clampText(headline.name, 28)}</p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-white/80">{clampText(headline.summary, 140)}</p>
          </>
        ) : null}
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.name}
            className="flex items-baseline justify-between gap-2 border-b border-gray-100 pb-2 text-[11px] last:border-0"
          >
            <span className="min-w-0 font-semibold text-[#42526E]">{clampText(item.name, 26)}</span>
            <span className="shrink-0 font-bold tabular-nums text-[#172B4D]">{12 + seed(item.name, 0) % 38}%</span>
          </li>
        ))}
      </ul>
    </PanelShell>
  );
}

function RichSupply({ section }: { section: PlatformFeatureSection }) {
  const items = section.items.slice(0, 5);
  return (
    <PanelShell section={section}>
      <div className="space-y-3">
        {items.map((item, i) => {
          const pct = 30 + seed(item.name, i) % 65;
          return (
            <div key={item.name} className="rounded-xl border border-gray-100 bg-[#FFFBF5] px-3 py-2.5">
              <div className="flex items-center gap-2">
                <Package size={14} className="shrink-0 text-[#F79625]" aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-extrabold text-[#172B4D] sm:text-xs">{item.name}</p>
                  <p className="mt-1 text-[10px] leading-relaxed text-[#42526E] sm:text-[11px]">
                    {clampText(item.summary, 108)}
                  </p>
                </div>
                <span className="shrink-0 text-[10px] font-black text-[#172B4D]">{pct}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-[#F79625]" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </PanelShell>
  );
}

function RichReports({ section }: { section: PlatformFeatureSection }) {
  const items = section.items.slice(0, 4);
  const a = 40 + seed(section.id, 1) % 35;
  const b = 15 + seed(section.id, 2) % 30;
  return (
    <PanelShell section={section}>
      <div className="flex flex-wrap items-center gap-4">
        <div
          className="relative h-20 w-20 shrink-0 rounded-full"
          style={{
            background: `conic-gradient(#172B4D 0 ${a}%, #F79625 ${a}% ${a + b}%, #E4E7EC ${a + b}% 100%)`,
          }}
        >
          <div className="absolute inset-2 rounded-full bg-white" />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          {items.map((item, i) => (
            <div key={item.name} className="flex items-start gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: ["#172B4D", "#F79625", "#0052CC", "#97A0AF"][i % 4] }}
              />
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-[#172B4D] sm:text-xs">{item.name}</p>
                <p className="text-[10px] leading-relaxed text-[#42526E] sm:text-[11px]">{clampText(item.summary, 88)}</p>
              </div>
            </div>
          ))}
        </div>
        <PieChart size={22} className="hidden shrink-0 text-[#97A0AF] sm:block" aria-hidden />
      </div>
    </PanelShell>
  );
}

function RichSettings({ section }: { section: PlatformFeatureSection }) {
  const items = section.items.slice(0, 5);
  return (
    <PanelShell section={section}>
      <div className="space-y-2">
        {items.map((item, i) => {
          const on = seed(item.name, i) % 2 === 0;
          return (
            <div
              key={item.name}
              className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-[#F8FAFC] px-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-[#172B4D] sm:text-xs">{item.name}</p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-[#42526E] sm:text-[11px]">{clampText(item.summary, 95)}</p>
              </div>
              <div
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-[#172B4D]" : "bg-gray-200"}`}
                aria-hidden
              >
                <div
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm ${on ? "left-5" : "left-0.5"}`}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-[10px] font-semibold text-[#97A0AF]">
        <Settings2 size={12} aria-hidden />
        Tenant-scoped preferences
      </p>
    </PanelShell>
  );
}

/** Default: stacked capability cards with full copy */
function RichList({ section }: { section: PlatformFeatureSection }) {
  const items = section.items.slice(0, 5);
  return (
    <PanelShell section={section}>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={item.name}
            className="rounded-xl border border-gray-200/80 bg-linear-to-br from-white to-[#F8FAFC] px-3 py-2.5 shadow-[0_1px_0_rgba(23,43,77,0.06)]"
          >
            <span className="text-[9px] font-bold uppercase tracking-wide text-[#0052CC]">Capability {i + 1}</span>
            <p className="mt-1 text-[11px] font-extrabold text-[#172B4D] sm:text-xs">{item.name}</p>
            <p className="mt-1 text-[10px] leading-relaxed text-[#42526E] sm:text-[11px]">{item.summary}</p>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

function RichChat({ section }: { section: PlatformFeatureSection }) {
  const items = section.items.slice(0, 3);
  const first = items[0];
  return (
    <PanelShell section={section}>
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F79625] text-[11px] font-black text-white">
            Z
          </div>
          <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md border border-gray-100 bg-[#F8FAFC] px-3 py-2">
            <p className="text-[11px] font-semibold leading-relaxed text-[#42526E]">
              {first ? `Here’s how ${clampText(section.title, 32)} fits together: ${clampText(first.summary, 140)}` : "Ask ZedOps anything about this area."}
            </p>
          </div>
        </div>
        {items.slice(1).map((item) => (
          <div key={item.name} className="flex justify-end">
            <div className="max-w-[90%] rounded-2xl rounded-tr-md bg-[#172B4D] px-3 py-2">
              <p className="text-[11px] font-semibold leading-relaxed text-white/95">{clampText(item.summary, 130)}</p>
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

export function PlatformSectionRichMock({ section, variant }: { section: PlatformFeatureSection; variant: MockType }) {
  switch (variant) {
    case "access":
      return <RichAccess section={section} />;
    case "people":
      return <RichPeople section={section} />;
    case "dashboard":
      return <RichDashboard section={section} />;
    case "schedule":
      return <RichSchedule section={section} />;
    case "inspection":
      return <RichInspection section={section} />;
    case "documents":
      return <RichDocuments section={section} />;
    case "finance":
      return <RichFinance section={section} />;
    case "supply":
      return <RichSupply section={section} />;
    case "reports":
      return <RichReports section={section} />;
    case "settings":
      return <RichSettings section={section} />;
    case "chat":
      return <RichChat section={section} />;
    default:
      return <RichList section={section} />;
  }
}
