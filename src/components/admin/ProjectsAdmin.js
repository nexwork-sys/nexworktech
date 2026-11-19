"use client";

import React, { useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { api, inp, card, btnPrimary, btnGhost, btnDanger, Err, Label, ImageField, linesToList } from "./shared";

const EMPTY = { id: null, name: "", tag: "", url: "", description: "", images: [], stats: "" };

// Admin website ke "Our Projects" yahin se manage karta hai: images + link + description
export default function ProjectsAdmin({ projects, setProjects }) {
  const [f, setF] = useState(null);
  const [err, setErr] = useState("");

  const save = async (e) => {
    e.preventDefault();
    setErr("");
    const body = { ...f, images: f.images.filter(Boolean), stats: linesToList(f.stats) };
    try {
      if (f.id) {
        const { item } = await api(`/api/portfolio/${f.id}`, "PUT", body);
        setProjects(projects.map((p) => (p.id === f.id ? item : p)));
      } else {
        const { item } = await api("/api/portfolio", "POST", { ...body, order: projects.length + 1 });
        setProjects([...projects, item]);
      }
      setF(null);
    } catch (e2) {
      setErr(e2.message);
    }
  };
  const del = async (id) => {
    if (!confirm("Ye project website se hata dein?")) return;
    await api(`/api/portfolio/${id}`, "DELETE").catch((e) => alert(e.message));
    setProjects(projects.filter((p) => p.id !== id));
  };
  const setImg = (i, v) => setF({ ...f, images: f.images.map((x, j) => (j === i ? v : x)) });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-cyan-400">Website Projects</h4>
          <p className="text-[11px] text-slate-400">Jo yahan add karenge wahi UI par &quot;Our Projects&quot; mein dikhega.</p>
        </div>
        {!f && <button onClick={() => setF({ ...EMPTY, images: [""] })} className={btnPrimary}><Plus className="w-4 h-4" /> Add Project</button>}
      </div>

      {f && (
        <form onSubmit={save} className={`${card} p-5 space-y-4`}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label>Project Name *</Label><input required className={inp} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
            <div><Label>Tag (jaise: Web App • AI Bot)</Label><input className={inp} value={f.tag} onChange={(e) => setF({ ...f, tag: e.target.value })} /></div>
          </div>
          <div><Label>Project Link (live site)</Label><input className={inp} placeholder="https://..." value={f.url} onChange={(e) => setF({ ...f, url: e.target.value })} /></div>
          <div><Label>Description</Label><textarea rows={3} className={inp} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} /></div>
          <div><Label>Highlights (har line mein ek, jaise &quot;Admin Panel&quot;)</Label><textarea rows={3} className={inp} value={f.stats} onChange={(e) => setF({ ...f, stats: e.target.value })} /></div>

          <div className="space-y-3">
            <Label>Images (max 6)</Label>
            {f.images.map((img, i) => (
              <div key={i} className="relative p-3 rounded-xl bg-black/20 border border-white/5">
                <ImageField label={`Image ${i + 1}`} folder="projects" value={img} onChange={(v) => setImg(i, v)} />
                {f.images.length > 1 && (
                  <button type="button" onClick={() => setF({ ...f, images: f.images.filter((_, j) => j !== i) })} className="absolute top-2 right-2 p-1 rounded-full bg-rose-500/15 text-rose-400"><X className="w-3 h-3" /></button>
                )}
              </div>
            ))}
            {f.images.length < 6 && <button type="button" onClick={() => setF({ ...f, images: [...f.images, ""] })} className={btnGhost}><Plus className="w-3.5 h-3.5" /> Aur image</button>}
          </div>

          <Err>{err}</Err>
          <div className="flex gap-3">
            <button className={btnPrimary}>{f.id ? "Update Project" : "Save Project"}</button>
            <button type="button" onClick={() => { setF(null); setErr(""); }} className={btnGhost}>Cancel</button>
          </div>
        </form>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div key={p.id} className={`${card} p-4 space-y-3`}>
            <div className="grid grid-cols-3 gap-1 h-20 rounded-lg overflow-hidden bg-slate-900">
              {(p.images || []).slice(0, 3).map((src, i) => <img key={i} src={src} alt="" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.visibility = "hidden")} />)}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{p.name}</p>
              <p className="text-[11px] text-cyan-400">{p.tag}</p>
              {p.url && <p className="text-[10px] text-slate-500 truncate">{p.url}</p>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setF({ ...p, stats: (p.stats || []).join("\n"), images: p.images?.length ? p.images : [""] })} className={`${btnGhost} flex-1`}><Pencil className="w-3 h-3" /> Edit</button>
              <button onClick={() => del(p.id)} className={btnDanger}><Trash2 className="w-3 h-3" /></button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-xs text-slate-500">Abhi koi project nahi. &quot;Add Project&quot; dabayein.</p>}
      </div>
    </div>
  );
}
