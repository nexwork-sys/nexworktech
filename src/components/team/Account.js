"use client";

import React, { useState } from "react";
import { KeyRound } from "lucide-react";
import { api, card, inp, btnPrimary, Err, Ok, Label } from "./ui";

export default function Account({ user, onUser }) {
  const [f, setF] = useState({ current: "", next: "", confirm: "" });
  const [msg, setMsg] = useState({ err: "", ok: "" });

  const submit = async (e) => {
    e.preventDefault();
    if (f.next !== f.confirm) return setMsg({ err: "Naya password aur confirm match nahi kar rahe", ok: "" });
    try {
      const d = await api("/api/auth/change-password", "POST", { current: f.current, next: f.next });
      onUser(d.user);
      setF({ current: "", next: "", confirm: "" });
      setMsg({ err: "", ok: "✓ Password badal gaya!" });
    } catch (e2) {
      setMsg({ err: e2.message, ok: "" });
    }
  };

  return (
    <form onSubmit={submit} className={`${card} p-6 max-w-md space-y-4`}>
      <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2"><KeyRound className="w-4 h-4" /> Change Password</h3>
      <p className="text-[11px] text-slate-400">Logged in as <b className="text-white">{user.name}</b> (@{user.username})</p>
      {[["current", "Current Password"], ["next", "New Password (min 6)"], ["confirm", "Confirm New Password"]].map(([k, l]) => (
        <div key={k}>
          <Label>{l}</Label>
          <input type="password" required className={inp} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} />
        </div>
      ))}
      <Err>{msg.err}</Err>
      <Ok>{msg.ok}</Ok>
      <button className={btnPrimary}>Update Password</button>
    </form>
  );
}
