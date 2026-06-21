"use client";

import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-dark-900 focus-visible:ring-offset-slate-100"
      style={{
        backgroundColor: theme === "dark" ? "#1e1b4b" : "#e0e7ff",
      }}
    >
      {/* Track icons */}
      <span className="absolute inset-0 flex items-center justify-between px-1.5 text-[10px]">
        <span className={`transition-opacity duration-200 ${theme === "dark" ? "opacity-100" : "opacity-0"}`}>
          &#9790;
        </span>
        <span className={`transition-opacity duration-200 ${theme === "light" ? "opacity-100" : "opacity-0"}`}>
          &#9728;
        </span>
      </span>

      {/* Sliding circle */}
      <span
        className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          transform: theme === "light" ? "translateX(28px)" : "translateX(0)",
          background: theme === "dark" ? "linear-gradient(135deg, #818cf8, #6366f1)" : "linear-gradient(135deg, #fbbf24, #f59e0b)",
        }}
      >
        {theme === "dark" ? (
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        )}
      </span>
    </button>
  );
}
