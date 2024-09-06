import {z} from "zod";
import {toggleTodoSchema} from "@/app/todos/schema";
import {UnauthenticatedError} from "@/src/entities/errors/auth";
import {getInjection} from "@/di/container";
import {InputParseError} from "@/src/entities/errors/common";
import {toggleTodoUseCase} from "@/src/application/use-cases/todos/toggle.case";
import {Todo} from "@/src/entities/models/todo";

function presenter(todos: Todo) {
    return {
        id: todos.id,
        todo: todos.todo,
        userId: todos.userId,
        completed: todos.completed,
    }
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