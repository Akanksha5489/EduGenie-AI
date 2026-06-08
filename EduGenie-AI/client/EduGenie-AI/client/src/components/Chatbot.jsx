import React, { useState, useRef, useEffect } from "react";
import "../chatbot.css";
import ChatWindow from "./ChatWindow";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { id: 1, role: "bot", text: "Hi, I'm EduGenie — how can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    // Lightweight mocked bot reply for UI demo
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          role: "bot",
          text: "Thanks — I can help with study plans, summaries, and question practice.",
        },
      ]);
    }, 700);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chatbot-shell">
      <div className="chatbot-panel">
        <div className="chatbot-header">
          <div className="avatar">EG</div>
          <div className="meta">
            <div className="title">EduGenie</div>
            <div className="subtitle">Your study assistant</div>
          </div>
        </div>

        <ChatWindow messages={messages} bottomRef={bottomRef} />

        <div className="chatbot-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask EduGenie something..."
            aria-label="Message input"
          />
          <button onClick={sendMessage} className="send-btn" aria-label="Send">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
