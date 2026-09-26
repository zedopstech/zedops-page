/**
 * Single source of truth for site-wide SEO facts: the canonical origin, brand entity
 * details used in structured data, and the default social share image.
 *
 * Override the origin at build time with VITE_SITE_URL (e.g. for a staging domain) so
 * canonical/OG URLs never hardcode production into a preview deploy.
 */

const RAW_ORIGIN = import.meta.env.VITE_SITE_URL ?? "https://zedops.com";

/** Canonical origin, no trailing slash. */
export const SITE_URL = RAW_ORIGIN.replace(/\/+$/, "");

export const SITE = {
  name: "ZedOps",
  legalName: "ZedOps, Inc.",
  tagline: "AI MEP & Construction Execution Platform",
  description:
    "ZedOps connects schedule, field work, materials, costs, and quality in one project view for mechanical, electrical, and plumbing contractors.",
  logo: "/logo.png",
  /** 1200x630 is the size most social platforms render at. */
  ogImage: "/og-image.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitter: "@zedops",
  email: "hello@zedops.com",
  founded: "2024",
} as const;

/** Build an absolute URL from a root-relative path ("/blog" -> "https://zedops.com/blog"). */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean === "/" ? "/" : clean.replace(/\/+$/, "")}`;
}
