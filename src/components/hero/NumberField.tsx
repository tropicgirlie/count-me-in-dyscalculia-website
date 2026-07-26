import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * NumberField — the signature hero visual.
 *
 * Serif numerals drift, rotate and quietly swap value — a felt sense of
 * "numbers can move". When `held` is true they spring into a calm, aligned
 * grid: "support can hold them still".
 */

interface DigitConfig {
  id: number;
  char: string;
  /** scattered home position, as fraction of container */
  hx: number;
  hy: number;
  size: number;
  driftX: number;
  driftY: number;
  rotate: number;
  duration: number;
  delay: number;
  opacity: number;
}

const DIGITS = "274815963078312549";

function scatterPosition(i: number): { hx: number; hy: number } {
  // Keep the left-bottom quadrant calmer so hero copy stays legible.
  const col = i % 6;
  const row = Math.floor(i / 6);
  const jx = ((i * 37) % 10) / 10 - 0.5;
  const jy = ((i * 53) % 10) / 10 - 0.5;
  return {
    hx: 0.34 + col * 0.115 + jx * 0.06,
    hy: 0.10 + row * 0.30 + jy * 0.14,
  };
}

function gridPosition(i: number): { gx: number; gy: number } {
  // Tidy 6 × 3 grid docked to the right of the hero.
  const col = i % 6;
  const row = Math.floor(i / 6);
  return {
    gx: 0.40 + col * 0.10,
    gy: 0.22 + row * 0.24,
  };
}

export function NumberField({ held }: { held: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1200, h: 700 });
  const reduceMotion = useReducedMotion();

  const digits = useMemo<DigitConfig[]>(
    () =>
      DIGITS.split("").map((char, i) => {
        const { hx, hy } = scatterPosition(i);
        return {
          id: i,
          char,
          hx,
          hy,
          size: 34 + ((i * 29) % 46),
          driftX: 14 + ((i * 17) % 26),
          driftY: 12 + ((i * 23) % 24),
          rotate: ((i * 41) % 24) - 12,
          duration: 7 + ((i * 13) % 8),
          delay: (i % 5) * 0.35,
          opacity: 0.16 + ((i * 7) % 10) / 34,
        };
      }),
    []
  );

  // Occasionally swap one digit's value while drifting.
  const [chars, setChars] = useState<string[]>(DIGITS.split(""));
  useEffect(() => {
    if (held || reduceMotion) return;
    const id = window.setInterval(() => {
      setChars((prev) => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        next[idx] = String(Math.floor(Math.random() * 10));
        return next;
      });
    }, 1600);
    return () => window.clearInterval(id);
  }, [held, reduceMotion]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const heldMode = held || reduceMotion;

  return (
    <div ref={containerRef} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {digits.map((d, i) => {
        const { gx, gy } = gridPosition(i);
        const homeX = d.hx * size.w;
        const homeY = d.hy * size.h;
        const gridX = gx * size.w;
        const gridY = gy * size.h;

        return (
          <motion.span
            key={d.id}
            className="numeral absolute top-0 left-0 select-none text-ink"
            style={{
              fontSize: d.size,
              willChange: "transform",
              filter: heldMode ? "none" : i % 4 === 0 ? "blur(1.5px)" : "none",
            }}
            initial={{ x: homeX, y: homeY, rotate: d.rotate, opacity: 0 }}
            animate={
              heldMode
                ? {
                    x: [gridX],
                    y: [gridY],
                    rotate: 0,
                    opacity: 0.5,
                  }
                : {
                    x: [homeX, homeX + d.driftX, homeX - d.driftX * 0.7, homeX],
                    y: [homeY, homeY - d.driftY, homeY + d.driftY * 0.8, homeY],
                    rotate: [d.rotate, d.rotate + 8, d.rotate - 6, d.rotate],
                    opacity: [d.opacity, d.opacity * 0.55, d.opacity, d.opacity * 0.8],
                  }
            }
            transition={
              heldMode
                ? {
                    type: "spring",
                    stiffness: 60,
                    damping: 16,
                    delay: i * 0.035,
                    opacity: { duration: 0.5, delay: i * 0.035 },
                  }
                : {
                    duration: d.duration,
                    delay: d.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    opacity: { duration: 0.9, delay: d.delay },
                  }
            }
          >
            {heldMode ? d.char : chars[i]}
          </motion.span>
        );
      })}
    </div>
  );
}
