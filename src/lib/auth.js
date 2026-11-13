import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { connectDB } from "./mongodb";
import { User } from "./models";

const COOKIE = "nx_session";
const WEEK = 60 * 60 * 24 * 7;

function secret() {
  const s = process.env.JWT_SECRET;
  if (!s || s.length < 16) throw new Error("JWT_SECRET .env.local mein set karein (kam se kam 16 characters)");
  return new TextEncoder().encode(s);
}

export async function createSession(user) {
  const token = await new SignJWT({ role: user.role, tv: user.tokenVersion || 0 })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(user._id))
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: WEEK,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function getCurrentUser() {
  try {
    const jar = await cookies();
    const token = jar.get(COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret());
    await connectDB();
    const user = await User.findById(payload.sub);
    if (!user || !user.active) return null;
    if ((user.tokenVersion || 0) !== (payload.tv || 0)) return null; // password change ke baad purane login band
    return user;
  } catch {
    return null;
  }
}

// Pehli baar: admin / 12345 (turant badalne ka reminder dikhta hai)
export async function ensureAdmin() {
  if (await User.exists({ role: "admin" })) return;
  await User.create({
    username: "admin",
    name: "Admin",
    role: "admin",
    passwordHash: await bcrypt.hash("12345", 10),
    mustChangePassword: true,
  });
}

export const hashPassword = (pw) => bcrypt.hash(pw, 10);
export const checkPassword = (pw, hash) => bcrypt.compare(pw, hash);
