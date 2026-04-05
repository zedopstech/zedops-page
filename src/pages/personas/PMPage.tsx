import { useSEO } from "@/hooks/useSEO";
import { ClipboardList, Inbox, CalendarX, MessageCircleOff, Brain, FileText, ListTodo, CalendarRange } from "lucide-react";
import PersonaTemplate from "@/components/PersonaTemplate";
import type { Feature } from "@/components/PersonaTemplate";

const challenges = [
  {
    icon: Inbox,
    title: "Tasks, RFIs, and requests scattered across channels",
    desc: "Task dashboards compete with email and chat. Material, transfer, purchase, and reserve requests each have their own thread  -  easy to lose track of what is blocking the path.",
  },
  {
    icon: CalendarX,
    title: "Schedule versus reality",
    desc: "The baseline schedule, the last update, and what the field reported this morning rarely match. You reconcile instead of leading.",
  },
  {
    icon: MessageCircleOff,
    title: "Status meetings eat the week",
    desc: "You rebuild the same picture from documents, daily logs, issues, and procurement status  -  then answer the same questions from owners and subs.",
  },
];

const features: Feature[] = [
  {
    icon: CalendarRange,
    title: "Schedule and tasks in one execution layer",
    desc: "Plan and view timelines, run task lists with assignments and workflows, and connect that work to project issues, surveys, and work logs  -  so your schedule is tied to what people actually record.",
    badge: "Planning",
    mockType: "schedule",
    mockScenario: "pm-schedule-tasks",
  },
  {
    icon: ListTodo,
    title: "Issues, inspections, punch, and incidents",
    desc: "Log issues with follow-up and status, run inspections from templates with actions, manage punch and walkthroughs, and capture safety incidents  -  linked to the project record your daily logs already use.",
    badge: "Quality & safety",
    mockType: "list",
    mockScenario: "pm-quality",
  },
  {
    icon: Brain,
    title: "Zed AI copilot  -  insight without inbox archaeology",
    desc: "Insights and summaries on permitted data, report prep, actions where enabled, plus writing assist  -  same roles as the rest of the app.",
    badge: "Zed AI",
    mockType: "chat",
    mockScenario: "pm-zed-ai",
  },
  {
    icon: FileText,
    title: "Documents and daily logs at your fingertips",
    desc: "Organize project files and folders, file daily logs from the top bar with the right project context, and pull PDF reports when stakeholders need a snapshot  -  without rebuilding from scratch.",
    badge: "Information",
    mockType: "log",
    mockScenario: "pm-docs-logs",
  },
];

export default function PMPage() {
  useSEO({
    title: "ZedOps for Project Managers",
    description:
      "Project managers use ZedOps for tasks, schedules, issues, inspections, documents, daily logs, requests, procurement visibility, and the Zed AI copilot  -  under the same roles as the rest of the app.",
  });

  return (
    <PersonaTemplate
      heroImage="/Persona/project-managers.jpg"
      imageAlt="Project manager reviewing construction schedule"
      pill="Project Managers"
      PillIcon={ClipboardList}
      title="Coordinate the job where the data already lives."
      subtitle="Tasks, schedule, issues, logs, documents, and the Zed AI copilot in one place  -  so you spend less time assembling status and more time clearing blockers."
      quote="I am the human API between the site, the owner, and five systems. If one number is wrong, I hear about it in the meeting  -  not in the tool."
      quoteAttribution="What project managers tell us, again and again"
      challengesHeading="The PM job when the system is the bottleneck."
      challengesIntro="Project managers sit between field, office, and supply chain. These are the coordination costs when nothing shares a single workflow."
      challenges={challenges}
      featuresHeading="Tools that match a PM’s actual week."
      features={features}
      earlyAccessLabel="Request early access for your team"
    />
  );
}
