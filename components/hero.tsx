"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { PhotoFrame } from "./photo-frame";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative flex min-h-svh w-full flex-col justify-center overflow-hidden px-6 pt-28 pb-16 sm:px-10 lg:px-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-muted uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Portfolio
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="font-display text-balance text-6xl leading-[1.05] font-semibold text-white sm:text-7xl lg:text-8xl"
          >
            I am Sreekar
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.25}
            variants={fadeUp}
            className="mt-8 max-w-xl text-balance text-lg leading-relaxed font-medium text-accent sm:text-xl"
          >
            curious by nature, relentless in solving problems, and obsessed
            with understanding how things work. I learn fast, research
            deeply, and love turning complex problems into things that
            actually work.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <PhotoFrame />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mx-auto mt-20 flex flex-col items-center gap-2 text-muted"
      >
        <span className="font-mono text-[11px] tracking-[0.25em] uppercase">
          Scroll to explore the journey
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-accent" />
        </motion.span>
      </motion.div>
    </section>
  );
}
