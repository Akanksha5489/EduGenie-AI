import React, { useEffect, useRef } from 'react';
import ChatMessageTutor from './ChatMessageTutor.jsx';

export default function AITutorChat({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6" aria-live="polite" role="log">
      <div className="mx-auto max-w-3xl space-y-4">
        {messages.length === 0 ? (
          <div className="rounded-2xl border border-white/6 bg-slate-900/60 p-8 text-center">
            <h3 className="text-lg font-semibold text-white">Welcome to AI Tutor</h3>
            <p className="mt-2 text-sm text-slate-400">Ask a question to get started — your AI study partner is ready.</p>
          </div>
        ) : (
          messages.map((m) => (
            <ChatMessageTutor key={m.id} role={m.role} text={m.text} />
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
