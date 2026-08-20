import { milestones } from "@/lib/milestones";

/**
 * The journey as a timeline, not a row of buttons.
 *
 * A rail runs through five ticks in chronological order, each labelled with
 * the year it starts. Reading it left to right is the point: a row of pills
 * gave no sense of sequence, so nobody knew what they were for. Each tick is a
 * plain anchor to its section, so the whole thing works without JavaScript.
 */
export function MilestoneStrip() {
  return (
    <nav aria-label="Journey timeline" className="w-full max-w-3xl">
      <p className="label-sm mb-3 text-bone-faint">
        The journey&nbsp;&nbsp;·&nbsp;&nbsp;2018 → 2026&nbsp;&nbsp;·&nbsp;&nbsp;
        <span className="text-bone-dim">jump to any chapter</span>
      </p>

      <ol className="relative grid grid-cols-5">
        {/* The rail, drawn behind the ticks and running the full width. */}
        <span
          aria-hidden
          className="absolute top-[7px] left-[7px] h-px"
          style={{
            // Ends on the last tick rather than running off into empty space.
            right: "calc(20% - 7px)",
            background:
              "linear-gradient(to right, var(--s1), var(--s2), var(--s3), var(--s4), var(--s5))",
            opacity: 0.6,
          }}
        />

        {milestones.map((m) => (
          <li key={m.id} className="relative">
            <a
              href={`#${m.id}`}
              title={`${m.role} · ${m.org} · ${m.period}`}
              className="group flex flex-col items-start pr-2"
              style={{ "--tick": m.hue } as React.CSSProperties}
            >
              {/* tick */}
              <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                <span
                  aria-hidden
                  className="absolute h-3.5 w-3.5 rounded-full bg-ink"
                />
                <span
                  aria-hidden
                  className="relative h-[7px] w-[7px] rounded-full transition-transform duration-200 group-hover:scale-[1.7] group-focus-visible:scale-[1.7]"
                  style={{ background: m.hue }}
                />
              </span>

              <span
                className="label-sm mt-2.5 tabular-nums transition-colors group-hover:text-[var(--tick)]"
                style={{ color: "var(--bone-dim)" }}
              >
                {m.year}
              </span>
              <span className="mt-1 text-[12px] leading-tight text-bone-faint transition-colors group-hover:text-bone">
                {m.short}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
