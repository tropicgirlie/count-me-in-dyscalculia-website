import { useEffect, useRef, useState } from "react";
import {
  MdOutlinePlayCircle as PlayIcon,
  MdOutlinePauseCircle as PauseIcon,
  MdOutlineClose as CloseIcon,
} from "react-icons/md";

/**
 * AudioWelcome — pre-narrated homepage intro with a mini-player.
 *
 * The narration is a real recorded voice (generated externally, e.g. HeyGen),
 * expected at /audio/homepage-intro.mp3. The component stays dormant —
 * renders nothing — until that file exists, so it can ship before the
 * audio does.
 *
 * Unlike the Web Speech API ListenButton, this uses an <audio> element,
 * so playback speed changes apply live without restarting.
 */

const SRC = "/audio/homepage-intro.mp3";
const SPEEDS = [1, 1.25, 1.5, 0.75] as const;

function formatTime(t: number) {
  if (!Number.isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioWelcome() {
  const [available, setAvailable] = useState(false);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speedIdx, setSpeedIdx] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Dormancy check: only appear once the narration file actually exists.
  // Content-Type guards against SPA fallbacks returning index.html with 200.
  useEffect(() => {
    let alive = true;
    fetch(SRC, { method: "HEAD" })
      .then((r) => {
        const ct = r.headers.get("content-type") ?? "";
        if (alive && r.ok && ct.includes("audio")) setAvailable(true);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // Wire up the audio element once available.
  useEffect(() => {
    if (!available) return;
    const audio = new Audio(SRC);
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTime = () => setTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
      audioRef.current = null;
    };
  }, [available]);

  // Speed changes apply live — no restart.
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[speedIdx];
  }, [speedIdx]);

  if (!available) return null;

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  const openPlayer = () => {
    setOpen(true);
    // Start on open — the visitor explicitly asked to listen.
    const audio = audioRef.current;
    if (audio && !playing) {
      audio.play();
      setPlaying(true);
    }
  };

  const close = () => {
    audioRef.current?.pause();
    setPlaying(false);
    setOpen(false);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = barRef.current;
    if (!audio || !bar || !duration) return;
    const ratio = (e.clientX - bar.getBoundingClientRect().left) / bar.offsetWidth;
    audio.currentTime = Math.min(Math.max(ratio, 0), 1) * duration;
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={openPlayer}
        className="inline-flex h-12 items-center justify-center gap-2 px-3 text-sm text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
      >
        <PlayIcon className="h-4 w-4" />
        Listen to a short welcome
      </button>
    );
  }

  return (
    <div
      role="region"
      aria-label="Audio welcome player"
      className="fixed bottom-5 left-5 z-50 w-[300px] max-w-[calc(100vw-2.5rem)] paper-card rounded-2xl p-4 shadow-elevated"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause narration" : "Play narration"}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-ink-soft"
        >
          {playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] text-ink" style={{ fontWeight: 600 }}>
            A welcome to Count Me In
          </p>
          <p className="text-[11px] text-ink-muted tabular-nums">
            {formatTime(time)} / {formatTime(duration)}
          </p>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close player"
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={barRef}
        onClick={seek}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(time)}
        className="mt-3 h-1.5 cursor-pointer rounded-full bg-ink/10"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-150"
          style={{ width: duration ? `${(time / duration) * 100}%` : "0%" }}
        />
      </div>

      <div className="mt-2.5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setSpeedIdx((i) => (i + 1) % SPEEDS.length)}
          aria-label={`Playback speed ${SPEEDS[speedIdx]}x — click to change`}
          className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[11px] text-ink-muted tabular-nums transition-colors hover:border-ink/30 hover:text-ink"
          style={{ fontWeight: 600 }}
        >
          {SPEEDS[speedIdx]}×
        </button>
        <span className="text-[11px] text-ink-muted">Narrated welcome · optional audio</span>
      </div>
    </div>
  );
}
