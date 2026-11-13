import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models";
import { createSession, ensureAdmin, checkPassword } from "@/lib/auth";
import { json, fail, readBody, rateLimit, clearLimit, clientIp } from "@/lib/api";

export async function POST(req) {
  await connectDB();
  await ensureAdmin();
  const key = `login:${clientIp(req)}`;
  if (!rateLimit(key)) return fail("Bahut zyada galat attempts. 10 minute baad try karein.", 429);

  const { username, password } = await readBody(req);
  const user = await User.findOne({ username: String(username || "").toLowerCase().trim() });
  const ok = user && user.active && (await checkPassword(String(password || ""), user.passwordHash));
  if (!ok) return fail("Incorrect username ya password!", 401);

  clearLimit(key);
  await createSession(user);
  return json({ user: user.toJSON() });
}
