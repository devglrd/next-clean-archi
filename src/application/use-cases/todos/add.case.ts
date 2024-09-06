import {getInjection} from "@/di/container";

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