"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Drop the real photograph at /public/portrait.jpg (portrait crop, ideally
 * ~1200x1500 or larger) and set PORTRAIT_SRC to "/portrait.jpg".
 *
 * Everything below — the depth parallax, duotone grading, spectrum rim light
 * and mask reveal — is built to receive a real image, not to stand in for one.
 */
const PORTRAIT_SRC: string | null = null;

export function Portrait({ scrollDepth }: { scrollDepth?: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { stiffness: 130, damping: 18, mass: 0.6 };

  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), spring);
  // foreground layers travel further than the plate → parallax depth
  const shiftX = useSpring(useTransform(mx, [0, 1], [14, -14]), spring);
  const shiftY = useSpring(useTransform(my, [0, 1], [10, -10]), spring);
  const glowX = useTransform(mx, [0, 1], ["15%", "85%"]);
  const glowY = useTransform(my, [0, 1], ["15%", "85%"]);

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const b = ref.current?.getBoundingClientRect();
    if (!b) return;
    mx.set((event.clientX - b.left) / b.width);
    my.set((event.clientY - b.top) / b.height);
  }
  function onPointerLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      style={scrollDepth ? { y: scrollDepth } : undefined}
      className="relative mx-auto w-full max-w-[26rem]"
    >
      {/* spectral bloom behind the plate */}
      <div
        aria-hidden
        className="animate-veil absolute -inset-12 -z-10 opacity-100 blur-[64px]"
        style={{
          background:
            "conic-gradient(from 210deg, var(--s1), var(--s2), var(--s3), var(--s4), var(--s5), var(--s1))",
          maskImage: "radial-gradient(closest-side, black, transparent)",
          WebkitMaskImage: "radial-gradient(closest-side, black, transparent)",
        }}
      />

      <motion.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        data-cursor
        data-cursor-label="Sreekar"
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="group relative aspect-[4/5] w-full [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[1px] border border-hair bg-ink-raise">
          {PORTRAIT_SRC ? (
            <>
              <Image
                src={PORTRAIT_SRC}
                alt="Sreekar"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 26rem"
                className="object-cover contrast-[1.08] saturate-[0.85]"
              />
              {/* duotone grade — ties the portrait into the spectrum */}
              <div
                aria-hidden
                className="absolute inset-0 mix-blend-color opacity-45"
                style={{
                  background:
                    "linear-gradient(150deg, var(--s1), transparent 55%, var(--s5))",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80"
              />
            </>
          ) : (
            <PortraitPending glowX={glowX} glowY={glowY} />
          )}

          {/* travelling rim light along the top edge */}
          <motion.div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--s1), var(--s3), var(--s5), transparent)",
            }}
            animate={{ opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* floating registration marks — the parallax foreground plane */}
        <motion.div
          aria-hidden
          style={{ x: shiftX, y: shiftY, transform: "translateZ(60px)" }}
          className="pointer-events-none absolute -inset-4"
        >
          <span className="absolute top-0 left-0 h-8 w-8 border-t border-l border-bone/25" />
          <span className="absolute right-0 bottom-0 h-8 w-8 border-r border-b border-bone/25" />
        </motion.div>
      </motion.div>

      <div className="mt-6 flex items-baseline justify-between">
        <span className="label text-bone-faint">Fig. 01</span>
        <span className="label text-bone-faint">2026</span>
      </div>
    </motion.div>
  );
}

/** The awaiting-photo state — composed, not a grey box. */
function PortraitPending({
  glowX,
  glowY,
}: {
  glowX: MotionValue<string>;
  glowY: MotionValue<string>;
}) {
  return (
    <>
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(420px circle at ${glowX} ${glowY}, color-mix(in oklab, var(--s1) 22%, transparent), transparent 68%)`,
        }}
      />

      {/* contour topography — reads as depth, not as a placeholder icon */}
      <svg
        aria-hidden
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-[0.5]"
        fill="none"
      >
        <defs>
          <linearGradient id="contour" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--s1)" stopOpacity="0.75" />
            <stop offset="50%" stopColor="var(--s3)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--s5)" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        {Array.from({ length: 16 }).map((_, i) => {
          const t = i / 15;
          const cy = 250 + Math.sin(t * Math.PI * 2) * 6;
          return (
            <motion.ellipse
              key={i}
              cx={200}
              cy={cy}
              rx={40 + i * 13}
              ry={58 + i * 17}
              stroke="url(#contour)"
              strokeWidth={0.75}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 - t * 0.72 }}
              transition={{ duration: 1, delay: 0.9 + i * 0.045 }}
            />
          );
        })}
      </svg>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6">
        <span className="label text-bone-dim">Portrait</span>
        <span className="font-display text-2xl text-bone/70 italic">
          awaiting the photograph
        </span>
      </div>
    </>
  );
}
