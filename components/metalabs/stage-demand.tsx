"use client";

import { useState } from "react";
import { campaignWall, channels, demandPillars } from "@/lib/metalabs";
import { ArtifactTile } from "./artifact-tile";
import { Lightbox } from "./lightbox";

/** Editorial layout: each artifact gets a deliberate slot, not a uniform grid. */
// 7-column × 3-row grid; each row must total exactly 7 columns.
/* Mosaic from md up only — see stage-design for why. */
const SLOTS = [
  "md:col-span-4 md:row-span-2", // poster — the anchor
  "md:col-span-3 md:row-span-2", // key visual
  "md:col-span-4 md:row-span-1", // comic strip
  "md:col-span-3 md:row-span-1", // storyboards
];

export function StageDemand() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-1 flex-col">
      <header className="shrink-0">
        <span className="label text-ml-accent">03 — Create Demand</span>
        <p className="mt-4 max-w-3xl text-balance text-base leading-[1.55] text-bone-dim sm:text-lg">
          I used growth marketing to build the community, create engagement and
          turn the product story into demand across content, campaigns and
          channels.
        </p>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-8 md:min-h-0 md:flex-1 lg:grid-cols-12 lg:gap-10">
        {/* ── Channels + pillars ───────────────────── */}
        <div className="flex min-h-0 flex-col gap-6 lg:col-span-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-b border-hair-faint pb-6">
            {channels.map((c) => (
              <div
                key={c.name}
              >
                <span className="label text-ml-accent">{c.name}</span>
                <div className="font-display mt-1.5 text-2xl leading-none text-bone">
                  {c.value}
                </div>
                <div className="mt-1 text-[11px] leading-snug text-bone-faint">
                  {c.label}
                </div>
              </div>
            ))}
          </div>

          <dl className="space-y-3.5">
            {demandPillars.map((p) => (
              <div
                key={p.key}
                className="border-l border-hair pl-4"
              >
                <dt className="label text-bone">{p.key}</dt>
                <dd className="mt-1.5 text-[13px] leading-relaxed text-bone-dim">
                  {p.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Campaign wall ────────────────────────── */}
        <div className="min-h-0 lg:col-span-8">
          <div className="mb-3 flex items-baseline justify-between">
            <span className="label text-bone-faint">
              Campaign wall — real work shipped
            </span>
            <span className="label hidden text-bone-faint md:inline">
              Click to enlarge
            </span>
          </div>

          <div className="grid auto-rows-[8rem] grid-cols-2 gap-2.5 md:aspect-auto md:auto-rows-auto md:grid-cols-7 md:grid-rows-3 md:gap-3 md:h-[calc(100%-2rem)]">
            {campaignWall.map((a, i) => (
              <ArtifactTile
                key={a.src}
                artifact={a}
               
                onOpen={() => setOpen(i)}
                className={SLOTS[i] ?? "md:col-span-3 md:row-span-1"}
              />
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        items={campaignWall}
        index={open}
        onClose={() => setOpen(null)}
        onNavigate={setOpen}
      />
    </div>
  );
}
