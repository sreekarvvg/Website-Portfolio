import { milestones } from "@/lib/milestones";

/**
 * The journey, compressed into a single row of links.
 *
 * This replaces the full-height rail section: the same spectrum, the same
 * hue-per-milestone language and the same hover lift, at a size that fits in
 * the hero. Each pill is an anchor, so a click lands on the section itself and
 * the whole strip works with no JavaScript.
 */
export function MilestoneStrip() {
  return (
    <nav aria-label="Journey" className="w-full">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
        {milestones.map((m) => (
          <li key={m.id}>
            <a
              href={`#${m.id}`}
              title={`${m.role} · ${m.org} · ${m.period}`}
              className="group flex items-center gap-2 rounded-full border border-hair bg-ink-raise/70 py-1.5 pr-3.5 pl-2.5 transition-colors hover:border-[color-mix(in_oklab,var(--pill)_55%,transparent)] hover:bg-[color-mix(in_oklab,var(--pill)_12%,transparent)]"
              style={{ "--pill": m.hue } as React.CSSProperties}
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full transition-transform group-hover:scale-150"
                style={{ background: m.hue }}
              />
              <span
                className="label-sm text-bone-faint transition-colors group-hover:text-[var(--pill)]"
              >
                {m.index}
              </span>
              <span className="text-[12.5px] leading-none whitespace-nowrap text-bone-dim transition-colors group-hover:text-bone">
                {m.org}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
