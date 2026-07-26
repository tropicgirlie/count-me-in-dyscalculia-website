import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "./ui/button";
import { MdArrowForward, MdCheck } from "react-icons/md";

/**
 * WorkingMemorySimulator — an interactive felt-sense demo.
 *
 * The visitor tries to hold "27 + 48" in mind while the digits drift,
 * swap and fade. Each scaffold they switch on moves a piece of the memory
 * load out of the head and onto the page.
 */

interface Scaffold {
  key: "color" | "placeValue" | "boundaries" | "steps";
  label: string;
  hint: string;
}

const SCAFFOLDS: Scaffold[] = [
  { key: "color", label: "Color-code groups", hint: "Tens and ones get their own colors" },
  { key: "placeValue", label: "Keep place value visible", hint: "Column labels stay on the page" },
  { key: "boundaries", label: "Use clear boundaries", hint: "Each digit gets a stable container" },
  { key: "steps", label: "Move one step at a time", hint: "The path to 75 is written down" },
];

const STEPS = [
  { label: "Step 1", text: "Add the tens", math: "20 + 40 = 60" },
  { label: "Step 2", text: "Add the ones", math: "7 + 8 = 15" },
  { label: "Step 3", text: "Bring them together", math: "60 + 15 = 75" },
];

function DriftingDigit({
  digit,
  index,
  supported,
  colored,
  bounded,
}: {
  digit: string;
  index: number;
  supported: boolean;
  colored: boolean;
  bounded: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const drift = !supported && !reduceMotion;

  const colorClass = colored
    ? index % 2 === 0
      ? "text-primary"
      : "text-accent"
    : "text-ink";

  return (
    <motion.span
      className={`
        numeral inline-flex items-center justify-center text-5xl sm:text-6xl
        ${colorClass}
        ${bounded ? "rounded-2xl border border-ink/15 bg-card/80 shadow-sm w-16 h-20 sm:w-20 sm:h-24" : "w-12 sm:w-14"}
      `}
      style={{ fontWeight: 480 }}
      layout
      animate={
        drift
          ? {
              y: [0, -5 - index * 1.5, 4, 0],
              rotate: [0, index % 2 === 0 ? 4 : -5, index % 2 === 0 ? -3 : 4, 0],
              opacity: [1, 0.55, 0.9, 0.7],
            }
          : { y: 0, rotate: 0, opacity: 1 }
      }
      transition={
        drift
          ? { duration: 5 + index * 1.1, repeat: Infinity, ease: "easeInOut" }
          : { type: "spring", stiffness: 220, damping: 22 }
      }
    >
      {digit}
    </motion.span>
  );
}

export function WorkingMemorySimulator() {
  const [active, setActive] = useState<Record<Scaffold["key"], boolean>>({
    color: false,
    placeValue: false,
    boundaries: false,
    steps: false,
  });

  const count = Object.values(active).filter(Boolean).length;
  const supported = count > 0;

  const statusText =
    count === 0
      ? "Everything is held in your head."
      : count < 4
        ? `${count} of 4 supports active — feel the load shift.`
        : "Fully scaffolded — the memory load lives on the page.";

  return (
    <section className="bg-background py-20 lg:py-28 overflow-hidden">
      <div className="container-custom">
        <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Copy + controls */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0 space-y-6"
          >
            <p className="text-xs uppercase tracking-widest text-primary" style={{ fontWeight: 600 }}>
              Inside the calculation
            </p>
            <div className="space-y-4">
              <h2 className="font-display text-3xl tracking-tight text-ink lg:text-5xl lg:max-w-lg" style={{ fontWeight: 520 }}>
                Working memory is the quiet workspace.
              </h2>
              <p className="text-ink-muted leading-relaxed max-w-xl">
                Try holding <span className="numeral text-ink" style={{ fontWeight: 520 }}>27 + 48</span> in your head.
                Then switch on the supports and watch the work move out of your mind and onto the page — that shift is the whole idea.
              </p>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2">
              {SCAFFOLDS.map((s) => {
                const on = active[s.key];
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setActive((prev) => ({ ...prev, [s.key]: !prev[s.key] }))}
                    aria-pressed={on}
                    className={`
                      group relative rounded-xl px-4 py-3.5 text-left transition-all duration-300 border
                      ${on
                        ? "bg-ink text-white border-ink shadow-lg"
                        : "paper-card text-ink hover:-translate-y-0.5 hover:shadow-custom border-transparent"
                      }
                    `}
                  >
                    <span className="flex items-start justify-between gap-2">
                      <span className="text-sm" style={{ fontWeight: 600 }}>{s.label}</span>
                      <span
                        className={`
                          mt-0.5 flex h-4.5 w-4.5 h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-all duration-300
                          ${on ? "bg-primary border-primary" : "border-ink/25 group-hover:border-ink/50"}
                        `}
                      >
                        {on && <MdCheck className="h-3 w-3 text-white" />}
                      </span>
                    </span>
                    <span className={`mt-1 block text-xs leading-relaxed ${on ? "text-white/65" : "text-ink-muted"}`}>
                      {s.hint}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-sm text-ink-muted italic" aria-live="polite">{statusText}</p>

            <Link to="/self-check">
              <Button variant="outline" className="border-ink/20 text-ink hover:bg-ink/5">
                Try the self-check
                <MdArrowForward className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Simulator stage */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="min-w-0"
          >
            <div className="paper-surface rounded-[1.75rem] p-6 sm:p-10 relative overflow-hidden">
              {/* header */}
              <div className="flex items-center justify-between gap-3 mb-8">
                <span className="text-[11px] uppercase tracking-[0.18em] text-ink-muted" style={{ fontWeight: 600 }}>
                  Mental math, felt
                </span>
                <span
                  className={`
                    inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] transition-colors duration-500
                    ${supported ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}
                  `}
                  style={{ fontWeight: 600 }}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${supported ? "bg-primary" : "bg-accent animate-pulse"}`} />
                  {supported ? "Supported" : "Unassisted"}
                </span>
              </div>

              {/* place-value labels */}
              <div className="flex justify-center">
                <div className="flex items-end gap-3 sm:gap-4">
                  <div className="flex gap-3 sm:gap-4">
                    {["TENS", "ONES"].map((label, i) => (
                      <div key={label} className="w-12 sm:w-14 flex justify-center" style={{ width: active.boundaries ? undefined : undefined }}>
                        <AnimatePresence>
                          {active.placeValue && (
                            <motion.span
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 4 }}
                              className={`text-[10px] tracking-[0.2em] mb-2 ${active.color ? (i === 0 ? "text-primary" : "text-accent") : "text-ink-muted"}`}
                              style={{ fontWeight: 700 }}
                            >
                              {label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                  <span className="w-8" />
                  <div className="flex gap-3 sm:gap-4">
                    {["TENS", "ONES"].map((label, i) => (
                      <div key={label} className="w-12 sm:w-14 flex justify-center">
                        <AnimatePresence>
                          {active.placeValue && (
                            <motion.span
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 4 }}
                              className={`text-[10px] tracking-[0.2em] mb-2 ${active.color ? (i === 0 ? "text-primary" : "text-accent") : "text-ink-muted"}`}
                              style={{ fontWeight: 700 }}
                            >
                              {label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* the calculation */}
              <div className="flex justify-center items-center mt-1">
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* 27 */}
                  <div className={`flex gap-3 sm:gap-4 ${active.placeValue ? "relative" : ""}`}>
                    <DriftingDigit digit="2" index={0} supported={supported} colored={active.color} bounded={active.boundaries} />
                    <DriftingDigit digit="7" index={1} supported={supported} colored={active.color} bounded={active.boundaries} />
                    {active.placeValue && (
                      <motion.span
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute -bottom-3 left-0 right-0 h-px bg-ink/15"
                      />
                    )}
                  </div>

                  <motion.span
                    layout
                    className="numeral text-3xl sm:text-4xl text-ink-muted w-8 text-center"
                    animate={{ opacity: supported ? 1 : [1, 0.4, 1] }}
                    transition={supported ? { duration: 0.3 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    +
                  </motion.span>

                  {/* 48 */}
                  <div className={`flex gap-3 sm:gap-4 ${active.placeValue ? "relative" : ""}`}>
                    <DriftingDigit digit="4" index={2} supported={supported} colored={active.color} bounded={active.boundaries} />
                    <DriftingDigit digit="8" index={3} supported={supported} colored={active.color} bounded={active.boundaries} />
                    {active.placeValue && (
                      <motion.span
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute -bottom-3 left-0 right-0 h-px bg-ink/15"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* steps */}
              <div className="mt-10 min-h-[120px]">
                <AnimatePresence mode="wait">
                  {active.steps ? (
                    <motion.ol
                      key="steps"
                      initial="hidden"
                      animate="show"
                      exit={{ opacity: 0, y: -8 }}
                      variants={{ show: { transition: { staggerChildren: 0.18 } } }}
                      className="space-y-2.5 max-w-sm mx-auto"
                    >
                      {STEPS.map((step, i) => (
                        <motion.li
                          key={step.label}
                          variants={{
                            hidden: { opacity: 0, x: -14 },
                            show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                          }}
                          className="flex items-center gap-4 rounded-xl bg-card/75 border border-ink/10 px-4 py-3"
                        >
                          <span className="text-[10px] uppercase tracking-[0.16em] text-ink-muted w-14 shrink-0" style={{ fontWeight: 700 }}>
                            {step.label}
                          </span>
                          <span className="text-sm text-ink-soft flex-1">{step.text}</span>
                          <span className={`numeral text-lg ${i === 1 && active.color ? "text-accent" : i !== 1 && active.color ? "text-primary" : "text-ink"}`} style={{ fontWeight: 560 }}>
                            {step.math}
                          </span>
                        </motion.li>
                      ))}
                    </motion.ol>
                  ) : (
                    <motion.p
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-sm text-ink-muted/70 italic pt-6"
                    >
                      {supported
                        ? "The digits are steadier — but the steps still live in your head."
                        : "Hold each piece in mind… don't let the 7 slip."}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
