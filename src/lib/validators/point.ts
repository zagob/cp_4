import { z } from "zod";

export const PointValidator = z.object({
  time1: z.number(),
  time2: z.number(),
  time3: z.number(),
  time4: z.number(),
  createdAt: z.string(),
});

export type PointCreationRequest = z.infer<typeof PointValidator>;
