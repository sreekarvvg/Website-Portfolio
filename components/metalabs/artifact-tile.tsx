"use client";

import Image from "next/image";
import type { Artifact } from "@/lib/metalabs";

/**
 * Evidence tile. The artwork is never cropped and never covered: the image
 * area fits the whole asset, and the caption sits in its own bar beneath it
 * rather than as an overlay.
 */
export function ArtifactTile({
  artifact,
  onOpen,
  className = "",
}: {
  artifact: Artifact;
  onOpen: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor
      data-cursor-label="View"
      aria-label={`Enlarge: ${artifact.caption}`}
      className={`group flex cursor-pointer flex-col overflow-hidden border border-hair bg-ink-raise transition-colors hover:border-ml-accent/50 ${className}`}
    >
      <span className="relative w-full min-h-0 flex-1">
        <Image
          src={artifact.src}
          alt={artifact.caption}
          fill
          sizes="(max-width: 1024px) 90vw, 45vw"
          className="object-contain p-2 transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </span>
      <span className="flex shrink-0 items-baseline gap-2 border-t border-hair-faint px-2.5 py-1.5 text-left">
        <span className="label hidden shrink-0 text-ml-accent md:inline">
          {artifact.kind}
        </span>
        <span className="min-w-0 flex-1 truncate text-[11px] leading-snug text-bone-dim">
          {artifact.caption}
        </span>
        {/* Standing cue so the tile reads as openable, not decorative. */}
        <span
          aria-hidden
          className="label-sm shrink-0 text-ml-accent transition-transform group-hover:translate-x-0.5"
        >
          ↗
        </span>
      </span>
    </button>
  );
}
