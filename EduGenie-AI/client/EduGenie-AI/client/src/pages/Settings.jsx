import { useState } from 'react';

const studentProfile = {
  name: 'Student Learner',
  email: 'student@example.com',
  initials: 'SL',
};

const accountInfo = [
  { label: 'Member Since', value: 'May 2026' },
  { label: 'Current Plan', value: 'Growth Plan' },
  { label: 'Last Login', value: 'Today' },
];

const colorOptions = ['Blue', 'Purple', 'Green'];
const responseOptions = ['Short', 'Medium', 'Detailed'];
const levelOptions = ['Beginner', 'Intermediate', 'Advanced'];

export default function Settings() {
  const [theme, setTheme] = useState('Dark Mode');
  const [themeColor, setThemeColor] = useState('Blue');
  const [responseLength, setResponseLength] = useState('Medium');
  const [learningLevel, setLearningLevel] = useState('Intermediate');
  const [notifications, setNotifications] = useState({
    email: true,
    study: true,
    interview: false,
  });

  const toggleNotification = (key) => {
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-6 md:px-6">
        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/80 p-6 shadow-2xl shadow-slate-950/40">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Settings</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Student Settings</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
            Manage your learning preferences, account details, and study notifications.
          </p>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Profile settings</p>
            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 text-2xl font-semibold text-slate-950 shadow-lg shadow-cyan-500/20">
                {studentProfile.initials}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">{studentProfile.name}</h2>
                <p className="mt-2 text-sm text-slate-400">{studentProfile.email}</p>
                <span className="mt-4 inline-flex rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">
                  Student profile
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Account information</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {accountInfo.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-950/65 p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{item.label}</p>
                  <p className="mt-3 text-lg font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Password settings</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Password actions</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">These controls are UI placeholders for future account security flows.</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="button" className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                Change Password
              </button>
              <button type="button" className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Reset Password
              </button>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Security settings</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button type="button" className="rounded-3xl border border-white/10 bg-slate-950/65 p-5 text-left transition hover:bg-slate-950/85">
                <p className="text-sm font-semibold text-white">Logout All Devices</p>
                <p className="mt-2 text-xs leading-5 text-slate-400">End active sessions across your devices.</p>
              </button>
              <button type="button" className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-5 text-left transition hover:bg-rose-400/15">
                <p className="text-sm font-semibold text-rose-100">Delete Account</p>
                <p className="mt-2 text-xs leading-5 text-rose-100/70">Permanent account removal placeholder.</p>
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_1fr_0.9fr]">
          <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Appearance</p>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm font-semibold text-white">Theme Options</p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {['Dark Mode', 'Light Mode'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setTheme(option)}
                      className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                        theme === option
                          ? 'border-cyan-400/40 bg-cyan-400/15 text-cyan-100'
                          : 'border-white/10 bg-slate-950/65 text-slate-300 hover:bg-slate-950/85'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">Theme Colors</p>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {colorOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setThemeColor(option)}
                      className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                        themeColor === option
                          ? 'border-cyan-400/40 bg-cyan-400/15 text-cyan-100'
                          : 'border-white/10 bg-slate-950/65 text-slate-300 hover:bg-slate-950/85'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">AI preferences</p>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm font-semibold text-white">Response Length</p>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {responseOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setResponseLength(option)}
                      className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition ${
                        responseLength === option
                          ? 'border-cyan-400/40 bg-cyan-400/15 text-cyan-100'
                          : 'border-white/10 bg-slate-950/65 text-slate-300 hover:bg-slate-950/85'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">Learning Level</p>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {levelOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setLearningLevel(option)}
                      className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition ${
                        learningLevel === option
                          ? 'border-cyan-400/40 bg-cyan-400/15 text-cyan-100'
                          : 'border-white/10 bg-slate-950/65 text-slate-300 hover:bg-slate-950/85'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Notifications</p>
            <div className="mt-6 space-y-3">
              {[
                { key: 'email', label: 'Email Notifications' },
                { key: 'study', label: 'Study Reminders' },
                { key: 'interview', label: 'Interview Reminders' },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => toggleNotification(item.key)}
                  className="flex w-full items-center justify-between gap-4 rounded-3xl border border-white/10 bg-slate-950/65 p-4 text-left transition hover:bg-slate-950/85"
                >
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                  <span className={`flex h-7 w-12 items-center rounded-full p-1 transition ${notifications[item.key] ? 'bg-cyan-400' : 'bg-white/10'}`}>
                    <span className={`h-5 w-5 rounded-full bg-white transition ${notifications[item.key] ? 'translate-x-5' : 'translate-x-0'}`} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
