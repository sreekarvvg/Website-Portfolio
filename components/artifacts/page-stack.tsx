"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ArtifactDoc } from "@/lib/artifacts";
import { DocumentReader } from "./document-reader";

const CYCLE_MS = 3800;

/**
 * Multi-page artifact shown as a physical stack: the current page in front,
 * the remainder fanned behind it. It cycles on its own, pauses on hover, and
 * opens into the full reader on click.
 */
export function PageStack({
  doc,
  accent,
  fillHeight = false,
}: {
  doc: ArtifactDoc;
  accent: string;
  /** fill the parent's height instead of holding a fixed aspect */
  fillHeight?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);

  // Only a few cards are drawn regardless of length — a 15-page deck
  // should still read as a stack, not 15 stacked nodes.
  const visible = Math.min(3, doc.pages);
  const pages = Array.from({ length: visible }, (_, i) => i);
  const advance = useCallback(
    () => setIndex((i) => (i + 1) % doc.pages),
    [doc.pages],
  );

  useEffect(() => {
    if (paused || open) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = window.setInterval(advance, CYCLE_MS);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [paused, open, advance]);

  const frame = fillHeight
    ? "relative aspect-[4/3] w-full md:aspect-auto md:min-h-0 md:flex-1"
    : "relative aspect-[4/3] w-full";

  return (
    <div
      className={
        fillHeight
          ? "flex min-w-0 flex-col md:min-h-0 md:flex-1"
          : "flex min-w-0 flex-col"
      }
    >
      <div className="mb-2 flex shrink-0 items-baseline justify-between gap-3">
        <span className="label" style={{ color: accent }}>
          {doc.org}
        </span>
        <span className="label tabular-nums text-bone-faint">
          <span style={{ color: accent }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          {" / "}
          {String(doc.pages).padStart(2, "0")}
        </span>
      </div>

      {/* Cards sit inset from the top-right so the fan has room to splay
          without escaping the card's own footprint. */}
      <div
        className={frame}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {pages.map((_, depth) => {
          const p = ((index + depth) % doc.pages) + 1;
          const front = depth === 0;
          return (
            <motion.div
              key={depth}
              aria-hidden={!front}
              initial={false}
              animate={{
                y: depth * -12,
                x: depth * 16,
                scale: 1 - depth * 0.04,
                opacity: front ? 1 : 0.4 - depth * 0.12,
              }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ zIndex: visible - depth }}
              className="absolute bottom-0 left-0 h-[calc(100%-1.5rem)] w-[calc(100%-2rem)] overflow-hidden rounded-sm border border-hair bg-white shadow-2xl shadow-black/60"
            >
              <Image
                src={`${doc.dir}/p${String(p).padStart(2, "0")}.webp`}
                alt={front ? `${doc.title}, page ${p} of ${doc.pages}` : ""}
                fill
                sizes="(max-width: 1024px) 90vw, 34vw"
                className="object-contain"
              />
            </motion.div>
          );
        })}

        <button
          type="button"
          onClick={() => setOpen(true)}
          data-cursor
          data-cursor-label="Read"
          aria-label={`Open ${doc.org} — ${doc.title}, ${doc.pages} page reader`}
          className="absolute bottom-0 left-0 h-[calc(100%-1.5rem)] w-[calc(100%-2rem)] cursor-pointer"
          style={{ zIndex: visible + 1 }}
        />
      </div>

      <div className="mt-3 flex shrink-0 items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-display text-base leading-tight text-bone">
            {doc.title}
          </p>
          <p className="label mt-1 text-bone-faint">{doc.meta}</p>
        </div>
        {doc.pages <= 6 && (
          <div className="flex shrink-0 gap-1.5 pt-1">
            {Array.from({ length: doc.pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show page ${i + 1}`}
                className="cursor-pointer py-1"
              >
                <span
                  className="block h-0.5 w-5 transition-colors"
                  style={{ background: i === index ? accent : "var(--hair)" }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <DocumentReader
        doc={{ ...doc, category: doc.org, accent }}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
