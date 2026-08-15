export type PathPoint = { x: number; y: number };

/**
 * Builds an orthogonal "circuit trace" path through a series of points —
 * right-angle routing (vertical rise/drop, then horizontal run) rather than
 * a smooth curve, echoing a schematic / PCB trace rather than a generic
 * decorative wave.
 */
export function buildTracePath(points: PathPoint[]): string {
  if (points.length === 0) return "";
  const [first, ...rest] = points;
  let d = `M ${first.x} ${first.y}`;
  let prev = first;

  rest.forEach((point) => {
    const midX = prev.x + (point.x - prev.x) / 2;
    d += ` L ${midX} ${prev.y} L ${midX} ${point.y} L ${point.x} ${point.y}`;
    prev = point;
  });

  return d;
}
