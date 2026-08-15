import type { Milestone } from "@/lib/milestones";

export function MilestoneDetail({ milestone }: { milestone: Milestone }) {
  return (
    <div className="grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
      <div>
        <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
          {milestone.index} — {milestone.period}
        </p>
        <h3 className="font-display mt-3 text-3xl font-semibold text-white sm:text-4xl">
          {milestone.title}
        </h3>
        <p className="mt-5 max-w-xl text-balance leading-relaxed text-muted">
          {milestone.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {milestone.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border-soft bg-white/[0.02] px-3 py-1 text-xs text-foreground/80"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-xs tracking-[0.3em] text-muted uppercase">
          Proof &amp; Artifacts
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-border-soft bg-white/[0.015] text-[11px] text-muted-dim"
            >
              coming soon
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
