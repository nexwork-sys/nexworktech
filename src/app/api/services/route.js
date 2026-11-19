import { Service } from "@/lib/models";
import { crudCollection } from "@/lib/crud";

export const POST = crudCollection(
  Service,
  { kind: "enum:ai,aiot", tag: "string", title: "string", description: "string", features: "list", order: "number" },
  ["title"]
);
