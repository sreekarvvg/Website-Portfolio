"use client";

import Image from "next/image";
import { useState } from "react";
import { intellectDeck, type IntellectChapter } from "@/lib/intellect";
import { DocumentReader } from "@/components/artifacts/document-reader";

const ACCENT = "var(--s5)";

const pageSrc = (page: number) =>
  `${intellectDeck.dir}/p${String(page).padStart(2, "0")}.webp`;

/**
 * A chapter: the explanation on the left, the deck pages that evidence it on
 * the right. Opening a page jumps the full reader to that slide.
 */
export function StageChapter({ chapter }: { chapter: IntellectChapter }) {
  const [openAt, setOpenAt] = useState<number | null>(null);

  return (
    <div className="flex flex-1 flex-col">
      <header className="shrink-0">
        <span className="label" style={{ color: ACCENT }}>
          {chapter.index} — {chapter.label}
        </span>
        <h3 className="font-display mt-4 max-w-3xl text-balance text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.06] tracking-[-0.02em] text-bone">
          {chapter.title}
        </h3>
      </header>

      <div className="mt-7 grid grid-cols-1 gap-10 md:min-h-0 md:flex-1 md:grid-rows-[minmax(0,1fr)] lg:grid-cols-12 lg:gap-12">
        {/* ── The thinking ─────────────────────────── */}
        <div className="flex min-w-0 flex-col md:min-h-0 lg:col-span-5">
          <p className="text-balance max-w-xl text-sm leading-[1.65] text-bone-dim sm:text-base">
            {chapter.standfirst}
          </p>

          <dl className="mt-7 space-y-5">
            {chapter.points.map((p) => (
              <div
                key={p.head}
                className="border-l border-hair pl-4"
              >
                <dt className="label" style={{ color: ACCENT }}>
                  {p.head}
                </dt>
                <dd className="mt-1.5 text-[13px] leading-relaxed text-bone-dim">
                  {p.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── The evidence ─────────────────────────── */}
        <div className="flex min-w-0 flex-col md:min-h-0 lg:col-span-7">
          <div className="mb-3 flex shrink-0 items-baseline justify-between gap-4">
            <span className="label text-bone-faint">From the deck</span>
            <span className="label-sm hidden text-bone-faint md:inline">
              Click any slide to open the deck
            </span>
          </div>

          {/* Three items: one full-width hero slide above a pair. Two items:
              stacked full width. Either way each slide gets real height. */}
          <div
            className={`grid min-h-0 flex-1 gap-4 ${
              chapter.evidence.length > 2
                ? "grid-cols-1 auto-rows-[11rem] md:auto-rows-auto md:grid-cols-2 md:grid-rows-[1.15fr_1fr]"
                : "grid-cols-1 auto-rows-[11rem] md:auto-rows-auto md:grid-rows-2"
            }`}
          >
            {chapter.evidence.map((e, i) => (
              <button
                key={e.page}
                type="button"
                onClick={() => setOpenAt(e.page)}
                data-cursor
                data-cursor-label={`Slide ${e.page}`}
                aria-label={`Open deck slide ${e.page}: ${e.caption}`}
                className={`group flex min-h-0 cursor-pointer flex-col overflow-hidden border border-hair bg-ink-raise/60 p-2 text-left transition-colors hover:border-[color-mix(in_oklab,var(--s5)_50%,transparent)] ${
                  chapter.evidence.length > 2 && i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <span className="relative w-full min-h-0 flex-1">
                  <Image
                    src={pageSrc(e.page)}
                    alt={e.caption}
                    fill
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="object-contain"
                  />
                </span>
                <span className="mt-2 flex shrink-0 items-baseline gap-2 border-t border-hair-faint pt-1.5">
                  <span className="label shrink-0" style={{ color: ACCENT }}>
                    Slide {String(e.page).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[11px] leading-snug text-bone-dim">
                    {e.caption}
                  </span>
                  {/* Standing cue, not hover-only — otherwise the tile reads
                      as a picture rather than a way into the deck. */}
                  <span
                    aria-hidden
                    className="label-sm shrink-0 transition-transform group-hover:translate-x-0.5"
                    style={{ color: ACCENT }}
                  >
                    Open ↗
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <DocumentReader
        doc={{ ...intellectDeck, category: intellectDeck.org, accent: ACCENT }}
        open={openAt !== null}
        onClose={() => setOpenAt(null)}
        startPage={openAt ?? 1}
      />
    </div>
  );
}
