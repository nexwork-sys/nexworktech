"use client";

import React from "react";
import { X } from "lucide-react";

export async function api(url, method = "GET", body) {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || "Kuch galat ho gaya"), { status: res.status });
  return data;
}

export const inp =
  "w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:border-cyan-400 outline-none";
export const sel = "px-3 py-2 rounded-xl bg-[#11182f] border border-white/10 text-xs text-white outline-none focus:border-cyan-400";
const btn = "px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 inline-flex items-center justify-center gap-1.5";
export const btnPrimary = `${btn} bg-cyan-400 text-slate-950 hover:bg-cyan-300`;
export const btnGhost = `${btn} bg-white/10 text-slate-200 hover:bg-white/15`;
export const btnDanger = `${btn} bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20`;
export const card = "rounded-2xl bg-white/[0.03] border border-white/10";

export const STATUS = {
  todo: { label: "To Do", cls: "bg-slate-500/15 text-slate-300 border-slate-400/20" },
  in_progress: { label: "In Progress", cls: "bg-cyan-500/15 text-cyan-300 border-cyan-400/25" },
  review: { label: "In Review", cls: "bg-amber-500/15 text-amber-300 border-amber-400/25" },
  done: { label: "Done", cls: "bg-emerald-500/15 text-emerald-300 border-emerald-400/25" },
};
export const PRIORITY = {
  low: "text-slate-400",
  medium: "text-amber-300",
  high: "text-rose-400",
};

export function timeAgo(d) {
  if (!d) return "—";
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return "abhi";
  if (s < 3600) return `${Math.floor(s / 60)} min pehle`;
  if (s < 86400) return `${Math.floor(s / 3600)} ghante pehle`;
  if (s < 86400 * 30) return `${Math.floor(s / 86400)} din pehle`;
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

export const dateInput = (d) => (d ? new Date(d).toISOString().slice(0, 10) : "");

export function Badge({ children, className = "" }) {
  return <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-semibold ${className}`}>{children}</span>;
}

export function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.todo;
  return <Badge className={s.cls}>{s.label}</Badge>;
}

export function Avatar({ name = "?", size = 8 }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <span
      title={name}
      style={{ width: size * 4, height: size * 4 }}
      className="inline-flex items-center justify-center rounded-full bg-cyan-500/15 border border-cyan-400/25 text-cyan-300 text-[10px] font-bold shrink-0"
    >
      {initials}
    </span>
  );
}

export function Progress({ value = 0 }) {
  return (
    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
      <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}

export function Modal({ title, onClose, children, wide = false }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-[#0b1021] border border-white/15 rounded-3xl w-full ${wide ? "max-w-2xl" : "max-w-lg"} max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl`}
      >
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400">
          <X className="w-4 h-4" />
        </button>
        <h3 className="text-lg font-bold text-white mb-4 pr-10">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export const Err = ({ children }) => (children ? <p className="text-xs text-rose-400">{children}</p> : null);
export const Ok = ({ children }) => (children ? <p className="text-xs text-emerald-400">{children}</p> : null);
export const Label = ({ children }) => <label className="block text-[11px] text-slate-400 mb-1">{children}</label>;

// Auto-refresh helper: data load + har `ms` par dobara
export function usePolling(fn, ms, deps = []) {
  const ref = React.useRef(fn);
  React.useEffect(() => {
    ref.current = fn;
  });
  React.useEffect(() => {
    ref.current();
    if (!ms) return;
    const t = setInterval(() => ref.current(), ms);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
