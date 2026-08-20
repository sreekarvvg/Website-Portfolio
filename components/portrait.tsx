import Image from "next/image";

/**
 * Drop the real photograph at /public/portrait.jpg (portrait crop, ~1200×1500
 * or larger) and set PORTRAIT_SRC to "/portrait.jpg". Until then the frame
 * holds its own shape so the hero never reflows when the image lands.
 *
 * Deliberately static: the pointer-tracked parallax this replaced ran a spring
 * simulation on every mouse move for an effect nobody asked for.
 */
const PORTRAIT_SRC: string | null = null;

export function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
      {/* spectrum rim */}
      <div
        aria-hidden
        className="absolute -inset-px rounded-[2px] opacity-60"
        style={{
          background:
            "linear-gradient(150deg, var(--s1), var(--s2) 28%, var(--s3) 52%, var(--s4) 76%, var(--s5))",
        }}
      />
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1px] bg-ink-raise">
        {PORTRAIT_SRC ? (
          <Image
            src={PORTRAIT_SRC}
            alt="Sai Sreekar VVG"
            fill
            priority
            sizes="(max-width: 1024px) 80vw, 34vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col justify-end p-6">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 50% at 50% 38%, color-mix(in oklab, var(--s5) 16%, transparent), transparent 70%)",
              }}
            />
            <span className="label relative text-bone-faint">Portrait</span>
            <span className="font-display relative mt-1.5 text-lg text-bone-dim italic">
              awaiting the photograph
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
