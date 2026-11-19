import { Message, User } from "@/lib/models";
import { guard, json, fail, isId, readBody } from "@/lib/api";

// Admin <-> employee chat. Har employee ka admin ke saath ek thread (thread id = employee id).
// Employee: GET -> apna thread. Admin: GET -> sab threads ki list, GET ?with=<id> -> ek thread.
export async function GET(req) {
  const { user, error } = await guard();
  if (error) return error;
  const isAdmin = user.role === "admin";
  const withId = new URL(req.url).searchParams.get("with");

  if (isAdmin && !withId) {
    const employees = await User.find({ role: "employee", active: true }).sort({ name: 1 });
    const threads = await Promise.all(
      employees.map(async (e) => {
        const [last, unread] = await Promise.all([
          Message.findOne({ thread: e._id }).sort({ createdAt: -1 }),
          Message.countDocuments({ thread: e._id, sender: e._id, readBy: { $ne: user._id } }),
        ]);
        return { user: e, last, unread };
      })
    );
    threads.sort((a, b) => (b.last?.createdAt || 0) - (a.last?.createdAt || 0));
    return json({ threads, unreadTotal: threads.reduce((n, t) => n + t.unread, 0) });
  }

  const threadId = isAdmin ? withId : String(user._id);
  if (!isId(threadId)) return fail("Invalid thread");
  const messages = await Message.find({ thread: threadId }).sort({ createdAt: -1 }).limit(200);
  messages.reverse();
  // samne wale ke messages read mark karo
  await Message.updateMany({ thread: threadId, sender: { $ne: user._id }, readBy: { $ne: user._id } }, { $addToSet: { readBy: user._id } });
  const other = isAdmin
    ? await User.findById(threadId)
    : await User.findOne({ role: "admin", active: true });
  return json({ messages, other });
}

export async function POST(req) {
  const { user, error } = await guard();
  if (error) return error;
  const b = await readBody(req);
  const text = String(b.text || "").trim().slice(0, 3000);
  if (!text) return fail("Message khali hai");

  let thread = user._id;
  if (user.role === "admin") {
    if (!isId(b.to)) return fail("Kisko bhejna hai?");
    const emp = await User.findOne({ _id: b.to, role: "employee" });
    if (!emp) return fail("Employee nahi mila", 404);
    thread = emp._id;
  }
  const message = await Message.create({ thread, sender: user._id, text, readBy: [user._id] });
  return json({ message }, 201);
}
