import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import type { RouteComponentProps } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Link2, Linkedin, Mail, Twitter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import { BlogMarkdown } from "@/components/BlogMarkdown";
import { AuthorBadge, PostCard, PostCover } from "@/components/blog/BlogBits";
import { framePad, Section } from "@/components/design-system/primitives";
import { useSEO } from "@/hooks/useSEO";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { formatBlogDate, readingMinutes } from "@/lib/blogDisplay";
import { extractMarkdownToc } from "@/lib/markdownToc";
import type { TocItem } from "@/lib/markdownToc";
import { SITE, SITE_URL, absoluteUrl } from "@/config/site";
import type { BlogPost } from "@/lib/blog";

/** BlogPosting + BreadcrumbList so posts can earn article rich results and breadcrumb trails. */
function buildBlogPosting(post: BlogPost) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      headline: post.title,
      description: post.description,
      image: post.image ? [absoluteUrl(post.image)] : [absoluteUrl(SITE.ogImage)],
      datePublished: new Date(post.date).toISOString(),
      dateModified: new Date(post.date).toISOString(),
      author: { "@type": "Organization", name: post.author },
      publisher: { "@id": `${SITE_URL}#organization` },
      articleSection: post.category,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}#website` },
      wordCount: post.body.trim().split(/\s+/).filter(Boolean).length,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
}

/** The heading nearest above the reading line (a third down the viewport). */
function useActiveHeading(toc: TocItem[]) {
  const [active, setActive] = useState<string | undefined>(toc[0]?.id);
  useEffect(() => {
    if (toc.length === 0) return;
    const onScroll = () => {
      const line = window.innerHeight * 0.33;
      let current = toc[0]?.id;
      for (const item of toc) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);
  return active;
}

function ShareRow({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(window.location.href), []);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const btn =
    "flex h-9 w-9 items-center justify-center rounded-full border border-[#E3E8F0] text-[#5E6C84] transition-colors hover:border-brand-navy hover:text-brand-navy";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked; nothing to do */
    }
  };

  return (
    <div className="flex items-center gap-2">
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on LinkedIn">
        <Linkedin size={15} aria-hidden />
      </a>
      <a href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on X">
        <Twitter size={15} aria-hidden />
      </a>
      <a href={`mailto:?subject=${t}&body=${u}`} className={btn} aria-label="Share by email">
        <Mail size={15} aria-hidden />
      </a>
      <button type="button" onClick={copy} className={btn} aria-label={copied ? "Link copied" : "Copy link"}>
        {copied ? <Check size={15} className="text-[#1D9A5B]" aria-hidden /> : <Link2 size={15} aria-hidden />}
      </button>
    </div>
  );
}

function Toc({ toc, active }: { toc: TocItem[]; active?: string }) {
  if (toc.length === 0) return null;
  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-[112px]">
      <p className="text-[13px] font-medium text-brand-navy">On this page</p>
      <ul className="mt-4 border-l border-[#E8ECF2]">
        {toc
          .filter((item) => item.depth === 2)
          .map((item) => {
            const on = item.id === active;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`-ml-px block border-l py-1.5 pl-4 text-[13.5px] leading-[1.4] transition-colors ${
                    on ? "border-brand-orange text-brand-navy" : "border-transparent text-[#8C97AB] hover:text-brand-navy"
                  }`}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

export default function BlogPostPage({ params }: RouteComponentProps<{ slug: string }>) {
  const post = getPostBySlug(params.slug);
  const toc = useMemo(() => (post ? extractMarkdownToc(post.body) : []), [post]);
  const related = useMemo(() => (post ? getRelatedPosts(post) : []), [post]);
  const active = useActiveHeading(toc);

  useSEO({
    title: post ? `${post.title}  -  ZedOps` : "Post not found  -  ZedOps",
    description: post?.description ?? "The requested article could not be found.",
    // A missing post is a soft 404: keep it out of the index.
    noindex: !post,
    type: post ? "article" : "website",
    image: post?.image,
    imageAlt: post ? `${post.title} — ZedOps` : undefined,
    publishedTime: post ? new Date(post.date).toISOString() : undefined,
    author: post?.author,
    jsonLd: post ? buildBlogPosting(post) : undefined,
  });

  if (!post) {
    return (
      <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
        <Navbar />
        <main id="main" className="mx-auto max-w-lg px-6 pt-[160px] pb-28 text-center">
          <h1 className="text-[32px] font-medium tracking-[-0.03em]">Article not found</h1>
          <p className="mt-3 text-[16px] text-[#5E6C84]">This link may be outdated, or the article has moved.</p>
          <Link href="/blog" className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-brand-navy hover:text-brand-orange">
            <ArrowLeft size={16} aria-hidden /> All articles
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <main id="main">
        <header className="bg-white">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mx-auto max-w-[1200px] pt-[124px] pb-12 sm:pt-[136px] lg:border-x lg:border-[#E8ECF2] lg:pb-14 ${framePad}`}
          >
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13.5px]">
              <Link href="/blog" className="text-[#8C97AB] hover:text-brand-navy">Blog</Link>
              <span className="text-[#C9D2DF]" aria-hidden>/</span>
              <Link href={`/blog?category=${encodeURIComponent(post.category.toLowerCase())}`} className="font-medium text-brand-orange hover:underline">
                {post.category}
              </Link>
            </nav>
            <h1 className="mt-5 max-w-[880px] text-[34px] font-medium leading-[1.08] tracking-[-0.04em] [text-wrap:balance] sm:text-[46px] lg:text-[54px]">
              {post.title}
            </h1>
            <p className="mt-5 max-w-[680px] text-[17px] leading-[1.6] text-[#5E6C84] sm:text-[18px]">{post.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] text-[#5E6C84]">
              <AuthorBadge size={34} />
              <span className="font-medium text-brand-navy">{post.author}</span>
              <span className="text-[#C9D2DF]" aria-hidden>·</span>
              <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
              <span className="text-[#C9D2DF]" aria-hidden>·</span>
              <span>{readingMinutes(post)} min read</span>
            </div>
          </motion.div>
        </header>

        <Section label="Cover">
          <div className="aspect-[16/9] overflow-hidden sm:aspect-[21/8]">
            <PostCover post={post} tone="dark" fit="contain" />
          </div>
        </Section>

        <Section label="Article">
          <div className={`grid gap-10 py-12 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16 lg:py-16 ${framePad}`}>
            <aside className="hidden lg:block">
              <Toc toc={toc} active={active} />
            </aside>
            <article className="min-w-0 max-w-[700px]">
              <BlogMarkdown>{post.body}</BlogMarkdown>

              <div className="mt-14 flex flex-col gap-6 border-t border-[#E8ECF2] pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <AuthorBadge size={40} />
                  <div>
                    <p className="text-[15px] font-medium text-brand-navy">{post.author}</p>
                    <p className="text-[13.5px] text-[#8C97AB]">Published {formatBlogDate(post.date)}</p>
                  </div>
                </div>
                <ShareRow title={post.title} />
              </div>
            </article>
          </div>
        </Section>

        {related.length > 0 ? (
          <Section tone="mist" labelledBy="keep-reading">
            <div className={`flex items-end justify-between gap-4 pt-14 pb-8 lg:pt-16 ${framePad}`}>
              <h2 id="keep-reading" className="text-[26px] font-medium tracking-[-0.03em] text-brand-navy sm:text-[30px]">Keep reading</h2>
              <Link href="/blog" className="text-[14.5px] font-medium text-brand-navy hover:text-brand-orange">All articles</Link>
            </div>
            <div className="grid gap-px border-t border-[#E3E8F0] bg-[#E3E8F0] sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <div key={p.slug} className={`bg-white ${i === 2 ? "sm:hidden lg:block" : ""}`}>
                  <PostCard post={p} />
                </div>
              ))}
            </div>
          </Section>
        ) : null}

        <FinalCTA
          title="Want to try this on a live project?"
          body="Bring one job and we will set it up with you, from BOQ to handover."
        />
      </main>
      <Footer />
    </div>
  );
}
