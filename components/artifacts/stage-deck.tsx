"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useStageNav } from "./use-stage-nav";

export type DeckStage = { id: string; index: string; label: string };

/**
 * A pinned horizontal deck.
 *
 * Desktop: the section is (n × 100svh) tall with a sticky viewport, and
 * ordinary vertical scroll translates a horizontal track. Nothing is hijacked,
 * there is no horizontal scrollbar, and the page enters and exits by scrolling.
 *
 * Mobile: a pinned horizontal deck cannot hold a two-panel stage in a portrait
 * viewport, so the same stages stack vertically. The switch is pure CSS (the
 * track transform passes through a custom property only the md+ rule consumes),
 * so server and client markup stay identical.
 */
export function StageDeck({
  id,
  eyebrow,
  accent,
  stages,
  panels,
}: {
  id: string;
  eyebrow: string;
  accent: string;
  stages: DeckStage[];
  /** one node per stage; receives goTo so a stage can drive navigation */
  panels: (goTo: (i: number) => void) => ReactNode[];
}) {
  const ref = useRef<HTMLElement>(null);
  const count = stages.length;
  const { stage, active, goTo } = useStageNav(ref, count, id);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const eased = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 34,
    mass: 0.4,
  });
  // Percentages resolve against the track's own width (count × 100vw), so one
  // viewport per stage is (count-1)/count of the track — not (count-1) × 100%.
  const trackX = useTransform(
    eased,
    [0, 1],
    ["0%", `-${((count - 1) / count) * 100}%`],
  );
  const barScale = useTransform(eased, [0, 1], [1 / count, 1]);

  const atStart = stage === 0;
  const atEnd = stage === count - 1;
  const rendered = panels(goTo);

  return (
    <section
      ref={ref}
      id={id}
      aria-label={`${eyebrow} — case study`}
      className="relative overflow-x-clip md:h-[var(--deck-height)]"
      style={
        {
          "--deck-height": `${count * 100}svh`,
          "--deck-accent": accent,
          "--stages": count,
        } as React.CSSProperties
      }
    >
      <div className="md:sticky md:top-0 md:h-svh md:w-full md:overflow-hidden">
        <motion.div
          style={{ "--track-x": trackX } as React.CSSProperties}
          className="deck-track flex flex-col md:h-full md:flex-row"
        >
          {rendered.map((panel, i) => (
            <div
              key={stages[i]?.id ?? i}
              id={`${id}-stage-${i + 1}`}
              className="deck-stage relative min-h-svh shrink-0 md:h-full md:min-h-0"
            >
              {panel}
            </div>
          ))}
        </motion.div>

        {/* ── Chrome (desktop only; mobile scrolls naturally) ── */}
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden items-center justify-between px-6 py-8 sm:px-10 md:flex lg:px-16">
          <span className="label text-bone-dim">
            {eyebrow}&nbsp;&nbsp;·&nbsp;&nbsp;
            <span className="text-bone-faint">Case study</span>
          </span>
          <span className="label tabular-nums text-bone-dim">
            <span style={{ color: accent }}>
              {String(stage + 1).padStart(2, "0")}
            </span>
            {" / "}
            {String(count).padStart(2, "0")}
          </span>
        </div>

        <div className="pointer-events-none absolute inset-x-6 bottom-[4.75rem] hidden h-px bg-hair sm:inset-x-10 md:block lg:inset-x-16">
          <motion.div
            style={{ scaleX: barScale, background: accent }}
            className="h-full origin-left"
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
                  className="label transition-colors"
                  style={{
                    color: i === stage ? accent : "var(--bone-faint)",
                  }}
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
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-hair text-bone-dim transition-colors hover:border-[var(--deck-accent)] hover:text-[var(--deck-accent)] disabled:cursor-not-allowed disabled:opacity-25"
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
              className="flex h-11 cursor-pointer items-center gap-2.5 rounded-full border px-5 transition-colors disabled:cursor-not-allowed disabled:opacity-25"
              style={{
                borderColor: "color-mix(in oklab, var(--deck-accent) 50%, transparent)",
                color: accent,
              }}
            >
              <span className="label">
                {atEnd ? "End" : stages[Math.min(stage + 1, count - 1)].label}
              </span>
              <span>→</span>
            </button>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {active
            ? `Stage ${stage + 1} of ${count}: ${stages[stage].label}.`
            : ""}
        </p>
      </div>
    </section>
  );
}
