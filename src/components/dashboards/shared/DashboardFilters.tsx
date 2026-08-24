import { SlidersHorizontal } from "lucide-react";

type DashboardFiltersProps = {
  children?: React.ReactNode;
};

export default function DashboardFilters({ children }: DashboardFiltersProps) {
  if (children) {
    return (
      <div className="flex items-center gap-2">
        {children}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-[#172B4D]"
      >
        <SlidersHorizontal size={13} />
        Filters
      </button>
    </div>
  );
}
