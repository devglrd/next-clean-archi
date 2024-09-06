import {getInjection} from "@/di/container";

export async function getTodosCase(
    userId: string
) {
    const todoRepository = getInjection('ITodosRepository');
    return await todoRepository.getTodosForUser(userId);
}