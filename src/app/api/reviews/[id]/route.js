import { Review } from "@/lib/models";
import { guard, json, fail, isId, readBody } from "@/lib/api";

// Featured on/off — jitne chahe utne reviews website par dikha sakte hain
export async function PATCH(req, { params }) {
  const { error } = await guard("admin");
  if (error) return error;
  const { id } = await params;
  if (!isId(id)) return fail("Invalid id");
  const { featured } = await readBody(req);
  const review = await Review.findById(id);
  if (!review) return fail("Review nahi mila", 404);

  review.featured = !!featured;
  await review.save();
  return json({ review });
}

export async function DELETE(_req, { params }) {
  const { error } = await guard("admin");
  if (error) return error;
  const { id } = await params;
  if (!isId(id)) return fail("Invalid id");
  await Review.findByIdAndDelete(id);
  return json({ ok: true });
}
