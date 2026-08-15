"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const CHAMFER = 36;
const CLIP_OUTER = `polygon(0 0, 100% 0, 100% 100%, ${CHAMFER}px 100%, 0 calc(100% - ${CHAMFER}px))`;
const CLIP_INNER = `polygon(0 0, 100% 0, 100% 100%, ${CHAMFER - 2}px 100%, 0 calc(100% - ${CHAMFER - 2}px))`;

export function PhotoPlate() {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [5, -5]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-5, 5]),
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
    <div data-cursor-hover className="relative mx-auto w-full max-w-md">
      <div
        aria-hidden
        className="absolute inset-8 -z-10 bg-accent/20 blur-3xl"
      />

      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="group relative aspect-[4/5] w-full [transform-style:preserve-3d]"
      >
        {/* rotating trace sweep, clipped to the chamfered plate */}
        <div
          className="absolute inset-0"
          style={{ clipPath: CLIP_OUTER }}
        >
          <div
            className="motion-safe:animate-spin-slow absolute inset-[-40%]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, var(--accent) 6%, transparent 16%, transparent 100%)",
            }}
          />
        </div>

        {/* plate body */}
        <div
          className="absolute inset-[1.5px] overflow-hidden border border-border-soft bg-gradient-to-br from-background-elevated via-background to-background"
          style={{ clipPath: CLIP_INNER }}
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(340px circle at ${glowX} ${glowY}, var(--accent-dim), transparent 70%)`,
            }}
          />

          {/* ruler ticks — top and left edges */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-3 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, var(--foreground) 0 1px, transparent 1px 24px)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-3 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, var(--foreground) 0 1px, transparent 1px 24px)",
            }}
          />

          {/* subject placeholder — line-art silhouette */}
          <div className="relative flex h-full w-full items-center justify-center">
            <svg
              viewBox="0 0 200 200"
              className="h-[56%] w-[56%] text-muted-dim"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.25}
            >
              <circle cx="100" cy="72" r="38" opacity="0.6" />
              <path
                d="M30 190c6-48 40-78 70-78s64 30 70 78"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* crosshair reticle, revealed on hover */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="absolute h-px w-10 bg-accent/70" />
            <span className="absolute h-10 w-px bg-accent/70" />
            <span className="absolute h-2 w-2 rounded-full border border-accent" />
          </div>
        </div>
      </motion.div>

      <div className="mt-5 flex items-center justify-between font-mono text-[11px] tracking-[0.15em] text-muted uppercase">
        <span>Fig. 01 — Subject</span>
        <span className="flex items-center gap-1.5 text-muted-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Replace in /public
        </span>
      </div>
    </div>
  );
}
