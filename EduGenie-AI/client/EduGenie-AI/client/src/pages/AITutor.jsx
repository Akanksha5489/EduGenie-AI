import { useState } from 'react';
import AITutorChat from '../components/AITutorChat.jsx';
import ChatInput from '../components/ChatInput.jsx';

export default function AITutor() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: "Hi! I'm your AI Tutor. What would you like to learn today?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text) => {
    if (isLoading) return;

    const userMsg = { id: Date.now() + Math.random(), role: 'user', text };
    const thinkingId = Date.now() + Math.random() + 1;
    const thinkingMsg = { id: thinkingId, role: 'bot', text: 'AI Tutor is thinking...' };

    setMessages((current) => [...current, userMsg, thinkingMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error('API response error');
      }

      const data = await response.json();
      const replyText = data?.reply?.trim();

      if (!replyText) {
        throw new Error('Invalid AI response');
      }

      setMessages((current) =>
        current.map((msg) =>
          msg.id === thinkingId ? { ...msg, text: replyText } : msg
        )
      );
    } catch (error) {
      setMessages((current) =>
        current.map((msg) =>
          msg.id === thinkingId
            ? {
                ...msg,
                text: "Sorry, I couldn't get a response right now. Please try again.",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
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
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </main>
    </div>
  );
}
