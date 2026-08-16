"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { METADATA_SRC } from "@/lib/metalabs";

/**
 * Compact technical-proof panel holding a real pipeline output artifact.
 *
 * NOTE: the `Metalabs` branch contains no automation script file, so this
 * shows the genuine metadata the pipeline emitted (RX_Series_1.json) rather
 * than a reconstructed script. Drop the .py into the branch and it can be
 * swapped in here.
 */
export function ArtifactPanel() {
  const [json, setJson] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(METADATA_SRC)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setJson(JSON.stringify(d, null, 2));
      })
      .catch(() => {
        if (!cancelled) setJson(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open]);

  const preview = json?.split("\n").slice(0, 14).join("\n");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor
        data-cursor-label="Expand"
        aria-label="Expand generated metadata artifact"
        className="group w-full cursor-pointer overflow-hidden rounded-sm border border-hair bg-ink-raise text-left transition-colors hover:border-ml-accent/50"
      >
        <div className="flex items-center justify-between border-b border-hair-faint px-3 py-2">
          <span className="label text-bone-dim">RX_Series_1.json</span>
          <span className="label text-ml-accent opacity-0 transition-opacity group-hover:opacity-100">
            Expand →
          </span>
        </div>
        <pre className="max-h-40 overflow-hidden px-3 py-2 font-mono text-[10px] leading-[1.5] text-bone-faint">
          {preview ?? "Loading pipeline output…"}
        </pre>
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Generated metadata artifact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[200] flex flex-col bg-ink/96 backdrop-blur-xl"
              >
                <div className="flex shrink-0 items-start justify-between gap-6 px-6 py-5 sm:px-10">
                  <div>
                    <h4 className="font-display text-xl text-bone">
                      RX_Series_1.json
                    </h4>
                    <span className="label mt-1 block text-bone-faint">
                      Generated metadata — one of 7,000+ emitted by the pipeline
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
                <div className="min-h-0 flex-1 overflow-auto px-6 pb-10 sm:px-10">
                  <pre className="font-mono text-xs leading-[1.7] whitespace-pre-wrap text-bone-dim">
                    {json}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
