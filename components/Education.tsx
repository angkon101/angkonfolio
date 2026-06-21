"use client";

import { useReveal } from "@/hooks/useReveal";

const timeline = [
  {
    type: "education",
    icon: "🎓",
    title: "B.Sc. in Computer Science & Engineering",
    org: "IUBAT — International University of Business Agriculture & Technology",
    period: "Expected Aug 2026",
    location: "Dhaka, Bangladesh",
    detail: "CGPA: 3.57 / 4.00 (as of Fall 2025)",
    color: "violet",
  },
  {
    type: "training",
    icon: "📱",
    title: "Flutter App Development Training",
    org: "EDGE Program — Jagannath University CSE / Bangladesh Computer Council, ICT Division",
    period: "Nov 2024 – May 2025",
    location: "Dhaka, Bangladesh",
    detail: "Government-backed program focused on cross-platform mobile development with Flutter SDK.",
    color: "cyan",
  },
  {
    type: "work",
    icon: "💼",
    title: "Software Developer",
    org: "Bohuvuj",
    period: "Ongoing",
    location: "Dhaka, Bangladesh",
    detail: "Building and shipping web products across multiple stacks. Contributed to Subash and Perfumevaultbd.com.",
    color: "pink",
  },
];

const colorMap: Record<string, { dot: string; border: string; badge: string }> = {
  violet: {
    dot: "bg-violet-500 shadow-violet-500/50",
    border: "border-violet-500/30",
    badge: "text-violet-300 bg-violet-500/10 border-violet-500/30",
  },
  cyan: {
    dot: "bg-cyan-500 shadow-cyan-500/50",
    border: "border-cyan-500/30",
    badge: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30",
  },
  pink: {
    dot: "bg-pink-500 shadow-pink-500/50",
    border: "border-pink-500/30",
    badge: "text-pink-300 bg-pink-500/10 border-pink-500/30",
  },
};

export default function Education() {
  const { ref, visible } = useReveal();

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-80 h-80 bg-violet-600/5 rounded-full left-0 top-0 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`reveal ${visible ? "visible" : ""}`}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-violet-400 text-sm">04.</span>
            <h2 className="text-3xl font-bold text-white">Education & Experience</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-violet-500/40 to-transparent" />
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-cyan-500/30 to-transparent" />

            <div className="space-y-8 pl-14">
              {timeline.map((item, i) => {
                const c = colorMap[item.color];
                return (
                  <div key={i} className="relative group">
                    {/* Timeline dot */}
                    <div
                      className={`absolute -left-9 top-2 w-4 h-4 rounded-full border-2 border-dark-900 ${c.dot} shadow-lg transition-transform group-hover:scale-125`}
                    />

                    <div
                      className={`p-6 rounded-2xl bg-dark-700/40 border border-white/5 hover:${c.border} transition-all hover:-translate-y-1`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <h3 className="text-white font-bold leading-tight">{item.title}</h3>
                            <p className="text-slate-400 text-sm mt-0.5">{item.org}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={`px-3 py-1 rounded-full border text-xs font-mono ${c.badge}`}
                          >
                            {item.period}
                          </span>
                          <span className="text-slate-600 text-xs font-mono">{item.location}</span>
                        </div>
                      </div>

                      <p className="text-slate-400 text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Languages section */}
          <div className="mt-12 p-6 rounded-2xl bg-dark-700/40 border border-white/5">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span>🌍</span> Languages
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { lang: "Bangla", level: "Native", width: "100%", color: "violet" },
                { lang: "English", level: "Professional", width: "85%", color: "cyan" },
                { lang: "Hindi", level: "Basic Speaking", width: "40%", color: "pink" },
                { lang: "German", level: "Learning", width: "15%", color: "green" },
              ].map((l) => (
                <div key={l.lang}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white font-medium">{l.lang}</span>
                    <span className="text-slate-500">{l.level}</span>
                  </div>
                  <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${
                        l.color === "violet"
                          ? "from-violet-500 to-violet-400"
                          : l.color === "cyan"
                          ? "from-cyan-500 to-cyan-400"
                          : l.color === "pink"
                          ? "from-pink-500 to-pink-400"
                          : "from-green-500 to-green-400"
                      }`}
                      style={{ width: l.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
