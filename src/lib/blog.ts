import { blogMarkdownEntries } from "@/content/blog/loader";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  /** ISO date string YYYY-MM-DD */
  date: string;
  author: string;
  /** Listing & card cover URL from frontmatter `image:`. Without one, a generated cover is drawn from `category`. */
  image?: string;
  /** Frontmatter `category:`, one of BLOG_CATEGORIES (unknown values fall back to "Guides"). */
  category: BlogCategory;
  /** Frontmatter `cover:` picks a generated cover scene other than the category default (e.g. `access`). */
  cover?: string;
  /** Frontmatter `featured: true` pins the post to the top of the index. */
  featured: boolean;
}

export const BLOG_CATEGORIES = ["Guides", "Field", "Estimation", "Procurement", "Quality", "Zed AI"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

function toCategory(raw: string | undefined): BlogCategory {
  const match = BLOG_CATEGORIES.find((c) => c.toLowerCase() === (raw ?? "").trim().toLowerCase());
  return match ?? "Guides";
}

export interface BlogPost extends BlogPostMeta {
  body: string;
}

function slugFromPath(path: string): string {
  const base = path.replace(/^.*\//, "").replace(/^\.\//, "");
  return base.replace(/\.md$/i, "");
}

/** Small frontmatter parser (no gray-matter / no eval)  -  YAML keys must be simple `key: value` lines. */
function splitFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const text = raw.replace(/^\uFEFF/, "").trimStart();
  if (!text.startsWith("---")) return { data: {}, content: text.trim() };

  const lines = text.split(/\r?\n/);
  if (lines[0]?.trim() !== "---") return { data: {}, content: text.trim() };

  const data: Record<string, string> = {};
  let i = 1;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "---") {
      i++;
      break;
    }
    const colon = line.indexOf(":");
    if (colon > -1) {
      const key = line.slice(0, colon).trim();
      let val = line.slice(colon + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      data[key] = val;
    }
    i++;
  }
  const content = lines.slice(i).join("\n").trim();
  return { data, content };
}

function parsePost(path: string, raw: string): BlogPost | null {
  try {
    const { data, content } = splitFrontmatter(raw);
    const slug = slugFromPath(path);
    const title = (data.title ?? "").trim() || slug;
    const description = (data.description ?? "").trim();
    let date = "1970-01-01";
    const d = (data.date ?? "").trim();
    if (d.length >= 10) date = d.slice(0, 10);
    const author = (data.author ?? "").trim() || "ZedOps";
    const imageRaw = (data.image ?? "").trim();
    if (!title || !content.trim()) return null;
    return {
      slug,
      title,
      description: description || `${title}  -  ZedOps`,
      date,
      author,
      category: toCategory(data.category),
      featured: (data.featured ?? "").trim() === "true",
      ...(data.cover?.trim() ? { cover: data.cover.trim() } : {}),
      ...(imageRaw ? { image: imageRaw } : {}),
      body: content.trim(),
    };
  } catch {
    return null;
  }
}

let _cache: BlogPost[] | null = null;

function loadAll(): BlogPost[] {
  if (_cache) return _cache;
  const posts: BlogPost[] = [];
  for (const { path, raw } of blogMarkdownEntries) {
    const p = parsePost(path, raw);
    if (p) posts.push(p);
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  _cache = posts;
  return _cache;
}

export function getAllPosts(): BlogPost[] {
  return loadAll();
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return loadAll().find((p) => p.slug === slug);
}

/** The pinned post, or the newest one. */
export function getFeaturedPost(): BlogPost | undefined {
  const posts = loadAll();
  return posts.find((p) => p.featured) ?? posts[0];
}

/** Same-category posts first, then the newest others. */
export function getRelatedPosts(post: BlogPost, count = 3): BlogPost[] {
  const others = loadAll().filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, count);
}
