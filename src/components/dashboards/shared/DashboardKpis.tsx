type DashboardKpisProps = {
  kpis: {
    label: string;
    value: string;
    description: string;
  }[];
};

export default function DashboardKpis({ kpis }: DashboardKpisProps) {
  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-gray-100 bg-white sm:grid-cols-3 lg:grid-cols-5">

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
          <p className="text-[9px] font-bold tracking-wide text-[#7A869A]">
            {kpi.label}
          </p>

          <p className="mt-1 text-xl font-extrabold text-[#172B4D] sm:text-2xl">
            {kpi.value}
          </p>

          <p className="mt-0.5 text-[9px] text-[#8993A4]">
            {kpi.description}
          </p>
        </div>
      ))}

    </div>
  );
}
