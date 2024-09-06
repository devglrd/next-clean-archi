import {Todo} from "@/src/entities/models/todo";
import {UnauthenticatedError} from "@/src/entities/errors/auth";
import {getInjection} from "@/di/container";
import {getTodosCase} from "@/src/application/use-cases/todos/get-todos.case";

function presenter(todos: Todo[]) {
    return todos.map((t) => ({
        id: t.id,
        todo: t.todo,
        userId: t.userId,
        completed: t.completed,
    }));
}

export async function getTodosController(
    sessionId: string | undefined,
): Promise<ReturnType<typeof presenter>> {
    if (!sessionId) {
        throw new UnauthenticatedError("Must be logged in to create a todo");
    }
    const authService = getInjection('IAuthenticationService');

    const {session} = await authService.validateSession(sessionId);

    const todos = await getTodosCase(session.userId);

    return presenter(todos);
}