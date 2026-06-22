import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SpiderWebBg from "@/components/SpiderWebBg";

export default function Home() {
  return (
    <>
      {/* Canvas at z-index:0 — behind everything */}
      <SpiderWebBg />

      {/* Main at z-index:1, transparent — body provides background */}
      <main className="relative min-h-screen text-slate-100" style={{ zIndex: 1 }}>
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <Hero />
        <div className="web-strand-connector" />
        <About />
        <div className="web-strand-connector" />
        <Skills />
        <div className="web-strand-connector" />
        <Projects />
        <div className="web-strand-connector" />
        <Education />
        <div className="web-strand-connector" />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
