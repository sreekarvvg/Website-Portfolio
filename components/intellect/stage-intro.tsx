"use client";

import { motion } from "framer-motion";
import {
  intellectDeck,
  intellectMeta,
  intellectSkills,
  usho,
} from "@/lib/intellect";
import { PageStack } from "@/components/artifacts/page-stack";

const ACCENT = "var(--s5)";

export function StageIntro({ onExplore }: { onExplore: () => void }) {
  return (
    <div className="flex w-full flex-col px-6 pt-20 pb-28 sm:px-10 md:h-full md:pt-24 md:pb-24 lg:px-16">
      <header className="shrink-0">
        <span className="label" style={{ color: ACCENT }}>
          05 — {intellectMeta.role}
        </span>
        <h3 className="font-display mt-4 text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.03] tracking-[-0.025em] text-bone">
          {intellectMeta.role}
          <span className="block text-bone-dim">
            <span className="text-bone-faint italic">@ </span>
            {intellectMeta.org}
          </span>
        </h3>
        <p className="label mt-3 text-bone-faint">
          {intellectMeta.unit} · {intellectMeta.period}
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-10 md:min-h-0 md:flex-1 md:grid-rows-[minmax(0,1fr)] lg:grid-cols-12 lg:gap-12">
        {/* ── Thesis, summary, USHO ─────────────────── */}
        <div className="flex min-w-0 flex-col md:min-h-0 lg:col-span-7">
          <motion.blockquote
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="border-l pl-6"
            style={{
              borderColor: "color-mix(in oklab, var(--s5) 45%, transparent)",
            }}
          >
            <p className="font-display text-balance text-[clamp(1.1rem,1.9vw,1.6rem)] leading-[1.35] text-bone italic">
              {intellectMeta.thesis}
            </p>
          </motion.blockquote>

          <p className="text-balance mt-6 max-w-2xl text-sm leading-[1.65] text-bone-dim sm:text-base">
            {intellectMeta.summary}
          </p>

          {/* USHO */}
          <div className="mt-8 min-h-0 flex-1">
            <div className="flex items-baseline justify-between gap-4">
              <span className="label text-bone-faint">
                The USHO framework
              </span>
              <span className="label text-bone-faint">
                Match the model to the value created
              </span>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {usho.map((m, i) => (
                <motion.div
                  key={m.letter}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: 0.1 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col border border-hair bg-ink-raise/60 p-3.5"
                >
                  <span
                    className="font-display text-3xl leading-none"
                    style={{ color: ACCENT }}
                  >
                    {m.letter}
                  </span>
                  <dt className="label mt-2.5 text-bone">{m.name}</dt>
                  <dd className="mt-1.5 text-[11px] leading-snug text-bone-faint">
                    {m.blurb}
                  </dd>
                  <dd className="mt-2 border-t border-hair-faint pt-2 text-[11px] leading-snug text-bone-dim">
                    {m.detail}
                  </dd>
                </motion.div>
              ))}
            </dl>

            <ul className="mt-5 flex flex-wrap gap-x-2.5 gap-y-2">
              {intellectSkills.map((s) => (
                <li
                  key={s}
                  className="label border border-hair px-2.5 py-1 text-bone-dim"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── The deck as supporting artifact ───────── */}
        <div className="flex min-w-0 flex-col md:min-h-0 lg:col-span-5">
          <div className="mb-2 flex shrink-0 items-baseline justify-between gap-3">
            <span className="label text-bone-faint">Supporting artifact</span>
            <span className="label text-bone-faint">Full deck</span>
          </div>
          <PageStack doc={intellectDeck} accent={ACCENT} fillHeight />

          <button
            type="button"
            onClick={onExplore}
            data-cursor
            data-cursor-label="Go"
            className="group mt-5 flex shrink-0 cursor-pointer items-center gap-4 text-left"
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors"
              style={{
                borderColor:
                  "color-mix(in oklab, var(--s5) 50%, transparent)",
                color: ACCENT,
              }}
            >
              →
            </span>
            <span>
              <span className="font-display block text-lg leading-none text-bone transition-colors group-hover:text-[var(--s5)]">
                Read the thinking behind it
              </span>
              <span className="label mt-1.5 block text-bone-faint">
                Three chapters
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
