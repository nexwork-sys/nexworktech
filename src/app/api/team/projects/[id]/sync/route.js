import { Commit } from "@/lib/models";
import { guard, json, fail } from "@/lib/api";
import { loadProject } from "@/lib/team";
import { fetchRepoCommits } from "@/lib/github";

// GitHub se latest commits manually pull karo (webhook na ho toh bhi chalta hai)
export async function POST(_req, { params }) {
  const { user, error } = await guard();
  if (error) return error;
  const { id } = await params;
  const { project, error: e2 } = await loadProject(id, user);
  if (e2) return e2;
  if (!project.repo) return fail("Is project mein GitHub repo set nahi hai");

  try {
    const commits = await fetchRepoCommits(project.repo, 60);
    if (!commits.length) return json({ added: 0 });
    const res = await Commit.bulkWrite(
      commits.map((c) => ({
        updateOne: {
          filter: { project: project._id, sha: c.sha },
          update: { $setOnInsert: { ...c, project: project._id } },
          upsert: true,
        },
      })),
      { ordered: false }
    );
    return json({ added: res.upsertedCount || 0 });
  } catch (e) {
    return fail(e.message || "GitHub sync fail", 502);
  }
}
