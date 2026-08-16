"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { DocSpec } from "@/lib/metalabs";

function pageSrc(doc: DocSpec, page: number) {
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
}: {
  doc: DocSpec | null;
  open: boolean;
  onClose: () => void;
}) {
  const [page, setPage] = useState(1);
  const [dir, setDir] = useState(1);

  // Reset only when the reader is pointed at a different document — not on
  // open/close — so a slot that owns one document reopens where it was left.
  // Adjusting state during render is React's recommended alternative to an
  // effect here.
  const docKey = doc?.id ?? null;
  const [lastDocKey, setLastDocKey] = useState<string | null>(docKey);
  if (docKey !== lastDocKey) {
    setLastDocKey(docKey);
    setPage(1);
    setDir(1);
  }

  const turn = useCallback(
    (delta: number) => {
      if (!doc) return;
      setDir(delta);
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

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${doc.title} — document reader`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex flex-col bg-ink/96 backdrop-blur-xl"
        >
          <div className="flex shrink-0 items-start justify-between gap-6 px-6 py-5 sm:px-10">
            <div>
              <span className="label block text-ml-accent">{doc.category}</span>
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
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={page}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full w-full"
              >
                <Image
                  src={pageSrc(doc, page)}
                  alt={`${doc.title}, page ${page} of ${doc.pages}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex shrink-0 items-center justify-center gap-8 px-6 py-5 sm:px-10">
            <button
              type="button"
              onClick={() => turn(-1)}
              disabled={page === 1}
              aria-label="Previous page"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-hair text-bone-dim transition-colors hover:border-ml-accent hover:text-ml-accent disabled:cursor-not-allowed disabled:opacity-25"
            >
              ←
            </button>
            <span className="label tabular-nums text-bone-dim" aria-live="polite">
              Page{" "}
              <span className="text-ml-accent">
                {String(page).padStart(2, "0")}
              </span>{" "}
              / {String(doc.pages).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => turn(1)}
              disabled={page === doc.pages}
              aria-label="Next page"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-hair text-bone-dim transition-colors hover:border-ml-accent hover:text-ml-accent disabled:cursor-not-allowed disabled:opacity-25"
            >
              →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
