const CORNERS = [
  { pos: "top-5 left-5 sm:top-7 sm:left-7", border: "border-t border-l" },
  { pos: "top-5 right-5 sm:top-7 sm:right-7", border: "border-t border-r" },
  {
    pos: "bottom-5 left-5 sm:bottom-7 sm:left-7",
    border: "border-b border-l",
  },
  {
    pos: "bottom-5 right-5 sm:bottom-7 sm:right-7",
    border: "border-b border-r",
  },
];

export function DraftingFrame() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 hidden lg:block"
    >
      {CORNERS.map((corner) => (
        <span
          key={corner.pos}
          className={`absolute h-5 w-5 ${corner.border} border-white/15 ${corner.pos}`}
        />
      ))}
    </div>
  );
}
