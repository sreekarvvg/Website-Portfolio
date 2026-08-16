"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Per-character mask reveal: each glyph rides up from behind a clipped line,
 * so the type assembles rather than fading in. Semantics stay intact — the
 * accessible name is the plain string, the split is aria-hidden.
 */
export function KineticHeading({
  text,
  className = "",
  delay = 0,
  stagger = 0.035,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  // `initial` must stay identical between server and client render, so the
  // reduced-motion preference collapses the transition instead of swapping
  // the starting style — branching on it here causes a hydration mismatch,
  // since the server always resolves it to `false`.
  const reduce = useReducedMotion();
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex flex-wrap">
        {words.map((word, w) => (
          <span
            key={`${word}-${w}`}
            className="mr-[0.24em] inline-flex overflow-hidden pb-[0.12em] last:mr-0"
          >
            {Array.from(word).map((char, c) => {
              const i = charIndex++;
              return (
                <motion.span
                  key={`${char}-${c}`}
                  className="inline-block will-change-transform"
                  initial={{ y: "115%", rotate: 4 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          duration: 1.05,
                          delay: delay + i * stagger,
                          ease: [0.16, 1, 0.3, 1],
                        }
                  }
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </span>
    </span>
  );
}
