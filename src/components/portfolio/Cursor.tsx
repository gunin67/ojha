import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function Cursor() {
  const { cursorLabel } = useApp();
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktops/laptops)
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    const onPointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("[data-cursor]")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseover", onPointerOver);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", onPointerOver);
    };
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden" aria-hidden="true">
      {/* Outer trailing ring */}
      <motion.div
        className="absolute -left-4 -top-4 rounded-full border border-primary/50 dark:border-white/40 custom:border-cyan-400/60"
        style={{
          x: smoothX,
          y: smoothY,
          width: hovered ? 44 : clicked ? 24 : 32,
          height: hovered ? 44 : clicked ? 24 : 32,
          translateX: hovered ? -6 : clicked ? 4 : 0,
          translateY: hovered ? -6 : clicked ? 4 : 0,
          backgroundColor: hovered ? "rgba(255, 255, 255, 0.08)" : "transparent",
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Inner precise dot */}
      <motion.div
        className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-primary dark:bg-white custom:bg-cyan-400 shadow-sm"
        style={{
          x: mouseX,
          y: mouseY,
          scale: clicked ? 0.6 : hovered ? 1.4 : 1,
        }}
      />

      {/* Optional Mode/Action Label */}
      {cursorLabel && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute left-4 top-4 rounded bg-primary px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow"
          style={{
            x: smoothX,
            y: smoothY,
          }}
        >
          {cursorLabel}
        </motion.div>
      )}
    </div>
  );
}
