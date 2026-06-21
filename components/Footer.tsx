export default function Footer() {
  return (
    <footer className="py-8 border-t dark:border-white/5 border-gray-200">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm dark:text-slate-600 text-gray-400 font-mono">
        <span>
          Designed &amp; built by{" "}
          <span className="text-violet-400">Angkon Debnath</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Open to opportunities
        </span>
      </div>
    </footer>
  );
}
