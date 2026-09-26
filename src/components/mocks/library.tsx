import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, animate as animateValue, motion } from "framer-motion";
import { ArrowUp, Check, Clock, MapPin, Paperclip, Sparkles, X } from "lucide-react";
import { Canvas, cardCls, useLoop } from "@/components/home/mocks";

/**
 * Parameterised product mocks. Each pattern (board, table, chart, feed, drawing, approvals,
 * photos, KPIs, attendance, form, ask) renders on a fixed canvas and loops lightly while in
 * view; pages pass their own data so no two features show the same screen.
 */

export type Tone = "red" | "amber" | "green" | "blue" | "violet" | "slate" | "orange";
const toneChip: Record<Tone, string> = {
  red: "bg-[#FDECEC] text-[#B42B29]",
  amber: "bg-[#FEF4DE] text-[#8A5A00]",
  green: "bg-[#E8F6EE] text-[#1D7446]",
  blue: "bg-[#EAF1FF] text-[#2F5FD0]",
  violet: "bg-[#F1ECFE] text-[#6A42C2]",
  slate: "bg-[#EEF1F5] text-[#5E6C84]",
  orange: "bg-[#FFF1E8] text-[#C2410C]",
};
const toneDot: Record<Tone, string> = {
  red: "bg-[#E5484D]",
  amber: "bg-[#F5A524]",
  green: "bg-[#1D9A5B]",
  blue: "bg-[#3E7BFA]",
  violet: "bg-[#8B5CF6]",
  slate: "bg-[#A5AEBF]",
  orange: "bg-brand-orange",
};

const W = 520;
const H = 340;

function Chip({ tone, children }: { tone: Tone; children: ReactNode }) {
  return <span className={`inline-flex items-center rounded-[5px] px-1.5 py-0.5 text-[11px] font-medium whitespace-nowrap ${toneChip[tone]}`}>{children}</span>;
}

function Head({ title, meta, right }: { title: string; meta?: string; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#EDF0F5] px-4 py-3">
      <span className="min-w-0 truncate text-[14px] font-medium text-brand-navy">
        {title}
        {meta ? <span className="ml-1.5 font-normal text-[#8C97AB]">· {meta}</span> : null}
      </span>
      {right}
    </div>
  );
}

const fade = (run: boolean, delay: number, x = 0, y = 6) => ({
  initial: run ? { opacity: 0, x, y } : false,
  animate: { opacity: 1, x: 0, y: 0 },
  transition: { duration: 0.35, delay },
});

/* ---------------------------------------------------------------- Board */

export type BoardCard = { t: string; meta: string; tone?: Tone; tag?: string };
export function BoardMock({ title, meta, columns, move }: { title: string; meta?: string; columns: { name: string; cards: BoardCard[] }[]; move?: { from: number; to: number } }) {
  const { ref, cycle, animate } = useLoop(7000);
  const [moved, setMoved] = useState(!animate);
  useEffect(() => {
    if (!animate) return setMoved(true);
    setMoved(false);
    const id = window.setTimeout(() => setMoved(true), 1600);
    return () => window.clearTimeout(id);
  }, [cycle, animate]);
  const cols = columns.map((c) => ({ ...c, cards: [...c.cards] }));
  if (move && moved) {
    const card = cols[move.from]?.cards.shift();
    if (card) cols[move.to]?.cards.unshift({ ...card, tone: "green" });
  }
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div className={`${cardCls} h-[340px] overflow-hidden`}>
          <Head title={title} meta={meta} />
          <div className="grid gap-2.5 p-3" style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(0,1fr))` }}>
            {cols.map((col) => (
              <div key={col.name} className="rounded-lg bg-[#F5F7FA] p-2">
                <p className="mb-2 flex items-center justify-between px-1 text-[11.5px] font-medium text-[#6B778C]">
                  {col.name}
                  <span className="text-[#A5AEBF]">{col.cards.length}</span>
                </p>
                <div className="space-y-2">
                  <AnimatePresence initial={false}>
                    {col.cards.map((c) => (
                      <motion.div
                        key={c.t}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="rounded-md border border-[#E6EAF0] bg-white p-2.5"
                      >
                        <p className="text-[12.5px] leading-snug text-brand-navy">{c.t}</p>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <span className="truncate text-[11px] text-[#8C97AB]">{c.meta}</span>
                          {c.tag ? <Chip tone={c.tone ?? "slate"}>{c.tag}</Chip> : c.tone ? <span className={`h-2 w-2 rounded-full ${toneDot[c.tone]}`} /> : null}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Canvas>
    </div>
  );
}

/* ---------------------------------------------------------------- Table */

export type TableCell = string | { chip: string; tone: Tone };
export function TableMock({
  title, meta, cols, widths, rows, flip,
}: { title: string; meta?: string; cols: string[]; widths: string; rows: TableCell[][]; flip?: { row: number; col: number; to: TableCell } }) {
  const { ref, cycle, animate } = useLoop(7500);
  const [flipped, setFlipped] = useState(!animate);
  useEffect(() => {
    if (!animate) return setFlipped(true);
    setFlipped(false);
    const id = window.setTimeout(() => setFlipped(true), 1900);
    return () => window.clearTimeout(id);
  }, [cycle, animate]);
  const cell = (c: TableCell) => (typeof c === "string" ? <span className="truncate">{c}</span> : <Chip tone={c.tone}>{c.chip}</Chip>);
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div key={cycle} className={`${cardCls} overflow-hidden`}>
          <Head title={title} meta={meta} />
          <div className="grid gap-2 bg-[#FAFBFC] px-4 py-2 text-[11.5px] text-[#8C97AB]" style={{ gridTemplateColumns: widths }}>
            {cols.map((c) => <span key={c}>{c}</span>)}
          </div>
          {rows.map((r, i) => (
            <motion.div
              key={i}
              {...fade(animate, 0.1 + i * 0.1, -6, 0)}
              className={`grid items-center gap-2 border-t border-[#F1F3F7] px-4 py-2.5 text-[13px] text-brand-navy transition-colors duration-500 ${flip && flipped && flip.row === i ? "bg-[#FFF8F3]" : ""}`}
              style={{ gridTemplateColumns: widths }}
            >
              {r.map((c, k) => (
                <span key={k} className={`min-w-0 ${k > 0 && typeof c === "string" ? "text-[#6B778C]" : ""}`}>
                  {flip && flipped && flip.row === i && flip.col === k ? cell(flip.to) : cell(c)}
                </span>
              ))}
            </motion.div>
          ))}
        </div>
      </Canvas>
    </div>
  );
}

/* ---------------------------------------------------------------- Chart */

export function ChartMock({
  title, meta, kind, labels, series, note, unit = "",
}: { title: string; meta?: string; kind: "bars" | "line" | "stacked"; labels: string[]; series: { name: string; values: number[]; tone: "navy" | "orange" | "mist" }[]; note?: string; unit?: string }) {
  const { ref, cycle, animate } = useLoop(8000);
  const max = Math.max(...series.flatMap((s) => (kind === "stacked" ? s.values.map((_, i) => series.reduce((a, x) => a + (x.values[i] ?? 0), 0)) : s.values)));
  const color = { navy: "#172B4D", orange: "#FE5D02", mist: "#C9D2DF" } as const;
  const chartH = note ? 170 : 210;
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div key={cycle} className={`${cardCls} overflow-hidden`}>
          <Head
            title={title}
            meta={meta}
            right={
              <span className="flex items-center gap-3 text-[11px] text-[#8C97AB]">
                {series.map((s) => (
                  <span key={s.name} className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm" style={{ background: color[s.tone] }} />{s.name}</span>
                ))}
              </span>
            }
          />
          <div className="px-4 pt-4 pb-3">
            <div className="relative" style={{ height: chartH }}>
              {[0, 1, 2, 3].map((g) => (
                <div key={g} className="absolute inset-x-0 border-t border-dashed border-[#EDF0F5]" style={{ top: `${(g / 3) * 100}%` }} />
              ))}
              {kind === "line" ? (
                <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${labels.length - 1} ${max}`} preserveAspectRatio="none">
                  {series.map((s, si) => (
                    <motion.polyline
                      key={s.name}
                      fill="none"
                      stroke={color[s.tone]}
                      strokeWidth={2}
                      strokeDasharray={s.tone === "mist" ? "4 4" : undefined}
                      vectorEffect="non-scaling-stroke"
                      points={s.values.map((v, i) => `${i},${max - v}`).join(" ")}
                      initial={animate ? { pathLength: 0 } : false}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.1, delay: 0.2 + si * 0.2 }}
                    />
                  ))}
                </svg>
              ) : (
                <div className="absolute inset-0 flex items-end gap-2">
                  {labels.map((l, i) => (
                    <div key={l} className="flex h-full flex-1 items-end justify-center gap-1">
                      {kind === "stacked" ? (
                        <div className="flex h-full w-full max-w-[30px] flex-col-reverse">
                          {series.map((s, si) => (
                            <motion.div
                              key={s.name}
                              className="w-full origin-bottom first:rounded-b-[3px] last:rounded-t-[3px]"
                              style={{ height: `${((s.values[i] ?? 0) / max) * 100}%`, background: color[s.tone] }}
                              initial={animate ? { scaleY: 0 } : false}
                              animate={{ scaleY: 1 }}
                              transition={{ duration: 0.5, delay: 0.15 + i * 0.06 + si * 0.1 }}
                            />
                          ))}
                        </div>
                      ) : (
                        series.map((s, si) => (
                          <motion.div
                            key={s.name}
                            className="w-full max-w-[16px] origin-bottom rounded-t-[3px]"
                            style={{ height: `${((s.values[i] ?? 0) / max) * 100}%`, background: color[s.tone] }}
                            initial={animate ? { scaleY: 0 } : false}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.5, delay: 0.15 + i * 0.06 + si * 0.08 }}
                          />
                        ))
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-[#8C97AB]">
              {labels.map((l) => <span key={l} className="flex-1 text-center">{l}</span>)}
            </div>
            {note ? (
              <motion.p {...fade(animate, 1.3)} className="mt-3 flex items-center gap-2 rounded-lg border border-[#FFE0CC] bg-[#FFF6F0] px-3 py-2 text-[12.5px] text-brand-navy">
                <Sparkles size={13} className="shrink-0 text-brand-orange" />
                {note}
                {unit ? null : null}
              </motion.p>
            ) : null}
          </div>
        </div>
      </Canvas>
    </div>
  );
}

/* ---------------------------------------------------------------- Feed */

export type FeedItem = { who: string; text: string; time: string; tone: Tone; tag?: string };
export function FeedMock({ title, meta, items }: { title: string; meta?: string; items: FeedItem[] }) {
  const { ref, cycle, animate } = useLoop(8000);
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div key={cycle} className={`${cardCls} overflow-hidden`}>
          <Head title={title} meta={meta} right={<span className="flex items-center gap-1.5 text-[11px] text-[#1D7446]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1D9A5B]" />Live</span>} />
          <ul className="relative px-4 py-3">
            <span aria-hidden className="absolute top-5 bottom-5 left-[27px] w-px bg-[#EDF0F5]" />
            {items.map((it, i) => (
              <motion.li key={i} {...fade(animate, 0.2 + i * 0.35, 0, 8)} className="relative flex gap-3 py-2">
                <span className={`relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-white ${toneDot[it.tone]}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] leading-snug text-brand-navy">
                    <span className="font-medium">{it.who}</span> <span className="text-[#5E6C84]">{it.text}</span>
                  </p>
                  <p className="mt-0.5 flex items-center gap-2 text-[11.5px] text-[#8C97AB]">
                    <Clock size={11} />{it.time}{it.tag ? <Chip tone={it.tone}>{it.tag}</Chip> : null}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </Canvas>
    </div>
  );
}

/* ---------------------------------------------------------------- Drawing with markup */

export type Pin = { x: number; y: number; n: number; label: string; tone: Tone };
export function DrawingMock({ title, sheet, pins }: { title: string; sheet: string; pins: Pin[] }) {
  const { ref, cycle, animate } = useLoop(8000);
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div key={cycle} className={`${cardCls} overflow-hidden`}>
          <Head title={title} right={<span className="font-mono text-[11px] text-[#8C97AB]">{sheet}</span>} />
          <div className="grid grid-cols-[1fr_170px]">
            <div className="relative h-[290px] bg-[#F7F9FC]">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 340 290" fill="none" stroke="#B8C4D6" strokeWidth="1.2">
                <rect x="20" y="20" width="300" height="250" />
                <path d="M20 110 H170 V20 M170 110 V270 M170 180 H320 M250 180 V270 M90 110 V270" />
                <path d="M40 60 H150 M40 70 H150" stroke="#FE5D02" strokeDasharray="6 4" strokeWidth="1.6" />
                <path d="M200 60 H300 V150" stroke="#3E7BFA" strokeWidth="1.6" />
                <circle cx="120" cy="200" r="16" />
                <path d="M210 220 h24 v24 h-24z M275 220 h24 v24 h-24z" />
              </svg>
              {pins.map((p, i) => (
                <motion.span
                  key={p.n}
                  className={`absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[11px] font-semibold text-white shadow-[0_4px_10px_-4px_rgba(0,0,0,0.4)] ${toneDot[p.tone]}`}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  initial={animate ? { scale: 0 } : false}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.3 + i * 0.4 }}
                >
                  {p.n}
                </motion.span>
              ))}
            </div>
            <ul className="border-l border-[#EDF0F5] p-3">
              {pins.map((p, i) => (
                <motion.li key={p.n} {...fade(animate, 0.4 + i * 0.4, 6, 0)} className="flex items-start gap-2 border-b border-[#F1F3F7] py-2 text-[12px] leading-snug text-brand-navy last:border-0">
                  <span className={`mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9.5px] font-semibold text-white ${toneDot[p.tone]}`}>{p.n}</span>
                  {p.label}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Canvas>
    </div>
  );
}

/* ---------------------------------------------------------------- Approval chain */

export type Step = { who: string; role: string; note?: string };
export function ApprovalMock({ title, meta, amount, steps, done }: { title: string; meta?: string; amount?: string; steps: Step[]; done: number }) {
  const { ref, cycle, animate } = useLoop(8000);
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div key={cycle} className={`${cardCls} overflow-hidden`}>
          <Head title={title} meta={meta} right={amount ? <span className="text-[14px] font-medium text-brand-navy tabular-nums">{amount}</span> : undefined} />
          <ol className="px-5 py-4">
            {steps.map((s, i) => {
              const state = i < done ? "done" : i === done ? "active" : "todo";
              return (
                <motion.li key={s.who} {...fade(animate, 0.2 + i * 0.45)} className="relative flex gap-3 pb-5 last:pb-0">
                  {i < steps.length - 1 ? <span aria-hidden className={`absolute top-7 left-[13px] h-[calc(100%-20px)] w-px ${i < done ? "bg-[#1D9A5B]" : "bg-[#E3E8F0]"}`} /> : null}
                  <span
                    className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                      state === "done" ? "bg-[#1D9A5B] text-white" : state === "active" ? "border-2 border-brand-orange bg-white text-brand-orange" : "border border-[#DCE3ED] bg-white text-[#A5AEBF]"
                    }`}
                  >
                    {state === "done" ? <Check size={13} strokeWidth={3} /> : i + 1}
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="flex items-center justify-between gap-2 text-[13.5px] text-brand-navy">
                      <span><span className="font-medium">{s.who}</span> <span className="text-[#8C97AB]">· {s.role}</span></span>
                      <Chip tone={state === "done" ? "green" : state === "active" ? "orange" : "slate"}>{state === "done" ? "Approved" : state === "active" ? "Waiting" : "Next"}</Chip>
                    </p>
                    {s.note ? <p className="mt-1 text-[12px] text-[#8C97AB]">{s.note}</p> : null}
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Canvas>
    </div>
  );
}

/* ---------------------------------------------------------------- Photo log */

export type Photo = { src: string; caption: string; tag: string; tone: Tone; pos?: string };
export function PhotoLogMock({ title, meta, photos }: { title: string; meta?: string; photos: Photo[] }) {
  const { ref, cycle, animate } = useLoop(8000);
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div key={cycle} className={`${cardCls} overflow-hidden`}>
          <Head title={title} meta={meta} right={<span className="flex items-center gap-1 text-[11.5px] text-[#8C97AB]"><Paperclip size={12} />{photos.length} photos</span>} />
          <div className="grid grid-cols-3 gap-2.5 p-3">
            {photos.slice(0, 3).map((p, i) => (
              <motion.figure key={p.caption} {...fade(animate, 0.15 + i * 0.25)} className="overflow-hidden rounded-lg border border-[#EDF0F5]">
                <div className="relative h-[150px] bg-[#EEF1F5]">
                  <img src={p.src} alt="" className="h-full w-full object-cover" style={p.pos ? { objectPosition: p.pos } : undefined} loading="lazy" />
                  <span className="absolute top-2 left-2"><Chip tone={p.tone}>{p.tag}</Chip></span>
                </div>
                <figcaption className="px-2.5 py-2 text-[12px] leading-snug text-brand-navy">{p.caption}</figcaption>
              </motion.figure>
            ))}
          </div>
          <motion.p {...fade(animate, 1.1)} className="mx-3 mb-3 flex items-center gap-2 rounded-lg bg-[#F5F7FA] px-3 py-2 text-[12px] text-[#5E6C84]">
            <MapPin size={12} className="text-brand-orange" /> Geotagged to the drawing and linked to today’s log
          </motion.p>
        </div>
      </Canvas>
    </div>
  );
}

/* ---------------------------------------------------------------- KPI tiles */

export type Kpi = { label: string; value: number; prefix?: string; suffix?: string; decimals?: number; delta: string; tone: Tone; spark: number[] };
function useCount(to: number, cycle: number, run: boolean) {
  const [v, setV] = useState(run ? 0 : to);
  useEffect(() => {
    if (!run) return setV(to);
    const c = animateValue(0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: setV });
    return () => c.stop();
  }, [to, cycle, run]);
  return v;
}
function KpiTile({ k, cycle, run }: { k: Kpi; cycle: number; run: boolean }) {
  const v = useCount(k.value, cycle, run);
  const max = Math.max(...k.spark);
  const pts = k.spark.map((s, i) => `${(i / (k.spark.length - 1)) * 100},${30 - (s / max) * 26}`).join(" ");
  return (
    <div className="bg-white p-4">
      <p className="text-[12px] text-[#8C97AB]">{k.label}</p>
      <p className="mt-1.5 text-[26px] font-medium leading-none tracking-[-0.03em] text-brand-navy tabular-nums">
        {k.prefix}{v.toFixed(k.decimals ?? 0)}{k.suffix}
      </p>
      <div className="mt-2 flex items-center justify-between gap-2">
        <Chip tone={k.tone}>{k.delta}</Chip>
        <svg viewBox="0 0 100 32" className="h-6 w-20" preserveAspectRatio="none">
          <polyline points={pts} fill="none" stroke={k.tone === "red" ? "#E5484D" : k.tone === "green" ? "#1D9A5B" : "#172B4D"} strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  );
}
export function KpiMock({ title, meta, kpis }: { title: string; meta?: string; kpis: Kpi[] }) {
  const { ref, cycle, animate } = useLoop(8000);
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div className={`${cardCls} overflow-hidden`}>
          <Head title={title} meta={meta} />
          <div className="grid grid-cols-2 gap-px bg-[#EDF0F5]">
            {kpis.slice(0, 4).map((k) => <KpiTile key={k.label} k={k} cycle={cycle} run={animate} />)}
          </div>
        </div>
      </Canvas>
    </div>
  );
}

/* ---------------------------------------------------------------- Attendance grid */

export function AttendanceMock({ title, meta, people, days }: { title: string; meta?: string; people: { name: string; trade: string; marks: ("in" | "late" | "off" | "leave")[] }[]; days: string[] }) {
  const { ref, cycle, animate } = useLoop(8000);
  const cls = { in: "bg-[#1D9A5B]", late: "bg-[#F5A524]", off: "bg-[#EEF1F5]", leave: "bg-[#8B5CF6]" } as const;
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div key={cycle} className={`${cardCls} overflow-hidden`}>
          <Head
            title={title}
            meta={meta}
            right={
              <span className="flex items-center gap-2.5 text-[11px] text-[#8C97AB]">
                {(["in", "late", "leave"] as const).map((m) => <span key={m} className="flex items-center gap-1"><span className={`h-2 w-2 rounded-sm ${cls[m]}`} />{m === "in" ? "On site" : m === "late" ? "Late" : "Leave"}</span>)}
              </span>
            }
          />
          <div className="px-4 py-3">
            <div className="grid items-center gap-1.5 pb-2 text-[11px] text-[#8C97AB]" style={{ gridTemplateColumns: `150px repeat(${days.length}, 1fr)` }}>
              <span />
              {days.map((d) => <span key={d} className="text-center">{d}</span>)}
            </div>
            {people.map((p, i) => (
              <div key={p.name} className="grid items-center gap-1.5 border-t border-[#F1F3F7] py-2" style={{ gridTemplateColumns: `150px repeat(${days.length}, 1fr)` }}>
                <span className="min-w-0 truncate text-[12.5px] text-brand-navy">{p.name} <span className="text-[#8C97AB]">· {p.trade}</span></span>
                {p.marks.map((m, k) => (
                  <motion.span
                    key={k}
                    className={`mx-auto h-4 w-full max-w-[34px] rounded-[4px] ${cls[m]}`}
                    initial={animate ? { opacity: 0, scale: 0.6 } : false}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, delay: 0.1 + k * 0.12 + i * 0.04 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Canvas>
    </div>
  );
}

/* ---------------------------------------------------------------- Form being filled */

export function FormMock({ title, meta, fields, submit }: { title: string; meta?: string; fields: { label: string; value: string; wide?: boolean }[]; submit: string }) {
  const { ref, cycle, animate } = useLoop(9000);
  const [filled, setFilled] = useState(animate ? 0 : fields.length);
  useEffect(() => {
    if (!animate) return setFilled(fields.length);
    setFilled(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setFilled(i);
      if (i >= fields.length + 1) window.clearInterval(id);
    }, 550);
    return () => window.clearInterval(id);
  }, [cycle, animate, fields.length]);
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div className={`${cardCls} overflow-hidden`}>
          <Head title={title} meta={meta} />
          <div className="grid grid-cols-2 gap-x-3 gap-y-3 p-4">
            {fields.map((f, i) => (
              <label key={f.label} className={f.wide ? "col-span-2" : ""}>
                <span className="text-[11.5px] text-[#8C97AB]">{f.label}</span>
                <span className={`mt-1 flex h-9 items-center rounded-md border px-3 text-[13px] transition-colors duration-300 ${i < filled ? "border-[#DCE3ED] text-brand-navy" : "border-[#EDF0F5] text-transparent"} ${i === filled - 1 ? "border-brand-orange/60" : ""}`}>
                  {f.value}
                </span>
              </label>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-[#EDF0F5] px-4 py-3">
            <span className="text-[12px] text-[#8C97AB]">{filled > fields.length ? "Submitted · routed for approval" : "Draft"}</span>
            <span className={`rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-colors duration-300 ${filled > fields.length ? "bg-[#1D9A5B] text-white" : "bg-brand-navy text-white"}`}>
              {filled > fields.length ? <span className="flex items-center gap-1"><Check size={12} strokeWidth={3} />Sent</span> : submit}
            </span>
          </div>
        </div>
      </Canvas>
    </div>
  );
}

/* ---------------------------------------------------------------- Ask (configurable) */

export function AskMock({ question, answer, bullets, cite }: { question: string; answer: string; bullets?: { text: string; tone: Tone }[]; cite?: string }) {
  const { ref, cycle, animate } = useLoop(9500);
  const [typed, setTyped] = useState(animate ? 0 : question.length);
  useEffect(() => {
    if (!animate) return setTyped(question.length);
    setTyped(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= question.length) window.clearInterval(id);
    }, 38);
    return () => window.clearInterval(id);
  }, [cycle, animate, question]);
  const done = typed >= question.length;
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div className={`${cardCls} flex h-[52px] items-center gap-3 pr-2 pl-4`}>
          <Sparkles size={15} className="shrink-0 text-brand-orange" />
          <span className="flex-1 truncate text-[14px] text-brand-navy">
            {question.slice(0, typed)}
            {!done ? <span className="ml-px inline-block h-4 w-px translate-y-[3px] animate-pulse bg-brand-navy" /> : null}
          </span>
          <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${done ? "bg-brand-orange text-white" : "bg-[#EEF1F5] text-[#A5AEBF]"}`}><ArrowUp size={15} strokeWidth={2.4} /></span>
        </div>
        {done ? (
          <motion.div key={cycle} initial={animate ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.25 }} className={`${cardCls} mt-3 p-4`}>
            <p className="text-[13.5px] leading-[1.55] text-brand-navy">{answer}</p>
            {bullets?.length ? (
              <ul className="mt-3 space-y-2">
                {bullets.map((b, i) => (
                  <motion.li key={b.text} {...fade(animate, 0.5 + i * 0.15, -6, 0)} className="flex items-center gap-2.5 text-[13px] text-[#3D4F6E]">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${toneDot[b.tone]}`} />
                    {b.text}
                  </motion.li>
                ))}
              </ul>
            ) : null}
            {cite ? <p className="mt-3 border-t border-[#F1F3F7] pt-2.5 text-[11.5px] text-[#8C97AB]">Sources: {cite}</p> : null}
          </motion.div>
        ) : null}
      </Canvas>
    </div>
  );
}

/* ---------------------------------------------------------------- Checklist (compact) */

export function ChecklistMock({ title, meta, items }: { title: string; meta?: string; items: { t: string; ok: boolean | null; who?: string }[] }) {
  const { ref, cycle, animate } = useLoop(8000);
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div key={cycle} className={`${cardCls} overflow-hidden`}>
          <Head title={title} meta={meta} right={<Chip tone="blue">{items.filter((i) => i.ok).length}/{items.length} done</Chip>} />
          <ul>
            {items.map((it, i) => (
              <motion.li key={it.t} {...fade(animate, 0.15 + i * 0.3, -6, 0)} className="flex items-center gap-3 border-t border-[#F1F3F7] px-4 py-2.5 first:border-t-0">
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] ${it.ok === true ? "bg-[#1D9A5B] text-white" : it.ok === false ? "bg-[#E5484D] text-white" : "border border-[#DCE3ED]"}`}>
                  {it.ok === true ? <Check size={12} strokeWidth={3} /> : it.ok === false ? <X size={12} strokeWidth={3} /> : null}
                </span>
                <span className="flex-1 text-[13px] text-brand-navy">{it.t}</span>
                {it.who ? <span className="text-[12px] text-[#8C97AB]">{it.who}</span> : null}
              </motion.li>
            ))}
          </ul>
        </div>
      </Canvas>
    </div>
  );
}
