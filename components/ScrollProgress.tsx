"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[200] dark:bg-white/5 bg-gray-200">
      <div
        ref={barRef}
        style={{ width: "0%", transition: "width 80ms linear" }}
        className="h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-500"
      />
      {/* Glowing tip */}
      <div
        ref={el => {
          if (!el || !barRef.current) return;
          const observer = new MutationObserver(() => {
            el.style.left = barRef.current?.style.width ?? "0%";
          });
          if (barRef.current)
            observer.observe(barRef.current, { attributes: true, attributeFilter: ["style"] });
        }}
        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] -translate-x-1/2"
        style={{ left: "0%" }}
      />
    </div>
  );
}
