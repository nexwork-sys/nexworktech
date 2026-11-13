"use client";

import React, { useState } from "react";
import { api, inp, sel, btnPrimary, Err, Label, Modal, dateInput } from "./ui";

// Naya project / edit project (admin) — members select karo, GitHub repo jodo
export default function ProjectForm({ project, users, onClose, onSaved }) {
  const [f, setF] = useState({
    name: project?.name || "",
    description: project?.description || "",
    repo: project?.repo || "",
    deadline: dateInput(project?.deadline),
    status: project?.status || "active",
    members: (project?.members || []).map((m) => m.id || m),
  });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const toggle = (id) =>
    setF((p) => ({ ...p, members: p.members.includes(id) ? p.members.filter((x) => x !== id) : [...p.members, id] }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const d = project
        ? await api(`/api/team/projects/${project.id}`, "PATCH", f)
        : await api("/api/team/projects", "POST", f);
      onSaved(d.project);
    } catch (e2) {
      setErr(e2.message);
    }
    setBusy(false);
  };

  return (
    <Modal wide title={project ? "Edit Project" : "New Project"} onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <div><Label>Project Name</Label><input required className={inp} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Smart Home IoT Bot" /></div>
        <div><Label>Description</Label><textarea rows={2} className={inp} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} /></div>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <Label>GitHub Repo (owner/repo ya URL)</Label>
            <input className={inp} value={f.repo} onChange={(e) => setF({ ...f, repo: e.target.value })} placeholder="nexworktech/iot-bot" />
          </div>
          <div><Label>Deadline</Label><input type="date" className={inp} value={f.deadline} onChange={(e) => setF({ ...f, deadline: e.target.value })} /></div>
        </div>
        {project && (
          <div>
            <Label>Status</Label>
            <select className={sel} value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })}>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        )}
        <div>
          <Label>Team Members (admin ko bhi add kar sakte ho)</Label>
          <div className="grid sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {users.filter((u) => u.active).map((u) => (
              <label key={u.id} className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs cursor-pointer ${f.members.includes(u.id) ? "bg-cyan-500/15 border-cyan-400/40 text-white" : "bg-white/5 border-white/10 text-slate-300"}`}>
                <input type="checkbox" checked={f.members.includes(u.id)} onChange={() => toggle(u.id)} />
                {u.name} {u.role === "admin" && <span className="text-purple-300">(Admin)</span>}
              </label>
            ))}
          </div>
        </div>
        <Err>{err}</Err>
        <button disabled={busy} className={btnPrimary}>{project ? "Save Changes" : "Create Project"}</button>
      </form>
    </Modal>
  );
}
