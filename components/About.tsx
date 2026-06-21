"use client";

import { useReveal } from "@/hooks/useReveal";

const hoverBorderMap: Record<string, string> = {
  violet: "hover:border-violet-500/30",
  cyan:   "hover:border-cyan-500/30",
  pink:   "hover:border-pink-500/30",
  green:  "hover:border-green-500/30",
};

const facts = [
  { icon: "🎓", label: "CGPA",       value: "3.57 / 4.00",       color: "violet" },
  { icon: "🚀", label: "Projects",   value: "5+ shipped",         color: "cyan"   },
  { icon: "📄", label: "Papers",     value: "5+ research",        color: "pink"   },
  { icon: "🏛️", label: "University", value: "IUBAT, Dhaka",       color: "green"  },
  { icon: "🌍", label: "Languages",  value: "4 spoken",           color: "cyan"   },
  { icon: "🛠️", label: "Stack",      value: "Flutter · TS · React", color: "violet" },
];

export default function About() {
  const { ref: headerRef, visible: headerVisible } = useReveal();
  const { ref: textRef,   visible: textVisible   } = useReveal();
  const { ref: gridRef,   visible: gridVisible   } = useReveal();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-cyan-500/5 rounded-full -right-32 top-0 blur-3xl" />
        <div className="blob-2 absolute w-64 h-64 bg-violet-600/5 rounded-full left-10 bottom-10 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Animated section header */}
        <div
          ref={headerRef}
          className="flex items-center gap-4 mb-12"
          style={{
            opacity:    headerVisible ? 1 : 0,
            transform:  headerVisible ? "none" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="font-mono text-violet-400 text-sm section-num">01.</span>
          <h2 className="text-3xl font-bold text-white">About Me</h2>
          <div
            className="flex-1 h-px bg-gradient-to-r from-violet-500/40 to-transparent"
            style={{
              transform:  headerVisible ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 0.8s ease 0.3s",
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Body text — slides in from left */}
          <div
            ref={textRef}
            className="space-y-4 text-slate-400 leading-relaxed"
            style={{
              opacity:    textVisible ? 1 : 0,
              transform:  textVisible ? "none" : "translateX(-28px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            <p>
              Hey! I&apos;m <span className="text-violet-400 font-semibold">Angkon Debnath</span> — a computer
              science student at <span className="text-cyan-400 font-semibold">IUBAT</span> based in Dhaka,
              Bangladesh. I love building products that actually get used.
            </p>
            <p>
              My main toolkit is <span className="text-white font-medium">Flutter</span> for cross-platform apps
              and <span className="text-white font-medium">TypeScript + React</span> for the web. I&apos;ve shipped
              real products with the team at{" "}
              <span className="text-pink-400 font-semibold">Bohuvuj</span>, from e-commerce platforms to
              community knowledge bases.
            </p>
            <p>
              I&apos;m also deep into <span className="text-white font-medium">AI research</span> — co-authored 5+
              papers on deep learning and computer vision. Trained in Flutter under the government-backed{" "}
              <span className="text-cyan-400 font-medium">EDGE Program</span> at Bangladesh Computer Council.
            </p>
            <p>
              When I&apos;m not coding, I&apos;m learning German, exploring SQA methodologies, or thinking about
              Bangladesh&apos;s tech ecosystem.
            </p>
          </div>

          {/* Fact cards — stagger in from right */}
          <div ref={gridRef} className="grid grid-cols-2 gap-4">
            {facts.map((item, i) => (
              <div
                key={item.label}
                className={`group p-4 rounded-xl bg-dark-700/50 border border-white/5 ${hoverBorderMap[item.color]} transition-colors hover:bg-dark-700/80 hover:-translate-y-1`}
                style={{
                  opacity:         gridVisible ? 1 : 0,
                  transform:       gridVisible ? "none" : "translateY(24px) scale(0.95)",
                  transition:      "opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, background 0.3s",
                  transitionDelay: gridVisible ? `${i * 0.07}s` : "0s",
                }}
              >
                <div
                  className="text-2xl mb-2 transition-transform group-hover:scale-125"
                  style={{ display: "inline-block" }}
                >
                  {item.icon}
                </div>
                <div className="text-xs text-slate-500 font-mono">{item.label}</div>
                <div className="text-sm text-white font-semibold mt-0.5">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
