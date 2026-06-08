import React, { useState } from 'react';

export default function ChatInput({ onSend }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-white/6 bg-slate-900/50 px-4 py-4 sm:px-6">
      <div className="mx-auto max-w-3xl flex items-center gap-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question, e.g. 'Explain backpropagation in simple terms'"
          className="resize-none h-12 flex-1 rounded-xl bg-slate-800/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-cyan-400/30"
        />
        <button
          onClick={handleSend}
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}
