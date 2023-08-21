import { z } from "zod";

export const UserValidator = z.object({
  name: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
});

export type UserCreationRequest = z.infer<typeof UserValidator>;
