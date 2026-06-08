import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Sparkles, FileText, ClipboardList, MapPin, Monitor, Settings, LogOut } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: Home, active: true },
  { label: 'AI Tutor', icon: Sparkles },
  { label: 'PDF Analyzer', icon: FileText },
  { label: 'Quiz Engine', icon: ClipboardList },
  { label: 'Career Roadmaps', icon: MapPin },
  { label: 'Mock Interview', icon: Monitor },
  { label: 'Settings', icon: Settings },
];

export default function Sidebar({ open, onClose, onLogout }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const initialX = isMobile ? -320 : 0;
  const animateX = isMobile ? (open ? 0 : -320) : 0;

  return (
    <motion.aside
      initial={{ x: initialX }}
      animate={{ x: animateX }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className={`fixed inset-y-0 left-0 z-40 w-72 overflow-hidden border-r border-white/10 bg-slate-950/95 px-6 py-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl transition-transform duration-300 md:static md:translate-x-0 md:shadow-none`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-sky-500 text-lg font-bold text-slate-950 shadow-lg shadow-cyan-500/20">
            EG
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/90">EduGenie AI</p>
            <p className="text-lg font-semibold text-slate-100">Learning Workspace</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-slate-200 transition hover:bg-white/10 md:hidden"
          aria-label="Close sidebar"
        >
          ×
        </button>
      </div>

      <nav className="mt-10 flex flex-col gap-2">
        {navItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-left text-sm font-medium transition ${
              active ? 'bg-slate-900/70 text-cyan-300 shadow-[0_20px_50px_rgba(14,116,144,0.12)]' : 'text-slate-300 hover:bg-white/5 hover:text-slate-100'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-12 rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-inner shadow-slate-950/20">
        <p className="text-sm text-slate-400">Stay on track with your AI-powered learning suite.</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-200">Premium</p>
            <p className="text-xs text-slate-500">Growth Plan</p>
          </div>
          <span className="inline-flex rounded-2xl bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-200">Active</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-3xl bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </motion.aside>
  );
}
