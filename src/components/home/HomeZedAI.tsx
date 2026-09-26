import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import {
  Container,
  CornerTicks,
  darkBand,
  DotGrid,
  Glow,
  h2Class,
  Highlight,
  TicketButton,
} from "@/components/design-system/primitives";

const description =
  "Zed AI is the intelligence layer on the same permissioned data: draft from a daily log, tighten an inspection note, prep a pay-app narrative, or ask what’s still open on punch — without exporting to a generic LLM.";
const features = [
  "Scoped to projects and records you can already open",
  "Task- and log-aware summaries and drafts",
  "Suggested next steps where your org enables actions",
  "No answers from data you wouldn’t see in the app",
];
const MSGS = [
  {
    id: 0,
    role: "user" as const,
    text: "Where do we stand on Harbor Bridge  -  budget and schedule?",
  },
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

function useChatSequence(active: boolean) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!active) return;
    let n = 0;
    setShown(0);
    const id = window.setInterval(() => {
      n = n >= MSGS.length + 2 ? 0 : n + 1;
      setShown(Math.min(n, MSGS.length));
    }, 1600);
    return () => window.clearInterval(id);
  }, [active]);
  return shown;
}

function ChatMock({ shown }: { shown: number }) {
  return (
    <div className="flex min-h-[380px] w-full max-w-[480px] flex-col rounded-2xl border border-white/10 bg-[#0B172C]/80 p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] backdrop-blur sm:p-6">
      <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#C9D7EB]" />
        Concept preview · Zed AI Copilot
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <AnimatePresence>
          {MSGS.slice(0, shown).map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "ai" ? (
                <span className="mt-0.5 mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/10">
                  <Sparkles
                    size={11}
                    className="text-[#C9D7EB]"
                    aria-hidden
                  />
                </span>
              ) : null}
              <div
                className={`max-w-[84%] rounded-xl px-3.5 py-2.5 text-[13px] leading-snug ${
                  m.role === "user"
                    ? "rounded-br-sm bg-[#314766] text-white"
                    : "rounded-bl-sm border border-white/10 bg-white/[0.06] text-white/90"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] py-1.5 pr-1.5 pl-3.5">
        <span className="flex-1 truncate text-xs text-white/40">
          Insights, report prep, or next action…
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/15">
          <Sparkles size={13} className="text-white" aria-hidden />
        </span>
      </div>
    </div>
  );
}

/** Zed AI: navy band, copy + feature grid left, framed live chat right. */
export default function ZedAIPreview() {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const shown = useChatSequence(inView);

  return (
    <section
      id="zed-ai"
      className={`relative overflow-hidden py-20 lg:py-[100px] ${darkBand}`}
      aria-labelledby="dp-zedai"
    >
      <DotGrid dark />
      <Glow className="top-1/4 -right-40 h-[560px] w-[560px]" />
      <Container className="relative">
        <div
          ref={ref}
          className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16"
        >
          <motion.div
            {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}
          >
            <h2
              id="dp-zedai"
              className={`${h2Class} text-white lg:!text-[46px]`}
            >
              Your construction
              <br />
              <Highlight>intelligence copilot</Highlight>
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-[1.65] text-white/70 sm:text-base">
              {description}
            </p>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 bg-[#12223F] p-4 text-[14px] leading-snug text-white/85"
                >
                  <Check
                    size={16}
                    strokeWidth={2.4}
                    className="mt-0.5 shrink-0 text-[#C9D7EB]"
                    aria-hidden
                  />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <TicketButton href="/zed-ai" variant="orange">
                Learn more
              </TicketButton>
            </div>
          </motion.div>

          <motion.div
            {...scrollMotionProps(isMobile, {
              y: 22,
              duration: 0.5,
              delay: 0.06,
            })}
            className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6"
          >
            <CornerTicks tone="light" />
            <div className="relative flex justify-center">
              <ChatMock shown={shown} />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
