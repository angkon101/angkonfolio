"use client";

import { useEffect, useRef, useState } from "react";

const SHAPES = [
  "circle(50% at 50% 50%)",
  "polygon(50% 0%, 0% 100%, 100% 100%)",
  "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
  "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  "polygon(50% 0%, 12% 100%, 88% 100%)",
  "polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)",
  "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
  "polygon(0% 25%, 60% 25%, 60% 0%, 100% 50%, 60% 100%, 60% 75%, 0% 75%)",
];

const TRAIL = 8;
const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;

type Ripple = { id: number; x: number; y: number; color: string };

export default function CustomCursor() {
  const outerRef   = useRef<HTMLDivElement>(null);
  const dotRef     = useRef<HTMLDivElement>(null);
  const trailRefs  = useRef<(HTMLDivElement | null)[]>([]);

  // Raw mouse pos
  const mouseX = useRef(-300);
  const mouseY = useRef(-300);

  // Spring state for outer shape
  const velX    = useRef(0);
  const velY    = useRef(0);
  const springX = useRef(-300);
  const springY = useRef(-300);

  // Chained trail positions
  const trailX = useRef<number[]>(Array(TRAIL).fill(-300));
  const trailY = useRef<number[]>(Array(TRAIL).fill(-300));

  // Animation params
  const hue     = useRef(0);
  const rot     = useRef(0);
  const idxRef  = useRef(0);
  const hovered = useRef(false);
  const rafId   = useRef(0);

  const [mounted, setMounted] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    /* ── mouse position ── */
    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    /* ── hover detection ── */
    const bindHovers = () =>
      document.querySelectorAll("a, button, [role='button'], input, textarea, label, select")
        .forEach(el => {
          el.addEventListener("mouseenter", () => { hovered.current = true;  });
          el.addEventListener("mouseleave", () => { hovered.current = false; });
        });
    bindHovers();
    const mo = new MutationObserver(bindHovers);
    mo.observe(document.body, { childList: true, subtree: true });

    /* ── click → ripple + shape advance ── */
    const onClick = (e: MouseEvent) => {
      idxRef.current = (idxRef.current + 1) % SHAPES.length;
      const color = `hsl(${hue.current}, 100%, 65%)`;
      const id    = Date.now();
      setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY, color }]);
      // two rings for extra flair
      const id2 = id + 1;
      setTimeout(() => setRipples(prev => [...prev, { id: id2, x: e.clientX, y: e.clientY, color }]), 120);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id && r.id !== id2)), 900);
    };

    /* ── main RAF loop ── */
    const tick = () => {
      // shifting rainbow
      hue.current = (hue.current + 1.8) % 360;
      const color = `hsl(${hue.current}, 100%, 65%)`;
      const glow  = `hsl(${hue.current}, 100%, 65%)`;

      // spring physics (bouncy overshoot)
      velX.current = (velX.current + (mouseX.current - springX.current) * 0.17) * 0.72;
      velY.current = (velY.current + (mouseY.current - springY.current) * 0.17) * 0.72;
      springX.current += velX.current;
      springY.current += velY.current;

      // chained trail — each dot follows the one before it
      for (let i = 0; i < TRAIL; i++) {
        const tx = i === 0 ? mouseX.current : trailX.current[i - 1];
        const ty = i === 0 ? mouseY.current : trailY.current[i - 1];
        const f  = Math.max(0.05, 0.42 - i * 0.05);
        trailX.current[i] = lerp(trailX.current[i], tx, f);
        trailY.current[i] = lerp(trailY.current[i], ty, f);
      }

      // rotation — fast on hover
      rot.current += hovered.current ? 4 : 1;

      // pulsing scale via sine wave
      const pulse = 1 + Math.sin(Date.now() * 0.006) * 0.12;
      const scale = (hovered.current ? 2.2 : 1) * pulse;

      /* outer geometric shape */
      if (outerRef.current) {
        const el = outerRef.current;
        el.style.transform       = `translate(${springX.current - 10}px, ${springY.current - 10}px) rotate(${rot.current}deg) scale(${scale})`;
        el.style.clipPath        = SHAPES[idxRef.current];
        el.style.backgroundColor = color;
        el.style.filter          = `drop-shadow(0 0 8px ${glow}) drop-shadow(0 0 3px ${glow})`;
      }

      /* precision inner dot */
      if (dotRef.current) {
        const el = dotRef.current;
        el.style.transform       = `translate(${mouseX.current - 2}px, ${mouseY.current - 2}px)`;
        el.style.backgroundColor = "#fff";
        el.style.boxShadow       = `0 0 6px ${color}`;
      }

      /* comet trail */
      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        const t  = 1 - i / TRAIL;
        const sz = Math.max(1.5, 5 * t);
        el.style.width           = `${sz}px`;
        el.style.height          = `${sz}px`;
        el.style.transform       = `translate(${trailX.current[i] - sz / 2}px, ${trailY.current[i] - sz / 2}px)`;
        el.style.opacity         = String(t * 0.7);
        el.style.backgroundColor = `hsl(${(hue.current - i * 18 + 360) % 360}, 100%, 65%)`;
        el.style.borderRadius    = i % 2 === 0 ? "50%" : "2px"; // alternate circle / square
      });

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    /* shape auto-cycle every 2 s */
    const interval = setInterval(() => {
      idxRef.current = (idxRef.current + 1) % SHAPES.length;
    }, 2000);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click",     onClick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click",     onClick);
      cancelAnimationFrame(rafId.current);
      clearInterval(interval);
      mo.disconnect();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Comet trail */}
      {Array.from({ length: TRAIL }, (_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997]"
          style={{ width: 5, height: 5, willChange: "transform" }}
        />
      ))}

      {/* Geometric morphing shape — 20×20 px */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width:      20,
          height:     20,
          willChange: "transform, clip-path",
          transition: "clip-path 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />

      {/* 4 px precision dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{ width: 4, height: 4, willChange: "transform" }}
      />

      {/* Click ripples — two rings per click */}
      {ripples.map((r, i) => (
        <div
          key={r.id}
          className="fixed rounded-full pointer-events-none z-[9998]"
          style={{
            left:      r.x - 10,
            top:       r.y - 10,
            width:     20,
            height:    20,
            border:    `1.5px solid ${r.color}`,
            filter:    `drop-shadow(0 0 4px ${r.color})`,
            animation: `cursor-ripple ${0.6 + i * 0.1}s ease-out forwards`,
          }}
        />
      ))}
    </>
  );
}
