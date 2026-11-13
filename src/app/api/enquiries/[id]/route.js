import { Enquiry } from "@/lib/models";
import { guard, json, fail, isId } from "@/lib/api";

export async function DELETE(_req, { params }) {
  const { error } = await guard("admin");
  if (error) return error;
  const { id } = await params;
  if (!isId(id)) return fail("Invalid id");
  await Enquiry.findByIdAndDelete(id);
  return json({ ok: true });
}
