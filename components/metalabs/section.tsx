"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { STAGE_COUNT, stages } from "@/lib/metalabs";
import { useStageNav } from "./use-stage-nav";
import { StageProduct } from "./stage-product";
import { StageUnderstand } from "./stage-understand";
import { StageDemand } from "./stage-demand";
import { StageDesign } from "./stage-design";
import { StageBuild } from "./stage-build";
import { StageShip } from "./stage-ship";

export const stageDomId = (i: number) => `metalabs-stage-${i + 1}`;

/**
 * Desktop: the section is (STAGE_COUNT × 100svh) tall with a sticky viewport,
 * and ordinary vertical scroll translates a horizontal track — no hijacking,
 * no horizontal scrollbar, and the page enters/exits by simply scrolling.
 *
 * Mobile: a pinned horizontal deck cannot hold a two-panel stage in a portrait
 * viewport, so the same stages stack vertically instead. The layout switch is
 * pure CSS (the track transform is applied through a custom property that only
 * the md+ rule consumes), which keeps server and client markup identical.
 */
export function MetaLabsSection() {
  const ref = useRef<HTMLElement>(null);
  const { stage, active, goTo } = useStageNav(ref);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const eased = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 34,
    mass: 0.4,
  });
  // Percentages resolve against the track's own width (STAGE_COUNT × 100vw),
  // so one viewport per stage is (STAGE_COUNT-1)/STAGE_COUNT of the track.
  const trackX = useTransform(
    eased,
    [0, 1],
    ["0%", `-${((STAGE_COUNT - 1) / STAGE_COUNT) * 100}%`],
  );
  const barScale = useTransform(eased, [0, 1], [1 / STAGE_COUNT, 1]);

  const atStart = stage === 0;
  const atEnd = stage === STAGE_COUNT - 1;

  const panels = [
    <StageProduct key="p" onExplore={() => goTo(1)} />,
    <StageUnderstand key="u" />,
    <StageDemand key="d" />,
    <StageDesign key="g" />,
    <StageBuild key="b" />,
    <StageShip key="s" onRestart={() => goTo(0)} />,
  ];

  return (
    <section
      ref={ref}
      id="metalabs"
      aria-label="MetaLabs Technology — case study"
      className="relative overflow-x-clip md:h-[var(--ml-height)]"
      style={{ "--ml-height": `${STAGE_COUNT * 100}svh` } as React.CSSProperties}
    >
      <div className="md:sticky md:top-0 md:h-svh md:w-full md:overflow-hidden">
        <motion.div
          style={{ "--track-x": trackX } as React.CSSProperties}
          className="ml-track flex flex-col md:w-[600%] md:flex-row"
        >
          {panels.map((panel, i) => (
            <div
              key={i}
              id={stageDomId(i)}
              className="relative min-h-svh w-full shrink-0 md:h-full md:min-h-0 md:w-[16.6667%]"
            >
              {panel}
            </div>
          ))}
        </motion.div>

        {/* ── Chrome (desktop only; mobile scrolls naturally) ── */}
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden items-center justify-between px-6 py-8 sm:px-10 md:flex lg:px-16">
          <span className="label text-bone-dim">
            MetaLabs&nbsp;&nbsp;·&nbsp;&nbsp;
            <span className="text-bone-faint">Case study</span>
          </span>
          <span className="label tabular-nums text-bone-dim">
            <span className="text-ml-accent">
              {String(stage + 1).padStart(2, "0")}
            </span>
            {" / "}
            {String(STAGE_COUNT).padStart(2, "0")}
          </span>
        </div>

        <div className="pointer-events-none absolute inset-x-6 bottom-[4.75rem] hidden h-px bg-hair sm:inset-x-10 md:block lg:inset-x-16">
          <motion.div
            style={{ scaleX: barScale }}
            className="h-full origin-left bg-ml-accent"
          />
        </div>

        <div className="absolute inset-x-6 bottom-6 hidden items-center justify-between gap-4 sm:inset-x-10 md:flex lg:inset-x-16">
          <nav aria-label="Case study stages" className="flex items-center gap-4">
            {stages.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === stage ? "step" : undefined}
                aria-label={`Stage ${s.index} — ${s.label}`}
                className="group cursor-pointer py-2"
              >
                <span
                  className={`label transition-colors ${
                    i === stage
                      ? "text-ml-accent"
                      : "text-bone-faint group-hover:text-bone-dim"
                  }`}
                >
                  {s.index}
                </span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => goTo(stage - 1)}
              disabled={atStart}
              aria-label="Previous stage"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-hair text-bone-dim transition-colors hover:border-ml-accent hover:text-ml-accent disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:border-hair disabled:hover:text-bone-dim"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => goTo(stage + 1)}
              disabled={atEnd}
              data-cursor
              data-cursor-label="Next"
              aria-label="Next stage"
              className="flex h-11 cursor-pointer items-center gap-2.5 rounded-full border border-ml-accent/50 px-5 text-ml-accent transition-colors hover:bg-ml-accent hover:text-ink disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-ml-accent"
            >
              <span className="label">
                {atEnd
                  ? "End"
                  : stages[Math.min(stage + 1, STAGE_COUNT - 1)].label}
              </span>
              <span>→</span>
            </button>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {active
            ? `Stage ${stage + 1} of ${STAGE_COUNT}: ${stages[stage].label}.`
            : ""}
        </p>
      </div>
    </section>
  );
}
