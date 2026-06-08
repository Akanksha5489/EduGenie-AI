import { useState } from 'react';
import AITutorChat from '../components/AITutorChat.jsx';
import ChatInput from '../components/ChatInput.jsx';

export default function AITutor() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: "Hi! I'm your AI Tutor. What would you like to learn today?" },
  ]);

  const handleSend = (text) => {
    const userMsg = { id: Date.now() + Math.random(), role: 'user', text };
    setMessages((m) => [...m, userMsg]);

    // Local simulated AI response (placeholder)
    const botReply = {
      id: Date.now() + Math.random() + 1,
      role: 'bot',
      text: `Thanks — I heard: "${text}". This is a simulated response to demonstrate the chat UI.`,
    };

    // Add small delay to simulate thinking
    setTimeout(() => setMessages((m) => [...m, botReply]), 700);
  };

  return (
    <div className="flex h-full min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="border-b border-white/6 bg-slate-950/95 px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">AI Tutor</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">AI Tutor</h1>
          <p className="mt-1 text-sm text-slate-400">Ask questions and learn with AI</p>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="mx-auto flex h-full max-w-6xl flex-col">
          <AITutorChat messages={messages} />
          <ChatInput onSend={handleSend} />
        </div>
      </main>
    </div>
  );
}
