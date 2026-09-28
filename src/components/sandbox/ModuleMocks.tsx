import {
  Calendar,
  ChevronRight,
  CloudSun,
  FileText,
  Folder,
  FolderOpen,
  Image,
  Lock,
  Users,
} from "lucide-react";

/**
 * Bespoke mini product mocks for the module preview (illustrative UI chrome only).
 * Kept deliberately quiet: hairline borders, white surfaces, one orange accent.
 */

function WindowChrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-[#E6EAF0] px-4 py-2.5">
      <span className="flex gap-1">
        <span className="h-2 w-2 rounded-full bg-[#E6EAF0]" />
        <span className="h-2 w-2 rounded-full bg-[#E6EAF0]" />
        <span className="h-2 w-2 rounded-full bg-[#E6EAF0]" />
      </span>
      <span className="ml-2 text-[11px] font-semibold text-[#97A0AF]">
        {label}
      </span>
    </div>
  );
}

export function DocumentsMock() {
  const folders = ["Contracts", "Submittals", "Photos", "Correspondence"];
  const files = [
    { name: "Contract_Rev-C.pdf", tag: "Final", on: true },
    { name: "Contract_Rev-B.pdf", tag: "v2", on: false },
    { name: "Contract_Rev-A.pdf", tag: "v1", on: false },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-[#E6EAF0] bg-white shadow-[0_20px_40px_-24px_rgba(23,43,77,0.35)]">
      <WindowChrome label="Documents" />
      <div className="grid grid-cols-[38%_62%]">
        <ul className="space-y-0.5 border-r border-[#E6EAF0] p-2.5">
          {folders.map((f, i) => (
            <li
              key={f}
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] font-semibold ${
                i === 0 ? "bg-[#FFF1E8] text-brand-navy" : "text-[#616D82]"
              }`}
            >
              {i === 0 ? (
                <FolderOpen size={13} className="shrink-0 text-brand-orange" />
              ) : (
                <Folder size={13} className="shrink-0 text-[#97A0AF]" />
              )}
              <span className="truncate">{f}</span>
            </li>
          ))}
        </ul>
        <div className="p-2.5">
          <p className="mb-2 flex items-center gap-1 px-1 text-[10px] font-semibold text-[#97A0AF]">
            Project <ChevronRight size={10} /> Contracts
          </p>
          <ul className="space-y-1.5">
            {files.map((f) => (
              <li
                key={f.name}
                className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 ${
                  f.on
                    ? "border-brand-orange/30 bg-white"
                    : "border-[#EEF1F5] bg-[#FAFBFC]"
                }`}
              >
                <FileText
                  size={13}
                  className={f.on ? "text-brand-orange" : "text-[#97A0AF]"}
                />
                <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-brand-navy">
                  {f.name}
                </span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                    f.on
                      ? "bg-[#E8F6EE] text-[#1E9E5A]"
                      : "bg-[#F1F3F6] text-[#97A0AF]"
                  }`}
                >
                  {f.tag}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2.5 flex items-center gap-1.5 px-1 text-[10px] font-medium text-[#97A0AF]">
            <Lock size={10} /> Permission-checked
          </p>
        </div>
      </div>
    </div>
  );
}

export function DailyLogMock() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E6EAF0] bg-white shadow-[0_20px_40px_-24px_rgba(23,43,77,0.35)]">
      <WindowChrome label="Daily log" />
      <div className="p-3.5">
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E6EAF0] bg-[#F5F7FB] px-2.5 py-1 text-[10px] font-semibold text-brand-navy">
            <Calendar size={11} className="text-brand-orange" /> Today
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-orange/30 bg-[#FFF1E8] px-2.5 py-1 text-[10px] font-semibold text-brand-navy">
            <FolderOpen size={11} className="text-brand-orange" /> Select
            project
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: CloudSun, label: "Weather" },
            { icon: Users, label: "Crew" },
            { icon: Image, label: "Photos" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="rounded-xl border border-[#EEF1F5] bg-[#FAFBFC] p-2"
            >
              <Icon size={13} className="text-[#616D82]" />
              <p className="mt-1 text-[10px] font-semibold text-[#616D82]">
                {label}
              </p>
              <span className="mt-1.5 block h-1.5 w-3/4 rounded-full bg-[#E6EAF0]" />
            </div>
          ))}
        </div>
        <div className="mt-2.5 space-y-1.5 rounded-xl border border-[#EEF1F5] p-2.5">
          <span className="block h-1.5 w-full rounded-full bg-[#E6EAF0]" />
          <span className="block h-1.5 w-5/6 rounded-full bg-[#E6EAF0]" />
          <span className="block h-1.5 w-2/3 rounded-full bg-[#E6EAF0]" />
        </div>
        <div className="mt-3 flex justify-end">
          <span className="rounded-full bg-brand-navy px-3 py-1 text-[10px] font-bold text-white">
            Submit
          </span>
        </div>
      </div>
    </div>
  );
}
