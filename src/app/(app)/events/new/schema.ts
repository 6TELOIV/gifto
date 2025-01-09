import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, "A name is required."),
  description: z.string().min(1, "A description is required."),
});
