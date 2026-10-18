import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

type Line = {
  kind: "in" | "out" | "err" | "ok" | "sys";
  text: ReactNode;
};

const PROMPT = "gunin@portfolio:~$";

export default function Terminal() {
  const { t, theme, toggleTheme, terminalOpen, setTerminalOpen } = useApp();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(true);
  const [booting, setBooting] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const tt = t.terminal;

  const close = () => {
    sessionStorage.setItem("gs-intro", "done");
    setTerminalOpen(false);
  };

  const launch = () => {
    setBooting(true);
    setLines((prev) => [
      ...prev,
      { kind: "sys", text: "⚡ [KERNEL] Mounting graphic pipeline..." },
      { kind: "ok", text: tt.booting },
    ]);
    window.setTimeout(() => {
      close();
      setBooting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 950);
  };

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    if (cmd) {
      setHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
    }

    const out: Line[] = [{ kind: "in", text: cmd }];
    const lower = cmd.toLowerCase();

    switch (lower) {
      case "":
        break;
      case "help":
        out.push({ kind: "out", text: <strong className="text-primary">{tt.help}</strong> });
        ([
          ["start", "Launch the interactive multi-page portfolio"],
          ["about", tt.cmds.about],
          ["gaming", tt.cmds.gaming],
          ["projects", tt.cmds.projects],
          ["skills", tt.cmds.skills],
          ["contact", tt.cmds.contact],
          ["theme", `Switch mode (current: ${theme})`],
          ["clear", tt.cmds.clear],
        ] as const).forEach(([c, d]) => {
          out.push({
            kind: "out",
            text: (
              <span className="flex flex-col sm:flex-row sm:items-center">
                <span className="inline-block w-36 font-semibold text-emerald-400 dark:text-emerald-300">
                  {c}
                </span>
                <span className="text-muted-foreground">{d}</span>
              </span>
            ),
          });
        });
        break;

      case "about":
        out.push({ kind: "out", text: tt.about });
        break;

      case "gaming":
        out.push({
          kind: "out",
          text: (
            <div className="space-y-1">
              <p className="text-amber-400">⚡ Competitive Roblox Rivals • Knife-Only Combat Specialist</p>
              <p className="text-muted-foreground">YouTube: @Amazingpro245 | Steam: ThegamerAmazingpro | Roblox: Amazingprohac</p>
            </div>
          ),
        });
        break;

      case "projects":
        out.push({ kind: "out", text: tt.projects });
        break;

      case "skills":
        out.push({ kind: "out", text: tt.skills });
        break;

      case "contact":
        out.push({ kind: "out", text: tt.contact });
        break;

      case "theme":
        toggleTheme();
        out.push({ kind: "ok", text: `Theme toggled. Current visual mode active.` });
        break;

      case "download":
      case "zip":
        out.push({
          kind: "ok",
          text: (
            <div className="space-y-1">
              <p className="text-emerald-400">📦 Initiating download: gunin-singh-portfolio.zip (17.1 MB)...</p>
              <a
                href="/gunin-singh-portfolio.zip"
                download="gunin-singh-portfolio.zip"
                className="inline-flex items-center gap-1 text-cyan-300 underline hover:text-white"
              >
                Click here if download does not trigger automatically
              </a>
            </div>
          ),
        });
        {
          const dl = document.createElement("a");
          dl.href = "/gunin-singh-portfolio.zip";
          dl.download = "gunin-singh-portfolio.zip";
          document.body.appendChild(dl);
          dl.click();
          document.body.removeChild(dl);
        }
        break;

      case "clear":
        setLines([]);
        return;

      case "./start-portfolio":
      case "start":
      case "start-portfolio":
      case "run":
      case "launch":
        setLines((l) => [...l, ...out]);
        launch();
        return;

      default:
        out.push({
          kind: "err",
          text: `${tt.notFound} '${cmd}'. Type 'start' to launch or 'help' for instructions.`,
        });
    }

    setLines((l) => [...l, ...out]);
  };

  // Automated typing intro ("whoami")
  useEffect(() => {
    if (!terminalOpen) return;
    setLines([]);
    setTyping(true);
    const word = "whoami";
    let i = 0;
    let timerId: number;

    const step = () => {
      i++;
      setInput(word.slice(0, i));
      if (i < word.length) {
        timerId = window.setTimeout(step, 80 + Math.random() * 60);
      } else {
        timerId = window.setTimeout(() => {
          setInput("");
          setLines([
            { kind: "in", text: word },
            {
              kind: "ok",
              text: (
                <div className="space-y-1">
                  <p className="font-bold text-white">Gunin Singh — Full-Stack UI/UX Developer • Pro Gamer</p>
                  <p className="text-xs text-muted-foreground">{tt.intro}</p>
                </div>
              ),
            },
            {
              kind: "out",
              text: (
                <p className="text-xs text-muted-foreground">
                  Type <span className="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-primary">start</span> to open website, or <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-white">help</span> for commands.
                </p>
              ),
            },
          ]);
          setTyping(false);
          inputRef.current?.focus();
        }, 360);
      }
    };

    timerId = window.setTimeout(step, 450);
    return () => window.clearTimeout(timerId);
  }, [terminalOpen, tt.intro]);

  // Auto-scroll terminal log
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [lines, input]);

  // Handle ESC key
  useEffect(() => {
    if (!terminalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [terminalOpen]);

  // Handle command history navigation with arrow keys
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex < history.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          key="term-modal"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.15 } }}
          role="dialog"
          aria-modal="true"
          aria-label={tt.title}
        >
          <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
          <div className="scanlines absolute inset-0 opacity-30" />

          <motion.div
            className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/95 shadow-2xl backdrop-blur-2xl"
            initial={{ y: 35, scale: 0.96, opacity: 0, filter: "blur(8px)" }}
            animate={
              booting
                ? {
                    scale: 1.5,
                    opacity: 0,
                    filter: "blur(18px)",
                    transition: { duration: 0.85, ease: [0.7, 0, 0.2, 1] },
                  }
                : {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  }
            }
            exit={{ scale: 1.35, opacity: 0, filter: "blur(14px)", transition: { duration: 0.5 } }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Window title bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={tt.skip}
                  onClick={close}
                  className="group relative h-3 w-3 rounded-full bg-rose-500/80 transition hover:bg-rose-500"
                  title="Close (ESC)"
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white opacity-0 transition group-hover:opacity-100">
                    ✕
                  </span>
                </button>
                <span className="h-3 w-3 rounded-full bg-amber-500/60" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{tt.title}</span>
              </div>

              <button
                type="button"
                onClick={close}
                className="rounded px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition hover:text-white"
              >
                ESC
              </button>
            </div>

            {/* Terminal Body */}
            <div
              ref={bodyRef}
              className="h-[52vh] min-h-[300px] max-h-[460px] overflow-y-auto p-4 sm:p-5 font-mono text-[13px] leading-relaxed text-neutral-200"
            >
              <div className="mb-3 border-b border-white/5 pb-2 text-xs text-neutral-500">
                <span>Last login: {new Date().toDateString()} on ttyS01</span>
                <span className="ml-2 text-emerald-400/80">• SESSION_ESTABLISHED</span>
              </div>

              {lines.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`my-1 ${
                    l.kind === "err"
                      ? "text-rose-400"
                      : l.kind === "ok"
                      ? "text-emerald-400"
                      : l.kind === "sys"
                      ? "text-cyan-400"
                      : ""
                  }`}
                >
                  {l.kind === "in" ? (
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">{PROMPT}</span>
                      <span className="text-white font-semibold">{l.text}</span>
                    </div>
                  ) : (
                    l.text
                  )}
                </motion.div>
              ))}

              {/* Active command line */}
              <form
                className="mt-2 flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (typing || booting) return;
                  runCommand(input);
                  setInput("");
                }}
              >
                <span className="shrink-0 text-emerald-400 font-semibold">{PROMPT}</span>
                <div className="relative flex-1">
                  <span className="pointer-events-none whitespace-pre text-white">{input}</span>
                  <span className="caret-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-emerald-400" />
                  {!input && !typing && (
                    <span className="pointer-events-none absolute left-3 top-0 text-neutral-500">
                      {tt.placeholder}
                    </span>
                  )}
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => !typing && setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label={tt.placeholder}
                    className="absolute inset-0 w-full bg-transparent text-transparent caret-transparent outline-none"
                    autoComplete="off"
                    spellCheck={false}
                    autoFocus
                  />
                </div>
              </form>
            </div>

            {/* Quick action bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-neutral-900/70 p-3 sm:px-5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                  Quick:
                </span>
                {(["help", "gaming", "projects", "skills", "theme", "download"] as const).map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => !typing && runCommand(cmd)}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-neutral-400 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                  >
                    {cmd === "download" ? "📦 download zip" : cmd}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full px-3 py-1 text-xs text-neutral-400 transition hover:text-white"
                >
                  {tt.skip}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLines((l) => [...l, { kind: "in", text: "./start-portfolio" }]);
                    launch();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-1.5 font-mono text-xs font-semibold text-neutral-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition hover:brightness-110 active:scale-95"
                >
                  <span>./start-portfolio</span>
                  <span>↵</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
