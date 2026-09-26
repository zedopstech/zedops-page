import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import type { RouteComponentProps } from "wouter";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Link2,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/design-system/primitives";
import FinalCTA from "@/components/FinalCTA";
import { BlogMarkdown } from "@/components/BlogMarkdown";
import { useSEO } from "@/hooks/useSEO";
import { getPostBySlug } from "@/lib/blog";
import { authorFirstName, avatarUrl, formatBlogDate, readingMinutes } from "@/lib/blogDisplay";
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
      author: { "@type": "Person", name: post.author },
      publisher: { "@id": `${SITE_URL}#organization` },
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
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#E3E8F0] text-[#5E6C84] transition-colors hover:border-brand-navy hover:text-brand-navy";

  return (
    <aside className="min-w-0 max-w-full space-y-8 lg:sticky lg:top-[132px] lg:self-start">
      <div>
        <p className="text-[13px] font-medium text-brand-navy">Share</p>
        <div className="mt-3 flex flex-wrap gap-2">
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
        {copied ? <p className="mt-2 text-xs font-medium text-brand-navy">Link copied</p> : null}
      </div>

      {toc.length > 0 ? (
        <div className="border-t border-[#E8ECF2] pt-6">
          <button
            type="button"
            onClick={() => setTocOpen((o) => !o)}
            className="flex w-full items-center justify-between gap-2 text-left"
            aria-expanded={tocOpen}
          >
            <span className="text-[13px] font-medium text-brand-navy">On this page</span>
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
                      className="leading-snug text-[#6B778C] transition-colors hover:text-brand-navy"
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
        <div className="mx-auto max-w-lg px-6 pt-[120px] pb-24 text-center">
          <h1 className="text-2xl font-semibold">Article not found</h1>
          <p className="mt-3 text-sm leading-snug text-[#6B778C]">
            This URL may be outdated or the post was moved.
          </p>
          <Link
            href="/blog"
            className="mt-8 inline-flex items-center gap-2 font-bold text-brand-navy transition-colors hover:text-brand-orange"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to blog
          </Link>
        </div>
        <FinalCTA />
        <Footer />
      </div>
    );
  }

  const name = authorFirstName(post.author);
  const mins = readingMinutes(post);

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <main id="main">
        <PageHero pill="Blog" PillIcon={BookOpen} title={post.title} subtitle={post.description}>
          <div className="flex items-center gap-3 text-[14px] text-[#6B778C]">
            <img src={avatarUrl(name)} alt="" className="h-9 w-9 rounded-full object-cover" />
            <span>
              <span className="block font-medium text-brand-navy">{post.author}</span>
              <span>{formatBlogDate(post.date)} · {mins} min read</span>
            </span>
          </div>
        </PageHero>

        <Section label="Article">
          <article className="grid min-w-0 gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16 lg:px-14 lg:py-16">
            <div className="min-w-0 max-w-[720px]">
              <nav className="mb-8 flex flex-wrap items-center gap-1 text-[13px] text-[#8C97AB]" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-brand-navy">Home</Link>
                <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <Link href="/blog" className="hover:text-brand-navy">Blog</Link>
              </nav>
              <BlogMarkdown>{post.body}</BlogMarkdown>
              <div className="mt-16 border-t border-[#E8ECF2] pt-8">
                <Link href="/blog" className="inline-flex items-center gap-2 text-[15px] font-medium text-brand-navy hover:text-brand-orange">
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  More articles
                </Link>
              </div>
            </div>
            <ArticleSidebar toc={toc} shareUrl={shareUrl} title={post.title} />
          </article>
        </Section>
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
