import { Project } from "./models";
import { fail, isId } from "./api";

export const MEMBER_FIELDS = "name username role githubUsername designation active";
export const STATUS_LABEL = { todo: "To Do", in_progress: "In Progress", review: "In Review", done: "Done" };

export const sameId = (a, b) => String(a?._id || a) === String(b?._id || b);

// Project load + access check (admin ya project ka member)
export async function loadProject(id, user) {
  if (!isId(id)) return { error: fail("Invalid project id") };
  const project = await Project.findById(id);
  if (!project) return { error: fail("Project nahi mila", 404) };
  const allowed = user.role === "admin" || project.members.some((m) => sameId(m, user._id));
  if (!allowed) return { error: fail("Aap is project ke member nahi hain", 403) };
  return { project };
}

export function countTasks(rows) {
  const c = { todo: 0, in_progress: 0, review: 0, done: 0, total: 0 };
  for (const r of rows) {
    c[r.status] = (c[r.status] || 0) + 1;
    c.total += 1;
  }
  c.progress = c.total ? Math.round((c.done / c.total) * 100) : 0;
  return c;
}

export function cleanIds(list) {
  return [...new Set((Array.isArray(list) ? list : []).filter(isId).map(String))];
}
