import { JobApplication } from "@/lib/models";
import { crudItem } from "@/lib/crud";

export const { DELETE } = crudItem(JobApplication, {}, []);
