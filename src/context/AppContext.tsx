import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type SupportedLocale, type TranslationDictionary } from "@/data/translations";

export type ThemeMode = "dark" | "light" | "custom";

interface AppContextType {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
  lang: SupportedLocale;
  setLang: (l: SupportedLocale) => void;
  t: TranslationDictionary;
  terminalOpen: boolean;
  setTerminalOpen: (v: boolean) => void;
  cursorLabel: string | null;
  setCursorLabel: (label: string | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

function getInitialTheme(): ThemeMode {
  const stored = localStorage.getItem("portfolio-theme") as ThemeMode | null;
  if (stored === "dark" || stored === "light" || stored === "custom") {
    return stored;
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function getInitialLang(): SupportedLocale {
  const stored = localStorage.getItem("portfolio-lang") as SupportedLocale | null;
  if (stored && translations[stored]) {
    return stored;
  }
  return "en";
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);
  const [lang, setLangState] = useState<SupportedLocale>(getInitialLang);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);

  // Apply theme to document element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-switching");
    root.dataset.theme = theme;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("custom", theme === "custom");
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme === "light" ? "light" : "dark";
    localStorage.setItem("portfolio-theme", theme);

    const timer = window.setTimeout(() => {
      root.classList.remove("theme-switching");
    }, 450);
    return () => window.clearTimeout(timer);
  }, [theme]);

  // Apply language
  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
    localStorage.setItem("portfolio-lang", lang);
  }, [lang]);

  // Lock scroll while terminal is open
  useEffect(() => {
    if (terminalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [terminalOpen]);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      if (current === "dark") return "light";
      if (current === "light") return "custom";
      return "dark";
    });
  }, []);

  const setLang = useCallback((newLang: SupportedLocale) => {
    setLangState(newLang);
  }, []);

  const t = translations[lang] || translations.en;

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        lang,
        setLang,
        t,
        terminalOpen,
        setTerminalOpen,
        cursorLabel,
        setCursorLabel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
