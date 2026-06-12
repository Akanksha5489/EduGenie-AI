import React, { useState } from 'react';

export default function ChatHistory({ sessions, selectedId, onSelect, onNew, onRename, onDelete }) {
  const [query, setQuery] = useState('');
  const filtered = sessions.filter((s) => s.title?.toLowerCase().includes(query.toLowerCase()));

  return (
    <aside className="w-72 border-r border-white/6 bg-slate-950/95 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Chats</h3>
        <button
          onClick={onNew}
          className="ml-2 inline-flex items-center gap-2 rounded-md bg-cyan-400 px-2 py-1 text-xs font-medium text-slate-950 hover:bg-cyan-300"
        >
          New
        </button>
      </div>

      <div className="mb-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search chats"
          className="w-full rounded-md border border-white/6 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 outline-none"
        />
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-220px)]">
        {filtered.length === 0 && <div className="text-sm text-slate-400">No chats</div>}
        <ul className="space-y-2">
          {filtered.map((s) => (
            <li key={s._id} className={`flex items-center justify-between gap-2 rounded-md px-2 py-2 hover:bg-white/3 ${selectedId === s._id ? 'bg-white/6' : ''}`}>
              <button className="text-left flex-1" onClick={() => onSelect(s._id)}>
                <div className="text-sm font-medium text-white truncate">{s.title || 'Untitled'}</div>
                <div className="text-xs text-slate-400">{new Date(s.updatedAt).toLocaleString()}</div>
              </button>
              <div className="flex items-center gap-1">
                <button title="Rename" onClick={() => { const t = prompt('New title', s.title || ''); if (t !== null) onRename(s._id, t); }} className="text-xs text-slate-300 hover:text-white">✎</button>
                <button title="Delete" onClick={() => { if (confirm('Delete this chat?')) onDelete(s._id); }} className="text-xs text-rose-400 hover:text-rose-300">🗑</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
