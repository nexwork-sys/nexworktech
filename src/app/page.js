"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Mail,
  Phone,
  User,
  Lock,
  LogOut,
  Trash2,
  CheckCircle,
  X,
  Edit2,
  ChevronRight,
  Globe,
  Send,
  MessageSquare,
  ExternalLink,
  Home,
  Lightbulb,
  Fan,
  ShieldCheck,
  Wifi,
  Star,
  Quote,
  Award,
  Terminal,
  KeyRound,
  Users,
} from "lucide-react";
import { DEFAULT_GALLERY, DEFAULT_OWNER, DEFAULT_REVIEWS } from "@/lib/defaults";

// --- HERO BACKGROUND SLIDES (PCB / IoT / Automation / AI) ---
// Files public/hero/ me hain. Real photo lagani ho to usi naam se replace kar do.
const HERO_BG_SLIDES = [
  { id: "pcb-bg", label: "PCB Designing", image: "/hero/pcb-layout.svg" },
  { id: "iot-bg", label: "IoT Development", image: "/hero/iot-network.svg" },
  { id: "auto-bg", label: "Automation Flows", image: "/hero/automation-flow.svg" },
  { id: "ai-bg", label: "AI Automation", image: "/hero/ai-neural.svg" },
  { id: "home-bg", label: "Smart Home", image: "/hero/smart-home.svg" },
];

// --- SOCIAL LINKS (apne real links yaha daalo) ---
const INSTAGRAM_URL = "https://www.instagram.com/";
const YOUTUBE_URL = "https://www.youtube.com/";

// --- REAL PROJECTS (Nexwork Tech ne banaye) ---
const REAL_PROJECTS = [
  {
    name: "XOScrap",
    tag: "Web App • Scrap Pickup Platform",
    url: "https://www.xoscrap.com",
    desc: "Ghar baithe scrap bechne ka platform — live rates, doorstep pickup request form aur admin panel. Varanasi me live.",
    images: [
      "https://www.xoscrap.com/images/a.jpeg",
      "https://www.xoscrap.com/images/b.jpeg",
      "https://www.xoscrap.com/images/c.jpeg",
    ],
    stats: ["26+ Live Rate Items", "Admin Panel", "Pickup Requests"],
  },
  {
    name: "The Little Moon Academy",
    tag: "School Website + ERP",
    url: "https://www.thelittlemoonacademy.com",
    desc: "Nursery se Class VIII school ki website — toppers, events, admission inquiry aur student/teacher ERP login.",
    images: [
      "https://thelittlemoonacademy.com/_next/image?url=%2Flogo.png&w=256&q=75",
      "https://thelittlemoonacademy.com/activities/science-1.svg",
      "https://thelittlemoonacademy.com/activities/sports-1.svg",
    ],
    stats: ["Student ERP", "Toppers & Events", "Admission Inquiry"],
  },
];

function InstagramIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 8.2a3 3 0 0 0-2.1-2.1C18.1 5.6 12 5.6 12 5.6s-6.1 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.8.5 7.9.5 7.9.5s6.1 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8Z" />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const BOT_LIVE_URL = "https://nexworktech-iot.onrender.com/connect.html";

// --- CUSTOM PCB-TEXTURED LETTER 'X' COMPONENT ---
function PcbTexturedX({ uid = "hero", compact = false }) {
  const xShapePath =
    "M4 4 H26 L42 27 L58 4 H80 L54 38 L81 72 H59 L42 48 L25 72 H3 L30 38 L4 4 Z";

  return (
    <span
      className={`relative inline-flex items-center justify-center select-none ${
        compact ? "mx-[1px]" : "mx-[0.02em]"
      }`}
    >
      {!compact && (
        <span className="absolute inset-0 bg-emerald-400/25 blur-xl rounded-full pointer-events-none" />
      )}

      <svg
        viewBox="0 0 84 76"
        className={
          compact
            ? "w-[0.88em] h-[0.78em] overflow-visible drop-shadow-[0_2px_6px_rgba(16,185,129,0.5)]"
            : "w-[0.82em] h-[0.74em] overflow-visible drop-shadow-[0_6px_16px_rgba(16,185,129,0.45)]"
        }
        fill="none"
        aria-label="X"
      >
        <defs>
          <clipPath id={`nexwork-pcb-x-clip-${uid}`}>
            <path d={xShapePath} />
          </clipPath>
          <linearGradient
            id={`pcb-solder-mask-${uid}`}
            x1="0"
            y1="0"
            x2="84"
            y2="76"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#065f46" />
            <stop offset="50%" stopColor="#047857" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>
        </defs>

        <g clipPath={`url(#nexwork-pcb-x-clip-${uid})`}>
          <rect
            x="0"
            y="0"
            width="84"
            height="76"
            fill={`url(#pcb-solder-mask-${uid})`}
          />

          <path
            d="M0 12H84M0 24H84M0 36H84M0 48H84M0 60H84M14 0V76M28 0V76M42 0V76M56 0V76M70 0V76"
            stroke="#10b981"
            strokeOpacity="0.2"
            strokeWidth="0.9"
          />

          <path
            d="M11 6 L34 36 L10 69"
            stroke="#34d399"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 6 L38 32 H46 L66 6"
            stroke="#fbbf24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M73 7 L49 38 L74 70"
            stroke="#34d399"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 70 L38 44 H46 L67 70"
            stroke="#fbbf24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <motion.path
            d="M14 6 L42 38 L70 70"
            stroke="#67e8f9"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="14 90"
            animate={{ strokeDashoffset: [104, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          />

          {[
            [14, 11],
            [69, 11],
            [23, 21],
            [61, 21],
            [22, 55],
            [62, 55],
            [13, 66],
            [70, 66],
          ].map(([cx, cy], idx) => (
            <g key={idx}>
              <circle cx={cx} cy={cy} r="2.8" fill="#fbbf24" />
              <circle cx={cx} cy={cy} r="1.1" fill="#022c22" />
            </g>
          ))}

          <rect
            x="35"
            y="31"
            width="14"
            height="14"
            rx="2"
            fill="#090d16"
            stroke="#fbbf24"
            strokeWidth="1.3"
          />
          <circle cx="38.5" cy="34.5" r="1.1" fill="#34d399" />
          <path
            d="M38 28.5V31M42 28.5V31M46 28.5V31M38 45V47.5M42 45V47.5M46 45V47.5"
            stroke="#fbbf24"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>

        <path
          d={xShapePath}
          stroke="#34d399"
          strokeWidth={compact ? "2.4" : "1.8"}
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

// --- CUTE WAVING AI BOT COMPONENT ---
function CuteWavingBot({ compact = false }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: compact ? 6 : 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{
        delay: compact ? 0.3 : 0.95,
        type: "spring",
        stiffness: 260,
        damping: 16,
      }}
      className={`relative inline-flex items-center align-middle select-none ${
        compact ? "ml-1.5" : "ml-2 sm:ml-4"
      }`}
    >
      {!compact && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
          transition={{
            opacity: { delay: 1.25, duration: 0.3 },
            scale: { delay: 1.25, type: "spring" },
            y: { delay: 1.3, duration: 1.8, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute -top-7 right-0 sm:-top-8 sm:-right-2 px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-black text-[10px] sm:text-xs tracking-wide shadow-lg shadow-cyan-400/40"
        >
          Hi!
        </motion.div>
      )}

      <motion.svg
        viewBox="0 0 80 80"
        className={
          compact
            ? "w-6 h-6 drop-shadow-[0_3px_8px_rgba(34,211,238,0.4)]"
            : "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 drop-shadow-[0_10px_20px_rgba(34,211,238,0.35)]"
        }
        fill="none"
        animate={{ y: [0, compact ? -1.5 : -3, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <line
          x1="40"
          y1="8"
          x2="40"
          y2="18"
          stroke="#38bdf8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <motion.circle
          cx="40"
          cy="7"
          r="4"
          fill="#22d3ee"
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        <rect
          x="18"
          y="18"
          width="44"
          height="32"
          rx="12"
          fill="#f8fafc"
          stroke="#38bdf8"
          strokeWidth="2.5"
        />
        <rect x="12" y="28" width="5" height="12" rx="2.5" fill="#0284c7" />
        <rect x="63" y="28" width="5" height="12" rx="2.5" fill="#0284c7" />

        <rect x="23" y="23" width="34" height="22" rx="8" fill="#090d16" />

        <motion.ellipse
          cx="33"
          cy="33"
          rx="3.2"
          ry="3.8"
          fill="#22d3ee"
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.48, 0.5, 0.52, 1] }}
        />
        <motion.ellipse
          cx="47"
          cy="33"
          rx="3.2"
          ry="3.8"
          fill="#22d3ee"
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.48, 0.5, 0.52, 1] }}
        />
        <path
          d="M36 39C37.5 41 42.5 41 44 39"
          stroke="#34d399"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <rect
          x="25"
          y="52"
          width="30"
          height="18"
          rx="8"
          fill="#e2e8f0"
          stroke="#38bdf8"
          strokeWidth="2"
        />
        <circle cx="40" cy="61" r="3.5" fill="#22d3ee" />

        <path
          d="M23 56C17 58 16 64 19 67"
          stroke="#94a3b8"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        <motion.g
          style={{ originX: "57px", originY: "56px" }}
          animate={{ rotate: [0, -35, 10, -35, 10, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            repeatDelay: 0.6,
            ease: "easeInOut",
          }}
        >
          <path
            d="M57 56C64 52 68 44 66 37"
            stroke="#38bdf8"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <circle cx="66" cy="36" r="3.5" fill="#22d3ee" />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
}

// --- REUSABLE BRAND WORDMARK ---
function NexworkBrandWordmark({ compact = false, animateLetters = true }) {
  const brandLetters = ["N", "E", "X", "W", "O", "R", "K", "T", "E", "C", "H"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: compact ? 0.03 : 0.055,
        delayChildren: compact ? 0.05 : 0.12,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: compact ? 10 : 45,
      scale: compact ? 0.75 : 0.55,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 18,
      },
    },
  };

  return (
    <motion.span
      variants={animateLetters ? containerVariants : undefined}
      initial={animateLetters ? "hidden" : undefined}
      animate={animateLetters ? "visible" : undefined}
      className={
        compact
          ? "inline-flex items-center text-base sm:text-lg font-black tracking-wide leading-none"
          : "inline-flex items-center justify-center flex-wrap sm:flex-nowrap text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none drop-shadow-[0_8px_30px_rgba(0,0,0,0.85)]"
      }
    >
      {brandLetters.map((char, index) => {
        if (char === "X") {
          return (
            <motion.span
              key={index}
              variants={animateLetters ? letterVariants : undefined}
              whileHover={compact ? undefined : { y: -6, scale: 1.1 }}
              className="inline-flex items-center justify-center cursor-default"
            >
              <PcbTexturedX uid={compact ? "navbar" : "hero"} compact={compact} />
            </motion.span>
          );
        }

        return (
          <motion.span
            key={index}
            variants={animateLetters ? letterVariants : undefined}
            whileHover={compact ? undefined : { y: -6, scale: 1.08 }}
            className={`relative inline-block cursor-default ${
              index === 7 ? (compact ? "ml-2" : "ml-4 sm:ml-6 md:ml-8") : ""
            } ${
              index >= 7
                ? "bg-gradient-to-b from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
                : "bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent"
            }`}
          >
            {char}
          </motion.span>
        );
      })}

      <CuteWavingBot compact={compact} />
    </motion.span>
  );
}

export default function NexworkTechWebsite() {
  const [gallery, setGallery] = useState(DEFAULT_GALLERY);
  const [owner, setOwner] = useState(DEFAULT_OWNER);
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);
  const [enquiries, setEnquiries] = useState([]);

  // 4-Photo Hero Background Slideshow State
  const [bgIndex, setBgIndex] = useState(0);

  // Live IoT Bot Interactive Preview Toggle
  const [showBotIframe, setShowBotIframe] = useState(false);

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isOwnerOpen, setIsOwnerOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminUser, setAdminUser] = useState(null);
  const [year, setYear] = useState(2026);
  const [loginBusy, setLoginBusy] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotForm, setForgotForm] = useState({ recoveryKey: "", newPassword: "" });
  const [forgotMsg, setForgotMsg] = useState({ type: "", text: "" });
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState({ type: "", text: "" });
  const [ownerMsg, setOwnerMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeAdminTab, setActiveAdminTab] = useState("enquiries");

  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    contact: "",
    service: "AI Automation",
    message: "",
  });
  const [enquirySent, setEnquirySent] = useState(false);

  // Public Review Submission Form State
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    rating: 5,
    service: "IoT Home Control Bot",
    comment: "",
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [adminReviewNotice, setAdminReviewNotice] = useState("");

  const [newPic, setNewPic] = useState({
    title: "",
    category: "AI Automation",
    description: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Auto-change Hero Background across 4 work-related photos every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % HERO_BG_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // ---------- API helper ----------
  const call = async (url, method = "GET", body) => {
    const res = await fetch(url, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  };

  const loadSite = async () => {
    try {
      const { ok, data } = await call("/api/site");
      if (!ok) return;
      setGallery(data.gallery);
      setOwner(data.owner?.name === "Ayaan Ahmad" ? DEFAULT_OWNER : data.owner);
      setReviews(data.reviews);
    } catch {}
  };

  const loadAdminData = async () => {
    try {
      const [e, r] = await Promise.all([call("/api/enquiries"), call("/api/reviews")]);
      if (e.ok) setEnquiries(e.data.enquiries);
      if (r.ok) setReviews(r.data.reviews);
    } catch {}
  };

  useEffect(() => {
    Promise.resolve().then(() => setYear(new Date().getFullYear()));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSite();
    call("/api/auth/me")
      .then(({ data }) => {
        if (data.user?.role === "admin") {
          setIsAdminLoggedIn(true);
          setAdminUser(data.user);
          loadAdminData();
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Owner fields type karte waqt local update; "Save" dabane par DB mein jaata hai
  const [ownerDirty, setOwnerDirty] = useState(false);
  const saveOwner = (updated) => {
    setOwner(updated);
    setOwnerDirty(true);
    setOwnerMsg("");
  };
  const persistOwner = async (data = owner) => {
    const { ok, data: d } = await call("/api/owner", "PUT", data);
    if (ok) {
      setOwner(d.owner);
      setOwnerDirty(false);
      setOwnerMsg("✓ Saved to database!");
    } else {
      setOwnerMsg(d.error || "Save nahi hua");
    }
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.contact || !enquiryForm.message) return;

    const { ok, data } = await call("/api/enquiries", "POST", enquiryForm);
    if (!ok) {
      alert(data.error || "Enquiry send nahi hui, dobara try karein");
      return;
    }
    setEnquirySent(true);

    setTimeout(() => {
      setEnquirySent(false);
      setIsEnquiryOpen(false);
      setEnquiryForm({ name: "", contact: "", service: "AI Automation", message: "" });
    }, 1800);
  };

  // Visitor submits a new review (admin approve karega)
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.email || !reviewForm.comment) return;

    const { ok, data } = await call("/api/reviews", "POST", reviewForm);
    if (!ok) {
      alert(data.error || "Review submit nahi hua, dobara try karein");
      return;
    }
    setReviewSubmitted(true);
    setReviewForm({
      name: "",
      email: "",
      rating: 5,
      service: "IoT Home Control Bot",
      comment: "",
    });
    if (isAdminLoggedIn) loadAdminData();

    setTimeout(() => {
      setReviewSubmitted(false);
    }, 4000);
  };

  // Admin toggles featured status (Max 3 reviews featured on website)
  const handleToggleFeatureReview = async (id) => {
    const target = reviews.find((r) => r.id === id);
    if (!target) return;

    const { ok, data } = await call(`/api/reviews/${id}`, "PATCH", { featured: !target.featured });
    if (!ok) {
      setAdminReviewNotice(data.error || "Update nahi hua");
      setTimeout(() => setAdminReviewNotice(""), 4000);
      return;
    }
    setAdminReviewNotice("");
    setReviews(reviews.map((r) => (r.id === id ? { ...r, featured: data.review.featured } : r)));
  };

  const handleDeleteReview = async (id) => {
    const { ok } = await call(`/api/reviews/${id}`, "DELETE");
    if (ok) setReviews(reviews.filter((r) => r.id !== id));
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginBusy(true);
    const { ok, data } = await call("/api/auth/login", "POST", { username: "admin", password: adminPassword });
    setLoginBusy(false);
    if (ok && data.user?.role === "admin") {
      setIsAdminLoggedIn(true);
      setAdminUser(data.user);
      setLoginError("");
      setAdminPassword("");
      loadAdminData();
    } else {
      setLoginError(data.error || "Incorrect Password!");
    }
  };

  const handleAdminLogout = async () => {
    await call("/api/auth/logout", "POST");
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    setEnquiries([]);
    loadSite(); // public view (sirf featured reviews)
  };

  const handleForgotReset = async (e) => {
    e.preventDefault();
    const { ok, data } = await call("/api/auth/reset", "POST", forgotForm);
    if (ok) {
      setForgotMsg({ type: "ok", text: "Password reset ho gaya! Ab naye password se login karein." });
      setForgotForm({ recoveryKey: "", newPassword: "" });
      setTimeout(() => {
        setShowForgot(false);
        setForgotMsg({ type: "", text: "" });
      }, 2500);
    } else {
      setForgotMsg({ type: "err", text: data.error || "Reset fail" });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwForm.next !== pwForm.confirm) {
      setPwMsg({ type: "err", text: "Naya password aur confirm password match nahi kar rahe" });
      return;
    }
    const { ok, data } = await call("/api/auth/change-password", "POST", {
      current: pwForm.current,
      next: pwForm.next,
    });
    if (ok) {
      setPwMsg({ type: "ok", text: "✓ Password badal gaya! Baaki devices se logout ho gaye." });
      setPwForm({ current: "", next: "", confirm: "" });
      setAdminUser(data.user);
    } else {
      setPwMsg({ type: "err", text: data.error || "Password change nahi hua" });
    }
  };

  const handleFileUpload = async (e, target) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("folder", target);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload fail");
      if (target === "gallery") {
        setNewPic((prev) => ({ ...prev, image: data.url }));
      } else if (target === "owner") {
        const updated = { ...owner, photo: data.url };
        setOwner(updated);
        await persistOwner(updated);
      }
    } catch (err) {
      alert(err.message);
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleSaveGalleryItem = async (e) => {
    e.preventDefault();
    if (!newPic.title || !newPic.image) return;

    if (editingId) {
      const { ok, data } = await call(`/api/gallery/${editingId}`, "PUT", newPic);
      if (!ok) return alert(data.error || "Update nahi hua");
      setGallery(gallery.map((item) => (item.id === editingId ? data.item : item)));
      setEditingId(null);
    } else {
      const { ok, data } = await call("/api/gallery", "POST", newPic);
      if (!ok) return alert(data.error || "Upload nahi hua");
      setGallery([data.item, ...gallery]);
    }
    setNewPic({ title: "", category: "AI Automation", description: "", image: "" });
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setNewPic({
      title: item.title,
      category: item.category,
      description: item.description,
      image: item.image,
    });
  };

  const handleDeleteGalleryItem = async (id) => {
    const { ok } = await call(`/api/gallery/${id}`, "DELETE");
    if (ok) setGallery(gallery.filter((item) => item.id !== id));
  };

  const handleDeleteEnquiry = async (id) => {
    const { ok } = await call(`/api/enquiries/${id}`, "DELETE");
    if (ok) setEnquiries(enquiries.filter((item) => item.id !== id));
  };

  const services = [
    {
      icon: <Bot className="w-8 h-8 text-cyan-400" />,
      tag: "01 / INTELLIGENCE",
      title: "AI Automation",
      desc: "Custom AI agents, intelligent workflow automation, WhatsApp/Instagram chatbots, CRM pipelines, aur business processes ko 10x fast banane ke liye smart AI solutions.",
      features: [
        "Custom LLM Agents & Chatbots",
        "Workflow & Process Automation",
        "Predictive Data Analytics",
      ],
      gradient: "from-cyan-500/20 via-blue-500/5 to-transparent",
    },
    {
      icon: <Cpu className="w-8 h-8 text-emerald-400" />,
      tag: "02 / CONNECTIVITY",
      title: "IoT Development",
      desc: "Smart sensors, microcontrollers (ESP32, Arduino, Raspberry Pi), cloud dashboards, aur real-time hardware-to-cloud communication systems ki end-to-end engineering.",
      features: [
        "Smart Home & Industrial IoT",
        "Real-Time Cloud Dashboards",
        "Embedded Firmware Coding",
      ],
      gradient: "from-emerald-500/20 via-teal-500/5 to-transparent",
    },
    {
      icon: <Layers className="w-8 h-8 text-purple-400" />,
      tag: "03 / HARDWARE",
      title: "PCB Designing",
      desc: "Schematic capture se lekar multi-layer PCB layout, signal integrity, BOM optimization, aur manufacturing-ready Gerber files tak complete hardware design.",
      features: [
        "Multi-Layer PCB Layout",
        "Schematic & Component Selection",
        "Gerber & Prototype Testing",
      ],
      gradient: "from-purple-500/20 via-indigo-500/5 to-transparent",
    },
  ];

  // Top 3 Admin-Selected Reviews to display prominently above Footer
  const featuredReviews = reviews.filter((r) => r.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* NAVBAR WITH COMPACT PCB-X & MINI BOT LOGO */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-[#050811]/75 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black text-black text-lg shadow-lg shadow-cyan-500/25 shrink-0">
              N
            </div>
            <div>
              <NexworkBrandWordmark compact={true} animateLetters={true} />
              <span className="block text-[9px] tracking-[0.25em] text-cyan-400 uppercase mt-0.5">
                AI • IoT • PCB Lab
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-sm text-slate-300">
            <a href="#services" className="hover:text-cyan-400 transition-colors">
              Services
            </a>
            <a
              href="#live-bot"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-medium text-emerald-300"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Test Live Bot
            </a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">
              Projects
            </a>
            <a href="#showcase" className="hover:text-cyan-400 transition-colors">
              Showcase
            </a>
            <a href="#reviews" className="hover:text-cyan-400 transition-colors">
              Reviews
            </a>
            <a href="#footer" className="hover:text-cyan-400 transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setIsOwnerOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs sm:text-sm font-medium transition-all"
            >
              <User className="w-4 h-4 text-cyan-400" />
              <span>Owner</span>
            </button>

            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 hover:scale-105 transition-transform"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquiry Now</span>
            </button>
          </div>
        </div>
      </header>

      {/* FLOATING RIGHT-SIDE OWNER TRIGGER TAB */}
      <button
        onClick={() => setIsOwnerOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-30 bg-slate-900/90 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 border-l border-t border-b border-white/15 py-4 px-2.5 rounded-l-2xl shadow-2xl transition-all flex flex-col items-center gap-2 group"
        title="View Owner Profile"
      >
        <User className="w-4 h-4" />
        <span className="text-[10px] font-bold tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
          Owner Info
        </span>
      </button>

      {/* ================= HERO SECTION WITH 4 AUTO-CHANGING BACKGROUND PHOTOS ================= */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-28 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            <motion.img
              key={HERO_BG_SLIDES[bgIndex].id}
              src={HERO_BG_SLIDES[bgIndex].image}
              alt={HERO_BG_SLIDES[bgIndex].label}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 0.85, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-b from-[#050811]/70 via-[#050811]/35 to-[#050811]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,#050811_95%)]" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto my-auto">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#050811]/70 backdrop-blur-md border border-cyan-400/30 text-cyan-300 text-xs font-semibold tracking-wide mb-9 shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5" />
            NEXT-GENERATION SOFTWARE & HARDWARE ENGINEERING
          </motion.div>

          <div className="flex items-center justify-center mb-7 pt-2">
            <h1>
              <NexworkBrandWordmark compact={false} animateLetters={true} />
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
          >
            Building the future with intelligent{" "}
            <span className="text-cyan-400 font-semibold">AI Automation</span>, connected{" "}
            <span className="text-emerald-400 font-semibold">IoT Ecosystems</span>, and precision{" "}
            <span className="text-purple-400 font-semibold">Multi-Layer PCB Designing</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-sm flex items-center gap-2 hover:bg-cyan-400 transition-colors shadow-2xl"
            >
              Start Your Project <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#live-bot"
              className="px-8 py-4 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 backdrop-blur-md border border-emerald-400/40 text-emerald-300 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Home className="w-4 h-4" /> Test Home Control Bot
            </a>
          </motion.div>
        </div>

        {/* 4-Photo Background Indicator Pills */}
        <div className="relative z-10 mt-14 flex flex-wrap items-center justify-center gap-2.5">
          {HERO_BG_SLIDES.map((slide, idx) => {
            const active = idx === bgIndex;
            return (
              <button
                key={slide.id}
                onClick={() => setBgIndex(idx)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all backdrop-blur-md border ${
                  active
                    ? "bg-cyan-400/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    : "bg-black/40 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {slide.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* CLEAN PILLARS BAR (AI, IoT, PCB) */}
      <section className="px-6 max-w-7xl mx-auto relative z-10 -mt-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
        >
          <div className="text-center p-4">
            <p className="text-3xl sm:text-4xl font-black text-cyan-400">AI</p>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">
              Smart Autonomous Workflows
            </p>
          </div>
          <div className="text-center p-4 border-y sm:border-y-0 sm:border-x border-white/10">
            <p className="text-3xl sm:text-4xl font-black text-emerald-400">IoT</p>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">
              Connected Hardware & Cloud
            </p>
          </div>
          <div className="text-center p-4">
            <p className="text-3xl sm:text-4xl font-black text-purple-400">PCB</p>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">
              Industrial Circuit Design
            </p>
          </div>
        </motion.div>
      </section>

      {/* CORE SERVICES SECTION */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-semibold mb-2">
            WHAT WE ENGINEER
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Core Technological Pillars
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className={`p-8 rounded-3xl bg-gradient-to-b ${srv.gradient} bg-[#0b1021]/90 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    {srv.icon}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 tracking-widest">
                    {srv.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white">{srv.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">{srv.desc}</p>

                <ul className="space-y-2.5 mb-8">
                  {srv.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  setEnquiryForm((prev) => ({ ...prev, service: srv.title }));
                  setIsEnquiryOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-cyan-400 hover:text-slate-950 border border-white/10 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                Enquire for {srv.title} <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= DEDICATED LIVE IOT HOME CONTROL BOT SECTION ================= */}
      <section id="live-bot" className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2.5rem] overflow-hidden border border-emerald-400/30 bg-gradient-to-br from-[#07181c] via-[#0a1224] to-[#08131d] p-8 sm:p-12 shadow-[0_0_60px_rgba(16,185,129,0.12)]"
        >
          {/* Decorative Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-[110px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Side: Description & Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                LIVE INTERACTIVE SANDBOX • TRY IT NOW
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                NEXWORKTECH{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Smart Home IoT Bot
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Yeh hamara live engineered IoT automation bot hai jo poore ghar (Home) ki sabhi devices aur appliances ko real-time mein control karta hai. Aap neeche diye gaye button par click karke ise khud khol kar live test kar sakte hain!
              </p>

              {/* Smart Home Features Controlled by the Bot */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                  <Lightbulb className="w-5 h-5 text-amber-400 mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-white">Smart Lights</p>
                  <p className="text-[10px] text-slate-400">Instant ON/OFF</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                  <Fan className="w-5 h-5 text-cyan-400 mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-white">Fans & AC</p>
                  <p className="text-[10px] text-slate-400">Climate Control</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-white">Home Security</p>
                  <p className="text-[10px] text-slate-400">Smart Locks & Alerts</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                  <Wifi className="w-5 h-5 text-purple-400 mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-white">Cloud Sync</p>
                  <p className="text-[10px] text-slate-400">Zero-Latency IoT</p>
                </div>
              </div>

              {/* Action Buttons: Open Live Bot + Toggle Inline Preview */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={BOT_LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-black text-sm flex items-center gap-2.5 shadow-xl shadow-emerald-500/25 hover:scale-105 transition-transform"
                >
                  <span>Open & Test Live Bot</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setShowBotIframe((prev) => !prev)}
                  className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm flex items-center gap-2 transition-all"
                >
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>{showBotIframe ? "Close Inline Console" : "Test Right Here"}</span>
                </button>
              </div>
            </div>

            {/* Right Side: Interactive Bot Status Terminal Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-[#050914] border border-emerald-400/25 p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono text-slate-400 ml-2">
                      nexworktech-iot.onrender.com
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold">
                    ONLINE
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300">
                    <span className="text-emerald-400 font-bold">&gt; SYSTEM:</span> NEXWORKTECH Home Controller v2.4 Ready
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300">
                    <span className="text-cyan-400 font-bold">&gt; DEVICES:</span> Living Room Lights, Ceiling Fan, Main Gate, Smart Plugs Connected
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-200">
                    <span className="font-bold">&gt; PUBLIC TEST MODE:</span> Click &ldquo;Open &amp; Test Live Bot&rdquo; to interact with the live control panel.
                  </div>
                </div>

                <a
                  href={BOT_LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-400 hover:text-slate-950 border border-emerald-400/30 text-center text-xs font-bold text-emerald-300 transition-all"
                >
                  https://nexworktech-iot.onrender.com/connect.html ↗
                </a>
              </div>
            </div>
          </div>

          {/* Optional Embedded Live Iframe Preview When User Clicks "Test Right Here" */}
          <AnimatePresence>
            {showBotIframe && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-10 pt-8 border-t border-white/15"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-emerald-400">
                    ● Live Embedded Preview — NEXWORKTECH IoT Home Bot
                  </span>
                  <a
                    href={BOT_LIVE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    Open Full Screen <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/15 bg-black h-[520px]">
                  <iframe
                    src={BOT_LIVE_URL}
                    title="NEXWORKTECH Smart Home IoT Bot"
                    className="w-full h-full border-0"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* REAL PROJECTS */}
      <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-semibold mb-2">
            LIVE & DELIVERED
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Our Real Projects</h2>
          <p className="text-sm text-slate-400 mt-3 max-w-xl">
            Ye websites Nexwork Tech ne client ke liye banayi hain aur abhi live chal rahi hain.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {REAL_PROJECTS.map((pr) => (
            <div
              key={pr.name}
              className="rounded-3xl overflow-hidden bg-[#0b1021] border border-white/10 hover:border-cyan-400/40 transition-colors flex flex-col"
            >
              <div className="grid grid-cols-3 gap-1 h-52 bg-slate-900">
                {pr.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${pr.name} ${i + 1}`}
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                    className={`w-full h-full ${
                      i === 0 && pr.name !== "XOScrap" ? "object-contain p-4" : "object-cover"
                    }`}
                  />
                ))}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-xs font-semibold text-cyan-400">{pr.tag}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{pr.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mt-2">{pr.desc}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {pr.stats.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs"
                >
                  Visit Live Site <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <section id="founder" className="py-16 px-6 max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-8 items-center rounded-3xl bg-white/[0.03] border border-white/10 p-8">
          <div className="w-44 h-44 sm:w-52 sm:h-52 mx-auto rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 shadow-xl shadow-cyan-500/20">
            <img src={owner.photo} alt={owner.name} className="w-full h-full object-cover object-top rounded-full bg-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-cyan-400">{owner.role}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">{owner.name}</h2>
            <p className="text-sm text-slate-300 mt-1">{owner.experience}</p>
            <p className="text-sm text-slate-400 leading-relaxed mt-4">{owner.bio}</p>
            <div className="flex flex-wrap gap-2 mt-5">
              {["IoT", "PCB Design", "AI Automation"].map((t) => (
                <span key={t} className="px-3.5 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-xs font-semibold text-cyan-300">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO / GALLERY SECTION */}
      <section id="showcase" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-semibold mb-2">
              LIVE LAB GALLERY
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Featured Projects & Builds
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-xs">
            All photos & project details below can be dynamically updated or uploaded from the Admin Panel.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group rounded-3xl overflow-hidden bg-[#0b1021] border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col"
            >
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-cyan-400">
                  {item.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CLIENT REVIEWS & SUBMIT REVIEW SECTION (RIGHT ABOVE FOOTER) ================= */}
      <section id="reviews" className="py-24 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-bold tracking-widest uppercase mb-4">
            <Award className="w-3.5 h-3.5" /> VERIFIED CLIENT FEEDBACK
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            What People Say About{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              NEXWORKTECH
            </span>
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Hamare clients aur bot testers ke top selected reviews — aur neeche aap bhi apna review submit kar sakte hain.
          </p>
        </motion.div>

        {/* TOP 3 ADMIN-SELECTED FEATURED REVIEWS (LARGE & PROMINENT CARDS) */}
        {featuredReviews.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {featuredReviews.map((rev, idx) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative p-8 sm:p-9 rounded-[2rem] bg-gradient-to-b from-[#0f172a] to-[#080d1a] border border-cyan-400/25 hover:border-cyan-400/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, sIdx) => (
                        <Star
                          key={sIdx}
                          className={`w-5 h-5 ${
                            sIdx < rev.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-cyan-400/25" />
                  </div>

                  <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-medium mb-8">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black text-slate-950 text-base">
                      {rev.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">{rev.name}</h4>
                      <span className="text-xs text-cyan-400 font-medium">
                        {rev.service}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500">{rev.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* VISITOR ADD REVIEW FORM (NAME + EMAIL ID + RATING + REVIEW) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto p-8 sm:p-10 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-md"
        >
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              SHARE YOUR EXPERIENCE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Write a Review
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Apna naam aur email ID daal kar review submit karein. Admin approval ke baad top 3 reviews yahan feature kiye jayenge.
            </p>
          </div>

          {reviewSubmitted ? (
            <div className="py-10 text-center space-y-3 bg-emerald-500/10 border border-emerald-400/25 rounded-2xl p-6">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">
                Thank You! Aapka Review Submit Ho Gaya Hai
              </h4>
              <p className="text-xs text-slate-300">
                Admin dashboard mein aapka review bhej diya gaya hai.
              </p>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Apna poora naam likhein"
                    value={reviewForm.name}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1.5">
                    Your Email ID *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={reviewForm.email}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs text-slate-300 mb-1.5">
                    Tested / Used Service
                  </label>
                  <select
                    value={reviewForm.service}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, service: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#11182f] border border-white/10 text-sm text-white focus:border-cyan-400 outline-none"
                  >
                    <option value="IoT Home Control Bot">IoT Home Control Bot</option>
                    <option value="AI Automation">AI Automation</option>
                    <option value="IoT Development">IoT Development</option>
                    <option value="PCB Designing">PCB Designing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1.5">
                    Rating ({reviewForm.rating} / 5 Stars)
                  </label>
                  <div className="flex items-center gap-2 py-2">
                    {[1, 2, 3, 4, 5].map((starNum) => (
                      <button
                        type="button"
                        key={starNum}
                        onClick={() =>
                          setReviewForm({ ...reviewForm, rating: starNum })
                        }
                        className="focus:outline-none hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            starNum <= reviewForm.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1.5">
                  Your Review *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="NEXWORKTECH ya hamare IoT Home Bot ke baare mein apna experience likhein..."
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, comment: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:border-cyan-400 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform"
              >
                <Send className="w-4 h-4" /> Submit Review
              </button>
            </form>
          )}
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer id="footer" className="border-t border-white/10 bg-[#03050b] pt-16 pb-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-400 flex items-center justify-center font-black text-black">
                N
              </div>
              <span className="text-lg font-black tracking-wider text-white">
                NEXWORK <span className="text-cyan-400">TECH</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your engineering partner for custom AI Automation, IoT hardware ecosystems, and professional multi-layer PCB design.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nexwork Tech on Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-pink-500/80 hover:border-pink-400 transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nexwork Tech on YouTube"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-red-600/80 hover:border-red-500 transition-colors"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">
              Our Divisions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• AI Agents & Workflow Automation</li>
              <li>• Internet of Things (IoT) & Smart Home Bot</li>
              <li>• Industrial PCB Layout & Prototyping</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">
              Direct Contact
            </h4>
            <a
              href={`mailto:${owner.email}`}
              className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:underline font-medium mb-2"
            >
              <Mail className="w-4 h-4" />
              {owner.email}
            </a>
            <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
              <Phone className="w-3.5 h-3.5 text-slate-500" /> {owner.phone}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center sm:text-left space-y-1">
            <p>© {year} Nexwork Tech. All rights reserved.</p>
            <p>
              Design &amp; Developed by <span className="text-cyan-400 font-semibold">Nexwork Tech</span>
            </p>
          </div>

          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-cyan-400 transition-all"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isAdminLoggedIn ? "Open Admin Dashboard" : "Admin Login"}</span>
          </button>
        </div>
      </footer>

      {/* 1. RIGHT-SIDE OWNER DRAWER */}
      <AnimatePresence>
        {isOwnerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOwnerOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0b1021] border-l border-white/15 z-50 p-8 overflow-y-auto flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                    Leadership Profile
                  </span>
                  <button
                    onClick={() => setIsOwnerOpen(false)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-8 text-center">
                  <div className="relative w-32 h-32 mx-auto rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 shadow-xl shadow-cyan-500/20">
                    <img
                      src={owner.photo}
                      alt={owner.name}
                      className="w-full h-full object-cover object-top rounded-full bg-white"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mt-5">{owner.name}</h3>
                  <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mt-1">
                    {owner.role}
                  </p>
                  <span className="inline-block mt-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-300">
                    {owner.experience}
                  </span>
                </div>

                <div className="mt-8 space-y-4 bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    About the Founder
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{owner.bio}</p>

                  <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <span>{owner.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone className="w-4 h-4 text-cyan-400" />
                      <span>{owner.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Globe className="w-4 h-4 text-cyan-400" />
                      <span>{owner.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsOwnerOpen(false);
                  setIsEnquiryOpen(true);
                }}
                className="mt-8 w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
              >
                Work With {owner.name}
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 2. TOP-RIGHT ENQUIRY MODAL */}
      <AnimatePresence>
        {isEnquiryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0b1021] border border-white/15 rounded-3xl max-w-lg w-full p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setIsEnquiryOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                NEXWORKTECH PROJECT DESK
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-6">
                Send a Project Enquiry
              </h3>

              {enquirySent ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-xl font-bold text-white">Enquiry Submitted!</h4>
                  <p className="text-xs text-slate-400">
                    Humari team jald hi aapse sampark karegi. (Admin Panel mein save ho gaya hai)
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5">
                      Phone Number or Email *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+91 9876543210 or email@domain.com"
                      value={enquiryForm.contact}
                      onChange={(e) =>
                        setEnquiryForm({ ...enquiryForm, contact: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5">
                      Select Service *
                    </label>
                    <select
                      value={enquiryForm.service}
                      onChange={(e) =>
                        setEnquiryForm({ ...enquiryForm, service: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#11182f] border border-white/10 text-sm text-white focus:border-cyan-400 outline-none"
                    >
                      <option value="AI Automation">1. AI Automation</option>
                      <option value="IoT Development">2. IoT Development</option>
                      <option value="PCB Designing">3. PCB Designing</option>
                      <option value="Complete Hardware + AI">Complete Project (AI + IoT + PCB)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1.5">
                      Project Details / Requirement *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Apne project ke baare mein batayein..."
                      value={enquiryForm.message}
                      onChange={(e) =>
                        setEnquiryForm({ ...enquiryForm, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                  >
                    <Send className="w-4 h-4" /> Submit Enquiry
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. ADMIN LOGIN & DASHBOARD MODAL */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="bg-[#0b1021] border border-white/15 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>

              {!isAdminLoggedIn ? (
                <div className="max-w-sm mx-auto py-10 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mx-auto mb-4 text-cyan-400">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">NEXWORKTECH Admin</h3>
                  <p className="text-xs text-slate-400 mt-1 mb-6">
                    Enter admin password to manage enquiries, gallery photos, reviews, owner info & team work.
                  </p>

                  {!showForgot ? (
                    <form onSubmit={handleAdminLogin} className="space-y-4">
                      <input
                        type="password"
                        placeholder="Enter Admin Password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-center text-sm text-white focus:border-cyan-400 outline-none"
                      />
                      {loginError && <p className="text-xs text-rose-400">{loginError}</p>}
                      <button
                        type="submit"
                        disabled={loginBusy}
                        className="w-full py-3 rounded-xl bg-cyan-400 text-slate-950 font-bold text-sm disabled:opacity-60"
                      >
                        {loginBusy ? "Checking..." : "Unlock Dashboard"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForgot(true)}
                        className="text-xs text-slate-400 hover:text-cyan-400"
                      >
                        Password bhool gaye?
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleForgotReset} className="space-y-4 text-left">
                      <p className="text-[11px] text-slate-400 text-center">
                        Server ki <code className="text-cyan-300">ADMIN_RESET_KEY</code> (.env) daal kar naya password set karein.
                      </p>
                      <input
                        type="password"
                        required
                        placeholder="Recovery Key"
                        value={forgotForm.recoveryKey}
                        onChange={(e) => setForgotForm({ ...forgotForm, recoveryKey: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-center text-sm text-white focus:border-cyan-400 outline-none"
                      />
                      <input
                        type="password"
                        required
                        minLength={6}
                        placeholder="New Password (min 6)"
                        value={forgotForm.newPassword}
                        onChange={(e) => setForgotForm({ ...forgotForm, newPassword: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-center text-sm text-white focus:border-cyan-400 outline-none"
                      />
                      {forgotMsg.text && (
                        <p className={`text-xs text-center ${forgotMsg.type === "ok" ? "text-emerald-400" : "text-rose-400"}`}>
                          {forgotMsg.text}
                        </p>
                      )}
                      <button type="submit" className="w-full py-3 rounded-xl bg-cyan-400 text-slate-950 font-bold text-sm">
                        Reset Password
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForgot(false)}
                        className="block mx-auto text-xs text-slate-400 hover:text-cyan-400"
                      >
                        ← Back to login
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                        ● ADMIN SESSION ACTIVE
                      </span>
                      <h3 className="text-2xl font-bold text-white">
                        NEXWORKTECH Control Panel
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 mr-10">
                      <a
                        href="/team"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-xs font-bold"
                      >
                        <Users className="w-3.5 h-3.5" /> Team Panel
                      </a>
                      <button
                        onClick={handleAdminLogout}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Logout
                      </button>
                    </div>
                  </div>

                  {adminUser?.mustChangePassword && (
                    <div className="mt-4 p-3 rounded-xl bg-amber-500/15 border border-amber-400/30 text-xs text-amber-300 flex flex-wrap items-center justify-between gap-2">
                      <span>⚠ Aap abhi default password use kar rahe hain. Security ke liye ise turant badlein.</span>
                      <button onClick={() => setActiveAdminTab("security")} className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold">
                        Change Now
                      </button>
                    </div>
                  )}

                  {/* Admin Navigation Tabs (4 Tabs Including Reviews) */}
                  <div className="flex flex-wrap gap-2 my-6">
                    <button
                      onClick={() => setActiveAdminTab("enquiries")}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        activeAdminTab === "enquiries"
                          ? "bg-cyan-400 text-slate-950"
                          : "bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      1. Client Enquiries ({enquiries.length})
                    </button>
                    <button
                      onClick={() => setActiveAdminTab("reviews")}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        activeAdminTab === "reviews"
                          ? "bg-cyan-400 text-slate-950"
                          : "bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      2. Select Top 3 Reviews ({featuredReviews.length}/3 Featured)
                    </button>
                    <button
                      onClick={() => setActiveAdminTab("gallery")}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        activeAdminTab === "gallery"
                          ? "bg-cyan-400 text-slate-950"
                          : "bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      3. Upload / Edit Pictures ({gallery.length})
                    </button>
                    <button
                      onClick={() => setActiveAdminTab("owner")}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        activeAdminTab === "owner"
                          ? "bg-cyan-400 text-slate-950"
                          : "bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      4. Owner & Company Email
                    </button>
                    <button
                      onClick={() => setActiveAdminTab("security")}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        activeAdminTab === "security"
                          ? "bg-cyan-400 text-slate-950"
                          : "bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      5. Password & Security
                    </button>
                  </div>

                  {/* TAB 1: CLIENT ENQUIRIES */}
                  {activeAdminTab === "enquiries" && (
                    <div className="space-y-4">
                      {enquiries.length === 0 ? (
                        <p className="text-sm text-slate-400 py-8 text-center">
                          Abhi tak koi enquiry nahi aayi hai.
                        </p>
                      ) : (
                        enquiries.map((enq) => (
                          <div
                            key={enq.id}
                            className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                          >
                            <div>
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-white text-base">
                                  {enq.name}
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 text-[11px]">
                                  {enq.service}
                                </span>
                                <span className="text-[11px] text-slate-500">{enq.date}</span>
                              </div>
                              <p className="text-xs text-cyan-300 mt-1">{enq.contact}</p>
                              <p className="text-xs text-slate-300 mt-2 bg-black/30 p-3 rounded-xl border border-white/5">
                                {enq.message}
                              </p>
                            </div>
                            <button
                              onClick={() => handleDeleteEnquiry(enq.id)}
                              className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 shrink-0"
                              title="Delete Enquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* TAB 2: MANAGE & SELECT TOP 3 REVIEWS FOR WEBSITE */}
                  {activeAdminTab === "reviews" && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/25 flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs text-cyan-200">
                          Yahan se aap koi bhi <strong>3 Reviews</strong> select kar sakte hain jo website par footer ke upar bade cards mein sabko dikhenge.
                        </p>
                        <span className="px-3 py-1 rounded-full bg-cyan-400 text-slate-950 font-black text-xs">
                          Selected: {featuredReviews.length} / 3
                        </span>
                      </div>

                      {adminReviewNotice && (
                        <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-400/30 text-xs text-amber-300">
                          {adminReviewNotice}
                        </div>
                      )}

                      {reviews.length === 0 ? (
                        <p className="text-sm text-slate-400 py-8 text-center">
                          Abhi tak koi review submit nahi hua hai.
                        </p>
                      ) : (
                        reviews.map((rev) => (
                          <div
                            key={rev.id}
                            className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                              rev.featured
                                ? "bg-emerald-500/10 border-emerald-400/40"
                                : "bg-white/[0.03] border-white/10"
                            }`}
                          >
                            <div className="space-y-1.5">
                              <div className="flex flex-wrap items-center gap-2.5">
                                <span className="font-bold text-white text-base">
                                  {rev.name}
                                </span>
                                <span className="text-xs text-cyan-400">
                                  ({rev.email})
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-slate-300">
                                  {rev.service}
                                </span>
                                <span className="text-xs text-amber-400 font-bold">
                                  {"★".repeat(rev.rating)}
                                </span>
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed">
                                &ldquo;{rev.comment}&rdquo;
                              </p>
                              <p className="text-[10px] text-slate-500">{rev.date}</p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => handleToggleFeatureReview(rev.id)}
                                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                                  rev.featured
                                    ? "bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20"
                                    : "bg-white/10 hover:bg-cyan-400 hover:text-slate-950 text-slate-200"
                                }`}
                              >
                                {rev.featured
                                  ? "✓ Featured on Site"
                                  : "Select to Show"}
                              </button>

                              <button
                                onClick={() => handleDeleteReview(rev.id)}
                                className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                                title="Delete Review"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* TAB 3: UPLOAD / EDIT WEBSITE PICTURES */}
                  {activeAdminTab === "gallery" && (
                    <div className="space-y-8">
                      <form
                        onSubmit={handleSaveGalleryItem}
                        className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4"
                      >
                        <h4 className="text-sm font-bold text-cyan-400">
                          {editingId ? "Edit Selected Picture" : "Upload New Picture to Website"}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            required
                            placeholder="Project / Picture Title"
                            value={newPic.title}
                            onChange={(e) => setNewPic({ ...newPic, title: e.target.value })}
                            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                          />
                          <select
                            value={newPic.category}
                            onChange={(e) =>
                              setNewPic({ ...newPic, category: e.target.value })
                            }
                            className="px-4 py-2.5 rounded-xl bg-[#11182f] border border-white/10 text-xs text-white"
                          >
                            <option value="AI Automation">AI Automation</option>
                            <option value="IoT Development">IoT Development</option>
                            <option value="PCB Designing">PCB Designing</option>
                          </select>
                        </div>

                        <input
                          type="text"
                          placeholder="Short description..."
                          value={newPic.description}
                          onChange={(e) =>
                            setNewPic({ ...newPic, description: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">
                              Option 1: Choose Photo from PC / Mobile
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e, "gallery")}
                              className="text-xs text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-cyan-500/20 file:text-cyan-300"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">
                              Option 2: Or Paste Image URL
                            </label>
                            <input
                              type="text"
                              placeholder="https://..."
                              value={newPic.image}
                              onChange={(e) => setNewPic({ ...newPic, image: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="submit"
                            className="px-6 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs"
                          >
                            {editingId ? "Update Picture" : "+ Upload to Website"}
                          </button>
                          {editingId && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingId(null);
                                setNewPic({
                                  title: "",
                                  category: "AI Automation",
                                  description: "",
                                  image: "",
                                });
                              }}
                              className="px-4 py-2.5 rounded-xl bg-white/10 text-xs"
                            >
                              Cancel Edit
                            </button>
                          )}
                        </div>
                      </form>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {gallery.map((item) => (
                          <div
                            key={item.id}
                            className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between"
                          >
                            <div>
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-32 object-cover rounded-xl mb-3"
                              />
                              <h5 className="font-bold text-xs text-white">{item.title}</h5>
                              <p className="text-[11px] text-cyan-400">{item.category}</p>
                            </div>
                            <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
                              <button
                                onClick={() => handleEditClick(item)}
                                className="flex-1 py-1.5 rounded-lg bg-white/10 hover:bg-cyan-400 hover:text-slate-950 text-[11px] font-semibold flex items-center justify-center gap-1"
                              >
                                <Edit2 className="w-3 h-3" /> Edit
                              </button>
                              <button
                                onClick={() => handleDeleteGalleryItem(item.id)}
                                className="py-1.5 px-3 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[11px]"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: EDIT OWNER & COMPANY DETAILS */}
                  {activeAdminTab === "owner" && (
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                      <h4 className="text-sm font-bold text-cyan-400">
                        Update Owner Profile & Footer Contact Details
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">
                            Owner Name
                          </label>
                          <input
                            type="text"
                            value={owner.name}
                            onChange={(e) => saveOwner({ ...owner, name: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">
                            Owner Role / Title
                          </label>
                          <input
                            type="text"
                            value={owner.role}
                            onChange={(e) => saveOwner({ ...owner, role: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">
                            Company Email (Shows in Footer & Drawer)
                          </label>
                          <input
                            type="email"
                            value={owner.email}
                            onChange={(e) => saveOwner({ ...owner, email: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            value={owner.phone}
                            onChange={(e) => saveOwner({ ...owner, phone: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          Owner Bio / Description
                        </label>
                        <textarea
                          rows={3}
                          value={owner.bio}
                          onChange={(e) => saveOwner({ ...owner, bio: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">
                            Upload Owner Photo from PC
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "owner")}
                            className="text-xs text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-cyan-500/20 file:text-cyan-300"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">
                            Or Paste Owner Photo URL
                          </label>
                          <input
                            type="text"
                            value={owner.photo}
                            onChange={(e) => saveOwner({ ...owner, photo: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          onClick={() => persistOwner()}
                          disabled={!ownerDirty}
                          className="px-6 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs disabled:opacity-40"
                        >
                          Save Changes
                        </button>
                        {uploading && <span className="text-[11px] text-cyan-300">Uploading to Cloudinary...</span>}
                        {ownerMsg && (
                          <span className={`text-[11px] ${ownerMsg.startsWith("✓") ? "text-emerald-400" : "text-rose-400"}`}>
                            {ownerMsg}
                          </span>
                        )}
                        {ownerDirty && !ownerMsg && (
                          <span className="text-[11px] text-amber-300">Unsaved changes — Save Changes dabayein.</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 5: PASSWORD & SECURITY */}
                  {activeAdminTab === "security" && (
                    <form
                      onSubmit={handleChangePassword}
                      className="max-w-md p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4"
                    >
                      <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                        <KeyRound className="w-4 h-4" /> Change Admin Password
                      </h4>
                      {["current", "next", "confirm"].map((k) => (
                        <div key={k}>
                          <label className="block text-[11px] text-slate-400 mb-1">
                            {k === "current" ? "Current Password" : k === "next" ? "New Password (min 6 characters)" : "Confirm New Password"}
                          </label>
                          <input
                            type="password"
                            required
                            minLength={k === "current" ? 1 : 6}
                            value={pwForm[k]}
                            onChange={(e) => setPwForm({ ...pwForm, [k]: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                          />
                        </div>
                      ))}
                      {pwMsg.text && (
                        <p className={`text-xs ${pwMsg.type === "ok" ? "text-emerald-400" : "text-rose-400"}`}>{pwMsg.text}</p>
                      )}
                      <button type="submit" className="px-6 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs">
                        Update Password
                      </button>
                      <p className="text-[11px] text-slate-500">
                        Password bhool jaayein toh login screen par &quot;Password bhool gaye?&quot; se server ki recovery key ke saath reset kar sakte hain.
                      </p>
                    </form>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
