import { useMemo, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "wouter";
import { extractMarkdownToc } from "@/lib/markdownToc";

const proseArticle = [
  "prose min-w-0 w-full max-w-none break-words text-[17px] leading-[1.75] text-[#34435C]",
  // Lead paragraph
  "[&>p:first-child]:text-[19px] [&>p:first-child]:leading-[1.65] [&>p:first-child]:text-brand-navy",
  "prose-p:my-5",
  "prose-headings:scroll-mt-28 prose-headings:font-medium prose-headings:text-brand-navy prose-headings:[text-wrap:balance]",
  "prose-h2:mt-14 prose-h2:mb-4 prose-h2:text-[26px] prose-h2:leading-[1.2] prose-h2:tracking-[-0.03em]",
  "prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-[20px] prose-h3:tracking-[-0.02em]",
  "prose-a:font-medium prose-a:text-brand-navy prose-a:underline prose-a:decoration-brand-orange/50 prose-a:underline-offset-[3px] hover:prose-a:decoration-brand-orange",
  "prose-strong:font-semibold prose-strong:text-brand-navy",
  "prose-ul:my-5 prose-ol:my-5 prose-li:my-2 prose-li:pl-1 prose-li:marker:text-[#677388] prose-ol:prose-li:marker:font-mono prose-ol:prose-li:marker:text-[15px]",
  "prose-blockquote:my-8 prose-blockquote:border-l-2 prose-blockquote:border-brand-orange prose-blockquote:pl-6 prose-blockquote:text-[20px] prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:leading-[1.5] prose-blockquote:tracking-[-0.01em] prose-blockquote:text-brand-navy [&_blockquote_p]:before:content-none [&_blockquote_p]:after:content-none",
  "prose-hr:my-12 prose-hr:border-[#E8ECF2]",
  "prose-code:rounded prose-code:bg-[#F1F4F8] prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.85em] prose-code:font-normal prose-code:text-brand-navy before:prose-code:content-none after:prose-code:content-none",
  "prose-pre:my-8 prose-pre:rounded-xl prose-pre:bg-[#0E1B33] prose-pre:text-[14px]",
  "prose-th:bg-[#F6F8FB] prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:text-[13px] prose-th:font-medium prose-th:text-brand-navy",
  "prose-td:border-t prose-td:border-[#E8ECF2] prose-td:px-4 prose-td:py-3 prose-td:align-top prose-td:text-[14.5px] prose-td:leading-[1.5]",
  "prose-img:my-8 prose-img:rounded-xl prose-img:border prose-img:border-[#E8ECF2]",
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
          return <Link href={href}>{c}</Link>;
        }
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {c}
          </a>
        );
      },
      table: ({ children, ...props }: React.ComponentPropsWithoutRef<"table">) => (
        <div className="my-8 w-full max-w-full overflow-x-auto rounded-xl border border-[#E8ECF2] [-webkit-overflow-scrolling:touch]">
          <table className="!my-0 w-full min-w-[560px] border-collapse" {...props}>
            {children}
          </table>
        </div>
      ),
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
