"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
/** Structural shape any paged artifact can satisfy, across sections. */
export type ReaderDoc = {
  id: string;
  title: string;
  meta: string;
  pages: number;
  dir: string;
  category?: string;
  /** accent colour for this reader; defaults to the MetaLabs mint */
  accent?: string;
};

function pageSrc(doc: ReaderDoc, page: number) {
  return `${doc.dir}/p${String(page).padStart(2, "0")}.webp`;
}

/**
 * Full-screen reader for a source document. Pages are the original rendered
 * pages — nothing is rewritten as web copy.
 */
export function DocumentReader({
  doc,
  open,
  onClose,
  startPage,
}: {
  doc: ReaderDoc | null;
  open: boolean;
  onClose: () => void;
  /**
   * Open at a specific page. When supplied, each open re-seeds to it — used
   * where a caller links to one slide. When omitted, the reader keeps the page
   * it was left on, so a slot that owns one document reopens where it was.
   */
  startPage?: number;
}) {
  const [page, setPage] = useState(startPage ?? 1);

  // Adjusting state during render is React's recommended alternative to an
  // effect here.
  const seeded = startPage !== undefined;
  const resetKey = seeded
    ? `${doc?.id ?? ""}:${startPage}:${open}`
    : `${doc?.id ?? ""}`;
  const [lastResetKey, setLastResetKey] = useState(resetKey);
  if (resetKey !== lastResetKey) {
    setLastResetKey(resetKey);
    setPage(startPage ?? 1);
  }

  const turn = useCallback(
    (delta: number) => {
      if (!doc) return;
      setPage((p) => Math.max(1, Math.min(doc.pages, p + delta)));
    },
    [doc],
  );

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        e.stopPropagation();
        turn(1);
      }
      if (e.key === "ArrowLeft") {
        e.stopPropagation();
        turn(-1);
      }
    }
    window.addEventListener("keydown", onKey, true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, turn]);

  if (typeof document === "undefined" || !doc) return null;
  const accent = doc.accent ?? "var(--ml-accent)";

  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${doc.title} — document reader`}
      style={{ "--reader-accent": accent } as React.CSSProperties}
      className="fade-in fixed inset-0 z-[200] flex flex-col bg-ink/96 backdrop-blur-xl"
    >
          <div className="flex shrink-0 items-start justify-between gap-6 px-6 py-5 sm:px-10">
            <div>
              {doc.category && (
                <span className="label block" style={{ color: accent }}>
                  {doc.category}
                </span>
              )}
              <h4 className="font-display mt-1 text-xl text-bone">
                {doc.title}
              </h4>
              <span className="label mt-1 block text-bone-faint">
                {doc.meta}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="label shrink-0 cursor-pointer text-bone-dim transition-colors hover:text-bone"
            >
              Close ✕
            </button>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden px-6 pb-4 sm:px-10">
            <div key={page} className="fade-in relative h-full w-full">
              <Image
                src={pageSrc(doc, page)}
                alt={`${doc.title}, page ${page} of ${doc.pages}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-center gap-8 px-6 py-5 sm:px-10">
            <button
              type="button"
              onClick={() => turn(-1)}
              disabled={page === 1}
              aria-label="Previous page"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-hair text-bone-dim transition-colors hover:border-[var(--reader-accent)] hover:text-[var(--reader-accent)] disabled:cursor-not-allowed disabled:opacity-25"
            >
              ←
            </button>
            <span className="label tabular-nums text-bone-dim" aria-live="polite">
              Page{" "}
              <span style={{ color: accent }}>
                {String(page).padStart(2, "0")}
              </span>{" "}
              / {String(doc.pages).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => turn(1)}
              disabled={page === doc.pages}
              aria-label="Next page"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-hair text-bone-dim transition-colors hover:border-[var(--reader-accent)] hover:text-[var(--reader-accent)] disabled:cursor-not-allowed disabled:opacity-25"
            >
              →
            </button>
          </div>
    </div>,
    document.body,
  );
}
