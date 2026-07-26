import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlinePlayArrow, MdOutlineStop, MdOutlineRefresh } from "react-icons/md";

/**
 * TimePerceptionDemo — "How long is ten seconds?"
 *
 * The visitor starts the demo, counts ten seconds in their head with no
 * reference, and stops when they think time is up. The gap between felt
 * time and clock time is the point: for many people with dyscalculia or
 * ADHD, that drift is not a party trick — it's every day.
 */

const TARGET = 10;

type Phase = "idle" | "running" | "done";

export function TimePerceptionDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(0);

  const start = () => {
    startRef.current = performance.now();
    setPhase("running");
  };

  const stop = () => {
    const seconds = (performance.now() - startRef.current) / 1000;
    setElapsed(seconds);
    setPhase("done");
  };

  const delta = elapsed - TARGET;
  const abs = Math.abs(delta);
  const close = abs <= 0.75;

  const verdict = close
    ? "Remarkably close — your internal clock is well calibrated."
    : delta < 0
      ? `Your internal clock ran fast — ${abs.toFixed(1)}s early.`
      : `Your internal clock ran slow — ${abs.toFixed(1)}s late.`;

  return (
    <div className="paper-card rounded-[1.75rem] p-8 sm:p-10 relative overflow-hidden">
      <div className="flex items-center justify-between gap-3 mb-8">
        <span className="text-[11px] uppercase tracking-[0.18em] text-ink-muted" style={{ fontWeight: 600 }}>
          An honest experiment
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] bg-primary/10 text-primary" style={{ fontWeight: 600 }}>
          <span className={`h-1.5 w-1.5 rounded-full bg-primary ${phase === "running" ? "animate-pulse" : ""}`} />
          {phase === "running" ? "Counting…" : phase === "done" ? "Result" : "Ready"}
        </span>
      </div>

      <div className="min-h-[170px] flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <p className="font-display text-2xl sm:text-3xl text-ink leading-snug" style={{ fontWeight: 500 }}>
                Feel <span className="numeral" style={{ fontWeight: 560 }}>ten seconds</span> pass.
              </p>
              <p className="mt-3 text-sm text-ink-muted max-w-xs mx-auto leading-relaxed">
                No counting out loud, no looking at a clock. Start, wait until it <em>feels</em> like ten, then stop.
              </p>
            </motion.div>
          )}

          {phase === "running" && (
            <motion.div
              key="running"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center"
            >
              <span className="relative flex h-16 w-16 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/25" />
                <span className="relative inline-flex h-10 w-10 rounded-full bg-primary/60" />
              </span>
              <p className="mt-5 text-sm text-ink-muted italic">…counting in your head…</p>
            </motion.div>
          )}

          {phase === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <div className="flex items-baseline gap-2">
                <span className="numeral text-6xl sm:text-7xl text-ink tabular-nums" style={{ fontWeight: 500 }}>
                  {elapsed.toFixed(1)}
                </span>
                <span className="text-lg text-ink-muted">s</span>
              </div>
              <p className={`mt-3 text-sm max-w-xs ${close ? "text-primary" : "text-ink-soft"}`} style={{ fontWeight: 500 }} aria-live="polite">
                {verdict}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-6">
        {phase === "idle" && (
          <button
            onClick={start}
            className="inline-flex items-center gap-2 h-11 px-7 rounded-full bg-ink text-white text-sm shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lg"
            style={{ fontWeight: 500 }}
          >
            <MdOutlinePlayArrow className="h-4 w-4" />
            Start
          </button>
        )}
        {phase === "running" && (
          <button
            onClick={stop}
            className="inline-flex items-center gap-2 h-11 px-7 rounded-full bg-accent text-white text-sm shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ fontWeight: 500 }}
          >
            <MdOutlineStop className="h-4 w-4" />
            That's ten — stop
          </button>
        )}
        {phase === "done" && (
          <button
            onClick={start}
            className="inline-flex items-center gap-2 h-11 px-7 rounded-full border border-ink/20 bg-white/70 text-ink text-sm transition-all duration-300 hover:bg-white"
            style={{ fontWeight: 500 }}
          >
            <MdOutlineRefresh className="h-4 w-4" />
            Try again
          </button>
        )}
      </div>

      <p className="mt-7 text-xs leading-relaxed text-ink-muted/80 text-center max-w-sm mx-auto">
        A small drift here is normal. When it stretches across a whole day — buses, meetings, timers —
        it has a name: <span className="text-ink" style={{ fontWeight: 500 }}>time-blindness</span>.
      </p>
    </div>
  );
}
