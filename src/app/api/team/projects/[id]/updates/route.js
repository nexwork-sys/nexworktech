import { Update } from "@/lib/models";
import { guard, json, fail, readBody } from "@/lib/api";
import { loadProject } from "@/lib/team";

// Daily update / comment (admin + project members)
export async function POST(req, { params }) {
  const { user, error } = await guard();
  if (error) return error;
  const { id } = await params;
  const { project, error: e2 } = await loadProject(id, user);
  if (e2) return e2;
  const { text } = await readBody(req);
  if (!text?.trim()) return fail("Update likhein");
  const update = await Update.create({ project: project._id, author: user._id, text: text.trim().slice(0, 2000) });
  await update.populate("author", "name username role");
  return json({ update }, 201);
}
