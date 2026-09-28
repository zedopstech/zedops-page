import { useEffect, useState } from "react";
import { animate as animateValue, motion } from "framer-motion";
import { AlertTriangle, Check, CloudSun, HardHat, Sparkles, X } from "lucide-react";
import { Canvas, cardCls, useLoop } from "./mocks";

const W = 520;
const H = 340;

/** Counts up to `to` each cycle (or shows it immediately without motion). */
function useCount(to: number, cycle: number, run: boolean, duration = 1.6) {
  const [v, setV] = useState(run ? 0 : to);
  useEffect(() => {
    if (!run) {
      setV(to);
      return;
    }
    const c = animateValue(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: setV });
    return () => c.stop();
  }, [to, cycle, run, duration]);
  return v;
}

const fadeIn = (run: boolean, delay: number, x = 0, y = 6) => ({
  initial: run ? { opacity: 0, x, y } : false,
  animate: { opacity: 1, x: 0, y: 0 },
  transition: { duration: 0.35, delay },
});

/* Estimation: BOQ lines land, the total counts up. */
const boq = [
  { code: "23 31 13", item: "GI ductwork, 0.8 mm", qty: "1,240 m²", amt: "52,700" },
  { code: "22 11 16", item: "Copper pipe, 15 mm", qty: "860 m", amt: "10,148" },
  { code: "26 05 19", item: "LV cable, 4C × 16 mm²", qty: "2,150 m", amt: "20,103" },
  { code: "23 64 16", item: "Chiller, 450 kW", qty: "2 no.", amt: "386,000" },
];
export function EstimateMock() {
  const { ref, cycle, animate } = useLoop(8000);
  const total = useCount(468951, cycle, animate);
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div key={cycle} className={`${cardCls} overflow-hidden`}>
          <div className="flex items-center justify-between border-b border-[#EDF0F5] px-4 py-3">
            <span className="text-[14px] font-medium text-brand-navy">BOQ · Mechanical package</span>
            <span className="rounded-[5px] bg-[#EEF3FF] px-1.5 py-0.5 text-[11px] font-medium text-[#2A62DE]">Rev B</span>
          </div>
          <div className="grid grid-cols-[76px_1fr_78px_76px] gap-2 bg-[#FAFBFC] px-4 py-2 text-[11.5px] text-[#5F6B80]">
            <span>Code</span><span>Item</span><span className="text-right">Qty</span><span className="text-right">AED</span>
          </div>
          {boq.map((r, i) => (
            <motion.div key={r.code} {...fadeIn(animate, 0.15 + i * 0.18, -6, 0)} className="grid grid-cols-[76px_1fr_78px_76px] gap-2 border-t border-[#F1F3F7] px-4 py-2.5 text-[13px] tabular-nums">
              <span className="font-mono text-[11.5px] text-[#5F6B80]">{r.code}</span>
              <span className="truncate text-brand-navy">{r.item}</span>
              <span className="text-right text-[#616D82]">{r.qty}</span>
              <span className="text-right text-brand-navy">{r.amt}</span>
            </motion.div>
          ))}
          <div className="flex items-center justify-between border-t border-[#EDF0F5] bg-[#FFF8F3] px-4 py-3">
            <span className="text-[13px] text-[#616D82]">Package total</span>
            <span className="text-[20px] font-medium tracking-[-0.02em] text-brand-navy tabular-nums">AED {Math.round(total).toLocaleString("en-US")}</span>
          </div>
        </div>
      </Canvas>
    </div>
  );
}

/* Planning: Gantt bars grow along the programme; one slips. */
const bars = [
  { name: "Ductwork L3", start: 4, len: 30, tone: "bg-brand-navy" },
  { name: "Ductwork L4", start: 22, len: 34, tone: "bg-brand-navy" },
  { name: "Sprinkler mains", start: 34, len: 28, tone: "bg-[#5B7DB1]" },
  { name: "Chiller install", start: 48, len: 30, tone: "bg-brand-orange", late: true },
  { name: "Testing & comm.", start: 70, len: 24, tone: "bg-[#8FA7C8]" },
];
export function GanttMock() {
  const { ref, cycle, animate } = useLoop(7500);
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div key={cycle} className={`${cardCls} overflow-hidden`}>
          <div className="flex items-center justify-between border-b border-[#EDF0F5] px-4 py-3">
            <span className="text-[14px] font-medium text-brand-navy">Programme · Block C</span>
            <span className="text-[12px] text-[#5F6B80]">Weeks 36–48</span>
          </div>
          <div className="relative px-4 pt-3 pb-4">
            <div className="absolute inset-y-0 left-[46%] w-px bg-brand-orange/60" />
            <span className="absolute top-1 left-[46%] -translate-x-1/2 rounded-[4px] bg-brand-orange px-1.5 text-[10px] font-medium text-white">Today</span>
            {bars.map((b, i) => (
              <div key={b.name} className="grid grid-cols-[112px_1fr] items-center gap-3 py-[9px]">
                <span className="truncate text-[12.5px] text-[#5E6C84]">{b.name}</span>
                <div className="relative h-5 rounded-[5px] bg-[#F3F5F8]">
                  <motion.span
                    className={`absolute inset-y-0 rounded-[5px] ${b.tone}`}
                    style={{ left: `${b.start}%`, width: `${b.len}%`, transformOrigin: "left" }}
                    initial={animate ? { scaleX: 0 } : false}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {b.late ? (
                    <motion.span
                      {...fadeIn(animate, 1.3)}
                      className="absolute -top-[3px] rounded-[4px] border border-[#F8D3D2] bg-[#FDECEC] px-1.5 text-[10.5px] font-medium text-[#B42B29]"
                      style={{ left: `${b.start + b.len + 2}%` }}
                    >
                      +3d
                    </motion.span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Canvas>
    </div>
  );
}

/* Procurement: purchase orders step from ordered to on site. */
const pos = [
  { id: "PO-1042", what: "Duct fittings, L4", at: 3 },
  { id: "PO-1043", what: "Chiller, 450 kW", at: 2 },
  { id: "PO-1047", what: "Cable tray, 300 mm", at: 1 },
];
const steps = ["Ordered", "Shipped", "On site"];
export function ProcurementMock() {
  const { ref, cycle, animate } = useLoop(7000);
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div key={cycle} className="space-y-3">
          {pos.map((p, i) => (
            <motion.div key={p.id} {...fadeIn(animate, i * 0.15)} className={`${cardCls} px-4 py-3.5`}>
              <div className="flex items-baseline justify-between">
                <span className="text-[14px] font-medium text-brand-navy">{p.what}</span>
                <span className="font-mono text-[11.5px] text-[#5F6B80]">{p.id}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {steps.map((s, k) => {
                  const on = k < p.at;
                  return (
                    <div key={s}>
                      <div className="h-1.5 overflow-hidden rounded-full bg-[#EEF1F5]">
                        <motion.div
                          className={`h-full origin-left rounded-full ${k === 2 && on ? "bg-[#1D9A5B]" : "bg-brand-navy"}`}
                          initial={animate ? { scaleX: 0 } : false}
                          animate={{ scaleX: on ? 1 : 0 }}
                          transition={{ duration: 0.45, delay: 0.3 + i * 0.15 + k * 0.4 }}
                        />
                      </div>
                      <span className={`mt-1.5 block text-[11.5px] ${on ? "text-brand-navy" : "text-[#677388]"}`}>{s}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </Canvas>
    </div>
  );
}

/* Field execution: the daily log fills in and tasks get ticked off. */
const tasks = ["Hang ductwork, L4 east", "Pressure test CHW risers", "Pull LV cable to DB-3", "Toolbox talk logged"];
export function DailyLogMock() {
  const { ref, cycle, animate } = useLoop(7500);
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div key={cycle} className={`${cardCls} p-4`}>
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-medium text-brand-navy">Daily log · Sat 26 Sep</span>
            <span className="text-[12px] text-[#5F6B80]">Marina Heights</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { icon: HardHat, k: "Crew on site", v: "42" },
              { icon: CloudSun, k: "Weather", v: "34°C" },
              { icon: AlertTriangle, k: "Delays", v: "1" },
            ].map((m, i) => (
              <motion.div key={m.k} {...fadeIn(animate, 0.1 + i * 0.1)} className="rounded-lg border border-[#EDF0F5] bg-[#FAFBFC] px-3 py-2.5">
                <span className="flex items-center gap-1.5 text-[11.5px] text-[#5F6B80]"><m.icon size={12} />{m.k}</span>
                <span className="mt-1 block text-[20px] font-medium tracking-[-0.02em] text-brand-navy">{m.v}</span>
              </motion.div>
            ))}
          </div>
          <ul className="mt-3 divide-y divide-[#F1F3F7]">
            {tasks.map((t, i) => (
              <li key={t} className="flex items-center gap-3 py-2.5 text-[13.5px]">
                <motion.span
                  className="flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border"
                  initial={animate ? { backgroundColor: "#FFFFFF", borderColor: "#D5DCE6", color: "#FFFFFF" } : false}
                  animate={i < 3 ? { backgroundColor: "#1D9A5B", borderColor: "#1D9A5B", color: "#FFFFFF" } : { backgroundColor: "#FFFFFF", borderColor: "#D5DCE6", color: "#FFFFFF" }}
                  transition={{ duration: 0.25, delay: 0.6 + i * 0.45 }}
                >
                  <Check size={11} strokeWidth={3.5} />
                </motion.span>
                <span className="text-brand-navy">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </Canvas>
    </div>
  );
}

/* Budget: budget vs actual by cost code, with a variance flag. */
const codes = [
  { name: "Labour", budget: 82, actual: 76 },
  { name: "Materials", budget: 90, actual: 97, over: true },
  { name: "Equipment", budget: 48, actual: 41 },
  { name: "Subcontract", budget: 64, actual: 58 },
];
export function BudgetMock() {
  const { ref, cycle, animate } = useLoop(7500);
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div key={cycle} className={`${cardCls} p-4`}>
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-medium text-brand-navy">Cost vs budget</span>
            <span className="flex items-center gap-3 text-[11.5px] text-[#5F6B80]">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-[#D5DCE6]" />Budget</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-brand-navy" />Actual</span>
            </span>
          </div>
          <div className="mt-4 space-y-4">
            {codes.map((c, i) => (
              <div key={c.name} className="grid grid-cols-[88px_1fr_60px] items-center gap-3">
                <span className="text-[13px] text-[#5E6C84]">{c.name}</span>
                <div className="relative h-6">
                  <div className="absolute inset-y-0 left-0 rounded-[5px] bg-[#EEF1F5]" style={{ width: `${c.budget}%` }} />
                  <motion.div
                    className={`absolute top-1.5 bottom-1.5 left-0 origin-left rounded-[4px] ${c.over ? "bg-brand-orange" : "bg-brand-navy"}`}
                    style={{ width: `${c.actual}%` }}
                    initial={animate ? { scaleX: 0 } : false}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <span className={`text-right text-[12.5px] font-medium tabular-nums ${c.over ? "text-[#B42B29]" : "text-[#1D7446]"}`}>
                  {c.actual > c.budget ? "+" : "−"}{Math.abs(c.actual - c.budget)}%
                </span>
              </div>
            ))}
          </div>
          <motion.div {...fadeIn(animate, 1.4)} className="mt-5 flex items-center gap-2 rounded-lg border border-[#FFE0CC] bg-[#FFF6F0] px-3 py-2.5 text-[12.5px] text-brand-navy">
            <Sparkles size={13} className="text-brand-orange" />
            Materials is 7% over. Two open POs explain most of it.
          </motion.div>
        </div>
      </Canvas>
    </div>
  );
}

/* Quality & safety: an inspection runs; a failed item raises an issue. */
const checks = [
  { t: "Fire damper access panels", ok: true },
  { t: "Duct supports at 1.5 m centres", ok: true },
  { t: "Sprinkler clearance to ceiling", ok: false },
  { t: "Labels on isolation valves", ok: true },
];
export function InspectionMock() {
  const { ref, cycle, animate } = useLoop(8000);
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div key={cycle} className="relative">
          <div className={`${cardCls} p-4`}>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-medium text-brand-navy">Inspection · L4 ceiling void</span>
              <span className="text-[12px] text-[#5F6B80]">QA-118</span>
            </div>
            <ul className="mt-3 divide-y divide-[#F1F3F7]">
              {checks.map((c, i) => (
                <motion.li key={c.t} {...fadeIn(animate, 0.2 + i * 0.35, -6, 0)} className="flex items-center justify-between py-2.5 text-[13.5px]">
                  <span className="text-brand-navy">{c.t}</span>
                  <span className={`inline-flex items-center gap-1 rounded-[5px] px-1.5 py-0.5 text-[11.5px] font-medium ${c.ok ? "bg-[#E8F6EE] text-[#1D7446]" : "bg-[#FDECEC] text-[#B42B29]"}`}>
                    {c.ok ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                    {c.ok ? "Pass" : "Fail"}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
          <motion.div
            {...fadeIn(animate, 1.8, 0, 10)}
            className={`${cardCls} absolute right-4 -bottom-4 flex w-[270px] items-start gap-3 p-3.5`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FDECEC] text-[#B42B29]">
              <AlertTriangle size={15} />
            </span>
            <span>
              <span className="block text-[13.5px] font-medium text-brand-navy">Issue ISS-452 created</span>
              <span className="mt-0.5 block text-[12px] text-[#5F6B80]">Assigned to Omar K. · due Tue</span>
            </span>
          </motion.div>
        </div>
      </Canvas>
    </div>
  );
}

/* Closeout: punch items close and the completion ring fills. */
const punch = ["Touch up paint, riser 2", "Replace damaged grille, 4.12", "Missing valve tag, CHW-07", "Clean AHU-3 filters"];
export function CloseoutMock() {
  const { ref, cycle, animate } = useLoop(8000);
  const pct = useCount(100, cycle, animate, 2.4);
  const r = 46;
  const circ = 2 * Math.PI * r;
  const shown = 86 + (pct / 100) * 14;
  return (
    <div ref={ref}>
      <Canvas width={W} height={H}>
        <div key={cycle} className={`${cardCls} grid grid-cols-[150px_1fr] items-center gap-5 p-5`}>
          <div className="relative flex h-[130px] w-[130px] items-center justify-center">
            <svg width={130} height={130} className="-rotate-90">
              <circle cx={65} cy={65} r={r} stroke="#EEF1F5" strokeWidth={10} fill="none" />
              <circle cx={65} cy={65} r={r} stroke={shown >= 100 ? "#1D9A5B" : "#172B4D"} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - shown / 100)} />
            </svg>
            <span className="absolute text-center">
              <span className="block text-[26px] font-medium tracking-[-0.03em] text-brand-navy tabular-nums">{Math.round(shown)}%</span>
              <span className="block text-[11px] text-[#5F6B80]">Punch closed</span>
            </span>
          </div>
          <ul className="space-y-2.5">
            {punch.map((p, i) => (
              <li key={p} className="flex items-center gap-2.5 text-[13.5px]">
                <motion.span
                  className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border"
                  initial={animate ? { backgroundColor: "#FFFFFF", borderColor: "#D5DCE6" } : false}
                  animate={{ backgroundColor: "#1D9A5B", borderColor: "#1D9A5B" }}
                  transition={{ duration: 0.25, delay: 0.3 + i * 0.5 }}
                >
                  <Check size={11} strokeWidth={3.5} className="text-white" />
                </motion.span>
                <motion.span
                  className="text-brand-navy decoration-[#677388]"
                  initial={animate ? { opacity: 1 } : false}
                  animate={{ opacity: 0.55 }}
                  transition={{ duration: 0.25, delay: 0.3 + i * 0.5 }}
                >
                  {p}
                </motion.span>
              </li>
            ))}
            <motion.li {...fadeIn(animate, 2.6)} className="pt-1 text-[12.5px] font-medium text-[#1D7446]">
              Handover pack ready to issue
            </motion.li>
          </ul>
        </div>
      </Canvas>
    </div>
  );
}
