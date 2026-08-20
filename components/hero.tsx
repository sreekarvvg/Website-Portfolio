import { site } from "@/lib/site";
import { MilestoneStrip } from "./milestone-strip";
import { Portrait } from "./portrait";

/**
 * The hero carries five things in one screen: the journey strip, the name, the
 * positioning line, the about paragraph and the way in. No client JavaScript.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="w-full px-5 pt-10 pb-16 sm:px-8 sm:pt-14 lg:px-12 lg:pt-16 lg:pb-20"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7 xl:col-span-8">
          <MilestoneStrip />

          <h1
            id="hero-heading"
            className="font-display mt-8 text-[clamp(2.75rem,7.2vw,5.75rem)] leading-[0.95] tracking-[-0.025em] text-bone"
          >
            {site.name}
          </h1>

          <p className="label mt-5 text-accent">{site.role}</p>

          <p className="mt-6 max-w-2xl text-[15px] leading-[1.7] text-bone-dim sm:text-base">
            {site.about}
          </p>

          <a
            href="#metalabs"
            className="group mt-9 inline-flex items-center gap-3 border border-[color-mix(in_oklab,var(--accent)_45%,transparent)] px-6 py-3.5 transition-colors hover:bg-[color-mix(in_oklab,var(--accent)_12%,transparent)]"
          >
            <span className="font-display text-lg leading-none text-accent sm:text-xl">
              See what I&rsquo;ve built
            </span>
            <span
              aria-hidden
              className="text-bone-dim transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <Portrait />
        </div>
      </div>
    </section>
  );
}
