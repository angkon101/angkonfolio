"use client";

import { useReveal } from "@/hooks/useReveal";

const projects = [
  {
    name:        "Subash",
    subtitle:    "Bangladesh's Largest Perfume Wikipedia",
    description: "A community platform for perfume enthusiasts and Bangladeshi perfume houses. Lets users learn about fragrances and explore local and international perfume brands.",
    tech:        ["TypeScript", "HTML", "CSS", "Supabase", "JavaScript", "Docker"],
    color:       "violet",
    emoji:       "🌸",
    status:      "In Progress",
    link:        null,
    glowColor:   "#8b5cf620",
    accentColor: "#8b5cf6",
  },
  {
    name:        "Perfumevaultbd.com",
    subtitle:    "E-Commerce Platform",
    description: "Business website for a perfume decanter, built with the Bohuvuj team. Helps the owner manage and grow his business online with a clean shopping experience.",
    tech:        ["TypeScript", "HTML", "CSS", "Supabase"],
    color:       "cyan",
    emoji:       "🛍️",
    status:      "Live",
    link:        "https://perfumevaultbd.com",
    glowColor:   "#06b6d420",
    accentColor: "#06b6d4",
  },
  {
    name:        "Uthao",
    subtitle:    "Bangladeshi Thrifting App",
    description: "University project — Bangladesh's first recycled clothing thrifting platform on a SaaS model. Promotes sustainable fashion and connects buyers & sellers of second-hand clothes.",
    tech:        ["JavaScript", "PLpgSQL"],
    color:       "pink",
    emoji:       "♻️",
    status:      "University Project",
    link:        null,
    glowColor:   "#ec489920",
    accentColor: "#ec4899",
  },
  {
    name:        "AI / CV Research",
    subtitle:    "Deep Learning & Computer Vision Papers",
    description: "Co-authored 5+ research papers exploring deep learning, computer vision, and AI systems. Work spans from image classification to model optimization techniques.",
    tech:        ["Python", "PyTorch", "TensorFlow", "Google Colab"],
    color:       "green",
    emoji:       "🧠",
    status:      "Published",
    link:        null,
    glowColor:   "#10b98120",
    accentColor: "#10b981",
  },
];

const colorMap: Record<string, { border: string; badge: string; tech: string }> = {
  violet: {
    border: "group-hover:border-violet-500/50",
    badge:  "bg-violet-500/20 dark:text-violet-300 text-violet-700 border-violet-500/30",
    tech:   "dark:bg-violet-900/30 bg-violet-50 dark:text-violet-300 text-violet-700 border-violet-500/20",
  },
  cyan: {
    border: "group-hover:border-cyan-500/50",
    badge:  "bg-cyan-500/20 dark:text-cyan-300 text-cyan-700 border-cyan-500/30",
    tech:   "dark:bg-cyan-900/30 bg-cyan-50 dark:text-cyan-300 text-cyan-700 border-cyan-500/20",
  },
  pink: {
    border: "group-hover:border-pink-500/50",
    badge:  "bg-pink-500/20 dark:text-pink-300 text-pink-700 border-pink-500/30",
    tech:   "dark:bg-pink-900/30 bg-pink-50 dark:text-pink-300 text-pink-700 border-pink-500/20",
  },
  green: {
    border: "group-hover:border-green-500/50",
    badge:  "bg-green-500/20 dark:text-green-300 text-green-700 border-green-500/30",
    tech:   "dark:bg-green-900/30 bg-green-50 dark:text-green-300 text-green-700 border-green-500/20",
  },
};

/* 3-D tilt + spotlight handlers */
const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const el   = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const nx   = (e.clientX - rect.left) / rect.width  - 0.5;
  const ny   = (e.clientY - rect.top)  / rect.height - 0.5;
  el.style.transform  = `perspective(700px) rotateX(${-ny * 10}deg) rotateY(${nx * 10}deg) translateZ(10px) scale(1.02)`;
  el.style.transition = "transform 0.08s linear";
  el.style.setProperty("--mx", `${(e.clientX - rect.left)}px`);
  el.style.setProperty("--my", `${(e.clientY - rect.top)}px`);
};
const onCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform  = "";
  e.currentTarget.style.transition = "transform 0.6s ease, border-color 0.3s";
};

export default function Projects() {
  const { ref: headerRef, visible: headerVisible } = useReveal();
  const { ref: gridRef,   visible: gridVisible   } = useReveal();

  return (
    <section id="projects" className="py-24 relative overflow-hidden web-attached-section">
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob-2 absolute w-96 h-96 bg-pink-600/5 rounded-full right-0 top-1/2 blur-3xl" />
        <div className="absolute w-64 h-64 bg-cyan-600/5 rounded-full left-10 top-10 blur-3xl" />
        <div className="section-silk-thread" style={{ left: "20%" }} />
        <div className="section-silk-thread" style={{ left: "45%" }} />
        <div className="section-silk-thread" style={{ left: "78%" }} />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex items-center gap-4 mb-12"
          style={{
            opacity:    headerVisible ? 1 : 0,
            transform:  headerVisible ? "none" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="font-mono text-violet-400 text-sm section-num">03.</span>
          <h2 className="text-3xl font-bold dark:text-white text-gray-900">Projects</h2>
          <div
            className="flex-1 h-px bg-gradient-to-r from-violet-500/40 to-transparent"
            style={{
              transform:       headerVisible ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition:      "transform 0.8s ease 0.3s",
            }}
          />
        </div>

        {/* Cards */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-6">
          {projects.map((project, pi) => {
            const c = colorMap[project.color];
            return (
              <div
                key={project.name}
                onMouseMove={onCardMove}
                onMouseLeave={onCardLeave}
                className={`project-tilt group hanging-card relative p-6 rounded-2xl dark:bg-dark-700/40 bg-white border dark:border-white/5 border-gray-200 ${c.border} hover:shadow-2xl`}
                style={{
                  opacity:         gridVisible ? 1 : 0,
                  transitionDelay: gridVisible ? `${pi * 0.12}s` : "0s",
                  transition:      gridVisible
                    ? `opacity 0.6s ease ${pi * 0.12}s, transform 0.08s linear, border-color 0.3s, box-shadow 0.3s`
                    : "opacity 0.6s ease",
                }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-3xl transition-transform duration-300 group-hover:scale-125"
                      style={{ display: "inline-block" }}
                    >
                      {project.emoji}
                    </span>
                    <div>
                      <h3 className="dark:text-white text-gray-900 font-bold text-lg leading-tight">{project.name}</h3>
                      <p className="dark:text-slate-500 text-gray-400 text-xs font-mono">{project.subtitle}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full border text-xs font-mono ${c.badge} whitespace-nowrap`}>
                    {project.status}
                  </span>
                </div>

                <p className="dark:text-slate-400 text-gray-500 text-sm leading-relaxed mb-5 relative z-10">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                  {project.tech.map((t, ti) => (
                    <span
                      key={t}
                      className={`px-2.5 py-1 rounded-md border text-xs font-mono ${c.tech} transition-all`}
                      style={{
                        opacity:         gridVisible ? 1 : 0,
                        transitionDelay: gridVisible ? `${pi * 0.12 + ti * 0.04 + 0.2}s` : "0s",
                        transition:      "opacity 0.4s ease, transform 0.3s ease",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono dark:text-slate-400 text-gray-500 hover:text-violet-500 dark:hover:text-white transition-colors group/link relative z-10"
                  >
                    <span className="group-hover/link:underline">Visit site</span>
                    <span className="group-hover/link:translate-x-1 transition-transform">&#8599;</span>
                  </a>
                )}

                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-tr-2xl z-0"
                  style={{ background: `radial-gradient(circle at top right, ${project.glowColor}, transparent)` }}
                />

                {/* Animated border accent on card bottom */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}60, transparent)` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
