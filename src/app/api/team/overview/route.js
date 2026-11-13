import { User, Project, Task, Update, Commit } from "@/lib/models";
import { guard, json } from "@/lib/api";
import { countTasks } from "@/lib/team";

// Admin dashboard: kaun kya kar raha hai, ek nazar mein
export async function GET() {
  const { error } = await guard("admin");
  if (error) return error;

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [users, projectCount, tasks, lastUpdates, commitAgg, recent] = await Promise.all([
    User.find({ active: true }).sort({ role: 1, name: 1 }),
    Project.countDocuments({ status: "active" }),
    Task.find({}, "assignee status project"),
    Update.aggregate([{ $match: { kind: "note" } }, { $group: { _id: "$author", last: { $max: "$createdAt" } } }]),
    Commit.aggregate([
      { $match: { authorLogin: { $ne: "" } } },
      { $group: { _id: "$authorLogin", total7: { $sum: { $cond: [{ $gte: ["$date", since] }, 1, 0] } }, last: { $max: "$date" } } },
    ]),
    Update.find().sort({ createdAt: -1 }).limit(20).populate("author", "name").populate("project", "name"),
  ]);

  const lastNote = new Map(lastUpdates.map((u) => [String(u._id), u.last]));
  const commitsByLogin = new Map(commitAgg.map((c) => [String(c._id).toLowerCase(), c]));

  const people = users.map((u) => {
    const mine = tasks.filter((t) => String(t.assignee) === String(u._id));
    const c = u.githubUsername ? commitsByLogin.get(u.githubUsername.toLowerCase()) : null;
    const dates = [lastNote.get(String(u._id)), c?.last].filter(Boolean).map((d) => new Date(d).getTime());
    return {
      ...u.toJSON(),
      tasks: countTasks(mine),
      commits7: c?.total7 || 0,
      lastCommitAt: c?.last || null,
      lastActiveAt: dates.length ? new Date(Math.max(...dates)) : null,
    };
  });

  return json({
    totals: { activeProjects: projectCount, employees: users.filter((u) => u.role === "employee").length, tasks: countTasks(tasks) },
    people,
    recent,
  });
}
