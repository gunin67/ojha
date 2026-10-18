import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Sparkles,
  Gamepad2,
  Code2,
  Cpu,
  Palette,
  Terminal,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";

export default function AboutPage() {
  const { t, setTerminalOpen } = useApp();
  const about = t.about;

  return (
    <div className="relative pb-24">
      {/* Header */}
      <section className="relative px-6 pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 backdrop-blur-md">
              <User className="h-4 w-4 text-purple-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-purple-300">
                {about.eyebrow}
              </span>
            </div>

            <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {about.title}
            </h1>
          </motion.div>

          {/* Narrative Surface Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 rounded-3xl border border-white/15 bg-neutral-950/70 p-8 shadow-2xl backdrop-blur-2xl md:p-12"
          >
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-400">
                  <Gamepad2 className="h-4 w-4" />
                  <span>The Gamer's Instinct</span>
                </div>
                <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
                  {about.body1}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
                  <Code2 className="h-4 w-4" />
                  <span>The Web Artisan</span>
                </div>
                <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
                  {about.body2}
                </p>
              </div>
            </div>

            {/* Quote Strip */}
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-mono text-xs text-neutral-400">
              <span className="flex items-center gap-2 text-white">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Focus: Zero latency, fluid feedback, human pacing</span>
              </span>
              <button
                type="button"
                onClick={() => setTerminalOpen(true)}
                className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-emerald-400 transition"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Run 'about' in terminal</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities & Tech Stack */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
              // Competencies
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
              {about.skillsEyebrow}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {about.skillsList.map((group, idx) => (
              <motion.div
                key={group.category}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-neutral-950/60 p-6 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-3 border-b border-white/10">
                  <span className="font-semibold text-white">{group.category}</span>
                  <span>0{idx + 1}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-neutral-200"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">
              // Timeline
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
              {about.timelineTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {about.timeline.map((item) => (
              <div
                key={item.year}
                className="flex flex-col sm:flex-row sm:items-start gap-4 rounded-2xl border border-white/10 bg-neutral-950/60 p-6 backdrop-blur-md"
              >
                <span className="w-28 shrink-0 font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  {item.year}
                </span>
                <div className="space-y-1">
                  <h4 className="font-display text-xl font-bold text-white">{item.role}</h4>
                  <p className="text-sm text-neutral-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA to Gaming & Contact */}
          <div className="pt-8 flex flex-wrap gap-4">
            <Link
              to="/gaming"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-xs font-bold text-neutral-950 transition hover:bg-neutral-200 shadow"
            >
              <Gamepad2 className="h-4 w-4" />
              <span>Explore Gaming Arena</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-mono text-xs font-medium text-white transition hover:bg-white/10"
            >
              <span>Get in Touch</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
