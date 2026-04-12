import { format, parseISO } from "date-fns";
import type { BlogPost } from "./blog";

/**
 * Cover image URL from post frontmatter (`image:`). No fallback; set `image` in each `.md` file.
 */
export function postCoverImage(post: BlogPost): string | undefined {
  return post.image;
}

/** Thumbnail-friendly URL when the host supports resize query params (e.g. Unsplash). */
export function coverThumbUrl(fullUrl: string | undefined, width = 200): string | undefined {
  if (!fullUrl) return undefined;
  if (fullUrl.includes("images.unsplash.com")) {
    const base = fullUrl.split("?")[0];
    return `${base}?w=${width}&q=80&auto=format&fit=crop`;
  }
  return fullUrl;
}

/** ~200 wpm; at least 1 minute */
export function readingMinutes(post: BlogPost): number {
  const words = post.body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatReadLabel(post: BlogPost): string {
  return `${readingMinutes(post)} MIN READ`;
}

/** e.g. 6 Nov 2023 */
export function formatBlogDate(iso: string): string {
  return format(parseISO(iso), "d MMM yyyy");
}

export function authorFirstName(author: string): string {
  const raw = author.split(",")[0]?.trim() || author.trim() || "ZedOps";
  return raw;
}

export function avatarUrl(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=128&background=172B4D&color=ffffff`;
}
