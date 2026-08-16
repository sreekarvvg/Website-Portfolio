"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

type ImageArtifact = {
  src: string;
  org: string;
  title: string;
  meta: string;
};

/** A single visual artifact that opens full-screen. Never cropped. */
export function ImageCard({
  artifact,
  accent,
  aspect = "aspect-[4/3]",
  fillHeight = false,
}: {
  artifact: ImageArtifact;
  accent: string;
  aspect?: string;
  fillHeight?: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey, true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const frame = fillHeight
    ? `${aspect} md:aspect-auto md:min-h-0 md:flex-1`
    : aspect;
  // when filling, the card's own root must also grow inside its flex parent
  const root = fillHeight
    ? "flex min-w-0 flex-col md:min-h-0 md:flex-1"
    : "flex min-w-0 flex-col";

  return (
    <div className={root}>
      <div className="mb-2 flex shrink-0 items-baseline justify-between gap-3">
        <span className="label" style={{ color: accent }}>
          {artifact.org}
        </span>
        <span className="label text-bone-faint">Click to enlarge</span>
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor
        data-cursor-label="View"
        aria-label={`Enlarge: ${artifact.title}`}
        className={`group relative w-full cursor-pointer overflow-hidden rounded-sm border border-hair bg-ink-raise transition-transform duration-500 hover:-translate-y-1.5 ${frame}`}
      >
        <Image
          src={artifact.src}
          alt={artifact.title}
          fill
          sizes="(max-width: 1024px) 90vw, 34vw"
          className="object-contain p-1.5"
        />
        <span
          className="label pointer-events-none absolute top-2 right-2 rounded-full px-2.5 py-1 text-ink opacity-0 transition-opacity group-hover:opacity-100"
          style={{ background: accent }}
        >
          View →
        </span>
      </button>

      <div className="mt-3 min-w-0">
        <p className="font-display text-base leading-tight text-bone">
          {artifact.title}
        </p>
        <p className="label mt-1 text-bone-faint">{artifact.meta}</p>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={artifact.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[200] flex flex-col bg-ink/96 backdrop-blur-xl"
                onClick={() => setOpen(false)}
              >
                <div className="flex shrink-0 items-start justify-between gap-6 px-6 py-5 sm:px-10">
                  <div>
                    <span className="label block" style={{ color: accent }}>
                      {artifact.org}
                    </span>
                    <h4 className="font-display mt-1 text-xl text-bone">
                      {artifact.title}
                    </h4>
                    <span className="label mt-1 block text-bone-faint">
                      {artifact.meta}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="label shrink-0 cursor-pointer text-bone-dim transition-colors hover:text-bone"
                  >
                    Close ✕
                  </button>
                </div>
                <div className="relative min-h-0 flex-1 px-6 pb-10 sm:px-10">
                  <Image
                    src={artifact.src}
                    alt={artifact.title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
