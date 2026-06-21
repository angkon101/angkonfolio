"use client";

import { useReveal } from "@/hooks/useReveal";

const skillGroups = [
  { category: "Languages",      color: "violet", icon: "⌨️",
    skills: ["TypeScript", "Dart", "JavaScript", "Python", "C#", "C++", "C", "SQL", "HTML", "CSS"] },
  { category: "Frameworks",     color: "cyan",   icon: "🧩",
    skills: ["Flutter SDK", "React.js", "PyTorch", "TensorFlow"] },
  { category: "Databases",      color: "pink",   icon: "🗄️",
    skills: ["PostgreSQL", "MySQL", "Supabase", "Firebase Firestore", "MongoDB"] },
  { category: "Tools & DevOps", color: "green",  icon: "🛠️",
    skills: ["Git", "GitHub", "Docker", "JIRA", "Postman", "Notion", "Trello", "Google Colab"] },
  { category: "Architecture",   color: "violet", icon: "🏗️",
    skills: ["Clean Architecture", "Repository Pattern", "RESTful API", "Agile / Scrum"] },
  { category: "SQA & Testing",  color: "pink",   icon: "🧪",
    skills: ["Manual Testing", "Test Case Writing", "Bug Reporting", "API Testing (Postman)"] },
];

const colorMap: Record<string, string> = {
  violet: "border-violet-500/30 dark:text-violet-300 text-violet-700 bg-violet-500/10 hover:bg-violet-500/20 hover:border-violet-400/50",
  cyan:   "border-cyan-500/30 dark:text-cyan-300 text-cyan-700 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-400/50",
  pink:   "border-pink-500/30 dark:text-pink-300 text-pink-700 bg-pink-500/10 hover:bg-pink-500/20 hover:border-pink-400/50",
  green:  "border-green-500/30 dark:text-green-300 text-green-700 bg-green-500/10 hover:bg-green-500/20 hover:border-green-400/50",
};

const headerColorMap: Record<string, string> = {
  violet: "text-violet-400",
  cyan:   "text-cyan-400",
  pink:   "text-pink-400",
  green:  "text-green-400",
};

const iconBgMap: Record<string, string> = {
  violet: "bg-violet-500/10",
  cyan:   "bg-cyan-500/10",
  pink:   "bg-pink-500/10",
  green:  "bg-green-500/10",
};

export default function Skills() {
  const { ref: headerRef, visible: headerVisible } = useReveal();
  const { ref: gridRef,   visible: gridVisible   } = useReveal();

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob absolute w-96 h-96 bg-violet-600/5 rounded-full -left-32 bottom-0 blur-3xl" />
        <div className="blob-3 absolute w-64 h-64 bg-cyan-600/5 rounded-full right-20 top-10 blur-3xl" />
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
          <span className="font-mono text-violet-400 text-sm section-num">02.</span>
          <h2 className="text-3xl font-bold dark:text-white text-gray-900">Skills</h2>
          <div
            className="flex-1 h-px bg-gradient-to-r from-violet-500/40 to-transparent"
            style={{
              transform:       headerVisible ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition:      "transform 0.8s ease 0.3s",
            }}
          />
        </div>

        {/* Skill group cards — staggered pop-in */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <div
              key={group.category}
              className="shimmer-card relative p-6 rounded-2xl dark:bg-dark-700/40 bg-white border dark:border-white/5 border-gray-200 hover:border-white/10 transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{
                opacity:         gridVisible ? 1 : 0,
                transform:       gridVisible ? "none" : "translateY(32px) scale(0.95)",
                transition:      "opacity 0.55s ease, transform 0.55s ease, border-color 0.3s, box-shadow 0.3s",
                transitionDelay: gridVisible ? `${gi * 0.09}s` : "0s",
              }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`flex items-center justify-center w-8 h-8 rounded-lg text-lg ${iconBgMap[group.color]}`}>
                  {group.icon}
                </span>
                <h3 className={`font-semibold text-sm ${headerColorMap[group.color]} font-mono tracking-wide`}>
                  {group.category}
                </h3>
              </div>

              {/* Skill pills — tiny inner stagger */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <span
                    key={skill}
                    className={`skill-pill px-3 py-1 rounded-full border text-xs font-mono ${colorMap[group.color]}`}
                    style={{
                      opacity:         gridVisible ? 1 : 0,
                      transition:      "opacity 0.4s ease",
                      transitionDelay: gridVisible ? `${gi * 0.09 + si * 0.03 + 0.15}s` : "0s",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
