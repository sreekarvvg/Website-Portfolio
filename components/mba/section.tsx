"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { lessons, loreal, mbaMeta, thoucentric } from "@/lib/mba";
import { PageStack } from "@/components/artifacts/page-stack";
import { SingleDocCard } from "@/components/artifacts/single-doc-card";

const ACCENT = "var(--s3)"; // milestone 03 — amber

/** MBA — a single, self-contained panel in the continuous journey. */
export function MbaSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });
  const headY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section
      ref={ref}
      id="mba"
      aria-labelledby="mba-heading"
      className="relative flex min-h-svh w-full flex-col overflow-x-clip px-6 py-24 sm:px-10 lg:px-16"
    >
      {/* ── Header ─────────────────────────────────── */}
      <motion.header style={{ y: headY }} className="shrink-0">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span className="label" style={{ color: ACCENT }}>
            03 — MBA
          </span>
          <span className="label text-bone-faint">{mbaMeta.period}</span>
        </div>

        <h2
          id="mba-heading"
          className="font-display mt-5 text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.03] tracking-[-0.025em] text-bone"
        >
          MBA, Marketing
          <span className="block text-bone-dim">
            <span className="text-bone-faint italic">@ </span>
            {mbaMeta.school}
          </span>
        </h2>

        <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <span className="label text-bone-faint">The Journey</span>
            <p className="text-balance mt-3 max-w-2xl text-lg leading-[1.6] text-bone-dim sm:text-xl">
              {mbaMeta.journey}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div
              className="border-l pl-6"
              style={{ borderColor: "color-mix(in oklab, var(--s3) 45%, transparent)" }}
            >
              <span className="font-display block text-[clamp(2rem,3.6vw,3rem)] leading-none" style={{ color: ACCENT }}>
                Top 1%
              </span>
              <span className="label mt-2 block text-bone-dim">
                of the cohort academically
              </span>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* ── Body ───────────────────────────────────── */}
      <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
        {/* What I learned */}
        <div className="lg:col-span-5">
          <span className="label text-bone-faint">What I Learned</span>
          <dl className="mt-6 space-y-6">
            {lessons.map((l, i) => (
              <motion.div
                key={l.index}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="grid grid-cols-[auto_1fr] gap-x-4"
              >
                <dt className="label pt-1" style={{ color: ACCENT }}>
                  {l.index}
                </dt>
                <dd>
                  <span className="font-display block text-xl leading-tight text-bone">
                    {l.title}
                  </span>
                  <span className="mt-1.5 block text-[13px] leading-relaxed text-bone-dim">
                    {l.body}
                  </span>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* Proof of work */}
        <div className="lg:col-span-7">
          <div className="flex items-baseline justify-between gap-4">
            <span className="label text-bone-faint">Proof of Work</span>
            <span className="label text-bone-faint">Click to read</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6">
            <SingleDocCard doc={thoucentric} accent={ACCENT} />
            <PageStack doc={loreal} accent={ACCENT} />
          </div>
        </div>
      </div>
    </section>
  );
}
