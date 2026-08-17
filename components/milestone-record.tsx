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
              compact
                ? "text-2xl leading-tight"
                : "text-[clamp(1.6rem,2.9vw,2.6rem)] leading-[1.06]"
            }`}
          >
            {milestone.role}
          </h3>
          <p className="font-display mt-1.5 text-lg text-bone-dim">
            <span className="text-bone-faint italic">@ </span>
            {milestone.org}
          </p>
          <p className="label mt-3 text-bone-faint">{milestone.essence}</p>
        </div>

        <div className={compact ? "" : "lg:col-span-7"}>
          <p
            className="text-balance max-w-2xl border-l pl-4 text-[15px] leading-[1.6] text-bone"
            style={{
              borderColor: `color-mix(in oklab, ${milestone.hue} 45%, transparent)`,
            }}
          >
            {milestone.impact}
          </p>
          <p className="text-balance mt-5 max-w-2xl text-[15px] leading-[1.7] text-bone-dim">
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
