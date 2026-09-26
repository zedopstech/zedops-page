import type { ComponentType } from "react";
import { ApprovalMock, AskMock, AttendanceMock, BoardMock, ChartMock, ChecklistMock, DrawingMock, FeedMock, FormMock, KpiMock, PhotoLogMock, TableMock } from "./library";

/**
 * Named, uniquely configured product scenes. Every page picks scenes from here, so each
 * feature shows its own screen and data rather than a shared stock mock.
 */

/* ============================ Persona: general contractors ============================ */

export const GcProjectHub = () => (
  <BoardMock
    title="Issues & concerns"
    meta="Al Meridian Tower"
    move={{ from: 0, to: 1 }}
    columns={[
      { name: "Open", cards: [{ t: "Sleeve clash, L6 riser", meta: "MEP · Priya N.", tone: "red", tag: "High" }, { t: "Scaffold access, east", meta: "Site · Omar K.", tone: "amber", tag: "Med" }] },
      { name: "In progress", cards: [{ t: "Revised cable tray route", meta: "Elec · Leo T.", tone: "blue", tag: "RFI" }] },
      { name: "Closed", cards: [{ t: "Level 4 pour signed off", meta: "Civil · Sara M.", tone: "green", tag: "Done" }] },
    ]}
  />
);

export const GcDailyLog = () => (
  <FeedMock
    title="Daily log"
    meta="Tue 22 Sep"
    items={[
      { who: "Ahmed R.", text: "logged 38 crew on site, 2 visitors", time: "07:12", tone: "blue" },
      { who: "Priya N.", text: "completed ductwork L5 east, 120 m²", time: "11:40", tone: "green", tag: "Progress" },
      { who: "Omar K.", text: "flagged rain delay on roof works", time: "13:05", tone: "amber", tag: "Delay" },
      { who: "Zed AI", text: "drafted the end-of-day summary for review", time: "17:30", tone: "orange" },
    ]}
  />
);

export const GcPlanning = () => (
  <TableMock
    title="Task board"
    meta="Week 39"
    cols={["Task", "Owner", "Due", "Status"]}
    widths="1.6fr 0.9fr 0.6fr 0.8fr"
    flip={{ row: 1, col: 3, to: { chip: "Done", tone: "green" } }}
    rows={[
      ["Chilled water risers L3–L6", "Ahmed R.", "Mon", { chip: "Done", tone: "green" }],
      ["Fire damper install L5", "Priya N.", "Wed", { chip: "In progress", tone: "blue" }],
      ["LV panel terminations", "Leo T.", "Thu", { chip: "Not started", tone: "slate" }],
      ["Pressure test, zone B", "Omar K.", "Fri", { chip: "Blocked", tone: "red" }],
      ["BMS point-to-point", "Sara M.", "Sat", { chip: "Not started", tone: "slate" }],
    ]}
  />
);

export const GcQhse = () => (
  <ChecklistMock
    title="Inspection · Plant room B"
    meta="QA-204"
    items={[
      { t: "Pump alignment within tolerance", ok: true, who: "Omar K." },
      { t: "Pipe supports at spec spacing", ok: true, who: "Omar K." },
      { t: "Valve tags fitted and legible", ok: false, who: "Raised ISS-460" },
      { t: "Insulation continuous at joints", ok: true, who: "Omar K." },
      { t: "Drain points accessible", ok: null },
    ]}
  />
);

/* ============================ Persona: owners & developers ============================ */

export const OwnersPortfolio = () => (
  <KpiMock
    title="Portfolio"
    meta="9 projects"
    kpis={[
      { label: "Committed cost", value: 42.6, prefix: "AED ", suffix: "M", decimals: 1, delta: "+3.1% MoM", tone: "slate", spark: [30, 32, 33, 35, 38, 40, 42] },
      { label: "On schedule", value: 64, suffix: "%", delta: "−4 pts", tone: "red", spark: [74, 72, 70, 69, 67, 66, 64] },
      { label: "Open change requests", value: 17, delta: "5 need approval", tone: "amber", spark: [9, 11, 12, 14, 15, 16, 17] },
      { label: "Forecast margin", value: 11.8, suffix: "%", decimals: 1, delta: "+0.6 pts", tone: "green", spark: [10, 10.4, 10.9, 11, 11.3, 11.5, 11.8] },
    ]}
  />
);

export const OwnersFinance = () => (
  <ChartMock
    title="Budget vs committed"
    meta="AED M"
    kind="bars"
    labels={["Tower A", "Tower B", "Podium", "Car park", "Landscape"]}
    series={[
      { name: "Budget", values: [14, 11, 8, 5, 3], tone: "mist" },
      { name: "Committed", values: [13.2, 11.9, 6.1, 4.8, 1.2], tone: "navy" },
    ]}
    note="Tower B is 8% over budget, driven by two façade variations."
  />
);

export const OwnersDocuments = () => (
  <FeedMock
    title="Document register"
    meta="Contracts & approvals"
    items={[
      { who: "Legal", text: "uploaded Main contract, Rev C", time: "Mon 09:20", tone: "blue", tag: "Contract" },
      { who: "GC", text: "submitted Variation 014, façade", time: "Mon 14:02", tone: "amber", tag: "Pending" },
      { who: "Consultant", text: "certified Payment application 07", time: "Tue 10:15", tone: "green", tag: "Certified" },
      { who: "You", text: "shared the monthly pack with the board", time: "Tue 16:44", tone: "violet" },
    ]}
  />
);

export const OwnersGovernance = () => (
  <ApprovalMock
    title="Change request CR-031"
    meta="Tower B façade"
    amount="AED 412,000"
    done={2}
    steps={[
      { who: "Sara M.", role: "Project manager", note: "Scope and cost verified against drawings" },
      { who: "Karim H.", role: "Cost consultant", note: "Rates checked against the library" },
      { who: "You", role: "Owner’s representative" },
      { who: "Finance", role: "Budget release" },
    ]}
  />
);

/* ============================ Persona: project managers ============================ */

export const PmScheduleTasks = () => (
  <BoardMock
    title="This week"
    meta="Marina Heights"
    move={{ from: 1, to: 2 }}
    columns={[
      { name: "To do", cards: [{ t: "Issue L7 access permit", meta: "Due Thu", tone: "slate" }, { t: "Confirm crane slot", meta: "Due Fri", tone: "slate" }] },
      { name: "Doing", cards: [{ t: "Close RFI-118, sleeves", meta: "Waiting on design", tone: "amber" }, { t: "Update 3-week lookahead", meta: "Today", tone: "blue" }] },
      { name: "Done", cards: [{ t: "Owner progress call", meta: "Mon", tone: "green" }] },
    ]}
  />
);

export const PmDocsLogs = () => (
  <PhotoLogMock
    title="Site diary"
    meta="Level 5"
    photos={[
      { src: "/photos/on-site.png", caption: "Riser 2 before insulation", tag: "Progress", tone: "blue", pos: "50% 25%" },
      { src: "/contractors/spec.webp", caption: "Duct supports, grid C4", tag: "QA", tone: "green" },
      { src: "/contractors/MEPc.png", caption: "Coordination walk, east core", tag: "Meeting", tone: "violet" },
    ]}
  />
);

export const PmQuality = () => (
  <TableMock
    title="Non-conformance reports"
    meta="Open"
    cols={["NCR", "Item", "Trade", "Status"]}
    widths="0.6fr 1.6fr 0.8fr 0.9fr"
    flip={{ row: 0, col: 3, to: { chip: "Closed", tone: "green" } }}
    rows={[
      ["NCR-22", "Fire stopping gap, L4", "Fire", { chip: "Rework", tone: "amber" }],
      ["NCR-23", "Wrong gauge, cable tray", "Elec", { chip: "Open", tone: "red" }],
      ["NCR-24", "Duct leakage above limit", "HVAC", { chip: "Retest", tone: "blue" }],
      ["NCR-25", "Missing valve labels", "Plumb", { chip: "Open", tone: "red" }],
    ]}
  />
);

export const PmZedAi = () => (
  <AskMock
    question="Draft this week’s update for the owner"
    answer="Progress is 64% against 67% planned. The chiller delivery moved to Thursday, which puts L4 testing at risk. Two RFIs are waiting on design."
    bullets={[
      { text: "Ductwork L5 complete, ahead by 2 days", tone: "green" },
      { text: "Chiller delivery slipped 3 days", tone: "amber" },
      { text: "RFI-118 and RFI-121 need design answers", tone: "red" },
    ]}
    cite="Schedule, daily logs, RFI register"
  />
);

/* ============================ Persona: consultants & CM firms ============================ */

export const ConsultPortfolio = () => (
  <TableMock
    title="Engagements"
    meta="3 clients"
    cols={["Project", "Client", "Progress", "Risk"]}
    widths="1.3fr 1fr 0.7fr 0.8fr"
    flip={{ row: 2, col: 3, to: { chip: "Medium", tone: "amber" } }}
    rows={[
      ["Al Meridian Tower", "Emaar", "72%", { chip: "Low", tone: "green" }],
      ["DSO Medical Centre", "DHA", "48%", { chip: "High", tone: "red" }],
      ["Khawaneej School", "KHDA", "61%", { chip: "Low", tone: "green" }],
      ["Marina Heights C", "Select", "55%", { chip: "Medium", tone: "amber" }],
    ]}
  />
);

export const ConsultRequests = () => (
  <FormMock
    title="New RFI"
    meta="DSO Medical Centre"
    submit="Submit RFI"
    fields={[
      { label: "Subject", value: "Sprinkler head clearance, corridor 2.14", wide: true },
      { label: "Discipline", value: "Fire protection" },
      { label: "Response needed by", value: "Thu 1 Oct" },
      { label: "Assigned to", value: "Design lead, MEP" },
      { label: "Drawing reference", value: "FP-201 Rev D" },
    ]}
  />
);

export const ConsultExports = () => (
  <ChartMock
    title="Monthly progress report"
    meta="Planned vs actual %"
    kind="line"
    labels={["Apr", "May", "Jun", "Jul", "Aug", "Sep"]}
    series={[
      { name: "Planned", values: [10, 22, 35, 48, 60, 72], tone: "mist" },
      { name: "Actual", values: [9, 20, 31, 45, 55, 64], tone: "navy" },
    ]}
    note="Export ready: PDF for the client, XLSX for the cost team."
  />
);

export const ConsultZedAi = () => (
  <AskMock
    question="Compare progress across my three clients"
    answer="DSO Medical Centre is furthest behind plan (−9 pts). Al Meridian and Khawaneej are within 3 points."
    bullets={[
      { text: "DSO: 4 RFIs overdue, MEP coordination", tone: "red" },
      { text: "Al Meridian: on plan, 2 variations pending", tone: "green" },
      { text: "Khawaneej: fit-out 1 week ahead", tone: "blue" },
    ]}
    cite="Each client workspace, within your permissions"
  />
);

/* ============================ Module heroes ============================ */

export const CoreDirectory = () => (
  <TableMock
    title="Directory"
    meta="People & companies"
    cols={["Name", "Company", "Role", "Access"]}
    widths="1fr 1fr 0.9fr 0.8fr"
    flip={{ row: 3, col: 3, to: { chip: "Active", tone: "green" } }}
    rows={[
      ["Ahmed Rahman", "ZedOps MEP", "Site engineer", { chip: "Active", tone: "green" }],
      ["Priya Nair", "ZedOps MEP", "Project manager", { chip: "Active", tone: "green" }],
      ["Karim Haddad", "Atlas QS", "Cost consultant", { chip: "Guest", tone: "blue" }],
      ["Lina Farouk", "Gulf Steel", "Supplier", { chip: "Invited", tone: "amber" }],
    ]}
  />
);
export const CoreAsk = () => <AskMock question="Who can approve purchase orders on Tower B?" answer="Two people hold PO approval on Tower B: Priya Nair (up to AED 250k) and Sara Malik (above AED 250k)." cite="Directory, roles & permissions" />;

export const AccessMatrix = () => (
  <TableMock
    title="Roles & access"
    meta="Organisation"
    cols={["Role", "Projects", "Cost", "Zed AI"]}
    widths="1.1fr 0.8fr 0.8fr 0.8fr"
    flip={{ row: 3, col: 2, to: { chip: "View", tone: "blue" } }}
    rows={[
      ["Project manager", { chip: "Edit", tone: "green" }, { chip: "Edit", tone: "green" }, { chip: "On", tone: "green" }],
      ["Site engineer", { chip: "Edit", tone: "green" }, { chip: "None", tone: "slate" }, { chip: "On", tone: "green" }],
      ["Cost consultant", { chip: "View", tone: "blue" }, { chip: "Edit", tone: "green" }, { chip: "On", tone: "green" }],
      ["Subcontractor", { chip: "Own scope", tone: "amber" }, { chip: "None", tone: "slate" }, { chip: "Off", tone: "slate" }],
    ]}
  />
);
export const AccessAsk = () => <AskMock question="What can a subcontractor see on Marina Heights?" answer="Only their own packages: assigned tasks, their daily logs and punch items. No cost data, and Zed AI is off for this role." cite="Roles & permissions" />;

export const SettingsSetup = () => (
  <FormMock
    title="New project"
    meta="Setup"
    submit="Create project"
    fields={[
      { label: "Project name", value: "Creek Harbour Residences", wide: true },
      { label: "Client", value: "Emaar Properties" },
      { label: "Currency", value: "AED" },
      { label: "Template", value: "MEP high-rise" },
      { label: "Start date", value: "5 Oct 2026" },
    ]}
  />
);
export const SettingsAsk = () => <AskMock question="Which templates include commissioning checklists?" answer="Three templates do: MEP high-rise, Hospital fit-out and Data hall. Each adds 42 commissioning checks by default." cite="Project templates" />;

export const ProjectsHealth = () => (
  <KpiMock
    title="Project health"
    meta="Marina Heights C"
    kpis={[
      { label: "Progress", value: 55, suffix: "%", delta: "−3 pts vs plan", tone: "amber", spark: [20, 28, 35, 41, 47, 52, 55] },
      { label: "Open issues", value: 23, delta: "6 overdue", tone: "red", spark: [12, 15, 17, 18, 21, 22, 23] },
      { label: "Equipment on site", value: 14, delta: "2 due back", tone: "slate", spark: [9, 10, 12, 12, 13, 14, 14] },
      { label: "Surveys completed", value: 31, delta: "+8 this week", tone: "green", spark: [10, 14, 18, 21, 24, 27, 31] },
    ]}
  />
);
export const ProjectsAsk = () => <AskMock question="What changed on Marina Heights since Monday?" answer="Six new issues, two closed RFIs, and the L5 slab was signed off. Equipment returns are due for two scissor lifts." cite="Project activity, issues, equipment" />;

export const DailyPhotos = () => (
  <PhotoLogMock
    title="Today on site"
    meta="Creek Harbour"
    photos={[
      { src: "/contractors/service2.webp", caption: "AHU-2 commissioning", tag: "Progress", tone: "blue" },
      { src: "/photos/on-site.png", caption: "Morning briefing, gate 2", tag: "Safety", tone: "green", pos: "50% 20%" },
      { src: "/contractors/general2.png", caption: "Façade install, level 12", tag: "Delay", tone: "amber" },
    ]}
  />
);
export const DailyAsk = () => <AskMock question="Summarise today’s site activity" answer="41 crew on site, façade install paused 2 hours for wind, AHU-2 commissioning completed. One near-miss logged at gate 2." bullets={[{ text: "AHU-2 commissioned", tone: "green" }, { text: "Façade paused 2 h, high wind", tone: "amber" }, { text: "Near-miss, gate 2, reported", tone: "red" }]} cite="Daily log, photos, safety observations" />;

export const WorkforceGrid = () => (
  <AttendanceMock
    title="Crew attendance"
    meta="Week 39"
    days={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
    people={[
      { name: "Rashid A.", trade: "Pipefitter", marks: ["in", "in", "in", "late", "in", "in"] },
      { name: "Joseph M.", trade: "Electrician", marks: ["in", "in", "leave", "leave", "in", "in"] },
      { name: "Anil K.", trade: "Duct fitter", marks: ["in", "late", "in", "in", "in", "off"] },
      { name: "Samir T.", trade: "Foreman", marks: ["in", "in", "in", "in", "in", "in"] },
      { name: "Kevin D.", trade: "Welder", marks: ["late", "in", "in", "in", "off", "in"] },
    ]}
  />
);
export const WorkforceAsk = () => <AskMock question="Why are 19 check-ins delayed today?" answer="Bus 3 from the Sonapur camp arrived 40 minutes late. 17 of the 19 are on that route; two are late check-ins at gate 2." cite="Attendance, transport log" />;

export const QualityMarkup = () => (
  <DrawingMock
    title="Inspection markup"
    sheet="M-401 · Level 4"
    pins={[
      { x: 28, y: 22, n: 1, label: "Duct clashes with sprinkler main", tone: "red" },
      { x: 70, y: 30, n: 2, label: "Hanger spacing over 1.5 m", tone: "amber" },
      { x: 36, y: 70, n: 3, label: "Fire damper access OK", tone: "green" },
    ]}
  />
);
export const QualityAsk = () => <AskMock question="Summarise open findings by severity" answer="12 open findings on this project: 3 high, 5 medium and 4 low. All three high items sit on level 4 ceiling void works." cite="Inspections, observations" />;

export const PunchBoard = () => (
  <BoardMock
    title="Punch list"
    meta="Block C handover"
    move={{ from: 1, to: 2 }}
    columns={[
      { name: "Open", cards: [{ t: "Grille damaged, 4.12", meta: "HVAC", tone: "red" }, { t: "Missing escutcheon, WC 3", meta: "Plumb", tone: "amber" }] },
      { name: "Fixed", cards: [{ t: "Paint touch-up, riser 2", meta: "Awaiting check", tone: "blue" }] },
      { name: "Accepted", cards: [{ t: "Valve tag, CHW-07", meta: "Verified", tone: "green" }] },
    ]}
  />
);
export const PunchAsk = () => <AskMock question="Prioritise punch items by closeout impact" answer="Start with the 6 life-safety items on levels 3 and 4; they block the fire certificate. Cosmetic items can follow after handover walk-through." cite="Punch list, closeout checklist" />;

export const DocsRevisions = () => (
  <FeedMock
    title="Document revisions"
    meta="Drawings"
    items={[
      { who: "Design", text: "issued M-401 Rev E, level 4 HVAC", time: "08:40", tone: "blue", tag: "Rev E" },
      { who: "Zed AI", text: "flagged 3 changes vs Rev D", time: "08:41", tone: "orange" },
      { who: "Priya N.", text: "marked Rev D superseded on site", time: "09:15", tone: "slate" },
      { who: "Site", text: "acknowledged the new revision", time: "10:02", tone: "green", tag: "Read" },
    ]}
  />
);
export const DocsAsk = () => <AskMock question="What changed between M-401 Rev D and Rev E?" answer="Three changes: the level 4 duct run moves 300 mm south, one VAV box is added in 4.08, and a fire damper moves to grid C4." cite="Drawing register, M-401" />;

export const FinanceCost = () => (
  <ChartMock
    title="Cost by package"
    meta="AED k"
    kind="stacked"
    labels={["HVAC", "Plumb", "Elec", "Fire", "BMS"]}
    series={[
      { name: "Actual", values: [820, 410, 690, 220, 140], tone: "navy" },
      { name: "Committed", values: [260, 120, 180, 90, 60], tone: "orange" },
      { name: "Remaining", values: [120, 90, 160, 40, 70], tone: "mist" },
    ]}
  />
);
export const FinanceAsk = () => <AskMock question="Explain the cost variance on HVAC" answer="HVAC is AED 94k over budget. Most of it is the chiller price increase (AED 61k) and extra ductwork on level 4 after Rev E (AED 28k)." cite="Budget, POs, change log" />;

export const ReportsTrend = () => (
  <ChartMock
    title="Weekly report"
    meta="Issues opened vs closed"
    kind="bars"
    labels={["W34", "W35", "W36", "W37", "W38", "W39"]}
    series={[
      { name: "Opened", values: [18, 22, 15, 26, 19, 14], tone: "mist" },
      { name: "Closed", values: [12, 17, 19, 21, 24, 20], tone: "navy" },
    ]}
    note="Closure rate overtook new issues three weeks running."
  />
);
export const ReportsAsk = () => <AskMock question="Build this week’s report for the board" answer="Draft ready: progress, cost, safety and top five risks, in the board template. Charts refresh from live data before export." cite="Reports, dashboards" />;

export const SupplyOrders = () => (
  <TableMock
    title="Purchase orders"
    meta="Open"
    cols={["PO", "Material", "Supplier", "Status"]}
    widths="0.6fr 1.3fr 1fr 0.9fr"
    flip={{ row: 1, col: 3, to: { chip: "Delivered", tone: "green" } }}
    rows={[
      ["1042", "Duct fittings, L4", "Gulf Steel", { chip: "Delivered", tone: "green" }],
      ["1043", "Chiller, 450 kW", "Carrier ME", { chip: "In transit", tone: "blue" }],
      ["1047", "Cable tray, 300 mm", "Unitech", { chip: "Ordered", tone: "slate" }],
      ["1051", "Copper pipe, 15 mm", "Mueller", { chip: "Late", tone: "red" }],
    ]}
  />
);
export const SupplyAsk = () => <AskMock question="Which deliveries are at risk this week?" answer="Two: PO-1051 copper pipe is 4 days late and blocks plumbing on level 6, and PO-1043’s chiller moved to Thursday." cite="Purchase orders, schedule" />;

/* ============================ Zed AI page ============================ */

export const ZaiHeroAsk = () => <AskMock question="What needs my attention on Tower B today?" answer="Three things: a slipped chiller delivery, a variation waiting on your approval, and two overdue inspections on level 6." bullets={[{ text: "Chiller delivery moved to Thursday", tone: "amber" }, { text: "Variation 014 awaiting approval", tone: "orange" }, { text: "2 inspections overdue, level 6", tone: "red" }]} cite="Schedule, approvals, inspections" />;
export const ZaiCopilot = () => <AskMock question="Which activities are at risk this week?" answer="Seven activities are at risk, five of them on the level 4 MEP sequence waiting for the chiller." cite="Programme, material tracking" />;
export const ZaiInsights = () => (
  <KpiMock
    title="Signals this week"
    meta="Portfolio"
    kpis={[
      { label: "Delay risk", value: 7, delta: "+3 activities", tone: "red", spark: [2, 3, 3, 4, 5, 6, 7] },
      { label: "Cost pressure", value: 4.1, suffix: "%", decimals: 1, delta: "HVAC, Tower B", tone: "amber", spark: [1, 1.5, 2, 2.8, 3.2, 3.8, 4.1] },
      { label: "Safety observations", value: 12, delta: "−5 vs last week", tone: "green", spark: [20, 19, 17, 16, 15, 13, 12] },
      { label: "Approvals waiting", value: 9, delta: "3 over 5 days", tone: "amber", spark: [4, 5, 6, 6, 7, 8, 9] },
    ]}
  />
);
export const ZaiReports = () => (
  <ChartMock
    title="Report draft"
    meta="Owner monthly"
    kind="line"
    labels={["W34", "W35", "W36", "W37", "W38", "W39"]}
    series={[
      { name: "Planned", values: [40, 45, 50, 55, 60, 65], tone: "mist" },
      { name: "Actual", values: [39, 44, 47, 52, 57, 62], tone: "orange" },
    ]}
    note="Narrative drafted: “Progress 62% vs 65% planned, recovery plan attached.”"
  />
);
export const ZaiActions = () => (
  <BoardMock
    title="Follow-ups created by Zed"
    meta="From today’s log"
    move={{ from: 0, to: 1 }}
    columns={[
      { name: "Suggested", cards: [{ t: "Chase PO-1051 with Mueller", meta: "Materials", tone: "orange", tag: "Zed" }, { t: "Re-inspect L6 dampers", meta: "Quality", tone: "orange", tag: "Zed" }] },
      { name: "Accepted", cards: [{ t: "Notify owner of chiller slip", meta: "PM", tone: "blue" }] },
      { name: "Done", cards: [{ t: "Update lookahead", meta: "Planning", tone: "green" }] },
    ]}
  />
);

/* ============================ Lifecycle stages ============================ */

export const StagePrecon = () => (
  <ApprovalMock
    title="Bid approval"
    meta="Creek Harbour MEP"
    amount="AED 18.4M"
    done={2}
    steps={[
      { who: "Estimating", role: "BOQ and rates", note: "Priced from the rate library, Rev B" },
      { who: "Commercial", role: "Margin review", note: "11.5% margin, 2 risk items" },
      { who: "Director", role: "Final sign-off" },
    ]}
  />
);
export const StageConstruction = () => (
  <BoardMock
    title="Site tasks"
    meta="Level 6"
    move={{ from: 0, to: 1 }}
    columns={[
      { name: "Today", cards: [{ t: "Hang ductwork, grid D", meta: "Crew 4", tone: "blue" }, { t: "Pull LV cable to DB-6", meta: "Crew 2", tone: "blue" }] },
      { name: "In progress", cards: [{ t: "Pressure test CHW", meta: "Crew 1", tone: "amber" }] },
      { name: "Done", cards: [{ t: "Sleeves, slab 6", meta: "Crew 3", tone: "green" }] },
    ]}
  />
);
export const StageCloseout = () => (
  <ChecklistMock
    title="Handover pack"
    meta="Block C"
    items={[
      { t: "As-built drawings, all trades", ok: true },
      { t: "O&M manuals uploaded", ok: true },
      { t: "Commissioning certificates", ok: true },
      { t: "Warranties registered", ok: null },
      { t: "Punch list closed", ok: null, who: "6 left" },
    ]}
  />
);
export const StageCore = () => (
  <FormMock
    title="Invite a team member"
    meta="Organisation"
    submit="Send invite"
    fields={[
      { label: "Name", value: "Hassan Qureshi" },
      { label: "Email", value: "hassan@zedops-mep.com" },
      { label: "Role", value: "Site engineer" },
      { label: "Projects", value: "Tower B, Creek Harbour" },
    ]}
  />
);

/* ============================ Solutions ============================ */

export const SolutionsAsk = () => <AskMock question="Show me every module touching Tower B’s chiller" answer="Four modules reference it: the PO in Materials, the activity in Planning, the inspection in Quality and the cost line in Budget." cite="Materials, Planning, Quality, Budget" />;

/** Hero pairs for module pages: the module's own screen, then a module-specific question. */
export const moduleScenes: Record<string, [ComponentType, ComponentType]> = {
  core: [CoreDirectory, CoreAsk],
  "platform-access": [AccessMatrix, AccessAsk],
  settings: [SettingsSetup, SettingsAsk],
  projects: [ProjectsHealth, ProjectsAsk],
  "daily-intelligence": [DailyPhotos, DailyAsk],
  "workforce-intelligence": [WorkforceGrid, WorkforceAsk],
  "quality-safety-closeout": [QualityMarkup, QualityAsk],
  "punch-list": [PunchBoard, PunchAsk],
  "information-management": [DocsRevisions, DocsAsk],
  finance: [FinanceCost, FinanceAsk],
  "reporting-exports": [ReportsTrend, ReportsAsk],
  "supply-chain": [SupplyOrders, SupplyAsk],
};

/** Persona feature scenes, keyed by the scenario ids the persona pages already use. */
export const personaScenes: Record<string, ComponentType> = {
  "gc-project-hub": GcProjectHub,
  "gc-daily-log": GcDailyLog,
  "gc-planning": GcPlanning,
  "gc-qhse": GcQhse,
  "owners-portfolio": OwnersPortfolio,
  "owners-finance": OwnersFinance,
  "owners-documents": OwnersDocuments,
  "owners-governance": OwnersGovernance,
  "pm-schedule-tasks": PmScheduleTasks,
  "pm-docs-logs": PmDocsLogs,
  "pm-quality": PmQuality,
  "pm-zed-ai": PmZedAi,
  "consult-portfolio": ConsultPortfolio,
  "consult-requests": ConsultRequests,
  "consult-exports": ConsultExports,
  "consult-zed-ai": ConsultZedAi,
};

export const ZaiWriting = () => (
  <FormMock
    title="Daily log entry"
    meta="Refined with Zed"
    submit="Save entry"
    fields={[
      { label: "Work completed", value: "Ductwork L5 east complete, 120 m²; CHW risers L3–L6 pressure-tested.", wide: true },
      { label: "Delays", value: "Roof works paused 2 h, rain", wide: true },
      { label: "Crew", value: "38 on site" },
      { label: "Next", value: "Insulation, L5 risers" },
    ]}
  />
);

export const ZaiRisk = () => (
  <TableMock
    title="At-risk activities"
    meta="Next 14 days"
    cols={["Activity", "Driver", "Float", "Risk"]}
    widths="1.4fr 1fr 0.6fr 0.8fr"
    flip={{ row: 2, col: 3, to: { chip: "High", tone: "red" } }}
    rows={[
      ["L4 HVAC testing", "Chiller delivery", "−3d", { chip: "High", tone: "red" }],
      ["L6 plumbing rough-in", "PO-1051 late", "−1d", { chip: "High", tone: "red" }],
      ["Façade, level 12", "Wind days", "2d", { chip: "Medium", tone: "amber" }],
      ["BMS integration", "Vendor access", "6d", { chip: "Low", tone: "green" }],
    ]}
  />
);
