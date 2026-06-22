"use client";

import { useEffect, useRef, useState } from "react";

// ─── PC spider cursor ─────────────────────────────────────────────────────────

const TRAIL = 6;
const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;

const getTrailColor = () =>
  document.documentElement.classList.contains("light")
    ? "rgba(99,102,241,0.25)"
    : "rgba(255,255,255,0.12)";

function PCCursor() {
  const spiderRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  const mouseX  = useRef(-300);
  const mouseY  = useRef(-300);
  const velX    = useRef(0);
  const velY    = useRef(0);
  const springX = useRef(-300);
  const springY = useRef(-300);
  const trailX  = useRef<number[]>(Array(TRAIL).fill(-300));
  const trailY  = useRef<number[]>(Array(TRAIL).fill(-300));
  const rafId   = useRef(0);

  const [grabbing,    setGrabbing]    = useState(false);
  const [trailColor, setTrailColor]  = useState("rgba(255,255,255,0.12)");

  useEffect(() => {
    const update = () => setTrailColor(getTrailColor());
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onMove  = (e: MouseEvent) => { mouseX.current = e.clientX; mouseY.current = e.clientY; };
    const onDown  = () => setGrabbing(true);
    const onUp    = () => setGrabbing(false);

    const tick = () => {
      velX.current = (velX.current + (mouseX.current - springX.current) * 0.17) * 0.72;
      velY.current = (velY.current + (mouseY.current - springY.current) * 0.17) * 0.72;
      springX.current += velX.current;
      springY.current += velY.current;

      for (let i = 0; i < TRAIL; i++) {
        const tx = i === 0 ? mouseX.current : trailX.current[i - 1];
        const ty = i === 0 ? mouseY.current : trailY.current[i - 1];
        const f  = Math.max(0.05, 0.42 - i * 0.05);
        trailX.current[i] = lerp(trailX.current[i], tx, f);
        trailY.current[i] = lerp(trailY.current[i], ty, f);
      }

      if (spiderRef.current)
        spiderRef.current.style.transform = `translate(${springX.current - 14}px, ${springY.current - 14}px)`;

      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        const t  = 1 - i / TRAIL;
        const sz = Math.max(1, 4 * t);
        el.style.width     = `${sz}px`;
        el.style.height    = `${sz}px`;
        el.style.transform = `translate(${trailX.current[i] - sz / 2}px, ${trailY.current[i] - sz / 2}px)`;
        el.style.opacity   = String(t * 0.4);
      });

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {Array.from({ length: TRAIL }, (_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{ width: 4, height: 4, background: trailColor, borderRadius: "50%", willChange: "transform" }}
        />
      ))}

      <div
        ref={spiderRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ width: 28, height: 28, willChange: "transform" }}
      >
        <SpiderSVG grabbing={grabbing} />
      </div>
    </>
  );
}

function SpiderSVG({ grabbing }: { grabbing: boolean }) {
  const g = (deg: number) => (grabbing ? deg : 0);
  const t = "transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1)";

  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
      <g style={{ transformOrigin: "9px 17px",  transform: `rotate(${-g(35)}deg)`, transition: t }}>
        <line x1="9"  y1="17" x2="5"  y2="20" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" />
        <g style={{ transformOrigin: "5px 20px", transform: `rotate(${-g(20)}deg)`, transition: t }}>
          <line x1="5" y1="20" x2="2" y2="25" stroke="#2a2a2a" strokeWidth="1.3" strokeLinecap="round" />
        </g>
      </g>
      <g style={{ transformOrigin: "19px 17px", transform: `rotate(${g(35)}deg)`,  transition: t }}>
        <line x1="19" y1="17" x2="23" y2="20" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" />
        <g style={{ transformOrigin: "23px 20px", transform: `rotate(${g(20)}deg)`, transition: t }}>
          <line x1="23" y1="20" x2="26" y2="25" stroke="#2a2a2a" strokeWidth="1.3" strokeLinecap="round" />
        </g>
      </g>
      <g style={{ transformOrigin: "8px 14px",  transform: `rotate(${-g(45)}deg)`, transition: t }}>
        <line x1="8"  y1="14" x2="4"  y2="16" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" />
        <g style={{ transformOrigin: "4px 16px", transform: `rotate(${-g(25)}deg)`, transition: t }}>
          <line x1="4" y1="16" x2="1" y2="21" stroke="#2a2a2a" strokeWidth="1.3" strokeLinecap="round" />
        </g>
      </g>
      <g style={{ transformOrigin: "20px 14px", transform: `rotate(${g(45)}deg)`,  transition: t }}>
        <line x1="20" y1="14" x2="24" y2="16" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" />
        <g style={{ transformOrigin: "24px 16px", transform: `rotate(${g(25)}deg)`, transition: t }}>
          <line x1="24" y1="16" x2="27" y2="21" stroke="#2a2a2a" strokeWidth="1.3" strokeLinecap="round" />
        </g>
      </g>
      <g style={{ transformOrigin: "8px 12px",  transform: `rotate(${g(40)}deg)`,  transition: t }}>
        <line x1="8"  y1="12" x2="4"  y2="10" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" />
        <g style={{ transformOrigin: "4px 10px", transform: `rotate(${g(20)}deg)`, transition: t }}>
          <line x1="4" y1="10" x2="1" y2="6"  stroke="#2a2a2a" strokeWidth="1.3" strokeLinecap="round" />
        </g>
      </g>
      <g style={{ transformOrigin: "20px 12px", transform: `rotate(${-g(40)}deg)`, transition: t }}>
        <line x1="20" y1="12" x2="24" y2="10" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" />
        <g style={{ transformOrigin: "24px 10px", transform: `rotate(${-g(20)}deg)`, transition: t }}>
          <line x1="24" y1="10" x2="27" y2="6"  stroke="#2a2a2a" strokeWidth="1.3" strokeLinecap="round" />
        </g>
      </g>
      <g style={{ transformOrigin: "10px 10px", transform: `rotate(${g(30)}deg)`,  transition: t }}>
        <line x1="10" y1="10" x2="7"  y2="6"  stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" />
        <g style={{ transformOrigin: "7px 6px", transform: `rotate(${g(15)}deg)`, transition: t }}>
          <line x1="7" y1="6" x2="6" y2="2"   stroke="#2a2a2a" strokeWidth="1.3" strokeLinecap="round" />
        </g>
      </g>
      <g style={{ transformOrigin: "18px 10px", transform: `rotate(${-g(30)}deg)`, transition: t }}>
        <line x1="18" y1="10" x2="21" y2="6"  stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" />
        <g style={{ transformOrigin: "21px 6px", transform: `rotate(${-g(15)}deg)`, transition: t }}>
          <line x1="21" y1="6" x2="22" y2="2"  stroke="#2a2a2a" strokeWidth="1.3" strokeLinecap="round" />
        </g>
      </g>
      <ellipse cx="14" cy="12"   rx="3.5" ry="3"  fill="#1a1a1a" />
      <ellipse cx="14" cy="17.5" rx="4.5" ry="5"  fill="#1a1a1a" />
      <circle cx="12.3" cy="10.5" r="1.2" fill="#ff4444" />
      <circle cx="15.7" cy="10.5" r="1.2" fill="#ff4444" />
      <circle cx="12.3" cy="10.5" r="0.5" fill="#fff" />
      <circle cx="15.7" cy="10.5" r="0.5" fill="#fff" />
      {grabbing && (
        <>
          <path d="M12.5,14 Q11.5,16 12.5,16.5" stroke="#2a2a2a" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M15.5,14 Q16.5,16 15.5,16.5" stroke="#2a2a2a" strokeWidth="1.2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

// ─── Mobile silk-web cursor ───────────────────────────────────────────────────
// Follows finger touches, drawing fading spider-silk threads that weave a web.

interface SilkThread {
  x1: number; y1: number;
  x2: number; y2: number;
  alpha: number;
}

function MobileWebCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    let W = 0, H = 0, raf = 0;

    const threads: SilkThread[] = [];
    const recentPos: { x: number; y: number }[] = [];
    let lastTouch: { x: number; y: number } | null = null;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const push = (x1: number, y1: number, x2: number, y2: number, alpha: number) => {
      threads.push({ x1, y1, x2, y2, alpha });
    };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      lastTouch = { x: touch.clientX, y: touch.clientY };
      // Burst of radial strands at tap point
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2;
        const len   = 14 + Math.random() * 22;
        push(
          touch.clientX, touch.clientY,
          touch.clientX + Math.cos(angle) * len,
          touch.clientY + Math.sin(angle) * len,
          0.65,
        );
      }
      // Concentric ring at tap
      for (let i = 0; i < 12; i++) {
        const a0 = (i / 12)       * Math.PI * 2;
        const a1 = ((i + 1) / 12) * Math.PI * 2;
        const r  = 12 + Math.random() * 8;
        push(
          touch.clientX + Math.cos(a0) * r, touch.clientY + Math.sin(a0) * r,
          touch.clientX + Math.cos(a1) * r, touch.clientY + Math.sin(a1) * r,
          0.50,
        );
      }
      recentPos.push({ x: touch.clientX, y: touch.clientY });
      if (recentPos.length > 30) recentPos.shift();
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const pos   = { x: touch.clientX, y: touch.clientY };

      // Main drag thread
      if (lastTouch) push(lastTouch.x, lastTouch.y, pos.x, pos.y, 0.82);

      // Cross-connect to nearby recent points — creates the web lattice
      recentPos.forEach(p => {
        const dx = p.x - pos.x, dy = p.y - pos.y;
        const d  = Math.hypot(dx, dy);
        if (d > 18 && d < 75) push(pos.x, pos.y, p.x, p.y, 0.22);
      });

      recentPos.push(pos);
      if (recentPos.length > 30) recentPos.shift();
      lastTouch = pos;
    };

    const onTouchEnd = () => { lastTouch = null; };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove",  onTouchMove,  { passive: true });
    window.addEventListener("touchend",   onTouchEnd,   { passive: true });

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = threads.length - 1; i >= 0; i--) {
        const th = threads[i];
        th.alpha *= 0.974;
        if (th.alpha < 0.016) { threads.splice(i, 1); continue; }

        ctx.beginPath();
        ctx.strokeStyle = `rgba(200, 168, 255, ${th.alpha})`;
        ctx.lineWidth   = 0.75;
        ctx.shadowColor = `rgba(180, 140, 255, ${th.alpha * 0.45})`;
        ctx.shadowBlur  = 2.5;
        ctx.moveTo(th.x1, th.y1);
        ctx.lineTo(th.x2, th.y2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("touchend",   onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}

// ─── Root: pick cursor by input type ────────────────────────────────────────
export default function CustomCursor() {
  const [mounted,  setMounted]  = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  if (!mounted) return null;
  if (isMobile)  return <MobileWebCursor />;
  return <PCCursor />;
}
