import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useOutletContext } from 'react-router-dom';

const resumeModules = [
  {
    title: 'Continue AI Tutor',
    label: 'Concept practice',
    description: 'Resume your guided explanation session and clarify the next difficult topic.',
    progress: 84,
    path: '/ai-tutor',
    accent: 'from-cyan-400 to-sky-500',
  },
  {
    title: 'Continue Quiz',
    label: 'Adaptive review',
    description: 'Pick up your quiz practice and close the gaps from your latest attempt.',
    progress: 62,
    path: '/quiz-engine',
    accent: 'from-emerald-400 to-teal-500',
  },
  {
    title: 'Continue PDF Analyzer',
    label: 'Notes workflow',
    description: 'Return to your document summary, flashcards, and extracted key points.',
    progress: 71,
    path: '/pdf-analyzer',
    accent: 'from-blue-400 to-indigo-500',
  },
  {
    title: 'Continue Mock Interview',
    label: 'Practice session',
    description: 'Continue interview drills with structured feedback and answer refinement.',
    progress: 48,
    path: '/mock-interview',
    accent: 'from-orange-400 to-rose-500',
  },
  {
    title: 'Continue Career Roadmap',
    label: 'Path planning',
    description: 'Review your milestone plan and choose the next learning checkpoint.',
    progress: 76,
    path: '/career-roadmap',
    accent: 'from-violet-400 to-fuchsia-500',
  },
];

const initialTasks = [
  { id: 'java-quiz', title: 'Complete Java Quiz', meta: 'Quiz Engine', complete: false },
  { id: 'dbms-notes', title: 'Review DBMS Notes', meta: 'PDF Analyzer', complete: false },
  { id: 'interview-practice', title: 'Practice Interview Questions', meta: 'Mock Interview', complete: false },
  { id: 'os-revision', title: 'Revise Operating Systems', meta: 'Notes Review', complete: true },
];

const learningStats = [
  { label: 'AI Chats', value: 3, note: 'Tutor sessions started' },
  { label: 'Quiz Attempts', value: 0, note: 'Ready when Quiz Engine launches' },
  { label: 'PDF Analyses', value: 0, note: 'Ready when PDF Analyzer launches' },
  { label: 'Mock Interviews', value: 0, note: 'Ready when practice begins' },
  { label: 'Roadmaps Generated', value: 0, note: 'Ready for career planning' },
];

export default function LearningHub() {
  const { onOpenSidebar } = useOutletContext();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(initialTasks);

  const completedTasks = tasks.filter((task) => task.complete).length;
  const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = savedUser?.name?.trim();

  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, complete: !task.complete } : task
      )
    );
  };

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/95 px-4 py-3 backdrop-blur-lg md:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenSidebar?.()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10 md:hidden"
              aria-label="Open navigation"
            >
              Menu
            </button>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">EduGenie</p>
              <h1 className="text-lg font-semibold text-white">Learning Hub</h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenSidebar?.()}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Open navigation"
          >
            Nav
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-5 md:px-6">
        <div className="mx-auto w-full max-w-7xl space-y-5">
          <section>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/80 p-6 shadow-2xl shadow-slate-950/40"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Learning Hub</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {userName ? `Welcome Back, ${userName} 👋` : 'Welcome Back 👋'}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
                Pick up your learning journey right where you left off.
              </p>
            </motion.div>
          </section>

          <section className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Resume learning</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Continue where you left off</h2>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {resumeModules.map((module) => (
                <motion.button
                  key={module.title}
                  type="button"
                  onClick={() => navigate(module.path)}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                  className="group flex min-h-[240px] flex-col justify-between rounded-[28px] border border-white/10 bg-slate-900/70 p-5 text-left transition hover:border-white/20 hover:bg-slate-900/90 hover:shadow-lg hover:shadow-slate-950/40"
                >
                  <div>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br ${module.accent} text-sm font-bold text-white shadow-lg shadow-slate-950/25`}>
                      {module.title.split(' ')[1]?.slice(0, 2) || 'LH'}
                    </div>
                    <p className="mt-4 text-xs uppercase tracking-[0.28em] text-slate-500">{module.label}</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{module.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{module.description}</p>
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <div className="mt-2 rounded-full bg-white/10 p-1">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${module.accent}`}
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Today's tasks</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Daily focus list</h3>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                  {completedTasks}/{tasks.length}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {tasks.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    className={`flex w-full items-center gap-3 rounded-3xl border p-4 text-left transition ${
                      task.complete
                        ? 'border-cyan-400/25 bg-cyan-400/10'
                        : 'border-white/10 bg-slate-950/65 hover:bg-slate-950/85'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                        task.complete
                          ? 'border-cyan-300 bg-cyan-400 text-slate-950'
                          : 'border-white/20 text-slate-500'
                      }`}
                    >
                      {task.complete ? 'OK' : ''}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-sm font-semibold ${task.complete ? 'text-cyan-100 line-through decoration-cyan-200/50' : 'text-white'}`}>
                        {task.title}
                      </span>
                      <span className="mt-1 block text-xs text-slate-400">{task.meta}</span>
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/65 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Task completion</p>
                <p className="mt-3 text-2xl font-semibold text-white">
                  {Math.round((completedTasks / tasks.length) * 100)}%
                </p>
                <div className="mt-4 rounded-full bg-white/10 p-1">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    style={{ width: `${(completedTasks / tasks.length) * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Learning stats</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Your activity overview</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Placeholder totals are ready for real learning data when each module is connected.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {learningStats.map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-white/10 bg-slate-950/65 p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{stat.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-2 text-sm leading-5 text-slate-400">{stat.note}</p>
                  </div>
                ))}
                <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5 sm:col-span-2">
                  <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Next step</p>
                  <p className="mt-3 text-sm leading-6 text-slate-200">
                    Continue with one study tool today to build useful progress data over time.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </main>
  );
}
