/**
 * Website lead capture. Every form posts here, and it lands in Strapi as an `api::lead.lead`
 * (see zedops-kb-api `src/api/lead`). The endpoint saves nothing for bots (honeypot + fill
 * time), rate-limits per IP and only accepts our own origins.
 *
 * VITE_LEADS_API_URL points at the Strapi base URL, e.g. http://localhost:1337 in dev.
 */

export type LeadForm = "contact" | "early_access" | "roadmap";

export type LeadFields = {
  name?: string;
  email: string;
  company?: string;
  phone?: string;
  country?: string;
  role?: string;
  companySize?: string;
  topic?: string;
  message?: string;
};

const API_BASE = (import.meta.env.VITE_LEADS_API_URL || "https://kb-api.zedops.com").replace(/\/$/, "");
const ATTRIBUTION_KEY = "zedops.attribution";

type Attribution = {
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
};

/**
 * Remember where the visitor first came from (UTM tags and referrer) for this tab session,
 * so a lead submitted three pages later is still credited to the right campaign.
 * Call once on app start.
 */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(ATTRIBUTION_KEY)) return;
    const q = new URLSearchParams(window.location.search);
    const external = document.referrer && !document.referrer.startsWith(window.location.origin);
    const data: Attribution = {
      referrer: external ? document.referrer : undefined,
      utmSource: q.get("utm_source") ?? undefined,
      utmMedium: q.get("utm_medium") ?? undefined,
      utmCampaign: q.get("utm_campaign") ?? undefined,
      utmTerm: q.get("utm_term") ?? undefined,
      utmContent: q.get("utm_content") ?? undefined,
    };
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(data));
  } catch {
    /* storage blocked: attribution is optional */
  }
}

function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}

export class LeadError extends Error {}

/**
 * Submit a lead. Resolves when Strapi has saved it; throws LeadError with a message that is
 * safe to show the visitor otherwise.
 *
 * `startedAt` is when the form was first shown (Date.now()); `honeypot` is the hidden
 * "website" field's value. Both let the server drop bots silently.
 */
export async function submitLead(
  form: LeadForm,
  fields: LeadFields,
  opts: { startedAt: number; honeypot?: string },
): Promise<void> {
  const payload = {
    form,
    ...fields,
    ...readAttribution(),
    page: window.location.pathname + window.location.search,
    website: opts.honeypot ?? "",
    elapsedMs: Date.now() - opts.startedAt,
  };

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/leads/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new LeadError("We couldn’t reach our server. Check your connection and try again.");
  }

  if (res.ok) return;
  if (res.status === 429) throw new LeadError("Too many attempts. Please wait a few minutes and try again.");

  let message = "Something went wrong on our side. Please try again.";
  try {
    const body = (await res.json()) as { error?: { message?: string } | string };
    const detail = typeof body.error === "string" ? body.error : body.error?.message;
    if (res.status === 400 && detail) message = detail;
  } catch {
    /* non-JSON error body */
  }
  throw new LeadError(message);
}
