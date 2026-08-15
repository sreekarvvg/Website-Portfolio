import type { Milestone } from "@/lib/milestones";

const PLATE_CORNERS = [
  "top-1.5 left-1.5 border-t border-l",
  "top-1.5 right-1.5 border-t border-r",
  "bottom-1.5 left-1.5 border-b border-l",
  "bottom-1.5 right-1.5 border-b border-r",
];

export function MilestoneDetail({ milestone }: { milestone: Milestone }) {
  const Icon = milestone.icon;

  return (
    <div className="relative grid grid-cols-1 gap-10 overflow-hidden px-6 py-10 sm:px-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <span
        aria-hidden
        className="font-display pointer-events-none absolute -top-8 -right-2 text-[9rem] leading-none font-medium text-white/[0.03] select-none"
      >
        {milestone.index}
      </span>

      <div className="relative">
        <div className="flex items-center gap-3">
          <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
          <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
            {milestone.index} — {milestone.period}
          </p>
        </div>
        <h3 className="font-display mt-4 text-3xl font-medium text-white sm:text-4xl">
          {milestone.title}
        </h3>
        <p className="text-balance mt-5 max-w-xl leading-relaxed text-muted">
          {milestone.description}
        </p>

        <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-border-fine pt-6">
          <dt className="sr-only">Skills</dt>
          {milestone.skills.map((skill, i) => (
            <dd
              key={skill}
              className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-foreground/75 uppercase"
            >
              <span className="text-muted-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              {skill}
            </dd>
          ))}
        </dl>
      </div>

      <div className="relative">
        <p className="font-mono text-xs tracking-[0.3em] text-muted uppercase">
          Artifacts
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative flex aspect-square items-center justify-center border border-border-fine bg-white/[0.012]"
            >
              {PLATE_CORNERS.map((corner) => (
                <span
                  key={corner}
                  className={`absolute h-3 w-3 border-white/20 ${corner}`}
                />
              ))}
              <span className="font-mono text-[10px] tracking-[0.15em] text-muted-dim uppercase">
                Plate {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
