"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const roles = [
  "Flutter Developer",
  "CS Researcher",
  "TypeScript Engineer",
  "UI Craftsman",
  "AI Enthusiast",
];

const FLOAT_CHARS = [
  { text: "</>",    left: "8%",  top: "18%", dur: "7s",  delay: "0s"   },
  { text: "{ }",    left: "82%", top: "12%", dur: "8s",  delay: "1.2s" },
  { text: "( )",    left: "73%", top: "72%", dur: "6s",  delay: "2s"   },
  { text: "=>",     left: "18%", top: "78%", dur: "9s",  delay: "0.6s" },
  { text: "[ ]",    left: "58%", top: "25%", dur: "7s",  delay: "1.5s" },
  { text: "async",  left: "38%", top: "88%", dur: "8s",  delay: "3s"   },
  { text: "import", left: "4%",  top: "52%", dur: "10s", delay: "2.2s" },
  { text: "dart",   left: "90%", top: "48%", dur: "7s",  delay: "0.9s" },
  { text: "fn()",   left: "28%", top: "8%",  dur: "6s",  delay: "1.8s" },
  { text: "...",    left: "65%", top: "60%", dur: "5s",  delay: "0.3s" },
];

// Deterministic particle positions
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  left:     `${((i * 19 + 7) % 97) + 1}%`,
  top:      `${((i * 13 + 11) % 93) + 3}%`,
  duration: `${4 + (i % 5)}s`,
  delay:    `${(i % 4) * 0.8}s`,
}));

const ease = (t: number) => 1 - (1 - t) ** 3;

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed,  setDisplayed]  = useState("");
  const [typing,     setTyping]     = useState(true);
  const [cgpa,       setCgpa]       = useState(0);
  const [projects,   setProjects]   = useState(0);
  const [papers,     setPapers]     = useState(0);

  /* ── Typewriter ── */
  useEffect(() => {
    const current = roles[roleIndex];
    let t: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < current.length)
        t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      else
        t = setTimeout(() => setTyping(false), 1800);
    } else {
      if (displayed.length > 0)
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      else { setRoleIndex(i => (i + 1) % roles.length); setTyping(true); }
    }
    return () => clearTimeout(t);
  }, [displayed, typing, roleIndex]);

  /* ── Stat counters ── */
  useEffect(() => {
    const run = (to: number, dur: number, set: (v: number) => void) => {
      const start = Date.now();
      const tick = () => {
        const t = Math.min((Date.now() - start) / dur, 1);
        set(to * ease(t));
        if (t < 1) requestAnimationFrame(tick);
        else set(to);
      };
      requestAnimationFrame(tick);
    };
    const id = setTimeout(() => {
      run(3.57, 1600, v => setCgpa(v));
      run(5,    1200, v => setProjects(Math.floor(v)));
      run(5,    1200, v => setPapers(Math.floor(v)));
    }, 600);
    return () => clearTimeout(id);
  }, []);

  /* ── Magnetic CTA buttons ── */
  const onMagnet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 18;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 10;
    e.currentTarget.style.transform  = `translate(${x}px,${y}px) scale(1.05)`;
    e.currentTarget.style.transition = "transform 0.12s ease";
  };
  const offMagnet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform  = "";
    e.currentTarget.style.transition = "transform 0.45s ease";
  };

  const avatarRef = useRef<HTMLDivElement>(null);
  const onAvatarMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 12;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 12;
    if (avatarRef.current)
      avatarRef.current.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.04)`;
  };
  const offAvatarMove = () => {
    if (avatarRef.current)
      avatarRef.current.style.transform = "";
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg web-attached-section">
      {/* Blobs — reduced opacity for light mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob absolute w-96 h-96 bg-violet-600/20 dark:bg-violet-600/20 bg-violet-500/10 rounded-full -top-20 -left-20 blur-3xl" />
        <div className="blob-2 absolute w-80 h-80 bg-cyan-500/[0.15] dark:bg-cyan-500/[0.15] bg-cyan-400/[0.08] rounded-full top-1/2 -right-20 blur-3xl" />
        <div className="blob-3 absolute w-72 h-72 bg-pink-600/[0.15] dark:bg-pink-600/[0.15] bg-pink-400/[0.08] rounded-full -bottom-20 left-1/3 blur-3xl" />

        {/* Silk threads across hero */}
        <div className="section-silk-thread" style={{ left: "8%" }} />
        <div className="section-silk-thread" style={{ left: "25%" }} />
        <div className="section-silk-thread" style={{ left: "50%" }} />
        <div className="section-silk-thread" style={{ left: "75%" }} />
        <div className="section-silk-thread" style={{ left: "92%" }} />

        {/* Floating code symbols */}
        {FLOAT_CHARS.map((c, i) => (
          <span
            key={i}
            className="float-char absolute font-mono dark:text-violet-300 text-violet-400/60 text-xs select-none pointer-events-none"
            style={{ left: c.left, top: c.top, "--dur": c.dur, "--delay": c.delay } as React.CSSProperties}
          >
            {c.text}
          </span>
        ))}

        {/* Particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-violet-400/40 dark:bg-violet-400/40 bg-violet-500/25 rounded-full"
            style={{ left: p.left, top: p.top, animation: `float ${p.duration} ease-in-out ${p.delay} infinite` }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="order-2 md:order-1">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 dark:text-violet-300 text-violet-600 text-xs font-mono mb-6 border-pulse"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for opportunities
          </div>

          <h1 className="font-bold leading-none mb-4">
            <span
              className="glitch text-5xl md:text-7xl block font-black dark:text-white text-gray-900 tracking-tight"
              data-text="Angkon"
              style={{ animation: "fade-up 0.7s ease 0.1s both" }}
            >
              Angkon
            </span>
            <span
              className="glitch text-5xl md:text-7xl block font-black gradient-text tracking-tight"
              data-text="Debnath"
              style={{ animation: "fade-up 0.7s ease 0.25s both" }}
            >
              Debnath
            </span>
          </h1>

          <div
            className="flex items-center gap-3 mb-6 h-10"
            style={{ animation: "fade-up 0.7s ease 0.4s both" }}
          >
            <span className="dark:text-slate-400 text-gray-500 font-mono text-sm">&gt;_</span>
            <span className="text-cyan-400 font-mono text-lg font-semibold typewriter-cursor">
              {displayed}
            </span>
          </div>

          <p
            className="dark:text-slate-400 text-gray-500 text-base leading-relaxed mb-8 max-w-lg"
            style={{ animation: "fade-up 0.7s ease 0.55s both" }}
          >
            CS student at IUBAT building real-world products with Flutter, TypeScript &amp; React.
            Passionate about mobile apps, AI research, and turning ideas into shipped software.
          </p>

          <div
            className="flex flex-wrap gap-4"
            style={{ animation: "fade-up 0.7s ease 0.7s both" }}
          >
            <a
              href="#projects"
              onMouseMove={onMagnet}
              onMouseLeave={offMagnet}
              className="btn-magnetic group px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-sm shadow-lg shadow-violet-500/20"
            >
              View Projects
              <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">&rarr;</span>
            </a>
            <a
              href="#contact"
              onMouseMove={onMagnet}
              onMouseLeave={offMagnet}
              className="btn-magnetic px-6 py-3 rounded-xl border dark:border-white/10 border-gray-300 dark:text-slate-300 text-gray-600 font-semibold text-sm hover:border-violet-500/50 dark:hover:text-white hover:text-gray-900 hover:bg-violet-500/10 transition-colors"
            >
              Get in touch
            </a>
          </div>

          {/* Animated stat counters */}
          <div
            className="mt-12 flex gap-8"
            style={{ animation: "fade-up 0.7s ease 0.85s both" }}
          >
            {[
              { label: "CGPA",     value: cgpa.toFixed(2), sub: "/ 4.00" },
              { label: "Projects", value: projects + "+",  sub: "shipped" },
              { label: "Research", value: papers + "+",    sub: "papers"  },
            ].map((s) => (
              <div key={s.label} className="group">
                <div className="text-2xl font-black dark:text-white text-gray-900 tabular-nums transition-all dark:group-hover:text-violet-300 group-hover:text-violet-600">
                  {s.value}
                  <span className="text-sm font-normal dark:text-slate-500 text-gray-400 ml-1">{s.sub}</span>
                </div>
                <div className="text-xs dark:text-slate-500 text-gray-400 font-mono mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar with 3D tilt */}
        <div className="order-1 md:order-2 flex justify-center" style={{ animation: "fade-up 0.8s ease 0.3s both" }}>
          <div
            className="relative"
            onMouseMove={onAvatarMove}
            onMouseLeave={offAvatarMove}
          >
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-violet-500/30"
              style={{ animation: "spin 20s linear infinite", margin: "-16px" }}
            />
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/20"
              style={{ animation: "spin 15s linear reverse infinite", margin: "-32px" }}
            />
            {/* Extra orbit ring */}
            <div
              className="absolute inset-0 rounded-full border border-pink-500/10"
              style={{ animation: "spin 8s linear infinite", margin: "-50px" }}
            />

            <div
              ref={avatarRef}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-violet-500/40 box-glow-purple"
              style={{ transition: "transform 0.4s ease" }}
            >
              <Image
                src="/profile.jpg"
                alt="Angkon Debnath"
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            <div className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full dark:bg-dark-700 bg-white border border-violet-500/40 text-xs font-mono dark:text-violet-300 text-violet-600 shadow-sm animate-float">
              Flutter &#10022;
            </div>
            <div className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-full dark:bg-dark-700 bg-white border border-cyan-500/40 text-xs font-mono dark:text-cyan-300 text-cyan-600 shadow-sm animate-float-delayed">
              TypeScript &#10022;
            </div>
            <div className="absolute top-1/2 -right-12 px-3 py-1.5 rounded-full dark:bg-dark-700 bg-white border border-pink-500/40 text-xs font-mono dark:text-pink-300 text-pink-600 shadow-sm animate-float-slow">
              AI / ML &#10022;
            </div>
            <div className="absolute top-1 -right--1 px-3 py-1.5 rounded-full dark:bg-dark-700 bg-white border border-green-500/40 text-xs font-mono dark:text-green-300 text-green-600 shadow-sm animate-float-slow">
              React &#10022;
            </div>

          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 dark:text-slate-600 text-gray-400 text-xs font-mono">
        <span>scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-violet-500/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
