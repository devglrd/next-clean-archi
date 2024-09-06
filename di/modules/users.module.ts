import { ContainerModule, interfaces } from "inversify";


import { DI_SYMBOLS } from "../types";
import {IUsersRepository} from "@/src/application/repositories/user.interface";
import {UsersRepository} from "@/src/infrastructure/repositories/user.repository";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IUsersRepository>(DI_SYMBOLS.IUsersRepository).to(UsersRepository);
};

export const UsersModule = new ContainerModule(initializeModule);