import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  Moon,
  Sun,
  Sparkles,
  Terminal as TermIcon,
  Globe,
  Menu,
  X,
  Gamepad2,
  Code2,
  User,
  Mail,
  Home,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { localeOptions } from "@/data/translations";

const spring = { type: "spring", stiffness: 380, damping: 32 } as const;

export default function DynamicIsland() {
  const { t, theme, toggleTheme, lang, setLang, terminalOpen, setTerminalOpen } = useApp();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const navLinks = [
    { path: "/", label: t.nav.home, icon: Home },
    { path: "/gaming", label: t.nav.gaming, icon: Gamepad2 },
    { path: "/web-creation", label: t.nav.web, icon: Code2 },
    { path: "/about", label: t.nav.about, icon: User },
    { path: "/contact", label: t.nav.contact, icon: Mail },
  ];

  const currentNav = navLinks.find((item) => item.path === location.pathname) || navLinks[0];

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false);
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  // Collapse on route change
  useEffect(() => {
    setExpanded(false);
    setLangMenuOpen(false);
  }, [location.pathname]);

  if (terminalOpen) return null;

  return (
    <motion.div
      className="fixed left-1/2 top-4 z-[80] -translate-x-1/2 px-2 max-w-[95vw]"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...spring, delay: 0.2 }}
    >
      <motion.nav
        ref={containerRef}
        layout
        transition={spring}
        onMouseEnter={() => {
          if (window.matchMedia("(pointer: fine)").matches) {
            setExpanded(true);
          }
        }}
        onMouseLeave={() => {
          setExpanded(false);
          setLangMenuOpen(false);
        }}
        aria-label={t.nav.menu}
        className="relative overflow-hidden rounded-full border border-white/15 bg-neutral-950/85 text-neutral-100 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl dark:border-white/15 dark:bg-black/85 custom:border-purple-500/30 custom:bg-purple-950/80 custom:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
      >
        <motion.div layout="position" className="flex items-center gap-2 py-1.5 pl-4 pr-2 sm:gap-3">
          {/* Brand button */}
          <Link
            to="/"
            className="flex items-center gap-1 font-display text-base font-bold tracking-tight text-white transition hover:opacity-85 sm:text-lg"
          >
            <span>GS</span>
            <span className="text-emerald-400 custom:text-cyan-400">.</span>
          </Link>

          {/* Collapsed / Expanded links */}
          <AnimatePresence mode="popLayout" initial={false}>
            {!expanded ? (
              <motion.div
                key="pill-status"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-center gap-2 pr-1"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-neutral-300 sm:text-[13px]">
                  {currentNav.label}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="desktop-links"
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                className="hidden items-center gap-1 sm:flex"
              >
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-white/15 dark:bg-white/10 custom:bg-gradient-to-r custom:from-purple-500/30 custom:to-cyan-500/30 border border-white/10"
                          transition={spring}
                        />
                      )}
                      <Icon className="relative h-3.5 w-3.5" />
                      <span className="relative">{link.label}</span>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action controls */}
          <motion.div layout="position" className="flex items-center gap-1">
            {/* Language button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen((prev) => !prev)}
                aria-label={t.nav.language}
                aria-expanded={langMenuOpen}
                className="flex h-8 items-center gap-1 rounded-full px-2 text-xs font-medium text-neutral-400 transition hover:bg-white/10 hover:text-white"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{localeOptions.find((l) => l.code === lang)?.short}</span>
              </button>
            </div>

            {/* Theme switcher with 3 modes */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={t.nav.theme}
              title={`Theme: ${theme.toUpperCase()} (Click to toggle)`}
              className="grid h-8 w-8 place-items-center rounded-full text-neutral-400 transition hover:bg-white/10 hover:text-white"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "light" ? (
                    <Sun className="h-3.5 w-3.5 text-amber-400" />
                  ) : theme === "custom" ? (
                    <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                  ) : (
                    <Moon className="h-3.5 w-3.5 text-cyan-300" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Terminal toggle */}
            <button
              type="button"
              onClick={() => setTerminalOpen(true)}
              aria-label={t.nav.terminal}
              title="Launch Console (ESC to close)"
              className="grid h-8 w-8 place-items-center rounded-full text-neutral-400 transition hover:bg-white/10 hover:text-white"
            >
              <TermIcon className="h-3.5 w-3.5" />
            </button>

            {/* Circular scroll progress ring */}
            <div className="relative grid h-8 w-8 place-items-center">
              <svg className="h-7 w-7 -rotate-90" viewBox="0 0 32 32" aria-hidden>
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  className="fill-none stroke-white/15"
                  strokeWidth="2.5"
                />
                <motion.circle
                  cx="16"
                  cy="16"
                  r="12"
                  className="fill-none stroke-emerald-400 custom:stroke-cyan-400"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ pathLength: smoothProgress }}
                />
              </svg>
            </div>

            {/* Mobile menu hamburger toggle */}
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-label="Toggle navigation drawer"
              className="grid h-8 w-8 place-items-center rounded-full text-neutral-400 transition hover:bg-white/10 hover:text-white sm:hidden"
            >
              {expanded ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </motion.div>
        </motion.div>

        {/* Expandable Mobile Navigation Tray */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="mobile-nav-tray"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="border-t border-white/10 px-3 py-2.5 sm:hidden"
            >
              <div className="grid grid-cols-2 gap-1.5">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setExpanded(false)}
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition ${
                        isActive
                          ? "bg-white/15 text-white shadow-sm"
                          : "text-neutral-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Language selector tray */}
          {langMenuOpen && (
            <motion.div
              key="lang-tray"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-wrap justify-center gap-1 border-t border-white/10 px-3 py-2"
              role="listbox"
              aria-label={t.nav.language}
            >
              {localeOptions.map((l) => (
                <button
                  key={l.code}
                  role="option"
                  aria-selected={lang === l.code}
                  onClick={() => {
                    setLang(l.code);
                    setLangMenuOpen(false);
                  }}
                  className={`relative rounded-full px-3 py-1 text-xs font-medium transition ${
                    lang === l.code
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.div>
  );
}
