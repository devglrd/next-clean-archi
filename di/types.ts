import {IAuthenticationService} from "@/src/application/services/authentication.interface";
import {ITodosRepository} from "@/src/application/repositories/todo.interface";
import {IUsersRepository} from "@/src/application/repositories/user.interface";

export const DI_SYMBOLS = {
    // Services
    IAuthenticationService: Symbol.for("IAuthenticationService"),

    // Repositories
    ITodosRepository: Symbol.for("ITodosRepository"),
    IUsersRepository: Symbol.for("IUsersRepository"),
};

export interface DI_RETURN_TYPES {
    // Services
    IAuthenticationService: IAuthenticationService;
    // Repositories
    ITodosRepository: ITodosRepository;
    IUsersRepository: IUsersRepository;
}