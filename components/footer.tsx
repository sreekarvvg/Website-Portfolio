"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

const LINKS = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "LinkedIn", value: "in/sreekarvvg", href: site.linkedin },
  { label: "GitHub", value: "sreekarvvg", href: site.github },
];

/**
 * The journey ends where a conversation can start. The spectrum resolves into
 * one warm band, so the page closes on the hue it has been travelling toward.
 */
export function Footer() {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="relative flex min-h-svh w-full flex-col justify-between overflow-x-clip px-6 pt-24 pb-10 sm:px-10 lg:px-16"
    >
      <div className="flex flex-1 flex-col justify-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="label text-bone-faint"
        >
          2018 → 2026&nbsp;&nbsp;·&nbsp;&nbsp;The journey so far
        </motion.span>

        <motion.h2
          id="contact-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mt-6 max-w-4xl text-balance text-[clamp(2.2rem,6vw,5rem)] leading-[0.98] tracking-[-0.03em] text-bone"
        >
          Let&rsquo;s build the
          <span className="block" style={{ color: "var(--s4)" }}>
            next one together.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-balance mt-8 max-w-xl text-base leading-[1.6] text-bone-dim"
        >
          Open to product management roles at the intersection of AI, strategy
          and building things people actually use.
        </motion.p>

        {/* The one thing a recruiter reaches for first, given the weight of an
            action rather than the weight of a contact channel. */}
        <motion.a
          href={site.cv}
          target="_blank"
          rel="noreferrer noopener"
          data-cursor
          data-cursor-label="CV"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="group mt-8 flex w-fit items-center gap-4 border px-6 py-4 transition-colors hover:bg-[color-mix(in_oklab,var(--s4)_12%,transparent)]"
          style={{
            borderColor: "color-mix(in oklab, var(--s4) 45%, transparent)",
          }}
        >
          <span
            className="font-display text-lg leading-none sm:text-xl"
            style={{ color: "var(--s4)" }}
          >
            Download CV
          </span>
          <span className="label text-bone-faint">PDF</span>
          <span
            aria-hidden
            className="text-bone-dim transition-transform group-hover:translate-x-1"
          >
            ↓
          </span>
        </motion.a>

        <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-px border-t border-hair sm:grid-cols-3 sm:gap-y-0">
          {LINKS.map((l, i) => (
            <motion.li
              key={l.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.25 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-b border-hair sm:border-b-0"
            >
              <a
                href={l.href}
                target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  l.href.startsWith("mailto:") ? undefined : "noreferrer noopener"
                }
                data-cursor
                data-cursor-label={l.label}
                className="group flex items-baseline justify-between gap-4 py-5 sm:flex-col sm:items-start sm:gap-2"
              >
                <span className="label text-bone-faint">{l.label}</span>
                <span className="flex items-baseline gap-2 text-sm text-bone transition-colors group-hover:text-[var(--s4)] sm:text-base">
                  <span className="min-w-0 truncate">{l.value}</span>
                  <span
                    aria-hidden
                    className="shrink-0 transition-transform group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* the spectrum, resolved */}
      <div className="mt-16 shrink-0">
        <div
          aria-hidden
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(to right, var(--s1), var(--s2), var(--s3), var(--s4), var(--s5))",
          }}
        />
        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <span className="label text-bone-faint">
            {site.name}&nbsp;&nbsp;·&nbsp;&nbsp;{site.role}
          </span>
          <span className="label text-bone-faint">
            Designed &amp; built from scratch
          </span>
        </div>
      </div>
    </footer>
  );
}
