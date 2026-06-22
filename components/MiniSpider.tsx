"use client";

/**
 * MiniSpider — small decorative SVG spider that appears in content sections.
 * Creates the illusion of spiders crawling across the page content.
 */

interface MiniSpiderProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function MiniSpider({ size = 24, className = "", style }: MiniSpiderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`section-mini-spider ${className}`}
      style={style}
    >
      {/* Body — Abdomen */}
      <ellipse cx="12" cy="14" rx="4" ry="5" fill="currentColor" opacity="0.9" />
      {/* Body — Cephalothorax */}
      <ellipse cx="12" cy="8" rx="3" ry="3.5" fill="currentColor" />
      {/* Eyes */}
      <circle cx="10.8" cy="7" r="0.5" fill="rgba(180,150,220,0.6)" />
      <circle cx="13.2" cy="7" r="0.5" fill="rgba(180,150,220,0.6)" />
      {/* Legs — Right side */}
      <path d="M14,9 Q17,6 20,5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      <path d="M14,10.5 Q18,9 21,8" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      <path d="M14,12 Q18,13 21,15" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      <path d="M14,13.5 Q17,16 19,19" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      {/* Legs — Left side */}
      <path d="M10,9 Q7,6 4,5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      <path d="M10,10.5 Q6,9 3,8" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      <path d="M10,12 Q6,13 3,15" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      <path d="M10,13.5 Q7,16 5,19" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      {/* Pedipalps */}
      <path d="M11,6.5 Q9,4 8,5.5" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" fill="none" />
      <path d="M13,6.5 Q15,4 16,5.5" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}
