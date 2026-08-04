import { CalendarDays, FileText, Inbox, ListChecks, Lock, Package, PieChart, Users, Zap } from "lucide-react";

/** Inferred layout family from marketing copy - structure only; all labels/metrics come from {@link buildFeatureMockContent}. */
export type FeatureMiniUiKind =
  | "ai"
  | "security"
  | "permissions"
  | "analytics"
  | "statusMix"
  | "taskList"
  | "inbox"
  | "schedule"
  | "finance"
  | "inventory"
  | "documents"
  | "directory"
  | "form"
  | "report"
  | "fieldLog"
  | "heatmap";

const FALLBACK_ROTATION: FeatureMiniUiKind[] = ["heatmap", "statusMix", "analytics", "inbox", "schedule", "form"];

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

function hashPickKind(text: string): FeatureMiniUiKind {
  return FALLBACK_ROTATION[Math.abs(hashCode(text)) % FALLBACK_ROTATION.length];
}

export function inferFeatureMiniUiKind(name: string, summary: string, detail: string): FeatureMiniUiKind {
  const corpus = `${name} ${summary} ${detail}`;
  const t = corpus.toLowerCase();

  if (/\b(zed ai|copilot|in-product ai|\bai\b|assistant)\b/.test(t)) return "ai";
  if (/\b(auth|sign-?in|sign in|session|token|login|password|multi-tenant app)\b/.test(t)) return "security";
  if (/\b(roles?\s*&\s*permissions|permission|role flags|access control)\b/.test(t) && !/\btime card\b/.test(t)) {
    return "permissions";
  }
  if (/\b(chart|analytic|trend|rollup|dashboard|kpi|metric|performance)\b/.test(t)) return "analytics";
  if (/\b(rfi|submittal|correspondence|transmittal|inbox)\b/.test(t)) return "inbox";
  if (/\b(inspection|punch list|punch\b|checklist|audit|qhse|closeout|near-miss|incident)\b/.test(t)) return "taskList";
  if (/\b(schedule|calendar|gantt|timeline|planning|milestone)\b/.test(t)) return "schedule";
  if (/\b(budget|cost|finance|payment|invoice|ledger|variance|payable|commercial)\b/.test(t)) return "finance";
  if (/\b(material|equipment|warehouse|inventory|procurement|supply chain|delivery)\b/.test(t)) return "inventory";
  if (/\b(document|pdf|drawing|bim|information management)\b/.test(t)) return "documents";
  if (/\b(directory|people|contact|employees|person)\b/.test(t)) return "directory";
  if (/\b(time card|hours|payroll|timesheet)\b/.test(t)) return "form";
  if (/\b(report|export|pack|board-ready|deck)\b/.test(t)) return "report";
  if (/\b(daily log|field log|observation|photo|work log|survey)\b/.test(t)) return "fieldLog";
  if (/\b(status|phase|mix|by status)\b/.test(t)) return "statusMix";
  if (/\b(library|hub|\btabs?\b|reference data|estimate)\b/.test(t)) return "heatmap";
  if (/\b(all projects|manage project|project list|portfolio of)\b/.test(t)) return "heatmap";

  return hashPickKind(name + summary);
}

/** Per-feature derived copy + numbers (deterministic from props) - not generic placeholder text. */
type FeatureMockContent = {
  seed: string;
  eyebrow: string;
  lines: [string, string, string];
  summaryClip: string;
  nameClip: string;
  /** 0–100 */
  pctA: number;
  pctB: number;
  barHeights: number[];
  financeMain: string;
  financeSub: string;
  varianceStr: string;
  pseudoTimes: [string, string, string];
  docTags: [string, string, string];
};

function clampStr(s: string, max: number): string {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

function splitIntoChunks(text: string): string[] {
  return text
    .split(/(?:\n+|(?<=[.!?])\s+|;\s+)/)
    .map((s) => s.trim().replace(/\s+/g, " "))
    .filter((s) => s.length >= 5);
}

function commaChunks(text: string): string[] {
  return text
    .split(/,\s*/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 8 && s.length < 120);
}

/** Pull up to three short, feature-specific lines from name / summary / detail. */
function buildLines(name: string, summary: string, detail: string): [string, string, string] {
  const seen = new Set<string>();
  const push = (arr: string[], s: string) => {
    const k = s.toLowerCase();
    if (seen.has(k)) return;
    seen.add(k);
    arr.push(clampStr(s, 54));
  };

  const out: string[] = [];
  for (const s of splitIntoChunks(detail)) {
    if (out.length >= 5) break;
    push(out, s);
  }
  for (const s of splitIntoChunks(summary)) {
    if (out.length >= 5) break;
    push(out, s);
  }
  if (out.length < 3) {
    for (const s of commaChunks(detail)) {
      if (out.length >= 5) break;
      push(out, s);
    }
  }
  if (out.length < 3) {
    for (const s of commaChunks(summary)) {
      if (out.length >= 5) break;
      push(out, s);
    }
  }
  if (!out.length) {
    push(out, summary.trim() || detail.trim() || name);
  }
  while (out.length < 3) {
    const extra = name.split(/[-–·|,]/).map((p) => p.trim()).filter((p) => p.length >= 4);
    for (const p of extra) {
      if (out.length >= 3) break;
      push(out, p);
    }
    if (out.length >= 3) break;
    push(out, name);
  }

  return [out[0] ?? name, out[1] ?? out[0] ?? summary, out[2] ?? out[1] ?? detail].map((s) =>
    clampStr(s, 54),
  ) as [string, string, string];
}

function eyebrowFromName(name: string): string {
  const head = (name.split(/[-–·|]/)[0] ?? name).trim();
  return clampStr(head, 26).toUpperCase();
}

function initialsFromLine(line: string): string {
  const words = line.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w));
  const a = (words[0]?.match(/[A-Za-z0-9]/)?.[0] ?? "?").toUpperCase();
  const b = (words[1]?.match(/[A-Za-z0-9]/)?.[0] ?? words[0]?.[1] ?? "?").toUpperCase();
  return `${a}${b}`.slice(0, 2);
}

function pickFinanceFigure(summary: string, detail: string, seed: string): string {
  const corpus = `${summary} ${detail}`;
  const m = corpus.match(/[\$£€]\s*[\d,.]+[kKmMbB]?|[\d,.]+\s*(?:%|k|m|K|M)\b/);
  if (m) return clampStr(m[0].replace(/\s+/g, ""), 14);
  const n = 30 + (Math.abs(hashCode(seed + ":€")) % 470);
  return `£${(n / 10).toFixed(1)}m`;
}

function varianceFromSeed(seed: string): { label: string; positive: boolean } {
  const b = Math.abs(hashCode(seed + ":var")) % 100;
  const v = (1 + (b % 7)) + (b % 10) * 0.1;
  const positive = b % 3 === 0;
  return { label: `${positive ? "+" : "−"}${v.toFixed(1)}%`, positive };
}

function buildFeatureMockContent(name: string, summary: string, detail: string): FeatureMockContent {
  const seed = `${name}\n${summary}\n${detail}`;
  const lines = buildLines(name, summary, detail);
  const h = hashCode(seed);
  const pctA = 62 + (Math.abs(h) % 34);
  const pctB = 50 + (Math.abs(hashCode(seed + ":b")) % 45);
  const barHeights = Array.from({ length: 8 }, (_, i) => 28 + (Math.abs(hashCode(`${seed}:${i}`)) % 62));
  const financeMain = pickFinanceFigure(summary, detail, seed);
  const financeSub = clampStr(summary || lines[0], 44);
  const variance = varianceFromSeed(seed);
  const pseudoTimes: [string, string, string] = [
    `${10 + (Math.abs(h) % 8)}:0${Math.abs(hashCode(seed + "t0")) % 10}`,
    `${12 + (Math.abs(hashCode(seed + "t1")) % 6)}:${String(10 + (Math.abs(h) % 49)).padStart(2, "0")}`,
    `${14 + (Math.abs(hashCode(seed + "t2")) % 4)}:${String(20 + (Math.abs(h) % 39)).padStart(2, "0")}`,
  ];
  const tagPool = ["PDF", "IFC", "XLSX", "CSV", "DOCX"] as const;
  const docTags: [string, string, string] = [
    tagPool[Math.abs(hashCode(seed + "d0")) % tagPool.length],
    tagPool[Math.abs(hashCode(seed + "d1")) % tagPool.length],
    tagPool[Math.abs(hashCode(seed + "d2")) % tagPool.length],
  ];

  return {
    seed,
    eyebrow: eyebrowFromName(name),
    lines,
    summaryClip: clampStr(summary, 72),
    nameClip: clampStr(name, 40),
    pctA,
    pctB,
    barHeights,
    financeMain,
    financeSub,
    varianceStr: variance.label,
    pseudoTimes,
    docTags,
  };
}

/** Hero-style floating card shell - matches `Hero.tsx` chip cards. */
function FloatSurface({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full max-w-[300px] rounded-lg border border-gray-200/90 bg-white p-4 shadow-[0_18px_50px_-20px_rgba(23,43,77,0.22)] sm:max-w-[320px] sm:p-[18px]"
      style={{ borderRadius: 10 }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="mb-3 block text-[10px] font-bold uppercase tracking-wider text-[#97A0AF]">{children}</span>;
}

function FloatingAi({ c }: { c: FeatureMockContent }) {
  const userLine = clampStr(c.summaryClip || c.lines[0], 64);
  return (
    <FloatSurface>
      <Eyebrow>{c.eyebrow || "ASSISTANT"}</Eyebrow>
      <div className="space-y-2.5">
        <div className="flex gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange text-[10px] font-black text-white">
            Z
          </div>
          <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md border border-gray-100 bg-[#F8FAFC] px-3 py-2">
            <div className="mb-1.5 flex items-center gap-1">
              <Zap size={10} className="shrink-0 text-brand-orange" />
              <div className="h-1.5 min-w-0 flex-1 rounded-full bg-brand-orange/15" />
            </div>
            <p className="text-[8px] font-semibold leading-snug text-[#42526E]">{clampStr(c.lines[0], 120)}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-[#172B4D] px-3 py-2">
            <p className="text-[8px] font-semibold leading-snug text-white/90">{userLine}</p>
          </div>
        </div>
      </div>
    </FloatSurface>
  );
}

function FloatingSecurity({ c }: { c: FeatureMockContent }) {
  const flags = [true, false, true].map((_, i) => Math.abs(hashCode(`${c.seed}:sec${i}`)) % 4 !== 0);
  const rows = c.lines.map((label, i) => ({ label, ok: flags[i] ?? true }));
  return (
    <FloatSurface>
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <div className="space-y-2.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <Lock size={12} className="shrink-0 text-[#172B4D]/60" />
              <span className="truncate text-[9px] font-semibold text-[#42526E]">{row.label}</span>
            </div>
            <span
              className={`shrink-0 rounded px-1.5 py-0.5 text-[8px] font-bold ${
                row.ok ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"
              }`}
            >
              {row.ok ? "OK" : "Review"}
            </span>
          </div>
        ))}
      </div>
    </FloatSurface>
  );
}

function FloatingPermissions({ c }: { c: FeatureMockContent }) {
  const tones = ["full", "limited", "full"] as const;
  const rows = c.lines.map((label, i) => ({ label, tone: tones[i % tones.length] }));
  return (
    <FloatSurface>
      <Eyebrow>{clampStr(`Access · ${c.nameClip}`, 28)}</Eyebrow>
      <div className="space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-2 rounded-md bg-[#F8FAFC] px-2 py-1.5">
            <span className="min-w-0 truncate text-[9px] font-semibold text-[#42526E]">{row.label}</span>
            <span
              className={`shrink-0 rounded px-1.5 py-0.5 text-[8px] font-bold ${
                row.tone === "full" ? "bg-[#172B4D] text-white" : "border border-gray-200 bg-white text-[#6B778C]"
              }`}
            >
              {row.tone === "full" ? "Full" : "Scoped"}
            </span>
          </div>
        ))}
      </div>
    </FloatSurface>
  );
}

function FloatingAnalytics({ c }: { c: FeatureMockContent }) {
  return (
    <FloatSurface>
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-gray-100 bg-[#F8FAFC] px-2 py-2">
          <div className="text-lg font-black leading-none text-[#172B4D]">{c.pctA}%</div>
          <div className="mt-0.5 text-[8px] font-semibold text-[#6B778C]">{clampStr(c.lines[0], 28)}</div>
        </div>
        <div className="rounded-lg border border-gray-100 bg-[#F8FAFC] px-2 py-2">
          <div className="text-lg font-black leading-none text-[#172B4D]">{c.pctB}%</div>
          <div className="mt-0.5 text-[8px] font-semibold text-[#6B778C]">{clampStr(c.lines[1], 28)}</div>
        </div>
      </div>
      <div className="flex h-12 items-end gap-1">
        {c.barHeights.map((height, i) => (
          <div
            key={`${c.seed}:bar:${i}`}
            className="flex-1 rounded-t"
            style={{
              height: `${height}%`,
              background: i === (Math.abs(hashCode(c.seed)) % 8) ? "#FE5D02" : "#172B4D",
              opacity: i === (Math.abs(hashCode(c.seed)) % 8) ? 1 : 0.2 + (i % 5) * 0.12,
            }}
          />
        ))}
      </div>
    </FloatSurface>
  );
}

const STATUS_PALETTES = [
  { bg: "#E8F0FE", fg: "#0747A6" },
  { bg: "#172B4D", fg: "#fff" },
  { bg: "#FFF4E5", fg: "#974F00" },
  { bg: "#E3FCEF", fg: "#006644" },
] as const;

function FloatingStatusMix({ c }: { c: FeatureMockContent }) {
  const pills = c.lines.map((label, i) => ({
    label: clampStr(label.split(/[.]/)[0] ?? label, 16),
    ...STATUS_PALETTES[i % STATUS_PALETTES.length],
  }));
  return (
    <FloatSurface>
      <Eyebrow>{clampStr(c.summaryClip || c.eyebrow, 24)}</Eyebrow>
      <div className="flex flex-wrap gap-1.5">
        {pills.map((p) => (
          <span
            key={`${p.label}-${p.fg}`}
            className="rounded-md px-2 py-1 text-[9px] font-bold"
            style={{ background: p.bg, color: p.fg }}
          >
            {p.label}
          </span>
        ))}
      </div>
      <div className="mt-3 space-y-1.5 border-t border-gray-100 pt-3">
        {c.lines.map((line, i) => (
          <div key={`${line}-${i}`} className="flex items-center justify-between gap-2">
            <span className="truncate text-[9px] font-semibold text-[#42526E]">{clampStr(line, 32)}</span>
            <span className="h-1.5 w-12 shrink-0 rounded-full bg-gray-100">
              <span
                className="block h-full rounded-full bg-[#0052CC]"
                style={{ width: `${42 + (Math.abs(hashCode(`${c.seed}:mix:${i}`)) % 48)}%` }}
              />
            </span>
          </div>
        ))}
      </div>
    </FloatSurface>
  );
}

function FloatingTaskList({ c }: { c: FeatureMockContent }) {
  const done = c.lines.map((_, i) => Math.abs(hashCode(`${c.seed}:chk:${i}`)) % 3 !== 0);
  return (
    <FloatSurface>
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <div className="space-y-2">
        {c.lines.map((t, i) => (
          <div key={`${t}-${i}`} className="flex items-start gap-2">
            <ListChecks
              size={14}
              className={`mt-0.5 shrink-0 ${done[i] ? "text-emerald-600" : "text-[#C7D5F5]"}`}
            />
            <div className="min-w-0 flex-1">
              <div
                className={`text-[9px] font-semibold leading-tight ${done[i] ? "text-[#6B778C] line-through decoration-gray-300" : "text-[#172B4D]"}`}
              >
                {t}
              </div>
              <div className="mt-1 h-1 w-full max-w-[140px] rounded-full bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </FloatSurface>
  );
}

function FloatingInbox({ c }: { c: FeatureMockContent }) {
  const isNew = c.lines.map((_, i) => Math.abs(hashCode(`${c.seed}:in:${i}`)) % 2 === 0);
  return (
    <FloatSurface>
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <div className="space-y-2">
        {c.lines.map((title, i) => (
          <div key={`${title}-${i}`} className="flex items-start gap-2 rounded-lg border border-gray-100 bg-[#F8FAFC] px-2 py-1.5">
            <Inbox size={12} className="mt-0.5 shrink-0 text-[#0052CC]" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                {isNew[i] && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0052CC]" />}
                <span className="truncate text-[9px] font-bold text-[#172B4D]">{title}</span>
              </div>
              <div className="mt-1 flex gap-0.5">
                <div className="h-1 flex-1 rounded-full bg-gray-200/80" />
                <div className="h-1 w-8 rounded-full bg-gray-200/60" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </FloatSurface>
  );
}

function FloatingSchedule({ c }: { c: FeatureMockContent }) {
  const weekHint = clampStr(c.summaryClip || c.lines[0], 24);
  const busyIdx = Math.abs(hashCode(c.seed + ":cal")) % 5;
  return (
    <FloatSurface>
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <div className="mb-2 flex items-center gap-1 text-[8px] font-bold uppercase tracking-wide text-[#97A0AF]">
        <CalendarDays size={11} className="text-[#172B4D]" />
        <span>{weekHint}</span>
      </div>
      <div className="flex gap-1">
        {["M", "T", "W", "T", "F"].map((d, i) => (
          <div key={`${d}-${i}`} className="flex-1 text-center">
            <div className="text-[8px] font-bold text-[#6B778C]">{d}</div>
            <div className="mt-1 flex min-h-[44px] flex-col justify-end gap-0.5 rounded-md bg-[#F8FAFC] p-1">
              {i === busyIdx && (
                <>
                  <div className="h-2 rounded-sm bg-brand-orange" />
                  <div className="h-1.5 rounded-sm bg-[#172B4D]/25" />
                </>
              )}
              {i === (busyIdx + 2) % 5 && <div className="h-2.5 rounded-sm bg-[#0052CC]/35" />}
            </div>
          </div>
        ))}
      </div>
    </FloatSurface>
  );
}

function FloatingFinance({ c }: { c: FeatureMockContent }) {
  const variance = varianceFromSeed(c.seed);
  const barW = 40 + (Math.abs(hashCode(c.seed + ":fw")) % 55);
  return (
    <FloatSurface>
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <div className="text-2xl font-black leading-none tracking-tight text-[#172B4D]">{c.financeMain}</div>
      <div className="mt-1 text-[9px] font-semibold text-[#6B778C]">{c.financeSub}</div>
      <div
        className={`mt-3 flex items-center gap-2 rounded-lg px-2 py-1.5 ${
          variance.positive ? "bg-amber-50" : "bg-emerald-50"
        }`}
      >
        <div className={`text-[10px] font-black ${variance.positive ? "text-amber-800" : "text-emerald-700"}`}>
          {c.varianceStr}
        </div>
        <div
          className={`text-[8px] font-semibold leading-tight ${variance.positive ? "text-amber-900" : "text-emerald-800"}`}
        >
          {clampStr(c.lines[2] ?? c.lines[1], 36)}
        </div>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div className="h-1.5 rounded-full bg-brand-orange" style={{ width: `${barW}%` }} />
      </div>
    </FloatSurface>
  );
}

function FloatingInventory({ c }: { c: FeatureMockContent }) {
  const pcts = c.lines.map((_, i) => 35 + (Math.abs(hashCode(`${c.seed}:inv:${i}`)) % 58));
  return (
    <FloatSurface>
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <div className="space-y-2">
        {c.lines.map((sku, i) => (
          <div key={`${sku}-${i}`} className="flex items-center gap-2">
            <Package size={12} className="shrink-0 text-[#172B4D]/70" />
            <div className="min-w-0 flex-1">
              <div className="flex justify-between gap-1">
                <span className="truncate text-[9px] font-semibold text-[#42526E]">{sku}</span>
                <span className="shrink-0 text-[8px] font-bold text-[#172B4D]">{pcts[i]}%</span>
              </div>
              <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-gray-100">
                <div className="h-1 rounded-full bg-[#0052CC]" style={{ width: `${pcts[i]}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </FloatSurface>
  );
}

function FloatingDocuments({ c }: { c: FeatureMockContent }) {
  return (
    <FloatSurface>
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <div className="space-y-2">
        {c.lines.map((fileName, i) => (
          <div key={`${fileName}-${i}`} className="flex items-center gap-2">
            <FileText size={14} className="shrink-0 text-[#0747A6]" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[9px] font-bold text-[#172B4D]">{fileName}</div>
            </div>
            <span className="shrink-0 rounded border border-gray-200 bg-white px-1 py-0.5 text-[7px] font-bold text-[#6B778C]">
              {c.docTags[i % 3]}
            </span>
          </div>
        ))}
      </div>
    </FloatSurface>
  );
}

const ROLE_HINTS = ["Client", "Consultant", "Contractor", "Partner", "Supplier"] as const;

function FloatingDirectory({ c }: { c: FeatureMockContent }) {
  return (
    <FloatSurface>
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <div className="space-y-2">
        {c.lines.map((line, i) => (
          <div key={`${line}-${i}`} className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EBF0FF] text-[9px] font-black text-[#172B4D]">
              {initialsFromLine(line)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[9px] font-bold text-[#172B4D]">{clampStr(line, 36)}</div>
              <div className="text-[8px] font-semibold text-[#97A0AF]">
                {ROLE_HINTS[Math.abs(hashCode(`${c.seed}:role:${i}`)) % ROLE_HINTS.length]}
              </div>
            </div>
            <Users size={12} className="shrink-0 text-[#C7D5F5]" />
          </div>
        ))}
      </div>
    </FloatSurface>
  );
}

function FloatingForm({ c }: { c: FeatureMockContent }) {
  const hint = clampStr(c.lines[0], 48);
  const hint2 = clampStr(c.lines[1], 48);
  return (
    <FloatSurface>
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <div className="space-y-2">
        <div className="flex min-h-7 items-center rounded-md border border-gray-200 bg-white px-2 py-1">
          <span className="text-[8px] font-medium text-[#6B778C]">{hint}</span>
        </div>
        <div className="flex min-h-7 items-center rounded-md border border-gray-200 bg-[#F8FAFC] px-2 py-1">
          <span className="text-[8px] font-medium text-[#42526E]">{hint2}</span>
        </div>
        <div className="mt-1 flex h-8 items-center justify-center rounded-md bg-brand-orange px-2">
          <span className="text-[8px] font-bold text-white/95">{clampStr(c.summaryClip || "Submit", 22)}</span>
        </div>
      </div>
    </FloatSurface>
  );
}

function FloatingReport({ c }: { c: FeatureMockContent }) {
  const a = 35 + (Math.abs(hashCode(c.seed + ":pie")) % 50);
  const b = 20 + (Math.abs(hashCode(c.seed + ":pie2")) % 35);
  return (
    <FloatSurface>
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <div className="flex items-center gap-3">
        <div
          className="relative h-14 w-14 shrink-0 rounded-full"
          style={{
            background: `conic-gradient(#172B4D 0 ${a}%, #FE5D02 ${a}% ${a + b}%, #E4E7EC ${a + b}% 100%)`,
          }}
        >
          <div className="absolute inset-1.5 rounded-full bg-white" />
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          {c.lines.map((label, i) => (
            <div key={`${label}-${i}`} className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  background: ["#172B4D", "#FE5D02", "#DFE1E6"][i % 3],
                }}
              />
              <span className="truncate text-[9px] font-semibold text-[#42526E]">{clampStr(label, 32)}</span>
            </div>
          ))}
        </div>
        <PieChart size={18} className="shrink-0 text-[#97A0AF]" />
      </div>
    </FloatSurface>
  );
}

function FloatingFieldLog({ c }: { c: FeatureMockContent }) {
  return (
    <FloatSurface>
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <div className="space-y-2 border-l-2 border-[#EBF0FF] pl-2.5">
        {c.lines.map((line, i) => (
          <div key={`${line}-${i}`}>
            <div className="text-[8px] font-bold text-[#0052CC]">{c.pseudoTimes[i]}</div>
            <div className="text-[9px] font-semibold leading-snug text-[#42526E]">{line}</div>
          </div>
        ))}
      </div>
    </FloatSurface>
  );
}

function FloatingHeatmap({ c }: { c: FeatureMockContent }) {
  const tone = ["bg-[#E8F0FE]", "bg-[#172B4D]/15", "bg-brand-orange/35"];
  const n = 20;
  return (
    <FloatSurface>
      <Eyebrow>{clampStr(c.summaryClip || c.eyebrow, 26)}</Eyebrow>
      <div className="grid grid-cols-5 gap-1 sm:grid-cols-5">
        {Array.from({ length: n }, (_, i) => {
          const v = Math.abs(hashCode(`${c.seed}:heat:${i}`)) % 3;
          return <div key={`${c.seed}:cell:${i}`} className={`aspect-square rounded ${tone[v]}`} />;
        })}
      </div>
      <div className="mt-2 flex justify-between gap-2 text-[8px] font-bold text-[#97A0AF]">
        <span className="truncate">{clampStr(c.lines[0], 20)}</span>
        <span className="shrink-0">→</span>
        <span className="truncate text-right">{clampStr(c.lines[1], 20)}</span>
      </div>
    </FloatSurface>
  );
}

function FloatingUiByKind({ kind, c }: { kind: FeatureMiniUiKind; c: FeatureMockContent }) {
  switch (kind) {
    case "ai":
      return <FloatingAi c={c} />;
    case "security":
      return <FloatingSecurity c={c} />;
    case "permissions":
      return <FloatingPermissions c={c} />;
    case "analytics":
      return <FloatingAnalytics c={c} />;
    case "statusMix":
      return <FloatingStatusMix c={c} />;
    case "taskList":
      return <FloatingTaskList c={c} />;
    case "inbox":
      return <FloatingInbox c={c} />;
    case "schedule":
      return <FloatingSchedule c={c} />;
    case "finance":
      return <FloatingFinance c={c} />;
    case "inventory":
      return <FloatingInventory c={c} />;
    case "documents":
      return <FloatingDocuments c={c} />;
    case "directory":
      return <FloatingDirectory c={c} />;
    case "form":
      return <FloatingForm c={c} />;
    case "report":
      return <FloatingReport c={c} />;
    case "fieldLog":
      return <FloatingFieldLog c={c} />;
    case "heatmap":
      return <FloatingHeatmap c={c} />;
    default:
      return <FloatingHeatmap c={c} />;
  }
}

/**
 * Floating UI preview driven by this card’s copy: sentences become rows, the title sets the eyebrow,
 * and metrics/patterns are seeded from the same text so two different features don’t look identical.
 */
export function PlatformModuleFeatureMiniMock({
  name,
  summary,
  detail,
}: {
  name: string;
  summary: string;
  detail: string;
}) {
  const kind = inferFeatureMiniUiKind(name, summary, detail);
  const c = buildFeatureMockContent(name, summary, detail);

  return (
    <div className="pointer-events-none select-none">
      <div className="flex min-h-[200px] items-center justify-center py-4 sm:min-h-[240px] sm:py-6">
        <FloatingUiByKind kind={kind} c={c} />
      </div>
    </div>
  );
}
