"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";

export type DeckStage = { id: string; index: string; label: string };

/**
 * A case study: one main panel, plus optional further stages.
 *
 * Reading the main panel is the whole requirement — the page scrolls straight
 * past it. The stages behind it are opt-in, reached by the control row, never
 * by scrolling. Nothing here hijacks the wheel.
 *
 * The section is `min-h` rather than `h`, so a stage that needs a little more
 * room takes it instead of hiding content behind an inner scrollbar. The
 * control row sits in normal flow below the stage, so it can never overlap the
 * content the way a floating bar did.
 *
 * State is a single index and a CSS class; there is no animation library on
 * this page.
 */
export function StageDeck({
  id,
  eyebrow,
  accent,
  stages,
  panels,
  exploreLabel = "Explore the journey",
  exploreNote,
  backdrop,
}: {
  id: string;
  eyebrow: string;
  accent: string;
  stages: DeckStage[];
  panels: (goTo: (i: number) => void) => ReactNode[];
  exploreLabel?: string;
  /** Line under the invitation; defaults to the stage count. */
  exploreNote?: string;
  /** Full-bleed layer behind the stage, e.g. a film. Receives the stage index
   *  so it can appear only where it belongs. */
  backdrop?: (stage: number) => ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const count = stages.length;
  const [stage, setStage] = useState(0);

  const goTo = useCallback((next: number) => {
    setStage((cur) => {
      const clamped = Math.max(0, Math.min(count - 1, next));
      if (clamped !== cur) {
        // Stages differ in height; re-anchor the top so a taller panel never
        // pushes its own opening line off-screen.
        const top = ref.current?.getBoundingClientRect().top ?? 0;
        if (top < -8) ref.current?.scrollIntoView({ block: "start" });
      }
      return clamped;
    });
  }, [count]);

  const rendered = panels(goTo);
  const atStart = stage === 0;
  const atEnd = stage === count - 1;

  return (
    <section
      ref={ref}
      id={id}
      aria-label={eyebrow}
      className="relative flex min-h-[calc(100svh-var(--header-h))] w-full flex-col overflow-x-clip"
      style={{ "--deck-accent": accent } as React.CSSProperties}
    >
      {backdrop ? backdrop(stage) : null}

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-5 pt-8 pb-6 sm:px-8 lg:px-12">
        {/* ── Stage ──────────────────────────────── */}
        <div key={stages[stage]?.id ?? stage} className="stage-in flex flex-1 flex-col">
          {rendered[stage]}
        </div>

        {/* ── Controls: in flow, never over the content ── */}
        {/* On the opening panel the way in is a full-width bar, not a line of
            small print. It was being missed entirely. */}
        {atStart ? (
          <button
            type="button"
            onClick={() => goTo(1)}
            aria-label={`${exploreLabel} — ${count} stages`}
            className="group mt-7 flex w-full shrink-0 cursor-pointer items-center justify-between gap-6 border px-5 py-5 transition-colors sm:px-7"
            style={{
              borderColor:
                "color-mix(in oklab, var(--deck-accent) 45%, transparent)",
              background:
                "color-mix(in oklab, var(--deck-accent) 7%, transparent)",
            }}
          >
            <span className="flex min-w-0 flex-col items-start text-left">
              <span
                className="font-display text-[clamp(1.15rem,2.2vw,1.75rem)] leading-none"
                style={{ color: accent }}
              >
                {exploreLabel}
              </span>
              <span className="label-sm mt-2 text-bone-dim">
                {exploreNote ?? `${count} stages to walk through`}
              </span>
            </span>
            <span
              aria-hidden
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-lg transition-transform group-hover:translate-x-1 sm:h-14 sm:w-14"
              style={{
                borderColor:
                  "color-mix(in oklab, var(--deck-accent) 55%, transparent)",
                color: accent,
              }}
            >
              →
            </span>
          </button>
        ) : (
          <nav
            aria-label={`${eyebrow} stages`}
            className="mt-7 flex shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-hair pt-4"
          >
            <ol className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-1">
              {stages.map((s, i) => {
                const on = i === stage;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={on ? "step" : undefined}
                      aria-label={`Stage ${s.index} — ${s.label}`}
                      className="flex cursor-pointer items-center gap-2 px-2 py-1.5"
                    >
                      <span
                        aria-hidden
                        className="h-px transition-all duration-200"
                        style={{
                          width: on ? 18 : 8,
                          background: on ? accent : "var(--bone-faint)",
                        }}
                      />
                      <span
                        className="label-sm transition-colors"
                        style={{ color: on ? accent : "var(--bone-faint)" }}
                      >
                        {s.index}
                      </span>
                      {on ? (
                        <span className="label-sm hidden text-bone-dim md:inline">
                          {s.label}
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="flex shrink-0 items-center gap-2">
            <span className="label-sm mr-1 tabular-nums text-bone-faint">
              <span style={{ color: accent }}>
                {String(stage + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(count).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => goTo(stage - 1)}
              disabled={atStart}
              aria-label="Previous stage"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-hair text-bone-dim transition-colors hover:border-[var(--deck-accent)] hover:text-[var(--deck-accent)] disabled:cursor-not-allowed disabled:opacity-20"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => goTo(stage + 1)}
              disabled={atEnd}
              aria-label="Next stage"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-20"
              style={{
                borderColor:
                  "color-mix(in oklab, var(--deck-accent) 55%, transparent)",
                color: accent,
              }}
            >
              →
            </button>
            </div>
          </nav>
        )}
      </div>

      <p className="sr-only" aria-live="polite">
        {`Stage ${stage + 1} of ${count}: ${stages[stage].label}.`}
      </p>
    </section>
  );
}
