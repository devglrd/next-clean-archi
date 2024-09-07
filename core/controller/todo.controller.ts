import {z} from "zod";
import {addTodosSchema, toggleTodoSchema} from "@/app/todos/schema";
import {UnauthenticatedError} from "@/core/entities/errors/auth";
import {getInjection} from "@/di/container";
import {InputParseError} from "@/core/entities/errors/common";
import {Todo} from "@/core/entities/models/todo";
import {addTodoUseCase, getTodosCase, toggleTodoUseCase} from "@/core/usecases/todo.usecase";

function presenter(todos: Todo) {
    return {
        id: todos.id,
        todo: todos.todo,
        userId: todos.userId,
        completed: todos.completed,
    }
}

function presenterList(todos: Todo[]) {
    return todos.map((t) => ({
        id: t.id,
        todo: t.todo,
        userId: t.userId,
        completed: t.completed,
    }));
}

export async function addTodoController(
    input: z.infer<typeof addTodosSchema>,
    sessionId: string | undefined
){
    if (!sessionId) {
        throw new UnauthenticatedError("Must be logged in to create a todo");
    }
    const authService = getInjection('IAuthenticationService');
    const {session} = await authService.validateSession(sessionId);
    const {data, error: inputParseError} = addTodosSchema.safeParse(input);

    if (inputParseError) {
        throw new InputParseError("Invalid data", {cause: inputParseError});
    }


    const todo = await addTodoUseCase(data?.todo, session.userId);
    return presenter(todo);
}

export async function getTodosController(
    sessionId: string | undefined,
): Promise<ReturnType<typeof presenterList>> {
    if (!sessionId) {
        throw new UnauthenticatedError("Must be logged in to create a todo");
    }
    const authService = getInjection('IAuthenticationService');

    const {session} = await authService.validateSession(sessionId);

    const todos = await getTodosCase(session.userId);

    return presenterList(todos);
}

export async function toggleTodoController(
    input: z.infer<typeof toggleTodoSchema>,
    sessionId: string | undefined
): Promise<ReturnType<typeof presenter>> {

    if (!sessionId) {
        throw new UnauthenticatedError("Must be logged in to create a todo");
    }
    const authService = getInjection('IAuthenticationService');
    const {session} = await authService.validateSession(sessionId);
    const {data, error: inputParseError} = toggleTodoSchema.safeParse(input);

    if (inputParseError) {
        throw new InputParseError("Invalid data", {cause: inputParseError});
    }

    const todo = await toggleTodoUseCase(data.id, session.userId);
    return presenter(todo);
}