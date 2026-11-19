import { createHmac, timingSafeEqual } from "node:crypto";
import { connectDB } from "@/lib/mongodb";
import { loadHome, saveHome, runCommand } from "@/lib/homebot";

// WhatsApp Cloud API webhook (Meta). Runs on Vercel, no extra server needed.
// Callback URL: https://YOUR-DOMAIN/api/whatsapp   Verify token: WHATSAPP_VERIFY_TOKEN

export async function GET(req) {
  const p = new URL(req.url).searchParams;
  const expected = process.env.WHATSAPP_VERIFY_TOKEN;
  if (expected && p.get("hub.mode") === "subscribe" && p.get("hub.verify_token") === expected) {
    return new Response(p.get("hub.challenge") || "", { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

function validSignature(raw, header) {
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (!secret || !header?.startsWith("sha256=")) return false;
  const expected = createHmac("sha256", secret).update(raw).digest("hex");
  const got = header.slice(7);
  return got.length === expected.length && timingSafeEqual(Buffer.from(got), Buffer.from(expected));
}

async function sendText(to, body) {
  const { WHATSAPP_TOKEN, WHATSAPP_PHONE_ID } = process.env;
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) return;
  const v = process.env.GRAPH_VERSION || "v21.0";
  const res = await fetch(`https://graph.facebook.com/${v}/${WHATSAPP_PHONE_ID}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body: body.slice(0, 1000) } }),
  });
  if (!res.ok) console.error("WhatsApp send failed", res.status, await res.text().catch(() => ""));
}

export async function POST(req) {
  const raw = await req.text();
  if (!validSignature(raw, req.headers.get("x-hub-signature-256"))) {
    return new Response("Invalid signature", { status: 401 });
  }

  let payload;
  try { payload = JSON.parse(raw); } catch { return new Response("Bad request", { status: 400 }); }

  const messages = [];
  for (const entry of payload.entry || [])
    for (const ch of entry.changes || [])
      for (const m of ch.value?.messages || []) if (m.type === "text" && m.text?.body) messages.push(m);
  if (!messages.length) return new Response("OK", { status: 200 }); // delivery/read receipts etc.

  // Only numbers on the allow-list may control the house (digits with country code, comma separated).
  const allowed = (process.env.WHATSAPP_ALLOWED_NUMBERS || "").split(",").map((s) => s.replace(/\D/g, "")).filter(Boolean);

  await connectDB();
  let state = await loadHome();
  const seen = new Set(state._seen || []);
  let dirty = false;

  for (const m of messages) {
    if (seen.has(m.id)) continue; // Meta retries delivery; don't run a command twice
    seen.add(m.id);
    dirty = true;
    if (!allowed.includes(String(m.from).replace(/\D/g, ""))) {
      await sendText(m.from, "This number is not authorised to control this home.");
      continue;
    }
    const out = runCommand(m.text.body, state);
    state = { ...out.state, _seen: [...seen] };
    await sendText(m.from, out.reply);
  }
  if (dirty) await saveHome({ ...state, _seen: [...seen].slice(-30) });
  return new Response("OK", { status: 200 });
}
