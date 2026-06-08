// Signup.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE = 'http://localhost:5000/api';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    console.log('SIGNUP BUTTON CLICKED');
    console.log('API_BASE =', API_BASE);
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      console.log('Sending signup request');
      const response = await axios.post(`${API_BASE}/auth/signup`, {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      console.log('Signup response =', response.data);
      if (response.status === 201) {
        setSuccess('Signup successful! Redirecting to login...');
        setName('');
        setEmail('');
        setPassword('');
        setTimeout(() => {
          navigate('/login');
        }, 1200);
      }
    } catch (err) {
      console.log('Signup error =', err);
      setError(
        err?.response?.data?.message || 'Unable to create account. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-violet-500/10 backdrop-blur-xl md:p-12"
        >
          <div className="mb-10 flex flex-col gap-3 text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-violet-500/15 px-4 py-2 text-sm text-violet-200">
              Create your account
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Sign up for EduGenie
            </h1>
            <p className="mx-auto max-w-xl text-sm text-slate-300 sm:text-base">
              Start learning with personalized AI guidance, secure access, and modern student tools.
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
                  Full Name
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-300">
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-300">
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
                  />
                </label>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex items-center gap-3 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/20 bg-slate-800 text-violet-400 focus:ring-violet-400"
                    />
                    Remember me
                  </label>
                  <div className="text-sm text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-violet-300 hover:text-violet-100">
                      Log in
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-3xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-slate-400">Or sign up with</div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button className="inline-flex items-center justify-center gap-2 rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-sm text-slate-200 transition hover:border-violet-400/40">
                  <span>Google</span>
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-sm text-slate-200 transition hover:border-violet-400/40">
                  <span>GitHub</span>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="rounded-[28px] bg-gradient-to-br from-violet-500/10 via-slate-900/40 to-slate-950/70 p-8 shadow-xl shadow-violet-500/10"
            >
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-semibold text-white">Join the future</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Build your secure account and access AI-powered learning, progress tracking, and collaborative tools.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="rounded-3xl bg-slate-900/80 p-4">
                    <p className="text-sm font-medium text-violet-300">Fast onboarding</p>
                    <p className="mt-2 text-sm text-slate-400">Simple signup flow with instant access.</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/80 p-4">
                    <p className="text-sm font-medium text-violet-300">Glassmorphism style</p>
                    <p className="mt-2 text-sm text-slate-400">Clean, modern UI for a premium experience.</p>
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

export default Signup;