"use client";

import Image from "next/image";
import { useState } from "react";
import type { ArtifactDoc } from "@/lib/artifacts";
import { DocumentReader } from "./document-reader";

/**
 * A document, shown as large as the space allows.
 *
 * This replaces an auto-cycling fan of stacked cards. The fan inset the artwork
 * on two sides to make room for the splay, ran a timer per card, and animated
 * pages nobody had asked to see. A single still preview is bigger, sharper and
 * costs nothing; the reader is one click away for anyone who wants the rest.
 */
export function DocCard({
  doc,
  accent,
  fill = false,
  aspect = "aspect-[4/3]",
  page = 1,
}: {
  doc: ArtifactDoc;
  accent: string;
  /** Grow to fill the parent from lg up, where the two-column layout gives
   *  this card a real height to fill. Below that the column stacks and has no
   *  height to divide, so the card holds `aspect` instead — without it the
   *  media box collapsed to 2px on phones. */
  fill?: boolean;
  /** aspect of the media box when not filling — slides want a wide one */
  aspect?: string;
  /** which page to show as the cover */
  page?: number;
}) {
  const [open, setOpen] = useState(false);
  const src = `${doc.dir}/p${String(page).padStart(2, "0")}.webp`;

  return (
    <div
      className={`group flex min-w-0 flex-col ${
        fill ? "lg:min-h-0 lg:flex-1" : ""
      }`}
    >
      <div className="mb-2 flex shrink-0 items-baseline justify-between gap-3">
        <span className="label-sm truncate" style={{ color: accent }}>
          {doc.org}
        </span>
        <span className="label-sm shrink-0 tabular-nums text-bone-faint">
          {doc.pages} {doc.pages === 1 ? "page" : "pages"}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open ${doc.org} — ${doc.title}, ${doc.pages} page reader`}
        className={`relative w-full cursor-pointer overflow-hidden rounded-sm border border-hair bg-white transition-colors group-hover:border-[color-mix(in_oklab,var(--card-accent)_60%,transparent)] ${
          fill ? `${aspect} lg:aspect-auto lg:min-h-0 lg:flex-1` : aspect
        }`}
        style={{ "--card-accent": accent } as React.CSSProperties}
      >
        <Image
          src={src}
          alt={`${doc.title}, page ${page} of ${doc.pages}`}
          fill
          sizes="(max-width: 1024px) 92vw, 46vw"
          className="object-contain"
        />

        {/* Paper edges: a visible hint that pages are stacked behind. */}
        {doc.pages > 1 ? (
          <span aria-hidden className="pointer-events-none absolute inset-y-3 right-0 flex gap-[3px]">
            <span className="w-[3px] rounded-l-sm bg-white/25" />
            <span className="w-[3px] rounded-l-sm bg-white/15" />
          </span>
        ) : null}
      </button>

      {/* The cue sits under the artwork, not over it: an overlay covered the
          bottom of every slide. Always visible — without a standing cue nobody
          knows the document opens or that pages sit behind it. */}
      <span
        aria-hidden
        className="mt-2 flex shrink-0 items-center justify-between gap-3 border px-2.5 py-1.5 transition-colors group-hover:bg-[color-mix(in_oklab,var(--card-accent)_10%,transparent)]"
        style={{
          borderColor: "color-mix(in oklab, var(--card-accent) 35%, transparent)",
          "--card-accent": accent,
        } as React.CSSProperties}
      >
        <span className="label-sm text-bone-dim">
          {doc.pages > 1
            ? `${doc.pages} pages — click to read`
            : "Click to enlarge"}
        </span>
        <span className="label-sm flex items-center gap-1.5" style={{ color: accent }}>
          Open <span className="text-[11px]">↗</span>
        </span>
      </span>

      <div className="mt-2 shrink-0">
        <p className="text-[13px] leading-tight text-bone">{doc.title}</p>
        <p className="label-sm mt-1 text-bone-faint">{doc.meta}</p>
      </div>

      <DocumentReader
        doc={{ ...doc, category: doc.org, accent }}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
