"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { collection, collectionSteps, pipeline } from "@/lib/metalabs";
import { Lightbox } from "./lightbox";
import { ArtifactPanel } from "./artifact-panel";

export function StageShip({ onRestart }: { onRestart: () => void }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex w-full flex-col px-6 pt-20 pb-28 sm:px-10 md:h-full md:pt-24 md:pb-24 lg:px-16">
      <header className="shrink-0">
        <span className="label text-ml-accent">06 — Ship &amp; Scale</span>
        <p className="mt-4 max-w-3xl text-balance text-base leading-[1.55] text-bone-dim sm:text-lg">
          I turned a complex asset workflow into a repeatable production system
          — from creation and metadata to listing, sales and access to the game.
        </p>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-8 md:min-h-0 md:flex-1 lg:grid-cols-12 lg:gap-10">
        {/* ── The collection ───────────────────────── */}
        <div className="flex min-h-0 flex-col lg:col-span-5">
          <div className="flex shrink-0 items-baseline gap-6 border-b border-hair-faint pb-4">
            <div>
              <div className="font-display text-4xl leading-none text-bone">
                7,000+
              </div>
              <div className="label mt-1.5 text-bone-dim">Digital Assets</div>
            </div>
            <p className="text-[11px] leading-snug text-bone-faint">
              Generated, validated and prepared for shipment without a single
              mismatched trait.
            </p>
          </div>

          <div className="mt-4 grid aspect-[3/1] grid-cols-3 gap-3 md:aspect-auto md:min-h-0 md:flex-1">
            {collection.map((a, i) => (
              <motion.button
                key={a.src}
                type="button"
                onClick={() => setOpen(i)}
                data-cursor
                data-cursor-label="View"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.09 }}
                aria-label={`Enlarge ${a.caption}`}
                className="group relative cursor-pointer overflow-hidden border border-hair bg-ink-raise"
              >
                <Image
                  src={a.src}
                  alt={a.caption}
                  fill
                  sizes="20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="label absolute bottom-2 left-2 text-bone opacity-0 transition-opacity group-hover:opacity-100">
                  {a.caption}
                </span>
              </motion.button>
            ))}
          </div>

          <ul className="mt-4 flex shrink-0 flex-wrap gap-x-2.5 gap-y-1.5">
            {collectionSteps.map((s) => (
              <li key={s} className="label text-bone-faint">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Pipeline + artifact ──────────────────── */}
        <div className="flex min-h-0 flex-col gap-5 overflow-auto lg:col-span-7">
          <div>
            <span className="label text-bone-faint">Asset pipeline</span>
            <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2">
              {pipeline.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-center gap-1.5"
                >
                  <span className="label border border-hair px-2.5 py-1.5 text-bone">
                    {p}
                  </span>
                  {i < pipeline.length - 1 && (
                    <span className="text-ml-accent">→</span>
                  )}
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <span className="label text-ml-accent">Automation</span>
              <p className="mt-2 text-[13px] leading-relaxed text-bone-dim">
                Built an automated metadata-generation pipeline to process
                thousands of digital assets while maintaining trait consistency
                and collection integrity.
              </p>
            </div>
            <div>
              <span className="label text-bone-faint">Technical artifact</span>
              <div className="mt-2">
                <ArtifactPanel />
              </div>
            </div>
          </div>

          <div className="mt-auto border-t border-hair-faint pt-5">
            <span className="label text-ml-accent">Outcome</span>
            <p className="font-display mt-2 max-w-2xl text-balance text-xl leading-snug text-bone sm:text-2xl">
              A product that grew from an initial idea into an ecosystem
              spanning product, community, content, technology and scalable
              production.
            </p>

            <button
              type="button"
              onClick={onRestart}
              data-cursor
              data-cursor-label="Restart"
              className="group mt-5 flex cursor-pointer items-center gap-3 text-bone-dim transition-colors hover:text-ml-accent"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-hair transition-colors group-hover:border-ml-accent">
                ←
              </span>
              <span className="label">Back to the beginning</span>
            </button>
          </div>
        </div>
      </div>

      <Lightbox
        items={collection}
        index={open}
        onClose={() => setOpen(null)}
        onNavigate={setOpen}
      />
    </div>
  );
}
