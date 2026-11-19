import { PortfolioProject } from "@/lib/models";
import { crudItem } from "@/lib/crud";

export const { PUT, DELETE } = crudItem(
  PortfolioProject,
  { name: "string", tag: "string", url: "string", description: "string", images: "list", stats: "list", order: "number" },
  ["name"]
);
