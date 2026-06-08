
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import DashboardCards from '../components/DashboardCards.jsx';

const recentActivity = [
  {
    title: 'AI Tutor session completed',
    subtitle: 'Personalized feedback and next steps unlocked.',
    status: 'Done',
    time: '2h ago',
  },
  {
    title: 'Quiz completed',
    subtitle: 'Scored 89% on the Data Structures quiz.',
    status: 'Win',
    time: 'Yesterday',
  },
  {
    title: 'PDF analysis complete',
    subtitle: 'Lecture notes summarized into flashcards.',
    status: 'Saved',
    time: '2 days ago',
  },
  {
    title: 'Mock interview set up',
    subtitle: 'Interview plan is ready for review.',
    status: 'Ready',
    time: '3 days ago',
  },
];

const learningStreak = {
  current: 14,
  best: 27,
  message: 'You are doing great — keep the streak alive with one more study session today.',
};

const weeklyGoal = {
  completedHours: 8,
  targetHours: 10,
  percent: 80,
  label: 'Study hours completed',
};

const courseProgress = [
  { course: 'AI Tutor Course', percent: 92 },
  { course: 'Prompt Engineering', percent: 75 },
  { course: 'Data Structures', percent: 60 },
  { course: 'Interview Preparation', percent: 48 },
];

const weeklyStudyHours = [
  { day: 'Mon', hours: 1.5 },
  { day: 'Tue', hours: 2.2 },
  { day: 'Wed', hours: 2.8 },
  { day: 'Thu', hours: 3.4 },
  { day: 'Fri', hours: 4.1 },
  { day: 'Sat', hours: 1.8 },
  { day: 'Sun', hours: 0.9 },
];

const moduleInfo = {
  'ai-tutor': {
    label: 'AI Tutor',
    title: 'Practice with AI',
    status: 'Recommended',
    description: 'Launch one-on-one guided sessions for fast concept mastery and instant feedback.',
    action: 'Next step: practice your current lesson',
    ctaText: 'Open the tutor and continue your streak',
  },
  'pdf-analyzer': {
    label: 'PDF Analyzer',
    title: 'Study smarter',
    status: 'Insightful',
    description: 'Summarize notes, extract flashcards, and review key concepts instantly.',
    action: 'Next step: analyze your latest lecture notes',
    ctaText: 'Open the PDF helper',
  },
  'quiz-engine': {
    label: 'Quiz Engine',
    title: 'Sharpen your skills',
    status: 'Ready',
    description: 'Take adaptive quizzes designed to close learning gaps and prepare you for interviews.',
    action: 'Next step: complete your scheduled quiz',
    ctaText: 'Launch the quiz engine',
  },
  'mock-interview': {
    label: 'Mock Interview',
    title: 'Interview readiness',
    status: 'Prepared',
    description: 'Simulate interviews, get scoring feedback, and improve your response flow.',
    action: 'Next step: start a new mock interview',
    ctaText: 'Open mock interview',
  },
};

const weeklyChartBars = [28, 34, 42, 36, 48, 40, 30];

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeModule = new URLSearchParams(location.search).get('module') || 'ai-tutor';
  const selectedModule = moduleInfo[activeModule] || moduleInfo['ai-tutor'];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [firstName, setFirstName] = useState('Learner');

  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      const name = savedUser?.name || savedUser?.email || '';
      const cleanName = name.split(' ')[0] || name.split('@')[0] || 'Learner';
      setFirstName(cleanName);
    } catch (error) {
      setFirstName('Learner');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex h-screen">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/95 px-4 py-3 backdrop-blur-lg md:px-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10 md:hidden"
                  aria-label="Open navigation"
                >
                  ☰
                </button>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">EduGenie</p>
                  <h1 className="text-lg font-semibold text-white">AI Learning Hub</h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" />
                  <input
                    type="search"
                    placeholder="Search courses, quizzes..."
                    className="w-52 rounded-2xl border border-white/10 bg-slate-900/60 py-2 pl-10 pr-3 text-xs text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-cyan-400/30 focus:ring-1 focus:ring-cyan-400/20"
                  />
                </div>

                <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400" />
                </button>

                <button className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-semibold text-slate-950 transition hover:shadow-lg hover:shadow-cyan-500/30">
                  {firstName.charAt(0).toUpperCase()}
                </button>

                <button className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6">
            <div className="mx-auto w-full max-w-7xl space-y-5">
              <section className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/80 p-6 shadow-2xl shadow-slate-950/40"
                >
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-400">
                    AI-powered learning
                  </span>
                  <div className="mt-5 space-y-4">
                    <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Good Afternoon, {firstName} 👋</h2>
                    <p className="max-w-2xl text-sm leading-6 text-slate-400">
                      Continue your AI learning journey with tailored study plans, live feedback, and smart practice modules built for ambitious students.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Learning streak</p>
                      <p className="mt-3 text-2xl font-semibold text-white">14 days</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Weekly progress</p>
                      <p className="mt-3 text-2xl font-semibold text-white">76%</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Active goal</p>
                      <p className="mt-3 text-2xl font-semibold text-white">Interview prep</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button className="inline-flex min-w-[170px] items-center justify-center rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                      Continue Learning
                    </button>
                    <button className="inline-flex min-w-[170px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                      Open AI Tutor
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                  className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{selectedModule.label}</p>
                      <h3 className="mt-3 text-xl font-semibold text-white">{selectedModule.title}</h3>
                    </div>
                    <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">{selectedModule.status}</span>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-slate-400">
                    {selectedModule.description}
                  </p>

                  <div className="mt-7 space-y-4 rounded-3xl border border-white/10 bg-slate-950/60 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-slate-400">{selectedModule.action}</p>
                      <p className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">High priority</p>
                    </div>
                    <p className="text-sm font-semibold text-white">{selectedModule.ctaText}</p>
                  </div>
                </motion.div>
              </section>

              <section className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Product modules</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">Your learning tools</h2>
                  </div>
                  <p className="text-xs text-slate-500">Launch the AI products that support your study routine.</p>
                </div>
                <DashboardCards />
              </section>

              <section className="grid gap-4 lg:grid-cols-[1.3fr_0.95fr]">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 }}
                  className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Learning summary</p>
                      <h3 className="mt-2 text-xl font-semibold text-white">Student progress</h3>
                    </div>
                    <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">Focused</span>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-slate-950/65 p-5">
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Learning streak</p>
                      <div className="mt-4 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-3xl font-semibold text-white">{learningStreak.current} Days</p>
                          <p className="mt-1 text-sm text-slate-400">Current streak</p>
                        </div>
                        <div className="rounded-3xl bg-slate-900/80 px-4 py-2 text-sm text-slate-300">
                          Best streak
                          <p className="mt-2 text-xl font-semibold text-white">{learningStreak.best} Days</p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-400">{learningStreak.message}</p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-slate-950/65 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Weekly goal progress</p>
                          <p className="mt-3 text-2xl font-semibold text-white">
                            {weeklyGoal.completedHours} of {weeklyGoal.targetHours} hrs
                          </p>
                        </div>
                        <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">
                          {weeklyGoal.percent}%
                        </span>
                      </div>
                      <div className="mt-5 rounded-full bg-white/10 p-1">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                          style={{ width: `${weeklyGoal.percent}%` }}
                        />
                      </div>
                      <p className="mt-4 text-sm text-slate-400">Stay on track by adding 2 more hours before the weekend.</p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-slate-950/65 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Course completion</p>
                        <h4 className="mt-2 text-lg font-semibold text-white">Progress by course</h4>
                      </div>
                      <span className="text-xs text-slate-400">4 active courses</span>
                    </div>

                    <div className="mt-5 space-y-4">
                      {courseProgress.map((item) => (
                        <div key={item.course}>
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm text-slate-200">{item.course}</p>
                            <p className="text-sm font-semibold text-white">{item.percent}%</p>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-cyan-400"
                              style={{ width: `${item.percent}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-slate-950/65 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Weekly study hours</p>
                        <h4 className="mt-2 text-lg font-semibold text-white">Hours studied per day</h4>
                      </div>
                      <span className="text-xs text-slate-400">Total: 16.7 hrs</span>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-7">
                      {weeklyStudyHours.map((item) => {
                        const height = `${Math.max(10, item.hours * 20)}px`;
                        return (
                          <div key={item.day} className="flex flex-col items-center gap-2 text-center">
                            <div className="flex h-[110px] w-full items-end">
                              <div className="mx-auto w-3 rounded-full bg-cyan-400" style={{ height }} />
                            </div>
                            <p className="text-sm font-semibold text-white">{item.hours}</p>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{item.day}</span>
                          </div>
                        );
                      })}
                    </div>
                    <p className="mt-4 text-xs text-slate-400">Study time is rising across the week — great consistency.</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Activity</p>
                      <h3 className="mt-2 text-xl font-semibold text-white">Recent timeline</h3>
                    </div>
                    <button className="rounded-2xl border border-white/10 px-3 py-2 text-xs text-slate-300 transition hover:bg-white/5 hover:text-white">
                      View all
                    </button>
                  </div>

                  <div className="relative mt-6 space-y-4 pl-4">
                    <div className="absolute left-2 top-2 bottom-0 w-px bg-white/10" />
                    {recentActivity.map((item) => (
                      <div key={item.title} className="relative">
                        <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-cyan-400 ring-4 ring-slate-950" />
                        <div className="rounded-3xl border border-white/10 bg-slate-950/65 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-white">{item.title}</p>
                              <p className="mt-2 text-xs text-slate-400">{item.subtitle}</p>
                            </div>
                            <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-slate-300">{item.time}</span>
                          </div>
                          <div className="mt-3 inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cyan-200">
                            {item.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
