import { JobApplication, RemoteJob } from "@/lib/models";
import { connectDB } from "@/lib/mongodb";
import { guard, json, fail, isId, readBody, istDate, rateLimit, clientIp } from "@/lib/api";

export async function GET() {
  const { error } = await guard("admin");
  if (error) return error;
  return json({ applications: await JobApplication.find().sort({ createdAt: -1 }) });
}

// Public: "mujhe ye kaam chahiye" — apna detail bhejna
export async function POST(req) {
  if (!rateLimit(`wapp:${clientIp(req)}`, 10, 60 * 60 * 1000)) return fail("Thodi der baad try karein", 429);
  const b = await readBody(req);
  const name = String(b.name || "").trim().slice(0, 120);
  const contact = String(b.contact || "").trim().slice(0, 200);
  if (!name || !contact) return fail("Naam aur contact (phone/email) zaroori hai");
  await connectDB();
  let job = null;
  if (isId(b.jobId)) job = await RemoteJob.findById(b.jobId);
  await JobApplication.create({
    job: job?._id || null,
    jobTitle: job?.title || String(b.jobTitle || "").slice(0, 160),
    name,
    contact,
    skills: String(b.skills || "").trim().slice(0, 500),
    link: String(b.link || "").trim().slice(0, 300),
    message: String(b.message || "").trim().slice(0, 3000),
    date: istDate(),
  });
  return json({ ok: true }, 201);
}
