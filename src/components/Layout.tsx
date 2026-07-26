import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      {/* Skip to content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>
      <header>
        <Navigation />
      </header>
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}