import { z } from "zod";

export const createGroupInputSchema = z.object({
  groupId: z.string().min(1, "Required"),
  groupName: z.string().min(1, "Required"),
});

export type CreateGroupInput = z.infer<typeof createGroupInputSchema>;