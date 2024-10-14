import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string({
            required_error: "Name is required",
        })
        .min(5, "name must be at least 5 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});
