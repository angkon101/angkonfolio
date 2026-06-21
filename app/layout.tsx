import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";

export const metadata: Metadata = {
  title: "Angkon Debnath | Flutter Dev · Researcher · CS Student",
  description:
    "Portfolio of Angkon Debnath — Flutter developer, researcher, and CS student at IUBAT building real-world apps and exploring AI.",
  keywords: ["Angkon Debnath", "Flutter", "Developer", "Portfolio", "Bangladesh", "React", "TypeScript"],
  authors: [{ name: "Angkon Debnath" }],
  openGraph: {
    title: "Angkon Debnath | Portfolio",
    description: "Flutter Dev · Researcher · CS Student",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var isLight=t==='light'||(!t&&window.matchMedia('(prefers-color-scheme: light)').matches);document.documentElement.classList.add(isLight?'light':'dark');document.documentElement.classList.remove(isLight?'dark':'light')}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
