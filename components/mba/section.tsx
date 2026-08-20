import { loreal, mbaMeta, mbaSkills, pillars, thoucentric } from "@/lib/mba";
import { DocCard } from "@/components/artifacts/doc-card";

const A = "var(--s3)";

export function MbaSection() {
  return (
    <section
      id="mba"
      aria-labelledby="mba-heading"
      className="w-full overflow-x-clip"
    >
      <div className="mx-auto flex min-h-[calc(100svh-var(--header-h))] w-full max-w-[1600px] flex-col px-5 pt-8 pb-10 sm:px-8 lg:px-12">
        <header className="shrink-0">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="label" style={{ color: A }}>
              {mbaMeta.period}
            </span>
            <span className="label-sm text-bone-faint">Case study 02</span>
          </div>
          <h2
            id="mba-heading"
            className="font-display mt-3 text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.025em] text-bone"
          >
            {mbaMeta.degree}
            <span className="text-bone-dim"> · {mbaMeta.school}</span>
          </h2>

          <div className="mt-6 grid grid-cols-1 items-start gap-x-12 gap-y-6 lg:grid-cols-12">
            <p className="max-w-3xl text-[14.5px] leading-[1.65] text-bone-dim lg:col-span-8">
              {mbaMeta.summary}
            </p>
            <div
              className="border-l pl-5 lg:col-span-4"
              style={{ borderColor: "color-mix(in oklab, var(--s3) 55%, transparent)" }}
            >
              <span
                className="font-display block text-[clamp(1.9rem,3.4vw,2.9rem)] leading-none"
                style={{ color: A }}
              >
                {mbaMeta.standing}
              </span>
              <span className="label-sm mt-2 block text-bone-dim">
                {mbaMeta.standingNote}
              </span>
            </div>
          </div>
        </header>

        <div className="mt-9 grid flex-1 grid-cols-1 gap-x-12 gap-y-9 lg:grid-cols-12">
          {/* ── What the two years were made of ────── */}
          <div className="lg:col-span-5">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-1">
              {pillars.map((p) => (
                <div key={p.index} className="border-t border-hair pt-3.5">
                  <dt className="flex items-baseline gap-3">
                    <span className="label-sm" style={{ color: A }}>
                      {p.index}
                    </span>
                    <span className="font-display text-lg leading-tight text-bone">
                      {p.title}
                    </span>
                  </dt>
                  <dd className="mt-1.5 text-[12.5px] leading-relaxed text-bone-dim">
                    {p.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Proof of work ──────────────────────── */}
          <div className="flex flex-col lg:col-span-7">
            <div className="flex shrink-0 items-baseline justify-between gap-4">
              <span className="label-sm text-bone-faint">Proof of work</span>
              <span className="label-sm text-bone-faint">Click to read</span>
            </div>
            <div className="mt-4 grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2">
              <DocCard doc={thoucentric} accent={A} fill />
              <DocCard doc={loreal} accent={A} fill />
            </div>
          </div>
        </div>

        <div className="mt-9 shrink-0 border-t border-hair pt-6">
          <p
            className="max-w-4xl border-l pl-5 text-[14.5px] leading-[1.6] text-bone"
            style={{ borderColor: "color-mix(in oklab, var(--s3) 55%, transparent)" }}
          >
            {mbaMeta.positioning}
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-2">
            {mbaSkills.map((s) => (
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
    </section>
  );
}
