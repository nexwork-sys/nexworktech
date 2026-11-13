import { Project, Task, Update, Commit } from "@/lib/models";
import { guard, json, fail, readBody, parseRepo } from "@/lib/api";
import { MEMBER_FIELDS, loadProject, countTasks, cleanIds } from "@/lib/team";

export async function GET(_req, { params }) {
  const { user, error } = await guard();
  if (error) return error;
  const { id } = await params;
  const { project, error: e2 } = await loadProject(id, user);
  if (e2) return e2;
  await project.populate("members", MEMBER_FIELDS);

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [tasks, updates, commits, contrib] = await Promise.all([
    Task.find({ project: project._id }).sort({ createdAt: -1 }).populate("assignee", "name username"),
    Update.find({ project: project._id }).sort({ createdAt: -1 }).limit(60).populate("author", "name username role"),
    Commit.find({ project: project._id }).sort({ date: -1 }).limit(80),
    Commit.aggregate([
      { $match: { project: project._id } },
      {
        $group: {
          _id: { $cond: [{ $ne: ["$authorLogin", ""] }, "$authorLogin", "$authorName"] },
          name: { $first: "$authorName" },
          total: { $sum: 1 },
          last7: { $sum: { $cond: [{ $gte: ["$date", since] }, 1, 0] } },
          lastAt: { $max: "$date" },
        },
      },
      { $sort: { total: -1 } },
    ]),
  ]);

  // Commit authors ko team members se match karo (GitHub username se)
  const byLogin = new Map(project.members.filter((m) => m.githubUsername).map((m) => [m.githubUsername.toLowerCase(), String(m._id)]));
  const contributors = contrib.map((c) => ({
    key: c._id,
    name: c.name,
    total: c.total,
    last7: c.last7,
    lastAt: c.lastAt,
    memberId: byLogin.get(String(c._id).toLowerCase()) || null,
  }));

  return json({
    project: project.toJSON(),
    taskCounts: countTasks(tasks),
    tasks,
    updates,
    commits,
    contributors,
  });
}

export async function PATCH(req, { params }) {
  const { error } = await guard("admin");
  if (error) return error;
  const { id } = await params;
  const project = await Project.findById(id);
  if (!project) return fail("Project nahi mila", 404);
  const b = await readBody(req);

  if (typeof b.name === "string" && b.name.trim()) project.name = b.name.trim();
  if (typeof b.description === "string") project.description = b.description;
  if (["active", "paused", "completed"].includes(b.status)) project.status = b.status;
  if ("deadline" in b) project.deadline = b.deadline ? new Date(b.deadline) : null;
  if ("repo" in b) {
    if (b.repo && !parseRepo(b.repo)) return fail("GitHub repo format galat hai (owner/repo ya URL)");
    project.repo = parseRepo(b.repo);
  }
  if (Array.isArray(b.members)) project.members = cleanIds(b.members);
  await project.save();
  await project.populate("members", MEMBER_FIELDS);
  return json({ project });
}

export async function DELETE(_req, { params }) {
  const { error } = await guard("admin");
  if (error) return error;
  const { id } = await params;
  const project = await Project.findById(id);
  if (!project) return fail("Project nahi mila", 404);
  await Promise.all([
    Task.deleteMany({ project: project._id }),
    Update.deleteMany({ project: project._id }),
    Commit.deleteMany({ project: project._id }),
  ]);
  await project.deleteOne();
  return json({ ok: true });
}
