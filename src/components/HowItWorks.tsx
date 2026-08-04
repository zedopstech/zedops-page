import { motion } from "framer-motion";
import { CalendarClock, ClipboardList, ListChecks } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";

const steps = [
  {
    step: "01",
    icon: CalendarClock,
    title: "Schedule → tasks",
    description:
      "Break the programme into owned tasks with due dates and dependencies. When the timeline shifts, the work queue updates so MEP crews know what moved, not just what turned red on a chart.",
    details: ["Phases & milestones tied to real assignments", "Task owners and handoffs between trades", "Schedule changes reflected in what people see next"],
  },
  {
    step: "02",
    icon: ClipboardList,
    title: "Daily log → follow-up",
    description:
      "Capture site reality in structured logs, then convert issues into tasks with owners. The log stops being a filing cabinet and becomes the start of the fix.",
    details: ["Fast daily log entry with project context", "Link observations to corrective actions", "Permissioned so the right trade sees the right work"],
  },
  {
    step: "03",
    icon: ListChecks,
    title: "Inspection & punch → closeout",
    description:
      "Run inspections from templates, route findings to tasks, and drive punch lists to sign-off. Closeout stays measurable when every item has an owner and a status.",
    details: ["Inspections linked to logs and tasks", "Punch items tracked to completion", "AI assists drafts and summaries where enabled"],
  },
];

export default function HowItWorks() {
  const isMobile = useIsMobile();

  return (
    <section className="border-t border-gray-100 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          {...scrollMotionProps(isMobile, { y: 20, duration: 0.4 })}
          className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-20"
        >
          <div>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#172B4D] sm:text-4xl">
              From schedule to sign-off, with action in between.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-[#42526E] lg:max-w-xs lg:pb-1">
            Built for MEP and field teams: every step pushes work forward (tasks, logs, inspections, and punch), not passive reporting.
          </p>
        </motion.div>

        <div className="grid overflow-hidden rounded-md border border-gray-200 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              {...scrollMotionProps(isMobile, { y: 20, duration: 0.4, delay: i * 0.1 })}
              className={`relative flex flex-col bg-white p-7 group ${
                i < steps.length - 1 ? "border-b border-gray-200 lg:border-b-0 lg:border-r" : ""
              }`}
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="select-none text-5xl font-black leading-none text-[#EBF0FF]">{step.step}</span>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-[#EBF0FF]">
                  <step.icon size={18} className="text-brand-orange" />
                </div>
              </div>

              {i < steps.length - 1 && (
                <div
                  className="absolute right-0 top-1/2 z-10 hidden h-px w-6 -translate-y-1/2 translate-x-1/2 bg-[#C7D5F5] lg:block"
                  aria-hidden
                />
              )}

              <h3 className="mb-2.5 text-lg font-extrabold leading-snug text-[#172B4D]">{step.title}</h3>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-[#42526E]">{step.description}</p>

              <ul className="space-y-2 border-t border-gray-100 pt-4">
                {step.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2 text-xs text-[#6B778C]">
                    <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-orange" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
