import mongoose from "mongoose";
import { connection } from "next/server";
import { getCurrentUser } from "./auth";

export const json = (data, status = 200) => Response.json(data, { status });
export const fail = (message, status = 400) => Response.json({ error: message }, { status });
export const isId = (id) => mongoose.isValidObjectId(id);

export async function readBody(req) {
  try {
    return await req.json();
  } catch {
    return {};
  }
}

// guard("admin") -> sirf admin, guard() -> koi bhi logged-in user
export async function guard(role) {
  await connection(); // request-time only (build ke waqt DB access nahi)
  const user = await getCurrentUser(); // login hone par hi DB connect hota hai
  if (!user) return { error: fail("Pehle login karein", 401) };
  if (role === "admin" && user.role !== "admin") return { error: fail("Sirf admin ke liye", 403) };
  return { user };
}

export function istDate() {
  return new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });
}

export function istDay() {
  return new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
}

// Simple in-memory rate limit (login brute-force rokne ke liye)
const hits = globalThis._nexHits || (globalThis._nexHits = new Map());
export function rateLimit(key, max = 8, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const entry = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (entry.length >= max) {
    hits.set(key, entry);
    return false;
  }
  entry.push(now);
  hits.set(key, entry);
  return true;
}
export const clearLimit = (key) => hits.delete(key);

export function clientIp(req) {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
}

export function parseRepo(input = "") {
  const s = String(input).trim().replace(/\.git$/, "").replace(/\/$/, "");
  const m = s.match(/(?:github\.com[/:])?([\w.-]+)\/([\w.-]+)$/i);
  return m ? `${m[1]}/${m[2]}`.toLowerCase() : "";
}
