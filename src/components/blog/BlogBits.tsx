import { Link } from "wouter";
import ZedOpsMark from "@/components/ZedOpsMark";
import BlogCover from "@/components/blog/BlogCover";
import type { BlogPost } from "@/lib/blog";
import { formatBlogDate, formatReadLabel, postCoverImage } from "@/lib/blogDisplay";

/** Post cover: the frontmatter image when set, otherwise the generated category cover. */
export function PostCover({
  post,
  tone = "light",
  fit,
  className = "",
}: {
  post: BlogPost;
  tone?: "light" | "dark";
  fit?: "cover" | "contain";
  className?: string;
}) {
  const url = postCoverImage(post);
  if (url) return <img src={url} alt="" loading="lazy" className={`h-full w-full object-cover ${className}`} />;
  return <BlogCover category={post.category} scene={post.cover} tone={tone} fit={fit} className={`h-full w-full ${className}`} />;
}

/** Bylines are team names, so the avatar is the ZedOps mark rather than a face. */
export function AuthorBadge({ size = 32, tone = "light" }: { size?: number; tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full ${tone === "dark" ? "bg-white/10" : "border border-[#E3E8F0] bg-white"}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <ZedOpsMark tone={tone} className="h-[52%] w-[52%]" />
    </span>
  );
}

export function PostMeta({ post, className = "" }: { post: BlogPost; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 text-[13px] text-[#5F6B80] ${className}`}>
      <span className="font-medium text-brand-orange">{post.category}</span>
      <span aria-hidden>·</span>
      <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
      <span aria-hidden>·</span>
      <span>{formatReadLabel(post)}</span>
    </p>
  );
}

/** Grid card used on the index and in "Keep reading". */
export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col bg-white p-5 transition-colors hover:bg-[#FAFBFC] sm:p-6">
      <div className="aspect-[16/10] overflow-hidden rounded-lg border border-[#E8ECF2]">
        <PostCover post={post} className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
      </div>
      <PostMeta post={post} className="mt-5" />
      <h3 className="mt-2 text-[19px] font-medium leading-[1.3] tracking-[-0.02em] text-brand-navy [text-wrap:balance] group-hover:underline group-hover:decoration-[#C9D2DF] group-hover:underline-offset-4">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-[14.5px] leading-[1.55] text-[#5E6C84]">{post.description}</p>
    </Link>
  );
}
