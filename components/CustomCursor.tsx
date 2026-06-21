"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SHAPES = [
  { name: "Circle",   clip: "circle(50% at 50% 50%)",                                                                                                        color: "#8b5cf6" },
  { name: "Triangle", clip: "polygon(50% 0%, 0% 100%, 100% 100%)",                                                                                            color: "#06b6d4" },
  { name: "Pentagon", clip: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",                                                                          color: "#ec4899" },
  { name: "Hexagon",  clip: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",                                                                 color: "#10b981" },
  { name: "Star",     clip: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",                              color: "#f59e0b" },
  { name: "Diamond",  clip: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",                                                                                   color: "#a78bfa" },
  { name: "Cone",     clip: "polygon(50% 0%, 12% 100%, 88% 100%)",                                                                                            color: "#38bdf8" },
  { name: "Cross",    clip: "polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)",         color: "#f472b6" },
  { name: "Octagon",  clip: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",                                              color: "#34d399" },
  { name: "Arrow",    clip: "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)",                                                         color: "#fb923c" },
];

type Ripple = { id: number; x: number; y: number; color: string };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function CustomCursor() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const dotRef    = useRef<HTMLDivElement>(null);
  const labelRef  = useRef<HTMLDivElement>(null);

  // All hot-path values live in refs — no re-renders on mouse move
  const mouseX  = useRef(-200);
  const mouseY  = useRef(-200);
  const curX    = useRef(-200);
  const curY    = useRef(-200);
  const rot     = useRef(0);
  const hovered = useRef(false);
  const idxRef  = useRef(0);
  const rafId   = useRef(0);

  const labelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [shapeIndex, setShapeIndex] = useState(0);
  const [ripples,    setRipples]    = useState<Ripple[]>([]);
  const [mounted,    setMounted]    = useState(false);
  const [labelText,  setLabelText]  = useState("");
  const [labelShow,  setLabelShow]  = useState(false);

  const showLabel = useCallback((idx: number) => {
    setLabelText(SHAPES[idx].name);
    setLabelShow(true);
    if (labelTimer.current) clearTimeout(labelTimer.current);
    labelTimer.current = setTimeout(() => setLabelShow(false), 1000);
  }, []);

  const advance = useCallback((delta = 1) => {
    idxRef.current = (idxRef.current + delta + SHAPES.length) % SHAPES.length;
    setShapeIndex(idxRef.current);
    showLabel(idxRef.current);
  }, [showLabel]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    // Skip on touch-only devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    /* ── mouse tracking ── */
    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    /* ── hover detection on interactive elements ── */
    const addHover = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, label")
        .forEach(el => {
          el.addEventListener("mouseenter", () => { hovered.current = true;  });
          el.addEventListener("mouseleave", () => { hovered.current = false; });
        });
    };
    addHover();
    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });

    /* ── click → ripple + advance shape ── */
    const onClick = (e: MouseEvent) => {
      const id    = Date.now();
      const color = SHAPES[idxRef.current].color;
      setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY, color }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
      advance();
    };

    /* ── RAF animation loop ── */
    const tick = () => {
      curX.current = lerp(curX.current, mouseX.current, 0.13);
      curY.current = lerp(curY.current, mouseY.current, 0.13);
      rot.current += hovered.current ? 2.5 : 0.7;

      const s = hovered.current ? 1.65 : 1;
      const shape = SHAPES[idxRef.current];

      if (outerRef.current) {
        outerRef.current.style.transform      = `translate(${curX.current - 18}px, ${curY.current - 18}px) rotate(${rot.current}deg) scale(${s})`;
        outerRef.current.style.clipPath       = shape.clip;
        outerRef.current.style.backgroundColor = shape.color;
        outerRef.current.style.boxShadow      = `0 0 14px ${shape.color}80`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform         = `translate(${mouseX.current - 3}px, ${mouseY.current - 3}px)`;
        dotRef.current.style.backgroundColor   = shape.color;
      }
      if (labelRef.current) {
        labelRef.current.style.transform       = `translate(${curX.current + 22}px, ${curY.current - 26}px)`;
        labelRef.current.style.color           = shape.color;
      }

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    /* ── auto-cycle every 2.5 s ── */
    const interval = setInterval(() => advance(), 2500);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click",     onClick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click",     onClick);
      cancelAnimationFrame(rafId.current);
      clearInterval(interval);
      observer.disconnect();
      if (labelTimer.current) clearTimeout(labelTimer.current);
    };
  }, [mounted, advance]);

  if (!mounted) return null;

  return (
    <>
      {/* Geometric outer shape */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-9 h-9 pointer-events-none z-[9999] opacity-80"
        style={{
          willChange: "transform, clip-path",
          transition: "clip-path 0.45s cubic-bezier(0.34,1.56,0.64,1), background-color 0.4s ease",
        }}
      />

      {/* Precise inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999]"
        style={{ willChange: "transform", transition: "background-color 0.4s ease" }}
      />

      {/* Shape name label */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] text-[10px] font-mono font-bold tracking-widest uppercase select-none"
        style={{
          willChange: "transform, opacity",
          opacity:    labelShow ? 1 : 0,
          transition: "opacity 0.25s ease",
          textShadow: "0 0 8px currentColor",
        }}
      >
        {labelText}
      </div>

      {/* Click ripples */}
      {ripples.map(r => (
        <div
          key={r.id}
          className="fixed rounded-full pointer-events-none z-[9998]"
          style={{
            left:      r.x - 16,
            top:       r.y - 16,
            width:     32,
            height:    32,
            border:    `2px solid ${r.color}`,
            animation: "cursor-ripple 0.7s ease-out forwards",
          }}
        />
      ))}
    </>
  );
}
