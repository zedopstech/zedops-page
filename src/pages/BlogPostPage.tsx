import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import type { RouteComponentProps } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Link2,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogMarkdown } from "@/components/BlogMarkdown";
import { useSEO } from "@/hooks/useSEO";
import { getPostBySlug } from "@/lib/blog";
import { authorFirstName, avatarUrl, formatBlogDate, readingMinutes } from "@/lib/blogDisplay";
import { extractMarkdownToc } from "@/lib/markdownToc";
import type { TocItem } from "@/lib/markdownToc";

const blueprintBg = {
  backgroundImage: [
    "linear-gradient(rgba(1,47,176,0.045) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(1,47,176,0.045) 1px, transparent 1px)",
    "linear-gradient(rgba(1,47,176,0.02) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(1,47,176,0.02) 1px, transparent 1px)",
  ].join(", "),
  backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
} as const;

function ArticleSidebar({ toc, shareUrl, title }: { toc: TocItem[]; shareUrl: string; title: string }) {
  const [tocOpen, setTocOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const iconBtn =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4F5F7] text-[#42526E] transition-colors hover:bg-[#EBECF0] hover:text-[#172B4D]";

  return (
    <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#97A0AF]">Share</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {shareUrl ? (
            <>
              <a href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`} className={iconBtn} aria-label="Share by email">
                <Mail className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className={iconBtn}
                aria-label="Share on X"
              >
                <Twitter className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={iconBtn}
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
              </a>
              <button type="button" onClick={copyLink} className={iconBtn} aria-label="Copy link">
                <Link2 className="h-4 w-4" aria-hidden />
              </button>
            </>
          ) : null}
        </div>
        {copied ? <p className="mt-2 text-xs font-medium text-[#0052CC]">Link copied</p> : null}
      </div>

      {toc.length > 0 ? (
        <div className="bg-[#F4F5F7]/50 px-4 py-3 sm:px-5 sm:py-4" style={{ borderRadius: 12 }}>
          <button
            type="button"
            onClick={() => setTocOpen((o) => !o)}
            className="flex w-full items-center justify-between gap-2 text-left"
            aria-expanded={tocOpen}
          >
            <span className="text-sm font-extrabold text-[#172B4D]">Table of contents</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-[#6B778C] transition-transform ${tocOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
          {tocOpen ? (
            <nav className="mt-4 pt-1" aria-label="Article sections">
              <ul className="space-y-2.5 text-sm">
                {toc.map((item) => (
                  <li key={item.id} className={item.depth === 3 ? "pl-4" : ""}>
                    <a
                      href={`#${item.id}`}
                      className="leading-snug text-[#6B778C] transition-colors hover:text-[#0052CC]"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      ) : null}
    </aside>
  );
}

export default function BlogPostPage({ params }: RouteComponentProps<{ slug: string }>) {
  const post = getPostBySlug(params.slug);
  const [shareUrl, setShareUrl] = useState("");

  const toc = useMemo(() => (post ? extractMarkdownToc(post.body) : []), [post]);

  useEffect(() => {
    setShareUrl(typeof window !== "undefined" ? window.location.href : "");
  }, [params.slug]);

  useSEO({
    title: post ? `${post.title}  -  ZedOps` : "Post not found  -  ZedOps",
    description: post?.description ?? "The requested article could not be found.",
  });

  if (!post) {
    return (
      <div className="min-h-screen overflow-x-clip bg-[#FAFBFC] text-[#172B4D]">
        <Navbar />
        <div className="mx-auto max-w-lg px-6 pt-[120px] pb-24 text-center">
          <h1 className="text-2xl font-extrabold">Article not found</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#6B778C]">
            This URL may be outdated or the post was moved.
          </p>
          <Link
            href="/blog"
            className="mt-8 inline-flex items-center gap-2 font-bold text-[#0052CC] transition-colors hover:text-[#0747A6]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const name = authorFirstName(post.author);
  const mins = readingMinutes(post);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#172B4D]">
      <Navbar />
      <div className="pt-[100px]">
        <article>
          <header className="relative overflow-hidden pb-14 pt-16 lg:pb-20 lg:pt-20">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "linear-gradient(155deg, #C4D9FF 0%, #D9EBFF 28%, #ECF3FF 58%, #F2F6FF 100%)",
              }}
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 opacity-70" style={blueprintBg} aria-hidden />
            <div
              className="pointer-events-none absolute bottom-0 left-1/2 h-[240px] w-[min(100vw,900px)] max-w-full -translate-x-1/2"
              style={{
                background: "radial-gradient(ellipse at center bottom, rgba(247,150,37,0.08) 0%, transparent 65%)",
                filter: "blur(40px)",
              }}
              aria-hidden
            />

            <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
              <motion.nav
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-wrap items-center justify-center gap-1 text-sm text-[#6B778C]"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="font-medium text-[#42526E] transition-colors hover:text-[#0052CC]">
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#97A0AF]" aria-hidden />
                <Link href="/blog" className="font-medium text-[#42526E] transition-colors hover:text-[#0052CC]">
                  Blog
                </Link>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#97A0AF]" aria-hidden />
                <span className="max-w-[min(100%,220px)] truncate font-medium text-[#97A0AF]">{post.title}</span>
              </motion.nav>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="mt-8 text-3xl font-extrabold leading-[1.12] tracking-tight text-[#172B4D] sm:text-4xl lg:text-[2.65rem]"
              >
                {post.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="mt-5 text-lg leading-relaxed text-[#42526E]"
              >
                {post.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.14 }}
                className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-[#6B778C]"
              >
                <span className="inline-flex items-center gap-2">
                  <img src={avatarUrl(name)} alt="" className="h-8 w-8 rounded-full object-cover" />
                  <span className="font-semibold text-[#42526E]">{post.author}</span>
                </span>
                <span className="text-[#DFE1E6]" aria-hidden>
                  •
                </span>
                <span>Updated on {formatBlogDate(post.date)}</span>
                <span className="text-[#DFE1E6]" aria-hidden>
                  •
                </span>
                <span>
                  {mins} min read
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.18 }}
                className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                <a
                  href="/early-access"
                  className="inline-flex w-full items-center justify-center px-6 py-3 text-sm font-bold text-white transition-colors hover:opacity-95 sm:w-auto"
                  style={{ borderRadius: 6, background: "#F79625" }}
                >
                  Request a demo
                </a>
                <a
                  href="/contact"
                  className="inline-flex w-full items-center justify-center border border-[#172B4D]/20 bg-white/90 px-6 py-3 text-sm font-bold text-[#172B4D] backdrop-blur-sm transition-colors hover:border-[#172B4D]/35 sm:w-auto"
                  style={{ borderRadius: 6 }}
                >
                  Contact
                </a>
              </motion.div>
            </div>
          </header>

          <div className="border-t border-gray-100 bg-[#FAFBFC]">
            <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
              <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-8 lg:pr-4">
                  <BlogMarkdown>{post.body}</BlogMarkdown>
                  <div className="mt-20 border-t border-gray-200 pt-12">
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#0052CC] transition-colors hover:text-[#0747A6]"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden />
                      More articles
                    </Link>
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <ArticleSidebar toc={toc} shareUrl={shareUrl} title={post.title} />
                </div>
              </div>
            </div>
          </div>
        </article>
        <Footer />
      </div>
    </div>
  );
}
