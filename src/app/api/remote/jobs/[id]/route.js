import { RemoteJob } from "@/lib/models";
import { crudItem } from "@/lib/crud";

export const { PUT, DELETE } = crudItem(
  RemoteJob,
  { title: "string", description: "string", rate: "string", rateType: "enum:fixed,hourly,monthly", skills: "list", status: "enum:open,closed" },
  ["title"]
);
