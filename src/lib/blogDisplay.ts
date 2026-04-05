import { format, parseISO } from "date-fns";
import type { BlogPost } from "./blog";

/** Default covers when frontmatter has no `image:` */
const COVER_POOL = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590658046490-b2ccf47c6ea8?w=1200&q=85&auto=format&fit=crop",
] as const;

export function postCoverImage(post: BlogPost, index: number): string {
  if (post.image) return post.image;
  return COVER_POOL[Math.abs(index) % COVER_POOL.length];
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
