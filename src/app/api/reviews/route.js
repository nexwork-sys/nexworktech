import { Review } from "@/lib/models";
import { connectDB } from "@/lib/mongodb";
import { guard, json, fail, readBody, istDay, rateLimit, clientIp } from "@/lib/api";

// Admin: saare reviews (email ke saath)
export async function GET() {
  const { error } = await guard("admin");
  if (error) return error;
  return json({ reviews: await Review.find().sort({ createdAt: -1 }) });
}

// Public: naya review (featured=false, admin approve karega)
export async function POST(req) {
  if (!rateLimit(`rev:${clientIp(req)}`, 5, 60 * 60 * 1000)) return fail("Thodi der baad try karein", 429);
  const b = await readBody(req);
  const name = String(b.name || "").trim().slice(0, 120);
  const email = String(b.email || "").trim().slice(0, 200);
  const comment = String(b.comment || "").trim().slice(0, 2000);
  if (!name || !email || !comment) return fail("Naam, email aur review zaroori hai");
  await connectDB();
  await Review.create({
    name,
    email,
    comment,
    rating: Math.min(5, Math.max(1, Number(b.rating) || 5)),
    service: String(b.service || "").slice(0, 80),
    featured: false,
    date: istDay(),
  });
  return json({ ok: true }, 201);
}
