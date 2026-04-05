export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "section";
}

function uniqueId(base: string, used: Map<string, number>): string {
  const n = used.get(base) ?? 0;
  used.set(base, n + 1);
  if (n === 0) return base;
  return `${base}-${n}`;
}

/** Headings `##` and `###` only, in document order, with stable ids for anchors. */
export function extractMarkdownToc(markdown: string): TocItem[] {
  const lines = markdown.split(/\r?\n/);
  const items: TocItem[] = [];
  const used = new Map<string, number>();

  for (const line of lines) {
    const m = line.match(/^(#{2,3})\s+(.+)$/);
    if (!m) continue;
    const hashes = m[1];
    const depth = (hashes.length === 2 ? 2 : 3) as 2 | 3;
    const text = m[2].trim().replace(/\s+#+\s*$/, "");
    const base = slugify(text);
    const id = uniqueId(base, used);
    items.push({ id, text, depth });
  }

  return items;
}
