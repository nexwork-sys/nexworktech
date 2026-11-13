import { User } from "@/lib/models";
import { guard, json, fail, readBody } from "@/lib/api";
import { hashPassword } from "@/lib/auth";

// Sab logged-in log team list dekh sakte hain (assign/members ke liye)
export async function GET() {
  const { error } = await guard();
  if (error) return error;
  return json({ users: await User.find().sort({ role: 1, name: 1 }) });
}

export async function POST(req) {
  const { error } = await guard("admin");
  if (error) return error;
  const b = await readBody(req);
  const username = String(b.username || "").toLowerCase().trim();
  if (!/^[a-z0-9._-]{3,30}$/.test(username)) return fail("Username 3-30 characters ka ho (a-z, 0-9, . _ -)");
  if (!b.name?.trim()) return fail("Naam zaroori hai");
  if (!b.password || String(b.password).length < 6) return fail("Password kam se kam 6 characters ka ho");
  try {
    const user = await User.create({
      username,
      name: b.name.trim(),
      passwordHash: await hashPassword(String(b.password)),
      role: "employee",
      githubUsername: String(b.githubUsername || "").trim().replace(/^@/, ""),
      designation: String(b.designation || "").trim(),
      mustChangePassword: true,
    });
    return json({ user }, 201);
  } catch (e) {
    if (e?.code === 11000) return fail("Ye username pehle se maujood hai");
    throw e;
  }
}
