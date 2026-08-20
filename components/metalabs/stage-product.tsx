import {
  collaboration,
  headlineMetrics,
  meta,
  myRole,
  skills,
  theIdea,
  theSolution,
} from "@/lib/metalabs";

const A = "var(--ml-accent)";

/**
 * The main panel. Everything a reader needs about this role lives here —
 * timeline, title, idea, solution, impact, teams, role and skills — so the
 * five stages behind it stay genuinely optional.
 */
export function StageProduct() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="shrink-0">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="label" style={{ color: A }}>
            {meta.period}
          </span>
          <span className="label-sm text-bone-faint">Case study 01</span>
        </div>
        <h2 className="font-display mt-3 text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.025em] text-bone">
          Product Manager
          <span className="text-bone-dim"> · Metalabs Technology</span>
        </h2>
      </header>

      {/* Three readings across the top, the impact band anchored beneath them.
          The band is what a recruiter scans first, so it gets the full width
          and the largest type on the stage. */}
      <div className="mt-7 grid flex-1 grid-cols-1 items-start gap-x-12 gap-y-6 lg:grid-cols-12">
        <div className="border-l border-hair pl-4 lg:col-span-3">
          <span className="label-sm text-bone-faint">The Idea</span>
          <p className="mt-2 text-[13.5px] leading-[1.55] text-bone-dim">
            {theIdea}
          </p>
        </div>

        <div
          className="border-l pl-4 lg:col-span-4"
          style={{ borderColor: "color-mix(in oklab, var(--s2) 55%, transparent)" }}
        >
          <span className="label-sm" style={{ color: A }}>
            The Solution
          </span>
          <p className="mt-2 text-[13.5px] leading-[1.55] text-bone">
            {theSolution}
          </p>
        </div>

        <div className="lg:col-span-5">
          <span className="label-sm text-bone-faint">My role</span>
          <p className="mt-2 text-[13.5px] leading-[1.55] text-bone-dim">
            {myRole}
          </p>
          <div className="mt-4 border-t border-hair pt-3.5">
            <span className="label-sm text-bone-faint">Teams</span>
            <p className="mt-2 text-[12.5px] leading-relaxed text-bone">
              {collaboration.join(" · ")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 shrink-0 border-t border-hair pt-6">
        <span className="label-sm text-bone-faint">Impact</span>
        <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-6 lg:grid-cols-4">
          {headlineMetrics.map((m) => (
            <div key={m.label}>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span
                  className="font-display block text-[clamp(2rem,3.6vw,3.25rem)] leading-none"
                  style={{ color: A }}
                >
                  {m.value}
                </span>
                <span className="mt-2.5 block text-[12.5px] leading-snug text-bone-dim">
                  {m.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-7 shrink-0 border-t border-hair pt-5">
        <span className="label-sm text-bone-faint">Skills gained &amp; used</span>
        <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
          {skills.map((s) => (
            <li
              key={s}
              className="label-sm border border-hair px-2.5 py-1 text-bone-dim"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
