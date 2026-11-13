import { Enquiry } from "@/lib/models";
import { connectDB } from "@/lib/mongodb";
import { guard, json, fail, readBody, istDate, rateLimit, clientIp } from "@/lib/api";

export async function GET() {
  const { error } = await guard("admin");
  if (error) return error;
  return json({ enquiries: await Enquiry.find().sort({ createdAt: -1 }) });
}

export async function POST(req) {
  if (!rateLimit(`enq:${clientIp(req)}`, 10, 60 * 60 * 1000)) return fail("Thodi der baad try karein", 429);
  const b = await readBody(req);
  const name = String(b.name || "").trim().slice(0, 120);
  const contact = String(b.contact || "").trim().slice(0, 200);
  const message = String(b.message || "").trim().slice(0, 3000);
  if (!name || !contact || !message) return fail("Naam, contact aur message zaroori hai");
  await connectDB();
  await Enquiry.create({ name, contact, message, service: String(b.service || "").slice(0, 80), date: istDate() });
  return json({ ok: true }, 201);
}
