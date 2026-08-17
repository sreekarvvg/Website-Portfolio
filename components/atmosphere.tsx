"use client";

import { useEffect, useRef } from "react";

type Orb = {
  color: string;
  /** normalised home position */
  hx: number;
  hy: number;
  /** orbit radii */
  ox: number;
  oy: number;
  /** angular speed + phase */
  speed: number;
  phase: number;
  /** radius as a fraction of the viewport diagonal */
  scale: number;
  /** how strongly this orb chases the pointer */
  pull: number;
};

const ORBS: Orb[] = [
  { color: "69,200,240", hx: 0.18, hy: 0.28, ox: 0.05, oy: 0.06, speed: 0.05, phase: 0.0, scale: 0.42, pull: 0.05 },
  { color: "61,220,174", hx: 0.78, hy: 0.2, ox: 0.06, oy: 0.05, speed: 0.043, phase: 1.4, scale: 0.36, pull: 0.03 },
  { color: "245,196,81", hx: 0.5, hy: 0.72, ox: 0.07, oy: 0.05, speed: 0.037, phase: 2.7, scale: 0.34, pull: 0.04 },
  { color: "251,143,74", hx: 0.86, hy: 0.68, ox: 0.05, oy: 0.06, speed: 0.048, phase: 4.0, scale: 0.32, pull: 0.03 },
  { color: "251,111,141", hx: 0.24, hy: 0.82, ox: 0.06, oy: 0.05, speed: 0.041, phase: 5.2, scale: 0.34, pull: 0.04 },
];

export function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let diagonal = 0;
    let raf = 0;
    let running = true;

    // pointer target + eased actual, kept in normalised space
    const pointer = { tx: 0.5, ty: 0.4, x: 0.5, y: 0.4 };

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = window.innerWidth;
      height = window.innerHeight;
      diagonal = Math.hypot(width, height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(elapsed: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;

      for (const orb of ORBS) {
        const angle = elapsed * orb.speed + orb.phase;
        const px = orb.hx + Math.cos(angle) * orb.ox + (pointer.x - 0.5) * orb.pull;
        const py = orb.hy + Math.sin(angle * 1.18) * orb.oy + (pointer.y - 0.5) * orb.pull;

        const cx = px * width;
        const cy = py * height;
        // gentle breathing so the field never looks frozen
        const r = orb.scale * diagonal * (0.92 + Math.sin(angle * 0.7) * 0.08);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, `rgba(${orb.color},0.30)`);
        grad.addColorStop(0.28, `rgba(${orb.color},0.10)`);
        grad.addColorStop(0.62, `rgba(${orb.color},0.025)`);
        grad.addColorStop(1, `rgba(${orb.color},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
    }

    function loop(now: number) {
      if (!running) return;
      draw(now / 1000);
      raf = requestAnimationFrame(loop);
    }

    function handlePointer(event: PointerEvent) {
      pointer.tx = event.clientX / window.innerWidth;
      pointer.ty = event.clientY / window.innerHeight;
    }

    function handleVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      // one static, fully-formed frame — no animation, no pointer tracking
      draw(0);
    } else {
      window.addEventListener("pointermove", handlePointer, { passive: true });
      document.addEventListener("visibilitychange", handleVisibility);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-ink">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* scrim restores depth: the colour reads as light pooling in darkness
          rather than a flat wash, and keeps body copy above 4.5:1 */}
      <div className="absolute inset-0 bg-ink/55" />

      {/* vignette pools the remaining light toward the centre */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_88%_78%_at_50%_45%,transparent_20%,var(--ink)_100%)]" />

      {/* film grain */}
      <svg className="absolute h-0 w-0">
        <filter id="atmosphere-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-overlay"
        style={{ filter: "url(#atmosphere-grain)" }}
      />
    </div>
  );
}
