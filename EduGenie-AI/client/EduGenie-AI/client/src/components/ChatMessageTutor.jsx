import React from 'react';
import { motion } from 'framer-motion';

export default function ChatMessageTutor({ role, text }) {
  const isUser = role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[78%] flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
        {!isUser && (
          <div className="inline-flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400 text-slate-950 font-semibold">EG</span>
            <span className="text-xs font-semibold text-slate-400">EduGenie</span>
          </div>
        )}

        <div
          className={`mt-1 rounded-2xl px-4 py-3 text-sm leading-6 ${
            isUser ? 'bg-gradient-to-br from-slate-800/80 to-slate-800/60 text-white' : 'bg-gradient-to-br from-cyan-400/10 via-cyan-400/6 to-white/2 text-slate-100'
          } shadow-md`}
        >
          <div className="whitespace-pre-wrap">{text}</div>
        </div>
      </div>
    </motion.div>
  );
}
