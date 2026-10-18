import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, ExternalLink, ShieldCheck, Flame } from "lucide-react";

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  title?: string;
  subtitle?: string;
}

export default function VideoPlayer({
  src = "/1015(3).mp4",
  poster = "/image copy.png",
  title = "Rivals Knife Only — Competitive Montage",
  subtitle = "High-velocity knife combat & reaction mechanics in Roblox Rivals",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);

  // Play / Pause toggle
  const togglePlay = () => {
    if (!videoRef.current || hasError) {
      setIsPlaying((p) => !p);
      return;
    }
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        setHasError(true);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Update progress
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      className="group relative overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/80 shadow-[0_24px_70px_rgba(0,0,0,0.6)] backdrop-blur-md"
    >
      {/* Top HUD Frame */}
      <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900/60 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
          </span>
          <span className="font-semibold text-white">REC • 60 FPS</span>
          <span className="hidden sm:inline text-neutral-500">|</span>
          <span className="hidden sm:inline text-neutral-300">ROBLOX RIVALS</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>RANK: MASTER</span>
          </span>
          <a
            href="https://youtube.com/@Amazingpro245"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-white transition hover:bg-white/20"
          >
            <span>@Amazingpro245</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Main Video Viewport */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
        {!hasError ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => setHasError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          /* High-Fidelity Animated Simulation Fallback when raw video pointer needs YouTube / Simulation */
          <div className="relative h-full w-full overflow-hidden">
            <img
              src={poster}
              alt={title}
              className="h-full w-full object-cover filter brightness-[0.7] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
            <div className="scanlines absolute inset-0 opacity-40" />

            {/* Simulated Live Killfeed and HUD */}
            <div className="absolute right-4 top-4 space-y-1.5 font-mono text-[10px]">
              <div className="flex items-center gap-2 rounded bg-neutral-900/80 px-2.5 py-1 text-emerald-400 border border-emerald-500/20 backdrop-blur-sm">
                <span>⚔️ Gunin_Knife [KNIFE]</span>
                <span className="text-neutral-400">Opponent_01</span>
                <span className="rounded bg-emerald-500/20 px-1 text-[9px] text-emerald-300">+100 PTS</span>
              </div>
              <div className="flex items-center gap-2 rounded bg-neutral-900/80 px-2.5 py-1 text-emerald-400 border border-emerald-500/20 backdrop-blur-sm">
                <span>⚔️ Gunin_Knife [HEADSHOT]</span>
                <span className="text-neutral-400">Rival_Sniper</span>
                <span className="rounded bg-amber-500/20 px-1 text-[9px] text-amber-300">STREAK x3</span>
              </div>
            </div>

            {/* Center Callout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs text-amber-300 backdrop-blur-md">
                <Flame className="h-4 w-4 animate-bounce" />
                <span>Rivals Montage • 1015 Gameplay Recording</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Knife Only • Tournament Montage
              </h3>
              <p className="mt-2 max-w-lg text-xs sm:text-sm text-neutral-300">
                Showcasing lightning reaction speed, flick accuracy, and momentum-based movement in high-pressure matches.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://youtube.com/@Amazingpro245"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition hover:bg-rose-500 hover:scale-105 active:scale-95"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Watch on YouTube (@Amazingpro245)</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Ambient Dark Gradient Bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

        {/* Big Center Play Trigger (when paused) */}
        {!isPlaying && !hasError && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition hover:bg-black/30"
            aria-label="Play video"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-neutral-950 shadow-2xl transition hover:scale-110 active:scale-95">
              <Play className="h-7 w-7 fill-current translate-x-0.5" />
            </div>
          </button>
        )}

        {/* Overlay Controls */}
        <div
          className={`absolute inset-x-0 bottom-0 p-4 transition-opacity duration-300 ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Progress scrubber */}
          <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full bg-emerald-400 transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 backdrop-blur-md transition hover:bg-white/25 text-white"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 backdrop-blur-md transition hover:bg-white/25 text-white"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>

              <div className="text-xs font-mono text-neutral-300 hidden sm:block">
                <span>{title}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label="Toggle Fullscreen"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 backdrop-blur-md transition hover:bg-white/25 text-white"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Details Card Footer */}
      <div className="p-4 sm:p-5 bg-neutral-950/70 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h4 className="font-display text-lg font-semibold text-white">{title}</h4>
          <p className="text-xs text-neutral-400 mt-0.5">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-neutral-300">
            Source: 1015(3).mp4
          </span>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-400">
            Verified Play
          </span>
        </div>
      </div>
    </div>
  );
}
