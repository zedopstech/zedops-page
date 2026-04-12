import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, TrendingDown, Zap, Play, Sparkles, X } from "lucide-react";
import AppMockup from "./DashboardMockup";

/**
 * Hero “platform overview” video  -  swap for your asset or YouTube.
 * If `youtubeId` is set, an embed is used (takes precedence over MP4).
 */
const PLATFORM_OVERVIEW_VIDEO = {
  youtubeId: "k0DaV2pgF_I",
  mp4: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  poster: "",
} as const;

/* ── Platform overview modal ───────────────────────────────────────── */
function PlatformOverviewModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) {
      const v = videoRef.current;
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
    } else if (!PLATFORM_OVERVIEW_VIDEO.youtubeId) {
      void videoRef.current?.play()?.catch(() => {});
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const ytId = PLATFORM_OVERVIEW_VIDEO.youtubeId.trim();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#0B1220]/88"
            aria-label="Close video"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="hero-overview-video-title"
            className="relative z-10 w-full max-w-4xl"
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 mb-3 px-0.5">
              <p id="hero-overview-video-title" className="text-white text-sm font-bold tracking-tight">
                Platform overview
              </p>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 p-2 rounded-md text-white/85 hover:text-white hover:bg-white/12 transition-colors"
                aria-label="Close"
              >
                <X size={22} strokeWidth={2} />
              </button>
            </div>
            <div
              className="rounded-lg overflow-hidden bg-black ring-1 ring-white/20"
              style={{ borderRadius: 10 }}
            >
              {ytId ? (
                <div className="aspect-video w-full">
                  <iframe
                    title="Platform overview"
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <video
                  ref={videoRef}
                  className="aspect-video w-full object-contain bg-black"
                  controls
                  playsInline
                  preload="metadata"
                  {...(PLATFORM_OVERVIEW_VIDEO.poster ? { poster: PLATFORM_OVERVIEW_VIDEO.poster } : {})}
                >
                  <source src={PLATFORM_OVERVIEW_VIDEO.mp4} type="video/mp4" />
                  Your browser does not support embedded video.
                </video>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Animated progress bar ──────────────────────────────────────────── */
function AnimBar({ pct, color, delay }: { pct: number; color: string; delay: number }) {
  return (
    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: color }}
      />
    </div>
  );
}

function PortfolioHealthCard() {
  return (
    <div className="bg-white border border-gray-200/90 p-4 w-44" style={{ borderRadius: 8 }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-[#97A0AF] font-bold uppercase tracking-wider">Portfolio Health</span>
        <div className="flex items-center gap-1">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[9px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded">Live</span>
        </div>
      </div>
      <div className="space-y-2">
        {[
          { label: "On Schedule", pct: 74, color: "#172B4D", delay: 0.6 },
          { label: "Budget OK",   pct: 81, color: "#10B981", delay: 0.75 },
          { label: "Safety Pass", pct: 96, color: "#F79625", delay: 0.9 },
        ].map(({ label, pct, color, delay }) => (
          <div key={label}>
            <div className="flex justify-between text-[9px] mb-0.5">
              <span className="text-[#42526E]">{label}</span>
              <motion.span
                className="font-bold text-[#172B4D]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay, duration: 0.3 }}
              >
                {pct}%
              </motion.span>
            </div>
            <AnimBar pct={pct} color={color} delay={delay} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BudgetVarianceCard() {
  const bars = [40, 65, 52, 78, 60, 85, 70];
  return (
    <div className="bg-white border border-gray-200/90 p-4 w-40" style={{ borderRadius: 8 }}>
      <span className="text-[10px] text-[#97A0AF] font-bold uppercase tracking-wider block mb-2">Budget Variance</span>
      <div className="flex items-end gap-1 h-10">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.7, delay: 0.7 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: i === 5 ? "#F79625" : "#172B4D",
              opacity: i === 5 ? 1 : 0.3 + i * 0.1,
            }}
          />
        ))}
      </div>
      <div className="flex items-center gap-1 mt-2">
        <TrendingDown size={10} className="text-green-500" />
        <span className="text-[9px] text-green-600 font-bold">3.2% under budget</span>
      </div>
    </div>
  );
}

function AIRiskCard() {
  return (
    <div className="bg-white border border-gray-200/90 p-4" style={{ borderRadius: 8, width: 184 }}>
      <div className="flex items-center gap-1.5 mb-3">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap size={11} className="text-[#F79625]" />
        </motion.div>
        <span className="text-[10px] text-[#97A0AF] font-bold uppercase tracking-wider">AI Risk Alerts</span>
      </div>
      <div className="space-y-2">
        {[
          { site: "Marina Residences", risk: "Concrete pour delay",      level: "High", color: "text-red-600 bg-red-50",    delay: 0.6 },
          { site: "Tech Park Phase 3",  risk: "Labour shortage forecast", level: "Med",  color: "text-amber-600 bg-amber-50", delay: 0.75 },
          { site: "Downtown Retail",    risk: "Steel delivery window",    level: "Low",  color: "text-blue-600 bg-blue-50",   delay: 0.9 },
        ].map(({ site, risk, level, color, delay }) => (
          <motion.div
            key={site}
            className="flex items-start gap-2"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.4 }}
          >
            <span className={`text-[8px] font-bold px-1.5 py-0.5 shrink-0 mt-0.5 rounded ${color}`}>{level}</span>
            <div>
              <div className="text-[9px] font-bold text-[#172B4D] leading-tight">{site}</div>
              <div className="text-[8px] text-[#6B778C]">{risk}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CountUp({ target, delay }: { target: number; delay: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = Date.now();
      const dur = 900;
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / dur, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [target, delay]);
  return <>{count}</>;
}

function MilestoneCard() {
  return (
    <div className="bg-white border border-gray-200/90 p-4 w-40" style={{ borderRadius: 8 }}>
      <span className="text-[10px] text-[#97A0AF] font-bold uppercase tracking-wider block mb-1.5">Today's Milestone</span>
      <div className="text-xl font-black text-[#172B4D] leading-none mb-1">
        <CountUp target={14} delay={0.9} /> inspections
      </div>
      <div className="text-[9px] text-[#6B778C] mb-2">across 6 active sites</div>
      <div className="flex items-center gap-1">
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
        >
          <Zap size={9} className="text-green-500" />
        </motion.div>
        <span className="text-[9px] text-green-600 font-bold">+3 vs yesterday</span>
      </div>
    </div>
  );
}

/* ── Float wrapper ──────────────────────────────────────────────────── */
function Float({ children, duration, delay = 0, amplitude = 8 }: {
  children: React.ReactNode; duration: number; delay?: number; amplitude?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  // Only parallax the pure background layers  -  no interactive elements inside them
  const bgY  = useTransform(scrollY, [0, 600], [0, 140]);
  const dotY = useTransform(scrollY, [0, 600], [0, 90]);
  // Scroll-linked transforms are a common source of jank / flicker on mobile Safari
  const parallaxYBg = isMobile ? 0 : bgY;
  const parallaxYGrid = isMobile ? 0 : dotY;

  const [overviewOpen, setOverviewOpen] = useState(false);
  const closeOverview = useCallback(() => setOverviewOpen(false), []);

  return (
    <section id="hero" className="relative pt-[100px] overflow-hidden" style={{ minHeight: "100vh" }}>
      <PlatformOverviewModal open={overviewOpen} onClose={closeOverview} />

      {/* Parallax background  -  no interactives inside, safe to transform */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: parallaxYBg,
          background: "linear-gradient(155deg, #C4D9FF 0%, #D9EBFF 28%, #ECF3FF 58%, #F2F6FF 100%)",
          top: "-20%", bottom: "-20%",
        }}
      />
      {/* Blueprint grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: parallaxYGrid,
          backgroundImage: [
            "linear-gradient(rgba(1,47,176,0.045) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(1,47,176,0.045) 1px, transparent 1px)",
            "linear-gradient(rgba(1,47,176,0.02) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(1,47,176,0.02) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
          top: "-20%",
          bottom: "-20%",
        }}
      />
      {/* Warm glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[min(100vw,900px)] max-w-full -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(247,150,37,0.11) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Text block  -  no scroll transform to avoid lag ── */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center pt-16 pb-0 sm:px-6">

        <motion.div
          initial={isMobile ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-7 inline-flex max-w-full flex-wrap items-center justify-center gap-2 border border-[#172B4D]/20 bg-white/80 px-3 py-1.5 sm:px-4"
          style={{ borderRadius: 99 }}
        >
          <Sparkles size={12} className="shrink-0 text-[#F79625]" />
          <span className="max-w-[min(100%,26rem)] text-center text-[10px] font-bold uppercase tracking-[0.08em] text-[#172B4D] sm:max-w-none sm:text-xs sm:tracking-[0.12em]">
            Powered by Zed AI copilot · Built for MEP
          </span>
        </motion.div>

        <motion.h1
          initial={isMobile ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="text-4xl font-extrabold leading-[1.08] tracking-tight text-[#172B4D] mb-5 sm:text-5xl md:text-6xl lg:text-[70px] lg:leading-[1.03]"
        >
          Execution-first operations for MEP trades.
        </motion.h1>

        <motion.p
          initial={isMobile ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.14 }}
          className="text-[#42526E] text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8 text-center text-balance"
        >
          Connect the programme to tasks, daily logs to follow-ups, and inspections &amp; punch to closeout with finance and supply on the same thread so supers and PMs see what to do next, not just reports
        </motion.p>

        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.44, delay: 0.22 }}
          className="mb-12 flex flex-col items-center gap-3 px-1 sm:mb-14"
        >
          <div className="flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="/early-access"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-center text-sm font-bold text-white transition-all duration-150 bg-[#172B4D] hover:bg-[#0e1e38] sm:inline-flex"
              style={{ borderRadius: 6 }}
            >
              Request early access
              <ArrowRight size={15} className="shrink-0" />
            </a>
            <div className="animated-gradient-border w-full sm:w-auto">
              <a
                href="/contact?topic=demo"
                className="inline-flex w-full items-center justify-center gap-2 px-7 py-3.5 text-center text-sm font-semibold text-[#172B4D] transition-all duration-150 bg-white hover:bg-[#F6F8FA] sm:w-auto"
                style={{ borderRadius: 6 }}
              >
                Book a demo
              </a>
            </div>
          </div>
          {/* Social proof */}
          <p className="text-[#97A0AF] text-[11px] font-medium sm:text-xs">
            Early access by application · One product · MEP execution focus
          </p>
        </motion.div>
      </div>

      {/* ── Mockup  -  no scroll transform, eliminates button lag ── */}
      <div className="relative z-10 mx-auto max-w-[1160px] min-w-0 px-4 sm:px-6">
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="relative"
        >
          {/* Main dashboard */}
          <div className="relative">
            <AppMockup />

            {/* Edge vignette only  -  leaves the centre visible */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "linear-gradient(to bottom, rgba(10,16,32,0.22) 0%, transparent 22%, transparent 72%, rgba(10,16,32,0.35) 100%)",
            }} />

            {/* Watch button  -  centred, no backdrop-blur, with pulse ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative pointer-events-auto">
                {/* Pulse rings: infinite scale/opacity is noisy on mobile GPUs */}
                {!isMobile &&
                  [1, 2].map((n) => (
                    <motion.div
                      key={n}
                      className="absolute inset-0 rounded-xl bg-white/30"
                      animate={{ scale: [1, 1.55 + n * 0.15], opacity: [0.45, 0] }}
                      transition={{ duration: 2.2, delay: n * 0.55, repeat: Infinity, ease: "easeOut" }}
                    />
                  ))}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex items-center gap-3 bg-[#172B4D] border border-gray-200 px-5 py-3 text-[#172B4D] font-bold text-sm transition-colors duration-150 hover:bg-[#101A2C]"
                  style={{ borderRadius: 10, cursor: "pointer" }}
                  onClick={() => setOverviewOpen(true)}
                  aria-haspopup="dialog"
                >
                  <div className="w-9 h-9 bg-white flex items-center justify-center shrink-0" style={{ borderRadius: 8 }}>
                    <Play size={16} className="text-[#172B4D] ml-0.5" fill="#172B4D" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white">Watch demo</div>
                    <div className="text-[11px] text-[#97A0AF] font-normal">2 min · No sign-up needed</div>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>

          {/* ── Floating panels ── */}

          {/* Portfolio Health  -  top left */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute z-20 hidden lg:block"
            style={{ top: "14%", left: "-76px" }}
          >
            <Float duration={3.2} amplitude={9}>
              <PortfolioHealthCard />
            </Float>
          </motion.div>

          {/* Budget Variance  -  bottom left */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="absolute z-20 hidden lg:block"
            style={{ bottom: "18%", left: "-54px" }}
          >
            <Float duration={2.7} delay={0.9} amplitude={7}>
              <BudgetVarianceCard />
            </Float>
          </motion.div>

          {/* AI Risk Alerts  -  top right */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="absolute z-20 hidden lg:block"
            style={{ top: "8%", right: "-76px" }}
          >
            <Float duration={3.6} delay={0.4} amplitude={8}>
              <AIRiskCard />
            </Float>
          </motion.div>

          {/* Milestone  -  bottom right */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="absolute z-20 hidden lg:block"
            style={{ bottom: "22%", right: "-52px" }}
          >
            <Float duration={3.0} delay={1.4} amplitude={10}>
              <MilestoneCard />
            </Float>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Minimal bar (same rhythm as former trust row; no customer claims) ── */}
      <div className="relative z-10 mt-10 border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-xs text-[#97A0AF] sm:text-left">
              <a
                href="/early-access"
                className="font-bold text-[#172B4D] underline-offset-2 hover:text-[#0052CC] hover:underline"
              >
                Request access
              </a>
              <span className="text-[#C7CDD6]"> · </span>
              <span className="font-medium text-[#6B778C]">Rolling invites as we expand capacity.</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-[#C7CDD6]">Built for</span>
              {["General contractors", "Owners", "CM & consultants"].map((label) => (
                <span key={label} className="text-xs font-bold tracking-wide text-[#B0BAC9]">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
