"use client";

import { useReveal } from "@/hooks/useReveal";

const socials = [
  {
    name:   "GitHub",
    handle: "@angkondebnath",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    href:  "https://github.com/angkondebnath",
    color: "violet",
  },
  {
    name:   "LinkedIn",
    handle: "Angkon Debnath",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    href:  "https://linkedin.com/in/angkondebnath",
    color: "cyan",
  },
  {
    name:   "Google Scholar",
    handle: "Research Papers",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 100 14 7 7 0 000-14z" />
      </svg>
    ),
    href:  "#",
    color: "pink",
  },
  {
    name:   "Email",
    handle: "redwanrashidrico@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    href:  "mailto:redwanrashidrico@gmail.com",
    color: "green",
  },
];

const colorMap: Record<string, string> = {
  violet: "bg-violet-500/10 border-violet-500/20 text-violet-400 hover:bg-violet-500/20 hover:border-violet-500/50",
  cyan:   "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50",
  pink:   "bg-pink-500/10 border-pink-500/20 text-pink-400 hover:bg-pink-500/20 hover:border-pink-500/50",
  green:  "bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20 hover:border-green-500/50",
};

export default function Contact() {
  const { ref: headerRef, visible: headerVisible } = useReveal();
  const { ref: textRef,   visible: textVisible   } = useReveal();
  const { ref: cardsRef,  visible: cardsVisible  } = useReveal();

  /* Subtle magnetic on each card */
  const onMagnet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 10;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 6;
    e.currentTarget.style.transform  = `translate(${x}px,${y}px) translateY(-4px)`;
    e.currentTarget.style.transition = "transform 0.1s ease";
  };
  const offMagnet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform  = "";
    e.currentTarget.style.transition = "transform 0.4s ease";
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob absolute w-96 h-96 bg-violet-600/10 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
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
          <span className="font-mono text-violet-400 text-sm section-num">05.</span>
          <h2 className="text-3xl font-bold text-white">Get In Touch</h2>
          <div
            className="flex-1 h-px bg-gradient-to-r from-violet-500/40 to-transparent"
            style={{
              transform:       headerVisible ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition:      "transform 0.8s ease 0.3s",
            }}
          />
        </div>

        {/* Intro text */}
        <div
          ref={textRef}
          className="text-center mb-12"
          style={{
            opacity:    textVisible ? 1 : 0,
            transform:  textVisible ? "none" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto">
            Whether you have a project idea, research collaboration, or just want to say hi —
            my inbox is always open. I respond to every message.
          </p>
          <div className="mt-2 font-mono text-sm text-violet-400">
            📍 Uttara Sector 10, Dhaka, Bangladesh
          </div>
        </div>

        {/* Social cards — staggered */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 gap-4 mb-12">
          {socials.map((s, i) => (
            <a
              key={s.name}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              onMouseMove={onMagnet}
              onMouseLeave={offMagnet}
              className={`group flex items-center gap-4 p-5 rounded-xl border transition-colors ${colorMap[s.color]}`}
              style={{
                opacity:         cardsVisible ? 1 : 0,
                transform:       cardsVisible ? "none" : "translateY(20px) scale(0.96)",
                transition:      "opacity 0.5s ease, transform 0.5s ease, background 0.3s, border-color 0.3s",
                transitionDelay: cardsVisible ? `${i * 0.1}s` : "0s",
              }}
            >
              <div className="shrink-0 transition-transform group-hover:scale-110">{s.icon}</div>
              <div>
                <div className="text-white font-semibold text-sm">{s.name}</div>
                <div className="text-slate-500 text-xs font-mono">{s.handle}</div>
              </div>
              <div className="ml-auto text-slate-600 group-hover:text-slate-300 group-hover:translate-x-1 transition-all">
                →
              </div>
            </a>
          ))}
        </div>

        {/* Phone */}
        <div
          className="text-center"
          style={{
            opacity:    cardsVisible ? 1 : 0,
            transition: "opacity 0.5s ease 0.45s",
          }}
        >
          <a
            href="tel:+8801581669539"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-mono text-sm"
          >
            <span className="text-violet-400">📞</span>
            +880 1581 669539
          </a>
        </div>
      </div>
    </section>
  );
}
