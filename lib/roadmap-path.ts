export type PathPoint = { x: number; y: number };

/**
 * Builds a smooth cubic-bezier "S curve" path through a series of points,
 * using horizontally-offset control points so the line flows naturally
 * through each up/down beat of the journey.
 */
export function buildSmoothPath(points: PathPoint[]): string {
  if (points.length === 0) return "";
  const [first, ...rest] = points;
  let d = `M ${first.x} ${first.y}`;

  rest.forEach((point, i) => {
    const prev = points[i];
    const dx = (point.x - prev.x) / 2;
    d += ` C ${prev.x + dx} ${prev.y}, ${point.x - dx} ${point.y}, ${point.x} ${point.y}`;
  });

  return d;
}
