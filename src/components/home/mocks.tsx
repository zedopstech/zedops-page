import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import ZedOpsMark from "@/components/ZedOpsMark";
import { ArrowUp, Check, CheckSquare, ClipboardList, MessageSquare, Package, Play, ShoppingCart, Sparkles, Truck } from "lucide-react";

/**
 * Small product mocks with light motion, modelled on the ZedOps app (AI brief, KPI tiles,
 * issues). Each renders on a fixed-size canvas scaled to its container, so the layout never
 * reflows, and each loops only while on screen. Reduced motion shows the finished state.
 */

/** Restarts a cycle every `ms` while visible; returns [ref, cycle, animate]. */
export function useLoop(ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setCycle((c) => c + 1), ms);
    return () => window.clearInterval(id);
  }, [inView, reduce, ms]);
  return { ref, cycle, animate: inView && !reduce, reduce: !!reduce };
}

/** Fixed-size canvas scaled down (never up) to the container width. */
export function Canvas({ width, height, children }: { width: number; height: number; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = outer.current;
    if (!el) return;
    const measure = () => setScale(Math.min(1, el.clientWidth / width));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [width]);
  return (
    <div ref={outer} className="relative w-full" style={{ height: height * scale }}>
      <div className="absolute top-0 left-1/2 origin-top" style={{ width, height, transform: `translateX(-50%) scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

export const cardCls = "rounded-xl border border-[#E6EAF0] bg-white shadow-[0_1px_2px_rgba(14,27,51,0.04),0_12px_32px_-16px_rgba(14,27,51,0.18)]";

/* ------------------------------------------------------------------ */
/* 1. Ask Zed: typed question, then the day's priorities                */
/* ------------------------------------------------------------------ */

const question = "What needs attention today?";
const priorities = [
  { dot: "bg-[#E5484D]", title: "Schedule variance", meta: "28 delayed activities vs 50 on track" },
  { dot: "bg-[#F5A524]", title: "Material request approval", meta: "Pending your approval" },
  { dot: "bg-[#F5A524]", title: "Open issues", meta: "8 open across 9 projects" },
  { dot: "bg-[#3E7BFA]", title: "Your next task", meta: "Approve concrete pour card #7" },
];

export function AskZedMock() {
  const { ref, cycle, animate, reduce } = useLoop(9000);
  const [typed, setTyped] = useState(reduce ? question.length : 0);
  useEffect(() => {
    if (!animate) {
      setTyped(question.length);
      return;
    }
    setTyped(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= question.length) window.clearInterval(id);
    }, 45);
    return () => window.clearInterval(id);
  }, [cycle, animate]);
  const done = typed >= question.length;

  return (
    <div ref={ref}>
      <Canvas width={460} height={340}>
        <div className={`${cardCls} flex h-[56px] items-center gap-3 pr-2.5 pl-4`}>
          <span className="flex-1 truncate text-[15px] text-brand-navy">
            {typed === 0 ? <span className="text-[#A5AEBF]">Ask Zed anything…</span> : question.slice(0, typed)}
            {!done ? <span className="ml-px inline-block h-[17px] w-px translate-y-[3px] animate-pulse bg-brand-navy" /> : null}
          </span>
          <span className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300 ${done ? "bg-brand-orange text-white" : "bg-[#EEF1F5] text-[#A5AEBF]"}`}>
            <ArrowUp size={16} strokeWidth={2.4} />
          </span>
        </div>
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key={cycle}
              initial={animate ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.25 }}
              className={`${cardCls} mt-3 p-4`}
            >
              <div className="flex items-center gap-2 text-[13px] text-[#6B778C]">
                <Sparkles size={13} className="text-brand-orange" />
                <span className="font-medium text-brand-navy">4 priorities today</span>
                <span className="ml-auto rounded-[5px] bg-[#FDECEC] px-1.5 py-0.5 text-[11px] text-[#C4312F]">1 critical</span>
                <span className="rounded-[5px] bg-[#FEF4DE] px-1.5 py-0.5 text-[11px] text-[#9A6400]">2 warning</span>
              </div>
              <ul className="mt-3 space-y-2.5">
                {priorities.map((p, i) => (
                  <motion.li
                    key={p.title}
                    initial={animate ? { opacity: 0, x: -6 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.45 + i * 0.12 }}
                    className="flex items-baseline gap-2.5 text-[14px]"
                  >
                    <span className={`h-2 w-2 shrink-0 translate-y-[-1px] rounded-full ${p.dot}`} />
                    <span className="font-medium text-brand-navy">{p.title}</span>
                    <span className="truncate text-[#8C97AB]">{p.meta}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Canvas>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Signals: live project signals orbiting the record                */
/* ------------------------------------------------------------------ */

const signals = [
  { text: "6 delayed activities", cls: "bg-[#FDECEC] text-[#B42B29] border-[#F8D3D2]", pos: { left: 36, top: 70 } },
  { text: "3 approvals waiting", cls: "bg-[#FEF4DE] text-[#8A5A00] border-[#F7E1AE]", pos: { left: 300, top: 40 } },
  { text: "Budget +8% vs plan", cls: "bg-[#EEF0FE] text-[#4338CA] border-[#DADDFB]", pos: { left: 290, top: 262 } },
  { text: "PO #1042 delivered", cls: "bg-[#E8F6EE] text-[#1D7446] border-[#CBEBD8]", pos: { left: 20, top: 240 } },
];

export function SignalsMock() {
  const { ref, cycle, animate } = useLoop(7000);
  return (
    <div ref={ref}>
      <Canvas width={460} height={340}>
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E3E8F0]" />
        <motion.div
          className="absolute top-1/2 left-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#D5DCE6]"
          animate={animate ? { rotate: 360 } : undefined}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        />
        <div className="absolute top-1/2 left-1/2 flex h-[112px] w-[112px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_18px_40px_-16px_rgba(14,27,51,0.35)]">
          <ZedOpsMark className="h-10 w-auto" />
        </div>
        {signals.map((s, i) => (
          <motion.span
            key={`${cycle}-${s.text}`}
            className={`absolute rounded-lg border px-3 py-1.5 text-[14px] font-medium whitespace-nowrap ${s.cls}`}
            style={s.pos}
            initial={animate ? { opacity: 0, scale: 0.9, y: 6 } : false}
            animate={animate ? { opacity: 1, scale: 1, y: [0, i % 2 ? 4 : -4, 0] } : { opacity: 1 }}
            transition={{
              opacity: { duration: 0.4, delay: 0.2 + i * 0.35 },
              scale: { duration: 0.4, delay: 0.2 + i * 0.35 },
              y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: 0.6 + i * 0.35 },
            }}
          >
            {s.text}
          </motion.span>
        ))}
      </Canvas>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Workflow: material request to delivery, statuses ticking over    */
/* ------------------------------------------------------------------ */

type FlowNode = { id: string; x: number; y: number; title: string; sub: string; icon: typeof Package; tint: string };
const nodes: FlowNode[] = [
  { id: "req", x: 16, y: 44, title: "Material request", sub: "Duct fittings, L4", icon: ClipboardList, tint: "bg-[#EEF3FF] text-[#3E7BFA]" },
  { id: "app", x: 248, y: 44, title: "Approval", sub: "Project manager", icon: CheckSquare, tint: "bg-[#FEF4DE] text-[#B7791F]" },
  { id: "po", x: 16, y: 212, title: "Purchase order", sub: "PO #1042 raised", icon: ShoppingCart, tint: "bg-[#F3EEFF] text-[#7C4DDB]" },
  { id: "del", x: 248, y: 212, title: "Delivered to site", sub: "Goods receipt logged", icon: Truck, tint: "bg-[#E8F6EE] text-[#1D7446]" },
];
const NODE_W = 196;
const NODE_H = 76;
const links = [
  "M212 82 L248 82",
  `M444 82 C 470 82, 470 150, 420 150 L 40 150 C -10 150, -10 250, 16 250`,
  "M212 250 L248 250",
];

export function WorkflowMock() {
  const { ref, cycle, animate } = useLoop(8000);
  const step = 1.1;
  return (
    <div ref={ref}>
      <Canvas width={460} height={320}>
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(23,43,77,0.14)_1px,transparent_1px)] [background-size:14px_14px]" />
        <svg key={`l-${cycle}`} className="absolute inset-0 overflow-visible" width={460} height={320} fill="none">
          {links.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              stroke="#FE5D02"
              strokeWidth={1.5}
              initial={animate ? { pathLength: 0 } : false}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: step * (i + 1) - 0.45, ease: "easeInOut" }}
            />
          ))}
        </svg>
        {nodes.map((n, i) => (
          <div key={n.id} className="absolute" style={{ left: n.x, top: n.y, width: NODE_W, height: NODE_H }}>
            {i === 0 ? (
              <span className="absolute -top-[22px] left-0 inline-flex items-center gap-1 rounded-t-md bg-brand-navy px-2 py-0.5 text-[11px] font-medium text-white">
                <Play size={9} fill="currentColor" /> Trigger
              </span>
            ) : null}
            <motion.span
              key={`s-${cycle}`}
              className="absolute -top-[22px] right-0 inline-flex items-center gap-1 rounded-md border border-[#CBEBD8] bg-[#E8F6EE] px-1.5 py-0.5 text-[11px] font-medium text-[#1D7446]"
              initial={animate ? { opacity: 0, y: 4 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: step * i + 0.2 }}
            >
              <Check size={10} strokeWidth={3} /> {i === 0 ? "Raised" : "Completed"}
            </motion.span>
            <motion.div
              key={`n-${cycle}`}
              className="flex h-full items-start gap-3 rounded-xl border bg-white p-3.5"
              initial={animate ? { borderColor: "#E3E8F0" } : false}
              animate={{ borderColor: "#FE5D02", boxShadow: "0 10px 24px -14px rgba(254,93,2,0.45)" }}
              transition={{ duration: 0.35, delay: step * i }}
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${n.tint}`}>
                <n.icon size={17} />
              </span>
              <span className="min-w-0">
                <span className="block text-[14.5px] font-medium text-brand-navy">{n.title}</span>
                <span className="mt-0.5 block text-[12.5px] text-[#8C97AB]">{n.sub}</span>
              </span>
            </motion.div>
          </div>
        ))}
      </Canvas>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Issues table: pick a row, Zed drafts the follow-up               */
/* ------------------------------------------------------------------ */

const issues = [
  { id: "ISS-441", title: "Duct clash at L4 corridor", sev: "High", owner: "Ahmed R." },
  { id: "ISS-442", title: "Cable tray access blocked", sev: "Medium", owner: "Priya N." },
  { id: "ISS-443", title: "Chiller pad not level", sev: "High", owner: "Omar K." },
  { id: "ISS-447", title: "Missing fire damper tags", sev: "Low", owner: "Sara M." },
  { id: "ISS-450", title: "Riser sleeve misaligned", sev: "Medium", owner: "Leo T." },
];
const sevCls: Record<string, string> = {
  High: "bg-[#FDECEC] text-[#B42B29]",
  Medium: "bg-[#FEF4DE] text-[#8A5A00]",
  Low: "bg-[#EEF1F5] text-[#5E6C84]",
};

export function IssuesDraftMock() {
  const { ref, cycle, animate } = useLoop(8500);
  const [phase, setPhase] = useState(animate ? 0 : 2);
  useEffect(() => {
    if (!animate) {
      setPhase(2);
      return;
    }
    setPhase(0);
    const a = window.setTimeout(() => setPhase(1), 900);
    const b = window.setTimeout(() => setPhase(2), 1700);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [cycle, animate]);

  return (
    <div ref={ref}>
      <Canvas width={460} height={340}>
        <div className={`${cardCls} absolute inset-y-0 left-0 w-[400px] overflow-hidden`}>
          <div className="flex items-center gap-2 border-b border-[#EDF0F5] px-4 py-3">
            <MessageSquare size={14} className="text-[#8C97AB]" />
            <span className="text-[14px] font-medium text-brand-navy">Open issues</span>
            <span className="text-[12.5px] text-[#8C97AB]">· Marina Heights</span>
          </div>
          <div className="grid grid-cols-[22px_1fr_64px_72px] gap-2 border-b border-[#EDF0F5] bg-[#FAFBFC] px-4 py-2 text-[11.5px] text-[#8C97AB]">
            <span />
            <span>Issue</span>
            <span>Severity</span>
            <span>Owner</span>
          </div>
          {issues.map((it, i) => {
            const picked = i === 0 && phase >= 1;
            return (
              <div key={it.id} className={`grid grid-cols-[22px_1fr_64px_72px] items-center gap-2 border-b border-[#F1F3F7] px-4 py-2.5 text-[13px] transition-colors duration-300 ${picked ? "bg-[#FFF6F0]" : ""}`}>
                <span className={`flex h-4 w-4 items-center justify-center rounded-[4px] border transition-colors duration-300 ${picked ? "border-brand-orange bg-brand-orange text-white" : "border-[#D5DCE6]"}`}>
                  {picked ? <Check size={10} strokeWidth={3.5} /> : null}
                </span>
                <span className="truncate text-brand-navy">{it.title}</span>
                <span className={`w-fit rounded-[5px] px-1.5 py-0.5 text-[11px] font-medium ${sevCls[it.sev]}`}>{it.sev}</span>
                <span className="truncate text-[#6B778C]">{it.owner}</span>
              </div>
            );
          })}
        </div>
        <AnimatePresence>
          {phase >= 2 ? (
            <motion.div
              key={cycle}
              className={`${cardCls} absolute top-6 right-0 w-[250px] p-4`}
              initial={animate ? { opacity: 0, x: 24 } : false}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="flex items-center gap-1.5 text-[12px] text-[#8C97AB]">
                <Sparkles size={12} className="text-brand-orange" /> Zed drafted a follow-up
              </span>
              <p className="mt-2 text-[14.5px] leading-snug font-medium text-brand-navy">Resolve duct clash at L4 before Thursday's pour</p>
              <div className="mt-3 rounded-lg border border-[#EDF0F5] p-3 text-[12.5px] leading-[1.5] text-[#5E6C84]">
                <span className="text-[#8C97AB]">To</span> <span className="font-medium text-brand-navy">Ahmed R.</span>
                <p className="mt-2">The L4 duct run clashes with the sprinkler main (ISS-441). Can you confirm the reroute by Wednesday so the pour stays on plan?</p>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="rounded-md bg-brand-navy px-3 py-1.5 text-[12.5px] font-medium text-white">Send</span>
                <span className="px-2 text-[12.5px] text-[#8C97AB]">Discard</span>
                <span className="ml-auto rounded-md border border-[#E3E8F0] px-2.5 py-1.5 text-[12.5px] text-brand-navy">Save draft</span>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Canvas>
    </div>
  );
}
