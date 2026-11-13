"use client";

import React, { useState } from "react";
import { api, card, sel, usePolling, StatusBadge, fmtDate, PRIORITY, STATUS } from "./ui";

export default function MyWork({ openProject }) {
  const [tasks, setTasks] = useState(null);
  const load = () => api("/api/team/my").then((d) => setTasks(d.tasks)).catch(() => setTasks([]));
  usePolling(load, 30000);

  const setStatus = async (id, status) => {
    try {
      await api(`/api/team/tasks/${id}`, "PATCH", { status });
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  if (!tasks) return <p className="text-sm text-slate-400">Loading...</p>;
  if (!tasks.length) return <p className="text-sm text-slate-400 py-10 text-center">Abhi aapko koi task assign nahi hua hai.</p>;

  return (
    <div className="space-y-3">
      {tasks.map((t) => (
        <div key={t.id} className={`${card} p-4 flex flex-wrap items-center justify-between gap-4 ${t.status === "done" ? "opacity-60" : ""}`}>
          <div className="min-w-[200px] flex-1">
            <p className="text-sm font-bold text-white">{t.title}</p>
            {t.description && <p className="text-xs text-slate-400 mt-1">{t.description}</p>}
            <p className="text-[11px] text-slate-500 mt-2">
              {t.project && <button onClick={() => openProject(t.project.id)} className="text-cyan-400 hover:underline">{t.project.name}</button>}
              {" · "}<span className={PRIORITY[t.priority]}>{t.priority} priority</span>
              {t.dueDate && <> · Due {fmtDate(t.dueDate)}</>}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={t.status} />
            <select className={sel} value={t.status} onChange={(e) => setStatus(t.id, e.target.value)}>
              {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
