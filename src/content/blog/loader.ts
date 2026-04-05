/**
 * Explicit `?raw` imports so posts always bundle (Vite `import.meta.glob` is flaky in some dev setups).
 * When you add a post: copy an import line, point it at `./your-slug.md`, and add it to `blogMarkdownEntries`.
 */
import rawDailyLogs from "./daily-logs-that-people-actually-use.md?raw";
import rawGettingStarted from "./getting-started-with-zedops.md?raw";
import rawRoles from "./roles-and-permissions-guide.md?raw";
import rawAi from "./why-construction-ai-needs-permissions.md?raw";

export const blogMarkdownEntries: { path: string; raw: string }[] = [
  { path: "./daily-logs-that-people-actually-use.md", raw: rawDailyLogs },
  { path: "./getting-started-with-zedops.md", raw: rawGettingStarted },
  { path: "./roles-and-permissions-guide.md", raw: rawRoles },
  { path: "./why-construction-ai-needs-permissions.md", raw: rawAi },
];
