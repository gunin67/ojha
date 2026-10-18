import React from "react";
import { motion } from "framer-motion";
import {
  Gamepad2,
  Sword,
  Zap,
  Target,
  ExternalLink,
  ShieldCheck,
  Flame,
  ArrowRight,
  Crosshair,
  Trophy,
  Activity,
  Layers,
} from "lucide-react";
import VideoPlayer from "@/components/portfolio/VideoPlayer";
import ScreenshotLightbox from "@/components/portfolio/ScreenshotLightbox";
import { useApp } from "@/context/AppContext";

export default function GamingPage() {
  const { t } = useApp();
  const g = t.gaming;

  return (
    <div className="relative pb-24">
      {/* Gaming Hero */}
      <section className="relative px-6 pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 backdrop-blur-md">
              <Gamepad2 className="h-4 w-4 text-rose-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-rose-300">
                {g.eyebrow} // Professional Arena
              </span>
            </div>

            <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {g.title}
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              {g.subtitle}
            </p>
          </motion.div>

          {/* Gaming Stats Row */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: g.statGames, value: g.statGamesValue, icon: Trophy, color: "text-amber-400" },
              { label: g.statSpeed, value: g.statSpeedValue, icon: Zap, color: "text-cyan-400" },
              { label: g.statStyle, value: g.statStyleValue, icon: Flame, color: "text-rose-400" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="rounded-2xl border border-white/10 bg-neutral-950/60 p-5 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
                    <span>{stat.label}</span>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                    {stat.value}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Video Montage Showcase */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-6xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Sword className="h-5 w-5 text-rose-400" />
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                {g.montage}
              </h2>
            </div>
            <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 font-mono text-xs text-rose-300">
              {g.montageLabel}
            </span>
          </div>

          <p className="text-sm text-neutral-300 max-w-2xl">{g.montageDesc}</p>

          {/* Embedded Video Component */}
          <div className="pt-2">
            <VideoPlayer
              src="/1015(3).mp4"
              poster="/image copy.png"
              title={`${g.montage} — Gunin Singh`}
              subtitle={g.montageDesc}
            />
          </div>
        </div>
      </section>

      {/* Game Library & Screenshot Gallery */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">
                // Visual Assets
              </p>
              <h2 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
                {g.gallery}
              </h2>
            </div>
            <p className="text-xs font-mono text-neutral-400 max-w-sm">
              {g.galleryDesc}
            </p>
          </div>

          {/* Lightbox Screenshot Gallery */}
          <ScreenshotLightbox />
        </div>
      </section>

      {/* Game Loop Principles & Pillars */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left Column: Game Loop Principles */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  {g.loop}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                  <Activity className="h-3.5 w-3.5" />
                  <span>{g.live}</span>
                </span>
              </div>

              <div className="space-y-3">
                {g.loopLines.map((line, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-neutral-950/60 p-4 backdrop-blur-md"
                  >
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      0{index + 1}
                    </span>
                    <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                      {line}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Gaming Pillars */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border-b border-white/10 pb-3">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  {g.gives}
                </span>
              </div>

              <div className="space-y-3">
                {g.pillars.map((pillar) => (
                  <div
                    key={pillar.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-amber-400 uppercase tracking-wider">
                      <span>{pillar.label}</span>
                      <Target className="h-3.5 w-3.5 opacity-60" />
                    </div>
                    <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                      {pillar.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Competitive Roblox Highlight */}
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-5 backdrop-blur-md">
                <div className="flex items-center gap-2 font-mono text-xs text-cyan-300">
                  <Crosshair className="h-4 w-4" />
                  <span>Competitive Focus: Roblox Rivals</span>
                </div>
                <p className="mt-2 text-xs text-neutral-300 leading-relaxed">
                  Specialized in knife-only precision combat requiring strict spacing, anticipation of projectile hitboxes, and split-second flicking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Gaming Profiles */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-white/15 bg-neutral-950/80 p-8 shadow-2xl backdrop-blur-2xl">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">
                  {g.social}
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                  {g.profiles}
                </h3>
              </div>
              <span className="font-mono text-xs text-neutral-400">
                Official handles for tournaments & matches
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {g.profilesList.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/30 hover:bg-white/10 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                      {item.label}
                    </span>
                    <ExternalLink className="h-4 w-4 text-neutral-400 transition group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div className="mt-3 font-mono text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {item.handle}
                  </div>
                  <p className="mt-1 text-xs text-neutral-400">{item.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
