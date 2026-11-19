import { connectDB } from "@/lib/mongodb";
import { GalleryItem, Review, Setting, Service, PortfolioProject } from "@/lib/models";
import { DEFAULT_GALLERY, DEFAULT_OWNER, DEFAULT_SERVICES, DEFAULT_PROJECTS } from "@/lib/defaults";
import { connection } from "next/server";
import { json } from "@/lib/api";

// Pehli request par default content DB mein daal deta hai (har cheez sirf ek baar)
async function seedOnce() {
  const strip = ({ id, ...rest }) => rest; // eslint-disable-line no-unused-vars

  if (!(await Setting.exists({ key: "seeded" }))) {
    await GalleryItem.insertMany(DEFAULT_GALLERY.map(strip));
    await Setting.create({ key: "owner", value: DEFAULT_OWNER });
    await Setting.create({ key: "seeded", value: true });
  }

  // v2: AI + AIoT services, admin-managed projects, PCB hatana
  if (!(await Setting.exists({ key: "seeded_v2" }))) {
    if (!(await Service.estimatedDocumentCount())) await Service.insertMany(DEFAULT_SERVICES);
    if (!(await PortfolioProject.estimatedDocumentCount())) await PortfolioProject.insertMany(DEFAULT_PROJECTS);
    await GalleryItem.deleteMany({ title: "6-Layer High-Speed Embedded Controller PCB" }); // purana sample
    await GalleryItem.updateMany({ category: { $nin: ["AI Automation", "AIoT"] } }, { $set: { category: "AIoT" } });
    await Setting.create({ key: "seeded_v2", value: true });
  }
}

// Public: sirf wahi data jo website par dikhna hai (reviews ki email nahi)
export async function GET() {
  await connection(); // hamesha request time par chalao (build ke waqt DB nahi)
  await connectDB();
  await seedOnce();
  const [services, gallery, projects, featured, owner] = await Promise.all([
    Service.find().sort({ order: 1, createdAt: 1 }),
    GalleryItem.find().sort({ createdAt: -1 }),
    PortfolioProject.find().sort({ order: 1, createdAt: 1 }),
    Review.find({ featured: true }).sort({ createdAt: -1 }), // jitne admin ne chune utne
    Setting.findOne({ key: "owner" }),
  ]);
  return json({
    services,
    gallery,
    projects,
    owner: { ...DEFAULT_OWNER, ...(owner?.value || {}) },
    reviews: featured.map((r) => {
      const o = r.toJSON();
      delete o.email;
      return o;
    }),
  });
}
