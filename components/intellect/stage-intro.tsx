import {
  intellectDeck,
  intellectMeta,
  intellectMetrics,
  intellectSkills,
  usho,
} from "@/lib/intellect";
import { DocCard } from "@/components/artifacts/doc-card";

const A = "var(--s5)";
const EDGE = "color-mix(in oklab, var(--s5) 55%, transparent)";

/** The main panel: role, problem, solution, impact, the deck, then skills. */
export function StageIntro() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="shrink-0">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="label" style={{ color: A }}>
            {intellectMeta.period}
          </span>
          <span className="label-sm text-bone-faint">Case study 04</span>
        </div>
        <h2 className="font-display mt-3 text-[clamp(1.6rem,3.4vw,2.9rem)] leading-[1.03] tracking-[-0.025em] text-bone">
          AI Product · Strategy &amp; Commercialization
          <span className="block text-bone-dim">
            <span className="text-bone-faint">({intellectMeta.unit}) · </span>
            {intellectMeta.org}
          </span>
        </h2>
      </header>

      <div className="mt-7 grid flex-1 grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
        {/* ── Role, problem, solution ────────────── */}
        <div className="lg:col-span-7">
          <div className="border-l border-hair pl-4">
            <span className="label-sm text-bone-faint">My role</span>
            <p className="mt-2 text-[13.5px] leading-[1.6] text-bone-dim">
              {intellectMeta.myRole}
            </p>
          </div>

          <div className="mt-5 border-l border-hair pl-4">
            <span className="label-sm text-bone-faint">
              The problem I addressed
            </span>
            <p className="mt-2 text-[13.5px] leading-[1.6] text-bone-dim">
              {intellectMeta.problem}
            </p>
          </div>

          <div className="mt-5 border-l pl-4" style={{ borderColor: EDGE }}>
            <span className="label-sm" style={{ color: A }}>
              The solution
            </span>
            <p className="mt-2 text-[13.5px] leading-[1.6] text-bone">
              {intellectMeta.solution}
            </p>
          </div>

          {/* USHO, at a glance */}
          <dl className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {usho.map((m) => (
              <div
                key={m.letter}
                className="border border-hair bg-ink-raise/60 p-3"
              >
                <span
                  className="font-display text-2xl leading-none"
                  style={{ color: A }}
                >
                  {m.letter}
                </span>
                <dt className="label-sm mt-2 text-bone">{m.name}</dt>
                <dd className="mt-1 text-[11px] leading-snug text-bone-faint">
                  {m.blurb}
                </dd>
              </div>
            ))}
          </dl>

          <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-hair pt-5">
            {intellectMetrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span
                    className="font-display block text-[clamp(1.4rem,2.4vw,2.1rem)] leading-none"
                    style={{ color: A }}
                  >
                    {m.value}
                  </span>
                  <span className="mt-1.5 block text-[11.5px] leading-snug text-bone-dim">
                    {m.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── The deck ───────────────────────────── */}
        <div className="flex flex-col lg:col-span-5">
          <div className="flex shrink-0 items-baseline justify-between gap-4">
            <span className="label-sm text-bone-faint">The deck</span>
            <span className="label-sm text-bone-faint">Click to open</span>
          </div>
          <div className="mt-4 flex flex-1 flex-col">
            <DocCard doc={intellectDeck} accent={A} fill />
          </div>
        </div>
      </div>

      <div className="mt-7 shrink-0 border-t border-hair pt-5">
        <span className="label-sm text-bone-faint">Skills / keywords</span>
        <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
          {intellectSkills.map((s) => (
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
