"use client";

import React, { useState } from "react";
import { UserPlus, Trash2, KeyRound } from "lucide-react";
import { api, card, inp, btnPrimary, btnGhost, btnDanger, Err, Label, Modal, Avatar, Badge, usePolling } from "./ui";

export default function Employees({ me }) {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", username: "", password: "", githubUsername: "", designation: "" });
  const [err, setErr] = useState("");
  const [resetFor, setResetFor] = useState(null);
  const [newPw, setNewPw] = useState("");
  const [pwErr, setPwErr] = useState("");

  const load = () => api("/api/team/users").then((d) => setUsers(d.users)).catch((e) => setErr(e.message));
  usePolling(load, 0, []);

  const add = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await api("/api/team/users", "POST", form);
      setForm({ name: "", username: "", password: "", githubUsername: "", designation: "" });
      load();
    } catch (e2) {
      setErr(e2.message);
    }
  };

  const patch = async (id, body) => {
    try {
      await api(`/api/team/users/${id}`, "PATCH", body);
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  const remove = async (u) => {
    if (!confirm(`${u.name} ko delete karein? Projects se bhi hat jayenge.`)) return;
    try {
      await api(`/api/team/users/${u.id}`, "DELETE");
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  const doReset = async (e) => {
    e.preventDefault();
    setPwErr("");
    try {
      await api(`/api/team/users/${resetFor.id}`, "PATCH", { password: newPw });
      setResetFor(null);
      setNewPw("");
    } catch (e2) {
      setPwErr(e2.message);
    }
  };

  const f = (k) => ({ value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }) });

  return (
    <div className="space-y-6">
      <form onSubmit={add} className={`${card} p-5 space-y-4`}>
        <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Add Employee
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div><Label>Full Name</Label><input required className={inp} placeholder="Rahul Verma" {...f("name")} /></div>
          <div><Label>Username (login ke liye)</Label><input required className={inp} placeholder="rahul" {...f("username")} /></div>
          <div><Label>Temporary Password (min 6)</Label><input required minLength={6} className={inp} placeholder="••••••" {...f("password")} /></div>
          <div><Label>GitHub Username (commits match karne ke liye)</Label><input className={inp} placeholder="rahul-dev" {...f("githubUsername")} /></div>
          <div><Label>Designation</Label><input className={inp} placeholder="IoT Engineer" {...f("designation")} /></div>
        </div>
        <Err>{err}</Err>
        <button className={btnPrimary}>+ Create Employee</button>
      </form>

      <div className="space-y-3">
        {users.map((u) => (
          <div key={u.id} className={`${card} p-4 flex flex-wrap items-center gap-4 ${u.active ? "" : "opacity-50"}`}>
            <Avatar name={u.name} size={10} />
            <div className="flex-1 min-w-[160px]">
              <p className="text-sm font-bold text-white">
                {u.name}{" "}
                {u.role === "admin" && <Badge className="bg-purple-500/15 text-purple-300 border-purple-400/20">Admin</Badge>}
                {!u.active && <Badge className="bg-rose-500/15 text-rose-300 border-rose-400/20">Inactive</Badge>}
              </p>
              <p className="text-[11px] text-slate-400">
                @{u.username} · {u.designation || "—"} · GitHub: {u.githubUsername || "not set"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className={btnGhost} onClick={() => { const g = prompt("GitHub username:", u.githubUsername || ""); if (g !== null) patch(u.id, { githubUsername: g }); }}>
                Edit GitHub
              </button>
              <button className={btnGhost} onClick={() => setResetFor(u)}><KeyRound className="w-3.5 h-3.5" /> Reset Password</button>
              {u.id !== me.id && (
                <>
                  <button className={btnGhost} onClick={() => patch(u.id, { active: !u.active })}>{u.active ? "Deactivate" : "Activate"}</button>
                  {u.role !== "admin" && <button className={btnDanger} onClick={() => remove(u)}><Trash2 className="w-3.5 h-3.5" /></button>}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {resetFor && (
        <Modal title={`Reset password: ${resetFor.name}`} onClose={() => setResetFor(null)}>
          <form onSubmit={doReset} className="space-y-4">
            <div><Label>New Password (min 6)</Label><input required minLength={6} className={inp} value={newPw} onChange={(e) => setNewPw(e.target.value)} /></div>
            <Err>{pwErr}</Err>
            <p className="text-[11px] text-slate-500">User purane devices se logout ho jayega aur login ke baad password badalne ko kaha jayega.</p>
            <button className={btnPrimary}>Set Password</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
