"use client";

import { documentationTypes, documents, productLoop } from "@/lib/metalabs";
import { DocumentSlot } from "./document-slot";

export function StageBuild() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="shrink-0">
        <span className="label text-ml-accent">05 — Build &amp; Iterate</span>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <h3 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-none tracking-[-0.02em] text-bone">
            Build. Learn. Iterate.
          </h3>
          <span className="label text-ml-accent">11 months concept → MVP</span>
        </div>
        <p className="mt-3 max-w-3xl text-balance text-sm leading-[1.55] text-bone-dim sm:text-base">
          I took the alpha toward MVP through continuous customer feedback,
          rapid iteration, Agile/Scrum sprints and hands-on product development
          across three apps.
        </p>
      </header>

      {/* the single implicit row must fill the container, otherwise it sizes to
          content and the columns cannot stretch */}
      <div className="mt-6 grid grid-cols-1 gap-8 md:min-h-0 md:flex-1 md:grid-rows-[minmax(0,1fr)] lg:grid-cols-12 lg:gap-10">
        {/* ── Three independent document readers ───── */}
        <div className="flex min-w-0 flex-col md:min-h-0 lg:col-span-7">
          <div className="mb-4 flex shrink-0 items-baseline justify-between gap-4">
            <span className="label text-bone-faint">Product documentation</span>
            <span className="label hidden text-bone-faint md:inline">
              Click any document to read
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:min-h-0 md:flex-1 md:grid-rows-[minmax(0,1fr)]">
            {documents.map((doc) => (
              <DocumentSlot key={doc.id} doc={doc} />
            ))}
          </div>

          <ul className="mt-6 flex shrink-0 flex-wrap gap-x-2.5 gap-y-2">
            {documentationTypes.map((t) => (
              <li
                key={t}
                className="label border border-hair px-2.5 py-1 text-bone-dim"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Loop + principle ─────────────────────── */}
        <div className="flex min-w-0 flex-col gap-5 lg:col-span-5">
          <div>
            <span className="label text-bone-faint">
              Product management loop
            </span>
            <ol className="mt-4">
              {productLoop.map((step, i) => (
                <li
                  key={step}
                  className="grid grid-cols-[auto_1fr] items-start gap-x-3"
                >
                  <span className="flex h-full flex-col items-center pt-1.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ml-accent" />
                    {i < productLoop.length - 1 && (
                      <span className="w-px flex-1 bg-gradient-to-b from-ml-accent/60 to-ml-accent/10" />
                    )}
                  </span>
                  <span
                    className={`pb-4 text-sm ${
                      i === 0 ? "text-bone" : "text-bone-dim"
                    }`}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-auto border-t border-hair-faint pt-5">
            <span className="label text-ml-accent">Principle</span>
            <p className="font-display mt-2 text-xl leading-snug text-bone italic">
              Document everything. Build quickly. Learn from customers. Iterate
              continuously.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
