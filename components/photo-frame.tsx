"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const CORNER_CLASSES = [
  "top-3 left-3 border-t border-l",
  "top-3 right-3 border-t border-r",
  "bottom-3 left-3 border-b border-l",
  "bottom-3 right-3 border-b border-r",
];

export function PhotoFrame() {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [7, -7]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-7, 7]),
    springConfig,
  );
  const glowX = useTransform(mouseX, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(mouseY, [0, 1], ["10%", "90%"]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    mouseX.set((event.clientX - bounds.left) / bounds.width);
    mouseY.set((event.clientY - bounds.top) / bounds.height);
  }

  function handlePointerLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <div className="relative mx-auto w-full max-w-sm sm:max-w-md">
      <div
        aria-hidden
        className="absolute inset-6 -z-10 rounded-[2.5rem] bg-accent/25 blur-3xl"
      />

      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="group relative aspect-[4/5] w-full [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
          <div
            className="motion-safe:animate-spin-slow absolute inset-[-40%]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, var(--accent) 8%, transparent 18%, transparent 100%)",
            }}
          />
        </div>

        <div className="absolute inset-[1.5px] overflow-hidden rounded-[calc(2rem-1.5px)] border border-border-soft bg-gradient-to-br from-background-elevated via-background to-background">
          <motion.div
            aria-hidden
            className="absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(320px circle at ${glowX} ${glowY}, var(--accent-dim), transparent 70%)`,
            }}
          />

          <div className="absolute inset-0 bg-dot-pattern opacity-20" />

          <div className="relative flex h-full w-full items-center justify-center">
            <svg
              viewBox="0 0 200 200"
              className="h-[62%] w-[62%] text-muted-dim"
              fill="none"
            >
              <circle cx="100" cy="72" r="38" fill="currentColor" opacity="0.5" />
              <path
                d="M30 190c6-48 40-78 70-78s64 30 70 78"
                fill="currentColor"
                opacity="0.5"
              />
            </svg>
          </div>

          {CORNER_CLASSES.map((corner) => (
            <span
              key={corner}
              className={`absolute h-6 w-6 border-accent/70 ${corner}`}
            />
          ))}
        </div>
      </motion.div>

      <div className="mt-5 flex items-center justify-between text-xs text-muted">
        <span className="font-mono tracking-wide">PHOTO — PLACEHOLDER</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          swap in /public
        </span>
      </div>
    </div>
  );
}
