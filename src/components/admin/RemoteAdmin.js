"use client";

import React, { useState } from "react";
import { Pencil, Trash2, Plus, ExternalLink } from "lucide-react";
import { api, inp, sel, card, btnPrimary, btnGhost, btnDanger, Err, Label, Badge, usePolling } from "./shared";

const EMPTY = { id: null, title: "", description: "", rate: "", rateType: "fixed", skills: "", status: "open" };
const RT = { fixed: "fixed", hourly: "/ hour", monthly: "/ month" };

// Remote Work: (1) admin kaam post kare (rate + description), (2) log ka bheja kaam, (3) interested logon ki detail
export default function RemoteAdmin() {
  const [sub, setSub] = useState("jobs");
  const [jobs, setJobs] = useState([]);
  const [requests, setRequests] = useState([]);
  const [apps, setApps] = useState([]);
  const [f, setF] = useState(null);
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      const [j, r, a] = await Promise.all([api("/api/remote/jobs?all=1"), api("/api/remote/requests"), api("/api/remote/applications")]);
      setJobs(j.jobs); setRequests(r.requests); setApps(a.applications);
    } catch {}
  };
  usePolling(load, 30000, []);

  const save = async (e) => {
    e.preventDefault();
    setErr("");
    const body = { ...f, skills: f.skills.split(",").map((s) => s.trim()).filter(Boolean) };
    try {
      if (f.id) await api(`/api/remote/jobs/${f.id}`, "PUT", body);
      else await api("/api/remote/jobs", "POST", body);
      setF(null);
      load();
    } catch (e2) { setErr(e2.message); }
  };
  const toggle = async (j) => { await api(`/api/remote/jobs/${j.id}`, "PUT", { status: j.status === "open" ? "closed" : "open" }).catch((e) => alert(e.message)); load(); };
  const del = async (url, msg) => { if (!confirm(msg)) return; await api(url, "DELETE").catch((e) => alert(e.message)); load(); };

  const tabs = [["jobs", `Meri taraf se kaam (${jobs.length})`], ["apps", `Interested log (${apps.length})`], ["requests", `Logon ka kaam (${requests.length})`]];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {tabs.map(([k, l]) => (
          <button key={k} onClick={() => setSub(k)} className={`px-3 py-2 rounded-xl text-xs font-bold ${sub === k ? "bg-cyan-400 text-slate-950" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}>{l}</button>
        ))}
      </div>

      {sub === "jobs" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] text-slate-400">Yahan jo kaam dalenge wo &quot;Mujhe kaam chahiye&quot; wale logon ko rate aur description ke saath dikhega.</p>
            {!f && <button onClick={() => setF({ ...EMPTY })} className={btnPrimary}><Plus className="w-4 h-4" /> Naya Kaam</button>}
          </div>
          {f && (
            <form onSubmit={save} className={`${card} p-5 space-y-4`}>
              <div><Label>Kaam ka title *</Label><input required className={inp} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="ESP32 firmware developer" /></div>
              <div><Label>Description</Label><textarea rows={4} className={inp} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} /></div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div><Label>Rate</Label><input className={inp} value={f.rate} onChange={(e) => setF({ ...f, rate: e.target.value })} placeholder="₹5,000" /></div>
                <div><Label>Rate type</Label>
                  <select className={`${sel} w-full`} value={f.rateType} onChange={(e) => setF({ ...f, rateType: e.target.value })}>
                    <option value="fixed">Fixed (poore kaam ka)</option><option value="hourly">Per hour</option><option value="monthly">Per month</option>
                  </select>
                </div>
                <div><Label>Status</Label>
                  <select className={`${sel} w-full`} value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })}>
                    <option value="open">Open (UI par dikhega)</option><option value="closed">Closed (chhup jayega)</option>
                  </select>
                </div>
              </div>
              <div><Label>Skills (comma se alag)</Label><input className={inp} value={f.skills} onChange={(e) => setF({ ...f, skills: e.target.value })} placeholder="ESP32, MQTT, Python" /></div>
              <Err>{err}</Err>
              <div className="flex gap-3"><button className={btnPrimary}>{f.id ? "Update" : "Publish Kaam"}</button><button type="button" onClick={() => { setF(null); setErr(""); }} className={btnGhost}>Cancel</button></div>
            </form>
          )}
          {jobs.length === 0 && !f && <p className="text-xs text-slate-500 py-6 text-center">Abhi koi kaam post nahi kiya.</p>}
          {jobs.map((j) => (
            <div key={j.id} className={`${card} p-4 flex flex-wrap items-start justify-between gap-4`}>
              <div className="min-w-[220px] flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-white">{j.title}</p>
                  <Badge className={j.status === "open" ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/25" : "bg-slate-500/15 text-slate-400 border-slate-400/20"}>{j.status}</Badge>
                  {j.rate && <span className="text-xs text-emerald-300 font-bold">{j.rate} {RT[j.rateType]}</span>}
                </div>
                {j.description && <p className="text-xs text-slate-400 mt-1 whitespace-pre-line">{j.description}</p>}
                <p className="text-[10px] text-cyan-300 mt-2">{apps.filter((a) => a.job === j.id).length} interested</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggle(j)} className={btnGhost}>{j.status === "open" ? "Close" : "Reopen"}</button>
                <button onClick={() => setF({ ...j, skills: (j.skills || []).join(", ") })} className={btnGhost}><Pencil className="w-3 h-3" /></button>
                <button onClick={() => del(`/api/remote/jobs/${j.id}`, "Ye kaam delete karein?")} className={btnDanger}><Trash2 className="w-3 h-3" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {sub === "apps" && (
        <div className="space-y-3">
          {apps.length === 0 && <p className="text-xs text-slate-500 py-6 text-center">Abhi kisi ne interest nahi dikhaya.</p>}
          {apps.map((a) => (
            <div key={a.id} className={`${card} p-4 flex flex-wrap items-start justify-between gap-4`}>
              <div className="min-w-[220px] flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-white">{a.name}</p>
                  {a.jobTitle && <Badge className="bg-cyan-500/10 text-cyan-300 border-cyan-400/20">{a.jobTitle}</Badge>}
                  <span className="text-[10px] text-slate-500">{a.date}</span>
                </div>
                <p className="text-xs text-cyan-300">{a.contact}</p>
                {a.skills && <p className="text-xs text-slate-300">Skills: {a.skills}</p>}
                {a.link && <a href={/^https?:\/\//.test(a.link) ? a.link : `https://${a.link}`} target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:underline inline-flex items-center gap-1">{a.link} <ExternalLink className="w-3 h-3" /></a>}
                {a.message && <p className="text-xs text-slate-300 bg-black/30 p-3 rounded-xl border border-white/5 whitespace-pre-line">{a.message}</p>}
              </div>
              <button onClick={() => del(`/api/remote/applications/${a.id}`, "Ye entry delete karein?")} className={btnDanger}><Trash2 className="w-3 h-3" /></button>
            </div>
          ))}
        </div>
      )}

      {sub === "requests" && (
        <div className="space-y-3">
          {requests.length === 0 && <p className="text-xs text-slate-500 py-6 text-center">Abhi kisi ne kaam nahi bheja.</p>}
          {requests.map((r) => (
            <div key={r.id} className={`${card} p-4 flex flex-wrap items-start justify-between gap-4`}>
              <div className="min-w-[220px] flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-white">{r.title}</p>
                  {r.budget && <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-400/25">Budget: {r.budget}</Badge>}
                  <span className="text-[10px] text-slate-500">{r.date}</span>
                </div>
                <p className="text-xs text-slate-300">{r.name} · <span className="text-cyan-300">{r.contact}</span></p>
                <p className="text-xs text-slate-300 bg-black/30 p-3 rounded-xl border border-white/5 whitespace-pre-line">{r.description}</p>
              </div>
              <button onClick={() => del(`/api/remote/requests/${r.id}`, "Ye request delete karein?")} className={btnDanger}><Trash2 className="w-3 h-3" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
