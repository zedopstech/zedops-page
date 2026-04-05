import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollMotionProps } from "@/hooks/useScrollSectionMotion";
import { format, parseISO } from "date-fns";
import { getAllPosts } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";
import { avatarUrl, coverThumbUrl, postCoverImage } from "@/lib/blogDisplay";

function authorMeta(author: string): { name: string; role: string } {
  const parts = author.split(",").map((s) => s.trim());
  if (parts.length >= 2) return { name: parts[0], role: parts.slice(1).join(", ") };
  return { name: author || "ZedOps", role: "ZedOps" };
}

function coverThumbFromPost(post: BlogPost): string | undefined {
  return coverThumbUrl(post.image, 200);
}

export default function Resources() {
  const isMobile = useIsMobile();
  const posts = useMemo(() => getAllPosts(), []);

  const featured = posts.slice(0, 2);
  const extraPosts = posts.slice(2, 5);

  const sidebarItems = useMemo(() => {
    const fromBlog = extraPosts.map((p) => ({
      href: `/blog/${p.slug}`,
      img: coverThumbFromPost(p),
      title: p.description,
    }));
    const staticExtras = [
      {
        href: "/early-access",
        img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&q=80&auto=format&fit=crop",
        title: "ZedOps enters early access  -  limited spots available for construction teams.",
      },
      {
        href: "/roadmap",
        img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&q=80&auto=format&fit=crop",
        title: "From bid to closeout: the ZedOps product roadmap for 2026.",
      },
    ];
    return [...fromBlog, ...staticExtras].slice(0, 3);
  }, [extraPosts]);

  return (
    <section className="border-t border-gray-200 bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#97A0AF]">Resources</p>
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-[#172B4D] sm:text-5xl">
              Insights to help you
              <br />
              build smarter.
            </h2>
          </div>
          <a
            href="/blog"
            className="hidden items-center gap-2 border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#42526E] transition-colors duration-150 hover:border-[#172B4D] hover:text-[#172B4D] sm:inline-flex"
            style={{ borderRadius: 6 }}
          >
            See all articles <ArrowRight size={14} />
          </a>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-[#6B778C]">Articles coming soon.</p>
        ) : (
          <motion.div {...scrollMotionProps(isMobile, { y: 24, duration: 0.5 })} className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr_340px]">
            {featured.map((article) => {
              const { name, role } = authorMeta(article.author);
              const cover = postCoverImage(article);
              return (
                <a key={article.slug} href={`/blog/${article.slug}`} className="group flex cursor-pointer flex-col">
                  <div className="relative mb-4 h-52 w-full overflow-hidden" style={{ borderRadius: 6 }}>
                    {cover ? (
                      <img
                        src={cover}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#172B4D] to-[#2d4a7c] px-4 text-center">
                        <span className="line-clamp-3 text-sm font-extrabold text-white">{article.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span
                        className="bg-[#F79625] px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                        style={{ borderRadius: 6 }}
                      >
                        Blog
                      </span>
                    </div>
                  </div>
                  <p className="mb-2 text-xs text-[#97A0AF]">{format(parseISO(article.date), "MMMM d, yyyy")}</p>
                  <h3 className="mb-3 text-lg font-extrabold leading-snug text-[#172B4D] transition-colors duration-150 group-hover:text-[#172B4D]">
                    {article.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-[#6B778C]">{article.description}</p>
                  <div className="mt-auto flex items-center gap-2.5">
                    <img src={avatarUrl(name)} alt="" className="h-8 w-8 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-semibold text-[#172B4D]">{name}</p>
                      <p className="text-xs text-[#97A0AF]">{role}</p>
                    </div>
                  </div>
                </a>
              );
            })}

            <div className="flex flex-col gap-0 border-gray-100 lg:border-l lg:pl-6">
              {sidebarItems.map((item, i) => (
                <a
                  key={`${item.href}-${i}`}
                  href={item.href}
                  className={`group flex gap-4 px-2 py-5 transition-colors duration-150 hover:bg-gray-50 ${
                    i < sidebarItems.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden bg-[#F4F5F7]" style={{ borderRadius: 6 }}>
                    {item.img ? (
                      <img
                        src={item.img}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#172B4D] text-[10px] font-bold text-white">
                        ···
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-medium leading-snug text-[#42526E] transition-colors duration-150 group-hover:text-[#172B4D]">
                    {item.title}
                  </p>
                </a>
              ))}
              <a
                href="/blog"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#172B4D] transition-colors duration-150 hover:text-[#F79625]"
              >
                See all articles <ArrowRight size={13} />
              </a>
            </div>
          </motion.div>
        )}

        <a
          href="/blog"
          className="mt-10 inline-flex items-center gap-2 border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#42526E] transition-colors hover:border-[#172B4D] hover:text-[#172B4D] sm:hidden"
          style={{ borderRadius: 6 }}
        >
          See all articles <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}
