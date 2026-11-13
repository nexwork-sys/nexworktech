"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LogOut, Lock, ArrowLeft, LayoutDashboard, FolderKanban, Users, ListChecks, KeyRound } from "lucide-react";
import { api, card, inp, btnPrimary, btnGhost, Err } from "@/components/team/ui";
import Overview from "@/components/team/Overview";
import Projects from "@/components/team/Projects";
import ProjectDetail from "@/components/team/ProjectDetail";
import Employees from "@/components/team/Employees";
import MyWork from "@/components/team/MyWork";
import Account from "@/components/team/Account";

export default function TeamPage() {
  const [user, setUser] = useState(undefined); // undefined = loading, null = logged out
  const [tab, setTab] = useState(null);
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    api("/api/auth/me").then((d) => setUser(d.user)).catch(() => setUser(null));
  }, []);

  if (user === undefined) return <Shell><p className="text-sm text-slate-400 text-center mt-32">Loading...</p></Shell>;
  if (!user) return <Shell><Login onLogin={setUser} /></Shell>;

  const isAdmin = user.role === "admin";
  const tabs = isAdmin
    ? [["overview", "Overview", LayoutDashboard], ["projects", "Projects", FolderKanban], ["employees", "Employees", Users], ["my", "My Tasks", ListChecks], ["account", "Account", KeyRound]]
    : [["my", "My Work", ListChecks], ["projects", "My Projects", FolderKanban], ["account", "Account", KeyRound]];
  const current = tab || tabs[0][0];

  const openProject = (id) => { setProjectId(id); setTab("projects"); };
  const logout = async () => { await api("/api/auth/logout", "POST").catch(() => {}); setUser(null); setTab(null); setProjectId(null); };

  return (
    <Shell>
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#050811]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-slate-400 hover:text-cyan-400" title="Website"><ArrowLeft className="w-4 h-4" /></Link>
            <div>
              <p className="text-sm font-black tracking-widest text-white">NEXWORK<span className="text-cyan-400">TECH</span></p>
              <p className="text-[10px] text-slate-500 -mt-0.5">TEAM WORKSPACE</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-slate-300">{user.name} · <span className="text-cyan-400">{user.role}</span></span>
            <button onClick={logout} className={btnGhost}><LogOut className="w-3.5 h-3.5" /> Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {user.mustChangePassword && (
          <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-400/30 text-xs text-amber-300 flex flex-wrap items-center justify-between gap-2">
            <span>⚠ Aap temporary/default password use kar rahe hain. Apna password badal lein.</span>
            <button onClick={() => { setTab("account"); setProjectId(null); }} className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold">Change Now</button>
          </div>
        )}

        <nav className="flex flex-wrap gap-2">
          {tabs.map(([k, label, Icon]) => (
            <button key={k} onClick={() => { setTab(k); setProjectId(null); }} className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${current === k ? "bg-cyan-400 text-slate-950" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}>
              <Icon className="w-3.5 h-3.5" /> {label}
            </button>
          ))}
        </nav>

        {current === "overview" && <Overview openProject={openProject} />}
        {current === "projects" && (projectId
          ? <ProjectDetail id={projectId} user={user} onBack={() => setProjectId(null)} />
          : <Projects user={user} openProject={setProjectId} />)}
        {current === "employees" && <Employees me={user} />}
        {current === "my" && <MyWork openProject={openProject} />}
        {current === "account" && <Account user={user} onUser={setUser} />}
      </main>
    </Shell>
  );
}

function Shell({ children }) {
  return <div className="min-h-screen bg-[#050811] text-slate-100 selection:bg-cyan-500 selection:text-black">{children}</div>;
}

function Login({ onLogin }) {
  const [f, setF] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr("");
    try { const d = await api("/api/auth/login", "POST", f); onLogin(d.user); } catch (e2) { setErr(e2.message); }
    setBusy(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={submit} className={`${card} bg-[#0b1021] w-full max-w-sm p-8 text-center space-y-4`}>
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mx-auto text-cyan-400"><Lock className="w-6 h-6" /></div>
        <div>
          <h1 className="text-2xl font-bold text-white">Team Workspace</h1>
          <p className="text-xs text-slate-400 mt-1">NEXWORKTECH employees & admin login</p>
        </div>
        <input className={`${inp} text-center`} placeholder="Username" autoComplete="username" value={f.username} onChange={(e) => setF({ ...f, username: e.target.value })} />
        <input type="password" className={`${inp} text-center`} placeholder="Password" autoComplete="current-password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
        <Err>{err}</Err>
        <button disabled={busy} className={`${btnPrimary} w-full py-3`}>{busy ? "Checking..." : "Login"}</button>
        <p className="text-[11px] text-slate-500">Admin password bhool gaye? Website ke Admin Login se reset karein.</p>
      </form>
    </div>
  );
}
