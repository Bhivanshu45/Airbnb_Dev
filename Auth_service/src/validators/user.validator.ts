import {z} from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const registerSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().regex(passwordRegex),
    role: z.enum(["USER", "ADMIN", "HOST"]).optional().default("USER")
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(passwordRegex)
});