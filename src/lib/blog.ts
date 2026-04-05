import { blogMarkdownEntries } from "@/content/blog/loader";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  /** ISO date string YYYY-MM-DD */
  date: string;
  author: string;
  /** Optional hero/cover URL from frontmatter `image:` */
  image?: string;
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
