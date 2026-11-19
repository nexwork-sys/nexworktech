import { timingSafeEqual } from "node:crypto";
import { connectDB } from "@/lib/mongodb";
import { loadHome, saveHome } from "@/lib/homebot";
import { json, fail, readBody } from "@/lib/api";

// For your ESP32 / relay board. Auth: "Authorization: Bearer <HOME_DEVICE_KEY>".
// GET  -> desired state set from WhatsApp (poll every few seconds)
// POST -> report sensor values, e.g. {"water": 62, "door": false}

function authorised(req) {
  const key = process.env.HOME_DEVICE_KEY;
  const got = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  return !!key && got.length === key.length && timingSafeEqual(Buffer.from(got), Buffer.from(key));
}

const publicState = ({ _seen, ...s }) => s;

export async function GET(req) {
  if (!authorised(req)) return fail("Unauthorised", 401);
  await connectDB();
  return json({ state: publicState(await loadHome()) });
}

export async function POST(req) {
  if (!authorised(req)) return fail("Unauthorised", 401);
  const b = await readBody(req);
  await connectDB();
  const s = await loadHome();
  if (Number.isFinite(b.water)) s.water = Math.max(0, Math.min(100, Math.round(b.water)));
  if (typeof b.door === "boolean") s.door = b.door;
  await saveHome(s);
  return json({ state: publicState(s) });
}
