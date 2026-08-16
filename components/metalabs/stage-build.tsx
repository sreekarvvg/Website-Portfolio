"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  documentationTypes,
  documents,
  productLoop,
  type DocSpec,
} from "@/lib/metalabs";
import { DocumentReader } from "./document-reader";

export function StageBuild() {
  const [front, setFront] = useState(0);
  const [reading, setReading] = useState<DocSpec | null>(null);

  const ordered = documents.map(
    (_, i) => documents[(front + i) % documents.length],
  );

  return (
    <div className="flex w-full flex-col px-6 pt-20 pb-28 sm:px-10 md:h-full md:pt-24 md:pb-24 lg:px-16">
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

      <div className="mt-6 grid grid-cols-1 gap-8 md:min-h-0 md:flex-1 lg:grid-cols-12 lg:gap-10">
        {/* ── Document stack ───────────────────────── */}
        <div className="flex min-h-0 flex-col lg:col-span-6">
          <div className="mb-3 flex shrink-0 items-baseline justify-between">
            <span className="label text-bone-faint">Product documentation</span>
            <span className="label text-bone-faint">Click to read</span>
          </div>

          <div className="relative aspect-[3/4] w-full md:aspect-auto md:min-h-0 md:flex-1">
            {ordered.map((doc, depth) => {
              const isFront = depth === 0;
              return (
                <motion.div
                  key={doc.id}
                  initial={false}
                  animate={{
                    y: depth * -14,
                    x: depth * 20,
                    scale: 1 - depth * 0.04,
                    opacity: isFront ? 1 : 0.4 - depth * 0.1,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ zIndex: documents.length - depth }}
                  className="absolute inset-0"
                >
                  <button
                    type="button"
                    onClick={() =>
                      isFront ? setReading(doc) : setFront((f) => (f + depth) % documents.length)
                    }
                    data-cursor
                    data-cursor-label={isFront ? "Open" : "Bring forward"}
                    aria-label={
                      isFront
                        ? `Open ${doc.title}, ${doc.pages} pages`
                        : `Bring ${doc.title} to front`
                    }
                    className="group relative h-full w-full cursor-pointer overflow-hidden rounded-sm border border-hair bg-white shadow-2xl shadow-black/70"
                  >
                    <Image
                      src={`${doc.dir}/p01.webp`}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 90vw, 40vw"
                      className="object-contain object-top"
                    />
                    {isFront && (
                      <>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/85 to-transparent p-4 pt-12 text-left">
                          <span className="font-display block text-lg leading-tight text-bone">
                            {doc.title}
                          </span>
                          <span className="label mt-1 block text-bone-dim">
                            {doc.meta} · {doc.pages} pages
                          </span>
                        </div>
                        <span className="absolute top-3 right-3 rounded-full bg-ml-accent px-3 py-1 label text-ink opacity-0 transition-opacity group-hover:opacity-100">
                          Open →
                        </span>
                      </>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-3 flex shrink-0 gap-1.5">
            {documents.map((d, i) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setFront(i)}
                aria-label={`Bring ${d.title} to front`}
                className="cursor-pointer py-2"
              >
                <span
                  className={`block h-0.5 w-8 transition-colors ${
                    i === front ? "bg-ml-accent" : "bg-hair"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── Loop + doc types ─────────────────────── */}
        <div className="flex min-h-0 flex-col gap-6 overflow-auto lg:col-span-6">
          <div>
            <span className="label text-bone-faint">Documentation produced</span>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
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

          <div className="border-t border-hair-faint pt-5">
            <span className="label text-bone-faint">
              Product management loop
            </span>
            <ol className="mt-4 space-y-0">
              {productLoop.map((step, i) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <span className="flex flex-col items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-ml-accent" />
                    {i < productLoop.length - 1 && (
                      <span className="h-6 w-px bg-gradient-to-b from-ml-accent/60 to-ml-accent/10" />
                    )}
                  </span>
                  <span
                    className={`text-sm ${i === 0 ? "text-bone" : "text-bone-dim"} ${
                      i < productLoop.length - 1 ? "-mt-6" : ""
                    }`}
                  >
                    {step}
                  </span>
                </motion.li>
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

      <DocumentReader
        doc={reading}
        open={reading !== null}
        onClose={() => setReading(null)}
      />
    </div>
  );
}
