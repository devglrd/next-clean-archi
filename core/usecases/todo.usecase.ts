import {getInjection} from "@/di/container";
import {NotFoundError} from "@/core/entities/errors/common";

export async function addTodoUseCase(
    inputTodo: string,
    userId: string
) {
    const todoRepository = getInjection('ITodosRepository');
    const todo = await todoRepository.createTodo({
        todo: inputTodo,
        userId: userId,
        completed: false
    })

    return todo;
}

export async function getTodosCase(
    userId: string
) {
    const todoRepository = getInjection('ITodosRepository');
    return await todoRepository.getTodosForUser(userId);
}

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