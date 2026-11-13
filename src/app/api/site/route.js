import { connectDB } from "@/lib/mongodb";
import { GalleryItem, Review, Setting } from "@/lib/models";
import { DEFAULT_GALLERY, DEFAULT_OWNER, DEFAULT_REVIEWS } from "@/lib/defaults";
import { connection } from "next/server";
import { json } from "@/lib/api";

// Pehli request par default content DB mein daal deta hai (sirf ek baar)
async function seedOnce() {
  if (await Setting.exists({ key: "seeded" })) return;
  const strip = ({ id, ...rest }) => rest; // eslint-disable-line no-unused-vars
  await GalleryItem.insertMany(DEFAULT_GALLERY.map(strip));
  await Review.insertMany(DEFAULT_REVIEWS.map(strip));
  await Setting.create({ key: "owner", value: DEFAULT_OWNER });
  await Setting.create({ key: "seeded", value: true });
}

// Public: sirf wahi data jo website par dikhna hai (reviews ki email nahi)
export async function GET() {
  await connection(); // hamesha request time par chalao (build ke waqt DB nahi)
  await connectDB();
  await seedOnce();
  const [gallery, featured, owner] = await Promise.all([
    GalleryItem.find().sort({ createdAt: -1 }),
    Review.find({ featured: true }).sort({ createdAt: -1 }).limit(3),
    Setting.findOne({ key: "owner" }),
  ]);
  return json({
    gallery,
    owner: owner?.value || DEFAULT_OWNER,
    reviews: featured.map((r) => {
      const o = r.toJSON();
      delete o.email;
      return o;
    }),
  });
}
