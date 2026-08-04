import { AlertTriangle, CheckCircle2, Clock, Send, Sparkles, Maximize2, Download, ChevronDown, Plus } from "lucide-react";

function PieChart({ open }: { open: number }) {
  const r = 38;
  const cx = 52;
  const cy = 52;
  const circumference = 2 * Math.PI * r;
  const openDash = (open / 100) * circumference;
  const closedDash = circumference - openDash;
  return (
    <svg width="104" height="104" viewBox="0 0 104 104" className="block">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#172B4D" strokeWidth="18" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#4B9EFF" strokeWidth="18"
        strokeDasharray={`${closedDash} ${openDash}`}
        strokeDashoffset={0}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      <circle cx={cx} cy={cy} r={26} fill="#fff" />
    </svg>
  );
}

const recentActivities = [
  { text: "Material Request MRQ-20002-2026", action: "deleted", by: "Admin", badge: "deleted", badgeColor: "bg-red-100 text-red-600" },
  { text: "Material Request MRQ-20002-2026", action: "created", by: "Admin", badge: "created", badgeColor: "bg-green-100 text-green-700" },
  { text: "Created Daily Log for Dubai Mall Expansion", action: "created", by: "Admin", badge: "created", badgeColor: "bg-green-100 text-green-700" },
  { text: "Material Request MRQ-20002-2026", action: "deleted", by: "Admin", badge: "deleted", badgeColor: "bg-red-100 text-red-600" },
];

const statCards = [
  { label: "ACTIVE PROJECTS", val: "8", sub: "In progress", iconBg: "bg-[#172B4D]", icon: "🏗" },
  { label: "ON TRACK", val: "5", sub: "Projects", iconBg: "bg-teal-500", icon: "✓" },
  { label: "SAFETY INCIDENTS", val: "2", sub: "Needs attention", iconBg: "bg-amber-400", icon: "⚠" },
  { label: "ISSUES", val: "2", sub: "Open", iconBg: "bg-red-400", icon: "△" },
  { label: "TASKS", val: "3", sub: "Active tasks", iconBg: "bg-teal-600", icon: "☑" },
  { label: "MATERIAL REQUESTS", val: "−", sub: "Pending", iconBg: "bg-gray-400", icon: "▤" },
];

const barChart = [
  { label: "On Going", h: 100, count: 5, color: "#172B4D" },
  { label: "Bidding", h: 20, count: 1, color: "#17B8A6" },
  { label: "On Hold", h: 16, count: 1, color: "#F59E0B" },
  { label: "Completed", h: 12, count: 1, color: "#374151" },
  { label: "Others", h: 10, count: 1, color: "#9CA3AF" },
];

export default function DashboardMockup() {
  return (
    <div
      className="min-h-[min(480px,72vh)] h-[min(62vh,580px)] min-w-0 max-w-full overflow-hidden rounded-[10px] bg-[#F8FAFC] font-sans text-[#172B4D] shadow-[0_24px_48px_-28px_rgba(23,43,77,0.2)] ring-1 ring-[#172B4D]/10 md:h-[640px] md:min-h-[640px] md:rounded-md md:shadow-none md:ring-0"
    >

      {/* Top navbar */}
      <div className="flex min-h-10 min-w-0 items-center overflow-hidden bg-[#111827] px-2.5 py-0 sm:min-h-[40px] sm:px-3">
        <div className="mr-2 flex shrink-0 items-center gap-2 sm:mr-4">
          <img src="/ICON.jpg" alt="ZedOps" className="h-6 w-6 shrink-0 object-cover sm:h-7 sm:w-7" style={{ borderRadius: 6 }} />
        </div>
        {/* Project selector */}
        <div className="mr-2 flex min-w-0 shrink cursor-pointer items-center gap-1 bg-white/10 px-2 py-1 hover:bg-white/15 sm:mr-4 sm:shrink-0 sm:px-2.5" style={{ borderRadius: 6 }}>
          <span className="truncate text-[11px] font-semibold text-white/90 sm:text-xs">Dubai Mall</span>
          <ChevronDown size={11} className="shrink-0 text-white/60" />
        </div>
        {/* Nav tabs: desktop row; mobile peek */}
        <div className="ml-auto flex max-md:mr-2 md:mx-0 md:min-w-0 md:flex-1 md:items-center md:gap-0">
          <div className="hidden min-w-0 flex-1 items-center gap-0 overflow-x-auto md:flex [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {["Core", "Project", "Finance", "Supply Chain", "Daily Logs"].map((nav, i) => (
              <div key={nav} className={`flex shrink-0 cursor-pointer items-center gap-1 px-3 py-2.5 text-[11px] font-medium whitespace-nowrap transition-colors ${i === 0 ? "border-b border-white text-white" : "text-white/50 hover:text-white/75"}`}>
                {nav}
                {i < 4 && <ChevronDown size={9} className="text-white/40" />}
              </div>
            ))}
          </div>
          <span className="rounded-md bg-white/10 px-2 py-1 text-[9px] font-bold text-white/80 md:hidden">Workspace</span>
        </div>
        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="flex cursor-pointer items-center gap-1 bg-brand-orange px-2 py-1 sm:px-2.5" style={{ borderRadius: 6 }}>
            <Sparkles size={10} className="text-white" />
            <span className="text-[9px] font-bold text-white sm:text-[10px]">Zed AI</span>
          </div>
          <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#3B82F6] sm:h-6 sm:w-6">
            <span className="text-[10px] font-bold text-white">A</span>
          </div>
        </div>
      </div>

      {/* Main area: column on mobile for readable density */}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row" style={{ height: "calc(100% - 40px)" }}>

        {/* Primary workspace */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
          {/* Greeting */}
          <div className="flex flex-col gap-2 border-b border-gray-100 px-3 pb-2.5 pt-2.5 sm:flex-row sm:items-start sm:justify-between sm:px-4 sm:pt-3">
            <div className="min-w-0">
              <h2 className="text-[13px] font-bold leading-tight text-[#111827] sm:text-sm">Good morning! 👋</h2>
              <p className="mt-0.5 text-[9px] leading-snug text-[#6B778C] sm:text-[10px]">Here's what's happening with your projects today.</p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5 sm:justify-start">
              <button
                type="button"
                className="hidden rounded-md border border-gray-200 bg-white px-2.5 py-1 text-[10px] font-medium text-[#42526E] hover:bg-gray-50 sm:inline-flex sm:items-center sm:gap-1"
                style={{ borderRadius: 6 }}
              >
                View all projects
              </button>
              <button className="flex items-center gap-1 rounded-md bg-[#172B4D] px-2.5 py-1 text-[9px] font-bold text-white sm:text-[10px]" style={{ borderRadius: 6 }} type="button">
                <Plus size={10} />
                New
              </button>
            </div>
          </div>

          {/* Stat cards: 2×3 on phone, 3×2 on sm, full strip on lg */}
          <div className="grid shrink-0 grid-cols-2 gap-px border-b border-gray-100 bg-gray-100 sm:grid-cols-3 lg:grid-cols-6">
            {statCards.map(({ label, val, sub, iconBg, icon }) => (
              <div key={label} className="bg-white px-2.5 py-2 sm:px-3 sm:py-2.5">
                <div className="mb-1 flex items-start justify-between gap-1">
                  <span className="text-[7px] font-bold uppercase leading-tight tracking-wide text-[#97A0AF] sm:text-[8px]">{label}</span>
                  <div className={`ml-1 flex h-5 w-5 shrink-0 items-center justify-center text-[9px] text-white sm:h-5 sm:w-5 ${iconBg}`} style={{ borderRadius: 4 }}>
                    {icon}
                  </div>
                </div>
                <div className="text-lg font-black leading-none text-[#111827] sm:text-xl">{val}</div>
                <div className="mt-0.5 text-[7px] text-[#97A0AF] sm:text-[8px]">{sub}</div>
              </div>
            ))}
          </div>

          {/* Chart + activities */}
          <div className="flex min-h-0 flex-1 flex-col gap-px overflow-hidden bg-gray-100 lg:flex-row">
            {/* Bar chart */}
            <div className="min-h-0 min-w-0 flex-1 overflow-hidden bg-white px-3 py-2.5 sm:px-4 sm:py-3">
              <div className="mb-1 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[11px] font-bold leading-tight text-[#111827] sm:text-xs">Project status</div>
                  <div className="text-[8px] text-[#97A0AF]">By current phase</div>
                </div>
                <button type="button" className="shrink-0 text-[9px] font-medium text-[#3B82F6]">View ↗</button>
              </div>
              <div className="mt-1 flex gap-1 sm:mt-2" style={{ height: 72 }}>
                <div className="flex flex-col justify-between pb-3 mr-0.5 w-2.5 sm:mr-1 sm:w-3">
                  {[8, 6, 4, 2, 0].map((v) => (
                    <span key={v} className="text-[6px] leading-none text-[#C7D5F5] sm:text-[7px]">
                      {v}
                    </span>
                  ))}
                </div>
                <div className="flex flex-1 items-end gap-1 border-b border-l border-gray-100 pb-3 sm:gap-2">
                  {barChart.map(({ label, h, color }) => (
                    <div key={label} className="flex min-w-0 flex-1 flex-col items-center gap-0.5 sm:gap-1">
                      <div className="w-full rounded-t-[2px]" style={{ height: `${h}%`, background: color, minHeight: 4 }} />
                      <span className="w-full truncate text-center text-[6px] leading-tight text-[#97A0AF] sm:text-[7px]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-1 grid grid-cols-5 gap-1 sm:gap-2">
                {barChart.map(({ count, label, color }) => (
                  <div key={label} className="min-w-0 text-center">
                    <div className="text-[8px] font-bold sm:text-[9px]" style={{ color }}>{count}</div>
                    <div className="truncate text-[6px] text-[#C7D5F5] sm:text-[7px]">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="max-h-[140px] min-h-0 w-full shrink-0 overflow-hidden border-t border-gray-100 bg-white px-3 py-2 sm:max-h-none lg:h-auto lg:w-[220px] lg:border-l lg:border-t-0 lg:py-3">
              <div className="mb-1.5 flex items-center justify-between sm:mb-2">
                <div>
                  <div className="text-[11px] font-bold text-[#111827] sm:text-xs">Recent activity</div>
                  <div className="text-[8px] text-[#97A0AF]">Latest</div>
                </div>
                <Clock size={11} className="text-[#C7D5F5]" />
              </div>
              <div className="space-y-1.5 overflow-hidden sm:space-y-2">
                {recentActivities.map((act, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#3B82F6] sm:h-5 sm:w-5 ">
                      <span className="text-[7px] font-bold text-white sm:text-[8px]">A</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[7px] leading-snug text-[#42526E] sm:text-[8px]">
                        <span className="line-clamp-2 sm:line-clamp-none sm:truncate sm:block">{act.text}</span>
                        <span className="text-[#97A0AF]"> · {act.by}</span>{" "}
                        <span className={`inline-flex items-center px-1 py-0.5 text-[6px] font-semibold sm:text-[7px] ${act.badgeColor}`}>{act.badge}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Zed Copilot panel */}
        <div className="flex max-h-[200px] min-h-0 w-full shrink-0 flex-col overflow-hidden border-t border-gray-100 bg-white min-[480px]:max-h-[220px] lg:max-h-none lg:w-[240px] lg:border-l lg:border-t-0">
          {/* Copilot header */}
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-brand-orange flex items-center justify-center" style={{ borderRadius: 4 }}>
                <Sparkles size={10} className="text-white" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#111827]">Zed Copilot</div>
                <div className="text-[8px] text-[#97A0AF]">Copilot · insights & actions</div>
              </div>
            </div>
            <Maximize2 size={11} className="text-[#C7D5F5] cursor-pointer hover:text-[#6B778C]" />
          </div>

          {/* Scrollable copilot content */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2.5 min-h-0">
            {/* Pie chart */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-bold text-[#6B778C] uppercase tracking-wide">Snag Status Distribution</span>
                <Download size={10} className="text-[#C7D5F5]" />
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="shrink-0 scale-[0.82] origin-left sm:scale-100">
                  <PieChart open={67} />
                </div>
                <div className="flex min-w-0 flex-col gap-1.5 sm:gap-2">
                  <div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-sm bg-[#172B4D]" />
                      <span className="text-[9px] text-[#42526E] font-medium">Open 67%</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-sm bg-[#4B9EFF]" />
                      <span className="text-[9px] text-[#42526E] font-medium">Closed 33%</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="text-[9px] text-[#3B82F6] font-semibold mt-1">View Snags →</button>
            </div>

            <div className="border-t border-gray-100" />

            {/* Suggested */}
            <div>
              <p className="text-[8px] text-[#97A0AF] font-semibold mb-1.5">Suggested:</p>
              <div className="flex flex-wrap gap-1">
                {["My tasks", "Today's log", "Project overview"].map((s) => (
                  <button key={s} className="px-2 py-1 text-[8px] bg-gray-100 text-[#42526E] font-medium hover:bg-gray-200 border border-gray-200" style={{ borderRadius: 12 }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Insights / Action tabs */}
            <div>
              <div className="flex border-b border-gray-100 mb-2">
                <button className="text-[9px] font-bold text-[#172B4D] pb-1.5 border-b-2 border-[#172B4D] pr-3">Insights</button>
                <button className="text-[9px] text-[#97A0AF] pb-1.5 pl-3">Action</button>
              </div>
              <div className="space-y-1.5">
                {[
                  { label: "📊 Project Risk Summary", color: "bg-blue-50 border-blue-100 text-blue-700" },
                  { label: "🔴 Safety Issues", color: "bg-red-50 border-red-100 text-red-600" },
                  { label: "📅 Today's Schedule", color: "bg-brand-orange/10 border-brand-orange/20 text-brand-orange" },
                ].map(({ label, color }) => (
                  <button key={label} className={`w-full text-left text-[8px] font-semibold px-2 py-1.5 border ${color} hover:opacity-80 transition-opacity`} style={{ borderRadius: 6 }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat input */}
          <div className="flex-shrink-0 border-t border-gray-100 p-2">
            <div className="flex items-center gap-2 border border-gray-200 px-2 py-1.5 bg-gray-50" style={{ borderRadius: 6 }}>
              <input
                readOnly
                placeholder="What would you like to do?"
                className="flex-1 bg-transparent text-[9px] text-[#6B778C] placeholder-gray-400 outline-none min-w-0"
              />
              <button className="w-5 h-5 bg-[#172B4D] flex items-center justify-center flex-shrink-0" style={{ borderRadius: 6 }}>
                <Send size={9} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
