"use client";

import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import { api, card, inp, sel, btnPrimary, btnGhost, usePolling, StatusBadge, fmtDate, PRIORITY, STATUS, Modal, Label, Err, timeAgo } from "./ui";

export default function MyWork({ openProject }) {
  const [tasks, setTasks] = useState(null);
  const [submitFor, setSubmitFor] = useState(null);
  const [form, setForm] = useState({ note: "", link: "" });
  const [err, setErr] = useState("");
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

  const openSubmit = (t) => {
    setSubmitFor(t);
    setForm({ note: t.submission?.note || "", link: t.submission?.link || "" });
    setErr("");
  };
  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await api(`/api/team/tasks/${submitFor.id}`, "PATCH", { submission: form });
      setSubmitFor(null);
      load();
    } catch (e2) {
      setErr(e2.message);
    }
  };

  if (!tasks) return <p className="text-sm text-slate-400">Loading...</p>;
  if (!tasks.length) return <p className="text-sm text-slate-400 py-10 text-center">No tasks have been assigned to you yet.</p>;

  return (
    <div className="space-y-3">
      {tasks.map((t) => (
        <div key={t.id} className={`${card} p-4 space-y-3 ${t.status === "done" ? "opacity-60" : ""}`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-[200px] flex-1">
              <p className="text-sm font-bold text-white">{t.title}</p>
              {t.description && <p className="text-xs text-slate-400 mt-1 whitespace-pre-line">{t.description}</p>}
              <p className="text-[11px] text-slate-500 mt-2">
                {t.project && <button onClick={() => openProject(t.project.id)} className="text-cyan-400 hover:underline">{t.project.name}</button>}
                {" · "}<span className={PRIORITY[t.priority]}>{t.priority} priority</span>
                {t.dueDate && <> · Due {fmtDate(t.dueDate)}</>}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={t.status} />
              {t.status !== "done" && (
                <button onClick={() => openSubmit(t)} className={btnPrimary}>
                  {t.status === "review" ? "Resubmit" : "Submit Work"}
                </button>
              )}
              <select className={sel} value={t.status} onChange={(e) => setStatus(t.id, e.target.value)}>
                {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>

          {t.feedback && (
            <p className="text-xs p-3 rounded-xl bg-amber-500/10 border border-amber-400/25 text-amber-200">
              <b>Admin feedback:</b> {t.feedback}
            </p>
          )}
          {t.submission?.submittedAt && (
            <div className="text-xs p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-200 space-y-1">
              <p className="font-bold">Aapne submit kiya ({timeAgo(t.submission.submittedAt)})</p>
              {t.submission.note && <p className="whitespace-pre-line">{t.submission.note}</p>}
              {t.submission.link && <a href={t.submission.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cyan-300 hover:underline break-all">{t.submission.link} <ExternalLink className="w-3 h-3 shrink-0" /></a>}
            </div>
          )}
        </div>
      ))}

      {submitFor && (
        <Modal title={`Submit: ${submitFor.title}`} onClose={() => setSubmitFor(null)}>
          <form onSubmit={submit} className="space-y-4">
            <div><Label>What did you work on? (note)</Label><textarea rows={4} className={inp} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Firmware is ready, OTA tested..." /></div>
            <div><Label>Work link (GitHub / Drive / demo)</Label><input className={inp} placeholder="https://..." value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} /></div>
            <Err>{err}</Err>
            <p className="text-[11px] text-slate-500">After you submit, the task moves to &quot;In Review&quot; and the admin will see it.</p>
            <div className="flex gap-3"><button className={btnPrimary}>Submit to Admin</button><button type="button" onClick={() => setSubmitFor(null)} className={btnGhost}>Cancel</button></div>
          </form>
        </Modal>
      )}
    </div>
  );
}
