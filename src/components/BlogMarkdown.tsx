import { useMemo, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "wouter";
import { extractMarkdownToc } from "@/lib/markdownToc";

const proseArticle =
  [
    "prose prose-neutral prose-sm max-w-3xl text-[#253858]",
    "prose-p:my-4 prose-p:leading-[1.65] prose-p:text-sm",
    "prose-p:first-of-type:mt-0 prose-p:first-of-type:text-sm prose-p:first-of-type:font-medium prose-p:first-of-type:leading-[1.65] prose-p:first-of-type:text-[#172B4D]",
    "prose-headings:scroll-mt-32 prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-[#172B4D]",
    "prose-h1:mb-6 prose-h1:mt-10 prose-h1:text-2xl prose-h1:sm:text-3xl",
    "prose-h2:mt-10 prose-h2:mb-3 prose-h2:border-b prose-h2:border-gray-200/90 prose-h2:pb-2 prose-h2:text-lg sm:prose-h2:text-xl",
    "prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-base sm:prose-h3:text-lg",
    "prose-a:font-semibold prose-a:text-[#0052CC] prose-a:text-sm prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-2",
    "prose-strong:font-bold prose-strong:text-[#172B4D]",
    "prose-ul:my-5 prose-ol:my-5 prose-ul:pl-1 prose-ol:pl-1",
    "prose-li:my-2 prose-li:leading-[1.65] prose-li:pl-1 prose-li:text-sm",
    "prose-blockquote:my-6 prose-blockquote:border-l-4 prose-blockquote:border-[#F79625] prose-blockquote:bg-[#FFF9F3]/80 prose-blockquote:py-3 prose-blockquote:pl-5 prose-blockquote:pr-3 prose-blockquote:not-italic prose-blockquote:text-sm prose-blockquote:text-[#42526E]",
    "prose-hr:my-10 prose-hr:border-gray-200",
    "prose-code:rounded-md prose-code:bg-[#F4F5F7] prose-code:px-1.5 prose-code:py-0.5 prose-code:font-medium prose-code:text-[0.8125rem] prose-code:text-[#172B4D] before:prose-code:content-none after:prose-code:content-none",
    "prose-pre:my-6 prose-pre:rounded-lg prose-pre:bg-[#172B4D] prose-pre:px-4 prose-pre:py-3 prose-pre:text-[0.8125rem] prose-pre:text-[#F4F5F7] prose-pre:leading-relaxed",
    "prose-table:my-6 prose-th:bg-[#F4F5F7] prose-th:px-3 prose-th:py-2 prose-th:text-sm prose-th:text-[#172B4D]",
    "prose-td:border-gray-200 prose-td:px-3 prose-td:py-2 prose-td:text-sm",
    "prose-img:my-6 prose-img:rounded-lg",
  ].join(" ");

export function BlogMarkdown({ children }: { children: string }) {
  const toc = useMemo(() => extractMarkdownToc(children), [children]);
  const cursor = useRef(0);
  cursor.current = 0;

  const components = useMemo(
    () => ({
      h2: ({ children: c, ...rest }: React.ComponentPropsWithoutRef<"h2">) => {
        const id = toc[cursor.current++]?.id;
        return (
          <h2 id={id} {...rest}>
            {c}
          </h2>
        );
      },
      h3: ({ children: c, ...rest }: React.ComponentPropsWithoutRef<"h3">) => {
        const id = toc[cursor.current++]?.id;
        return (
          <h3 id={id} {...rest}>
            {c}
          </h3>
        );
      },
      a: ({ href, children: c }: { href?: string; children?: React.ReactNode }) => {
        if (href?.startsWith("/") && !href.startsWith("//")) {
          return (
            <Link href={href} className="font-semibold text-[#0052CC] hover:underline">
              {c}
            </Link>
          );
        }
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0052CC] hover:underline">
            {c}
          </a>
        );
      },
    }),
    [toc],
  );

  return (
    <div className={proseArticle}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
