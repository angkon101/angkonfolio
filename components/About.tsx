"use client";

import { useReveal } from "@/hooks/useReveal";

export default function About() {
  const { ref, visible } = useReveal();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-cyan-500/5 rounded-full -right-32 top-0 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`reveal ${visible ? "visible" : ""}`}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-violet-400 text-sm">01.</span>
            <h2 className="text-3xl font-bold text-white">About Me</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-violet-500/40 to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Hey! I'm <span className="text-violet-400 font-semibold">Angkon Debnath</span> — a computer science
                student at <span className="text-cyan-400 font-semibold">IUBAT</span> based in Dhaka, Bangladesh.
                I love building products that actually get used.
              </p>
              <p>
                My main toolkit is <span className="text-white font-medium">Flutter</span> for cross-platform apps
                and <span className="text-white font-medium">TypeScript + React</span> for the web. I've shipped real
                products with the team at{" "}
                <span className="text-pink-400 font-semibold">Bohuvuj</span>, from e-commerce
                platforms to community knowledge bases.
              </p>
              <p>
                I'm also deep into <span className="text-white font-medium">AI research</span> — I've co-authored
                5+ papers on deep learning and computer vision. Trained in Flutter under the
                government-backed{" "}
                <span className="text-cyan-400 font-medium">EDGE Program</span> at Bangladesh
                Computer Council.
              </p>
              <p>
                When I'm not coding, I'm learning German, exploring SQA methodologies, or
                thinking about Bangladesh's tech ecosystem.
              </p>
            </div>

            {/* Fun facts grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🎓", label: "CGPA", value: "3.57 / 4.00", color: "violet" },
                { icon: "🚀", label: "Projects", value: "5+ shipped", color: "cyan" },
                { icon: "📄", label: "Papers", value: "5+ research", color: "pink" },
                { icon: "🏛️", label: "University", value: "IUBAT, Dhaka", color: "green" },
                { icon: "🌍", label: "Languages", value: "4 spoken", color: "cyan" },
                { icon: "🛠️", label: "Stack", value: "Flutter · TS · React", color: "violet" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`group p-4 rounded-xl bg-dark-700/50 border border-white/5 hover:border-${item.color}-500/30 transition-all hover:bg-dark-700/80 hover:-translate-y-1`}
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-xs text-slate-500 font-mono">{item.label}</div>
                  <div className="text-sm text-white font-semibold mt-0.5">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
