"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  competitiveMetrics,
  competitors,
  RESEARCH_DOC,
  researchMetrics,
} from "@/lib/metalabs";
import { Metric } from "./stage-shell";
import { PersonaStack } from "./persona-stack";
import { DocumentReader } from "@/components/artifacts/document-reader";

export function StageUnderstand() {
  const [readerOpen, setReaderOpen] = useState(false);

  return (
    <div className="flex w-full flex-col px-6 pt-20 pb-28 sm:px-10 md:h-full md:pt-24 md:pb-24 lg:px-16">
      <header className="shrink-0">
        <span className="label text-ml-accent">02 — Understand</span>
        <p className="mt-4 max-w-3xl text-balance text-base leading-[1.55] text-bone-dim sm:text-lg">
          Before defining the product, I needed to understand the people, their
          behaviour and the competitive landscape.
        </p>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-8 md:min-h-0 md:flex-1 lg:grid-cols-12 lg:gap-10">
        {/* ── Personas ─────────────────────────────── */}
        <div className="flex min-w-0 flex-col md:min-h-0 lg:col-span-5">
          <div className="mb-4 flex shrink-0 gap-10 border-b border-hair-faint pb-4">
            <span className="label text-bone-faint">User Research</span>
            {researchMetrics.map((m) => (
              <Metric key={m.label} {...m} size="sm" />
            ))}
          </div>
          <div className="md:min-h-0 md:flex-1">
            <PersonaStack />
          </div>
        </div>

        {/* ── Competitive analysis ─────────────────── */}
        <div className="flex min-w-0 flex-col md:min-h-0 lg:col-span-7">
          <div className="mb-4 flex shrink-0 flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-hair-faint pb-4">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <span className="label text-bone-faint">Competitive</span>
              {competitiveMetrics.map((m) => (
                <Metric key={m.label} {...m} size="sm" />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setReaderOpen(true)}
              data-cursor
              data-cursor-label="Read"
              className="label shrink-0 cursor-pointer text-ml-accent transition-opacity hover:opacity-70"
            >
              View research →
            </button>
          </div>

          <div className="min-w-0 md:min-h-0 md:flex-1 md:overflow-hidden">
            <p className="mb-3 text-xs text-bone-faint">
              Six of 30+ researched competitors — chosen to span the distinct
              strategic positions MetaLabs had to place itself against.
              Similarweb figures, Apr–Jun 2022.
            </p>

            <div className="overflow-auto md:h-[calc(100%-2.75rem)]">
              <table className="w-full border-collapse text-left">
                <thead className="sticky top-0 bg-ink">
                  <tr className="border-b border-hair">
                    {[
                      "Competitor",
                      "Genre",
                      "Chain",
                      "Visits/mo",
                      "Uniques",
                      "Duration",
                      "Bounce",
                    ].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="label py-2.5 pr-3 font-normal text-bone-faint whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((c, i) => (
                    <motion.tr
                      key={c.name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className="group border-b border-hair-faint align-top transition-colors hover:bg-white/[0.025]"
                    >
                      <th scope="row" className="py-3 pr-3 font-normal">
                        <span className="font-display block text-base leading-tight text-bone">
                          {c.name}
                        </span>
                        <span className="mt-1 block text-[11px] leading-snug text-bone-faint">
                          {c.read}
                        </span>
                      </th>
                      <Cell>{c.genre}</Cell>
                      <Cell>{c.chain}</Cell>
                      <Cell mono>{c.visits}</Cell>
                      <Cell mono>{c.uniques}</Cell>
                      <Cell mono accent>
                        {c.duration}
                      </Cell>
                      <Cell mono>{c.bounce}</Cell>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <DocumentReader
        doc={RESEARCH_DOC}
        open={readerOpen}
        onClose={() => setReaderOpen(false)}
      />
    </div>
  );
}

function Cell({
  children,
  mono,
  accent,
}: {
  children: React.ReactNode;
  mono?: boolean;
  accent?: boolean;
}) {
  const dim = children === "Not recorded";
  return (
    <td
      className={`py-3 pr-3 text-sm whitespace-nowrap ${
        mono ? "font-mono tabular-nums text-[13px]" : ""
      } ${dim ? "text-bone-faint/60 italic" : accent ? "text-ml-accent" : "text-bone-dim"}`}
    >
      {dim ? "—" : children}
    </td>
  );
}
