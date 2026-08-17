"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Brief entrance curtain. It never gates content — the page is fully rendered
 * and readable underneath — and it is skipped entirely under reduced motion.
 */
export function Curtain() {
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDone(false);
    const t = setTimeout(() => setDone(true), 1250);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[95] flex items-end justify-between bg-ink px-6 pb-10 sm:px-10 lg:px-16"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            className="label text-bone-faint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Sreekar
          </motion.span>

          <motion.div
            className="absolute inset-x-0 bottom-0 h-px origin-left"
            style={{
              background:
                "linear-gradient(90deg, var(--s1), var(--s2), var(--s3), var(--s4), var(--s5))",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
          />

          <motion.span
            className="label text-bone-faint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Portfolio
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
