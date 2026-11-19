"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, HandCoins, ArrowLeft, CheckCircle, IndianRupee, Send } from "lucide-react";

const inp =
  "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:border-cyan-400 outline-none";

async function post(url, body) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

const RATE_TYPE = { fixed: "fixed", hourly: "/ hour", monthly: "/ month" };

// Remote Work link par click -> "Kaam dena hai ya kaam chahiye?"
export default function RemoteWorkModal({ open, onClose }) {
  return <AnimatePresence>{open && <Panel key="remote" onClose={onClose} />}</AnimatePresence>;
}

function Panel({ onClose }) {
  const [step, setStep] = useState("choose"); // choose | give | find | apply | done
  const [jobs, setJobs] = useState(null);
  const [job, setJob] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [give, setGive] = useState({ name: "", contact: "", title: "", description: "", budget: "" });
  const [apply, setApply] = useState({ name: "", contact: "", skills: "", link: "", message: "" });

  const openFind = async () => {
    setStep("find");
    setJobs(null);
    try {
      const res = await fetch("/api/remote/jobs", { cache: "no-store" });
      const d = await res.json();
      setJobs(d.jobs || []);
    } catch {
      setJobs([]);
    }
  };

  const submitGive = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const { ok, data } = await post("/api/remote/requests", give);
    setBusy(false);
    if (!ok) return setErr(data.error || "Send nahi hua, dobara try karein");
    setGive({ name: "", contact: "", title: "", description: "", budget: "" });
    setStep("done");
  };

  const submitApply = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const { ok, data } = await post("/api/remote/applications", { ...apply, jobId: job?.id, jobTitle: job?.title });
    setBusy(false);
    if (!ok) return setErr(data.error || "Send nahi hua, dobara try karein");
    setApply({ name: "", contact: "", skills: "", link: "", message: "" });
    setStep("done");
  };

  const back = () => {
    setErr("");
    setStep(step === "apply" ? "find" : "choose");
  };

  return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0b1021] border border-white/15 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400">
              <X className="w-5 h-5" />
            </button>

            {step !== "choose" && step !== "done" && (
              <button onClick={back} className="mb-4 text-xs text-slate-400 hover:text-cyan-400 inline-flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            )}

            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">NEXWORKTECH REMOTE WORK</span>

            {step === "choose" && (
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1 mb-2">Aapko kya chahiye?</h3>
                <p className="text-xs text-slate-400 mb-6">Kya aap humein kaam dena chahte hain, ya aapko kaam chahiye?</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setStep("give")}
                    className="text-left p-6 rounded-2xl bg-gradient-to-b from-cyan-500/15 to-transparent border border-cyan-400/30 hover:border-cyan-400 transition-all"
                  >
                    <HandCoins className="w-8 h-8 text-cyan-400 mb-3" />
                    <p className="text-lg font-bold text-white">Mujhe kaam dena hai</p>
                    <p className="text-xs text-slate-400 mt-1">Apna project / kaam bhejein. Admin seedha aapse contact karega.</p>
                  </button>
                  <button
                    onClick={openFind}
                    className="text-left p-6 rounded-2xl bg-gradient-to-b from-emerald-500/15 to-transparent border border-emerald-400/30 hover:border-emerald-400 transition-all"
                  >
                    <Briefcase className="w-8 h-8 text-emerald-400 mb-3" />
                    <p className="text-lg font-bold text-white">Mujhe kaam chahiye</p>
                    <p className="text-xs text-slate-400 mt-1">Admin ke diye kaam dekhein — rate aur description ke saath — aur interest dikhayein.</p>
                  </button>
                </div>
              </div>
            )}

            {step === "give" && (
              <form onSubmit={submitGive} className="space-y-4">
                <h3 className="text-2xl font-bold text-white mt-1">Apna kaam bhejein</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required className={inp} placeholder="Aapka naam *" value={give.name} onChange={(e) => setGive({ ...give, name: e.target.value })} />
                  <input required className={inp} placeholder="Phone / WhatsApp / Email *" value={give.contact} onChange={(e) => setGive({ ...give, contact: e.target.value })} />
                </div>
                <input required className={inp} placeholder="Kaam ka title (jaise: WhatsApp AI bot banana) *" value={give.title} onChange={(e) => setGive({ ...give, title: e.target.value })} />
                <textarea required rows={4} className={inp} placeholder="Kaam ki detail *" value={give.description} onChange={(e) => setGive({ ...give, description: e.target.value })} />
                <input className={inp} placeholder="Budget (optional)" value={give.budget} onChange={(e) => setGive({ ...give, budget: e.target.value })} />
                {err && <p className="text-xs text-rose-400">{err}</p>}
                <button disabled={busy} className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-sm disabled:opacity-60 inline-flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> {busy ? "Bhej rahe hain..." : "Admin ko bhejein"}
                </button>
              </form>
            )}

            {step === "find" && (
              <div>
                <h3 className="text-2xl font-bold text-white mt-1 mb-4">Available kaam</h3>
                {jobs === null && <p className="text-sm text-slate-400">Loading...</p>}
                {jobs && jobs.length === 0 && (
                  <p className="text-sm text-slate-400 py-8 text-center">Abhi koi kaam open nahi hai. Thodi der baad dekhein.</p>
                )}
                <div className="space-y-3">
                  {jobs?.map((j) => (
                    <div key={j.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h4 className="text-base font-bold text-white">{j.title}</h4>
                        {j.rate && (
                          <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold inline-flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" />
                            {j.rate.replace(/^₹\s*/, "")} <span className="font-normal text-emerald-400/80">{RATE_TYPE[j.rateType]}</span>
                          </span>
                        )}
                      </div>
                      {j.description && <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{j.description}</p>}
                      {j.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {j.skills.map((s) => (
                            <span key={s} className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300">{s}</span>
                          ))}
                        </div>
                      )}
                      <button
                        onClick={() => { setJob(j); setStep("apply"); }}
                        className="px-5 py-2 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs"
                      >
                        Mujhe interest hai
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === "apply" && job && (
              <form onSubmit={submitApply} className="space-y-4">
                <h3 className="text-2xl font-bold text-white mt-1">Apni detail bhejein</h3>
                <p className="text-xs text-cyan-300">Kaam: {job.title}{job.rate ? ` · ${job.rate} ${RATE_TYPE[job.rateType]}` : ""}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required className={inp} placeholder="Aapka naam *" value={apply.name} onChange={(e) => setApply({ ...apply, name: e.target.value })} />
                  <input required className={inp} placeholder="Phone / WhatsApp / Email *" value={apply.contact} onChange={(e) => setApply({ ...apply, contact: e.target.value })} />
                </div>
                <input className={inp} placeholder="Aapki skills (jaise: ESP32, Python, n8n)" value={apply.skills} onChange={(e) => setApply({ ...apply, skills: e.target.value })} />
                <input className={inp} placeholder="Portfolio / GitHub / LinkedIn link (optional)" value={apply.link} onChange={(e) => setApply({ ...apply, link: e.target.value })} />
                <textarea rows={3} className={inp} placeholder="Apne baare mein kuch likhein (experience, kitna time de sakte hain)" value={apply.message} onChange={(e) => setApply({ ...apply, message: e.target.value })} />
                {err && <p className="text-xs text-rose-400">{err}</p>}
                <button disabled={busy} className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-bold text-sm disabled:opacity-60 inline-flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> {busy ? "Bhej rahe hain..." : "Admin se connect karein"}
                </button>
              </form>
            )}

            {step === "done" && (
              <div className="py-12 text-center space-y-3">
                <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-bold text-white">Bhej diya gaya!</h4>
                <p className="text-xs text-slate-400">Admin aapse jald hi contact karega.</p>
                <button onClick={onClose} className="mt-2 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white">Close</button>
              </div>
            )}
          </motion.div>
        </motion.div>
  );
}
