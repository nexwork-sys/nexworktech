// Smart Home bot: command parser + state kept in MongoDB (Setting key "home").
import { Setting } from "./models";

export const DEFAULT_HOME = {
  l1: false, l2: false, fan: false, ac: false, temp: 24,
  door: false, water: 50, pump: false, auto: true,
};

export async function loadHome() {
  const d = await Setting.findOne({ key: "home" });
  return { ...DEFAULT_HOME, ...(d?.value || {}) };
}

export async function saveHome(value) {
  await Setting.findOneAndUpdate({ key: "home" }, { $set: { value } }, { upsert: true });
}

const onOff = (b) => (b ? "ON" : "OFF");
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export const HELP =
  "Try: light on, light 2 off, fan on, ac on, temp 22, door status, pump on, auto off, water level, status";

export function statusText(S) {
  return `Light 1 ${onOff(S.l1)}, Light 2 ${onOff(S.l2)}, Fan ${onOff(S.fan)}, AC ${S.ac ? `${S.temp}°C` : "OFF"}, Door ${S.door ? "OPEN" : "Closed"}, Water ${S.water}%, Pump ${onOff(S.pump)}${S.auto ? " (auto)" : ""}`;
}

// Returns { reply, state, changed }. `state` is a new object; the input is not mutated.
export function runCommand(text, current) {
  const S = { ...current };
  const c = String(text || "").toLowerCase().trim();
  const on = /\bon\b/.test(c);
  const off = /\boff\b/.test(c);

  if (/^(hi|hello|help|menu)\b/.test(c)) return { reply: `Hi! I'm the NEXWORKTECH Smart Home bot. ${HELP}`, state: S, changed: false };

  const dev = [["light 1", "l1", "Light 1"], ["light 2", "l2", "Light 2"], ["light", "l1", "Light 1"], ["fan", "fan", "Fan"], ["ac", "ac", "AC"]]
    .find((d) => new RegExp(`\\b${d[0]}\\b`).test(c));
  if (dev && (on || off) && !/pump/.test(c)) {
    S[dev[1]] = on;
    return { reply: `✅ ${dev[2]} ${onOff(on)}`, state: S, changed: true };
  }

  const t = c.match(/temp\w*\s*(\d{2})/);
  if (t) {
    const v = Number(t[1]);
    if (v < 16 || v > 30) return { reply: "⚠️ Send a temperature between 16 and 30", state: S, changed: false };
    S.temp = clamp(v, 16, 30);
    S.ac = true;
    return { reply: `❄️ AC temperature ${S.temp}°C`, state: S, changed: true };
  }

  if (/door/.test(c)) {
    if (on || /open/.test(c)) { S.door = true; return { reply: "🚨 Door open! Alarm active", state: S, changed: true }; }
    if (off || /close/.test(c)) { S.door = false; return { reply: "🚪 Door closed", state: S, changed: true }; }
    return { reply: `Door: ${S.door ? "OPEN 🚨" : "Closed"}`, state: S, changed: false };
  }

  if (/\bauto\b/.test(c) && (on || off)) {
    S.auto = on;
    return { reply: `🤖 Auto pump ${onOff(on)}`, state: S, changed: true };
  }

  if (/pump|motor/.test(c) && (on || off)) {
    S.pump = on;
    return { reply: `💧 Pump ${onOff(on)}`, state: S, changed: true };
  }

  if (/water|tank/.test(c)) return { reply: `💧 Water ${S.water}% · Pump ${onOff(S.pump)}${S.auto ? " (auto)" : ""}`, state: S, changed: false };
  if (/status/.test(c)) return { reply: statusText(S), state: S, changed: false };

  return { reply: `Sorry, I didn't understand that. ${HELP}`, state: S, changed: false };
}
