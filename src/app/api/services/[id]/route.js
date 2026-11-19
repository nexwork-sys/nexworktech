import { Service } from "@/lib/models";
import { crudItem } from "@/lib/crud";

export const { PUT, DELETE } = crudItem(
  Service,
  { kind: "enum:ai,aiot", tag: "string", title: "string", description: "string", features: "list", order: "number" },
  ["title"]
);
