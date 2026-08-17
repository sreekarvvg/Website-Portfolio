"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { eventsBanner, mavipMeta, mavipMetrics, sipDeck } from "@/lib/mavip";
import { PageStack } from "@/components/artifacts/page-stack";
import { ImageCard } from "@/components/artifacts/image-card";

const ACCENT = "var(--s4)"; // milestone 04 — orange

/** MAVIP — a single, self-contained panel in the continuous journey. */
export function MavipSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });
  const headY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section
      ref={ref}
      id="mavip"
      aria-labelledby="mavip-heading"
      className="relative flex min-h-svh w-full flex-col overflow-x-clip px-6 py-20 sm:px-10 md:h-svh md:py-20 lg:px-16"
    >
      {/* ── Header ─────────────────────────────────── */}
      <motion.header style={{ y: headY }} className="shrink-0">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span className="label" style={{ color: ACCENT }}>
            04 — MAVIP
          </span>
          <span className="label text-bone-faint">{mavipMeta.period}</span>
        </div>

        <h2
          id="mavip-heading"
          className="font-display mt-4 text-[clamp(1.75rem,3.8vw,3rem)] leading-[1.04] tracking-[-0.025em] text-bone"
        >
          Strategy &amp; Product Management Intern
          <span className="block text-bone-dim">
            <span className="text-bone-faint italic">@ </span>
            MAVIP Group
          </span>
        </h2>
        <p className="label mt-3" style={{ color: ACCENT }}>
          quotnt — The Founders&rsquo; Quotient
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="text-balance max-w-2xl text-base leading-[1.65] text-bone-dim sm:text-lg">
              {mavipMeta.lede}
            </p>
          </div>

          <motion.dl
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-3 gap-6 lg:col-span-5"
          >
            {mavipMetrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span
                    className="font-display block text-[clamp(1.5rem,2.6vw,2.25rem)] leading-none"
                    style={{ color: ACCENT }}
                  >
                    {m.value}
                  </span>
                  <span className="label mt-2 block text-bone-dim">
                    {m.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.header>

      {/* ── Proof of work: two slots ───────────────── */}
      <div className="mt-10 flex flex-col md:min-h-0 md:flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <span className="label text-bone-faint">Proof of Work</span>
          <span className="label text-bone-faint">
            Deck &amp; events — click to open
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-10 md:min-h-0 md:flex-1 md:grid-rows-[minmax(0,1fr)] lg:grid-cols-2 lg:gap-12">
          {/* Slot 1 — the SIP deck */}
          <PageStack doc={sipDeck} accent={ACCENT} fillHeight />

          {/* Slot 2 — the events banner */}
          <div className="flex min-w-0 flex-col md:min-h-0">
            <ImageCard artifact={eventsBanner} accent={ACCENT} fillHeight />
            <p className="text-balance mt-3 max-w-xl shrink-0 text-[13px] leading-relaxed text-bone-dim">
              {mavipMeta.events}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
