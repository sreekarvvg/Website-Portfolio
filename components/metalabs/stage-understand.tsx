"use client";

import { useState } from "react";
import { competitors, RESEARCH_DOC, understandMetrics } from "@/lib/metalabs";
import { PersonaStack } from "./persona-stack";
import { DocumentReader } from "@/components/artifacts/document-reader";

export function StageUnderstand() {
  const [readerOpen, setReaderOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex shrink-0 flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <div>
          <span className="label text-ml-accent">02 — Understand</span>
          <p className="mt-3 max-w-2xl text-[14px] leading-[1.55] text-bone-dim">
            Before defining the product, I needed to understand the people,
            their behaviour and the competitive landscape.
          </p>
        </div>
        <dl className="flex shrink-0 gap-x-10">
          {understandMetrics.map((m) => (
            <div key={m.label}>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="font-display block text-[clamp(1.5rem,2.6vw,2.25rem)] leading-none text-ml-accent">
                  {m.value}
                </span>
                <span className="label-sm mt-1.5 block text-bone-dim">
                  {m.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-8 md:min-h-0 md:flex-1 lg:grid-cols-12 lg:gap-10">
        {/* ── Personas ─────────────────────────────── */}
        <div className="flex min-w-0 flex-col md:min-h-0 lg:col-span-5">
          <div className="mb-3 flex shrink-0 items-baseline justify-between gap-4 border-b border-hair-faint pb-3">
            <span className="label-sm text-bone-faint">User research</span>
            <span className="label-sm text-bone-faint">Personas</span>
          </div>
          <div className="md:min-h-0 md:flex-1">
            <PersonaStack />
          </div>
        </div>

        {/* ── Competitive analysis ─────────────────── */}
        <div className="flex min-w-0 flex-col md:min-h-0 lg:col-span-7">
          <div className="mb-3 flex shrink-0 flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-hair-faint pb-3">
            <span className="label-sm text-bone-faint">
              Competitive landscape
            </span>
            <button
              type="button"
              onClick={() => setReaderOpen(true)}
              data-cursor
              data-cursor-label="Read"
              className="label-sm shrink-0 cursor-pointer text-ml-accent transition-opacity hover:opacity-70"
            >
              View research →
            </button>
          </div>

          <div className="min-w-0 flex-1">
            <p className="mb-2.5 text-[11.5px] leading-snug text-bone-faint">
              Six of 30+ researched competitors — chosen to span the distinct
              strategic positions MetaLabs had to place itself against.
              Similarweb figures, Apr–Jun 2022.
            </p>

            <div className="min-w-0">
              <table className="w-full table-fixed border-collapse text-left">
                <thead>
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
                        className="label-sm py-2 pr-2 font-normal text-bone-faint"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((c) => (
                    <tr
                      key={c.name}
                      className="group border-b border-hair-faint align-top transition-colors hover:bg-white/[0.025]"
                    >
                      <th scope="row" className="w-[26%] py-2 pr-2 font-normal">
                        <span className="font-display block text-[15px] leading-tight text-bone">
                          {c.name}
                        </span>
                        <span className="mt-0.5 block text-[10.5px] leading-snug text-bone-faint">
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
                    </tr>
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
