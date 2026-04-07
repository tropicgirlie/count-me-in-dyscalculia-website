import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./lib/theme-provider.tsx";
import { FontProvider } from "./lib/font-provider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <FontProvider>
      <App />
    </FontProvider>
  </ThemeProvider>
);