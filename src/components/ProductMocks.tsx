import { createContext, useContext, type ReactNode } from "react";

/** When false, mock bodies render without traffic-light / URL chrome (e.g. platform checklist). */
const MockShowChromeContext = createContext(true);

export type MockType =
  | "chat"
  | "dashboard"
  | "log"
  | "annotation"
  | "list"
  | "schedule"
  | "access"
  | "people"
  | "documents"
  | "finance"
  | "supply"
  | "reports"
  | "inspection"
  | "settings";

export function MockWindow({ children, bodyClassName }: { children: ReactNode; bodyClassName?: string }) {
  const showChrome = useContext(MockShowChromeContext);
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white h-full flex flex-col">
      {showChrome ? (
        <div className="flex shrink-0 items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="mx-3 flex h-5 min-w-0 flex-1 items-center gap-1 rounded-full border border-gray-200 bg-white px-3">
            <div className="h-2 w-2 shrink-0 rounded-full bg-gray-300" />
            <span className="truncate text-[10px] text-[#97A0AF]">app.zedops.com</span>
          </div>
        </div>
      ) : null}
      <div className={`min-h-0 flex-1 flex flex-col p-5 ${bodyClassName ?? ""}`}>{children}</div>
    </div>
  );
}

export function MockChat() {
  return (
    <MockWindow bodyClassName="min-h-[280px]">
      <div className="flex gap-3 h-full flex-1 min-h-0">
        <div className="w-28 shrink-0 space-y-1 border-r border-gray-100 pr-3">
          <div className="h-2 bg-gray-200 rounded w-3/4 mb-3" />
          <div className="h-7 bg-[#EBF0FF] rounded-lg border border-brand-navy/10 flex items-center px-2 gap-1.5">
            <div className="w-2 h-2 bg-brand-navy rounded-full shrink-0" />
            <div className="h-2 bg-brand-navy/40 rounded flex-1" />
          </div>
          {["", ""].map((_, i) => (
            <div key={i} className="h-7 rounded-lg flex items-center px-2 gap-1.5">
              <div className="w-2 h-2 bg-gray-300 rounded-full shrink-0" />
              <div className="h-2 bg-gray-200 rounded flex-1" />
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-brand-orange shrink-0 flex items-center justify-center text-white text-[10px] font-black">Z</div>
            <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl rounded-tl-none p-3 flex-1">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-2 h-2 rounded-full bg-brand-orange" />
                <div className="h-2 bg-brand-orange/25 rounded w-20" />
              </div>
              <div className="space-y-1.5">
                <div className="h-2 bg-gray-200 rounded w-full" />
                <div className="h-2 bg-gray-200 rounded w-5/6" />
                <div className="h-2 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <div className="bg-brand-navy rounded-2xl rounded-tr-none px-4 py-3 max-w-[75%]">
              <div className="h-2 bg-white/40 rounded mb-1.5 w-full" />
              <div className="h-2 bg-white/40 rounded w-3/4" />
            </div>
            <div className="w-7 h-7 rounded-full bg-gray-200 shrink-0" />
          </div>
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-brand-orange shrink-0 flex items-center justify-center text-white text-[10px] font-black">Z</div>
            <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl rounded-tl-none p-3 flex-1">
              <div className="space-y-1.5">
                <div className="h-2 bg-gray-200 rounded w-full" />
                <div className="h-2 bg-gray-200 rounded w-4/5" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-auto pt-2 border-t border-gray-100">
            <div className="flex-1 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center px-3">
              <div className="h-2 bg-gray-200 rounded w-1/3" />
            </div>
            <div className="w-9 h-9 bg-brand-orange rounded-xl shrink-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-white/80 rounded-sm" style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
            </div>
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

export function MockDashboard() {
  return (
    <MockWindow bodyClassName="min-h-[280px]">
      <div className="space-y-4 flex-1">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "On Track", value: "12", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
            { label: "At Risk", value: "3", color: "text-brand-orange", bg: "bg-brand-orange/10", border: "border-brand-orange/30" },
            { label: "Delayed", value: "1", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} border ${s.border} rounded-xl p-3 text-center`}>
              <div className={`text-2xl font-extrabold ${s.color} leading-none mb-1`}>{s.value}</div>
              <div className="text-[9px] text-[#616D82] font-semibold">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="h-2.5 bg-gray-300 rounded w-24" />
            <div className="flex gap-1">
              {["W", "M", "Q"].map((t, i) => (
                <div key={t} className={`text-[9px] font-bold px-2 py-0.5 rounded ${i === 1 ? "bg-brand-navy text-white" : "text-[#97A0AF]"}`}>{t}</div>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-1 h-24">
            {[55, 70, 42, 88, 65, 78, 91, 60, 74, 85].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t transition-all"
                style={{ height: `${h}%`, background: i === 3 || i === 6 || i === 9 ? "#172B4D" : "#C4D9FF" }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {["Jan", "Feb", "Mar", "Apr", "May"].map((m) => (
              <div key={m} className="text-[8px] text-[#97A0AF]">{m}</div>
            ))}
          </div>
        </div>
        <div>
          <div className="h-2 bg-gray-300 rounded w-20 mb-2" />
          {[
            { dot: "bg-red-400" },
            { dot: "bg-brand-orange" },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-2.5 py-1.5 border-b border-gray-50 last:border-0">
              <div className={`w-2 h-2 rounded-full shrink-0 ${r.dot}`} />
              <div className="h-2 bg-gray-200 rounded flex-1" />
              <div className="h-2 bg-gray-100 rounded w-10" />
            </div>
          ))}
        </div>
      </div>
    </MockWindow>
  );
}

export function MockLog() {
  return (
    <MockWindow bodyClassName="min-h-[280px]">
      <div className="space-y-4 flex-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-3 bg-brand-navy/70 rounded w-28 mb-1.5" />
            <div className="h-2 bg-gray-200 rounded w-20" />
          </div>
          <div className="px-3 py-1.5 bg-brand-navy rounded-lg">
            <div className="h-2 bg-white/60 rounded w-10" />
          </div>
        </div>
        <div>
          <div className="h-2 bg-gray-300 rounded w-16 mb-2" />
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-16 h-14 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center">
                <span className="text-[#C7D5F5] text-lg" aria-hidden>🏗</span>
              </div>
            ))}
            <div className="w-16 h-14 bg-[#EBF0FF] rounded-xl border-2 border-dashed border-brand-navy/20 flex items-center justify-center text-brand-navy/30 text-2xl font-light">+</div>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { width: "w-1/2", tall: false },
            { width: "w-1/3", tall: false },
            { width: "w-2/3", tall: true },
          ].map((f, i) => (
            <div key={i}>
              <div className="h-2 bg-gray-300 rounded w-24 mb-1.5" />
              <div className={`bg-gray-50 border border-gray-200 rounded-lg flex items-start px-3 py-2 ${f.tall ? "h-14" : "h-9"}`}>
                <div className={`h-2 bg-gray-200 rounded mt-1 ${f.width}`} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-1 mt-auto">
          <div className="flex-1 h-9 border border-gray-200 rounded-lg" />
          <div className="px-4 h-9 bg-brand-orange rounded-lg flex items-center">
            <div className="h-2 bg-white/60 rounded w-12" />
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

export function MockAnnotation() {
  return (
    <MockWindow bodyClassName="min-h-[280px]">
      <div className="space-y-3 flex-1 flex flex-col">
        <div className="flex items-center gap-1.5 pb-3 border-b border-gray-100 shrink-0">
          {["✏️", "T", "□", "→"].map((t) => (
            <div key={t} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-[11px] text-[#616D82] font-bold">{t}</div>
          ))}
          <div className="w-px h-5 bg-gray-200 mx-1" />
          <div className="flex gap-1">
            {["#EF4444", "#FE5D02", "#22C55E"].map((c) => (
              <div key={c} className="w-5 h-5 rounded-full border-2 border-white" style={{ background: c }} />
            ))}
          </div>
          <div className="ml-auto px-2.5 py-1 bg-brand-navy rounded-md">
            <div className="h-2 bg-white/60 rounded w-10" />
          </div>
        </div>
        <div className="relative bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex-1 min-h-[140px]">
          <svg width="100%" height="100%" className="absolute inset-0 opacity-20" preserveAspectRatio="none">
            <defs>
              <pattern id="pmgrid" width="18" height="18" patternUnits="userSpaceOnUse">
                <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#172B4D" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pmgrid)" />
          </svg>
          <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="xMidYMid meet" viewBox="0 0 200 140">
            <rect x="24" y="18" width="130" height="90" fill="none" stroke="#172B4D" strokeWidth="1.5" />
            <rect x="24" y="18" width="65" height="50" fill="none" stroke="#172B4D" strokeWidth="1" />
            <rect x="89" y="18" width="65" height="50" fill="none" stroke="#172B4D" strokeWidth="1" />
            <rect x="24" y="68" width="130" height="40" fill="none" stroke="#172B4D" strokeWidth="1" />
            <line x1="90" y1="68" x2="90" y2="108" stroke="#172B4D" strokeWidth="1" />
          </svg>
          <div className="absolute top-4 left-36 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">RFI #23</div>
          <div className="absolute bottom-10 left-7 bg-brand-orange text-white text-[8px] font-bold px-1.5 py-0.5 rounded">Rev. 4</div>
          <div className="absolute top-12 left-8 bg-green-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">Approved</div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <line x1="35%" y1="16%" x2="50%" y2="16%" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3,2" />
          </svg>
        </div>
        <div className="flex gap-2 items-center shrink-0">
          <div className="flex-1 h-7 bg-gray-50 border border-gray-200 rounded-lg flex items-center px-3 gap-2">
            <div className="h-2 bg-gray-300 rounded w-4" />
            <div className="h-2 bg-gray-200 rounded flex-1" />
          </div>
          <div className="px-3 h-7 bg-[#EBF0FF] border border-brand-navy/10 rounded-lg flex items-center">
            <div className="h-2 bg-brand-navy/40 rounded w-12" />
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

export function MockList() {
  const tasks = [
    { done: false, urgency: "bg-red-100 text-red-700", label: "Due today" },
    { done: true, urgency: "bg-green-100 text-green-700", label: "Done" },
    { done: false, urgency: "bg-blue-100 text-blue-700", label: "In review" },
    { done: false, urgency: "bg-gray-100 text-[#616D82]", label: "Upcoming" },
  ];
  return (
    <MockWindow bodyClassName="min-h-[280px]">
      <div className="space-y-3 flex-1 flex flex-col">
        <div className="flex gap-4 border-b border-gray-100 pb-2 shrink-0">
          {["Tasks", "RFIs", "Submittals"].map((t, i) => (
            <div key={t} className={`text-[11px] font-bold pb-1 ${i === 0 ? "text-brand-navy border-b-2 border-brand-navy" : "text-[#97A0AF]"}`}>{t}</div>
          ))}
          <div className="ml-auto h-6 px-2 bg-[#EBF0FF] rounded-md flex items-center">
            <div className="h-2 bg-brand-navy/40 rounded w-10" />
          </div>
        </div>
        <div className="space-y-1 flex-1">
          {tasks.map((t, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50">
              <div
                className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${
                  t.done ? "bg-brand-navy border-brand-navy" : "border-gray-300"
                }`}
              >
                {t.done && <div className="w-2 h-1.5 border-b-2 border-l-2 border-white -rotate-45 -translate-y-px" />}
              </div>
              <div className={`flex-1 h-2 rounded ${t.done ? "bg-gray-200 opacity-50" : "bg-gray-300"}`} />
              <div className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${t.urgency}`}>{t.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="h-2 bg-gray-200 rounded w-24" />
            <div className="h-2 bg-gray-300 rounded w-8" />
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-brand-navy rounded-full" style={{ width: "65%" }} />
          </div>
          <div className="text-[9px] text-[#97A0AF] mt-1 text-right">65% complete</div>
        </div>
      </div>
    </MockWindow>
  );
}

/** Platform & access  -  tenants + sign-in */
export function MockAccess() {
  return (
    <MockWindow bodyClassName="min-h-[280px]">
      <div className="flex gap-4 flex-1 min-h-0">
        <div className="w-[30%] max-w-[120px] shrink-0 space-y-2 border-r border-gray-100 pr-3">
          <div className="h-2 bg-gray-200 rounded w-14" />
          <div className="h-8 rounded-lg bg-[#EBF0FF] border border-brand-navy/15 px-2 flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-brand-navy shrink-0" />
            <div className="h-2 bg-brand-navy/35 rounded flex-1 min-w-0" />
          </div>
          <div className="h-8 rounded-lg bg-gray-50 border border-gray-100 px-2 flex items-center">
            <div className="h-2 bg-gray-200 rounded flex-1" />
          </div>
          <div className="h-8 rounded-lg bg-gray-50 border border-gray-100 px-2 flex items-center">
            <div className="h-2 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-3 py-2 min-w-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-brand-navy flex items-center justify-center text-white text-sm font-black shrink-0">Z</div>
            <div>
              <div className="h-2.5 bg-brand-navy/70 rounded w-28 mb-1" />
              <div className="h-2 bg-gray-200 rounded w-36" />
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-9 bg-gray-50 border border-gray-200 rounded-lg" />
            <div className="h-9 bg-gray-50 border border-gray-200 rounded-lg" />
            <div className="h-9 bg-brand-navy rounded-lg opacity-90" />
          </div>
          <div className="flex gap-2 pt-1">
            <div className="h-2 bg-gray-200 rounded w-24" />
            <div className="h-2 bg-[#0052CC]/30 rounded w-16" />
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

/** Core  -  directory & org */
export function MockPeople() {
  return (
    <MockWindow bodyClassName="min-h-[280px]">
      <div className="space-y-3 flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between shrink-0">
          <div>
            <div className="h-2.5 bg-brand-navy/70 rounded w-32 mb-1" />
            <div className="h-2 bg-gray-200 rounded w-44" />
          </div>
          <div className="h-8 px-3 bg-[#EBF0FF] border border-brand-navy/15 rounded-lg flex items-center">
            <div className="h-2 bg-brand-navy/40 rounded w-14" />
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 overflow-hidden flex-1 min-h-[160px]">
          <div className="grid grid-cols-[1fr_1fr_80px] gap-2 px-3 py-2 bg-gray-50 border-b border-gray-100 text-[9px] font-bold text-[#616D82] uppercase tracking-wide">
            <span>Name</span>
            <span>Role</span>
            <span className="text-right">Status</span>
          </div>
          {[
            { w: "w-3/4", r: "w-1/2", s: "bg-green-100 text-green-700", t: "Active" },
            { w: "w-2/3", r: "w-3/5", s: "bg-green-100 text-green-700", t: "Active" },
            { w: "w-4/5", r: "w-1/2", s: "bg-amber-100 text-amber-800", t: "Pending" },
            { w: "w-1/2", r: "w-2/5", s: "bg-gray-100 text-[#42526E]", t: "Away" },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_80px] gap-2 items-center px-3 py-2.5 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-gray-200 shrink-0" />
                <div className={`h-2 bg-gray-300 rounded ${row.w} min-w-0`} />
              </div>
              <div className={`h-2 bg-gray-200 rounded ${row.r}`} />
              <div className="flex justify-end">
                <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${row.s}`}>{row.t}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockWindow>
  );
}

/** Information management  -  folders + files */
export function MockDocuments() {
  return (
    <MockWindow bodyClassName="min-h-[280px]">
      <div className="flex gap-3 flex-1 min-h-0">
        <div className="w-[32%] max-w-[130px] shrink-0 rounded-xl bg-gray-50 border border-gray-100 p-2 space-y-1.5">
          <div className="h-2 bg-gray-300 rounded w-16 mb-2" />
          {["", "", ""].map((_, i) => (
            <div key={i} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg ${i === 0 ? "bg-white border border-gray-200 shadow-sm" : ""}`}>
              <div className="w-3 h-3 bg-amber-200/80 rounded-sm shrink-0" />
              <div className="h-2 bg-gray-200 rounded flex-1 min-w-0" />
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <div className="flex gap-2 border-b border-gray-100 pb-2 shrink-0">
            {["Documents", "Daily log"].map((t, i) => (
              <div key={t} className={`text-[10px] font-bold pb-1 ${i === 0 ? "text-brand-navy border-b-2 border-brand-navy" : "text-[#97A0AF]"}`}>{t}</div>
            ))}
          </div>
          <div className="space-y-2 flex-1">
            {[
              { icon: "bg-red-100", ext: "PDF" },
              { icon: "bg-blue-100", ext: "DWG" },
              { icon: "bg-gray-100", ext: "XLS" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl border border-gray-100 hover:bg-gray-50/80">
                <div className={`w-9 h-10 rounded-lg ${f.icon} flex items-center justify-center text-[8px] font-black text-[#42526E] shrink-0`}>{f.ext}</div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="h-2 bg-gray-300 rounded w-4/5" />
                  <div className="h-2 bg-gray-200 rounded w-1/3" />
                </div>
                <div className="h-2 bg-gray-100 rounded w-12 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

/** Finance  -  budgets & cost */
export function MockFinance() {
  return (
    <MockWindow bodyClassName="min-h-[280px]">
      <div className="space-y-4 flex-1">
        <div className="flex items-center justify-between">
          <div className="h-2.5 bg-brand-navy/70 rounded w-36" />
          <div className="flex gap-1">
            {["Budget", "CO", "Pay"].map((t, i) => (
              <div key={t} className={`text-[9px] font-bold px-2 py-1 rounded-md ${i === 0 ? "bg-brand-navy text-white" : "bg-gray-100 text-[#616D82]"}`}>{t}</div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { l: "Committed", v: "$2.4M", sub: "82% of budget" },
            { l: "Forecast", v: "$2.7M", sub: "At completion" },
          ].map((c) => (
            <div key={c.l} className="rounded-xl border border-gray-200 bg-linear-to-br from-white to-gray-50/80 p-3">
              <div className="text-[9px] font-bold text-[#616D82] uppercase mb-1">{c.l}</div>
              <div className="text-xl font-extrabold text-brand-navy leading-none">{c.v}</div>
              <div className="text-[9px] text-[#97A0AF] mt-1">{c.sub}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
          <div className="flex justify-between mb-2">
            <div className="h-2 bg-gray-300 rounded w-28" />
            <div className="text-[9px] font-bold text-[#00875A]">On track</div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#00875A] rounded-full" style={{ width: "72%" }} />
          </div>
          <div className="flex justify-between mt-2 text-[8px] text-[#97A0AF]">
            <span>Actual</span>
            <span>Budget cap</span>
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

/** Material management  -  POs & inventory */
export function MockSupply() {
  return (
    <MockWindow bodyClassName="min-h-[280px]">
      <div className="space-y-3 flex-1 flex flex-col min-h-0">
        <div className="flex gap-3 border-b border-gray-100 pb-2 shrink-0 overflow-x-auto">
          {["POs", "Inventory", "Receipts", "Requests"].map((t, i) => (
            <div key={t} className={`text-[10px] font-bold whitespace-nowrap pb-1 shrink-0 ${i === 0 ? "text-brand-navy border-b-2 border-brand-navy" : "text-[#97A0AF]"}`}>{t}</div>
          ))}
        </div>
        <div className="rounded-xl border border-gray-200 overflow-hidden flex-1">
          <div className="grid grid-cols-[1fr_72px_72px] gap-2 px-3 py-2 bg-gray-50 border-b border-gray-100 text-[9px] font-bold text-[#616D82] uppercase">
            <span>Order / ref</span>
            <span>Qty</span>
            <span className="text-right">Status</span>
          </div>
          {[
            { st: "bg-blue-100 text-blue-800", lab: "Issued" },
            { st: "bg-amber-100 text-amber-900", lab: "Partial" },
            { st: "bg-green-100 text-green-800", lab: "Received" },
          ].map((r, i) => (
            <div key={i} className="grid grid-cols-[1fr_72px_72px] gap-2 items-center px-3 py-2.5 border-b border-gray-50 last:border-0">
              <div className="space-y-1 min-w-0">
                <div className="h-2 bg-gray-300 rounded w-4/5" />
                <div className="h-1.5 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="h-2 bg-gray-200 rounded w-8" />
              <div className="flex justify-end">
                <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${r.st}`}>{r.lab}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockWindow>
  );
}

/** Reporting & exports */
export function MockReports() {
  return (
    <MockWindow bodyClassName="min-h-[280px]">
      <div className="space-y-3 flex-1 flex flex-col">
        <div className="flex items-center justify-between shrink-0">
          <div className="h-2.5 bg-brand-navy/70 rounded w-40" />
          <div className="h-7 px-3 bg-[#EBF0FF] rounded-lg flex items-center border border-brand-navy/10">
            <div className="h-2 bg-brand-navy/40 rounded w-16" />
          </div>
        </div>
        <div className="space-y-2 flex-1">
          {[
            { t: "Inspection report", st: "Ready" },
            { t: "Daily log export", st: "Queued" },
            { t: "PO summary", st: "Ready" },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white">
              <div className="w-10 h-12 rounded border border-red-200 bg-red-50 flex flex-col items-center justify-center shrink-0">
                <div className="text-[7px] font-black text-red-600">PDF</div>
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="h-2 bg-gray-300 rounded w-3/5" />
                <div className="text-[9px] text-[#97A0AF] font-medium">{row.t}</div>
              </div>
              <div className="text-[9px] font-bold text-[#00875A] shrink-0">{row.st}</div>
            </div>
          ))}
        </div>
      </div>
    </MockWindow>
  );
}

/** Quality, safety, closeout */
export function MockInspection() {
  return (
    <MockWindow bodyClassName="min-h-[280px]">
      <div className="space-y-3 flex-1 flex flex-col min-h-0">
        <div className="flex gap-3 border-b border-gray-100 pb-2 shrink-0">
          {["Inspections", "Punch", "Incidents"].map((t, i) => (
            <div key={t} className={`text-[10px] font-bold pb-1 ${i === 0 ? "text-brand-navy border-b-2 border-brand-navy" : "text-[#97A0AF]"}`}>{t}</div>
          ))}
        </div>
        <div className="rounded-xl border border-amber-200/60 bg-amber-50/40 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-2 bg-amber-800/40 rounded w-32" />
            <span className="text-[8px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">Open</span>
          </div>
          {["Structural  -  Level 3", "MEP rough-in", "Envelope"].map((_, i) => (
            <div key={i} className="flex items-start gap-2 py-1.5 border-t border-amber-200/40 first:border-0 first:pt-0">
              <div className={`w-4 h-4 rounded border-2 shrink-0 mt-0.5 ${i === 1 ? "bg-brand-navy border-brand-navy" : "border-gray-300"}`} />
              <div className="flex-1 space-y-1">
                <div className="h-2 bg-gray-300 rounded w-full" />
                <div className="h-2 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 shrink-0">
          <div className="flex-1 h-8 bg-gray-50 border border-gray-200 rounded-lg" />
          <div className="h-8 px-4 bg-brand-navy rounded-lg flex items-center">
            <div className="h-2 bg-white/50 rounded w-16" />
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

/** Settings & configuration */
export function MockSettings() {
  return (
    <MockWindow bodyClassName="min-h-[280px]">
      <div className="space-y-1 flex-1 flex flex-col">
        <div className="h-2.5 bg-brand-navy/70 rounded w-44 mb-3 shrink-0" />
        {[
          { on: true },
          { on: true },
          { on: false },
          { on: true },
        ].map((row, i) => (
          <div key={i} className="flex items-center justify-between gap-3 py-3 border-b border-gray-100 last:border-0">
            <div className="space-y-1 flex-1 min-w-0">
              <div className="h-2 bg-gray-300 rounded w-3/5" />
              <div className="h-1.5 bg-gray-200 rounded w-2/5" />
            </div>
            <div
              className={`w-10 h-5 rounded-full shrink-0 relative ${row.on ? "bg-[#00875A]" : "bg-gray-200"}`}
              aria-hidden
            >
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${row.on ? "right-0.5" : "left-0.5"}`}
              />
            </div>
          </div>
        ))}
      </div>
    </MockWindow>
  );
}

export function MockSchedule() {
  const rows = [
    { label: "Site prep", start: 0, width: 38, color: "#22C55E" },
    { label: "Foundation", start: 33, width: 28, color: "#172B4D" },
    { label: "Framing", start: 55, width: 26, color: "#3B82F6" },
    { label: "Electrical", start: 66, width: 20, color: "#FE5D02" },
    { label: "Plumbing", start: 66, width: 22, color: "#8B5CF6" },
  ];
  return (
    <MockWindow bodyClassName="min-h-[280px]">
      <div className="space-y-3 flex-1 flex flex-col">
        <div className="flex items-center justify-between shrink-0">
          <div className="h-3 bg-brand-navy/70 rounded w-28" />
          <div className="flex gap-1">
            {["Week", "Month", "Quarter"].map((t, i) => (
              <div key={t} className={`text-[9px] font-bold px-2 py-1 rounded ${i === 1 ? "bg-brand-navy text-white" : "text-[#97A0AF] bg-gray-100"}`}>{t}</div>
            ))}
          </div>
        </div>
        <div className="flex ml-20 gap-0 shrink-0">
          {["Jan", "Feb", "Mar", "Apr"].map((m) => (
            <div key={m} className="flex-1 text-[8px] text-[#97A0AF] font-semibold border-l border-gray-100 pl-1">{m}</div>
          ))}
        </div>
        <div className="space-y-2 flex-1">
          {rows.map((row, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-16 text-[9px] text-[#616D82] font-semibold text-right shrink-0">{row.label}</div>
              <div className="flex-1 h-6 bg-gray-100 rounded-md relative overflow-hidden">
                <div
                  className="absolute h-full rounded-md"
                  style={{ left: `${row.start}%`, width: `${row.width}%`, background: row.color, opacity: 0.85 }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-16 shrink-0" />
          <div className="flex-1 relative h-4">
            <div className="absolute h-full border-l-2 border-dashed border-brand-orange" style={{ left: "62%" }}>
              <div className="text-[8px] text-brand-orange font-bold whitespace-nowrap ml-1 -mt-0.5">Today</div>
            </div>
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

/** Mock for Zed AI copilot writing assist  -  textarea with toolbar */
export function MockWritingAssist() {
  return (
    <MockWindow bodyClassName="min-h-[240px]">
      <div className="space-y-3 flex-1 flex flex-col">
        <div className="flex items-center gap-2 flex-wrap">
          {["Improve", "Shorten", "Expand", "Suggest"].map((a, i) => (
            <div
              key={a}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${i === 0 ? "bg-brand-orange text-white border-brand-orange" : "bg-white border-gray-200 text-[#616D82]"}`}
            >
              {a}
            </div>
          ))}
        </div>
        <div className="flex-1 min-h-[120px] bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
          <div className="h-2 bg-gray-300 rounded w-full" />
          <div className="h-2 bg-gray-200 rounded w-[92%]" />
          <div className="h-2 bg-gray-200 rounded w-[80%]" />
          <div className="mt-4 pt-3 border-t border-dashed border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-brand-orange/20 flex items-center justify-center text-[8px] font-black text-brand-orange">Z</div>
              <div className="h-2 bg-brand-navy/20 rounded w-32" />
            </div>
            <div className="h-2 bg-brand-navy/10 rounded w-full" />
            <div className="h-2 bg-brand-navy/10 rounded w-[84%] mt-1" />
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

const mockComponents: Record<MockType, () => React.ReactElement> = {
  chat: MockChat,
  dashboard: MockDashboard,
  log: MockLog,
  annotation: MockAnnotation,
  list: MockList,
  schedule: MockSchedule,
  access: MockAccess,
  people: MockPeople,
  documents: MockDocuments,
  finance: MockFinance,
  supply: MockSupply,
  reports: MockReports,
  inspection: MockInspection,
  settings: MockSettings,
};

export function ProductMockByType({ type, showChrome = true }: { type: MockType; showChrome?: boolean }) {
  const C = mockComponents[type];
  return (
    <MockShowChromeContext.Provider value={showChrome}>
      <C />
    </MockShowChromeContext.Provider>
  );
}

export const productMockComponents = mockComponents;
