"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import { inp } from "@/components/team/ui";

export { api, inp, sel, card, btnPrimary, btnGhost, btnDanger, Err, Ok, Label, Badge, usePolling } from "@/components/team/ui";

// Image Cloudinary par upload karke URL deta hai
export async function uploadImage(file, folder) {
  const form = new FormData();
  form.append("file", file);
  form.append("folder", folder);
  const res = await fetch("/api/upload", { method: "POST", body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Upload fail");
  return data.url;
}

// PC/mobile se photo chunein YA URL paste karein
export function ImageField({ value, onChange, folder, label = "Image" }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const pick = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    setErr("");
    try {
      onChange(await uploadImage(f, folder));
    } catch (e2) {
      setErr(e2.message);
    }
    setBusy(false);
    e.target.value = "";
  };
  return (
    <div className="space-y-2">
      <label className="block text-[11px] text-slate-400">{label}</label>
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 text-xs font-semibold cursor-pointer hover:bg-cyan-500/30">
          <Upload className="w-3.5 h-3.5" /> {busy ? "Uploading..." : "Photo chunein"}
          <input type="file" accept="image/*" className="hidden" onChange={pick} />
        </label>
        <input className={`${inp} flex-1 min-w-[200px]`} placeholder="ya image URL paste karein https://..." value={value || ""} onChange={(e) => onChange(e.target.value)} />
      </div>
      {value && <img src={value} alt="" className="h-20 rounded-lg object-cover border border-white/10" />}
      {err && <p className="text-[11px] text-rose-400">{err}</p>}
    </div>
  );
}

export const linesToList = (t) => String(t || "").split("\n").map((x) => x.trim()).filter(Boolean);
