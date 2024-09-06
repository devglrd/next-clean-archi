import {ContainerModule, interfaces} from "inversify";
import {ITodosRepository} from "@/src/application/repositories/todo.interface";
import {DI_SYMBOLS} from "@/di/types";
import {TodosRepository} from "@/src/infrastructure/repositories/todo.repository";

const initializeModule = (bind: interfaces.Bind) => {
    bind<ITodosRepository>(DI_SYMBOLS.ITodosRepository).to(TodosRepository);
}

export const TodosModule = new ContainerModule(initializeModule);