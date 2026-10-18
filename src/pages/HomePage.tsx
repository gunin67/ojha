import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Gamepad2,
  Code2,
  ArrowRight,
  Sparkles,
  Terminal,
  Play,
  Layers,
  Zap,
  Activity,
  Shield,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

const NAME = "Gunin Singh";

function TypedName() {
  const [text, setText] = useState(NAME.slice(0, 1));
  const [index, setIndex] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(
      () => {
        if (!isDeleting && index <= NAME.length) {
          setText(NAME.slice(0, index));
          setIndex((curr) => curr + 1);
        }
        if (!isDeleting && index > NAME.length) {
          window.setTimeout(() => setIsDeleting(true), 1200);
        }
        if (isDeleting && index > 0) {
          setText(NAME.slice(0, index - 1));
          setIndex((curr) => curr - 1);
        }
        if (isDeleting && index === 0) {
          setIsDeleting(false);
          setIndex(1);
        }
      },
      isDeleting ? 65 : 120
    );

    return () => window.clearTimeout(timer);
  }, [index, isDeleting]);

  return (
    <span className="inline-flex items-center gap-1 font-mono font-bold text-white">
      <span>{text}</span>
      <span className="caret-blink ml-0.5 inline-block h-5 w-2 bg-emerald-400" />
    </span>
  );
}

export default function HomePage() {
  const { t, setTerminalOpen } = useApp();
  const home = t.home;

  return (
    <div className="relative pb-24">
      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Hero Column */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-300">
                  {home.badge}
                </span>
              </div>

              {/* Title & Typed Name */}
              <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-8xl">
                <span className="block text-neutral-400 font-normal">{home.titleA}</span>
                <span className="block text-gradient">{home.titleB}</span>
              </h1>

              {/* Name Tag */}
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2.5 rounded-2xl border border-white/15 bg-neutral-900/60 px-4 py-2.5 backdrop-blur-md">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <TypedName />
                </div>
                <button
                  type="button"
                  onClick={() => setTerminalOpen(true)}
                  className="hidden sm:inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 font-mono text-xs text-neutral-400 transition hover:border-emerald-500/40 hover:text-emerald-400"
                >
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Type 'start'</span>
                </button>
              </div>

              {/* Description */}
              <p className="max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                {home.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/gaming"
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-neutral-950 shadow-xl transition hover:scale-105 active:scale-95"
                >
                  <Gamepad2 className="h-4 w-4 text-rose-600 transition group-hover:rotate-12" />
                  <span>{home.exploreGaming}</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/web-creation"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition hover:border-white/40 hover:bg-white/10"
                >
                  <Code2 className="h-4 w-4 text-emerald-400" />
                  <span>{home.viewProjects}</span>
                </Link>
              </div>

              {/* Numerical Stats */}
              <div className="grid grid-cols-3 gap-3 pt-6">
                {home.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
                  >
                    <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-neutral-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Telemetry / Signal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-neutral-950/70 p-6 shadow-2xl backdrop-blur-2xl custom:border-purple-500/30">
                <div className="scanlines absolute inset-0 opacity-15" />

                {/* Card Header */}
                <div className="relative mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                      Live Telemetry • Gunin Singh
                    </span>
                  </div>
                  <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-neutral-400">
                    STATUS: ACTIVE
                  </span>
                </div>

                {/* Sub cards */}
                <div className="relative space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-4">
                      <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
                        <span>{home.signal.modeTitle}</span>
                        <Zap className="h-3.5 w-3.5 text-amber-400" />
                      </div>
                      <div className="mt-2 font-display text-xl font-bold text-white">
                        {home.signal.modeValue}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-4">
                      <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
                        <span>{home.signal.focusTitle}</span>
                        <Activity className="h-3.5 w-3.5 text-emerald-400" />
                      </div>
                      <div className="mt-2 font-display text-xl font-bold text-white">
                        {home.signal.focusValue}
                      </div>
                    </div>
                  </div>

                  {/* Creative Stack Pills */}
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4">
                    <div className="mb-3 flex items-center justify-between font-mono text-xs text-neutral-300">
                      <span className="flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5 text-cyan-400" />
                        <span>{home.signal.stackTitle}</span>
                      </span>
                      <span className="text-[10px] text-neutral-400">VERIFIED ARCHITECTURE</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {home.signal.stackItems.map((item, i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[11px] text-neutral-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Philosophy Quote */}
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4 font-mono text-xs text-emerald-300 leading-relaxed">
                    "{home.featuredQuote}"
                  </div>

                  {/* Gaming Montage Quick Jump */}
                  <Link
                    to="/gaming"
                    className="flex items-center justify-between rounded-2xl border border-rose-500/30 bg-rose-950/30 p-4 text-xs font-mono text-rose-300 transition hover:bg-rose-950/50"
                  >
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4 fill-current text-rose-400" />
                      <span>Rivals Knife Only Montage Video</span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview Strip */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">
                // Selected Works
              </p>
              <h2 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
                Engineered with Gaming Feel & Precision
              </h2>
            </div>
            <Link
              to="/web-creation"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-300 transition hover:text-white"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Lumina E-Commerce",
                category: "Luxury Fashion & Motion Storefront",
                desc: "Conversion-driven architecture featuring 3D product previews and instant cart updates.",
                year: "2024",
                tags: ["React 19", "Tailwind CSS", "Motion"],
              },
              {
                title: "Horizon Dashboard",
                category: "High-Density Analytics & Telemetry",
                desc: "Zero-latency data visualization for real-time monitoring and fluid metrics exploration.",
                year: "2024",
                tags: ["TypeScript", "Data Viz", "Tailwind CSS"],
              },
            ].map((proj, idx) => (
              <motion.div
                key={proj.title}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/60 p-6 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>0{idx + 1} // {proj.category}</span>
                  <span className="rounded bg-white/5 px-2 py-0.5 text-neutral-300">{proj.year}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{proj.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
