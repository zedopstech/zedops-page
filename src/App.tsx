import { Suspense, lazy, useEffect, type ReactNode } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig, useReducedMotion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
// import PricingPage from "@/pages/PricingPage";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { HIDE_PRICING } from "@/config/siteFocus";

/**
 * Route-level code splitting. Only the landing page and the 404 stay in the entry chunk;
 * every other route is fetched on first navigation, so a first-time visitor no longer
 * downloads all 25 pages just to render the homepage.
 *
 * Side effect worth knowing: `react-markdown` (~230 kB) and `date-fns` have no consumer
 * outside the blog pages, so they now ride along with the blog chunks instead of the
 * entry bundle.
 */
const SolutionsPage = lazy(() => import("@/pages/SolutionsPage"));
const PlatformModulePage = lazy(() => import("@/pages/PlatformModulePage"));
const ZedAIPage = lazy(() => import("@/pages/ZedAIPage"));
const SecurityPage = lazy(() => import("@/pages/SecurityPage"));
const EarlyAccessPage = lazy(() => import("@/pages/EarlyAccessPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const RoadmapPage = lazy(() => import("@/pages/RoadmapPage"));
const BlogIndexPage = lazy(() => import("@/pages/BlogIndexPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const WhoWeServePage = lazy(() => import("@/pages/WhoWeServePage"));
const HowWeHelpHubPage = lazy(() => import("@/pages/HowWeHelpHubPage"));
const ProjectLifecyclePage = lazy(() => import("@/pages/ProjectLifecyclePage"));
const HowWeHelpCompanyPage = lazy(() => import("@/pages/HowWeHelpCompanyPage"));
const HowWeHelpTeamPage = lazy(() => import("@/pages/HowWeHelpTeamPage"));
const HowWeHelpRolePage = lazy(() => import("@/pages/HowWeHelpRolePage"));
const GCPage = lazy(() => import("@/pages/personas/GCPage"));
const OwnersPage = lazy(() => import("@/pages/personas/OwnersPage"));
const PMPage = lazy(() => import("@/pages/personas/PMPage"));
const ConsultantsPage = lazy(() => import("@/pages/personas/ConsultantsPage"));
const ModuleSandbox = lazy(() => import("@/pages/sandbox/ModuleSandbox"));

const queryClient = new QueryClient();

/** Wouter treats non-empty bases literally; `./` makes paths `~/...` and breaks pattern matching. */
function routerBaseFromVite(): string {
  const raw = import.meta.env.BASE_URL ?? "/";
  const trimmed = raw.replace(/\/$/, "");
  if (trimmed === "" || trimmed === "/" || trimmed === "." || trimmed === "./") return "";
  return trimmed;
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }, [location]);

  return null;
}

/**
 * Placeholder while a route chunk downloads. Deliberately neutral (no spinner) so the
 * swap to the real page does not read as a design change. `aria-busy` announces the
 * pending state to assistive tech.
 */
function RouteFallback() {
  return <div className="min-h-screen bg-white" aria-busy="true" aria-label="Loading page" />;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Switch>
          <Route path="/" component={Home} />
          {/* {!HIDE_PRICING ? <Route path="/pricing" component={PricingPage} /> : null} */}
          <Route path="/solutions" component={SolutionsPage} />
          <Route path="/platform/module/:moduleId">
            {(params) => <PlatformModulePage key={params.moduleId} params={params} />}
          </Route>
          <Route path="/zed-ai" component={ZedAIPage} />
          <Route path="/security" component={SecurityPage} />
          <Route path="/early-access" component={EarlyAccessPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/privacy" component={PrivacyPage} />
          <Route path="/terms" component={TermsPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/roadmap" component={RoadmapPage} />
          <Route path="/blog/:slug" component={BlogPostPage} />
          <Route path="/blog" component={BlogIndexPage} />
          <Route path="/how-we-help/project-stage" component={ProjectLifecyclePage} />
          <Route path="/how-we-help/company" component={HowWeHelpCompanyPage} />
          <Route path="/how-we-help/team" component={HowWeHelpTeamPage} />
          <Route path="/how-we-help/role" component={HowWeHelpRolePage} />
          <Route path="/how-we-help" component={HowWeHelpHubPage} />
          <Route path="/who-we-serve" component={WhoWeServePage} />
          <Route path="/who-we-serve/general-contractors" component={GCPage} />
          <Route path="/who-we-serve/owners" component={OwnersPage} />
          <Route path="/who-we-serve/project-managers" component={PMPage} />
          <Route path="/who-we-serve/consultants" component={ConsultantsPage} />
          {/* Sandbox: not linked from the site and marked noindex. */}
          <Route path="/sandbox/module" component={ModuleSandbox} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function AppMotion({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  return (
    <MotionConfig
      reducedMotion={prefersReducedMotion ? "always" : "user"}
      transition={
        isMobile
          ? { type: "tween", duration: 0.18, ease: "easeOut" }
          : { type: "tween", duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }
      }
    >
      {children}
    </MotionConfig>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppMotion>
          <div className="min-h-screen overflow-x-clip">
            <WouterRouter base={routerBaseFromVite()}>
              <Router />
            </WouterRouter>
          </div>
        </AppMotion>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
