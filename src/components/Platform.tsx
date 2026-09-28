import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";

const ORANGE = "#FE5D02";
const NAVY = "#172B4D";

type Logo = { name: string; color: string; abbr: string; icon?: string };

const categories = [
  {
    label: "Scheduling",
    description: "Sync timelines from any scheduling tool",
    logos: [
      { name: "Primavera P6", color: "#C93B0A", abbr: "P6" },
      { name: "MS Project", color: "#2563EB", abbr: "MP", icon: "microsoftproject" },
      { name: "Oracle CPM", color: "#C74634", abbr: "Or", icon: "oracle" },
      { name: "Asta Power", color: "#616D82", abbr: "AP" },
    ],
  },
  {
    label: "BIM & Design",
    description: "Import models and drawings automatically",
    logos: [
      { name: "Autodesk", color: "#DA2323", abbr: "Ad", icon: "autodesk" },
      { name: "Revit", color: "#005FAB", abbr: "Rv" },
      { name: "Navisworks", color: "#E84B1F", abbr: "NW" },
      { name: "AutoCAD", color: "#D40000", abbr: "AC", icon: "autocad" },
    ],
  },
  {
    label: "Finance",
    description: "Real-time budget and invoice sync",
    logos: [
      { name: "Sage 300", color: "#00A050", abbr: "Sg", icon: "sage" },
      { name: "Viewpoint", color: "#1B365D", abbr: "VP" },
      { name: "QuickBooks", color: "#2CA01C", abbr: "QB" },
      { name: "SAP", color: "#007DB8", abbr: "SA", icon: "sap" },
    ],
  },
  {
    label: "Communication",
    description: "Notifications where your team already works",
    logos: [
      { name: "MS Teams", color: "#6264A7", abbr: "Te", icon: "microsoftteams" },
      { name: "Slack", color: "#4A154B", abbr: "Sl", icon: "slack" },
      { name: "Outlook", color: "#0078D4", abbr: "Ol", icon: "microsoftoutlook" },
      { name: "Zoom", color: "#2D8CFF", abbr: "Zo", icon: "zoom" },
    ],
  },
  {
    label: "Documents",
    description: "Centralise drawings, specs, and submittals",
    logos: [
      { name: "Bluebeam", color: "#008CC0", abbr: "BB" },
      { name: "Procore", color: "#FF6B00", abbr: "PC" },
      { name: "SharePoint", color: "#036C70", abbr: "SP", icon: "microsoftsharepoint" },
      { name: "Box", color: "#0061D5", abbr: "Bx", icon: "box" },
    ],
  },
  {
    label: "Field Data",
    description: "Capture site data from any device or tool",
    logos: [
      { name: "Trimble", color: "#D4A000", abbr: "Tr", icon: "trimble" },
      { name: "PlanGrid", color: "#F05A28", abbr: "PG" },
      { name: "Fieldwire", color: "#0F62FE", abbr: "FW" },
      { name: "HeavyJob", color: "#27AE60", abbr: "HJ" },
    ],
  },
  {
    label: "Compliance",
    description: "Audit-ready exports and automated reporting",
    logos: [
      { name: "Aconex", color: "#E31837", abbr: "Ac" },
      { name: "e-Builder", color: "#2065B4", abbr: "eB" },
      { name: "SmartPM", color: "#10B981", abbr: "SM" },
      { name: "Kahua", color: "#7C3AED", abbr: "Ka" },
    ],
  },
  {
    label: "Cloud & IT",
    description: "Deploy on your preferred infrastructure",
    logos: [
      { name: "AWS", color: "#FF9900", abbr: "AW", icon: "amazonaws" },
      { name: "Azure", color: "#0089D6", abbr: "Az", icon: "microsoftazure" },
      { name: "Google Cloud", color: "#4285F4", abbr: "GC", icon: "googlecloud" },
      { name: "Okta", color: "#007DC1", abbr: "Ok", icon: "okta" },
    ],
  },
];

/* One representative logo per category for the hub diagram */
const hubLogos = categories.map((cat) => {
  const pick = cat.logos.find((l) => l.icon) ?? cat.logos[0];
  return { ...pick, category: cat.label };
});

const HUB_R = 200;    // outer orbit radius
const LOGO_R = 22;    // logo circle radius
const CX = 250;
const CY = 250;

/* ── Animated hub illustration ─────────────────────────────────────── */
function HubIllustration({ inView }: { inView: boolean }) {
  const angles = hubLogos.map((_, i) => (i * 360) / hubLogos.length - 90);

  return (
    <svg viewBox="0 0 500 500" className="w-full mx-auto" style={{ overflow: "visible", maxWidth: 480 }}>

      {/* Subtle concentric rings */}
      {[80, 120, 160, HUB_R].map((r, i) => (
        <motion.circle
          key={r}
          cx={CX} cy={CY} r={r}
          fill="none"
          stroke="#3B82F6"
          strokeWidth={r === HUB_R ? 1.5 : 1}
          strokeOpacity={r === HUB_R ? 0.18 : 0.07 + i * 0.02}
          strokeDasharray={r === HUB_R ? "none" : "3 6"}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
      ))}

      {/* Pulsing rings from centre */}
      {[1, 2].map((n) => (
        <motion.circle
          key={`pulse-${n}`}
          cx={CX} cy={CY} r={50}
          fill="none" stroke={ORANGE} strokeWidth={1}
          initial={{ opacity: 0 }}
          animate={inView ? { scale: [1, 4.5], opacity: [0.3, 0] } : {}}
          transition={{ duration: 3.2, delay: 1.5 + n * 1.2, repeat: Infinity, ease: "easeOut" }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
      ))}

      {/* Connection lines + animated data-flow dots for each spoke */}
      {angles.map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const outerX = CX + Math.cos(rad) * HUB_R;
        const outerY = CY + Math.sin(rad) * HUB_R;
        const innerX = CX + Math.cos(rad) * 48;
        const innerY = CY + Math.sin(rad) * 48;

        return (
          <g key={`spoke-${i}`}>
            {/* Dashed connection line */}
            <motion.line
              x1={innerX} y1={innerY} x2={outerX} y2={outerY}
              stroke="#3B82F6"
              strokeWidth={1.2}
              strokeOpacity={0.2}
              strokeDasharray="4 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.06 }}
            />

            {/* Data-flow dot  -  travels inward */}
            <motion.circle
              r={3}
              fill={ORANGE}
              initial={{ cx: outerX, cy: outerY, opacity: 0 }}
              animate={inView ? {
                cx: [outerX, innerX],
                cy: [outerY, innerY],
                opacity: [0, 0.9, 0.9, 0],
              } : {}}
              transition={{
                duration: 2.2,
                delay: 1.2 + i * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Second dot  -  staggered, travels outward */}
            <motion.circle
              r={2.5}
              fill="#3B82F6"
              initial={{ cx: innerX, cy: innerY, opacity: 0 }}
              animate={inView ? {
                cx: [innerX, outerX],
                cy: [innerY, outerY],
                opacity: [0, 0.7, 0.7, 0],
              } : {}}
              transition={{
                duration: 2.6,
                delay: 2.5 + i * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </g>
        );
      })}

      {/* Company logo circles on the outer ring */}
      {angles.map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = CX + Math.cos(rad) * HUB_R;
        const y = CY + Math.sin(rad) * HUB_R;
        const logo = hubLogos[i];
        const clipId = `logo-clip-${i}`;

        return (
          <motion.g
            key={`logo-${i}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          >
            {/* White background circle */}
            <circle cx={x} cy={y} r={LOGO_R + 3} fill="white" />
            <circle cx={x} cy={y} r={LOGO_R + 3} fill="none" stroke="#E5E7EB" strokeWidth={1} />

            {/* Coloured inner circle */}
            <circle cx={x} cy={y} r={LOGO_R} fill={logo.color} />

            {/* Logo icon or abbreviation */}
            <clipPath id={clipId}>
              <circle cx={x} cy={y} r={LOGO_R - 1} />
            </clipPath>
            {logo.icon ? (
              <>
                <image
                  href={`https://cdn.simpleicons.org/${logo.icon}/ffffff`}
                  x={x - 10} y={y - 10}
                  width={20} height={20}
                  clipPath={`url(#${clipId})`}
                />
              </>
            ) : (
              <text
                x={x} y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                className="text-[10px] font-black"
              >
                {logo.abbr}
              </text>
            )}

            {/* Category label */}
            <text
              x={x}
              y={y + LOGO_R + 14}
              textAnchor="middle"
              fill="#616D82"
              className="text-[8px] font-bold"
            >
              {logo.category}
            </text>
          </motion.g>
        );
      })}

      {/* Centre hub  -  ZedOps logo */}
      <motion.circle
        cx={CX} cy={CY} r={46}
        fill={NAVY}
        stroke="#3B82F6"
        strokeWidth={2.5}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />
      <defs>
        <clipPath id="hub-clip">
          <circle cx={CX} cy={CY} r={44} />
        </clipPath>
      </defs>
      <motion.image
        href="/logo.png"
        x={CX - 44} y={CY - 44}
        width={88} height={88}
        clipPath="url(#hub-clip)"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />

      {/* Rotating accent ring around hub */}
      <motion.circle
        cx={CX} cy={CY} r={52}
        fill="none"
        stroke={ORANGE}
        strokeWidth={1.5}
        strokeOpacity={0.35}
        strokeDasharray="6 8"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1, rotate: 360 } : {}}
        transition={{ opacity: { delay: 0.7, duration: 0.3 }, rotate: { duration: 25, repeat: Infinity, ease: "linear" } }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />
    </svg>
  );
}

/* ── Logo tile ─────────────────────────────────────────────────────── */
function LogoTile({ logo }: { logo: Logo }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-1"
      title={logo.name}
    >
      <div
        className="w-8 h-8 flex items-center justify-center text-white font-black text-[9px] leading-none rounded-md"
        style={{ background: logo.color }}
      >
        {logo.icon ? (
          <>
            <img
              src={`https://cdn.simpleicons.org/${logo.icon}/ffffff`}
              alt={logo.name}
              width={14}
              height={14}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                const next = e.currentTarget.nextElementSibling as HTMLElement | null;
                if (next) next.style.display = "flex";
              }}
            />
            <span style={{ display: "none" }}>{logo.abbr}</span>
          </>
        ) : (
          logo.abbr
        )}
      </div>
      <span className="text-[9px] text-[#97A0AF] font-medium leading-none truncate max-w-[56px] text-center">
        {logo.name.split(" ")[0]}
      </span>
    </div>
  );
}

/* ── Category card ─────────────────────────────────────────────────── */
function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      {...scrollMotionProps(isMobile, {
        y: 24,
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1] as const,
      })}
      className="bg-white border border-gray-200 rounded-md p-5 group hover:border-gray-300 transition-all duration-200 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-extrabold text-brand-navy">{category.label}</h3>
        <ArrowRight size={13} className="text-gray-200 group-hover:text-brand-orange group-hover:translate-x-0.5 transition-all duration-200" />
          </div>
      <p className="text-xs text-[#616D82] leading-snug mb-4">{category.description}</p>
      <div className="flex items-center gap-3">
        {category.logos.map((logo) => (
          <LogoTile key={logo.name} logo={logo} />
        ))}
          </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
}

/* ── Main ──────────────────────────────────────────────────────────── */
export default function Platform() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const inView = useInView(ref, { once: true, ...(isMobile ? { margin: "0px" as const } : { margin: "-60px" as const }) });

  return (
    <section id="platform" className="bg-white border-t border-gray-200 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div {...scrollMotionProps(isMobile, { y: 24, duration: 0.5 })} className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="w-3 h-3 rounded-sm bg-brand-navy rotate-45" />
            <span className="text-brand-navy text-xs font-bold tracking-[0.15em] uppercase">Integrations</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-brand-navy leading-tight tracking-tight max-w-3xl mx-auto">
            Built on the <span className="text-brand-navy">ecosystem</span> your<br className="hidden sm:block" />
            construction business runs on.
          </h2>
          <p className="text-[#616D82] text-base mt-5 max-w-xl mx-auto leading-snug">
            ZedOps connects seamlessly to the tools your teams already use  -  no disruption, no data silos, full bi-directional sync.
          </p>
        </motion.div>

        {/* ── Hub illustration ── */}
        <div ref={ref} className="max-w-lg mx-auto mb-14">
          <HubIllustration inView={inView} />
            </div>

        {/* ── Category grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.label} category={cat} index={i} />
          ))}
        </div>

        {/* ── Stats strip ── */}
        <motion.div {...scrollMotionProps(isMobile, { y: 20, duration: 0.5, delay: 0.15 })} className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200 border border-gray-200 overflow-hidden rounded-md">
          {[
            { value: "200+", label: "Integrations" },
            { value: "<1 day", label: "Average setup time" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "SOC 2", label: "Type II certified" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-6 text-center">
              <div className="text-2xl font-black text-brand-navy mb-1">{stat.value}</div>
              <div className="text-xs text-[#97A0AF] font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
