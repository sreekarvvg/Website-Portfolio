"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Magnetic attraction: the element leans toward the pointer while it is
 * nearby, then springs home. Purely decorative — it never moves the hit area
 * far enough to make the control hard to click, and it is inert for touch.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const config = { stiffness: 260, damping: 22, mass: 0.5 };
  const sx = useSpring(x, config);
  const sy = useSpring(y, config);

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const b = ref.current?.getBoundingClientRect();
    if (!b) return;
    x.set((event.clientX - (b.left + b.width / 2)) * strength);
    y.set((event.clientY - (b.top + b.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
