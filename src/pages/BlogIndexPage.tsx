import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { framePad, Muted, Section } from "@/components/design-system/primitives";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import { AuthorBadge, PostCard, PostCover, PostMeta } from "@/components/blog/BlogBits";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { BLOG_CATEGORIES, getAllPosts, getFeaturedPost, type BlogCategory } from "@/lib/blog";

type Filter = "All" | BlogCategory;

function initialFilter(): Filter {
  if (typeof window === "undefined") return "All";
  const q = new URLSearchParams(window.location.search).get("category");
  return BLOG_CATEGORIES.find((c) => c.toLowerCase() === q?.toLowerCase()) ?? "All";
}

export default function BlogIndexPage() {
  const isMobile = useIsMobile();
  const posts = useMemo(() => getAllPosts(), []);
  const featured = useMemo(() => getFeaturedPost(), []);
  const [filter, setFilter] = useState<Filter>(initialFilter);

  useSEO({
    title: "Blog  -  ZedOps",
    description:
      "Practical writing on running MEP and construction projects: estimating, procurement, site reporting, quality, handover and AI on live jobs.",
  });

  const categories = BLOG_CATEGORIES.filter((c) => posts.some((p) => p.category === c));
  const listed = posts.filter((p) => (filter === "All" ? p.slug !== featured?.slug : p.category === filter));

  const choose = (next: Filter) => {
    setFilter(next);
    const url = next === "All" ? "/blog" : `/blog?category=${encodeURIComponent(next.toLowerCase())}`;
    window.history.replaceState(null, "", url);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <main id="main">
        <section className="bg-white">
          <div className={`mx-auto max-w-[1200px] pt-[132px] pb-12 sm:pt-[144px] lg:border-x lg:border-[#E8ECF2] lg:pb-14 ${framePad}`}>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-[760px] text-[40px] font-medium leading-[1.04] tracking-[-0.045em] [text-wrap:balance] sm:text-[52px] lg:text-[60px]"
            >
              The ZedOps blog. <Muted>How good projects actually get run.</Muted>
            </motion.h1>
          </div>
        </section>

        {featured ? (
          <Section label="Featured article">
            <Link href={`/blog/${featured.slug}`} className="group grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div className="aspect-[16/10] overflow-hidden border-b border-[#E8ECF2] lg:aspect-auto lg:min-h-[420px] lg:border-e lg:border-b-0">
                <PostCover post={featured} tone="dark" fit="contain" className="transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
              </div>
              <div className={`flex flex-col justify-between gap-10 py-10 lg:py-12 ${framePad} lg:!px-12`}>
                <div>
                  <PostMeta post={featured} />
                  <h2 className="mt-4 text-[28px] font-medium leading-[1.12] tracking-[-0.035em] text-brand-navy [text-wrap:balance] sm:text-[34px]">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-[16px] leading-[1.6] text-[#5E6C84]">{featured.description}</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2.5 text-[14px] text-[#5E6C84]">
                    <AuthorBadge />
                    {featured.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[14.5px] font-medium text-brand-navy">
                    Read <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          </Section>
        ) : null}

        <Section labelledBy="blog-all">
          <div className={`flex flex-col gap-5 pt-14 pb-8 sm:flex-row sm:items-end sm:justify-between lg:pt-16 ${framePad}`}>
            <h2 id="blog-all" className="text-[26px] font-medium tracking-[-0.03em] text-brand-navy sm:text-[30px]">
              {filter === "All" ? "All articles" : filter}
            </h2>
            <div role="tablist" aria-label="Filter by topic" className="-mx-1 flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none]">
              {(["All", ...categories] as Filter[]).map((c) => {
                const active = c === filter;
                return (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => choose(c)}
                    className={`h-8 shrink-0 rounded-full px-3.5 text-[13.5px] transition-colors ${
                      active ? "bg-brand-navy text-white" : "text-[#5E6C84] hover:bg-[#F1F4F8] hover:text-brand-navy"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {listed.length === 0 ? (
            <p className="border-t border-[#E8ECF2] py-20 text-center text-[15px] text-[#616D82]">No articles in this topic yet.</p>
          ) : (
            <div className="grid gap-px border-t border-[#E8ECF2] bg-[#E8ECF2] sm:grid-cols-2 lg:grid-cols-3">
              {listed.map((post, i) => (
                <motion.div key={`${filter}-${post.slug}`} {...scrollMotionProps(isMobile, { y: 14, duration: 0.35, delay: Math.min(i * 0.05, 0.15) })} className="bg-white">
                  <PostCard post={post} />
                </motion.div>
              ))}
              {/* Fill the last row so the hairline grid never shows a grey hole. */}
              {Array.from({ length: (3 - (listed.length % 3)) % 3 }).map((_, i) => (
                <div key={`pad-${i}`} className="hidden bg-white lg:block" aria-hidden />
              ))}
              {listed.length % 2 === 1 ? <div className="hidden bg-white sm:block lg:hidden" aria-hidden /> : null}
            </div>
          )}
        </Section>

        <FinalCTA
          title="Want to try this on a live project?"
          body="Bring one job and we will set it up with you, from BOQ to handover."
        />
      </main>
      <Footer />
    </div>
  );
}
