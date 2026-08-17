"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = { kind: "default" | "focus"; label: string; hue: string };

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>({
    kind: "default",
    label: "",
    hue: "var(--accent)",
  });

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 340, damping: 32, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 340, damping: 32, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 1100, damping: 46, mass: 0.25 });
  const dotY = useSpring(y, { stiffness: 1100, damping: 46, mass: 0.25 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.body.classList.add("cursor-hidden");

    function handleMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as HTMLElement | null;
      const zone = target?.closest<HTMLElement>("[data-cursor]");
      if (zone) {
        setState({
          kind: "focus",
          label: zone.dataset.cursorLabel ?? "",
          hue: zone.dataset.cursorHue ?? "var(--accent)",
        });
      } else {
        setState({ kind: "default", label: "", hue: "var(--accent)" });
      }
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.body.classList.remove("cursor-hidden");
    };
  }, [x, y]);

  if (!enabled) return null;
  const focused = state.kind === "focus";

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed top-0 left-0 z-[90]"
      >
        <motion.div
          animate={{
            width: focused ? 72 : 34,
            height: focused ? 72 : 34,
            borderColor: state.hue,
            opacity: focused ? 1 : 0.45,
          }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
        >
          <AnimatePresence>
            {focused && state.label && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="label text-[9px] whitespace-nowrap"
                style={{ color: state.hue }}
              >
                {state.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none fixed top-0 left-0 z-[91]"
      >
        <motion.div
          animate={{
            scale: focused ? 0 : 1,
            backgroundColor: state.hue,
          }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
      </motion.div>
    </>
  );
}
