import { User, Project, Task } from "@/lib/models";
import { guard, json, fail, isId, readBody } from "@/lib/api";
import { hashPassword } from "@/lib/auth";
import { sameId } from "@/lib/team";

export async function PATCH(req, { params }) {
  const { user: me, error } = await guard("admin");
  if (error) return error;
  const { id } = await params;
  if (!isId(id)) return fail("Invalid id");
  const target = await User.findById(id);
  if (!target) return fail("User nahi mila", 404);
  const b = await readBody(req);

  if (typeof b.name === "string" && b.name.trim()) target.name = b.name.trim();
  if (typeof b.designation === "string") target.designation = b.designation.trim();
  if (typeof b.githubUsername === "string") target.githubUsername = b.githubUsername.trim().replace(/^@/, "");
  if (typeof b.active === "boolean") {
    if (sameId(target, me) && !b.active) return fail("Aap khud ko deactivate nahi kar sakte");
    target.active = b.active;
    if (!b.active) target.tokenVersion += 1;
  }
  if (b.password) {
    if (String(b.password).length < 6) return fail("Password kam se kam 6 characters ka ho");
    target.passwordHash = await hashPassword(String(b.password));
    target.tokenVersion += 1; // purane login band
    target.mustChangePassword = !sameId(target, me);
  }
  await target.save();
  return json({ user: target });
}

export async function DELETE(_req, { params }) {
  const { user: me, error } = await guard("admin");
  if (error) return error;
  const { id } = await params;
  if (!isId(id)) return fail("Invalid id");
  if (sameId(id, me)) return fail("Aap khud ko delete nahi kar sakte");
  const target = await User.findById(id);
  if (!target) return fail("User nahi mila", 404);
  if (target.role === "admin") return fail("Admin delete nahi ho sakta");
  await Promise.all([
    Project.updateMany({ members: target._id }, { $pull: { members: target._id } }),
    Task.updateMany({ assignee: target._id }, { $set: { assignee: null } }),
  ]);
  await target.deleteOne();
  return json({ ok: true });
}
