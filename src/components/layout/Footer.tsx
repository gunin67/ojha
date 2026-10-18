import React from "react";
import { Link } from "react-router-dom";
import { Terminal, Mail, Youtube, Gamepad2, ArrowUpRight, ShieldCheck, Heart, Download } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Footer() {
  const { t, setTerminalOpen } = useApp();

  return (
    <footer className="relative border-t border-white/10 bg-neutral-950/80 pt-16 pb-12 text-neutral-300 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-4 pb-12 border-b border-white/10">
          {/* Col 1: Bio & Terminal Trigger */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-1 font-display text-2xl font-bold text-white tracking-tight">
              <span>Gunin Singh</span>
              <span className="text-emerald-400">.</span>
            </Link>
            <p className="max-w-md text-sm text-neutral-400 leading-relaxed">
              Full-stack UI/UX developer & competitive gamer. Crafting high-performance web applications, interactive motion architectures, and digital experiences shaped by gaming precision.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setTerminalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-neutral-300 transition hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400"
              >
                <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                <span>Open Terminal Console</span>
              </button>
              <a
                href="/gunin-singh-portfolio.zip"
                download="gunin-singh-portfolio.zip"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-xs text-emerald-300 transition hover:border-emerald-500/50 hover:bg-emerald-500/20"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Project ZIP (17 MB)</span>
              </a>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-neutral-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Cloudflare Ready • Bun Engine</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">Navigation</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="transition hover:text-white flex items-center gap-1">
                  <span>{t.nav.home}</span>
                </Link>
              </li>
              <li>
                <Link to="/gaming" className="transition hover:text-white flex items-center gap-1">
                  <span>{t.nav.gaming}</span>
                  <span className="rounded bg-rose-500/20 text-rose-300 text-[10px] px-1.5 py-0.2">Montage</span>
                </Link>
              </li>
              <li>
                <Link to="/web-creation" className="transition hover:text-white">
                  {t.nav.web}
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition hover:text-white">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:text-white">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Channels */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">Verified Channels</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://youtube.com/@Amazingpro245"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-neutral-300 transition hover:text-white group"
                >
                  <span className="flex items-center gap-2">
                    <Youtube className="h-4 w-4 text-rose-400" />
                    <span>@Amazingpro245</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="https://steamcommunity.com/id/ThegamerAmazingpro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-neutral-300 transition hover:text-white group"
                >
                  <span className="flex items-center gap-2">
                    <Gamepad2 className="h-4 w-4 text-cyan-400" />
                    <span>ThegamerAmazingpro</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.roblox.com/users/2868683169/profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-neutral-300 transition hover:text-white group"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-amber-400" />
                    <span>Amazingprohac</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:rockstarjaynin@gmail.com"
                  className="flex items-center justify-between text-neutral-300 transition hover:text-white group"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-emerald-400" />
                    <span>rockstarjaynin@gmail.com</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div>
            © {new Date().getFullYear()} Gunin Singh. {t.footer.rights}
          </div>
          <div className="flex items-center gap-2">
            <span>{t.footer.designedBy}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
