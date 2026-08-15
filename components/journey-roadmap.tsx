"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { milestones } from "@/lib/milestones";
import { buildSmoothPath, type PathPoint } from "@/lib/roadmap-path";
import { MilestoneDetail } from "./milestone-detail";

const DESKTOP_OFFSETS = [0, -76, 30, -76, 0];

const CURVE_VIEWBOX = { width: 1000, height: 220 };
const CURVE_POINTS: PathPoint[] = [
  { x: 60, y: 140 },
  { x: 280, y: 60 },
  { x: 500, y: 178 },
  { x: 720, y: 60 },
  { x: 940, y: 140 },
];
const CURVE_PATH = buildSmoothPath(CURVE_POINTS);

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
      className="relative px-6 pb-32 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col items-start gap-3 sm:mb-24">
          <span className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
            The Journey
          </span>
          <h2
            id={headingId}
            className="font-display text-balance text-4xl font-semibold text-white sm:text-5xl"
          >
            Five milestones, one throughline
          </h2>
          <p className="max-w-xl text-muted">
            Select a milestone to expand it — experiences, work and proof for
            each stop along the way.
          </p>
        </div>

        {/* Desktop / tablet — curved horizontal roadmap */}
        <div className="hidden md:block">
          <div className="relative" style={{ paddingTop: 76 }}>
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
                strokeWidth={2}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.path
                d={CURVE_PATH}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="1 34"
                opacity={0.8}
                animate={{ strokeDashoffset: [0, -700] }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </svg>

            <ol className="relative grid grid-cols-5 gap-4">
              {milestones.map((milestone, index) => {
                const isActive = expanded === milestone.id;
                const Icon = milestone.icon;
                return (
                  <li
                    key={milestone.id}
                    style={{
                      transform: `translateY(${DESKTOP_OFFSETS[index]}px)`,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(milestone.id)}
                      aria-expanded={isActive}
                      className="group flex w-full flex-col items-center gap-4 text-center"
                    >
                      <span
                        className={`relative flex h-16 w-16 items-center justify-center rounded-full border transition-colors duration-300 ${
                          isActive
                            ? "border-accent bg-accent text-background"
                            : "border-border-soft bg-background-elevated text-foreground group-hover:border-accent/60"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="active-node-ring"
                            className="absolute -inset-2 rounded-full border border-accent/40"
                          />
                        )}
                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                      </span>
                      <span>
                        <span className="font-mono block text-[11px] tracking-[0.25em] text-muted-dim uppercase">
                          {milestone.index}
                        </span>
                        <span className="font-display mt-1 block text-sm font-semibold text-foreground sm:text-base">
                          {milestone.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted">
                          {milestone.period}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-14 overflow-hidden rounded-3xl border border-border-soft bg-background-elevated/60 backdrop-blur">
            <AnimatePresence mode="wait">
              {activeMilestone ? (
                <motion.div
                  key={activeMilestone.id}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
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
                  className="flex items-center justify-center gap-3 px-10 py-16 text-sm text-muted"
                >
                  <Plus className="h-4 w-4 text-accent" />
                  Click any milestone above to explore it
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile — vertical zigzag timeline */}
        <ol className="relative space-y-3 md:hidden">
          <div className="absolute top-2 bottom-2 left-6 w-px bg-border-soft" />
          {milestones.map((milestone) => {
            const isActive = expanded === milestone.id;
            const Icon = milestone.icon;
            return (
              <li key={milestone.id} className="relative pl-16">
                <button
                  type="button"
                  onClick={() => toggle(milestone.id)}
                  aria-expanded={isActive}
                  className="flex w-full items-center gap-4 py-3 text-left"
                >
                  <span
                    className={`absolute left-0 flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300 ${
                      isActive
                        ? "border-accent bg-accent text-background"
                        : "border-border-soft bg-background-elevated text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="font-mono block text-[11px] tracking-[0.25em] text-muted-dim uppercase">
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
                      <div className="mb-4 rounded-2xl border border-border-soft bg-background-elevated/60">
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
