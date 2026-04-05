/** Product capability groups for marketing  -  mirrors the live ZedOps app. */

export interface PlatformFeatureItem {
  /** Feature name  -  used as the title in UI */
  name: string;
  /** One line under the title  -  value prop / hook */
  summary: string;
  /** Short elaboration (1–3 sentences) for platform & module pages */
  detail: string;
}

export interface PlatformFeatureSection {
  id: string;
  title: string;
  items: PlatformFeatureItem[];
}

export const platformFeatureSections: PlatformFeatureSection[] = [
  {
    id: "platform-access",
    title: "Platform & access",
    items: [
      {
        name: "Multi-tenant app",
        summary: "Separate workspaces per organisation with clear routing between them.",
        detail:
          "Each customer runs in its own tenant context so data and configuration stay isolated. Users land on the right app URL after sign-in, with behaviour aligned to how your organisation provisions tenants versus a shared login domain.",
      },
      {
        name: "Authentication",
        summary: "Secure sign-in, sessions, and optional token-based access.",
        detail:
          "Standard login flows protect access to the product, with session handling suited to browser use. Where your setup supports it, token-based login can integrate with your identity approach without weakening the same security expectations as the rest of the app.",
      },
      {
        name: "Roles & permissions",
        summary: "What users see and do is driven by role  -  including AI and menus.",
        detail:
          "Permissions are enforced across navigation, data, and in-product tools such as Zed AI. A user only gets menus, records, and copilot answers that match their role flags, so field, office, and leadership views stay appropriate.",
      },
    ],
  },
  {
    id: "core",
    title: "Core",
    items: [
      {
        name: "Directory",
        summary: "Single place for people and contacts tied to your organisation.",
        detail:
          "The directory holds employees and contacts so project teams, approvals, and notifications resolve to real people. Keeping it current reduces friction when assigning work, recording who did what, and reaching the right person on a job.",
      },
      {
        name: "Roles & permissions (people module)",
        summary: "Assign application roles to people  -  aligned with how access is granted.",
        detail:
          "Beyond high-level tenant security, this area links individuals to the roles that unlock specific modules and actions. Administrators can align job functions in the field and office with what each person is allowed to change in ZedOps.",
      },
      {
        name: "Time cards",
        summary: "Capture and review hours for payroll and job costing inputs.",
        detail:
          "Workers and supervisors record time in a structured way so hours can be reviewed, adjusted where policy allows, and fed into downstream processes. Templates in settings help standardise how time is presented on exports and documents.",
      },
      {
        name: "Library hub",
        summary: "Shared reference data for estimating and operations  -  one structured library.",
        detail:
          "Central tabs cover management, engineering, materials, labour, productivity, overhead, tools, and equipment so estimators and PMs pull from the same numbers and definitions. That reduces duplicate spreadsheets and keeps project assumptions aligned with how the organisation prices and plans work.",
      },
    ],
  },
  {
    id: "projects",
    title: "Projects",
    items: [
      {
        name: "All projects / manage project",
        summary: "Browse every job or open one project for day-to-day execution.",
        detail:
          "The project list gives portfolio visibility; drilling into a project exposes the modules your role allows  -  equipment, materials, logs, surveys, and more. Context follows the selected project so users are not constantly re-selecting which site they are working on.",
      },
      {
        name: "Project analytics",
        summary: "Charts and views that summarise how a single project is performing.",
        detail:
          "Where enabled, analytics surfaces trends from tasks, costs, or activity so PMs and leadership spot drift early. It complements raw lists by answering high-level questions without exporting everything to a separate BI tool.",
      },
      {
        name: "Project equipment",
        summary: "Track what equipment is on site, how long it runs, and what it cost.",
        detail:
          "Record deliveries, utilisation, hours, and notes against the project so equipment spend and logistics stay visible. That supports dispute resolution, internal chargebacks, and planning the next phase without relying on disconnected spreadsheets.",
      },
      {
        name: "Project materials",
        summary: "Follow materials from delivery through use, with warehouse links where configured.",
        detail:
          "Tie physical goods to the job with quantities, locations, and notes so site and office agree on what arrived and what was consumed. Links into warehouse or inventory views help reconcile stock with what the project actually used.",
      },
      {
        name: "Issues & concerns",
        summary: "Log problems, owners, and status until they are closed.",
        detail:
          "Raise issues with clear follow-up actions and tracking so nothing disappears in email. The project retains a history of what was raised, by whom, and how it was resolved  -  useful for audits and handover.",
      },
      {
        name: "Surveys",
        summary: "Deploy structured forms on a project and collect answers over time.",
        detail:
          "Assign templates so teams complete the same checklist or questionnaire on each visit or milestone. Updates roll forward on the project record, giving a consistent view of quality, readiness, or client sign-off criteria.",
      },
      {
        name: "Work logs",
        summary: "Structured work log entries connected to real project activity.",
        detail:
          "Capture what happened on site or in the office in a format that rolls up to reporting and compliance. When paired with Zed AI writing assist, teams can tighten wording without losing the underlying facts tied to the project.",
      },
    ],
  },
  {
    id: "planning-execution",
    title: "Planning & execution",
    items: [
      {
        name: "Estimation",
        summary: "Build estimates from library-backed cost structures.",
        detail:
          "Pull rates, assemblies, and assumptions from the library hub so bids and budgets start from approved data. As scope shifts, revisions stay traceable against the same cost breakdown structure the organisation uses everywhere.",
      },
      {
        name: "Schedule",
        summary: "Plan phases, milestones, and dependencies in one timeline.",
        detail:
          "Visualise how work sequences across trades and calendar constraints so delays are visible before they hit the critical path. The schedule becomes the reference for tasks, reporting, and conversations with owners and subs.",
      },
      {
        name: "Tasks",
        summary: "Assign work, track status, and export or hand off where supported.",
        detail:
          "A task dashboard and lists connect people to concrete deliverables with owners and due dates. Workflow hooks and exports (where present) let teams push status into adjacent processes without duplicating the same task in three tools.",
      },
    ],
  },
  {
    id: "quality-safety-closeout",
    title: "Quality, safety, and closeout",
    items: [
      {
        name: "Inspections & observations",
        summary: "Run inspections from templates; link to daily logs and corrective actions.",
        detail:
          "Start from standard forms so every walk captures the same criteria, then attach photos, notes, and tasks when something fails. Linkage to daily logs helps tell a single story for regulators, owners, and internal QA.",
      },
      {
        name: "Inspection templates (settings)",
        summary: "Design reusable inspection forms for consistent field use.",
        detail:
          "Administrators define sections, required fields, and scoring so supers are not improvising checklists on paper. Updates to a template propagate to new inspections while preserving history on completed ones.",
      },
      {
        name: "Punch list (snags)",
        summary: "Track defects from walkthrough to sign-off.",
        detail:
          "Create, assign, and close punch items with photos and comments so closeout is measurable. Everyone sees what is still open before turnover, which reduces last-minute arguments and rework loops.",
      },
      {
        name: "Incidents",
        summary: "Document safety and other incidents with follow-up and reporting.",
        detail:
          "Capture what happened, when, and who was involved so the organisation can investigate and comply with internal and external reporting rules. Structured records beat ad-hoc emails when insurance or authorities ask for a timeline.",
      },
    ],
  },
  {
    id: "information-management",
    title: "Information management",
    items: [
      {
        name: "Documents",
        summary: "Folders and files organised per project  -  your controlled repository.",
        detail:
          "Store contracts, submittals, photos, and correspondence where the whole team can find them with permission checks. Version discipline and folder structure reduce “which PDF is final?” confusion during disputes or audits.",
      },
      {
        name: "Daily logs",
        summary: "Top-bar access to the daily log with a project picker when none is active.",
        detail:
          "Field teams open the log quickly from anywhere in the app; if no project is selected, the flow prompts for one first. That keeps entries attributed to the right job and feeds reporting, AI context, and owner updates from a single source.",
      },
    ],
  },
  {
    id: "finance",
    title: "Finance",
    items: [
      {
        name: "Budget",
        summary: "Project budgets anchored to cost codes from settings.",
        detail:
          "Structure budgets the same way the organisation posts costs so variance analysis is honest. PMs and controllers compare committed, actual, and forecast numbers without reconciling two different code lists.",
      },
      {
        name: "Budget revisions",
        summary: "Controlled changes and versions when the baseline moves.",
        detail:
          "Route budget updates through the approvals your process requires and retain a history of what changed and why. That supports owner change discussions and internal governance without losing the original baseline.",
      },
      {
        name: "Change orders",
        summary: "Financial change orders from scope shifts through approval.",
        detail:
          "Track additions, deductions, and status so contract value stays aligned with what was agreed in writing. Linking change orders to budget and schedule context helps everyone see knock-on effects before signing.",
      },
      {
        name: "Direct cost / indirect cost",
        summary: "Classify and monitor cost types consistently.",
        detail:
          "Separate job-chargeable spend from overhead-style costs so margin and job reports are not mixed. Clean classification feeds payment applications, management reports, and integration exports.",
      },
      {
        name: "Payment requests",
        summary: "Request, review, and track payments against contract and progress.",
        detail:
          "Bundle the documentation needed for each pay application so approvers see quantities, retention, and prior payments in one place. Status visibility reduces “where is my cheque?” calls between GC, owner, and finance.",
      },
    ],
  },
  {
    id: "supply-chain",
    title: "Supply chain",
    items: [
      {
        name: "Workflows",
        summary: "Configurable steps for how operational work moves through your org.",
        detail:
          "Model approvals, handoffs, and notifications so purchase, transfer, and material processes follow your rules every time. Workflows reduce one-off email chains and make it obvious who must act next.",
      },
      {
        name: "Procurements",
        summary: "Pipeline view of sourcing events and related activities.",
        detail:
          "See what is being bid, awarded, or executed across vendors in one place. That helps procurement and PM teams prioritise bottlenecks before they delay the job.",
      },
      {
        name: "Purchase orders",
        summary: "Create, issue, and manage POs tied to projects and vendors.",
        detail:
          "Formalise commitments with line items, quantities, and terms so receiving and invoicing reconcile cleanly. PO history supports audit trails and dispute resolution when deliveries do not match what was ordered.",
      },
      {
        name: "Inventory",
        summary: "Stock levels, warehouses, and movements  -  including bulk tools where enabled.",
        detail:
          "Know what sits in which warehouse and how it moves between sites. Bulk uploads speed initial stock loads while day-to-day transactions keep on-hand balances trustworthy for planning and billing.",
      },
      {
        name: "Material tracking",
        summary: "Goods receipt, delivery notes, returns, and a full activity trail.",
        detail:
          "Follow material from order through site receipt and any returns so quantities on the job match finance and the subs’ records. The trail answers “what happened to this shipment?” without digging through three inboxes.",
      },
      {
        name: "Physical verification",
        summary: "Stock counts and verification tied into material tracking.",
        detail:
          "Schedule and record counts so system quantities match what is on the shelf or site. Discrepancies drive adjustments with accountability, which protects margins and reduces write-offs.",
      },
      {
        name: "Material master",
        summary: "Central catalogue of materials and categories for the whole organisation.",
        detail:
          "Standardise descriptions, units, and codes so every project and PO speaks the same language. A clean master reduces duplicate SKUs and wrong-unit errors that otherwise slip into estimates and orders.",
      },
      {
        name: "Correspondence / request dashboard",
        summary: "One screen for in-flight material, transfer, purchase, and other requests.",
        detail:
          "Procurement and site teams see what is waiting on approval, delivery, or vendor response. Central visibility stops requests from stalling because nobody knew they were assigned.",
      },
      {
        name: "Material / transfer / purchase / reserve requests",
        summary: "Request lifecycles tailored to each request type.",
        detail:
          "Each path carries the fields and approvals that match how your company buys, moves, or reserves stock. Typed requests feed reporting so you can see volume and cycle time by category.",
      },
    ],
  },
  {
    id: "reporting-exports",
    title: "Reporting & exports",
    items: [
      {
        name: "PDF / document reports",
        summary: "Print-ready outputs for inspections, POs, incidents, materials, and more.",
        detail:
          "Generate consistent PDFs from live data so what leaves the building matches what is in ZedOps. Coverage spans projects, quality, safety, supply chain, and request types so teams spend less time reformatting Word templates.",
      },
      {
        name: "Bulk export",
        summary: "Pull structured data out for analysis where routes exist.",
        detail:
          "When implemented for a given object type, exports let finance and BI teams work in spreadsheets or downstream systems without manual copy-paste. Exports respect the same permission boundaries as the interactive app.",
      },
    ],
  },
  {
    id: "settings",
    title: "Settings & configuration",
    items: [
      {
        name: "Profile / company",
        summary: "Organisation and contact details that appear across the product.",
        detail:
          "Keep legal name, addresses, and branding inputs accurate so documents and correspondence look professional. Central profile data avoids mismatches between invoices, letters, and portal experiences.",
      },
      {
        name: "Notifications",
        summary: "Who gets alerted when records are created or updated.",
        detail:
          "Define rules so the right roles learn about new RFIs, approvals, or safety events without spamming the whole company. Tuning notifications improves response time while protecting inboxes.",
      },
      {
        name: "UOM, tax, cost codes",
        summary: "Units of measure, tax rates, and budget cost code setup.",
        detail:
          "Foundational master data ensures quantities, VAT, and cost rollups calculate the same way in every module. Getting this right upfront prevents painful clean-up after go-live.",
      },
      {
        name: "Request / PO / warehouse / library / material-tracking config",
        summary: "Prefixes, numbering, and behaviour for operational modules.",
        detail:
          "Control how identifiers are generated and which optional behaviours are on for each area. Consistent prefixes make support and auditing easier when tracing a PO or warehouse transfer across the system.",
      },
      {
        name: "Direct cost / budget ID config",
        summary: "Identifiers that align cost posting with your chart of accounts logic.",
        detail:
          "Map system fields to how finance expects to see costs land so integrations and internal reports reconcile. Misconfiguration here usually shows up as mysterious variances  -  this screen is where you prevent that.",
      },
      {
        name: "Templates",
        summary: "Document layouts for bills, change orders, logs, estimates, invoices, and more.",
        detail:
          "Per product configuration, templates standardise what customers and regulators see on paper. Updating a template refreshes future documents while leaving signed historical PDFs untouched.",
      },
      {
        name: "Survey templates",
        summary: "Reusable forms for project surveys and inspections-style data capture.",
        detail:
          "Design once, deploy on many jobs so field teams always answer the same questions. Template versioning helps when standards change mid-programme.",
      },
      {
        name: "Module toggles",
        summary: "Turn major areas like directory or material master on or off for the tenant.",
        detail:
          "Match the navigation to what your contract and rollout include so users are not clicking into empty modules. Toggles support phased deployments and simpler training for smaller teams.",
      },
    ],
  },
];

/** How many feature bullets to show before “View more” (sections with more items expand). */
export const PLATFORM_FEATURE_PREVIEW_COUNT = 4;

export function getPlatformSectionById(id: string): PlatformFeatureSection | undefined {
  return platformFeatureSections.find((s) => s.id === id);
}

export function getModuleNavContext(id: string): {
  section: PlatformFeatureSection;
  index: number;
  prev: PlatformFeatureSection | null;
  next: PlatformFeatureSection | null;
} | null {
  const index = platformFeatureSections.findIndex((s) => s.id === id);
  if (index < 0) return null;
  const section = platformFeatureSections[index];
  return {
    section,
    index,
    prev: index > 0 ? platformFeatureSections[index - 1]! : null,
    next: index < platformFeatureSections.length - 1 ? platformFeatureSections[index + 1]! : null,
  };
}
