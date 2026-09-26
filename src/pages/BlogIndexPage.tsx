import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { BookOpen, ChevronDown } from "lucide-react";
import { framePad, Muted, Section } from "@/components/design-system/primitives";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { useSEO } from "@/hooks/useSEO";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { getAllPosts, type BlogPost } from "@/lib/blog";
import {
  authorFirstName,
  avatarUrl,
  formatBlogDate,
  formatReadLabel,
  postCoverImage,
} from "@/lib/blogDisplay";

function PostCoverMedia({ post, className }: { post: BlogPost; className: string }) {
  const url = postCoverImage(post);
  if (url) {
    return <img src={url} alt="" className={className} />;
  }
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-navy via-[#243d64] to-brand-navy px-4 text-center ${className}`}
      aria-hidden
    >
      <span className="line-clamp-4 text-sm font-semibold leading-snug text-white sm:text-base">{post.title}</span>
    </div>
  );
}

function AuthorDateRow({ author, date }: { author: string; date: string }) {
  const name = authorFirstName(author);
  return (
    <div className="mt-auto flex min-w-0 flex-wrap items-center gap-2.5 pt-4">
      <img src={avatarUrl(name)} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
      <p className="min-w-0 text-sm text-[#6B778C]">
        <span className="font-medium text-[#42526E]">{name}</span>
        <span className="mx-2 inline-block h-3 w-px shrink-0 bg-[#DFE1E6]" aria-hidden />
        <time dateTime={date} className="inline-block">
          {formatBlogDate(date)}
        </time>
      </p>
    </div>
  );
}

export default function BlogIndexPage() {
  const isMobile = useIsMobile();
  const posts = useMemo(() => getAllPosts(), []);
  const [gridVisible, setGridVisible] = useState(3);

  const spotlight = posts[0];
  const sideFeatured = posts[1];
  const gridPosts = posts.slice(2);
  const visibleGrid = gridPosts.slice(0, gridVisible);
  const hasMoreGrid = gridPosts.length > gridVisible;

  useSEO({
    title: "Blog  -  ZedOps",
    description:
      "Product updates and construction ops writing from ZedOps - permissions, field workflows, AI guardrails, and rollout tips.",
  });

  const Card = ({ post, big = false }: { post: BlogPost; big?: boolean }) => (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col bg-white p-5 transition-colors hover:bg-[#FAFBFC] sm:p-7">
      <div className={`relative overflow-hidden rounded-lg bg-[#EEF1F5] ${big ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
        <PostCoverMedia post={post} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
      </div>
      <p className="mt-5 text-[13px] text-[#8C97AB]">{formatReadLabel(post)}</p>
      <h2 className={`mt-2 font-medium tracking-[-0.025em] text-brand-navy [text-wrap:balance] ${big ? "text-[26px] leading-[1.2] sm:text-[30px]" : "text-[18px] leading-snug"}`}>
        {post.title}
      </h2>
      <div className="mt-auto pt-5">
        <AuthorDateRow author={post.author} date={post.date} />
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <main id="main">
        <PageHero
          pill="Blog"
          PillIcon={BookOpen}
          title={<>Notes from the field. <Muted>And from the product.</Muted></>}
          subtitle="Rollout guides, field workflows and how we build Zed AI, in plain language."
        />

        {posts.length === 0 ? (
          <Section label="Posts">
            <p className="py-24 text-center text-[#6B778C]">No posts yet.</p>
          </Section>
        ) : (
          <>
            <Section tone="mist" label="Featured posts">
              <div className="grid gap-px bg-[#E3E8F0] lg:grid-cols-[1.6fr_1fr]">
                {spotlight ? <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}><Card post={spotlight} big /></motion.div> : null}
                {sideFeatured ? <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.06 }}><Card post={sideFeatured} /></motion.div> : null}
              </div>
            </Section>

            {gridPosts.length > 0 ? (
              <Section labelledBy="blog-latest">
                <div className={`pt-16 pb-10 lg:pt-20 ${framePad}`}>
                  <h2 id="blog-latest" className="text-[26px] font-medium tracking-[-0.03em] text-brand-navy sm:text-[32px]">Latest</h2>
                </div>
                <div className="grid gap-px border-t border-[#E8ECF2] bg-[#E8ECF2] sm:grid-cols-2 lg:grid-cols-3">
                  {visibleGrid.map((post, i) => (
                    <motion.div key={post.slug} {...scrollMotionProps(isMobile, { y: 14, duration: 0.35, delay: Math.min(i * 0.05, 0.15) })}>
                      <Card post={post} />
                    </motion.div>
                  ))}
                </div>
                {hasMoreGrid ? (
                  <div className="flex justify-center border-t border-[#E8ECF2] py-8">
                    <button
                      type="button"
                      onClick={() => setGridVisible((n) => n + 3)}
                      className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#C9D2DF] bg-white px-4 text-[15px] font-medium text-brand-navy transition-colors hover:border-brand-navy"
                    >
                      Show more <ChevronDown size={16} aria-hidden />
                    </button>
                  </div>
                ) : null}
              </Section>
            ) : null}
          </>
        )}

        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
