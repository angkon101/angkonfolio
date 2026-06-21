"use client";

import { useReveal } from "@/hooks/useReveal";

const skillGroups = [
  {
    category: "Languages",
    color: "violet",
    icon: "⌨️",
    skills: ["TypeScript", "Dart", "JavaScript", "Python", "C#", "C++", "C", "SQL", "HTML", "CSS"],
  },
  {
    category: "Frameworks",
    color: "cyan",
    icon: "🧩",
    skills: ["Flutter SDK", "React.js", "PyTorch", "TensorFlow"],
  },
  {
    category: "Databases",
    color: "pink",
    icon: "🗄️",
    skills: ["PostgreSQL", "MySQL", "Supabase", "Firebase Firestore", "MongoDB"],
  },
  {
    category: "Tools & DevOps",
    color: "green",
    icon: "🛠️",
    skills: ["Git", "GitHub", "Docker", "JIRA", "Postman", "Notion", "Trello", "Google Colab"],
  },
  {
    category: "Architecture",
    color: "violet",
    icon: "🏗️",
    skills: ["Clean Architecture", "Repository Pattern", "RESTful API", "Agile / Scrum"],
  },
  {
    category: "SQA & Testing",
    color: "pink",
    icon: "🧪",
    skills: ["Manual Testing", "Test Case Writing", "Bug Reporting", "API Testing (Postman)"],
  },
];

const colorMap: Record<string, string> = {
  violet: "border-violet-500/30 text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 hover:border-violet-400/50",
  cyan: "border-cyan-500/30 text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-400/50",
  pink: "border-pink-500/30 text-pink-300 bg-pink-500/10 hover:bg-pink-500/20 hover:border-pink-400/50",
  green: "border-green-500/30 text-green-300 bg-green-500/10 hover:bg-green-500/20 hover:border-green-400/50",
};

const headerColorMap: Record<string, string> = {
  violet: "text-violet-400",
  cyan: "text-cyan-400",
  pink: "text-pink-400",
  green: "text-green-400",
};

export default function Skills() {
  const { ref, visible } = useReveal();

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-violet-600/5 rounded-full -left-32 bottom-0 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`reveal ${visible ? "visible" : ""}`}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-violet-400 text-sm">02.</span>
            <h2 className="text-3xl font-bold text-white">Skills</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-violet-500/40 to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="p-6 rounded-2xl bg-dark-700/40 border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl">{group.icon}</span>
                  <h3 className={`font-semibold text-sm ${headerColorMap[group.color]} font-mono`}>
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`skill-pill px-3 py-1 rounded-full border text-xs font-mono ${colorMap[group.color]}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
