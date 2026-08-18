import {
  BadgeCheck,
  BarChart3,
  Bell,
  CalendarCheck,
  CalendarClock,
  CalendarSearch,
  Check,
  ChevronLeft,
  CircleUser,
  ClipboardList,
  Clock,
  Eye,
  FileBarChart,
  FolderKanban,
  HardHat,
  Network,
  ScanSearch,
  Smile,
  Sparkles,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import { motion } from "framer-motion";
import type { PlatformFeatureSection } from "@/data/platformFeatures";
import ModulePatternLanding, { type ModulePatternPage } from "@/components/ModulePatternLanding";
import SectionHeader from "@/components/SectionHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";

const phoneCrew = [
  { name: "R. Kumar", trade: "Mason", status: "In" },
  { name: "A. Singh", trade: "Electrician", status: "In" },
  { name: "M. Patel", trade: "Helper", status: "Out" },
];

function WorkforcePhoneMock() {
  return (
    // <div className="mx-auto w-full max-w-[300px]">
    //   <div className="overflow-hidden rounded-[1.85rem] border-[5px] border-[#1B2433] bg-[#0F1724] shadow-[0_24px_48px_-18px_rgba(23,43,77,0.55)]">
    //     <div className="mx-auto mt-1.5 h-1 w-12 rounded-full bg-white/25" />
    //     <div className="m-1.5 overflow-hidden rounded-[1.25rem] bg-[#F2F4F7]">
    //       <div className="flex items-center justify-between bg-white px-2.5 py-2">
    //         <ChevronLeft size={16} className="text-brand-navy" strokeWidth={2.2} aria-hidden />
    //         <p className="text-[13px] font-extrabold tracking-tight text-brand-navy">Workforce</p>
    //         <div className="flex items-center gap-1.5">
    //           <span className="relative">
    //             <Bell size={14} className="text-brand-navy" aria-hidden />
    //             <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-[#DE350B]" />
    //           </span>
    //           <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-navy text-[10px] font-bold text-white">
    //             A
    //           </span>
    //         </div>
    //       </div>

    //       <div className="space-y-1 p-1.5">
    //         <div className="rounded-lg border border-gray-200 bg-white px-2.5 py-2">
    //           <div className="flex items-start justify-between gap-2">
    //             <div>
    //               <p className="text-[13px] font-extrabold leading-none text-brand-navy">15 Aug, 2026</p>
    //               <p className="mt-0.5 text-[10px] font-semibold text-[#6B778C]">Tower B • Day shift</p>
    //             </div>
    //             <span className="rounded-md bg-[#E3FCEF] px-1.5 py-0.5 text-[10px] font-bold text-[#006644]">Checked in</span>
    //           </div>
    //           <div className="mt-1.5 grid grid-cols-3 gap-1.5">
    //             {[
    //               { label: "In", value: "07:42" },
    //               { label: "Hours", value: "8.5" },
    //               { label: "OT", value: "0.5" },
    //             ].map((stat) => (
    //               <div key={stat.label} className="rounded-md bg-[#F8FAFC] px-1.5 py-1 text-center">
    //                 <p className="text-[9px] font-bold tracking-[0.1em] text-[#6B778C] uppercase">{stat.label}</p>
    //                 <p className="text-[12px] font-extrabold text-brand-navy">{stat.value}</p>
    //               </div>
    //             ))}
    //           </div>
    //         </div>

    //         <div className="rounded-lg border border-gray-200 bg-white px-2 py-1.5">
    //           <div className="flex items-center justify-between">
    //             <p className="text-[12px] font-extrabold text-brand-navy">Crew on site</p>
    //             <span className="rounded-full bg-[#DEEBFF] px-1.5 py-0.5 text-[10px] font-bold text-[#0052CC]">24</span>
    //           </div>
    //           <ul className="m-0 mt-1 list-none space-y-0.5 p-0">
    //             {phoneCrew.map((person) => (
    //               <li key={person.name} className="flex items-center gap-2 rounded-md bg-[#F6F9FF] px-2 py-1">
    //                 <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-navy text-[9px] font-bold text-white">
    //                   {person.name[0]}
    //                 </span>
    //                 <div className="min-w-0 flex-1">
    //                   <p className="text-[11px] font-bold leading-none text-brand-navy">{person.name}</p>
    //                   <p className="mt-0.5 text-[9px] font-medium text-[#6B778C]">{person.trade}</p>
    //                 </div>
    //                 <span
    //                   className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
    //                     person.status === "In" ? "bg-[#E3FCEF] text-[#006644]" : "bg-[#FFEBE6] text-[#BF2600]"
    //                   }`}
    //                 >
    //                   {person.status}
    //                 </span>
    //               </li>
    //             ))}
    //           </ul>
    //         </div>

    //         <ul className="m-0 list-none space-y-0.5 p-0">
    //           {[
    //             { label: "Attendance", detail: "QR check-in recorded" },
    //             { label: "Timesheet", detail: "Hours + overtime" },
    //             { label: "Shift", detail: "Day • Tower B" },
    //             { label: "Leave", detail: "1 request pending" },
    //             { label: "Productivity", detail: "On plan" },
    //           ].map((row, i) => (
    //             <li key={row.label} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-1">
    //               <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E3FCEF] text-[10px] font-extrabold text-[#006644]">
    //                 {i + 1}
    //               </span>
    //               <div className="min-w-0 flex-1">
    //                 <p className="text-[12px] font-extrabold leading-none text-brand-navy">{row.label}</p>
    //                 <p className="mt-px text-[10px] font-semibold leading-none text-[#6B778C]">{row.detail}</p>
    //               </div>
    //               <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#22A06B]">
    //                 <Check size={11} className="text-white" strokeWidth={3} aria-hidden />
    //               </span>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="mx-auto rounded-xl border border-white/10 bg-brand-navy shadow-[0_12px_28px_-16px_rgba(23,43,77,0.35)] text-white w-full max-w-[300px]">app screenshot here</div>
    
  );
}

function WorkforceMobileSection() {
  const isMobile = useIsMobile();

  return (
    <section className="border-t border-gray-100 bg-[#F8FAFC] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.4 })}>
            <SectionHeader
              eyebrow="On the job"
              title={
                <>
                  Workforce Intelligence on <span className="text-brand-orange">mobile</span>
                </>
              }
              subtitle="Check in, log hours, and see the crew — then the office sees the same record instantly."
            />
            <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
              {[
                "Check-in and check-out with time stamps",
                "Daily hours, breaks, and overtime",
                "Crew on site by trade and status",
                "Assigned shift and project location",
                "Leave requests and balances",
                "Manpower allocated to the right task",
                "Productivity vs plan on the same day",
                "Timesheets ready for payroll",
                "Works on site and syncs to the office",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-sm leading-snug text-[#42526E]">
                  <Check size={16} className="mt-0.5 shrink-0 text-brand-orange" strokeWidth={2.6} aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...scrollMotionProps(isMobile, { y: 16, duration: 0.45, delay: 0.06 })}>
            <WorkforcePhoneMock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const page: ModulePatternPage = {
  hero: {
    eyebrow: "Construction Execution",
    titleLead: "Workforce ",
    titleAccent: "Intelligence",
    tagline: "Track attendance, productivity & labor performance.",
    subtitle: "Placeholder page — hours, attendance, and labour productivity on the same job record. Replace this copy later.",
  },
  highlights: [
    { icon: HardHat, label: "Attendance" },
    { icon: Clock, label: "Hours" },
    { icon: TrendingUp, label: "Productivity" },
    { icon: BarChart3, label: "Performance" },
  ],
  featuresTitleLead: "Everything you need for ",
  featuresTitleAccent: "workforce intelligence",
  featuresSubtitle: "People, hours, shifts, and productivity — one record from hire to report.",
  features: [
    {
      icon: Users,
      title: "Employee Database",
      bullets: [
        "Centralized employee records",
        "Qualifications on file",
        "Documents and certifications",
        "One people record",
      ],
    },
    {
      icon: CalendarClock,
      title: "Attendance Tracking",
      bullets: [
        "Real-time check-in/check-out",
        "Mobile capture",
        "Biometric and QR scan",
        "Visible to office",
      ],
    },
    {
      icon: Clock,
      title: "Timesheets",
      bullets: [
        "Track daily hours",
        "Overtime captured",
        "Breaks recorded accurately",
        "Payroll-ready inputs",
      ],
    },
    {
      icon: ScanSearch,
      title: "Shift Management",
      bullets: [
        "Create and assign shifts",
        "Rotate teams",
        "Shift-wise attendance",
        "Match crews to the job",
      ],
    },
    {
      icon: UserPlus,
      title: "Manpower Allocation",
      bullets: [
        "Right people on the task",
        "Allocate by location",
        "Trade and crew view",
        "Fewer idle hours",
      ],
    },
    {
      icon: CalendarSearch,
      title: "Leave Management",
      bullets: [
        "Submit leave requests",
        "Approvals in one place",
        "Balances visible",
        "No spreadsheet chase",
      ],
    },
    {
      icon: TrendingUp,
      title: "Productivity Tracking",
      bullets: [
        "Monitor by individual",
        "By trade and activity",
        "Output vs plan",
        "Course-correct early",
      ],
    },
    {
      icon: BarChart3,
      title: "Reports & Analytics",
      bullets: [
        "Real-time workforce insights",
        "Custom reports",
        "Hours and productivity",
        "Better labour decisions",
      ],
    },
  ],
  workflowTitleLead: "Workforce Intelligence ",
  workflowTitleAccent: "Workflow",
  workflowSubtitle: "A simple workflow to manage your people from start to finish. Capture attendance, hours, and productivity on the job.",
  workflow: [
    { icon: CircleUser, title: "Add Employees", description: "Create and upload employee details and documents." },
    { icon: FolderKanban, title: "Assign to Project", description: "Allocate employees to projects and sites." },
    { icon: CalendarCheck, title: "Track Attendance", description: "Employees check-in/out on mobile app." },
    { icon: ClipboardList, title: "Track Timesheets", description: "Capture daily hours and overtime." },
    { icon: Network, title: "Monitor Productivity", description: "Track productivity in real-time." },
    { icon: CalendarSearch, title: "Manage Leaves", description: "Submit and approve leave requests." },
    { icon: FileBarChart, title: "Generate Reports", description: "Analyze data and export custom reports." },
  ],
  whyTitle: "Why teams choose ZedOps workforce",
  why: [
    { icon: CalendarCheck, title: "Accurate Attendance", desc: "Eliminate time theft and manual errors." },
    { icon: UserCheck, title: "Better Productivity", desc: "Improve productivity with real-time monitoring." },
    { icon: Eye, title: "Complete Visibility", desc: "Get 360° visibility of your workforce." },
    { icon: TrendingUp, title: "Informed Decisions", desc: "Make data-driven decisions with analytics." },
    { icon: Wallet, title: "Cost Savings", desc: "Optimize manpower and reduce labour costs." },
    { icon: Smile, title: "Happier Workforce", desc: "Improve accountability and employee satisfaction." },
  ],
  aiSoon: [
    { icon: Sparkles, title: "Smart drafts", body: "Placeholder — AI drafts from live project data." },
    { icon: Eye, title: "Risk cues", body: "Placeholder — surface issues before they escalate." },
    { icon: TrendingUp, title: "Look-ahead", body: "Placeholder — next-step suggestions from current work." },
    { icon: BadgeCheck, title: "Missing fields", body: "Placeholder — prompt when records are incomplete." },
  ],
  callout: {
    eyebrow: "Coming soon",
    title: "Workforce intelligence. Preview page.",
    body: "Replace this page with the full attendance, hours, and labour story when ready.",
    dashboardLabel: "dashboard screen here",
  },
  cta: {
    title: "See workforce on your jobs.",
    accent: "Book a demo.",
    body: "Walk through attendance, hours, and productivity with the team.",
  },
};

export default function WorkforceIntelligenceLanding(_props: {
  prev: Pick<PlatformFeatureSection, "id" | "title"> | null;
  next: Pick<PlatformFeatureSection, "id" | "title"> | null;
}) {
  return <ModulePatternLanding page={page} idPrefix="workforce" afterWorkflow={<WorkforceMobileSection />} />;
}
