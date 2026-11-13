import { Project, Task } from "@/lib/models";
import { guard, json, fail, readBody, parseRepo } from "@/lib/api";
import { MEMBER_FIELDS, countTasks, cleanIds } from "@/lib/team";

export async function GET() {
  const { user, error } = await guard();
  if (error) return error;

  const filter = user.role === "admin" ? {} : { members: user._id };
  const projects = await Project.find(filter).sort({ createdAt: -1 }).populate("members", MEMBER_FIELDS);
  const tasks = await Task.find({ project: { $in: projects.map((p) => p._id) } }, "project status");

  return json({
    projects: projects.map((p) => ({
      ...p.toJSON(),
      taskCounts: countTasks(tasks.filter((t) => String(t.project) === String(p._id))),
    })),
  });
}

export async function POST(req) {
  const { user, error } = await guard("admin");
  if (error) return error;
  const b = await readBody(req);
  if (!b.name?.trim()) return fail("Project ka naam zaroori hai");
  if (b.repo && !parseRepo(b.repo)) return fail("GitHub repo format galat hai (owner/repo ya URL)");

  const project = await Project.create({
    name: b.name.trim(),
    description: b.description || "",
    repo: parseRepo(b.repo),
    deadline: b.deadline ? new Date(b.deadline) : null,
    members: cleanIds(b.members),
    createdBy: user._id,
  });
  await project.populate("members", MEMBER_FIELDS);
  return json({ project }, 201);
}
