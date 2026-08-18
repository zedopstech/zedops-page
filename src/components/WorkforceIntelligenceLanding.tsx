import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  BriefcaseBusiness,
  CalendarClock,
  Check,
  ChevronDown,
  ChevronLeft,
  ClipboardCheck,
  CloudOff,
  Gauge,
  MonitorSmartphone,
  WifiOff,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import FinalCTA from "@/components/FinalCTA";
import SectionHeader from "@/components/SectionHeader";
import type { PlatformFeatureSection } from "@/data/platformFeatures";
import {
  workforceAiSoon,
  workforceCallout,
  workforceCta,
  workforceFeatures,
  workforceHero,
  workforceHighlights,
  workforceWhy,
  workforceWorkflow,
} from "@/data/workforceIntelligencePage";

type NavModule = Pick<PlatformFeatureSection, "id" | "title">;
type WorkforceFeature = (typeof workforceFeatures)[number];
type WorkforceAppMockCard = {
  title: string;
  icon: typeof Users;
  accent: keyof typeof appCardTone;
  lines: string[];
  footer?: string;
  stat?: string;
  caption?: string;
};

const phoneCrew = [
  { name: "R. Kumar", trade: "Mason", status: "In" },
  { name: "A. Singh", trade: "Electrician", status: "In" },
  { name: "M. Patel", trade: "Helper", status: "Out" },
];

const workforceAppCards: WorkforceAppMockCard[] = [
  {
    title: "Complete Employee Database",
    icon: Users,
    accent: "blue" as const,
    lines: ["Mark K. • Active", "Rahul S. • Active", "Dinesh H. • Active"],

  },
  {
    title: "Attendance & Leave Management",
    icon: CalendarClock,
    accent: "green" as const,
    lines: ["Check In 07:46 AM", "GPS location tracking", "Leave management"],

  },
  {
    title: "Requests & Approvals",
    icon: ClipboardCheck,
    accent: "orange" as const,
    lines: ["Leave request", "Asset request", "Punch correction"],

  },
  {
    title: "Task Management",
    icon: BriefcaseBusiness,
    accent: "purple" as const,
    lines: ["Assigned", "In progress", "Completed"],

  },
  {
    title: "Performance Scorecard",
    icon: Gauge,
    accent: "blue" as const,
    stat: "84",
    caption: "/100",
    lines: ["Punctuality", "Task completion", "Productivity"],
  },
  {
    title: "Productivity Tracking",
    icon: TrendingUp,
    accent: "teal" as const,
    stat: "92%",
    caption: "Today",
    lines: ["Team productivity", "Work logs connected from daily execution"],
  },
];

const appCardTone = {
  blue: { wash: "bg-[#EAF2FF]", icon: "text-[#2563EB]" },
  green: { wash: "bg-[#E8F7ED]", icon: "text-[#16A34A]" },
  orange: { wash: "bg-[#FFF1E8]", icon: "text-brand-orange" },
  purple: { wash: "bg-[#F1EAFF]", icon: "text-[#7C3AED]" },
  teal: { wash: "bg-[#E6FAFB]", icon: "text-[#0891B2]" },
};

function WorkforceFeatureCard({
  feat,
  open,
  onToggle,
}: {
  feat: WorkforceFeature;
  open: boolean;
  onToggle: () => void;
}) {
  const Icon = feat.icon;
  const detailsId = `workforce-feature-${feat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <article className="rounded-xl border border-white/10 bg-brand-navy shadow-[0_12px_28px_-16px_rgba(23,43,77,0.35)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={detailsId}
        className="flex w-full items-center justify-between gap-3 p-5 text-left"
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/30">
            <Icon size={18} className="text-brand-orange" aria-hidden />
          </span>
          <h3 className="min-w-0 text-sm font-extrabold leading-snug text-brand-orange sm:text-[15px]">{feat.title}</h3>
        </div>
        <ChevronDown
          size={20}
          className={`shrink-0 text-white/70 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <div id={detailsId} className="border-t border-white/10 px-5 pt-3 pb-5">
          <ul className="flex flex-col gap-2">
            {feat.bullets.map((line) => (
              <li key={line} className="flex items-start gap-2 text-sm leading-snug text-white/80">
                <Check size={14} className="mt-0.5 shrink-0 text-brand-orange" strokeWidth={2.4} aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

function WorkforceFeaturesGrid({ isMobile }: { isMobile: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {workforceFeatures.map((feat, i) => (
        <motion.div
          key={feat.title}
          {...scrollMotionProps(isMobile, { y: 14, duration: 0.35, delay: Math.min(i * 0.04, 0.2) })}
        >
          <WorkforceFeatureCard
            feat={feat}
            open={openIndex === i}
            onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
          />
        </motion.div>
      ))}
    </div>
  );
}

function WorkforcePhoneMock() {
  return (
    <div className="mx-auto w-full max-w-[220px]">
      <div className="overflow-hidden rounded-[1.65rem] border-[5px] border-[#1B2433] bg-[#0F1724] shadow-[0_24px_48px_-18px_rgba(23,43,77,0.55)]">
        <div className="mx-auto mt-1.5 h-1 w-10 rounded-full bg-white/25" />
        <div className="m-1.5 overflow-hidden rounded-[1.1rem] bg-[#F2F4F7]">
          <div className="flex items-center justify-between bg-white px-2 py-1.5">
            <ChevronLeft size={14} className="text-brand-navy" strokeWidth={2.2} aria-hidden />
            <p className="text-[11px] font-extrabold tracking-tight text-brand-navy">Employee App</p>
            <span className="relative">
              <Bell size={12} className="text-brand-navy" aria-hidden />
              <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-[#DE350B]" />
            </span>
          </div>
          <div className="space-y-1 p-1.5">
            <div className="rounded-lg border border-gray-200 bg-white px-2 py-1.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] font-extrabold leading-none text-brand-navy">15 Aug, 2026</p>
                  <p className="mt-0.5 text-[9px] font-semibold text-[#6B778C]">Tower B • Day shift</p>
                </div>
                <span className="rounded-md bg-[#E3FCEF] px-1.5 py-0.5 text-[9px] font-bold text-[#006644]">
                  Checked In 07:58
                </span>
              </div>
            </div>
            <ul className="m-0 list-none space-y-0.5 p-0">
              {phoneCrew.map((person) => (
                <li key={person.name} className="flex items-center gap-1.5 rounded-md bg-white px-2 py-1 ring-1 ring-gray-100">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-navy text-[8px] font-bold text-white">
                    {person.name[0]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold leading-none text-brand-navy">{person.name}</p>
                    <p className="mt-0.5 text-[8px] font-medium text-[#6B778C]">{person.trade}</p>
                  </div>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[8px] font-bold ${
                      person.status === "In" ? "bg-[#E3FCEF] text-[#006644]" : "bg-[#FFEBE6] text-[#BF2600]"
                    }`}
                  >
                    {person.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkforceHeroMock() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
      <div
        className="pointer-events-none absolute -inset-8 rounded-[2rem] opacity-65 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 55% 40%, rgba(254,93,2,0.14) 0%, rgba(23,43,77,0.06) 48%, transparent 72%)",
        }}
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-2xl border border-brand-navy/8 bg-[#F4F7FB] shadow-[0_20px_48px_-24px_rgba(23,43,77,0.28)] lg:w-[118%]">
        <div className="flex items-center justify-between border-b border-gray-200/80 bg-white px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-orange" />
            <p className="text-[11px] font-extrabold tracking-wide text-brand-navy uppercase">Workforce Dashboard</p>
          </div>
          <p className="text-[10px] font-semibold text-[#6B778C]">Tower B · 15 Aug</p>
        </div>
        <div className="grid gap-3 p-3 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] sm:p-4">
          <div className="rounded-xl border border-gray-200 bg-white p-3">
            <p className="mb-2 text-[10px] font-bold tracking-wide text-[#97A0AF] uppercase">Attendance</p>
            <div className="flex items-center gap-3">
              <div
                className="relative h-16 w-16 shrink-0 rounded-full"
                style={{ background: "conic-gradient(#22A06B 0 86%, #E6E9EE 86% 100%)" }}
                aria-hidden
              >
                <span className="absolute inset-[6px] flex flex-col items-center justify-center rounded-full bg-white">
                  <span className="text-[11px] font-black leading-none text-brand-navy">86%</span>
                  <span className="text-[8px] font-semibold text-[#6B778C]">In</span>
                </span>
              </div>
              <ul className="m-0 min-w-0 flex-1 list-none space-y-1.5 p-0">
                {[
                  { label: "Checked in", value: "42", color: "#22A06B" },
                  { label: "On leave", value: "4", color: "#FE5D02" },
                  { label: "Not in", value: "3", color: "#0052CC" },
                ].map((row) => (
                  <li key={row.label} className="flex items-center justify-between gap-2 text-[10px]">
                    <span className="flex items-center gap-1.5 font-medium text-[#42526E]">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: row.color }} />
                      {row.label}
                    </span>
                    <span className="font-extrabold text-brand-navy">{row.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-3">
            <p className="mb-2 text-[10px] font-bold tracking-wide text-[#97A0AF] uppercase">Daily attendance</p>
            <div className="flex h-[72px] items-end gap-1.5">
              {["48%", "62%", "70%", "54%", "86%", "78%", "64%"].map((h, i) => (
                <span key={i} className="flex-1 rounded-t-sm bg-brand-orange/80" style={{ height: h }} />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-3 sm:col-span-2">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] font-bold tracking-wide text-[#97A0AF] uppercase">Performance</p>
              <p className="text-[11px] font-extrabold text-brand-navy">84 / 100</p>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#E6E9EE]">
              <div className="h-full w-[84%] rounded-full bg-brand-orange" />
            </div>
            <ul className="m-0 mt-2 grid list-none grid-cols-3 gap-2 p-0">
              {[
                { label: "Punctuality", value: "92%" },
                { label: "Task completion", value: "88%" },
                { label: "Team today", value: "92%" },
              ].map((row) => (
                <li key={row.label} className="rounded-md bg-[#F8FAFC] px-2 py-1.5 text-center">
                  <p className="text-[8px] font-bold tracking-wide text-[#6B778C] uppercase">{row.label}</p>
                  <p className="text-[12px] font-extrabold text-brand-navy">{row.value}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-8 left-2 w-[min(100%,200px)] sm:left-4 sm:w-[210px] lg:-bottom-10 lg:left-0">
        <WorkforcePhoneMock />
      </div>
    </div>
  );
}

function WorkforceAppCard({
  title,
  icon: Icon,
  accent,
  lines,
  footer,
  stat,
  caption,
}: WorkforceAppMockCard) {
  const tone = appCardTone[accent];

  const renderCardBody = () => {
    if (title === "Complete Employee Database") {
      return (
        <>
          <div className="mt-3 flex flex-1 flex-col gap-2">
            <div className="rounded-2xl bg-[#F8FAFC] p-2.5 ring-1 ring-[#EEF2F7]">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2 border-b border-[#E7ECF3] pb-2 text-[10px] font-bold uppercase tracking-wide text-[#97A0AF]">
              <span>Name</span>
              <span>Role</span>
              <span>Status</span>
            </div>
            <div className="space-y-2 pt-2.5">
              {[
                ["Mark K.", "Tech", "Active"],
                ["Rahul S.", "Super", "Active"],
                ["Dinesh H.", "Helper", "Active"],
              ].map(([name, role, status]) => (
                <div key={name} className="grid grid-cols-[1.4fr_1fr_1fr] gap-2 text-[12px] text-[#56657A]">
                  <span className="font-semibold text-brand-navy">{name}</span>
                  <span>{role}</span>
                  <span className="font-semibold text-[#16A34A]">{status}</span>
                </div>
              ))}
            </div>
            </div>
            <div className="flex-1 rounded-2xl bg-[#F8FAFC] p-2.5 ring-1 ring-[#EEF2F7]">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-[#97A0AF]">Workforce mix</p>
              <div className="flex h-12 items-end gap-1.5">
                {["84%", "72%", "58%"].map((h, i) => (
                  <span
                    key={i}
                    className={`flex-1 rounded-t-sm ${
                      i === 0 ? "bg-[#2563EB]" : i === 1 ? "bg-[#16A34A]" : "bg-brand-orange"
                    }`}
                    style={{ height: h }}
                  />
                ))}
              </div>
            </div>
          </div>
          {footer ? (
            <div className="mt-auto pt-3">
              <div className="inline-flex rounded-xl bg-[#FFF4EC] px-3 py-1.5 text-xs font-bold text-brand-orange ring-1 ring-[#FFE2CE]">
                {footer}
              </div>
            </div>
          ) : null}
        </>
      );
    }

    if (title === "Attendance & Leave Management") {
      return (
        <>
          <div className="mt-3 flex flex-1 flex-col gap-2">
            <div className="flex-1 rounded-xl bg-[#F8FAFC] p-2.5 ring-1 ring-[#EEF2F7]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#97A0AF]">Check In</p>
                  <p className="mt-1 text-[13px] font-extrabold text-brand-navy">07:46 AM</p>
                </div>
                <span className="rounded-full bg-[#E8F7ED] px-2 py-1 text-[10px] font-bold text-[#16A34A]">Present</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[12px] text-[#56657A]">
              {["Multiple Sites", "GPS Location", "Leave Management", "Attendance Reports"].map((item) => (
                <div key={item} className="rounded-xl bg-[#F8FAFC] px-2.5 py-1.5 ring-1 ring-[#EEF2F7]">
                  {item}
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-[#F8FAFC] p-2.5 ring-1 ring-[#EEF2F7]">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#97A0AF]">Weekly attendance</p>
                <p className="text-[10px] font-bold text-brand-navy">86%</p>
              </div>
              <div className="flex h-12 items-end gap-1.5">
                {["48%", "66%", "72%", "58%", "86%", "78%", "70%"].map((h, i) => (
                  <span
                    key={i}
                    className={`flex-1 rounded-t-sm ${i === 4 ? "bg-[#16A34A]" : "bg-[#CDE7D5]"}`}
                    style={{ height: h }}
                  />
                ))}
              </div>
            </div>
          </div>
          {footer ? (
            <div className="mt-auto pt-3">
              <div className="inline-flex rounded-xl bg-[#FFF4EC] px-3 py-1.5 text-xs font-bold text-brand-orange ring-1 ring-[#FFE2CE]">
                {footer}
              </div>
            </div>
          ) : null}
        </>
      );
    }

    if (title === "Requests & Approvals") {
      return (
        <>
          <div className="mt-3 flex flex-1 flex-col gap-2">
            <div className="space-y-1.5 rounded-2xl bg-[#F8FAFC] p-2.5 ring-1 ring-[#EEF2F7]">
              {[
                ["Leave Request", "Pending", "text-brand-orange"],
                ["Asset Request", "Approved", "text-[#16A34A]"],
                ["Punch Correction", "Pending", "text-brand-orange"],
              ].map(([label, status, statusColor]) => (
                <div key={label} className="flex items-center justify-between gap-2 rounded-xl bg-white px-2.5 py-2 ring-1 ring-[#EEF2F7] text-[12px]">
                  <span className="font-medium text-brand-navy">{label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      status === "Approved"
                        ? "bg-[#E8F7ED] text-[#16A34A]"
                        : "bg-[#FFF4EC] text-brand-orange"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex-1 rounded-2xl bg-[#F8FAFC] p-2.5 ring-1 ring-[#EEF2F7]">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#97A0AF]">Approval mix</p>
                <p className="text-[10px] font-bold text-brand-navy">8 items</p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="relative h-14 w-14 shrink-0 rounded-full"
                  style={{ background: "conic-gradient(#16A34A 0 40%, #FE5D02 40% 82%, #E6E9EE 82% 100%)" }}
                  aria-hidden
                >
                  <span className="absolute inset-[6px] rounded-full bg-white" />
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center gap-2 text-[#56657A]">
                    <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
                    Approved
                  </div>
                  <div className="flex items-center gap-2 text-[#56657A]">
                    <span className="h-2 w-2 rounded-full bg-brand-orange" />
                    Pending
                  </div>
                </div>
              </div>
            </div>
          </div>
          {footer ? (
            <div className="mt-auto pt-3">
              <div className="inline-flex rounded-xl bg-[#FFF4EC] px-3 py-1.5 text-xs font-bold text-brand-orange ring-1 ring-[#FFE2CE]">
                {footer}
              </div>
            </div>
          ) : null}
        </>
      );
    }

    if (title === "Task Management") {
      return (
        <>
          <div className="mt-3 flex flex-1 flex-col gap-2">
            <div className="rounded-2xl bg-[#F8FAFC] p-2.5 ring-1 ring-[#EEF2F7]">
              <div className="grid grid-cols-3 gap-2 border-b border-[#E7ECF3] pb-2 text-center text-[10px] font-bold uppercase tracking-wide text-[#97A0AF]">
                <span>Assigned</span>
                <span>In Progress</span>
                <span>Completed</span>
              </div>
              <div className="space-y-2 pt-2.5 text-[12px]">
                {[
                  ["Conduit Installation", "In Progress", "text-[#2563EB]"],
                  ["Lighting Fixture Wiring", "In Progress", "text-[#2563EB]"],
                  ["Panel Termination", "Completed", "text-[#16A34A]"],
                ].map(([label, status, statusColor]) => (
                  <div key={label} className="flex items-center justify-between gap-2 rounded-xl bg-white px-2.5 py-2 ring-1 ring-[#EEF2F7]">
                    <span className="font-medium text-brand-navy">{label}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        status === "Completed"
                          ? "bg-[#E8F7ED] text-[#16A34A]"
                          : "bg-[#EEF4FF] text-[#2563EB]"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 rounded-2xl bg-[#F8FAFC] p-2.5 ring-1 ring-[#EEF2F7]">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#97A0AF]">Completion trend</p>
                <p className="text-[10px] font-bold text-brand-navy">74%</p>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#E7ECF3]">
                <div className="h-full w-[74%] rounded-full bg-[#7C3AED]" />
              </div>
            </div>
          </div>
          {footer ? (
            <div className="mt-auto pt-3">
              <div className="inline-flex rounded-xl bg-[#FFF4EC] px-3 py-1.5 text-xs font-bold text-brand-orange ring-1 ring-[#FFE2CE]">
                {footer}
              </div>
            </div>
          ) : null}
        </>
      );
    }

    if (title === "Performance Scorecard") {
      return (
        <>
          <div className="mt-4 flex flex-1 items-center gap-4 rounded-2xl bg-[#F8FAFC] p-3 ring-1 ring-[#EEF2F7]">
            <div
              className="relative h-20 w-20 shrink-0 rounded-full"
              style={{ background: "conic-gradient(#16A34A 0 84%, #E7ECF3 84% 100%)" }}
              aria-hidden
            >
              <span className="absolute inset-[8px] flex flex-col items-center justify-center rounded-full bg-white">
                <span className="text-[28px] font-black leading-none text-brand-navy">{stat}</span>
                <span className="text-[10px] font-bold text-[#6B778C]">{caption}</span>
              </span>
            </div>
            <div className="grid flex-1 gap-2">
              {[
                ["Punctuality", "92%"],
                ["Task completion", "88%"],
                ["Productivity", "84%"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-1 flex items-center justify-between text-[12px]">
                    <span className="text-[#56657A]">{label}</span>
                    <span className="font-bold text-brand-navy">{value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#E7ECF3]">
                    <div className="h-full rounded-full bg-[#16A34A]" style={{ width: value }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex gap-1 text-[#FF9A00]">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-sm">★</span>
            ))}
          </div>
        </>
      );
    }

    if (title === "Productivity Tracking") {
      return (
        <>
          <div className="mt-5 flex items-end gap-1.5">
            <span className="text-[44px] font-black leading-none tracking-tight text-brand-navy">{stat}</span>
            {caption ? <span className="pb-1.5 text-base font-semibold text-[#6B778C]">{caption}</span> : null}
          </div>
          <div className="mt-4 flex flex-1 flex-col rounded-2xl bg-[#F8FAFC] p-3 ring-1 ring-[#EEF2F7]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[12px] font-medium text-[#6B778C]">Team productivity</p>
                <p className="mt-1 text-[13px] font-semibold text-brand-navy">Work logs connected from daily execution</p>
              </div>
              <div className="flex -space-x-2">
                {["A", "R", "D"].map((initial, i) => (
                  <span
                    key={initial}
                    className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white ${
                      i === 0 ? "bg-[#16A34A]" : i === 1 ? "bg-[#2563EB]" : "bg-brand-orange"
                    }`}
                  >
                    {initial}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#97A0AF]">Output trend</p>
                <p className="text-[10px] font-bold text-brand-navy">Up 12%</p>
              </div>
              <div className="flex h-12 items-end gap-1.5">
                {["34%", "48%", "46%", "58%", "64%", "78%", "92%"].map((h, i) => (
                  <span
                    key={i}
                    className={`flex-1 rounded-t-sm ${i === 6 ? "bg-[#0891B2]" : "bg-[#CDEFF4]"}`}
                    style={{ height: h }}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        {stat ? (
          <div className="mt-5 flex items-end gap-1.5">
            <span className="text-[44px] font-black leading-none tracking-tight text-brand-navy">{stat}</span>
            {caption ? <span className="pb-1.5 text-base font-semibold text-[#6B778C]">{caption}</span> : null}
          </div>
        ) : null}
        <ul className="m-0 mt-5 list-none space-y-2.5 p-0">
          {lines.map((line) => (
            <li key={line} className="flex items-start gap-2.5 text-[15px] leading-snug text-[#56657A]">
              <span className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${tone.wash}`} />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        {footer ? <p className="mt-auto pt-5 text-sm font-bold text-brand-orange">{footer}</p> : null}
      </>
    );
  };

  return (
    <article className="flex h-full flex-col rounded-[18px] border border-[#E9EDF5] bg-white p-3 shadow-[0_8px_20px_-18px_rgba(23,43,77,0.16)]">
      <div className="flex items-start gap-2.5">
        <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${tone.wash}`}>
          <Icon size={16} className={tone.icon} aria-hidden />
        </span>
        <h3 className="text-[15px] font-extrabold leading-[1.15] tracking-tight text-brand-navy">{title}</h3>
      </div>
      <div className="flex flex-1 flex-col">{renderCardBody()}</div>
    </article>
  );
}

function WorkforceImagePlaceholder({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  icon: typeof MonitorSmartphone;
}) {
  return (
    <article className="relative h-full overflow-hidden rounded-[18px] border border-[#F3DCCB] bg-white p-3 shadow-[0_8px_20px_-18px_rgba(23,43,77,0.16)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(1,47,176,0.12) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(1,47,176,0.12) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div className="relative z-10 flex h-full min-h-[126px] flex-col rounded-2xl bg-[#F8FAFC] px-3 py-3 ring-1 ring-[#EEF2F7]">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DFF5FB]">
            <Icon size={18} className="text-[#0891B2]" aria-hidden />
          </span>
          <p className="text-[15px] font-extrabold leading-snug text-brand-navy">{title}</p>
        </div>

        <div className="relative mt-2 flex flex-1 items-end justify-center">
          <div className="relative w-full max-w-[220px]">
            <div className="overflow-hidden rounded-[16px] border-[4px] border-[#111827] bg-white shadow-[0_16px_28px_-18px_rgba(23,43,77,0.35)]">
              <div className="flex items-center justify-between border-b border-[#E7ECF3] px-2.5 py-1.5">
                <span className="text-[9px] font-bold tracking-wide text-[#97A0AF] uppercase">Workforce Dashboard</span>
                <span className="h-2 w-2 rounded-full bg-[#CBD5E1]" />
              </div>
              <div className="grid gap-1.5 bg-[#F8FAFC] p-2">
                <div className="grid grid-cols-4 gap-2">
                  {[
                    ["Emp", "532"],
                    ["Present", "412"],
                    ["On Leave", "32"],
                    ["Off Duty", "21"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-lg bg-white p-1 ring-1 ring-[#EEF2F7]">
                      <p className="text-[8px] font-bold uppercase tracking-wide text-[#97A0AF]">{label}</p>
                      <p className="mt-1 text-[11px] font-extrabold text-brand-navy">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-[1fr_1fr] gap-2">
                    <div className="rounded-lg bg-white p-1 ring-1 ring-[#EEF2F7]">
                    <p className="text-[8px] font-bold uppercase tracking-wide text-[#97A0AF]">Attendance</p>
                    <div className="mt-2 flex items-center justify-center">
                      <div
                        className="relative h-14 w-14 rounded-full"
                        style={{ background: "conic-gradient(#16A34A 0 78%, #E7ECF3 78% 100%)" }}
                        aria-hidden
                      >
                        <span className="absolute inset-[6px] flex items-center justify-center rounded-full bg-white text-[10px] font-black text-brand-navy">
                          78%
                        </span>
                      </div>
                    </div>
                  </div>

                    <div className="rounded-lg bg-white p-1 ring-1 ring-[#EEF2F7]">
                    <p className="text-[8px] font-bold uppercase tracking-wide text-[#97A0AF]">Trend</p>
                    <div className="mt-2 flex h-14 items-end gap-1">
                      {["34%", "48%", "44%", "60%", "72%", "66%", "82%"].map((h, i) => (
                        <span
                          key={i}
                          className={`flex-1 rounded-t-sm ${i === 6 ? "bg-[#2563EB]" : "bg-[#CFE0FF]"}`}
                          style={{ height: h }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute right-[-4px] bottom-[-2px] overflow-hidden rounded-[15px] border-[4px] border-[#111827] bg-white shadow-[0_16px_28px_-18px_rgba(23,43,77,0.35)]">
              <div className="h-[96px] w-[48px] bg-[#F8FAFC] px-1 py-1.5">
                <div className="mb-2 rounded-lg bg-[#16A34A] px-1.5 py-2 text-left text-[7px] font-bold text-white">
                  Checked in
                  <div className="mt-0.5 text-[8px]">07:58</div>
                </div>
                <div className="space-y-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-2 rounded-full bg-white ring-1 ring-[#EEF2F7]" />
                  ))}
                </div>
                <div className="mt-2 flex justify-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-2 text-center text-[11px] leading-snug text-[#6B778C]">{subtitle}</p>
      </div>
    </article>
  );
}

function WorkforceOfflineCard() {
  return (
    <article className="h-full rounded-[18px] border border-[#E9EDF5] bg-white p-3 shadow-[0_8px_20px_-18px_rgba(23,43,77,0.16)]">
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF]">
          <CloudOff size={16} className="text-[#2563EB]" aria-hidden />
        </span>
        <h3 className="text-[15px] font-extrabold leading-[1.15] tracking-tight text-brand-navy">Offline Capability</h3>
      </div>

      <div className="mt-4 flex min-h-[148px] flex-1 flex-col justify-center rounded-2xl bg-[#F8FAFC] p-4 text-center ring-1 ring-[#EEF2F7]">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D9E4FF] bg-white">
            <WifiOff size={18} className="text-[#2563EB]" aria-hidden />
          </span>
          <div className="flex h-12 items-end gap-1.5">
            {["34%", "56%", "78%"].map((h, i) => (
              <span
                key={i}
                className={`w-2 rounded-t-sm ${i === 2 ? "bg-[#2563EB]" : "bg-[#D9E4FF]"}`}
                style={{ height: h }}
              />
            ))}
          </div>
        </div>
        <ul className="m-0 list-none space-y-2.5 p-0 text-[15px] text-[#56657A]">
          {["Work offline", "Sync when online", "No lost updates"].map((line) => (
            <li key={line} className="flex items-center justify-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function WorkforceIntelligenceLanding(_props: {
  prev: NavModule | null;
  next: NavModule | null;
}) {
  const isMobile = useIsMobile();

  return (
    <>
      <section className="relative overflow-hidden border-b border-gray-100">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(155deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.82) 35%, rgba(255,255,255,0.76) 62%, rgba(255,255,255,0.86) 100%), url('/new-hero-banner.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: [
              "linear-gradient(rgba(1,47,176,0.045) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(1,47,176,0.045) 1px, transparent 1px)",
              "linear-gradient(rgba(1,47,176,0.02) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(1,47,176,0.02) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col justify-center"
            >
              <p className="mb-3 text-xs font-bold tracking-[0.16em] text-brand-orange uppercase">{workforceHero.eyebrow}</p>
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-navy sm:text-5xl">
                {workforceHero.titleLead}
                <span className="text-brand-orange">{workforceHero.titleAccent}</span>
                {workforceHero.titleRest}
                <span className="text-brand-orange">{workforceHero.titleAccent2}</span>
              </h1>
              <p className="mt-3 max-w-md text-base leading-snug text-[#42526E]">{workforceHero.subtitle}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={workforceHero.primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
                >
                  {workforceHero.primaryCta.label}
                  <ArrowRight size={15} aria-hidden />
                </a>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {workforceHighlights.map((b) => {
                  const Icon = b.icon;
                  return (
                    <li key={b.label} className="flex flex-col items-start gap-1.5 sm:items-center sm:text-center">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white ring-1 ring-gray-200">
                        <Icon size={15} className="text-brand-orange" aria-hidden />
                      </span>
                      <span className="text-xs font-semibold leading-snug text-brand-navy">{b.label}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="pb-16 sm:pb-12 lg:pb-10"
            >
              <WorkforceHeroMock />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-[#F3F6FA] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
            <SectionHeader
              title={
                <>
                  Everything You Need in <span className="text-brand-orange">One</span> Place
                </>
              }
              subtitle="People, hours, tasks, and performance — one record from hire to report."
            />
          </motion.div>
          <WorkforceFeaturesGrid isMobile={isMobile} />
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-gray-100 bg-white py-12 lg:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
            <SectionHeader
              eyebrow="Process"
              title={
                <>
                  How It <span className="text-brand-orange">Works</span>
                </>
              }
              subtitle="From employee record to feedback — one connected workforce loop."
            />
          </motion.div>

          <div className="relative hidden lg:block">
            <div
              className="pointer-events-none absolute top-[27px] right-[calc(100%/14)] left-[calc(100%/14)] h-[2px] bg-brand-orange"
              aria-hidden
            />
            <ol className="relative m-0 grid list-none grid-cols-7 gap-2.5 p-0">
              {workforceWorkflow.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.li
                    key={step.title}
                    {...scrollMotionProps(isMobile, { y: 12, duration: 0.35, delay: Math.min(i * 0.03, 0.24) })}
                    className="flex min-w-0 flex-col items-center text-center"
                  >
                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-orange bg-white shadow-[0_0_18px_rgba(254,93,2,0.28)]">
                      <Icon size={22} className="text-brand-orange" strokeWidth={2} aria-hidden />
                    </span>
                    <div className="-mt-7 flex min-h-[120px] flex-1 flex-col rounded-2xl border border-gray-100 bg-white px-2.5 pb-4 pt-10 shadow-[0_10px_28px_-18px_rgba(23,43,77,0.22)]">
                      <h3 className="text-sm font-extrabold leading-snug text-brand-navy">{step.title}</h3>
                      
                      {/* <p className="mt-2 text-xs leading-snug text-[#6B778C]">{step.description}</p> */}
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:hidden">
            {workforceWorkflow.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.title}
                  {...scrollMotionProps(isMobile, { y: 12, duration: 0.35, delay: Math.min(i * 0.03, 0.2) })}
                  className="flex gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-[0_8px_24px_-18px_rgba(23,43,77,0.18)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-brand-orange bg-white">
                    <Icon size={18} className="text-brand-orange" strokeWidth={2} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-extrabold leading-snug text-brand-navy">{step.title}</h3>
                    {/* <p className="mt-1 text-sm leading-snug text-[#6B778C]">{step.description}</p> */}
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {workforceAppCards.map((card, i) => (
              <motion.div
                key={card.title}
                {...scrollMotionProps(isMobile, { y: 14, duration: 0.35, delay: Math.min(i * 0.03, 0.2) })}
              >
                <WorkforceAppCard {...card} />
              </motion.div>
            ))}

            <motion.div {...scrollMotionProps(isMobile, { y: 14, duration: 0.35, delay: 0.18 })}>
              <WorkforceImagePlaceholder
                title="Mobile & Web Access"
                subtitle="Access workforce data on the go with our mobile app and web platform."
                icon={MonitorSmartphone}
              />
            </motion.div>

            <motion.div {...scrollMotionProps(isMobile, { y: 14, duration: 0.35, delay: 0.2 })}>
              <WorkforceOfflineCard />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-[#F8FAFC] py-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl items-stretch gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <motion.article
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4 })}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-navy p-6 shadow-[0_12px_28px_-16px_rgba(23,43,77,0.35)]"
          >
            <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange" aria-hidden />
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/15 ring-1 ring-brand-orange/20">
                <BadgeCheck size={20} className="text-brand-orange" aria-hidden />
              </span>
              <div>
                <h3 className="text-lg font-extrabold leading-snug text-white sm:text-xl">Why it matters</h3>
                <p className="mt-1 text-sm font-medium text-brand-orange">One workforce. Clear performance.</p>
              </div>
            </div>
            <ul className="flex flex-1 flex-col gap-2.5">
              {workforceWhy.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 rounded-xl bg-white/5 px-3.5 py-4.5 text-m leading-snug text-white/80 ring-1 ring-white/10"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/15">
                    <Check size={12} className="text-brand-orange" strokeWidth={2.6} aria-hidden />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: 0.05 })}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-navy p-6 shadow-[0_12px_28px_-16px_rgba(23,43,77,0.35)]"
          >
            <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange" aria-hidden />
            <div className="mb-5 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/15 ring-1 ring-brand-orange/20">
                  <Sparkles size={20} className="text-brand-orange" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold leading-snug text-white sm:text-xl">AI-powered workforce intelligence</h3>
                  <p className="mt-1 text-xs font-medium tracking-[0.12em] text-brand-orange uppercase">Coming soon</p>
                </div>
              </div>
            </div>
            <ul className="flex flex-1 flex-col gap-2.5">
              {workforceAiSoon.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="flex gap-3 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-orange/15">
                      <Icon size={16} className="text-brand-orange" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-extrabold text-white">{item.title}</p>
                        <span className="shrink-0 rounded-full bg-brand-orange/15 px-2 py-0.5 text-[9px] font-bold tracking-wide text-brand-orange uppercase">
                          Soon
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm leading-snug text-white/70">{item.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.article>

          <motion.article
            {...scrollMotionProps(isMobile, { y: 14, duration: 0.4, delay: 0.1 })}
            className="relative flex flex-col overflow-hidden rounded-2xl bg-brand-navy p-6 text-white shadow-[0_16px_40px_-20px_rgba(23,43,77,0.45)]"
          >
            <span className="absolute inset-x-0 top-0 h-[3px] bg-brand-orange" aria-hidden />
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage: [
                  "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
                  "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                ].join(", "),
                backgroundSize: "28px 28px",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-10 -bottom-16 h-48 w-48 rounded-full bg-brand-orange/20 blur-3xl"
              aria-hidden
            />
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/15 ring-1 ring-brand-orange/20">
                  <Users size={20} className="text-brand-orange" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold leading-snug text-white sm:text-xl">{workforceCallout.title}</h3>
                  <p className="mt-1 text-xs font-medium tracking-[0.12em] text-brand-orange uppercase">
                    {workforceCallout.eyebrow}
                  </p>
                </div>
              </div>
              <p className="text-base leading-snug text-white/70">{workforceCallout.body}</p>
              <ul className="mt-5 mb-6 flex flex-col gap-2">
                {workforceCallout.points.map((line) => (
                  <li key={line} className="flex items-center gap-2 text-base font-medium text-white/85">
                    <Check size={14} className="shrink-0 text-brand-orange" strokeWidth={2.6} aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
              <a
                href="/early-access"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-md bg-brand-orange px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-orange-soft"
              >
                Book a demo
                <ArrowRight size={15} aria-hidden />
              </a>
            </div>
          </motion.article>
      </div>
    </section>

      <FinalCTA
        variant="brand-navy"
        title={
          <>
            Right People. <span className="text-white">Right Work.</span> Right Results.
          </>
        }
        body={workforceCta.body}
      />
    </>
  );
}
