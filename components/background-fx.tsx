export function BackgroundFx() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.35] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />

      <div className="animate-drift absolute -top-40 right-[-10%] h-[42rem] w-[42rem] rounded-full bg-accent/20 blur-[140px]" />
      <div
        className="animate-drift absolute bottom-[-20%] left-[-10%] h-[36rem] w-[36rem] rounded-full bg-accent/10 blur-[140px]"
        style={{ animationDelay: "-9s" }}
      />

      <svg className="absolute inset-0 h-0 w-0">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ filter: "url(#grain)" }}
      />
    </div>
  );
}
