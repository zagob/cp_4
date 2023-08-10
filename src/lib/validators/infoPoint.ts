import { z } from "zod";

export const InfoPointValidator = z.object({
  start1: z.number(),
  exit1: z.number(),
  start2: z.number(),
  exit2: z.number(),
  totalMinutes: z.number(),
});

export type InfoPointCreationRequest = z.infer<typeof InfoPointValidator>;
