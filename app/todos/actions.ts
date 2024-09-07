"use server";

import {createServerAction} from "zsa";
import {cookies} from "next/headers";
import {SESSION_COOKIE} from "@/config";
import {redirect} from "next/navigation";
import {addTodosSchema, toggleTodoSchema} from "@/app/todos/schema";
import {revalidatePath} from "next/cache";
import {addTodoController, getTodosController, toggleTodoController} from "@/core/controller/todo.controller";

export const getTodos = createServerAction()
    .handler(async () => {
    const sessionId = cookies().get(SESSION_COOKIE)?.value;

    if (!sessionId) {
        redirect('/sign-in');
    }

    const todos = await getTodosController(sessionId);

    return todos;
})


export const toggleTodo = createServerAction()
    .input(toggleTodoSchema)
    .handler(async ({input}) => {
        const sessionId = cookies().get(SESSION_COOKIE)?.value;

        if (!sessionId) {
            redirect('/sign-in');
        }

        await toggleTodoController(input, sessionId);

        revalidatePath('/todos');
        revalidatePath('/');
        return { success: true };

    })

export const addTodos = createServerAction()
    .input(addTodosSchema)
    .handler(async ({input}) => {
        const sessionId = cookies().get(SESSION_COOKIE)?.value;

        if (!sessionId) {
            redirect('/sign-in');
        }

        await addTodoController(input, sessionId);

        revalidatePath('/todos');
        revalidatePath('/');
        return { success: true };

    })