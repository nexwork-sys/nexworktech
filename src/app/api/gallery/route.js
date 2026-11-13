import { GalleryItem } from "@/lib/models";
import { guard, json, fail, readBody } from "@/lib/api";

export async function POST(req) {
  const { error } = await guard("admin");
  if (error) return error;
  const b = await readBody(req);
  if (!b.title || !b.image) return fail("Title aur image zaroori hai");
  const item = await GalleryItem.create({
    title: b.title,
    category: b.category,
    description: b.description || "",
    image: b.image,
  });
  return json({ item }, 201);
}
