import { Task, Update } from "@/lib/models";
import { guard, json, fail, isId, readBody } from "@/lib/api";
import { loadProject, sameId, STATUS_LABEL } from "@/lib/team";

export async function PATCH(req, { params }) {
  const { user, error } = await guard();
  if (error) return error;
  const { id } = await params;
  if (!isId(id)) return fail("Invalid id");
  const task = await Task.findById(id);
  if (!task) return fail("Task nahi mila", 404);
  const { project, error: e2 } = await loadProject(task.project, user);
  if (e2) return e2;
  const b = await readBody(req);
  const isAdmin = user.role === "admin";

  // Employee sirf apne task ka status badal sakta hai
  if (!isAdmin && !sameId(task.assignee, user._id)) return fail("Ye task aapko assign nahi hai", 403);

  const prevStatus = task.status;
  if (b.status && STATUS_LABEL[b.status]) task.status = b.status;
  if (isAdmin) {
    if (typeof b.title === "string" && b.title.trim()) task.title = b.title.trim();
    if (typeof b.description === "string") task.description = b.description;
    if (["low", "medium", "high"].includes(b.priority)) task.priority = b.priority;
    if ("dueDate" in b) task.dueDate = b.dueDate ? new Date(b.dueDate) : null;
    if ("assignee" in b) {
      task.assignee = b.assignee && isId(b.assignee) ? b.assignee : null;
      if (task.assignee && !project.members.some((m) => sameId(m, task.assignee))) {
        project.members.push(task.assignee);
        await project.save();
      }
    }
  }
  await task.save();

  if (task.status !== prevStatus) {
    await Update.create({
      project: task.project,
      author: user._id,
      kind: "system",
      text: `"${task.title}" → ${STATUS_LABEL[task.status]}`,
    });
  }
  await task.populate("assignee", "name username");
  return json({ task });
}

export async function DELETE(_req, { params }) {
  const { error } = await guard("admin");
  if (error) return error;
  const { id } = await params;
  if (!isId(id)) return fail("Invalid id");
  await Task.findByIdAndDelete(id);
  return json({ ok: true });
}
