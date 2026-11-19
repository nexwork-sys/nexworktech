import { GalleryItem } from "@/lib/models";
import { SERVICE_KINDS } from "@/lib/defaults";
import { guard, json, fail, readBody } from "@/lib/api";

export async function POST(req) {
  const { error } = await guard("admin");
  if (error) return error;
  const b = await readBody(req);
  if (!b.title || !b.image) return fail("Title and image are required");
  const item = await GalleryItem.create({
    title: b.title,
    category: SERVICE_KINDS.includes(b.category) ? b.category : "AI Automation",
    description: b.description || "",
    image: b.image,
  });
  return json({ item }, 201);
}
