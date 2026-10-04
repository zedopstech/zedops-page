import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";

const aiCap = {
  description:
    "Zed AI is the intelligence layer on the same permissioned data: draft from a daily log, tighten an inspection note, prep a pay-app narrative, or ask what’s still open on punch — without exporting to a generic LLM.",
  features: [
    "Scoped to projects and records you can already open",
    "Task- and log-aware summaries and drafts",
    "Suggested next steps where your org enables actions",
    "No answers from data you wouldn’t see in the app",
  ],
  stat: "3×",
  statLabel: "faster follow-through on open items",
};

const CHAT_MSGS = [
  { id: 0, role: "user" as const, text: "Where do we stand on Harbor Bridge  -  budget and schedule?" },
  {
    id: 1,
    role: "ai" as const,
    text: "Foundation slip risk (Issues #441–443); structure trending +8% vs plan. Want a one-pager or variance bullets for your report?",
  },
  { id: 2, role: "user" as const, text: "Start the follow-up from that." },
  {
    id: 3,
    role: "ai" as const,
    text: "Draft opened in ZedOps  -  linked to Harbor. Review and submit when your workflow allows.",
  },
];

const MSG_DELAYS = [500, 1800, 2200, 1800];
const TYPING_DURATION = 1100;
const RESET_DELAY = 3800;

function TypingDots() {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <div className="flex items-center gap-1 px-3 py-2.5" style={{ borderRadius: 6 }}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="block h-1.5 w-1.5 rounded-full bg-blue-400/60" />
        ))}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 px-3 py-2.5" style={{ borderRadius: 6 }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-1.5 w-1.5 rounded-full bg-blue-400/60"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.55, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function ZedAIChat({ active }: { active: boolean }) {
  const [visibleIds, setVisibleIds] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const clearAll = () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };

    const runSequence = () => {
      clearAll();
      setVisibleIds([]);
      setTyping(false);

      let elapsed = 0;
      CHAT_MSGS.forEach((msg, i) => {
        elapsed += MSG_DELAYS[i];
        if (msg.role === "ai") {
          const t1 = setTimeout(() => setTyping(true), elapsed - TYPING_DURATION);
          const t2 = setTimeout(() => {
            setTyping(false);
            setVisibleIds((prev) => [...prev, msg.id]);
          }, elapsed);
          timeoutsRef.current.push(t1, t2);
        } else {
          const t = setTimeout(() => {
            setVisibleIds((prev) => [...prev, msg.id]);
          }, elapsed);
          timeoutsRef.current.push(t);
        }
      });

      const tReset = setTimeout(() => runSequence(), elapsed + RESET_DELAY);
      timeoutsRef.current.push(tReset);
    };

    if (active) {
      runSequence();
    } else {
      clearAll();
      setVisibleIds([]);
      setTyping(false);
    }
    return clearAll;
  }, [active]);

  return (
    <div className="flex min-h-[200px] flex-1 flex-col gap-2.5 overflow-hidden">
      <AnimatePresence>
        {CHAT_MSGS.filter((m) => visibleIds.includes(m.id)).map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "ai" && (
              <div className="me-1.5 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/20">
                <Sparkles size={9} className="text-brand-orange" />
              </div>
            )}
            <div
              className={`max-w-[82%] px-3 py-2 text-xs leading-snug ${
                msg.role === "user"
                  ? "ms-4 bg-brand-navy text-white/80"
                  : "border border-blue-800/30 bg-[#1A3352] text-white/90"
              }`}
              style={{
                borderRadius: 8,
                ...(msg.role === "user" ? { borderBottomRightRadius: 2 } : { borderBottomLeftRadius: 2 }),
              }}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {typing && (
          <motion.div
            key="typing"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-start"
          >
            <div className="me-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/20">
              <Sparkles size={9} className="text-brand-orange" />
            </div>
            <div className="border border-blue-800/30 bg-[#1A3352]" style={{ borderRadius: 8, borderBottomLeftRadius: 2 }}>
              <TypingDots />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ZedAIHomeSection() {
  const isMobile = useIsMobile();
  const aiCardRef = useRef<HTMLDivElement>(null);
  const aiCardInView = useInView(aiCardRef, {
    once: true,
    ...(isMobile ? { margin: "0px" as const } : { margin: "-100px 0px" as const }),
  });

  return (
    <section id="zed-ai" className="border-t border-gray-100 bg-white" aria-labelledby="zed-ai-home-heading">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <motion.article
          {...scrollMotionProps(isMobile, { y: 24, duration: 0.5 })}
          ref={aiCardRef}
          className="flex min-w-0 flex-col overflow-hidden rounded-xl bg-brand-navy lg:flex-row"
        >
          <div className="min-w-0 flex-1 p-8 lg:p-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-orange">
                <Sparkles size={18} className="text-white" aria-hidden />
              </div>
              <div>
                <span className="me-2 bg-white/10 px-2 py-0.5 text-[9px] font-bold tracking-widest text-white/70 uppercase">
                  New
                </span>
                <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">Zed AI</span>
              </div>
            </div>
            <h2 id="zed-ai-home-heading" className="mb-4 text-3xl leading-snug font-extrabold text-white sm:text-4xl">
              Your construction
              <br />
              intelligence copilot
            </h2>
            <p className="mb-7 max-w-md text-base leading-snug text-white/55">{aiCap.description}</p>
            <ul className="space-y-2.5">
              {aiCap.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href="/zed-ai"
                className="inline-flex items-center gap-2 rounded-md bg-brand-orange px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
              >
                Explore Zed AI →
              </a>
            </div>
          </div>

          <div className="flex w-full min-w-0 flex-col justify-between border-t border-white/5 bg-[#0E1E38] p-6 lg:w-[420px] lg:shrink-0 lg:border-t-0 lg:border-s lg:border-white/5 lg:p-8">
            <div className="mb-5 flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-brand-orange" />
              <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Live · Zed AI Copilot</span>
            </div>

            <ZedAIChat active={aiCardInView} />

            <div className="mt-5 border-t border-white/5 pt-4">
              <div className="flex items-center gap-2 rounded-lg border border-white/8 bg-brand-navy/60 px-3 py-2">
                <span className="flex-1 text-xs text-white/25">Insights, report prep, or next action…</span>
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-brand-orange">
                  <Sparkles size={11} className="text-white" aria-hidden />
                </div>
              </div>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-4xl leading-none font-black text-brand-orange">{aiCap.stat}</span>
                <span className="pb-1 text-xs text-white/35">{aiCap.statLabel}</span>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
