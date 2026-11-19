"use client";

import React, { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { api, inp, sel, card, btnPrimary, btnGhost, btnDanger, Err, Label, ImageField, linesToList } from "./shared";

const EMPTY_SERVICE = { id: null, kind: "ai", tag: "", title: "", description: "", features: "" };
const EMPTY_PIC = { id: null, title: "", category: "AI Automation", description: "", image: "" };
const KIND_LABEL = { ai: "AI Automation icon", aiot: "AIoT icon" };

// Admin yahin se Services cards (AI Automation / AIoT) aur unke Showcase photos edit karta hai.
export default function ServicesAdmin({ services, setServices, gallery, setGallery }) {
  const [sf, setSf] = useState(null);
  const [pf, setPf] = useState(EMPTY_PIC);
  const [err, setErr] = useState("");

  const saveService = async (e) => {
    e.preventDefault();
    setErr("");
    const body = { ...sf, features: linesToList(sf.features) };
    try {
      if (sf.id) {
        const { item } = await api(`/api/services/${sf.id}`, "PUT", body);
        setServices(services.map((s) => (s.id === sf.id ? item : s)));
      } else {
        const { item } = await api("/api/services", "POST", { ...body, order: services.length + 1 });
        setServices([...services, item]);
      }
      setSf(null);
    } catch (e2) {
      setErr(e2.message);
    }
  };
  const delService = async (id) => {
    if (!confirm("Delete this service card?")) return;
    await api(`/api/services/${id}`, "DELETE").catch((e) => alert(e.message));
    setServices(services.filter((s) => s.id !== id));
  };

  const savePic = async (e) => {
    e.preventDefault();
    setErr("");
    if (!pf.image) return setErr("Choose a photo or enter a URL");
    try {
      if (pf.id) {
        const { item } = await api(`/api/gallery/${pf.id}`, "PUT", pf);
        setGallery(gallery.map((g) => (g.id === pf.id ? item : g)));
      } else {
        const { item } = await api("/api/gallery", "POST", pf);
        setGallery([item, ...gallery]);
      }
      setPf(EMPTY_PIC);
    } catch (e2) {
      setErr(e2.message);
    }
  };
  const delPic = async (id) => {
    await api(`/api/gallery/${id}`, "DELETE").catch((e) => alert(e.message));
    setGallery(gallery.filter((g) => g.id !== id));
  };

  return (
    <div className="space-y-10">
      {/* SERVICES */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-cyan-400">Services (cards in the website &quot;Services&quot; section)</h4>
            <p className="text-[11px] text-slate-400">AI Automation and AIoT — edit text and features here.</p>
          </div>
          {!sf && <button onClick={() => setSf({ ...EMPTY_SERVICE })} className={btnPrimary}><Plus className="w-4 h-4" /> Add Service</button>}
        </div>

        {sf && (
          <form onSubmit={saveService} className={`${card} p-5 space-y-4`}>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2"><Label>Service Title *</Label><input required className={inp} value={sf.title} onChange={(e) => setSf({ ...sf, title: e.target.value })} placeholder="AI Automation" /></div>
              <div>
                <Label>Icon / Showcase type</Label>
                <select className={`${sel} w-full`} value={sf.kind} onChange={(e) => setSf({ ...sf, kind: e.target.value })}>
                  {Object.entries(KIND_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            </div>
            <div><Label>Chhota tag (jaise 01 / INTELLIGENCE)</Label><input className={inp} value={sf.tag} onChange={(e) => setSf({ ...sf, tag: e.target.value })} /></div>
            <div><Label>Description</Label><textarea rows={3} className={inp} value={sf.description} onChange={(e) => setSf({ ...sf, description: e.target.value })} /></div>
            <div><Label>Features (one per line)</Label><textarea rows={4} className={inp} value={sf.features} onChange={(e) => setSf({ ...sf, features: e.target.value })} placeholder={"Custom LLM Agents\nWorkflow Automation"} /></div>
            <Err>{err}</Err>
            <div className="flex gap-3">
              <button className={btnPrimary}>{sf.id ? "Update Service" : "Save Service"}</button>
              <button type="button" onClick={() => { setSf(null); setErr(""); }} className={btnGhost}>Cancel</button>
            </div>
          </form>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          {services.map((s) => (
            <div key={s.id} className={`${card} p-4 space-y-2`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-mono text-slate-500">{s.tag}</p>
                  <p className="text-sm font-bold text-white">{s.title}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSf({ ...s, features: (s.features || []).join("\n") })} className={btnGhost}><Pencil className="w-3 h-3" /></button>
                  <button onClick={() => delService(s.id)} className={btnDanger}><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-3">{s.description}</p>
              <p className="text-[10px] text-cyan-300">{(s.features || []).length} features</p>
            </div>
          ))}
          {services.length === 0 && <p className="text-xs text-slate-500">No services yet. Click &quot;Add Service&quot;.</p>}
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="space-y-4">
        <div>
          <h4 className="text-sm font-bold text-cyan-400">Showcase (photos below Services)</h4>
          <p className="text-[11px] text-slate-400">Add a photo under the AI Automation or AIoT category — it will appear under the same filter on the website.</p>
        </div>

        <form onSubmit={savePic} className={`${card} p-5 space-y-4`}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label>Title *</Label><input required className={inp} value={pf.title} onChange={(e) => setPf({ ...pf, title: e.target.value })} placeholder="WhatsApp AI Support Bot" /></div>
            <div>
              <Label>Category</Label>
              <select className={`${sel} w-full`} value={pf.category} onChange={(e) => setPf({ ...pf, category: e.target.value })}>
                <option value="AI Automation">AI Automation</option>
                <option value="AIoT">AIoT</option>
              </select>
            </div>
          </div>
          <div><Label>Short description</Label><input className={inp} value={pf.description} onChange={(e) => setPf({ ...pf, description: e.target.value })} /></div>
          <ImageField label="Photo *" folder="gallery" value={pf.image} onChange={(image) => setPf({ ...pf, image })} />
          <div className="flex gap-3">
            <button className={btnPrimary}>{pf.id ? "Update Showcase" : "+ Add to Showcase"}</button>
            {pf.id && <button type="button" onClick={() => setPf(EMPTY_PIC)} className={btnGhost}>Cancel Edit</button>}
          </div>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {gallery.map((g) => (
            <div key={g.id} className={`${card} p-3 flex flex-col justify-between`}>
              <div>
                <img src={g.image} alt={g.title} className="w-full h-28 object-cover rounded-xl mb-2" />
                <p className="text-xs font-bold text-white">{g.title}</p>
                <p className="text-[11px] text-cyan-400">{g.category}</p>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
                <button onClick={() => { setPf({ ...g }); window.scrollTo?.({ top: 0 }); }} className={`${btnGhost} flex-1`}><Pencil className="w-3 h-3" /> Edit</button>
                <button onClick={() => delPic(g.id)} className={btnDanger}><Trash2 className="w-3 h-3" /></button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
