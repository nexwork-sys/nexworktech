import { Task } from "@/lib/models";
import { guard, json } from "@/lib/api";

// Mere assigned tasks (admin ke liye bhi, kyunki admin bhi kaam karta hai)
export async function GET() {
  const { user, error } = await guard();
  if (error) return error;
  const tasks = await Task.find({ assignee: user._id })
    .sort({ updatedAt: -1 })
    .populate("project", "name status");
  const order = { in_progress: 0, review: 1, todo: 2, done: 3 };
  tasks.sort((a, b) => order[a.status] - order[b.status]);
  return json({ tasks });
}
