/**
 * Zed's specialists: the same colours and roles as the AI copilot in the ZedOps app.
 */
export type ZedSpecialistKey = "zed" | "foreman" | "ledger" | "hauler" | "crew" | "gauge" | "warden";

export interface ZedSpecialistInfo {
  key: ZedSpecialistKey;
  name: string;
  /** What it covers, shown as the chat header subtitle. */
  role: string;
  face: string;
  hat: string;
  brim: string;
  stripe: string;
}

export const ZED_SPECIALISTS: Record<ZedSpecialistKey, ZedSpecialistInfo> = {
  zed: {
    key: "zed",
    name: "Zed",
    role: "Ask anything across your projects",
    face: "#ff9d2e",
    hat: "#ea5a1c",
    brim: "#b93a12",
    stripe: "#ffd2a0",
  },
  foreman: {
    key: "foreman",
    name: "Foreman",
    role: "Projects, schedule and tasks",
    face: "#5aa2ff",
    hat: "#1f5fd1",
    brim: "#123e8f",
    stripe: "#cfe3ff",
  },
  ledger: {
    key: "ledger",
    name: "Ledger",
    role: "Budgets, costs and payments",
    face: "#3ec98a",
    hat: "#12805a",
    brim: "#0a5238",
    stripe: "#c9f2de",
  },
  hauler: {
    key: "hauler",
    name: "Hauler",
    role: "Supply chain and warehouse",
    face: "#a78bfa",
    hat: "#6a3fd6",
    brim: "#432094",
    stripe: "#e3d9ff",
  },
  crew: {
    key: "crew",
    name: "Crew",
    role: "People, attendance and leave",
    face: "#f472b6",
    hat: "#c02679",
    brim: "#7d1350",
    stripe: "#fbd0e6",
  },
  gauge: {
    key: "gauge",
    name: "Gauge",
    role: "Estimation and drawing takeoff",
    face: "#2dd4d0",
    hat: "#0e8f93",
    brim: "#0a5a5e",
    stripe: "#c3f4f2",
  },
  warden: {
    key: "warden",
    name: "Warden",
    role: "Safety, snags and inspections",
    face: "#ff6b6b",
    hat: "#c92a2a",
    brim: "#7f1d1d",
    stripe: "#ffd0d0",
  },
};

