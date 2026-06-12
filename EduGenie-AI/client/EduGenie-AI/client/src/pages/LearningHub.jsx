import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

export default function LearningHub() {
  const { onOpenSidebar } = useOutletContext();

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/95 px-4 py-3 backdrop-blur-lg md:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenSidebar?.(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10 md:hidden"
              aria-label="Open navigation"
            >
              ☰
            </button>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">EduGenie</p>
              <h1 className="text-lg font-semibold text-white">Learning Hub</h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenSidebar?.(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Open navigation"
          >
            ⋮
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/80 p-12 shadow-2xl shadow-slate-950/40 text-center"
          >
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Learning Hub
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-slate-300">
                Coming Soon
              </p>
              <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-400">
                We're building an enhanced learning experience for you. Check back soon for personalized learning paths, progress tracking, and more.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
