import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: "#8b5cf6",
          cyan: "#06b6d4",
          pink: "#ec4899",
          green: "#10b981",
        },
        dark: {
          900: "#05050a",
          800: "#0a0a14",
          700: "#0f0f1e",
          600: "#16162a",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
        sans: ["'Inter'", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 8s ease-in-out 1s infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "typewriter": "typewriter 3s steps(40) forwards",
        "blink": "blink 1s step-end infinite",
        "slide-up": "slide-up 0.6s ease forwards",
        "slide-left": "slide-left 0.6s ease forwards",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "spin-slow": "spin 20s linear infinite",
        "glitch-1": "glitch-1 0.3s infinite",
        "glitch-2": "glitch-2 0.3s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px #8b5cf640" },
          "50%": { boxShadow: "0 0 40px #8b5cf680, 0 0 80px #8b5cf640" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-left": {
          from: { opacity: "0", transform: "translateX(-40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "glitch-1": {
          "0%, 100%": { clip: "rect(0, 900px, 0, 0)", transform: "skew(0deg)" },
          "20%": { clip: "rect(20px, 900px, 40px, 0)", transform: "skew(0.3deg)" },
          "40%": { clip: "rect(60px, 900px, 80px, 0)", transform: "skew(-0.3deg)" },
          "60%": { clip: "rect(10px, 900px, 30px, 0)", transform: "skew(0.5deg)" },
          "80%": { clip: "rect(50px, 900px, 70px, 0)", transform: "skew(-0.2deg)" },
        },
        "glitch-2": {
          "0%, 100%": { clip: "rect(0, 900px, 0, 0)", transform: "skew(0deg)" },
          "15%": { clip: "rect(80px, 900px, 100px, 0)", transform: "skew(-0.4deg)" },
          "35%": { clip: "rect(30px, 900px, 50px, 0)", transform: "skew(0.2deg)" },
          "55%": { clip: "rect(70px, 900px, 90px, 0)", transform: "skew(-0.5deg)" },
          "75%": { clip: "rect(15px, 900px, 35px, 0)", transform: "skew(0.3deg)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        typewriter: {
          from: { width: "0" },
          to: { width: "100%" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
    },
  },
  plugins: [],
};
export default config;
