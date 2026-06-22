"use client";

/**
 * WebThread — vertical silk thread hanging from top of viewport to a target section.
 * Renders an SVG line that sways gently, creating the illusion that content
 * is suspended from the spider web above.
 */

import { useEffect, useRef, useState } from "react";

interface WebThreadProps {
  /** Horizontal position as percentage (0-100) */
  left: string;
  /** Extra vertical offset from top (px) */
  topOffset?: number;
  /** Thread color opacity */
  opacity?: number;
  /** Whether the thread is wavy or straight */
  wavy?: boolean;
  /** Extra height (px) */
  height?: number;
}

export default function WebThread({
  left,
  topOffset = 0,
  opacity = 0.18,
  wavy = true,
  height = 200,
}: WebThreadProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const id = `wt-${left.replace(/[%\.]/g, "")}-${topOffset}`;

  return (
    <div
      ref={ref}
      className="absolute top-0 pointer-events-none"
      style={{ left, zIndex: 1 }}
    >
      <svg
        width="4"
        height={height}
        viewBox={`0 0 4 ${height}`}
        fill="none"
        className="web-thread-sway"
        style={{ overflow: "visible" }}
      >
        {wavy ? (
          <path
            d={`M2,0 Q4,${height * 0.25} 2,${height * 0.5} Q0,${height * 0.75} 2,${height}`}
            stroke="currentColor"
            strokeWidth="0.8"
            opacity={opacity}
            className="web-thread-path"
          />
        ) : (
          <line
            x1="2" y1="0" x2="2" y2={height}
            stroke="currentColor"
            strokeWidth="0.7"
            opacity={opacity}
            className="web-thread-path"
          />
        )}
        {/* Dew drop at bottom */}
        <circle
          cx="2" cy={height}
          r="2"
          fill="currentColor"
          opacity={opacity * 1.5}
        />
      </svg>
    </div>
  );
}
