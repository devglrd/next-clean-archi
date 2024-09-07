import { ContainerModule, interfaces } from "inversify";


import { DI_SYMBOLS } from "../types";
import {IUsersRepository} from "@/core/ports/user.interface";
import {UsersRepository} from "@/core/adapters/user.gateway";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IUsersRepository>(DI_SYMBOLS.IUsersRepository).to(UsersRepository);
};

export const UsersModule = new ContainerModule(initializeModule);