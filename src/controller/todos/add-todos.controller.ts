import {z} from "zod";
import {addTodosSchema} from "@/app/todos/schema";
import {UnauthenticatedError} from "@/src/entities/errors/auth";
import {getInjection} from "@/di/container";
import {InputParseError} from "@/src/entities/errors/common";
import {Todo} from "@/src/entities/models/todo";
import {addTodoUseCase} from "@/src/application/use-cases/todos/add.case";
function presenter(todos: Todo) {
    return {
        id: todos.id,
        todo: todos.todo,
        userId: todos.userId,
        completed: todos.completed,
    }
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