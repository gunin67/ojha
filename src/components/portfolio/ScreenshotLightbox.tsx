import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X, ZoomIn, Eye, Sparkles } from "lucide-react";

interface ScreenshotItem {
  src: string;
  title: string;
  category: string;
  resolution: string;
  desc: string;
}

export default function ScreenshotLightbox({
  items = [
    {
      src: "/image.png",
      title: "Game Library & Custom Cover Art",
      category: "High-Resolution Render",
      resolution: "2480 × 3307 px",
      desc: "Original visual art and game cover composition featuring Gunin Singh's personal game collection and showcase.",
    },
    {
      src: "/image copy.png",
      title: "Tactical Gameplay & Environment Study",
      category: "Competitive Arena",
      resolution: "2480 × 3307 px",
      desc: "Detailed environmental and spatial reference capture for competitive movement and arena geometry.",
    },
  ],
}: {
  items?: ScreenshotItem[];
}) {
  const [activeImage, setActiveImage] = useState<ScreenshotItem | null>(null);

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item, idx) => (
          <motion.div
            key={item.src}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveImage(item)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/70 shadow-[0_16px_50px_rgba(0,0,0,0.4)] backdrop-blur-md"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <Sparkles className="h-3 w-3 text-amber-400" />
                <span>Gallery // 0{idx + 1}</span>
              </span>
              <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-neutral-400">
                {item.resolution}
              </span>
            </div>

            {/* Image Preview */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

              {/* Hover Overlay Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-neutral-950/80 px-4 py-2 font-mono text-xs text-white shadow-xl backdrop-blur-md">
                  <ZoomIn className="h-3.5 w-3.5" />
                  <span>Inspect Full Resolution</span>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span>{item.category}</span>
                <span className="text-neutral-500">CLICK TO EXPAND</span>
              </div>
              <h4 className="mt-1 font-display text-lg font-semibold text-white">
                {item.title}
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl sm:p-8"
            role="dialog"
            aria-modal="true"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-neutral-950 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900/80 px-4 py-3 text-xs font-mono text-neutral-300">
                <div>
                  <span className="font-semibold text-white">{activeImage.title}</span>
                  <span className="ml-2 text-neutral-500">• {activeImage.resolution}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveImage(null)}
                  className="rounded-full p-1 text-neutral-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close image modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[75vh] overflow-auto bg-neutral-950 p-2">
                <img
                  src={activeImage.src}
                  alt={activeImage.title}
                  className="mx-auto max-h-[72vh] w-auto rounded-lg object-contain shadow-lg"
                />
              </div>

              <div className="border-t border-white/10 bg-neutral-900/60 p-4 text-xs text-neutral-300">
                <p>{activeImage.desc}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
