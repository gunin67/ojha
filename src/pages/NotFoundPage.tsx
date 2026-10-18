import React from "react";
import { Link } from "react-router-dom";
import { Terminal, Home, AlertTriangle } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function NotFoundPage() {
  const { setTerminalOpen } = useApp();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="rounded-3xl border border-white/15 bg-neutral-950/80 p-8 sm:p-12 shadow-2xl backdrop-blur-2xl max-w-lg w-full">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-400">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <p className="font-mono text-xs uppercase tracking-widest text-rose-400">
          ERROR 404 // ROUTE_NOT_FOUND
        </p>

        <h1 className="mt-3 font-display text-4xl font-extrabold text-white sm:text-5xl">
          Coordinates Lost
        </h1>

        <p className="mt-3 text-sm text-neutral-300 leading-relaxed font-mono">
          The requested memory address does not exist on this server.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-xs font-bold text-neutral-950 transition hover:bg-neutral-200"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Return Home</span>
          </Link>

          <button
            type="button"
            onClick={() => setTerminalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-mono text-xs text-white transition hover:bg-white/10"
          >
            <Terminal className="h-3.5 w-3.5 text-emerald-400" />
            <span>Open Terminal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
