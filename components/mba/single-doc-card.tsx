"use client";

import Image from "next/image";
import { useState } from "react";
import type { MbaDoc } from "@/lib/mba";
import { DocumentReader } from "@/components/metalabs/document-reader";

/** One-page artifact shown as a single card that opens into a larger view. */
export function SingleDocCard({
  doc,
  accent,
}: {
  doc: MbaDoc;
  accent: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-w-0 flex-col">
      <div className="mb-2 flex shrink-0 items-baseline justify-between gap-3">
        <span className="label" style={{ color: accent }}>
          {doc.org}
        </span>
        <span className="label text-bone-faint">Winning solution</span>
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor
        data-cursor-label="Read"
        aria-label={`Open ${doc.org} — ${doc.title}`}
        className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-sm border border-hair bg-white shadow-2xl shadow-black/60 transition-transform duration-500 hover:-translate-y-1.5"
      >
        <Image
          src={`${doc.dir}/p01.webp`}
          alt={doc.title}
          fill
          sizes="(max-width: 1024px) 90vw, 34vw"
          className="object-contain"
        />
        <span
          className="label pointer-events-none absolute top-2 right-2 rounded-full px-2.5 py-1 text-ink opacity-0 transition-opacity group-hover:opacity-100"
          style={{ background: accent }}
        >
          Read →
        </span>
      </button>

      <div className="mt-3 min-w-0">
        <p className="font-display text-base leading-tight text-bone">{doc.title}</p>
        <p className="label mt-1 text-bone-faint">{doc.meta}</p>
      </div>

      <DocumentReader
        doc={{ ...doc, category: doc.org, accent }}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
