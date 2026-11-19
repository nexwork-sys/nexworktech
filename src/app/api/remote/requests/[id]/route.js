import { WorkRequest } from "@/lib/models";
import { crudItem } from "@/lib/crud";

export const { DELETE } = crudItem(WorkRequest, {}, []);
