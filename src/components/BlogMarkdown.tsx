import { useMemo, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "wouter";
import { extractMarkdownToc } from "@/lib/markdownToc";

const proseArticle =
  [
    "prose prose-neutral prose-sm min-w-0 w-full max-w-3xl break-words text-[#253858]",
    "prose-p:my-4 prose-p:leading-[1.65] prose-p:text-sm",
    "prose-p:first-of-type:mt-0 prose-p:first-of-type:text-sm prose-p:first-of-type:font-medium prose-p:first-of-type:leading-[1.65] prose-p:first-of-type:text-[#172B4D]",
    "prose-headings:scroll-mt-28 prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-[#172B4D] sm:prose-headings:scroll-mt-32",
    "prose-h1:mb-6 prose-h1:mt-10 prose-h1:text-2xl prose-h1:sm:text-3xl",
    "prose-h2:mt-10 prose-h2:mb-3 prose-h2:border-b prose-h2:border-gray-200/90 prose-h2:pb-2 prose-h2:text-lg sm:prose-h2:text-xl",
    "prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-base sm:prose-h3:text-lg",
    "prose-a:font-semibold prose-a:text-[#0052CC] prose-a:text-sm prose-a:break-words prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-2",
    "prose-strong:font-bold prose-strong:text-[#172B4D]",
    "prose-ul:my-5 prose-ol:my-5 prose-ul:pl-1 prose-ol:pl-1",
    "prose-li:my-2 prose-li:leading-[1.65] prose-li:pl-1 prose-li:text-sm",
    "prose-blockquote:my-6 prose-blockquote:border-l-4 prose-blockquote:border-[#F79625] prose-blockquote:bg-[#FFF9F3]/80 prose-blockquote:py-3 prose-blockquote:pl-4 prose-blockquote:pr-3 prose-blockquote:not-italic prose-blockquote:text-sm prose-blockquote:text-[#42526E] sm:prose-blockquote:pl-5",
    "prose-hr:my-10 prose-hr:border-gray-200",
    "prose-code:rounded-md prose-code:bg-[#F4F5F7] prose-code:px-1.5 prose-code:py-0.5 prose-code:font-medium prose-code:text-[0.8125rem] prose-code:text-[#172B4D] prose-code:break-words before:prose-code:content-none after:prose-code:content-none",
    "prose-pre:my-6 prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:bg-[#172B4D] prose-pre:px-3 prose-pre:py-3 prose-pre:text-[0.75rem] prose-pre:leading-relaxed prose-pre:text-[#F4F5F7] sm:prose-pre:px-4 sm:prose-pre:text-[0.8125rem]",
    "prose-table:my-0 prose-table:w-full prose-table:border-collapse prose-table:text-sm",
    "prose-th:bg-[#F4F5F7] prose-th:px-2 prose-th:py-2 prose-th:text-left prose-th:text-xs prose-th:font-bold prose-th:text-[#172B4D] sm:prose-th:px-3 sm:prose-th:text-sm",
    "prose-td:border prose-td:border-gray-200 prose-td:px-2 prose-td:py-2 prose-td:text-xs sm:prose-td:px-3 sm:prose-td:text-sm",
    "prose-img:my-6 prose-img:max-h-[min(70vh,520px)] prose-img:w-full prose-img:max-w-full prose-img:rounded-lg prose-img:object-contain",
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
            <Link href={href} className="break-words font-semibold text-[#0052CC] hover:underline">
              {c}
            </Link>
          );
        }
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="break-words font-semibold text-[#0052CC] hover:underline"
          >
            {c}
          </a>
        );
      },
      table: ({ children, ...props }: React.ComponentPropsWithoutRef<"table">) => (
        <div className="my-6 w-full max-w-full overflow-x-auto rounded-lg border border-gray-200 bg-white [-webkit-overflow-scrolling:touch]">
          <table className="w-full max-w-none table-auto border-collapse text-sm" {...props}>
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
