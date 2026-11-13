import { createHmac, timingSafeEqual } from "node:crypto";
import { connectDB } from "@/lib/mongodb";
import { Project, Commit } from "@/lib/models";
import { json, fail } from "@/lib/api";

// GitHub repo -> Settings -> Webhooks -> Payload URL: https://YOUR-SITE/api/github/webhook
// Content type: application/json, Secret: GITHUB_WEBHOOK_SECRET, Event: "Just the push event"
export async function POST(req) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret) return fail("GITHUB_WEBHOOK_SECRET set nahi hai", 503);

  const raw = await req.text();
  const sig = req.headers.get("x-hub-signature-256") || "";
  const expected = "sha256=" + createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return fail("Invalid signature", 401);

  const event = req.headers.get("x-github-event");
  if (event === "ping") return json({ ok: true, pong: true });
  if (event !== "push") return json({ ok: true, ignored: event });

  const payload = JSON.parse(raw);
  const repo = String(payload.repository?.full_name || "").toLowerCase();
  const branch = String(payload.ref || "").replace("refs/heads/", "");
  if (!repo || !payload.commits?.length) return json({ ok: true, added: 0 });

  await connectDB();
  const projects = await Project.find({ repo }, "_id");
  let added = 0;
  for (const p of projects) {
    const res = await Commit.bulkWrite(
      payload.commits.map((c) => ({
        updateOne: {
          filter: { project: p._id, sha: c.id },
          update: {
            $setOnInsert: {
              project: p._id,
              sha: c.id,
              message: c.message || "",
              authorLogin: String(c.author?.username || "").toLowerCase(),
              authorName: c.author?.name || "",
              authorEmail: c.author?.email || "",
              branch,
              url: c.url || "",
              date: c.timestamp ? new Date(c.timestamp) : new Date(),
            },
          },
          upsert: true,
        },
      })),
      { ordered: false }
    );
    added += res.upsertedCount || 0;
  }
  return json({ ok: true, added });
}
