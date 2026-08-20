import {
  eventsBanner,
  mavipMeta,
  mavipMetrics,
  mavipSkills,
  mavipTeams,
  sipDeck,
} from "@/lib/mavip";
import { DocCard } from "@/components/artifacts/doc-card";
import { ImageCard } from "@/components/artifacts/image-card";

const A = "var(--s4)";

export function MavipSection() {
  return (
    <section
      id="mavip"
      aria-labelledby="mavip-heading"
      className="w-full overflow-x-clip"
    >
      <div className="mx-auto flex min-h-[calc(100svh-var(--header-h))] w-full max-w-[1600px] flex-col px-5 pt-8 pb-10 sm:px-8 lg:px-12">
        <header className="shrink-0">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="label" style={{ color: A }}>
              {mavipMeta.period}
            </span>
            <span className="label-sm text-bone-faint">Case study 03</span>
          </div>
          <h2
            id="mavip-heading"
            className="font-display mt-3 text-[clamp(1.6rem,3.4vw,2.9rem)] leading-[1.03] tracking-[-0.025em] text-bone"
          >
            Strategy &amp; Product Management Intern
            <span className="text-bone-dim"> · MAVIP Group</span>
          </h2>
          <p className="label-sm mt-2.5" style={{ color: A }}>
            {mavipMeta.product}
          </p>
        </header>

        <div className="mt-7 grid flex-1 grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
          {/* ── The story ──────────────────────────── */}
          <div className="flex flex-col lg:col-span-5">
            <div className="border-l border-hair pl-4">
              <span className="label-sm text-bone-faint">Summary</span>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-bone">
                {mavipMeta.summary}
              </p>
            </div>

            <div className="mt-5 border-l border-hair pl-4">
              <span className="label-sm text-bone-faint">My role</span>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-bone-dim">
                {mavipMeta.myRole}
              </p>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-hair pt-5 sm:grid-cols-3 lg:grid-cols-2">
              {mavipMetrics.map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span
                      className="font-display block text-[clamp(1.25rem,2vw,1.75rem)] leading-none"
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

            <div className="mt-6 border-t border-hair pt-5">
              <span className="label-sm text-bone-faint">
                Teams &amp; stakeholders
              </span>
              <p className="mt-2 text-[12.5px] leading-relaxed text-bone">
                {mavipTeams.join(" · ")}
              </p>
            </div>
          </div>

          {/* ── The artifacts, given the room ──────── */}
          <div className="flex flex-col lg:col-span-7">
            <div className="flex shrink-0 items-baseline justify-between gap-4">
              <span className="label-sm text-bone-faint">Proof of work</span>
              <span className="label-sm text-bone-faint">Click to open</span>
            </div>
            {/* Explicit ratios rather than flex-1: this column has no definite
                height to divide, and a collapsed deck is worse than a tall
                section. A 16:9 box shows a slide edge to edge. */}
            <div className="mt-4 flex flex-col gap-7">
              <DocCard doc={sipDeck} accent={A} aspect="aspect-[16/9]" />
              <ImageCard
                artifact={eventsBanner}
                accent={A}
                aspect="aspect-[2/1]"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 shrink-0 border-t border-hair pt-5">
          <span className="label-sm text-bone-faint">Skills gained &amp; used</span>
          <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
            {mavipSkills.map((s) => (
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
