import { timingSafeEqual } from "node:crypto";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import { ensureAdmin, hashPassword } from "@/lib/auth";
import { json, fail, readBody, rateLimit, clientIp } from "@/lib/api";

// Admin password bhool gaye? .env mein ADMIN_RESET_KEY se naya password set hota hai.
export async function POST(req) {
  const expected = process.env.ADMIN_RESET_KEY;
  if (!expected) return fail("ADMIN_RESET_KEY is not set on the server (check .env.local)", 503);
  if (!rateLimit(`reset:${clientIp(req)}`, 5)) return fail("Too many attempts. Please try again later.", 429);

  const { recoveryKey, newPassword } = await readBody(req);
  const a = Buffer.from(String(recoveryKey || ""));
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return fail("Recovery key is incorrect", 401);
  if (!newPassword || String(newPassword).length < 6) return fail("New password must be at least 6 characters", 400);

  await connectDB();
  await ensureAdmin();
  const admin = await User.findOne({ username: "admin" });
  admin.passwordHash = await hashPassword(String(newPassword));
  admin.mustChangePassword = false;
  admin.active = true;
  admin.tokenVersion = (admin.tokenVersion || 0) + 1;
  await admin.save();
  return json({ ok: true });
}
