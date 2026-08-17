"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { codeProofs, engStack } from "@/lib/engineering";
import { CodePanel } from "@/components/artifacts/code-panel";

const ACCENT = "var(--s1)";
const EDGE = "color-mix(in oklab, var(--s1) 45%, transparent)";

/** Backticked identifiers in the copy are set in mono, so a symbol quoted from
 *  the code reads as code rather than as a stray punctuation mark. */
function withCode(text: string) {
  return text.split("`").map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="font-mono text-[11.5px] text-bone">
        {part}
      </code>
    ) : (
      part
    ),
  );
}

/**
 * Slide 2 — the Deep Research Agent, in depth.
 *
 * Six excerpts from the source, each paired with the product decision it
 * carries. The index on the left is the navigation; the panel on the right is
 * the evidence, quoted verbatim with its real file and line range.
 */
export function StageAgent() {
  const [at, setAt] = useState(0);
  const proof = codeProofs[at];

  return (
    <div className="flex w-full flex-col px-6 pt-20 pb-28 sm:px-10 md:h-full md:pt-24 md:pb-24 lg:px-16">
      <header className="shrink-0">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <span className="label" style={{ color: ACCENT }}>
            02 — Deep Research Agent
          </span>
          <span className="label text-bone-faint">
            Building an AI that researches, not just answers
          </span>
        </div>
        <h3 className="font-display mt-3.5 max-w-3xl text-balance text-[clamp(1.4rem,2.9vw,2.3rem)] leading-[1.08] tracking-[-0.02em] text-bone">
          Six decisions from the source, and why each one is there
        </h3>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-8 md:min-h-0 md:flex-1 md:grid-rows-[minmax(0,1fr)] lg:grid-cols-12 lg:gap-10">
        {/* ── The index, and the thinking ───────────── */}
        <div className="flex min-w-0 flex-col md:min-h-0 lg:col-span-5">
          <ol className="shrink-0 border-t border-hair">
            {codeProofs.map((p, i) => {
              const on = i === at;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setAt(i)}
                    aria-current={on ? "true" : undefined}
                    className="group flex w-full cursor-pointer items-baseline gap-3 border-b border-hair py-2 text-left"
                  >
                    <span
                      className="label shrink-0 transition-colors"
                      style={{ color: on ? ACCENT : "var(--bone-faint)" }}
                    >
                      {p.index}
                    </span>
                    <span
                      className="min-w-0 flex-1 text-[12.5px] leading-snug transition-colors"
                      style={{ color: on ? "var(--bone)" : "var(--bone-dim)" }}
                    >
                      {p.label}
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 text-[11px] transition-opacity"
                      style={{
                        color: ACCENT,
                        opacity: on ? 1 : 0,
                      }}
                    >
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <AnimatePresence mode="wait">
            <motion.div
              key={proof.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 min-h-0 flex-1 border-l pl-5"
              style={{ borderColor: EDGE }}
            >
              <h4 className="font-display text-balance text-lg leading-tight text-bone sm:text-xl">
                {proof.title}
              </h4>
              <p className="mt-2.5 max-w-xl text-[12.5px] leading-relaxed text-bone-dim">
                {withCode(proof.body)}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* What it actually runs on */}
          <dl className="mt-5 hidden shrink-0 grid-cols-3 gap-x-5 gap-y-3.5 border-t border-hair pt-4 lg:grid">
            {engStack.map((s) => (
              <div key={s.role} className="min-w-0">
                <dt className="label truncate text-bone-faint">{s.role}</dt>
                <dd className="mt-1 truncate font-mono text-[11px] text-bone-dim">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── The evidence ──────────────────────────── */}
        <div className="flex min-w-0 flex-col md:min-h-0 lg:col-span-7">
          <div className="mb-2.5 flex shrink-0 items-baseline justify-between gap-4">
            <span className="label text-bone-faint">From the source</span>
            <span className="label tabular-nums text-bone-faint">
              <span style={{ color: ACCENT }}>{proof.index}</span>
              {" / "}
              {String(codeProofs.length).padStart(2, "0")}
            </span>
          </div>

          {/* min-h on mobile so the excerpt is readable before the md switch */}
          <div className="flex min-h-[22rem] min-w-0 flex-col md:min-h-0 md:flex-1">
            <CodePanel
              key={proof.id}
              file={proof.file}
              lines={proof.lines}
              code={proof.code}
              accent={ACCENT}
              badge={proof.index}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
