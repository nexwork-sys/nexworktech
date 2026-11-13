import { Setting } from "@/lib/models";
import { guard, json, readBody } from "@/lib/api";

const FIELDS = ["name", "role", "photo", "bio", "experience", "location", "email", "phone"];

export async function PUT(req) {
  const { error } = await guard("admin");
  if (error) return error;
  const b = await readBody(req);
  const value = {};
  for (const f of FIELDS) if (typeof b[f] === "string") value[f] = b[f];
  const doc = await Setting.findOneAndUpdate({ key: "owner" }, { $set: { value } }, { upsert: true, new: true });
  return json({ owner: doc.value });
}
