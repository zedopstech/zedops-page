import type { ReactNode } from "react";
import { MockWindow } from "@/components/ProductMocks";

/** Content-aligned mocks for built-for-you persona feature rows */
export type PersonaMockScenario =
  | "gc-project-hub"
  | "gc-daily-log"
  | "gc-planning"
  | "gc-qhse"
  | "owners-portfolio"
  | "owners-finance"
  | "owners-documents"
  | "owners-governance"
  | "pm-schedule-tasks"
  | "pm-quality"
  | "pm-zed-ai"
  | "pm-docs-logs"
  | "consult-portfolio"
  | "consult-requests"
  | "consult-zed-ai"
  | "consult-exports";

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`text-[10px] font-bold text-[#172B4D] ${className}`}>{children}</span>;
}

export function PersonaFeatureMock({ scenario }: { scenario: PersonaMockScenario }) {
  switch (scenario) {
    case "gc-project-hub":
      return (
        <MockWindow bodyClassName="min-h-[280px]">
          <div className="space-y-4 flex-1 flex flex-col">
            <div>
              <Label>Riverside Tower</Label>
              <p className="text-[9px] text-[#97A0AF] mt-0.5">Project · Execution snapshot</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { k: "Equipment on site", v: "24", sub: "hrs logged" },
                { k: "Material lines", v: "12", sub: "this week" },
                { k: "Open issues", v: "5", sub: "2 urgent" },
              ].map((x) => (
                <div key={x.k} className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-3">
                  <div className="text-lg font-extrabold text-[#172B4D] leading-none">{x.v}</div>
                  <div className="text-[8px] font-semibold text-[#6B778C] mt-1 leading-tight">{x.k}</div>
                  <div className="text-[8px] text-[#97A0AF] mt-0.5">{x.sub}</div>
                </div>
              ))}
            </div>
            <div className="border border-gray-100 rounded-xl p-3 space-y-2 flex-1">
              <div className="flex justify-between items-center">
                <Label className="text-[9px] uppercase tracking-wide text-[#6B778C]">Surveys & logs</Label>
                <span className="text-[8px] text-green-600 font-bold">Live</span>
              </div>
              <div className="flex items-center gap-2 py-1.5 border-b border-gray-50">
                <div className="w-2 h-2 rounded-full bg-brand-orange" />
                <div className="flex-1 h-2 bg-gray-200 rounded" />
                <span className="text-[8px] text-[#97A0AF]">Survey due</span>
              </div>
              <div className="flex items-center gap-2 py-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div className="flex-1 h-2 bg-gray-200 rounded max-w-[75%]" />
                <span className="text-[8px] text-[#97A0AF]">Work log</span>
              </div>
            </div>
          </div>
        </MockWindow>
      );

    case "gc-daily-log":
      return (
        <MockWindow bodyClassName="min-h-[280px]">
          <div className="space-y-4 flex-1 flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-[#EBF0FF] border border-[#172B4D]/15 rounded-lg">
                <span className="text-[9px] font-bold text-[#172B4D]">Project</span>
                <span className="text-[9px] text-[#6B778C]">Riverside Tower ▾</span>
              </div>
              <span className="text-[10px] font-black text-brand-orange uppercase tracking-wider">Daily log</span>
            </div>
            <div>
              <span className="text-[9px] font-semibold text-[#6B778C] uppercase">Site photos</span>
              <div className="flex gap-2 mt-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-14 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-sm opacity-60" aria-hidden>
                    📷
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-[9px] text-[#6B778C] font-semibold">Crew / labour</span>
                <div className="h-9 mt-1 bg-gray-50 border border-gray-200 rounded-lg px-3 flex items-center">
                  <div className="h-2 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
              <div>
                <span className="text-[9px] text-[#6B778C] font-semibold">Progress & weather</span>
                <div className="h-14 mt-1 bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="h-2 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-2 bg-gray-200 rounded w-[70%]" />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-auto pt-2">
              <button type="button" className="flex-1 h-9 border border-gray-200 rounded-lg text-[9px] font-bold text-[#6B778C]">
                Save draft
              </button>
              <button type="button" className="px-4 h-9 bg-[#172B4D] rounded-lg text-[9px] font-bold text-white">
                Submit log
              </button>
            </div>
          </div>
        </MockWindow>
      );

    case "gc-planning":
      return (
        <MockWindow bodyClassName="min-h-[280px]">
          <div className="space-y-3 flex-1 flex flex-col">
            <div className="flex gap-2 border-b border-gray-100 pb-2">
              {["Estimate", "Schedule", "Tasks"].map((t, i) => (
                <span
                  key={t}
                  className={`text-[10px] font-bold px-2 py-1 rounded-md ${i === 1 ? "bg-[#172B4D] text-white" : "text-[#97A0AF]"}`}
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-[9px] text-[#97A0AF]">Library-linked cost structure · Baseline v3</p>
            <div className="space-y-2 flex-1">
              {[
                { label: "Earthworks", w: 32, c: "#22C55E" },
                { label: "Structure", w: 40, c: "#172B4D" },
                { label: "Envelope", w: 24, c: "#3B82F6" },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-2">
                  <span className="w-16 text-[8px] font-semibold text-[#6B778C] text-right shrink-0">{row.label}</span>
                  <div className="flex-1 h-5 bg-gray-100 rounded relative overflow-hidden">
                    <div className="absolute h-full rounded" style={{ width: `${row.w}%`, background: row.c, opacity: 0.85 }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-3">
              <div className="flex justify-between items-center mb-2">
                <Label className="text-[9px]">Task board</Label>
                <span className="text-[8px] font-bold text-[#0052CC]">14 open · 6 blocked</span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {["Submittal review", "RFI #12", "Shop drawings"].map((x) => (
                  <span key={x} className="text-[8px] px-2 py-1 bg-white border border-gray-200 rounded-md text-[#42526E] font-medium">
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </MockWindow>
      );

    case "gc-qhse":
      return (
        <MockWindow bodyClassName="min-h-[280px]">
          <div className="space-y-3 flex-1 flex flex-col">
            <div className="flex gap-3 border-b border-gray-100 pb-2 overflow-x-auto">
              {["Inspections", "Punch", "Incidents"].map((t, i) => (
                <span key={t} className={`text-[10px] font-bold whitespace-nowrap pb-1 ${i === 0 ? "text-[#172B4D] border-b-2 border-[#172B4D]" : "text-[#97A0AF]"}`}>
                  {t}
                </span>
              ))}
            </div>
            <p className="text-[9px] text-[#97A0AF]">Template: Concrete pour checklist · Linked to daily log</p>
            <div className="space-y-2 flex-1">
              {[
                { label: "Pre-pour inspection", st: "Action required", color: "bg-brand-orange/15 text-brand-orange" },
                { label: "Safety walk  -  Level 4", st: "Passed", color: "bg-green-100 text-green-800" },
                { label: "Punch item #88  -  MEP", st: "Open", color: "bg-gray-100 text-[#42526E]" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 bg-white">
                  <div className="h-2 bg-gray-300 rounded w-[45%]" />
                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full shrink-0 ${row.color}`}>{row.st}</span>
                </div>
              ))}
            </div>
          </div>
        </MockWindow>
      );

    case "owners-portfolio":
      return (
        <MockWindow bodyClassName="min-h-[280px]">
          <div className="space-y-4 flex-1 flex flex-col">
            <Label>Portfolio overview</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { v: "8", l: "Active jobs" },
                { v: "2", l: "Behind schedule" },
                { v: "1", l: "Budget flag" },
              ].map((x) => (
                <div key={x.l} className="text-center p-3 rounded-xl bg-[#F8FAFC] border border-gray-100">
                  <div className="text-xl font-extrabold text-[#172B4D]">{x.v}</div>
                  <div className="text-[8px] text-[#6B778C] font-semibold mt-1">{x.l}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2 flex-1">
              {["Riverside Tower", "Harbor logistics hub", "Midtown retrofit"].map((name, i) => (
                <div key={name} className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100">
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${i === 0 ? "bg-green-500" : i === 1 ? "bg-brand-orange" : "bg-[#172B4D]"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-[#172B4D] truncate">{name}</div>
                    <div className="h-1.5 bg-gray-100 rounded mt-1 w-full max-w-[180px]" />
                  </div>
                  <span className="text-[8px] text-[#97A0AF] shrink-0">Analytics on</span>
                </div>
              ))}
            </div>
          </div>
        </MockWindow>
      );

    case "owners-finance":
      return (
        <MockWindow bodyClassName="min-h-[280px]">
          <div className="space-y-4 flex-1 flex flex-col">
            <div>
              <Label>Budget · Riverside Tower</Label>
              <div className="mt-2 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#172B4D] rounded-full w-[78%]" />
              </div>
              <div className="flex justify-between text-[8px] text-[#97A0AF] mt-1">
                <span>Committed 78%</span>
                <span>Forecast to complete</span>
              </div>
            </div>
            <div className="space-y-2 border-t border-gray-100 pt-3">
              {[
                { t: "Budget revision", st: "Routed for approval", dot: "bg-blue-400" },
                { t: "Change order #14", st: "$240k pending", dot: "bg-brand-orange" },
                { t: "Payment request", st: "Due Friday", dot: "bg-green-500" },
                { t: "Direct vs indirect", st: "Cost types mapped", dot: "bg-gray-300" },
              ].map((row) => (
                <div key={row.t} className="flex items-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${row.dot}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] font-bold text-[#172B4D]">{row.t}</div>
                    <div className="text-[8px] text-[#97A0AF]">{row.st}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MockWindow>
      );

    case "owners-documents":
      return (
        <MockWindow bodyClassName="min-h-[280px]">
          <div className="flex gap-4 flex-1 min-h-0">
            <div className="w-[32%] shrink-0 border-r border-gray-100 pr-3 space-y-1">
              <span className="text-[9px] font-black text-[#97A0AF] uppercase">Folders</span>
              {["Drawings", "Contracts", "Reports", "Daily logs"].map((f, i) => (
                <div key={f} className={`text-[9px] font-semibold py-1.5 px-2 rounded-lg ${i === 2 ? "bg-[#EBF0FF] text-[#172B4D]" : "text-[#6B778C]"}`}>
                  {f}
                </div>
              ))}
            </div>
            <div className="flex-1 min-w-0 space-y-3">
              <Label>Board pack & PDFs</Label>
              <div className="space-y-2">
                {[
                  { n: "Monthly inspection summary.pdf", tag: "PDF" },
                  { n: "PO register  -  March.pdf", tag: "PDF" },
                  { n: "Goods receipt #442.pdf", tag: "PDF" },
                ].map((doc) => (
                  <div key={doc.n} className="flex items-center gap-2 p-2 rounded-lg border border-gray-100 bg-[#FAFBFC]">
                    <span className="text-[9px] font-black text-red-500 bg-red-50 px-1.5 py-0.5 rounded">{doc.tag}</span>
                    <span className="text-[9px] text-[#42526E] truncate font-medium">{doc.n}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-gray-100">
                <span className="text-[8px] font-bold text-[#0052CC]">Bulk export · CSV</span>
              </div>
            </div>
          </div>
        </MockWindow>
      );

    case "owners-governance":
      return (
        <MockWindow bodyClassName="min-h-[280px]">
          <div className="space-y-3 flex-1 flex flex-col">
            <Label>Roles & visibility</Label>
            <p className="text-[9px] text-[#97A0AF]">Same flags for menus, modules, and Zed AI</p>
            <div className="grid gap-2 flex-1">
              {[
                { role: "GC project team", access: "Full execution + cost detail", tone: "border-[#172B4D]/20 bg-[#172B4D]/5" },
                { role: "Owner / developer", access: "Portfolio, budget, CO, payments", tone: "border-blue-200 bg-blue-50/50" },
                { role: "Investor (read-only)", access: "Status & reports  -  no line POs", tone: "border-gray-200 bg-gray-50" },
              ].map((card) => (
                <div key={card.role} className={`rounded-xl border p-3 ${card.tone}`}>
                  <div className="text-[10px] font-extrabold text-[#172B4D]">{card.role}</div>
                  <div className="text-[8px] text-[#6B778C] mt-1 leading-relaxed">{card.access}</div>
                  <div className="flex gap-1 mt-2">
                    <span className="text-[7px] font-bold uppercase text-green-700 bg-green-100 px-1.5 py-0.5 rounded">Menus</span>
                    <span className="text-[7px] font-bold uppercase text-green-700 bg-green-100 px-1.5 py-0.5 rounded">AI</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MockWindow>
      );

    case "pm-schedule-tasks":
      return (
        <MockWindow bodyClassName="min-h-[280px]">
          <div className="space-y-3 flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <Label>Schedule + tasks</Label>
              <span className="text-[8px] font-bold bg-[#EBF0FF] text-[#172B4D] px-2 py-0.5 rounded-full">Linked to issues</span>
            </div>
            <div className="flex ml-14 gap-0 border-b border-gray-100 pb-1">
              {["W1", "W2", "W3", "W4"].map((w) => (
                <span key={w} className="flex-1 text-[8px] text-center text-[#97A0AF] font-semibold">
                  {w}
                </span>
              ))}
            </div>
            {[
              { label: "Foundations", w: 45, c: "#172B4D" },
              { label: "Steel delivery", w: 22, c: "#FE5D02" },
              { label: "MEP rough-in", w: 35, c: "#3B82F6" },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-2">
                <span className="w-12 text-[8px] font-semibold text-[#6B778C] text-right shrink-0">{row.label}</span>
                <div className="flex-1 h-4 bg-gray-100 rounded overflow-hidden">
                  <div className="h-full rounded" style={{ width: `${row.w}%`, background: row.c, opacity: 0.9 }} />
                </div>
              </div>
            ))}
            <div className="border border-gray-100 rounded-xl p-3 mt-2 bg-[#F8FAFC]">
              <span className="text-[9px] font-bold text-[#6B778C]">Task workflows</span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["Survey sign-off", "Issue #204", "Work log tie-in"].map((x) => (
                  <span key={x} className="text-[8px] px-2 py-1 bg-white border border-gray-200 rounded-md font-semibold text-[#172B4D]">
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </MockWindow>
      );

    case "pm-quality":
      return (
        <MockWindow bodyClassName="min-h-[280px]">
          <div className="space-y-3 flex-1 flex flex-col">
            <div className="flex gap-2 flex-wrap border-b border-gray-100 pb-2">
              {["Issues", "Inspections", "Punch", "Incidents"].map((t, i) => (
                <span key={t} className={`text-[9px] font-bold px-2 py-1 rounded-md ${i === 1 ? "bg-[#172B4D] text-white" : "text-[#97A0AF] bg-gray-50"}`}>
                  {t}
                </span>
              ))}
            </div>
            <p className="text-[9px] text-[#97A0AF]">Template: Fire stopping · Actions assigned</p>
            <div className="space-y-2 flex-1">
              {[
                { t: "Issue  -  ceiling deflection", st: "Follow-up Mon", color: "bg-red-50 text-red-700" },
                { t: "Inspection passed  -  Area B", st: "Logged to daily log", color: "bg-green-50 text-green-700" },
                { t: "Punch walkthrough", st: "12 items open", color: "bg-brand-orange/10 text-brand-orange" },
                { t: "Near-miss report", st: "Safety · closed", color: "bg-gray-100 text-[#42526E]" },
              ].map((row) => (
                <div key={row.t} className="flex items-center justify-between gap-2 p-2 rounded-xl border border-gray-100">
                  <span className="text-[9px] font-bold text-[#172B4D] truncate">{row.t}</span>
                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full shrink-0 ${row.color}`}>{row.st}</span>
                </div>
              ))}
            </div>
          </div>
        </MockWindow>
      );

    case "pm-zed-ai":
      return (
        <MockWindow bodyClassName="min-h-[280px]">
          <div className="flex gap-3 h-full flex-1 flex-col sm:flex-row min-h-0">
            <div className="w-full sm:w-[30%] shrink-0 space-y-1 border-b sm:border-b-0 sm:border-r border-gray-100 sm:pr-3 pb-3 sm:pb-0">
              <span className="text-[9px] font-black text-[#97A0AF] uppercase">Projects</span>
              {["Riverside", "Harbor", "Midtown"].map((p, i) => (
                <div key={p} className={`text-[9px] font-semibold py-1.5 px-2 rounded-lg ${i === 0 ? "bg-[#EBF0FF] text-[#172B4D]" : "text-[#97A0AF]"}`}>
                  {p}
                </div>
              ))}
            </div>
            <div className="flex-1 flex flex-col gap-2 min-w-0">
              <div className="flex gap-2 justify-end">
                <div className="bg-[#172B4D] rounded-2xl rounded-tr-sm px-3 py-2 max-w-[90%]">
                  <p className="text-[9px] text-white/90 leading-relaxed">Open punch items on Level 3?</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-brand-orange shrink-0 flex items-center justify-center text-[8px] font-black text-white">Z</div>
                <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl rounded-tl-sm p-3 flex-1">
                  <p className="text-[9px] text-[#42526E] leading-relaxed mb-2">3 open on Level 3  -  2 linked to RFI #18. Want a short owner summary, punch export, or a follow-up action started?</p>
                  <div className="flex gap-1">
                    <span className="text-[8px] font-bold text-[#0052CC] bg-[#EBF2FF] px-2 py-0.5 rounded">Tools</span>
                    <span className="text-[8px] text-[#97A0AF]">Issues · Punch</span>
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-2 border-t border-gray-100 flex gap-2">
                <div className="flex-1 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center px-2">
                  <span className="text-[8px] text-[#97A0AF]">Copilot: insights, reports, actions, writing assist…</span>
                </div>
              </div>
            </div>
          </div>
        </MockWindow>
      );

    case "pm-docs-logs":
      return (
        <MockWindow bodyClassName="min-h-[280px]">
          <div className="flex gap-3 flex-1 min-h-0">
            <div className="w-[28%] shrink-0 border-r border-gray-100 pr-2 space-y-1">
              <span className="text-[8px] font-black text-[#97A0AF] uppercase">Files</span>
              {["Specs", "Submittals", "RFIs", "Photos"].map((f) => (
                <div key={f} className="text-[8px] text-[#6B778C] py-1 truncate">
                  📁 {f}
                </div>
              ))}
            </div>
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-center justify-between">
                <Label>Daily log</Label>
                <span className="text-[8px] font-bold text-[#97A0AF]">Top bar · project context</span>
              </div>
              <div className="h-20 bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-[9px] text-[#97A0AF] font-medium">
                Drop files or dictate notes
              </div>
              <div className="flex gap-2">
                <span className="text-[8px] font-bold bg-gray-100 px-2 py-1 rounded">PDF report</span>
                <span className="text-[8px] font-bold bg-gray-100 px-2 py-1 rounded">Export</span>
              </div>
            </div>
          </div>
        </MockWindow>
      );

    case "consult-portfolio":
      return (
        <MockWindow bodyClassName="min-h-[280px]">
          <div className="flex gap-3 flex-1 min-h-0">
            <div className="w-[34%] shrink-0 border-r border-gray-100 pr-3 space-y-2">
              <span className="text-[9px] font-black text-[#97A0AF] uppercase">Clients</span>
              {[
                { n: "Apex Capital", nproj: "4 projects" },
                { n: "Harbor JV", nproj: "2 projects" },
                { n: "Metro REIT", nproj: "6 projects" },
              ].map((c, i) => (
                <div key={c.n} className={`p-2 rounded-xl border ${i === 0 ? "border-[#172B4D]/30 bg-[#EBF0FF]/50" : "border-gray-100"}`}>
                  <div className="text-[9px] font-extrabold text-[#172B4D]">{c.n}</div>
                  <div className="text-[8px] text-[#97A0AF]">{c.nproj}</div>
                </div>
              ))}
            </div>
            <div className="flex-1 space-y-3 min-w-0">
              <Label>Apex Capital · Live data</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-[#F8FAFC] border border-gray-100 text-center">
                  <div className="text-lg font-extrabold text-[#172B4D]">4</div>
                  <div className="text-[8px] text-[#6B778C]">Active</div>
                </div>
                <div className="p-2 rounded-lg bg-[#F8FAFC] border border-gray-100 text-center">
                  <div className="text-lg font-extrabold text-brand-orange">1</div>
                  <div className="text-[8px] text-[#6B778C]">At risk</div>
                </div>
              </div>
              <p className="text-[8px] text-[#97A0AF] leading-relaxed">Analytics · execution · finance hooks per tenant permissions</p>
            </div>
          </div>
        </MockWindow>
      );

    case "consult-requests":
      return (
        <MockWindow bodyClassName="min-h-[280px]">
          <div className="space-y-3 flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <Label>Request & correspondence</Label>
              <span className="text-[8px] font-bold text-white bg-[#172B4D] px-2 py-0.5 rounded-md">Dashboard</span>
            </div>
            <div className="space-y-2 flex-1">
              {[
                { type: "Material request", id: "#M-442", st: "Procurement", color: "bg-blue-50 text-blue-800" },
                { type: "Transfer", id: "#T-118", st: "Warehouse", color: "bg-purple-50 text-purple-800" },
                { type: "Purchase request", id: "#P-09", st: "Approval", color: "bg-brand-orange/10 text-brand-orange" },
                { type: "Reserve hold", id: "#R-03", st: "Inventory", color: "bg-gray-100 text-[#42526E]" },
              ].map((row) => (
                <div key={row.id} className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 bg-white">
                  <div>
                    <div className="text-[9px] font-bold text-[#172B4D]">{row.type}</div>
                    <div className="text-[8px] text-[#97A0AF]">{row.id}</div>
                  </div>
                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${row.color}`}>{row.st}</span>
                </div>
              ))}
            </div>
            <p className="text-[8px] text-[#97A0AF]">Aligns with POs & inventory when client uses supply chain in ZedOps</p>
          </div>
        </MockWindow>
      );

    case "consult-zed-ai":
      return (
        <MockWindow bodyClassName="min-h-[280px]">
          <div className="space-y-3 flex-1 flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-brand-orange">Zed AI</span>
              <span className="text-[8px] text-[#97A0AF]">Permissions = same as app</span>
            </div>
            <div className="flex gap-2 flex-1 min-h-0 flex-col sm:flex-row">
              <div className="flex-1 flex flex-col gap-2 min-h-[120px]">
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-brand-orange shrink-0 flex text-[8px] font-black text-white items-center justify-center">Z</div>
                  <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl rounded-tl-sm p-2 flex-1">
                    <p className="text-[9px] text-[#42526E]">Draft a weekly client update from last 7 days of activity.</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-[#172B4D] text-white text-[9px] px-3 py-2 rounded-xl rounded-tr-sm max-w-[85%]">Use only Apex Capital projects I can access.</div>
                </div>
              </div>
              <div className="sm:w-[42%] shrink-0 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-3 space-y-2">
                <span className="text-[8px] font-bold text-[#6B778C] uppercase">Writing assist</span>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 space-y-2">
                  <div className="h-2 bg-gray-200 rounded w-full" />
                  <div className="h-2 bg-gray-200 rounded w-[80%]" />
                  <div className="flex gap-1 flex-wrap">
                    {["Polish", "Shorter", "Tone"].map((a) => (
                      <span key={a} className="text-[7px] font-bold bg-white border border-gray-200 px-1.5 py-0.5 rounded text-[#6B778C]">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MockWindow>
      );

    case "consult-exports":
      return (
        <MockWindow bodyClassName="min-h-[280px]">
          <div className="space-y-3 flex-1 flex flex-col">
            <Label>PDF & bulk export</Label>
            <p className="text-[9px] text-[#97A0AF]">Same report types across clients  -  inspections, incidents, POs, GRN, movements…</p>
            <div className="space-y-2 flex-1">
              {[
                "Inspection report  -  Feb.pdf",
                "Incident log export.pdf",
                "PO #772 summary.pdf",
                "Material movement batch.pdf",
              ].map((name) => (
                <div key={name} className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 bg-[#FAFBFC]">
                  <span className="text-[9px] font-semibold text-[#172B4D] truncate pr-2">{name}</span>
                  <span className="text-[8px] font-bold text-red-600 shrink-0">PDF</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-[9px] font-bold text-[#172B4D]">Bulk export</span>
              <span className="text-[8px] font-bold bg-[#EBF0FF] text-[#0052CC] px-2 py-1 rounded">CSV · API</span>
            </div>
          </div>
        </MockWindow>
      );

    default: {
      const _exhaustive: never = scenario;
      return _exhaustive;
    }
  }
}
