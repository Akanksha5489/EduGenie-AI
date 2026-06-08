import React from "react";

export default function Message({ role, text }) {
  return (
    <div className={`message ${role === "user" ? "user" : "bot"}`}>
      {role === "bot" && <div className="bot-chip">EduGenie</div>}
      <div className="bubble">{text}</div>
    </div>
  );
}
