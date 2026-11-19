import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import { CartUIProvider } from "./contexts/CartUIContext";
import Cart from "./components/Cart";
import FloatingButtons from "./components/FloatingButtons";
import Home from "./pages/Home";
import Ingredients from "./pages/Ingredients";
import Policy from "./pages/Policy";
import OrderComplete from "./pages/OrderComplete";
import Kits from "./pages/Kits";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Business from "./pages/Business";
import BusinessPage from "./pages/BusinessPage";
import BusinessRequest from "./pages/BusinessRequest";
import BarbershopCase from "./pages/BarbershopCase";
import ScentBriefing from "./pages/ScentBriefing";

import { BUSINESS_PAGES } from "./data/business";
import { POLICIES } from "./data/policies";
import { KITS_ENABLED } from "./lib/flags";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/ingredients"} component={Ingredients} />
      <Route path={"/about"} component={About} />
      <Route path={"/business"} component={Business} />
      {BUSINESS_PAGES.map((page) => (
        <Route key={page.slug} path={page.path}>
          <BusinessPage page={page} />
        </Route>
      ))}
      <Route path={"/business/scent-briefing"} component={ScentBriefing} />
      <Route path={"/business/barbershop-case-study"} component={BarbershopCase} />
      <Route path={"/business/request-quote"}>
        <BusinessRequest kind="quote" />
      </Route>
      <Route path={"/business/request-samples"}>
        <BusinessRequest kind="samples" />
      </Route>
      <Route path={"/shop"} component={Shop} />
      <Route path={"/shop/:slug"} component={Shop} />
      <Route path={"/order-complete"} component={OrderComplete} />
      {POLICIES.map((doc) => (
        <Route key={doc.path} path={doc.path}>
          <Policy doc={doc} />
        </Route>
      ))}
      {/* Hidden until VITE_KITS_ENABLED=true (awaiting approval) */}
      {KITS_ENABLED && <Route path={"/kits"} component={Kits} />}
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <CartUIProvider>
          <ThemeProvider
            defaultTheme="light"
            // switchable
          >
            <TooltipProvider>
              <Toaster />
              <Router />
              <Cart />
              <FloatingButtons />
            </TooltipProvider>
          </ThemeProvider>
        </CartUIProvider>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
