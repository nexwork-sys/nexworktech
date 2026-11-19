"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { api, card, inp, btnPrimary, Avatar, usePolling, timeAgo } from "./ui";

// Admin <-> employee chat. Admin har employee se alag thread mein baat karta hai.
export default function Chat({ user, initialWith = null }) {
  const isAdmin = user.role === "admin";
  const [threads, setThreads] = useState([]);
  const [active, setActive] = useState(initialWith); // admin ke liye selected employee id
  const [messages, setMessages] = useState([]);
  const [other, setOther] = useState(null);
  const [text, setText] = useState("");
  const [err, setErr] = useState("");
  const endRef = useRef(null);

  const loadThreads = () => (isAdmin ? api("/api/team/chat").then((d) => setThreads(d.threads)).catch(() => {}) : null);
  const loadMessages = () => {
    if (isAdmin && !active) return null;
    return api(`/api/team/chat${isAdmin ? `?with=${active}` : ""}`)
      .then((d) => { setMessages(d.messages); setOther(d.other); })
      .catch((e) => setErr(e.message));
  };
  usePolling(loadThreads, 8000, []);
  usePolling(loadMessages, 4000, [active]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages.length, active]);

  const send = async (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setText(""); setErr("");
    try {
      await api("/api/team/chat", "POST", { text: t, to: isAdmin ? active : undefined });
      loadMessages(); loadThreads();
    } catch (e2) { setErr(e2.message); setText(t); }
  };

  const activeUser = isAdmin ? threads.find((t) => t.user.id === active)?.user : other;

  const conversation = (
    <div className={`${card} flex flex-col h-[70vh] min-h-[420px] flex-1 min-w-0`}>
      <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
        {isAdmin && !active ? (
          <p className="text-xs text-slate-400">Select an employee to start chatting</p>
        ) : (
          <>
            <Avatar name={activeUser?.name || "?"} />
            <div>
              <p className="text-sm font-bold text-white">{activeUser?.name || (isAdmin ? "Employee" : "Admin")}</p>
              <p className="text-[10px] text-slate-500">{isAdmin ? activeUser?.designation || "Employee" : "Admin"}</p>
            </div>
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {(!isAdmin || active) && messages.length === 0 && (
          <p className="text-xs text-slate-500 text-center mt-10">No messages yet. Send the first message.</p>
        )}
        {messages.map((m) => {
          const mine = String(m.sender) === user.id;
          return (
            <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs whitespace-pre-line break-words ${mine ? "bg-cyan-400 text-slate-950 rounded-br-sm" : "bg-white/10 text-slate-100 rounded-bl-sm"}`}>
                {m.text}
                <span className={`block text-[9px] mt-1 ${mine ? "text-slate-700" : "text-slate-500"}`}>{timeAgo(m.createdAt)}</span>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {(!isAdmin || active) && (
        <form onSubmit={send} className="p-3 border-t border-white/10 flex gap-2">
          <input className={inp} placeholder={isAdmin ? "Write a task or message..." : "Write a message to admin..."} value={text} onChange={(e) => setText(e.target.value)} />
          <button className={btnPrimary} aria-label="Send"><Send className="w-4 h-4" /></button>
        </form>
      )}
      {err && <p className="px-4 pb-3 text-xs text-rose-400">{err}</p>}
    </div>
  );

  if (!isAdmin) return conversation;

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className={`${card} md:w-72 shrink-0 p-2 space-y-1 max-h-[70vh] overflow-y-auto`}>
        {threads.length === 0 && <p className="text-xs text-slate-500 p-3">Add an employee in the Employees tab first.</p>}
        {threads.map((t) => (
          <button key={t.user.id} onClick={() => { setActive(t.user.id); setMessages([]); }} className={`w-full text-left p-2.5 rounded-xl flex items-center gap-3 transition-all ${active === t.user.id ? "bg-cyan-400/15 border border-cyan-400/30" : "hover:bg-white/5 border border-transparent"}`}>
            <Avatar name={t.user.name} />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{t.user.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{t.last ? t.last.text : "No messages"}</p>
            </div>
            {t.unread > 0 && <span className="px-1.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-black">{t.unread}</span>}
          </button>
        ))}
      </div>
      {conversation}
    </div>
  );
}
