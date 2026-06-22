"use client";

import { useReveal } from "@/hooks/useReveal";

const timeline = [
  {
    type: "education",
    icon: "🎓",
    title:  "B.Sc. in Computer Science & Engineering",
    org:    "IUBAT — International University of Business Agriculture & Technology",
    period: "Expected Aug 2026",
    location: "Dhaka, Bangladesh",
    detail: "CGPA: 3.57 / 4.00 (as of Fall 2025)",
    color: "violet",
  },
  {
    type: "training",
    icon: "📱",
    title:  "Flutter App Development Training",
    org:    "EDGE Program — Jagannath University CSE / Bangladesh Computer Council, ICT Division",
    period: "Nov 2024 – May 2025",
    location: "Dhaka, Bangladesh",
    detail: "Government-backed program focused on cross-platform mobile development with Flutter SDK.",
    color: "cyan",
  },
  {
    type: "work",
    icon: "💼",
    title:  "Software Developer",
    org:    "Bohuvuj",
    period: "Ongoing",
    location: "Dhaka, Bangladesh",
    detail: "Building and shipping web products across multiple stacks. Contributed to Subash and Perfumevaultbd.com.",
    color: "pink",
  },
];

const languages = [
  { lang: "Bangla",  level: "Native",          width: "100%", gradient: "from-violet-500 to-violet-400" },
  { lang: "English", level: "Professional",     width: "85%",  gradient: "from-cyan-500 to-cyan-400"    },
  { lang: "Hindi",   level: "Basic Speaking",   width: "40%",  gradient: "from-pink-500 to-pink-400"    },
  { lang: "German",  level: "Learning",         width: "15%",  gradient: "from-green-500 to-green-400"  },
];

const colorMap: Record<string, { dot: string; hoverBorder: string; badge: string }> = {
  violet: { dot: "bg-violet-500 shadow-violet-500/50", hoverBorder: "hover:border-violet-500/30", badge: "dark:text-violet-300 text-violet-700 bg-violet-500/10 border-violet-500/30"  },
  cyan:   { dot: "bg-cyan-500 shadow-cyan-500/50",     hoverBorder: "hover:border-cyan-500/30",   badge: "dark:text-cyan-300 text-cyan-700 bg-cyan-500/10 border-cyan-500/30"        },
  pink:   { dot: "bg-pink-500 shadow-pink-500/50",     hoverBorder: "hover:border-pink-500/30",   badge: "dark:text-pink-300 text-pink-700 bg-pink-500/10 border-pink-500/30"        },
};

export default function Education() {
  const { ref: headerRef,  visible: headerVisible  } = useReveal();
  const { ref: timelineRef, visible: timelineVisible } = useReveal();
  const { ref: langRef,    visible: langVisible    } = useReveal();

  return (
    <section id="education" className="py-24 relative overflow-hidden web-attached-section">
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob absolute w-80 h-80 bg-violet-600/5 rounded-full left-0 top-0 blur-3xl" />
        <div className="blob-3 absolute w-64 h-64 bg-cyan-600/5 rounded-full right-20 bottom-20 blur-3xl" />
        <div className="section-silk-thread" style={{ left: "12%" }} />
        <div className="section-silk-thread" style={{ left: "55%" }} />
        <div className="section-silk-thread" style={{ left: "88%" }} />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div
          ref={headerRef}
          className="flex items-center gap-4 mb-12"
          style={{
            opacity:    headerVisible ? 1 : 0,
            transform:  headerVisible ? "none" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="font-mono text-violet-400 text-sm section-num">04.</span>
          <h2 className="text-3xl font-bold dark:text-white text-gray-900">Education &amp; Experience</h2>
          <div
            className="flex-1 h-px bg-gradient-to-r from-violet-500/40 to-transparent"
            style={{
              transform:       headerVisible ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition:      "transform 0.8s ease 0.3s",
            }}
          />
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line — draws itself */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-cyan-500/30 to-transparent"
            style={{
              transform:       timelineVisible ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "top center",
              transition:      "transform 1.2s cubic-bezier(0.4,0,0.2,1) 0.2s",
            }}
          />

          <div className="space-y-8 pl-14">
            {timeline.map((item, i) => {
              const c = colorMap[item.color];
              return (
                <div
                  key={i}
                  className="relative group"
                  style={{
                    opacity:         timelineVisible ? 1 : 0,
                    transform:       timelineVisible ? "none" : "translateX(-20px)",
                    transition:      "opacity 0.6s ease, transform 0.6s ease",
                    transitionDelay: timelineVisible ? `${0.3 + i * 0.15}s` : "0s",
                  }}
                >
                  {/* Animated dot */}
                  <div
                    className={`absolute -left-9 top-2 w-4 h-4 rounded-full border-2 dark:border-dark-900 border-white ${c.dot} shadow-lg transition-all duration-300 group-hover:scale-125 group-hover:shadow-xl`}
                    style={{
                      opacity:         timelineVisible ? 1 : 0,
                      transition:      "opacity 0.4s ease, transform 0.3s ease, box-shadow 0.3s",
                      transitionDelay: timelineVisible ? `${0.4 + i * 0.15}s` : "0s",
                    }}
                  />

                  <div
                    className={`shimmer-card hanging-card p-6 rounded-2xl dark:bg-dark-700/40 bg-white border dark:border-white/5 border-gray-200 ${c.hoverBorder} transition-all hover:-translate-y-1`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="text-2xl transition-transform duration-300 group-hover:scale-110"
                          style={{ display: "inline-block" }}
                        >
                          {item.icon}
                        </span>
                        <div>
                          <h3 className="dark:text-white text-gray-900 font-bold leading-tight">{item.title}</h3>
                          <p className="dark:text-slate-400 text-gray-500 text-sm mt-0.5">{item.org}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`px-3 py-1 rounded-full border text-xs font-mono ${c.badge}`}>
                          {item.period}
                        </span>
                        <span className="dark:text-slate-600 text-gray-400 text-xs font-mono">{item.location}</span>
                      </div>
                    </div>
                    <p className="dark:text-slate-400 text-gray-500 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Languages section */}
        <div
          ref={langRef}
          className="mt-12 p-6 rounded-2xl dark:bg-dark-700/40 bg-white border dark:border-white/5 border-gray-200"
          style={{
            opacity:    langVisible ? 1 : 0,
            transform:  langVisible ? "none" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          <h3 className="dark:text-white text-gray-900 font-semibold mb-5 flex items-center gap-2">
            <span>🌍</span> Languages
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {languages.map((l, li) => (
              <div key={l.lang}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="dark:text-white text-gray-900 font-medium">{l.lang}</span>
                  <span className="dark:text-slate-500 text-gray-400">{l.level}</span>
                </div>
                <div className="h-1.5 dark:bg-dark-600 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${l.gradient}`}
                    style={{
                      width:           langVisible ? l.width : "0%",
                      transition:      "width 1s cubic-bezier(0.4,0,0.2,1)",
                      transitionDelay: langVisible ? `${0.3 + li * 0.12}s` : "0s",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
