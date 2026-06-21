import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
