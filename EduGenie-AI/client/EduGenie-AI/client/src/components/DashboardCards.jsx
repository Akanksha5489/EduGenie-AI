import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, FileText, Zap, ShieldCheck } from 'lucide-react';

const featureModules = [
  {
    title: 'AI Tutor',
    slug: 'ai-tutor',
    description: 'Guided practice, instant feedback, and study routines.',
    icon: Sparkles,
    gradient: 'from-violet-500/90 to-fuchsia-500/70',
  },
  {
    title: 'PDF Analyzer',
    slug: 'pdf-analyzer',
    description: 'Extract summaries, flashcards, and insights from notes.',
    icon: FileText,
    gradient: 'from-cyan-400/90 to-sky-500/70',
  },
  {
    title: 'Quiz Engine',
    slug: 'quiz-engine',
    description: 'Adaptive quizzes with personalized review guidance.',
    icon: Zap,
    gradient: 'from-emerald-400/90 to-teal-500/70',
  },
  {
    title: 'Mock Interview',
    slug: 'mock-interview',
    description: 'Simulate real interviews with AI coaching.',
    icon: ShieldCheck,
    gradient: 'from-orange-400/90 to-rose-500/70',
  },
];

export default function DashboardCards() {
  const navigate = useNavigate();

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {featureModules.map(({ title, slug, description, icon: Icon, gradient }) => (
        <motion.button
          key={title}
          type="button"
          onClick={() => navigate(`/${slug}`)}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25 }}
          className="group rounded-[28px] border border-white/10 bg-slate-900/70 p-5 text-left transition hover:border-white/20 hover:bg-slate-900/90 hover:shadow-lg hover:shadow-slate-950/40"
        >
          <div className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br ${gradient} text-white shadow-lg shadow-slate-950/25`}>
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
          <span className="mt-4 inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300 transition group-hover:bg-cyan-400/10">
            Launch module
          </span>
        </motion.button>
      ))}
    </div>
  );
}
