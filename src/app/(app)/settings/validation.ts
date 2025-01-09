import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "A name is required."),
  theme: z.enum(["light", "dark", "system"]),
});
