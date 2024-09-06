import {getInjection} from "@/di/container";
import {NotFoundError} from "@/src/entities/errors/common";

export async function toggleTodoUseCase(
    id: number,
    userId: string
) {
    const todoReposity = getInjection('ITodosRepository');
    const todo = await todoReposity.getTodo(id);
    if (!todo || todo.userId !== userId) {
        throw new NotFoundError("Todo does not exist");
    }

    const updatedTodo = await todoReposity.updateTodo(id, {completed: !todo?.completed});

    return updatedTodo;
}