"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type ImageArtifact = {
  id: string;
  title: string;
  caption?: string;
  src: string;
};

/** A single image, shown whole and enlargeable. */
export function ImageCard({
  artifact,
  accent,
  fill = false,
  aspect = "aspect-[16/9]",
}: {
  artifact: ImageArtifact;
  accent: string;
  fill?: boolean;
  aspect?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className={`flex min-w-0 flex-col ${fill ? "min-h-0 flex-1" : ""}`}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge ${artifact.title}`}
        className={`group relative w-full cursor-pointer overflow-hidden rounded-sm border border-hair bg-ink-raise transition-colors hover:border-[color-mix(in_oklab,var(--card-accent)_60%,transparent)] ${
          fill ? "min-h-0 flex-1" : aspect
        }`}
        style={{ "--card-accent": accent } as React.CSSProperties}
      >
        <Image
          src={artifact.src}
          alt={artifact.title}
          fill
          sizes="(max-width: 1024px) 92vw, 46vw"
          className="object-contain"
        />
      </button>

      <div className="mt-2.5 shrink-0">
        <p className="text-[13px] leading-tight text-bone">{artifact.title}</p>
        {artifact.caption ? (
          <p className="label-sm mt-1 text-bone-faint">{artifact.caption}</p>
        ) : null}
      </div>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={artifact.title}
              className="fade-in fixed inset-0 z-[200] flex flex-col bg-ink/96 p-4 backdrop-blur-xl sm:p-8"
            >
              <div className="flex shrink-0 items-center justify-between gap-4 pb-4">
                <span className="text-sm text-bone">{artifact.title}</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="label cursor-pointer text-bone-dim transition-colors hover:text-bone"
                >
                  Close ✕
                </button>
              </div>
              <div className="relative min-h-0 flex-1">
                <Image
                  src={artifact.src}
                  alt={artifact.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
