import {ContainerModule, interfaces} from "inversify";
import {DI_SYMBOLS} from "@/di/types";
import {ITodosRepository} from "@/core/ports/todo.interface";
import {TodosRepository} from "@/core/adapters/todo.gateway";

const initializeModule = (bind: interfaces.Bind) => {
    bind<ITodosRepository>(DI_SYMBOLS.ITodosRepository).to(TodosRepository);
}

export const TodosModule = new ContainerModule(initializeModule);