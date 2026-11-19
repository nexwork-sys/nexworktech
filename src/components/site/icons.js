import React from "react";

const base = { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true };

export const LinkedInIcon = ({ className = "w-5 h-5" }) => (
  <svg {...base} className={className}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

export const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const FacebookIcon = ({ className = "w-5 h-5" }) => (
  <svg {...base} className={className}>
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
  </svg>
);

export const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg {...base} className={className}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.78h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zM20.52 3.45A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41z" />
  </svg>
);

export const YoutubeIcon = ({ className = "w-5 h-5" }) => (
  <svg {...base} className={className}>
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
  </svg>
);

// WhatsApp: number (91XXXXXXXXXX) ya poora link dono chalega
export function waLink(v = "") {
  const s = String(v).trim();
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  const digits = s.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

const normalize = (v = "") => {
  const s = String(v).trim();
  if (!s) return "";
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
};

export const SOCIALS = [
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon, hover: "hover:bg-sky-600/80 hover:border-sky-400", href: (v) => normalize(v) },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon, hover: "hover:bg-pink-500/80 hover:border-pink-400", href: (v) => normalize(v) },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon, hover: "hover:bg-blue-600/80 hover:border-blue-400", href: (v) => normalize(v) },
  { key: "whatsapp", label: "WhatsApp", Icon: WhatsAppIcon, hover: "hover:bg-emerald-500/80 hover:border-emerald-400", href: waLink },
  { key: "youtube", label: "YouTube", Icon: YoutubeIcon, hover: "hover:bg-red-600/80 hover:border-red-500", href: (v) => normalize(v) },
];

// Owner ke social icons (sirf wahi dikhte hain jinka link admin ne daala hai)
export function SocialLinks({ owner = {}, size = "w-10 h-10", className = "" }) {
  const items = SOCIALS.map((s) => ({ ...s, url: s.href(owner[s.key]) })).filter((s) => s.url);
  if (!items.length) return null;
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {items.map(({ key, label, Icon, hover, url }) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`${size} rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors ${hover}`}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
