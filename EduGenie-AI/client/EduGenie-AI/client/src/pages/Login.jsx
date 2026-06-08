// Login.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE = 'http://localhost:5000/api';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/auth/login`, {
        email: email.trim(),
        password: password.trim(),
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setSuccess('Login successful! Redirecting to dashboard...');
      setEmail('');
      setPassword('');

      setTimeout(() => {
        navigate('/dashboard');
      }, 900);
    } catch (err) {
      setError(
        err?.response?.data?.message || 'Unable to login. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl md:p-12"
        >
          <div className="mb-10 flex flex-col gap-3 text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-cyan-500/15 px-4 py-2 text-sm text-cyan-200">
              Welcome back
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Log in to your account
            </h1>
            <p className="mx-auto max-w-xl text-sm text-slate-300 sm:text-base">
              Secure access to your dashboard, personalized learning, and AI-powered study tools.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="rounded-[28px] bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20"
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="rounded-3xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                    {success}
                  </div>
                )}

                <label className="block text-sm font-medium text-slate-300">
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-300">
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </label>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex items-center gap-3 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/20 bg-slate-800 text-cyan-400 focus:ring-cyan-400"
                    />
                    Remember me
                  </label>
                  <div className="text-sm text-slate-400">
                    New here?{' '}
                    <Link to="/signup" className="text-cyan-300 hover:text-cyan-100">
                      Create account
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-3xl bg-gradient-to-r from-cyan-400 to-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-slate-400">Or continue with</div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button className="inline-flex items-center justify-center gap-2 rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400/40">
                  <span>Google</span>
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400/40">
                  <span>GitHub</span>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="rounded-[28px] bg-gradient-to-br from-cyan-500/10 via-slate-900/40 to-slate-950/70 p-8 shadow-xl shadow-cyan-500/10"
            >
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold text-white">Why EduGenie?</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Fast, secure login for students and teachers with AI-powered learning analytics and smooth onboarding.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="rounded-3xl bg-slate-900/80 p-4">
                    <p className="text-sm font-medium text-cyan-300">Secure edge</p>
                    <p className="mt-2 text-sm text-slate-400">JWT powered authentication for protected routes.</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/80 p-4">
                    <p className="text-sm font-medium text-cyan-300">Responsive design</p>
                    <p className="mt-2 text-sm text-slate-400">Optimized for mobile, tablet and desktop devices.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;