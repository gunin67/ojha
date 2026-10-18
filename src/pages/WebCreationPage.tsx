import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  LayoutTemplate,
  MousePointer2,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  Layers,
  Terminal,
  CheckCircle2,
  FolderGit2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function WebCreationPage() {
  const { t, setTerminalOpen } = useApp();
  const web = t.web;
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [activeProjectModal, setActiveProjectModal] = useState<any | null>(null);

  const creationModesIcons = [LayoutTemplate, Code2, MousePointer2];

  const filteredProjects =
    selectedFilter === "All"
      ? web.projects
      : web.projects.filter(
          (p) =>
            p.category.toLowerCase().includes(selectedFilter.toLowerCase()) ||
            p.tech.some((tech) => tech.toLowerCase().includes(selectedFilter.toLowerCase()))
        );

  return (
    <div className="relative pb-24">
      {/* Header */}
      <section className="relative px-6 pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md">
              <Code2 className="h-4 w-4 text-emerald-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-300">
                {web.eyebrow}
              </span>
            </div>

            <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {web.title}
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              {web.intro}
            </p>
          </motion.div>

          {/* Strategy / Build / Launch Triad */}
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                step: "01",
                title: web.strategy,
                desc: web.strategyText,
                accent: "text-amber-400",
                border: "border-amber-500/20",
              },
              {
                step: "02",
                title: web.build,
                desc: web.buildText,
                accent: "text-emerald-400",
                border: "border-emerald-500/20",
              },
              {
                step: "03",
                title: web.launch,
                desc: web.launchText,
                accent: "text-cyan-400",
                border: "border-cyan-500/20",
              },
            ].map((col, idx) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
                className={`rounded-2xl border ${col.border} bg-neutral-950/60 p-6 backdrop-blur-md`}
              >
                <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
                  <span className={col.accent}>PHASE {col.step}</span>
                  <span className="text-neutral-500">• ARCHITECTURE</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-white">
                  {col.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                  {col.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Creation Modes */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 border-b border-white/10 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
              // Methodology
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
              Engineered for Scalability & Delight
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {web.modes.map((mode, index) => {
              const Icon = creationModesIcons[index] || Code2;
              return (
                <motion.div
                  key={mode.title}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/70 p-6 shadow-xl backdrop-blur-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition group-hover:scale-110 group-hover:border-emerald-500/40 group-hover:text-emerald-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-neutral-500">
                      MODE 0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-bold text-white">
                    {mode.title}
                  </h3>

                  <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                    {mode.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">
                {web.projectsEyebrow}
              </p>
              <h2 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
                {web.projectsTitle}
              </h2>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {["All", "Design", "TypeScript", "React", "Mobile"].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelectedFilter(filter)}
                  className={`rounded-full px-3.5 py-1 font-mono text-xs transition ${
                    selectedFilter === filter
                      ? "bg-white text-neutral-950 font-semibold shadow"
                      : "border border-white/10 bg-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((proj, idx) => (
              <motion.div
                key={proj.title}
                whileHover={{ y: -5 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-neutral-950/80 p-7 shadow-2xl backdrop-blur-2xl transition-colors hover:border-white/30"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <Layers className="h-3.5 w-3.5" />
                      <span>{proj.badge}</span>
                    </span>
                    <span className="rounded bg-white/5 px-2 py-0.5 text-neutral-300">
                      {proj.year}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl group-hover:text-emerald-400 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="mt-1 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    {proj.category}
                  </p>

                  <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[10px] text-neutral-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveProjectModal(proj)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 font-mono text-xs text-white transition hover:bg-white hover:text-neutral-950 active:scale-95"
                    >
                      <span>Inspect</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal prompt CTA banner */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-white/15 bg-neutral-950/70 p-6 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                  Developer Interface Active
                </p>
                <p className="text-sm text-neutral-300">
                  Run <span className="font-mono text-white">'projects'</span> or <span className="font-mono text-white">'skills'</span> in the interactive console.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTerminalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs text-white transition hover:bg-white hover:text-black"
            >
              <span>Launch Terminal</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Inspect Project Modal */}
      <AnimatePresence>
        {activeProjectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProjectModal(null)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl sm:p-6"
            role="dialog"
            aria-modal="true"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-neutral-950 p-6 sm:p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
                    {activeProjectModal.category}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                    {activeProjectModal.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProjectModal(null)}
                  className="rounded-full p-2 text-neutral-400 hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="py-6 space-y-4">
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                  {activeProjectModal.description}
                </p>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-2">
                    Core Architecture & Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeProjectModal.tech.map((t: string) => (
                      <span
                        key={t}
                        className="rounded-lg border border-white/10 bg-neutral-900 px-3 py-1 font-mono text-xs text-white"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4 font-mono text-xs text-emerald-300">
                  ✓ Verified production deployment • Cloudflare CDN & Bun optimized
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setActiveProjectModal(null)}
                  className="rounded-full px-5 py-2 font-mono text-xs text-neutral-400 hover:text-white"
                >
                  Close
                </button>
                <a
                  href="mailto:rockstarjaynin@gmail.com?subject=Inquiry regarding Project"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 font-mono text-xs font-semibold text-neutral-950 hover:bg-neutral-200"
                >
                  <span>Request Full Case Study</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
