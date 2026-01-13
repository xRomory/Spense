import { z } from "zod";
import { api } from "@/lib/api-client";

export const createGroupSchema = z.object({
  groupId: z.string().min(1, "Required"),
  groupName: z.string().min(1, "Required"),
});