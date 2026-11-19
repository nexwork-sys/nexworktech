import { v2 as cloudinary } from "cloudinary";
import { guard, json, fail } from "@/lib/api";

// Admin se image lekar Cloudinary par upload karta hai -> secure URL return
export async function POST(req) {
  const { error } = await guard("admin");
  if (error) return error;

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return fail("Cloudinary keys are not set in .env.local", 503);
  }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  const form = await req.formData();
  const file = form.get("file");
  if (!file || typeof file === "string") return fail("File not found");
  if (!file.type.startsWith("image/")) return fail("Only image uploads are allowed");
  if (file.size > 8 * 1024 * 1024) return fail("Image must be smaller than 8MB");

  const buffer = Buffer.from(await file.arrayBuffer());
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: `nexworktech/${["owner", "gallery", "projects", "services"].includes(form.get("folder")) ? form.get("folder") : "gallery"}` }, (err, res) =>
          err ? reject(err) : resolve(res)
        )
        .end(buffer);
    });
    return json({ url: result.secure_url });
  } catch (e) {
    return fail("Cloudinary upload fail: " + (e?.message || "unknown"), 502);
  }
}
