"use client";

import Image from "next/image";
import { useState } from "react";
import type { DocSpec } from "@/lib/metalabs";
import { DocumentReader } from "@/components/artifacts/document-reader";

/**
 * A self-contained document card. Each slot owns its own open state and its
 * own reader instance, so the three documents on stage 05 never share a
 * viewer — and each remembers the page it was left on.
 */
export function DocumentSlot({ doc }: { doc: DocSpec }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="flex min-w-0 flex-col md:min-h-0"
      >
        <span className="label mb-2 block shrink-0 text-ml-accent">
          {doc.category}
        </span>

        <button
          type="button"
          onClick={() => setOpen(true)}
          data-cursor
          data-cursor-label="Read"
          aria-label={`Open ${doc.title} — ${doc.pages} page document reader`}
          className="group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-sm border border-hair bg-white shadow-xl shadow-black/60 transition-transform duration-500 hover:-translate-y-1.5 md:aspect-auto md:min-h-0 md:flex-1"
        >
          <Image
            src={`${doc.dir}/p01.webp`}
            alt=""
            fill
            sizes="(max-width: 768px) 45vw, 18vw"
            className="object-contain object-top"
          />

          {/* page-edge suggestion — reads as a physical document */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-1.5 bg-gradient-to-l from-black/25 to-transparent"
          />

          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/85 to-transparent p-3 pt-10 text-left">
            <span className="block truncate font-display text-sm leading-tight text-bone">
              {doc.title}
            </span>
            <span className="label mt-1 block text-bone-dim">
              {doc.pages} pages
            </span>
          </span>

          <span className="label pointer-events-none absolute top-2 right-2 rounded-full bg-ml-accent px-2.5 py-1 text-ink opacity-0 transition-opacity group-hover:opacity-100">
            Read →
          </span>
        </button>
      </div>

      <DocumentReader doc={doc} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
