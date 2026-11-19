import { WorkRequest } from "@/lib/models";
import { connectDB } from "@/lib/mongodb";
import { guard, json, fail, readBody, istDate, rateLimit, clientIp } from "@/lib/api";

export async function GET() {
  const { error } = await guard("admin");
  if (error) return error;
  return json({ requests: await WorkRequest.find().sort({ createdAt: -1 }) });
}

// Public: koi admin ko kaam dena chahta hai
export async function POST(req) {
  if (!rateLimit(`wreq:${clientIp(req)}`, 6, 60 * 60 * 1000)) return fail("Please try again later", 429);
  const b = await readBody(req);
  const name = String(b.name || "").trim().slice(0, 120);
  const contact = String(b.contact || "").trim().slice(0, 200);
  const title = String(b.title || "").trim().slice(0, 160);
  const description = String(b.description || "").trim().slice(0, 4000);
  if (!name || !contact || !title || !description) return fail("Name, contact, work title and details are required");
  await connectDB();
  await WorkRequest.create({ name, contact, title, description, budget: String(b.budget || "").slice(0, 80), date: istDate() });
  return json({ ok: true }, 201);
}
