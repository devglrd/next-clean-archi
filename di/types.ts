import {IAuthenticationService} from "@/core/ports/auth.interface";
import {ITodosRepository} from "@/core/ports/todo.interface";
import {IUsersRepository} from "@/core/ports/user.interface";

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