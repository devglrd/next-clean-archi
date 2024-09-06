import {z} from "zod";

export const toggleTodoSchema = z.object({
    id: z.number(),
})