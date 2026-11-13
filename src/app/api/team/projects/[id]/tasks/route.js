import { Task, Update } from "@/lib/models";
import { guard, json, fail, isId, readBody } from "@/lib/api";
import { loadProject, sameId } from "@/lib/team";

// Admin task banata hai aur kisi member (admin khud bhi) ko assign karta hai
export async function POST(req, { params }) {
  const { user, error } = await guard("admin");
  if (error) return error;
  const { id } = await params;
  const { project, error: e2 } = await loadProject(id, user);
  if (e2) return e2;
  const b = await readBody(req);
  if (!b.title?.trim()) return fail("Task ka title zaroori hai");

  let assignee = null;
  if (b.assignee) {
    if (!isId(b.assignee)) return fail("Assignee galat hai");
    assignee = b.assignee;
    if (!project.members.some((m) => sameId(m, assignee))) {
      project.members.push(assignee); // assign karte hi project team mein add
      await project.save();
    }
  }

  const task = await Task.create({
    project: project._id,
    title: b.title.trim(),
    description: b.description || "",
    assignee,
    priority: ["low", "medium", "high"].includes(b.priority) ? b.priority : "medium",
    dueDate: b.dueDate ? new Date(b.dueDate) : null,
  });
  await task.populate("assignee", "name username");
  await Update.create({
    project: project._id,
    author: user._id,
    kind: "system",
    text: `Naya task: "${task.title}"${task.assignee ? ` → ${task.assignee.name}` : ""}`,
  });
  return json({ task }, 201);
}
