"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { campaignWall, channels, demandPillars } from "@/lib/metalabs";
import { Lightbox } from "./lightbox";

/** Editorial layout: each artifact gets a deliberate slot, not a uniform grid. */
// 7-column × 3-row grid; each row must total exactly 7 columns.
const SLOTS = [
  "col-span-4 row-span-2", // poster — the anchor
  "col-span-3 row-span-2", // key visual
  "col-span-4 row-span-1", // comic strip
  "col-span-3 row-span-1", // storyboards
];

export function StageDemand() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex w-full flex-col px-6 pt-20 pb-28 sm:px-10 md:h-full md:pt-24 md:pb-24 lg:px-16">
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
            {channels.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <span className="label text-ml-accent">{c.name}</span>
                <div className="font-display mt-1.5 text-2xl leading-none text-bone">
                  {c.value}
                </div>
                <div className="mt-1 text-[11px] leading-snug text-bone-faint">
                  {c.label}
                </div>
              </motion.div>
            ))}
          </div>

          <dl className="min-h-0 flex-1 space-y-4 overflow-auto">
            {demandPillars.map((p, i) => (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                className="border-l border-hair pl-4"
              >
                <dt className="label text-bone">{p.key}</dt>
                <dd className="mt-1.5 text-[13px] leading-relaxed text-bone-dim">
                  {p.body}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* ── Campaign wall ────────────────────────── */}
        <div className="min-h-0 lg:col-span-8">
          <div className="mb-3 flex items-baseline justify-between">
            <span className="label text-bone-faint">
              Campaign wall — real work shipped
            </span>
            <span className="label text-bone-faint">Click to enlarge</span>
          </div>

          <div className="grid aspect-[4/3] grid-cols-7 grid-rows-3 gap-3 md:aspect-auto md:h-[calc(100%-2rem)]">
            {campaignWall.map((a, i) => (
              <motion.button
                key={a.src}
                type="button"
                onClick={() => setOpen(i)}
                data-cursor
                data-cursor-label="View"
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                aria-label={`Enlarge: ${a.caption}`}
                className={`group relative cursor-pointer overflow-hidden border border-hair bg-ink-raise ${SLOTS[i] ?? "col-span-3 row-span-1"}`}
              >
                <Image
                  src={a.src}
                  alt={a.caption}
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                  <span className="label block text-ml-accent">{a.kind}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-bone">
                    {a.caption}
                  </span>
                </div>
              </motion.button>
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
