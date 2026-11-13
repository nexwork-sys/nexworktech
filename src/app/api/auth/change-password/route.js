import { guard, json, fail, readBody } from "@/lib/api";
import { createSession, checkPassword, hashPassword } from "@/lib/auth";

export async function POST(req) {
  const { user, error } = await guard();
  if (error) return error;

  const { current, next } = await readBody(req);
  if (!current || !(await checkPassword(String(current), user.passwordHash))) {
    return fail("Current password galat hai", 400);
  }
  if (!next || String(next).length < 6) return fail("Naya password kam se kam 6 characters ka rakhein", 400);
  if (next === current) return fail("Naya password purane se alag rakhein", 400);

  user.passwordHash = await hashPassword(String(next));
  user.mustChangePassword = false;
  user.tokenVersion = (user.tokenVersion || 0) + 1; // baaki devices logout
  await user.save();
  await createSession(user);
  return json({ ok: true, user: user.toJSON() });
}
