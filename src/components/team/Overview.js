"use client";

import React, { useState } from "react";
import { Activity, GitCommitHorizontal } from "lucide-react";
import { api, card, usePolling, timeAgo, Avatar, Badge } from "./ui";

export default function Overview({ openProject }) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  usePolling(() => api("/api/team/overview").then(setData).catch((e) => setErr(e.message)), 30000);

  if (err) return <p className="text-sm text-rose-400">{err}</p>;
  if (!data) return <p className="text-sm text-slate-400">Loading...</p>;
  const { totals, people, recent } = data;

  const stats = [
    ["Active Projects", totals.activeProjects],
    ["Employees", totals.employees],
    ["Open Tasks", totals.tasks.total - totals.tasks.done],
    ["Completed Tasks", totals.tasks.done],
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(([label, n]) => (
          <div key={label} className={`${card} p-5`}>
            <p className="text-[11px] uppercase tracking-widest text-slate-400">{label}</p>
            <p className="text-3xl font-black text-white mt-1">{n}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className={`${card} p-5 lg:col-span-3`}>
          <h3 className="text-sm font-bold text-cyan-400 mb-4">Team Status (kaun kya kar raha hai)</h3>
          <div className="space-y-3">
            {people.map((p) => (
              <div key={p.id} className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-black/20 border border-white/5">
                <Avatar name={p.name} />
                <div className="min-w-[120px] flex-1">
                  <p className="text-sm font-semibold text-white">
                    {p.name} {p.role === "admin" && <Badge className="ml-1 bg-purple-500/15 text-purple-300 border-purple-400/20">Admin</Badge>}
                  </p>
                  <p className="text-[11px] text-slate-500">{p.designation || p.username}</p>
                </div>
                <div className="text-[11px] text-slate-300 text-center">
                  <p className="font-bold text-white">{p.tasks.done}/{p.tasks.total}</p>
                  tasks done
                </div>
                <div className="text-[11px] text-slate-300 text-center">
                  <p className="font-bold text-white">{p.commits7}</p>
                  commits (7d)
                </div>
                <div className="text-[11px] text-slate-400 text-right min-w-[90px]">
                  <p>Last active</p>
                  <p className={p.lastActiveAt ? "text-emerald-300" : "text-slate-500"}>{timeAgo(p.lastActiveAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${card} p-5 lg:col-span-2`}>
          <h3 className="text-sm font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4" /> Recent Activity
          </h3>
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {recent.length === 0 && <p className="text-xs text-slate-500">Abhi koi activity nahi.</p>}
            {recent.map((u) => (
              <div key={u.id} className="text-xs border-l-2 border-cyan-400/30 pl-3">
                <p className="text-slate-200">
                  <span className="font-semibold text-white">{u.author?.name || "—"}</span>{" "}
                  <span className={u.kind === "system" ? "text-slate-400" : ""}>{u.text}</span>
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {u.project && (
                    <button onClick={() => openProject(u.project.id)} className="text-cyan-400 hover:underline">
                      {u.project.name}
                    </button>
                  )}{" "}
                  · {timeAgo(u.createdAt)}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 mt-4 flex items-center gap-1">
            <GitCommitHorizontal className="w-3 h-3" /> Commit details har project ke andar dikhte hain.
          </p>
        </div>
      </div>
    </div>
  );
}
