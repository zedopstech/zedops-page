type DashboardKpisProps = {
  kpis: {
    label: string;
    value: string;
    description?: string;
    items?: { label: string; value: string }[];
  }[];
};

const colClassByCount: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

export default function DashboardKpis({ kpis }: DashboardKpisProps) {
  const colClass = colClassByCount[Math.min(kpis.length, 5)] ?? "lg:grid-cols-5";

  return (
    <div className={`grid grid-cols-2 overflow-hidden rounded-xl border border-gray-100 bg-white sm:grid-cols-3 ${colClass}`}>

      {kpis.map((kpi, index) => (
        <div
          key={kpi.label}
          className={`
            px-3 py-3
            sm:px-4
            ${index < kpis.length - 1
              ? "border-b border-gray-100 lg:border-b-0 lg:border-r"
              : ""}
          `}
        >
          <p className="text-[9px] font-bold tracking-wide text-[#5E6C84]">
            {kpi.label}
          </p>

          <p className="mt-1 text-xl font-extrabold text-[#172B4D] sm:text-2xl">
            {kpi.value}
          </p>

          {kpi.description && (
            <p className="mt-0.5 text-[9px] text-[#8993A4]">
              {kpi.description}
            </p>
          )}

          {kpi.items && (
            <div className="mt-2 space-y-1 border-t border-gray-100 pt-2">
              {kpi.items.map((it) => (
                <div
                  key={it.label}
                  className="flex items-center justify-between text-[9px]"
                >
                  <span className="text-[#5E6C84]">{it.label}</span>
                  <span className="font-bold text-[#172B4D]">{it.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

    </div>
  );
}
