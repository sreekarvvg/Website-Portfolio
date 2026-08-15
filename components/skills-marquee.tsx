import { milestones } from "@/lib/milestones";

const allSkills = Array.from(new Set(milestones.flatMap((m) => m.skills)));

export function SkillsMarquee() {
  return (
    <div
      aria-hidden
      className="relative mt-10 overflow-hidden border-y border-border-fine py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div className="animate-marquee flex w-max gap-8">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 gap-8">
            {allSkills.map((skill, i) => (
              <li
                key={`${copy}-${skill}`}
                className="flex shrink-0 items-center gap-8 font-mono text-xs tracking-[0.25em] text-muted-dim uppercase"
              >
                {skill}
                {i < allSkills.length - 1 && (
                  <span className="h-3 w-px bg-border-soft" />
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
