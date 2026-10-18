import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import DynamicIsland from "@/components/portfolio/DynamicIsland";
import Terminal from "@/components/portfolio/Terminal";
import Cursor from "@/components/portfolio/Cursor";
import Footer from "@/components/layout/Footer";
import { useApp } from "@/context/AppContext";

export default function PortfolioLayout() {
  const location = useLocation();
  const { theme } = useApp();

  return (
    <div className={`relative min-h-screen w-full overflow-x-hidden ${theme === "custom" ? "custom" : theme === "light" ? "light" : "dark"}`}>
      {/* Desktop magnetic cursor */}
      <Cursor />

      {/* Floating Dynamic Island Navbar */}
      <DynamicIsland />

      {/* Terminal Boot Sequence & Interactive Modal */}
      <Terminal />

      {/* Atmospheric Background Layers */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Glow Orbs */}
        <div className="ambient-orb ambient-orb-one" />
        <div className="ambient-orb ambient-orb-two" />

        {/* Technical Grid Pattern */}
        <div className="grid-lines absolute inset-0 opacity-40 dark:opacity-30 custom:opacity-60" />

        {/* Scanline Texture in Custom/Cyberpunk mode */}
        {theme === "custom" && <div className="scanlines absolute inset-0 opacity-20" />}
      </div>

      {/* Main Multi-Page Route Outlet with Smooth Page Transitions */}
      <main className="relative z-10 min-h-[calc(100vh-220px)] pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
