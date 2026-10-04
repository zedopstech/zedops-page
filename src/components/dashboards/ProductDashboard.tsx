import { CalendarDays, Bell, TrendingUp, ShieldCheck, BarChart3, DollarSign, Shapes } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CalendarDays as CalendarIcon } from "lucide-react";
import { useRef } from "react";

import DashboardNavbar from "./shared/DashboardNavbar";
import DashboardHeader from "./shared/DashboardHeader";
import DashboardKpis from "./shared/DashboardKpis";
import { Float } from "./shared/DashboardCard";

export type DashboardActivity = {
  text: string;
  action: "created" | "updated" | "alert";
};

export type DashboardSection =
  | {
      kind: "timeline";
      title: string;
      rows: {
        title: string;
        start: string;
        width: string;
        color: string;
      }[];
    }
  | {
      kind: "stat-grid";
      title: string;
      columns?: number;
      items: {
        label: string;
        value: string;
        sub?: string;
      }[];
    }
  | {
      kind: "bars";
      title: string;
      items: {
        label: string;
        value: string;
      }[];
    }
  | {
      kind: "list";
      title: string;
      items: {
        title: string;
        description?: string;
        meta?: string;
      }[];
    };

export type DashboardData = {
  projectName: string;
  title: string;
  subtitle: string;

  /** Tailwind bg class for the active navbar tab underline, e.g. "bg-[#0065FF]". */
  accent?: string;
  /** Label of the active navbar tab, e.g. "Finance". */
  activeTab?: string;

  /** Custom labels for the four floating cards. Falls back to defaults if omitted. */
  floatingCards?: {
    progress?: string;
    insights?: string;
    upcoming?: string;
    alerts?: string;
  };

  /** Optional 5th floating card rendered at the bottom-center. */
  extraCard?: {
    title: string;
    value?: string;
    sub?: string;
    items?: { title: string; description?: string }[];
  };

  /** Optional replacement for the four corner floating cards (max 4, rendered in order). */
  customFloatCards?: {
    title: string;
    value?: string;
    items?: { label: string; value: string }[];
    icon: LucideIcon;
  }[];

  kpis: {
    label: string;
    value: string;
    description?: string;
    items?: { label: string; value: string }[];
  }[];

  progress: {
    value: string;
    planned: string;
    actual: string;
  };

  insights: {
    title: string;
    description: string;
  }[];

  upcoming: {
    title: string;
    description: string;
    date: string;
  }[];

  alerts: {
    title: string;
    description: string;
  }[];

  mainSections: DashboardSection[];

  sectionColumns?: number;

  activity: DashboardActivity[];
};

type ProductDashboardProps = {
  onWatchDemo?: () => void;
  data: DashboardData;
};

export default function ProductDashboard({
  onWatchDemo,
  data,
}: ProductDashboardProps) {
  const cardTitles = {
    progress: data.floatingCards?.progress ?? "Progress",
    insights: data.floatingCards?.insights ?? "AI Insights",
    upcoming: data.floatingCards?.upcoming ?? "Upcoming Activities",
    alerts: data.floatingCards?.alerts ?? "Alerts",
  };

  return (
    <div className="relative mx-auto w-full max-w-[1400px] overflow-visible px-0 py-10 lg:px-0 lg:py-12">
      <div className="relative overflow-visible rounded-2xl border border-gray-200 bg-[#F8FAFC] shadow-[0_20px_50px_-30px_rgba(23,43,77,0.45)]">

        <DashboardNavbar
          projectName={data.projectName}
          accent={data.accent}
          activeTab={data.activeTab}
        />

        <div className="relative px-3 py-3 sm:px-4 lg:px-5">

          <DashboardHeader title={data.title} subtitle={data.subtitle} />

          <DashboardKpis kpis={data.kpis} />

          {/* =====================================================
              MAIN CONTENT (DATA-DRIVEN)
          ===================================================== */}

          <div className="relative mt-3 h-[380px] overflow-visible rounded-xl border border-gray-100 bg-white">

            <div
              className={`grid h-full grid-cols-1 ${
                data.activity.length > 0
                  ? "lg:grid-cols-[minmax(0,1fr)_270px]"
                  : ""
              }`}
            >

              {/* MAIN SECTIONS */}
              <div className="relative h-full min-w-0 overflow-hidden rounded-s-xl bg-white">
                <div
                  className={`h-full overflow-y-auto p-2 ${
                    data.sectionColumns === 2
                      ? "grid grid-cols-1 gap-2 sm:grid-cols-2"
                      : "space-y-2"
                  }`}
                >
                  {data.mainSections.map((section, index) => (
                    <DashboardSectionCard
                      key={`${section.kind}-${index}`}
                      section={section}
                    />
                  ))}
                </div>

                {/* WATCH DEMO */}
                <button
                  type="button"
                  onClick={onWatchDemo}
                  className="
                    absolute
                    left-[60%]
                    top-[30%]
                    z-[100]
                    flex
                    -translate-x-[50%]
                    -translate-y-[50%]
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    bg-[#172B4D]
                    px-5
                    py-3
                    text-start
                    text-white
                    shadow-[0_18px_35px_-12px_rgba(23,43,77,0.55)]
                    transition-transform
                    duration-200
                    hover:scale-[1.03]
                  "
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white">
                    <span className="ms-1 border-y-[7px] border-s-[10px] border-y-transparent border-s-[#172B4D]" />
                  </span>

                  <span>
                    <span className="block text-sm font-extrabold">
                      Watch demo
                    </span>

                    <span className="mt-0.5 block text-[10px] text-white/60">
                      2 min · No sign-up needed
                    </span>
                  </span>
                </button>

              </div>

              {/* RECENT ACTIVITY */}
              {data.activity.length > 0 && (
              <div className="hidden h-full border-s border-gray-100 bg-white lg:block">

                <div className="flex h-11 items-center justify-between border-b border-gray-100 px-4">

                  <div>
                    <p className="text-sm font-extrabold text-[#172B4D]">
                      Recent activity
                    </p>

                    <p className="text-[8px] text-[#8993A4]">
                      Latest updates
                    </p>
                  </div>

                  <span className="text-[10px] text-[#8993A4]">
                    ◷
                  </span>

                </div>

                <div className="space-y-3 px-4 py-3">

                  {data.activity.map((item, index) => (
                    <RecentActivity
                      key={index}
                      text={item.text}
                      action={item.action}
                    />
                  ))}

                </div>

              </div>
              )}

            </div>

            {/* =====================================================
                FLOATING CARD 1 — PROGRESS
            ===================================================== */}

            {!data.customFloatCards && (
              <>
                <Float duration={3.5} amplitude={4} className="absolute left-[-60px] top-[10px] z-[80] hidden lg:block">
              <div
                className="
                  absolute
                  left-[-70px]
                  top-[-120px]
                  z-[80]
                  hidden
                  w-[235px]
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-4
                  shadow-[0_18px_45px_-18px_rgba(23,43,77,0.38)]
                  lg:block
                "
              >

                <div className="flex items-center gap-2">

                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-orange/10">
                    <TrendingUp
                      size={15}
                      className="text-brand-orange"
                    />
                  </span>

                  <p className="text-sm font-extrabold text-[#172B4D]">
                    {cardTitles.progress}
                  </p>

                </div>

                <p className="mt-3 text-3xl font-black text-[#172B4D]">
                  {data.progress.value}
                </p>

                

                <div className="mt-3 h-2 rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-brand-orange"
                    style={{
                      width: data.progress.value,
                    }}
                  />
                </div>

              </div>
            </Float>

            
            {/* =====================================================
                FLOATING CARD 2 — AI INSIGHTS
            ===================================================== */}
            
            
            <Float duration={3.5} amplitude={4} className="absolute right-[-70px] top-[-120px] z-[80] hidden lg:block">
              <div
                className="
                  absolute
                  right-[-70px]
                  top-[-50px]
                  z-[80]
                  hidden
                  w-[235px]
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-4
                  shadow-[0_18px_45px_-18px_rgba(23,43,77,0.38)]
                  lg:block
                "
              >

                <div className="flex items-center gap-2">

                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-orange/10">
                    <CalendarIcon
                      size={15}
                      className="text-brand-orange"
                    />
                  </span>

                  <p className="text-sm font-extrabold text-[#172B4D]">
                    {cardTitles.insights}
                  </p>

                </div>

                <div className="mt-3 space-y-2">

                  {data.insights.slice(0, 2).map((item) => (
                    <div
                      key={item.title}
                      className="rounded-lg bg-[#FFF7ED] p-2.5"
                    >
                      <p className="text-[9px] font-bold text-[#172B4D]">
                        {item.title}
                      </p>

                      <p className="mt-1 text-[8px] leading-snug text-[#616D82]">
                        {item.description}
                      </p>
                    </div>
                  ))}

                </div>

              </div>
            </Float>

            {/* =====================================================
                FLOATING CARD 3 — UPCOMING
            ===================================================== */}

            <Float duration={3.5} amplitude={4} className="absolute bottom-[20px] left-[-60px] z-[90] hidden lg:block">
              <div
                className="
                  absolute
                  bottom-[20px]
                  left-[-70px]
                  z-[90]
                  hidden
                  w-[245px]
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-4
                  shadow-[0_18px_45px_-18px_rgba(23,43,77,0.38)]
                  lg:block
                "
              >

                <div className="flex items-center gap-2">

                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
                    <CalendarDays
                      size={15}
                      className="text-[#0065FF]"
                    />
                  </span>

                  <p className="text-sm font-extrabold text-[#172B4D]">
                    {cardTitles.upcoming}
                  </p>

                </div>

                <div className="mt-3 space-y-2.5">

                  {data.upcoming.slice(0, 3).map((item) => (
                    <UpcomingItem
                      key={item.title}
                      title={item.title}
                      date={item.date}
                    />
                  ))}

                </div>

              </div>
            </Float>

            {/* =====================================================
                FLOATING CARD 4 — ALERTS
            ===================================================== */}

            <Float duration={3.5} amplitude={4} className="absolute bottom-[-22px] right-[-60px] z-[90] hidden lg:block">
              <div
                className="
                  absolute
                  bottom-[-22px]
                  right-[-70px]
                  z-[90]
                  hidden
                  w-[245px]
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-4
                  shadow-[0_18px_45px_-18px_rgba(23,43,77,0.38)]
                  lg:block
                "
              >

                <div className="flex items-center gap-2">

                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50">
                    <Bell
                      size={15}
                      className="text-red-500"
                    />
                  </span>

                  <p className="text-sm font-extrabold text-[#172B4D]">
                    {cardTitles.alerts}
                  </p>

                </div>

                <div className="mt-3 space-y-2">

                  {data.alerts.slice(0, 3).map((item) => (
                    <AlertItem
                      key={item.title}
                      title={item.title}
                      description={item.description}
                    />
                  ))}

                </div>

              </div>
            </Float>
              </>
            )}

            {data.customFloatCards && (
              <>
                {data.customFloatCards[0] && (
                  <CustomFloatCard
                    card={data.customFloatCards[0]}
                    className="absolute left-[-60px] top-[10px] z-[80] hidden lg:block"
                    inner="absolute left-[-70px] top-[-120px] z-[80] hidden w-[235px] rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_18px_45px_-18px_rgba(23,43,77,0.38)] lg:block"
                  />
                )}
                {data.customFloatCards[1] && (
                  <CustomFloatCard
                    card={data.customFloatCards[1]}
                    className="absolute right-[-70px] top-[-120px] z-[80] hidden lg:block"
                    inner="absolute right-[-70px] top-[-50px] z-[80] hidden w-[235px] rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_18px_45px_-18px_rgba(23,43,77,0.38)] lg:block"
                  />
                )}
                {data.customFloatCards[2] && (
                  <CustomFloatCard
                    card={data.customFloatCards[2]}
                    className="absolute bottom-[20px] left-[-60px] z-[90] hidden lg:block"
                    inner="absolute bottom-[20px] left-[-70px] z-[90] hidden w-[245px] rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_18px_45px_-18px_rgba(23,43,77,0.38)] lg:block"
                  />
                )}
                {data.customFloatCards[3] && (
                  <CustomFloatCard
                    card={data.customFloatCards[3]}
                    className="absolute bottom-[-22px] right-[-60px] z-[90] hidden lg:block"
                    inner="absolute bottom-[-22px] right-[-70px] z-[90] hidden w-[245px] rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_18px_45px_-18px_rgba(23,43,77,0.38)] lg:block"
                  />
                )}
              </>
            )}

            {/* =====================================================
                FLOATING CARD 5 — EXTRA (BOTTOM CENTER, OPTIONAL)
            ===================================================== */}

            {data.extraCard && (
              <Float duration={3.5} amplitude={4} className="absolute bottom-[-28px] left-1/2 z-[85] hidden -translate-x-1/2 lg:block">
                <div
                  className="
                    absolute
                    bottom-[-28px]
                    left-1/2
                    z-[85]
                    hidden
                    w-[230px]
                    -translate-x-1/2
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-4
                    shadow-[0_18px_45px_-18px_rgba(23,43,77,0.38)]
                    lg:block
                  "
                >

                  <div className="flex items-center gap-2">

                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-orange/10">
                      <ShieldCheck
                        size={15}
                        className="text-brand-orange"
                      />
                    </span>

                    <p className="text-sm font-extrabold text-[#172B4D]">
                      {data.extraCard.title}
                    </p>

                  </div>

                  

                  {data.extraCard.sub && (
                    <p className="text-[9px] text-[#616D82]">
                      {data.extraCard.sub}
                    </p>
                  )}

                  {data.extraCard.items && (
                    <div className="mt-3 space-y-2">
                      {data.extraCard.items.slice(0, 3).map((item) => (
                        <div
                          key={item.title}
                          className="rounded-lg bg-[#FFF7ED] p-2.5"
                        >
                          <p className="text-[9px] font-bold text-[#172B4D]">
                            {item.title}
                          </p>

                          {item.description && (
                            <p className="mt-1 text-[8px] leading-snug text-[#616D82]">
                              {item.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </Float>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CUSTOM FLOATING CARD (corner, data-driven)
============================================================ */

function CustomFloatCard({
  card,
  className,
  inner,
}: {
  card: NonNullable<DashboardData["customFloatCards"]>[number];
  className: string;
  inner: string;
}) {
  const Icon = card.icon;
  return (
    <Float duration={3.5} amplitude={4} className={className}>
      <div className={inner}>
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-orange/10">
            <Icon size={15} className="text-brand-orange" />
          </span>
          <p className="text-sm font-extrabold text-[#172B4D]">{card.title}</p>
        </div>

        {card.value && (
          <p className="mt-3 text-3xl font-black text-[#172B4D]">{card.value}</p>
        )}

        {card.items && (
          <div className="mt-3 space-y-1.5">
            {card.items.map((it) => (
              <div
                key={it.label}
                className="flex items-center justify-between text-[9px]"
              >
                <span className="text-[#616D82]">{it.label}</span>
                <span className="font-bold text-[#172B4D]">{it.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Float>
  );
}

/* ============================================================
   MAIN SECTION CARD
============================================================ */

function DashboardSectionCard({ section }: { section: DashboardSection }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
      <div className="flex h-11 items-center gap-2 border-b border-gray-100 px-4">
        <span className="h-2 w-2 rounded-full bg-brand-orange" />
        <p className="text-sm font-extrabold text-[#172B4D]">
          {section.title}
        </p>
      </div>

      <div className="p-4">
        {section.kind === "timeline" && (
          <div className="space-y-1">
            {section.rows.map((row) => (
              <TimelineRow
                key={row.title}
                title={row.title}
                start={row.start}
                width={row.width}
                color={row.color}
              />
            ))}
          </div>
        )}

        {section.kind === "stat-grid" && (
          <div
            className={`grid grid-cols-2 gap-3 ${
              section.columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
            }`}
          >
            {section.items.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-gray-100 bg-[#F8FAFC] p-3"
              >
                <p className="text-[9px] font-bold tracking-wide text-[#5E6C84]">
                  {item.label}
                </p>

                <p className="mt-1 text-xl font-extrabold text-[#172B4D]">
                  {item.value}
                </p>

                {item.sub && (
                  <p className="mt-0.5 text-[9px] text-[#8993A4]">
                    {item.sub}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {section.kind === "bars" && <BarsBlock items={section.items} />}

        {section.kind === "list" && (
          <div className="space-y-2">
            {section.items.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-gray-100 bg-[#F8FAFC] p-2.5"
              >
                <p className="text-[9px] font-bold text-[#172B4D]">
                  {item.title}
                </p>

                {item.description && (
                  <p className="mt-1 text-[8px] leading-snug text-[#616D82]">
                    {item.description}
                  </p>
                )}

                {item.meta && (
                  <p className="mt-1 text-[8px] text-[#8993A4]">
                    {item.meta}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   BARS BLOCK
============================================================ */

function BarsBlock({ items }: { items: { label: string; value: string }[] }) {
  const numerics = items.map(
    (item) => parseFloat(item.value.replace(/[^0-9.]/g, "")) || 0,
  );

  const hasPercent = items.every((item) => item.value.includes("%"));
  const max = hasPercent ? 100 : Math.max(...numerics, 1);

  return (
    <div className="space-y-2.5">
      {items.map((item, index) => {
        const numeric = numerics[index];
        const width = max > 0 ? Math.min(100, (numeric / max) * 100) : 0;

        return (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[9px] font-semibold text-[#172B4D]">
                {item.label}
              </span>

              <span className="text-[9px] font-bold text-[#172B4D]">
                {item.value}
              </span>
            </div>

            <div className="h-2 rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-brand-orange"
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   TIMELINE ROW
=============================================================== */

function TimelineRow({
  title,
  start,
  width,
  color,
}: {
  title: string;
  start: string;
  width: string;
  color: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3 last:mb-0">
      <div className="w-[105px] shrink-0 truncate text-[9px] font-bold text-[#172B4D] sm:w-[130px]">
        {title}
      </div>

      <div className="relative h-5 min-w-0 flex-1 rounded-full bg-[#F0F2F5]">
        <div className="pointer-events-none absolute inset-0 grid grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <span
              key={index}
              className="border-s border-gray-200"
            />
          ))}
        </div>

        <div
          className={`absolute top-0 h-full rounded-full ${color}`}
          style={{
            left: start,
            width,
          }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   UPCOMING ITEM
=============================================================== */

function UpcomingItem({
  title,
  date,
}: {
  title: string;
  date: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">

      <div>
        <p className="text-[9px] font-bold text-[#172B4D]">
          {title}
        </p>

        <p className="text-[8px] text-[#616D82]">
          Scheduled activity
        </p>
      </div>

      <span className="rounded bg-blue-50 px-2 py-1 text-[8px] font-bold text-blue-600">
        {date}
      </span>

    </div>
  );
}

/* ============================================================
   ALERT ITEM
=============================================================== */

function AlertItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg bg-[#FFF2F2] p-2.5">
      <p className="text-[9px] font-bold text-[#172B4D]">
        {title}
      </p>

      <p className="mt-1 text-[8px] leading-snug text-[#616D82]">
        {description}
      </p>
    </div>
  );
}

/* ============================================================
   RECENT ACTIVITY
=============================================================== */

function RecentActivity({
  text,
  action,
}: {
  text: string;
  action: "created" | "updated" | "alert";
}) {
  const actionClass =
    action === "created"
      ? "bg-[#E8FFF4] text-[#00875A]"
      : action === "updated"
        ? "bg-[#EAF2FF] text-[#0065FF]"
        : "bg-[#FFF0F0] text-[#DE350B]";

  return (
    <div className="flex items-start gap-2">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3578E5] text-[9px] font-bold text-white">
        A
      </span>

      <div className="min-w-0">
        <p className="truncate text-[9px] text-[#42526E]">
          {text}
        </p>

        <div className="mt-0.5 flex items-center gap-1">
          <span className="text-[8px] text-[#8993A4]">
            Admin
          </span>

          <span
            className={`rounded px-1 py-0.5 text-[7px] font-bold ${actionClass}`}
          >
            {action}
          </span>
        </div>
      </div>
    </div>
  );
}
