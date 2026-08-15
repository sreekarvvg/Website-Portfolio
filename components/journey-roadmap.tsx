"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { milestones } from "@/lib/milestones";
import { buildTracePath, type PathPoint } from "@/lib/roadmap-path";
import { MilestoneDetail } from "./milestone-detail";
import { SkillsMarquee } from "./skills-marquee";

const DESKTOP_OFFSETS = [0, -76, 30, -76, 0];

const CURVE_VIEWBOX = { width: 1000, height: 220 };
const CURVE_X = [60, 280, 500, 720, 940];
const CURVE_POINTS: PathPoint[] = CURVE_X.map((x, i) => ({
  x,
  y: 140 + DESKTOP_OFFSETS[i],
}));
const CURVE_PATH = buildTracePath(CURVE_POINTS);

export function JourneyRoadmap() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const headingId = useId();

  function toggle(id: string) {
    setExpanded((current) => (current === id ? null : id));
  }

  const activeMilestone = milestones.find((m) => m.id === expanded) ?? null;

  return (
    <section
      id="journey"
      aria-labelledby={headingId}
      className="relative px-6 pb-32 sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start gap-3 border-t border-border-fine pt-10 sm:mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
            Sheet 02 — The Journey
          </span>
          <h2
            id={headingId}
            className="font-display text-balance text-4xl font-medium text-white sm:text-5xl"
          >
            Five milestones, one throughline
          </h2>
          <p className="max-w-xl text-muted">
            Select a milestone to expand its record — experiences, work and
            proof for each stop along the trace.
          </p>
        </div>

        <SkillsMarquee />

        {/* Desktop / tablet — orthogonal trace roadmap */}
        <div className="mt-16 hidden md:block">
          <div className="relative" style={{ paddingTop: 96 }}>
            <svg
              viewBox={`0 0 ${CURVE_VIEWBOX.width} ${CURVE_VIEWBOX.height}`}
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-0 top-0 h-[220px] w-full"
              aria-hidden
            >
              <motion.path
                d={CURVE_PATH}
                fill="none"
                stroke="var(--border-soft)"
                strokeWidth={1.5}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.path
                d={CURVE_PATH}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={1.5}
                strokeLinecap="square"
                strokeDasharray="1 30"
                opacity={0.85}
                animate={{ strokeDashoffset: [0, -600] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </svg>

            <ol className="relative grid grid-cols-5 gap-4">
              {milestones.map((milestone, index) => {
                const isActive = expanded === milestone.id;
                return (
                  <li
                    key={milestone.id}
                    className="relative"
                    style={{
                      transform: `translateY(${DESKTOP_OFFSETS[index]}px)`,
                    }}
                  >
                    <span
                      aria-hidden
                      className="font-display pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 text-7xl font-medium text-white/[0.05] select-none"
                    >
                      {milestone.index}
                    </span>
                    <button
                      type="button"
                      data-cursor-hover
                      onClick={() => toggle(milestone.id)}
                      aria-expanded={isActive}
                      className="group relative flex w-full cursor-pointer flex-col items-center gap-4 text-center"
                    >
                      <span
                        className={`block h-3.5 w-3.5 border transition-all duration-300 ${
                          isActive
                            ? "border-accent bg-accent shadow-[0_0_0_6px_var(--accent-dim)]"
                            : "border-white/30 bg-background-elevated group-hover:border-accent/70"
                        }`}
                      />
                      <span>
                        <span className="font-display block text-sm font-semibold text-foreground sm:text-base">
                          {milestone.title}
                        </span>
                        <span className="mt-0.5 block font-mono text-[11px] tracking-[0.1em] text-muted">
                          {milestone.period}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-14 overflow-hidden border-t border-border-soft">
            <AnimatePresence mode="wait">
              {activeMilestone ? (
                <motion.div
                  key={activeMilestone.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <MilestoneDetail milestone={activeMilestone} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center gap-3 px-10 py-16 font-mono text-xs tracking-[0.15em] text-muted uppercase"
                >
                  <Plus className="h-4 w-4 text-accent" />
                  Select a milestone to open its record
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile — vertical trace timeline */}
        <ol className="relative mt-16 space-y-3 md:hidden">
          <div className="absolute top-2 bottom-2 left-[19px] w-px bg-border-soft" />
          {milestones.map((milestone) => {
            const isActive = expanded === milestone.id;
            return (
              <li key={milestone.id} className="relative pl-12">
                <button
                  type="button"
                  onClick={() => toggle(milestone.id)}
                  aria-expanded={isActive}
                  className="flex w-full cursor-pointer items-center gap-4 py-3 text-left"
                >
                  <span
                    className={`absolute top-1/2 left-[13px] block h-3.5 w-3.5 -translate-y-1/2 border transition-all duration-300 ${
                      isActive
                        ? "border-accent bg-accent shadow-[0_0_0_6px_var(--accent-dim)]"
                        : "border-white/30 bg-background-elevated"
                    }`}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="font-mono block text-[11px] tracking-[0.2em] text-muted-dim uppercase">
                      {milestone.index} · {milestone.period}
                    </span>
                    <span className="font-display block text-lg font-semibold text-foreground">
                      {milestone.title}
                    </span>
                  </span>
                  <Plus
                    className={`h-4 w-4 shrink-0 text-accent transition-transform duration-300 ${
                      isActive ? "rotate-45" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mb-4 border border-border-soft">
                        <MilestoneDetail milestone={milestone} />
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
