"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { PhotoPlate } from "./photo-frame";

const NAME = "I am Sreekar";

function ScanRevealName() {
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(reduceMotion ? 1 : 0);
  const clip = useTransform(
    progress,
    (p) => `inset(0 ${(1 - p) * 100}% 0 0)`,
  );
  const scanLeft = useTransform(progress, (p) => `${p * 100}%`);
  const scanOpacity = useTransform(progress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (reduceMotion) return;
    const controls = animate(progress, 1, {
      duration: 1.3,
      delay: 0.4,
      ease: [0.65, 0, 0.35, 1],
    });
    return () => controls.stop();
  }, [progress, reduceMotion]);

  return (
    <h1
      data-cursor-hover
      className="font-display relative inline-block text-[clamp(2.75rem,7.4vw,6.75rem)] leading-[0.98] font-medium text-white"
    >
      <span aria-hidden className="block text-white/[0.07]">
        {NAME}
      </span>
      <motion.span
        aria-hidden
        style={{ clipPath: clip }}
        className="absolute inset-0 block"
      >
        {NAME}
      </motion.span>
      <motion.span
        aria-hidden
        style={{ left: scanLeft, opacity: scanOpacity }}
        className="absolute top-0 bottom-0 w-[2px] -translate-x-1/2 bg-accent shadow-[0_0_18px_2px_var(--accent)]"
      />
      <span className="sr-only">{NAME}</span>
    </h1>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh overflow-x-clip px-6 pt-24 pb-24 sm:px-10 lg:px-20 lg:pt-28"
    >
      <div
        aria-hidden
        className="bg-blueprint-grid pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_92%)]"
      />
      <div
        aria-hidden
        className="font-display pointer-events-none absolute -top-[6vw] right-[-3vw] -z-10 text-[40vw] leading-none font-medium text-white/[0.025] select-none sm:text-[26vw]"
      >
        01
      </div>

      <div className="relative mx-auto flex max-w-6xl items-center justify-between border-b border-border-fine pb-4 font-mono text-[10px] tracking-[0.3em] text-muted uppercase sm:text-[11px]">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          Portfolio — Live
        </span>
        <span className="absolute left-1/2 hidden -translate-x-1/2 text-muted-dim sm:block">
          Sheet 01 — Journey
        </span>
        <span className="shrink-0 text-muted-dim">N&deg; 2026.08</span>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-y-12 lg:mt-20 lg:grid-cols-12 lg:items-start lg:gap-x-8">
        <div className="min-w-0 lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <ScanRevealName />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-center"
        >
          <PhotoPlate />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 lg:col-start-1 lg:row-start-2"
        >
          <div className="mb-5 flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Currently building at Intellect
            <span className="animate-caret text-accent">_</span>
          </div>

          <div className="flex gap-4">
            <span aria-hidden className="mt-2 flex w-2 flex-col items-center">
              <span className="h-2 w-2 shrink-0 rounded-full border border-accent" />
              <span className="mt-1 w-px flex-1 bg-gradient-to-b from-accent/50 to-transparent" />
            </span>
            <p className="text-balance max-w-md text-lg leading-relaxed font-medium text-accent sm:text-xl">
              curious by nature, relentless in solving problems, and obsessed
              with understanding how things work. I learn fast, research
              deeply, and love turning complex problems into things that
              actually work.
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="mx-auto mt-24 flex max-w-6xl items-center gap-4 text-muted lg:mt-28"
      >
        <span className="[writing-mode:vertical-lr] font-mono text-[11px] tracking-[0.25em] uppercase">
          Scroll
        </span>
        <span className="relative h-14 w-px overflow-hidden bg-border-soft">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-accent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <span className="font-mono text-[11px] tracking-[0.25em] text-muted-dim uppercase">
          The journey begins below
        </span>
      </motion.div>
    </section>
  );
}
