"use client";

import { motion } from "framer-motion";
import {
  engAgents,
  engGoal,
  engMeta,
  engProjects,
  engSkills,
} from "@/lib/engineering";

const ACCENT = "var(--s1)";
const EDGE = "color-mix(in oklab, var(--s1) 45%, transparent)";

/** Slide 1 — where the habit started, and what it has produced. */
export function StageOverview({ onExplore }: { onExplore: () => void }) {
  return (
    <div className="flex w-full flex-col px-6 pt-20 pb-28 sm:px-10 md:h-full md:pt-24 md:pb-24 lg:px-16">
      <header className="shrink-0">
        <span className="label" style={{ color: ACCENT }}>
          01 — {engMeta.unit}
        </span>
        <h3 className="font-display mt-4 text-[clamp(1.7rem,3.4vw,2.75rem)] leading-[1.04] tracking-[-0.025em] text-bone">
          {engMeta.role}
          <span className="block text-bone-dim">
            <span className="text-bone-faint italic">@ </span>
            {engMeta.org}
          </span>
        </h3>
        <p className="label mt-3 text-bone-faint">{engMeta.period}</p>
      </header>

      <div className="mt-7 grid grid-cols-1 gap-10 md:min-h-0 md:flex-1 md:grid-rows-[minmax(0,1fr)] lg:grid-cols-12 lg:gap-12">
        {/* ── The habit ─────────────────────────────── */}
        <div className="flex min-w-0 flex-col md:min-h-0 lg:col-span-5">
          <motion.blockquote
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="border-l pl-6"
            style={{ borderColor: EDGE }}
          >
            <p className="font-display text-balance text-[clamp(1.1rem,1.9vw,1.55rem)] leading-[1.3] text-bone italic">
              {engMeta.thesis}
            </p>
          </motion.blockquote>

          <div className="mt-6 space-y-4">
            {engMeta.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.12 + i * 0.08 }}
                className="max-w-xl text-[13px] leading-relaxed text-bone-dim"
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Anchored to the foot of the column so the panel reads as a block
              of type between two rules rather than as text that ran out. */}
          <ul className="mt-6 flex flex-wrap gap-x-2.5 gap-y-2 md:mt-auto md:pt-6">
            {engSkills.map((s) => (
              <li
                key={s}
                className="label border border-hair px-2.5 py-1 text-bone-dim"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* ── What it produced ──────────────────────── */}
        <div className="flex min-w-0 flex-col md:min-h-0 lg:col-span-7">
          <span className="label shrink-0 text-bone-faint">Selected work</span>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {engProjects.slice(0, 2).map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border border-hair bg-ink-raise/60 p-3.5"
              >
                <span className="label" style={{ color: ACCENT }}>
                  {p.index}
                </span>
                <h4 className="font-display mt-2 text-lg leading-tight text-bone">
                  {p.name}
                </h4>
                <p className="mt-2 text-[11px] leading-snug text-bone-dim">
                  {p.body}
                </p>
              </motion.article>
            ))}
          </div>

          {/* The current project, given the weight it deserves */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 flex min-h-0 flex-col border bg-ink-raise/60 p-4 md:flex-1"
            style={{ borderColor: EDGE }}
          >
            <div className="flex shrink-0 flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="label" style={{ color: ACCENT }}>
                {engProjects[2].index}
              </span>
              <h4 className="font-display text-xl leading-tight text-bone">
                {engProjects[2].name}
              </h4>
              <span
                className="label rounded-full border px-2 py-0.5"
                style={{ borderColor: EDGE, color: ACCENT }}
              >
                {engProjects[2].status}
              </span>
            </div>

            <p className="mt-2.5 max-w-2xl shrink-0 text-[12px] leading-relaxed text-bone-dim">
              {engProjects[2].body}
            </p>

            <p className="label mt-4 shrink-0 text-bone-faint">
              A multi-agent research workflow
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
              {engAgents.map((a, i) => (
                <motion.div
                  key={a.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.28 + i * 0.05 }}
                  className="border-l border-hair pl-2.5"
                >
                  <dt className="text-[11px] leading-tight font-medium text-bone">
                    {a.name}
                  </dt>
                  <dd className="mt-1 text-[10.5px] leading-snug text-bone-faint">
                    {a.body}
                  </dd>
                </motion.div>
              ))}
            </dl>

            <p className="text-balance mt-auto max-w-2xl pt-4 text-[12px] leading-relaxed text-bone-dim italic">
              {engGoal}
            </p>
          </motion.article>

          <button
            type="button"
            onClick={onExplore}
            data-cursor
            data-cursor-label="Go"
            className="group mt-4 flex shrink-0 cursor-pointer items-center gap-4 text-left"
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors"
              style={{ borderColor: EDGE, color: ACCENT }}
            >
              →
            </span>
            <span>
              <span className="font-display block text-lg leading-none text-bone transition-colors group-hover:text-[var(--s1)]">
                See how it is built
              </span>
              <span className="label mt-1.5 block text-bone-faint">
                Six excerpts from the source
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
