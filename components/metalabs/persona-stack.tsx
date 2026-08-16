"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PERSONA_COUNT, personaPages } from "@/lib/metalabs";

const CYCLE_MS = 4200;
/** how many cards peek out behind the front one */
const DEPTH = 3;

export function PersonaStack() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  const advance = useCallback(
    (delta = 1) => setIndex((i) => (i + delta + PERSONA_COUNT) % PERSONA_COUNT),
    [],
  );

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = window.setInterval(() => advance(1), CYCLE_MS);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [paused, advance]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="mb-3 flex shrink-0 items-baseline justify-between">
        <span className="label text-bone-dim">User Personas</span>
        <span className="label tabular-nums text-bone-faint">
          <span className="text-ml-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          {" / "}
          {String(PERSONA_COUNT).padStart(2, "0")}
        </span>
      </div>

      <div
        className="relative aspect-[16/10] w-full md:aspect-auto md:min-h-0 md:flex-1"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* the stack — cards behind signal that more personas exist */}
        {Array.from({ length: DEPTH + 1 }).map((_, depth) => {
          const i = (index + depth) % PERSONA_COUNT;
          const front = depth === 0;
          return (
            <motion.div
              key={depth}
              aria-hidden={!front}
              initial={false}
              animate={{
                y: depth * -10,
                x: depth * 14,
                scale: 1 - depth * 0.035,
                opacity: front ? 1 : 0.34 - depth * 0.07,
              }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ zIndex: DEPTH - depth }}
              className="absolute inset-0 overflow-hidden rounded-sm border border-hair bg-white shadow-2xl shadow-black/60"
            >
              <Image
                src={personaPages[i]}
                alt={
                  front
                    ? `User persona ${i + 1} of ${PERSONA_COUNT}`
                    : ""
                }
                fill
                sizes="(max-width: 1024px) 90vw, 46vw"
                className="object-contain"
                priority={depth === 0 && index === 0}
              />
            </motion.div>
          );
        })}

        {/* click surface: advances the stack */}
        <button
          type="button"
          onClick={() => advance(1)}
          data-cursor
          data-cursor-label="Next persona"
          aria-label={`Show next user persona. Currently ${index + 1} of ${PERSONA_COUNT}.`}
          className="absolute inset-0 z-10 cursor-pointer"
          style={{ zIndex: DEPTH + 1 }}
        />
      </div>

      <div className="mt-3 flex shrink-0 items-center justify-between">
        <div className="flex gap-1.5">
          {personaPages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to persona ${i + 1}`}
              className="cursor-pointer py-2"
            >
              <span
                className={`block h-0.5 w-5 transition-colors ${
                  i === index ? "bg-ml-accent" : "bg-hair"
                }`}
              />
            </button>
          ))}
        </div>
        <span className="label text-bone-faint">
          {paused ? "Paused" : "Auto"}
        </span>
      </div>
    </div>
  );
}
