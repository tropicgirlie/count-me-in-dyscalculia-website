import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";

// Lazy-load all page components. This isolates module errors so a bad
// page never prevents App.tsx from loading.
const HomePage = lazy(() =>
  import("./components/HomePage").then((m) => ({ default: m.HomePage }))
);
const AboutPage = lazy(() =>
  import("./components/AboutPage").then((m) => ({ default: m.AboutPage }))
);
const SelfCheckPage = lazy(() =>
  import("./components/SelfCheckPage").then((m) => ({ default: m.SelfCheckPage }))
);
const GetAssessedPage = lazy(() =>
  import("./components/GetAssessedPage").then((m) => ({ default: m.GetAssessedPage }))
);
const StoriesPage = lazy(() =>
  import("./components/StoriesPage").then((m) => ({ default: m.StoriesPage }))
);
const BlogPage = lazy(() =>
  import("./components/BlogPage").then((m) => ({ default: m.BlogPage }))
);
const EbookPage = lazy(() =>
  import("./components/EbookPage").then((m) => ({ default: m.EbookPage }))
);
const FreeResourcesPage = lazy(() =>
  import("./components/FreeResourcesPage").then((m) => ({ default: m.FreeResourcesPage }))
);
const StorePage = lazy(() =>
  import("./components/StorePage").then((m) => ({ default: m.StorePage }))
);
const AdminPage = lazy(() =>
  import("./components/AdminPage").then((m) => ({ default: m.AdminPage }))
);
const ToolsAppsPage = lazy(() =>
  import("./components/ToolsAppsPage").then((m) => ({ default: m.ToolsAppsPage }))
);
const ContactPage = lazy(() =>
  import("./components/ContactPage").then((m) => ({ default: m.ContactPage }))
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "self-check", Component: SelfCheckPage },
      { path: "get-assessed", Component: GetAssessedPage },
      { path: "stories", Component: StoriesPage },
      { path: "blog", Component: BlogPage },
      { path: "tools", Component: ToolsAppsPage },
      { path: "ebook", Component: EbookPage },
      { path: "free-resources", Component: FreeResourcesPage },
      { path: "store", Component: StorePage },
      { path: "contact", Component: ContactPage },
    ],
  },
  {
    path: "/admin",
    Component: AdminPage,
  },
]);
