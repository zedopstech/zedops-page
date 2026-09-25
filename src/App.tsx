import { useEffect, type ReactNode } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig, useReducedMotion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import Home from "@/pages/Home";
// import PricingPage from "@/pages/PricingPage";
import SolutionsPage from "@/pages/SolutionsPage";
import PlatformModulePage from "@/pages/PlatformModulePage";
import ZedAIPage from "@/pages/ZedAIPage";
import SecurityPage from "@/pages/SecurityPage";
import EarlyAccessPage from "@/pages/EarlyAccessPage";
import ContactPage from "@/pages/ContactPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import AboutPage from "@/pages/AboutPage";
import RoadmapPage from "@/pages/RoadmapPage";
import BlogIndexPage from "@/pages/BlogIndexPage";
import BlogPostPage from "@/pages/BlogPostPage";
import WhoWeServePage from "@/pages/WhoWeServePage";
import HowWeHelpHubPage from "@/pages/HowWeHelpHubPage";
import ProjectLifecyclePage from "@/pages/ProjectLifecyclePage";
import HowWeHelpCompanyPage from "@/pages/HowWeHelpCompanyPage";
import HowWeHelpTeamPage from "@/pages/HowWeHelpTeamPage";
import HowWeHelpRolePage from "@/pages/HowWeHelpRolePage";
import GCPage from "@/pages/personas/GCPage";
import OwnersPage from "@/pages/personas/OwnersPage";
import PMPage from "@/pages/personas/PMPage";
import ConsultantsPage from "@/pages/personas/ConsultantsPage";
import NotFound from "@/pages/not-found";
import { HIDE_PRICING } from "@/config/siteFocus";

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

function Router() {
  return (
    <>
      <ScrollToTop />
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
      <Route component={NotFound} />
    </Switch>
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
