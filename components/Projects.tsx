"use client";

import { useReveal } from "@/hooks/useReveal";

const projects = [
  {
    name: "Subash",
    subtitle: "Bangladesh's Largest Perfume Wikipedia",
    description:
      "A community platform for perfume enthusiasts and Bangladeshi perfume houses. Lets users learn about fragrances and explore local and international perfume brands.",
    tech: ["TypeScript", "HTML", "CSS", "Supabase", "JavaScript", "Docker"],
    color: "violet",
    emoji: "🌸",
    status: "In Progress",
    link: null,
  },
  {
    name: "Perfumevaultbd.com",
    subtitle: "E-Commerce Platform",
    description:
      "Business website for a perfume decanter, built with the Bohuvuj team. Helps the owner manage and grow his business online with a clean shopping experience.",
    tech: ["TypeScript", "HTML", "CSS", "Supabase"],
    color: "cyan",
    emoji: "🛍️",
    status: "Live",
    link: "https://perfumevaultbd.com",
  },
  {
    name: "Uthao",
    subtitle: "Bangladeshi Thrifting App",
    description:
      "University project — Bangladesh's first recycled clothing thrifting platform on a SaaS model. Promotes sustainable fashion and connects buyers & sellers of second-hand clothes.",
    tech: ["JavaScript", "PLpgSQL"],
    color: "pink",
    emoji: "♻️",
    status: "University Project",
    link: null,
  },
  {
    name: "AI / CV Research",
    subtitle: "Deep Learning & Computer Vision Papers",
    description:
      "Co-authored 5+ research papers exploring deep learning, computer vision, and AI systems. Work spans from image classification to model optimization techniques.",
    tech: ["Python", "PyTorch", "TensorFlow", "Google Colab"],
    color: "green",
    emoji: "🧠",
    status: "Published",
    link: null,
  },
];

const colorMap: Record<string, { border: string; badge: string; tech: string; glow: string }> = {
  violet: {
    border: "group-hover:border-violet-500/50",
    badge: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    tech: "bg-violet-900/30 text-violet-300 border-violet-500/20",
    glow: "group-hover:shadow-violet-500/10",
  },
  cyan: {
    border: "group-hover:border-cyan-500/50",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    tech: "bg-cyan-900/30 text-cyan-300 border-cyan-500/20",
    glow: "group-hover:shadow-cyan-500/10",
  },
  pink: {
    border: "group-hover:border-pink-500/50",
    badge: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    tech: "bg-pink-900/30 text-pink-300 border-pink-500/20",
    glow: "group-hover:shadow-pink-500/10",
  },
  green: {
    border: "group-hover:border-green-500/50",
    badge: "bg-green-500/20 text-green-300 border-green-500/30",
    tech: "bg-green-900/30 text-green-300 border-green-500/20",
    glow: "group-hover:shadow-green-500/10",
  },
};

export default function Projects() {
  const { ref, visible } = useReveal();

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-pink-600/5 rounded-full right-0 top-1/2 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`reveal ${visible ? "visible" : ""}`}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-violet-400 text-sm">03.</span>
            <h2 className="text-3xl font-bold text-white">Projects</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-violet-500/40 to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => {
              const c = colorMap[project.color];
              return (
                <div
                  key={project.name}
                  className={`group relative p-6 rounded-2xl bg-dark-700/40 border border-white/5 ${c.border} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${c.glow}`}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{project.emoji}</span>
                      <div>
                        <h3 className="text-white font-bold text-lg leading-tight">{project.name}</h3>
                        <p className="text-slate-500 text-xs font-mono">{project.subtitle}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full border text-xs font-mono ${c.badge} whitespace-nowrap`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.description}</p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className={`px-2.5 py-1 rounded-md border text-xs font-mono ${c.tech}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors group/link"
                    >
                      <span className="group-hover/link:underline">Visit site</span>
                      <span className="group-hover/link:translate-x-1 transition-transform">↗</span>
                    </a>
                  )}

                  {/* Corner accent */}
                  <div
                    className={`absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                    style={{
                      background: `radial-gradient(circle at top right, ${
                        project.color === "violet"
                          ? "#8b5cf620"
                          : project.color === "cyan"
                          ? "#06b6d420"
                          : project.color === "pink"
                          ? "#ec489920"
                          : "#10b98120"
                      }, transparent)`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
