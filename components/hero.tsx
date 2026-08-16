"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { KineticHeading } from "./kinetic-heading";
import { Portrait } from "./portrait";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // the hero recedes as the journey rises over it
  const typeY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const typeOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const railOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col justify-center overflow-x-clip px-6 pt-28 pb-20 sm:px-10 lg:px-16"
    >
      {/* top instrument rail */}
      <motion.div
        style={{ opacity: railOpacity }}
        className="absolute inset-x-6 top-8 flex items-center justify-between sm:inset-x-10 lg:inset-x-16"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="label flex items-center gap-2.5 text-bone-dim"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full"
              style={{ background: "var(--s5)" }}
            />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--s5)" }}
            />
          </span>
          Intellect — Present
        </motion.span>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="label hidden text-bone-faint sm:block"
        >
          2018 → 2026
        </motion.span>
      </motion.div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
        {/* ── Type column ───────────────────────────────── */}
        <motion.div
          style={{ y: typeY, opacity: typeOpacity }}
          className="relative z-10 lg:col-span-7"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="label mb-8 text-bone-faint"
          >
            <span style={{ color: "var(--s1)" }}>◆</span>&nbsp;&nbsp;Curiosity,
            compounded
          </motion.p>

          <h1 className="font-display text-[clamp(3.25rem,8.5vw,7.5rem)] leading-[0.9] tracking-[-0.02em] text-bone">
            <KineticHeading
              text="I am"
              delay={0.75}
              className="block text-bone-dim"
            />
            <KineticHeading
              text="Sreekar"
              delay={0.9}
              className="relative block"
            />
          </h1>

          {/* spectrum rule — the site's throughline, introduced here */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 1.35, ease: [0.65, 0, 0.35, 1] }}
            className="mt-10 h-px w-full max-w-md origin-left"
            style={{
              background:
                "linear-gradient(90deg, var(--s1), var(--s2), var(--s3), var(--s4), var(--s5), transparent)",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance mt-8 max-w-lg text-lg leading-[1.65] text-bone-dim sm:text-xl"
          >
            <span className="text-bone">curious by nature</span>, relentless in
            solving problems, and obsessed with understanding how things work.
            I learn fast, research deeply, and love turning complex problems
            into things that{" "}
            <span className="font-display text-bone italic">actually work</span>
            .
          </motion.p>
        </motion.div>

        {/* ── Portrait column ───────────────────────────── */}
        <div className="lg:col-span-5">
          <Portrait scrollDepth={portraitY} />
        </div>
      </div>

      <motion.div
        style={{ opacity: railOpacity }}
        className="absolute inset-x-6 bottom-8 hidden items-center gap-4 sm:inset-x-10 sm:flex lg:inset-x-16"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="label text-bone-faint"
        >
          Scroll
        </motion.span>
        <div className="relative h-px flex-1 overflow-hidden bg-hair">
          <motion.div
            className="absolute inset-y-0 w-1/4"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--s1), transparent)",
            }}
            animate={{ x: ["-100%", "400%"] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="label text-bone-faint"
        >
          Five milestones
        </motion.span>
      </motion.div>
    </section>
  );
}
