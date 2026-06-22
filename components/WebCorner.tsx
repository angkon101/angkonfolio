"use client";

/**
 * WebCorner — decorative web corner element for cards.
 * Adds a small spider web decoration to the top-left or top-right corner
 * of content cards, making them appear as if they're part of the web.
 */

interface WebCornerProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  opacity?: number;
}

export default function WebCorner({
  position = "top-left",
  size = 40,
  opacity = 0.12,
}: WebCornerProps) {
  const isRight = position.includes("right");
  const isBottom = position.includes("bottom");

  const posClass = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  }[position];

  const rotation = {
    "top-left": "0deg",
    "top-right": "90deg",
    "bottom-right": "180deg",
    "bottom-left": "270deg",
  }[position];

  const corners = 5;
  const rings = 3;

  return (
    <div
      className={`absolute ${posClass} pointer-events-none overflow-hidden`}
      style={{
        width: size,
        height: size,
        opacity,
        transform: `rotate(${rotation})`,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        {/* Radial spokes */}
        {Array.from({ length: corners }, (_, i) => {
          const angle = (i / (corners - 1)) * (Math.PI / 2);
          return (
            <line
              key={`spoke-${i}`}
              x1="0"
              y1="0"
              x2={Math.cos(angle) * size}
              y2={Math.sin(angle) * size}
              stroke="currentColor"
              strokeWidth="0.5"
              className="web-thread-path"
            />
          );
        })}
        {/* Concentric arcs */}
        {Array.from({ length: rings }, (_, ri) => {
          const r = ((ri + 1) / rings) * size * 0.85;
          const pathParts: string[] = [];
          for (let i = 0; i <= corners * 4; i++) {
            const frac = i / (corners * 4);
            const angle = frac * (Math.PI / 2);
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            pathParts.push(i === 0 ? `M${x},${y}` : `L${x},${y}`);
          }
          return (
            <path
              key={`ring-${ri}`}
              d={pathParts.join(" ")}
              stroke="currentColor"
              strokeWidth="0.4"
              fill="none"
              className="web-thread-path"
            />
          );
        })}
      </svg>
    </div>
  );
}
