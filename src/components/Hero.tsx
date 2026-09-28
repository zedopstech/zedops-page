import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, TrendingDown, Zap, Sparkles } from "lucide-react";
import AppMockup from "./DashboardMockup";

/** Set true to restore the hero dashboard mockup. */
const SHOW_HERO_MOCKUP = false;

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
          { label: "Safety Pass", pct: 96, color: "#FE5D02", delay: 0.9 },
        ].map(({ label, pct, color, delay }) => (
          <div key={label}>
            <div className="flex justify-between text-[9px] mb-0.5">
              <span className="text-[#42526E]">{label}</span>
              <motion.span
                className="font-bold text-brand-navy"
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
              background: i === 5 ? "#FE5D02" : "#172B4D",
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
          <Zap size={11} className="text-brand-orange" />
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
              <div className="text-[9px] font-bold text-brand-navy leading-tight">{site}</div>
              <div className="text-[8px] text-[#616D82]">{risk}</div>
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
      <div className="text-xl font-black text-brand-navy leading-none mb-1">
        <CountUp target={14} delay={0.9} /> inspections
      </div>
      <div className="text-[9px] text-[#616D82] mb-2">across 6 active sites</div>
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

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-[60px]"
      style={SHOW_HERO_MOCKUP ? { minHeight: "100vh" } : undefined}
    >
      {/* Parallax background  -  no interactives inside, safe to transform */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: parallaxYBg,
          backgroundImage:
            "linear-gradient(155deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.82) 35%, rgba(255,255,255,0.76) 62%, rgba(255,255,255,0.86) 100%), url('/backgrounds/new-hero-banner.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          top: "-20%", bottom: "-20%",
        }}
      />
      {/* Blueprint grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: parallaxYGrid,
          backgroundImage: "url('/backgrounds/hero-grid.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "80px 80px",
          top: "-20%",
          bottom: "-20%",
        }}
      />
      {/* Warm glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[min(100vw,900px)] max-w-full -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(254,93,2,0.11) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Text block  -  no scroll transform to avoid lag ── */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center pt-16 pb-0 sm:px-6">

        

        <motion.h1
          initial={isMobile ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-navy mb-3 sm:text-5xl md:text-6xl lg:text-[60px] lg:leading-[1.05]"
        >
          AI <span className="text-brand-orange">MEP & Construction </span>Execution Platform
        </motion.h1>

        <motion.p
          initial={isMobile ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.14 }}
          className="text-[#42526E] text-base sm:text-lg leading-snug max-w-xl mx-auto mb-5 text-center text-balance"
        >
          Connect every task, inspection, follow-up, finance, and supply action in one seamless workflow.
        </motion.p>

        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.44, delay: 0.22 }}
          className="mb-7 flex flex-col items-center gap-3 px-1 sm:mb-8"
        >
          <div className="flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="/early-access"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-center text-sm font-bold text-white transition-all duration-150 bg-brand-orange hover:bg-brand-orange-soft sm:inline-flex"
              style={{ borderRadius: 6 }}
            >
              Request early access
              <ArrowRight size={15} className="shrink-0" />
            </a>
            <div className="animated-gradient-border w-full sm:w-auto">
              <a
                href="/contact?topic=demo"
                className="inline-flex w-full items-center justify-center gap-2 px-7 py-3.5 text-center text-sm font-semibold text-brand-navy transition-all duration-150 bg-white hover:bg-[#F6F8FA] sm:w-auto"
                style={{ borderRadius: 6 }}
              >
                Book a demo
              </a>
            </div>
          </div>
          {/* Social proof
          <p className="text-[#97A0AF] text-xs font-medium sm:text-xs">
            Early access by application · One product · MEP execution focus
          </p> */}
        </motion.div>
      </div>

      {/* ── Mockup  -  no scroll transform, eliminates button lag ── */}
      {SHOW_HERO_MOCKUP ? (
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
      ) : null}

      {/* ── Minimal bar (same rhythm as former trust row; no customer claims) ── */}
      {/* <div className="relative z-10 mt-5 border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-xs text-[#97A0AF] sm:text-left">
              <a
                href="/early-access"
                className="font-bold text-brand-navy underline-offset-2 hover:text-brand-orange hover:underline"
              >
                Request access
              </a>
              <span className="text-[#C7CDD6]"> · </span>
              <span className="font-medium text-[#616D82]">Rolling invites as we expand capacity.</span>
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
      </div> */}
    </section>
  );
}
