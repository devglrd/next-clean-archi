import {z} from "zod";

export const signUpSchema = z.object({
    username: z.string().min(3).max(31),
    password: z.string().min(6).max(31),
    confirm_password: z.string().min(6).max(31),
}).superRefine(({password, confirm_password}, ctx) => {
    if (password !== confirm_password) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "passwords do not match",
            path: ["confirmPassword"],
        });

        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "passwords do not match",
            path: ["password"],
        });

    }
})

export const signInSchema = z.object({
    username: z.string().min(3).max(31),
    password: z.string().min(6).max(31),
})
