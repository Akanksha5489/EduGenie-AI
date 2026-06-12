import { useState, useEffect } from 'react';
import AITutorChat from '../components/AITutorChat.jsx';
import ChatInput from '../components/ChatInput.jsx';
import ChatHistory from '../components/ChatHistory.jsx';

export default function AITutor() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: "Hi! I'm your AI Tutor. What would you like to learn today?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    // Fetch sessions when component mounts
    if (!token) return;
    fetchSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function fetchSessions() {
    try {
      const res = await fetch('/api/chat', { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) return;
      const data = await res.json();
      setSessions(data);
    } catch (err) {
      console.error('Failed to fetch sessions', err);
    }
  }

  async function fetchSessionById(id) {
    try {
      const res = await fetch(`/api/chat/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) return;
      const session = await res.json();
      // Map backend messages to frontend message shape
      const mapped = session.messages.map((m, idx) => ({ id: `${session._id}-${idx}-${new Date(m.timestamp).getTime()}`, role: m.role === 'assistant' ? 'bot' : m.role, text: m.content }));
      if (mapped.length === 0) {
        setMessages([{ id: 1, role: 'bot', text: "Hi! I'm your AI Tutor. What would you like to learn today?" }]);
      } else {
        setMessages(mapped);
      }
      setCurrentSessionId(session._id);
    } catch (err) {
      console.error('Failed to fetch session', err);
    }
  }

  async function createSession(initialMessage) {
    try {
      const body = { title: 'New Chat', initialMessage };
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error('create session failed');
      const session = await res.json();
      await fetchSessions();
      setCurrentSessionId(session._id);
      // Map messages
      const mapped = session.messages.map((m, idx) => ({ id: `${session._id}-${idx}-${new Date(m.timestamp).getTime()}`, role: m.role === 'assistant' ? 'bot' : m.role, text: m.content }));
      if (mapped.length > 0) setMessages(mapped);
      return session;
    } catch (err) {
      console.error('createSession error', err);
      return null;
    }
  }

  async function addMessageToSession(sessionId, role, content) {
    try {
      const res = await fetch(`/api/chat/${sessionId}/messages`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ role, content }) });
      if (!res.ok) throw new Error('add message failed');
      const session = await res.json();
      // Update sessions list updatedAt
      setSessions((cur) => cur.map((s) => (s._id === session._id ? session : s)));
      return session;
    } catch (err) {
      console.error('addMessageToSession error', err);
      return null;
    }
  }

  async function renameSession(id, title) {
    try {
      const res = await fetch(`/api/chat/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ title }) });
      if (!res.ok) throw new Error('rename failed');
      const session = await res.json();
      setSessions((cur) => cur.map((s) => (s._id === session._id ? session : s)));
    } catch (err) {
      console.error('renameSession error', err);
    }
  }

  async function deleteSession(id) {
    try {
      const res = await fetch(`/api/chat/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('delete failed');
      setSessions((cur) => cur.filter((s) => s._id !== id));
      if (currentSessionId === id) {
        setCurrentSessionId(null);
        setMessages([{ id: 1, role: 'bot', text: "Hi! I'm your AI Tutor. What would you like to learn today?" }]);
      }
    } catch (err) {
      console.error('deleteSession error', err);
    }
  }

  const handleSend = async (text) => {
    if (isLoading) return;
    setIsLoading(true);

    // Ensure we have a session. If not, create one with initialMessage
    try {
      let sessionId = currentSessionId;

      if (!sessionId) {
        const created = await createSession(text);
        sessionId = created?._id || null;
        // set local user message and thinking placeholder
        const userMsg = { id: Date.now() + Math.random(), role: 'user', text };
        const thinkingId = Date.now() + Math.random() + 1;
        const thinkingMsg = { id: thinkingId, role: 'bot', text: 'AI Tutor is thinking...' };
        setMessages((current) => [...current.filter((m)=>m.role !== 'bot' || m.text !== "Hi! I'm your AI Tutor. What would you like to learn today?"), ...[userMsg, thinkingMsg]]);
      } else {
        // Post user message to existing session
        await addMessageToSession(sessionId, 'user', text);
        const userMsg = { id: Date.now() + Math.random(), role: 'user', text };
        const thinkingId = Date.now() + Math.random() + 1;
        const thinkingMsg = { id: thinkingId, role: 'bot', text: 'AI Tutor is thinking...' };
        setMessages((current) => [...current, userMsg, thinkingMsg]);
      }

      // Call AI Tutor (Groq) unchanged
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) throw new Error('API response error');
      const data = await response.json();
      const replyText = data?.reply?.trim();
      const thinkingId = null; // we update last bot message by replacing based on order

      if (!replyText) throw new Error('Invalid AI response');

      // Persist assistant reply to session
      if (sessionId) {
        await addMessageToSession(sessionId, 'assistant', replyText);
      }

      // Replace the last bot thinking message with actual reply
      setMessages((current) => {
        // find last bot message index
        const lastBotIndex = [...current].map((m) => m.role).lastIndexOf('bot');
        if (lastBotIndex === -1) return [...current, { id: Date.now()+Math.random(), role: 'bot', text: replyText }];
        const newMsgs = [...current];
        newMsgs[lastBotIndex] = { ...newMsgs[lastBotIndex], text: replyText };
        return newMsgs;
      });
    } catch (error) {
      console.error('Handle send error', error);
      // update last bot message with error
      setMessages((current) => {
        const lastBotIndex = [...current].map((m) => m.role).lastIndexOf('bot');
        if (lastBotIndex === -1) return [...current, { id: Date.now()+Math.random(), role: 'bot', text: "Sorry, I couldn't get a response right now. Please try again." }];
        const newMsgs = [...current];
        newMsgs[lastBotIndex] = { ...newMsgs[lastBotIndex], text: "Sorry, I couldn't get a response right now. Please try again." };
        return newMsgs;
      });
    } finally {
      setIsLoading(false);
      // refresh sessions list
      fetchSessions();
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
        <div className="mx-auto flex h-full max-w-6xl">
          <ChatHistory
            sessions={sessions}
            selectedId={currentSessionId}
            onSelect={(id) => fetchSessionById(id)}
            onNew={async () => { const s = await createSession(); if (s) fetchSessions(); }}
            onRename={renameSession}
            onDelete={deleteSession}
          />

          <div className="flex-1 flex flex-col">
            <AITutorChat messages={messages} />
            <ChatInput onSend={handleSend} disabled={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}
