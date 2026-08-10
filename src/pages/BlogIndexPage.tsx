import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen, ChevronDown, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

const blueprintBg = {
  backgroundImage: [
    "linear-gradient(rgba(1,47,176,0.045) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(1,47,176,0.045) 1px, transparent 1px)",
    "linear-gradient(rgba(1,47,176,0.02) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(1,47,176,0.02) 1px, transparent 1px)",
  ].join(", "),
  backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
} as const;

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
      <span className="line-clamp-4 text-sm font-extrabold leading-snug text-white sm:text-base">{post.title}</span>
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
    <div className="min-h-screen overflow-x-clip bg-white text-brand-navy">
      <Navbar />
      <div className="pt-[100px]">
        {/* Hero  -  gradient + blueprint (centered; no side panel) */}
        <section className="relative overflow-hidden pb-16 pt-20 lg:pb-20" aria-labelledby="blog-page-title">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(155deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.82) 32%, rgba(255,255,255,0.76) 60%, rgba(255,255,255,0.84) 100%), url('/hero-banner.png')",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0" style={blueprintBg} aria-hidden />
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 h-[280px] w-[min(100vw,900px)] max-w-full -translate-x-1/2"
            style={{
              background: "radial-gradient(ellipse at center bottom, rgba(254,93,2,0.11) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
            aria-hidden
          />

          <div className="relative z-10 mx-auto min-w-0 max-w-3xl px-4 text-center sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 inline-flex items-center gap-2 border border-brand-navy/20 bg-white/80 px-4 py-1.5"
              style={{ borderRadius: 99 }}
            >
              <BookOpen size={12} className="text-brand-orange" aria-hidden />
              <span className="text-xs font-bold tracking-[0.12em] text-brand-navy uppercase">Resources</span>
            </motion.div>
            <motion.h1
              id="blog-page-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-navy sm:text-5xl lg:text-[52px]"
            >
              Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#42526E]"
            >
              Rollout notes, permissions, field workflows, and how we build AI for construction - updated alongside the
              product, in plain language.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="mx-auto mt-8 max-w-xl"
            >
              <div className="rounded-2xl border border-brand-navy/12 bg-white/75 px-5 py-4 text-center backdrop-blur-sm">
                <p className="text-sm leading-relaxed text-[#42526E]">
                  Want the product before these articles describe it?{" "}
                  <a
                    href="/early-access"
                    className="inline-flex items-center gap-1 font-bold text-[#0052CC] underline decoration-[#0052CC]/30 underline-offset-4 transition-colors hover:text-[#0747A6]"
                  >
                    Join early access
                    <ArrowRight size={14} className="shrink-0" aria-hidden />
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <main className="mx-auto max-w-7xl min-w-0 bg-[#FAFBFC] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
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
                          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#97A0AF]">
                            {formatReadLabel(spotlight)}
                          </p>
                          <h2 className="mt-3 text-2xl font-extrabold leading-snug tracking-tight text-brand-navy transition-colors group-hover:text-[#0052CC] sm:text-[1.75rem] lg:text-3xl lg:leading-tight">
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
                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#97A0AF]">
                              {formatReadLabel(sideFeatured)}
                            </p>
                            <h2 className="mt-3 text-lg font-extrabold leading-snug text-brand-navy transition-colors group-hover:text-[#0052CC] lg:text-xl">
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
                              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#97A0AF]">
                                {formatReadLabel(post)}
                              </p>
                              <h2 className="mt-3 text-lg font-extrabold leading-snug text-brand-navy transition-colors group-hover:text-[#0052CC]">
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
                        className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-6 py-3 text-sm font-bold text-[#0747A6] transition-colors hover:border-sky-300 hover:bg-sky-100"
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

        <Footer />
      </div>
    </div>
  );
}
