import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Font = "default" | "dyslexia";

interface FontContextType {
  font: Font;
  setFont: (font: Font) => void;
  toggleDyslexiaFont: () => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: ReactNode }) {
  const [font, setFontState] = useState<Font>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("font-preference") as Font;
      if (stored && (stored === "default" || stored === "dyslexia")) {
        return stored;
      }
    }
    return "default";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (font === "dyslexia") {
      root.classList.add("font-dyslexia");
    } else {
      root.classList.remove("font-dyslexia");
    }
    
    localStorage.setItem("font-preference", font);
  }, [font]);

  const setFont = (newFont: Font) => {
    setFontState(newFont);
  };

  const toggleDyslexiaFont = () => {
    setFontState((prev) => (prev === "default" ? "dyslexia" : "default"));
  };

  return (
    <FontContext.Provider value={{ font, setFont, toggleDyslexiaFont }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
}
