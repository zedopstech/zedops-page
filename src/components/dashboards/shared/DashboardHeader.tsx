import { Download, MoreVertical, Plus } from "lucide-react";

type DashboardHeaderProps = {
  title: string;
  subtitle: string;
};

export default function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <div className="mb-3 flex items-center justify-between gap-4">

      <div>
        <h2 className="text-xl font-extrabold tracking-tight text-[#172B4D] sm:text-2xl">
          {title}
        </h2>

        <p className="mt-0.5 text-xs text-[#616D82]">
          {subtitle}
        </p>
      </div>

      <div className="hidden items-center gap-2 sm:flex">

        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-[#172B4D]"
        >
          <Plus size={13} />
          New Activity
        </button>

        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-[#172B4D]"
        >
          <Download size={13} />
          Export
        </button>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-[#172B4D]"
        >
          <MoreVertical size={16} />
        </button>

      </div>
    </div>
  );
}
