"use client";

import { useEffect, useState } from "react";

const roles = [
  "Flutter Developer",
  "CS Researcher",
  "TypeScript Engineer",
  "UI Craftsman",
  "AI Enthusiast",
];

// Deterministic positions — avoids hydration mismatch from Math.random()
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  left: `${((i * 19 + 7) % 97) + 1}%`,
  top: `${((i * 13 + 11) % 93) + 3}%`,
  duration: `${4 + (i % 5)}s`,
  delay: `${(i % 4) * 0.8}s`,
}));

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob absolute w-96 h-96 bg-violet-600/20 rounded-full -top-20 -left-20 blur-3xl" />
        <div className="blob-2 absolute w-80 h-80 bg-cyan-500/[0.15] rounded-full top-1/2 -right-20 blur-3xl" />
        <div className="blob-3 absolute w-72 h-72 bg-pink-600/[0.15] rounded-full -bottom-20 left-1/3 blur-3xl" />

        {/* Floating particles — stable positions */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-violet-400/40 rounded-full"
            style={{
              left: p.left,
              top: p.top,
              animation: `float ${p.duration} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for opportunities
          </div>

          <h1 className="font-bold leading-none mb-4">
            <span className="glitch text-5xl md:text-7xl block font-black text-white tracking-tight" data-text="Angkon">
              Angkon
            </span>
            <span className="glitch text-5xl md:text-7xl block font-black gradient-text tracking-tight" data-text="Debnath">
              Debnath
            </span>
          </h1>

          <div className="flex items-center gap-3 mb-6 h-10">
            <span className="text-slate-400 font-mono text-sm">&gt;_</span>
            <span className="text-cyan-400 font-mono text-lg font-semibold typewriter-cursor">
              {displayed}
            </span>
          </div>

          <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-lg">
            CS student at IUBAT building real-world products with Flutter, TypeScript & React.
            Passionate about mobile apps, AI research, and turning ideas into shipped software.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-sm hover:scale-105 transition-all hover:shadow-lg hover:shadow-violet-500/30"
            >
              View Projects
              <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl border border-white/10 text-slate-300 font-semibold text-sm hover:border-violet-500/50 hover:text-white hover:bg-violet-500/10 transition-all"
            >
              Get in touch
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-8">
            {[
              { label: "CGPA", value: "3.57", sub: "/ 4.00" },
              { label: "Projects", value: "5+", sub: "shipped" },
              { label: "Research", value: "5+", sub: "papers" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black text-white">
                  {s.value}
                  <span className="text-sm font-normal text-slate-500 ml-1">{s.sub}</span>
                </div>
                <div className="text-xs text-slate-500 font-mono mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar */}
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            {/* Spinning rings */}
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-violet-500/30"
              style={{ animation: "spin 20s linear infinite", margin: "-16px" }}
            />
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/20"
              style={{ animation: "spin 15s linear reverse infinite", margin: "-32px" }}
            />

            {/* Avatar container */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-violet-500/40 box-glow-purple">
              {/* Replace this div with <Image> once you add your photo to /public */}
              <div className="w-full h-full bg-gradient-to-br from-violet-900/80 via-dark-800 to-cyan-900/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-3">👨‍💻</div>
                  <p className="text-slate-400 text-xs font-mono">photo coming soon</p>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full bg-dark-700 border border-violet-500/40 text-xs font-mono text-violet-300 animate-float">
              Flutter ✦
            </div>
            <div className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-full bg-dark-700 border border-cyan-500/40 text-xs font-mono text-cyan-300 animate-float-delayed">
              TypeScript ✦
            </div>
            <div className="absolute top-1/2 -right-12 px-3 py-1.5 rounded-full bg-dark-700 border border-pink-500/40 text-xs font-mono text-pink-300 animate-float-slow">
              AI / ML ✦
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 text-xs font-mono">
        <span>scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-violet-500/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
