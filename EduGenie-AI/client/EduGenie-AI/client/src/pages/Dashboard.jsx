
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from 'recharts';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: 'Hi! I can help you find courses or answer questions.' },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const analyticsData = [
    { name: 'Mon', users: 120, completions: 24 },
    { name: 'Tue', users: 210, completions: 36 },
    { name: 'Wed', users: 150, completions: 30 },
    { name: 'Thu', users: 280, completions: 68 },
    { name: 'Fri', users: 220, completions: 54 },
    { name: 'Sat', users: 190, completions: 40 },
    { name: 'Sun', users: 240, completions: 50 },
  ];

  const stats = {
    totalUsers: 12450,
    activeLearners: 842,
    courses: 128,
    revenue: '$18.2k',
  };

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), from: 'user', text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    // simple simulated bot reply
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, from: 'bot', text: `AI: I received "${userMsg.text}". Try asking about courses or progress.` },
      ]);
    }, 800);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-slate-100">
      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -250 }}
          animate={{ x: sidebarOpen ? 0 : -250 }}
          transition={{ type: 'tween' }}
          className={`fixed z-30 top-0 left-0 h-full w-64 md:static md:translate-x-0 transform bg-white/5 backdrop-blur-lg border-r border-white/6 shadow-xl md:shadow-none`}
          style={{ boxShadow: '0 10px 30px rgba(2,6,23,0.6)' }}
        >
          <div className="flex h-full flex-col px-5 py-6">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center font-bold text-slate-900">
                  EG
                </div>
                <div>
                  <div className="text-lg font-semibold">EduGenie</div>
                  <div className="text-xs text-slate-400">AI Learning Suite</div>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden rounded-md bg-white/3 p-2 text-slate-200 hover:bg-white/6"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1">
              <a className="rounded-lg px-3 py-2 text-sm hover:bg-white/6">Dashboard</a>
              <a className="rounded-lg px-3 py-2 text-sm hover:bg-white/6">Courses</a>
              <a className="rounded-lg px-3 py-2 text-sm hover:bg-white/6">Reports</a>
              <a className="rounded-lg px-3 py-2 text-sm hover:bg-white/6">Students</a>
              <a className="rounded-lg px-3 py-2 text-sm hover:bg-white/6">Settings</a>
              <div className="mt-auto pt-4">
                <button className="w-full rounded-lg bg-gradient-to-r from-cyan-400 to-sky-500 px-3 py-2 text-sm font-semibold text-slate-900">
                  New Course
                </button>
              </div>
            </nav>
          </div>
        </motion.aside>

        {/* Main area */}
        <div className="flex flex-1 flex-col md:ml-64">
          {/* Top navbar */}
          <header className="sticky top-0 z-20 bg-white/4 backdrop-blur-md border-b border-white/6">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden rounded-md bg-white/3 p-2 text-slate-200 hover:bg-white/6"
                  aria-label="Open menu"
                >
                  ☰
                </button>
                <div className="text-xl font-semibold">Dashboard</div>
                <div className="hidden items-center gap-4 rounded-full bg-white/3 px-3 py-2 text-sm text-slate-300 md:flex">
                  <svg className="h-4 w-4 text-slate-300" fill="currentColor" viewBox="0 0 20 20"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 14a6 6 0 1112 0H2z" /></svg>
                  <span className="text-xs text-slate-400">Welcome back</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden md:block">
                  <input
                    type="search"
                    placeholder="Search courses, users..."
                    className="w-64 rounded-3xl border border-white/6 bg-white/2 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <button className="rounded-full bg-white/5 px-3 py-2 text-sm text-slate-200">Docs</button>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center font-medium text-slate-900">A</div>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="mx-auto w-full max-w-7xl px-4 py-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              <div className="rounded-2xl bg-white/5 p-5 backdrop-blur-sm border border-white/6">
                <div className="text-sm text-slate-400">Total users</div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-semibold">{stats.totalUsers.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">All time</div>
                  </div>
                  <div className="rounded-full bg-slate-900/60 px-3 py-2 text-sm font-medium text-cyan-300">+6% </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-5 backdrop-blur-sm border border-white/6">
                <div className="text-sm text-slate-400">Active learners</div>
                <div className="mt-3">
                  <div className="text-2xl font-semibold">{stats.activeLearners}</div>
                  <div className="text-xs text-slate-400">Last 24 hrs</div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-5 backdrop-blur-sm border border-white/6">
                <div className="text-sm text-slate-400">Courses</div>
                <div className="mt-3">
                  <div className="text-2xl font-semibold">{stats.courses}</div>
                  <div className="text-xs text-slate-400">Available</div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-5 backdrop-blur-sm border border-white/6">
                <div className="text-sm text-slate-400">Revenue</div>
                <div className="mt-3">
                  <div className="text-2xl font-semibold">{stats.revenue}</div>
                  <div className="text-xs text-slate-400">This month</div>
                </div>
              </div>
            </motion.div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3 lg:items-start">
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/6"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Learners activity</h3>
                    <div className="text-sm text-slate-400">Weekly overview</div>
                  </div>

                  <div style={{ width: '100%', height: 240 }}>
                    <ResponsiveContainer>
                      <LineChart data={analyticsData}>
                        <CartesianGrid stroke="rgba(255,255,255,0.03)" />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                        <YAxis stroke="rgba(255,255,255,0.6)" />
                        <Tooltip contentStyle={{ background: '#0b1220', border: 'none' }} />
                        <Legend wrapperStyle={{ color: '#cbd5e1' }} />
                        <Line type="monotone" dataKey="users" stroke="#06b6d4" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="completions" stroke="#7c3aed" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 }}
                  className="mt-6 rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/6"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Course completions</h3>
                    <div className="text-sm text-slate-400">Last 7 days</div>
                  </div>

                  <div style={{ width: '100%', height: 200 }}>
                    <ResponsiveContainer>
                      <BarChart data={analyticsData}>
                        <CartesianGrid stroke="rgba(255,255,255,0.03)" />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                        <YAxis stroke="rgba(255,255,255,0.6)" />
                        <Tooltip contentStyle={{ background: '#0b1220', border: 'none' }} />
                        <Bar dataKey="completions" fill="#a78bfa" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              {/* AI Chatbot & Progress */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-white/5 p-4 backdrop-blur-sm border border-white/6"
                >
                  <div className="mb-3 flex items-center justify-between px-2">
                    <h4 className="text-sm font-semibold">AI Assistant</h4>
                    <div className="text-xs text-slate-400">beta</div>
                  </div>

                  <div className="flex h-64 flex-col gap-3 overflow-hidden rounded-lg bg-slate-900/40 p-3">
                    <div className="flex-1 overflow-auto px-2">
                      {messages.map((m) => (
                        <div key={m.id} className={`mb-3 flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${m.from === 'bot' ? 'bg-white/6' : 'bg-cyan-500/20 text-cyan-200'}`}>
                            {m.text}
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>

                    <form onSubmit={handleSend} className="mt-2 flex items-center gap-2">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask EduGenie..."
                        className="flex-1 rounded-3xl border border-white/6 bg-transparent px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-400/30"
                      />
                      <button type="submit" className="rounded-3xl bg-gradient-to-r from-cyan-400 to-sky-500 px-4 py-2 text-sm font-semibold text-slate-900">
                        Send
                      </button>
                    </form>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 }}
                  className="rounded-2xl bg-white/5 p-4 backdrop-blur-sm border border-white/6"
                >
                  <div className="mb-3 flex items-center justify-between px-2">
                    <h4 className="text-sm font-semibold">Learning Progress</h4>
                    <div className="text-xs text-slate-400">Overview</div>
                  </div>
                  <div className="space-y-3 px-2">
                    <div>
                      <div className="text-xs text-slate-400">Course completion</div>
                      <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/6">
                        <div className="h-full w-3/5 bg-gradient-to-r from-cyan-400 to-sky-500" />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                        <span>60% complete</span>
                        <span>4/10 modules</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-400">Weekly goal</div>
                      <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/6">
                        <div className="h-full w-2/5 bg-gradient-to-r from-violet-400 to-fuchsia-500" />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                        <span>40% done</span>
                        <span>2/5 tasks</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
