"use client";

import { useState } from "react";
import { conceptGallery, personaLed, visualDevelopment } from "@/lib/metalabs";
import { ArtifactTile } from "./artifact-tile";
import { Lightbox } from "./lightbox";

/** Hero concept large, supporting development frames layered around it. */
// 6-column × 3-row grid; rows 1–2 are shared with the hero, row 3 is a pair.
const SLOTS = [
  "col-span-4 row-span-2", // hero environment
  "col-span-2 row-span-1",
  "col-span-2 row-span-1",
  "col-span-3 row-span-1",
  "col-span-3 row-span-1",
];

export function StageDesign() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-1 flex-col">
      <header className="shrink-0">
        <span className="label text-ml-accent">04 — Design the Product</span>
        <p className="mt-4 max-w-3xl text-balance text-base leading-[1.55] text-bone-dim sm:text-lg">
          I took the concept from early exploration to alpha — shaping the
          product, visual direction, game economy, technology and player
          experience through rapid experimentation and testing.
        </p>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-8 md:min-h-0 md:flex-1 lg:grid-cols-12 lg:gap-10">
        {/* ── Gallery ──────────────────────────────── */}
        <div className="min-h-0 lg:col-span-8">
          <div className="mb-3 flex items-baseline justify-between">
            <span className="label text-bone-faint">Visual development</span>
            <span className="label text-bone-faint">Click to enlarge</span>
          </div>
          <div className="grid aspect-[4/3] grid-cols-6 grid-rows-3 gap-3 md:aspect-auto md:h-[calc(100%-2rem)]">
            {conceptGallery.map((a, i) => (
              <ArtifactTile
                key={a.src}
                artifact={a}
               
                onOpen={() => setOpen(i)}
                className={SLOTS[i] ?? "col-span-2 row-span-1"}
              />
            ))}
          </div>
        </div>

        {/* ── Persona-led design ───────────────────── */}
        <div className="flex flex-col gap-5 lg:col-span-4">
          <div>
            <span className="label text-bone-faint">Concept</span>
            <p className="mt-2 text-[13px] leading-relaxed text-bone-dim">
              Defined the visual language, environments, characters and world
              direction.
            </p>
          </div>

          <div className="border-t border-hair-faint pt-5">
            <span className="label text-bone-faint">Persona-led design</span>
            <dl className="mt-4 space-y-4">
              {personaLed.map((p) => (
                <div
                  key={p.who}
                  className="border-l border-ml-accent/40 pl-4"
                >
                  <dt className="font-display text-lg leading-tight text-bone">
                    {p.who}
                  </dt>
                  <dd className="mt-1 text-[13px] leading-relaxed text-bone-dim">
                    {p.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border-t border-hair-faint pt-5">
            <span className="label text-bone-faint">Visual development</span>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
              {visualDevelopment.map((v) => (
                <li key={v} className="label text-bone-dim">
                  {v}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto border-t border-hair-faint pt-5">
            <span className="label text-ml-accent">Alpha</span>
            <p className="mt-2 text-[13px] leading-relaxed text-bone-dim">
              Translated the concept, economy and visual direction into the
              first playable product experience.
            </p>
          </div>
        </div>
      </div>

      <Lightbox
        items={conceptGallery}
        index={open}
        onClose={() => setOpen(null)}
        onNavigate={setOpen}
      />
    </div>
  );
}
