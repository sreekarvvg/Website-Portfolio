"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The case-study film, played only where it is shown.
 *
 * The source is attached when the section approaches the viewport, so the
 * megabytes are never spent by a visitor who does not reach MetaLabs, and never
 * at all under reduced motion — the poster carries the frame either way.
 */
export function Film({ visible }: { visible: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [attach, setAttach] = useState(false);

  useEffect(() => {
    if (attach || !visible) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setAttach(true);
          io.disconnect();
        }
      },
      { rootMargin: "250px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [attach, visible]);

  // Pause off-stage rather than unmount, so returning to stage 01 is instant.
  useEffect(() => {
    const el = ref.current;
    if (!el || !attach) return;
    if (visible) void el.play().catch(() => {});
    else el.pause();
  }, [visible, attach]);

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src={attach ? "/metalabs/video/metalabs.mp4" : undefined}
        poster="/metalabs/concept/street-exterior.webp"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        tabIndex={-1}
      />
      {/* Enough veil to read against, and no more — the film should be seen. */}
      <div className="absolute inset-0 bg-ink/52" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/35 to-ink/20" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
