import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid institutional email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
