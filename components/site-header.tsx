import { site } from "@/lib/site";

const LINKS = [
  { label: "Email", short: "Mail", href: `mailto:${site.email}` },
  { label: "LinkedIn", short: "In", href: site.linkedin },
  { label: "GitHub", short: "Git", href: site.github },
];

/**
 * Sticky masthead. Server-rendered — it holds no state, so it ships no
 * JavaScript at all.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 h-[var(--header-h)] w-full border-b border-hair bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-3 px-4 sm:gap-4 sm:px-8 lg:px-12">
        <a
          href="#top"
          className="group flex min-w-0 items-baseline gap-2.5 sm:gap-3"
          aria-label={`${site.name} — back to top`}
        >
          <span className="font-display text-[13.5px] leading-none tracking-[-0.01em] text-bone transition-colors group-hover:text-accent sm:text-base">
            {site.name}
          </span>
          <span className="label-sm hidden truncate text-bone-faint md:inline">
            ({site.headerTag})
          </span>
        </a>

        <nav
          aria-label="Contact"
          className="flex shrink-0 items-center gap-3 sm:gap-6"
        >
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={l.href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
              className="label-sm text-bone-dim transition-colors hover:text-bone"
            >
              {/* Short forms below sm so all four reach still fit one row. */}
              <span className="sm:hidden">{l.short}</span>
              <span className="hidden sm:inline">{l.label}</span>
            </a>
          ))}
          <a
            href={site.cv}
            target="_blank"
            rel="noreferrer noopener"
            className="label-sm shrink-0 rounded-full border border-[color-mix(in_oklab,var(--accent)_50%,transparent)] px-2.5 py-1.5 text-accent transition-colors hover:bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] sm:px-3"
          >
            <span className="sm:hidden">CV</span>
            <span className="hidden sm:inline">Download CV</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
