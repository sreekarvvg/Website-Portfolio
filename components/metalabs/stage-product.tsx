"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { collaboration, headlineMetrics, theIdea } from "@/lib/metalabs";
import { Metric } from "./stage-shell";

/**
 * The film is several screens below the fold and weighs megabytes, so its
 * source is attached only once this stage approaches the viewport. Anyone who
 * never reaches MetaLabs — or who asks for reduced motion — never pays for it,
 * and the poster carries the stage in the meantime.
 */
function useFilmSource() {
  const ref = useRef<HTMLVideoElement>(null);
  const [attach, setAttach] = useState(false);

  useEffect(() => {
    if (attach) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setAttach(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [attach]);

  return [ref, attach] as const;
}

export function StageProduct({ onExplore }: { onExplore: () => void }) {
  const [filmRef, filmReady] = useFilmSource();

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background film — subdued, never competing with the text.
          The poster doubles as a graceful fallback: if the browser cannot
          decode the file, the stage still reads as intended rather than
          collapsing to an empty black panel. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/metalabs/concept/street-exterior.webp)" }}
      />
      <video
        ref={filmRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={filmReady ? "/metalabs/video/metalabs.mp4" : undefined}
        poster="/metalabs/concept/street-exterior.webp"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        aria-hidden
        tabIndex={-1}
      />
      <div className="absolute inset-0 bg-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/72 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/55" />

      <div className="relative flex w-full flex-col justify-between gap-10 px-6 pt-20 pb-28 sm:px-10 md:h-full md:gap-0 md:pt-24 md:pb-24 lg:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="label text-ml-accent"
            >
              01 — The Product
            </motion.span>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-display mt-5 text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.02] tracking-[-0.025em] text-bone"
            >
              Product Manager
              <span className="block text-bone-dim">
                <span className="text-bone-faint italic">@ </span>
                Meta Labs Technology
              </span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-balance mt-5 max-w-xl text-sm leading-[1.6] text-bone sm:text-base"
            >
              Owned product from concept to MVP across 3 applications — scaled
              the team 4&rarr;15, lifted development efficiency 80%, and grew
              the community to 10.5K followers in 4 weeks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2"
            >
              <span className="rounded-full border border-ml-accent/40 px-3 py-1 label text-ml-accent">
                Product Manager
              </span>
              {collaboration.map((c) => (
                <span key={c} className="label text-bone-faint">
                  {c}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="border-l border-hair pl-6">
              <span className="label text-bone-faint">The Idea</span>
              <p className="font-display mt-3 text-balance text-lg leading-[1.45] text-bone-dim italic sm:text-xl">
                {theIdea}
              </p>
            </div>
            <div className="mt-6 border-l border-ml-accent/40 pl-6">
              <span className="label text-ml-accent">The Solution</span>
              <p className="mt-3 text-balance text-base leading-[1.6] text-bone sm:text-lg">
                A mobile-first Web3 gaming ecosystem combining gameplay,
                digital ownership, rewards, virtual worlds, AR experiences and
                real-world utility.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Primary call to continue — the strongest cue on the stage */}
        <motion.button
          type="button"
          onClick={onExplore}
          data-cursor
          data-cursor-label="Go"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="group my-8 flex w-fit cursor-pointer items-center gap-5"
        >
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ml-accent/50 text-ml-accent transition-colors group-hover:bg-ml-accent group-hover:text-ink">
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full border border-ml-accent/40"
              animate={{ scale: [1, 1.55], opacity: [0.7, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="text-xl">→</span>
          </span>
          <span className="text-left">
            <span className="font-display block text-3xl leading-none text-bone transition-colors group-hover:text-ml-accent sm:text-4xl">
              Explore the journey
            </span>
            <span className="label mt-2 block text-bone-faint">
              Six stages · scroll or use →
            </span>
          </span>
        </motion.button>

        {/* Metrics band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-hair pt-7 sm:grid-cols-3 lg:grid-cols-6"
        >
          {headlineMetrics.map((m, i) => (
            <Metric key={`${m.label}-${i}`} {...m} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
