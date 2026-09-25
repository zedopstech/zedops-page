import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen, ChevronDown, Sparkles } from "lucide-react";
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

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-brand-navy">
      <Navbar />
      <div>
        <PageHero
          pill="Resources"
          PillIcon={BookOpen}
          title="Blog"
          subtitle="Rollout notes, permissions, field workflows, and how we build AI for construction - updated alongside the product, in plain language."
        >
          <div className="mx-auto mt-2 max-w-xl">
            <div className="rounded-xl border border-brand-navy/12 bg-white/75 px-5 py-4 text-center backdrop-blur-sm">
              <p className="text-sm leading-snug text-[#42526E]">
                Want the product before these articles describe it?{" "}
                <a
                  href="/early-access"
                  className="inline-flex items-center gap-1 font-bold text-brand-navy underline decoration-[#0052CC]/30 underline-offset-4 transition-colors hover:text-brand-orange"
                >
                  Join early access
                  <ArrowRight size={14} className="shrink-0" aria-hidden />
                </a>
              </p>
            </div>
          </div>
        </PageHero>

        <main className="mx-auto max-w-7xl min-w-0 border-t border-gray-200 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          {posts.length === 0 ? (
            <p className="py-24 text-center text-[#6B778C]">No posts yet.</p>
          ) : (
            <>
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-[#97A0AF]">Featured</p>

              {spotlight ? (
                <div className="mb-16 grid gap-8 lg:grid-cols-[1.65fr_1fr] lg:items-start lg:gap-10">
                  <motion.article
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                  >
                    <Link href={`/blog/${spotlight.slug}`} className="group block">
                      <div className="flex flex-col">
                        <div className="relative aspect-[16/9] overflow-hidden rounded-xl lg:aspect-[21/10]">
                          <PostCoverMedia
                            post={spotlight}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          />
                          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1.5 text-xs font-bold text-rose-700">
                            <Sparkles className="h-3.5 w-3.5" aria-hidden />
                            Spotlight
                          </div>
                        </div>
                        <div className="pt-6 sm:pt-8">
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#97A0AF]">
                            {formatReadLabel(spotlight)}
                          </p>
                          <h2 className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-brand-navy transition-colors group-hover:text-brand-navy sm:text-[1.75rem] lg:text-3xl lg:leading-tight">
                            {spotlight.title}
                          </h2>
                          <AuthorDateRow author={spotlight.author} date={spotlight.date} />
                        </div>
                      </div>
                    </Link>
                  </motion.article>

                  {sideFeatured ? (
                    <motion.article
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.08 }}
                      className="lg:pt-1"
                    >
                      <Link href={`/blog/${sideFeatured.slug}`} className="group block h-full">
                        <div className="flex h-full flex-col">
                          <div className="relative aspect-[4/3] shrink-0 overflow-hidden rounded-xl sm:aspect-[16/11] lg:aspect-[4/3]">
                            <PostCoverMedia
                              post={sideFeatured}
                              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            />
                          </div>
                          <div className="flex flex-1 flex-col pt-6 sm:pt-7">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#97A0AF]">
                              {formatReadLabel(sideFeatured)}
                            </p>
                            <h2 className="mt-3 text-lg font-semibold leading-snug text-brand-navy transition-colors group-hover:text-brand-navy lg:text-xl">
                              {sideFeatured.title}
                            </h2>
                            <AuthorDateRow author={sideFeatured.author} date={sideFeatured.date} />
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ) : null}
                </div>
              ) : null}

              {gridPosts.length > 0 ? (
                <section aria-label="More articles">
                  <p className="mb-8 text-xs font-bold uppercase tracking-[0.18em] text-[#97A0AF]">Latest</p>
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleGrid.map((post, i) => (
                      <motion.article
                        key={post.slug}
                        {...scrollMotionProps(isMobile, { y: 14, duration: 0.35, delay: Math.min(i * 0.06, 0.18) })}
                      >
                        <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
                          <div className="flex h-full flex-col">
                            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                              <PostCoverMedia
                                post={post}
                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                              />
                            </div>
                            <div className="flex flex-1 flex-col pt-6">
                              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#97A0AF]">
                                {formatReadLabel(post)}
                              </p>
                              <h2 className="mt-3 text-lg font-semibold leading-snug text-brand-navy transition-colors group-hover:text-brand-navy">
                                {post.title}
                              </h2>
                              <AuthorDateRow author={post.author} date={post.date} />
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </div>

                  {hasMoreGrid ? (
                    <div className="mt-14 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setGridVisible((n) => n + 3)}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-brand-navy transition-colors hover:border-brand-navy/25 hover:bg-gray-50"
                      >
                        View More
                        <ChevronDown className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  ) : null}
                </section>
              ) : null}
            </>
          )}
        </main>

        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
