"use client";

import { useCallback, useEffect, useRef, useState } from "react";
/**
 * Drives the horizontal journey from ordinary vertical scroll.
 *
 * The section is (stageCount × 100vh) tall with a sticky viewport inside it,
 * so native wheel / trackpad / touch all work untouched — nothing is hijacked,
 * and the page enters and exits the module by simply scrolling. Explicit
 * prev/next controls and arrow keys jump to a stage; once scrolling settles
 * the view eases to the nearest stage so the journey advances one step at a
 * time rather than resting between two.
 */
export function useStageNav(
  ref: React.RefObject<HTMLElement | null>,
  stageCount: number,
  /** DOM id prefix for the stacked mobile panels */
  idPrefix: string,
) {
  const [stage, setStage] = useState(0);
  const [active, setActive] = useState(false);
  const settleTimer = useRef<number | null>(null);
  const programmatic = useRef(false);

  /** Scroll offset (px) at which a given stage is centred. */
  const offsetFor = useCallback(
    (index: number) => {
      const el = ref.current;
      if (!el) return 0;
      const span = el.offsetHeight - window.innerHeight;
      return el.offsetTop + (span * index) / (stageCount - 1);
    },
    [ref, stageCount],
  );

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(stageCount - 1, index));
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;

      // Below md the stages are stacked, so jump to the panel itself.
      if (!window.matchMedia("(min-width: 768px)").matches) {
        document
          .getElementById(`${idPrefix}-stage-${clamped + 1}`)
          ?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
        setStage(clamped);
        return;
      }

      programmatic.current = true;
      window.scrollTo({
        top: offsetFor(clamped),
        behavior: smooth ? "smooth" : "auto",
      });
      setStage(clamped);
      window.setTimeout(() => {
        programmatic.current = false;
      }, 900);
    },
    [offsetFor, stageCount, idPrefix],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function readProgress() {
      const node = ref.current;
      if (!node) return null;
      const span = node.offsetHeight - window.innerHeight;
      if (span <= 0) return null;
      const p = (window.scrollY - node.offsetTop) / span;
      return Math.max(0, Math.min(1, p));
    }

    function onScroll() {
      const node = ref.current;
      if (!node) return;
      // Stage tracking and snapping only apply to the pinned desktop deck.
      if (!window.matchMedia("(min-width: 768px)").matches) {
        setActive(false);
        return;
      }
      const rect = node.getBoundingClientRect();
      const inView = rect.top <= 0 && rect.bottom >= window.innerHeight;
      setActive(inView);

      const p = readProgress();
      if (p === null) return;
      const nearest = Math.round(p * (stageCount - 1));
      setStage(nearest);

      if (!inView || programmatic.current || reduced) return;

      // ease to the nearest stage once the user stops scrolling
      if (settleTimer.current) window.clearTimeout(settleTimer.current);
      settleTimer.current = window.setTimeout(() => {
        const exact = p * (stageCount - 1);
        if (Math.abs(exact - nearest) < 0.04) return;
        programmatic.current = true;
        window.scrollTo({ top: offsetFor(nearest), behavior: "smooth" });
        window.setTimeout(() => {
          programmatic.current = false;
        }, 800);
      }, 220);
    }

    function onKey(event: KeyboardEvent) {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      if (rect.top > 0 || rect.bottom < window.innerHeight) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable]")) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(stage + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(stage - 1);
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("keydown", onKey);
      if (settleTimer.current) window.clearTimeout(settleTimer.current);
    };
  }, [ref, goTo, offsetFor, stage, stageCount]);

  return { stage, active, goTo };
}
