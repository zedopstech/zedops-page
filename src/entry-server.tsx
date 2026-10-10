import { prerenderToNodeStream } from "react-dom/static";
import App from "./App";

// Head-tag copy is translated with the same function the runtime useSEO hook uses.
export { seoText } from "./i18n";

/**
 * Render the full page for `url` to an HTML string at build time. `prerender` waits for
 * every lazy route and Suspense boundary, so the route fallback is never the output.
 */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(<App ssrPath={url} />);
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf8");
}
