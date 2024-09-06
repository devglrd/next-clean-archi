import {z} from "zod";

export const toggleTodoSchema = z.object({
    id: z.number(),
})

export const addTodosSchema = z.object({
    todo: z.string().min(1),
})