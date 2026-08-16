"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { Artifact } from "@/lib/metalabs";

export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: Artifact[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const open = index !== null;

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onNavigate((index + delta + items.length) % items.length);
    },
    [index, items.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        e.stopPropagation();
        step(1);
      }
      if (e.key === "ArrowLeft") {
        e.stopPropagation();
        step(-1);
      }
    }
    window.addEventListener("keydown", onKey, true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, step]);

  if (typeof document === "undefined") return null;
  const item = index !== null ? items[index] : null;

  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.caption}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex flex-col bg-ink/95 backdrop-blur-xl"
          onClick={onClose}
        >
          <div className="flex shrink-0 items-center justify-between px-6 py-5 sm:px-10">
            <span className="label text-bone-dim">
              {item.kind} · {String(index! + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="label cursor-pointer text-bone-dim transition-colors hover:text-bone"
            >
              Close ✕
            </button>
          </div>

          <motion.div
            key={item.src}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-0 flex-1 px-6 pb-4 sm:px-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={item.src}
              alt={item.caption}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </motion.div>

          <div
            className="flex shrink-0 items-center justify-between gap-4 px-6 py-5 sm:px-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous artifact"
              className="label cursor-pointer text-bone-dim transition-colors hover:text-bone"
            >
              ← Prev
            </button>
            <p className="text-center text-sm text-bone-dim">{item.caption}</p>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next artifact"
              className="label cursor-pointer text-bone-dim transition-colors hover:text-bone"
            >
              Next →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
