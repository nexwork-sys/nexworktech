import { GalleryItem } from "@/lib/models";
import { guard, json, fail, isId, readBody } from "@/lib/api";

export async function PUT(req, { params }) {
  const { error } = await guard("admin");
  if (error) return error;
  const { id } = await params;
  if (!isId(id)) return fail("Invalid id");
  const b = await readBody(req);
  if (!b.title || !b.image) return fail("Title aur image zaroori hai");
  const item = await GalleryItem.findByIdAndUpdate(
    id,
    { title: b.title, category: b.category, description: b.description || "", image: b.image },
    { new: true }
  );
  if (!item) return fail("Item nahi mila", 404);
  return json({ item });
}

export async function DELETE(_req, { params }) {
  const { error } = await guard("admin");
  if (error) return error;
  const { id } = await params;
  if (!isId(id)) return fail("Invalid id");
  await GalleryItem.findByIdAndDelete(id);
  return json({ ok: true });
}
