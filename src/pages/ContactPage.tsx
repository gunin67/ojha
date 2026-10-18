import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function ContactPage() {
  const { t, setTerminalOpen } = useApp();
  const contact = t.contact;

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("rockstarjaynin@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:rockstarjaynin@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 4000);
  };

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
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md">
              <Mail className="h-4 w-4 text-emerald-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-300">
                {contact.eyebrow}
              </span>
            </div>

            <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {contact.title}
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              {contact.info}
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            {/* Left Column: Direct channels */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="rounded-3xl border border-white/15 bg-neutral-950/70 p-6 sm:p-8 backdrop-blur-2xl">
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
                  Direct Inbox
                </span>

                <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-mono text-neutral-400 uppercase">Primary Email</p>
                    <a
                      href="mailto:rockstarjaynin@gmail.com"
                      className="mt-1 block truncate font-mono text-sm sm:text-base font-semibold text-white hover:text-emerald-400 transition"
                    >
                      rockstarjaynin@gmail.com
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="ml-2 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-neutral-300 transition hover:bg-white hover:text-black"
                    title={contact.copyEmail}
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                {copied && (
                  <p className="mt-2 text-xs font-mono text-emerald-400 text-center animate-pulse">
                    ✓ {contact.copied}
                  </p>
                )}

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                    Gaming & Social Handles
                  </p>
                  {[
                    { label: "YouTube", handle: "@Amazingpro245", url: "https://youtube.com/@Amazingpro245" },
                    { label: "Steam", handle: "ThegamerAmazingpro", url: "https://steamcommunity.com/id/ThegamerAmazingpro/" },
                    { label: "Roblox", handle: "Amazingprohac", url: "https://www.roblox.com/users/2868683169/profile" },
                  ].map((chan) => (
                    <a
                      key={chan.label}
                      href={chan.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2.5 text-xs font-mono text-neutral-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                    >
                      <span>{chan.label}: <strong className="text-white">{chan.handle}</strong></span>
                      <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                    </a>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setTerminalOpen(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 font-mono text-xs text-neutral-300 transition hover:border-emerald-500/40 hover:text-emerald-400"
                  >
                    <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Run 'contact' command in Terminal</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Message Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-7"
            >
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-white/15 bg-neutral-950/80 p-6 sm:p-8 backdrop-blur-2xl space-y-5"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                    Transmission Form
                  </span>
                  <span className="font-mono text-xs text-emerald-400">DIRECT ENCRYPTION</span>
                </div>

                <div>
                  <label className="block mb-2 font-mono text-xs uppercase tracking-wider text-neutral-400">
                    {contact.name}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((curr) => ({ ...curr, name: e.target.value }))}
                    placeholder={contact.placeholderName}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-emerald-400 focus:bg-white/10"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-mono text-xs uppercase tracking-wider text-neutral-400">
                    {contact.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((curr) => ({ ...curr, email: e.target.value }))}
                    placeholder={contact.placeholderEmail}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-emerald-400 focus:bg-white/10"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-mono text-xs uppercase tracking-wider text-neutral-400">
                    {contact.message}
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData((curr) => ({ ...curr, message: e.target.value }))}
                    placeholder={contact.placeholderMessage}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-emerald-400 focus:bg-white/10"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-xs font-mono font-bold text-neutral-950 shadow-xl transition hover:bg-neutral-200 active:scale-95"
                  >
                    <span>{contact.send}</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>

                  {submitted && (
                    <span className="font-mono text-xs text-emerald-400">
                      Opening mail client...
                    </span>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
