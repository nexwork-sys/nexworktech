import { PortfolioProject } from "@/lib/models";
import { crudCollection } from "@/lib/crud";

export const POST = crudCollection(
  PortfolioProject,
  { name: "string", tag: "string", url: "string", description: "string", images: "list", stats: "list", order: "number" },
  ["name"]
);
