"use client";

import { motion } from "framer-motion";
import type { Milestone } from "@/lib/milestones";

const ease = [0.16, 1, 0.3, 1] as const;

export function MilestoneRecord({
  milestone,
  compact = false,
}: {
  milestone: Milestone;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease }}
      className={compact ? "" : "border-t border-hair-faint pt-10"}
    >
      {!compact && (
        <motion.div
          className="mb-10 h-px origin-left"
          style={{
            background: `linear-gradient(90deg, ${milestone.hue}, transparent)`,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease }}
        />
      )}

      <div
        className={
          compact
            ? "space-y-6"
            : "grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12"
        }
      >
        <div className={compact ? "" : "lg:col-span-5"}>
          <span className="label" style={{ color: milestone.hue }}>
            {milestone.index} — {milestone.period}
          </span>
          <h3
            className={`font-display mt-4 tracking-[-0.02em] text-bone ${
              compact ? "text-3xl" : "text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.04]"
            }`}
          >
            {milestone.title}
          </h3>
          <p className="font-display mt-2 text-xl italic text-bone-dim">
            {milestone.essence}
          </p>
        </div>

        <div className={compact ? "" : "lg:col-span-7"}>
          <p className="text-balance max-w-2xl text-lg leading-[1.7] text-bone-dim">
            {milestone.description}
          </p>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-hair-faint pt-6">
            {milestone.skills.map((skill, i) => (
              <motion.li
                key={skill}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.05, ease }}
                className="label flex items-baseline gap-2 text-bone"
              >
                <span style={{ color: milestone.hue }}>·</span>
                {skill}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
