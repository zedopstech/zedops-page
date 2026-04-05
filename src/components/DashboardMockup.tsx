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
    <div className="font-sans text-[#172B4D] bg-[#F8FAFC] overflow-hidden" style={{ borderRadius: 6, height: 640 }}>

      {/* Top navbar */}
      <div className="bg-[#111827] flex items-center px-3 py-0" style={{ height: 40 }}>
        <div className="flex items-center gap-2 mr-4">
          <img src="/logo.png" alt="ZedOps" className="w-6 h-6 shrink-0 object-cover" style={{ borderRadius: 6 }} />
        </div>
        {/* Project selector */}
        <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 mr-4 cursor-pointer hover:bg-white/15" style={{ borderRadius: 6 }}>
          <span className="text-white/90 text-xs font-semibold truncate max-w-[110px]">Dubai Mall Expa...</span>
          <ChevronDown size={11} className="text-white/60 flex-shrink-0" />
        </div>
        {/* Nav tabs */}
        <div className="flex items-center gap-0 flex-1">
          {["Core", "Project", "Finance", "Supply Chain", "Daily Logs"].map((nav, i) => (
            <div key={nav} className={`px-3 py-2.5 text-[11px] font-medium cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1 ${i === 0 ? "text-white border-b border-white" : "text-white/50 hover:text-white/75"}`}>
              {nav}
              {i < 4 && <ChevronDown size={9} className="text-white/40" />}
            </div>
          ))}
        </div>
        {/* Right actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#F79625] px-2.5 py-1 cursor-pointer" style={{ borderRadius: 6 }}>
            <Sparkles size={10} className="text-white" />
            <span className="text-white text-[10px] font-bold">Zed AI</span>
          </div>
          <div className="w-6 h-6 rounded-full bg-[#3B82F6] flex items-center justify-center cursor-pointer">
            <span className="text-white text-[10px] font-bold">A</span>
          </div>
        </div>
      </div>

      {/* Main area */}
      <div className="flex" style={{ height: "calc(100% - 40px)" }}>

        {/* Left content */}
        <div className="flex-1 overflow-hidden bg-white flex flex-col">
          {/* Greeting */}
          <div className="px-4 pt-3 pb-2 flex items-start justify-between border-b border-gray-100">
            <div>
              <h2 className="text-sm font-bold text-[#111827]">Good morning! 👋</h2>
              <p className="text-[10px] text-gray-400 mt-0.5">Here's what's happening with your projects today.</p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button className="flex items-center gap-1 px-2.5 py-1 border border-gray-200 bg-white text-[10px] font-medium text-gray-600 hover:bg-gray-50" style={{ borderRadius: 6 }}>
                <span>View All Projects</span>
              </button>
              <button className="flex items-center gap-1 px-2.5 py-1 bg-[#172B4D] text-white text-[10px] font-bold" style={{ borderRadius: 6 }}>
                <Plus size={10} />
                <span>New Project</span>
              </button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-6 gap-px bg-gray-100 border-b border-gray-100 flex-shrink-0">
            {statCards.map(({ label, val, sub, iconBg, icon }) => (
              <div key={label} className="bg-white px-3 py-2.5">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-[8px] font-bold text-gray-400 tracking-wide leading-tight">{label}</span>
                  <div className={`w-5 h-5 flex items-center justify-center text-white text-[9px] flex-shrink-0 ml-1 ${iconBg}`} style={{ borderRadius: 4 }}>
                    {icon}
                  </div>
                </div>
                <div className="text-xl font-black text-[#111827] leading-none">{val}</div>
                <div className="text-[8px] text-gray-400 mt-0.5">{sub}</div>
              </div>
            ))}
          </div>

          {/* Bottom: Chart + Activities */}
          <div className="flex flex-1 overflow-hidden gap-px bg-gray-100 min-h-0">
            {/* Bar chart */}
            <div className="flex-1 bg-white px-4 py-3 overflow-hidden min-h-0">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <div className="text-xs font-bold text-[#111827]">Project Status Distribution</div>
                  <div className="text-[8px] text-gray-400">All projects by current status</div>
                </div>
                <button className="text-[9px] text-[#3B82F6] font-medium">View All ↗</button>
              </div>
              {/* Y-axis + bars */}
              <div className="flex gap-1 mt-2" style={{ height: 90 }}>
                {/* Y-axis labels */}
                <div className="flex flex-col justify-between pb-4 mr-1" style={{ width: 12 }}>
                  {[8, 6, 4, 2, 0].map(v => (
                    <span key={v} className="text-[7px] text-gray-300 text-right leading-none">{v}</span>
                  ))}
                </div>
                {/* Bars */}
                <div className="flex items-end gap-2 flex-1 pb-4 border-l border-b border-gray-100">
                  {barChart.map(({ label, h, color }) => (
                    <div key={label} className="flex flex-col items-center flex-1 min-w-0 gap-1">
                      <div className="w-full" style={{ height: `${h}%`, background: color, minHeight: 3 }} />
                      <span className="text-[7px] text-gray-400 truncate w-full text-center leading-tight">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Count row */}
              <div className="grid grid-cols-5 gap-2 mt-1">
                {barChart.map(({ count, label, color }) => (
                  <div key={label} className="text-center">
                    <div className="text-[9px] font-bold" style={{ color }}>{count}</div>
                    <div className="text-[7px] text-gray-300 truncate">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white px-3 py-3 overflow-hidden min-h-0" style={{ width: 220 }}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-xs font-bold text-[#111827]">Recent Activities</div>
                  <div className="text-[8px] text-gray-400">Latest updates</div>
                </div>
                <Clock size={11} className="text-gray-300" />
              </div>
              <div className="space-y-2 overflow-hidden">
                {recentActivities.map((act, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#3B82F6] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-[8px] font-bold">A</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] text-gray-600 leading-snug">
                        <span className="truncate block">{act.text}</span>
                        <span className="text-gray-400"> by {act.by}</span>
                        {" "}<span className={`inline-flex items-center px-1 py-0.5 text-[7px] font-semibold ${act.badgeColor}`}>{act.badge}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Zed Copilot panel */}
        <div className="bg-white border-l border-gray-100 flex flex-col overflow-hidden" style={{ width: 240 }}>
          {/* Copilot header */}
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-[#F79625] flex items-center justify-center" style={{ borderRadius: 4 }}>
                <Sparkles size={10} className="text-white" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#111827]">Zed Copilot</div>
                <div className="text-[8px] text-gray-400">Copilot · insights & actions</div>
              </div>
            </div>
            <Maximize2 size={11} className="text-gray-300 cursor-pointer hover:text-gray-500" />
          </div>

          {/* Scrollable copilot content */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2.5 min-h-0">
            {/* Pie chart */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Snag Status Distribution</span>
                <Download size={10} className="text-gray-300" />
              </div>
              <div className="flex items-center gap-3">
                <PieChart open={67} />
                <div className="flex flex-col gap-2">
                  <div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-sm bg-[#172B4D]" />
                      <span className="text-[9px] text-gray-600 font-medium">Open 67%</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-sm bg-[#4B9EFF]" />
                      <span className="text-[9px] text-gray-600 font-medium">Closed 33%</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="text-[9px] text-[#3B82F6] font-semibold mt-1">View Snags →</button>
            </div>

            <div className="border-t border-gray-100" />

            {/* Suggested */}
            <div>
              <p className="text-[8px] text-gray-400 font-semibold mb-1.5">Suggested:</p>
              <div className="flex flex-wrap gap-1">
                {["My tasks", "Today's log", "Project overview"].map((s) => (
                  <button key={s} className="px-2 py-1 text-[8px] bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 border border-gray-200" style={{ borderRadius: 12 }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Insights / Action tabs */}
            <div>
              <div className="flex border-b border-gray-100 mb-2">
                <button className="text-[9px] font-bold text-[#172B4D] pb-1.5 border-b-2 border-[#172B4D] pr-3">Insights</button>
                <button className="text-[9px] text-gray-400 pb-1.5 pl-3">Action</button>
              </div>
              <div className="space-y-1.5">
                {[
                  { label: "📊 Project Risk Summary", color: "bg-blue-50 border-blue-100 text-blue-700" },
                  { label: "🔴 Safety Issues", color: "bg-red-50 border-red-100 text-red-600" },
                  { label: "📅 Today's Schedule", color: "bg-orange-50 border-orange-100 text-orange-700" },
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
                className="flex-1 bg-transparent text-[9px] text-gray-500 placeholder-gray-400 outline-none min-w-0"
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
