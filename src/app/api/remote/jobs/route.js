import { connection } from "next/server";
import { RemoteJob } from "@/lib/models";
import { connectDB } from "@/lib/mongodb";
import { guard, json } from "@/lib/api";
import { crudCollection } from "@/lib/crud";

// Public: sirf open jobs. Admin (?all=1): saare.
export async function GET(req) {
  await connection();
  await connectDB();
  const all = new URL(req.url).searchParams.get("all");
  if (all) {
    const { error } = await guard("admin");
    if (error) return error;
    return json({ jobs: await RemoteJob.find().sort({ createdAt: -1 }) });
  }
  return json({ jobs: await RemoteJob.find({ status: "open" }).sort({ createdAt: -1 }) });
}

export const POST = crudCollection(
  RemoteJob,
  { title: "string", description: "string", rate: "string", rateType: "enum:fixed,hourly,monthly", skills: "list", status: "enum:open,closed" },
  ["title"]
);
