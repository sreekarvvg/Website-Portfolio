"use client";

import { motion } from "framer-motion";

/** Common chrome for a stage: eyebrow index + title, then free content. */
export function StageShell({
  index,
  title,
  lede,
  children,
  className = "",
}: {
  index: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col px-6 pt-24 pb-24 sm:px-10 lg:px-16 ${className}`}
    >
      <header className="shrink-0">
        <span className="label text-ml-accent">
          {index} — {title}
        </span>
        {lede && (
          <p className="mt-4 max-w-3xl text-balance text-lg leading-[1.55] text-bone-dim sm:text-xl">
            {lede}
          </p>
        )}
      </header>
      <div className="mt-8 min-h-0 flex-1">{children}</div>
    </div>
  );
}

/** A metric readout. Pending values keep their XX placeholder, dimmed. */
export function Metric({
  value,
  label,
  pending,
  size = "md",
}: {
  value: string;
  label: string;
  pending?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const scale =
    size === "lg"
      ? "text-4xl sm:text-5xl"
      : size === "sm"
        ? "text-xl sm:text-2xl"
        : "text-2xl sm:text-3xl";
  return (
    <div>
      <div
        className={`font-display ${scale} leading-none tracking-[-0.01em] ${
          pending ? "text-bone-faint" : "text-bone"
        }`}
      >
        {value}
      </div>
      <div
        className={`label mt-2 ${pending ? "text-bone-faint/70" : "text-bone-dim"}`}
      >
        {label}
      </div>
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
