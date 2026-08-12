import { useEffect, useRef, useState, type RefObject } from "react";
import {
  MdOutlineVolumeUp as ListenIcon,
  MdOutlinePause as PauseIcon,
  MdOutlinePlayArrow as PlayIcon,
  MdOutlineStop as StopIcon,
} from "react-icons/md";

/**
 * ListenButton — read-aloud control built on the Web Speech API.
 *
 * Design rules for this audience:
 * - Never autoplays; strictly opt-in.
 * - Playback speed control (0.75x–1.5x) for auditory-processing differences.
 * - Only one ListenButton speaks at a time; starting one stops any other.
 */

const SPEEDS = [1, 1.25, 1.5, 0.75] as const;
const START_EVENT = "cmi:listen-start";

const supported =
  typeof window !== "undefined" && "speechSynthesis" in window;

type PlayState = "idle" | "playing" | "paused";

interface ListenButtonProps {
  /** Explicit text to read. Wins over contentRef when both are given. */
  text?: string;
  /** Element whose innerText should be read (resolved at play time). */
  contentRef?: RefObject<HTMLElement | null>;
  /** Visible label in idle state. */
  label?: string;
  /** Accessible label, e.g. "Listen to Cher's story". */
  ariaLabel?: string;
  className?: string;
}

export function ListenButton({
  text,
  contentRef,
  label = "Listen",
  ariaLabel,
  className = "",
}: ListenButtonProps) {
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [speedIdx, setSpeedIdx] = useState(0);
  const idRef = useRef(Symbol("listen"));
  const activeRef = useRef(false);

  // When another ListenButton starts, this one visually resets.
  useEffect(() => {
    if (!supported) return;
    const onStart = (e: Event) => {
      if ((e as CustomEvent).detail !== idRef.current) {
        activeRef.current = false;
        setPlayState("idle");
      }
    };
    window.addEventListener(START_EVENT, onStart);
    return () => window.removeEventListener(START_EVENT, onStart);
  }, []);

  // Never leave speech running after navigating away.
  useEffect(() => {
    return () => {
      if (activeRef.current) window.speechSynthesis.cancel();
    };
  }, []);

  if (!supported) return null;

  const resolveText = () =>
    (text ?? contentRef?.current?.innerText ?? "").replace(/\s+/g, " ").trim();

  const speak = (rate: number) => {
    const content = resolveText();
    if (!content) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = rate;
    utterance.lang = "en-GB";
    const voice =
      window.speechSynthesis.getVoices().find((v) => v.lang === "en-GB") ??
      window.speechSynthesis.getVoices().find((v) => v.lang.startsWith("en"));
    if (voice) utterance.voice = voice;
    utterance.onend = () => {
      activeRef.current = false;
      setPlayState("idle");
    };
    utterance.onerror = () => {
      activeRef.current = false;
      setPlayState("idle");
    };
    activeRef.current = true;
    window.dispatchEvent(new CustomEvent(START_EVENT, { detail: idRef.current }));
    window.speechSynthesis.speak(utterance);
    setPlayState("playing");
  };

  const toggle = () => {
    if (playState === "idle") {
      speak(SPEEDS[speedIdx]);
    } else if (playState === "playing") {
      window.speechSynthesis.pause();
      setPlayState("paused");
    } else {
      window.speechSynthesis.resume();
      setPlayState("playing");
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    activeRef.current = false;
    setPlayState("idle");
  };

  const cycleSpeed = () => {
    const next = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(next);
    // Web Speech can't change rate mid-utterance — restart with the new speed.
    if (playState !== "idle") speak(SPEEDS[next]);
  };

  const pillBase =
    "inline-flex items-center gap-1.5 rounded-full text-xs transition-colors";
  const idleClasses =
    "border border-ink/15 bg-card/70 px-3.5 py-1.5 text-ink-muted hover:text-ink hover:border-ink/30";

  if (playState === "idle") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={ariaLabel ?? label}
        className={`${pillBase} ${idleClasses} ${className}`}
        style={{ fontWeight: 500 }}
      >
        <ListenIcon className="h-3.5 w-3.5" />
        {label}
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border border-primary/30 bg-primary/[0.07] overflow-hidden ${className}`}
      role="group"
      aria-label={ariaLabel ?? "Audio playback controls"}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label={playState === "playing" ? "Pause" : "Resume"}
        className={`${pillBase} px-3 py-1.5 text-primary hover:bg-primary/10`}
        style={{ fontWeight: 500 }}
      >
        {playState === "playing" ? (
          <PauseIcon className="h-3.5 w-3.5" />
        ) : (
          <PlayIcon className="h-3.5 w-3.5" />
        )}
        {playState === "playing" ? "Pause" : "Resume"}
      </button>
      <button
        type="button"
        onClick={cycleSpeed}
        aria-label={`Playback speed ${SPEEDS[speedIdx]}x — click to change`}
        title="Change playback speed"
        className={`${pillBase} px-2.5 py-1.5 text-primary hover:bg-primary/10 border-l border-primary/20 tabular-nums`}
        style={{ fontWeight: 600 }}
      >
        {SPEEDS[speedIdx]}×
      </button>
      <button
        type="button"
        onClick={stop}
        aria-label="Stop"
        className={`${pillBase} px-2.5 py-1.5 text-primary hover:bg-primary/10 border-l border-primary/20`}
      >
        <StopIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
