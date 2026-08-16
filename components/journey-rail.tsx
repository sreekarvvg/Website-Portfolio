"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { milestones } from "@/lib/milestones";
import { Magnetic } from "./magnetic";
import { MilestoneRecord } from "./milestone-record";

/** Node positions along the rail — the journey ascends left to right. */
const VIEW = { w: 1000, h: 260 };
const NODES = [
  { x: 70, y: 196 },
  { x: 300, y: 150 },
  { x: 520, y: 168 },
  { x: 745, y: 104 },
  { x: 940, y: 52 },
];

const RAIL_PATH = NODES.reduce((d, p, i) => {
  if (i === 0) return `M ${p.x} ${p.y}`;
  const prev = NODES[i - 1];
  const dx = (p.x - prev.x) / 2;
  return `${d} C ${prev.x + dx} ${prev.y}, ${p.x - dx} ${p.y}, ${p.x} ${p.y}`;
}, "");

export function JourneyRail() {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const headingId = useId();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [60, 0]);

  const activeMilestone = milestones.find((m) => m.id === active) ?? null;

  // Colour as narrative spine: the live accent follows the story.
  useEffect(() => {
    const focus = milestones.find((m) => m.id === (hovered ?? active));
    document.documentElement.style.setProperty(
      "--accent",
      focus ? focus.hue : "var(--s1)",
    );
  }, [hovered, active]);

  function toggle(id: string) {
    setActive((cur) => (cur === id ? null : id));
  }

  return (
    <section
      ref={sectionRef}
      id="journey"
      aria-labelledby={headingId}
      className="relative overflow-x-clip px-6 pb-32 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div style={{ y: headingY }} className="max-w-2xl">
          <span className="label text-bone-faint">The Journey</span>
          <h2
            id={headingId}
            className="font-display mt-5 text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.02em] text-bone"
          >
            Five milestones,
            <br />
            <span className="italic text-bone-dim">one throughline</span>
          </h2>
        </motion.div>

        {/* ── Rail (tablet + desktop) ────────────────────── */}
        <div className="mt-24 hidden md:block">
          <div className="relative aspect-[1000/260] w-full">
            <svg
              viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
              className="absolute inset-0 h-full w-full overflow-visible"
              aria-hidden
            >
              <defs>
                <linearGradient id="rail-spectrum" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--s1)" />
                  <stop offset="27%" stopColor="var(--s2)" />
                  <stop offset="52%" stopColor="var(--s3)" />
                  <stop offset="76%" stopColor="var(--s4)" />
                  <stop offset="100%" stopColor="var(--s5)" />
                </linearGradient>
                <filter id="rail-glow" x="-20%" y="-40%" width="140%" height="180%">
                  <feGaussianBlur stdDeviation="6" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* dormant track */}
              <path
                d={RAIL_PATH}
                fill="none"
                stroke="var(--hair)"
                strokeWidth={1}
              />

              {/* spectrum trace, drawn on scroll */}
              <motion.path
                d={RAIL_PATH}
                fill="none"
                stroke="url(#rail-spectrum)"
                strokeWidth={1.5}
                strokeLinecap="round"
                filter="url(#rail-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  pathLength: { duration: 2, ease: [0.65, 0, 0.35, 1] },
                  opacity: { duration: 0.4 },
                }}
              />

              {/* vertical drops connect each node to its label */}
              {NODES.map((n, i) => (
                <motion.line
                  key={i}
                  x1={n.x}
                  y1={n.y}
                  x2={n.x}
                  y2={VIEW.h}
                  stroke="var(--hair-faint)"
                  strokeWidth={1}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.9 + i * 0.09 }}
                />
              ))}
            </svg>

            {/* nodes, positioned over the svg in percentage space */}
            <ol className="absolute inset-0">
              {milestones.map((m, i) => {
                const isActive = active === m.id;
                const isHovered = hovered === m.id;
                const lifted = isActive || isHovered;
                return (
                  <li
                    key={m.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${(NODES[i].x / VIEW.w) * 100}%`,
                      top: `${(NODES[i].y / VIEW.h) * 100}%`,
                    }}
                  >
                    <Magnetic strength={0.3}>
                      <button
                        type="button"
                        data-cursor
                        data-cursor-label={isActive ? "Close" : "Open"}
                        data-cursor-hue={m.hue}
                        onClick={() => toggle(m.id)}
                        onPointerEnter={() => setHovered(m.id)}
                        onPointerLeave={() => setHovered(null)}
                        onFocus={() => setHovered(m.id)}
                        onBlur={() => setHovered(null)}
                        aria-expanded={isActive}
                        aria-controls={`${headingId}-record`}
                        aria-label={`${m.index} — ${m.title}, ${m.period}. ${m.essence}.`}
                        className="group relative flex h-20 w-20 cursor-pointer items-center justify-center"
                      >
                        {/* halo */}
                        <motion.span
                          aria-hidden
                          className="absolute rounded-full"
                          animate={{
                            width: lifted ? 68 : 0,
                            height: lifted ? 68 : 0,
                            opacity: lifted ? 1 : 0,
                          }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          style={{
                            background: `radial-gradient(circle, ${m.hue}2e, transparent 70%)`,
                          }}
                        />
                        {/* ring */}
                        <motion.span
                          aria-hidden
                          className="absolute rounded-full border"
                          animate={{
                            width: lifted ? 34 : 20,
                            height: lifted ? 34 : 20,
                            borderColor: lifted ? m.hue : "rgba(255,255,255,0.22)",
                          }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        />
                        {/* core */}
                        <motion.span
                          aria-hidden
                          className="relative rounded-full"
                          animate={{
                            width: isActive ? 14 : 6,
                            height: isActive ? 14 : 6,
                            backgroundColor: lifted ? m.hue : "var(--bone-faint)",
                          }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </button>
                    </Magnetic>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Labels hang from a shared baseline, like a chart axis — each is
              tied back to its node by the drop line above. */}
          <div className="relative h-24">
            {milestones.map((m, i) => {
              const lifted = active === m.id || hovered === m.id;
              return (
                <div
                  key={m.id}
                  className="pointer-events-none absolute top-0 -translate-x-1/2 text-center whitespace-nowrap"
                  style={{ left: `${(NODES[i].x / VIEW.w) * 100}%` }}
                >
                  <motion.span
                    className="label block"
                    animate={{ color: lifted ? m.hue : "var(--bone-faint)" }}
                    transition={{ duration: 0.3 }}
                  >
                    {m.index}
                  </motion.span>
                  <motion.span
                    className="font-display mt-2 block text-lg tracking-[-0.01em]"
                    animate={{
                      color: lifted ? "var(--bone)" : "var(--bone-dim)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {m.title}
                  </motion.span>
                  <AnimatePresence>
                    {lifted && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.28 }}
                        className="font-display mt-1 block text-sm italic text-bone-dim"
                      >
                        {m.essence}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* expanded record */}
          <div id={`${headingId}-record`} className="mt-16">
            <AnimatePresence mode="wait">
              {activeMilestone ? (
                <MilestoneRecord
                  key={activeMilestone.id}
                  milestone={activeMilestone}
                />
              ) : (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="label border-t border-hair-faint pt-8 text-bone-faint"
                >
                  Select a milestone
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Stacked list (mobile) ──────────────────────── */}
        <ol className="mt-16 md:hidden">
          {milestones.map((m) => {
            const isActive = active === m.id;
            return (
              <li key={m.id} className="border-t border-hair-faint last:border-b">
                <button
                  type="button"
                  onClick={() => toggle(m.id)}
                  aria-expanded={isActive}
                  className="flex w-full cursor-pointer items-center gap-4 py-6 text-left"
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full transition-colors"
                    style={{
                      backgroundColor: isActive ? m.hue : "var(--bone-faint)",
                    }}
                  />
                  <span className="min-w-0 flex-1">
                    <span
                      className="label block"
                      style={{ color: isActive ? m.hue : "var(--bone-faint)" }}
                    >
                      {m.index} — {m.period}
                    </span>
                    <span className="font-display mt-1 block text-2xl text-bone">
                      {m.title}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl leading-none text-bone-dim"
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8">
                        <MilestoneRecord milestone={m} compact />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
