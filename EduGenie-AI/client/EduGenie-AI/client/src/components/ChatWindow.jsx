import React from "react";
import Message from "./Message";

export default function ChatWindow({ messages, bottomRef }) {
  return (
    <div className="chat-window" role="log" aria-live="polite">
      {messages.map((m) => (
        <Message key={m.id} role={m.role} text={m.text} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
