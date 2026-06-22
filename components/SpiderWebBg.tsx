"use client";

import { useEffect, useRef, useState } from "react";

// ─── Web configuration ───────────────────────────────────────────────────────
const SPOKES    = 28;   // radial threads
const RINGS     = 22;   // total concentric rings
const HUB_RINGS = 5;    // tight hub spiral at center
const ITERS     = 8;    // physics constraint iterations per frame
const GRAVITY   = 0.004;
const DAMPING   = 0.991;
const WIND_A    = 0.022;
const REPEL_R   = 140;
const REPEL_F   = 2.0;

const TAU = Math.PI * 2;

interface WNode   { x: number; y: number; px: number; py: number; fixed: boolean; }
interface WSpring { a: number; b: number; rest: number; }

// ─── Seeded RNG — deterministic shape every build ────────────────────────────
let _seed = 42;
function srand() {
  _seed = (_seed * 16807) % 2147483647;
  return (_seed - 1) / 2147483646;
}

// Node index helper — must match SPOKES
const ni = (ring: number, spoke: number) =>
  1 + ring * SPOKES + ((spoke + SPOKES) % SPOKES);

// ─── Build physics web ────────────────────────────────────────────────────────
function buildWeb(W: number, H: number) {
  _seed = 42;
  const nodes: WNode[]     = [];
  const springs: WSpring[] = [];

  const cx    = W * 0.50;
  const cy    = H * 0.44;
  // Radius large enough so the outermost ring extends past all four screen edges
  const baseR = Math.hypot(W, H) * 0.62;

  nodes.push({ x: cx, y: cy, px: cx, py: cy, fixed: false });

  // Spoke angles — slightly irregular for organic feel
  const spokeAngles: number[] = [];
  for (let si = 0; si < SPOKES; si++) {
    const base   = (si / SPOKES) * TAU;
    const jitter = (srand() - 0.5) * (TAU / SPOKES) * 0.28;
    spokeAngles.push(base + jitter);
  }

  // Ring radii: hub rings are logarithmically packed; capture rings are evenly spaced
  for (let ri = 0; ri < RINGS; ri++) {
    let frac: number;
    if (ri < HUB_RINGS) {
      frac = 0.032 + (ri / HUB_RINGS) * 0.10;
    } else {
      const ci = ri - HUB_RINGS;
      const cc = RINGS - HUB_RINGS;
      frac = 0.145 + (ci / cc) * 0.84;
    }

    const rr = baseR * (frac + (srand() - 0.5) * 0.016);
    for (let si = 0; si < SPOKES; si++) {
      const a = spokeAngles[si] + (srand() - 0.5) * 0.038;
      const r = rr * (1 + (srand() - 0.5) * 0.055);
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      // Outermost ring is fixed — anchors the web
      nodes.push({ x, y, px: x, py: y, fixed: ri === RINGS - 1 });
    }
  }

  const link = (ia: number, ib: number) => {
    if (ia < 0 || ib < 0 || ia >= nodes.length || ib >= nodes.length) return;
    const dx = nodes[ib].x - nodes[ia].x, dy = nodes[ib].y - nodes[ia].y;
    springs.push({ a: ia, b: ib, rest: Math.hypot(dx, dy) });
  };

  // Radial spokes: center → first ring, then ring-to-ring along each spoke
  for (let si = 0; si < SPOKES; si++) {
    link(0, ni(0, si));
    for (let ri = 0; ri < RINGS - 1; ri++) link(ni(ri, si), ni(ri + 1, si));
  }

  // Circumferential (ring) threads
  for (let ri = 0; ri < RINGS; ri++)
    for (let si = 0; si < SPOKES; si++)
      link(ni(ri, si), ni(ri, (si + 1) % SPOKES));

  // Diagonal cross-threads — zigzag pattern gives web its complex lattice look
  for (let ri = 0; ri < RINGS - 1; ri++)
    for (let si = 0; si < SPOKES; si += 2)
      link(ni(ri, si), ni(ri + 1, (si + 1) % SPOKES));

  for (let ri = 1; ri < RINGS - 1; ri += 2)
    for (let si = 0; si < SPOKES; si += 2)
      link(ni(ri, (si + 1) % SPOKES), ni(ri + 1, si));

  return { nodes, springs, cx, cy };
}

// ─── Corner / edge fan web ────────────────────────────────────────────────────
function drawFanWeb(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, r: number,
  a0: number, a1: number, alpha: number,
) {
  const S     = 9 + Math.floor(srand() * 4);
  const R     = 7 + Math.floor(srand() * 3);
  const range = a1 - a0;
  const angs  = Array.from({ length: S }, (_, i) =>
    a0 + (i / (S - 1)) * range + (srand() - 0.5) * 0.11,
  );
  const lengths = angs.map(() => r * (0.72 + srand() * 0.45));

  // Spokes
  ctx.lineWidth   = 0.60;
  ctx.strokeStyle = `rgba(220, 200, 248, ${alpha * 0.65})`;
  angs.forEach((a, i) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * lengths[i], cy + Math.sin(a) * lengths[i]);
    ctx.stroke();
  });

  // Rings — bezier-curved segments between spokes
  for (let ri = 1; ri <= R; ri++) {
    const frac = ri / R;
    const ra   = alpha * (0.07 + frac * 0.55);
    ctx.strokeStyle = `rgba(195, 165, 238, ${ra})`;
    ctx.lineWidth   = 0.52;
    ctx.beginPath();
    angs.forEach((a, i) => {
      const rr  = lengths[i] * frac;
      const px  = cx + Math.cos(a) * rr;
      const py  = cy + Math.sin(a) * rr;
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        const pa   = angs[i - 1];
        const rr0  = lengths[i - 1] * frac;
        const px0  = cx + Math.cos(pa) * rr0;
        const py0  = cy + Math.sin(pa) * rr0;
        // Sag control point nudged toward corner anchor
        const mx   = (px + px0) * 0.5 + (cx - (px + px0) * 0.5) * 0.06;
        const my   = (py + py0) * 0.5 + (cy - (py + py0) * 0.5) * 0.06;
        ctx.quadraticCurveTo(mx, my, px, py);
      }
    });
    ctx.stroke();
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SpiderWebBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    let W = 0, H = 0, raf = 0;
    let nodes: WNode[] = [], springs: WSpring[] = [];

    const rebuild = () => {
      const b = buildWeb(W, H); // resets _seed internally
      nodes   = b.nodes;
      springs = b.springs;
    };

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      rebuild();
    };
    onResize();

    const onMM = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("resize",    onResize, { passive: true });
    window.addEventListener("mousemove", onMM,     { passive: true });

    let t = 0;

    // ── Physics ────────────────────────────────────────────────────────────
    const stepPhysics = () => {
      const wx = Math.sin(t * 0.37) * WIND_A + Math.sin(t * 0.71) * WIND_A * 0.38;
      const wy = Math.cos(t * 0.25) * WIND_A * 0.09;
      const { x: mx, y: my } = mouseRef.current;

      nodes.forEach(n => {
        if (n.fixed) return;
        const dx = n.x - mx, dy = n.y - my;
        const d  = Math.hypot(dx, dy) || 1;
        let fx   = wx, fy = GRAVITY + wy;
        if (d < REPEL_R) {
          const f = (1 - d / REPEL_R) * REPEL_F;
          fx += (dx / d) * f; fy += (dy / d) * f;
        }
        const nx = n.x + (n.x - n.px) * DAMPING + fx;
        const ny = n.y + (n.y - n.py) * DAMPING + fy;
        n.px = n.x; n.py = n.y; n.x = nx; n.y = ny;
      });

      for (let it = 0; it < ITERS; it++) {
        springs.forEach(({ a, b, rest }) => {
          const na = nodes[a], nb = nodes[b];
          const dx = nb.x - na.x, dy = nb.y - na.y;
          const d  = Math.hypot(dx, dy) || 1;
          const df = (d - rest) / d * 0.5;
          if (!na.fixed) { na.x += dx * df; na.y += dy * df; }
          if (!nb.fixed) { nb.x -= dx * df; nb.y -= dy * df; }
        });
      }
    };

    // ── Render main web ────────────────────────────────────────────────────
    const renderWeb = () => {
      const c0 = nodes[0];

      // ── 1. All radial spokes in one draw call ──────────────────────────
      ctx.save();
      ctx.strokeStyle = "rgba(235, 215, 255, 0.58)";
      ctx.lineWidth   = 1.15;
      ctx.shadowColor = "rgba(210, 180, 255, 0.32)";
      ctx.shadowBlur  = 4;
      ctx.beginPath();
      for (let si = 0; si < SPOKES; si++) {
        ctx.moveTo(c0.x, c0.y);
        for (let ri = 0; ri < RINGS; ri++) {
          const n = nodes[ni(ri, si)];
          ctx.lineTo(n.x, n.y);
        }
      }
      ctx.stroke();
      ctx.restore();

      // ── 2. Hub rings (tight inner spiral) ─────────────────────────────
      ctx.save();
      ctx.strokeStyle = "rgba(248, 232, 255, 0.65)";
      ctx.lineWidth   = 0.78;
      ctx.shadowColor = "rgba(225, 200, 255, 0.40)";
      ctx.shadowBlur  = 2.5;
      for (let ri = 0; ri < HUB_RINGS; ri++) {
        ctx.beginPath();
        for (let si = 0; si < SPOKES; si++) {
          const nA = nodes[ni(ri, si)];
          const nB = nodes[ni(ri, (si + 1) % SPOKES)];
          const mx = (nA.x + nB.x) * 0.5 + (c0.x - (nA.x + nB.x) * 0.5) * 0.05;
          const my = (nA.y + nB.y) * 0.5 + (c0.y - (nA.y + nB.y) * 0.5) * 0.05;
          if (si === 0) ctx.moveTo(nA.x, nA.y);
          ctx.quadraticCurveTo(mx, my, nB.x, nB.y);
        }
        ctx.closePath();
        ctx.stroke();
      }
      ctx.restore();

      // ── 3. Capture spiral rings ────────────────────────────────────────
      for (let ri = HUB_RINGS; ri < RINGS; ri++) {
        const prog = (ri - HUB_RINGS) / (RINGS - HUB_RINGS - 1);
        // Inner capture rings are brighter; outer fade just a touch
        const alpha = 0.50 - prog * 0.10;
        const lw    = 0.88 - prog * 0.18;
        // Sag factor: outer rings sag a hair more (they're longer spans between spokes)
        const sag   = 0.022 + prog * 0.020;

        ctx.save();
        ctx.strokeStyle = `rgba(228, 205, 255, ${alpha})`;
        ctx.lineWidth   = Math.max(0.55, lw);
        ctx.beginPath();
        for (let si = 0; si < SPOKES; si++) {
          const nA = nodes[ni(ri, si)];
          const nB = nodes[ni(ri, (si + 1) % SPOKES)];
          const mx = (nA.x + nB.x) * 0.5 + (c0.x - (nA.x + nB.x) * 0.5) * sag;
          const my = (nA.y + nB.y) * 0.5 + (c0.y - (nA.y + nB.y) * 0.5) * sag;
          if (si === 0) ctx.moveTo(nA.x, nA.y);
          ctx.quadraticCurveTo(mx, my, nB.x, nB.y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }

      // ── 4. Diagonal cross-threads ──────────────────────────────────────
      // Forward diagonals
      ctx.save();
      ctx.strokeStyle = "rgba(205, 180, 245, 0.22)";
      ctx.lineWidth   = 0.45;
      ctx.beginPath();
      for (let ri = HUB_RINGS; ri < RINGS - 1; ri += 2) {
        for (let si = 0; si < SPOKES; si += 2) {
          const nA = nodes[ni(ri,     si)];
          const nB = nodes[ni(ri + 1, (si + 1) % SPOKES)];
          ctx.moveTo(nA.x, nA.y);
          ctx.lineTo(nB.x, nB.y);
        }
      }
      ctx.stroke();
      ctx.restore();

      // Reverse diagonals — thinner and sparser
      ctx.save();
      ctx.strokeStyle = "rgba(205, 180, 245, 0.16)";
      ctx.lineWidth   = 0.38;
      ctx.beginPath();
      for (let ri = HUB_RINGS + 1; ri < RINGS - 1; ri += 3) {
        for (let si = 1; si < SPOKES; si += 2) {
          const nA = nodes[ni(ri,     si)];
          const nB = nodes[ni(ri + 1, (si - 1 + SPOKES) % SPOKES)];
          ctx.moveTo(nA.x, nA.y);
          ctx.lineTo(nB.x, nB.y);
        }
      }
      ctx.stroke();
      ctx.restore();

      // ── 5. Dew drops at every ring-spoke intersection ─────────────────
      ctx.beginPath();
      for (let ri = HUB_RINGS; ri < RINGS; ri++) {
        const prog = (ri - HUB_RINGS) / (RINGS - HUB_RINGS);
        const dr   = Math.max(0.85, 1.9 - prog * 0.75);
        for (let si = 0; si < SPOKES; si++) {
          const n = nodes[ni(ri, si)];
          if (n.x > -15 && n.x < W + 15 && n.y > -15 && n.y < H + 15) {
            ctx.moveTo(n.x + dr, n.y);
            ctx.arc(n.x, n.y, dr, 0, TAU);
          }
        }
      }
      ctx.fillStyle = "rgba(240, 225, 255, 0.55)";
      ctx.fill();

      // ── 6. Hub center ──────────────────────────────────────────────────
      const cg = ctx.createRadialGradient(c0.x, c0.y, 0, c0.x, c0.y, 40);
      cg.addColorStop(0,    "rgba(255, 248, 255, 0.80)");
      cg.addColorStop(0.38, "rgba(238, 215, 255, 0.28)");
      cg.addColorStop(1,    "transparent");
      ctx.fillStyle = cg;
      ctx.beginPath(); ctx.arc(c0.x, c0.y, 40, 0, TAU); ctx.fill();

      ctx.fillStyle = "rgba(255, 252, 255, 0.92)";
      ctx.beginPath(); ctx.arc(c0.x, c0.y, 2.8, 0, TAU); ctx.fill();
    };

    // ── Render corner webs ─────────────────────────────────────────────────
    const renderCorners = () => {
      _seed = 99; // deterministic seed separate from web build
      const r  = Math.min(W, H) * 0.30;
      const r2 = Math.min(W, H) * 0.17;
      drawFanWeb(ctx, 0, 0,       r,  0,                Math.PI / 2,     0.52);
      drawFanWeb(ctx, W, 0,       r,  Math.PI / 2,      Math.PI,         0.48);
      drawFanWeb(ctx, 0, H,       r, -Math.PI / 2,      0,               0.48);
      drawFanWeb(ctx, W, H,       r,  Math.PI,          3 * Math.PI / 2, 0.44);
      drawFanWeb(ctx, 0, H * 0.5, r2, -Math.PI / 3.5,  Math.PI / 3.5,   0.33);
      drawFanWeb(ctx, W, H * 0.5, r2,  Math.PI * 0.715, Math.PI * 1.285, 0.30);
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.016;
      stepPhysics();
      renderCorners();
      renderWeb();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",    onResize);
      window.removeEventListener("mousemove", onMM);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
