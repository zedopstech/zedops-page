import { ChevronDown, Sparkles } from "lucide-react";

type DashboardNavbarProps = {
  projectName: string;
  accent?: string;
  activeTab?: string;
};

export default function DashboardNavbar({
  projectName,
  accent = "bg-white",
  activeTab = "Core",
}: DashboardNavbarProps) {
  const baseTabs = ["Core", "Project", "Finance", "Supply Chain", "Daily Logs"];
  const tabs = baseTabs.includes(activeTab) ? baseTabs : [activeTab, ...baseTabs];

  return (
    <div className="flex h-12 items-center justify-between rounded-t-2xl bg-brand-navy px-3 text-white sm:px-4 lg:h-[54px] lg:px-5">

      <div className="flex min-w-0 items-center gap-3">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8EBEF]">
          <img src="/logo.png" alt="ZedOps Logo" className="w-8 h-8" />
        </div>

        <button
          type="button"
          className="flex shrink-0 items-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white"
        >
          {projectName}
          <ChevronDown size={12} className="text-white/60" />
        </button>

        <nav className="hidden items-center gap-5 md:flex">
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                type="button"
                className={`relative py-4 text-xs font-semibold ${
                  isActive ? "text-white" : "text-white/50"
                }`}
              >
                {tab}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] ${accent}`}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg bg-brand-orange px-3 py-2 text-[10px] font-bold text-white"
        >
          <Sparkles size={12} />
          <span className="hidden sm:inline">Zed AI</span>
        </button>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3578E5] text-xs font-bold">
          A
        </div>
      </div>
    </div>
  );
}
