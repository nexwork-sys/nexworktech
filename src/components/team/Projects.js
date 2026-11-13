"use client";

import React, { useState } from "react";
import { Plus, Calendar, GitCommitHorizontal } from "lucide-react";
import { api, card, btnPrimary, usePolling, Avatar, Progress, Badge, fmtDate } from "./ui";
import ProjectForm from "./ProjectForm";

const STATUS_CLS = {
  active: "bg-emerald-500/15 text-emerald-300 border-emerald-400/25",
  paused: "bg-amber-500/15 text-amber-300 border-amber-400/25",
  completed: "bg-slate-500/15 text-slate-300 border-slate-400/25",
};

export default function Projects({ user, openProject }) {
  const [projects, setProjects] = useState(null);
  const [users, setUsers] = useState([]);
  const [creating, setCreating] = useState(false);
  const isAdmin = user.role === "admin";

  const load = () => api("/api/team/projects").then((d) => setProjects(d.projects)).catch(() => setProjects([]));
  usePolling(load, 30000);
  usePolling(() => (isAdmin ? api("/api/team/users").then((d) => setUsers(d.users)).catch(() => {}) : null), 0);

  return (
    <div className="space-y-5">
      {isAdmin && (
        <button onClick={() => setCreating(true)} className={btnPrimary}><Plus className="w-4 h-4" /> New Project</button>
      )}

      {!projects ? (
        <p className="text-sm text-slate-400">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-sm text-slate-400 py-10 text-center">
          {isAdmin ? "Abhi koi project nahi. \"New Project\" se shuru karein." : "Aapko abhi koi project assign nahi hua hai."}
        </p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((p) => (
            <button key={p.id} onClick={() => openProject(p.id)} className={`${card} p-5 text-left hover:border-cyan-400/40 transition-all space-y-4`}>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-white">{p.name}</h3>
                <Badge className={STATUS_CLS[p.status]}>{p.status}</Badge>
              </div>
              {p.description && <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>}
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
                  <span>{p.taskCounts.done}/{p.taskCounts.total} tasks done</span>
                  <span className="text-cyan-300 font-bold">{p.taskCounts.progress}%</span>
                </div>
                <Progress value={p.taskCounts.progress} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {p.members.slice(0, 5).map((m) => <Avatar key={m.id} name={m.name} size={7} />)}
                  {p.members.length === 0 && <span className="text-[11px] text-slate-500">No members</span>}
                </div>
                <div className="text-[10px] text-slate-500 flex flex-col items-end gap-0.5">
                  {p.repo && <span className="flex items-center gap-1"><GitCommitHorizontal className="w-3 h-3" />{p.repo}</span>}
                  {p.deadline && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{fmtDate(p.deadline)}</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {creating && (
        <ProjectForm
          users={users}
          onClose={() => setCreating(false)}
          onSaved={(p) => { setCreating(false); load(); openProject(p.id); }}
        />
      )}
    </div>
  );
}
