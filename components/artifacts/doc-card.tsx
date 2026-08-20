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
  /** grow to fill the parent; only works where the parent has a real height */
  fill?: boolean;
  /** aspect of the media box when not filling — slides want a wide one */
  aspect?: string;
  /** which page to show as the cover */
  page?: number;
}) {
  const [open, setOpen] = useState(false);
  const src = `${doc.dir}/p${String(page).padStart(2, "0")}.webp`;

  return (
    <div className={`flex min-w-0 flex-col ${fill ? "min-h-0 flex-1" : ""}`}>
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
        className={`group relative w-full cursor-pointer overflow-hidden rounded-sm border border-hair bg-white transition-colors hover:border-[color-mix(in_oklab,var(--card-accent)_60%,transparent)] ${
          fill ? "min-h-0 flex-1" : aspect
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
        <span
          aria-hidden
          className="absolute right-0 bottom-0 flex items-center gap-1.5 bg-ink/85 px-2.5 py-1.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <span className="label-sm" style={{ color: accent }}>
            Open
          </span>
          <span className="text-[11px] text-bone-dim">↗</span>
        </span>
      </button>

      <div className="mt-2.5 shrink-0">
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
