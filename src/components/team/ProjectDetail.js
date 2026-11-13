"use client";

import React, { useState } from "react";
import { ArrowLeft, Pencil, Trash2, RefreshCw, GitCommitHorizontal, Plus, Send, ExternalLink } from "lucide-react";
import {
  api, card, inp, sel, btnPrimary, btnGhost, btnDanger, usePolling, Avatar, Progress, StatusBadge,
  Badge, Err, Label, Modal, fmtDate, timeAgo, dateInput, PRIORITY, STATUS,
} from "./ui";
import ProjectForm from "./ProjectForm";

export default function ProjectDetail({ id, user, onBack }) {
  const isAdmin = user.role === "admin";
  const [d, setD] = useState(null);
  const [err, setErr] = useState("");
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [taskForm, setTaskForm] = useState(null);
  const [panel, setPanel] = useState("commits");
  const [note, setNote] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");

  const load = () => api(`/api/team/projects/${id}`).then(setD).catch((e) => setErr(e.message));
  usePolling(load, 20000, [id]); // har 20 sec mein auto-refresh
  usePolling(() => (isAdmin ? api("/api/team/users").then((r) => setUsers(r.users)).catch(() => {}) : null), 0, [id]);

  if (err) return <div><button onClick={onBack} className={btnGhost}><ArrowLeft className="w-4 h-4" /> Back</button><p className="mt-4 text-sm text-rose-400">{err}</p></div>;
  if (!d) return <p className="text-sm text-slate-400">Loading...</p>;

  const { project: p, tasks, updates, commits, contributors, taskCounts } = d;

  const setStatus = async (taskId, status) => {
    try { await api(`/api/team/tasks/${taskId}`, "PATCH", { status }); load(); } catch (e) { alert(e.message); }
  };
  const delTask = async (taskId) => {
    if (!confirm("Ye task delete karein?")) return;
    await api(`/api/team/tasks/${taskId}`, "DELETE").catch((e) => alert(e.message));
    load();
  };
  const delProject = async () => {
    if (!confirm(`"${p.name}" project, uske tasks aur history delete ho jayenge. Pakka?`)) return;
    await api(`/api/team/projects/${p.id}`, "DELETE").catch((e) => alert(e.message));
    onBack();
  };
  const sync = async () => {
    setSyncing(true); setSyncMsg("");
    try {
      const r = await api(`/api/team/projects/${p.id}/sync`, "POST");
      setSyncMsg(`${r.added} naye commits mile`);
      load();
    } catch (e) { setSyncMsg(e.message); }
    setSyncing(false);
  };
  const postNote = async (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    try { await api(`/api/team/projects/${p.id}/updates`, "POST", { text: note }); setNote(""); load(); } catch (e2) { alert(e2.message); }
  };

  const memberRows = p.members.map((m) => {
    const mine = tasks.filter((t) => t.assignee?.id === m.id);
    const c = contributors.find((x) => x.memberId === m.id);
    return { m, total: mine.length, done: mine.filter((t) => t.status === "done").length, c };
  });
  const others = contributors.filter((c) => !c.memberId);

  return (
    <div className="space-y-6">
      <button onClick={onBack} className={btnGhost}><ArrowLeft className="w-4 h-4" /> All Projects</button>

      {/* Header */}
      <div className={`${card} p-6 space-y-4`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-white">{p.name}</h2>
            {p.description && <p className="text-sm text-slate-400 mt-1 max-w-2xl">{p.description}</p>}
            <p className="text-[11px] text-slate-500 mt-2 flex flex-wrap gap-x-4 gap-y-1">
              <Badge className="bg-cyan-500/10 text-cyan-300 border-cyan-400/20">{p.status}</Badge>
              {p.deadline && <span>Deadline: {fmtDate(p.deadline)}</span>}
              {p.repo && (
                <a href={`https://github.com/${p.repo}`} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
                  <GitCommitHorizontal className="w-3 h-3" /> {p.repo} <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </p>
          </div>
          {isAdmin && (
            <div className="flex gap-2">
              <button onClick={() => setEditing(true)} className={btnGhost}><Pencil className="w-3.5 h-3.5" /> Edit / Team</button>
              <button onClick={delProject} className={btnDanger}><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          )}
        </div>
        <div>
          <div className="flex justify-between text-xs text-slate-300 mb-1.5">
            <span>Overall Progress</span><span className="font-bold text-cyan-300">{taskCounts.progress}%</span>
          </div>
          <Progress value={taskCounts.progress} />
          <div className="flex flex-wrap gap-2 mt-3">
            {Object.entries(STATUS).map(([k, v]) => <Badge key={k} className={v.cls}>{v.label}: {taskCounts[k]}</Badge>)}
          </div>
        </div>
      </div>

      {/* Team contribution */}
      <div className={`${card} p-5`}>
        <h3 className="text-sm font-bold text-cyan-400 mb-4">Team Work Status</h3>
        {memberRows.length === 0 ? (
          <p className="text-xs text-slate-500">Is project mein abhi koi member nahi.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[560px]">
              <thead className="text-slate-500 text-[10px] uppercase tracking-wider">
                <tr><th className="text-left pb-2">Member</th><th className="pb-2">Tasks</th><th className="pb-2">Commits</th><th className="pb-2">Last 7 days</th><th className="text-right pb-2">Last commit</th></tr>
              </thead>
              <tbody>
                {memberRows.map(({ m, total, done, c }) => (
                  <tr key={m.id} className="border-t border-white/5">
                    <td className="py-2.5"><span className="flex items-center gap-2"><Avatar name={m.name} size={7} /><span><b className="text-white">{m.name}</b><br /><span className="text-[10px] text-slate-500">{m.githubUsername ? `@${m.githubUsername}` : "GitHub username not set"}</span></span></span></td>
                    <td className="text-center text-slate-200">{done}/{total}</td>
                    <td className="text-center text-slate-200">{c?.total || 0}</td>
                    <td className="text-center text-slate-200">{c?.last7 || 0}</td>
                    <td className="text-right text-slate-400">{timeAgo(c?.lastAt)}</td>
                  </tr>
                ))}
                {others.map((c) => (
                  <tr key={c.key} className="border-t border-white/5 text-slate-500">
                    <td className="py-2.5">{c.name || c.key} <span className="text-[10px]">(team mein match nahi)</span></td>
                    <td className="text-center">—</td><td className="text-center">{c.total}</td><td className="text-center">{c.last7}</td><td className="text-right">{timeAgo(c.lastAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid xl:grid-cols-5 gap-6">
        {/* Tasks */}
        <div className="xl:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-cyan-400">Tasks</h3>
            {isAdmin && <button onClick={() => setTaskForm({ title: "", description: "", assignee: "", priority: "medium", dueDate: "" })} className={btnPrimary}><Plus className="w-4 h-4" /> Add Task</button>}
          </div>
          {tasks.length === 0 && <p className="text-xs text-slate-500">Abhi koi task nahi.</p>}
          <div className="grid sm:grid-cols-2 gap-3">
            {Object.keys(STATUS).map((st) => (
              <div key={st} className="rounded-2xl bg-black/20 border border-white/5 p-3 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{STATUS[st].label} ({tasks.filter((t) => t.status === st).length})</p>
                {tasks.filter((t) => t.status === st).map((t) => {
                  const canEdit = isAdmin || t.assignee?.id === user.id;
                  return (
                    <div key={t.id} className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
                      <div className="flex justify-between gap-2">
                        <p className="text-xs font-semibold text-white">{t.title}</p>
                        {isAdmin && <button onClick={() => delTask(t.id)} className="text-rose-400/70 hover:text-rose-400"><Trash2 className="w-3 h-3" /></button>}
                      </div>
                      {t.description && <p className="text-[11px] text-slate-400">{t.description}</p>}
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span className="flex items-center gap-1">{t.assignee ? <><Avatar name={t.assignee.name} size={5} />{t.assignee.name}</> : "Unassigned"}</span>
                        <span><span className={PRIORITY[t.priority]}>{t.priority}</span>{t.dueDate && ` · ${fmtDate(t.dueDate)}`}</span>
                      </div>
                      {canEdit && (
                        <select className={`${sel} w-full`} value={t.status} onChange={(e) => setStatus(t.id, e.target.value)}>
                          {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                        </select>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Commits / Updates */}
        <div className={`${card} p-5 xl:col-span-2 space-y-4`}>
          <div className="flex gap-2">
            {[["commits", `GitHub Commits (${commits.length})`], ["updates", "Updates & Activity"]].map(([k, l]) => (
              <button key={k} onClick={() => setPanel(k)} className={`px-3 py-2 rounded-xl text-xs font-bold ${panel === k ? "bg-cyan-400 text-slate-950" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}>{l}</button>
            ))}
          </div>

          {panel === "commits" && (
            <div className="space-y-3">
              {p.repo ? (
                <div className="flex items-center gap-3">
                  <button onClick={sync} disabled={syncing} className={btnGhost}><RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} /> Sync GitHub</button>
                  <span className="text-[11px] text-slate-400">{syncMsg}</span>
                </div>
              ) : (
                <p className="text-xs text-amber-300">Is project mein GitHub repo set nahi hai{isAdmin ? " — Edit se add karein." : "."}</p>
              )}
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {commits.length === 0 && p.repo && <p className="text-xs text-slate-500">Abhi koi commit nahi aaya. &quot;Sync GitHub&quot; dabayein ya webhook set karein (README dekhein).</p>}
                {commits.map((c) => {
                  const member = p.members.find((m) => m.githubUsername && m.githubUsername.toLowerCase() === c.authorLogin);
                  return (
                    <a key={c.id} href={c.url || undefined} target="_blank" rel="noreferrer" className="block border-l-2 border-emerald-400/40 pl-3 hover:bg-white/[0.03] rounded-r-lg py-1">
                      <p className="text-xs text-white line-clamp-2">{c.message.split("\n")[0]}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        <span className="text-cyan-300">{member?.name || c.authorName || c.authorLogin}</span>
                        {c.branch && <> · {c.branch}</>} · {c.sha.slice(0, 7)} · {timeAgo(c.date)}
                      </p>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {panel === "updates" && (
            <div className="space-y-4">
              <form onSubmit={postNote} className="flex gap-2">
                <input className={inp} placeholder="Aaj kya kaam kiya / kahan atke ho..." value={note} onChange={(e) => setNote(e.target.value)} />
                <button className={btnPrimary}><Send className="w-3.5 h-3.5" /></button>
              </form>
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {updates.length === 0 && <p className="text-xs text-slate-500">Abhi koi update nahi.</p>}
                {updates.map((u) => (
                  <div key={u.id} className={`text-xs border-l-2 pl-3 ${u.kind === "system" ? "border-white/15" : "border-cyan-400/50"}`}>
                    <p className={u.kind === "system" ? "text-slate-400" : "text-slate-100"}>
                      <b className="text-white">{u.author?.name || "Removed user"}</b> {u.text}
                    </p>
                    <p className="text-[10px] text-slate-500">{timeAgo(u.createdAt)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {editing && (
        <ProjectForm project={p} users={users} onClose={() => setEditing(false)} onSaved={() => { setEditing(false); load(); }} />
      )}

      {taskForm && (
        <Modal title="Add Task" onClose={() => setTaskForm(null)}>
          <TaskForm form={taskForm} setForm={setTaskForm} users={users} members={p.members} projectId={p.id} onDone={() => { setTaskForm(null); load(); }} />
        </Modal>
      )}
    </div>
  );
}

function TaskForm({ form, setForm, users, members, projectId, onDone }) {
  const [err, setErr] = useState("");
  const memberIds = new Set(members.map((m) => m.id));
  const submit = async (e) => {
    e.preventDefault();
    try { await api(`/api/team/projects/${projectId}/tasks`, "POST", form); onDone(); } catch (e2) { setErr(e2.message); }
  };
  const f = (k) => ({ value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }) });
  return (
    <form onSubmit={submit} className="space-y-4">
      <div><Label>Task Title</Label><input required className={inp} {...f("title")} placeholder="ESP32 firmware OTA update" /></div>
      <div><Label>Details</Label><textarea rows={2} className={inp} {...f("description")} /></div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="sm:col-span-1">
          <Label>Assign To</Label>
          <select className={`${sel} w-full`} {...f("assignee")}>
            <option value="">Unassigned</option>
            {users.filter((u) => u.active).map((u) => (
              <option key={u.id} value={u.id}>{u.name}{u.role === "admin" ? " (Admin)" : ""}{memberIds.has(u.id) ? "" : " + add to team"}</option>
            ))}
          </select>
        </div>
        <div><Label>Priority</Label><select className={`${sel} w-full`} {...f("priority")}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div>
        <div><Label>Due Date</Label><input type="date" className={inp} {...f("dueDate")} /></div>
      </div>
      <Err>{err}</Err>
      <button className={btnPrimary}>Create Task</button>
    </form>
  );
}
