import {
  engAgents,
  engGoal,
  engMeta,
  engProjects,
  engSkills,
} from "@/lib/engineering";

const ACCENT = "var(--s1)";
const EDGE = "color-mix(in oklab, var(--s1) 45%, transparent)";

/** Slide 1 — where the habit started, and what it has produced. */
export function StageOverview() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="shrink-0">
        <span className="label" style={{ color: ACCENT }}>
          01 — {engMeta.unit}
        </span>
        <h3 className="font-display mt-4 text-[clamp(1.7rem,3.4vw,2.75rem)] leading-[1.04] tracking-[-0.025em] text-bone">
          {engMeta.role}
          <span className="block text-bone-dim">
            <span className="text-bone-faint italic">@ </span>
            {engMeta.org}
          </span>
        </h3>
        <p className="label mt-3 text-bone-faint">{engMeta.period}</p>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-8 md:min-h-0 md:flex-1 md:grid-rows-[minmax(0,1fr)] lg:grid-cols-12 lg:gap-12">
        {/* ── The habit ─────────────────────────────── */}
        <div className="flex min-w-0 flex-col md:min-h-0 lg:col-span-5">
          <blockquote
            className="border-l pl-6"
            style={{ borderColor: EDGE }}
          >
            <p className="font-display text-balance text-[clamp(1.1rem,1.9vw,1.55rem)] leading-[1.3] text-bone italic">
              {engMeta.thesis}
            </p>
          </blockquote>

          <div className="mt-5 space-y-3">
            {engMeta.paragraphs.map((p, i) => (
              <p
                key={i}
                className="max-w-xl text-[12.5px] leading-[1.55] text-bone-dim"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Anchored to the foot of the column so the panel reads as a block
              of type between two rules rather than as text that ran out. */}
          <ul className="mt-6 flex flex-wrap gap-x-2.5 gap-y-2 md:mt-auto md:pt-6">
            {engSkills.map((s) => (
              <li
                key={s}
                className="label border border-hair px-2.5 py-1 text-bone-dim"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* ── What it produced ──────────────────────── */}
        <div className="flex min-w-0 flex-col md:min-h-0 lg:col-span-7">
          <span className="label shrink-0 text-bone-faint">Selected work</span>

          <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {engProjects.slice(0, 2).map((p) => (
              <article
                key={p.id}
                className="border border-hair bg-ink-raise/60 p-3"
              >
                <span className="label" style={{ color: ACCENT }}>
                  {p.index}
                </span>
                <h4 className="font-display mt-2 text-lg leading-tight text-bone">
                  {p.name}
                </h4>
                <p className="mt-2 text-[11px] leading-snug text-bone-dim">
                  {p.body}
                </p>
              </article>
            ))}
          </div>

          {/* The current project, given the weight it deserves */}
          <article
            className="mt-2.5 flex min-h-0 flex-col border bg-ink-raise/60 p-3.5 md:flex-1"
            style={{ borderColor: EDGE }}
          >
            <div className="flex shrink-0 flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="label" style={{ color: ACCENT }}>
                {engProjects[2].index}
              </span>
              <h4 className="font-display text-xl leading-tight text-bone">
                {engProjects[2].name}
              </h4>
              <span
                className="label rounded-full border px-2 py-0.5"
                style={{ borderColor: EDGE, color: ACCENT }}
              >
                {engProjects[2].status}
              </span>
            </div>

            <p className="mt-2.5 max-w-2xl shrink-0 text-[12px] leading-relaxed text-bone-dim">
              {engProjects[2].body}
            </p>

            <p className="label-sm mt-3 shrink-0 text-bone-faint">
              A multi-agent research workflow
            </p>
            <dl className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3">
              {engAgents.map((a) => (
                <div
                  key={a.name}
                  className="border-l border-hair pl-2.5"
                >
                  <dt className="text-[11px] leading-tight font-medium text-bone">
                    {a.name}
                  </dt>
                  <dd className="mt-1 text-[10.5px] leading-snug text-bone-faint">
                    {a.body}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="text-balance mt-auto max-w-2xl pt-3 text-[12px] leading-relaxed text-bone-dim italic">
              {engGoal}
            </p>
          </article>

        </div>
      </div>
    </div>
  );
}
